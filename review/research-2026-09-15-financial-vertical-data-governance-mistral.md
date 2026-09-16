# 2026-09-15 增量研究包：金融垂直化、数据治理反作用、MCP 制度化与 Mistral 行业模型

> 检查窗口：以 2026-09-15 北京时间傍晚为基准，重点检查最近约 24 小时；同时补录上一轮窗口内漏掉、但达到入史门槛的 2026-09-14 AAIF / Linux Foundation MCPA 事件。
>
> 仓库基线：`main` 已推进到 9 月 15 日；9 月 10—14 日连续 research packages 已覆盖 DeepSeek V4.1 Flash、OpenAI Agents API、SWE-2、GPT-Live-1、ChatGPT for Financial Services、Anthropic safety / cyber 事故、Fugu、Rosalind、Runway 模型许可、Amp Free Agent、frontier pacing，以及 PR #37 中的 Claude Code 限额、Bolt Forge 与 Astra 生产委托。
>
> 本轮先检索 `编年/2026/09.md`、最近 research packages、`志/AI Agent 生态.md`、`志/Agent产品与商业化.md`、`纪传/世家/Mistral.md` 与相关表，未发现下列事件已有正式增量条目。

---

## 本轮结论

本轮没有确认 OpenAI、Anthropic、Google DeepMind、xAI、Meta、Mistral、DeepSeek、Qwen、Kimi、GLM、MiniMax 在窗口内正式发布新的主要 foundation-model SKU；不把旧模型的新行业页面、合作计划或未来模型承诺误写成“新模型发布”。

但有四项值得进入《大模型纪事》的新增史料：

1. **2026-09-14：Anthropic 正式发布 Claude for Financial Advisors。** 这不是新 foundation model，而是一个面向 RIA / 财富管理工作流的正式垂直产品：把 Claude、预配置 skills、MCP connectors、审计与人工审批接到 custodian、portfolio platform、CRM、planning / estate / meeting systems。它与 OpenAI 9 月 10 日的 ChatGPT for Financial Services 形成四天内的直接行业垂直竞争。
2. **2026-09-14：大型企业对前沿模型数据留存政策的反作用开始形成“实际采用限制”证据。** Reuters 转述 The Information 称 Palantir、NVIDIA、Booz Allen 因 Anthropic / OpenAI 的数据与 IP 风险分别要求更强 ZDR 保证、限制敏感任务或禁止某些专有网络安全用途。Anthropic 当前 Covered Models 的数据留存政策可由官方文档独立确认；企业具体限制仍属二手报道，不能升级为公司正式公告。
3. **2026-09-14（补漏）：AAIF / Linux Foundation 推出首个 MCP 官方认证 MCPA。** 认证本身不是协议版本更新，但标志 MCP 从“新协议”继续走向有正式技能体系、权限 / trust-boundary 知识要求和职业化训练的基础设施。AAIF 同时公开了罕见的 adoption telemetry：ChatGPT 用户 MCP tool calls 到 8 月达到 1 月的 98 倍、Resend 单月超过 100 万次 MCP 调用；这些数字是基金会披露，不是独立审计。
4. **2026-09-15：TotalEnergies 与 Mistral 宣布 >€100M、三年期 frontier-model 联合项目。** 目标是为油气 reservoir exploration / characterization / development 开发新一代 frontier AI models，并明确提及 agentic AI；这是 2025 年既有 TotalEnergies–Mistral 合作的显著扩展，而不是 9 月 15 日已有新模型可下载或投入生产。

共同历史线索：

> **前沿模型竞争正在迅速从模型 SKU 本身，扩展到行业工作流、数据治理契约、开放协议的职业制度，以及由行业巨头出资的专用模型共同研发。**

---

# 一、Claude for Financial Advisors：四天内形成金融垂直产品正面竞争

## 1. 准确日期与产品状态

**2026-09-14**，Anthropic 正式发布 **Claude for Financial Advisors**。

一手来源：

