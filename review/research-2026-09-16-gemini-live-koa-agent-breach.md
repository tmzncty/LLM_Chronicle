# 2026-09-16 增量研究包：Gemini 3.8 Live、Koa、首起 AI Agent 数据泄露通报与分发/算力扩张

> 检查窗口：以 2026-09-16 北京时间傍晚为基准，重点检查最近约 24 小时；对窗口内由高质量独立报道首次确认、但一手材料发布日期略早的事件作补录。
>
> 仓库基线：`main` 当前 HEAD 已合并 PR #37（`a0169ba`），9 月 15 日研究包已经覆盖 Claude for Financial Advisors、企业数据留存政策反作用、MCP Associate 认证、TotalEnergies × Mistral 行业模型合作。本文在写入前检索最近 research packages、`编年/2026/09.md`、相关志/表，并检索 `Gemini 3.8 Live`、`Koa`、`AEPD`、`Mistral Small 4 Firefox`、`Factory raises $200M`，未发现以下事件已有正式增量研究条目。

---

## 本轮结论

本轮确认两组需要按“新模型出现就记录”的低门槛规则入库的新模型/新型号，并确认四项达到一般入史门槛的 Agent、商业化或基础设施事件：

1. **2026-09-15：Google 正式发布 Gemini 3.8 Live 与 Gemini 3.8 Live Extended Thinking。** 两款均已进入 Gemini API / AI Studio；Live 主打规模与成本，Extended Thinking 主打复杂、多步推理。两者把“持续语音对话 + 后台工具调用 + 视觉上下文 + 实时推理”进一步合成到一个原生 speech-to-speech 模型端点。
2. **2026-09-15：Salesforce 与 NVIDIA 发布 Koa，Salesforce 首个 CRM reasoning model。** Koa 基于 NVIDIA Nemotron 3 Super 后训练，Salesforce 控制权重和推理环境；已内部使用并进入少量客户 pilot，GA 预计 2026 年冬季。它是正式发布的新模型，但还不是普遍可用的新基础模型。
3. **2026-09-14 / 15：西班牙 AEPD 公布其收到的首份“由 AI Agent 执行攻击”的个人数据泄露通知。** 这是监管机构收到并公开讨论的真实世界 breach notification，不是实验室 benchmark；但事实仍来自受影响组织的通报并处于监管审查中，不能写成 AEPD 已完成调查并独立证明“完全自主攻击”。
4. **2026-09-16：Mistral × Mozilla 宣布 Firefox Smart Window beta 采用 Mistral 模型，并要求 zero data retention。** 这是模型分发渠道与数据契约的节点：竞争从“哪个模型更强”继续扩展为“谁能进入浏览器默认/内置 AI surface”。
5. **2026-09-15：企业 coding-agent 公司 Factory 融资 $200M，估值 $5B。** 估值相对 2026 年 4 月的 $1.5B 超过三倍；官方同时披露大量企业使用，但规模与 ROI 数据仍主要是厂商自报。
6. **2026-09-16：Reuters 报道 Anthropic 签署其首个澳大利亚数据中心租约。** 报道称租约覆盖一个规划总容量 2.16GW 的园区、计划 2027 年起上线，且用途主要为 inference 而非 training；Anthropic 与开发商拒绝置评，项目仍需澳大利亚 FIRB 批准，因此证据等级低于正式公司公告。

共同历史线索：

> **模型竞争正在同时向两个方向扩张：一边是“原生实时 Agent 界面”（voice + vision + reasoning + tools），另一边是“行业/分发/运行环境控制权”（CRM 专用模型、浏览器入口、企业 coding runtime、推理数据中心）。与此同时，AI Agent 已开始进入监管机构真实数据泄露通报，而不再只存在于红队或 cyber benchmark。**

---

# 一、Gemini 3.8 Live / Extended Thinking：实时语音 Agent 进入“边说边推理、边调用工具”阶段

## 1. 准确日期与可用状态

**2026-09-15**，Google 正式发布：

- `gemini-3.8-live`
- `gemini-3.8-live-extended-thinking`

一手来源：

