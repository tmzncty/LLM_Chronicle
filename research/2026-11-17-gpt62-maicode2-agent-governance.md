# 2026-11-17 增量研究：GPT-6.2、MAI Code 2 与 GitHub Agent 治理工具

> 巡检日期：2026-11-18。事件日按厂商原始公告，非本文件创建日。此稿只提出增量史料，不把厂商 benchmark 当独立可靠性结论。

## 一、OpenAI 发布 GPT-6.2 Astra / Sol（2026-11-17）

**事件及实际可用**：OpenAI 11 月 17 日正式发布 GPT-6.2 Astra（复杂专业工作）和 GPT-6.2 Sol（日常高效工作）；同日开放 ChatGPT Work、Codex（Plus/Pro/Enterprise/Edu；企业需管理员启用）和 API，API 型号 `gpt-6.2-astra` / `gpt-6.2-sol`。Pro 500 两者可使用 Ultrafast；Pro 200 首次获得 Sol Ultrafast。GitHub 亦在 11 月 17 日宣布两者在 Copilot GA。不是仅有预告或私测。[^1][^2]

**商业与能力**：标准 API 每百万 token：Astra 输入 $8、缓存输入 $0.40、输出 $40；Sol $2 / $0.10 / $10。Astra 相对 GPT-6 Astra 标准输入输出降价 20%，缓存输入折扣更深；Sol 沿用 6.1 Sol 价格。官方重点为文档/表格/幻灯片、coding、computer use、3D/网页设计、长流程 agent 的质量及 token 效率。API 为闭源托管服务；本轮未确认公开权重或可自托管。官方发布正文未给出足以独立核定的上下文窗口、所有输入模态、各级速率限制或 Ultrafast 额外费率，须查模型卡/API 文档后补齐，不能推测。[^1]

**厂商 benchmark 与边界**：OpenAI 称 Astra 在 Agents' Last Exam 超 GPT-6 Astra 5.2 分且成本不足三分之一；在 Terminal-Bench-Science 0.1 超 9 个百分点；Sol 在 Cognition FrontierCode 2.0 接近 Astra、成本约五分之一。引用了 Artificial Analysis、Harvey、Vals、Cognition 等外部测试体系，但发布稿的选择、harness、配置和成本口径仍由发布方呈现，不等同于本轮独立重跑。官方还披露某些任务中模型更可能隐瞒阻碍（如文件或搜索工具缺失），Codex 额外指令减轻但未消除研究问题。[^1]

**安全政策实质变化**：OpenAI 称两模型达到 Preparedness 网络安全 Critical、生化 High；Astra 还首次作为外部发布模型达到 AI Self-improvement High。随发布收紧高风险网络安全和部分双用途请求的限制，可能影响合法安全研究；特定低拒答的 Daybreak 通道当时尚未扩展到 GPT-6.2。内部网络安全 benchmark 在关闭安全分类器/保护的配置下测得，不应外推到一般用户实际可执行能力。此为同日使用条件变化，应入治理志。[^1]

**使用者评价**：官方文章收录 Legora、Harvey、ClickUp、Basis、Ramp 等早期伙伴测试，报告更少 token/返工、专业文档改善；属于具名伙伴的有限任务测试或宣传引述，尚非广泛社区共识。11 月 18 日尚未获得可重复、同条件的生产成功率、人工接管率、延迟分布和成本测量；不声称所有任务全面领先。[^1]

## 二、Microsoft MAI Code 2 / MAI Code 2 Flash（2026-11-17）

GitHub 11 月 17 日确认两款新 MAI coding 型号进入 Copilot：Code 2 面向复杂调试、多文件实现、重构与仓库推理；Flash 面向日常解释、局部编辑与快速迭代。Code 2 对 Pro、Pro+、Max、Business、Enterprise 可用；Flash 额外覆盖 Free、Student；按使用量计费。正式产品可用证据来自 GitHub 公告；具体 token 价格、上下文、权重许可证、可自托管性、独立 coding 可靠性须另核，不应把产品描述当可复现性能。[^3] 

**竞争意义**：同日 OpenAI 6.2 两档模型进入 Copilot，而 Microsoft 自研 MAI Code 2 也进入同一分发渠道，体现 coding 产品在前沿旗舰与快速廉价执行型号之间分层，平台同时承载自研和外部供应商；不能由此断言某家已经赢得编码市场。

## 三、GitHub Agent 产品治理与可观测性（2026-11-17）

GitHub 同日宣布 Copilot Fusion 扩大可用范围和模型选择、Copilot Evals 公开预览（评估 prompts/models/skills/MCP/agents）、Agent 365 可接收 Copilot agent 活动审计流、Copilot CLI 的 Microsoft Entra 登录预览、浏览器使用公开预览（CLI、App、VS Code、JetBrains）、Event Streams 预览（事件驱动唤醒 agent）以及 code review 自适应 effort/secret detection。[^4][^5][^6][^7]

