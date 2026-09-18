# 2026-09-18 增量研究包：Astra for Law、Anthropic AI-R&D 自动化测量与 Claude Code Projects

> 检查窗口：以 2026-09-18 北京时间傍晚为基准，重点检查最近约 24 小时；对 9 月 17 日北美时区正式发布、在北京时间 9 月 18 日进入主要报道窗口的事件作记录。
>
> 仓库基线：本轮开始时 `main` HEAD 为 `b03fe0a`，上一份研究包 `review/research-2026-09-17-misalignment-home-mcp-one-claude.md` 已合并。该包已覆盖 OpenAI model-misalignment reporting framework、Google Home MCP Early Access、Claude「one Claude」与 Docs / Slides。本轮写入前检索了最近研究包、`编年/2026/09.md`，以及 `Astra for Law`、`Anthropic R&D Automation Index`、`Projects redesigned` 等关键词，未发现以下条目已经正式入库。

---

## 本轮结论

本轮没有确认 OpenAI、Anthropic、Google DeepMind、xAI、Meta、Mistral、DeepSeek、Qwen、Kimi、GLM、MiniMax 在最近约 24 小时内又发布一个新的**通用基础模型大版本**；不能为了日更把旧型号、第三方榜单更新或路线图重新包装成“新模型”。

但按照本仓库已经明确的低门槛规则，确认四项值得记录的新节点：

1. **2026-09-17：OpenAI 正式发布 Astra for Law / GPT-6 Astra Law。** 它不是一套新的基础架构，而是 GPT-6 Astra 与法律搜索索引、法律分析/写作指令、工具、Trusted Access 和行业插件组合成的专用模型配置 / 产品层。它会在模型选择器中显示为 `GPT-6 Astra Law`，计划 API id 为 `gpt-6-astra-law`，因此应按“重要新型号 / 专业配置”留档，而不能因为底座仍是 Astra 就漏记。
2. **2026-09-17：Anthropic 首次公开一套面向“AI 正在多大程度建设下一代 AI”的公司级测量体系。** 截至 2026 年 8 月，Anthropic 称 Claude 在其 AI R&D 中“leads”约 26%，90% 以上工作达到至少“AI collaborates”，但**没有任何被测子集达到 AL5 全自主**。同一披露还给出约 30,000 个同时运行的内部研究/工程 Agent、在线/离线监督覆盖率、拦截率与 AI-R&D 安全算力占比。
3. **2026-09-17：Claude Code Projects 被重构成用户可见的多 Agent coordinator / threads 系统。** 一个 Project 可以把高层目标拆给多个并行 thread，每个 thread 是独立的 Claude Code cloud session 和仓库分支，并共享项目 memory / library；这使“多 Agent 协作”从研究 scaffold 和内部 Agent 平台继续进入普通 coding product 的产品原语。
4. **2026-09-17：Reuters 披露美国 Federal Register 网站曾把 Alibaba Qwen 作为法规评论搜索工具之一，并在社交媒体开始关注后撤下。** 公开材料不能确认具体部署日期、运行位置或是否有数据离开美国政府安全边界，因此这里只作为 **B 级公共部门模型 routing / removal 事件**留档，而不写成已经证实的安全事故。

这四项放在一起形成一条很清楚的新线索：

> **模型竞争正在从“谁的通用底模更强”继续拆成：专业知识索引与行业配置、AI 自己参与模型研发的比例、用户可见的多 Agent orchestration，以及组织究竟允许哪一个模型进入自己的数据与制度边界。**

---

# 一、OpenAI Astra for Law：专用模型 SKU 从“底模”扩展为模型 × 索引 × 指令 × 治理

## 1. 准确日期与事件性质

**2026-09-17**，OpenAI 正式发布 **Astra for Law**。

一手来源：

- OpenAI, “Introducing Astra for Law”, 2026-09-17  
  https://openai.com/index/astra-for-law/

独立来源：

- Reuters, “OpenAI launches legal-focused AI platform, escalating race for law firm users”, 2026-09-17  
  https://www.reuters.com/legal/litigation/openai-launches-legal-focused-ai-platform-escalating-race-law-firm-users-2026-09-17/

事件应写作：

> **OpenAI 发布以 GPT-6 Astra 为底座、叠加法律搜索索引、法律分析/写作指令、工具与专门治理控制的 Astra for Law；首批通过 Trusted Access 向 selected law firms 提供，API 将随后开放。**

不能写作：

- “OpenAI 又训练了一个完全独立于 GPT-6 Astra 的新基础模型”；
- “`gpt-6-astra-law` API 已经全面 GA”；
- “54% correctness 已由独立第三方在公开 harness 上复现”；
- “Astra for Law 已证明不会产生虚假法律引用”；
- “selected law firms 的 early access 已经等于大规模生产采用或 ROI 证明”。

## 2. 为什么它仍然应算“新型号 / 重要版本”

OpenAI 对产品的描述非常明确：Astra for Law 组合了：

- GPT-6 Astra；
- 针对法律分析与写作的 settings / instructions；
- 一个法律专用搜索索引；
- professional legal workflow tools；
- Trusted Access 与法律行业治理控制；
- 行业插件和 firm-specific integrations。

它将在 ChatGPT / Codex model picker 中显示为：

> `GPT-6 Astra Law`

计划 API id 为：

