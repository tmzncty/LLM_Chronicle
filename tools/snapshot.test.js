const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const vm = require('node:vm');

const {
  extractUrlsFromFile,
  fetchSnapshot,
  loadIndex,
  parseCliArgs,
  saveIndex,
  upsertSource,
} = require('./snapshot');

const snapshotCli = path.join(__dirname, 'snapshot.js');

function runSnapshotCli(args) {
  return spawnSync(process.execPath, [snapshotCli, ...args], {
    encoding: 'utf8',
  });
}

function makeTempDir(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'llm-chronicle-snapshot-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return dir;
}

function findIndexFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findIndexFiles(entryPath));
    } else if (entry.name === 'index.json') {
      results.push(entryPath);
    }
  }
  return results;
}

function assertNoTempSnapshot(outputPath) {
  const outputDir = path.dirname(outputPath);
  const outputName = path.basename(outputPath);
  const tempFiles = fs.readdirSync(outputDir)
    .filter(name => name.startsWith(`.${outputName}.`) && name.endsWith('.tmp'));
  assert.deepEqual(tempFiles, []);
}

function writeIndex(monthDir, index) {
  fs.mkdirSync(monthDir, { recursive: true });
  fs.writeFileSync(
    path.join(monthDir, 'index.json'),
    `${JSON.stringify(index, null, 2)}\n`,
    'utf8',
  );
}

function fingerprint(filePath) {
  const content = fs.readFileSync(filePath);
  return {
    content,
    hash: crypto.createHash('sha256').update(content).digest('hex'),
  };
}

function assertUnchanged(filePath, before) {
  const after = fingerprint(filePath);
  assert.deepEqual(after.content, before.content);
  assert.equal(after.hash, before.hash);
}

function assertNoTempIndex(monthDir) {
  const tempFiles = fs.readdirSync(monthDir)
    .filter(name => name.startsWith('.index.json.') && name.endsWith('.tmp'));
  assert.deepEqual(tempFiles, []);
}

function withFsFault(method, implementation) {
  return new Proxy(fs, {
    get(target, property) {
      return property === method ? implementation : target[property];
    },
  });
}

function normalized(filePath) {
  return path.resolve(filePath).replace(/\\/g, '/');
}

function copySnapshotCli(root) {
  const toolsDir = path.join(root, 'tools');
  fs.mkdirSync(toolsDir, { recursive: true });
  for (const file of ['snapshot.js', 'extract_urls.js']) {
    fs.copyFileSync(path.join(__dirname, file), path.join(toolsDir, file));
  }
  return path.join(toolsDir, 'snapshot.js');
}

function noNetworkEnv(root) {
  const guardPath = path.join(root, 'forbid-network.cjs');
  fs.writeFileSync(guardPath, [
    "const childProcess = require('node:child_process');",
    "childProcess.execFileSync = () => { throw new Error('NETWORK_CALL_FORBIDDEN'); };",
    "global.fetch = async () => { throw new Error('NETWORK_CALL_FORBIDDEN'); };",
    '',
  ].join('\n'));
  return {
    ...process.env,
    NODE_OPTIONS: `--require=${guardPath}`,
  };
}

function guardedSnapshotEnv(root, forbiddenPath) {
  const guardPath = path.join(root, 'forbid-snapshot-read.cjs');
  fs.writeFileSync(guardPath, [
    "const fs = require('node:fs');",
    "const path = require('node:path');",
    "const childProcess = require('node:child_process');",
    "const forbidden = path.resolve(process.env.FORBIDDEN_SNAPSHOT_PATH).toLowerCase();",
    "for (const method of ['existsSync', 'statSync', 'lstatSync', 'readFileSync']) {",
    "  const original = fs[method];",
    "  fs[method] = function guarded(target, ...args) {",
    "    if (typeof target === 'string' && path.resolve(target).toLowerCase() === forbidden) {",
    "      throw new Error('FORBIDDEN_SNAPSHOT_READ');",
    "    }",
    "    return original.call(this, target, ...args);",
    "  };",
    "}",
    "childProcess.execFileSync = () => { throw new Error('NETWORK_CALL_FORBIDDEN'); };",
    "global.fetch = async () => { throw new Error('NETWORK_CALL_FORBIDDEN'); };",
    '',
  ].join('\n'));
  return {
    ...process.env,
    NODE_OPTIONS: `--require=${guardPath}`,
    FORBIDDEN_SNAPSHOT_PATH: forbiddenPath,
  };
}

test('the CLI rejects unknown options before starting snapshot work', () => {
  const result = runSnapshotCli([
    '--dry-run',
    '--url',
    'https://example.test/source',
    '--month',
    '2025-01',
    '--dry-rnu',
  ]);

  assert.equal(result.status, 2, result.stderr);
  assert.match(result.stderr, /Unknown option: --dry-rnu/);
  assert.match(result.stderr, /Usage:/);
  assert.doesNotMatch(result.stderr, /Discovered|Extracted|Dry run/);
});

test('parseCliArgs keeps valid file and manual URL invocations order-independent', () => {
  assert.deepEqual(
    parseCliArgs(['编年/2025/01.md', '--dry-run', '--text-only']),
    {
      dryRun: true,
      updateOnly: false,
      textOnly: true,
      iaOnly: false,
      screenshotOnly: false,
      singleUrl: null,
      singleMonth: null,
      fileArg: '编年/2025/01.md',
    },
  );
  assert.deepEqual(
    parseCliArgs([
      '--month',
      '2025-01',
      '--ia',
      '--url',
      'https://example.test/source',
    ]),
    {
      dryRun: false,
      updateOnly: false,
      textOnly: false,
      iaOnly: true,
      screenshotOnly: false,
      singleUrl: 'https://example.test/source',
      singleMonth: '2025-01',
      fileArg: null,
    },
  );
  assert.equal(
    parseCliArgs(['--dry-run', '--', '--source.md']).fileArg,
    '--source.md',
  );
});

test('parseCliArgs rejects incomplete or malformed manual URL arguments', () => {
  const invalidCases = [
    { args: ['--url'], message: /--url requires a value/ },
    { args: ['--url', '--month', '2025-01'], message: /--url requires a value/ },
    { args: ['--url', 'https://example.test/source'], message: /--url and --month must be used together/ },
    { args: ['--month', '2025-01'], message: /--url and --month must be used together/ },
    { args: ['--url', 'not-a-url', '--month', '2025-01'], message: /--url requires an HTTP or HTTPS URL/ },
    { args: ['--url', 'file:///tmp/source', '--month', '2025-01'], message: /--url requires an HTTP or HTTPS URL/ },
    { args: ['--url', 'https://example.test/source', '--month', '2025-13'], message: /--month requires YYYY-MM/ },
  ];

  for (const { args, message } of invalidCases) {
    assert.throws(() => parseCliArgs(args), message, args.join(' '));
  }
});