- Google, “Introducing Gemini 3.8 Live and 3.8 Live Extended Thinking”, 2026-09-15  
  https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-8-live-gemini-3-8-live-extended-thinking/
- Google, “Build real-time voice applications with Gemini 3.8 Live and 3.5 Transcribe”, 2026-09-15  
  https://blog.google/innovation-and-ai/technology/developers-tools/build-real-time-voice-applications-gemini-audio/
- Gemini API deprecations / lifecycle table（记录 release date）  
  https://ai.google.dev/gemini-api/docs/deprecations

Google 的 API lifecycle 表明确把两个 model string 的 release date 都列为 **September 15, 2026**，因此不是“先在产品中灰度、后来才命名”的模糊事件。

### 当前可用面

Google 官方说明：

- Gemini API / Live API：可用；
- Google AI Studio：可用；
- Gemini Enterprise：private preview；
- Search Live：Gemini 3.8 Live 已进入面向用户的 surface；
- Extended Thinking 也在 Gemini / Workspace 的部分付费 surface 推进。

因此成熟度应写：

> **正式发布 + 开发者 API 可用 + 多个 Google 产品 surface 上线/滚动上线；不是只存在于 demo。**

## 2. 两个型号不是简单“快/慢”复制

### Gemini 3.8 Live

Google 定位：

- scale / cost efficiency；
- native speech-to-speech；
- near-real-time visual context；
- 97+ languages；
- asynchronous function calling；
- 对话继续进行时后台执行 API / tool calls。

### Gemini 3.8 Live Extended Thinking

Google 定位：

- high-complexity tasks；
- multi-step reasoning；
- configurable thinking；
- reasoning 与 speaking 可同时进行；
- 后台任务推进时可在主语音对话中持续给出 progress narration。

历史上更值得记录的是 interaction contract：

> **“工具调用 / 多步推理”不再必然冻结实时对话；模型可以在持续 audio stream 中承认请求、继续交互，同时让后台 action 向前推进。**

这比“语音模型 WER 更低”更接近 Agent 界面的结构变化。

## 3. 定价

Google 开发者文章给出的估算价：

- audio input：**$0.005 / minute**；
- audio output：**$0.018 / minute**。

官方脚注说明其估算基于：

- $3 / 1M input tokens；
- $12 / 1M output tokens。

应避免把“分钟估算价”与最终复杂 Agent session 的总成本混为一谈：后台工具、外部 API、其他模态与长推理都可能引入额外成本。

## 4. 独立 benchmark：Extended Thinking 综合第一，但不是每个维度都第一

独立来源：

- Artificial Analysis, Speech-to-Speech Models and Providers Analysis  
  https://artificialanalysis.ai/speech-to-speech

当前榜单显示：

| 模型 | Speech-to-Speech Index | Speech reasoning | Conversational dynamics | Agentic performance | Arena Elo | Task success | TTFA |
|---|---:|---:|---:|---:|---:|---:|---:|
| Gemini 3.8 Live Extended Thinking (High) | **82.6** | 98% | 91.9% | **68.6%** | 990 | 89.1% | 1.35s |
| Gemini 3.8 Live | 76.0 | 92% | **96.1%** | 30.1% | **1083** | **93.2%** | 1.18s |

这组数据恰好说明不能写成“Extended Thinking 全面最强”：

- Extended Thinking 在 Artificial Analysis 综合 Speech-to-Speech Index 上处于第一梯队并拿到 82.6；
- 但普通 3.8 Live 的 preference / Arena Elo 和 task-success 反而更高；
- 其他厂商仍在 reasoning、conversational dynamics、TTFA 等单项领先。

因此正确结论是：

> **Google 在实时 speech-to-speech 的复杂推理与 Agent task completion 上进入/占据前沿，但不同型号的“深思考”与“自然对话偏好”存在明确 trade-off。**

### 证据等级

| 结论 | 等级 | 说明 |
|---|---|---|
| 两个模型 9/15 正式发布并进入 API | **A** | Google 官方 + lifecycle 表 |
| 能力、价格、支持语言、async function calling | **A** | Google 官方 |
| Artificial Analysis 当前独立成绩 | **B+** | 第三方可公开核验 benchmark；仍受 harness / trial 数量影响 |
| “全面领先所有 voice agent” | **不成立** | 单项、偏好、任务成功率存在反例 |

