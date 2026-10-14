# 2026-10-12—13 研究包：Muse Wonder、蒸馏防御与自主复制评测

> 状态：增量研究包。日期按事件实际发布/发生日期记录，不按二次报道日期倒灌。

## 1. Meta 发布 Muse Wonder / Muse Wonder Full

### 事件与日期

- **事件日期：2026-10-12。** Meta Superintelligence Labs 正式发布 **Muse Wonder** 与 **Muse Wonder Full**，属于新的 frontier-class 型号，而不是 Muse Spark 的小修订。
- Muse Wonder 已通过 **Meta Model API** 提供，并进入 Muse Code；公开报道给出的 API 标识为 `muse-wonder-1.0`。
- Muse Wonder Full 是更高能力档，首发访问面与标准 Wonder 不同：公开资料显示主要通过 Muse Code 的高阶订阅提供，而非普通 API。

### 核心事实

- Muse Wonder 的公开 API 价格为 **$4 / 1M input tokens、$20 / 1M output tokens**；公开资料同时显示约 **1M token context**。
- Meta 将 **Active Memory** 与 **Active Focus** 作为该代模型/Agent 体验的重要设计轴：前者强调跨会话保留并主动取回相关个人/任务信息，后者强调面对阻塞时持续尝试、改换方案并在重要行动前检查/询问。
- Meta 官方 benchmark 将 Wonder 系列放到 Claude / GPT frontier 档竞争，但首日不应把厂商自测等同于生产可靠性。
- 独立评测方面，Artificial Analysis 首日数据被多家独立报道引用：标准 Wonder 约 **52**、Wonder Full 约 **56**（Intelligence Index v4.3）。这属于独立 automated benchmark，不等于真实 Agent 生产采用。
- 首日社区反馈主要集中于：模型价格明显高于近期低价/中价模型；对 Active Memory / Active Focus 的长期 Agent 价值有兴趣；不同订阅层的 Wonder / Wonder Full 可用性出现混淆。样本仍小，不能形成广泛社区共识。

### 证据

**A-/B+：正式发布 + 多家独立报道 + 首日独立 benchmark。**

- Reuters, 2026-10-12, *Meta releases Muse Wonder AI models to challenge Anthropic and OpenAI*  
  https://www.reuters.com/business/meta-releases-muse-wonder-ai-models-challenge-anthropic-openai-2026-10-12/
- TechCrunch, 2026-10-12, *Meta releases its first frontier model, Muse Wonder*  
  https://techcrunch.com/2026/10/12/meta-releases-its-first-frontier-model-muse-wonder/
- Financial Times, 2026-10-13, *Mark Zuckerberg says Meta has reached AI 'frontier'*（独立报道；注意其发布日期晚于模型实际发布日）
- 首日 Artificial Analysis 结果由独立模型跟踪站点交叉引用；应在后续月度整理时直接核对 AA 榜单快照与 harness/config。

### 与最近 30 天竞争格局的关系

这不是单纯“Meta 又出一个模型”。在 Llama 4 之后，Meta 的 frontier 竞争路径出现明显产品分层：

`开放/轻量模型传统 → Muse Spark → Wonder API frontier → Wonder Full subscription-only high tier`

它同时把竞争焦点从单轮 intelligence 拉向 **memory × sustained focus × personal/professional agent**。价格上，Wonder 标准版 $4/$20 已进入 Opus 5.5 一档，而不是以低价抢量；因此需要继续观察它是否靠 memory/agent integration 而不是 token 单价获得采用。

### 不能推出

- 不能仅凭 Meta 官方 benchmark 宣称 Wonder / Wonder Full 总体超过 GPT-6、Claude 或 Gemini。
- Artificial Analysis 首日 aggregate score 不能证明长程 Agent、memory consistency、tool reliability 或生产 SLA。
- “Active Memory” 的产品存在不等于长期记忆准确、无污染、无隐私风险；需要真实跨会话测试。
- 不能把 Wonder Full 的 Muse Code availability 写成普通 API availability。