test('parseCliArgs rejects ambiguous inputs instead of silently ignoring them', () => {
  const invalidCases = [
    { args: [''], message: /Unexpected empty file argument/ },
    { args: ['--dry-run', '--dry-run'], message: /Duplicate option: --dry-run/ },
    {
      args: [
        '--url',
        'https://example.test/one',
        '--url',
        'https://example.test/two',
        '--month',
        '2025-01',
      ],
      message: /Duplicate option: --url/,
    },
    { args: ['one.md', 'two.md'], message: /Unexpected argument: two\.md/ },
    {
      args: ['one.md', '--url', 'https://example.test/source', '--month', '2025-01'],
      message: /file argument cannot be combined with --url and --month/,
    },
    { args: ['--text-only', '--ia'], message: /Mutually exclusive options: --text-only, --ia/ },
    { args: ['--update-only', '--screenshot'], message: /--update-only cannot be combined with --screenshot/ },
    { args: ['--update-only', '--dry-run'], message: /--update-only cannot be combined with --dry-run/ },
  ];

  for (const { args, message } of invalidCases) {
    assert.throws(() => parseCliArgs(args), message, args.join(' '));
  }
});

// Exercise the private screenshot helper without installing or launching Playwright.
function screenshotHarness({ failAt = null, closeError = null, closeBarrier = null, size = 2300 } = {}) {
  const vm = require('node:vm');
  const calls = [];
  const outputPath = path.join(os.tmpdir(), 'screenshot-lifetime-test.png');
  const url = 'https://example.com/screenshot';
  const visit = name => {
    calls.push(name);
    if (failAt === name) throw new Error(`${name} failed`);
  };
  const page = {
    async setViewportSize(options) {
      visit('viewport');
      assert.equal(options.width, 1280);
      assert.equal(options.height, 900);
    },
    async goto(target, options) {
      visit('goto');
      assert.equal(target, url);
      assert.equal(options.waitUntil, 'networkidle');
      assert.equal(options.timeout, 37000);
    },
    async waitForTimeout(delay) { visit('settle'); assert.equal(delay, 2000); },
    async screenshot(options) {
      visit('screenshot');
      assert.equal(options.path, outputPath);
      assert.equal(options.fullPage, true);
      assert.equal(options.type, 'png');
    },
  };
  const browser = {
    async newPage() { visit('newPage'); return page; },
    async close() {
      calls.push('close');
      if (closeBarrier) await closeBarrier;
      if (closeError) throw closeError;
    },
  };
  const sandbox = {
    module: { exports: {} }, __dirname, process, console,
    require(specifier) {
      if (specifier === 'playwright') {
        visit('require');
        return { chromium: { async launch(options) { visit('launch'); assert.equal(options.headless, true); return browser; } } };
      }
      if (specifier === 'fs') return {
        statSync(target) { visit('stat'); assert.equal(target, outputPath); return { size }; },
      };
      return require(specifier);
    },
  };
  vm.runInNewContext(
    fs.readFileSync(snapshotCli, 'utf8') + '\nmodule.exports.screenshotPage = screenshotPage;',
    sandbox, { filename: snapshotCli },
  );
  return { calls, run: () => sandbox.module.exports.screenshotPage(url, outputPath, 37) };
}

for (const failAt of ['newPage', 'viewport', 'goto', 'settle', 'screenshot', 'stat']) {
  test(`screenshotPage closes its acquired browser after ${failAt} failure`, async () => {
    const harness = screenshotHarness({ failAt });
    const result = await harness.run();
    assert.equal(result.ok, false);
    assert.equal(result.error, `${failAt} failed`);
    assert.equal(harness.calls.filter(call => call === 'close').length, 1);
  });
}

for (const failAt of ['require', 'launch']) {
  test(`screenshotPage does not close an unacquired browser after ${failAt} failure`, async () => {
    const harness = screenshotHarness({ failAt });
    const result = await harness.run();
    assert.equal(result.ok, false);
    assert.equal(result.error, `${failAt} failed`);
    assert.equal(harness.calls.includes('close'), false);
  });
}

test('screenshotPage retains screenshot metadata and closes once on success', async () => {
  for (const [size, sizeHuman, tooLarge] of [[2300, '2.2 KB', false], [2097152, '2.0 MB', true]]) {
    const harness = screenshotHarness({ size });
    const result = await harness.run();
    assert.deepEqual(JSON.parse(JSON.stringify(result)), { ok: true, size, size_human: sizeHuman, too_large: tooLarge });
    assert.equal(harness.calls.filter(call => call === 'close').length, 1);
  }
});

test('screenshotPage preserves the operation error if browser cleanup also fails', async () => {
  const harness = screenshotHarness({ failAt: 'goto', closeError: new Error('cleanup failed') });
  const result = await harness.run();
  assert.equal(result.ok, false);
  assert.equal(result.error, 'goto failed');
  assert.equal(harness.calls.filter(call => call === 'close').length, 1);
});

test('screenshotPage reports cleanup failure after an otherwise successful screenshot', async () => {
  const message = 'close failure '.repeat(30);
  const harness = screenshotHarness({ closeError: new Error(message) });
  const result = await harness.run();
  assert.equal(result.ok, false);
  assert.equal(result.error, message.substring(0, 200));
  assert.equal(harness.calls.filter(call => call === 'close').length, 1);
});

test('screenshotPage awaits acquired-browser cleanup before returning a failure', async () => {
  let releaseClose;
  const closeBarrier = new Promise(resolve => { releaseClose = resolve; });
  const harness = screenshotHarness({ failAt: 'screenshot', closeBarrier });
  let settled = false;
  const pending = harness.run().then(result => { settled = true; return result; });
  try {
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(harness.calls.filter(call => call === 'close').length, 1);
    assert.equal(settled, false);
  } finally {
    releaseClose();
  }
  const result = await pending;
  assert.equal(result.ok, false);
  assert.equal(result.error, 'screenshot failed');
});

