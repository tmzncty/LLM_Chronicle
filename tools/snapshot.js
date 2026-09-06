#!/usr/bin/env node
/**
 * 快照归档脚本 — LLM Chronicle
 *
 * 按体例 v2.0 §五 规范，A+B 组合方案自动归档。
 *   A 路：curl -L 抓取 HTML → sources/YYYY/MM/slug.html
 *   B 路：Internet Archive Save Page Now → 永久链接写入 index.json
 *
 * 用法:
 *   node tools/snapshot.js 编年/2023/02.md          # 对指定条目 A+B 双路归档
 *   node tools/snapshot.js --text-only 编年/2023/02.md  # 仅 A 路（HTML 快照）
 *   node tools/snapshot.js --ia 编年/2023/02.md           # 仅 B 路（IA 存档）
 *   node tools/snapshot.js --screenshot                # 仅截图模式（社交媒体页面 PNG）
 *   node tools/snapshot.js                           # 实时扫描并归档编年/中的链接
 *   node tools/snapshot.js --dry-run                  # 实时扫描编年/并试运行
 *   node tools/snapshot.js --update-only              # 仅更新 index.json
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const crypto = require('crypto');
const { collectUrls, findMd } = require('./extract_urls');

// ============================================================
// 配置
// ============================================================

const ROOT = path.resolve(__dirname, '..');
const SOURCES_DIR = path.join(ROOT, 'sources');
const USER_AGENT = 'LLM_Chronicle_Snapshot/1.0 (historiography project; contact: github.com/tmzncty/LLM_Chronicle)';
const CURL_TIMEOUT = 30; // 秒
const IA_TIMEOUT = 60; // 秒（IA 归档较慢）
const MAX_FILE_SIZE_MB = 1;
const SOCIAL_MEDIA_DOMAINS = ['twitter.com', 'x.com', 'zhihu.com', 'weibo.com', 'bilibili.com'];
const IA_SPN_API = 'https://web.archive.org/save';
const CLI_USAGE = [
  'Usage: node tools/snapshot.js [options] [file]',
  '       node tools/snapshot.js [options] --url <http(s)-url> --month <YYYY-MM>',
].join('\n');

// ============================================================
// 工具函数
// ============================================================

function slugify(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '').replace(/\./g, '-');
    let pathPart = u.pathname.replace(/\/$/, '').replace(/\.[^.]+$/, '');
    if (!pathPart || pathPart === '/') return host;
    const segments = pathPart.split('/').filter(Boolean);
    const key = segments.slice(-2).join('-');
    let slug = `${host}-${key}`
      .replace(/[^a-zA-Z0-9\-_]/g, '-')
      .replace(/-{2,}/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 80);
    return slug || host;
  } catch {
    return crypto.createHash('md5').update(url).digest('hex').substring(0, 12);
  }
}

function needsScreenshot(url) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return SOCIAL_MEDIA_DOMAINS.some(d => host === d || host.endsWith('.' + d));
  } catch { return false; }
}

function monthFromFilePath(filePath) {
  const m = filePath.match(/编年[\\/](\d{4})[\\/](\d{2})/);
  return m ? `${m[1]}-${m[2]}` : null;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function parseCliArgs(args) {
  const options = {
    dryRun: false,
    updateOnly: false,
    textOnly: false,
    iaOnly: false,
    screenshotOnly: false,
    singleUrl: null,
    singleMonth: null,
    fileArg: null,
  };
  const booleanOptions = new Map([
    ['--dry-run', 'dryRun'],
    ['--update-only', 'updateOnly'],
    ['--text-only', 'textOnly'],
    ['--ia', 'iaOnly'],
    ['--screenshot', 'screenshotOnly'],
  ]);
  const valueOptions = new Map([
    ['--url', 'singleUrl'],
    ['--month', 'singleMonth'],
  ]);
  const seen = new Set();
  let positionalOnly = false;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!positionalOnly && arg === '--') {
      positionalOnly = true;
      continue;
    }

    if (!positionalOnly && arg.startsWith('-')) {
      const property = booleanOptions.get(arg) || valueOptions.get(arg);
      if (!property) throw new Error(`Unknown option: ${arg}`);
      if (seen.has(arg)) throw new Error(`Duplicate option: ${arg}`);
      seen.add(arg);

      if (booleanOptions.has(arg)) {
        options[property] = true;
        continue;
      }

      const value = args[index + 1];
      if (!value || value.startsWith('-')) {
        throw new Error(`${arg} requires a value`);
      }
      options[property] = value;
      index += 1;
      continue;
    }

    if (!arg) throw new Error('Unexpected empty file argument');
    if (options.fileArg !== null) throw new Error(`Unexpected argument: ${arg}`);
    options.fileArg = arg;
  }

  const hasUrl = options.singleUrl !== null;
  const hasMonth = options.singleMonth !== null;
  if (hasUrl !== hasMonth) {
    throw new Error('--url and --month must be used together');
  }
  if (hasUrl && options.fileArg !== null) {
    throw new Error('file argument cannot be combined with --url and --month');
  }
  if (hasUrl) {
    let parsedUrl;
    try {
      parsedUrl = new URL(options.singleUrl);
    } catch {
      throw new Error('--url requires an HTTP or HTTPS URL');
    }
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('--url requires an HTTP or HTTPS URL');
    }
    if (!/^[0-9]{4}-(0[1-9]|1[0-2])$/.test(options.singleMonth)) {
      throw new Error('--month requires YYYY-MM with a month from 01 to 12');
    }
  }

  const selectedModes = [
    ['--text-only', options.textOnly],
    ['--ia', options.iaOnly],
    ['--screenshot', options.screenshotOnly],
  ].filter(([, selected]) => selected).map(([name]) => name);
  if (selectedModes.length > 1) {
    throw new Error(`Mutually exclusive options: ${selectedModes.join(', ')}`);
  }

  const updateOnlyConflicts = [
    ['--dry-run', options.dryRun],
    ['--text-only', options.textOnly],
    ['--ia', options.iaOnly],
    ['--screenshot', options.screenshotOnly],
  ].filter(([, selected]) => selected).map(([name]) => name);
  if (options.updateOnly && updateOnlyConflicts.length > 0) {
    throw new Error(`--update-only cannot be combined with ${updateOnlyConflicts.join(', ')}`);
  }

  return options;
}

/** 从 Markdown 文件中提取所有 URL 及对应的脚注编号 */
function extractUrlsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const entries = [];
  const urlRe = /https?:\/\/[^\s\)\]\u4e00-\u9fff]+/g;
  const refRe = /\[\^(\d+)\]/g;

  // 建立脚注 URL → ref 的映射
  const footnoteLines = content.split('\n').filter(l => /^\[\^\d+\]:/.test(l));
  const urlToRef = new Map();
  for (const line of footnoteLines) {
    const refMatch = line.match(/^\[(\^\d+)\]:/);
    const urlMatch = line.match(/(https?:\/\/[^\s\)\]\u4e00-\u9fff]+)/);
    if (refMatch && urlMatch) {
      const url = urlMatch[0].replace(/[.,;:!?)>\]]+$/, '');
      try { new URL(url); urlToRef.set(url, refMatch[1]); } catch {}
    }
  }

  // 提取正文中的 URL
  for (const m of content.matchAll(urlRe)) {
    let url = m[0].replace(/[.,;:!?)>\]]+$/, '');
    if (/[{}\\]/.test(url)) continue;
    try { new URL(url); } catch { continue; }
    const lineNum = content.substring(0, m.index).split('\n').length;
    const rel = path.relative(ROOT, filePath).replace(/\\/g, '/');
    entries.push({ file: rel, line: lineNum, url, ref: urlToRef.get(url) || null });
  }

  return entries;
}

