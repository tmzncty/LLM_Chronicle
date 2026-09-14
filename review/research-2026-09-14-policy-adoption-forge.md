# 2026-09-14 增量研究包：Claude Code 限额生效、Bolt Forge 与 Astra 生产委托

> 检查窗口：约 2026-09-13 09:55 UTC 至 2026-09-14 09:55 UTC（北京时间约 9 月 13 日 17:55 至 9 月 14 日 17:55）。  
> 仓库基线：`main` @ `6024c745ed99738a076a080fb81c6aa23155ac64`，即 9 月 13 日 Amp Free Agent / frontier pacing / DeepSeek V4 Pro 修订研究包已经合并。  
> 本轮先检查 `编年/2026/09.md`、最近研究包与 `志/Agent产品与商业化.md` 等现有内容。仓库上一轮已经明确把 Claude Code 9 月 14 日 weekly-limit 调整列为“尚未生效、下一轮若确认实际生效应记录”的观察项；本轮确认它已经生效。仓库未发现 Bolt Forge 或 Perplexity × GPT-6 Astra 生产委托的既有条目。

## 本轮结论

本轮没有确认 OpenAI、Anthropic、Google DeepMind、xAI、Meta、Mistral、DeepSeek、Qwen、Kimi、GLM、MiniMax 在最近约 24 小时正式发布新的主要 foundation-model SKU；但有 **3 个值得进入《大模型纪事》的增量节点**：

1. **2026-09-14：Anthropic 的 Claude Code weekly-limit 新结构正式生效。** 5 月 13 日至 9 月 13 日的临时 +50% weekly promotion 结束，Pro、Max、Team 与 legacy seat-based Enterprise 的永久 weekly limit 改为相对原标准 +25%。因此相对原始 baseline 是 +25%，但相对用户前一天实际拥有的临时额度是约 **-16.7%（约 -17%）**。这两个数字都正确，只是比较基准不同。5-hour limit 没有因这项政策变化而改变；Claude chat / Cowork 也不在范围内。
2. **2026-09-14：Bolt.new 上线 Bolt Forge research preview。** Forge 不是一个单模型，而是 Bolt 的第三种 Agent 模式，默认 GLM 5.3 Flash，并提供 GLM 5.3、Kimi K3、DeepSeek v4 Pro 等开放权重模型。个人 Pro 在预览期可获最高约 50× Forge 使用量；代价是每次切入 Forge 都显式 opt-in，把匿名化后的 prompts、code 与 fix traces 提供给 Arcee AI 用于训练后续开放权重模型。它把“用户任务轨迹换算力额度”做成了清晰的产品计价与数据交换机制。
3. **2026-09-14：OpenAI 发布 Perplexity 的 GPT-6 Astra 客户案例，公开披露 Astra 已被用于修改真实软件、监控 production systems，并减少人工 check-in。** 这是 Astra 发布后很快出现的一条 production-adoption 证据，但它仍然是 OpenAI 承载、Perplexity 高管自述的客户案例；没有公开 deployment scope、error rate、incident history、autonomous-action policy 或独立 telemetry，因此只能证明“生产委托确实被公司公开承认”，不能证明普遍可靠性或 ROI。

三件事放在一起，形成了一个很清楚的 9 月中旬切片：

> **前沿 Agent 的竞争正在同时发生在三种资源边界上：用户能用多少算力（quota）、用户用什么数据换取更多算力（data-for-allocation）、以及公司究竟愿意把多少真实系统控制权交给模型（production delegation）。**

---

# 事件一：Claude Code 9 月 14 日 weekly-limit 新结构正式生效

## 准确日期与时间边界

- **公告日期：2026-08-29**（Anthropic developer account 对外宣布未来调整；多家同期媒体记录）。
- **临时 promotion：2026-05-13 至 2026-09-13 23:59 PT。**
- **新永久结构生效：2026-09-14。**

Anthropic Help Center 在本轮已更新，并明确写道：

