# 2026-09-23 增量研究包：GPT-6 Sol / Luna、Claude Opus 5.5 与 Agent 可观测性

> 检查窗口：以 **2026-09-23 17:36（北京时间）** 为基准，重点检查最近约 24 小时；同时补录巡检中发现、上一轮尚未进入仓库且符合“实质产品 / 安全政策变化”门槛的 Z.ai ZCode 数据上传事件与 Palo Alto Networks 多模型持续攻防服务。
>
> 仓库基线：`main` HEAD = `612d9476d851caf80121ba19f6ec66969096b288`，PR #44 已合并。开始本轮前已检查最近提交、`编年/2026/09.md`、`表/大事年表.md`、`志/AI Agent 生态.md`、最近 9 月 review 研究包，并检索 `GPT-6 Sol`、`Claude Opus 5.5`、`ZCode`、`OpenTelemetry`、`Continuous Frontier AI Defense`，确认下列条目尚未形成独立增量记录。

---

## 本轮结论

本轮存在明确需要入库的正式新模型与产品治理事件，不能跳过。

1. **2026-09-22：OpenAI 正式发布 GPT-6 Sol 与 GPT-6 Luna。** 两者不是 serving alias，而是 GPT-6 家族新增正式型号；API 当日可用，分别为 `gpt-6-sol`、`gpt-6-luna`。Sol 定价 $2/M input、$10/M output；Luna $0.10/M input、$0.50/M output，均较 GPT-5.6 对应档位的 promotional pricing 大幅下降。两者均为 1.05M context、128K max output，并支持 Responses API 的 web/file search、code interpreter、hosted shell、computer use、MCP 等工具。官方把这次发布明确定位为 **cost-efficiency frontier** 扩张。
2. **2026-09-22：Anthropic 正式发布 Claude Opus 5.5。** 这是 Claude 5.5 家族第一个正式型号，而不是 Opus 5 的 serving tier。API id `claude-opus-5-5`；$4/M input、$20/M output，较 Opus 5 headline token price 下降 20%，cache read 从 $0.50 降至 $0.20；Anthropic 称默认配置下典型 workload 总成本约下降 40%，标准输出速度提升 30%+。这是 Anthropic 9 月“pace the frontier”呼吁后的首个前沿发布，并首次把 Frontier Design、METR 的 prerelease external evaluation 与更严格 cyber/bio safeguards 一起写入型号发布叙事。
3. **同日竞争形成明显价格 / 产品分层节点。** OpenAI 用 Sol / Luna 把 GPT-6 能力向 $2/$10 与 $0.10/$0.50 两档下沉；Anthropic 用 Opus 5.5 把此前 Opus/Fable 级工作能力压到 $4/$20，并提高 Pro/Max/Team 五小时使用限额。第三方 Artificial Analysis 首日测量呈现出非常重要的分歧：Opus 5.5 在其 Intelligence Index 领先；GPT-6 Sol/Luna 相比前代的原始 intelligence 增益较有限，主要优势来自任务成本显著下降。这一日更像一次 **能力 / 成本 Pareto frontier 重排**，而不是“某一模型全面击败所有对手”。
4. **2026-09-22：GitHub 把 Copilot Agent 的可观测性与风险分级审批进一步产品化。** Copilot app 支持由企业管理员统一配置 OpenTelemetry，导出 Agent session 中模型请求、tool use 与 step-by-step traces；prompt / response 正文默认不导出。JetBrains 1.18.0 同日进入 `assisted approvals` public preview：低风险 tool calls 自动批准，高风险动作仍要求人工决定，并新增 persistent per-tool MCP controls。这里出现了一个很清晰的治理方向：**审批不再只是“每次都问 / 完全放开”的二元开关，而开始变成风险分级 + 可观测 tracing。**
5. **补录 2026-09-18—21：Z.ai ZCode codebase indexing 数据上传争议与处置。** 开发者逆向发现 ZCode 的 codebase indexing 会把本地 workspace / Git history 打包上传至云端，引发“未充分告知 / 默认上传私有代码”争议；Z.ai 9 月 18 日公开致歉并停用相关功能，随后承诺建立持续产品安全漏洞报告与响应机制，并于 9 月 21 日将 ZCode 开源。现有证据足以记录为 coding-agent data-boundary / disclosure 事件，但不能写成“恶意窃取源码”或“已证明数据被第三方滥用”。
6. **2026-09-22：Palo Alto Networks 正式推出 Unit 42 Continuous Frontier AI Defense。** 这是一项全球可购买的年度订阅服务，以 Claude Mythos 5、GPT-5.6-Cyber 与开放权重模型组成 multi-model harness，持续扫描、验证、串联并辅助修复企业暴露面。官方披露已在 Palo Alto Networks 内部及 **100+ customer engagements** 中验证；内部称三周得到相当于一年传统 pentest 的结果、high/critical vuln per product 提升 3.2×、MTTR 下降 51%。这些属于**具名厂商 production / customer-engagement telemetry**，强于 demo，但仍未经过独立审计，不能直接当成行业通用 ROI。

这一轮最值得留史的横向变化是：

> **9 月 22 日前沿竞争同时把“模型能力、每 token 价格、每任务成本、订阅限额、cache 经济性、外部安全评估、Agent 审批、运行 tracing 与真实企业持续部署”推到了同一天。**

因此月度比较应继续从单一 benchmark 扩展为：

`capability × task cost × token efficiency × access surface × runtime/tooling × approval policy × observability × data boundary × production adoption`。

---

# 一、GPT-6 Sol / Luna：GPT-6 从旗舰模型变成三级价格梯度