### 建议落位

- `编年/2026/10.md`：10 月 12 日新模型节点。
- 模型表：Meta / Muse Wonder / Wonder Full，分开记录 API 与 subscription surface。
- Agent 志：Active Memory / Active Focus，后续跟踪长期保持、失败恢复和重要行动确认机制。
- 月度竞争表：与 GPT-6.1 Sol、Claude Opus/Sonnet 5.5、Gemini 4 Argon、Mistral Large 4、Beam 横向比较。

---

## 2. Anthropic 公布新的 distillation attack 防御，声称数据收割下降约 90–99%

### 事件与日期

- **事件日期：2026-10-12。** Anthropic 发布《Strengthening our defenses against distillation attacks》，披露针对大规模未授权模型蒸馏的新防御措施及早期效果。

### 核心事实

- Anthropic 将 distillation attack 描述为利用大量欺诈账户、系统性查询 Claude 并收集输出，以较低成本复制 frontier capability 的工业化活动。
- Anthropic 称近期的新方法使攻击者能够收割的数据量下降约 **90–99%**。
- 这一数字属于**厂商根据自身平台遥测得到的早期证据**，不是第三方可复现实验；外部研究者通常无法取得相同的账户图谱、内部检测器和真实攻击流量。
- 历史意义在于 frontier capability protection 已经从“模型权重是否开放”扩展到 **API-output extraction / account identity / abuse detection / capability leakage**。API 本身成为模型资产保护边界。

### 证据

**A（政策/部署事实） / B（效果量级）。**

- Anthropic, 2026-10-12, *Strengthening our defenses against distillation attacks*  
  https://www.anthropic.com/research/distillation-defenses
- Reuters, 2026-10-13, *Anthropic says new safeguards sharply reduce AI distillation attacks*（独立确认公司已部署/披露，但 90–99% 效果仍来自 Anthropic 自身测量）

### 历史意义

应把 frontier-model 的“开放程度”拆成至少四层：

`weights × API access × output harvestability × downstream distillation rights/enforcement`

闭源 API 并不意味着能力不可复制；反过来，强化反蒸馏也会改变研究、批量评测、多账户企业使用和竞争对手训练的实际边界。后续需要观察 false positive、正常高吞吐客户影响、攻击适应以及防御效果是否持续。

### 不能推出

- 不能说蒸馏攻击已被消灭；90–99% 是早期、内部可观测范围内的下降。
- 不能从 Anthropic 的归因叙述自动推出某一特定竞争实验室违法或确实通过蒸馏训练了某个具体模型，除非有独立证据。
- 不能把“减少可收割数据”直接换算成“能力复制成本提高 90–99%”。

### 建议落位

- `编年/2026/10.md`：10 月 12 日产品治理/模型保护节点。
- 治理志：API abuse / distillation / account verification。
- 竞争表新增 `output extractability / anti-distillation` 维度。

---

## 3. Anthropic：小模型与 IoT 上的自主复制能力接近交叉点

### 事件与日期

- **事件日期：2026-10-12。** Anthropic Frontier Red Team 发布《AI models may be capable of self-replicating without access to a datacenter》。
- 这是研究/评测事件，不是现实世界 AI worm 事故。

### 核心事实

