# 2026-09-12 增量研究包：GPT-Rosalind 全球 trusted access 与 Runway closed-weight licensing

> 检查窗口：约 2026-09-11 至 2026-09-12。  
> 本包处理两种不同的“模型可得性”变化：一项有明确的官方 2026-09-11 更新日期；另一项的产品事实已有官方页面，但精确上线日仍需保留证据边界。

## 结论

本轮有两项值得进入《大模型纪事》的模型访问 / 分发政策变化：

1. **OpenAI 于 2026-09-11 将 GPT-Rosalind 从 research preview 转为面向全球 eligible organizations 的 trusted-access 可用状态，并首次公布正式 API 价格，计费将于 2026-10-05 生效。** 这不是一个新的 Rosalind checkpoint 发布，而是专用前沿模型从免费/预览阶段进入受治理商业访问阶段。
2. **Runway 已公开企业 Model Licensing 计划，直接交付 closed frontier model weights、checkpoints、training script，并允许客户在自有 cloud / data center / fully on-prem 环境 fine-tune、自托管和商业化。** 官方页面可直接确认产品条款；但官方页面本身没有显示发布日期。本轮检索到的同期二手记录把开放日期标为 2026-09-11，因此“计划内容”可给 A 级事实，而“9 月 11 日首次上线”暂只给 B 级日期判断，后续若 Runway 发布带日期公告应升级。

两件事放在同一窗口具有一组很有用的对照：

> **前沿模型的商业化不只剩“开放 API / 不开放 API”两种状态。2026 年正在出现 trusted access、closed-weight license、on-prem self-host、持续自动升级到系列最新模型等更细的访问制度。**

---

# 事件一：GPT-Rosalind 退出 research preview，进入全球 trusted-access 商业阶段

## 准确日期

**2026-09-11。**

OpenAI 在 4 月 16 日的 GPT-Rosalind 首发页和 6 月 3 日的能力更新页上均增加了同一条明确日期更新：

- GPT-Rosalind “coming out of research preview”；
- 现在通过 trusted-access program 向全球 eligible organizations 提供；
- eligible organizations 后续会继续获得最新 Rosalind models；
- published pricing 于 **2026-10-05** 生效。

一手来源：

- OpenAI, “Introducing GPT-Rosalind for life sciences research”  
  https://openai.com/index/introducing-gpt-rosalind/
- OpenAI, “Introducing new capabilities to GPT-Rosalind”  
  https://openai.com/index/introducing-new-capabilities-to-gpt-rosalind/
- OpenAI API Pricing  
  https://developers.openai.com/api/docs/pricing

## 核心事实

### 1. 这是 access / lifecycle / pricing 变化，不是 9 月 11 日新 checkpoint

GPT-Rosalind 系列本身于 **2026-04-16** 首次发布，6 月 3 日又发布过能力更新。因此 9 月 11 日不能写成：

> “OpenAI 发布 GPT-Rosalind。”

准确写法应是：

> **GPT-Rosalind 于 9 月 11 日退出 research preview，并把 trusted-access availability 扩展为全球 eligible organizations，同时进入已有明确价格、即将正式计费的商业阶段。**

这正是模型史里需要单独保存的 lifecycle 事件：

> release date ≠ access expansion date ≠ billing effective date。

### 2. “全球可用”仍然不等于 general self-service availability

OpenAI 的官方口径仍然是 **trusted access**。

申请机构需要经过 qualification / safety review。4 月首发页给出的核心资格原则包括：

- beneficial scientific use；
- strong governance and safety oversight；
- controlled access with enterprise-grade security。

当前 Deployment Safety Hub 还明确写到：

- 仅 approved customers 可访问；
- non-government applicants 还会经过 business verification 与 compliance screening；
- 组织需要限制到有 legitimate need 的 authorized users，并实施 least-privilege、onboarding 和 insider-risk controls。

因此不能写：

> “GPT-Rosalind 已向全球所有 API 用户开放。”

正确理解是：