- Anthropic / Claude, “Claude for Financial Advisors”, 2026-09-14  
  https://claude.com/blog/claude-for-financial-advisors

独立来源：

- Reuters, “Anthropic targets financial advisers with new Claude tool”, 2026-09-14  
  https://www.reuters.com/business/anthropic-targets-financial-advisers-with-new-claude-tool-2026-09-14/

Anthropic 将其定义为：

- 面向 financial advisors 的 connectors；
- 围绕日常工作流预配置的 skills；
- 可在 Claude / Cowork 内安装的 advisor plugin；
- 面向 RIA 的正式可用产品，而不是概念 demo。

### 证据等级

| 结论 | 等级 | 说明 |
|---|---|---|
| 产品于 9 月 14 日正式发布 | **A** | Anthropic 官方页面直接确认 |
| connectors / skills / human approval 边界 | **A** | 官方产品说明 |
| 行业发布与竞品背景 | **B+** | Reuters 独立确认 |
| 首日行业 / 用户体验 | **C / 待积累** | 尚无广泛独立用户样本 |

## 2. 产品实际包含什么

Anthropic 官方列出的新增 / 组合型连接包括：

- Addepar；
- BlackRock Advisor Center；
- Charles Schwab；
- Envestnet / Tamarac / MoneyGuide；
- iCapital；
- Orion / Redtail CRM；
- SS&C Black Diamond；
- Wealthbox；
- Wealth.com；
- Vanguard；
- Zocks；

并可与已有 Microsoft 365、Salesforce、DocuSign、Box、FactSet、S&P Global、Morningstar 等 Claude connectors 配合。

预配置 skills 包括：

- advisor onboarding；
- alternatives brief；
- compliance / AI-policy review；
- estate and tax brief；
- portfolio rebalance review；
- post-meeting notes / follow-up；
- pre-meeting preparation；
- prospect intake。

因此产品竞争单位不再只是“Claude 能不能回答金融问题”，而是：

> **model + skills + MCP connectors + identity / permissions + auditability + human approval + industry distribution。**

## 3. 权限与 action boundary：不是“AI 自动替顾问交易”

Anthropic 明确写明，下列 regulated activities 仍须 **human review and approval**：

- investment recommendations；
- client communications；
- compliance determinations；
- 其他监管判断。

Claude 主要承担 gathering、summarization、analysis draft、client-communication draft 与 administrative action staging。

因此当前最准确的成熟度写法是：

> **正式产品 + 真实企业系统连接 + regulated workflow 的 human approval gates；不是 autonomous investment manager。**

## 4. “16,000+ RIAs”不能写成“16,000 家已采用”

Schwab 对外披露其 Advisor Services 服务 16,000+ independent RIAs，并把 Claude for Financial Advisors 带到该客户渠道。

这能证明：

- 产品获得一个规模很大的 distribution surface；
- 有 custodian-level integration；
- RIAs 可在既有身份与权限边界下连接数据。

但它**不能证明**：

- 16,000+ RIAs 已全部启用 Claude；
- 16,000+ RIAs 已付费；
- 16,000+ RIAs 已形成生产 workload；
- 已有量化 ROI。

因此史料应写“Schwab 的 16,000+ RIA 客户渠道成为分发入口”，而不是“Claude 已被 16,000 家 RIA 采用”。

## 5. 实际可用性与成熟度

Anthropic 官方称 advisor plugin **available today**。

面向 RIA，Anthropic 推荐 Enterprise plan，因为 Enterprise 提供可支持 recordkeeping 的 audit logs。已有 Enterprise license 的 firm 可在 Cowork plugin browser 中安装；新申请组织在 2026 年 9 月底前还有一次性 usage-credit 激励。

当前成熟度：

- `formal product launch`: **是**；
- `available now`: **是**；
- `partner connectors live`: **部分已可用，但各 partner 状态不同**；
- `large-scale production adoption`: **未证明**；
- `reliability / error rate`: **未公开**；
- `ROI`: **未独立证明**。

