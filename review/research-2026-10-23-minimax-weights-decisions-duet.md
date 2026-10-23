# 2026-10-23 日更研究包：MiniMax M3.1 Flash 权重、OpenAI Decisions API GA 与 Claude Duet

## 仓库去重

本轮先核对 `main` 最近提交与开放 PR。`main` 最新为 #64（Voxtral 3、MiniMax M3.1 Flash GA、OpenAI Agent 监控事件）；#65（OpenAI 多云分发/跨服务治理与 DeepSeek 融资）仍为开放 PR。本包不重复这些内容，而是记录 #64 中明确列为未来承诺、今天已经实际发生的 MiniMax 权重发布，以及此前日更漏掉的 OpenAI Decisions API GA 与 Claude Duet。

---

## 事件一：MiniMax M3.1 Flash 权重正式发布

### 准确日期

- **2026-10-19**：MiniMax M3.1 Flash hosted/API 版本 GA；当时权重仍是未来承诺，已由 #64 记录。
- **2026-10-23**：`MiniMaxAI/MiniMax-M3.1-Flash` 可下载权重实际出现，hosted availability → open-weight availability 的第二阶段完成。

### 核心事实

- 模型约 **428B total / 23B activated parameters**，1M-token context，原生 text/image/video input。
- Hugging Face 仓库包含完整 safetensors 权重（第三方核查记录为 48 shards、约 252 GB）以及 DSpark speculative-decoding draft head；不存在下载审批 gate。
- 许可证为 **MiniMax Community License**，因此应写作 **open-weight**，不能写成 OSI 意义上的 open source。商业使用存在额外条件；高收入主体的授权边界应以 LICENSE 原文为准。
- 模型卡推荐 SGLang / vLLM 等 serving 路径。今天真正新增的是可审计、可自托管 artifact，而不是又一个新的 checkpoint 名称。

### 一手与独立证据

- 一手：MiniMax Hugging Face 模型仓库、model card、LICENSE 与文件列表（2026-10-23 可下载）。
- 独立：alfw.ai 10 月 23 日逐项检查仓库，确认 48 个 weight shards、DSpark head、约 252 GB 与无下载 gate。
- 10 月 19 日多家第三方已记录“weights on Oct 23”的官方承诺；今天应把状态从 `planned` 改为 `released`。

### 独立评价与分歧

开放权重使真正独立的本地 benchmark、量化、serving 与安全审计从今天开始成为可能，但不应把“可下载”本身写成“性能已经被独立复现”。现有 Vals 等评测主要基于官方 API，显示 M3.1 Flash 相对 M3 在若干 coding/finance/tax benchmark 上有提升，但在 Terminal-Bench 4.0、HLAB-Vals-1.1 等长程 Agent workload 上并非领先；不同 harness、provider、effort 和 max-output 设置会显著改变结果。

### 证据等级

- 权重实际存在、可下载、模型规模与许可证：**A**。
- 具体文件体积/无 gate：**A-/B+**（公开 artifact 可直接核验，第三方已复核）。
- 官方 benchmark：**B+（厂商自测）**。
- API 第三方 benchmark：**B**；不能自动等同于本地权重的 production reliability。

### 最近 30 天竞争关系与历史意义

M3.1 Flash 的历史节点不是 10 月 23 日“又发布一次模型”，而是访问制度变化：

`preview → hosted GA → downloadable weights → independent serving/audit/quantization ecosystem`

这使 MiniMax 与 DeepSeek、Qwen、GLM、Mistral 等开放权重路线的竞争进一步落到部署控制权和 task economics，而不只看 API 榜单。

### 建议写入

- 10 月 23 日编年：M3.1 Flash weights released。
- MiniMax 模型表：将 `planned weights 10/23` 改为 `released 10/23`，补 license / local-serving 字段。
- 开放模型表：明确 `open-weight ≠ OSI open source`。

### 不能推出