test('fetchSnapshot passes untrusted values to curl as literal arguments', () => {
  const url = 'https://example.test/archive?name="$(echo injected)"&next=;touch marker';
  const outputPath = path.join(
    os.tmpdir(),
    `snapshot $(touch marker); ${crypto.randomBytes(8).toString('hex')}.html`,
  );
  let invocation;
  const executeFile = (file, args, options) => {
    invocation = { file, args, options };
    fs.writeFileSync(args[args.indexOf('-o') + 1], 'snapshot body', 'utf8');
    return '200|42|0.125';
  };

  const result = fetchSnapshot(url, outputPath, 7, executeFile);
  const publishedBody = fs.readFileSync(outputPath, 'utf8');
  fs.rmSync(outputPath, { force: true });

  assert.equal(invocation.file, 'curl');
  assert.equal(invocation.options.shell, false);
  assert.equal(invocation.args[invocation.args.indexOf('--max-time') + 1], '7');
  const stagedPath = invocation.args[invocation.args.indexOf('-o') + 1];
  assert.notEqual(stagedPath, outputPath);
  assert.equal(path.dirname(stagedPath), path.dirname(outputPath));
  assert.match(path.basename(stagedPath), /^\.snapshot \$\(touch marker\); [0-9a-f]+\.html\..+\.tmp$/);
  assert.deepEqual(invocation.args.slice(-2), ['--', url]);
  assert.equal(publishedBody, 'snapshot body');
  assertNoTempSnapshot(outputPath);
  assert.deepEqual(result, {
    ok: true,
    status: 200,
    size: 42,
    latency_sec: 0.125,
    too_large: false,
  });
});

test('all checked-in source indexes contain valid JSON', () => {
  const root = path.resolve(__dirname, '..');
  const indexFiles = findIndexFiles(path.join(root, 'sources'));

  assert.ok(indexFiles.length > 0, 'expected at least one source index');
  for (const indexPath of indexFiles) {
    let valid = true;
    try {
      JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    } catch {
      valid = false;
    }
    assert.ok(valid, `invalid JSON in ${path.relative(root, indexPath)}`);
  }
});

test('loadIndex initializes an index only when index.json is absent', t => {
  const monthDir = path.join(makeTempDir(t), '06');

  assert.deepEqual(loadIndex(monthDir), { month: '06', sources: [] });
});

test('loadIndex rethrows index read errors other than ENOENT', t => {
  const monthDir = makeTempDir(t);
  const readFailureFs = withFsFault('readFileSync', () => {
    const error = new Error('simulated read failure');
    error.code = 'EIO';
    throw error;
  });

  assert.throws(
    () => loadIndex(monthDir, readFailureFs),
    error => error.code === 'EIO',
  );
});

test('a valid index can be updated without dropping sibling sources', t => {
  const monthDir = makeTempDir(t);
  const index = {
    month: '2025-01',
    archive_note: 'preserve this top-level metadata',
    sources: [
      {
        url: 'https://example.test/source',
        title: 'Original title',
        snapshot: 'source.html',
        custom_metadata: { preserve: true },
      },
      {
        url: 'https://example.test/sibling',
        title: 'Sibling source',
        snapshot: 'sibling.html',
      },
    ],
  };
  writeIndex(monthDir, index);

  const loaded = loadIndex(monthDir);
  upsertSource(loaded, {
    url: 'https://example.test/source',
    snapshot: 'source-updated.html',
  });
  saveIndex(monthDir, loaded);

  const saved = loadIndex(monthDir);
  assert.equal(saved.archive_note, 'preserve this top-level metadata');
  assert.deepEqual(saved.sources[0], {
    url: 'https://example.test/source',
    title: 'Original title',
    snapshot: 'source-updated.html',
    custom_metadata: { preserve: true },
  });
  assert.deepEqual(saved.sources[1], index.sources[1]);
  assertNoTempIndex(monthDir);
});

test('loadIndex rejects malformed and whitespace-only JSON without echoing content', t => {
  const root = makeTempDir(t);
  const secret = 'sk-QA7x9';
  const urlToken = 'https://example.test/?token=URL-DO-NOT-ECHO';
  const fixtures = [
    `{"credential": ${secret}, "url": "${urlToken}"}\n`,
    '  \r\n\t',
  ];

  for (const [i, content] of fixtures.entries()) {
    const monthDir = path.join(root, String(i));
    fs.mkdirSync(monthDir, { recursive: true });
    const indexPath = path.join(monthDir, 'index.json');
    fs.writeFileSync(indexPath, content, 'utf8');

    assert.throws(
      () => loadIndex(monthDir),
      error => {
        assert.equal(
          error.message,
          `Invalid JSON in source index: ${normalized(indexPath)}`,
        );
        assert.doesNotMatch(error.message, new RegExp(secret));
        assert.doesNotMatch(error.message, /example\.test|URL-DO-NOT-ECHO/);
        return true;
      },
    );
  }
});

test('loadIndex rejects a valid JSON document whose sources value is not an array', t => {
  const monthDir = makeTempDir(t);
  const indexPath = path.join(monthDir, 'index.json');
  const secret = 'https://example.test/?token=DO-NOT-ECHO';
  fs.writeFileSync(
    indexPath,
    JSON.stringify({ month: '2025-01', sources: { secret } }),
    'utf8',
  );

  assert.throws(
    () => loadIndex(monthDir),
    error => {
      assert.equal(
        error.message,
        `Invalid source index schema (expected "sources" array): ${normalized(indexPath)}`,
      );
      assert.doesNotMatch(error.message, /example\.test|DO-NOT-ECHO/);
      return true;
    },
  );
});

test('loadIndex rejects non-object entries in a sources array', t => {
  const monthDir = makeTempDir(t);
  const indexPath = path.join(monthDir, 'index.json');
  fs.writeFileSync(
    indexPath,
    JSON.stringify({ month: '2025-01', sources: [null] }),
    'utf8',
  );

  assert.throws(
    () => loadIndex(monthDir),
    error => {
      assert.equal(
        error.message,
        `Invalid source index schema (expected source objects): ${normalized(indexPath)}`,
      );
      return true;
    },
  );
});

