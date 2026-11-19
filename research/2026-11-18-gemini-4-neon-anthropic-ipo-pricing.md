# 2026-11-18 增量研究：Gemini 4 Neon 与 Anthropic IPO 定价

> 研究断限：2026-11-19 17:34 CST。以正式事件发生日而非检索日入史；本稿是审阅用研究包，尚未直接写入编年。已核对 main 的 11 月编年、最近提交及 #79、#87、#89—91 等在途 PR。Google Carbon/Hydrogen 与 Anthropic 11-10 路演已有研究包，本稿只记新的节点。

## 一、Google 正式推出 Gemini 4 Neon（2026-11-18）

**事实（A：Google 当日公告；A：GitHub 当日 Changelog）**：Google 于 11 月 18 日推出 Gemini 4 Neon，型号 `gemini-4-neon`，当日起逐步进入 Gemini API/AI Studio、Gemini for business、Google AI Pro/Ultra 的 Gemini App 和 Antigravity；GitHub 同日宣布 Copilot GA，面向 Pro+、Max、Business、Enterprise，跨 VS Code、CLI、coding agent、Web 等，组织管理员可按模型政策管理，rollout 非瞬时全量。不是 11 月 12 日 Hydrogen 或 11 月 10 日 Carbon 的重复发布。

**规格与商业条件**：官方标准 API 每百万输入 $3、缓存输入 $0.15、输出 $15；上下文 100 万 token；支持综合表格、PDF、图表、音频、视频等输入，面向复杂 coding、知识工作、科学任务。第三方对官方文档的核对报告称 1,048,576 上下文、文本输出、四档 thinking（low/medium/high/xhigh）、API 付费层且无免费层、隐式缓存而非显式缓存；这些细项应以最终模型卡/API 文档复核。**未发现开放权重或可自行部署声明，不能据此推断未来许可策略。** 官方称比 Carbon 单任务成本低，但这是特定任务/harness/思考档位的厂商结果，不是普适价格优势：Carbon 截至 11-30 的促销标价 $2/$10，Neon 的 $3/$15 反而更高，预计 12-01 Carbon 调整为 $4/$20 后才有不同的标价比较。

**评价与争议**：Google 引述 Artificial Analysis xhigh 61 分/第三、Vals 第二，以及 Agent Arena steerability 第二；应区分外部榜单与厂商选择性转述、测试配置与污染风险。Google Antigravity 内部称 fabrication 率下降，不等于独立可靠性。GitHub 复述“更少未经请求的代码改动、较少虚构工具结果”，来源仍是 Google。Reddit 11-18 一位 Pro 用户报告 Neon 取代 Gemini App 中 Argon 的“Deeper analysis”入口、Antigravity 默认切换及 512K 端侧窗口；这只是少量用户实测，**不能**推出全球默认切换、API Argon 下线或普遍可靠性。尚缺重复 coding/agent 测试、速度分布、成本/成功任务、长期生产采用。

**竞争关系（最近 30 天）**：在 GPT-6.1 Terra（10-26）、Images 2.6（11-04）、Claude Fable/Mythos 5.2（11-09）、Carbon（11-10 扩大商业可用）、Hydrogen（11-12）、Qwen4-Max（11-16）、GPT-6.2 Astra/Sol 与 MAI Code 2（11-17）之后，Google 将 Gemini 4 分成 fast/Hydrogen、Neon 中间层与 Carbon 高端层；但不同模型的实际任务成本/可靠性仍不能仅按每 token 定价判断。

**建议入史**：`编年/2026/11.md` 新增 11-18；Gemini 世家、`表/模型版本沿革表.md`、`志/AI Agent 生态.md`、产品治理相关志记录 Copilot 的套餐/管理员模型政策。无需改写 Hydrogen 首发日期；如后续核实 App 默认模型替换，再以分发渠道注明。历史意义是重要新型号及实质商业可用性，低门槛应入库。

来源：
- [A] Google 官方 2026-11-18：https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-neon/
- [A] GitHub 2026-11-18：https://github.blog/changelog/2026-11-18-gemini-4-neon-in-github-copilot/
- [B，第三方文档核对] https://cellcog.ai/blog/gemini-4-neon/
- [C，单用户体验] https://www.reddit.com/r/GoogleGeminiAI/comments/1xzsgwe/gemini_4_neon_is_live_across_the_gemini_app/

## 二、Anthropic IPO 正式定价与注册生效（2026-11-18）

**事实（A：Anthropic 11-18 官方公告）**：Anthropic 将 A 类普通股 IPO 定价 **每股 $83**，共 **980,000,000 股**，其中公司新发 **956,351,354 股**，售股股东出售 **23,648,646 股**。SEC 注册声明 **11-18 已生效**。预计 **11-19** 在 Nasdaq 以 **ANT** 交易，预计 **11-20** 完成交割，承销商有 30 天最多 **147,000,000 股**的额外购买选择权。不能把预期交易/交割写成已完成。

按定价直接乘算，基础发行总额约 **$81.34B**（非公司全部到账），公司新股对应约 **$79.38B**、售股股东约 **$1.96B**，均为**未扣承销费用的算术毛额**，不是净募资、估值或实际现金到账。额外选择权不计入基础发行；实际行权/交割须后续核验。此节点推进 10-26 S-1、11-10 路演的时间线，不能重复写成首次 IPO 申请或已经上市。

**竞争及历史意义**：这是前沿模型企业从私募融资转入公开资本市场的明确法律/价格节点，可能影响融资与治理透明度，但并不证明其研发效率、财务盈利或竞争胜负。独立交易市场反应必须等 11-19 实际交易后观察。SEC 申报及最终招股说明书、承销费用、治理权安排仍需单独复核。

**建议入史**：`编年/2026/11.md` 11-18；Anthropic 世家、公司/资本相关志及融资沿革表。对 #79 11-10 路演条目增加“后续进展”交叉链接，不覆盖原日期。证据等级：定价/注册生效 A（公司公告），证券交易、交割、资金到账未证；无用户体验或模型能力 benchmark 可适用。

来源：
- [A] Anthropic 2026-11-18：https://www.anthropic.com/news/anthropic-prices-initial-public-offering
- [A，待独立核对] SEC EDGAR 注册生效及最终招股书：https://www.sec.gov/edgar/search/

## 三、同日其他治理与 Agent 变化：候选，暂不混入两项主节点

GitHub 11-18 Changelog 另公布 GitHub CLI v2.105.0 可等待 PR Event Streams、八个新增 GitHub-verified MCP connectors（公开预览）、组织团队共享 Copilot plugins（GA）及 GitHub Team 自动安全风险评估。这些均为产品功能/使用条件变化，值得后续单独核验实际权限、配置、适用套餐、限制并增量入库，不能仅凭列表标题认定所有账户立即可用。

Reuters 11-18 报道美国政府讨论要求企业披露使用中国 AI 模型；目前仍是**考虑中的政策**，未有正式规则或生效日期，暂记观察，不写成已施行禁令。来源：https://www.reuters.com/world/china/trump-administration-weighs-forcing-us-firms-disclose-chinese-ai-use-2026-11-18/

**审阅要求**：核对 Google API 原始模型卡与实际返回型号、定价版本及 rollout；核对 SEC 最终文件和 11-19 交易事实；独立评测不可与官方引用混同；不要自动合并本研究包或重复在途 PR。