## 5. 首日使用者评价：兴趣强，但 rollout 体验不一致

社区样本（C 级史料）：

- r/GeminiAI 官方发布讨论中，用户普遍把 Live 更新和 tool calling 视作期待已久的升级；
- 同一讨论中也有 Plus / Workspace 付费用户称仍停留在 3.6、尚未看到 3.8；
- 部分用户最关心的是 free / paid entitlement，而不是 benchmark 本身。

示例：

https://www.reddit.com/r/GeminiAI/comments/1whbwor/introducing_gemini_38_live_and_38_live_extended/

这些材料足以记录：

- launch-day 需求与关注度高；
- 实际产品 rollout 并非所有账户瞬间一致；

但不能推出：

- 3.8 Live 已经稳定覆盖所有付费用户；
- 首日社区已经形成对 hallucination / long-session reliability 的共识；
- benchmark 优势已等价为电话客服等生产场景的 SLA 优势。

## 6. 最近 30 天竞争关系

直接竞争对象包括：

- OpenAI GPT-Live-1 / Astra voice stack；
- xAI Grok Voice；
- 其他实时 audio / speech agent model。

9 月 10 日仓库刚记录 GPT-Live-1 API；五天后 Google 用两个 3.8 Live SKU 回应，并把“实时音频前端 + reasoning + async tools”合成到同一模型产品线。

建议月度比较不要只排一个总分，而至少并列：

- 语音自然度 / turn taking；
- reasoning；
- agentic task completion；
- latency；
- tool calling；
- pricing；
- product entitlement / rollout；
- long-session reliability。

### 建议写入位置

- `编年/2026/09.md`：9 月 15 日两个新 model SKU；
- `纪传/世家/Gemini.md`：Gemini 实时语音分支；
- `志/AI Agent 生态.md`：voice-agent + async tool execution；
- `表/主流模型综合对照表.md`：补充 Live / Extended Thinking；
- 月度模型竞争对照：与 GPT-Live-1 / Grok Voice 并列。

---

# 二、Salesforce Koa：开放权重基础模型被企业软件厂商“后训练后收回到自己的 trust boundary”

## 1. 准确日期与模型状态

**2026-09-15**，Salesforce 与 NVIDIA 正式宣布 **Koa**：Salesforce 的首个 CRM reasoning model，用于 Agentforce。

一手来源：

- Salesforce, “Announcing Koa: Salesforce’s First CRM Reasoning Model, Built on NVIDIA Nemotron”, 2026-09-15  
  https://www.salesforce.com/news/press-releases/2026/09/15/koa-reasoning-model/
- NVIDIA, Dreamforce 2026 coverage  
  https://blogs.nvidia.com/blog/jensen-huang-dreamforce/

独立报道：

- TechCrunch, “Salesforce and Nvidia’s new reasoning model is everything the AI labs should fear”, 2026-09-15  
  https://techcrunch.com/2026/09/15/salesforce-and-nvidias-new-reasoning-model-is-everything-the-ai-labs-should-fear/

Koa 的来源链：

- base：**NVIDIA Nemotron 3 Super**；
- Salesforce 进行 post-training；
- 数据：Salesforce 称为 proprietary synthetic dataset，模拟近 27 年 CRM 业务知识；
- 覆盖 14+ industries；
- SFT + GRPO；
- 使用 NVIDIA NeMo RL / NeMo Gym / NeMo AutoModel。

## 2. 可用性要精确写：正式发布 ≠ 普遍 GA

Salesforce 官方状态：

- 已在 Salesforce 内部使用，包括 Slack employee agent；
- 已向 select pilot customers 开放；
- pilot 名单包括 Formula 1、UChicago Medicine、Baxter Credit Union、1-800Accountant、Engine、Xero 等；
- **general availability expected winter 2026 in U.S. regions**。

因此：

> **Koa 是已正式发布、已经真实运行且进入客户 pilot 的新模型，但不是 9 月 15 日已经面向所有 Agentforce 客户 GA。**

