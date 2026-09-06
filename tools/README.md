# 工程工具链

LLM Chronicle 项目的自动化工具集。

## 工具列表

### `validate_links.js` — 链接验证

批量检查编年条目中所有出处链接的可访问性。

```bash
# 检查全部
node tools/validate_links.js

# 只检查指定目录
node tools/validate_links.js --only 编年/2025

# 也可以只检查单个文件或一级目录
node tools/validate_links.js --only README.md
node tools/validate_links.js --only 志

# 输出 JSON（适合 CI）
node tools/validate_links.js --json

# 自定义整个请求（包括响应体、重定向或 Wayback 回退）的总墙钟超时（1-2147483647 毫秒）
node tools/validate_links.js --timeout 15000

# 限制重定向次数（默认 10，防止循环重定向）
node tools/validate_links.js --max-redirects 5
```

参数会严格校验：未知/重复参数、缺失参数值、非正整数的超时或重定向
上限都会以退出码 2 失败；`--only` 没有匹配到主书范围内的 Markdown
文件时也会失败，避免过滤路径拼错后产生空扫描的假绿结果。

**输出**：
- 终端彩色报告（实时进度 + 汇总统计）
- `tools/link_report.csv` — CSV 格式完整结果
- 退出码：0 = 全部通过，1 = 有失败的链接

**检查项**：
- HTTP 状态码（200-399 为通过）
- 重定向跟踪（自动跟随绝对或相对的 301/302/303/307/308，检测循环并限制跳数）
- 响应延迟
- 可疑 URL 警告（基域名无路径，可能链接不完整）
- 同一 URL 只请求一次，再映射回全部引用位置，减少限流与重复请求

### `validate_format.js` — 格式校验

检查编年条目文件是否符合《00_体例.md》规范。

```bash
# 检查所有条目
node tools/validate_format.js

# 检查单个文件
node tools/validate_format.js 编年/2025/01.md

# 严格模式（警告也报错）
node tools/validate_format.js --strict

# JSON 输出
node tools/validate_format.js --json
```

**检查项**：

| 编号 | 级别 | 检查内容 |
|------|------|----------|
| E001 | error | 文件路径仅允许 `YYYY/MM.md`（禁止 `MM-slug.md` 拆分） |
| E002 | error | `YYYY/MM.md` 首行须精确为 `# YYYY年M月` 或 `# YYYY年M月（续）` |
| E003 | error/info | 条目日期格式（**YYYY-MM-DD** —） |
| E004 | warning | 脚注格式（[^N]: 来源, "标题", 日期. URL） |
| E005 | warning/error | 脚注引用完整性（正文引用⇔尾注定义） |
| E006 | warning | 编纂署名行 |
| E007 | warning | 出处脚注区块存在性 |
| E008 | info | 单一出处 → 是否需要"存疑"标注 |
| E009 | warning | URL 完整性（路径过短） |

### `extract_urls.js` — URL 提取（辅助）

提取项目中所有 markdown 文件的 URL，输出被 gitignore 的辅助清单
`tools/urls.json`。快照命令不依赖这份生成文件。

```bash
npm run extract-urls
```

### `snapshot.js` — 来源快照

不带文件参数时实时扫描 `编年/`，不会读取 `tools/urls.json`。可先用 dry-run
核对当下会处理的链接：

```bash
npm run snapshot:dry-run
npm run snapshot
node tools/snapshot.js --dry-run --url https://example.com/source --month 2025-01
```

`--url` 与 `--month` 必须成对使用，月份格式为 `YYYY-MM`。`--text-only`、
`--ia`、`--screenshot` 是互斥归档模式；`--update-only` 不能再与试运行或归档
模式组合。未知、重复或缺值的选项会在扫描和写入开始前报错。

---

## 依赖

纯 Node.js，无外部依赖。需要 Node.js ≥ 18。

链接检查器的重定向、循环和参数边界测试使用 Node.js 内置测试运行器：

```bash
npm test
```

## CI 集成（建议）

```yaml
# .github/workflows/validate.yml
name: Validate
on: [push, pull_request]
jobs:
  format:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: node tools/validate_format.js --strict
  links:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: node tools/validate_links.js --json
```

---

*由 ssg 的 AI 史官·玄墨 搭建。*
