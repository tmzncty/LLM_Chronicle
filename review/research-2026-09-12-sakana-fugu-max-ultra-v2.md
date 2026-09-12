# 2026-09-12 增量研究包：Sakana Fugu Max / Fugu Ultra v2

> 检查窗口：约 2026-09-11 至 2026-09-12。  
> 实际发布日：**2026-09-11**。  
> 本文件日期是本轮研究 / 入库日期，不把 9 月 12 日误写成模型发布日期。

## 结论

**达到“新模型 / 新型号正式出现即应记录”的门槛。**

Sakana AI 于 2026-09-11 正式发布：

- `fugu-max-v1.0`；
- `fugu-ultra-v2.0`。

两者均在发布当天通过 Sakana AI 的 OpenAI-compatible API 可用。

但这里的“model”必须加历史说明：

> **Fugu Max / Ultra v2 不是通常意义上的单一 monolithic foundation model，而是被包装成统一模型/API SKU 的 learned multi-model orchestration system。**

因此本事件同时属于：

1. 新模型 / 新 SKU 记录；
2. 多模型 orchestrator 产品化；
3. Agent runtime / routing / cost-accounting 竞争。

当前最重要的证据边界是：

> **Sakana 的强 benchmark 与 cost-performance 结论主要仍是厂商自测；正式可用已经确认，但首日尚缺同等级独立 benchmark 复现和长期 production reliability / ROI 证据。**

---

# 事件

## 准确日期

**2026-09-11。**

Sakana AI 官方发布页明确标注 September 11, 2026，并称两款产品 `available today`。

官方来源：

- Sakana AI, “Introducing Fugu Max and Fugu Ultra v2: Orchestrating the Pareto Frontier”, 2026-09-11  
  https://sakana.ai/fugu-max-release/
- Sakana AI API Platform Pricing  
  https://console.sakana.ai/pricing
- Sakana AI model/API documentation  
  https://console.sakana.ai/models

---

# 核心事实

## 1. 同一 orchestration architecture，被拆成 cost-first 与 capability-first 两个 operating point

Sakana 的官方定义不是两个完全独立架构：

- **Fugu Max**：目标是以尽可能低的成本给出足够好的结果；
- **Fugu Ultra v2**：目标是复杂、多步骤任务上的最高能力。

两者共享核心 orchestration architecture，但优化目标不同。

这意味着产品竞争单位已经不是简单的：

> 一个 prompt → 一个固定 foundation model

而可以是：

> 一个 prompt → learned router / orchestrator → 动态模型池 → 多次内部调用 / 协作 → 一个对外回答。

对《大模型纪事》而言，这类产品以后应同时记录：

- 对外 SKU；
- routing / orchestration 机制；
- 后端模型池是否透明；
- 计费如何处理内部 fan-out；
- benchmark 是测“模型”还是测“完整 harness”。

## 2. Fugu Max 扩大开放权重 / specialized model pool

Sakana 表示 Fugu Max 扩大了可编排模型池，并纳入通过 NVIDIA 合作接入的 Nemotron family。

官方核心策略是：

> 动态把任务路由给能够解决任务的最轻量模型。

这里应写成**厂商公开的 routing 设计与产品行为**，不能由此推出：

- 每次都一定选择全局最便宜模型；
- 选择策略对用户完全透明；
- 任意 workload 上都降低 total successful-task cost。

## 3. Fugu Max 正式价格

Sakana API Platform 当前列出的固定价格：

| SKU | Input / 1M | Output / 1M | Cached input / 1M |
|---|---:|---:|---:|
| Fugu Max v1.0 | $2 | $6 | $0.25 |
| Fugu Ultra v2.0 | $5 | $30 | $0.50 |
| Ultra v2, context >272K | $10 | $45 | $1.00 |

另：

- `web_search` / `web_fetch`：**$0.007 / call**。

Fugu Max 价格不随 context length 改变；Ultra v2 在超过 272K context 时进入更高一档价格。

## 4. 不能只看“用户可见 output token 单价”：orchestration tokens 也真实计费

这是此次 release 最需要在模型价格史里保存的细节之一。

Sakana 官方 pricing / model docs 明确说明，Fugu Ultra 等 orchestration SKU 会把：

- `orchestration_input_tokens`；
- `orchestration_input_cached_tokens`；
- `orchestration_output_tokens`

单独放在 usage detail 中。

**这些不是免费 telemetry，而是真实 token usage，会计入最终账单。**

因此：

> **$2 / $6 或 $5 / $30 的 sticker rate ≠ 每百万“用户最终可见答案 token”的有效成本。**

真实成本还取决于 orchestration 内部发生了多少 fan-out、delegation、critique、verification 与重试。

这也是未来比较 Fugu、HydraFusion、Agents API、多模型 router 时必须统一的计量口径：

