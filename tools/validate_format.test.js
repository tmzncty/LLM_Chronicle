const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { test } = require('node:test');

const {
  RULES,
  extractChronicleEntries,
  parseChronicleDate,
} = require('./validate_format');

const repositoryRoot = path.resolve(__dirname, '..');
const validateFormatCli = path.join(__dirname, 'validate_format.js');

function runValidateFormatCli(args) {
  return spawnSync(process.execPath, [validateFormatCli, ...args], {
    cwd: repositoryRoot,
    encoding: 'utf8',
  });
}

function makeWarningOnlyChronicle(t) {
  const fixtureRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), 'llm-chronicle-format-cli-'),
  );
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));

  const yearDirectory = path.join(fixtureRoot, '2031');
  fs.mkdirSync(yearDirectory);
  const fixturePath = path.join(yearDirectory, '01.md');
  fs.writeFileSync(fixturePath, [
    '# 2031年1月',
    '',
    '**2031-01-01** — Synthetic test entry.[^1]',
    '',
    '*本篇由终末地工业史官团队编纂：测试（测试）*',
    '',
    '[^1]: Test source, "Test title", 2031-01-01. https://example.com/test',
    '',
  ].join('\n'));
  return fixturePath;
}

function footnoteIssues(lines, newline = '\n') {
  return RULES.footnote_format.check(lines.join(newline));
}

test('E004 diagnoses an empty numeric source on its own physical line', () => {
  for (const newline of ['\n', '\r\n', '\r']) {
    for (const first of ['[^1]:', '[^1]: ', '[^1]:\t  ']) {
      for (const tail of [[], [''], ['', 'https://example.com/outside'], ['https://example.com/outside'], ['[^2]: Source https://example.com/second']]) {
        const issues = footnoteIssues(['preface', first, ...tail], newline);
        assert.deepEqual(issues.map(issue => [issue.level, issue.rule, issue.line]), [['error', 'E004', 2]], JSON.stringify({ newline, first, tail }));
        assert.match(issues[0].msg, /空/);
      }
    }
  }
});

test('E004 keeps empty-source and repeated-label diagnostics independent', () => {
  for (const newline of ['\n', '\r\n', '\r']) {
    const issues = footnoteIssues(['[^1]:', '[^1]: Source https://example.com/second', '[^1]:'], newline);
    assert.deepEqual(issues.map(issue => [issue.level, issue.line]), [['error', 1], ['error', 2], ['error', 3], ['error', 3]], JSON.stringify(newline));
    assert.match(issues[0].msg, /空/);
    assert.match(issues[1].msg, /重复/);
    assert.match(issues[2].msg, /重复/);
    assert.match(issues[3].msg, /空/);
  }
});

test('E004 accepts indented first paragraphs, continuations and multiple paragraphs', () => {
  const bodies = [
    ['[^1]:', '    Source https://example.com/source'],
    ['[^1]:', '', '    Source https://example.com/source'],
    ['[^1]: Source', '    https://example.com/source'],
    ['[^1]: Source', '', '    https://example.com/source'],
    ['[^1]: Source', '', '    Another paragraph.', '', '    https://example.com/source'],
    ['[^1]:', '\thttps://example.com/source'],
    ['[^1]: Source', ' \thttps://example.com/source'],
    ['[^1]:', '', '    Source text', 'https://example.com/source'],
    ['[^1]:', '', '', '    https://example.com/source'],
    ['[^1]: Source', '', '', '    https://example.com/source'],
    ['[^1]: Source', '===', 'https://example.com/source'],
    ['[^1]: Source', '', '    # Heading', '    New paragraph', 'https://example.com/source'],
    ['[^1]: Source', '```not`fence https://example.com/source'],
    ['[^1]: <span>Source</span>', 'https://example.com/source'],
    ['[^1]: A | B', '--- | ---', 'https://example.com/source'],
    ['[^1]: Source', '        code-looking continuation', 'https://example.com/source'],
    ['[^1]: Source', '--', 'https://example.com/source'],
    ['[^1]: ===', 'https://example.com/source'],
    ['[^1]: --', 'https://example.com/source'],
  ];
  for (const newline of ['\n', '\r\n', '\r']) {
    for (const body of bodies) assert.deepEqual(footnoteIssues(body, newline), [], JSON.stringify({ body, newline }));
  }
});