## 6. 与 OpenAI 最近 30 天竞争关系

仓库已记录 **2026-09-10 ChatGPT for Financial Services**。

仅四天后，Anthropic 进入相邻但不完全相同的人群：

- OpenAI 9/10：financial services，偏 investment banking / equity research / data & modeling；
- Anthropic 9/14：financial advisors / RIA，偏 wealth management / client context / custodian / CRM / planning / meeting workflow。

这不是完全同质 SKU，但已经足以形成同月垂直化竞争：

> **前沿厂商开始争夺“职业工作流入口”和行业数据系统，而不只是争模型 benchmark。**

## 7. 使用者 / 行业评价

首日材料中，厂商与合作伙伴评价高度正面，但必须标记为 partner testimony，而不是 independent ROI evidence。

它们可以证明：

- 多个行业平台愿意公开参与；
- 集成确实存在；
- 行业需求集中在 prep / paperwork / cross-system context，而不是直接把 regulated judgment 交给模型。

它们不能证明：

- 节省了多少工时；
- 错误率多低；
- 客户满意度提升多少；
- 收益是否覆盖模型成本。

首日社区样本还不足以形成 broad consensus。

### 建议写入位置

- `编年/2026/09.md`：9 月 14 日 Claude for Financial Advisors；
- `志/Agent产品与商业化.md`：regulated vertical agent / professional workflow；
- `志/AI Agent 生态.md`：MCP connector + permission-preserving data access；
- `表/Agent主流产品与商业化对照表.md`：新增金融垂直产品维度。

### 是否需要修订已有条目

应在 9 月 10 日 OpenAI Financial Services 条目旁增加 9 月 14 日 Anthropic 的相邻竞争关系，但不要把二者写成同一 target persona。

---

# 二、数据留存政策开始反向决定企业模型采用：Palantir / NVIDIA / Booz Allen 限制报道

## 1. 新事件

**2026-09-14**，Reuters 转述 The Information 的调查称，大型技术 / 政府承包企业已经因前沿模型的数据留存、知识产权与敏感工作负载风险，限制或重新考虑 Anthropic / OpenAI 模型使用。

来源：

- Reuters, “Palantir, Nvidia curb AI model use over data fears, The Information reports”, 2026-09-14  
  https://www.reuters.com/business/palantir-nvidia-curb-ai-model-use-over-data-fears-information-reports-2026-09-14/

Reuters 报道的具体情况包括：

- **Palantir**：据知情人士，要求 Anthropic 提供不可撤销的 zero-data-retention guarantees，才愿意进一步通过 Palantir 软件提供 Anthropic 模型；
- **NVIDIA**：据报道将 Anthropic 模型限制于相对不敏感的内部任务，并在部分内部工作依赖自己的 Nemotron；
- **Booz Allen Hamilton**：据报道禁止员工把 Anthropic commercial model 用于 proprietary cybersecurity work。

Reuters 同时明确写出：这些公司以及 Anthropic / OpenAI 当时均未立即回应置评。因此这些具体 enterprise restrictions 不能升格为公司正式公告。

### 证据等级

| 结论 | 等级 | 说明 |
|---|---|---|
| Palantir / NVIDIA / Booz Allen 的具体限制 | **B-** | Reuters 高质量二手；原始信息来自 The Information / 匿名知情人士，当事公司未正式确认 |
| Anthropic Covered Models 的留存政策存在 | **A** | Anthropic 官方帮助中心 |
| 留存政策已成为采购 / routing 争议变量 | **B+** | 有政策一手事实 + 高质量企业行为报道支撑 |

## 2. 官方政策基线

Anthropic 的官方帮助 / 隐私文档可以独立确认 Covered Models 的 retention / ZDR 边界：

- Claude Help Center, “Covered Models”  
  https://support.claude.com/en/articles/15425695-covered-models
- Claude Help Center, “Data retention practices for Covered Models”  
  https://support.claude.com/en/articles/15425996-data-retention-practices-for-covered-models