> **cost per visible token ≠ cost per request ≠ cost per accepted / successful task。**

## 5. 官方 benchmark：Fugu Max 主打 cost-performance，Ultra v2 主打 peak capability

### Fugu Max

Sakana 官方称：

- 在 Terminal Bench 2.1、GPQAD、AA-LCR、GDP.pdf、AutomationBench、SWEFish 六项 benchmark 获得 best overall score；
- 在十项 benchmark 中有七项扩展 cost-performance Pareto frontier；
- 官方称性能接近 elite models、成本低 2—6 倍。

必须保留：

- `SWEFish` 是 Sakana 自己的内部 coding benchmark / use-case benchmark；
- 以上结果来自 Sakana 官方 release，不是本轮独立 benchmark 复现。

### Fugu Ultra v2

Sakana 官方给出的代表数字：

- Chartography：**48.3**；官方比较 Opus 5 = 27.3、Fable 5 = 29.5；
- DeepSWE：**74.3**；
- 八项 benchmark 中五项 best / joint-best；
- 七项进入 top 2。

同样，这些是**vendor-reported evaluation**。

当前不能写：

> “独立评测已经证明 Fugu Ultra v2 全面超过 Opus / Fable / Astra。”

## 6. Ultra v2 的 model-pool 边界值得保存

Sakana 明确给出：

- training cutoff：**2026-08-28**；
- **Fable 5、Fable 5.1、GPT-6 Astra 不在 Fugu Ultra v2 model pool 中。**

这条声明的重要性在于，Fugu 的结果不是简单地把当时最新三个 frontier proprietary model 全部并联起来再取最好答案。

但它仍不能证明：

- model pool 完全由 open-weight model 构成；
- 所有后端模型、router policy 与运行路径全部公开；
- 对任意 workload 都不存在 proprietary dependency。

应使用 Sakana 自己的更精确口径：

> pool 由 open / specialized models 组成，并明确排除了上述三款当时前沿模型。

## 7. 发布即用，而非 future roadmap

官方明确：

- 2026-09-11 当日可用；
- 使用标准 OpenAI-compatible API；
- 既有 Fugu 用户可通过更换模型参数切换。

因此“产品确实存在并可调用”证据等级高于单纯 announcement / coming soon。

当前仍没有足够证据证明：

- 大规模生产可靠性；
- 跨长任务稳定性；
- 企业 SLA 的实际兑现；
- 总体 ROI。

---

# 与最近 30 天模型 / Agent 竞争的关系

9 月的竞争正在出现一个明显变化：

> **foundation model capability 之外，orchestration 本身开始被直接卖成 model SKU。**

近月可对照节点包括：

- GitHub Project HydraFusion：runtime 动态选择 Single / Cascade / Critique 多模型路径；
- OpenAI Agents API：把 Codex harness、session、context compaction、subagents、sandbox 托管成 API；
- Cognition SWE-2：把大 base model 与自有 coding-agent harness 紧耦合；
- Sakana Fugu Max / Ultra v2：把 learned multi-model orchestration 直接包装成统一 OpenAI-compatible model endpoint。

这些路线不是同一种东西：

- HydraFusion 更接近 coding runtime routing policy；
- Agents API 是托管 agent harness / durable runtime；
- SWE-2 是专用模型 + agent product；
- Fugu 是 learned orchestrator 作为 model-like API product。

但共同说明：

> **2026 年下半年前沿竞争越来越需要同时比较 model × router × harness × tool use × accounting，而不是只比较单一 checkpoint。**

---

# 社区 / 独立评价

## 1. 首日社区的核心分歧：它到底应不应该叫“model”

Reddit 首日小样本讨论出现两种相反反应：

- 一类用户质疑：它本质是 router / proxy，把它和单体模型直接放在同一榜单容易造成理解偏差；
- 另一类用户认为并非“骗局”，但营销表达容易让人误解，更准确的理解是一个 learned second harness / orchestrator。

来源：

- Reddit / r/aicuriosity, 2026-09-11  
  https://www.reddit.com/r/aicuriosity/comments/1wdkqwq/sakana_ai_unveils_fugu_max_and_fugu_ultra_v2_for/

**证据等级：C。**

理由：

- 样本极小；
- 不能代表广泛开发者共识；
- 但足以记录 launch-day terminology / product-category confusion。

这类争议本身具有历史价值，因为它说明“model”一词正在从 checkpoint 向完整 inference system 扩张。

## 2. 独立评论已经注意到 hidden orchestration cost，但暂无强 benchmark 复现

发布后独立评论很快注意到：

- sticker token price 不能直接代表有效任务成本；
- orchestration token 是真实计费量；
- 用户应该比较 accepted-task cost，而不只是 visible-output token price。