- promotion 将 Claude Code weekly usage limit 提高 **50%**；
- promotion 到 **September 13, 2026** 结束；
- 自 **September 14, 2026** 起，Pro、Max、Team 与 seat-based Enterprise 的 weekly limits 永久设为 promotion 前 baseline 的 **125%**；
- Free 与 consumption-based Enterprise seats 不在这项 promotion / permanent adjustment 的范围内；
- 5-hour limits 没有因为 promotion 改变；
- Claude web / desktop / mobile 与 Claude Cowork 的额度不受这项 promotion 影响。

一手来源：

- Anthropic / Claude Help Center, **“Claude Code May–August 2026 weekly limits promotion”**, updated 2026-09-14  
  https://support.claude.com/en/articles/15910845-claude-code-may-august-2026-weekly-limits-promotion

同期独立报道：

- BleepingComputer, 2026-08-29  
  https://www.bleepingcomputer.com/news/artificial-intelligence/anthropic-is-cutting-claude-codes-current-weekly-limits-by-17-percent/
- The Economic Times, 2026-08-31  
  https://economictimes.indiatimes.com/ai/ai-insights/claude-code-users-to-get-17-less-weekly-usage-from-september-14-as-anthropic-ends-50-boost/articleshow/133647006.cms

## 为什么“+25%”和“-17%”同时正确

把 promotion 前的 weekly limit 指数化为 100：

| 阶段 | 相对原 baseline |
|---|---:|
| promotion 前标准额度 | 100 |
| 5 月 13 日—9 月 13 日临时额度 | 150 |
| 9 月 14 日起永久额度 | 125 |

因此：

- 对原 baseline：`125 / 100 = 1.25` → **+25%**；
- 对 9 月 13 日用户实际可用额度：`125 / 150 = 0.8333` → **-16.7%**。

史料中应同时保留这两个基准，不能只写“Anthropic 给 Claude Code 增加了 25%”而不说明用户当天体验是 weekly headroom 收缩，也不能写成“Anthropic 把标准额度削了 17%”而忽略永久 baseline 仍高于 promotion 前。

这是一例典型的**计量基准决定政策叙述**：同一个资源政策，在公司和当前用户视角下会出现相反的 headline。

## 用户实际反应：当天负面反馈明显，但不能把所有异常都归因于官方 -17%

9 月 14 日 r/ClaudeCode / r/ClaudeAI 出现了明显的当日讨论：

- 有用户把新政策理解为 promotion 结束后实际 headroom 收缩，并表示转向 Codex / 其他模型；
- 有用户称自己当日 weekly usage 消耗速度远高于预期，甚至感觉远不止 17%；
- 也有人指出，代码库大小、context、模型选择、agent orchestration、cache / compaction 行为都会改变实际消耗，因此不能仅凭“体感消耗变快”推导 Anthropic 还暗中进行了更大的额度削减；
- 也有用户认为 permanent +25% 至少比原计划完全回落到 baseline 更好。

社区样本：

- r/ClaudeCode, **“The limits have been reduced even further now. It's September 14, and it really happened.”**, 2026-09-14  
  https://www.reddit.com/r/ClaudeCode/comments/1wfwl6k/
- r/ClaudeAI, **“Claude Code May–August 2026 weekly limits promotion”**, 2026-09-14  
  https://www.reddit.com/r/ClaudeAI/comments/1wfwuyi/
- r/ClaudeCode, **“15% weekly usage in under one hour using Sonnet in Medium?”**, 2026-09-14  
  https://www.reddit.com/r/ClaudeCode/comments/1wfyb1u/

这些只能列为 **C 级用户体验史料**。它们足以证明“政策生效当天引发了可观察的用户反弹与迁移讨论”，但不足以证明：

- Anthropic 实际削减超过官方 17%；
- 某个 plan 的绝对 token budget 是多少；
- 所有用户都受到同等程度影响；
- Claude Code 的模型质量本身在 9 月 14 日下降；
- Codex 在所有 workload 下因此变得更便宜或更可靠。

