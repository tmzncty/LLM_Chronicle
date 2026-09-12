# 2026-09-11 增量研究包：Agents API、GPT-Live-1 API、SWE-2 与企业 Agent 产品化

> 检查窗口：约 2026-09-10 09:24 UTC 至 2026-09-11 09:24 UTC。  
> 仓库基线：`main` 已合并 PR #32（DeepSeek V4.1 Flash、OpenAI 监管立场、Anthropic cyber-eval 事故与 ChatGPT Voice 配额变化）。本轮先检索 `编年/2026/09.md`、`志/AI Agent 生态.md`、`志/AI产品化演进.md`、`表/Agent发展大事表.md` 与最新 research package；仓库已有 2025 年 Responses API / Agents SDK、2026 年 Managed Agents、HydraFusion、ChatGPT Voice 等前史，但尚未记录 **OpenAI Agents API、GPT-Live-1 API、Cognition SWE-2、ChatGPT Work Data agent、ChatGPT for Financial Services**。

## 本轮结论

本轮至少有 **3 项必须记录的新模型 / Agent 平台事件 + 2 项值得留档的企业产品化事件**：

1. **2026-09-10：OpenAI 发布 Agents API public beta。** 它把 Codex 背后的 harness、长会话 context management、sandbox、MCP/tool calling 与 multi-agent orchestration 作为托管 API 提供给所有开发者。这里应记录为“public beta 已存在”，不能因为 OpenAI 使用 `production-ready` 措辞就写成其可靠性已被普遍生产验证。
2. **2026-09-10：GPT-Live-1 正式进入 API。** 模型本身在 7 月已经首先进入 ChatGPT Voice；9 月 10 日的历史节点是开发者 API 可用、每分钟前端语音层定价以及与 backend reasoning/tool agent 解耦的架构。
3. **2026-09-10：Cognition 发布 SWE-2。** 这是明确的新 coding model，已在 Devin Desktop / CLI 可用。厂商自测显示它在部分 coding benchmarks 接近 frontier 模型且成本更低，但同一发布中 Terminal-Bench 4 明显弱于 Fable 5.1 / GPT-6 Astra；目前没有足够独立复现实验证明总体能力排名。
4. **2026-09-10：OpenAI 在 ChatGPT Work 上线 Data agent。** 它把企业数据库、semantic layer、BI dashboard 和 approved actions 放进同一 Agent 产品面；OpenAI 同时披露较深的内部使用和若干 named alpha customers，但这些 adoption / ROI 仍主要来自厂商材料。
5. **2026-09-10：OpenAI 上线 ChatGPT for Financial Services。** 产品把 GPT-6 Astra、内置付费金融数据、MCP / entitlement integration、企业权限与 audit workflow 打包为面向监管行业的专用产品。Morgan Stanley 与 Evercore 是 design partners，这不等于已经形成大规模生产 ROI。

这五项放在同一天，形成一个比“又发布几个 AI 功能”更重要的结构：

> **模型竞争正在向“模型 + harness + durable session + sandbox + data entitlement + vertical workflow + voice front end”扩展。**

---

# 事件一：OpenAI Agents API——Codex harness 变成托管 Agent runtime

## 准确日期

**2026-09-10。** OpenAI 官方发布页当天上线，并明确写为 **public beta**。

主编年建议写：

> **2026-09-10 — OpenAI 发布 Agents API public beta，将 Codex 的托管 harness、长会话 context management、sandbox、tool/MCP 与 multi-agent orchestration 开放给开发者。**

## 已经存在的功能

官方文档/发布页明确展示：

- `beta.agents.sessions.create` 的 session API；
- 模型、tools、vault、environment 在一个 agent session 中配置；
- OpenAI 托管并维护 harness；
- compute environment 可选择 OpenAI-hosted sandbox、自有基础设施或合作方 sandbox；
- OpenAI hosted sandbox 可运行代码、读写文件并产出 artifacts；
- 长 session 接近 context limit 时自动 compact earlier context；
- tool search、programmatic parallel tool calling；
- MCP、custom functions、web search 等工具；
- multi-agent：主 Agent 可并行派生 subagents，每个 subagent 有独立 context；
- harness 基于公开的 Codex harness 代码；
- public beta 对所有开发者开放；
- **Agents API 本身不额外收取固定费用，开发者支付 token 与 tool 使用费用。**

来源：

- OpenAI, “Introducing the Agents API”, 2026-09-10.  
  https://openai.com/index/introducing-the-agents-api/

## 与仓库既有 Agent 基础设施史的关系

仓库已经记录：