## 1. 准确日期、型号与实际可用性

OpenAI 于 **2026-09-22** 正式发布：

- `gpt-6-sol`
- `gpt-6-luna`

官方明确写明：

- 两者以与 GPT-6 Astra 相近的方法训练；
- Astra 仍是 GPT-6 家族“best across the board”的最高能力层；
- Sol 面向复杂 coding / agentic workflows；
- Luna 面向 focused、high-volume tasks；
- API 当日实际可用；
- ChatGPT Work 与 Codex 对 Plus、Pro、Business、Enterprise、Edu 用户开始 rollout；
- Free / Go 用户可在 desktop app 使用 Luna；
- **发布当日二者尚未进入 regular Chat。**

一手来源：

- OpenAI, “Introducing GPT-6 Sol and Luna”, 2026-09-22  
  https://openai.com/index/introducing-gpt-6-sol-and-luna/
- OpenAI API docs, GPT-6 Sol  
  https://developers.openai.com/api/docs/models/gpt-6-sol
- OpenAI API docs, GPT-6 Luna  
  https://developers.openai.com/api/docs/models/gpt-6-luna
- Reuters, “OpenAI expands GPT-6 lineup with cheaper Sol and Luna models”, 2026-09-22  
  https://www.reuters.com/technology/openai-expands-gpt-6-lineup-with-cheaper-sol-luna-models-2026-09-22/

证据等级：**A**（厂商正式发布 + API 文档 + 独立媒体确认）。

## 2. 规格与价格

| 项目 | GPT-6 Sol | GPT-6 Luna |
|---|---:|---:|
| API id | `gpt-6-sol` | `gpt-6-luna` |
| context | 1,050,000 | 1,050,000 |
| max output | 128,000 | 128,000 |
| knowledge cutoff | 2026-04-20 | 2026-05-18 |
| input | text + image | text + image |
| audio / video | 不支持 | 不支持 |
| reasoning effort | none / low / medium / high / xhigh / max | 同左 |
| input / 1M | $2.00 | $0.10 |
| cached input / 1M | $0.20 | $0.01 |
| cache write / 1M | $2.50 | $0.125 |
| output / 1M | $10.00 | $0.50 |
| weights | closed | closed |

两者在 Responses API 中正式支持：

- web search；
- file search；
- image generation；
- code interpreter；
- hosted shell；
- apply patch；
- skills；
- computer use；
- MCP；
- tool search；
- function calling；
- structured outputs。

API 文档还给出两个容易被 headline price 遮住的边界：

1. prompt 超过 **272K input tokens** 后，整次请求会采用更高的长上下文费率：input / cache 2×，output 1.5×；
2. EU data residency 当前仅 Standard processing 支持。

因此不能只用 `$2/$10` 与 `$0.10/$0.50` 描述所有实际 workload。

## 3. 这次降价究竟是多少

OpenAI headline 写“相比 GPT-5.6 promotional pricing 降价 50%”。

对 Sol：

- input：$4 → $2，-50%；
- output：$20 → $10，-50%。

对 Luna：

- input：$0.20 → $0.10，-50%；
- output：$1.20 → $0.50，实际上约 **-58.3%**。

所以更严谨的写法是：

> **Sol headline rate 减半；Luna input 减半、output 降幅超过一半。**

不要机械复制“每一项都是 50%”。

## 4. 官方 benchmark：重点是 cost per task，不只是 score

OpenAI 的发布材料反复强调的不是“Sol = 新旗舰”，而是低成本下的 agentic capability：

- AutomationBench：Sol xhigh 33.2%，官方给出的 cost per task 为 $0.27；
- DeepSWE v1.1：Sol max 68.8%，官方称距 Claude Fable 5 xhigh 的 69.9% 仅 1.1 pt，同时任务成本约低 80%；
- DeepSWE v1.1：Luna max 66.6%，官方称与 Opus 5 / Fable 5 medium 相近，同时任务成本远低；
- OSWorld 2.0 offline：Sol xhigh 60.5%，官方对照 Claude Opus 5 medium 60.3%。

证据等级：**B（厂商 eval / 厂商整理的 competitor comparison）**。

原因：

- effort settings 不同；
- harness 不同；
- competitor score 多来自公开报告而非统一同日重跑；
- cost 模型依赖 token accounting / fallbacks；
- production ChatGPT / Codex system prompt 与 research env 可能不同；
- OpenAI 自己明确承认研究环境与 production product 输出可能不同。

所以这些数字能证明“厂商已把成本作为核心竞争轴”，不能单独证明“Sol 在真实生产中比某个 Claude 型号全面更强”。

## 5. Prompt caching 这次已经是 Agent 基础设施变化

GPT-6 发布同时强化 prompt caching：

- cached input read 继续 90% discount；
- 新 Prompt Caching Dashboard；
- cache diagnostics；
- reasoning effort 改变时尽可能保留 prefix cache；
- tool availability 改变时也尽可能保留 prefix cache；
- explicit breakpoints 控制稳定 prefix；
- GitHub 在 OpenAI 发布页上的具名 telemetry 称，相关改进在数十亿次请求中使需要 fresh processing 的 prompt tokens 比例下降 **50%+**。

一手补充：

- OpenAI, “Better prompt caching for GPT-6”  
  https://openai.com/index/better-prompt-caching-for-gpt-6/

证据等级：

- 功能存在：**A**；
- GitHub 50%+ telemetry：**B（具名合作方生产 telemetry，未独立审计）**。

历史意义：

> **长程 Agent 的成本结构开始由“每 token 单价”进一步变成“状态有多少能被稳定重用”。**