## 证据等级

| 结论 | 等级 | 说明 |
|---|---|---|
| promotion 于 9 月 13 日结束、新结构 9 月 14 日生效 | **A** | Anthropic Help Center 直接确认 |
| 新永久 weekly limit = 原 baseline 的 125% | **A** | 官方直接确认 |
| 相对 9 月 13 日临时额度约 -16.7% | **A（算术）** | 150 → 125 的直接计算；Anthropic 先前也公开承认约 17% |
| 5-hour limit 因本政策同步下降 | **不成立** | 官方明确称 promotion 未改变 5-hour limit |
| Claude chat / Cowork 同步下降 | **不成立** | 官方明确排除 |
| 生效当天有明显用户不满与转向其他 coding agent 的讨论 | **C+** | Reddit 多个独立线程；非代表性调查 |
| 用户报告的 >17% 消耗变化等于隐藏削额 | **未证明** | workload / context / model / bug 均可能混杂 |

## 历史意义

Agent 商业化越来越不能只记录“月费多少”。真实可用量取决于：

- 5-hour / weekly quota；
- 不同模型对应的计量权重；
- context/cache 处理；
- Agent 并行度；
- 订阅内含量与额外付费；
- promotional capacity 是否长期化。

因此 2026 年 coding-agent 竞争的关键单位已经从单纯 **$/seat** 和 **$/token** 扩展到：

> **有效任务完成量 / subscription-period / quota window。**

而且用户会把跨厂商 quota 直接当作替代决策的一部分。

## 建议写入位置

- `编年/2026/09.md`：新增 9 月 14 日政策生效节点；
- `志/Agent产品与商业化.md`：subscription quota / promotion / permanent baseline 案例；
- `志/AI编程助手.md` 或相近 coding-agent 专题：记录 Claude Code 与 Codex 的资源竞争；
- `纪传/本纪/Anthropic.md`：用户访问政策 / coding-agent 商业化。

上一轮 `review/research-2026-09-13-agent-economics-frontier-pacing.md` 中“尚未生效、下一轮确认”的观察无需删除；它准确反映了 9 月 13 日当时状态。本轮作为后续实际生效节点承接即可。

---

# 事件二：Bolt Forge——“使用额度即数据报酬”的开放权重 coding-agent 实验

## 准确日期

**2026-09-14。**

Bolt.new 官方宣布并启动 **Bolt Forge research preview**。

一手来源：

- Bolt, **“What is Bolt Forge?”**, 2026-09-14  
  https://bolt.new/blog/what-is-bolt-forge

独立 / 外部同期材料：

- BuilderWithin, 2026-09-11（launch 前介绍，明确写 9 月 14 日上线）  
  https://builderwithin.com/articles/bolt-forge-open-model-agent/
- Yet Another Changelog, 2026-09-14  
  https://www.yet-another-changelog.ai/changelog/bolt-forge-open-source-agent

后两者能够交叉确认产品公开信息，但都**不是独立 benchmark 或可靠性审计**。

## 核心事实

### 1. Forge 是 Agent mode，不是新的 foundation model

Bolt 明确写道：

> Forge is an agent, not a single model.

当前模型 lineup：

- **GLM 5.3 Flash**：默认；
- **GLM 5.3**：可选；
- **Kimi K3**：experimental；
- **DeepSeek v4 Pro**：experimental。

因此《大模型纪事》不能把“Bolt Forge”列到 foundation-model release 表中。它属于 **coding/app-building agent + model router / product mode**。

### 2. 预览期把“训练数据”显式换成“最高 50× 使用额度”

个人 Pro 用户在 9 月 14 日至 10 月 14 日的 preview window 内，Forge 可获得官方所称的 **up to 50X more usage at no extra cost**。

交换条件非常明确：