// ============================================================
// A 路：HTML 文本快照（curl）
// ============================================================

function fetchSnapshot(url, outputPath, timeout, executeFile = execFileSync, fileSystem = fs) {
  const tempPath = path.join(
    path.dirname(outputPath),
    `.${path.basename(outputPath)}.${process.pid}.${crypto.randomBytes(8).toString('hex')}.tmp`,
  );
  const args = [
    '-L',
    '-s',
    '-S',
    '-A', USER_AGENT,
    '--max-time', String(timeout),
    '-o', tempPath,
    '-w', '%{http_code}|%{size_download}|%{time_total}',
    '--', url,
  ];
  let fd = null;
  let ownsTemp = false;
  let operationError = null;
  try {
    fd = fileSystem.openSync(tempPath, 'wx', 0o666);
    ownsTemp = true;
    fileSystem.closeSync(fd);
    fd = null;

    const stdout = executeFile('curl', args, {
      encoding: 'utf8',
      timeout: (timeout + 5) * 1000,
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: false,
    });
    const parts = stdout.trim().split('|');
    const status = parseInt(parts[0]) || 0;
    const size = parseInt(parts[1]) || 0;
    const latency = parseFloat(parts[2]) || 0;
    const result = {
      ok: status >= 200 && status < 400,
      status,
      size,
      latency_sec: latency,
      too_large: size > MAX_FILE_SIZE_MB * 1024 * 1024,
    };
    if (result.ok) {
      fileSystem.renameSync(tempPath, outputPath);
      ownsTemp = false;
    }
    return result;
  } catch (err) {
    operationError = err;
    return {
      ok: false,
      status: null,
      size: 0,
      latency_sec: timeout,
      error: err.stderr ? err.stderr.toString().substring(0, 200) : (err.message || 'Unknown curl error'),
      too_large: false,
    };
  } finally {
    if (fd !== null) {
      try { fileSystem.closeSync(fd); } catch {}
    }
    if (ownsTemp) {
      try {
        fileSystem.unlinkSync(tempPath);
      } catch (err) {
        if (!operationError && err.code !== 'ENOENT') throw err;
      }
    }
  }
}