- 不能推出 M3.1 Flash 已在本地部署中达到官方 API 的相同 latency/throughput。
- 不能把厂商 benchmark 写成独立 SOTA。
- 不能把 Community License 简化成“无限制商用”。

---

## 事件二：OpenAI Decisions API 从 public beta 转为 GA

### 准确日期

- **2026-09-29**：DevDay limited preview。
- **2026-10-06**：public beta，所有开发者可访问。
- **2026-10-22**：OpenAI 正式宣布 **Generally Available**。

因此 10 月 22 日是 availability/status transition，不是 Decisions 概念第一次出现。

### 核心事实

- 专用 endpoint：`POST /v1/decisions`，当前只支持 `gpt-6-luna`。
- 返回三类 bounded answer：`predicate`（概率）、`choice`（固定选项及概率/置信度）、`score`（rubric levels 的概率加权分数）。
- GA 后单请求问题上限由 200 提升到 **400**，加入 native JSON input、question-level image instructions、prompt caching、US/EU inference residency，并与 GPT-Live 原生集成。
- 定价：**$0.10 / 1M input tokens**，cached input **$0.01 / 1M**，无 output-token charge。
- OpenAI 称 bounded decisions 相比通过 Responses API 调用 GPT-6 Luna 最多约 **10× faster**；这是厂商主张，不应当作普遍 workload 的独立结论。

### 一手证据

- OpenAI, *Build more responsive apps with the Decisions API*, 2026-10-22。
- OpenAI API Changelog, 2026-10-22。
- OpenAI API Reference `/v1/decisions`，当前文档明确 `gpt-6-luna` only、1–400 questions。

### 独立评价与生产采用边界

OpenAI 公布了 Box、Datadog、Ramp、Sierra、Speak 的 early production/evaluation examples：例如 Box 报告约 5× faster routing、Sierra 报告 <280ms p95 且约 90% lower cost/call、Speak 报告 live next-action latency 1.4s → 0.13s。它们证明 API 已进入真实产品路径，但仍是客户/厂商提供的案例，不等于统一第三方 benchmark。

独立 decision-model board 对 beta 版本的结果并不一致地支持“最强”：Artificial Analysis 相关第三方整理显示它在 decision-model comparison 中并非榜首，且 calibration、safety F1、cost/task 会随 harness 而变化。这种分歧本身值得记录：**低 latency / typed output 的产品价值 ≠ 通用 decision accuracy 第一。**

### 证据等级

- GA、endpoint/schema、价格、400-question limit、GPT-Live integration：**A**。
- “up to 10× faster”：**B+（官方）**。
- 客户案例 latency/cost：**B（客户案例，未统一复现）**。
- 独立榜单相对位置：**B**，必须附 harness/config。

### 最近 30 天竞争关系与历史意义

仓库此前已补 Microsoft-Decision-1。OpenAI 现在把同类“控制面模型”直接做成 GA API，说明 Agent 模型栈进一步从单一 generator/reasoner 分层：

`generator/reasoner × decision/control endpoint × tool/runtime × permission boundary × monitor/audit`

尤其 GPT-Live integration 说明 decision model 开始进入 voice Agent 的实时 hot path。对 Agent economics，应该单列 `decision latency / cost / calibration / confidence / abstention / escalation`，不能只比较大模型 token price。

### 建议写入

- 10 月 22 日编年：Decisions API GA。
- OpenAI 产品表：preview → public beta → GA 三阶段。
- Agent/control-model 表：与 Microsoft-Decision-1、Cloudflare Clef、TypeSafe Jev 等横向比较。

### 不能推出

- 不能推出 Decisions API 在所有分类/路由任务上比 Responses API 准确。
- 不能把客户案例的 latency/cost improvement 外推为所有 workload 的生产 SLA。
- `choice/probability/score` 输出并不自动意味着概率已在所有任务上良好校准。

---

## 事件三：Anthropic Claude Duet proactive agent（漏项补录）