- 每次切到 Forge 都出现 consent；
- 用户 opt-in 后，Forge session 中的 prompts、code、fix traces 会进入共享数据流水线；
- Bolt 声称在数据离开其基础设施前剥离 secrets、sensitive data 与 personal information，并用 seeded test data 验证处理 pipeline；
- 数据随后在 DPA 下发送给 Arcee AI；
- Teams 与 Enterprise workspace 被排除在 Forge / data collection 外；
- 切回 Standard / Max 后停止新的数据共享，但**已经用于训练的数据不会从已经训练出的模型中撤销**。

Bolt 自己用一句很有史料价值的话概括：

> **“the allocation is the payment.”**

这已经不只是“免费 tier”。它把一个一直隐含存在的交换关系产品化：

> **真实开发轨迹 ↔ 推理 / Agent 使用额度。**

### 3. 训练目标是开放权重模型，但未来承诺不能提前写成已发布

Bolt 与 Arcee AI 表示，preview session 将进入 10 月开始的首轮训练，并帮助训练一个 **trillion-parameter-class open-weight model**；Bolt 表示完成后会发布权重。

截至 9 月 14 日正确写法是：

- 数据收集 / research preview **已经启动**；
- 与 Arcee 的合作 **已经公开**；
- 未来 training run **计划 10 月开始**；
- 后续开放权重模型 **尚未完成、尚未发布**。

不能写成：

> “Bolt / Arcee 已经发布一万亿参数开放模型。”

### 4. Bolt Build Index 只能视为厂商 benchmark

Bolt 称其开放模型 lineup 在自建 **Bolt Build Index** 中得到 92.2，而 top paid model（文中称 Claude Opus 5）为 101.0，即约 91% 的分数。

这个数字只能标：

> **A：Bolt 确实发布了这一 benchmark claim；B-/C：它对真实相对能力意味着什么仍未独立验证。**

原因：

- benchmark 由 Bolt 自己定义 / 执行；
- 没有成熟第三方重复运行；
- harness 与 Bolt 产品环境高度耦合；
- preview 产品本身仍被 Bolt 标为 experimental。

而且 Bolt 官方反而明确提醒：

- serious project 切入 Forge 前先 duplicate；
- complex production work 继续留在 Standard / Max；
- Forge 当前不能上传 PDF。

所以不能用 91% 这个数字反过来写成“开放模型已经生产级替代 Claude Opus 5”。

## 社区与可靠性边界

本轮尚未获得足够量、足够成熟的 launch-day 独立用户样本来判断：

- Forge 在长项目中的 completion rate；
- 不同 open-weight model 的真实 failure / retry 分布；
- 50× allocation 是否会因不同模型消耗权重而大幅缩水；
- anonymization pipeline 是否经第三方隐私审计；
- opt-in corpus 对后续开放模型的实际增益。

因此首日应记录产品机制，而不是强行制造“社区共识”。

## 证据等级

| 结论 | 等级 | 说明 |
|---|---|---|
| Bolt Forge 9 月 14 日 research preview 上线 | **A** | Bolt 官方发布日期与可用说明 |
| Forge 是 Agent，不是 foundation model | **A** | 官方直接定义 |
| 默认 / 可选开放权重模型 lineup | **A** | 官方直接列明 |
| Pro preview 期 up to 50× allocation | **A（产品条款）** | 不等于每种 workload 都实际 50× |
| 每次进入 Forge 显式 opt-in 数据共享 | **A（政策存在）** | 官方产品机制 |
| secrets / personal data 一定能 100% 被成功清除 | **未证明** | 只有厂商 pipeline 声明，缺独立审计 |
| Bolt Build Index 达到 paid-model 约 91% | **A（厂商 claim）/ C（外推能力）** | 自建 benchmark，缺独立复现 |
| Forge 已具备 complex-production reliability | **不成立** | 官方自己建议 complex production 留在 Standard / Max |
| trillion-parameter open-weight model 已发布 | **不成立** | 仍是未来训练 / 发布承诺 |

## 历史意义

Forge 值得入史的核心不是“又一个 coding agent”，而是它把 Agent 经济中的一项长期隐性资源明确计量化：