## 3. 权重与数据边界

这一事件的结构意义大于单项 benchmark：

- 基础模型 Nemotron 属于开放权重路线；
- Salesforce 后训练后控制 Koa 权重；
- Salesforce 称训练和 inference 都在自己的 trust boundary 内；
- 官方称 Koa 训练未使用 customer data；
- 推理时 customer data 不跨 Salesforce trust boundary。

于是出现一种越来越重要的企业模型路径：

> **open-weight base → SaaS 厂商用行业 synthetic / proprietary knowledge 后训练 → 厂商持有衍生权重 → 在自己的平台内作为受控专业模型提供。**

这既不是“直接调用 frontier API”，也不是“把一个开放模型原样部署”。

## 4. benchmark 证据边界

Salesforce 称 Koa 在自建 **CRM Bench** 上对 CRM actions 匹配或超过 leading models，并有 “3x fewer errors”。

当前证据等级只能是：

- benchmark 确实存在：**A（厂商事实）**；
- Salesforce 的结果：**A（厂商自报结果）**；
- Koa 独立优于通用 frontier models：**未证明**。

原因：

- benchmark 与模型都来自 Salesforce 生态；
- 尚无广泛第三方复现；
- domain-specific synthetic post-training 天然会提高相同 domain benchmark 表现；
- 尚无大规模生产 error-rate telemetry。

## 5. 使用者评价与生产成熟度

目前公开材料主要是 Salesforce / pilot partner testimonials。

它们可以证明：

- partner / pilot 关系真实存在；
- Koa 已进入实际业务 workflow 试点；

但不能证明：

- partner 已大规模 rollout；
- 错误率在真实企业生产环境达到“3x fewer”同样水平；
- 有独立 ROI；
- Koa 在通用 coding、research、knowledge 等任务上达到 frontier model 水平。

### 证据等级

| 结论 | 等级 |
|---|---|
| Koa 9/15 正式发布 | **A** |
| base / post-training / trust boundary / pilot | **A** |
| CRM Bench 厂商成绩 | **A-（厂商 benchmark）** |
| 独立性能领先 | **待证** |
| 大规模生产 ROI | **待证** |

### 建议写入位置

- `编年/2026/09.md`：9 月 15 日 Koa；
- `志/AI Agent 生态.md`：domain model powering agents；
- `志/开源与开放权重生态`：open-weight base → closed/controlled derivative 的产业路线；
- `表/主流模型综合对照表.md`：可列为 domain-specific model，不与通用 foundation model 简单同榜；
- `志/Agent产品与商业化.md`：Agentforce 自有模型栈。

---

# 三、AEPD：首份“AI Agent 执行攻击”的个人数据泄露通知进入监管记录

## 1. 日期需要拆成“一手披露日”和“独立报道日”

AEPD 官方 blog 页面标注 **2026-09-14**：

- AEPD, “Primera notificación de una brecha de datos personales causada por un ataque ejecutado mediante un agente de IA”  
  https://www.aepd.es/prensa-y-comunicacion/blog/primera-notiviacion-brecha-datos-personales-causada-por-ataque-ejecutado-mediante-agente-ia

**2026-09-15 20:25 UTC**，Reuters 对事件作独立报道：

- Reuters, “Spanish data watchdog publicises first AI agent-linked data breach report”, 2026-09-15  
  https://www.reuters.com/business/spanish-data-watchdog-publicises-first-ai-agent-linked-data-breach-report-2026-09-15/

因此建议编年日期使用 **2026-09-14（AEPD 一手披露）**，并注“9 月 15 日 Reuters 独立报道后进入国际视野”，不要把新闻发布日期当成事件发生日。

## 2. AEPD 实际确认到了哪一步

AEPD 表示其收到首份 personal-data breach notification，其中：

- incident **would have been executed** through an AI agent；
- Agent 使用一个“known / widely known” language model；
- 按受影响组织提交的 notification，Agent：
  - 搜索 vulnerability；
  - 成功 login；
  - 自主查找应用弱点；
  - 修改 personal data；
  - 查看 invoices / billing records。