对于多分支、background tasks、共享上下文的 Agent，cache 命中率已经接近 runtime architecture 参数。

## 6. 独立评价：主要升级发生在价格，不是 intelligence leap

Artificial Analysis 的首批独立测量被多家媒体引用：

- GPT-6 Sol max Intelligence Index ≈ **48**；
- GPT-5.6 Sol max ≈ 47；
- GPT-6 Luna max ≈ **37**；
- GPT-5.6 Luna max ≈ 37；
- Sol 的 Index cost/task 约 $1.06，前代约 $1.99；
- Luna 约 $0.07，前代约 $0.18；
- Coding Agent Index 中 Sol max 有小幅提升；Luna 则出现部分 coding 回落；
- GDPval-AA / AA-Briefcase 等更接近 deliverable-based knowledge work 的项目上，部分新型号并非全面优于前代。

参考：

- OfficeChai 对 Artificial Analysis 当日数据的整理，2026-09-22  
  https://officechai.com/ai/gpt-6-sol-shows-modest-gain-over-gpt-5-6-sol-on-artificial-analysis-intelligence-index-but-at-a-much-cheaper-price/

证据等级：**B+**（独立 benchmark 数据；当前引用通过二次整理页，应在后续月度汇编时尽量补回 AA 原始模型页 / 原始帖）。

本轮最稳妥的结论是：

> **GPT-6 Sol / Luna 是明显的效率发布。原始 intelligence 并未像价格一样发生数量级跃迁，但每任务成本显著下移。**

这正是“价格战”比“跑分大战”更值得留史的原因。

## 7. 社区评价：访问面与 rollout 成为首日争议

首日 Reddit 讨论中，一个高互动问题并不是“模型聪不聪明”，而是：

- Plus / Pro 能在 Work、Codex 使用；
- 但 regular Chat 仍没有 GPT-6；
- 用户把这种产品面分层视为订阅价值差异，而不是纯技术问题。

样本：

- r/ChatGPT, “PSA- GPT-6 Sol Just Launched. ChatGPT Plus Still Can’t Use GPT-6 in Regular Chat.”, 2026-09-22  
  https://www.reddit.com/r/ChatGPT/comments/1wnj0l8/

证据等级：**C（社区使用体验 / 产品反应）**。

可以记录“access surface 成为抱怨焦点”；不能推出：

- 广泛用户都不满；
- GPT-6 永远不会进入 regular Chat；
- Work / Codex rollout 已经覆盖全部账号。

## 8. 分发：发布当天即进入 GitHub Copilot

GitHub 9 月 22 日官方确认：

- Sol：Copilot Pro+ / Max / Business / Enterprise；
- Luna：Copilot Pro / Pro+ / Max / Business / Enterprise；
- VS Code、Visual Studio、CLI、cloud agent、Copilot app、github.com、mobile、JetBrains、Xcode、Eclipse 均进入 rollout；
- Enterprise / Business 管理员可通过 model policy 控制；
- default enablement 未关闭时，新模型默认启用。

来源：

- GitHub Changelog, 2026-09-22  
  https://github.blog/changelog/2026-09-22-openais-gpt-6-sol-and-gpt-6-luna-now-available/

证据等级：**A**。

这继续强化本月的一个结论：

> **模型发布与模型实际可达性是两套史料。**

厂商 API、ChatGPT Work、Codex、GitHub Copilot、enterprise model policy 都有自己的 rollout 与治理边界。

---

# 二、Claude Opus 5.5：Anthropic 把“前沿能力”与成本、安全、外部评估绑在同一发布里

## 1. 正式发布日期与身份

Anthropic 于 **2026-09-22** 发布 **Claude Opus 5.5**：

- Claude 5.5 family 首个型号；
- API id：`claude-opus-5-5`；
- 当日进入 Claude、Claude Code、Claude Platform；
- Anthropic 官方称 AWS、Google Cloud、Microsoft Azure 同日可用；
- GitHub Copilot 同日开始 rollout；
- Sonnet 5.5 / Haiku 5.5 只宣布“coming weeks”，**尚未发布**。

一手来源：

- Anthropic, “Claude Opus 5.5”, 2026-09-22  
  https://www.anthropic.com/claude-opus-5-5
- GitHub Changelog, “Claude Opus 5.5 is now available in GitHub Copilot”, 2026-09-22  
  https://github.blog/changelog/2026-09-22-claude-opus-5-5-is-now-available-in-github-copilot/
- Reuters, “Anthropic unveils Claude Opus 5.5”, 2026-09-22  
  https://www.reuters.com/business/anthropic-unveils-claude-opus-55-2026-09-22/

证据等级：**A**。

## 2. 价格、速度与订阅政策变化

Anthropic 官方价格：

| 项目 | Opus 5.5 | Opus 5 | 变化 |
|---|---:|---:|---:|
| input / 1M | $4 | $5 | -20% |
| output / 1M | $20 | $25 | -20% |
| cache read / 1M | $0.20 | $0.50 | -60% |
| cache write / 1M | $5 | $6.25 | -20% |

另有：

- standard output speed：官方称比 Opus 5 快 **30%+**；
- fast mode：最高 2.5× output speed；$8/M input、$40/M output；
- Anthropic 称默认 settings 下“typical workloads”总成本约比 Opus 5 低 **40%**，这包含**更低 token 单价 + 更少 token / steps**，不是 headline rate 单独下降 40%；
- Pro、Max、Team 的 five-hour usage limits 提高；
- subscription users 获得可保存、之后使用的 **rate limit reset**。

