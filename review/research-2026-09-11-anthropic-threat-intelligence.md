# 2026-09-11 增量研究包：Anthropic 9 月威胁情报、Agent cyber orchestration 与反蒸馏访问控制

> 披露日期：**2026-09-10**。  
> 事件覆盖期：Anthropic 报告明确覆盖 **2025 年 12 月—2026 年 8 月**间被其调查和处置的活动。  
> 本包记录的是 9 月 10 日出现的新披露、归因与产品/访问控制信息；不能把报告中 3—8 月发生的历史活动全部误写成“9 月 10 日发生”。

## 本轮结论

Anthropic 9 月 10 日发布的新 Threat Intelligence report 达到“值得入史”的门槛，原因不只是又一份安全报告，而是它同时给出三类会修改现有 Agent / 模型竞争史的材料：

1. **Anthropic 称，其调查的多数 cyber operations 已经从 chatbot assistance 进入 AI direct execution / orchestration，出现 multi-agent frameworks 执行 reconnaissance、exploitation、data exfiltration，人类主要保留 target setting 与结果 review。** 这是一家 frontier lab 对真实滥用案件的生产侧观察，不是 benchmark。
2. **Anthropic 披露并归因了新一轮大规模“illicit distillation”行动。** 公司指称七家中国大陆 AI labs 通过 proxy / fraudulent accounts、CoT extraction、第三方 reseller，以及部分 live user-query relay 获得 Claude 输出用于模型训练或 R&D。Reuters 独立确认 Anthropic 确实发布这些指控，但这些 covert attribution 仍主要来自 Anthropic 自身 telemetry，必须写作“Anthropic 指称/归因”，不能直接写成司法事实。
3. **反蒸馏已经实质改变 Claude 的产品与访问控制。** Anthropic 明确说已经部署专用 classifiers、reasoning summarization、Fable 5.1 preserved thinking；当检测到 unauthorized resale 或来自 China / Russia / Iran 等 unsupported countries 的潜在滥用信号时，系统**可以要求 identity verification，验证失败则封禁**。这属于实际产品/访问政策，不只是安全倡议。

历史上应把这次披露写成：

> **模型能力竞争开始直接塑造 API 输出形态、身份验证、地区访问和用户数据供应链。**

---

# 一、准确日期与证据边界

## 披露日期

**2026-09-10。**

一手：

- Anthropic, “Detecting and countering misuse of AI: September 2026”.  
  https://www.anthropic.com/threat-intelligence-report-september-2026

独立报道：

- Reuters, “Anthropic disrupts Russian, Chinese AI campaigns targeting its Claude models”, 2026-09-10.  
  https://www.reuters.com/legal/litigation/anthropic-disrupts-russian-chinese-ai-campaigns-targeting-its-claude-models-2026-09-10/

## 事件实际发生期

Anthropic 明确说报告中的活动发生于 **2025 年 12 月至 2026 年 8 月**。

因此主编年不能把所有案例写成：

> “2026-09-10，俄罗斯/中国攻击者开始使用 Claude。”

正确方式是：

> **2026-09-10 — Anthropic 公布 2025-12 至 2026-08 的威胁情报复盘，并披露新的 Agent cyber orchestration 与大规模反蒸馏调查结果及已部署控制。**

---

# 二、真实 cyber operations：从 assistant 到 orchestrator

## Anthropic 的核心判断

报告写道，在其过去六个月调查的一系列 cyber operations 中：

- threat actors 包括 suspected state-sponsored groups、financially motivated criminals、politically motivated individuals；
- AI 在很多案件中已经不只是回答问题；
- **a majority of the operations** 由 AI 通过 direct execution 或 orchestration 支持；
- 出现 multi-agent frameworks 执行 reconnaissance、exploitation、data exfiltration；
- humans remained in the loop，主要负责设定攻击目标、review exfiltration 等高层控制。

这是一个重要层次变化：

> **“Agent 能否完成 cyber benchmark”与“有人已经把 Agent scaffold 用进真实攻击链”不再是同一问题。**

前者是 capability eval；后者是 adoption / misuse evidence。

