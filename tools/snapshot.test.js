const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');

const {
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