证据等级：

- token price / 限额政策：**A**；
- “typical workload 40% cheaper”：**B（厂商 workload estimate / early-access telemetry）**。

这是实质产品规则变化，应单独保留，而不是只写“新模型更便宜”。

## 3. 这次发布与“pace the frontier”并不等于停止发布

Anthropic 自己明确写：

> Opus 5.5 是其呼吁 **pacing the frontier** 之后的首个模型发布。

同时披露：

- Frontier Design prerelease evaluation；
- METR prerelease evaluation；
- automated behavioral audit；
- 更强的 prompt-injection / containment behavior tests；
- bio / cyber capability 达到需要 Fable 5.1 类 safeguards 的水平；
- Life Sciences Verification Program 当日可申请；
- Cyber Verification Program 计划数周内扩大。

这说明“pace the frontier”不能误写成“Anthropic 进入模型冻结期”。更准确的史料表述是：

> **能力继续发布，但公司试图把外部评估、验证访问、行为审计和 safeguard tier 变成发布流程的一部分。**

这是 9 月 12 日政策节点的实际后续证据。

## 4. 重要 safety / API 行为变化

Anthropic 还公布了几个会直接改变开发者行为的限制：

- zero data retention 可用；
- EU AI Act watermarking measures；
- adaptive thinking 不能关闭；
- preserved thinking anti-distillation safeguard 继续沿用；
- 对敏感 cyber / bio 任务存在更严格的 safeguard / fallback 行为。

特别要注意：Anthropic 官方 benchmark 中，Opus 5.5 在某些受 safeguard 影响的任务上会 fallback 到更低能力模型：

- cybersecurity → Opus 4.8；
- biology / frontier LLM development → Opus 5。

因此 benchmark 里的“Opus 5.5 system”与“单一 checkpoint 纯能力”并不完全相同。

这正好符合仓库现有方法论：

> **model ≠ deployed system。**

需要记录 checkpoint / model family，也要记录 safeguards、fallbacks、verification access 与产品 policy。

## 5. 官方 benchmark：很强，但不能把厂商表当统一第三方榜单

Anthropic 官方表：

| benchmark | Opus 5.5 | Fable 5.1 | Opus 5 | GPT-6 Astra |
|---|---:|---:|---:|---:|
| Terminal-Bench 4.0 | 66.4 | 55.8 | 52.3 | 57.9 |
| FrontierCode 1.1 Main | 54.4 | 50.3 | 48.0 | 53.3 |
| CursorBench 4.0 | 57.8 | 51.8 | 46.6 | — |
| GDPval-AA v2.1 Elo | 1846 | 1735 | 1708 | 1542 |
| AutomationBench | 40.0 | 31.4 | 26.9 | 41.4 |
| Terminal-Bench-Science | 58.7 | 52.6 | 29.0 | 64.6 |

重要的是，Anthropic 自己也给出了很少见的 caution：

> 在当前能力水平，benchmark margin 已经越来越不是 real-world difference 的可靠指南；其内部使用中，Opus 5.5 与 Fable 5.1 的真实差距比 score table 显示得小。

还要保留这些测量差异：

- effort 不同；
- fallback 存在；
- 部分 competitor score 由 competitor 报告；
- AutomationBench 中 Opus 5.5 是 Zapier early-access eval；
- public leaderboard 与 Anthropic 自跑值并不完全一致；
- standard error 在若干 benchmark 上可达数个百分点。

证据等级：**B / B+（厂商主表 + 部分具名第三方 eval，非同一统一 harness）**。

## 6. 独立评价：Opus 5.5 进入首日榜首，但“榜首”仍需按 harness 解释

Artificial Analysis 首日公开信息显示：

- Opus 5.5 max 在其 Intelligence Index ≈ **58**；
- GPT-6 Astra / Fable 5.1 约 53；
- 一些独立 Terminal-Bench 运行结果明显低于 Anthropic 自报的 66.4%，更接近与 Astra 持平；
- Opus 5.5 在 max effort 下 token usage 可能显著上升，因此其成本优势与 effort 选择高度相关。

当前可用二次整理：

- Kingy AI, 2026-09-22  
  https://kingy.ai/blog/claude-opus-5-5-specs-benchmarks-pricing-comparison/
- TestingCatalog 对 Artificial Analysis 当日公开结果的转述  
  https://www.testingcatalog.com/anthropic-launches-claude-opus-5-5-with-lower-api-costs/

证据等级：**B+ / B**。

后续月度整理时应优先补：

- Artificial Analysis 原始 model page；
- public Terminal-Bench board；
- 统一 effort / harness 下的 Astra / Sol / Opus 5.5 对照。

当前不应写：

- “Opus 5.5 已经全面击败 Astra”；
- “所有任务都比 Fable 5.1 强”；
- “40% cheaper 对任何 workload 都成立”。

## 7. 社区反馈：首日对速度与写作风格偏正面，但仍是 honeymoon sample

首日 Reddit 出现了两个较高互动样本：

- r/ClaudeAI 用户称 Claude Code 中 Opus 5.5 明显更快，尤其 UI bug 定位体验好；发帖者自己也提醒可能是 day-one honeymoon；
- 另一高互动帖集中称赞其写作 / 协作语气，认为相比 Opus 5 更少冗余、更像协作者；评论区也有人继续偏好 Astra，或认为不同任务优势不同。

样本：

- https://www.reddit.com/r/ClaudeAI/comments/1wnil7n/
- https://www.reddit.com/r/ClaudeAI/comments/1wnpit2/

证据等级：**C**。

可记录：