> **用户产生的高质量任务轨迹本身可以成为支付媒介。**

2025—2026 年开放模型最难获得的往往不是公开网页文本，而是：

- 真实软件项目的多轮修改；
- build / test / error / fix trace；
- Agent 在实际工具环境中的行动序列；
- 人类什么时候接受、修正、撤销 Agent 的工作。

Forge 用额外 allocation 换这类轨迹，是一种值得长期追踪的 data flywheel 商业模型。

它还应与 9 月 13 日 Amp Free Agent 放在一起比较：

- Amp：**bring your own model / compute → harness layer 免费**；
- Bolt Forge：**share task traces → 获得更多 hosted Agent usage**。

这表明 coding-agent 市场的“免费”正在分化为不同的资源交换机制，而不是统一的 $0 产品。

## 建议写入位置

- `编年/2026/09.md`：9 月 14 日 Bolt Forge research preview；
- `志/Agent产品与商业化.md`：data-for-allocation / training-data exchange；
- `志/AI编程助手.md`：Bolt Agent lineup / open-model mode；
- `志/开源运动.md`：真实 Agent trace 如何进入开放权重训练；
- 若未来建立 Agent 数据 / 训练劳动专题，可把它作为“用户交互数据的商业计量”案例。

---

# 事件三：Perplexity × GPT-6 Astra——前沿模型进入真实软件修改与生产监控

## 准确日期

**2026-09-14：OpenAI 发布客户案例。**

一手来源：

- OpenAI, **“Perplexity trusts GPT-6 Astra with end-to-end systems”**, 2026-09-14  
  https://openai.com/index/perplexity-improving-accuracy-with-astra/

外部同期分析：

- Tech Beat, **“Perplexity Entrusts GPT-6 Astra With Software and Production Systems”**, 2026-09-14  
  https://techbeat.co/story/perplexity-entrusts-gpt-6-astra-with-software-and-production-systems

Tech Beat 不是独立 telemetry source，它的价值主要在于明确指出官方案例没有公开 deployment scope、performance figures、safeguards 或 incident history。

## 核心事实

OpenAI 的客户案例直接引用 Perplexity cofounder / CSO Johnny Ho，说明公司在使用 GPT-6 Astra：

- craft communications；
- **edit / change real-world software systems**；
- **monitor production software / production systems**；
- 构建 mock external services 做 end-to-end application testing；
- 相比之前模型，团队可以更少频率 check in。

这比“用了 Astra 写代码”更强，因为 Perplexity 公开承认的对象已经包括**真实系统修改与生产监控**。

## 这属于哪一级 adoption 证据

应该拆成四层：

### A. 公司确实公开这样描述自己的使用方式

这是 **A-/A** 级：OpenAI 官方客户页面有日期，且使用 Perplexity 联合创始人的直接引语。

### B. 产品功能不是单次 lab demo

措辞涉及 Perplexity 自身 software / production monitoring，因此至少属于**企业内部真实 workflow adoption 的公开声明**，强于纯 benchmark 或一次性演示。

### C. “减少人工 check-in”仍然是定性声明

页面没有给：

- check-in frequency 前后数值；
- autonomously approved action 比例；
- rollback / incident count；
- code-change failure rate；
- production-monitoring false positive / false negative；
- 运行规模、session 数或持续时间。

所以不能把一句“much less frequently”换算成 autonomous reliability 指标。

### D. 没有 ROI 数据

没有公开：

- 工程人时节约比例；
- 成本 / token 消耗；
- incident MTTR；
- deployment frequency；
- revenue / margin effect。

因此它是**生产采用证据，不是 ROI 证据**。

## 与近期用户评价的张力

Astra 的当前公开使用体验并不是一致好评。

近期 coding 用户样本一方面报告 Astra 在一些 agentic coding 工作中更快、更能完成复杂任务；另一方面也集中讨论：

- subscription quota 消耗快；
- latency / TTFT 波动；
- 有用户觉得 coding 输出不够 thorough；
- 同一 workload 下“能力更强”不必然等于“单位订阅容量更划算”。