Reuters 明确补充：

- 信息来自 affected organization 的通知；
- **仍在 AEPD 审查中**；
- AEPD 没有公开模型名，也没有公开受害组织名；
- 使用某模型不意味着模型自身或 provider infrastructure 被攻破；
- 也不意味着该模型被开发用于恶意用途。

## 3. 为什么是历史节点

仓库此前已经记录：

- cyber benchmark；
- frontier model red-team；
- Agent 越权 / test-environment 事件；
- Anthropic 对真实滥用流量的 threat intelligence；
- RubyGems 等 Agent side-effect 事件。

AEPD 这次不同在于：

> **它进入了现实个人数据保护监管制度的 breach-notification 流程。**

也就是说，“Agent 能否串联 reconnaissance → access → vulnerability exploitation → data modification / access”不再只是一张 capability benchmark 表，而开始以受监管 incident 的形式出现。

## 4. 不能写成什么

绝对不能写：

- “AEPD 已证明这是全球首个 autonomous AI hack”；
- “AI 独立攻击已经成为普遍趋势”；
- “某个已知模型被攻破”；
- “模型厂商应为本案负责”；
- “完全没有人类介入”。

更准确的史料表达：

> **AEPD 收到并公开其首份个人数据泄露通知，其中受影响组织称攻击由使用已知 LLM 的 AI Agent 在有限人工干预下串联多个攻击阶段；监管审查尚未完成。**

AEPD 自己也强调：单个 case 不足以建立 trend。

### 证据等级

| 结论 | 等级 | 说明 |
|---|---|---|
| AEPD 收到该类首份 breach notification | **A** | 监管机构官方 |
| 受影响组织报告的攻击路径 | **A-/B+** | AEPD 转述受监管通知，但尚在审查 |
| Reuters 对监管状态与边界的独立确认 | **B+** | 高质量独立报道 |
| 完全自主、已独立法证验证 | **未证明** | 调查未完 |

### 建议写入位置

- `编年/2026/09.md`：9 月 14 日监管节点；
- `志/AI Agent 生态.md`：real-world autonomous action / security boundary；
- `志/安全与治理.md`：从 capability eval 到 breach reporting；
- 若仓库有事故表：新增“监管通报 / 调查中”状态，而不要和已证实 root-cause incident 混列。

---

# 四、Mistral × Mozilla：浏览器成为模型分发入口，ZDR 成为 partnership contract

## 1. 事件

**2026-09-16**，Mistral 与 Mozilla 联合宣布合作，把 Mistral 模型带入 Firefox Smart Window beta。

一手来源：

- Mistral, “Mistral and Mozilla are bringing open, private and multilingual AI to your web browser”, 2026-09-16  
  https://mistral.ai/news/mistral-x-mozilla/
- Mozilla, “Mozilla and Mistral: Partnering to expand AI competition and preserve user choice”, 2026-09-16  
  https://blog.mozilla.org/en/firefox/mozilla-mistral-partnership/

独立来源：

- Wall Street Journal, “Mistral Aims to Grow AI Consumer Base Through Mozilla Partnership”, 2026-09-16。

## 2. rollout 状态需要保守处理

Mistral 官方写：

- Firefox Smart Window beta “is now powered by Mistral models”；
- France 与 North America 为首批市场；
- UK / Germany 预计稍后跟进。

Mozilla 官方写得更具体：

- **Mistral Small 4 is coming to Firefox Smart Window beta**；
- 成为美国、加拿大 Smart Window 用户的新模型；
- 同时向法国扩展 beta access 与法语支持。

两边措辞存在 rollout 颗粒度差异，因此历史条目宜写：

> **9 月 16 日合作正式宣布并启动/推进分地区 rollout；不要推断全球 Firefox 已全部切换。**

## 3. 数据政策

Mistral 官方明确写：

- Smart Window conversations 默认不保存在 Mozilla servers；
- partners such as Mistral **agree to zero data retention**。

这值得与 9 月 14 日仓库已记录的“企业因 retention / ZDR 改变模型 routing”的事件放在一起：

> **数据留存条件已经从后台法律条款，变成模型能否进入大型分发渠道的显式商业契约。**