> **地域范围从早期受限 / preview 扩大到全球 eligible organizations，但准入仍是组织级、用途级和安全治理级审核。**

一手安全来源：

- OpenAI Deployment Safety Hub, GPT-Rosalind-5.5 System Card  
  https://deploymentsafety.openai.com/gpt-rosalind-5-5

### 3. 正式价格已经公布，但 9 月 11 日尚未开始收费

OpenAI API Pricing 当前列出：

| Model | Input / 1M | Cached input / 1M | Output / 1M |
|---|---:|---:|---:|
| `gpt-rosalind-research` | $5.00 | $0.50 | $25.00 |

同时官方明确：

- **billing begins 2026-10-05**；
- cache-write pricing 不适用于该模型；
- access 限于 trusted-access program 批准的 internal research；
- eligible organizations 将继续获得后续最新 GPT-Rosalind models。

因此历史表中应拆开：

- **9 月 11 日：价格公布 / preview 结束 / 全球 trusted access；**
- **10 月 5 日：计费计划正式生效。**

在 10 月 5 日前不能提前写“已经开始按 $5/$25 收费”。

### 4. Access surfaces 没有变成单一 API 产品

OpenAI 首发页当前仍把 GPT-Rosalind 描述为可通过：

- ChatGPT；
- Codex；
- API

向 qualified / eligible customers 提供。

这说明专用科学模型的商业形态是：

> **同一 gated model family 横跨 chat、coding/agent surface 与 API，而不是单独作为一个裸 endpoint。**

### 5. “最新 Rosalind models 自动进入 eligible organizations”值得单独记录

9 月 11 日更新写明：

> 所有 eligible organizations 将继续获得最新 Rosalind models as they’re released。

这与传统逐型号重新申请访问有区别。它更像：

> **访问资格附着在受治理的 model family / program，而不是只附着在一个静态 checkpoint。**

这会影响以后记录高风险 / 专用模型时的谱系方式：

- checkpoint release；
- trusted-access program；
- organization eligibility；
- subsequent model upgrade

需要拆成不同层次。

## 社区 / 独立评价

### 公共使用者评价仍然非常稀疏

由于 GPT-Rosalind 仍是 gated trusted-access product，本轮没有找到足够规模、可交叉验证的公开开发者 / 研究者社区评价，不能为了满足“社区评价”字段而制造一个不存在的共识。

OpenAI 页面列出 Amgen、Moderna、Allen Institute、Thermo Fisher Scientific、Novo Nordisk 等合作 / 客户组织，并有具名 testimonial；这些足以证明 OpenAI 有真实组织合作，但仍属于**厂商页面上的 customer evidence**，不能当成独立 ROI audit 或 broad production reliability evidence。

同期二手整理也确认了 9 月 11 日的 status / pricing 变化，但本包不把低权重二手文章提升为独立效果验证。

二手参考：

- JLS, AI news 2026-09-11  
  https://www.jls42.org/en/news/ia-actualites-11-sep-2026

## 证据等级

- **A：9 月 11 日退出 research preview、全球 eligible organizations trusted access、后续系列最新模型继续可得。** OpenAI 官方明确日期更新。
- **A：价格表与 10 月 5 日计费生效日。** OpenAI API Pricing 官方文件。
- **A：准入仍需 trusted access / organization-level governance。** OpenAI launch page + Deployment Safety Hub。
- **B / B-：公开客户实际获得多少生产效率 / ROI。** 目前主要来自 OpenAI 客户案例和 testimonial，缺少独立审计。
- **C / insufficient：广泛社区使用体验。** 公开样本不足，不下结论。

## 与最近 30 天模型 / 产品竞争的关系

9 月的模型竞争越来越明显地出现**访问制度分层**：

- GPT-6 Astra 等通用前沿模型按公开 / 受限能力边界管理；
- GPT-Rosalind 作为高敏感生命科学专用模型采用 organization-level trusted access；
- Anthropic 对高风险访问、地区与身份验证加强控制；
- 同期普通 coding / chat 模型则继续价格、速度和默认模型竞争。

