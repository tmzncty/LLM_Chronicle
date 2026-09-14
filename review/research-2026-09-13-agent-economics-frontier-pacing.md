# 2026-09-13 增量研究包：Amp Free Agent、前沿模型“减速”承诺与 DeepSeek V4 Pro 撤回下线

> 检查窗口：约 2026-09-12 09:32 UTC 至 2026-09-13 09:32 UTC。  
> 仓库基线：`main` @ `9421a08ad6bd89c75189d22dc834f2b8d41324c4`，即 PR #34（Fugu、GPT-Rosalind / Runway 模型访问与 RubyGems Agent 事故）已于 2026-09-13 07:57 UTC 合并。  
> 本轮先检查 `编年/2026/09.md`、最近 PR #32—#34、Agent 产品商业化相关条目与 9 月 10 日 DeepSeek 研究包；未发现下列 9 月 12—13 日事件的既有条目。另发现：9 月 10 日研究包中关于 `deepseek-v4-pro` 将于 9 月 14 日强制路由到 V4.1 Flash 的**未来已公告事项已经被 9 月 11 日的新决定撤销**，因此必须补一条史料修订。

## 本轮结论

本轮没有发现 OpenAI、Anthropic、Google DeepMind、xAI、Meta、Mistral、DeepSeek、Qwen、Kimi、GLM、MiniMax 在约 24 小时窗口内正式发布一个新的主要 foundation-model SKU；但有 **2 组明确达到记录门槛的新政策 / 商业模式节点**，外加 **1 条必须补录的既有条目修订**：

1. **2026-09-13：Amp 发布 “Free Agent” 新定价 / 产品结构。** 当用户自带模型订阅或 API key、并在自己的 runner 上运行 Agent 时，Amp 本身不再要求月费，也不再对非 Enterprise BYOK 收 token fee / token limit；Amp 的主要收费轴进一步转向远程 Agent 计算环境 `orbs` 与可选的模型推理。Hobby 变为免费、Teams 不再额外按 seat 收费，零 / 最小数据保留政策也正式扩展到所有用户与 workspace。它不是“所有 Amp 使用都免费”，而是 **Agent harness / collaboration layer 与 model inference / remote compute 的计费开始解绑**。
2. **2026-09-12：Anthropic CEO Dario Amodei 公开提出 “We Must Pace the Frontier”，并代表 Anthropic 承诺让独立第三方 evaluator 获得持续、接近员工级的内部访问。OpenAI CEO Sam Altman 同日公开表示同意，并承诺 OpenAI “will do the same”。** 这是明显的治理政策节点，但当前仍应写成**公司公开承诺 / 将实施的治理安排**，不是已经完成部署、不是行业正式协议、也不是具有法律约束力的共同减速机制。
3. **补录 2026-09-11：DeepSeek 撤回 9 月 14 日强制下线 V4 Pro / 路由到 V4.1 Flash 的计划。** DeepSeek 改为 9 月 14 日后继续提供 V4 Pro API，计费不变。该决定已经直接推翻仓库 9 月 10 日研究包中的未来事项，且公开报道明确称是“响应广大用户需求”；它是一个很好的模型 endpoint / lifecycle governance 样本：厂商认为新 Flash 综合更优，并不等于生产用户愿意接受未经选择的 endpoint 语义替换。

另外，OpenAI CEO Sam Altman 在 9 月 12 日的 Fortune 专访中明确排除 **2026 年 IPO**，并把当前安全 / alignment 阶段称为不适合上市的时点。该事实与本轮 frontier-pacing 转向高度相关，建议作为事件二的资本 / 公司治理侧证据，而不是独立夸大成“OpenAI 已确定 2027 IPO”。Altman **没有承诺具体上市年份**。

---

# 事件一：Amp “Free Agent”——coding-agent 计价从 seat / token 进一步转向 runtime compute

## 准确日期

**2026-09-13。**

Amp 官方 Chronicle 发布 **“Free Agent”**。

官方原文：

- “Amp is now free to use when you bring your own compute and model subscriptions/keys.”
- 不再要求月度计划才能把 ChatGPT subscription 接入 Amp；
- 非 Enterprise 用户不再有 BYOK token fee 或 Amp 侧 token limit；
- 使用 Amp 自有远程计算机 `orbs` 时继续付费；使用自己机器上的 `runners` 可免费跑 Agent；
- 仍可通过 Amp 购买 model inference，官方称不加价。