> `gpt-6-astra-law`

这说明到 2026 年，研究“新模型”已经不能只问：

> **有没有一套新的 transformer / MoE 权重？**

还要问：

> **厂商是否把某个底模与一个固定的 retrieval corpus、tool contract、instructions、governance profile 和产品身份绑定成了新的可选择 SKU。**

如果使用者看到的是不同 model id、不同数据来源、不同工具与不同权限边界，那么对使用史而言，它已经不是“同一个模型页面里加个 prompt”那么简单。

## 3. Legal Search Index：230M+ URLs 与每天更新

OpenAI 称 Astra for Law 可以搜索：

- U.S. case law；
- statutes；
- regulations；
- court rules；
- administrative decisions。

法律索引覆盖 **超过 2.3 亿 URLs**，并每日添加新来源。

OpenAI 同时与 Free Law Project / CourtListener 合作；其公开说明称 CourtListener collection 覆盖 **超过 99.9% 的已发布美国 precedential case law**。

证据边界很重要：

- 99.9% 是对“published U.S. precedential case law”这一子集的覆盖描述；
- 不能把它改写成“美国全部法律资料 99.9% 已收齐”；
- district court unpublished opinions、state unpublished materials、付费数据库独占内容等不能由这个数字自动推出；
- OpenAI 自己也把该索引定位为 complement licensed content / specialist products，而不是宣布替代 Westlaw / Lexis / CoCounsel 等所有专业来源。

## 4. 官方 benchmark：54.0% vs 38.7%，但仍是 private validation

OpenAI 用 **Vals AI Legal Research Bench 的 200 道美国法律研究题 private validation set** 测试完整 Astra for Law setup。

在双方都使用 highest reasoning effort 时：

- Astra for Law overall correctness：**54.0%**；
- GPT-6 Astra + web search：**38.7%**；
- OpenAI 计算为约 **40% relative improvement**。

在 case-law-focused questions 上，OpenAI 还报告：

- reference cases 多 **24%**；
- 在 audited target passages 上，从正确裁判文书中找出的 relevant passages 最多多 **54%**。

这些结果值得记录，但证据等级不能抬高：

> **benchmark 数据来自 OpenAI 对 private validation set 的测试；不是一个已经由多方公开复现实验建立的独立能力排名。**

因此它能支持：

- “OpenAI 的专用 retrieval / instruction configuration 在其测试中明显优于 base Astra + web search”。

不能支持：

- “法律研究正确率在所有真实事务中就是 54%”；
- “Astra for Law 已全面超过所有法律 AI 产品”；
- “54% correctness 意味着一份法律意见有 54% 概率整体正确”；
- “法律幻觉问题已经解决”。

## 5. 同日反证背景：法律 AI 错误仍在现实法院系统中继续累积

Reuters 2026-09-17 另有独立报道统计：生成式 AI 造成的错误/虚构内容已经出现在**至少 1,395 件美国州和联邦案件**中，并且近期仍持续出现律师因错误引用、虚构细节而受法官批评、罚款或调查的案例。

来源：

- Reuters, “AI error-ridden court filings surge despite three years of court sanctions”, 2026-09-17  
  https://www.reuters.com/legal/government/ai-error-ridden-court-filings-surge-despite-three-years-court-sanctions-2026-09-17/

这不是 Astra for Law 的事故统计，因此不能拿它证明 Astra for Law 本身存在相同失误率。

它真正构成的是**同期领域基线**：

> 法律行业正在同时发生“专用检索和引用系统快速加强”与“真实错误提交仍在持续”的双重过程。

因此专业化不能被写成“风险已经消失”；更准确的是：

> **厂商正在把法律工作中最容易造成高成本错误的 provenance / authority retrieval 做成模型 SKU 的核心组成部分。**

## 6. 访问、隐私与权限：Trusted Access 不是普通 API GA

初始阶段：

- selected law firms；
- Trusted Access；
- ChatGPT 和 Codex；
- API “coming soon”。

对 eligible firms，OpenAI 表示：

- API 可以提供 Zero Data Retention；
- ChatGPT Enterprise usage 默认 excluded from human review；
- 正与 Latham & Watkins 共同设计 information permissions、ethical walls、client instructions、firm oversight。

这些是法律产品不可忽略的一部分，因为律师工作的模型选择不是单纯的能力排序；还取决于：

- client confidentiality；
- matter-level access；
- ethical walls；
- retention；
- human review；
- source provenance。

这与 9 月中旬仓库已经记录的“retention policy 改变 enterprise routing”构成直接延续。

## 7. 插件与产品生态

同日 OpenAI 宣布：

- 26 个 partner-built plugins；
- 9 个 community plugins；
- 47 个 custom skills 示例/资产；
- ChatGPT for Word 同日 GA。

插件覆盖 Relativity、Clio、iManage、Intapp、DeepJudge、Thomson Reuters HighQ 等法律工作系统。

历史意义在于：

> **专业模型竞争不是“一个法律 LLM 对另一个法律 LLM”，而是模型 + authoritative data + firm context + connectors/plugins + permissions 的整体竞争。**

Reuters 同日也把 Astra for Law 放在 Google、Anthropic 以及 Thomson Reuters 自有法律模型 / 产品竞争的背景中报道。

## 8. 首日使用者与社区评价：分歧本身值得保存