- 2025-03：Responses API / Agents SDK 把 tool、handoff、guardrail 等做成平台 primitives；
- 2026-05：Anthropic Managed Agents / Dreaming 开始把 persistent agent memory 作为托管能力；
- 2026-08：阿里云 Managed Agents 把 session runtime 明确按小时计费；
- 2026-09：GitHub HydraFusion 把多模型 router / evaluator / workflow policy 做成 coding-agent runtime。

Agents API 与 2025 Responses API 的差别不是“多一个 API 名称”，而是责任边界改变：

> **2025：开发者拿到 Agent primitives，自行搭 runtime。**  
> **2026-09：OpenAI 开始直接托管 Codex harness、session/context 与可选 sandbox，把 durable execution 变成平台产品。**

同时它与阿里云 8 月 Managed Agents 的商业计量形成鲜明对照：

- 阿里云明确把 runtime 按小时收费；
- OpenAI 宣布 Agents API 不收独立 API fee，主要按 token / tools 收费；
- 但 developer 自选 sandbox / compute 的费用仍可能来自 OpenAI 或第三方 provider，因此不能把“no additional Agents API fee”写成“Agent runtime 没有基础设施成本”。

## 生产采用：已经比 demo 深，但证据仍需分层

OpenAI 发布页给出多个具名客户案例：

- Ciridae 称 eval score 0.71 → 0.85、subagent workflow latency 下降 4×；
- SafetyKit 称 case review cost per case 下降 60%；
- Hypha 称拆分 harness 与 sandbox 后 failed agent responses 下降 86%；
- Nash 称其已有数千个长期 Agent 管理数亿次物流 delivery，并把 Agents API 用作 durable session / orchestration layer。

这些信息足以证明：

> **Agents API 发布时并不只有官方 hello-world；存在实际 customer testing，且至少有客户宣称用于 continuous production workflow。**

但来源仍然是 **OpenAI 发布页中的客户 testimonial**，没有独立审计原始 telemetry、成本账单或第三方 uptime/reliability 数据。因此建议分级：

| 结论 | 证据等级 |
|---|---|
| Agents API public beta 已开放给全部开发者 | **A**：OpenAI 官方产品页/开发者文档 |
| session/context/sandbox/MCP/multi-agent 功能确实存在 | **A-**：公开 API 示例与文档 |
| 若干公司已经测试/部署 Agents API | **B+**：具名客户公开 testimonial |
| 60% cost reduction / 86% failure reduction 等数字可普遍复现 | **C+ / B-**：客户自报，未独立复核 |
| Agents API 已达到行业普遍 production reliability | **不能推出** |

## “production-ready”不能直接照抄

OpenAI 发布页写“create a production-ready agent in a single API call”，但同一页面又明确产品处于 **public beta**，并称会继续根据反馈迭代到 GA。

因此历史表述应拆开：

> **产品确实存在并已 public beta；厂商主张可用于 production；部分具名客户自报 production use；但 GA、跨客户重复可靠性和长期 uptime 尚未被证明。**

## 社区首日反应

首日 Reddit / 开发者讨论量还不够形成“社区共识”，但已经出现几个稳定问题：

- sandbox 边界究竟如何配置；
- secrets / credentials 怎样与 harness 分离；
- 长 session 的日志、可观察性、kill / cancel 语义；
- context compaction 后的信息保真；
- 第三方 sandbox 与 OpenAI-hosted sandbox 的信任边界；
- token + tool + sandbox 的 **total cost per task**，而不仅是“API 无额外费”。

这些材料当前只应作为 **C 级首日使用者问题意识**，不能当作 bug 已证实。

社区样本：

- Reddit / r/artificial, “OpenAI launches Agents API public beta built on Codex harness”, 2026-09-10.  
  https://www.reddit.com/r/artificial/comments/1wctpbu/openai_launches_agents_api_public_beta_built_on/

## 为什么具有历史意义

Agent 产品的核心商品已经从：

> **模型调用**

进一步移动到：

> **session + state + context compaction + tool routing + sandbox + subagents + recovery + observability。**

这正是 durable runtime 成为独立基础设施层的证据。

### 建议写入

- `编年/2026/09.md`：核心节点；
- `志/AI Agent 生态.md`：新增“托管 harness / durable runtime”段；
- `志/AI产品化演进.md`：从 Agent SDK → managed runtime；
- `表/Agent发展大事表.md`：新增 2026-09-10 Agents API；
- OpenAI 本纪：作为 Codex / Work 能力向开发者平台外溢的节点。

---

# 事件二：GPT-Live-1 进入 API——voice model 变成可组合的 Agent 前端

## 日期边界

这里必须区分两次事件：