// ============================================================
// B 路：Internet Archive Save Page Now
// ============================================================

async function archiveToWayback(url) {
  const apiUrl = `${IA_SPN_API}/${encodeURIComponent(url)}`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), IA_TIMEOUT * 1000);

    const resp = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': USER_AGENT,
      },
      signal: controller.signal,
      redirect: 'follow',
    });
    clearTimeout(timer);

    const body = await resp.text();
    let data;
    try { data = JSON.parse(body); } catch { data = null; }

    if (resp.ok && data && data.url) {
      // IA 返回的 url 字段即为永久快照地址
      return {
        ok: true,
        wayback_url: data.url,
        job_id: data.job_id || null,
        message: data.message || null,
      };
    }

    // SPN 可能返回 200 但实际未保存（如已在队列中）
    if (data && data.message) {
      console.error(`    ℹ IA: ${data.message}`);
    }

    // 检查是否已有存档（可能返回 already archived 等）
    if (data && data.url) {
      return { ok: true, wayback_url: data.url, job_id: data.job_id || null, message: data.message };
    }

    return {
      ok: false,
      wayback_url: null,
      error: `IA returned HTTP ${resp.status}: ${body.substring(0, 200)}`,
    };
  } catch (err) {
    if (err.name === 'AbortError') {
      return { ok: false, wayback_url: null, error: `IA timeout after ${IA_TIMEOUT}s` };
    }
    return { ok: false, wayback_url: null, error: err.message || 'Unknown IA error' };
  }
}

// ============================================================
// S 路：Playwright 自动截图（社交媒体页面）
// ============================================================

async function screenshotPage(url, outputPath, timeout) {
  try {
    const { chromium } = require('playwright');
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(url, { waitUntil: 'networkidle', timeout: timeout * 1000 });

    // 等待页面稳定
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: outputPath,
      fullPage: true,
      type: 'png',
    });

    await browser.close();

    const stat = fs.statSync(outputPath);
    return {
      ok: true,
      size: stat.size,
      size_human: formatBytes(stat.size),
      too_large: stat.size > MAX_FILE_SIZE_MB * 1024 * 1024,
    };
  } catch (err) {
    return {
      ok: false,
      error: err.message ? err.message.substring(0, 200) : 'Unknown screenshot error',
    };
  }
}

// ============================================================
// index.json 管理
// ============================================================

function loadIndex(monthDir, fileSystem = fs) {
  const indexPath = path.join(monthDir, 'index.json');
  let content;
  try {
    content = fileSystem.readFileSync(indexPath, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      return { month: path.basename(monthDir), sources: [] };
    }
    throw err;
  }

  const normalizedPath = path.resolve(indexPath).replace(/\\/g, '/');
  let index;
  try {
    index = JSON.parse(content);
  } catch {
    throw new Error(`Invalid JSON in source index: ${normalizedPath}`);
  }
  if (!index || typeof index !== 'object' || Array.isArray(index) || !Array.isArray(index.sources)) {
    throw new Error(`Invalid source index schema (expected "sources" array): ${normalizedPath}`);
  }
  if (index.sources.some(source => !source || typeof source !== 'object' || Array.isArray(source))) {
    throw new Error(`Invalid source index schema (expected source objects): ${normalizedPath}`);
  }
  return index;
}