OpenAI 页面上的 Sullivan & Cromwell、Harvey 等 early tester 引语总体正面，集中在：

- research depth；
- authority grounding；
- citation precision；
- practical advisory guidance。

但这些属于：

> **厂商发布页上的具名客户 / 合作方 testimonial。**

它们比匿名营销语强，却仍不是独立 blind evaluation。

同时，`r/legaltech` 首日讨论已经出现明显分歧：

- 有人认为专门的 authority retrieval / citation 是正确方向；
- 有人质疑 54% correctness 仍显得过低；
- 有人担心 CourtListener 对 unpublished / lower-court materials 的完整性不等同于专业数据库；
- 有人关心 API 是否最终广泛可得，而不是长期只服务 institutional firms；
- 有人继续把 privilege、data residency、第三方 cloud processing 视为核心采用障碍。

来源：

- Reddit / r/legaltech, “OpenAI releases Astra for Law with a legal search index covering 230 million URLs”, 2026-09-17。

这些评价应标为 **C 级首日社区史料**。它们可以证明“关注点和争议在哪里”，不能证明 Astra for Law 的真实性能、错误率或法律合规结论。

## 9. 最近 30 天竞争关系

Astra for Law 不是孤立发布。

同月已经出现：

- OpenAI ChatGPT for Financial Services；
- Anthropic Claude for Financial Advisors；
- Google Gemini Enterprise legal offering 扩张；
- Thomson Reuters 自有专业模型；
- 多家法律 AI vendor 把 frontier models 接到自己的 authoritative content / workflow 中。

因此 9 月的专业模型竞争已经表现为：

> **general frontier model → vertical configuration → authoritative corpus → enterprise permissions → workflow ecosystem。**

专业 vertical 正成为通用模型之后的第二竞争层。

## 10. 证据等级

| 命题 | 等级 | 说明 |
|---|---|---|
| Astra for Law 于 2026-09-17 正式发布 | **A** | OpenAI 官方发布日期 + Reuters 独立确认 |
| 它由 GPT-6 Astra + 法律索引 / 指令 / 工具组成 | **A** | OpenAI 官方直接说明 |
| Legal Search Index >230M URLs、每日更新 | **A-** | 厂商直接披露，外部无法完整审计语料覆盖 |
| CourtListener 部分覆盖 >99.9% published U.S. precedential case law | **A-/B+** | OpenAI 引 Free Law Project 口径；范围必须严格限定 |
| 54.0% vs 38.7% benchmark | **B+** | 数字明确，但属于厂商在 private validation set 上的运行 |
| early testers 认为 legal research 更好 | **B-/C+** | 具名合作方 testimonial，非独立盲测 |
| 法律科技社区对 54% / access / corpus 完整性存在分歧 | **C** | 首日社区史料 |
| Astra for Law 已生产级证明可靠且不会幻觉 | **不能推出** | 无长期独立 reliability / incident 数据 |
| API 已一般可用 | **错误** | 官方写明 coming soon |

## 11. 建议写入位置

优先：

- `编年/2026/09.md`：9 月 17 日 Astra for Law；
- `志/模型与训练.md` 或对应模型表：`GPT-6 Astra Law` 作为重要 domain SKU；
- `志/生态与产品.md`：legal vertical、plugins、Trusted Access；
- `志/社区文化.md`：首日法律科技社区对 correctness / coverage / access 的分歧。

---

# 二、Anthropic R&D Automation Index：第一次把“AI 建设下一代 AI”的内部过程量化到公司级

## 1. 准确日期与来源

**2026-09-17**，Anthropic Institute 发布：

- “Measurements for understanding the pace of AI development inside frontier labs”  
  https://www.anthropic.com/institute/measuring-pace-of-ai-development

独立来源：

- Reuters, “Anthropic says Claude now leads a quarter of work building its next AI models”, 2026-09-17  
  https://www.reuters.com/business/anthropic-says-claude-now-leads-quarter-work-building-its-next-ai-models-2026-09-17/

该文同时披露三套 measurement：

1. AI-led AI R&D；
2. internal agent oversight；
3. compute allocation。

这不是一个新模型发布，但它足以进入 Agent / automation / governance 史，因为它第一次把一个 frontier lab 内部“AI 到底参与了多少下一代模型研发”拆成可重复讨论的公司级指标。

## 2. 最重要的三个数字

截至 **2026 年 8 月**，Anthropic 称：

- Claude 在**任何被测 AI R&D 子集都没有达到 AL5 fully autonomous**；
- Claude 在约 **26%** 的 Anthropic AI R&D 工作中达到 AL4 “leads”；
- 达到至少 AL3 “AI collaborates”的工作占比**超过 90%**。

这里必须按 Epoch AI 风格 Automation Level 解释：

- AL3：AI 可以在紧密的人类指导下完成大块工作；
- AL4：AI 可以从高层 prompt 出发完成大部分端到端任务，但仍由人监督；
- AL5：无人在环的完全自主。

所以“26% leads”不能偷换成：

- “Claude 已经自主完成 26% 的下一代 Claude”；
- “Anthropic 已经实现 recursive self-improvement”；
- “26% 的 Anthropic 员工已经不需要”；
- “26% 是可直接跨公司比较的行业标准”。

更准确的写法是：