来源：

- Amp, **“Free Agent”**, 2026-09-13  
  https://ampcode.com/news/free-agent
- Amp 当前价格文档（用于前后口径比较）  
  https://ampcode.com/docs/pricing

## 核心事实

### 1. 免费的是 Agent 产品层，不是所有资源

新 Hobby tier：

- **$0**；
- 所有产品功能；
- orb 按量付费，或使用自有 runner 免费；
- 可以使用 ChatGPT subscription / 其他 subscription；
- 可以 BYOK；
- 非 Enterprise 没有 Amp token fee / Amp token limit；
- 支持 private / public repositories。

这不能概括成：

> “Amp 从 9 月 13 日起永久免费，算力和模型都不要钱。”

准确写法是：

> **Amp 把 Agent harness、workspace 与本地 runtime 的基础进入门槛降到 $0；模型推理和 Amp 托管远程 compute 仍各自有成本。**

### 2. Teams 不再按“进 workspace”本身额外收费

官方把 Teams 标为 **No extra charge**，支持：

- 不同成员分别处在 Hobby / Megawatt / Gigawatt；
- thread sharing / multiplayer / permissions；
- shared portals / plugins / skills；
- user management、controls、analytics；
- shared billing / pooled credits；
- SAML / OIDC SSO；
- shared BYOK & model routing。

至少一位成员为付费 tier 时，官方称整个 workspace 可使用免费 SAML / OIDC SSO。

因此它不是传统意义上的“每开发者一个 coding-agent seat”。

### 3. 商业计量中心进一步移到 `orbs`

Amp 明确写道：

> “You pay us for orbs, our remote computers where your agents run independently and in parallel.”

这比 token subscription 更接近**托管 Agent runtime / computer-hours** 计量：

- harness / UI / collaboration 可以免费；
- inference 可以来自用户已有订阅、BYOK、公司 gateway，或 Amp 自己代购；
- execution environment 可以是自有 runner，也可以购买 Amp orb。

这与 2026 年 Agent 商业化的一个更大趋势一致：

> **model token、agent runtime、remote computer、workspace governance 不再天然属于同一个计费包。**

### 4. 数据政策也发生了实质变化

Amp 表示，过去只有 Enterprise 可以通过合同形式保证的 **zero / minimal data retention policy**，现在正式扩展到所有 Amp 用户和 workspace。

应严格区分：

- Amp 声称所有使用从一开始实际上都受该政策覆盖；
- **9 月 13 日的变化是正式政策 / 保证范围扩展**，不是“此前普通用户数据一定被长期保留”。

### 5. BYOK provider 范围扩大，但部分仍是 early access

Megawatt / Gigawatt 首先获得更多 BYOK provider early access：

- OpenRouter；
- Amazon Bedrock；
- Google Cloud Agent Platform；
- Azure Foundry；
- Vercel AI Gateway；
- Cloudflare AI Gateway；
- Ollama Cloud；
- OpenCode Go；
- custom endpoint URLs。

官方同时说这些能力会随后 rollout 给所有人。

所以正文不能写成：

> “9 月 13 日所有 Hobby 用户已经能使用全部九类新 provider。”

## 与 Amp 过去“免费”的区别

这不是 Amp 第一次使用 `free` 这个词，必须避免把 2025—2026 的几个方案混在一起。

### 2025-10-15：Amp Free

最初的 Amp Free 是**广告补贴模型推理**：Amp 通过广告和模型供应商剩余容量提供免费的 Agent token。后来页面明确留下更新：该计划已暂停，且“不打算恢复”。

来源：

- Amp, “Amp Free”, 2025-10-15  
  https://ampcode.com/news/amp-free

### 2026-01-08：The Frontier Is Now Free

Amp 一度给每个用户提供每天约 $10 的 free credits，覆盖 frontier agent 模式；官方当时明确说这种广告 / 免费额度是实验，不能保证永远持续。

来源：

- Amp, “The Frontier Is Now Free”, 2026-01-08  
  https://ampcode.com/news/amp-free-frontier

