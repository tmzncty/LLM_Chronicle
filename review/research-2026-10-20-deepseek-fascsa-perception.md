# 2026-10-20 研究包：DeepSeek FASCSA 排除令公开与 Microsoft Agent 动态安全控制

> 本包检查 2026-10-19 至 2026-10-20 的新增公开材料，并先核对 `main` 最近提交与相关研究包。`main` 最新提交已包含 10 月 18 日 Anthropic Public Benefit Fund、10 月 17 日 DeepSeek V4.1-Flash-1017 与 10 月 15 日 Muse Spark Open；仓库代码搜索未发现本包两项事件已有条目。本轮没有把旧事件因新闻再次报道而重复计入。

## 1. 美国 DHS 公开 DeepSeek FASCSA 排除与移除令：模型依赖进入联邦供应链禁用范围

**准确日期必须拆成两层：2026-07-24（命令原始签发/生效）；2026-10-19（Federal Register public inspection 公开）；2026-10-20（正式刊登）。**

### 事件与核心事实

美国国土安全部（DHS）公开 **Exclusion and Removal Order #2026-01**。命令依据 2018 年 Federal Acquisition Supply Chain Security Act（FASCSA）及其实施规则，在 Federal Acquisition Security Council 建议后签发。

命令适用于联邦文职行政部门机构（Federal Civilian Executive Branch Agencies），但排除其 national security systems 与 sensitive compartmented information systems。它要求：

1. 从联邦文职机构采购中排除 Hangzhou DeepSeek Artificial Intelligence 及其关联实体开发的信息技术产品与服务；
2. 从机构 IT 中移除 DeepSeek/关联实体产品；
3. **移除范围进一步覆盖“third-party products and services developed using DeepSeek implementations”。**

命令文本写明 exclusion 与 removal 在 7 月 24 日签发后即生效（或申请 exception），而不是到 10 月 19/20 日公开时才生效。因此编年不能把 10 月报道日期误写成政策首次实施日期。

### 一手证据

- U.S. Federal Register / DHS，Doc. 2026-21447，Docket DHS-2026-0628，public inspection 2026-10-19，formal publication 2026-10-20；附件为 **Exclusion and Removal Order #2026-01**，标注 `Original Release Date: July 24, 2026`：
  https://public-inspection.federalregister.gov/2026-21447.pdf

命令给出的风险理由包括：中国境内服务器和相关数据流风险、对美国个人/政府实体形成 actionable intelligence 的可能性，以及软件/模型供应链中的恶意代码或漏洞风险。这里应表述为 **DHS 的风险认定/政策依据**，而不是仓库自行证明 DeepSeek 模型含有恶意代码。

### 独立证据

- Reuters，2026-10-19：确认 DHS 要求联邦文职机构移除 DeepSeek，并禁止未来采购；报道将其置于美国对中国技术安全审查扩大的背景中。
  https://www.reuters.com/technology/us-banning-chinese-ai-deepseek-government-agency-it-systems-2026-10-19/
- Wall Street Journal，2026-10-19：独立确认 removal + procurement exclusion，以及第三方 DeepSeek 实现也进入范围。

### 证据等级

- **A：** 命令文本、法律依据、适用机构、7 月 24 日原始签发日期、10 月 19 日公开检查、10 月 20 日正式刊登、exclusion/removal 与 third-party implementation 条款；
- **A-/B+：** Reuters/WSJ 对政策范围与产业背景的独立确认；
- **B-/待观察：** 各机构实际 inventory、移除完成度、例外批准数量、对联邦承包商和云模型路由的具体执行口径；
- **不可推出：** 美国全面禁止私人使用 DeepSeek；DeepSeek 权重本身已被证明含恶意代码；所有使用 DeepSeek 做过开发的第三方软件都必然落入同一执行口径。

### 与最近 30 天模型/产品竞争格局的关系

这项政策发生在 DeepSeek 继续发布低价/开放权重模型与 10 月 17 日 V4.1-Flash-1017 更新的同时。它显示模型竞争已经出现明显的 **市场可用性与政府可采购性分叉**：一个模型可以在商业市场继续可下载/部署，同时在特定政府供应链中被按 provenance 排除。

尤其值得长期追踪的是 third-party clause。AI 采购合规对象不再只是“哪个聊天应用/哪个 API”，而可能扩展到：