## 4. 历史意义：分发权开始和 benchmark 同等重要

Mozilla 自己把变化概括为：竞争正从“which AI model is best”转向“which models people can access, through which products”。

这是很好的同时代行动者自述。

浏览器本身拥有：

- 默认入口；
- tab / browsing context；
- 用户身份与长期使用频率；
- 搜索 / 浏览行为的高价值上下文。

因此 Mistral 获得的不是一个普通 API reseller，而是消费级 browser surface。

同时应注意：

- Mozilla 仍强调 user choice；
- Firefox 其他 AI surface 仍可存在多 provider；
- 不能写成“Mistral 成为 Firefox 唯一 AI”。

### 证据等级

| 结论 | 等级 |
|---|---|
| 合作与 Smart Window rollout | **A**（双方官方） |
| ZDR 条款 | **A**（官方） |
| 具体市场 rollout 全量完成 | **未证明** |
| 消费者 adoption / retention / ROI | **待积累** |

### 建议写入位置

- `编年/2026/09.md`：9 月 16 日；
- `纪传/世家/Mistral.md`：consumer distribution；
- `志/Agent产品与商业化.md`：browser distribution surface；
- `志/数据治理`：ZDR 作为 distribution contract；
- 月度比较：把“默认/内置分发渠道”作为模型竞争维度。

---

# 五、Factory：$200M 融资、$5B 估值，enterprise coding agents 资本化继续加速

## 1. 事件

**2026-09-15**，Factory 宣布融资 **$200M**，估值 **$5B**，总融资额超过 $400M。

一手来源：

- Factory, “Factory raises $200M at $5B valuation”, 2026-09-15  
  https://factory.com/news/5-billion-valuation

独立来源：

- Reuters, “AI coding agent startup Factory triples valuation to $5 billion in latest funding round”, 2026-09-15  
  https://www.reuters.com/business/ai-coding-agent-startup-factory-triples-valuation-5-billion-latest-funding-round-2026-09-15/

Reuters 独立确认：

- 本轮 $200M；
- 估值 $5B；
- 2026 年 4 月上一轮估值约 $1.5B；
- 因此五个月内估值超过三倍。

## 2. 为什么值得入史

这不是单纯 VC 新闻。

Factory 的产品定位已经从单个 coding agent 向：

- enterprise software factory；
- model routing；
- cloud / on-prem / air-gapped；
- agent effectiveness / governance；
- 跨 SDLC 的长期自治系统

扩展。

融资规模说明资本市场正在为“模型之上的企业 Agent runtime / governance layer”赋予独立高估值，而不是假定价值全部归 frontier model lab。

## 3. adoption 与 ROI 证据要降级

Factory 官方称：

- “hundreds of thousands of developers”；
- Nvidia、Blackstone、RBC、Palo Alto Networks、Adobe、T-Mobile 等企业使用/建设 software factories；
- Factory Router 可降低 60%+ token spend while maintaining frontier performance。

这些应分别标记：

- named customer relationships：**A-/B+（官方具名，可验证关系，但不等于每家大规模生产）**；
- hundreds of thousands developers：**B-/C+（厂商 telemetry，未独立审计）**；
- 60% token savings：**C+ / vendor claim**；
- enterprise ROI：**尚无独立财务证据**。

Reuters 的独立确认主要落在融资、估值和市场背景，而不是完整的 workload telemetry。

### 建议写入位置

- `编年/2026/09.md`：9 月 15 日融资；
- `志/Agent产品与商业化.md`：coding agent → software factory；
- `表/主要融资与估值.md`：Factory $5B；
- `表/Agent主流产品与商业化对照表.md`：部署边界 / model routing / air-gap 等维度。

---

# 六、Anthropic 澳大利亚数据中心租约：推理算力开始以 GW 级地域基础设施预占

## 1. 事件与证据等级

**2026-09-16 03:49 UTC**，Reuters 报道：Anthropic 已签署其首个澳大利亚 data-centre lease agreement。

来源：

- Reuters, “Anthropic signs first Australia data centre agreement”, 2026-09-16  
  https://www.reuters.com/world/asia-pacific/anthropic-signs-first-australia-data-centre-agreement-2026-09-16/