- **2026-07-08**：GPT-Live 首次发布并开始进入 ChatGPT Voice；
- **2026-09-10**：**GPT-Live-1 正式在 API 中可用。**

因此 9 月 10 日不是“GPT-Live-1 第一次存在”，而是：

> **一个已经服务 ChatGPT 用户的 full-duplex voice model 进入开发者 API。**

## 核心事实

OpenAI 官方发布：

- full-duplex：可同时听与说；
- voice layer 可与 backend reasoning model / tool harness 解耦；
- 可在对话持续过程中把深层 reasoning / actions 委托给 GPT-6 Astra 或其他 backend；
- 扩展 voices / accent / dialect / language 选项；
- 支持 telephony 类场景；
- **API 价格为 $0.05/minute，仅指 front-end voice layer；backend model 与 tools 另算。**

来源：

- OpenAI, “Build more natural voice experiences with GPT-Live-1 in the API”, 2026-09-10.  
  https://openai.com/index/introducing-gpt-live-1-in-the-api/
- OpenAI, “Introducing GPT-Live”, 2026-07-08.  
  https://openai.com/index/introducing-gpt-live/

## Benchmark / reliability 边界

OpenAI 报告：

- 在 Full Duplex Bench 相对 GPT-Realtime-2.1 提升约 30 points；
- paired with Astra medium 时在 Tau3 声称排名第一；
- Speak early eval 报告 interruption 显著下降。

目前这些仍主要属于：

> **厂商/合作客户 benchmark 与 early evaluation。**

没有足够独立、长时间、多语言、多噪声环境复现实验来证明：

- 所有语言都同样自然；
- 长通话上下文不会漂移；
- telephony 生产错误率已经稳定；
- 每分钟 $0.05 的 front-end 价格意味着整条 Agent 通话便宜。

## 使用者评价

OpenAI Developer Community 的首日讨论总体正面，最明显的反应是“终于开放 API”和对 full-duplex voice agent 的兴趣；也有人立即询问与旧 Realtime 模型的实际差异及完整成本。

- OpenAI Developer Community, 2026-09-10.  
  https://community.openai.com/t/openai-releases-gpt-live-1-in-the-api/1396459

当前只能记为 **C 级首日开发者反馈**。

## 历史意义

voice agent 的架构正在从：

> ASR → text model → TTS 的固定 pipeline

转向：

> **持续 full-duplex conversational layer + 可更换 backend intelligence / tool runtime。**

这使“声音”越来越像 Agent 的 front-end runtime，而不只是一个附加模态。

### 建议写入

- `编年/2026/09.md`：新模型/API availability 简洁节点；
- `志/音频AI.md`：从 voice model 到 Agent voice layer；
- `表/Agent发展大事表.md`：如表中已包含语音 Agent，可以加入 GPT-Live-1 API。

---

# 事件三：Cognition SWE-2——coding model 的竞争从“谁最强”变成 cost-performance frontier

## 准确日期与可用性

**2026-09-10。** Cognition 官方发布 SWE-2。

发布当日：

- Devin Desktop：可用；
- Devin CLI：可用；
- Devin Web / Fusion：rolling out；
- 不是公开权重 release；
- 当前也不是一个独立公开 API，而是主要存在于 Devin harness 中。

来源：

- Cognition, “Introducing SWE-2: Pushing the Pareto Frontier”, 2026-09-10.  
  https://cognition.com/blog/swe-2

## 技术路线

Cognition 明确披露：

- SWE-2 由 **Kimi K3（2.8T parameters）post-train** 得到；
- Cognition 第一次把其 RL recipe 扩展到 multi-trillion-parameter regime；
- 同一轮 RL 同时训练不同 reasoning effort levels；
- 目标不是只最大化 success，而是把 cost 纳入优化，使整个 cost-performance Pareto frontier 前移。

这本身值得进入模型竞争史：

> **一个 coding-agent 公司不再只调用外部 frontier API，而是在大型开放/可获得 base model 上训练自己的专用 coding model，并把它和自有 Agent harness 一体化。**

## 厂商 benchmark：强项与弱项必须同时写

Cognition 报告：

- FrontierCode 1.1 Main：**50.0%**；
- 声称距 Fable 5.1 不到 1 point，成本低约 64%；
- DeepSWE 1.1：73.0%；
- Terminal-Bench 2.1：92.8%；
- SWE-2 medium 相比 SWE-1.7 平均 turns 少 58%、平均 cost 少 81%。

但是同一发布的 **Terminal-Bench 4** 结果明显不同：

- SWE-2：**27.3%**；
- Fable 5.1：**55.8%**；
- GPT-6 Astra：**57.9%**。