其中“orchestration token 会收费”有 Sakana 官方文档直接支持，因此是 A 级产品事实；至于具体 workload 的 overhead 倍数，则依赖独立测试配置，本包不采纳尚未形成稳定复现的倍率数字作为主史结论。

截至本轮扫描，没有找到与 Sakana 官方 benchmark 同等级、公开方法充分且已经重复验证的第三方全面复现。

因此当前评价应写：

> **产品已经正式可用；官方 benchmark 很强；cost-accounting 机制可核；但综合质量 / cost-performance 的强结论仍主要来自 vendor evaluation。**

---

# 证据等级

## A：正式发布、可用性、SKU 与价格 / 计费机制

依据：Sakana 官方 release + 官方 API pricing/docs。

可确认：

- 9 月 11 日发布；
- Fugu Max / Ultra v2 SKU 存在；
- OpenAI-compatible API 当日可用；
- 定价；
- orchestration tokens 计费；
- Ultra v2 的 >272K 价格档；
- 官方声明的 pool / cutoff 边界。

## B+：架构 / 产品定位

Sakana 对自己的 orchestrator 结构、pool routing 与产品目标有强一手证据；但内部 routing policy、每次实际后端选择和 production behavior 并非完全可外部审计。

## B：benchmark / cost-performance 强结论

数字是正式厂商 evaluation，可记录；但当前缺少足量第三方重复验证。

## C：首日社区体验与 terminology 争议

用于记录反应，不用于证明性能。

---

# 为什么至少值得留档

## 1. 新 SKU 本身满足本仓库的新模型记录规则

正式发布、实际可用、有明确价格与能力定位，不应因为它不是单 checkpoint 而漏掉。

## 2. “模型”与“系统”的边界进一步模糊

Fugu 对用户表现为一个 model ID / API endpoint，但内部可能动态调用多个模型与多个 agent roles。

这会改变未来模型史的基本记录单位：

> **checkpoint → model service → orchestrated inference system。**

## 3. 模型价格史必须开始记录 hidden internal work

当内部 critique / delegation / rerouting 也被计费时，单纯记录 input / output rate 会失真。

未来建议新增统一字段：

- sticker input/output price；
- tool fee；
- orchestration / reasoning token accounting；
- measured cost per request；
- measured cost per successful task。

---

# 建议写入位置

## 编年

- `编年/2026/09.md`
  - 9 月 11 日：Sakana Fugu Max / Ultra v2 正式发布。

建议正文控制在 3—5 段：

1. 两个 SKU 与日期；
2. orchestrator 而非单体 checkpoint；
3. 价格与 orchestration token billing；
4. 官方 benchmark 与第三方复现边界；
5. 与 9 月 Agent-runtime / model-routing 竞争的连接。

## 志

候选：

- `志/AI Agent 生态.md`；
- `志/Agent宣传、实测与可靠性.md`；
- `志/AI编程助手.md`（只写 coding benchmark / harness 竞争部分）；
- 如仓库存在模型计价 / 商业化专题，可加入 orchestrator cost accounting。

## 表

如已有模型大事表 / Agent 发展大事表：

- 日期；
- SKU；
- product type = learned multi-model orchestrator；
- API availability；
- sticker price；
- benchmark evidence = vendor-reported；
- independent replication = pending。

---

# 是否需要修订已有条目

**建议轻度修订，不需要推翻。**

如果 HydraFusion / Agents API 条目仍隐含“多模型 orchestration 主要属于 coding runtime / agent harness”，现在应补：

> 2026-09-11，Sakana 进一步把 learned multi-model orchestration 本身作为统一 model SKU 对外出售，并建立 Max / Ultra 两个 cost-capability operating points。

如果价格表只记录可见 input/output token，应补“内部 orchestration token 是否额外收费”字段。

---

# 当前不能推出的结论

本事件**不能证明**：

- Fugu Max 是 2026-09-11 综合能力最强模型；
- Fugu Ultra v2 已由独立测试证明全面超过 Opus / Fable / Astra；
- $2/$6 的 sticker price 等价于比竞争对手低相同比例的 successful-task cost；
- 多模型 orchestration 天然比单模型更可靠；
- swappable pool 已实证消除了供应链风险；
- Fugu 已有广泛生产采用或可审计 ROI；
- 所有后端模型与 routing policy 对用户完全透明。

---

# 后续观察

1. Artificial Analysis / 独立 benchmark 是否加入 Fugu Max / Ultra v2；
2. 长程 coding / research Agent 的重复运行成功率；
3. orchestration token / visible token 的真实比例分布；
4. cost per accepted task，而非 token sticker price；
5. Fugu model pool 随新 frontier models 发布后的两周级更新是否兑现；
6. 用户是否因 router opacity / reproducibility 产生新的生产部署问题。
