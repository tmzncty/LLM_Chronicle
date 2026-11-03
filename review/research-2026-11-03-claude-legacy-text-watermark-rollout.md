# 2026-11-03：Claude 旧型号文本水印开始扩围

> 状态：增量研究包。重点记录“此前宣布的兼容/合规计划”在 2026-11-03 进入实际生效阶段；不要把 11 月 3 日误写成 Anthropic 首次推出文本水印。

## 事件

Anthropic 此前向 Claude Platform 客户发出通知：自 **2026-11-03** 起，开始把既有的不可见文本水印扩展到 **Claude Mythos 5、Claude Opus 4.7、Claude Opus 4.6、Claude Sonnet 4.6**。较新的 Claude 型号（包括 Opus 5.5）此前已经携带同类水印；Amazon Bedrock 的扩围可能晚数日。

这次应记作 **announcement → effective rollout** 的第二阶段状态变化，而不是新模型发布，也不是 Anthropic 第一次宣布水印。

## 准确日期与时间线

- **2026-08-14**：Anthropic 已公开解释 Claude 文本水印及其合规背景；仓库此前已有相关历史背景，不应重复制造“首次水印”节点。
- **2026-10-28 前后**：面向相关 Claude Platform 客户的通知截图开始公开流传，明确给出 11 月 3 日生效日。
- **2026-11-03**：通知所列四个较旧型号在 Anthropic 自有 surfaces 上进入水印扩围生效日；Bedrock rollout 可能需要额外数日。

## 核心事实

### 覆盖型号

- Claude Mythos 5
- Claude Opus 4.7
- Claude Opus 4.6
- Claude Sonnet 4.6

Anthropic 的支持材料把其自有 surfaces 描述为 Claude Platform/API、Claude apps、Claude Code 等产品面。较新的 Claude 型号已经采用同类文本水印，因此本次变化的核心是 **retrofit / coverage expansion**。

### 水印是什么

Anthropic 的方案属于不可见的统计文本水印：不向输出插入可见标签或隐藏字符，而是在生成过程中对近似等价的词/token 选择施加可检测的统计模式。检测结果应理解为概率证据，而不是作者身份或某个具体用户/组织的证明。

水印本身不携带用户、组织或对话身份信息；“检测到水印”最多支持“Claude 很可能参与生成或改写过这段文本”，不能推出“Claude 独立创作了全文”。

### sampling 配置边界

客户通知与后续报道指出，**Opus 4.6 与 Sonnet 4.6** 的水印依赖默认 sampling settings；如果应用修改 `temperature`、`top_p`、`top_k`，水印可能不再应用。因此需要水印满足自身合规流程的开发者不能只看 model id，还必须记录 inference configuration。

这使治理对象从：

`model version → output policy`

进一步变成：

`model version × provider surface × inference configuration → output provenance signal`

### 云平台 rollout 不是同一时刻完成

Anthropic 自有 surfaces 的生效日与第三方云分发不能混写。客户通知明确提示 **Amazon Bedrock 可能额外需要数日**。因此 11 月 3 日不能写成“所有 Claude 分发渠道同时完成扩围”。Google Cloud / Microsoft Foundry 等渠道也应以后续实际文档/行为为准。

## 一手与独立证据

### A / B：Anthropic 官方材料

1. Anthropic Help Center / 官方说明：Claude AI-generated content marking / text watermarking。官方材料说明水印机制、适用 surfaces、检测边界、身份不可追踪性以及新旧型号逐步覆盖。
2. Anthropic 客户通知：标题/正文被多名 Claude Platform 客户公开，明确写明 2026-11-03 对 Mythos 5、Opus 4.7、Opus 4.6、Sonnet 4.6 开始应用水印，并提示 Bedrock 可能晚数日。

注意：11 月 3 日这一精确日期最初主要来自客户通知，而非早期公开新闻稿。因此研究中应保留“public help page / customer communication”的来源层级差异。

### B / C：独立报道与交叉核验

- GIGAZINE（2026-11-02）独立报道四个旧型号将于 11 月 3 日扩围。
- MACCUS（2026-10-31）保存并交叉说明客户邮件、型号范围、Bedrock 延迟与 sampling caveat。
- 多家技术媒体在 10 月 31 日—11 月 2 日独立报道同一通知；这些报道可用于证明通知传播与开发者影响，但不替代 Anthropic 对机制本身的官方说明。

## 社区/开发者评价与分歧

首轮社区争议主要集中在三点：

1. **普通输出接收者无法自行验证**：Anthropic 的检测能力仍主要面向获批的监管、媒体、研究、教育或合规组织，而不是开放公共 detector。
2. **“Claude touched the text” 与“Claude authored the text”容易被混淆**：翻译、校对、润色也可能留下统计信号，因此水印不应被当作作者身份或学术不端的单独证明。
3. **可移除性与 sampling caveat**：大幅重写、再生成，以及部分旧型号的非默认 sampling 配置可能削弱/消除信号。这限制了水印作为强 provenance primitive 的可靠性。