function saveIndex(monthDir, index, fileSystem = fs) {
  const indexPath = path.join(monthDir, 'index.json');
  const tempPath = path.join(
    monthDir,
    `.index.json.${process.pid}.${crypto.randomBytes(8).toString('hex')}.tmp`,
  );
  const content = JSON.stringify(index, null, 2) + '\n';
  fileSystem.mkdirSync(monthDir, { recursive: true });

  let fd = null;
  let ownsTemp = false;
  let operationError = null;
  try {
    fd = fileSystem.openSync(tempPath, 'wx', 0o666);
    ownsTemp = true;
    fileSystem.writeFileSync(fd, content, 'utf8');
    fileSystem.fsyncSync(fd);
    fileSystem.closeSync(fd);
    fd = null;
    fileSystem.renameSync(tempPath, indexPath);
    ownsTemp = false;
  } catch (err) {
    operationError = err;
    throw err;
  } finally {
    if (fd !== null) {
      try { fileSystem.closeSync(fd); } catch {}
    }
    if (ownsTemp) {
      try {
        fileSystem.unlinkSync(tempPath);
      } catch (err) {
        if (!operationError && err.code !== 'ENOENT') throw err;
      }
    }
  }
}

function findSource(index, source) {
  return index.sources.find(s =>
    (source.ref && s.ref === source.ref) || s.url === source.url
  );
}

function upsertSource(index, source) {
  const existing = findSource(index, source);
  if (existing) {
    Object.assign(existing, source);
  } else {
    index.sources.push(source);
  }
}

function discoverChronicleUrls(root = ROOT) {
  const chronicleRoot = path.join(root, '编年');
  const files = findMd(chronicleRoot);
  return {
    entries: collectUrls(root, files),
    files,
  };
}

// ============================================================
// 主逻辑
// ============================================================