### 2026-03-30：Amp Free Is Ad-Free

Amp 后来取消广告，并坦率说明：OpenAI 等订阅把 token 补贴压到极低价格后，广告收入已经不足以支撑大量 frontier token。5 月又进一步减少免费额度。

来源：

- Amp, “Amp Free Is Ad-Free”, 2026-03-30  
  https://ampcode.com/news/amp-free-is-ad-free

### 2026-09-13：Free Agent

这一次的结构不同：

> **Amp 不再试图替用户支付所有 token，而是让用户带着自己已经买过的 token / subscription / gateway / compute 进入。**

于是“免费”从 **subsidized inference** 变成了 **free agent software layer + user-supplied resources**。

这是一条很值得长期跟踪的 Agent 商业史转变。

## 首日使用者评价

目前没有成熟第三方 benchmark、生产可靠性样本或企业 ROI 审计。首日公开反应主要是产品负责人社交帖下的早期开发者反馈，证据只能列 **C 级体验 / 意向样本**：

- 有开发者称这一变化“正好让团队 pilot 变得可行”；
- 有人表示听说 Amp harness 很久，现在因为 BYOK 免费才准备尝试；
- 也有人直接追问：Enterprise 收入是否足以持续补贴这种结构，还是增长策略；
- 对 `orbs` 这个新计量 / 产品术语存在明显困惑；
- 有用户询问 custom endpoint URL 是否意味着可接本地 OpenAI-compatible endpoint；
- Amp 自己也预警，BYOK provider / custom parameter 组合会带来大量兼容性 bug，要求用户上报 diagnostics，并称付费 tier / Enterprise support 会优先。

公开反应镜像样本：

- Quinn Slack / Amp 发布帖及 replies（社交平台镜像；仅作体验史料，不作产品事实主证）  
  https://zamantika.com/sqs/status/2098868788431397286

因此当前不能推出：

- Free Agent 会长期保持这个价格结构；
- BYOK 在所有 provider / model / custom param 上都已经可靠；
- 免费 workspace 会显著提高团队生产率；
- `orbs` 收费足以覆盖 Amp 的商业模式；
- 这已经造成 coding-agent 市场普遍 seat-price collapse。

## 证据等级

| 结论 | 等级 | 说明 |
|---|---|---|
| 2026-09-13 Amp 发布 Free Agent | **A** | Amp 官方发布 |
| Hobby $0 / Teams no-extra-charge / own runner 可免费使用 | **A** | 官方产品页直接列明 |
| 非 Enterprise BYOK 不再收 Amp token fee / limit | **A** | 官方直接列明 |
| zero/minimal retention 正式扩展全部用户 | **A（政策存在）** | 官方直接声明；不等于第三方审计其实际执行 |
| 新 BYOK providers 全体用户均已可用 | **不成立** | 当前首先是 Megawatt/Gigawatt early access |
| 首日开发者总体欢迎 | **C** | 有正向样本，但非代表性调查 |
| 免费化已验证 ROI / retention / 生产可靠性 | **未证明** | 缺独立数据 |

## 历史意义

这件事值得进入 Agent 产品史，不是因为“又一个免费 tier”，而是因为计价单位在重构：

> **seat → tokens → agent runtime / remote computer-hours / orchestration infrastructure**

更准确地说，2026 年 Agent 产品开始把以下东西分别商品化：

1. foundation-model inference；
2. agent harness / orchestration；
3. durable / remote runtime；
4. computer / sandbox；
5. workspace collaboration；
6. governance / identity / audit；
7. support / SLA。

Amp 9 月 13 日的 Free Agent 是一个很清楚的“解绑”样本。

## 建议写入位置

- `编年/2026/09.md`：新增 9 月 13 日节点；
- `志/Agent产品与商业化.md`：新增“Agent harness 与 inference / compute 解绑”；
- `志/AI编程助手.md`：Amp 2026 产品路线；
- `志/Agent支付、商业计量与经济学.md`（若已有对应文件则写入；若无可作为未来专题候选）；
- Agent / coding-agent 产品价格对照表：需要新增 `Hobby $0 + BYOK + own runner` 与 `orb` 维度。

---

# 事件二：Anthropic “pace the frontier” 与 embedded evaluator——前沿实验室把第三方监督从外部 eval 推向持续内部访问

