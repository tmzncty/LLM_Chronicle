# 2026-10-27 增量研究包：GPT-6.1 Terra

> 事件实际发生日期：2026-10-26（美国时间；亚洲部分报道日期为 10 月 27 日）
> 扫描窗口：截至 2026-10-27 约 24 小时
> 主题：新模型 / computer-use agent / 价格与产品分层 / Preparedness

## 1. 事件

OpenAI 于 2026-10-26 正式发布 GPT-6.1 Terra。它不是预告或小修订，而是 GPT-5.6 Terra 的直接重要后继型号，面向视觉推理、computer use、日常写作和较高吞吐的 agentic work。

发布即实际可用：Plus、Pro、Enterprise、Edu 用户可在 ChatGPT Work 与 Codex 使用；开发者可通过 API 以 `gpt-6.1-terra` 调用。应把“发布日期”和“实际可用日期”均记为 2026-10-26，但企业席位仍可能受管理员权限与 rollout 影响。

## 2. 核心规格与访问

OpenAI 当前 API 模型页给出的规格：

- model id：`gpt-6.1-terra`
- context window：1,050,000 tokens
- max output：128,000 tokens
- knowledge cutoff：2026-06-01
- 输入：text + image；输出：text
- reasoning effort：none / low / medium（默认）/ high / xhigh / max
- tool calling 需要 Responses API
- 工具：functions、web search、file search、computer use
- standard API：$1 / MTok input；$0.05 / MTok cached input；$5 / MTok output
- cache write：30 分钟 $1.25 / MTok；12 小时 $2.50 / MTok
- >272K input：整次请求 input/cache 2×、output 1.5×
- Batch / Flex：Standard 的 50%；Fast：Standard 的 2×；regional processing 在可用地区 +10%

这意味着“$1/$5”不能被当作所有长上下文和所有服务等级下的统一实际价格。

## 3. 官方能力主张（必须与独立证据分开）

OpenAI 称：

- Agents’ Last Exam：medium effort 比 GPT-5.6 Terra 高约 15 个百分点，成本约为其 1/3；在该 benchmark 上接近/达到 GPT-6 Astra，而 token 标价约为 Astra 的 1/10。
- 完成这些任务的速度超过 GPT-6 Astra 与 GPT-6.1 Sol 的 3×。
- Terminal-Bench 4.0：max effort 50.3%，对比 GPT-5.6 Terra 已发布的 21.5%。
- 内部 factual-error benchmark：low effort 从 GPT-5.6 Terra 的 53.6% 降到 16.7%；max effort 为 4.3%。
- Terminal-Bench-Science 0.1：max effort 以更低成本超过 GPT-6.1 Sol，并接近 Claude Opus 5.5。

这些数字首先是 vendor benchmark / vendor harness 证据。尤其 Agents’ Last Exam、内部 factuality 测试和 OpenAI 自己给出的 cost-per-task 比较，不应写成广泛独立复现。

## 4. 独立与社区证据

发布日已经出现少量独立 benchmark 数据，但仍属于 very-early evidence。

第三方汇总的 Artificial Analysis launch-day snapshot 把 Terra（max）放在 Intelligence Index 约 48 左右，明显高于 GPT-5.6 Terra，但仍低于 GPT-6.1 Sol / 最顶级 frontier models；另有第三方记录 Artificial Analysis 的 Terminal-Bench 4.0 结果约 55.6%，与 Sol 约 56.1% 接近。不同页面/版本的指数数字存在差异，因此月度整理时应回到 Artificial Analysis 原始快照并锁定 harness/version，而不要混用不同 index 版本。

首日社区反馈尚不能形成共识。已有用户报告在 ChatGPT Work 的长文档/多阶段任务中出现 instruction-following 失败，也有用户关注 xhigh 的 usage allowance 消耗。样本极少，且 Work harness、reasoning effort、任务类型与账户配额均可能造成差异，因此只能记录为“launch-day failure reports / quota concerns”，不能推出模型普遍退化或实际 task cost 必然更高。

## 5. 安全与 Preparedness

OpenAI 明确称 GPT-6.1 Terra 在其 Preparedness Framework 的 cybersecurity 领域达到 **Critical threshold**，并沿用 GPT-6 Astra 开发的 protections。官方还称其在 scope adherence、honest disclosure 与 prompt-injection resistance 上较 GPT-5.6 Terra 改进。

这里必须区分：

1. “达到 Critical threshold”是 OpenAI 自己 Preparedness Framework 下的风险分类；
2. 不等于模型在无防护条件下已被证明具有某一种具体现实攻击能力；
3. “maintains Astra protections”也不等于安全可靠性已经由第三方证明。

结合 10 月 23 日公开的 frontier-training containment 事件，这一发布进一步说明：高 cyber capability 不再只存在于最高价旗舰层，能力开始向更便宜、更快的日常 Agent 层下沉，安全边界也因此需要随模型层级扩散。

## 6. 与最近 30 天竞争格局的关系