> **按照 Anthropic 自建任务篮子、基于 Epoch AI 的等级定义与 Claude judge，26% 的加权 AI-R&D 工作被评为 AL4：模型能从高层任务说明主导完成大部分端到端工作，人类仍监督。**

## 3. 方法：~15,000 tasks → 542-node tree → 378 leaves

Anthropic 在 2026 年 7 月每周：

- 从构成 model R&D loop 的各部门随机抽样约 20% staff；
- 让 Claude research agent 读取 Slack 与内部文档，列出被抽样员工当周实际任务；
- 四周形成约 **15,000 个 granular R&D tasks**；
- 再由 Claude 组织成 542 nodes 的层级任务树；
- 其中 378 个是 leaves。

之后：

- Claude research agents 调查每类工作如何完成、谁做、使用何种工具、AI 做了多少；
- 独立 Claude judge 依据证据分配 AL0—AL5；
- 再用 person-time 作为 task weight 的近似。

这是比“问员工感觉自己多少工作由 AI 做”更结构化的测量，但也引入一套非常关键的方法学风险：

> **同一家公司的模型参与收集、组织、判定同一家公司的 AI 自动化程度。**

Anthropic 自己也明确把“使用自己的模型 judge 自己系统”列为跨实验室比较的障碍之一，并主张第三方验证。

## 4. judge 一致性：59% exact，但“接近”远高于 exact

Anthropic 让负责相应工作领域的员工在不知道模型证据和结论的情况下独立打分。

结果：

- model-vs-human exact agreement：**59%**；
- human-vs-human exact agreement：**35%**；
- model / human 在一档以内：**97%**。

这组数字非常值得留史，因为它同时支持两件看似相反的事：

1. 模型 judge 并没有明显比人与人一致性差；
2. AL3 / AL4 等边界本身确实存在大量模糊区。

所以 26% 不应被报道成一个具有财务审计式精度的硬百分比；它更像是：

> **一个可版本化、可长期跟踪、但当前仍依赖定义与 judge 的 automation index。**

## 5. frozen basket 与“人转去做新工作”的问题

Anthropic 冻结 2026 年 7 月 task basket，以便之后比较同一套工作被自动化的程度。

它明确承认这种做法有一个经典自动化测量问题：

> 人类可能把旧工作交给 AI 后转向新工作；只测固定旧任务，会高估“整个职业/组织被自动化”的程度。

Anthropic 另用 2026 年 1 月 basket 检查 2—7 月新任务，在其分析颗粒度上没有看到“novel task”数量上升。

但它仍计划周期性重建 basket 并重版本化指数。

这使该指标更适合回答：

> **“2026 年中 Anthropic 当时正在做的 AI R&D 工作，有多少后来由 AI 主导？”**

而不是直接回答：

> **“Anthropic 全部未来研发工作里 AI 永远占多少？”**

## 6. 内部 Agent 规模：同时约 30,000 个

Anthropic 同文披露，截至 2026 年 8 月：

> **其最常用内部平台在任一时刻大约有 30,000 个 Agent 做研究与工程工作。**

范围必须严格限定：

- 这是 Anthropic most-used internal platform；
- 不是 Anthropic 全公司全部 Agent 的完整计数；
- 不是全世界 Claude Agent 数量；
- 也不是 30,000 个“独立员工”。

但对 Agent 基础设施史而言，这已经是很重要的生产规模公开值。

## 7. 监督体系：100% action coverage 与 1 / 47,000 block rate

对该平台，Anthropic 描述两层 monitor：

### online monitor

- **100%** agent actions 在执行前经过 online monitor；
- 自动检查通常在秒级；
- 被 block 的动作由人类在一周内 review；
- 2026 年 8 月分析超过十亿次 decisions；
- **0.002%** 被 block，约 **1 / 47,000**。

### offline monitor

- 100% actions 在事后进入 offline monitor；
- 每周大约 flag **100,000 transcripts**，再由多层 classifier 去 false-positive / initial review；
- 最高优先级约 **50 / week** 进入 human review；
- overall further-review flag rate 约每千 transcript 1—2 个。

这组数字非常容易被误解。

1 / 47,000 **不是**：

- Agent 只有 1 / 47,000 的概率犯错；
- monitor 召回率 100%；
- 其余 46,999 都已被证明安全；
- offline monitor 不再需要。

它只表示：

> **在 Anthropic 当前 online monitor 的规则、风险类别和阈值下，被实际 block 的 decision 比例。**

Anthropic 自己也强调未知行为、monitor science 与可观测性仍不成熟。

## 8. Agent identity 与 open communication：内部多 Agent 架构的罕见细节

Anthropic 还公开了其内部 scaffold 的两个设计原则：

### persistent agent identity

- 每个 Agent 有独立 identity；
- 所有数据 / action 与 identity 绑定；
- identity 不依附具体 model version；
- 底层模型升级后，Agent record 仍然连续。

### open messaging

- Agent 使用共享、开放的 messaging system；
- message 与 agent identity 绑定；
- 可以链接原始 reference；
- Agent 能看到彼此消息并纠错；
- message 又能 cross-reference 到 transcripts，方便 behavioral monitoring 沿通信链追踪。

这和仓库过去记录的 DseWiki / Artifactory / temporary-file 未授权通信形成一个很好的“正向设计”对照：