## 准确日期

**2026-09-12。**

Anthropic CEO Dario Amodei 发布长文 **“We Must Pace the Frontier”**。文章页面仅标 “September 2026”，但 Reuters、Guardian 等同期报道明确把公开日期定位在 9 月 12 日；Reuters 报道时间为 9 月 12 日。

一手：

- Dario Amodei, **“We Must Pace the Frontier”**, September 2026 / publicly circulated 2026-09-12  
  https://darioamodei.com/post/we-must-pace-the-frontier

独立：

- Reuters, **“Anthropic CEO urges AI companies to slow model development amid fears over misuse”**, 2026-09-12  
  https://www.reuters.com/business/anthropic-ceo-urges-ai-companies-slow-model-development-2026-09-12/
- The Guardian, **“‘We must slow the pace’: CEO of Anthropic calls for an AI slowdown”**, 2026-09-12  
  https://www.theguardian.com/technology/2026/sep/12/we-must-slow-the-pace-ceo-of-anthropic-calls-for-an-ai-slowdown

## 核心事实

Amodei 明确写道：过去几个月，他从“安全投入跟上能力增长”进一步转向：

> **不仅要做风险预防，还需要 pacing the rate of capabilities advancement。**

其公开表述包括：

- “We must slow the pace at which we improve the capabilities of AI models.”
- 这不是要求停止训练或停止技术进步；
- 目标是让 alignment、safeguards 与第三方验证有时间跟上；
- 他把近期 recursive self-improvement 加速以及 OpenAI / Hugging Face Agent 事故列为改变自己判断的重要原因。

### 三步框架

1. **Anthropic 单边先做**：embedded independent evaluators；
2. **行业协调**：前沿实验室建立共同安全标准与 pacing 协调；
3. **全球协调**：进一步形成国际治理安排。

目前只有第一步出现了 Anthropic 的明确单边承诺；第二、三步仍是倡议 / 目标。

## embedded evaluator 到底承诺了什么

这比传统“给 METR 一个模型 endpoint 做发布前测试”更进一步。

Amodei 表示 Anthropic 将建立 external review team，并使第三方 evaluator 获得接近内部风险团队的持续权限和工具。文中描述的方向包括：

- ongoing / employee-like access；
- 可验证公司是否遵守自己的 safety commitments；
- 可调查 / 报告 incident；
- 可在训练过程中评估 alignment，而不只是最终 checkpoint；
- 实体层面甚至描述为 desks、badges、company laptops；
- evaluator 应能公开关键 findings，不由 Anthropic 编辑控制，但允许狭窄的 security / legal / commercial / third-party privacy redactions。

历史上这是一个重要治理接口变化：

> **第三方 eval 从“外部拿一个模型做测试”向“嵌入实验室、持续观察训练和事故”移动。**

但截至本轮不能写：

- 第三方团队已经正式入驻并持续运作；
- 已公布具体 evaluator 名单 / 合同 / SLA / access-control implementation；
- 已证明第三方访问足以发现未来事故；
- Anthropic 已经实际降低训练 FLOPs 或模型发布频率。

当前是**正式政策承诺**，不是已经完成的 operational evidence。

## OpenAI 同日跟进：承诺“we will do the same”

Sam Altman 同日在公开社交媒体写道：

- 同意需要 “pace the frontier”；
- “Committing to having independent evaluators with employee-like access is a great idea”；
- **“we will do the same”**；
- OpenAI 后续会公布更多细节。

Guardian 与 Reuters 均独立报道了这一承诺。

因此可以记录为：

> **2026-09-12，OpenAI CEO 代表公司公开承诺跟进 employee-like-access independent evaluators。**

但不能写成：

> “9 月 12 日 OpenAI 已经部署了嵌入式独立审计团队。”

它仍缺 implementation detail。

这还应与仓库已有 **9 月 9 日 OpenAI 支持 mandatory capability-based national AI safety regulation** 连起来：

- 9 月 9 日：对外监管立场转向；
- 9 月 12 日：进一步公开承诺持续第三方内部访问式 evaluator，并认可“pace the frontier”。

两者形成连续政策链，而非彼此重复。

