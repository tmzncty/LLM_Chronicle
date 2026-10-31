# 2026-10-30 增量研究包：Mistral Large 4 开放权重与 OpenAI Model Spec 更新

> 事件实际发生日期：2026-10-29
> 扫描窗口：截至 2026-10-30 约 24 小时
> 主题：open-weight / agentic coding / cybersecurity / sovereign AI / 模型行为治理 / agency / human intent

## 1. 结论

本轮有两个达到入库门槛的实质变化：

1. Mistral AI 于 10 月 29 日兑现 10 月 6 日 Public Preview 时的承诺，正式发布改进版 Mistral Large 4（Le Chonk）权重。它不是简单把 Preview 原样下载化：三周额外 RL 后，coding、cybersecurity、reasoning efficiency、reasoning modes、价格和部署状态均发生变化。事件状态应从 `public preview + planned weights` 更新为 `improved checkpoint + downloadable open weights + hosted/API/cloud availability`。
2. OpenAI 于 10 月 29 日发布新版 Model Spec，围绕五项核心价值重构模型行为规范，并新增 context、oversight、agency 等指导，更新 chain of command，调整行为 defaults，退役大部分详细 style guidance。它是“期望模型如何行为”的规范更新，而不是证明当前所有 OpenAI 模型已经完全实现这些行为。

本轮没有确认最近约 24 小时内另一个主要厂商正式发布同等级的新通用 frontier checkpoint。

---

## 2. Mistral Large 4：从 Preview 到实际开放权重

### 2.1 准确日期与状态变化

Mistral Large 4 最初于 2026-10-06 进入 public preview，仓库已有研究包记录，并明确标注当时权重尚未发布、承诺月底开放。

2026-10-29，Mistral 正式发布**经过三周额外 reinforcement learning 的改进版权重**。因此这次事件不是重复记录 10 月 6 日的模型 announcement，而是一个独立、可验证的 availability / checkpoint / licensing / deployment transition。

当前可用路径包括：

- Mistral Studio；
- Mistral API，model id `mistral-large-4`；
- OpenRouter；
- Hugging Face 下载权重并使用 vLLM / SGLang 自托管；
- NVIDIA hosted endpoints / NIM；
- Microsoft Foundry private deployment；
- Mistral Vibe Code。

### 2.2 模型与许可证

官方模型卡给出的核心规格：

- 约 1.05T total parameters / 52B active；
- granular MoE：128 routed experts、每 token 激活 4 个，另有 1 shared expert；
- 1M context；
- text + image input，text output；
- function calling、JSON output、strict JSON schema；
- `low / medium / high` 三档 reasoning effort，high 为默认；
- checkpoint 内含 DSpark speculative-decoding draft head；
- 同时提供面向 Blackwell 的 NVFP4 checkpoint。

许可证为 **Mistral Ecosystem Open-Weight License (MEOW)**，是 modified MIT license。允许使用、修改、fine-tune 与一般商业化，但经营 Model-as-a-Service 的企业需要另行取得 Mistral commercial license。因此应写 **open-weight**，不能无条件等同 OSI open source / unrestricted commercial license。

### 2.3 API 价格变化

从 10 月 29 日起官方价格为：

- input：$0.70 / 1M tokens；
- cached input：$0.07 / 1M；
- output：$2.10 / 1M。

相较 Preview 阶段约 $1.36 / $4.18 的标价，正式开放版本的 hosted price 约减半。由于模型本身同时降低了 agentic task 的输出 token 消耗，真实 task-cost 变化应同时看 token price 与 tokens/task，而不能只比较 list price。

### 2.4 官方与独立 benchmark

Mistral 官方披露：

- Cognition private FrontierCode 2.0：19.7%；
- Artificial Analysis Coding Agent Index：48%，与领先 open-weight 模型接近，同时宣称每任务 token 少 47%；
- Terminal-Bench 4.0：41%，比 Preview 提高 13 个百分点，output tokens 减少 30%；
- Artificial Analysis Cyber Index：51%；
- B3 Agent Security Benchmark attack resistance：97.1%，Preview 为 93.3%；
- 对恶意 cyber requests 的平均 refusal rate：96.6%。