示例社区史料：

- r/OpenAI, **“Any experience with GPT 6 Astra on agentic coding (Codex)”**, 2026-09-10  
  https://www.reddit.com/r/OpenAI/comments/1wc4kug/
- r/codex, **“GPT-6 Astra burns quota 4 times faster than GPT-5.6 Sol”**, 2026-09-10  
  https://www.reddit.com/r/codex/comments/1wciwc1/
- r/DeepSeek, **“GPT 6 astra burns your quota while DS v.1 flash nearly matches it for pennies”**, 2026-09-13  
  https://www.reddit.com/r/DeepSeek/comments/1wf3rbs/

这些社区帖子只能列 **C 级**，且与 Perplexity 内部 workflow 不是同一个 harness / plan / workload，不能相互否定。

真正值得记录的是这种分歧本身：

> **企业 customer story 可以显示“更少监督、更多真实系统委托”，而个人 / coding-agent 用户同时仍可能因为 quota、latency 和 cost-per-task 对同一个模型评价很差。**

因此“模型是否值得用”正在越来越依赖 deployment surface，而不是只依赖 checkpoint。

## 证据等级

| 结论 | 等级 | 说明 |
|---|---|---|
| OpenAI 9 月 14 日发布 Perplexity Astra 客户案例 | **A** | 页面带明确日期 |
| Perplexity 高管公开称 Astra 用于修改软件、监控 production | **A-** | 直接引语；由供应商客户页面承载 |
| Perplexity 确实有真实生产采用 | **B+/A-** | 公司具名自述，明显强于 demo；缺独立 telemetry |
| Astra 因此已证明 production reliability | **未证明** | 无 error / incident / repeatability 数据 |
| 人工监督频率显著下降 | **B（定性）** | 高管自述，无数值 |
| Astra 为 Perplexity 带来确定 ROI | **未证明** | 无财务 / 时间审计数据 |
| 社区对 Astra 使用成本 / coding 质量存在分歧 | **C+** | 多个真实用户样本，但非代表性统计 |

## 历史意义

这一条是 GPT-6 Astra 从“模型能力 / safety threshold”进入“真实委托边界”的早期生产样本。

此前 Agent adoption 常停在：

> draft → suggest code → open PR → human merge

Perplexity 的公开说法已经把边界推向：

> **edit real-world systems + production monitoring + lower-frequency human check-in**

但因为公开材料没有描述 approval gate / rollback / permissions，这恰好说明《大模型纪事》以后记录 production adoption 时，需要固定追问：

1. Agent 能看什么；
2. Agent 能写什么；
3. 哪些写操作要人工确认；
4. 失败能否 rollback；
5. 运行多久 / 多少次；
6. error / intervention / incident rate；
7. 成本与 ROI。

“用了 Agent”已经太粗糙。

## 建议写入位置

- `编年/2026/09.md`：9 月 14 日 production-delegation 样本；
- `志/Agent产品与商业化.md`：具名生产采用；
- `志/Agent宣传、实测与可靠性.md`：区分 customer claim、真实 adoption、repeatable reliability；
- `纪传/本纪/OpenAI.md`：Astra 发布后一周内的生产使用边界；
- 若已有 Perplexity 公司条目，可加入其 production-system Agent adoption。

---

# 模型竞争扫描：本轮没有新的主要 foundation-model SKU

本轮对 OpenAI、Anthropic、Google DeepMind、xAI、Meta、Mistral、DeepSeek、Qwen、Kimi、GLM、MiniMax 做了最近约 24 小时检索，没有确认新的主要 foundation-model 正式 release。

出现的搜索噪声主要包括：

- 对 GPT-6 Astra、Claude Fable / Mythos 5.1、DeepSeek V4.1 等 9 月前半月既有发布的二次报道；
- 把已有 coding agent / 产品重新包装成“今日 launch”的聚合文章；
- 尚无官方 release 的预期型号；
- 旧 benchmark 在 9 月 14 日重新被引用。