test('E004 accepts genuine unindented paragraph-lazy continuation URLs', () => {
  for (const continuation of ['https://example.com/source', '  https://example.com/source', '#not-a-heading https://example.com/source', '<span>https://example.com/source</span>', '<widget>https://example.com/source</widget>']) {
    assert.deepEqual(footnoteIssues(['[^1]: Source text  ', continuation]), [], continuation);
  }
});

test('E004 never borrows URLs from an outside paragraph or interrupting block', () => {
  const outsideBlocks = [
    ['', 'https://example.com/outside'],
    ['', '   https://example.com/outside'],
    ['# https://example.com/outside'],
    ['   ## https://example.com/outside'],
    ['- https://example.com/outside'],
    ['+ https://example.com/outside'],
    ['* https://example.com/outside'],
    ['1. https://example.com/outside'],
    ['1) https://example.com/outside'],
    ['2. https://example.com/outside'],
    ['-', 'https://example.com/outside'],
    ['> https://example.com/outside'],
    ['```', 'https://example.com/outside', '```'],
    ['~~~text', 'https://example.com/outside', '~~~'],
    ['---', 'https://example.com/outside'],
    ['***', 'https://example.com/outside'],
    ['<div>', 'https://example.com/outside', '</div>'],
    ['<!-- https://example.com/outside -->'],
    ['[^other]: https://example.com/outside'],
  ];
  for (const tail of outsideBlocks) {
    const issues = footnoteIssues(['[^1]: Source without a link', ...tail]);
    assert.deepEqual(issues.map(issue => [issue.level, issue.rule, issue.line]), [['warning', 'E004', 1]], JSON.stringify(tail));
    assert.match(issues[0].msg, /缺少 URL/);
  }
});

test('E004 only permits lazy continuation of a source paragraph, not a heading or fence', () => {
  for (const first of ['- Source', '> Source', '> - Source']) {
    assert.deepEqual(footnoteIssues([`[^1]: ${first}`, 'https://example.com/source']), [], first);
  }
  for (const body of [
    ['[^1]: # Source', 'https://example.com/outside'],
    ['[^1]:', '    # Source', 'https://example.com/outside'],
    ['[^1]: Source', '', '    # Another heading', 'https://example.com/outside'],
    ['[^1]: ```text', '    text', '    ```', 'https://example.com/outside'],
    ['[^1]: Source', '', '    ```text', '    text', '    ```', 'https://example.com/outside'],
    ['[^1]: <div>', '    text', '    </div>', 'https://example.com/outside'],
    ['[^1]: Source', '    ===', 'https://example.com/outside'],
    ['[^1]:', '        code', 'https://example.com/outside'],
    ['[^1]: Source', '', '        code', 'https://example.com/outside'],
    ['[^1]: <widget>', 'https://example.com/outside'],
    ['[^1]: Source', '<widget>', 'https://example.com/outside'],
    ['[^1]: Source', '', '    <widget>', 'https://example.com/outside'],
    ['[^1]: A | B', '    --- | ---', 'https://example.com/outside'],
    ['[^1]: Source', '', '    A | B', '    --- | ---', '    row | row', 'https://example.com/outside'],
    ['[^1]: A | B | ', '    --- | --- |', 'https://example.com/outside'],
    ['[^1]: A | B', '    --- | ---', '    row without a pipe', 'https://example.com/outside'],
  ]) {
    assert.deepEqual(footnoteIssues(body).map(issue => [issue.level, issue.line]), [['warning', 1]], JSON.stringify(body));
  }
});

test('E004 retains nonempty text-source warning and duplicate URL-source error', () => {
  const issues = footnoteIssues(['[^2]: Printed book, 2024.', '[^3]: https://example.com/source', '[^3]: https://example.com/other']);
  assert.deepEqual(issues.map(issue => [issue.level, issue.line]), [['warning', 1], ['error', 3]]);
  assert.match(issues[0].msg, /非网页来源则忽略/);
  assert.match(issues[1].msg, /重复/);
  assert.deepEqual(footnoteIssues(['[^name]:', ' [^4]:', '[^５]:']), []);
});