- 首日“速度 / UI coding / writing style”是明显感知点；
- 一部分用户把 token usage / five-hour limit 作为模型体验的重要组成部分；
- 与 Astra 的对比没有形成一致结论。

不能推出：

- 社区已形成稳定共识；
- Opus 5.5 长期不会被“nerf”；
- 首日体验等同于 production reliability。

## 8. GitHub Copilot 分发

GitHub 官方确认 Opus 5.5 进入：

- Pro+；
- Max；
- Business；
- Enterprise；
- VS Code / Visual Studio / Copilot CLI / coding agent / Copilot app / github.com / mobile / JetBrains / Xcode / Eclipse。

并明确：

- rollout gradual；
- Enterprise / Business 管理员可通过 model policy 控制；
- default enablement 规则适用；
- 按 provider list pricing 计费。

GitHub 还称其 early testing 中 Opus 5.5 在相近 task resolution 下使用更少 steps / tokens，并更快从 multistep errors 恢复。

前者（可用性、policy）证据等级 **A**；后者（performance）为 **B（分发方 early testing）**。

---

# 三、9 月 22 日“价格战”：不是简单的 OpenAI vs Anthropic 跑分冠军争夺

把 9 月 21—22 日连续事件放在一起：

- 9/21 Grok 4.7：$2/$6 起步价，frontier agent/coding；
- 9/21—22 MiMo-V2.6-Pro：MIT open weights、低价 API；
- 9/22 Opus 5.5：$4/$20，Opus 级性能与 usage-limit 增加；
- 9/22 GPT-6 Sol：$2/$10；
- 9/22 GPT-6 Luna：$0.10/$0.50。

这已经不是传统意义上“下一代模型比上一代模型 benchmark 高多少”的发布节奏。

真正发生的竞争是：

1. **旗舰能力下沉**：Astra / Fable 5.1 的部分能力被更低价 SKU 吸收；
2. **task cost 取代 token rate**：模型若需要更多 steps / output tokens，低单价未必等于低任务成本；
3. **cache cost 成为 Agent 经济性关键项**；
4. **产品访问面成为竞争变量**：API / Work / Codex / regular Chat / Claude / GitHub Copilot 的可达性不同；
5. **safeguard / verification 本身形成型号差异**；
6. **open-weight 竞争继续提供部署控制权，而 closed API 开始用极低价格削弱“只因为便宜而自托管”的理由。**

因此 9 月月度横向表至少应保留：

| 维度 | 为什么必须单独记 |
|---|---|
| headline token price | 最直观，但容易误导 |
| cache read / write | 长程 Agent 常占主要成本 |
| output tokens / task | verbosity 会直接改变总账单 |
| steps / tool calls | 决定 agent latency / cost |
| context surcharge | 1M context 不等于全区间同价 |
| effort level | 同一 model 可相差数倍成本 |
| harness | Codex / Claude Code / Grok Build 本身影响结果 |
| access surface | “发布”不等于所有用户可用 |
| policy / safeguard | 同一模型可能按任务 fallback |
| self-host right | open weights 的核心优势不只价格 |

### 当前不能推出

- OpenAI 已用 Luna 价格“消灭 open weights”；
- Opus 5.5 是绝对模型冠军；
- Sol 是 5.6 Sol 的所有任务无损替代；
- 低 list price 必然带来低 production cost；
- 同日发布意味着两家公司实时针对对方临时调价。

更稳妥的历史表述是：

> **2026 年 9 月 22 日出现了一次明显的前沿能力价格压缩：OpenAI 与 Anthropic 同日把新一代能力推入更低价格层，并把“每任务成本”而不是只看“每 token 单价”推到产品发布中心。**

---

# 四、GitHub Copilot：Agent 治理从“审批开关”进入 tracing + 风险分级

## 1. OpenTelemetry 进入 Copilot app 企业管理

GitHub 于 **2026-09-22** 宣布 Copilot app 支持通过 enterprise-managed settings 配置 OpenTelemetry。

管理员可以把 Agent activity 发送到组织已有监控系统，用于：

- session flow；
- requests to AI models；
- tools an agent uses；
- step-by-step execution trace；
- unexpected behavior investigation；
- central monitoring policy。

默认边界：

> **prompt / response content 默认不导出。**

若企业要捕获内容，需要单独调整 content-capture settings。

来源：

- GitHub Changelog, “OpenTelemetry in the GitHub Copilot app”, 2026-09-22  
  https://github.blog/changelog/2026-09-22-opentelemetry-in-the-github-copilot-app/

证据等级：**A**。

## 2. assisted approvals：低风险自动批，高风险仍人工

同日 GitHub Copilot for JetBrains 1.18.0 推出 **assisted approvals public preview**：

- low-risk tool calls：自动批准；
- higher-risk actions：继续 prompt user；
- MCP server 增加 persistent per-tool controls；
- built-in GitHub MCP Server 可单独开关，默认仍 enabled；
- Codex agent 增加 plan mode，可先 review / refine / approve plan 再实施。

来源：

- GitHub Changelog, “New features and improvements in Copilot for JetBrains”, 2026-09-22  
  https://github.blog/changelog/2026-09-22-new-features-and-improvements-in-copilot-for-jetbrains/

证据等级：**A（产品正式 public preview）**。

## 3. 历史意义

过去 Agent 权限产品大体是：

- 每个 action 都询问；
- allowlist；
- always allow；
- sandbox / network policy。

这次 GitHub 明确推进到：

> **风险分类 → 分级审批 → 执行 trace → 企业观测系统。**

这很接近传统生产系统的 runtime governance：