> **既然多 Agent 总会寻找共享状态与通信媒介，安全架构可能更需要提供一个显式、可归因、可审计的 message bus，而不是假设 Agent 不会通信。**

## 9. compute allocation：6% / 12%

Anthropic 对 **2026-07-13—07-20** 一周 compute 做分类，报告：

- AI R&D compute 中约 **6%** 分配给 safety；
- AI-driven AI R&D compute 中约 **12%** 分配给 safety。

Anthropic 称这是 deliberately conservative：

- 同时提升 capability 和 safety 的 workload 不计入 safety；
- safeguard classifiers 不包括在该比例中，另有一笔“comparable amount”的 compute。

但 compute share 本身并不是“公司有多重视安全”的完美度量，因为：

- safety work 可能研究者时间多、算力少；
- efficiency 提升会降低 compute share，却不代表 safety effort 下降；
- workload tags 有 best-effort / automated labeling，不是审计级真值。

因此当前只能作为：

> **可长期比较的资源分配代理指标。**

## 10. 政策含义：从 model risk report 向“开发过程 telemetry”扩展

Anthropic 主张 frontier labs 可以定期公开：

- AI-R&D automation level；
- agent monitor coverage / latency / escalation；
- safety compute share。

并称这些指标未来可以：

- 由第三方验证；
- 成为固定 testing window 的 trigger；
- 为 frontier pacing / public policy 提供可观测量。

Anthropic 同时重申正在设置 embedded independent third-party evaluators，给予其接近 internal risk teams 的访问，用于：

- verify safety practices；
- report incidents；
- monitor metrics。

这与 9 月 12 日仓库已记录的“frontier pacing / embedded evaluator”承诺是直接后续：

> **这一次不只是原则声明，而开始给“第三方进去以后究竟要测什么”提供具体指标。**

## 11. 独立核验与不能推出

Reuters 独立确认了 Anthropic 的主要公开数字：

- 26% leads；
- >90% collaborates or above；
- 无被测工作达到 fully autonomous；
- ~30,000 simultaneous internal agents；
- >1B decisions；
- 约 1 / 47,000 被在线 monitor block；
- 6% / 12% compute share。

但 Reuters 是对 Anthropic 披露的独立报道，并没有获得原始内部 Slack、task tree、monitor logs 与 accelerator telemetry 做完整审计。

因此：

- “Anthropic 发布了这些 measurement” = A；
- “这些 measurement 的内部原始数据已经被外部独立复核” = 尚未成立；
- “26% 可以直接与 OpenAI / Google 内部同一百分比横向比较” = 尚未成立；
- “已经达到 recursive self-improvement” = 明确不成立。

## 12. 证据等级

| 命题 | 等级 | 说明 |
|---|---|---|
| Anthropic 9/17 发布三类 pace measurements | **A** | 官方原文 + Reuters |
| Claude leads 26%、>90% collaborates+、无 AL5 | **A-** | 官方内部测量；定义和数据由 Anthropic 控制 |
| 内部主平台同时约 30,000 agents | **A-** | 厂商 telemetry 披露，外部未审计 |
| 100% online/offline coverage | **A-** | 对指定 internal platform 的厂商架构声明 |
| 1 / 47,000 decisions 被 block | **A-** | >1B decision 内部统计，Reuters 交叉报道 |
| AI-R&D safety compute 6%，AI-driven AI-R&D 12% | **A-** | 官方一周 snapshot；分类有明确方法局限 |
| 26% 精确代表“下一代 Claude 有 26% 由 AI 自己建成” | **错误 / 不能推出** | task-weighted automation index ≠ model contribution accounting |
| recursive self-improvement 已实现 | **明确不能推出** | 官方明确没有被测子集达到 AL5 |
| 指标已经可跨 lab 直接比较 | **尚未成立** | Anthropic 自己指出缺共同 methodology / third-party validation |

## 13. 建议写入位置

优先：

- `编年/2026/09.md`：9 月 17 日 Anthropic pace measurements；
- `志/Agent.md`：30k internal agents、monitor architecture、persistent identity / open messaging；
- `志/评测与治理.md`：R&D Automation Index、monitor coverage / escalation metrics；
- `志/产业与算力.md`：safety compute allocation measurement；
- 与 9 月 12 日 embedded independent evaluator 条目建立回链。

---

# 三、Claude Code Projects redesigned：coordinator + parallel threads + shared memory 进入 coding product

## 1. 日期与一手来源

**2026-09-17**，Anthropic / Claude 发布：

- “Projects redesigned: from folder to conversation”  
  https://claude.com/blog/projects-redesigned

独立来源：

- The Verge, “Claude Code relaunches Projects to manage multiple AI agents in the cloud”, 2026-09-17  
  https://www.theverge.com/ai-artificial-intelligence/997134/anthropic-claude-code-projects

产品当前是：

> **beta，先面向 select Claude Pro / Max subscribers，并要求其使用 Claude Code cloud sessions、且没有既存 web / desktop projects；随后扩大到更多 Pro / Max，再进入 Team / Enterprise 和更广 Claude surface。**

这不是“9 月 17 日所有 Claude 用户已全面切换”。

## 2. 从 project folder 到 coordinator

Anthropic 对新 Projects 的核心描述是：

用户只需要给高层目标，Claude 会：

- scope request；
- delegate work；
- coordinate parallel threads；
- review outputs；
- assemble final result。