Terra 的历史意义主要不是“又一个 benchmark 第一”，而是 **frontier-ish computer use 的价格下沉与产品分层**。

当前 OpenAI 大致形成：

`Astra（最高能力） → Sol（能力/成本平衡） → Terra（视觉 + computer use + 高吞吐） → Luna（极低成本）`

Terra 标准 token 价是 Sol 的 1/2、Astra 的 1/10。若 vendor 与早期独立结果能在真实 computer-use workload 中保持，这会把竞争指标从单纯 benchmark score 推向：

`task success × wall-clock × tokens/task × verification cost × retry rate × price/token`

尤其 computer-use Agent 往往需要反复观察—行动—验证，因此 per-token 降价只有在没有被更多 token、更多 retry 或更多人工 verification 抵消时，才真正转化为 per-task cost 优势。

这与本月 Kimi K3.1 Pro、MiniMax M3.1 Flash、DeepSeek V4.1 Flash 1017、Gemini 4 Argon 等事件共同显示：10 月竞争越来越明显地同时围绕 **能力、速度、价格、Agent task economics 与产品层级** 展开。

## 7. 证据等级

### A：已确认产品事实

- GPT-6.1 Terra 正式存在并于 2026-10-26 发布。
- API model id、1.05M context、128K max output、reasoning settings、模态、价格与工具接口。
- Work / Codex / API 的首发可用性。
- OpenAI 对其 Preparedness cybersecurity 分类。

### B：厂商评测与能力主张

- Agents’ Last Exam、OpenAI factuality benchmark、OSWorld 2.1、Terminal-Bench(-Science) 官方图表中的相对性能、速度和 cost-per-task。

### B-/C+：首日独立与社区证据

- Artificial Analysis 等 launch-day 第三方结果：有价值，但必须锁定具体 harness/version/effort。
- Reddit / 社区 instruction-following、quota 与实际体验：只作为早期使用史料，不支撑总体能力结论。

## 8. 建议写入位置

建议后续在月度整理时写入：

- 2026-10 编年：10 月 26 日 GPT-6.1 Terra 正式发布并立即进入 Work / Codex / API。
- 模型表：GPT-6.1 Terra 的 context、output、modalities、reasoning、价格、工具、访问面与 Preparedness 分类。
- Agent / computer-use 志：记录 computer-use capability 向中价位/高吞吐模型层下沉。
- 商业化/价格表：与 Sol、Astra、GPT-5.6 Terra 以及同期 Claude / Gemini / Kimi / MiniMax 做 per-token 与 per-task 两层比较。
- 安全治理志：记录 Critical-cyber threshold 模型进入更低价、更广泛的 Agent 产品层。

## 9. 是否需要修订已有条目

当前仓库默认分支未检索到 `GPT-6.1 Terra`，因此本事件为新增，不是对已有条目的重复修订。

月度整理时建议检查旧的 OpenAI 产品分层描述：若仍把 Terra 仅写作 GPT-5.6 世代，应更新为 GPT-6.1 Terra，并避免把 GPT-6.1 Terra 误称为旗舰 Astra 的替代品；OpenAI 自己仍建议复杂 coding / research 优先 Sol 或 Astra。

## 10. 当前不能推出的结论

- 不能由 OpenAI 的 benchmark 图表推出 Terra 在真实生产 computer-use 中普遍等于 Astra。
- 不能把 50% token 降价直接写成 50% task-cost 降低。
- 不能从少量首日 Reddit 报告推出 Terra 普遍 instruction-following 退化。
- 不能把 Critical cybersecurity threshold 写成已发生现实攻击或已证明某种具体自主攻击能力。
- 不能在没有固定 benchmark version / effort / harness 的情况下把不同第三方榜单数字直接横向拼接。

## 11. 来源

### 一手

- OpenAI, “Introducing GPT-6.1 Terra” (2026-10-26): https://openai.com/index/introducing-gpt-6-1-terra/
- OpenAI API model page, `gpt-6.1-terra`: https://developers.openai.com/api/docs/models/gpt-6.1-terra
- OpenAI model catalog: https://developers.openai.com/api/docs/models

### 独立 / 社区（用于交叉核验和使用体验，不单独支撑高等级事实）

- GIGAZINE, 2026-10-27 launch coverage: https://gigazine.net/news/20261027-gpt-6-1-terra/
- AgentRiot, launch-day independent benchmark summary, 2026-10-26: https://agentriot.com/news/ai-models/gpt-6-1-terra-benchmarks-pricing-computer-use
- Reddit / r/codex launch-day instruction-following report: https://www.reddit.com/r/codex/comments/1xgcsh8/gpt61_terra_repeated_instructionfollowing/

## 12. 一句话历史判断

GPT-6.1 Terra 值得入史，不因为它已被证明是 2026 年 10 月“最强模型”，而因为 OpenAI 把接近 frontier 的视觉理解与 computer-use Agent 能力进一步压入 $1/$5 的中价层：**模型竞争从“谁最聪明”继续转向“谁能以更低的每任务成本，让可操作软件的 Agent 进入大规模日常工作”。**