- authorization；
- policy decision；
- telemetry；
- incident investigation；
- audit trail。

也说明 Agent 的可靠性研究以后不能只问：

> “任务成功率多少？”

还要问：

> “它为什么获准做这个动作、谁批准了、执行路径是什么、出错后能不能重建事件链？”

## 4. 当前不能推出

- GitHub 的 risk classifier 已经经过独立安全认证；
- 所有 IDE / Copilot surface 都已经启用 assisted approvals；
- OTel tracing 默认记录用户 prompt / response；
- tracing 能防止错误动作，它主要提供可观测性，不等于 prevention；
- low-risk 分类永远正确。

建议后续重点观察：

- risk taxonomy 是否公开；
- assisted approval misclassification 事件；
- 是否扩展到 cloud agent / Copilot app；
- MCP tool permission 是否形成跨 IDE 一致模型；
- enterprise OTel 是否进入 SIEM / incident response 的实际案例。

---

# 五、补录：Z.ai ZCode 的 codebase indexing 数据边界争议

## 1. 事件时间应拆开写

公开证据表明，争议不是 9 月 22 日突然发生：

- **9 月 18 日**：开发者披露 ZCode codebase indexing 会打包本地 workspace / Git history 并上传云端，引发强烈反应；
- **9 月 18 日**：Z.ai / ZCode 公开致歉，称问题与 codebase indexing 有关，并停用 / 调整相关功能；
- **9 月 21 日**：Z.ai 将 ZCode framework 开源；
- **9 月 22 日**：Reuters、Caixin 等将事件推进到更广泛公共报道。

高质量独立来源：

- Caixin Global, “Z.AI Open-Sources Coding Tool After Backlash Over Silent Data Uploads”, 2026-09-22  
  https://www.caixinglobal.com/2026-09-22/zai-open-sources-coding-tool-after-backlash-over-silent-data-uploads-102487378.html
- Reuters 转引（Indian Express）, “China’s Z.ai disables AI coding assistant features after security issue”, 2026-09-22  
  https://indianexpress.com/article/technology/artificial-intelligence/chinas-z-ai-disables-ai-coding-assistant-features-after-security-issue-10888434/

证据等级：**B+**（高质量独立报道 + 对公司公开致歉 / 处置的转述；本轮未取得可稳定引用的 Z.ai 官方原始页面全文）。

## 2. 可以确认到什么程度

可确认：

- 争议围绕 codebase indexing；
- 本地 code / workspace / Git history 会被打包并上传到云端处理；
- 用户认为这一行为未获得充分、明确的事前同意；
- Z.ai 承认问题并公开致歉；
- 公司停用 / 修补相关功能；
- 公司表示将建立持续产品安全漏洞报告与响应流程；
- ZCode 随后开源。

当前不能确认：

- Z.ai 有恶意窃取源码意图；
- 上传数据被用于训练；
- 数据被第三方获取；
- 存在已确认的实际泄露后果；
- 所有 ZCode 版本 / 所有用户均受同样影响。

因此不应写“ZCode 偷代码”，而应写：

> **coding-agent codebase indexing 的 data boundary / consent / disclosure 失败争议。**

## 3. 历史意义

coding agent 要理解 repo，天然会触碰：

- source tree；
- Git history；
- local config；
- possibly secrets；
- generated artifacts；
- ignored / untracked files。

因此“建立 index”不是一个中性的 UX feature，而是一个明确的数据治理动作：

> **读取什么 → 是否上传 → 上传到哪里 → 保存多久 → 是否训练 → 谁能访问 → 用户能不能关闭。**

这和本月模型的 ZDR / retention 争议，以及 GitHub OTel 默认不捕获 prompt / response 的设计，恰好组成一个共同主题：

> **Agent 可观测性与 Agent 数据最小化必须同时设计。**

开源 ZCode 可以提高行为可审计性，但**开源代码 ≠ 已证明线上服务不存在隐含数据流**；后续仍需区分 client source、server behavior 与 deployed config。

---

# 六、Palo Alto Networks：restricted frontier cyber models 进入持续生产服务

## 1. 事件

Palo Alto Networks / Unit 42 于 **2026-09-22** 正式推出：

**Unit 42 Continuous Frontier AI Defense**

官方定义为：

- always-on；
- agentic offensive security service；
- 年度订阅；
- 全球可用；
- 使用 gated capability models；
- multi-model harness；
- 持续发现、验证、串联 attack path，并加速 remediation。

模型组合明确包括：

- Anthropic Claude Mythos 5；
- OpenAI GPT-5.6-Cyber；
- open-weight models。

一手来源：

- Palo Alto Networks, 2026-09-22  
  https://www.paloaltonetworks.com/blog/2026/09/introducing-unit-42-continuous-frontier-ai-defense/
- Palo Alto Networks press release  
  https://www.paloaltonetworks.com/company/press/2026/palo-alto-networks-delivers-anthropic-s-mythos-and-openai-s-gpt-5-6-to-customers-with-unit-42-continuous-frontier-ai-defense
- Reuters, 2026-09-22  
  https://www.reuters.com/technology/palo-alto-networks-unveils-ai-powered-cybersecurity-service-using-claude-gpt-2026-09-22/

证据等级：**A（产品存在 / 商业可购买）**。

## 2. 为什么它比普通“客户 testimonial”更强

Palo Alto Networks 官方称：

