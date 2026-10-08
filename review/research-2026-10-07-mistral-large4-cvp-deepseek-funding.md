# 2026-10-07 增量研究包：Mistral Large 4、Anthropic CVP 分级与 DeepSeek 新融资

> 检查窗口：约 2026-10-06—2026-10-07。  
> 原则：区分正式发布、preview、未来开放权重；区分厂商自测、独立 benchmark 与生产可靠性；融资报道在公司正式确认前降级处理。

## 结论

本轮有三项值得留档：

1. **Mistral Large 4 于 10 月 6 日进入 Public Preview**，是 Mistral 约五个月来的首个主要通用模型发布；API 已可用，但权重尚未公开，计划 10 月 27 日开放。
2. **Anthropic 扩大 Cyber Verification Program（CVP）**，把高级 cyber capability 的访问正式拆成 Defense / Red Team / Specialized 三层，并把 Opus 5.5、Sonnet 5.5、Mythos 5.1 及未来模型纳入分级访问框架。
3. **DeepSeek 新一轮融资据 Reuters 报道已进入 800亿—1000亿元人民币量级**，目标估值约 5000 亿元，腾讯与宁德时代被报道为主要投资者之一；公司与投资方尚未公开确认，因此只能作为 B 级资本事件记录。

---

# 一、Mistral Large 4：1T 级 MoE 进入 Public Preview

## 日期与可用性

- **2026-10-06**：Mistral 官方 changelog 将 `mistral-large-4` 标为 MODEL RELEASED / Public Preview。
- 当前 API / Mistral 平台已经可调用。
- **开放权重尚未发布**；Mistral 对 Reuters 表示计划 **2026-10-27** 完全公开。

因此应把两个节点分开：

> 10/6 = checkpoint / API preview availability；10/27（若如期发生）= weights availability。

不能因为官方把它称为 open-weight model，就把 10 月 6 日写成“权重已经可下载”。

## 核心规格

Mistral 官方模型文档列出：

- general-purpose multimodal；
- granular Mixture-of-Experts；
- **1.05T total parameters**；
- 官方页面当前列出约 **49B active parameters**；
- **1.6B vision encoder**；
- **1M context**；
- Structured Outputs、Function Calling、Document QnA、Agents & Conversations、Built-In Tools 等接口能力。

Launch pricing 为两周 50% 折扣：

- input：**$0.68 / M tokens**（常规价 $1.36）；
- cached input：**$0.07 / M tokens**（常规价 $0.14）；
- output：**$2.09 / M tokens**（常规价 $4.18）。

### 一手来源

- Mistral Docs Changelog: https://docs.mistral.ai/resources/changelogs
- Mistral Large 4 model card: https://docs.mistral.ai/models/mistral-large-4-0
- Mistral Legal Center model documentation: https://legal.mistral.ai/

## 独立评价与证据边界

Reuters 报道 Mistral 将其定位为欧洲对美国、中国模型竞争的主要开放权重候选，并称其在部分 cyber 任务超过一些中国 open-weight models；但 CEO 在最初公开表述中没有给出具体竞争型号或完整 benchmark harness。

Artificial Analysis 的首日独立结果给 Mistral Large 4 约 **38** 的 Intelligence Index，并报告 Cyber Index 约 **50%**。这一结果把它放在 GPT-6 Luna / DeepSeek V4.1 Flash 一带，而不是 closed-frontier 顶端。

这意味着目前最稳妥的表述是：

> Mistral Large 4 显著恢复了 Mistral 在主要 open-weight general model 竞争中的存在感；但“超过中国开放模型”只能按任务和 benchmark 分项讨论，不能写成总体领先。

## 证据等级

- 型号、日期、规格、API 价格：**A（官方文档）**。
- 10/27 开放权重计划：**A-/B+（Mistral 对 Reuters 的正式表述，但事件尚未发生）**。
- Artificial Analysis 首日结果：**B+（独立 benchmark）**。
- “超过中国模型”总体性说法：**C+/B-（厂商竞争性表述，必须限定任务）**。