因此“一个模型有没有发布”已经不足以描述市场状态。还必须问：

> **谁可以访问、以什么组织身份访问、用于什么场景、何时开始计费、升级资格附着在哪一层。**

## 建议写入位置

- `编年/2026/09.md`：9 月 11 日 access / pricing lifecycle 节点；
- `纪传/本纪/OpenAI.md`：专用科学模型商业化与分级访问；
- 生命科学 / 科学 Agent 相关专题（若仓库已有对应志）；
- 模型发布 / 可用性表：把“首次发布”“退出 preview”“billing begins”拆成独立日期；
- 安全 / access governance 表：trusted-access program 作为 model-family access policy。

## 是否需要修订已有条目

如果现有 GPT-Rosalind 条目仍写“research preview”或“美国 qualified Enterprise customers 起步”，需要增加 9 月 11 日状态更新，不能让旧 launch-state 被误当成当前状态。

## 当前不能推出

不能写成：

- GPT-Rosalind 已经向所有全球用户一般开放；
- 9 月 11 日发布了一个全新 Rosalind checkpoint；
- 9 月 11 日已经开始按新价格收费；
- 所有 eligible organizations 可把 API 用于任意 customer-facing commercial application；
- OpenAI 客户 testimonial 已证明可重复 ROI；
- GPT-Rosalind 的独立 benchmark 已全面验证官方性能主张。

---

# 事件二：Runway Model Licensing——closed frontier weights 进入企业商业授权

## 日期边界

**产品事实：本轮可直接由 Runway 官方页面确认。**

**精确首次公开日期：暂记 2026-09-11（B 级）。**

理由：

- 本轮检索到的同期二手记录在 9 月 11 日明确把它作为当日新事件；
- Runway 官方 `Model Licensing` 页面目前已公开并可提交商业评估申请；
- 但该官方页面自身没有 publication date / changelog timestamp。

因此正文若立即落表，建议写成：

> **2026-09-11 前后——Runway 公开 Model Licensing 企业计划；官方页面已确认产品内容，首次上线精确日期待带时间戳的一手公告进一步锁定。**

不要把二手文章日期冒充 Runway 官方发布日期。

官方来源：

- Runway, Model Licensing  
  https://runway.com/model-licensing

同期二手时间定位：

- JLS, AI news 2026-09-11  
  https://www.jls42.org/en/news/ia-actualites-11-sep-2026

## 核心事实

### 1. 这不是普通 API enterprise plan，而是直接交付完整模型权重

Runway 官方页面明确写：

- complete model weights；
- checkpoints；
- training script；
- packaged delivery into customer codebase；
- forward-deployed researchers。

客户可以：

- 在自己的 data 上 fine-tune；
- 自己控制版本、行为与输出；
- 在自己的 cloud、data center 或 fully on-prem 运行；
- 将基于模型构建的产品商业化。

政府场景页面还明确把 controlled / air-gapped environments 作为 use case。

这与“通过 API 调用闭源模型”是完全不同的控制权结构。

### 2. closed-weight licensing ≠ open weights

Runway 自己把这条产品线与 open weights 明确区分：

- 权重不是面向公众自由下载；
- 是年度商业 license；
- 有企业资格、合同、服务与 researcher support；
- 官方甚至直接把 open source 描述为较弱 base（这一点属于厂商营销主张，不应写成事实判断）。

因此最准确的分类不是：

> “Runway 开源了模型。”

而是：

> **Runway 开始把闭源前沿模型的权重控制权以商业许可方式交给特定企业。**

### 3. 商业模式从 token/API usage 延伸到 annual model license

Runway 页面直接对照：

- Runway Dev：usage-based API；
- Runway License：annual license / predictable economics / own infrastructure / full version control。

这说明前沿模型商业化又多出一种重要形态：

> **API rent → enterprise weight license + customer-owned inference infrastructure。**

它尤其适合：

- 稳定高 volume；
- 数据不能离开企业网络；
- 需要自有 GPU / air-gap；
- 需要 proprietary fine-tuning；
- 希望固定模型版本和运行环境。