Reuters 的核心事实来自两名知情人士，并明确写：

- Anthropic 与 Zerra DC **declined to comment**；
- lease 覆盖的 proposed campus 规划总容量 **2.16GW**；
- 距 Brisbane 约 250km；
- 计划 2027 年开始上线；
- 项目仍需 Foreign Investment Review Board approval。

因此这项事件整体证据等级应为 **B / B-**，不能与公司正式公告同级。

## 2. 不要把 2.16GW 偷换成“Anthropic 已购买 2.16GW 算力”

Reuters 的准确表述是：

> lease covers a data centre campus with planned capacity totalling 2.16 gigawatts。

这不能自动推出：

- Anthropic 最终独占全部 2.16GW；
- 2.16GW 已建成；
- 2.16GW 已并网；
- Anthropic 已为全部容量支付 / take-or-pay；
- 2027 会一次性全部上线。

正确写法是：

> **报道称租约覆盖一个规划总容量 2.16GW 的拟建园区。**

## 3. “inference 而非 training”同样是 source-reported

Reuters 一名知情人士称：

- facility 将用于 inference；
- not training。

这很有历史意义，因为它说明高功率数据中心竞赛已经不再能简单等同于“训练下一代 frontier model”。随着 Agent 和大规模 serving 增长，**inference 本身可以成为 GW 级规划对象**。

但这一用途划分仍不是 Anthropic 官方确认，应标 B-。

## 4. 最近 30 天产业关系

仓库 9 月已经连续记录：

- OpenAI / Firmus 马来西亚 dedicated compute；
- Amazon × Qualcomm inference silicon / networking；
- Mistral 融资与算力扩张；
- 多个行业模型与 Agent workload。

澳大利亚事件继续强化同一趋势：

> **前沿竞争不仅是训练集群规模，也越来越是长期推理容量、电力、土地、冷却和地区监管适配。**

### 建议写入位置

- `编年/2026/09.md`：9 月 16 日，标“Reuters sources / 待官方确认”；
- `志/AI基础设施与芯片.md`：inference capacity；
- `志/算力变迁.md`：GW-scale serving；
- 不进入“已投产算力”表，直到获得建设 / 并网 /实际运行证据。

---

# 七、本轮模型竞争与社区评价摘要

## 1. 新模型清单

| 日期 | 模型 | 类型 | 发布状态 | 独立评价状态 |
|---|---|---|---|---|
| 2026-09-15 | Gemini 3.8 Live | native speech-to-speech / Agent | API 已可用 | Artificial Analysis 已有公开测评 |
| 2026-09-15 | Gemini 3.8 Live Extended Thinking | reasoning speech-to-speech / Agent | API 已可用 | Artificial Analysis 综合指标前沿 |
| 2026-09-15 | Salesforce Koa | CRM domain reasoning model | 正式发布；内部使用 + select pilots | 暂无广泛独立性能复现 |

本轮没有确认 OpenAI、Anthropic、xAI、Meta、Mistral、DeepSeek、Qwen、Kimi、GLM、MiniMax 在检查窗口内另有新的主要通用 foundation-model SKU 正式发布。

不要把：

- Grok 4.7 的预告；
- 未来模型训练计划；
- 模型 partnership；
- model access / distribution change

误写成“新模型发布”。

## 2. 9 月竞争结构的新增维度

到本轮，单纯的“benchmark 排名”已经不能描述竞争：

1. **model capability**：reasoning / coding / multimodal；
2. **real-time interface**：native audio、visual grounding、interruptibility；
3. **Agent execution**：async tools、background tasks、multi-step state；
4. **domain specialization**：CRM / finance / science；
5. **distribution**：browser、enterprise suite、voice surface；
6. **data contract**：ZDR / retention / trust boundary；
7. **runtime control**：cloud / on-prem / air-gap；
8. **inference capacity**：长期电力与区域数据中心；
9. **capital**：Agent runtime 独立获得高估值。

---

# 八、建议正文落点与修订清单

## 编年

建议在 `编年/2026/09.md` 增补：