## xAI / Hugging Face / 社区反应：有同调，但不是正式行业 pact

同期公开反应：

- Elon Musk 回复 **“Dario is right.”**；
- Hugging Face CEO Clement Delangue 宣布 **Open Alignment Initiative**，并希望参与 embedded evaluator program；
- 一些研究者公开支持；
- 同时也有批评者担心这种“协调减速”可能巩固少数 frontier labs 的控制权，特别是如果开放权重生态被排除在治理设计之外。

这些反应可以作为“行业讨论迅速汇聚”的 B/C 级史料，但不能升级为：

- xAI 已采用同样内部 evaluator 制度；
- Hugging Face Open Alignment Initiative 已得到 Anthropic 正式委任；
- OpenAI / Anthropic / xAI 已经签署 binding slowdown pact；
- 行业已经确定“慢多少”“什么 checkpoint 触发 pause”。

截至本轮，**方向性共识远强于执行细节共识**。

## 与 OpenAI IPO 的关系：公司治理 / 资本结构开始直接进入“减速能力”叙事

同日 Fortune 专访中，Sam Altman 明确表示：

- OpenAI **不会在 2026 年 IPO**；
- “given everything happening with safety, right now would be an ill-advised moment to go public”；
- 公司还有很多 safety / alignment 与 industry-government coordination 工作；
- 他没有承诺 2027 一定上市。

一手采访：

- Fortune, **“Exclusive: Sam Altman addresses AI doomsday fears in new interview”**, 2026-09-12  
  https://fortune.com/2026/09/12/sam-altman-interview-ai-doomsday-safety-models-control-ipo-2027/

独立交叉：

- Reuters, **“OpenAI IPO will not happen in 2026 amid AI safety fears, Altman says”**, 2026-09-12  
  https://www.reuters.com/legal/litigation/openai-ipo-will-not-happen-2026-amid-ai-safety-fears-altman-says-2026-09-12/
- TechCrunch, **“OpenAI’s Sam Altman says it would be ‘ill-advised’ to go public in 2026”**, 2026-09-12  
  https://techcrunch.com/2026/09/12/openais-sam-altman-says-it-would-be-ill-advised-to-go-public-in-2026/

这值得留档，因为它把一个以前较抽象的问题具体化：

> **公司是否保留足够治理空间，可以在 frontier capability 与商业短期利益冲突时减速？**

Altman 在访谈中把 OpenAI 复杂的 nonprofit / for-profit governance 与“做不明显符合 shareholder interest 的安全决策”联系起来。

但不能推出：

- 安全是推迟 IPO 的唯一原因；
- OpenAI 已承诺 2027 上市；
- 私有公司结构天然保证安全；
- OpenAI 已实际暂停下一代模型训练。

## 证据等级

| 结论 | 等级 | 说明 |
|---|---|---|
| Amodei 9 月 12 日公开主张 pace frontier | **A-/A** | CEO 一手文章 + Reuters / Guardian 日期交叉 |
| Anthropic 承诺 embedded independent evaluators | **A（承诺存在）** | CEO 明确代表公司承诺 |
| evaluator 已正式入驻并有效运转 | **未证明** | 尚缺 implementation / operation evidence |
| Altman 表示 OpenAI “will do the same” | **A-/B+** | CEO 公开帖 + 多家独立报道 |
| OpenAI 已完成 embedded evaluator 部署 | **未证明** | 只有承诺，更多细节待发布 |
| Musk 支持 Amodei 方向 | **B+** | 公开回复被多家报道 |
| xAI 已采用 slowdown / embedded evaluator policy | **未证明** | “Dario is right”不等于制度承诺 |
| OpenAI 2026 不 IPO | **A-/B+** | CEO Fortune 专访 + Reuters / TechCrunch |
| OpenAI 确定 2027 IPO | **不成立** | Altman未承诺具体年份 |
| 已形成行业 binding pact | **不成立** | 尚无正式共同协议 |

## 为什么具有历史意义

这件事比一般“CEO 谈安全”更值得记录，因为**治理接口发生了可观察的制度化承诺**：

> external red-team / pre-release eval  
> → independent evaluator with persistent internal access  
> → incident / training-process oversight