因此不能把 headline 改写成：

> “SWE-2 已经全面达到 Fable 5.1 / Astra 水平。”

更准确的是：

> **在 Cognition 的部分 harness / benchmark 上，SWE-2 已进入 frontier coding model 的邻近区间，并显示很强的成本优势；但跨 benchmark 表现差异非常大。**

独立评论也特别指出 FrontierCode 由 Cognition 自己构建、运行与评分，复现依赖 Devin harness，因此 benchmark 需要外部复核。

- The Clarity / The Engineer, 2026-09-10.  
  https://theclarity.today/story/cognition-ships-swe-2-a-cheaper-coding-model-for-devin-997deca0

## 社区评价

首日公开讨论量仍有限。Hacker News 聚合页只有少量评论，外部开发者最常问的不是“榜单第一了吗”，而是：

- 是否会开放 API；
- 能否脱离 Devin harness 独立运行；
- DeepSWE / FrontierCode 是否能由第三方复现；
- 真实 repo 上的 cost-per-accepted-PR 是否与厂商 benchmark 一致。

当前应标：**C：首日开发者关注点；尚无稳定社区共识。**

- HN.today mirror, 2026-09-10.  
  https://hn.today/s/cognition-launches-new-swe-2-model-rivaling-fable-5-1-and-gpt-astra

## 30 天模型竞争位置

9 月模型竞争已经不再是统一排行榜：

- DeepSeek V4.1 Flash：强调低价、throughput、Agent loop；
- OpenAI GPT-6 Astra：继续占据高端 reasoning / agent / cyber 位置；
- Anthropic Fable 5.1：coding / general agent 的高端参照；
- Cognition SWE-2：试图把**专用 coding model + Agent harness + 成本控制**做成另一条 Pareto curve。

SWE-2 因此不应只放在“Devin 更新”里，而应该进入模型谱系。

### 证据等级

| 结论 | 等级 |
|---|---|
| SWE-2 已正式发布并可在 Devin Desktop / CLI 使用 | **A** |
| 以 Kimi K3 为 base、使用 Cognition RL recipe | **A** |
| Cognition 公布的 benchmark 数字 | **A（对厂商披露本身）** |
| 这些数字代表独立、可重复的跨 harness 能力排名 | **C+ / 未证实** |
| 已证明 production reliability / ROI | **不能推出** |

### 建议写入

- `编年/2026/09.md`：新模型节点；
- coding-agent / 模型竞争相关志；
- 如有模型发布表，新增 SWE-2；
- Cognition / Devin 谱系：从 Agent 产品公司转向自训大规模 coding model。

---

# 事件四：ChatGPT Work Data agent——企业数据访问、语义层与 action 合流

**2026-09-10** — OpenAI 上线 ChatGPT Work 的 **Data agent**。

它能够连接：

- Amazon Redshift；
- Datadog；
- BigQuery；
- ClickHouse；
- Databricks；
- MongoDB；
- Snowflake；
- Google Drive / SharePoint；
- dbt、Snowflake Horizon、Databricks Genie Ontology 等 semantic/context sources；
- Omni、Oracle BI、Power BI、Sigma、Tableau、ThoughtSpot 等 dashboard / BI surfaces。

产品不只是生成 SQL：它可以调查指标变化、构建 interactive dashboard、继续 follow-up，并在权限允许时把结果带到 connected tools 中执行 approved actions。

来源：

- OpenAI, “Now everyone can put data to work”, 2026-09-10.  
  https://openai.com/index/put-data-to-work/

## adoption 证据

OpenAI 公开称：

- 公司内部 nearly all product team；
- over two-thirds GTM organization；

已经使用 data agents 分析公司数据。

发布材料还列出 NTT Data、Thermo Fisher、ServiceTitan、Zipline 等 alpha / early customer 经验。

因此它已经超过纯 demo，但证据结构仍是：

> **公司内部 telemetry + 厂商选择披露的客户案例。**

不能直接写成行业普遍 ROI。

## 历史意义

Enterprise Agent 的“工具调用”正在从连接几十个 SaaS API，向更难的一层推进：

> **理解组织自己的 semantic layer、metric definitions、row/column permissions，然后在可信数据上持续调查。**

这会让 data governance 本身成为 Agent runtime 的一部分。

### 建议写入

- `编年/2026/09.md`：可作为 OpenAI 9 月 10 日企业 Agent 产品化组节点；
- `志/AI产品化演进.md`：Agent 从 SaaS tool → enterprise semantic/data layer；
- adoption / commercialisation 相关志。

---

# 事件五：ChatGPT for Financial Services——Agent / 模型开始按监管行业封装

## 准确日期