这些数字不能全部归为同一证据等级：Cognition private benchmark、Mistral 自己汇总的安全/拒答测试仍属于厂商或合作方证据；Artificial Analysis 的公开结果则可作为独立 benchmark，但仍受 harness、reasoning effort 和 agent scaffold 影响。

Artificial Analysis 首日公开评价提供了更完整的横向边界：

- Intelligence Index v5：ML4 high 约 26；高于其他非中国开发的 open-weight 模型，但仍落后 DeepSeek V4.1 Flash 1017、GLM-5.3 等领先中国 open-weight 模型；
- Coding Agent Index：ML4 + Mistral Vibe 约 48，接近 GLM-5.3 + OpenCode 约 49，但 ML4 每任务 token 使用明显更少；
- Cyber Index：约 51，仍低于 DeepSeek V4.1 Flash 1017（约 57）和 MiMo-V2.6-Pro（约 56）；
- AA-Omniscience v1.1 hallucination rate：约 28%，比 Preview 约 41% 明显下降，但 accuracy 仍不高。

因此可以写“ML4 正式开放版本在 coding / token efficiency 上进入 open-weight 第一梯队，并成为非中国 open-weight 模型的重要竞争者”，不能写“全面击败中国开放模型”或“总体最强开放模型”。

### 2.5 真实采用与 cyber 边界

Mistral 公布 Booz Allen、Cisco、Cloudflare、CrowdStrike、Elastic、ENISA、Orange Cyberdefense、Rubrik、Zscaler 等合作/测试陈述。这里需要严格分层：

- 多家机构确实已进行 evaluation / integration / design-partner testing；
- Elastic 表示已经针对真实 cyber workloads 做过评估；
- ENISA 表示正在测试 ML4 用于漏洞、代码审计和 defensive logs；
- Orange Cyberdefense 获得 specialized cyber variant 的 preview access；该 variant 覆盖 penetration testing、vulnerability assessment、red-teaming，并受 vetting、contractual safeguards 与授权系统范围限制。

这些可以证明实际测试和部分产品集成存在，但不能推出大规模生产 adoption、统一 ROI 或 cyber reliability SLA。

Mistral 还明确承认：Preview 期间 live traffic 中模型会拒绝针对 live targets 的 black-box attacks，但公司仍看到模型可能提升真实攻击能力，因此正在继续修改 guardrails。这个披露尤其重要，因为开放权重之后 hosted guardrail 与 downloadable checkpoint 的治理能力不再等价。

### 2.6 历史意义

这次事件把 10 月 6 日的承诺真正变成 artifact：

`public preview → additional RL → improved checkpoint → open weights → self-host / fine-tune / quantize → independent ecosystem`

同时形成另一条值得长期跟踪的 cyber 治理分叉：

`general open weights + hosted guardrails` 与 `vetted specialized cyber variant + contractual safeguards`

开放模型竞争也越来越不能只比较 intelligence score，而应同时比较：

`capability × tokens/task × API price × downloadable artifact × license × self-host cost × safety boundary × deployment control`

---

## 3. OpenAI：Model Spec 围绕 human intent / agency 重构

### 3.1 事件

OpenAI 于 2026-10-29 更新公开 Model Spec，将规范重新组织为五项核心价值：

1. faithfulness to human intent；
2. harm minimization；
3. honesty and transparency；
4. human agency；
5. care。

官方说明这不只是目录整理：新版新增 context、oversight、agency 相关指导，更新 chain of command，加入 supporting human agency、following relevant social norms、controlling and communicating side effects 等 defaults，并退役大部分详细 style guidance。

Reuters 10 月 29 日独立确认了此次 Model Spec 更新及其以 human intent 为中心的重构。

### 3.2 对实际模型行为规则的意义

新版强调“faithfulness to human intent”并不等于 literal instruction following。模型应利用 conversation、memory 和其他 contextual evidence 理解用户意图，但应让重要假设可见、可纠正；同时不能以“更懂用户”为理由暗中 steering 或覆盖用户选择。