### 准确日期

- **2026-10-21**：Anthropic 宣布 Claude Duet research preview；Reuters、The Verge、TechCrunch 等随后独立报道。

该事件略早于本轮严格 24 小时窗口，但此前 #64/#65 均未记录，而它属于重要 Agent 产品形态变化，按“漏项补录”处理。

### 核心事实

- Claude Duet 是面向 professionals / small businesses 的 proactive personal agent，核心模型为 **Claude Opus 5.5**。
- 以 research preview / waitlist 形式推出，首期面向美国 Pro / Max 用户；可在 iOS、Android 与 claude.ai 相关 surface 使用。
- 能在后台持续工作，主动生成 daily briefing、从连接应用中发现待办，并处理 scheduling、research、forecast/web-app 等任务。
- 具有自己的 cloud/virtual computer 与 browser；在支付、删除等 consequential actions 前要求 approval。
- 这不是一个新的 foundation-model checkpoint，而是 Claude 能力进入 always-on / proactive / background Agent 产品层。

### 一手与独立证据

- Anthropic 官方产品公告（2026-10-21；搜索结果与多家独立媒体引用其 research-preview 定义）。
- Reuters 10 月 21 日确认 standalone proactive agent app、daily briefing 与工作任务范围。
- The Verge / TechCrunch 确认 research preview、Opus 5.5、移动/Web surfaces 与云端 Agent 形态。

### 社区/独立评价及分歧

目前主要仍是 launch-day hands-on / product reporting，尚没有足够长时间样本判断后台可靠性、权限边界、context persistence、误操作率或真实 ROI。价格/订阅比较显示它与 OpenAI Dots、Meta Muse 的进入门槛和 bundling 不同，但不同计划包含的额度与 rollout 范围会变化，不宜只用一个月费数字判断竞争力。

### 证据等级

- 产品存在、research-preview status、Opus 5.5、主要 surface/approval design：**A-/B+**。
- 长期后台可靠性、proactive usefulness、生产 ROI：**未建立**。

### 最近 30 天竞争关系与历史意义

10 月已经出现 OpenAI Dots、Meta Muse/Wonder 与 Claude Duet。竞争轴正在从“谁的 chat model 更强”扩展为：

`frontier model × persistent memory/context × proactive trigger × cloud computer × app connections × background runtime × approval policy × identity/credential × pricing/allowance`

Duet 因而应该放入 personal/proactive Agent 产品史，而不是 Claude 模型发布表。

### 建议写入

- 10 月 21 日编年补 Claude Duet research preview。
- Anthropic 产品志 / Agent 表增加 Duet。
- 10 月 Agent 横向比较：Duet × OpenAI Dots × Meta Muse，严格区分 preview、GA、地区、订阅层、后台权限与 approval boundary。

### 不能推出

- 不能把 research preview 写成全球 GA。
- 不能把“可后台工作”写成已证明可长期无人监督可靠运行。
- 不能把 Opus 5.5 的模型能力直接等同于 Duet 系统的端到端可靠性。

---

## 本轮扫描结论

重新扫描 OpenAI、Anthropic、Google DeepMind、xAI、Meta、Mistral、DeepSeek、Qwen、Kimi、GLM、MiniMax 等主要厂商后，最近约 24 小时内没有确认另一枚新的主要通用 frontier checkpoint。最明确的新状态变化是 **MiniMax M3.1 Flash 权重从承诺变成可下载事实**；同时 **OpenAI Decisions API 10 月 22 日 GA** 达到“实质访问/产品规则变化”的低门槛入库标准。Claude Duet 是前一轮遗漏的 10 月 21 日重要 Agent 产品节点，因此补录。

## 本轮历史轴

**模型竞争继续从 checkpoint 本身向三种基础设施分化：开放权重决定部署控制权；decision endpoint 决定 Agent 热路径的成本与延迟；proactive personal agent 决定长期后台执行、权限和用户关系。**