- Anthropic Privacy Center, “I have a zero data retention agreement with Anthropic. What products does it apply to?”  
  https://privacy.anthropic.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to

这里最重要的史料边界是：

> **retention for safety / abuse review ≠ model-training use。**

不能因为存在 30-day retention，就写成“Anthropic 会拿企业 prompts 训练模型”。

## 3. 为什么比普通“用户吐槽隐私”更强

这次材料的重要性在于：

> **privacy / retention 不再只是合同脚注，而开始实际改变模型 routing、敏感任务分配与采购决策。**

如果报道准确，模型竞争至少新增一个必须单列的变量：

- intelligence；
- price；
- latency；
- context；
- tool / agent capability；
- reliability；
- **retention / governance compatibility**。

NVIDIA 的 reported practice 还显示：组织可能采用“第三方前沿模型用于低敏感工作 + 自有模型用于高敏感 workload”的多模型治理策略。

Palantir 的 reported stance 则说明，采购方关心的不只是“当前是否 ZDR”，还包括政策承诺能否长期稳定、能否被未来撤回。

## 4. 不能推出什么

目前不能写：

- “Palantir 已全面禁用 Claude”；
- “NVIDIA 已停止使用 Anthropic”；
- “Booz Allen 全公司禁用 Claude”；
- “Anthropic 会拿企业 prompts 训练模型”；
- “30 天 retention 等于训练数据 retention”；
- “这些公司的 restriction 已经由各家公司正式确认”；
- “OpenAI 和 Anthropic 的 retention 政策相同”。

## 5. 历史意义

2025—2026 年早期，enterprise AI procurement 常被简化成：

> 模型够不够强、价格够不够低？

这批材料说明问题正在变成：

> **即使模型更强，组织是否愿意把最敏感的上下文交给它？**

Agent / tool-use 时代尤其放大这一变量，因为 Agent 接触的不只是一个 prompt，而可能包括 codebase、credentials / metadata、corporate docs、customer information、cyber findings、connectors 和 long-running state。

### 建议写入位置

- `编年/2026/09.md`：9 月 14 日企业采用反作用证据；
- `志/Agent产品与商业化.md`：enterprise adoption 不只由能力和价格决定；
- identity / permission / data-governance 相关专题：retention / ZDR；
- `志/Agent宣传、实测与可靠性.md`：把“功能存在”与“敏感生产 workload 可接受性”拆开。

### 是否需要修订已有条目

如果现有 Anthropic policy 条目把 retention 只当安全政策，应补上“enterprise adoption friction”这一后果；但在当事公司一手确认前，不要把 Reuters 二手报道写成无条件事实。

---

# 三、MCPA：MCP 从协议生态进入正式职业认证阶段（上一轮漏项补录）

## 1. 准确日期

**2026-09-14**，Agentic AI Foundation（AAIF）与 Linux Foundation 正式推出 **Model Context Protocol Associate (MCPA)**。

一手来源：

- Linux Foundation, “Agentic AI Foundation Launches MCPA Certification to Validate MCP Expertise”, 2026-09-14  
  https://www.linuxfoundation.org/press/agentic-ai-foundation-launches-mcpa-certification-to-validate-mcp-expertise
- Linux Foundation Training, MCPA certification  
  https://training.linuxfoundation.org/certification/model-context-protocol-associate-mcpa

Linux Foundation 明确称：

- 它是第一个 official MCP certification；
- 也是 AAIF 推出的第一个 certification；
- vendor-neutral；
- 已 live，可报名；
- 对齐 **MCP 2026-07-28** specification。

### 证据等级

- **A：认证推出、考试结构、对齐规范版本。** Linux Foundation / AAIF 一手。
- **A（披露事实）/ B（实际 adoption 规模）**：基金会披露的 SDK / tool-call usage numbers。数字来自治理组织汇总，未由本仓库独立访问底层 telemetry 重算。

## 2. 考试内容

Linux Foundation 公布五个 domain：