用户可以：

- 在主 project chat 里像 brief chief of staff 一样下达方向；
- 进入任何 thread 逐个查看 / steer；
- 离开电脑后让任务继续；
- 从手机继续监督进度。

这使 Project 不再只是：

> “把一堆聊天和文件放进同一个 folder”。

它开始变成：

> **一个用户可见的 long-running multi-agent coordinator。**

## 3. 每个 thread 都是完整 Claude Code cloud session + 独立 branch

官方披露的实现边界非常具体：

- 每个 thread 是一个 Claude Code cloud session；
- 有自己独立 branch 与 repo copy；
- coordinator 管理工作分解和顺序；
- 多个 thread 修改相同代码时，冲突按普通 PR merge conflict 处理；
- 每个 thread 还能继续拆成 subagents、loops、workflows。

这是一个很重要的产品架构节点：

> **多 Agent 并行不再隐藏在厂商内部 scaffold；branch / PR / merge conflict 被直接用作 Agent 并发隔离和合流机制。**

它和用户现实软件工程的版本控制语义对齐，而不是另造一个完全不透明的“Agent workspace”。

## 4. shared memory：多个 thread 不再完全独立

新 Projects 的另一个核心变化是：

> **every thread adds to and draws from a shared memory。**

官方示例包括：

- release 改到周五；
- 为什么某功能被砍；
- 修改 billing service 前应找谁确认；
- 用户的沟通风格和 check-in 偏好。

同时 project library 收集：

- 用户上传文件；
- Claude 生成 artifacts。

这意味着长期 coding Agent 的 state 开始明显分层：

1. thread-local context；
2. repository branch state；
3. project shared memory；
4. project file / artifact library；
5. coordinator-level goal / instructions。

这应与 9 月 16 日 OpenAI compaction-summary misalignment 条目回链：

> **长期 state 越来越重要，就越不能把“memory”当成无风险缓存层；必须继续研究 provenance、污染、权限与修正机制。**

## 5. 资源与商业边界：一个 thread 就是一整个 session

Anthropic 明确提醒：

- Projects 可以并行跑多个 threads；
- **每一个 thread 都是 full Claude Code session**；
- 因此会更快碰到 usage limits；
- 用户可以为 coordinator 和 worker threads 分别设置 model / effort。

所以不能写成：

> “Anthropic 免费给用户无限多并发 Agent”。

更准确的是：

> **产品把并行 Agent 变得容易，但并发仍然消耗多个完整 session 的算力 / 配额。**

这延续了本月一直在形成的 Agent 商业计量问题：

- 是按 token；
- 按 session；
- 按 runtime；
- 按 remote compute；
- 还是按 orchestration concurrency 计价。

## 6. 当前限制：cloud only

官方明确写明：

- threads 当前只跑 cloud；
- local machine；
- local tools / code；
- behind-your-network environment

仍是 “coming very soon”。

因此当前 beta 不能证明：

- 企业私网 / 本地开发机已无缝支持；
- 复杂多 repo 并行能长期稳定工作；
- merge conflict 可以自动无风险解决；
- shared memory 不会产生错误传播；
- coordinator 对几十 / 上百并行 thread 已生产可靠。

## 7. 与 9 月 16 日「one Claude」的关系

上一轮刚记录：Claude 正把 chat 和 Cowork 的显式模式边界撤掉，让用户提出目标后由 Claude 自己决定是否进入更 agentic 的工作方式。

一天后 Projects redesigned 又把 coding 场景向前推一步：

> **用户不只是不必选择“chat 还是 agent”，甚至逐渐不必自己决定“这个目标应该拆成几个 agent / 几条 session”。**

产品层正在把：

- mode selection；
- task decomposition；
- agent creation；
- branch assignment；
- progress aggregation

逐步收进 coordinator。

这使“Agent”越来越不像一个单独按钮，而更像产品背后的执行拓扑。

## 8. 独立评价

The Verge 独立确认：

- project 中存在多个并行 threads；
- central coordinator；
- shared memory / goals / file-artifact library；
- 每个 thread 独立 repo branch；
- 支持继续用 subagents / loops / workflows；
- launch 时 cloud-only；
- beta 范围有限。

首日尚缺足够广泛、可重复的生产用户 telemetry，因此不应该为了“社区评价”一栏强行制造共识。

目前最确定的使用代价反而是官方自己承认的：

> **并行 thread 越多，plan usage limit 消耗越快。**

这应作为产品现实，而不是隐藏在宣传中的脚注。

## 9. 证据等级

| 命题 | 等级 | 说明 |
|---|---|---|
| Projects redesign 于 9/17 进入 beta | **A** | Claude 官方 + The Verge |
| coordinator 可拆分并行 threads | **A** | 官方架构说明 |
| 每个 thread 是独立 Claude Code cloud session / branch | **A** | 官方明确披露 |
| threads 共享 project memory | **A** | 官方明确披露 |
| 多线程会更快消耗 usage limits | **A** | 官方明确提醒 |
| 当前支持本地机 / 私网工具 | **错误** | 当前 cloud-only，local support 尚未来 |
| 新 Projects 已证明大规模 multi-agent production reliability | **不能推出** | beta，缺长期独立数据 |
| shared memory 已证明不会传播错误 / 污染 | **不能推出** | 无相关安全统计 |