同时，Anthropic 与 OpenAI 两家前沿实验室在同一天公开使用 “pace the frontier” / “we will do the same” 语言，使此前分散的安全倡议第一次出现明显的跨公司同步趋势。

但是史学上必须把三个层次拆开：

1. **rhetorical alignment**：多位 CEO 同意“应该减速”；
2. **policy commitment**：Anthropic / OpenAI 承诺 embedded evaluators；
3. **operational constraint**：真正降低训练 / 部署节奏、让 evaluator 具有可执行 veto / stop 权限。

截至 9 月 13 日，前两层有证据，第三层仍未建立。

## 建议写入位置

- `编年/2026/09.md`：新增 9 月 12 日节点；
- `纪传/本纪/Anthropic.md`：安全治理路线从 RSP / external eval 继续推进到 embedded oversight；
- `纪传/本纪/OpenAI.md`：9 月 9 日监管立场 + 9 月 12 日 evaluator 承诺 / 2026 IPO 排除；
- `志/Agent宣传、实测与可靠性.md`：真实 Agent 事故如何反过来改变治理；
- `志/安全对齐与治理.md` 或现有相近专题：新增“embedded evaluator”制度层；
- 公司 / 资本大事表：OpenAI 2026 IPO 排除，但不得写死 2027 日期。

---

# 补录修订：DeepSeek 在用户反弹后保留 V4 Pro API

## 为什么本轮必须补，尽管事件日期为 9 月 11 日

仓库 `review/research-2026-09-10-model-policy-safety.md` 当前正确地把下列内容标为“未来已公告”，而不是既成事实：

> 2026-09-14 12:00 BJT 起，DeepSeek 计划下线 V4 Pro，并将 `deepseek-v4-pro` 暂时路由到 V4.1 Flash、按 Flash 计费。

但 **2026-09-11 DeepSeek 已撤回该计划**。

如果不补录，等 9 月 14 日以后，仓库里会留下一个已经被厂商取消但没有后续修订的未来事项。历史维护应优先纠正这种“已公告 → 后撤回”的 lifecycle 变化。

## 新决定

多家 9 月 11 日同期报道一致转述 DeepSeek 新公告：

> 为响应广大用户的需求，DeepSeek 决定在 **2026 年 9 月 14 日之后继续提供 DeepSeek V4 Pro API 调用服务，计费方式保持不变；如有变动将另行通知。**

同期来源：

- IT之家转述 / 凤凰科技，2026-09-11  
  https://tech.ifeng.com/c/8wKL2vkXhBq
- 新浪科技转载 IT之家，2026-09-11  
  https://finance.sina.com.cn/tech/digi/2026-09-11/doc-inirnhrq6723888.shtml
- PANews / TradingView 快讯，2026-09-11  
  https://www.tradingview.com/news/panews%3A25852f024acdf%3A0/

当前 DeepSeek 官方文档搜索索引仍能看到 `deepseek-v4-pro` 作为合法 API model ID；由于官方页面缓存更新存在滞后，本轮不把搜索缓存当作精确发布时间证据，只作为“Pro endpoint 当前仍被正式文档承认”的辅助事实。

辅助：

- DeepSeek API Docs, API / Responses 文档  
  https://api-docs.deepseek.com/zh-cn/api/create-response/

## 这次反转为什么值得记

DeepSeek 9 月 10 日的官方论证是：V4.1 Flash 在其测试中已经在 performance / cost / speed / total time 上综合超过 V4 Pro，因此计划让旧 Pro endpoint 自动迁移。

但一天后，用户需求迫使它保留 V4 Pro。

这给模型产品史增加了一个很重要的边界：

> **benchmark / vendor judgment of “new model is better” ≠ production users consider endpoint substitution semantics acceptable.**

生产环境可能依赖：

- 输出风格；
- 长上下文行为；
- prompt / tool-call regression；
- latency distribution；
- hidden policy / refusal pattern；
- determinism / failure mode；
- 已经验证过的 snapshot；
- audit / compliance 基线。

因此模型服务的兼容性不能只定义成：

> API schema 没变。

还要加：

> **endpoint name 背后的模型语义是否稳定。**

这与 2026 年多个厂商 increasingly dynamic routing / auto model selection 的趋势形成对照。

## 社区 / 用户反应证据边界