这些属于使用影响与治理争议，不应写成“水印已经被普遍破解”或“检测完全无效”。目前没有足够独立数据支持这两种极端结论。

## 与最近 30 天产品/治理格局的关系

10 月以来，多家 frontier provider 正在把“AI 生成内容可识别性”从研究话题转为实际产品规则：Anthropic 已对新型号采用文本水印；OpenAI 也在 EU / API 产品面推进文本 provenance / watermarking；SpaceXSI/xAI 已宣布 11 月 7 日起对七个 Grok API 型号默认启用不可见文本水印。

因此 11 月 3 日的意义不在算法首创，而在 **旧型号 retrofit**：监管/产品规则开始向既有在役模型回填，而不只绑定未来新型号。

可形成一条治理演进链：

`new-model-only marking → legacy-model retrofit → provider-wide coverage → cloud-distribution lag → inference-config-dependent provenance → detection/access governance`

## 为什么值得留档

这是一个实质的**政策生效/产品行为变化**：同一个旧 model id 在 11 月 3 日前后可能产生不同 provenance characteristics，影响 API 客户的合规、文本处理、审计和下游披露策略。

它同时说明模型史不能只记录 weights / capability / price；对于长期在线的 API 型号，provider 可以在不更换 model id 的情况下改变输出治理行为。

## 建议写入位置

- **编年**：2026-11-03，简记“Anthropic 将既有文本水印扩展到 Mythos 5 / Opus 4.7 / Opus 4.6 / Sonnet 4.6；自有 surfaces 生效，Bedrock 可能滞后”。
- **志：安全、治理与 provenance**：与 2026-08-14 的水印机制条目串联，明确这是 rollout/coverage expansion。
- **表：模型访问/治理规则**：增加 `text watermark / effective date / surface / sampling caveat / detector access` 字段。
- **Anthropic 纪/世家**：只需状态更新，不应重写成新的模型发布。

## 是否需要修订已有条目

需要对 2026-08-14 Anthropic 水印条目增加后续状态链接：从“机制/计划”推进到“2026-11-03 对四个旧型号实际扩围”。不要删除或覆盖原始宣布日期。

## 仍不能推出的结论

- 不能推出 Amazon Bedrock 已在 11 月 3 日同刻完成 rollout；官方通知反而提示可能晚数日。
- 不能推出所有 cloud partners 已同步完成。
- 不能推出水印可以确定作者身份、用户身份、组织身份或完整生成链。
- 不能推出检测对任意长度、任意编辑、翻译、paraphrase 后文本都可靠。
- 不能推出水印对质量/创造力“绝对零影响”；厂商宣称与独立可重复测量应分开。
- 不能把社区对 detector access、误用风险的担忧写成已经发生的大规模误判事实。

## 后续观察点

1. Bedrock 实际完成扩围的日期，以及 Google Cloud / Microsoft Foundry 的同步状态。
2. Opus 4.6 / Sonnet 4.6 非默认 sampling 参数是否持续构成明确例外。
3. Anthropic 是否开放更广泛 detector access、发布 false-positive / false-negative / robustness 数据。
4. 11 月 7 日 Grok API 默认水印实际生效后，与 Anthropic / OpenAI 的 default、opt-out、检测权限形成横向比较。
5. 是否出现独立、可重复的 watermark robustness / quality / code-output 评测。

## Sources

- Anthropic, AI policy / content-marking and watermarking materials: https://www.anthropic.com/policy
- Anthropic Help Center, Claude AI-generated content marking (current support documentation; verify live model table when integrating into chronicle).
- GIGAZINE, “Anthropic will add text watermarks to older versions of Claude starting November 3rd,” 2026-11-02: https://gigazine.net/gsc_news/en/20261102-anthropic-expands-text-watermarking-older-claude-november-3
- MACCUS, “Claude’s invisible watermark reaches Opus 4.7, Opus 4.6 and Sonnet 4.6 on November 3,” 2026-10-31: https://maccus.fr/en/claude-text-watermark/
- SpaceXSI/xAI Docs, “Output Watermarking” (for cross-provider comparison; Grok default scheduled for 2026-11-07): https://docs.x.ai/developers/advanced-api-usage/watermarking

## 证据等级

- **事件日期/覆盖型号：A-/B+** — Anthropic customer communication reproduced by multiple recipients/reporters; public support material corroborates the coverage direction.
- **机制与检测边界：A** — Anthropic official explanation/support material.
- **Bedrock rollout lag：A-/B+** — customer communication; requires later behavioral/documentation confirmation.
- **社区影响：C** — early developer/community discussion; useful as reception evidence only.
- **生产可靠性/检测鲁棒性：未定** — 尚缺公开、独立、可重复的大规模评测。