**2026-09-10。** OpenAI 上线 ChatGPT for Financial Services；Reuters 同日独立报道。

来源：

- OpenAI, “Introducing ChatGPT for Financial Services”, 2026-09-10.  
  https://openai.com/index/introducing-chatgpt-financial-services/
- OpenAI, “Financial Services Terms”, published 2026-09-10.  
  https://openai.com/policies/financial-services-terms/
- Reuters, “OpenAI launches ChatGPT for financial services industry”, 2026-09-10.  
  https://www.reuters.com/business/openai-launches-chatgpt-financial-services-industry-2026-09-10/

## 已存在的产品结构

- GPT-6 Astra；
- built-in data：Daloopa、PitchBook、LSEG News、Crunchbase 等；
- 自有 subscription / entitlement 可接 FactSet、S&P Global、Preqin、Datasite 等；
- OpenAI 自己 index / host 部分 premium datasets，以提供 retrieval / citation；
- firm template 可生成 financial models、research notes、pitchbooks；
- SAML SSO、SCIM、RBAC；
- business data 默认不用于模型训练；
- encryption / retention；
- Compliance Platform log export；
- financial partner data 另受专门条款限制。

产品条款同时明确：

> **Financial Services 提供研究/分析信息与工具，不构成投资建议；数据和输出可能错误、延迟或过时。**

这是政策/责任边界的一部分，不能只记功能不记限制。

## adoption 边界

Morgan Stanley 与 Evercore 是 **design partners**，这证明产品开发有真实金融机构参与，但不等于：

- 两家已经全员生产部署；
- 银行工作被自动化到某个比例；
- 已经产生可审计 ROI；
- regulator 已认可由 Agent 独立做投资判断。

Reuters 的独立报道确认产品与 design partnership 的存在，但同样没有提供 ROI 审计。

## 历史意义

ChatGPT Work 正从“一套通用企业 AI”向：

> **行业数据 license + entitlement + model post-training + workflow templates + compliance controls**

的 vertical product 发展。

这意味着模型厂商开始承担过去由 Bloomberg Terminal、金融数据商、BI、企业 IAM、document automation 分散承担的一部分整合工作。

### 建议写入

- `编年/2026/09.md`：企业产品化节点；
- `志/AI产品化演进.md`：verticalized regulated-industry AI；
- OpenAI 本纪；
- 如果以后建立“数据许可 / enterprise data”专题，可与 LSEG、PitchBook 等 entitlement 结构相连。

---

# 本轮共同判断：9 月 10 日不是一个模型发布日，而是“Agent stack 商品化日”

把本轮事件并排：

| 层 | 事件 | 商品化对象 |
|---|---|---|
| Model | SWE-2 | 专用 coding intelligence + cost frontier |
| Voice model | GPT-Live-1 API | full-duplex conversational front end |
| Harness/runtime | Agents API | durable session、context、subagent、tool、sandbox |
| Enterprise data | Data agent | semantic layer、dashboard、approved action |
| Vertical product | Financial Services | data entitlement、模板、合规、金融 workflow |

这组事件说明 2026 年的竞争已经不能只画“模型分数榜”。

更准确的竞争单位正在变成：

> **model × runtime × data × tools × permissions × vertical workflow × pricing。**

## 当前仍不能推出

- OpenAI Agents API 已经比自建 Agent runtime 更可靠；
- public beta 已达到 GA 的长期 SLA；
- customer testimonial 中的 cost / latency / failure 改进可跨客户复现；
- GPT-Live-1 在所有语言、噪声和长通话里都优于旧 voice stack；
- SWE-2 全面达到 Fable 5.1 / Astra 的 coding 能力；
- Data agent 已减少企业数据团队编制或产生可审计 ROI；
- ChatGPT for Financial Services 已经被大银行大规模 production adoption；
- vertical ChatGPT 能替代专业金融判断或受监管的投资建议。

## 建议后续修订

1. `编年/2026/09.md`：正式写 Agents API、GPT-Live-1 API、SWE-2；Data / Financial Services 可合成 9 月 10 日 OpenAI 企业产品化段落。
2. `志/AI Agent 生态.md`：把 durable runtime 从概念提升为明确的平台层。
3. `志/AI产品化演进.md`：增加“通用 Agent → 企业语义层 → 监管行业 vertical”链条。
4. `表/Agent发展大事表.md`：加入 Agents API；必要时加入 Data agent。
5. 月末模型竞争整理：把 SWE-2 与 GPT-6 Astra、Fable 5.1、Grok 4.6、DeepSeek V4.1 Flash 放进不同 harness / cost 的横向表，避免只按单一 benchmark 排名。