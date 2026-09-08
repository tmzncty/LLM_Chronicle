const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

const { collectUrls, extractUrls, findMd, trimUrlCandidate } = require('./extract_urls');

function makeTempDir(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'llm-chronicle-urls-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return dir;
}

test('extractUrls removes prose delimiters and keeps balanced URL parentheses', () => {
  const content = [
    'Quoted: "https://example.test/release",',
    '[Wiki](https://en.wikipedia.org/wiki/Llama_(language_model)).',
    '中文：https://example.test/article（存档：https://archive.example.test/page）',
    '<https://example.test/autolink>.',
    '[IPv6](http://[2001:db8::1]/path).',
    '中文路径：https://www.80aj.com/前沿/20260409/。',
    '中文查询：https://www.baidu.com/s?wd=百度深度学习研究院；',
  ].join('\n');

  assert.deepEqual(extractUrls(content), [
    { url: 'https://example.test/release', line: 1 },
    { url: 'https://en.wikipedia.org/wiki/Llama_(language_model)', line: 2 },
    { url: 'https://example.test/article', line: 3 },
    { url: 'https://archive.example.test/page', line: 3 },
    { url: 'https://example.test/autolink', line: 4 },
    { url: 'http://[2001:db8::1]/path', line: 5 },
    { url: 'https://www.80aj.com/前沿/20260409/', line: 6 },
    { url: 'https://www.baidu.com/s?wd=百度深度学习研究院', line: 7 },
  ]);
});

test('extractUrls accepts case-insensitive HTTP schemes and skips malformed URLs', () => {
  const content = [
    'HTTPS://EXAMPLE.TEST/valid',
    'https://example.test:invalid-port/path',
    'http://[not-an-ipv6-address]/',
    'https://example.test/{placeholder}',
    'https://example.test/\\template',
  ].join('\n');

  assert.deepEqual(extractUrls(content), [
    { url: 'HTTPS://EXAMPLE.TEST/valid', line: 1 },
  ]);
});

test('trimUrlCandidate removes only unmatched closing delimiters', () => {
  assert.equal(
    trimUrlCandidate('https://example.test/a_(balanced)'),
    'https://example.test/a_(balanced)',
  );
  assert.equal(
    trimUrlCandidate('https://example.test/a_(balanced))).'),
    'https://example.test/a_(balanced)',
  );
  assert.equal(
    trimUrlCandidate('http://[2001:db8::1]/path]'),
    'http://[2001:db8::1]/path',
  );
  assert.equal(
    trimUrlCandidate('https://example.test/path[segment]'),
    'https://example.test/path[segment]',
  );
});

test('extractUrls rejects template destinations instead of truncating to live parents', () => {
  const content = [
    'https://web.archive.org/save/{url}',
    'https://example.test/path/...',
    '[placeholder](https://example.test/path/...).',
  ].join('\n');

  assert.deepEqual(extractUrls(content), []);
});

test('extractUrls separates adjacent Markdown link destinations without whitespace', () => {
  assert.deepEqual(
    extractUrls('[first](https://one.example/a)[second](https://two.example/b)'),
    [
      { url: 'https://one.example/a', line: 1 },
      { url: 'https://two.example/b', line: 1 },
    ],
  );
});

test('extractUrls excludes tight table cell separators from Markdown destinations', () => {
  const content = [
    '| First | Second |',
    '| --- | --- |',
    '|[first](https://one.example/a)|[second](https://two.example/b)|',
  ].join('\r\n');
  assert.deepEqual(extractUrls(content), [
    { url: 'https://one.example/a', line: 3 },
    { url: 'https://two.example/b', line: 3 },
  ]);
});

test('extractUrls preserves balanced destination syntax and embedded HTTP URLs', () => {
  const urls = [
    'https://en.wikipedia.org/wiki/Llama_(language_model)',
    'https://example.test/a_(outer_(inner))/path[segment]?keys[]=value',
    'http://[2001:db8::1]/path[segment]',
    'https://web.archive.org/web/20260901000000/https://example.test/article',
    'https://example.test/redirect?next=https://other.test/a_(b)&keys[]=value',
    'https://example.test/query?next=(https://other.test/a_(b))',
  ];
  const content = urls.map((url, i) => `[source ${i}](${url})`).join('');
  assert.deepEqual(extractUrls(content), urls.map(url => ({ url, line: 1 })));
});

test('extractUrls keeps line numbers with image links, destination whitespace and titles', () => {
  const content = [
    '![image](https://one.example/image)[link]( https://two.example/path)',
    '[wrapped](',
    '\thttps://three.example/path_(v2))[titled](https://four.example/path "title")',
    '[last](HTTPS://FIVE.EXAMPLE/path)afterword',
  ].join('\n');
  assert.deepEqual(extractUrls(content), [
    { url: 'https://one.example/image', line: 1 },
    { url: 'https://two.example/path', line: 1 },
    { url: 'https://three.example/path_(v2)', line: 3 },
    { url: 'https://four.example/path', line: 3 },
    { url: 'HTTPS://FIVE.EXAMPLE/path', line: 4 },
  ]);
});

test('extractUrls does not reinterpret delimiters or embedded schemes inside bare URLs', () => {
  const urls = [
    'https://example.test/a)b',
    'https://example.test/a_(b)c',
    'https://example.test/path[segment]?keys[]=value',
    'http://[2001:db8::1]/path',
    'https://example.test/query?value=a|b&next=https://other.test/path',
    'https://example.test/query?next=[label](https://other.test/path)/tail',
    'https://web.archive.org/web/20260901000000/https://example.test/article',
  ];
  assert.deepEqual(extractUrls(urls.join('\n')), urls.map((url, i) => ({ url, line: i + 1 })));
});