test('E004 CLI preserves error, warning and JSON behavior for source boundaries', (t) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'llm-footnote-cli-'));
  t.after(() => fs.rmSync(fixtureRoot, { recursive: true, force: true }));
  const yearDirectory = path.join(fixtureRoot, '2024');
  fs.mkdirSync(yearDirectory);
  const fixture = path.join(yearDirectory, '02.md');
  const cases = [
    { body: ['[^1]:'], level: 'error', normal: 1, strict: 1 },
    { body: ['[^1]: Book source.'], level: 'warning', normal: 0, strict: 1 },
    { body: ['[^1]: Source', 'https://example.com/source'], level: null, normal: 0, strict: 0 },
    { body: ['[^1]:', '', '    Source https://example.com/source'], level: null, normal: 0, strict: 0 },
  ];
  for (const entry of cases) {
    fs.writeFileSync(fixture, ['# 2024年2月', '', '**2024-02-01** — Synthetic entry（存疑）.[^1]', '', '*本篇由终末地工业史官团队编纂：测试（测试）*', '', ...entry.body, ''].join('\n'));
    for (const strict of [false, true]) {
      const options = strict ? ['--strict'] : [];
      const expected = strict ? entry.strict : entry.normal;
      const text = runValidateFormatCli([...options, fixture]);
      assert.equal(text.status, expected, JSON.stringify(entry) + text.stderr);
      const json = runValidateFormatCli(['--json', ...options, fixture]);
      assert.equal(json.status, expected, JSON.stringify(entry) + json.stderr);
      const results = JSON.parse(json.stdout);
      assert.equal(results.length, 1);
      assert.deepEqual(results[0].issues.map(issue => [issue.rule, issue.level, issue.line]), entry.level ? [['E004', entry.level, 7]] : []);
    }
  }
});

test('CLI rejects unknown options instead of silently weakening strict mode', (t) => {
  const warningOnlyChronicle = makeWarningOnlyChronicle(t);
  const result = runValidateFormatCli([
    '--strcit',
    warningOnlyChronicle,
  ]);

  assert.equal(result.status, 2, result.stderr);
  assert.match(result.stderr, /Unknown option: --strcit/);
  assert.match(result.stderr, /Usage:/);
});

test('CLI rejects extra target files instead of silently ignoring them', () => {
  const result = runValidateFormatCli([
    '编年/2024/02.md',
    '编年/2018/06.md',
  ]);

  assert.equal(result.status, 2, result.stderr);
  assert.match(result.stderr, /Unexpected argument: 编年[\\/]2018[\\/]06\.md/);
  assert.match(result.stderr, /Usage:/);
});

test('CLI rejects an empty target instead of scanning the whole corpus', () => {
  const result = runValidateFormatCli(['']);

  assert.equal(result.status, 2, 'empty target must fail during CLI parsing');
  assert.match(result.stderr, /Unexpected empty file argument/);
  assert.match(result.stderr, /Usage:/);
  assert.doesNotMatch(result.stderr, /Validating|No chronicle files found/);
});

test('CLI keeps supported options order-independent', (t) => {
  const warningOnlyChronicle = makeWarningOnlyChronicle(t);
  const result = runValidateFormatCli([
    warningOnlyChronicle,
    '--strict',
  ]);

  assert.equal(result.status, 1, result.stderr);
  assert.match(result.stderr, /Warnings:\s*1/);
  assert.doesNotMatch(result.stderr, /Unknown option/);
});

test('E001 requires an exact four-ASCII-digit year directory', () => {
  assert.deepEqual(RULES.file_naming.check('编年/2024/02.md'), []);

  const malformedYears = [
    '2024x',
    '02024',
    '+2024',
    '2024.0',
    ' 2024',
    '2024 ',
    '２０２４',
    '٢٠٢٤',
  ];

  for (const year of malformedYears) {
    const issues = RULES.file_naming.check(`编年/${year}/02.md`);
    assert.deepEqual(
      issues.map(issue => [issue.level, issue.rule]),
      [['error', 'E001']],
      JSON.stringify(year),
    );
    assert.match(issues[0].msg, /YYYY/, JSON.stringify(year));
  }

  const missingYear = RULES.file_naming.check('02.md');
  assert.deepEqual(
    missingYear.map(issue => [issue.level, issue.rule]),
    [['error', 'E001']],
  );
});

test('E001 reports canonical years outside the expected corpus range', () => {
  for (const year of ['2016', '2031']) {
    const issues = RULES.file_naming.check(`编年/${year}/02.md`);
    assert.deepEqual(
      issues.map(issue => [issue.level, issue.rule]),
      [['warning', 'E001']],
      year,
    );
    assert.match(issues[0].msg, new RegExp(year), year);
  }
});