因此本轮不为了“每天有模型”而制造 release。

Bolt Forge 虽然使用 GLM 5.3 / Kimi K3 / DeepSeek v4 Pro 等模型，但它是**新 Agent 产品 / routing surface**，不是这些模型在 9 月 14 日重新发布。

---

# 三件事合起来的历史判断

9 月 14 日值得留档的主题不是“又出现一个绝对最强模型”，而是**模型能力如何被转换成可用劳动**。

三个事件恰好落在三层：

| 层 | 9 月 14 日样本 | 核心资源问题 |
|---|---|---|
| subscription / quota | Claude Code weekly-limit | 一份订阅真正包含多少 Agent 工作量？ |
| data / training economics | Bolt Forge | 用户是否愿意用真实工作轨迹换更多推理？ |
| production delegation | Perplexity × Astra | 企业愿意把多少真实系统控制权交给模型？ |

这说明 2026 年模型竞争史不能只维护 benchmark leaderboard。至少还要同时记录：

> **capability × quota × price × runtime × data rights × permissions × production trust × reliability**

同一个模型可以在其中某一轴显著进步，却在另一轴让使用者更不满意。

---

# 建议后续正文整合

## 编年

`编年/2026/09.md` 可新增一个 **9 月 14 日** 小节，至少写：

- Claude Code weekly-limit promotion 结束与永久新 baseline 生效；
- Bolt Forge research preview；
- Perplexity 对 Astra 的 production-system 委托声明。

## 志

优先更新：

- `志/Agent产品与商业化.md`：quota、data-for-allocation、production adoption；
- coding-agent 相关专题：把订阅额度作为真实竞争参数；
- Agent reliability / evaluation 专题：把“公司公开生产使用”与“生产可靠性证据”分层；
- 开源 / 开放模型专题：Forge 的用户轨迹 → open-weight training flywheel。

## 纪传

- Anthropic：Claude Code access / quota policy；
- OpenAI：Astra production adoption；
- 若有 Bolt / StackBlitz 或 Perplexity 公司条目，加入相应产品 / adoption 节点。

---

# 本轮明确不能推出的结论

1. **不能说 9 月 14 日发布了新的主要 GPT / Claude / Gemini / Grok / DeepSeek / Qwen / Kimi / GLM / MiniMax foundation model。** 本轮没有确认此类事件。
2. **不能说 Claude Code weekly limit “统一削了 17%”。** 相对原 baseline 是永久 +25%，相对刚结束的临时 150% headroom 才是约 -17%；且变化只覆盖 weekly limit 与指定 plans。
3. **不能把 Reddit 当作 Anthropic 隐藏削额的证明。** 当日用户抱怨是真实社区史料，但大于 17% 的体感可能受 workload、模型、context、cache、bug 等影响。
4. **不能把 Bolt Forge 写成新的 foundation model。** 它是一个 Agent product mode / open-model surface。
5. **不能说 Bolt 已证明 anonymization 永不漏 secret。** 这是厂商 pipeline claim，缺第三方审计。
6. **不能说 Forge 已经生产级。** Bolt 自己将其标作 research preview / experimental，并建议复杂 production 工作继续使用 Standard / Max。
7. **不能说 Bolt / Arcee 的 trillion-parameter open-weight model 已经发布。** 当前只是未来训练与发布承诺。
8. **不能说 Perplexity 的 Astra 部署已被独立审计。** 当前最强一手证据是 Perplexity 高管在 OpenAI 客户页面中的具名表述。
9. **不能说 Astra 因 Perplexity 案例已证明普遍可靠或有 ROI。** 没有公开 error rate、incident history、deployment scale、成本或财务数据。
10. **不能用个人 Codex quota 体验否定 Perplexity 的 production adoption，也不能用 Perplexity 客户案例否定普通用户对 quota / latency / quality 的抱怨。** 两者是不同 deployment surface，分歧本身才是应被保留的历史事实。