`model provenance × derivative/implementation dependency × hosting location × data flow × vendor attestation × procurement eligibility`

这会提高面向政府销售的 Agent、SaaS、模型路由器与软件供应商记录底层模型来源的压力。

### 社区/独立评价及分歧

首日讨论的主要分歧集中在 third-party language 到底如何落地：命令文本本身范围较宽，但目前没有公开的完整产品清单，也没有足够执行案例说明“developed using DeepSeek implementations”在 fine-tune、蒸馏、build-time use、可替换 inference backend 等不同情形中的边界。因此应保存争议本身，而不是提前给出统一法律解释。

### 历史意义 / 为什么值得留档

这是把 **foundation-model provenance 直接转化为联邦供应链 exclusion/removal 条件** 的明确政策节点。其历史意义不只是“政府设备禁用某个聊天应用”，而是第三方产品中的模型依赖也成为采购治理对象。

### 建议写入

- `编年/2026/07.md`：7 月 24 日命令签发并生效；
- `编年/2026/10.md`：10 月 19 日公开、10 月 20 日 Federal Register 正式刊登，并 cross-reference 7 月条目；
- DeepSeek 公司/模型纪传：新增美国联邦文职采购与部署限制；
- 政策治理表：`jurisdiction × scope × direct vendor × affiliate × third-party implementation × issue date × public date × exception process × enforcement evidence`；
- Agent/供应链志：增加 model provenance / model bill-of-materials 维度。

### 是否需要修订已有条目

建议给 10 月 17 日 DeepSeek V4.1-Flash-1017 条目增加 cross-reference，明确“商业/API availability”与“美国联邦文职采购 eligibility”是两套不同维度，不能互相覆盖。

### 不能推出

- 不能把 10 月 19/20 日当成命令首次生效日期；
- 不能把联邦文职机构范围扩写成全美国或全部政府系统；
- 不能把 DHS 的风险判断写成已经独立证实的技术事实；
- 不能在缺乏执行案例时确定所有第三方/衍生模型的法律边界；
- 不能由此推出 DeepSeek 商业 API、开放权重或私人部署在美国被普遍禁止。

---

## 2. Microsoft 扩展 Project Perception：Agent 风险开始动态改变权限与 containment

**准确日期：2026-10-19（Microsoft 官方公告）。**

### 事件与核心事实

Microsoft Security 宣布扩展 **Project Perception**，把此前主要面向 AI-driven cyber defense 的系统进一步用于企业内部的 **agentic insider** 治理，并与 **Microsoft Agent 365** 共享 signals、context 和统一 agent registry。

官方提出的核心原则是：**不要让模型成为自己的安全授权者**。模型之外的确定性控制负责决定 Agent 能访问什么、可以采取什么行动，以及是否继续运行。

新/扩展能力包括：

- 跨 identity、data、cloud、endpoint、network、runtime 等来源持续观察 Agent；
- **Dynamic Agent Risk**：随行为与上下文变化重新计算 Agent 风险；
- 根据风险动态调整权限/访问与 containment，而不是只在 Agent 创建时做一次静态授权；
- 新的 **Playbooks** 与 **Guardian Agents**：人类定义 policy、approval boundary 与 delegation rules，Playbook 定义安全目标，Guardian Agents 执行调查、建议或应用 containment，并将经验反馈到 policy；
- 保留 traceability，让安全人员能够回看风险如何出现、为何采取响应。

Microsoft 官方材料明确把它描述为“surround non-deterministic intelligence with deterministic controls, independent evidence, and containment boundaries”。

### 一手证据

- Microsoft Security Blog，2026-10-19，*Agents are your newest insiders. Security must move at their speed.*：
  https://www.microsoft.com/en-us/security/blog/2026/10/19/agents-are-your-newest-insiders-security-must-move-at-their-speed/
- Microsoft Official Blog，2026-10-19，*Securing the agentic insider*：
  https://blogs.microsoft.com/blog/2026/10/19/securing-the-agentic-insider/
- Microsoft Learn 的 Project Perception 文档此前标注该产品处于 **Limited Public Preview**，因此不能把今天的架构公告自动写成所有 Microsoft 365 客户均已 GA。

### 独立证据

- Indian Express，2026-10-20：独立报道 Project Perception 扩展、Dynamic Agent Risk / permissions / conditional access 与 Guardian/green-agent 方向。