test('the CLI exits nonzero before replacing a malformed existing index', t => {
  const root = makeTempDir(t);
  const toolsDir = path.join(root, 'tools');
  const monthDir = path.join(root, 'sources', '2025', '01');
  fs.mkdirSync(toolsDir, { recursive: true });
  fs.mkdirSync(monthDir, { recursive: true });
  const scriptPath = path.join(toolsDir, 'snapshot.js');
  fs.copyFileSync(path.join(__dirname, 'snapshot.js'), scriptPath);
  fs.copyFileSync(
    path.join(__dirname, 'extract_urls.js'),
    path.join(toolsDir, 'extract_urls.js'),
  );

  const indexPath = path.join(monthDir, 'index.json');
  const secret = 'sk-QA7x9';
  const urlToken = 'https://example.test/?token=CLI-URL-DO-NOT-ECHO';
  const malformed = `{"credential": ${secret}, "url": "${urlToken}"}\n`;
  fs.writeFileSync(indexPath, malformed, 'utf8');
  const before = fingerprint(indexPath);

  const result = spawnSync(
    process.execPath,
    [
      scriptPath,
      '--update-only',
      '--url',
      'https://example.test/archive/source',
      '--month',
      '2025-01',
    ],
    {
      encoding: 'utf8',
    },
  );

  assert.equal(result.status, 2, result.stderr);
  assert.match(result.stderr, /Invalid JSON in source index/);
  assert.match(result.stderr, /index\.json/);
  assert.doesNotMatch(result.stderr, new RegExp(secret));
  assert.doesNotMatch(result.stderr, /example\.test|CLI-URL-DO-NOT-ECHO/);
  assertUnchanged(indexPath, before);
  assertNoTempIndex(monthDir);
});

test('--update-only refreshes the snapshot registered for the same URL', t => {
  const root = makeTempDir(t);
  const scriptPath = copySnapshotCli(root);
  const monthDir = path.join(root, 'sources', '2025', '01');
  const url = 'https://example.test/archive/source?revision=1';
  const snapshot = 'example-test-archive-source.html';
  const snapshotPath = path.join(monthDir, snapshot);
  const snapshotContent = Buffer.from('<html>refreshed metadata</html>\n');

  writeIndex(monthDir, {
    month: '2025-01',
    sources: [{
      url,
      snapshot,
      file_size: 1,
      custom_metadata: { preserve: true },
    }],
  });
  fs.writeFileSync(snapshotPath, snapshotContent);
  const beforeSnapshot = fingerprint(snapshotPath);

  const result = spawnSync(
    process.execPath,
    [scriptPath, '--update-only', '--url', url, '--month', '2025-01'],
    { encoding: 'utf8', env: noNetworkEnv(root) },
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stderr, /— indexed/);
  assert.doesNotMatch(result.stderr, /snapshot missing/);
  assert.doesNotMatch(result.stderr, /NETWORK_CALL_FORBIDDEN/);
  assertUnchanged(snapshotPath, beforeSnapshot);

  const saved = loadIndex(monthDir);
  assert.equal(saved.sources.length, 1);
  assert.equal(saved.sources[0].url, url);
  assert.equal(saved.sources[0].snapshot, snapshot);
  assert.equal(saved.sources[0].file_size, snapshotContent.length);
  assert.deepEqual(saved.sources[0].custom_metadata, { preserve: true });
  assertNoTempIndex(monthDir);
});

test('--update-only allocates a suffix only for a different URL with the same slug', t => {
  const root = makeTempDir(t);
  const scriptPath = copySnapshotCli(root);
  const monthDir = path.join(root, 'sources', '2025', '01');
  const originalUrl = 'https://example.test/archive/source?revision=1';
  const newUrl = 'https://example.test/archive/source?revision=2';
  const baseSnapshot = 'example-test-archive-source.html';
  const collisionSnapshot = 'example-test-archive-source-02.html';
  const collisionContent = Buffer.from('<html>second URL</html>\n');

  writeIndex(monthDir, {
    month: '2025-01',
    sources: [{
      url: originalUrl,
      snapshot: baseSnapshot,
      custom_metadata: { preserve: true },
    }],
  });
  fs.writeFileSync(path.join(monthDir, baseSnapshot), '<html>first URL</html>\n');
  fs.writeFileSync(path.join(monthDir, collisionSnapshot), collisionContent);

  const result = spawnSync(
    process.execPath,
    [scriptPath, '--update-only', '--url', newUrl, '--month', '2025-01'],
    { encoding: 'utf8' },
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stderr, /— indexed/);
  assert.doesNotMatch(result.stderr, /snapshot missing/);

  const saved = loadIndex(monthDir);
  assert.equal(saved.sources.length, 2);
  assert.deepEqual(saved.sources.find(source => source.url === originalUrl), {
    url: originalUrl,
    snapshot: baseSnapshot,
    custom_metadata: { preserve: true },
  });
  const added = saved.sources.find(source => source.url === newUrl);
  assert.equal(added.snapshot, collisionSnapshot);
  assert.equal(added.file_size, collisionContent.length);
  assertNoTempIndex(monthDir);
});