- **09-14**：AEPD 首份 AI-Agent-linked personal-data breach notification（注明 under review）；
- **09-15**：Gemini 3.8 Live / Extended Thinking；
- **09-15**：Salesforce Koa；
- **09-15**：Factory $200M / $5B；
- **09-16**：Mistral × Mozilla Firefox Smart Window；
- **09-16**：Anthropic Australia data-centre lease（B 级、待官方确认）。

## 志

建议增补：

- `志/AI Agent 生态.md`：voice + async tools；现实 breach notification；
- `志/Agent产品与商业化.md`：Factory、Firefox distribution；
- `志/AI基础设施与芯片.md` / `志/算力变迁.md`：Anthropic Australia；
- 数据治理相关专题：Mistral × Mozilla ZDR。

## 表

建议增补：

- 模型表：Gemini 3.8 Live 两型号、Koa（标 domain-specific）；
- Agent 商业化表：Factory 最新估值；
- 事故 / 风险表：AEPD breach notification，状态必须是 `reported / regulator review ongoing`；
- 基础设施表：Anthropic Australia 仅列 `reported/planned`, 不列 `operational`。

## 纪传

- `纪传/世家/Gemini.md`：实时 voice-agent 分支；
- `纪传/世家/Mistral.md`：浏览器消费级 distribution；
- Salesforce 若已有组织/平台条目，可把 Koa 作为“应用软件厂商自建行业模型”的转折。

---

# 九、证据总表

| 事件 | 一手 | 独立 | 当前等级 | 最大不确定性 |
|---|---|---|---|---|
| Gemini 3.8 Live / Extended Thinking | Google | Artificial Analysis + 社区 | **A / B+** | 长会话与真实生产 reliability |
| Salesforce Koa | Salesforce + NVIDIA | TechCrunch / 行业媒体 | **A / B** | 独立 benchmark 与大规模生产表现 |
| AEPD AI-Agent breach notification | AEPD | Reuters | **A / B+** | regulator investigation 未完成 |
| Mistral × Mozilla | Mistral + Mozilla | WSJ | **A** | 分地区 rollout 与真实 adoption |
| Factory $200M / $5B | Factory | Reuters | **A / B+** | adoption / ROI 仍主要厂商自报 |
| Anthropic Australia lease | 无公开公司确认 | Reuters sources | **B / B-** | 审批、最终容量、实际投产、用途 |

---

# 十、明确不能由本轮证据推出的结论

1. 不能说 Gemini 3.8 Live Extended Thinking 在所有 voice benchmark 与用户偏好上都第一。
2. 不能说 Gemini 3.8 Live 已经覆盖全部付费 / Workspace 用户；首日存在 rollout 差异报告。
3. 不能把 Salesforce 自建 CRM Bench 结果写成 Koa 已被第三方证明全面优于通用 frontier model。
4. 不能把 Koa 写成 9 月 15 日已 GA；它是 select pilots，GA 预计 winter 2026。
5. 不能把 AEPD case 写成调查完成、模型厂商有责任或“全球首个被法证证明的完全自主 AI 黑客”。
6. 不能把 Mistral × Mozilla 写成 Firefox 全局唯一 AI provider 或全球所有用户已经切换。
7. 不能把 Factory 的客户名单 / developer count / token savings 直接写成独立 ROI 证据。
8. 不能把 Anthropic 的 2.16GW 租约报道写成“2.16GW 已建成并全部由 Anthropic 独占使用”。

---

## 后续追踪

下一轮应重点观察：

- Gemini 3.8 Live 的真实长通话、tool-call recovery、噪声 / interruption、数字/姓名确认等第三方测评；
- Koa customer pilots 在 10 月是否公开可靠性 / error-rate / workflow 数据；
- AEPD 是否完成调查、是否披露模型、攻击者与 breach 范围；
- Firefox Smart Window 的实际默认模型、地区 rollout 与用户反馈；
- Factory 是否出现可独立核验的企业 ROI / production telemetry；
- Anthropic Australia 项目是否得到公司或 Zerra 正式确认、FIRB 是否批准，以及 2.16GW 的建设与分期容量。