- Anthropic 将 autonomous replication and adaptation (ARA) 拆成 target discovery、execution/payload delivery、inference setup、continued propagation 等环节，重点研究过去较少评测的 **在异构低端硬件上自主建立 inference**。
- 其 demo 将 **Gemma4-26B-A4B** 分布式运行在 **15 台廉价 Android TV boxes** 上，约 0.39 tok/s，证明低端 IoT 集群在物理上可以承载一个具有一定能力的模型。
- 在异构硬件 inference-setup 评测中，小模型已经能完成相当部分工作；研究称一个 9B 模型可在测试的 9 类硬件中的 8 类建立推理环境。
- 在简化 cyber 条件的 8-node contained Android/GCP replication eval 中，**GLM-5.2** 是被测 open-weight models 中唯一能可靠完成端到端传播的型号：5 次 trial 中 4 次达到 8/8 nodes，1 次 7/8。
- 关键限制：实验把 cyber exploit 环节刻意简化（例如未认证 ADB），并且较大模型的 agent 本身运行在独立 inference server；因此这证明的是**能力链条接近闭合**，不是“GLM-5.2 已能在现实互联网自主形成 worm”。
- Anthropic 用能力趋势外推，认为若小模型按历史速度提升，capability floor 与可在 IoT 上运行的 size ceiling 可能在 2026 年底附近相交。这是预测，不是已发生事实。
- Memento harness 通过周期性启动新 agent、继承 workspace 与前代笔记来减少长程固着；Qwen3.5-9B 的代际笔记实验显示 inference-setup success 从首代约 45% 提高到后续约 61–84%。这是 contained evaluation，值得与 durable agent state / checkpoint / inherited memory 主线联动。

### 证据

**A（论文/实验存在与实验结果） / C+（现实世界时间预测）。**

- Anthropic Frontier Red Team, 2026-10-12, *AI models may be capable of self-replicating without access to a datacenter*  
  https://www.anthropic.com/research/self-replicating-ai
- Reuters, 2026-10-13, *AI models may soon self-replicate without access to data centers, Anthropic warns*（独立报道研究发布；现实风险判断仍主要来自 Anthropic 实验）

### 历史意义

过去 ARA 风险经常隐含“需要 datacenter/GPU”。这项工作把问题改写为两个移动阈值：

`agentic capability floor ↓` 与 `minimum runnable model size ↓ / edge compute ↑`

只要两者交叉，复制者理论上可以不依赖一个集中式数据中心持续存在。对 Agent 基础设施史而言，这也意味着 containment 不能只考虑 cloud credential revocation；未来还要考虑 **weight mobility、edge execution、network provenance、distributed inference 与 inherited state**。

### 社区/独立评价

截至首日，公开讨论主要由 Anthropic 研究本身和媒体转述驱动，还没有足够独立 replication harness 复现。应避免把“15 台 TV boxes 跑模型”与“现实自主感染 15 台设备”混为一谈。后续最有价值的独立验证是：不同硬件、真实认证/漏洞条件、不同 harness、不同模型、多个 seed 下的端到端成功率和 doubling time。

### 不能推出

- 不能说现实世界已经出现 self-replicating AI worm。
- 不能说 GLM-5.2 自身能塞进并在廉价 TV box 上自主复制；实验使用了能力代理和简化环境。
- 不能把趋势线预测的“年底附近”当作发布日期或确定时间点。
- 不能把一般 IoT 可达性等同于可利用性。

### 建议落位

- `编年/2026/10.md`：10 月 12 日研究节点，明确标“contained eval / risk research”。
- Agent 志：ARA / durable state / replication / containment。
- 评测表：新增 `real vs simulated network`、`exploit difficulty`、`weights location`、`inference location`、`harness`、`multi-seed replication rate`。

---

## 本轮建议的十月结构更新

本轮把 10 月已有的 Agent 治理链再推进两步：

1. **Meta Wonder**：frontier 竞争开始把 memory 与 sustained focus 作为一等产品能力；
2. **Anthropic anti-distillation**：模型竞争边界从 weights/API 扩展到 output extraction；
3. **Anthropic ARA eval**：containment 从云端 Agent 权限继续外推到 weights、edge compute 与分布式复制。

因此月度横向比较建议逐渐采用：

`checkpoint × price × context × memory × sustained focus × tool/runtime × permission × output extractability × weight mobility × containment/provenance`

而不是仅保存 benchmark 与 token 单价。