async function main() {
  let options;
  try {
    options = parseCliArgs(process.argv.slice(2));
  } catch (err) {
    console.error(`Error: ${err.message}`);
    console.error(CLI_USAGE);
    process.exitCode = 2;
    return;
  }
  const {
    dryRun,
    updateOnly,
    textOnly,
    iaOnly,
    screenshotOnly,
    singleUrl,
    singleMonth,
    fileArg,
  } = options;

  const doAText = !iaOnly && !screenshotOnly;   // A 路：默认开，--ia 或 --screenshot 关
  const doBWayback = !textOnly && !screenshotOnly; // B 路：默认开，--text-only 或 --screenshot 关
  const doScreenshot = screenshotOnly;

  // ---------- 收集 URL ----------
  let entries = [];

  if (singleUrl !== null) {
    entries.push({ url: singleUrl, file: `编年/${singleMonth.replace('-', '/')}/manual.md`, line: 0, ref: null });
  } else if (fileArg) {
    // 从指定文件提取 URL
    const fullPath = path.resolve(fileArg);
    if (!fs.existsSync(fullPath)) {
      console.error(`File not found: ${fileArg}`);
      process.exit(1);
    }
    entries = extractUrlsFromFile(fullPath);
    console.error(`Extracted ${entries.length} URLs from ${fileArg}`);
  } else {
    // 实时扫描编年目录；tools/urls.json 只是可选的辅助清单，不是运行时输入。
    const discovered = discoverChronicleUrls();
    entries = discovered.entries;
    console.error(
      `Discovered ${entries.length} URLs from ${discovered.files.length} chronicle Markdown file(s)`,
    );
  }

  // ---------- 按月份分组 ----------
  const byMonth = {};
  for (const entry of entries) {
    const month = monthFromFilePath(entry.file);
    if (!month) {
      console.error(`  ⚠ Cannot determine month for: ${entry.file} — skipping`);
      continue;
    }
    if (!byMonth[month]) byMonth[month] = [];
    byMonth[month].push(entry);
  }

  if (dryRun) {
    console.error(`\nDry run — ${Object.keys(byMonth).length} months, ${entries.length} URLs:\n`);
    for (const [month, urls] of Object.entries(byMonth).sort()) {
      console.error(`  ${month}: ${urls.length} URLs`);
      for (const u of urls) {
        const slug = slugify(u.url);
        const scree = needsScreenshot(u.url) ? ' [📸]' : '';
        const modes = [];
        if (doAText) modes.push('A:HTML');
        if (doBWayback) modes.push('B:IA');
        if (doScreenshot) modes.push('S:PNG');
        console.error(`    → ${slug}.html${scree}  [${modes.join('+')}]`);
        console.error(`      ${u.url}`);
      }
    }
    return;
  }

  // ---------- 截图专用模式 ----------
  if (doScreenshot) {
    const socialUrls = entries.filter(u => needsScreenshot(u.url));
    if (socialUrls.length === 0) {
      console.error('No social media URLs to screenshot.');
      return;
    }
    console.error(`Screenshot mode — ${socialUrls.length} social media pages:\n`);
    const now = new Date().toISOString().split('T')[0];
    let totalOk = 0, totalFail = 0;

    for (const entry of socialUrls) {
      const month = monthFromFilePath(entry.file);
      if (!month) { console.error(`  ⚠ Cannot determine month for: ${entry.file}`); continue; }
      const [year, mm] = month.split('-');
      const monthDir = path.join(SOURCES_DIR, year, mm);
      const slug = slugify(entry.url);
      const pngPath = path.join(monthDir, `${slug}.png`);

      fs.mkdirSync(monthDir, { recursive: true });

      console.error(`  📸 ${slug}`);
      const result = await screenshotPage(entry.url, pngPath, 30);

      if (result.ok) {
        const icon = result.too_large ? '⚠' : '✅';
        console.error(`    ${icon} ${result.size_human}`);
        if (result.too_large) console.error(`    ⚠ >${MAX_FILE_SIZE_MB}MB — consider GitHub Releases`);
        totalOk++;

        // Update index.json screenshot field
        let index = loadIndex(monthDir);
        upsertSource(index, {
          url: entry.url,
          screenshot: `${slug}.png`,
          screenshot_size: result.size,
          screenshot_size_human: result.size_human,
        });
        index.month = month;
        index.updated_at = now;
        saveIndex(monthDir, index);
      } else {
        console.error(`    ❌ ${result.error}`);
        totalFail++;
      }
    }

    console.error(`\n━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.error(`  📸 Screenshots: ✅ ${totalOk}  ❌ ${totalFail}`);
    console.error(`━━━━━━━━━━━━━━━━━━━━━━━━\n`);
    return;
  }

  // ---------- 归档执行 ----------
  const now = new Date().toISOString().split('T')[0];
  let totalOkA = 0, totalFailA = 0, totalScreenshot = 0;
  let totalOkB = 0, totalFailB = 0, totalSkippedB = 0;

  for (const [month, urls] of Object.entries(byMonth).sort()) {
    const [year, mm] = month.split('-');
    const monthDir = path.join(SOURCES_DIR, year, mm);
    let index = loadIndex(monthDir);

    console.error(`\n📅 ${month} (${urls.length} URLs)`);

    for (const entry of urls) {
      const slug = slugify(entry.url);
      let finalSlug = slug;
      let counter = 1;
      while (index.sources.some(s => s.snapshot === `${finalSlug}.html`)) {
        counter++;
        finalSlug = `${slug}-${String(counter).padStart(2, '0')}`;
      }
      const filename = `${finalSlug}.html`;
      const outputPath = path.join(monthDir, filename);
      const needsScreen = needsScreenshot(entry.url);

      if (updateOnly) {
        if (!fs.existsSync(outputPath)) {
          console.error(`  ⚠ ${slug} — snapshot missing, use without --update-only to fetch`);
          continue;
        }
        const stat = fs.statSync(outputPath);
        upsertSource(index, {
          ref: entry.ref,
          url: entry.url,
          title: null,
          snapshot: filename,
          screenshot: null,
          screenshot_status: needsScreen ? 'MANUAL_NEEDED' : null,
          archived_at: now,
          wayback_url: null,
          file_size: stat.size,
          file_size_human: formatBytes(stat.size),
          curl_status: null,
        });
        console.error(`  📋 ${slug} — indexed`);
        totalOkA++;
        continue;
      }

      console.error(`  ⬇ ${finalSlug}`);
      fs.mkdirSync(monthDir, { recursive: true });

      // ---- A 路：HTML 文本快照 ----
      let aResult = { ok: false, status: null, size: 0, too_large: false };
      if (doAText) {
        aResult = fetchSnapshot(entry.url, outputPath, CURL_TIMEOUT);
        if (aResult.ok) {
          const icon2 = aResult.too_large ? '⚠' : '✅';
          console.error(`    [A] ${icon2} HTTP ${aResult.status} — ${formatBytes(aResult.size)} in ${aResult.latency_sec.toFixed(1)}s`);
          if (aResult.too_large) {
            console.error(`    ⚠ File >${MAX_FILE_SIZE_MB}MB — consider GitHub Releases`);
          }
          totalOkA++;
        } else {
          console.error(`    [A] ❌ ${aResult.error || ('HTTP ' + aResult.status)}`);
          totalFailA++;
        }
      } else {
        console.error(`    [A] ⏭ skipped (--ia mode)`);
      }

      // ---- B 路：Internet Archive ----
      let waybackUrl = null;
      let waybackOk = false;
      if (doBWayback) {
        const iaResult = await archiveToWayback(entry.url);
        if (iaResult.ok) {
          waybackUrl = iaResult.wayback_url;
          waybackOk = true;
          console.error(`    [B] ✅ ${waybackUrl}`);
          totalOkB++;
        } else {
          console.error(`    [B] ❌ ${iaResult.error}`);
          totalFailB++;
        }
      } else {
        console.error(`    [B] ⏭ skipped (--text-only mode)`);
      }

      // ---- 社交媒体截图标记 ----
      let screenshotStatus = null;
      if (needsScreen) {
        screenshotStatus = 'MANUAL_NEEDED';
        totalScreenshot++;
        console.error(`    📸 Manual screenshot needed (social media page)`);
      }

      // ---- 更新 index.json ----
      const sourceUpdate = {
        ref: entry.ref,
        url: entry.url,
        title: null,
        screenshot: null,
        screenshot_status: screenshotStatus,
        wayback_url: waybackUrl,
        curl_status: aResult.ok ? aResult.status : (aResult.error || aResult.status || 'unknown'),
      };
      const existingSource = findSource(index, sourceUpdate);
      const preserveSnapshotMetadata = !aResult.ok && existingSource?.url === entry.url;
      if (!preserveSnapshotMetadata) {
        Object.assign(sourceUpdate, {
          snapshot: aResult.ok ? filename : null,
          archived_at: now,
          file_size: aResult.ok ? aResult.size : 0,
          file_size_human: aResult.ok ? formatBytes(aResult.size) : 'N/A',
        });
      }
      upsertSource(index, sourceUpdate);
    }

    // 保存 index.json
    index.month = month;
    index.updated_at = now;
    saveIndex(monthDir, index);
    console.error(`  💾 index.json saved (${index.sources.length} sources)`);
  }

  // ---------- 汇总 ----------
  console.error(`\n━━━━━━━━━━━━━━━━━━━━━━━━`);
  if (doAText) {
    console.error(`  [A] HTML snapshots:  ✅ ${totalOkA}  ❌ ${totalFailA}`);
  }
  if (doBWayback) {
    console.error(`  [B] IA archives:     ✅ ${totalOkB}  ❌ ${totalFailB}`);
  }
  console.error(`  📸 Screenshots:       ${totalScreenshot} (manual needed)`);
  console.error(`  📂 Months:            ${Object.keys(byMonth).length}`);
  console.error(`━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  if (totalScreenshot > 0) {
    console.error(`⚠ ${totalScreenshot} social media page(s) require manual screenshot (PNG).`);
    console.error(`  These are typically interactive pages that curl cannot faithfully capture.`);
    console.error(`  Use a browser to screenshot and save as sources/YYYY/MM/slug.png`);
  }
}

if (require.main === module) {
  main().catch(err => {
    console.error('Fatal:', err);
    process.exit(2);
  });
}

module.exports = {
  discoverChronicleUrls,
  fetchSnapshot,
  loadIndex,
  parseCliArgs,
  saveIndex,
  upsertSource,
};