test('--update-only reuses only safe snapshot basenames for the same URL', t => {
  const unsafeSnapshots = [
    ['POSIX traversal', '../../../outside-posix.html', true],
    ['Windows traversal', '..\\..\\..\\outside-windows.html', true],
    ['POSIX absolute path', '/outside-posix-absolute.html', false],
    ['Windows absolute path', 'C:\\outside-windows-absolute.html', false],
    ['Windows drive-relative path', 'C:outside-windows.html', false],
    ['Windows UNC path', '\\\\server\\share\\outside.html', false],
    ['Windows device namespace', '\\\\?\\C:\\outside.html', false],
    ['Windows UNC device namespace', '\\\\?\\UNC\\server\\share\\outside.html', false],
    ['forward-slash device namespace', '//?/C:/outside.html', false],
    ['nested POSIX path', 'nested/snapshot.html', false],
    ['nested Windows path', 'nested\\snapshot.html', false],
    ['current directory', '.', false],
    ['parent directory', '..', false],
    ['empty string', '', false],
    ['NUL byte', 'snapshot\0.html', false],
    ['non-string value', { filename: 'outside.html' }, false],
    ['NTFS default data stream', 'snapshot.html::$DATA', false],
    ['NTFS named data stream', 'carrier.html:secret-stream', false],
    ['Windows trailing dot', 'snapshot.html.', false],
    ['Windows trailing space', 'snapshot.html ', false],
    ['Windows less-than sign', 'snapshot<name.html', false],
    ['Windows greater-than sign', 'snapshot>name.html', false],
    ['Windows double quote', 'snapshot"name.html', false],
    ['Windows pipe', 'snapshot|name.html', false],
    ['Windows question mark', 'snapshot?name.html', false],
    ['Windows asterisk', 'snapshot*name.html', false],
    ['Windows C0 control', 'snapshot\u0001name.html', false],
    ['DOS CON bare', 'CON', false],
    ['DOS CON extension', 'cOn.html', false],
    ['DOS PRN bare', 'PRN', false],
    ['DOS PRN extension', 'prn.snapshot', false],
    ['DOS AUX bare', 'AUX', false],
    ['DOS AUX extension', 'aux.HTML', false],
    ['DOS NUL bare', 'NUL', false],
    ['DOS NUL extension', 'nul.html', false],
    ...Array.from({ length: 9 }, (_, index) => [
      `DOS COM${index + 1}`,
      `CoM${index + 1}.snapshot`,
      false,
    ]),
    ...Array.from({ length: 9 }, (_, index) => [
      `DOS LPT${index + 1}`,
      `LpT${index + 1}.snapshot`,
      false,
    ]),
    ['DOS COM superscript one', 'COM¹.html', false],
    ['DOS COM superscript two', 'com².snapshot', false],
    ['DOS COM superscript three', 'COM³.html', false],
    ['DOS LPT superscript one', 'LPT¹.html', false],
    ['DOS LPT superscript two', 'lpt².snapshot', false],
    ['DOS LPT superscript three', 'LPT³.html', false],
    ['DOS stem with a space before extension', 'CON .html', false],
    ['legacy CLOCK$ device', 'CLOCK$.html', false],
    ['legacy CONIN$ device', 'CONIN$.snapshot', false],
    ['legacy CONOUT$ device', 'CONOUT$.html', false],
  ];

  for (const [label, registeredSnapshot, createDecoy] of unsafeSnapshots) {
    const root = makeTempDir(t);
    const scriptPath = copySnapshotCli(root);
    const monthDir = path.join(root, 'sources', '2025', '01');
    const url = 'https://example.test/archive/source?revision=1';
    const safeSnapshot = 'example-test-archive-source.html';
    const safePath = path.join(monthDir, safeSnapshot);
    const safeContent = Buffer.from(`<html>${label}</html>\n`);
    const originalSource = {
      url,
      snapshot: registeredSnapshot,
      file_size: 1,
      custom_metadata: { label },
    };

    writeIndex(monthDir, { month: '2025-01', sources: [originalSource] });
    fs.writeFileSync(safePath, safeContent);

    let decoyPath = null;
    let beforeDecoy = null;
    if (createDecoy) {
      decoyPath = path.join(monthDir, registeredSnapshot);
      fs.mkdirSync(path.dirname(decoyPath), { recursive: true });
      fs.writeFileSync(decoyPath, `<html>must not be reused: ${label}</html>\n`);
      beforeDecoy = fingerprint(decoyPath);
    }

    const guardableSnapshot = typeof registeredSnapshot === 'string'
      && registeredSnapshot.length > 0
      && !registeredSnapshot.includes('\0');
    const env = guardableSnapshot
      ? guardedSnapshotEnv(root, path.join(monthDir, registeredSnapshot))
      : noNetworkEnv(root);
    const result = spawnSync(
      process.execPath,
      [scriptPath, '--update-only', '--url', url, '--month', '2025-01'],
      { encoding: 'utf8', env },
    );

    assert.equal(result.status, 0, `${label}: ${result.stderr}`);
    assert.match(result.stderr, /— indexed/, label);
    assert.doesNotMatch(result.stderr, /snapshot missing/, label);
    assert.doesNotMatch(result.stderr, /FORBIDDEN_SNAPSHOT_READ/, label);

    const saved = loadIndex(monthDir);
    assert.equal(saved.sources.length, 1, label);
    assert.equal(saved.sources[0].snapshot, safeSnapshot, label);
    assert.equal(saved.sources[0].file_size, safeContent.length, label);
    assert.deepEqual(saved.sources[0].custom_metadata, { label }, label);
    if (decoyPath) assertUnchanged(decoyPath, beforeDecoy);
    assertNoTempIndex(monthDir);
  }

  const root = makeTempDir(t);
  const scriptPath = copySnapshotCli(root);
  const monthDir = path.join(root, 'sources', '2025', '01');
  const url = 'https://example.test/archive/missing?revision=1';
  const registeredSnapshot = '../../../outside-only.html';
  const originalSource = {
    url,
    snapshot: registeredSnapshot,
    file_size: 7,
    custom_metadata: { preserve: true },
  };
  const decoyPath = path.join(monthDir, registeredSnapshot);

  writeIndex(monthDir, { month: '2025-01', sources: [originalSource] });
  fs.mkdirSync(path.dirname(decoyPath), { recursive: true });
  fs.writeFileSync(decoyPath, '<html>outside-only sentinel</html>\n');
  const beforeDecoy = fingerprint(decoyPath);

  const result = spawnSync(
    process.execPath,
    [scriptPath, '--update-only', '--url', url, '--month', '2025-01'],
    { encoding: 'utf8' },
  );
  const warningLines = result.stderr
    .split(/\r?\n/)
    .filter(line => line.includes('snapshot missing'));

  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(warningLines, [
    '  ⚠ example-test-archive-missing — snapshot missing, use without --update-only to fetch',
  ]);
  assert.doesNotMatch(result.stderr, /outside-only/);
  assert.deepEqual(loadIndex(monthDir).sources, [originalSource]);
  assertUnchanged(decoyPath, beforeDecoy);
  assertNoTempIndex(monthDir);
});

test('--update-only preserves portable basename edge cases', t => {
  const safeSnapshots = [
    'historical custom name.snapshot',
    '历史快照.HTML',
    '.snapshot',
    'COM0.html',
    'LPT0.snapshot',
    'COM10.html',
    'LPT10.snapshot',
  ];

  for (const snapshot of safeSnapshots) {
    const root = makeTempDir(t);
    const scriptPath = copySnapshotCli(root);
    const monthDir = path.join(root, 'sources', '2025', '01');
    const url = 'https://example.test/archive/source?revision=1';
    const snapshotContent = Buffer.from(`<html>${snapshot}</html>\n`);
    writeIndex(monthDir, {
      month: '2025-01',
      sources: [{ url, snapshot, custom_metadata: { preserve: true } }],
    });
    fs.writeFileSync(path.join(monthDir, snapshot), snapshotContent);

    const result = spawnSync(
      process.execPath,
      [scriptPath, '--update-only', '--url', url, '--month', '2025-01'],
      { encoding: 'utf8', env: noNetworkEnv(root) },
    );

    assert.equal(result.status, 0, `${snapshot}: ${result.stderr}`);
    assert.match(result.stderr, /— indexed/, snapshot);
    const saved = loadIndex(monthDir);
    assert.equal(saved.sources.length, 1, snapshot);
    assert.equal(saved.sources[0].snapshot, snapshot);
    assert.equal(saved.sources[0].file_size, snapshotContent.length);
    assert.deepEqual(saved.sources[0].custom_metadata, { preserve: true });
    assertNoTempIndex(monthDir);
  }
});

