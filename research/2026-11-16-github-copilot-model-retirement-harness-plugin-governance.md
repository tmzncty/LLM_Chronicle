# 2026-11-16 GitHub Copilot 模型退役、VS Code harness 迁移与企业插件治理

> 增量研究包；核查日 2026-11-17。三项独立政策/产品事件均见 GitHub 2026-11-16 官方 Changelog。**不是三个新基础模型发布**。截至核查时未找到可重复独立迁移/稳定性测试，故不写生产可靠性结论。

## 一、事件与准确日期

### A. Copilot 三个型号停止常规提供（2026-11-16 生效，2026-10-15 预告）

GitHub 宣布自 11 月 16 日起在多数 Copilot 使用界面（Chat、inline edits、ask/agent modes、补全）弃用 **Claude Opus 4.8、Claude Opus 5、GPT-5.6 Terra**。建议替代分别为 **Claude Opus 5.5、Claude Opus 5.5、GPT-6.1 Sol 或 GPT-6 Luna**。重要例外：Opus 4.8 对年度付费个人订阅者仍可用；Opus 5 虽从模型选择器移除，仍可经既有授权用于运行时拒绝回退。企业默认模型启用时，替代型号自动启用，但全局默认关闭或显式禁用时不自动开启；组织策略继续生效。**不能据此推断 Anthropic/OpenAI 自家 API 同日下线**。

一手：https://github.blog/changelog/2026-11-16-github-copilot-models-deprecated-on-november-16-2026/
先前公告由该页链接指向 2026-10-15 通知，需在后续档案中保存快照。

### B. VS Code Local harness 进入退役期（2026-11-16 宣告/1.146 弃用；2027-02 计划移除）

VS Code 1.146 弃用原 Local harness；自 VS Code 1.143 起，新会话默认采用 Copilot harness。2027 年 2 月计划移除 Local harness，包含企业临时例外设置 `vscode.temporaryDefaultToLocalHarness`。Copilot harness 基于 Copilot SDK，与 CLI、Copilot app 共享 coding-agent runtime；可继续在本机执行，不意味着本地文件自动迁云。自定义配置不会自动全部转换，且**选择新 harness 不等于已开启 sandbox**。企业权限、沙箱配置与工具行为需分别测试。

一手：https://github.blog/changelog/2026-11-16-vs-code-retires-the-local-harness-in-february-2027/

### C. 企业可限制 Copilot 自定义能力的来源（2026-11-16 宣告现可配置）

GitHub Enterprise Cloud 管理员可通过 `strictPluginOnlyCustomization`，对 skills、custom agents、hooks、MCP servers、可执行 Copilot extensions 五类中的部分或全部禁止独立用户/项目配置，仅允许符合条件的插件或托管设置。该选项**本身不是 marketplace allowlist**，如需限制来源，还需与 `strictKnownMarketplaces` 等政策结合。适用企业或组织签发的 Copilot Business / Enterprise 许可用户；并非所有个人用户默认受到限制。

一手：https://github.blog/changelog/2026-11-16-control-where-github-copilot-customizations-come-from/

## 二、证据等级与独立评价

- **官方一级证据（高）**：以上三篇 GitHub 当日 Changelog 直接说明规则、范围、例外及实施/计划日期；能证明官方公告及厂商报告的产品状态。
- **实际部署（有限）**：官方写“as of today”/“can now”，但未进行跨账号、跨地区、不同组织策略的独立实测。
- **独立 benchmark / 社区体验（缺口）**：截至本次核查未取得有代表性的对照评测、迁移成功率、MCP 插件误阻断率或组织管理员反馈。不能把没有报告解释为没有故障；也不能声称新 harness 生产稳定性优于旧版。
- **长期效果（未知）**：无证据可推出模型替代后 coding 成功率、成本、数据保留实际变化或治理 ROI；不同模型、harness 和组织策略构成重要混杂因素。

## 三、最近 30 天竞争/产品关系

10 月 15 日的型号退役预告在 11 月 16 日真正进入使用条件；同期 11 月上旬 Claude Fable 5.2、Gemini 4 Carbon/Hydrogen 等陆续进入 Copilot 生态（详见在途研究 PR #78、#79、#87）。**分发渠道内的模型生命周期**与**上游模型发布生命周期**不同。11 月 16 日的新变化是 GitHub 选择器/策略层的实际迁移，而不是基础模型首次问世。Local→Copilot harness 迁移又将模型选择、工具权限、会话延续和可配置来源收束到同一运行时治理层。

## 四、史学意义、建议位置与修订

1. **编年/2026/11.md**：新增 11-16 三项短条；分别注明“已生效”“已弃用、未来移除”“可配置”，不要写为同一事件。
2. **志/AI Agent 生态**及 Agent 身份/权限/凭据相关志：记录 runtime 迁移与插件来源治理；区分“管理员可开启”与“所有用户已受限”。
3. **表/模型版本沿革表**：增加 GitHub Copilot 分发渠道的型号退役行，并标注 Opus 4.8 年付个人例外、Opus 5 fallback 例外；不要标为全球 API 停服。
4. **大事年表**：是否纳入须按该表更高门槛评估；本研究包的存在不要求三条全部进入大事年表。
5. **已有条目**：核对 10-15 预告与 11 月在途型号发布研究包；本次未修改正文，避免覆盖并行 PR。

## 五、不能推出与后续核验

不能推出：所有用户同日失去三个型号、所有 VS Code 本地 Agent 停用、插件来源限制自动强制实施、新 harness 默认开启 sandbox、迁移后可靠性/安全性已独立证明。后续建议留存官方文档快照、检查 2027-02 实际移除、抽样企业策略实测，并收集 GitHub Community/开发者的具体迁移失败与成功案例；样本、版本、设置和时间须随证据一同记录。