- MCP Fundamentals：16%；
- Architecture & Components：14%；
- Interactions & Execution：26%；
- Security & Governance：24%；
- Use Cases & Ecosystem：20%。

值得注意的是 **Security & Governance 接近四分之一**；考试明确覆盖 hosts / clients / servers / tools、message flow、trust boundaries、permissions、risk controls 与 production deployment use cases。

这意味着 MCP 的制度化并不是只认证“会不会接一个 tool”，而把权限和 trust boundary 明确变成职业知识的一部分。

## 3. 官方同时给出罕见 adoption telemetry

AAIF / Linux Foundation 在发布认证时披露：

- MCP Tier 1 SDKs 的月下载量接近 **5 亿**；
- TypeScript / Python SDK 下载规模已达到十亿级；
- 到 2026 年 8 月，ChatGPT 用户产生的 MCP tool calls 达到 1 月的 **98×**；
- 8 月较 7 月继续显著增长；
- Resend 曾在一个月超过 **100 万 MCP calls**。

AAIF 9 月 1 日还发布：

- AAIF, “MCP Usage Surged as the Protocol Went Stateless”, 2026-09-01  
  https://aaif.io/blog/mcp-usage-surged-as-the-protocol-went-stateless

并披露 Railway 的 daily MCP users 在 7—8 月明显增长。

这些数字历史价值很高，因为过去“大家都支持 MCP”常只有 connector list；这里更接近 provider-side usage telemetry。

但必须保留两个限制：

1. **download ≠ active user**；包管理器缓存、CI、版本安装都会放大下载数；
2. **tool call count ≠ successful business workflow / ROI**；一个用户请求可能触发很多 MCP calls。

不能把 98× tool calls 写成 98× MCP 用户，也不能写成 98× 生产价值。

## 4. 为什么认证本身值得进入协议史

技术标准成熟常经历：

> spec → SDK → vendor integration → deployment patterns → security doctrine → training / certification → procurement / job requirements。

MCPA 表明 MCP 已经进入靠后的制度化阶段之一。

它**不证明** MCP 已成为法律或 ISO/IETF 意义上的正式标准；AAIF / Linux Foundation 的 open-standard / ecosystem-standard 定位不能偷换成国家 / 国际标准组织的法定标准。

但它证明：

- MCP 已有稳定到足以围绕具体 spec 版本考试的知识边界；
- governance / permission 已成为规范学习内容；
- 生态组织化从代码维护延伸到职业训练。

## 5. 与 A2A / AAIF 的关系

AAIF 当前同时容纳 / 治理 MCP、A2A、AGENTS.md、goose、agentgateway、Agent Router 等项目。

因此 MCPA 也应作为 Agentic AI Foundation 组织史的一部分，而不只是 Anthropic 产品史。

它并不意味着：

- A2A 已被 MCP 取代；
- MCP 能完成全部 agent-to-agent delegation；
- MCPA 持证者天然等于具备生产安全能力。

### 建议写入位置

- `编年/2026/09.md`：9 月 14 日 MCPA；
- `志/AI Agent 生态.md`：MCP institutionalization；
- MCP / A2A 协议专题：认证与 usage telemetry；
- `表/Agent发展大事表.md`：MCP → AAIF → 2026-07-28 spec → MCPA；
- Agentic AI Foundation 组织史条目。

### 是否需要修订已有条目

如果仓库仍只用 connector 数量描述 MCP adoption，建议加入 tool-call / provider-side usage telemetry，但标记为 AAIF disclosure，而非 independent audit。

---

# 四、TotalEnergies × Mistral：>€100M 三年期行业 frontier-model 共研计划

## 1. 准确日期与事实

**2026-09-15**，TotalEnergies 与 Mistral 宣布一个为期 **3 年**、投资 **超过 €100 million** 的联合计划，目标是开发新一代 frontier AI models，支持 TotalEnergies geosciences experts 对油气 reservoir 的 exploration、characterization、development 与 existing-project optimization / life extension。

一手来源：