test('E001 rejects zero and out-of-range month filenames', () => {
  for (const month of ['00', '13']) {
    const issues = RULES.file_naming.check(`编年/2024/${month}.md`);
    assert.deepEqual(
      issues.map(issue => [issue.level, issue.rule]),
      [['error', 'E001']],
      month,
    );
    assert.match(issues[0].msg, /月份超出范围/, month);
  }
});

test('E002 accepts only the exact first-line title forms', () => {
  const cases = [
    ['# 2024年2月\nbody\n', '编年/2024/02.md'],
    ['# 2024年2月（续）\r\nbody\r\n', '编年\\2024\\02.md'],
    ['# 2024年2月\rbody\r', '编年/2024/02.md'],
  ];

  for (const [content, file] of cases) {
    assert.deepEqual(RULES.title_format.check(content, file), [], content);
  }
});

test('E002 rejects first-line titles that are not an exact path match', () => {
  const invalidTitles = [
    '# 2024年3月',
    '# 2024年13月',
    '# 2024年02月',
    '# 2024年2月 trailing',
    '# 2025年2月',
    '#  2024年2月',
    '# 2024年2月 ',
    '# 2024年2月 #',
  ];

  for (const title of invalidTitles) {
    const issues = RULES.title_format.check(
      `${title}\n`,
      '编年/2024/02.md',
    );
    assert.deepEqual(
      issues.map(issue => [issue.level, issue.rule]),
      [['error', 'E002']],
      JSON.stringify(title),
    );
    assert.match(issues[0].msg, /2024年2月/, JSON.stringify(title));
  }
});

test('E002 leaves legacy slug paths to E001', () => {
  for (const file of ['编年/2025/01_kimi.md', '编年/2026/04_muse.md']) {
    assert.deepEqual(
      RULES.file_naming.check(file).map(issue => [issue.level, issue.rule]),
      [['error', 'E001']],
      file,
    );
    assert.deepEqual(
      RULES.title_format.check('# 专题标题\n', file),
      [],
      file,
    );
  }
});

test('E002 requires the canonical title on the first physical line', () => {
  const missing = RULES.title_format.check('', '编年/2024/02.md');
  assert.deepEqual(
    missing.map(issue => [issue.level, issue.rule]),
    [['error', 'E002']],
  );
  assert.match(missing[0].msg, /缺少一级标题/);

  const invalidFirstLines = [
    '\n# 2024年2月',
    'preface\n# 2024年2月',
    '## 2024年2月',
    ' # 2024年2月',
    '#\t2024年2月',
    '2024年2月\n===',
  ];
  for (const content of invalidFirstLines) {
    const issues = RULES.title_format.check(
      `${content}\n`,
      '编年/2024/02.md',
    );
    assert.deepEqual(
      issues.map(issue => [issue.level, issue.rule]),
      [['error', 'E002']],
      JSON.stringify(content),
    );
    assert.match(issues[0].msg, /首行/, JSON.stringify(content));
  }
});

test('E002 intentionally scopes validation to the first physical line', () => {
  const content = [
    '# 2024年2月',
    '# another document-level H1',
    '- item',
    '  # list-contained H1',
    '```markdown',
    '# fenced H1',
    '```',
    'setext H1',
    '===',
    '',
  ].join('\n');

  assert.deepEqual(
    RULES.title_format.check(content, '编年/2024/02.md'),
    [],
  );
});

test('E002 first-line contract covers every canonical corpus file', () => {
  const chronicleRoot = path.resolve(__dirname, '..', '编年');
  const failures = [];

  for (const year of fs.readdirSync(chronicleRoot)) {
    const yearPath = path.join(chronicleRoot, year);
    if (!fs.statSync(yearPath).isDirectory()) continue;

    for (const filename of fs.readdirSync(yearPath)) {
      if (!/^(0[1-9]|1[0-2])\.md$/.test(filename)) continue;
      const file = `编年/${year}/${filename}`;
      const content = fs.readFileSync(path.join(yearPath, filename), 'utf8');
      const issues = RULES.title_format.check(content, file);
      if (issues.length > 0) failures.push({ file, issues });
    }
  }

  assert.deepEqual(failures, []);
});