test('--update-only does not reuse a same-ref snapshot after its URL changes', t => {
  const root = makeTempDir(t);
  const scriptPath = copySnapshotCli(root);
  const monthDir = path.join(root, 'sources', '2025', '01');
  const chroniclePath = path.join(root, '编年', '2025', '01.md');
  const originalUrl = 'https://example.test/archive/source?revision=1';
  const editedUrl = 'https://example.test/archive/source?revision=2';
  const baseSnapshot = 'example-test-archive-source.html';
  const editedSnapshot = 'example-test-archive-source-02.html';
  const basePath = path.join(monthDir, baseSnapshot);
  const editedPath = path.join(monthDir, editedSnapshot);
  const editedContent = Buffer.from('<html>edited URL</html>\n');

  writeIndex(monthDir, {
    month: '2025-01',
    sources: [{
      ref: '^7',
      url: originalUrl,
      snapshot: baseSnapshot,
      custom_metadata: { preserve: true },
    }],
  });
  fs.writeFileSync(basePath, '<html>original URL</html>\n');
  fs.writeFileSync(editedPath, editedContent);
  fs.mkdirSync(path.dirname(chroniclePath), { recursive: true });
  fs.writeFileSync(chroniclePath, `[^7]: ${editedUrl}\n`, 'utf8');
  const beforeBase = fingerprint(basePath);
  const beforeEdited = fingerprint(editedPath);

  const result = spawnSync(
    process.execPath,
    [scriptPath, '--update-only', chroniclePath],
    { encoding: 'utf8' },
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stderr, /— indexed/);
  assert.doesNotMatch(result.stderr, /snapshot missing/);
  assertUnchanged(basePath, beforeBase);
  assertUnchanged(editedPath, beforeEdited);

  const saved = loadIndex(monthDir);
  assert.equal(saved.sources.length, 1);
  assert.equal(saved.sources[0].ref, '^7');
  assert.equal(saved.sources[0].url, editedUrl);
  assert.equal(saved.sources[0].snapshot, editedSnapshot);
  assert.equal(saved.sources[0].file_size, editedContent.length);
  assert.deepEqual(saved.sources[0].custom_metadata, { preserve: true });
  assertNoTempIndex(monthDir);
});

test('the no-file CLI discovers live chronicle URLs without using a cache', t => {
  const root = makeTempDir(t);
  const toolsDir = path.join(root, 'tools');
  const chronicleDir = path.join(root, '编年', '2026');
  const docsDir = path.join(root, 'docs');
  fs.mkdirSync(toolsDir, { recursive: true });
  fs.mkdirSync(chronicleDir, { recursive: true });
  fs.mkdirSync(docsDir, { recursive: true });

  const scriptPath = path.join(toolsDir, 'snapshot.js');
  fs.copyFileSync(path.join(__dirname, 'snapshot.js'), scriptPath);
  fs.copyFileSync(
    path.join(__dirname, 'extract_urls.js'),
    path.join(toolsDir, 'extract_urls.js'),
  );
  fs.writeFileSync(
    path.join(chronicleDir, '09.md'),
    'current: https://chronicle.example.test/current\n',
    'utf8',
  );
  fs.writeFileSync(
    path.join(docsDir, 'notes.md'),
    'docs only: https://docs.example.test/excluded\n',
    'utf8',
  );

  const cachePath = path.join(toolsDir, 'urls.json');
  fs.writeFileSync(
    cachePath,
    JSON.stringify([
      {
        file: '编年/2020/01.md',
        line: 1,
        url: 'https://cache.example.test/stale',
      },
    ]),
    'utf8',
  );

  const runDry = () => spawnSync(
    process.execPath,
    [scriptPath, '--dry-run'],
    { encoding: 'utf8' },
  );

  const withStaleCache = runDry();
  assert.equal(withStaleCache.status, 0, withStaleCache.stderr);
  assert.match(
    withStaleCache.stderr,
    /Discovered 1 URLs from 1 chronicle Markdown file\(s\)/,
  );
  assert.match(withStaleCache.stderr, /https:\/\/chronicle\.example\.test\/current/);
  assert.doesNotMatch(withStaleCache.stderr, /docs\.example\.test/);
  assert.doesNotMatch(withStaleCache.stderr, /cache\.example\.test/);

  fs.unlinkSync(cachePath);
  const withoutCache = runDry();
  assert.equal(withoutCache.status, 0, withoutCache.stderr);
  assert.equal(withoutCache.stderr, withStaleCache.stderr);
});

