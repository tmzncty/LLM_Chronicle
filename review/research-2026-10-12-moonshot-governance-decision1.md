# 2026-10-12 研究包：Moonshot IPO 前治理争议与 Microsoft-Decision-1 补录

## 摘要

本轮包含一项最近约 24 小时内的新公司治理事件，以及一项此前日更遗漏、按“新型号正式出现即留档”规则应补录的模型事件。

1. 2026-10-11，Reuters 报道 Moonshot AI 高管正在与 Recurrent.ai 及其投资者就一项自 2024 年起处于香港仲裁中的股东争议进行私下和解谈判；该争议发生在 Moonshot 已秘密申请香港 IPO 的背景下。
2. 补录 2026-10-09 Microsoft-Decision-1：Microsoft 正式推出专门用于固定选项 decision scoring 的小型决策模型，基于 Qwen3.5-9B post-training，已在 Microsoft Foundry 和 OpenRouter 可用。它不是通用生成式 LLM，而是面向 routing、classification、verification、agent action control 等结构化决策环节的专用模型。

---

## 事件 A：Moonshot AI 在香港 IPO 前推进 Recurrent.ai 股东争议和解

### 准确日期

- 争议/仲裁：至少自 2024 年起持续，并非 2026-10-11 新发生。
- 2026-10-11：Reuters 报道 Moonshot 高管正在进行私下 settlement talks；这是本轮可确认的新信息节点。

### 核心事实

Reuters 查阅 Recurrent.ai 律师发给 Moonshot 投资者的材料并援引知情人士称：

- Recurrent.ai 及部分投资者指控 Moonshot CEO 杨植麟、CTO 张宇韬在离开 Recurrent 并创建 Moonshot 的过程中存在误导投资者、未经必要批准以及使自身获益等问题；
- 相关争议已在香港进入仲裁程序；
- Moonshot 高管目前正在尝试在计划中的香港上市前解决争议；
- Reuters 此前报道 Moonshot 已秘密申请香港 IPO；
- 杨植麟等对相关指控予以否认/争议；目前没有仲裁最终裁决，也没有公开和解结果。

### 证据等级

**B+：高质量独立报道 + Reuters 查阅律师材料/知情人士，但缺少公开仲裁裁决与双方完整原始文件。**

必须使用“被指控”“据 Reuters 报道”“正在谈判”等措辞，不得把争议中的指控写成已确认事实。

### 与产业格局的关系

Moonshot 已凭 Kimi 系列进入中国主要 frontier-model 竞争者行列。此次事件的历史意义不在模型能力，而在于 frontier AI 公司开始进入 IPO/资本市场阶段后，早期创业团队的知识产权、服务器/数据资产、竞业与股权安排会转化为上市治理和披露风险。

这与近期 DeepSeek 大额融资、AI 基础设施 IPO 受审视等事件共同显示：模型竞争正在进入“技术能力之外的资本结构与公司治理”阶段。

### 社区/独立评价

本轮没有足够高质量、广泛且可重复的社区共识可记录。二次报道多为 Reuters 信息的再传播，不应当作独立事实源累加证据权重。

### 为什么值得留档

- Moonshot 是 Kimi 系列核心厂商，计划上市使公司治理直接关系到资本可得性和长期组织稳定性；
- 争议涉及创业团队从前公司到新 frontier-model 公司的资产、数据与授权边界，具有 AI 创业史的制度意义；
- 但截至本轮不能推出 IPO 将被推迟、争议成立、Moonshot 需赔偿或核心模型知识产权存在法律瑕疵。

### 建议写入

- `review/`：本研究包；
- 月度整理时：公司/资本/组织变化表；
- 若后续出现正式和解、仲裁裁决、IPO 招股书披露或上市时间变化，再升级为编年条目。

---

## 事件 B（补录）：Microsoft-Decision-1 正式发布

### 准确日期

**2026-10-09**：Microsoft 官方发布文章并宣布 Microsoft-Decision-1 可在 Microsoft Foundry 与 OpenRouter 使用。

### 核心事实

Microsoft-Decision-1 是面向固定候选项的 decision-scoring model，而不是通用文本生成 LLM：