- TotalEnergies, “TotalEnergies Announces a Partnership with Mistral to Develop Frontier AI Models for Reservoir Exploration and Engineering”, 2026-09-15  
  https://totalenergies.com/newsroom/totalenergies-annonce-un-partenariat-avec-mistral-en-vue-de-developper-des-modeles-de-frontiere-dintelligence-artificielle-dedies-a-lexploration-et-a-lingenierie-des-reservoirs-498514

同期行业来源：

- Upstream, “TotalEnergies to invest in next-level AI models”, 2026-09-15  
  https://www.upstreamonline.com/exploration/totalenergies-to-invest-in-next-level-ai-models/2-1-2043551

TotalEnergies 还明确提到将利用最新 AI advances，**particularly agentic AI**，并建立联合 scientific laboratory。

### 证据等级

- **A：项目、金额下限、三年周期、目标领域、联合实验室。** TotalEnergies 官方。
- **B：行业媒体对项目定位的独立复述。** 可用于交叉确认发布，不用于证明未来结果。
- **无 production / ROI 等级。** 尚未公布完成模型、部署规模、准确率、发现率或财务收益。

## 2. 不是双方第一次合作

必须避免写成“9 月 15 日 TotalEnergies 首次与 Mistral 合作”。

双方 **2025-06-12** 就已宣布合作并建立 joint innovation lab，初始范围包括多能源、低碳能源、工业 performance 等。

旧一手来源：

- TotalEnergies, 2025-06-12  
  https://services.totalenergies.fr/actualites/collaboration-totalenergies-et-mistral-ai-pour-renforcer-utilisation-intelligence-artificielle

因此 2026-09-15 的准确历史表述是：

> **既有伙伴关系升级为一个金额公开、为期三年、明确针对 subsurface / reservoir frontier models 的专项共研计划。**

## 3. 不是“新 Mistral 模型已经发布”

官方措辞是 aimed at developing a new generation of frontier AI models。

现在已经存在的是：

- 合作 program；
- >€100M investment commitment；
- joint scientific lab；
- 明确 use case 与研发目标。

现在**不存在公开证据**证明：

- 某个具体新模型已经训练完成；
- 已有新的 downloadable / API model SKU；
- 已进入 TotalEnergies production；
- 已改善 exploration success rate；
- 已产生 ROI。

## 4. 与 Mistral 最近 30 天竞争格局的关系

仓库 9 月 8 日已记录 Mistral **€3B Series D、>€21B post-money valuation** 及其扩张训练 / 推理基础设施的资本背景。

9 月 15 日这笔项目说明融资后的竞争不只是继续训练更大的通用模型，而同时向：

- sovereign / European infrastructure；
- on-prem / controlled deployment；
- sector-specific frontier models；
- proprietary industrial data；
- joint scientific labs；

扩展。

对 Mistral 来说，这类客户不只是买 API token，还可能把自己的行业知识和 proprietary datasets 变成 model-development input。

因此更接近：

> **model vendor → industrial AI co-development partner。**

## 5. 为什么值得入史

行业 AI 采用可以粗略分为：

1. SaaS subscription；
2. enterprise API；
3. RAG / connector；
4. fine-tuning / private deployment；
5. **共同开发行业 frontier model**。

TotalEnergies–Mistral 这次公开的 >€100M / 3-year program 已达到第五层的明确合同 / 计划信号。

这不意味着项目一定成功，但说明一个大型传统工业企业已经愿意把“frontier model R&D”本身当成核心工程预算，而不只是软件采购费用。

## 6. 使用者 / 生产评价

目前没有可信的终端 geoscientist 使用评价，也没有可靠性 / ROI 结果。

行业媒体的“会提高勘探效率”等说法仍主要来自合作方目标描述，不能提前写成已经实现。

后续重点追踪：