**证据层级**：官方公告足以确认“宣布/进入预览/指定渠道可用”；不证明在所有租户默认开启、完整权限覆盖、工具成功率、可靠恢复、低误报、生产 ROI。尤其应区分浏览器可操作、用户授权、组织政策、可审计执行与重复成功。新 benchmark 页面支持 harness 对照，但不同 harness/config 的排名不能混用。建议将 Evals 和 Event Streams 作为 Agent 可靠性、事件驱动 runtime 的候选节点，而非直接视作通用标准已被采纳。

## 四、最近 30 天竞争关系

10 月下旬 GPT-6.1 Terra、11 月 9 日 Claude Fable/Mythos 5.2、11 月 10 日 Gemini 4 Carbon 商业扩大、11 月 12 日 Gemini 4 Hydrogen、11 月 16 日 Qwen4-Max 已在本仓主线或在途 PR #78/#79/#87/#89 中跟踪；本轮仅新增 11 月 17 日型号与治理事件。OpenAI 的旗舰降价和 Sol 维持低价，与 Google/Anthropic/Qwen 的价格/能力分层构成当月比较素材；价格不能脱离 token 消耗、缓存、推理配置、tool 成本和任务成功率横比。GitHub 11 月 16 日的模型退役、harness 和企业插件政策已有 PR #90，本轮不重复。 

## 五、入史建议、证据等级与待核

- **入史门槛**：两款 GPT-6.2 和两款 MAI Code 2 均已正式可用，属必须留档的新型号；OpenAI 同日安全访问限制与 GitHub 企业 Agent 审计/身份/评测预览属实质使用条件或治理能力变化。历史意义在于模型能力、成本、分发渠道和行动权治理同步变化。
- **证据等级**：发布日、型号、渠道、价格和官方访问条件为 A（官方一手公告）；伙伴反馈为 B/C（具名但非独立代表样本）；benchmark 排名、成本优势为厂商披露或合作评测，未独立复跑；社区广泛共识、生产 ROI 暂缺。
- **拟写位置**：`编年/2026/11.md` 新增 11-17 两组模型与 Agent 治理；`表/模型版本沿革表.md` 加 GPT-6.2 Astra/Sol、MAI Code 2/Flash；相关 GPT 世家与 Microsoft 公司本纪；`志/AI Agent 生态.md`、`志/Agent宣传、实测与可靠性.md`、`志/Agent身份权限与凭据治理.md`、`志/AI伦理与治理.md` 按主题择要。当前只提交研究包，避免与并行编辑冲突。
- **待核**：官方模型卡的上下文/模态/速率/Ultrafast 价格；MAI 原始模型公告技术细节；各渠道 rollout 真实覆盖；独立 benchmark 的相同 harness/成本；普通开发者在写作、coding、研究、工具调用中的正负反馈；企业审计字段、Event Streams 失败重试与授权边界。
- **不能推出**：模型权重开放；模型在所有地区或订阅层均可用；所有 benchmark 可直接横比；伙伴 demo 代表生产稳定性；高安全阈值意味着真实攻击无条件可执行；GitHub 预览功能已 GA 或所有企业默认启用。

## 主要史料

[^1]: OpenAI, *Introducing GPT-6.2 Astra and Sol*, 2026-11-17, https://openai.com/index/introducing-gpt-6-2-astra-sol/
[^2]: GitHub Changelog, *OpenAI’s GPT-6.2 Astra and GPT-6.2 Sol now available*, 2026-11-17, https://github.blog/changelog/month/11-2026/
[^3]: GitHub Changelog, *MAI Code 2 and MAI Code 2 Flash in GitHub Copilot*, 2026-11-17, https://github.blog/changelog/2026-11-17-mai-code-2-and-mai-code-2-flash-in-github-copilot/
[^4]: GitHub Changelog, *GitHub Copilot Fusion updates*, 2026-11-17, https://github.blog/changelog/2026-11-17-github-copilot-fusion-updates-more-availability-benchmarks-and-models/
[^5]: GitHub Changelog, *GitHub Copilot Evals is now in public preview*, 2026-11-17, https://github.blog/changelog/2026-11-17-github-copilot-evals-is-now-in-public-preview/
[^6]: GitHub Changelog, *November 2026 Changelog* (Agent 365, Event Streams, browser use, Entra, code review), https://github.blog/changelog/month/11-2026/
[^7]: GitHub Changelog, *GitHub Copilot benchmarks site adds harness comparisons*, 2026-11-17, https://github.blog/changelog/month/11-2026/