test('the explicit-file CLI uses the shared URL boundary rules', t => {
  const root = makeTempDir(t);
  const toolsDir = path.join(root, 'tools');
  const chronicleDir = path.join(root, '编年', '2026');
  fs.mkdirSync(toolsDir, { recursive: true });
  fs.mkdirSync(chronicleDir, { recursive: true });

  const scriptPath = path.join(toolsDir, 'snapshot.js');
  fs.copyFileSync(path.join(__dirname, 'snapshot.js'), scriptPath);
  fs.copyFileSync(
    path.join(__dirname, 'extract_urls.js'),
    path.join(toolsDir, 'extract_urls.js'),
  );

  const filePath = path.join(chronicleDir, '09.md');
  const expectedUrls = [
    'https://en.wikipedia.org/wiki/Llama_(language_model)',
    'HTTPS://EXAMPLE.TEST/Release',
    'https://www.80aj.com/前沿/20260409/',
  ];
  fs.writeFileSync(filePath, [
    `[^1]: [Wikipedia](${expectedUrls[0]}).`,
    `[^2]: <${expectedUrls[1]}>.`,
    `[^3]: ${expectedUrls[2]}。`,
  ].join('\n'), 'utf8');

  const result = spawnSync(
    process.execPath,
    [scriptPath, '--dry-run', filePath],
    { encoding: 'utf8' },
  );

  assert.equal(result.status, 0, result.stderr);
  const listedUrls = result.stderr
    .split(/\r\n|\n|\r/)
    .map(line => line.trim())
    .filter(line => /^https?:\/\//i.test(line));
  assert.deepEqual(listedUrls, expectedUrls);
  assert.deepEqual(
    extractUrlsFromFile(filePath).map(({ line, url, ref }) => ({ line, url, ref })),
    expectedUrls.map((url, index) => ({
      line: index + 1,
      url,
      ref: `^${index + 1}`,
    })),
  );
});

test('saveIndex preserves the original index when a write fails after partial output', t => {
  const monthDir = makeTempDir(t);
  const indexPath = path.join(monthDir, 'index.json');
  writeIndex(monthDir, {
    month: '2025-01',
    sources: [{ url: 'https://example.test/original' }],
  });
  const before = fingerprint(indexPath);
  const partialWriteFs = withFsFault('writeFileSync', fd => {
    fs.writeFileSync(fd, '{"partial":', 'utf8');
    const error = new Error('simulated disk full');
    error.code = 'ENOSPC';
    throw error;
  });

  assert.throws(
    () => saveIndex(monthDir, { month: '2025-01', sources: [] }, partialWriteFs),
    error => error.code === 'ENOSPC',
  );
  assertUnchanged(indexPath, before);
  assertNoTempIndex(monthDir);
});

test('saveIndex preserves the original index when atomic rename fails', t => {
  const monthDir = makeTempDir(t);
  const indexPath = path.join(monthDir, 'index.json');
  writeIndex(monthDir, {
    month: '2025-01',
    sources: [{ url: 'https://example.test/original' }],
  });
  const before = fingerprint(indexPath);
  const renameFailureFs = withFsFault('renameSync', () => {
    const error = new Error('simulated rename failure');
    error.code = 'EACCES';
    throw error;
  });

  assert.throws(
    () => saveIndex(monthDir, { month: '2025-01', sources: [] }, renameFailureFs),
    error => error.code === 'EACCES',
  );
  assertUnchanged(indexPath, before);
  assertNoTempIndex(monthDir);
});

test('fetchSnapshot preserves an existing snapshot when curl fails after partial output', t => {
  const outputPath = path.join(makeTempDir(t), 'existing.html');
  const original = Buffer.from('known-good snapshot');
  fs.writeFileSync(outputPath, original);

  const result = fetchSnapshot(
    'https://example.test/archive',
    outputPath,
    7,
    (_file, args) => {
      fs.writeFileSync(args[args.indexOf('-o') + 1], Buffer.alloc(512, 0x78));
      const error = new Error('simulated curl timeout');
      error.stderr = Buffer.from('curl: timed out');
      throw error;
    },
  );

  assert.equal(result.ok, false);
  assert.match(result.error, /timed out/);
  assert.deepEqual(fs.readFileSync(outputPath), original);
  assertNoTempSnapshot(outputPath);
});

test('fetchSnapshot replaces an existing snapshot only after a successful response', t => {
  const outputPath = path.join(makeTempDir(t), 'existing.html');
  fs.writeFileSync(outputPath, 'old snapshot', 'utf8');

  const result = fetchSnapshot(
    'https://example.test/archive',
    outputPath,
    7,
    (_file, args) => {
      fs.writeFileSync(args[args.indexOf('-o') + 1], 'new snapshot', 'utf8');
      assert.equal(fs.readFileSync(outputPath, 'utf8'), 'old snapshot');
      return '200|12|0.125';
    },
  );

  assert.equal(result.ok, true);
  assert.equal(fs.readFileSync(outputPath, 'utf8'), 'new snapshot');
  assertNoTempSnapshot(outputPath);
});

test('fetchSnapshot does not publish a large HTTP error response', t => {
  const outputPath = path.join(makeTempDir(t), 'error.html');

  const result = fetchSnapshot(
    'https://example.test/archive',
    outputPath,
    7,
    (_file, args) => {
      fs.writeFileSync(args[args.indexOf('-o') + 1], Buffer.alloc(512, 0x65));
      return '503|512|0.250';
    },
  );

  assert.equal(result.ok, false);
  assert.equal(result.status, 503);
  assert.equal(fs.existsSync(outputPath), false);
  assertNoTempSnapshot(outputPath);
});

test('fetchSnapshot preserves an existing snapshot when publication fails', t => {
  const outputPath = path.join(makeTempDir(t), 'existing.html');
  const original = Buffer.from('known-good snapshot');
  fs.writeFileSync(outputPath, original);
  const renameFailureFs = withFsFault('renameSync', () => {
    const error = new Error('simulated rename failure');
    error.code = 'EACCES';
    throw error;
  });

  const result = fetchSnapshot(
    'https://example.test/archive',
    outputPath,
    7,
    (_file, args) => {
      fs.writeFileSync(args[args.indexOf('-o') + 1], 'replacement', 'utf8');
      return '200|11|0.125';
    },
    renameFailureFs,
  );

  assert.equal(result.ok, false);
  assert.match(result.error, /rename failure/);
  assert.deepEqual(fs.readFileSync(outputPath), original);
  assertNoTempSnapshot(outputPath);
});

test('a failed CLI refresh preserves metadata for the last known-good snapshot', t => {
  const root = makeTempDir(t);
  const toolsDir = path.join(root, 'tools');
  const monthDir = path.join(root, 'sources', '2025', '01');
  fs.mkdirSync(toolsDir, { recursive: true });
  fs.mkdirSync(monthDir, { recursive: true });

  for (const file of ['snapshot.js', 'extract_urls.js']) {
    fs.copyFileSync(path.join(__dirname, file), path.join(toolsDir, file));
  }

  const url = 'https://example.test/archive/source';
  const snapshot = 'example-test-archive-source.html';
  const snapshotPath = path.join(monthDir, snapshot);
  const snapshotBody = Buffer.from('<html>known-good snapshot</html>\n');
  const source = {
    ref: '[^7]',
    url,
    title: 'Known-good source',
    snapshot,
    archived_at: '2026-08-31',
    file_size: snapshotBody.length,
    file_size_human: `${snapshotBody.length} B`,
    curl_status: 200,
  };
  writeIndex(monthDir, { month: '2025-01', sources: [source] });
  fs.writeFileSync(snapshotPath, snapshotBody);
  const beforeSnapshot = fingerprint(snapshotPath);

  const guardPath = path.join(root, 'fail-curl.cjs');
  fs.writeFileSync(guardPath, [
    "const fs = require('node:fs');",
    "const childProcess = require('node:child_process');",
    "childProcess.execFileSync = (_file, args) => {",
    "  fs.writeFileSync(args[args.indexOf('-o') + 1], 'partial response');",
    "  const error = new Error('NETWORK_CALL_FORBIDDEN');",
    "  error.stderr = Buffer.from('curl: simulated refresh failure');",
    "  throw error;",
    "};",
    '',
  ].join('\n'));

  const result = spawnSync(
    process.execPath,
    [
      path.join(toolsDir, 'snapshot.js'),
      '--text-only',
      '--url',
      url,
      '--month',
      '2025-01',
    ],
    {
      encoding: 'utf8',
      env: {
        ...process.env,
        NODE_OPTIONS: `--require=${guardPath}`,
      },
    },
  );

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stderr, /simulated refresh failure/);
  assert.doesNotMatch(result.stderr, /NETWORK_CALL_FORBIDDEN/);
  assertUnchanged(snapshotPath, beforeSnapshot);

  const saved = loadIndex(monthDir);
  assert.equal(saved.sources.length, 1);
  assert.equal(saved.sources[0].snapshot, source.snapshot);
  assert.equal(saved.sources[0].archived_at, source.archived_at);
  assert.equal(saved.sources[0].file_size, source.file_size);
  assert.equal(saved.sources[0].file_size_human, source.file_size_human);
  assert.match(saved.sources[0].curl_status, /simulated refresh failure/);
  assert.equal(
    fs.existsSync(path.join(monthDir, 'example-test-archive-source-02.html')),
    false,
  );
  assertNoTempIndex(monthDir);
});