但这些只是适用条件，不等于已经证明比 API 更便宜。

### 4. 没有公开 license price，也没有公开 production ROI 审计

官方页面只写 annual license / predictable economics，没有公开具体价格。

当前不能推出：

- 单位推理成本一定低于 Runway Dev / 第三方 API；
- 客户已大规模迁移到 licensed weights；
- licensed deployment 已证明与 Runway hosted service 同等可靠；
- 企业得到模型知识产权所有权。

页面中的 `Own and customize the model` 属于商业产品语言；法律上更精确的事实是**获得合同约定的权重与使用/定制/部署控制权**，不是自动取得 underlying IP ownership。

## 社区 / 独立评价

目前公共社区评价仍太少，不足以形成“使用者共识”。

真正值得留档的是产品类别变化本身：闭源 frontier model 不再只有 hosted API；企业可以在不等于开源的前提下获得完整权重和自托管控制权。

这会让以后讨论“开放 / 封闭”时至少分成：

> **public open weights → commercial closed-weight license → trusted-access hosted model → general hosted API。**

## 证据等级

- **A：Runway 当前确实提供 Model Licensing，且官方承诺交付 complete weights / checkpoints / training script、自托管与商业化能力。**
- **A：annual license 与 API usage 模式是官方并列产品。**
- **B：首次公开日期为 2026-09-11。** 当前日期主要依赖同期二手记录，官方页面无日期。
- **C / insufficient：客户规模、实际单任务成本、长期可靠性和 ROI。** 没有公开足够证据。

## 与最近 30 天竞争的关系

近月模型竞争正在同时沿两个方向扩展：

1. **orchestration 方向**：Fugu / HydraFusion / Agents API 把 router、harness、runtime 变成竞争单位；
2. **control / deployment 方向**：Hugging Face 所有权、trusted-access program、Runway closed-weight licensing 等让“谁控制模型运行环境”本身成为产品。

因此以后模型表不能只有：

> 参数 / benchmark / token price

还应增加：

> **access regime / weight availability / self-host right / upgrade policy / infrastructure control。**

## 建议写入位置

- `编年/2026/09.md`：9 月 11 日附近的模型分发政策节点（日期保留 B 级标注）；
- 开源 / 模型分发与控制权相关志；
- Runway 纪传（若已有）；
- 模型访问 / 部署方式对照表：新增 commercial closed-weight license 类别；
- Agent / physical-AI 专题：World Action Model 可作为 licensed policy backbone 的官方 use case，但不能写成已广泛生产部署。

## 是否需要修订已有条目

如果仓库把模型分发方式只写成“open weights vs proprietary API”，需要补一个中间类别：

> **proprietary / closed weights under enterprise license。**

这与 Hugging Face / open-weight movement 不是同一件事。

## 当前不能推出

不能写成：

- Runway 开源了模型权重；
- 9 月 11 日日期已有 Runway 官方时间戳完全确认；
- license 客户获得模型 IP 所有权；
- self-host 一定比 API 更便宜；
- air-gapped / on-prem 已有大规模客户生产成功证据；
- 模型权重交付意味着训练数据、完整训练代码或原始数据一起开放。

---

# 本轮综合历史判断

9 月 11 日附近出现了三种值得并列观察的模型商业化形态：

- **Fugu**：把 multi-model orchestration 包装成一个 model-like API SKU；
- **GPT-Rosalind**：把专用高敏感模型从 research preview 推进到全球 organization-level trusted access，并建立正式计费；
- **Runway Model Licensing**：把 closed frontier weights 直接以企业许可交付到客户自己的基础设施。

因此 2026 年的“模型发布史”不能只回答：

> **模型什么时候出现？**

还必须回答：

> **模型以什么制度被交付？谁拥有运行权？谁能拿到权重？谁能升级？谁承担基础设施？价格按 token、runtime，还是年度权重许可计算？**

这不是对 benchmark 史的替代，而是模型从研究对象变成产业基础设施之后必须增加的另一条时间线。