OpenAI 也明确重申 instruction hierarchy：OpenAI 设置边界，developers 在边界内指导应用，users 再在这些约束下指导模型。

style governance 则明显退潮：大部分详细 style guidance 被移除，理由是风格应更多根据 aggregate preferences、语言文化、个人偏好、用户反馈和上下文适配；仍保留诸如客观处理问题等较强 defaults。

这使 Model Spec 的治理重点从大量表层输出规则进一步转向：

`instruction hierarchy → inferred intent → contextual evidence → agency → side effects → oversight / transparency`

### 3.3 必须保留的证据边界

OpenAI 自己明确写道：**Model Spec 描述的是正在努力实现的目标行为，现有模型尚未完全反映它。**

因此本事件只能证明：

- OpenAI 的公开行为规范在 10 月 29 日发生实质更新；
- 公司宣布正在探索新的训练方法，让模型学习这些价值和原则；
- 未来产品行为可能据此调整。

不能据此推出：

- ChatGPT / API 所有模型在 10 月 29 日同步切换到完全一致的新行为；
- 某个具体模型已经可靠实现 human-intent inference；
- 新 Spec 已经解决 sycophancy、overreach、memory inference、agency 或 oversight 问题；
- style guidance 退役意味着用户可以覆盖所有 safety / objectivity defaults。

社区和开发者层面的真实行为变化目前还缺足够稳定样本，应在后续观察具体模型版本、system behavior、developer reports 与可重复测试后补记。

### 3.4 与最近 Agent 治理主线的关系

10 月 OpenAI 已连续出现：monitor tampering incident disclosure、frontier-training containment、跨 provider policy portability、router/gateway approval、frontier misalignment monitoring 扩展等事件。新版 Model Spec 则补上“Agent 应如何理解和执行人的意图”的规范层。

因此治理栈可以进一步拆成：

`behavioral spec → instruction hierarchy → intent/context interpretation → permission boundary → runtime monitor → containment → audit / enforcement`

其中 Model Spec 解决的是 normative target；monitor、permissions、sandbox 与 enforcement 解决的是模型偏离目标时的工程控制。二者不能互相替代。

---

## 4. 证据等级

### A：官方直接确认

- Mistral 10 月 29 日发布改进版 ML4 权重、MEOW license、API 价格与多种部署路径；
- Hugging Face 官方模型卡实际存在，可下载并提供 vLLM/SGLang/Transformers/llama.cpp 等路径；
- OpenAI 10 月 29 日更新 Model Spec，五项价值、新增/退役章节与“当前模型尚未完全实现”的边界。

### A-/B+：独立 benchmark / 独立报道

- Artificial Analysis 对正式 ML4 checkpoint 的 Intelligence、Coding Agent、Cyber、Omniscience 评价；
- Reuters 对 OpenAI Model Spec 更新的独立确认。

### B：厂商 benchmark / design-partner evidence

- Mistral 汇总的 FrontierCode、Terminal-Bench、安全拒答与企业 design-partner 测试；
- 合作企业关于自身 workload 的评价。

### C：社区体验

- ML4 权重刚开放约一天，社区量化、部署、fine-tune 已快速出现，但尚不足以形成 production reliability 共识；
- OpenAI 新 Model Spec 更不能仅凭发布后一天的零散体验判断具体产品是否已同步改变。

---

## 5. 与最近 30 天竞争格局的关系

10 月末的竞争已经明显分成至少三层：

- closed frontier：Gemini 4 Carbon、GPT-6 Astra / Sol / Terra、Claude Opus 5.5 等继续竞争绝对能力、Agent reliability 和访问分级；
- open-weight frontier：DeepSeek V4.1 Flash 1017、GLM-5.3、Muse Spark Open、MiniMax M3.1 Flash、Mistral Large 4 等同时竞争能力、价格、token efficiency、license 与 self-hostability；
- governance/runtime：Model Spec、monitoring、sandbox、permission、router approval、identity 与 access tier 正成为模型之外的竞争维度。