test('extractUrls rejects invalid destinations without swallowing subsequent valid links', () => {
  const content = [
    '[placeholder](https://example.test/path/...)[valid](https://one.example/a)',
    '[template](https://web.archive.org/save/{url})[valid](https://two.example/b)',
    '[bad port](https://example.test:invalid/path)[valid](https://three.example/c)',
  ].join('\n');
  assert.deepEqual(extractUrls(content), [
    { url: 'https://one.example/a', line: 1 },
    { url: 'https://two.example/b', line: 2 },
    { url: 'https://three.example/c', line: 3 },
  ]);
});

test('collectUrls retains file order, duplicate references and adjacent destination lines', t => {
  const root = makeTempDir(t);
  fs.mkdirSync(path.join(root, 'entries'));
  const first = path.join(root, 'entries', 'a.md');
  const last = path.join(root, 'z.md');
  fs.writeFileSync(first, 'heading\n[first](https://one.example/a)[again](https://one.example/a)');
  fs.writeFileSync(last, '|[last](https://two.example/b)|');
  assert.deepEqual(collectUrls(root), [
    { file: 'entries/a.md', url: 'https://one.example/a', line: 2 },
    { file: 'entries/a.md', url: 'https://one.example/a', line: 2 },
    { file: 'z.md', url: 'https://two.example/b', line: 1 },
  ]);
  assert.deepEqual(collectUrls(root, [last, first]), [
    { file: 'z.md', url: 'https://two.example/b', line: 1 },
    { file: 'entries/a.md', url: 'https://one.example/a', line: 2 },
    { file: 'entries/a.md', url: 'https://one.example/a', line: 2 },
  ]);
});

test('CLI keeps adjacent references and reports unique URLs in first-seen order', t => {
  const root = makeTempDir(t);
  fs.mkdirSync(path.join(root, 'tools'));
  fs.writeFileSync(path.join(root, 'a.md'), '[first](https://one.example/a)[second](https://two.example/b)');
  fs.writeFileSync(path.join(root, 'z.md'), '|[again](https://one.example/a)|');
  const result = spawnSync(process.execPath, [path.join(__dirname, 'extract_urls.js'), root], {
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(root, 'tools', 'urls.json'), 'utf8')), [
    { file: 'a.md', url: 'https://one.example/a', line: 1 },
    { file: 'a.md', url: 'https://two.example/b', line: 1 },
    { file: 'z.md', url: 'https://one.example/a', line: 1 },
  ]);
  assert.match(result.stdout, /Total URLs: 3/);
  assert.match(result.stdout, /Unique URLs: 2/);
  assert.deepEqual(result.stdout.trim().split(/\r?\n/).slice(-2), [
    'a.md:1  https://one.example/a',
    'a.md:1  https://two.example/b',
  ]);
});

test('findMd is deterministic and ignores hidden, dependency, and symlink entries', t => {
  const root = makeTempDir(t);
  fs.mkdirSync(path.join(root, 'b'));
  fs.mkdirSync(path.join(root, 'a'));
  fs.mkdirSync(path.join(root, '.hidden'));
  fs.mkdirSync(path.join(root, 'node_modules'));
  fs.writeFileSync(path.join(root, 'z.md'), 'z');
  fs.writeFileSync(path.join(root, 'b', 'b.md'), 'b');
  fs.writeFileSync(path.join(root, 'a', 'a.md'), 'a');
  fs.writeFileSync(path.join(root, '.hidden', 'hidden.md'), 'hidden');
  fs.writeFileSync(path.join(root, 'node_modules', 'dependency.md'), 'dependency');

  try {
    fs.symlinkSync(path.join(root, 'z.md'), path.join(root, 'linked.md'));
  } catch (error) {
    if (process.platform !== 'win32') throw error;
  }

  const originalReaddirSync = fs.readdirSync;
  let discovered;
  try {
    // Filesystems often return directory entries in sorted order by accident.
    // Reverse every enumeration so this regression requires findMd's own sort.
    fs.readdirSync = function reversedReaddirSync(...args) {
      return Reflect.apply(originalReaddirSync, this, args).reverse();
    };
    discovered = findMd(root).map(file => path.relative(root, file).replace(/\\/g, '/'));
  } finally {
    fs.readdirSync = originalReaddirSync;
  }

  assert.deepEqual(discovered, [
    'a/a.md',
    'b/b.md',
    'z.md',
  ]);
});

test('CLI writes clean references in deterministic file order', t => {
  const root = makeTempDir(t);
  fs.mkdirSync(path.join(root, 'tools'));
  fs.mkdirSync(path.join(root, 'entries'));
  fs.writeFileSync(path.join(root, 'z.md'), 'https://example.test/z”');
  fs.writeFileSync(path.join(root, 'entries', 'a.md'), 'first\nhttps://example.test/a_(v1)');

  const result = spawnSync(process.execPath, [path.join(__dirname, 'extract_urls.js'), root], {
    encoding: 'utf8',
  });

  assert.equal(result.status, 0, result.stderr);
  const output = JSON.parse(fs.readFileSync(path.join(root, 'tools', 'urls.json'), 'utf8'));
  assert.deepEqual(output, [
    { file: 'entries/a.md', url: 'https://example.test/a_(v1)', line: 2 },
    { file: 'z.md', url: 'https://example.test/z', line: 1 },
  ]);
});