function waybackProbe(request) {
  const pending = new Map();
  const scheduled = [];
  const cleared = [];
  let nextHandle = 0;
  // Keep the production helper private and exercise it with an isolated clock
  // and request transport. No real timer, fetch, or CLI operation is started.
  const archive = vm.runInNewContext(
    `${fs.readFileSync(snapshotCli, 'utf8')}\narchiveToWayback;`,
    {
      require,
      module: { exports: {} },
      __dirname,
      AbortController,
      fetch: request,
      console: { error() {} },
      setTimeout(callback, delay) {
        const handle = nextHandle++;
        pending.set(handle, callback);
        scheduled.push(delay);
        return handle;
      },
      clearTimeout(handle) {
        cleared.push(handle);
        pending.delete(handle);
      },
    },
    { filename: snapshotCli },
  );
  return { archive, pending, scheduled, cleared };
}

function abortRejection(signal, reject) {
  signal.addEventListener('abort', () => {
    const error = new Error('simulated request abort');
    error.name = 'AbortError';
    reject(error);
  }, { once: true });
}

test('Wayback clears its deadline when the request fails before headers', async () => {
  const probe = waybackProbe(async () => {
    throw new Error('simulated connection failure');
  });
  const result = await probe.archive('https://example.test/source');
  assert.equal(result.ok, false);
  assert.equal(result.error, 'simulated connection failure');
  assert.deepEqual(probe.scheduled, [60_000]);
  assert.deepEqual(probe.cleared, [0]);
  assert.equal(probe.pending.size, 0);
});

test('Wayback keeps its deadline active while reading a successful response body', async () => {
  let activeDuringBody;
  let requestOptions;
  const probe = waybackProbe(async (url, options) => {
    assert.equal(url, 'https://web.archive.org/save/https%3A%2F%2Fexample.test%2Fsource');
    requestOptions = options;
    return {
      ok: true,
      status: 200,
      async text() {
        activeDuringBody = probe.pending.size;
        return JSON.stringify({ url: 'https://web.archive.org/web/example', job_id: 'job' });
      },
    };
  });
  const result = await probe.archive('https://example.test/source');
  assert.equal(activeDuringBody, 1);
  assert.equal(requestOptions.method, 'GET');
  assert.equal(requestOptions.redirect, 'follow');
  assert.equal(requestOptions.signal.aborted, false);
  assert.equal(result.ok, true);
  assert.equal(result.wayback_url, 'https://web.archive.org/web/example');
  assert.equal(result.job_id, 'job');
  assert.deepEqual(probe.cleared, [0]);
  assert.equal(probe.pending.size, 0);
});

test('Wayback clears its deadline when reading the response body fails', async () => {
  let activeDuringBody;
  const probe = waybackProbe(async () => ({
    ok: true,
    status: 200,
    async text() {
      activeDuringBody = probe.pending.size;
      throw new Error('simulated body failure');
    },
  }));
  const result = await probe.archive('https://example.test/source');
  assert.equal(activeDuringBody, 1);
  assert.equal(result.ok, false);
  assert.equal(result.error, 'simulated body failure');
  assert.deepEqual(probe.cleared, [0]);
  assert.equal(probe.pending.size, 0);
});

test('Wayback aborts a request stalled before response headers and clears its deadline', async () => {
  const probe = waybackProbe((_url, { signal }) => new Promise((_resolve, reject) => {
    abortRejection(signal, reject);
  }));
  const completion = probe.archive('https://example.test/source');
  assert.equal(probe.pending.size, 1);
  probe.pending.get(0)();
  const result = await completion;
  assert.equal(result.ok, false);
  assert.equal(result.error, 'IA timeout after 60s');
  assert.deepEqual(probe.cleared, [0]);
  assert.equal(probe.pending.size, 0);
});

test('Wayback aborts a stalled response body under the same request deadline', async () => {
  let reportBodyStarted;
  const bodyStarted = new Promise(resolve => { reportBodyStarted = resolve; });
  const probe = waybackProbe(async (_url, { signal }) => ({
    ok: true,
    status: 200,
    text: () => new Promise((_resolve, reject) => {
      abortRejection(signal, reject);
      reportBodyStarted();
    }),
  }));
  const completion = probe.archive('https://example.test/source');
  await bodyStarted;
  assert.equal(probe.pending.size, 1);
  probe.pending.get(0)();
  const result = await completion;
  assert.equal(result.ok, false);
  assert.equal(result.error, 'IA timeout after 60s');
  assert.deepEqual(probe.cleared, [0]);
  assert.equal(probe.pending.size, 0);
});

test('Wayback releases the deadline for existing non-success response outcomes', async () => {
  for (const [status, body, ok, expected] of [
    [503, '<html>unavailable</html>', false, 'IA returned HTTP 503: <html>unavailable</html>'],
    [200, JSON.stringify({ message: 'queued' }), false, 'IA returned HTTP 200: {"message":"queued"}'],
    [409, JSON.stringify({ url: 'https://web.archive.org/web/existing' }), true, 'https://web.archive.org/web/existing'],
  ]) {
    const probe = waybackProbe(async () => ({
      ok: status === 200,
      status,
      text: async () => body,
    }));
    const result = await probe.archive('https://example.test/source');
    assert.equal(result.ok, ok);
    assert.equal(ok ? result.wayback_url : result.error, expected);
    assert.deepEqual(probe.cleared, [0]);
    assert.equal(probe.pending.size, 0);
  }
});