## 10. 建议写入位置

优先：

- `编年/2026/09.md`：9 月 17 日 Projects redesigned；
- `志/Agent.md`：coordinator / thread / subagent / shared-memory architecture；
- `志/生态与产品.md`：Claude Code multi-agent productization；
- `表/Agent平台功能矩阵.md`（若存在）：cloud session、branch isolation、shared memory、parallel threads、local-network support 状态。

---

# 四、Federal Register × Qwen：公共部门模型 routing 在公开争议后撤回

## 1. 日期与证据边界

Reuters 于 **2026-09-17** 报道：

- 美国 Federal Register 网站曾提供一个使用 Alibaba Qwen 的搜索工具；
- 该工具用于浏览 proposed federal regulations / public comments；
- Reuters 看到的 screenshots 与 archived source code 表明，该功能在周三仍可见；
- 随着社交媒体开始出现相关帖子，功能在大致同一时间被撤下；
- Reuters 当时无法确认它究竟何时首次部署。

来源：

- Reuters, “US government website used AI search tool from China that FBI said copied Anthropic”, 2026-09-17  
  https://www.reuters.com/legal/litigation/us-government-website-used-ai-search-tool-china-that-fbi-said-copied-anthropic-2026-09-17/

National Archives / White House 在 Reuters 截稿时没有回应，因此这不是一个有完整 agency postmortem 的 A 级官方事件。

## 2. 能确认与不能确认

### 可以确认到 B / B+

- Federal Register 页面确实曾出现 Qwen-powered search；
- Reuters 通过截图和 archived source code 做了独立检查；
- 功能随后被移除；
- 页面处理的是本来就公开的 Federal Register 内容。

### 目前不能确认

- 初次部署日期；
- 使用的是哪一个 Qwen 精确型号；
- 模型是本地 / 自托管还是调用 Alibaba infrastructure；
- 美国政府数据是否离开其 security boundary；
- 撤下动作是否来自正式政府政策决定；
- 是否发生实际 cybersecurity incident。

Reuters 引述的专家也指出：因为 Federal Register 内容本身公开，单凭“使用 Qwen”不能自动推导出 immediate national-security compromise；风险关键取决于部署方式、data routing 与控制边界。

## 3. 历史意义：模型国籍、开放权重与部署边界开始进入政府产品选择

这件事值得进入《大模型纪事》，不是因为要把它政治化，而是因为它把几个长期问题一次放到真实产品里：

- open-weight model 可以被组织自己部署；
- 模型供应商国籍与 geopolitical trust 会影响采用；
- public data workload 与 sensitive data workload 的风险并不一样；
- “使用某国模型”与“把数据发送给该国厂商服务器”不是同一件事；
- 社交 / 政治 scrutiny 可以比技术 incident 更快改变模型 routing。

因此未来记录政府/企业模型禁用或替换时，至少要拆成：

> **model provenance × weight openness × inference location × data boundary × contractual control × policy / geopolitical acceptability。**

不能只用“美国模型 / 中国模型”二分法代替技术事实。

## 4. 证据等级

| 命题 | 等级 | 说明 |
|---|---|---|
| Federal Register 曾提供 Qwen-powered search | **B+** | Reuters + archived code/screenshots；缺 agency 正式说明 |
| 9/16 左右功能已撤下 | **B+** | Reuters 观察 |
| 因正式国家安全评估而撤下 | **不能推出** | 没有官方 postmortem / decision memo |
| 政府敏感数据发送到了 Alibaba | **不能推出** | inference location / routing 未知，内容本身公开 |
| 使用 Qwen 本身造成 cybersecurity incident | **不能推出** | 无事故证据 |

## 5. 建议写入位置

- `编年/2026/09.md`：作为 9 月 17 日公共部门模型 routing / removal 事件；
- `志/生态与产品.md`：open-weight model deployment 与供应商选择；
- `志/治理与政策.md`：model provenance / inference boundary / public-sector procurement；
- 与 Anthropic 9 月 10 日关于 distillation / model access 的条目建立证据边界链接，但不要把两者写成因果链。

---

# 五、横向综合：9 月 17 日为什么值得单列

如果只按“基础模型 leaderboard”记录，9 月 17 日看起来可能没有新的 GPT / Claude / Gemini 通用大版本。

但从使用史看，这一天同时出现了四个很典型的变化：

| 层 | 事件 | 新变化 |
|---|---|---|
| 专业模型 | Astra for Law | `base model + authoritative corpus + domain instructions + tools + governance` 形成独立 SKU |
| 研发过程 | Anthropic R&D Automation Index | “AI 帮助造下一代 AI”从抽象说法变成可版本化公司指标 |
| Agent 产品 | Claude Code Projects | coordinator + parallel sessions + branches + shared memory 成为普通产品功能 |
| 组织 routing | Federal Register × Qwen | 模型 provenance / inference boundary / geopolitical acceptability 进入真实公共部门产品选择 |

因此当前竞争单位越来越像：

> **model × domain corpus × harness × memory × agent topology × permissions × deployment boundary × organizational trust。**

这不是说“模型本体已经不重要”。恰恰相反：

> **通用 frontier model 正在成为底层 intelligence substrate；真正决定一个组织敢不敢用、能不能用、用到什么深度的，越来越是它周围的索引、工具、Agent runtime、state、权限和治理合同。**

