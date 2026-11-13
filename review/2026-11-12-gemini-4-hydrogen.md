# 2026-11-12：Gemini 4 Hydrogen 发布、Search 默认模型切换与 Antigravity Orchestrator

> 增量研究包；核查日 2026-11-13。事件日期按 Google 官方公告所列 2026-11-12，不能将 11 月 13 日媒体刊发日当作发布日期。

## 事件与事实

**2026-11-12**，Google 正式发布 Gemini 4 Hydrogen，作为 Gemini 4 家族的快速执行/日常 coding 与 Agent 模型，与偏重深度长程任务的 Argon、Carbon 分层。官方称当日开始向 Gemini API、Google AI Studio 各层级、Gemini for business、Gemini App、Google Search 以及付费 Pro/Ultra 的 Antigravity 推出。**宣布并开始 rollout 不等于每个账号当日均可使用。**

- **定价与上下文**：1M token 上下文；每百万输入 $1.50、输出 $7.50，官方明确全上下文统一价格。开放权重、许可证和自托管：未见公开权重发布，不得写作开源。
- **能力定位**：日常代码修改、调试、工具调用与多模态工作流；low / medium / high（默认）/ xhigh 四档 thinking。官方页面称支持多模态；具体各模态输入输出、API 型号、长输出限制、缓存折扣与各地区配额应以正式模型卡/API 文档补核，不从营销文案推断。
- **产品治理/默认行为**：Google Search 官方宣布将 Hydrogen 引入全球搜索；独立媒体报道其成为 AI Mode 默认模型，并用于更复杂的 AI Overviews。免费 Gemini App 用户由自动模型选择获得 Hydrogen，并非保证免费账号拥有手动选模权限。Antigravity 仅向符合条件的付费 Pro/Ultra 开放。
- **Agent 编排**：Google 同时介绍 Antigravity **Orchestrator**，可在同一 session 内在 Carbon/Hydrogen 等模型之间动态切换；厂商自测 Terminal-Bench 4.0 接近 Carbon 成功率、配额少 24%、速度快 19%。这是功能发布与官方评测，**不是生产环境可重复 ROI**。
- **官方指标**：Google 引述 Artificial Analysis Intelligence Index：Hydrogen high 51、xhigh 54、Argon 50；并声称在工具/Agent 安全、幻觉与速度方面改进。指数配置、thinking budget、输出 token 和任务成本不同，不能直接推出全面超越 Argon/Carbon。

## 一手与独立证据及等级

1. **A：厂商一手公告/产品访问宣告**：Google, “Introducing Gemini 4 Hydrogen”, 2026-11-12。https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/
2. **A：厂商开发者公告**：Google, “Gemini 4 Hydrogen: everyday coding and agentic workflows for developers”, 2026-11-12。https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-4-hydrogen/
3. **A：搜索产品行为公告**：Google, “Google Search gets a major upgrade with Gemini 4 Hydrogen”, 2026-11-12。https://blog.google/products-and-platforms/products/search/gemini-4-hydrogen-search-upgrade/
4. **B：独立新闻核对发布与定价/产品分层**：Ars Technica, 2026-11-12。https://arstechnica.com/google/2026/11/google-rolls-out-gemini-4-hydrogen-finally-replacing-3-8-flash/
5. **B：独立新闻对 Search 默认行为的说明**：The Verge, 2026-11-13。https://www.theverge.com/ai-artificial-intelligence/1032505/google-search-ai-mode-gemini-4-hydrogen
6. **C：用户报告，非普遍事实**：Google 开发者论坛，2026-11-12/13，付费 Pro 用户反映 Antigravity 中 Hydrogen/Argon 显示 unavailable，而 Gemini Web 可用。https://discuss.ai.google.dev/t/entitlement-desync-paid-annual-google-ai-pro-user-gemini-4-hydrogen-argon-marked-unavailable-in-antigravity-app/199992 ；https://discuss.ai.google.dev/t/unfair-restriction-of-gemini-4-hydrogen-for-jio-bundled-google-ai-pro-subscribers-in-antigravity/200156

**证据分层**：发布与公布价格为厂商正式文件；默认模型切换有官方 Search 公告及媒体核对；跑分与 Orchestrator 降本数据是厂商选定配置下的测试（Artificial Analysis 指数数值需另核独立榜单当日快照）；论坛仅能证明出现过用户投诉，不能确认故障规模、根因或官方政策改变。暂无独立多次运行、长任务可靠性和生产财务数据。

## 近 30 天竞争位置与史识

10 月 Gemini 4 Argon、10 月末 Carbon 受限预览、11 月 10 日 Carbon 商业开放之后，11 月 12 日 Hydrogen 补齐更广泛可用的**快速执行层**。与 Anthropic 11 月 9 日 Fable/Mythos 5.2 的分级访问形成对照：竞争不仅是单次 benchmark，而是深度推理模型、廉价 worker、API 价格、订阅资格与 Agent 多模型编排的组合。Hydrogen 同时进入 Search 默认路径，影响范围不止开发者 API，而是日常用户可见答案与站点流量来源；需观察 rollout 和实际引用质量。

**为何值得入史**：正式新型号 + 可核定 API 定价 + Google Search 默认模型变化 + 多模型 Agent 编排，均直接改变用户/开发者可用性，符合低门槛增量记录标准。

## 建议归档与后续修订

- **编年/2026/11.md**：增补 11 月 12 日 Hydrogen 发布与 Search 默认变化，避免把已有 NVIDIA 事件覆盖。
- **世家/Gemini**（按仓库实际路径核对）：记录 Argon/Carbon/Hydrogen 的产品分层、价格、access tier。
- **志/AI Agent 生态.md** 与 Agent 产品/可靠性相关志：Orchestrator 作为“模型路由/分工”节点，标明厂商 benchmark。
- **表/大事年表.md** 与模型版本表：根据表的严格门槛判断是否入主表；至少在模型版本表登记。
- 本次不改动 11 月 10 日 Carbon 已有记录；如既有 11 月编年仅记录 NVIDIA，则后续整合时补入模型事件，不应删除原条目。

## 仍不能推出

不能认定所有订阅账号已同步授权、Search 所有查询都由 Hydrogen 处理、独立验证了官方安全/性能改善、Hydrogen 在所有任务上优于 Argon、Orchestrator 已证实生产 ROI，或公开了可自托管权重。社区对可用性存在早期分歧，须后续用官方工单、实际 API/账户实测与可重复评测核验。