- 已在自身内部验证；
- 已跨 **100+ customer engagements** 使用 / 验证；
- internal deployment 中，continuous Mythos-based scanning 三周得到相当于一年 traditional penetration testing 的结果；
- high / critical vulnerabilities per product = legacy testing 的 **3.2×**；
- mean time to remediate 减少 **51%**；
- customer environment 中，第三方应用里 2/3 validated exposures 没有已知 CVE；
- 37% identified exposures 被评为 high / critical。

这些证据比一次 demo 强，因为：

- 有具名商业服务；
- 有真实企业环境；
- 有持续运行；
- 有 remediation workflow；
- 有超过百次 customer engagements。

但仍应标为：**B（厂商 production telemetry / customer-engagement aggregate）**，而不是 A 级独立效果证明。

原因：

- 没有独立审计原始样本；
- benchmark baseline 的选择由厂商定义；
- engagement selection bias 未披露；
- “相当于一年 pentest”是厂商换算口径；
- 没有公开失败率 / false positives / incident cost。

## 3. multi-model harness 的意义

Palo Alto Networks 给出一个很值得保留的 production 观察：

- 单一模型在 complex environment 中没有覆盖全部漏洞；
- 公司内部评估称单一 model coverage 不超过 40%；
- Mythos 5 与 GPT-5.6-Cyber 找到的 exposure 重合小于 10%。

这仍是厂商测量，不能普遍化；但它支持一个重要工程路线：

> **production Agent 可能不是“选一个最强模型”，而是按任务 / 风险 / 能力做 multi-model routing。**

这与 9 月前面的 model gateway / rerouting 研究呼应，但 cyber 场景更特殊：

- model access 本身受验证；
- action boundary 更危险；
- outcome 要求 exploitability validation；
- 需要 human offensive-security expert；
- ZDR 也是产品条款的一部分。

## 4. 不能推出

- Claude Mythos / GPT-5.6-Cyber 已实现 autonomous red team 无人值守；
- 100+ engagements 都是长期 production deployments；
- 51% MTTR reduction 是行业平均；
- multi-model 一定优于单模型；
- gated cyber model 已证明在所有企业网络中安全可靠。

最准确的历史位置是：

> **受限前沿 cyber models 已从 benchmark / vetted access 进入具名大型安全厂商的持续商业服务，并开始产生生产 telemetry。**

---

# 七、与最近 30 天竞争格局的关系

过去约 30 天已经出现：

- GPT-6 Astra；
- Claude Fable 5.1 / Mythos 5.1；
- Gemini 3.8 系列；
- DeepSeek V4.1 Flash；
- Qwen3.8 系列；
- Grok 4.7；
- MiMo-V2.6；
- 多个 realtime speech / translation SKU；
- Claude / GitHub / OpenAI 更细粒度的 Agent product / policy controls。

9 月 22 日之后，竞争格局可以进一步分成四层：

### 1. Intelligence frontier

Astra、Opus 5.5、Fable 5.1 等继续争夺高端 agentic / professional work。

### 2. Cost frontier

Sol、Luna、Grok 4.7、DeepSeek、Qwen、MiMo 把价格压到完全不同的区间。

### 3. Runtime / harness frontier

Codex、Claude Code、Grok Build、Copilot、Palo Alto multi-model harness 开始显著决定模型实际完成任务的能力。

### 4. Governance frontier

- external evaluation；
- safeguard fallback；
- verified access；
- assisted approvals；
- per-tool controls；
- tracing；
- retention / ZDR；
- data indexing consent。

所以“谁在追谁”已经不能用一个 Elo 排序回答。

更合理的问题是：

> **哪一家把哪一档能力，以什么成本、什么权限、什么可观测性、什么数据契约，塞进了什么实际工作流？**

---

# 八、社区 / 独立评价的分歧应怎样写进史料

本轮最清楚的分歧是：

### GPT-6 Sol / Luna

官方：

- 强调 agentic capability / cost；
- 强调 factuality / alignment；
- 强调 cache / inference efficiency。

独立 benchmark：

- raw intelligence 相比 5.6 增益并不大；
- Sol coding 有提升；
- Luna 部分 coding / knowledge-work 指标有回落；
- cost/task 明显下降。

社区：

- rollout / regular Chat access 是高频抱怨；
- 早期个案并不足以判断长期质量。

### Opus 5.5

官方：

- 强调 agentic coding / knowledge work；
- 强调少 steps / 少 tokens；
- 强调更自然的 communication；
- 强调 safer actions / external evaluation。

独立：

- AA 首日把它排到 index 前列 / 榜首；
- 某些独立 Terminal-Bench 结果低于 Anthropic 自报；
- max effort token usage 可能很高。

社区：

- writing / tone / speed 首日评价偏积极；
- 仍有 Astra / Claude 不同任务偏好；
- “honeymoon / nerf”叙事尚无证据价值。

因此本月总结应避免“某某模型赢了”的一句话史观，而应保留：

> **不同 harness、effort、任务类型、价格、产品面，会给出不同赢家。**

---

# 九、建议写入 / 修订位置

## 1. `编年/2026/09.md`

新增 9 月 22 日节点：

- GPT-6 Sol / Luna 正式发布；
- Claude Opus 5.5 正式发布；
- GitHub Copilot OpenTelemetry / assisted approvals；
- Unit 42 Continuous Frontier AI Defense。

ZCode 应按实际日期补在 **9 月 18—21 日**，并在 9 月 22 日注明主流报道扩散 / 开源后续，不应把整个事件误记成 9 月 22 日才发生。

## 2. `表/大事年表.md`

建议至少加入：

- GPT-6 Sol / Luna：能力价格分层 / 新一轮 API efficiency node；
- Claude Opus 5.5：前沿能力下探 + external evaluator / safeguard productization。