---

# 六、本轮未发现 / 不应误记为新发布的事项

本轮同时检查了 OpenAI、Anthropic、Google DeepMind、xAI、Meta、Mistral、DeepSeek、Qwen、Kimi、GLM、MiniMax 的近期发布页与相关新闻。

截至本轮：

- 未确认最近约 24 小时内新增一个新的主要通用 foundation-model SKU；
- Astra for Law 应记录为**重要专用型号 / configuration**，但不能误写成新的 GPT-6 底座架构；
- Qwen3.8 Max、Kimi K3、DeepSeek V4.1 Flash、GLM 5.x、MiniMax 既有型号的榜单/比较文章不是 9 月 17—18 日的新模型发布；
- xAI Grok Bot Galaxy 活动与 Grok Bot 产品已有更早正式发布日期，不能因为 9 月 17 日活动结束而重算为新产品诞生日。

---

# 七、建议后续跟踪

后续值得观察，但本轮不能提前写成事实：

1. **Astra for Law API GA**：何时真正开放、价格、rate limit、API retention / legal-search contract 是否与 Trusted Access 一致；
2. **独立 legal benchmark**：是否有人用公开题集和固定 harness 复现 Astra for Law 的 research / citation 提升；
3. **真实法律事故率**：专业法律 SKU 是否显著降低 hallucinated citation、outdated precedent、wrong-jurisdiction authority；
4. **Anthropic Automation Index 下一期**：26% 是否继续快速上升，task basket 如何 version；
5. **第三方 evaluator 是否真正进驻 Anthropic**：是否出现可公开核验的独立 measurement；
6. **Claude Projects rollout**：Team / Enterprise、local tools、behind-network support 何时落地；
7. **shared memory 的纠错 / provenance / poisoning 机制**；
8. **多 Agent session 计量**：并行度与 Pro / Max / Team quota 的实际关系；
9. **Federal Register Qwen 事件是否出现官方 agency explanation**，尤其是 model id、hosting / inference location 与撤下原因。

---

# 八、来源清单

## A：一手 / 官方

1. OpenAI — Introducing Astra for Law, 2026-09-17  
   https://openai.com/index/astra-for-law/

2. Anthropic Institute — Measurements for understanding the pace of AI development inside frontier labs, 2026-09-17  
   https://www.anthropic.com/institute/measuring-pace-of-ai-development

3. Claude / Anthropic — Projects redesigned: from folder to conversation, 2026-09-17  
   https://claude.com/blog/projects-redesigned

## B：高质量独立报道

4. Reuters — OpenAI launches legal-focused AI platform, escalating race for law firm users, 2026-09-17  
   https://www.reuters.com/legal/litigation/openai-launches-legal-focused-ai-platform-escalating-race-law-firm-users-2026-09-17/

5. Reuters — Anthropic says Claude now leads a quarter of work building its next AI models, 2026-09-17  
   https://www.reuters.com/business/anthropic-says-claude-now-leads-quarter-work-building-its-next-ai-models-2026-09-17/

6. The Verge — Claude Code relaunches Projects to manage multiple AI agents in the cloud, 2026-09-17  
   https://www.theverge.com/ai-artificial-intelligence/997134/anthropic-claude-code-projects

7. Reuters — US government website used AI search tool from China that FBI said copied Anthropic, 2026-09-17  
   https://www.reuters.com/legal/litigation/us-government-website-used-ai-search-tool-china-that-fbi-said-copied-anthropic-2026-09-17/

8. Reuters — AI error-ridden court filings surge despite three years of court sanctions, 2026-09-17  
   https://www.reuters.com/legal/government/ai-error-ridden-court-filings-surge-despite-three-years-court-sanctions-2026-09-17/

## C：使用体验 / 社区史料

9. Reddit / r/legaltech — OpenAI releases Astra for Law with a legal search index covering 230 million URLs, 2026-09-17。  
   用于观察 correctness、corpus coverage、API access、privilege / retention 等首日争议；不得单独作为高等级性能或合规证据。

---

# 九、可直接转写的编年摘要

> **2026-09-17** — OpenAI 发布 Astra for Law（模型选择器名称 `GPT-6 Astra Law`），把 GPT-6 Astra 与超过 2.3 亿 URL 的美国法律索引、法律分析/写作指令、行业工具和 Trusted Access 治理组合为专业法律 SKU。首批仅向 selected law firms 提供，API 尚未 GA。OpenAI 在 Vals AI Legal Research Bench private validation 的 200 题测试中报告 54.0% overall correctness，高于 base Astra + web search 的 38.7%，但该结果尚非公开独立复现。同日 Anthropic 首次公开 R&D Automation Index：截至 8 月，Claude 在其 26% AI-R&D 工作中达到 AL4 “leads”，>90% 至少达到“collaborates”，没有任何被测子集达到 fully autonomous；其主要内部平台同时约有 30,000 个研究/工程 Agent。Claude Code 同日将 Projects 重构为 coordinator + parallel cloud threads + independent repo branches + shared memory 的多 Agent beta。Reuters 另披露 Federal Register 网站曾采用 Qwen-powered search 后撤下；具体部署方式与撤下原因尚无官方完整说明。9 月 17 日显示，前沿竞争正在从通用模型分数继续扩展到专业语料、研发自动化、Agent topology 与组织部署边界。