### 证据等级

- **A：** Microsoft 已正式宣布 agentic-insider 扩展、动态风险/控制原则、Guardian Agents/Playbooks、与 Agent 365 的 registry/signals 联动；
- **A-/B+：** 产品文档可确认 Project Perception 已有可访问 preview surface，而不是纯研究概念；
- **B-/待观察：** 新增能力对不同客户的具体 rollout 状态、许可层级、延迟、误报率、自动 containment 的可靠性；
- **不可推出：** Microsoft 已证明可以可靠阻止 rogue agent；Guardian Agents 在无人监督下可安全处理所有高后果响应。

### 与最近 30 天 Agent 治理主线的关系

10 月 11 日 Nadella 已公开提出把模型视为潜在 insider risk，并强调 emergency brake 与模型外部的安全边界；10 月 19 日这套原则开始进一步落到产品化控制环：

`agent registry → identity → telemetry/context → dynamic risk → dynamic permission → containment → trace/audit → policy update`

这比一次性 sandbox permission 更接近持续治理。尤其当 Agent 数量从个位数增长到成千上万、运行时间从分钟延长到小时/天时，静态 ACL 与逐次人工确认都很难独立承担安全边界。

### 社区/独立评价及分歧

目前外部材料主要在复述架构与潜在用途，尚没有足够生产数据形成对误报、漏报、权限震荡、自动 containment 副作用或 Guardian-Agent 自身 failure mode 的共识。官方也没有公开足够指标证明“dynamic risk”相对静态权限在真实企业环境中降低了多少事故率。

另一个值得保存的争议点是 Microsoft 提出未来希望获得更深入的 model transparency（包括 reasoning/chain-of-thought 层面的信号）以改善意图判断；这属于安全架构主张，不等于当前产品已经能可靠读取并解释模型“真实意图”，也不应把 chain-of-thought 当成可靠 ground truth。

### 历史意义 / 为什么值得留档

这是 Agent 安全从“创建时授权/沙箱”向 **continuous adaptive authorization** 演化的明确产品节点。模型能力越强、Agent 生命周期越长，权限本身开始变成随风险实时变化的状态，而不是固定配置。

### 建议写入

- `编年/2026/10.md`：10 月 19 日 Project Perception agentic-insider 扩展；
- Microsoft / Agent 治理纪传：承接 10 月 11 日 Nadella insider-risk 主张；
- Agent 安全表：新增 `registry × identity × telemetry × dynamic risk × dynamic permission × containment × human approval × audit/provenance`；
- durable Agent 志：与 10 月 14 日万级长程 Agent 的 scale / supervision 问题交叉引用。

### 是否需要修订已有条目

建议给 10 月 11 日 Nadella insider-risk 条目增加 cross-reference：当时主要是治理原则与 emergency-brake 主张；10 月 19 日 Microsoft 给出了更具体的企业 Agent 连续监控与动态权限产品路径。两者不应合并成“10 月 11 日产品已全面部署”。

### 不能推出

- 不能把 Limited Public Preview 写成全面 GA；
- 不能由架构设计推出生产可靠性；
- 不能假定 Guardian Agents 永远不会被同类模型 failure mode 影响；
- 不能把“动态风险”写成已独立验证的安全评分标准；
- 不能把模型 chain-of-thought 当成对真实 intent 的可靠、完整证据。

---

## 3. 本轮扫描结论

截至 2026-10-20 17:30（Asia/Shanghai）重新扫描 OpenAI、Anthropic、Google DeepMind、xAI、Meta、Mistral、DeepSeek、Qwen、Kimi、GLM、MiniMax 的近 24 小时公开材料，**未确认又有一个新的主要通用 foundation-model checkpoint 正式发布**。Mistral 最新官方模型发布仍为 10 月 15 日 Timestral；Gemini 4 Argon、Muse Spark Open、DeepSeek V4.1-Flash-1017 均已在此前研究包记录。

因此本轮新增的历史轴主要不是新模型，而是：

`model provenance → procurement eligibility / forced removal`

以及：

`static agent permission → continuous risk sensing → dynamic authorization → containment → audit`

两者共同说明 2026 年 10 月的 Agent/模型治理正在从“发布政策原则”进入更具体的 **供应链与运行时控制** 层。