- 是否公布具体 model family / architecture；
- 是否训练在 on-prem / sovereign compute；
- model weights / license 的控制权；
- 是否进入 reservoir simulation / seismic interpretation / drilling decision；
- 是否有 human approval / validation boundary；
- 是否公开 cycle-time / error-rate / cost-savings 指标；
- €100M 是 cash、compute + labor valuation，还是综合 program budget。

### 建议写入位置

- `编年/2026/09.md`：9 月 15 日；
- `纪传/世家/Mistral.md`：从通用模型公司到工业共研伙伴；
- `志/Agent产品与商业化.md` 或企业采用专题：co-development 模式；
- `表/大事年表.md`：>€100M 三年行业 frontier-model program；
- 与 9 月 8 日融资条目建立 cross-link。

### 是否需要修订已有条目

如果 Mistral / TotalEnergies 旧条目只记录 2025 年 joint innovation lab，应把 2026-09-15 视为范围和预算显著升级，而不是重复合作公告。

---

# 五、本轮未入库 / 不重复项

## 1. 没有新的主要 foundation-model SKU

本轮专门检索 OpenAI、Anthropic、Google DeepMind、xAI、Meta、Mistral、DeepSeek、Qwen、Kimi、GLM、MiniMax 的官方近期发布，没有确认窗口内出现新的主要 foundation-model SKU。

- GPT-6 Astra 是 9 月上旬既有发布 / 扩大可用，不是 9 月 15 日新模型；
- Claude Fable / Mythos 5.1 是 9 月 1 日；
- Gemini 3.8 Flash / Cyber 属 9 月上旬既有发布；
- DeepSeek V4.1 Flash 已在 9 月 10 日研究包记录；
- TotalEnergies–Mistral 的 “new generation of frontier AI models” 是未来研发目标，不是新 SKU。

## 2. OpenAI Astra enterprise 页面不重复

搜索结果中 OpenAI Astra enterprise business 页面被近期重新抓取，但其原始发布时间早于本窗口；Oracle Analytics / Power BI / Navan / Avalara enterprise plugins、Astra enterprise admin controls 等属于已经发生的 Astra enterprise rollout，不应因搜索引擎“today”标签再次计入 9 月 15 日。

## 3. 社区评价坚持低等级处理

- Claude for Financial Advisors 首日尚未形成足够规模的独立用户评价；
- TotalEnergies–Mistral 尚无实际终端使用者；
- MCPA usage telemetry 有组织级来源但无底层审计；
- 企业数据留存反作用虽然比论坛情绪更接近真实采购行为，但具体公司限制仍来自二手报道，因此证据等级不超过 B-，除非当事公司随后自行确认。

---

# 六、建议写入编年时的压缩版

> **9 月 14—15 日：模型竞争继续向“行业入口 + 数据治理 + 协议制度 + 共研模型”扩张。** Anthropic 9 月 14 日推出 Claude for Financial Advisors，把 Claude、workflow skills 和 MCP connectors 接入 Schwab、Addepar、Orion 等财富管理系统，并把投资建议、客户通信和合规判断明确留在人类审批边界；这与 OpenAI 四天前推出的 ChatGPT for Financial Services 构成金融垂直化竞争。与此同时，Reuters 转述调查显示 Palantir、NVIDIA、Booz Allen 等企业正因数据留存与 IP 风险限制部分前沿模型工作负载，表明 retention policy 已开始反向决定 enterprise routing。AAIF / Linux Foundation 同日推出首个 MCP 官方认证 MCPA，并披露 ChatGPT 的 MCP tool calls 到 8 月已达 1 月的 98 倍；MCP 由协议兼容层进一步进入职业化制度阶段。9 月 15 日，TotalEnergies 与 Mistral 又宣布 >€100M、三年期专项，计划共同开发面向油气 reservoir exploration / engineering 的新一代 frontier models；这是研发计划与资本承诺，不是已经发布的新模型。

共同方向可压缩为：

> **模型本体仍重要，但“谁能进入行业系统、在什么权限与数据契约下运行、用什么开放协议连接、以及谁愿意共同出资训练专用模型”正在成为同等重要的竞争轴。**