## 30 天竞争格局

9 月末到 10 月初 open-weight / open-model 竞争连续出现：DeepSeek V4.1 Flash、GLM 5.3、Reflection Beam，以及现在的 Mistral Large 4。

Large 4 的竞争意义不只在 intelligence score，而在：

> **欧洲来源 + 1T 级 sparse MoE + multimodal + 1M context + Agent/tool API + 未来本地权重部署**。

因此月底比较应至少拆成：

`checkpoint × active/total params × context × multimodality × tool/agent support × API price × weights actual availability × license × independent score × deployment control`。

## 建议写入

- `编年/2026/10.md`：10 月 6 日新模型节点；
- 模型竞争相关志 / 表；
- 开放权重与部署控制权相关表。

## 不能推出

- 不能写成 10 月 6 日权重已公开；
- 不能把厂商 cyber claim 写成跨任务总体领先；
- Public Preview 不能等同长期生产可靠性；
- 首日 Artificial Analysis 不能替代多 harness、长期生产评价。

---

# 二、Anthropic 扩大 Cyber Verification Program：模型访问正式分级

## 日期

**2026-10-06。**

## 核心事实

Anthropic 把过去六个月运行的 Project Glasswing 与原 Cyber Verification Program 整合成新的三层 CVP：

1. **Defense Access**：面向 SOC、incident response、malware analysis、漏洞分析等防御任务；
2. **Red Team Access**：增加经授权的 penetration testing / red-team 工作；
3. **Specialized Access**：面向可能影响生命、市场或关键基础设施的高敏感系统测试，审核最严格。

每层均可涉及 Claude Opus 5.5、Sonnet 5.5、Mythos 5.1，以及未来新模型，但 verification、controls 与 blocking level 不同。

Anthropic 明确表示：

- Red Team tier 仍会阻止可能造成 physical harm / mass disruption 的部分行为；
- Specialized tier 的组织目前由 Anthropic 与美国政府合作深入审核；
- 项目通常要求 data retention 以便监控 misuse；
- Enterprise Frontier Safeguards 计划稍后提供由客户控制云基础设施的数据保存方式；
- CVP 可通过 Claude Platform、Google Vertex AI、Microsoft Foundry 使用；Amazon Bedrock 仅对符合 Enterprise Frontier Safeguards 条件的客户开放。

### 一手来源

Anthropic, “Expanding the Cyber Verification Program”, 2026-10-06:  
https://www.anthropic.com/news/cyber-verification-program

## 官方评测

Anthropic 使用 CyScenarioBench 对 Opus 5.5 做 10 个 challenge × 每项 5 次测试：

- 无 CVP：50/50 在第一条 prompt 被阻止；
- Defense：46/50 在某阶段被阻止，4 项成功；
- Red Team：没有 blocking，34/50 完成；
- Anthropic 称无 safeguards 的 baseline success rate 为 67.6%，与 Red Team 的 34/50 接近。

这些数字是**厂商自测 access-control efficacy**，不是独立 benchmark。

## Glasswing 生产/项目数据

Anthropic 称：

- 4—7 月 partner 至少发现 **129,000 个 verified software vulnerabilities**；
- Anthropic 自己 4—10 月 open-source scanning 又发现 **5,500**；
- 超过 **33,000** 已被评为 critical/high severity。

但官方同时承认数据来自部分 partner survey（33 份 partner reports），triage 方法不同，少于一半 partner 披露 patch counts。因此这些数据能证明大规模实际使用与发现活动，但不能直接推出统一 patch rate、净风险下降或 ROI。

Reuters 对项目扩张和上述数字进行了独立报道。

## 证据等级

- 政策 / tier / access / model list：**A（Anthropic 官方）**；
- CyScenarioBench tier test：**A-（官方实验，不是独立复现）**；
- 129k / 5.5k / 33k 项目统计：**A-/B+（官方项目统计，存在明确样本和 reporting 限制）**；
- Reuters 对政策变化的确认：**B+ 独立报道**。