官方 / 同期报道使用了“响应广大用户需求”的措辞，能证明用户反馈是 DeepSeek 对外给出的政策改变理由。

但当前没有一份公开、可复核的用户反馈总体调查，因此不能量化为：

- “绝大多数用户反对”；
- “多少企业因迁移威胁要离开”；
- “V4.1 Flash 在生产环境实际上更差”。

最多可写：

> **公开开发者社区对强制 endpoint replacement 存在明显反弹，而厂商随后撤回强制迁移。**

因果层级保持为 B：厂商自己把政策改变归因于用户需求，但我们没有内部 decision log。

## 证据等级

| 结论 | 等级 | 说明 |
|---|---|---|
| DeepSeek 9 月 11 日宣布 9 月 14 日后继续提供 V4 Pro API | **B+/A-** | 多家同期媒体一致引用公司公告；官方索引仍保留 Pro endpoint |
| V4 Pro 计费保持不变 | **B+/A-** | 同上 |
| 原计划强制路由被撤回 | **B+** | 前后公告对照明确 |
| 反转源于“广大用户需求” | **A（厂商给出的理由）/ B（实际决策因果）** | 可确认厂商这样解释，无法审计内部决策 |
| V4.1 Flash 实际比 V4 Pro 差 | **未证明** | 社区偏好 ≠ 客观能力结论 |

## 建议修订位置

必须在后续正文整合中修订：

- `review/research-2026-09-10-model-policy-safety.md` 的 9 月 14 日 future-event 描述：保留“曾计划”，追加 9 月 11 日撤回；
- `编年/2026/09.md`：9 月 10 日发布节点旁追加 9 月 11 日 lifecycle reversal；
- `纪传/世家/DeepSeek.md`：V4 Pro / V4.1 Flash 并存，而非 Flash 自动替代 Pro；
- `表/模型版本沿革表.md`：不要把 V4 Pro 的结束日期写成 2026-09-14；
- `志/模型API与产品生命周期治理.md`（若已有相近专题）：加入 endpoint semantic stability / forced reroute 案例。

---

# 本轮没有记录成事件的观察项

## 1. 没有确认新的主要 frontier-model SKU

本轮对 OpenAI、Anthropic、Google DeepMind、xAI、Meta、Mistral、DeepSeek、Qwen、Kimi、GLM、MiniMax 做了最近 24 小时检索。检索结果大多是：

- 对 9 月 1—11 日既有模型的二次报道；
- 传闻 / leak；
- 旧模型 benchmark 对比；
- 尚未正式发布的新型号预期。

因此不为了满足“每日有模型”而制造不存在的 release。

## 2. Claude Code 9 月 14 日 weekly-limit 调整尚未生效

Anthropic 8 月底已经宣布：9 月 14 日起标准 weekly limit 相对原基线永久 +25%，但相对当时临时 +50% promotion 实际下降约 17%。本轮日期仍为 9 月 13 日，且这一政策不是今天新宣布，因此不作为 9 月 13 日新增事件；**下一轮若确认实际生效，可按政策实际生效节点记录。**

参考：

- BleepingComputer, 2026-08-29  
  https://www.bleepingcomputer.com/news/artificial-intelligence/anthropic-is-cutting-claude-codes-current-weekly-limits-by-17-percent/

---

# 总体历史判断

9 月 12—13 日没有新的 foundation-model 大发布，却同时出现了两个非常“2026”的转向：

1. **Agent 产品的商业层开始解绑。** Amp 不再强迫用户为“Agent 软件 + token”买一个统一包；用户可以带自己的 ChatGPT subscription / API key / gateway / local runner，而 Amp 对 remote agent computer 另行计费。
2. **前沿模型治理开始向持续内部第三方访问推进。** Anthropic 不再只谈发布前外部 eval，而是承诺 embedded evaluator；OpenAI CEO 立即表示跟进。

再叠加 DeepSeek 9 月 11 日撤回强制 endpoint 迁移，这几天可以概括成一个共同问题：

> **模型和 Agent 越来越强之后，竞争不再只是“谁的 checkpoint 分数最高”，而是谁控制运行时、计费边界、endpoint 语义、第三方监督与用户选择权。**

这是本轮最值得留在《大模型纪事》里的主线。