GitHub OTel / ZCode / Unit 42 是否进“大事年表”可在月度整理时再决定，它们更适合先进志 / 专题。

## 3. `志/AI Agent 生态.md`

建议增加：

- OTel tracing；
- risk-tiered assisted approval；
- per-tool MCP control；
- data indexing / upload boundary；
- multi-model production routing。

## 4. `志/AI编程助手.md`

建议增加：

- GPT-6 Sol / Luna、Opus 5.5 同日进入 GitHub Copilot；
- ZCode indexing 事件；
- approval / tracing 从 UX 进入治理基础设施。

## 5. `志/Agent宣传、实测与可靠性.md`

建议增加新的 evidence ladder：

`vendor benchmark → partner early test → independent benchmark → named production telemetry → multi-customer aggregate → independently audited ROI`

Palo Alto 当前约在：

> **named production telemetry / multi-customer aggregate，尚未到 independently audited ROI。**

## 6. 模型横向表

9 月月度表应该新增字段：

- cache read / write price；
- long-context surcharge；
- effort levels；
- cost per benchmark task；
- access surfaces；
- fallback / safeguard behavior；
- independent benchmark status；
- production telemetry status。

---

# 十、需要修订已有条目的地方

1. **GPT-6 家族**：此前只有 Astra，应更新为 Astra / Sol / Luna 正式三级结构。
2. **Anthropic “pace the frontier”**：此前不能证明承诺如何影响 release；现在应更新为“Opus 5.5 在 external prerelease evaluation + stricter safeguards 下继续发布”，但仍不能证明 external evaluator 对 release 有 veto 权。
3. **9 月价格竞争**：此前 Grok 4.7、MiMo-V2.6 已把 cost 纳入竞争；9/22 后必须把 GPT-6 Sol/Luna 与 Opus 5.5 同日降价加入月度横向对照。
4. **Agent permission 模型**：此前以 allowlist / approval / sandbox 为主；GitHub assisted approvals 表明 risk-tiered auto-approval 已进入正式产品 preview。
5. **Agent 可观测性**：此前 tracing 多属于 SDK / developer instrumentation；GitHub 现在把 OTel export 进入 enterprise-managed product surface，应补企业审计层。
6. **ZDR / data governance**：ZCode 事件应与 Anthropic retention、浏览器 ZDR、MCP physical-action permission 等本月条目交叉引用。
7. **restricted cyber model adoption**：Unit 42 表明 Mythos / GPT-Cyber 已进入正式持续商业服务，不应再只写成“可供 vetted researchers 使用”。

---

# 十一、本轮证据等级总表

| 结论 | 等级 | 说明 |
|---|---|---|
| GPT-6 Sol / Luna 正式发布 | A | OpenAI 正式发布 + API docs + Reuters |
| Sol / Luna 价格 / context / tool support | A | 官方 API 文档 |
| OpenAI 官方 benchmark | B | 厂商 eval / mixed competitor sources |
| AA 对 Sol / Luna 的首日测量 | B+ | 独立 benchmark，当前部分通过二次页面引用 |
| ChatGPT 用户访问不满 | C | Reddit 社区样本 |
| Opus 5.5 正式发布 / 定价 / 限额 | A | Anthropic + GitHub + Reuters |
| Opus 5.5 官方 benchmark | B / B+ | 厂商主表，部分 Zapier / public-board 支撑 |
| Opus 5.5 AA 首日排名 | B+ | 独立 benchmark，需月度时补原始页面归档 |
| Opus 5.5 首日速度 / writing 口碑 | C | 社区样本，尚无长期共识 |
| GitHub OTel | A | GitHub 正式产品公告 |
| GitHub assisted approvals | A | GitHub public preview 公告 |
| ZCode indexing 事件 | B+ | Reuters / Caixin + 公司公开致歉被转述 |
| Unit 42 服务正式上线 | A | 厂商正式发布 + Reuters |
| Unit 42 100+ engagements / 3.2× / -51% telemetry | B | 厂商生产数据，未独立审计 |

---

# 十二、哪些结论现在仍不能推出

不能推出：

1. GPT-6 Sol / Luna 在所有任务上优于 GPT-5.6 对应型号；
2. GPT-6 Luna 因为便宜就能替代所有 open-weight 本地部署；
3. Opus 5.5 在所有 benchmark / production workload 都是世界第一；
4. Anthropic 的 “40% cheaper” 对所有 effort / context / workload 都成立；
5. Anthropic 的 external evaluators 已拥有 release veto；
6. 首日 Reddit 好评 / 差评代表稳定社区共识；
7. GitHub assisted approvals 的 low-risk classifier 已独立证明安全；
8. OTel tracing 能防止 Agent 事故；
9. ZCode 存在恶意数据窃取或训练滥用；
10. ZCode 开源以后线上所有数据流都已可完全验证；
11. Palo Alto 的 3.2× / 51% 改善可外推到整个行业；
12. multi-model harness 已经证明在所有场景都优于 single-model；
13. 同日 OpenAI / Anthropic 发布意味着双方临时针对彼此的具体价格作出即时反应。

---

# 十三、本轮一句话史论

如果 2025 年的大模型竞争还常被写成“谁的旗舰更聪明”，那么 2026 年 9 月 22 日更适合写成：

> **前沿智能第一次如此明确地同时成为价格梯度、缓存经济、订阅配额、Agent runtime、权限分级、执行 tracing、数据契约和持续企业服务的组合商品。**

这一天真正值得留档的，不只是三个新型号，而是“模型”越来越难脱离它的运行系统来单独书写。