test('accepts documented and corpus date forms', () => {
  const validDates = [
    '2024年',
    '2024-02',
    '2024年2月',
    '2024-02-29',
    '约2024年2月',
    '约2022-11-23',
    '2024-11-04 前后',
    '2024-02初',
    '2024-02中',
    '2024-02中旬',
    '2024-02下旬',
    '2024-02末',
    '2024-02-14—15',
    '2024-02-28—29',
    '2024-02-14–15',
    '2024-02-14-15',
    '2024-02-14至15',
  ];

  for (const date of validDates) {
    assert.equal(parseChronicleDate(date).valid, true, date);
  }
});

test('rejects year zero in every supported year-bearing form', () => {
  const invalidDates = [
    '0000年',
    '0000-01',
    '0000年1月',
    '约0000年1月',
    '0000-01初',
    '0000-01-01',
    '约0000-01-01',
    '0000-01-01 前后',
    '0000-01-01—02',
  ];

  for (const date of invalidDates) {
    assert.deepEqual(
      parseChronicleDate(date),
      { valid: false, reason: 'invalid-year' },
      date,
    );
  }
});

test('rejects invalid months in every supported month-bearing form', () => {
  const invalidDates = [
    '2024-00',
    '2024-13',
    '2024-00-01',
    '2024-13-01—02',
    '2024年0月',
    '约2024年13月',
    '2024-13初',
  ];

  for (const date of invalidDates) {
    assert.deepEqual(
      parseChronicleDate(date),
      { valid: false, reason: 'invalid-month' },
      date,
    );
  }
});

test('enforces Gregorian day validity, including century leap years', () => {
  for (const date of ['2000-02-29', '2024-02-29']) {
    assert.equal(parseChronicleDate(date).valid, true, date);
  }

  for (const date of [
    '1900-02-29',
    '2023-02-29',
    '2024-04-31',
    '2024-02-30 前后',
    '2100-02-29',
  ]) {
    assert.deepEqual(
      parseChronicleDate(date),
      { valid: false, reason: 'invalid-day' },
      date,
    );
  }
});

test('validates both range endpoints and their order', () => {
  for (const date of ['2024-02-30—31', '2024-02-28—30']) {
    assert.deepEqual(
      parseChronicleDate(date),
      { valid: false, reason: 'invalid-day' },
      date,
    );
  }
  assert.deepEqual(
    parseChronicleDate('2024-02-20—19'),
    { valid: false, reason: 'reversed-range' },
  );
});

test('rejects trailing text after otherwise valid date prefixes', () => {
  const invalidDates = [
    '2024-02 trailing',
    '2024年2月以后',
    '约2024年2月左右',
    '2024-02-29extra',
    '2024-02中旬以后',
    '2024-02-14—15extra',
    '202-02-01',
    '约 2024年2月',
  ];

  for (const date of invalidDates) {
    assert.deepEqual(
      parseChronicleDate(date),
      { valid: false, reason: 'syntax' },
      date,
    );
  }
});

test('does not combine date markers across lines', () => {
  for (const newline of ['\n', '\r\n', '\r']) {
    for (const date of [
      `2024-02${newline}中旬`,
      `2024-02-29${newline}前后`,
    ]) {
      assert.deepEqual(
        parseChronicleDate(date),
        { valid: false, reason: 'syntax' },
        JSON.stringify(date),
      );
    }

    assert.deepEqual(
      extractChronicleEntries(
        `**2024-02${newline}中旬** — split marker.${newline}`,
      ),
      [],
      JSON.stringify(newline),
    );

    assert.deepEqual(
      extractChronicleEntries(
        `**2024-02-29**（note${newline}continued） — event.${newline}`,
      ),
      [],
      JSON.stringify(newline),
    );
  }
});

test('E003 reports stable line numbers for LF, CRLF, and bare CR', () => {
  for (const newline of ['\n', '\r\n', '\r']) {
    const content = [
      '**2029-13** — invalid month.',
      '**2029-02-31** — invalid day.',
      '**随后** — narrative label.',
    ].join(newline);
    const issues = RULES.entry_date_format.check(content);
    assert.deepEqual(
      issues.map(issue => [issue.level, issue.line]),
      [['error', 1], ['error', 2], ['info', 3]],
      JSON.stringify(newline),
    );
  }
});

