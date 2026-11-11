# 2026-11-09：Claude Fable 5.2 / Mythos 5.2 发布及分级访问

> 核验：2026-11-10（北京时间）。**事件日 11 月 9 日**，不是核验日。新模型与实质访问政策按低门槛入库。证据分层：A=官方可核发布/规则，B=独立平台确认上架，C=合作方/早期社区观察，D=尚未独立复现。

## 事件与事实

Anthropic 于 **2026-11-09** 正式发布 **Claude Fable 5.2** 与 **Claude Mythos 5.2**。官方明确两者使用**相同底层模型**，差别在于 safeguards 与准入：Fable 带更严格的网络安全及生物安全防护，面向一般用户；Mythos 的相应能力经 Cyber Verification Program 或 Life Sciences Verification Program 向符合条件的专业组织开放。不能当作两套独立权重或开放权重发布。

官方宣布 Fable 5.2 当日覆盖 Claude 平台、AWS、Google Cloud、Microsoft Azure，Claude Platform 模型 ID 为 `claude-fable-5-2`；Mythos 5.2 需通过验证计划申请，不能推断普通 API 账号可直接调用。GitHub 2026-11-09 Changelog 同日确认 **Fable 5.2 在 GitHub Copilot GA**，构成独立产品渠道的上架证据（但不是独立模型能力测试）。

**价格与速度**：官方标准 API 报价每百万输入 **$8**、输出 **$40** token；可选 fast mode **$16 / $80**，宣称最高 2.5 倍生成速度。官方称相较 5.1 输出最高快 30%；均为厂商声明，不能混为同 harness 的第三方测速。Fast mode 已声明覆盖 Claude Code、Claude Platform、Google Cloud 的相应托管渠道及 Microsoft Foundry；Mythos fast mode 仍限验证组织。Pro 和 Team 标准席位的临时用量优惠有时间及资格条件，不可当作永久额度。官方页面未在本研究直接核定上下文窗口上限、缓存费率、完整区域/账号可用矩阵、模型权重/本地部署，均留待核验；不可编造。

**能力与边界**：官方宣称 coding、reasoning、vision 与科学工程任务提升，并展示长时间多 agent 编程、物理研究、蛋白结构和硬件设计案例。它们分别是厂商内部实验、合作方测试或示范，**不等于**独立可复现的科学成果、无监督长期可靠性或 ROI。官方称为抑制特定前沿 AI 研发加速，训练时对 accelerator kernel 优化与模型架构改进相关能力做了限制，并在部分主题透明回退至 Opus 5；这是有意义的 **capability-specific policy/model routing**，不可写成全域性能领先。

**治理规则同时变化**：官方宣布 preserved thinking 扩至所有 API 账号，旨在降低通过篡改此前思考上下文进行蒸馏的可能性。应另行验证 API 实际行为、兼容性和 rollout；不能直接推断所有第三方平台同时实施。反蒸馏“减少 90–99%”来自厂商自测。

## 证据与社区评价

- **A / 官方发布、定价、可用性、分级政策**：Anthropic, *Claude Fable 5.2 and Mythos 5.2*, 2026-11-09，https://www.anthropic.com/claude-fable-and-mythos-5-2 。模型 ID、价格、fast mode、相同底模不同 safeguards、验证计划、preserved thinking 以及案例均源于此。模型性能数字和成功案例仅记为**官方声称**。
- **B / 第三方渠道上架**：GitHub Changelog, *Claude Fable 5.2 in GitHub Copilot*, 2026-11-09，https://github.blog/changelog/month/11-2026/ 。证实 Copilot GA；不代表 GitHub 独立验证了 Anthropic 所有 benchmark。
- **C / 合作方经验**：官方页面引用 Mozilla 与 Rubrik 的安全研究评价。Mozilla 称其扫描指标相较 Mythos 5.1 约翻倍，但测试依赖特定目标、harness 和预发布渠道；不能推出所有真实仓库的漏洞发现率翻倍。
- **C / 社区初期且分歧**：https://modelsentiment.com/m/claude-fable-5.2 于 2026-11-10 汇总 Reddit 初期 68 讨论串、395 条意见，指标 47，区间 42–51 跨中性，认为总体无明确倾向；智能表现被赞较多、任务执行评价分裂。该站抽样、情绪分类、重复用户及热度偏差尚未审计；只能当**初期反应线索**，不能当独立 benchmark 或广泛共识。
- **D / 尚缺**：同 prompt、token budget、thinking/fast mode、工具、harness、缓存及价格条件下与 Fable 5.1、Mythos 5.1、Opus 5.5、GPT-6.1、Gemini 4 等的独立复现；API 延迟分布、错误率、长任务恢复、科学成果同行复核、真实部署成本与 ROI。官方的“>90% 内部代码变更由 Claude 撰写”不是模型 5.2 单独带来的因果效果。

## 最近 30 天竞争格局与史义

10 月 GPT-6.1 Terra、Gemini 4 Carbon、Mistral Large 4、Kimi K3.1 Pro 等已构成不同的速度、开放权重、Agent 能力竞争线；11 月 4 日 OpenAI Images 2.6 属于图像创作另一赛道，不能横比。Fable/Mythos 5.2 的实质增量在于 **同底模按风险分级访问 + 降价/加速 + 科学工程及长时 Agent 展示 + preserved thinking 扩围**；模型发布、开发者使用规则与供应渠道同日变化，足以独立留档，不必等月度竞争胜负。模型声称的科学突破须等论文与独立检验，不得直接定性“解决数学/物理长期难题”。

## 建议入史位置与旧条目关系

- **编年/2026/11.md（待建）**：11 月 9 日新型号、价格、渠道及访问规则；另标 preserved thinking 扩围为同日政策节点。
- **纪传/世家/Claude.md**：承接 2026-09-15 Fable/Mythos 5.1 与风险分层谱系；本次为 5.2 演进，非 Fable/Mythos 初次分化。
- **志/AI Agent 生态.md**：长时多 agent 原型与实际生产可靠性的证据边界；**志/AI伦理与治理.md**：验证计划、特定能力训练约束、蒸馏防护和 preserved thinking。
- **表/大事年表.md**：建议月度整理时择要纳入 11 月 9 日正式发布；勿将 Copilot GA 再写成另一个 foundation model。
- **既有研究包**：`review/research-2026-11-09-images26-backfill.md` 是 **11 月 4 日** Images 2.6 的后补，时间与模型均不同，不重复；旧 Fable/Mythos 5.1 记录无须覆盖，仅需未来补 5.2 续条。

## 尚不能推出

两个独立底模；Mythos 面向所有用户开放；开放权重或可本地部署；所有云渠道同时实际可调用；30%/2.5× 的独立可复现加速；合作方个例代表一般可靠性；科学突破已被独立同行确认；模型在全部 AI 研发领域无约束领先；preserved thinking 已在每个 API 代理商同步落地；已产生可量化 ROI。