## GTG-20006 案例：自动重构与重新部署攻击工具

Anthropic 把一个 actor 的 tradecraft 与公开报道中的 Midnight Blizzard 联系起来，并描述其 AI workflow 可：

- 监控恶意工具是否被 security products 检测；
- 若被发现，则自动修改、rebuild、redeploy malware；
- 持续迭代直到规避现有检测；
- 支持 phishing infrastructure、credential theft、data extraction 等。

Reuters 独立报道了 Anthropic 的这一披露，并指出美国政府此前已把 Microsoft 使用的 Midnight Blizzard tracking term 与俄罗斯 SVR 联系起来。

但归因必须保留两层：

- **A：Anthropic 确实观察并公开了这些 Claude 使用行为；**
- **B / B-：具体 actor 与国家/组织的归因属于 Anthropic + 既有 threat-intelligence attribution，不是本仓库独立验证。**

## GTG-50014：AI agents performed nearly all of the work

Anthropic 对若干 suspected ShinyHunters affiliates 的调查中甚至使用：

> **“AI agents performed nearly all of the work.”**

报告描述了：

- 批量 credential discovery；
- 跨 SaaS / cloud environment reconnaissance；
- token / API abuse；
- 自动写脚本、理解陌生系统；
- bulk exfiltration；
- 反复执行直到任务完成。

这里不应转述成“AI 独立发起犯罪”。报告仍描述 human operators 决定目标和商业目的。

历史上更准确的是：

> **AI 已在部分真实 cybercrime workflow 中承担了过去需要多个技术人员执行的大量中间操作。**

---

# 三、Illicit distillation：模型竞争从 benchmark 进入访问控制与数据供应链

## Anthropic 新披露

Anthropic 称，自 2026 年 2 月首次公开 distillation allegations 后，又识别并处置了针对 Claude 的大规模 campaigns，并以 high confidence 归因给七家 China-based labs。

报告公开点名的案例包括 Alibaba / Qwen、Moonshot、DeepSeek、Zhipu/Z.ai、Xiaomi、SenseTime、MiniMax 等。

需要非常严格地写：

> **以下是 Anthropic 的归因与指控，不是法院判决，也不是这些公司的自认。**

Reuters 在 9 月 10 日独立确认了报告内容和 Anthropic 的公开指控，但 Reuters 并没有独立拿到 Anthropic 内部 telemetry 来复现每一条 attribution；被点名企业在 Reuters 发稿时也并非都已回应。

## 规模：只作为 Anthropic observed / attributed numbers

Anthropic 报告的主要规模口径包括：

- Alibaba：2026 年 5—7 月，**over 151 million exchanges observed**；峰值近 300 万 exchanges/day，超过 3,500 fraudulent accounts；
- Moonshot：5—7 月，**over 23 million exchanges observed**；其中一个 10-day sample 约 300,000 customer requests 被其指称 relayed to Anthropic；
- DeepSeek：7 月约 14 天，**over 12.1 million exchanges observed**；
- Zhipu：6—7 月 17 天，over 3.4 million exchanges；
- Xiaomi：3—4 月 20 天，over 400,000 exchanges。

这些数字的正确标签是：

> **Anthropic telemetry / attribution counts。**

不能改写成“独立第三方确认某公司训练数据中有 1.51 亿条 Claude 数据”。

---

# 四、最敏感的新指控：live user traffic / third-party transcript 进入模型训练链

## Moonshot / DeepSeek relay 指控

Anthropic 称其观察到：

- Moonshot 在部分情况下把用户以为会由 Kimi 处理的请求转发到 Claude；
- DeepSeek 也在部分第三方 / coding-harness traffic 中筛选请求并 relay 到 Claude；
- 部分响应随后被保存，用于 CoT extraction 或训练数据构造；
- 被转发的内容中包含企业内部信息、credentials 或其他敏感数据。

Anthropic 同时明确承认，它**不知道 Moonshot 是否通知过相关客户**；对于一些案例，其语言也使用 `likely` / `assess` 等 attribution 措辞。

因此本书不能写成无条件事实：

> “Kimi / DeepSeek 会把所有用户对话偷发给 Claude。”