test('E003 accepts approximate dates instead of treating them as labels', () => {
  const issues = RULES.entry_date_format.check(
    '**约2026年5月** — approximate event.\n',
  );

  assert.deepEqual(issues, []);
});

test('E003 does not couple event dates to the chronicle filename month', () => {
  const issues = RULES.entry_date_format.check(
    '**2023-12-31** — historical context in a February chronicle.\n'
      + '**2025-03-01** — later context in the same chronicle.\n',
    '编年/2024/02.md',
  );

  assert.deepEqual(issues, []);
});

test('E003 validates markers with a same-line parenthetical note', () => {
  const issues = RULES.entry_date_format.check([
    '**2029-13**（invalid month） — invalid event.',
    '**2029-02-31**（invalid day）— invalid event.',
    '**同日 2024-02-15**（narrative label）— narrative event.',
  ].join('\n'));

  assert.deepEqual(
    issues.map(issue => [issue.level, issue.line]),
    [['error', 1], ['error', 2], ['info', 3]],
  );
});

test('E003 reports invalid date attempts while retaining narrative labels', () => {
  const issues = RULES.entry_date_format.check([
    '**2029-13** — invalid month.',
    '**2029-02-31—32** — invalid range.',
    '**2029-02-20—19** — reversed range.',
    '**2029年2月 trailing** — trailing text.',
    '**202-02-01** — short year.',
    '**约 2024年2月** — unsupported spacing.',
    '**随后** — narrative label.',
  ].join('\n'));

  const errors = issues.filter(issue => issue.level === 'error');
  const infos = issues.filter(issue => issue.level === 'info');
  assert.deepEqual(errors.map(issue => issue.line), [1, 2, 3, 4, 5, 6]);
  assert.equal(infos.length, 1);
  assert.match(infos[0].msg, /随后/);
});

test('E003 keeps the dedicated tilde-range warning and rejects the syntax', () => {
  const issues = RULES.entry_date_format.check(
    '**2024-02-14~15** — invalid separator.\n',
  );

  assert.deepEqual(issues.map(issue => issue.level), ['warning', 'error']);
  assert.match(issues[0].msg, /波浪号/);
});

function independentlyExtractLineEntry(line) {
  if (!line.startsWith('**')) return null;

  const markerEnd = line.indexOf('**', 2);
  if (markerEnd === -1) return null;

  let remainder = line.slice(markerEnd + 2).trimStart();
  if (remainder.startsWith('（')) {
    const noteEnd = remainder.indexOf('）', 1);
    if (noteEnd === -1) return null;
    remainder = remainder.slice(noteEnd + 1).trimStart();
  }

  if (!['—', '–', '-'].includes(remainder[0])) return null;
  return line.slice(2, markerEnd).trim();
}

test('production extractor covers every independently counted corpus entry', () => {
  const chronicleRoot = path.resolve(__dirname, '..', '编年');
  const pending = [chronicleRoot];
  const errors = [];
  const independentEntries = [];
  const productionEntries = [];

  while (pending.length > 0) {
    const directory = pending.pop();
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        pending.push(entryPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const content = fs.readFileSync(entryPath, 'utf8');
        const file = path.relative(chronicleRoot, entryPath).replace(/\\/g, '/');
        for (const [index, line] of content.split(/\r\n|\n|\r/).entries()) {
          const dateStr = independentlyExtractLineEntry(line);
          if (dateStr !== null) {
            independentEntries.push(`${file}:${index + 1}:${dateStr}`);
          }
        }

        for (const extracted of extractChronicleEntries(content)) {
          productionEntries.push(`${file}:${extracted.line}:${extracted.dateStr}`);
        }

        for (const issue of RULES.entry_date_format.check(content)) {
          if (issue.level === 'error') {
            errors.push(
              `${file}:${issue.line} ${issue.msg}`,
            );
          }
        }
      }
    }
  }

  independentEntries.sort();
  productionEntries.sort();
  assert.ok(
    independentEntries.length > 0,
    'expected the chronicle corpus to contain event entries',
  );
  assert.deepEqual(productionEntries, independentEntries);
  assert.ok(independentEntries.includes('2023/02.md:17:约2022-11-23'));
  assert.ok(independentEntries.includes('2023/03.md:104:2023-03-14'));
  assert.ok(independentEntries.includes('2024/02.md:35:同日 2024-02-15'));
  assert.deepEqual(errors, []);
});