ML4 的正式开放说明“preview 时承诺未来开放”必须与“权重 artifact 真正出现”分开记；OpenAI Model Spec 更新则说明模型行为治理正从具体拒答/风格规则转向 intent、agency、context 和 oversight 的高层规范。

---

## 6. 建议写入位置

### Mistral Large 4

- 2026-10 编年：10 月 29 日 ML4 improved weights 正式发布；
- 模型表：更新 availability、price、license、reasoning modes、1M context、52B active；
- Mistral 世家：从 10 月 6 日 Preview 追加 10 月 29 日开放权重节点；
- open-weight / 模型竞争表：与 DeepSeek、GLM、Muse Spark Open、MiniMax 并列比较；
- Agent/coding 志：Coding Agent Index 与 token efficiency；
- cyber / safety 志：general open weights、hosted guardrails 与 vetted specialized cyber variant 的分层。

### OpenAI Model Spec

- 2026-10 编年：10 月 29 日新版 Model Spec；
- OpenAI 世家 / 治理志：五项价值与 chain of command 更新；
- Agent governance：intent/context/agency/side effects/oversight；
- 产品行为观察表：后续验证实际模型是否、何时体现新版 Spec。

---

## 7. 是否需要修订已有条目

- **需要修订 ML4 既有状态**：仓库 10 月 7 日研究包正确记录了 10 月 6 日 public preview 与“月底开放权重”的未来承诺；现在应追加 10 月 29 日承诺兑现，不能覆盖原事件日期。
- OpenAI Model Spec 当前默认分支检索未发现 10 月 29 日新版的既有事件条目，为新增。

---

## 8. 当前不能推出的结论

- 不能把 Mistral Large 4 写成总体最强 open-weight model；
- 不能把 Mistral 自测和 design-partner statements 全部升级成独立生产 benchmark；
- 不能从权重开放推出普通个人硬件可以经济运行 1T MoE；
- 不能把 MEOW license 写成无条件 OSI open source；
- 不能把 hosted cyber guardrails 自动等同于下载权重后的不可绕过安全边界；
- 不能从合作伙伴测试推出大规模生产采用或统一 ROI；
- 不能写 OpenAI 当前所有模型已经完全执行新版 Model Spec；
- 不能从“理解 human intent”推出模型被授权替用户做未获授权的 consequential decisions；
- 不能把 style guidance 退役解释成 safety / objectivity / instruction hierarchy 同时退役。

---

## 9. 来源

### Mistral / open-weight 一手

- Mistral, “Mistral Large 4 (Le Chonk) is now open weight” (2026-10-29): https://mistral.ai/news/mistral-large-4-oss/
- Hugging Face / Mistral official model card: https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B
- Hugging Face, “Welcome Le Chonk: Mistral Large 4 on Hugging Face” (2026-10-29): https://huggingface.co/blog/mistral-large4

### Mistral 独立评价

- Artificial Analysis, Mistral Large 4 launch evaluation / Intelligence Index v5 / Coding Agent Index / Cyber Index (2026-10-29).
- Fortune, “Mistral says its new model, Large 4, is the best open model for agentic coding and cyber defense” (2026-10-29).

### OpenAI Model Spec

- OpenAI, “An updated Model Spec for more capable and beneficial AI” (2026-10-29): https://openai.com/index/updated-model-spec/
- OpenAI Model Spec: https://model-spec.openai.com/
- Reuters, “OpenAI says human intent at center of updated AI model guidelines” (2026-10-29).

---

## 10. 一句话历史判断

2026 年 10 月 29 日同时展示了 frontier AI 的两种“控制权”竞争：Mistral Large 4 把一个经过继续 RL 的 1T MoE checkpoint 真正交给用户下载、修改和自托管，而 OpenAI 则把模型行为规范进一步重构为围绕 human intent、agency、context 与 oversight 的高层治理框架；前者争夺的是**模型 artifact 与部署控制权**，后者争夺的是**模型在越来越自主的行动中应如何理解并服从人的意图**。