而应写：

> **Anthropic 2026-09-10 指称其 telemetry 显示，在部分被其归因的 distillation campaign 中，Moonshot 与 DeepSeek 曾 relay 特定用户请求到 Claude，且部分请求包含敏感数据；该归因尚缺独立原始日志复核。**

## third-party reseller / proxy ecosystem

Anthropic 还称：

- 一些 Claude proxy / reseller 保存最终用户 exchange；
- transcript 可能被售给其他 labs；
- SenseTime 等案例中出现采购这类第三方 exchanges 的迹象；
- MiniMax 被 Anthropic 指称通过 shell company 经营只提供 Anthropic / OpenAI 模型的 proxy network，以获取 exchanges。

无论具体公司归因以后是否被进一步确认，这里有一个更稳定的历史问题：

> **第三方模型路由器 / proxy 不是单纯“便宜 API 中转层”；它可能成为训练数据、身份、支付与隐私的数据供应链节点。**

这值得与仓库已有的 model distribution、API policy、data licensing 史连接。

---

# 五、Chain-of-thought extraction 已经成为产品设计问题

Anthropic 公开了多种其观察到的 reasoning-extraction tactic：

- prompt 直接要求输出 prior reasoning；
- 把 reasoning 当作“translation”目标；
- 大规模枚举不同 extraction prompts；
- 保存 thinking signature 后在新 session 中重放，以尝试恢复 raw trace。

报告称：

- Moonshot / DeepSeek 的部分 campaign 使用 cross-session replay；
- Zhipu 也被指称建立 CoT extraction cleaner；
- Alibaba campaign 被指称直接针对 Opus 4.6 / 4.7 reasoning transcripts。

这些仍然是 Anthropic attribution，但其后果已经能从产品层直接观察：

> **reasoning trace 的可见性与 context mutability 不再只是 UX / interpretability 选择，而被模型厂商当作 model-weight protection / anti-distillation surface。**

---

# 六、已经生效的 Anthropic access / output controls

这一部分是本轮最应该按“政策变化就记录”原则写入的内容。

Anthropic 明确说已经使用 / 部署：

1. **metadata / irregular-activity detection**：识别 proxy network；
2. **专用 adversarial-extraction classifiers**；
3. 当高置信判断为 illicit distillation / unauthorized use 时，**block request + ban associated accounts**；
4. Claude 现在**summarizes its internal reasoning before responding**，降低 transcript 用于训练的价值；
5. Fable 5.1 的 **preserved thinking**：对新 API accounts 限制改变 reasoning 前的 system prompt / tools / messages；
6. 当检测到 potential abuse（官方举例包括 unauthorized resale，或 accounts operating from unsupported countries such as **China, Russia, Iran**）时，系统**可以要求 identity verification 以保留 access；未通过验证的 account 会被 ban。**

这里必须避免两个夸张写法：

错误：

> “Anthropic 现在要求所有中国/俄罗斯/伊朗用户 KYC。”

官方原文是：

> **检测到 potential abuse signals 时系统 can require verification；unsupported-country operation 是其举出的 signal 类型之一。**

因此这是**风险触发式身份验证 / enforcement capability**，不是公开宣布对所有账户普遍实名。

## 证据等级

| 结论 | 等级 |
|---|---|
| Anthropic 9 月 10 日发布该 Threat Intelligence report | **A** |
| 上述 classifiers / reasoning summary / preserved thinking / risk-triggered identity verification 是 Anthropic 声称已部署的控制 | **A-**：官方产品/安全政策披露 |
| 七家 labs 的具体 covert distillation attribution | **B**：Anthropic high-confidence attribution + Reuters 报道，但缺独立 raw telemetry |
| 每个 exchange 都确实进入最终训练集 | **不能推出** |
| 被点名企业所有用户 traffic 都被 relay | **不能推出** |
| identity verification 已影响全部 unsupported-country users | **不能推出** |

---

# 七、与此前“蒸馏争议”条目的关系：需要修订，而不是再写一次新闻