## 历史意义

这不是普通 safeguard 微调，而是把 frontier capability access 变成正式产品治理层：

> **same model × verified identity/organization × authorized task class × safeguard level × data-retention requirement × cloud surface**。

也就是说，未来“某模型能不能做某任务”越来越不能只由 model ID 回答，还要记录 access tier 与组织资格。

它与 9 月以来的 frontier access 分级、Agent identity / credential、incident governance 是同一条制度史。

## 建议写入

- `编年/2026/10.md`；
- 安全政策 / frontier safeguards 相关志；
- Agent 身份权限与凭据治理志；
- 模型访问分级表。

## 不能推出

- 不能说普通 Claude 用户获得了 unrestricted cyber capability；
- 不能把 129k vulnerability findings 等同 129k 已修复漏洞；
- 不能把官方 tier benchmark 当成独立生产可靠性结论；
- Specialized Access 的政府协作审核不能外推成政府对每次模型输出的实时审批。

---

# 三、DeepSeek 新一轮巨额融资：资本结构开始改变部署竞争

## 日期

**2026-10-06—07 报道窗口。**

## 核心事实

Reuters 10 月 6 日援引消息人士报道，DeepSeek 正推进新一轮融资：

- 至少约 **800 亿元人民币（约 119 亿美元）**；
- 可能达到 **1000 亿元人民币**；
- 目标估值约 **5000 亿元人民币（约 740 亿美元）**；
- 腾讯与宁德时代被报道为主要参与者之一；
- 资金用途包括继续扩张并为潜在国内 IPO 做准备。

Reuters 同时指出 DeepSeek、腾讯及相关投资者未立即回应确认请求。

### 独立来源

Reuters, 2026-10-06:  
https://www.reuters.com/world/asia-pacific/deepseek-raise-least-12-billion-tencent-backed-funding-bloomberg-news-reports-2026-10-06/

## 证据等级

**B：高质量独立报道 / 消息人士，尚缺公司或监管文件确认。**

因此仓库必须使用：

> “据 Reuters / 消息人士报道，DeepSeek 正推进……”

而不是：

> “DeepSeek 已完成 1000 亿元融资”。

## 为什么值得留档

如果按报道规模完成，这将显著改变 DeepSeek 的资本与基础设施约束，并与其近期 Huawei Ascend 工具链、V4.1 Flash、潜在 IPO 路线形成同一产业结构线。

这里的历史意义不是“估值变高”，而是：

> open/open-weight frontier competition 开始与本土芯片生态、长期训练资本、云/部署控制和 IPO 融资能力更紧密绑定。

## 建议写入

目前先进入 review 研究包与公司 / 资本变化表；在融资正式 close、公司公告或监管文件出现前，不建议作为已完成事件写入最高等级大事年表。

## 不能推出

- 不能写成融资已经完成；
- 不能写成最终金额必为 800 亿或 1000 亿元；
- 不能据此推断 IPO 日期已经确定；
- 不能从投资者名单直接推断未来模型训练使用哪家芯片或云。

---

# 本轮总体判断

本轮没有再确认 OpenAI、Google DeepMind、xAI、Meta、Qwen、Kimi、GLM、MiniMax 等主要厂商在检查窗口内发布另一个新的主要通用 checkpoint。

10 月 6—7 日最值得保存的结构变化是三条不同层次同时发生：

> **Mistral Large 4：模型竞争与开放权重 availability；**  
> **Anthropic CVP：能力访问从 model-level 变成 identity/task-tier-level；**  
> **DeepSeek 融资：frontier/open-model 竞争继续资本化与基础设施化。**

三者共同说明，2026 年后期的模型竞争已经不能只写“谁 benchmark 更高”，而必须同时追踪：

`model capability × actual availability × access governance × deployment control × capital/infrastructure`。