- 基础：Microsoft 对 **Qwen3.5-9B** 进行 post-training；官方称未来还计划 rebase 到 MAI 和 OpenAI 等其他底座；
- 输出：对固定答案/动作选项返回 calibrated probability scores；
- 任务：routing、classification、prioritization、verification、workflow control、AI judging、agent action control 等；
- 可用性：Microsoft Foundry、OpenRouter；
- 价格：**$0.042 / 1M input tokens，output tokens free**；
- 官方称在 36 个 benchmark、近 150,000 个问题的内部比较中准确率最高，P50 latency 约为 GPT-6 Sol 的 35 倍速度；对八类输入扰动的平均 decision flip rate 为 1.3%。

### 证据等级

- **A：模型存在、底座、价格、访问方式、API 行为**——Microsoft 官方一手材料。
- **B-/厂商自测：36 benchmark 准确率、35× latency、内部应用表现**——这些结果由 Microsoft 自己测得，不能写成独立 benchmark 共识。

第三方报道确认模型已发布及其 Qwen3.5-9B 基础，但目前没有足够成熟的跨 harness 独立评测证明官方性能优势可稳定复现。

### 生产/内部采用证据边界

Microsoft 披露若干内部测试/使用：Xbox Research 用其处理 10,000+ 条反馈；Copilot 团队用于 response quality 测试；on-call/incident response 与 Microsoft Discovery 也进行了测试。

这些属于厂商内部 deployment evidence，强于单次 demo，但仍不能等同于外部生产 ROI 或长期可靠性。

### 与最近 30 天竞争格局的关系

Decision-1 表明模型栈开始进一步分层：不再要求一个昂贵的通用 LLM 完成每一个 Agent 控制判断，而是把 `continue / stop / retry / escalate / route / choose action` 交给低成本专用模型。

对 Agent 架构而言，应开始记录：

`generator/reasoner × decision/control model × tool/runtime × permission boundary × monitor/audit`

而不仅仅记录单个 foundation model。

它也形成一个值得长期观察的跨公司技术结构：Microsoft 的专用模型首版建立在 Alibaba Qwen 的开放底座上，说明 open-weight foundation model 可以成为美国大型平台公司的下游产品底座。

### 社区/独立评价及分歧

目前第三方讨论主要认可其“decision model / control layer”定位与极低价格，但官方 benchmark 尚缺少充分独立复现。尤其不能从 35× latency 推出它在开放式 reasoning、coding 或生成任务上优于 GPT-6 Sol，因为两者任务定义不同。

### 为什么值得留档

按照仓库规则，这是一个正式新型号且对 Agent 使用条件有实际意义，应低门槛入库。其意义主要不是 frontier intelligence，而是 **specialized decision/control models 成为 Agent 系统的独立模型层**。

### 建议写入

- `review/`：本研究包；
- 月度模型/产品表：列为 specialized decision model，不与通用 LLM 混排；
- Agent 志：control/routing/verification model；
- 月度竞争整理时与 OpenAI decisions、Jev、Cloudflare/Clef 等同类方案比较。

---

## 本轮未确认事项

- 未确认最近约 24 小时 OpenAI、Anthropic、Google DeepMind、xAI、Meta、Mistral、DeepSeek、Qwen、Kimi、GLM、MiniMax 又正式发布新的主要通用 foundation-model checkpoint。
- 今日出现的部分 Grok 4.7 报道把发布日期写成 10 月 11 日，但更早材料已显示 Grok 4.7 在 9 月已发布，不能据二次报道重记为 10 月新模型。
- Moonshot 争议尚无公开最终仲裁裁决或和解结果；不能推断 IPO 必然受阻。
- Decision-1 的官方 benchmark 仍需独立复现，不能把专用 decision-scoring 优势外推为通用智能优势。

## 来源

### 一手

- Microsoft, “Introducing Microsoft-Decision-1, our model for fast decision-making”, 2026-10-09: https://commandline.microsoft.com/microsoft-decision-1-model-foundry/

### 独立报道

- Reuters, “Moonshot execs in talks to settle dispute with shareholder ahead of planned IPO, people say”, 2026-10-11: https://www.reuters.com/world/china/moonshot-execs-talks-settle-dispute-with-shareholder-ahead-planned-ipo-people-2026-10-11/
- The Next Web, “Microsoft-Decision-1 runs on Alibaba’s Qwen and costs $0.042 a million”, 2026-10-12: https://thenextweb.com/news/microsoft-decision-1-qwen-decision-model