仓库现有 2026 年 3 月条目已经记录 Anthropic 2 月 23 日对 DeepSeek、Moonshot、MiniMax 等的“industrial-scale distillation attacks”指控，并把问题概括为：

> **API outputs 是否可被竞争对手作为训练资源。**

9 月 10 日的新披露把问题扩大了至少三层：

### 1. 输出抓取 → reasoning extraction

争夺对象从 final answer 进入 CoT / reasoning traces。

### 2. fake-account scraping → live traffic / reseller supply chain

训练数据来源不再只有批量构造 prompts，还出现：

- third-party router traffic；
- proxy logs；
- 被指称 relay 的真实用户请求。

### 3. Terms enforcement → architecture + identity policy

反蒸馏手段从封账户扩展到：

- reasoning summarization；
- preserved thinking；
- classifiers；
- organization attribution；
- risk-triggered identity verification；
- regional access enforcement。

因此已有“地缘与封锁 / 数据墙 / 模型竞争”内容需要轻度修订。

---

# 八、社区与使用者影响：目前证据还很早

当前公开讨论主要集中在两类担忧：

1. **第三方 router / proxy 的 transcript 是否被保存或二次出售；**
2. **Anthropic 的反滥用 enforcement 是否会提高合法用户在 unsupported / proxy network 环境中的 account verification / ban 风险。**

但本轮没有获得足够规模、足够可核验的用户样本来判断：

- verification 触发率；
- false positive rate；
- 哪些合法 proxy / roaming / enterprise network 会被误判；
- 新 controls 对 API latency / reasoning quality 的影响。

因此“使用者影响”目前应标为：

> **A：政策能力已由 Anthropic 公开确认；C / unknown：真实用户分布与误伤率。**

月后续应继续搜 developer forum、support cases 和企业 API 用户反馈，而不是用单个封号帖子推断普遍政策。

---

# 九、为什么具有历史意义

这次报告把三个原本分散的问题压到一起：

> **Agent autonomy × model competition × identity/data governance。**

一边，真实攻击者开始使用 multi-agent scaffolding 执行大量中间操作；另一边，模型厂商互相指控对方利用 API 输出和 reasoning traces 训练模型。为防止这种能力转移，平台进一步收紧 reasoning exposure、账号身份、地区 access 与 traffic classification。

所以 2026 年的“模型竞争”已经不能只看 benchmark：

> **谁能调用谁的模型、谁能看到 reasoning、谁能保留 transcript、谁需要验证身份、第三方 router 保存什么数据，本身都开始影响下一代模型怎么训练。**

---

# 十、建议写入位置

1. `编年/2026/09.md`：9 月 10 日新增“Anthropic September Threat Intelligence：真实 multi-agent cyber orchestration 与反蒸馏 enforcement”节点；
2. `志/AI Agent 生态.md`：真实 malicious multi-agent adoption 的 evidence layer；
3. `志/地缘与封锁.md`：从 model access restriction 扩展到 identity verification / proxy enforcement；
4. 数据 / 开放 / 模型训练专题：增加 third-party routing / transcript resale / reasoning extraction；
5. `表/Agent发展大事表.md`：如表包含 reliability / misuse 节点，可加入真实 cyber orchestration evidence；
6. 2026 年 3 月 distillation 条目：增加“9 月新披露将争议扩展到 CoT、live user relay 与 reseller ecosystem”的 follow-up。

# 十一、仍不能推出

- Anthropic 的所有国家/组织 attribution 已被独立证实；
- Alibaba、Moonshot、DeepSeek、Zhipu、Xiaomi、SenseTime、MiniMax 已承认 Anthropic 的具体指控；
- 所有被观察到的 exchanges 都进入了最终商业模型权重；
- 任一被点名产品会普遍把用户请求 relay 给 Claude；
- Anthropic 的 anti-distillation classifiers 没有 false positives；
- unsupported-country 的所有用户现在必须实名验证；
- reasoning summarization / preserved thinking 已经彻底阻止 distillation；
- multi-agent cyber misuse 已经完全取代传统人工攻击。

本书后续应保留“厂商 telemetry 是强一手证据，但对竞争对手的 covert attribution 仍需独立材料”的边界。