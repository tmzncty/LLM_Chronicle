# 2026-09-22 增量研究包：Grok 4.7、MiMo-V2.6、AI 安全对话与推理基础设施

> 检查窗口：以 **2026-09-22 17:57（北京时间）** 为基准，重点检查最近约 24 小时；同时对巡检中发现、上一班漏掉且符合“新模型 / 新型号正式出现即应留档”门槛的 2026-09-20 Qwen-Audio 3.1 Realtime Plus 作补录。
>
> 仓库基线：`main` HEAD = `0021ee5a34e14d493122447132de0fcd680e53c6`，PR #43（2026-09-21 模型自动迁移、Muse 平台阻断与 AI 安全对话）已经合并。开始本轮前已检查最近提交、`编年/2026/09.md`、`表/大事年表.md`、`志/AI产品化演进.md` 与最近 9 月 review 研究包；仓库已有 9 月 21 日中美 AI 对话“已发生、incident line 尚属美方提议”的判断，也已经有 Grok 4.7 的预告性排除说明，但尚未记录 **Grok 4.7 正式发布**、**Xiaomi MiMo-V2.6 正式开放**、**中美 AI 对话在美方披露中升级为 formalized dialogue + 后续深圳会谈**、**OpenAI 对 RSI / 国际标准的新正式立场**、**9 月 22 日 Claude 多旗舰模型故障**，亦未记录 **qwen-audio-3.1-realtime-plus**。

---

## 本轮结论

本轮存在明确需要通知并形成增量研究包的事件，不能 SKIP。

1. **2026-09-21：SpaceXAI / xAI 正式发布 Grok 4.7。** 这不是 Grok 4.6 的 serving alias，而是官方明确称采用“new, larger base model”的新型号；当天即进入 xAI API、Cursor、Grok Build，并开始滚动进入 GitHub Copilot。定价保持 Grok 4.6 的 $2/M input、$6/M output 起步价，500K context，支持 text/image input 与 reasoning effort。第三方 Artificial Analysis 给 xhigh 版 Intelligence Index **46**；Coding Agent Index（Grok Build harness）**56**，较 4.6 xhigh 高 9 分，但 xhigh 模式也显示明显更高 token 消耗、任务成本与 wall time。因此“同 token 单价”不能直接写成“同任务成本”。
2. **2026-09-21（第三方测量 / 首批公开可用）—09-22（小米官方发布文档更新时间）：Xiaomi 发布并开放 MiMo-V2.6-Pro / Flash。** Pro 为约 **1.02T total / 42B active MoE**，Flash 为效率层；两者均给出 1M context、text/image/video/audio 输入、MIT 权重，可自托管。Artificial Analysis 当前给 Pro **46**，在其 open-weight class 中列 #1；Xiaomi 同时开放模型权重、部署方式，并将 V2.6 API 定价保持在 V2.5 水平。它是 9 月开放权重竞争的重要节点，但“AA #1”仍是单一第三方 harness / 当日榜单状态，不能写成所有任务全面最强。
3. **补录 2026-09-20：Alibaba Cloud 正式上线 `qwen-audio-3.1-realtime-plus`。** 这是新的 realtime speech-to-speech SKU，而不是文档重命名：262,144 context、text/audio 双向流、Function Calling、web search、voice cloning，且支持 smart-turn 语义轮次；新加坡与北京均已实际可用。它应补入模型谱系，但性能目前缺少强独立复测。
4. **对 9 月 21 日中美 AI 对话条目作“后续证据升级”，不是推翻。** 中国商务部 / 新华社仍只正式确认双方“就人工智能有关问题举行对话”；但 9 月 21 日 Bessent 对外表示双方已同意建立 formalized USA-China AI Dialogues、约两个月后在深圳继续会谈，并同意设置 AI safety incident line。当前可以把“美方提出”升级为“美方称双方已达成工作层协议”，但因为中方公开文本仍未公布 incident line / protocol 细节，也没有联合文本，不能写成已经生效的国际条约或完整危机热线制度。
5. **2026-09-21：OpenAI 发表《Building standards for the next phase of AI》并形成更明确的 RSI / frontier-governance 立场。** OpenAI 明确称 fully autonomous RSI 目前没有发生，且“在能够安全进行之前不应追求”；主张由美国牵头建立国际 frontier AI 技术标准、统一 measurement / human oversight / incident classification 与 reporting，但又明确反对把这些 standards 等同于模型许可证、强制 prerelease review 或审批。这是政策立场的实质细化，不是已经生效的法律规则。
6. **2026-09-22 00:50—02:10 UTC：Anthropic 多旗舰模型 elevated errors。** Claude Mythos 5.1、Fable 5.1、Opus 5 受影响；官方事件页把 claude.ai、Claude API、Claude Code、Claude Cowork 都列为 affected components。实际影响窗口约 80 分钟，02:35 UTC 才正式将事件标 resolved。它不是 9 月 3 日那种跨厂商同时故障，但值得作为本月 Claude 可靠性连续样本留档。
7. **2026-09-22：Alibaba 在 Apsara Conference 披露下一阶段模型 / 芯片 / 数据中心路线。** Reuters 现场报道称 Alibaba 正在开发 5T—10T 参数级下一模型，并发布 / 展示 Zhenwu V900，官方口径称相对 M890 约 3× performance、单集群目标可扩至 500,000 cards，并提出 2032 年全球数据中心容量 >20GW 的目标。这里必须区分：V900 是当日公开的基础设施产品 / 路线节点；**5T—10T 模型仍是训练 / 研发计划，不是 9 月 22 日已经发布的新 Qwen SKU**；V900 大规模量产与生产效果亦尚待后续验证。

本轮最值得留史的横向变化是：

> **同一天，前沿竞争同时发生在 closed flagship（Grok 4.7）、open-weight frontier（MiMo-V2.6）、realtime voice SKU（Qwen-Audio 3.1）、国际 incident governance、公司 RSI 政策、生产可靠性，以及 chips / data-center capacity 七层。**

这进一步说明 2026 年的“模型竞争”已经不是单一 leaderboard，而是 **intelligence × token/task cost × modality × harness × distribution × reliability × governance × infrastructure ownership** 的组合竞争。

---

# 一、Grok 4.7：正式发布后，xAI 把“低 token 单价”与长程 Agent 能力继续绑定

## 1. 日期与实际可用性

SpaceXAI / xAI 于 **2026-09-21** 正式发布 Grok 4.7：

- 官方定位：coding 与 knowledge work；
- 官方明确称其使用 **new, larger base model than Grok 4.6**；
- RL run 更长，并增加了更困难、部分需要小时级完成的任务；
- 强调 self-verification、long-context management 和 Grok Bot harness 的原生训练；
- 发布当天进入 Cursor 与 Grok Build；
- public xAI API 同日可调用 `grok-4.7`；
- GitHub 于 9 月 21 日单独发布 changelog，确认 Grok 4.7 开始 rollout 至 Copilot Pro、Pro+、Max、Business、Enterprise，并进入 VS Code、Visual Studio、Copilot CLI、cloud agent、Copilot app、JetBrains、Xcode、Eclipse 的 model picker。

一手来源：

- SpaceXAI, “Introducing Grok 4.7”  
  https://x.ai/news/grok-4-7
- GitHub Changelog, “Grok 4.7 is now available in GitHub Copilot”, 2026-09-21  
  https://github.blog/changelog/2026-09-21-grok-4-7-is-now-available-in-github-copilot/

证据等级：**A**（厂商正式发布 + 独立分发平台实际 rollout）。

这解决了此前研究包里的状态：9 月 16 / 19 日只能写“Grok 4.7 尚未正式发布”；从 9 月 21 日起应把它从 watchlist 提升为正式型号。

## 2. 产品规格与定价

当前公开规格可整理为：

| 项目 | Grok 4.7 |
|---|---|
| model id | `grok-4.7` |
| context | 500K tokens |
| input | text + image |
| output | text |
| reasoning | low / medium / high / xhigh；高推理档会显著增加 token 与延迟 |
| API 起步价 | $2 / M input；$6 / M output |
| Fast | 同模型的更快 serving option；官方称约 2× output speed，约 2× price |
| weights | proprietary / 未开放 |

官方强调标准 Grok 4.7 与 4.6 保持相同 headline token price。这里必须明确：

> **相同每 token 单价 ≠ 相同每任务成本。**

独立 Artificial Analysis 当前显示 Grok 4.7 xhigh：

- Intelligence Index = **46**；
- 500K context；
- 约 42 tok/s（该测量会随 serving 状态变化）；
- 其 Intelligence Index 跑测显示高 verbosity；
- AA 单独的 Grok 4.7 benchmark 文章称 Coding Agent Index（Grok Build + Grok 4.7 xhigh）= **56**，较 Grok 4.6 xhigh 高 **9**；
- AA 的 coding-agent 测量中，4.7 xhigh 的 per-task token expenditure、API-token cost 与 elapsed time 都显著高于 4.6 xhigh。

第三方：

- Artificial Analysis, “Benchmarking Grok 4.7”, 2026-09-21  
  https://artificialanalysis.ai/articles/benchmarking-grok-4-7
- Artificial Analysis model page  
  https://artificialanalysis.ai/models/grok-4-7
- VentureBeat, “Grok 4.7 pairs coding gains with the same affordable pricing — but high token consumption threatens real-world ROI”, 2026-09-21  
  https://venturebeat.com/technology/grok-4-7-pairs-coding-gains-with-the-same-affordable-pricing-but-high-token-consumption-threatens-real-world-roi

证据等级：

- 模型存在、API 可用、基础价格：**A**；
- 官方 benchmark：**B（厂商自测）**；
- AA Intelligence / Coding Agent 测量：**B+（独立、可重复方法，但仍是特定 harness/config）**；
- “真实生产成本一定翻倍”：**不能推出**。

## 3. 使用者 / 独立评价：提升是真的，但不是“全面碾压”

首日第三方测试呈现的不是单一结论，而是明显 trade-off：

- agentic coding 与长程 knowledge-work 指标相对 4.6 提升；
- 并非所有 AA 子项都进步，部分长上下文 / automation 子项有回落；
- xhigh 的高输出 token 消耗意味着更高 finished-task cost；
- Coding Agent Index 使用 Grok Build 作为 native harness，因此结果衡量的是**模型 + harness 系统**，不能把全部增益归因于 checkpoint 本身；
- 社区首日 demo 对网页、3D、长任务的评价分裂：有人报告更强的多步完成度，也有人认为 4.7 在特定 3D / frontend 任务不如 4.6，且 token 消耗偏快。

这类社区样本目前只能列 **C**，主要用于保存“争议形状”，不能据此判断普遍生产可靠性。

## 4. 与最近 30 天竞争格局的关系

9 月前沿模型已经连续出现：Claude Fable/Mythos 5.1、GPT-6 Astra、Gemini 3.8 系列、Qwen3.8 系列、DeepSeek V4.1 Flash 等。Grok 4.7 的竞争位置不是“绝对 SOTA”，而是：

- 更靠近 frontier agent/coding 区间；
- 继续用较低 token rate 与 GPT / Claude 高端层做价格区分；
- 依靠 Grok Build / Cursor / GitHub Copilot 的快速分发把“模型发布”直接变成开发者实际可选项；
- 高 reasoning effort 的 token 消耗提醒我们，未来月度比较必须同时保留 **list price / token usage / cost per successful task / wall time**。

## 5. 建议入库

- `编年/2026/09.md`：9 月 21 日 Grok 4.7 正式发布；
- `表/大事年表.md`：若按“前沿主要型号”门槛，加入 Grok 4.7；
- xAI / Grok 世家：补 4.6 → 4.7 的 base model / RL / price continuity；
- `志/AI编程助手.md` / `志/AI产品化演进.md`：GitHub Copilot 当日 rollout 与 model-policy default enablement；
- 月度比较表：新增 `cost per completed task` / `reasoning effort` 字段。

当前不能推出：

- Grok 4.7 是 9 月最强模型；
- xhigh 适合所有 coding workload；
- 同 token rate 意味着与 4.6 同总账单；
- vendor benchmark 已证明生产可靠性。

---

# 二、Xiaomi MiMo-V2.6：开放权重前沿再次换位，而且“开放”的对象扩展到 RL 训练组件

## 1. 日期边界：9 月 21 日已有公开可用，官方发布页 9 月 22 日更新

Artificial Analysis 将 MiMo-V2.6-Pro 的 release date 记为 **2026-09-21**；VentureBeat 于美国太平洋时间 9 月 21 日晚报道其已发布；Xiaomi MiMo 官方发布页标注 **Update Time September 22, 2026**。

因此建议编年写法：

> **2026-09-21—22：MiMo-V2.6-Pro / Flash 进入公开发布与开放权重阶段；9 月 22 日小米官方发布页完成正式说明。**

不要为了制造一个虚假的全球统一时刻，把美国媒体时间、Hugging Face 权重上传时间与小米官网 update timestamp 强行压成同一分钟。

一手来源：

- Xiaomi MiMo official release  
  https://mimo.mi.com/docs/en-US/news/latest/v2-6
- Xiaomi MiMo model page — Pro  
  https://mimo.mi.com/models/en-US/mimo-v2.6-pro
- Xiaomi MiMo model page — Flash  
  https://mimo.mi.com/models/en-US/mimo-v2.6-flash
- Hugging Face — `XiaomiMiMo/MiMo-V2.6-Pro-RL`  
  https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Pro-RL

证据等级：**A**（官方 API / 官方 model card / 权重实际可下载）。

## 2. 模型结构、模态与运行权

MiMo-V2.6-Pro-RL 官方 model card 给出：

- Sparse MoE；
- **1.02T total parameters / 42B activated**；
- **1M context**；
- text / image / video / audio input，text output；
- 681M vision encoder；
- 308M AudioTokenizer + 127M audio patch encoder；
- 5-layer speculative decoder；
- MIT license；
- Hugging Face 权重可下载；
- 提供 SGLang / vLLM 自托管示例；
- 同时可从 MiMo API、MiMo Desktop、OpenRouter 等调用。

Flash 是效率层：官方 API 价显著低于 Pro，同时保持 1M context 与 native full-modality 定位。

这里的历史意义不是“又一个 1T 模型”，而是：

> **一个进入 frontier-open-weight 榜单顶部的模型，同时具备长上下文、原生多模态、Agent/tool 方向、API 低价和完整自托管权。**

这会继续压缩 closed frontier 与 open-weight frontier 的能力 / 部署控制权差距。

## 3. 价格：非常低，但不能直接拿 list price 宣布“成本只有闭源 1/60”

Xiaomi 当前海外实时 API：

| SKU | cache-hit input | cache-miss input | output |
|---|---:|---:|---:|
| `mimo-v2.6-pro` | $0.0036/M | $0.435/M | $0.87/M |
| `mimo-v2.6-flash` | $0.0028/M | $0.14/M | $0.28/M |
| `mimo-v2.6-pro-ultraspeed` | $0.036/M | $4.35/M | $8.70/M |

Batch API 对 Pro / Flash 进一步按实时价 **50%** 计费。

UltraSpeed 官方称与 Pro 同质量、输出速度最高 20×，但目前“20×”是厂商 serving claim，不能当独立复测结果。

一手价格：

- https://mimo.mi.com/models/en-US/mimo-v2.6-pro
- https://mimo.mi.com/models/en-US/mimo-v2.6-flash
- https://mimo.mi.com/models/en-US/mimo-v2.6-pro-ultraspeed
- https://mimo.mi.com/docs/en-US/quick-start/usage-guide/text-generation/batch-api

## 4. 独立 benchmark：AA #1 open-weight 是重要事实，但不是“所有任务最强”

Artificial Analysis 当前模型页：

- Intelligence Index = **46**；
- 在其 open-weight size class 中列 **#1**；
- measured output speed 约 125 tok/s（会随 provider 状态变化）；
- cost per Intelligence Index task 约 **$0.13**；
- 1M context；
- MIT / commercial-use-capable open weights；
- 1.0T total / 42B active。

独立来源：

- Artificial Analysis  
  https://artificialanalysis.ai/models/mimo-v2-6-pro
- VentureBeat, 2026-09-21  
  https://venturebeat.com/technology/better-than-deepseek-xiaomis-mimo-v2-6-pro-debuts-as-the-top-open-weights-model-in-the-world-alongside-cheaper-v2-6-flash

证据等级：**B+**（独立 benchmark，方法明确；仍受 benchmark selection、harness、配置与发布日 snapshot 影响）。

尤其不能把“AA open-weight #1”写成：

- 任何真实工作负载都胜过 Kimi / Qwen / DeepSeek；
- 所有 Agent harness 下都优于闭源模型；
- 模型已证明 production reliability；
- 低 API list price 等于低 self-host TCO。

官方自己的 benchmark 也有明显分化。例如 Pro 在部分 DeepSWE / Agent 指标逼近前沿，但并没有全面高于 GPT-6 Astra / Claude Opus / DeepSeek 的所有对比项。

## 5. 开放的不只是 weights：RL 训练方法与 harness 开始进入发布对象

官方把本代定位为 “Scaling Reinforcement Learning Toward Self-Improvement”，并公开描述：

- mixed RL across coding / general agent / visual / cybersecurity；
- large-batch asynchronous GRPO；
- Groupwise Reward Synthesis / Groupwise Advantage Redistribution；
- Multi-Prefix Multi-Teacher On-Policy Distillation；
- training environments / harness 也被作为开放研究对象。

这不等于完整预训练数据 / 端到端训练复现已经全部开放，但它明显超过“只丢一个 final checkpoint”。

因此建议把开放程度至少拆成：

> **weights / inference code / RL method / RL environments & harness / logs / pretraining data / full reproducibility**。

## 6. 与最近 30 天模型竞争的关系

9 月 21 日 Grok 4.7 与 MiMo-V2.6 在第三方 AA Intelligence Index 都出现 **46** 的当前读数，但二者的历史位置完全不同：

- Grok 4.7：闭源、$2/$6、xAI harness / enterprise distribution；
- MiMo-V2.6-Pro：MIT open weights、$0.435/$0.87、可自托管、1M multimodal。

因此“46 vs 46”不代表产品等价；它反而说明同一 intelligence composite 下面，**部署权、模态、价格、速度、harness 与 licensing** 可以完全不同。

## 7. 建议入库

- `编年/2026/09.md`：9 月 21—22 MiMo-V2.6；
- `表/大事年表.md`：作为 open-weight frontier 重要节点；
- `志/开源运动.md`：MIT weights + RL method / environments；
- `志/参数竞赛.md`：1.02T / 42B active MoE；
- `志/AI Agent 生态.md`：mixed-harness RL 与长程 Agent；
- Xiaomi / MiMo 世家（若已有）：补 V2.5 → V2.6。

---

# 三、补漏：Qwen-Audio 3.1 Realtime Plus（实际发布日期 9 月 20 日）

## 1. 为什么今天仍应补，而不能因超过 24 小时直接丢掉

用户规则对“新模型 / 新型号”设置了低入库门槛，而且强调不要等月度总结。仓库检索未找到 `qwen-audio-3.1-realtime-plus`，说明上一班漏掉了一个正式 SKU。

Alibaba Cloud 当前官方生命周期 / model page 将其列为 **2026-09-20** 上线；因此今天应补录真实发布日期，而不是伪装成 9 月 22 日事件。

一手来源：

- Alibaba Cloud Model Studio  
  https://www.alibabacloud.com/help/en/model-studio/qwen-audio-3-1-realtime-plus
- Realtime voice guide  
  https://www.alibabacloud.com/help/en/model-studio/qwen-audio-realtime-user-guides

证据等级：**A**。

## 2. 核心规格

`qwen-audio-3.1-realtime-plus`：

- realtime full-duplex speech；
- input：text + audio；
- output：text + audio；
- context：**262,144 tokens**；
- max input：245,760；
- max output：16,384；
- Function Calling；
- web search（但当前不能与 Function Calling 同时启用）；
- voice cloning；
- smart-turn semantic turn detection；
- 3.1 Plus 保留旧 voice，并增加 8 个 system voices；
- 支持 WebSocket；官方 guide 另提供 AOQ / WebRTC 路径。

价格：

- Singapore：text input $0.8/M，audio input $6.4/M，text output $6.4/M，audio output $24/M；
- Beijing：$0.688 / $5.501 / $5.501 / $20.628；
- rate limit：60 RPM / 100K TPM。

这里值得记录的是它不是纯 ASR/TTS pipeline，而是 speech-to-speech model 直接带 tool use / search / cloned voice。

## 3. 独立评价边界

本轮只找到少量二手开发者介绍，没有像 Artificial Analysis 对 Grok Transcribe 2.0 那样成熟的独立实时语音 benchmark。因此：

- “功能存在 / API 可调用” = **A**；
- latency / interruption / noisy-room stability / tool-call reliability = **尚不能下高等级结论**；
- 不应因为 context 262K 就说“语音对话能无损记住 262K token 的连续音频”；官方 voice guide 另有限制：会话历史音频最多 50 turns / 300 seconds，超过后会丢弃早期历史。

## 4. 建议入库

- `编年/2026/09.md`：补 9 月 20 日；
- Qwen 世家 / realtime voice 表；
- 月度模型比较表：新增 `speech-to-speech + tool use` 维度。

---

# 四、中美 AI 对话：从“发生对话 / 美方提议”升级为“美方称双方已同意 formalized dialogue + incident line”

## 1. 昨日条目需要修订，但不能过修订

9 月 21 日研究包的谨慎表述是正确的：

- 中国商务部 / 新华社确认 9 月 20 日纽约磋商中“就人工智能有关问题举行对话”；
- 当时仓库只把 national-security-level notification mechanism 写成美方提议，没有写成已建立制度。

9 月 21 日随后出现更强的美方公开说法。Reuters 引述美国财政部长 Scott Bessent：

- 双方同意建立 **formalized dialogue on AI**；
- 包括面向 AI safety incidents 的 communication / **incident line**；
- 约两个月后计划在深圳继续会谈；
- 后续要讨论什么算 leading AI dangers、哪些情况触发协议等。

来源：

- 中国商务部 / 新华社，2026-09-21：  
  https://www.mofcom.gov.cn/syxwfb/art/2026/art_6ffced85b2b649ff9e24604fe04cf22c.html
- Reuters, 2026-09-21：  
  https://www.reuters.com/world/asia-pacific/us-china-meet-again-ai-safety-two-months-shenzhen-bessent-says-2026-09-21/

## 2. 证据等级

建议拆开：

| 命题 | 证据等级 | 当前状态 |
|---|---|---|
| 9 月 20 日双方举行 AI 对话 | A | 中方正式文本确认 |
| 美方称双方同意 formalized AI dialogue | A-/B+ | 美财长具名公开表述，Reuters 记录 |
| 美方称双方同意 incident line | A-/B+ | 同上 |
| 两个月后深圳继续会谈 | A-/B+ | 美方具名宣布 |
| 中方已经发布 incident-line 共同文本 | 否 | 尚未找到 |
| 具体触发阈值 / 响应时限 / 联系机构已经确定 | 否 | 仍待谈 |
| 已经形成具有条约性质的 AI 危机热线 | 否 | 不能推出 |

因此，昨日条目最好从：

> “美方提出，供进一步考虑”

更新为：

> **“美方 9 月 21 日称双方已同意把 AI 对话制度化并设置 incident line；中方公开文本目前仅确认 AI 对话本身，尚未公布相同颗粒度的机制细节。”**

这是证据升级，而不是把谨慎边界全部删除。

## 3. 历史意义

若深圳后续会议按计划举行，这条线会把 2026 年几件此前分散的制度创新连起来：

- 公司内部 misalignment incident reporting；
- labs → regulators / federal government 的 incident disclosure；
- international measurement / standards；
- 国家之间的 incident communication channel。

这意味着“Agent 出事故以后谁知道、谁有义务说、说到什么程度”正在形成跨层级制度。

## 4. 建议修订

- 修订 `review/research-2026-09-21-routing-agent-access-capital-dialogue.md` 的后续状态（不必覆盖原文，可在月度编年加 follow-up）；
- `编年/2026/09.md`：9 月 21 日补“formalized dialogue / incident line（美方披露）”；
- `志/AI伦理与治理.md`：事故通报从企业内 → 国家内 → 国家间；
- 后续观察深圳会议是否有 joint statement / protocol 文本。

---

# 五、OpenAI：把自动 AI 研发、RSI、人类控制与国际标准写成明确公司政策立场

## 1. 日期与核心内容

OpenAI 于 **2026-09-21** 发布《Building standards for the next phase of AI》。这份文件把本月已经出现的几条线正式拼在一起：

- automated AI researcher；
- AI 对自身 R&D 的自动化；
- recursive self-improvement（RSI）；
- misalignment incident reporting；
- international technical standards；
- US-China safety dialogue。

最值得作为公司政策史料保存的边界有三点：

1. OpenAI 明确称 **fully autonomous RSI is not happening today**；
2. OpenAI 明确主张在“能够安全进行之前”**不应追求 fully autonomous RSI**；
3. OpenAI 主张国际标准应覆盖 capability measurement、automated-R&D human oversight、incident classification / reporting，但同时明确这些 technical standards **不应被等同为模型许可证、强制 prerelease review 或 model approval requirements**。

一手来源：

- OpenAI, “Building standards for the next phase of AI”, 2026-09-21  
  https://openai.com/index/building-standards-next-phase-ai/

证据等级：**A（公司正式政策 / 治理立场）**。

## 2. 这是什么，不是什么

这是：

- OpenAI 对 frontier pacing / RSI 的正式立场；
- 对国际 measurement / incident standards 的政策主张；
- 对本月 misalignment framework、AI-R&D automation telemetry 与中美 AI 对话的制度整合。

它不是：

- 美国新法律；
- ISO 已经发布的新标准；
- OpenAI 已经停止 automated AI R&D；
- fully autonomous RSI 已存在；
- 各大 lab 已经签署 binding pact；
- 新模型 release gate 已经由第三方审批。

这个区分尤其重要，因为 9 月 18 日已经出现针对“pace the frontier”协调的反垄断诉讼。OpenAI 此文反而明确把标准定位成**common technical foundation，而非竞争者间的统一许可证 / 发版审批**。这是对“如何协调但不把 coordination 变成 cartel / licensing regime”问题的一种政策答案，但其法律有效性尚未经过验证。

## 3. 与最近 30 天治理线的关系

9 月已经形成连续链条：

- 9/12 Anthropic “pace the frontier” + embedded evaluator 承诺；
- 9/16 OpenAI misalignment reporting；
- 9/17 Anthropic 量化 AI-R&D automation；
- 9/18 embedded evaluator 开始有具名实施伙伴；
- 9/18 相关 antitrust lawsuit；
- 9/20—21 中美 AI dialogue / incident line；
- 9/21 OpenAI 把 RSI、measurement、incident reporting 与 international standards 写成统一框架。

这不是偶然的几篇博客，而是“**前沿能力怎样继续推进，同时怎样建立可测量、可报告、可沟通的刹车系统**”开始成为 9 月的治理主线。

## 4. 建议入库

- `编年/2026/09.md`：9 月 21 日 OpenAI RSI / standards 立场；
- `志/AI伦理与治理.md`：international standards、incident classification、RSI oversight；
- OpenAI 本纪 / safety policy；
- 与 9 月 antitrust 案交叉引用。

---

# 六、Claude 9 月 22 日多旗舰模型故障：可靠性仍然是 Agent 时代的模型能力

## 1. 官方事故时间线

Anthropic 官方 status page：

- **00:50 UTC**：事后确认实际 impact 开始；
- 00:57：开始调查 Mythos 5.1、Fable 5.1、Opus 5 elevated errors；
- 01:17：identified；
- 01:35：Fable 5 / 5.1、Mythos 5 / 5.1 已恢复正常，Opus 5 仍有问题；
- 02:10：事后确认 impact 结束；
- 02:11：monitoring；
- **02:35**：status page 标 resolved。

官方同时列出的 affected components：

- claude.ai；
- Claude API；
- Claude Code；
- Claude Cowork。

一手来源：

- Anthropic Status  
  https://status.claude.com/incidents/7g1qpkyz5gxh

独立归档可用于交叉核验 timeline，但不需要用第三方替代官方：

- https://claudenetwork.com/status/incidents/2026-09-22-7g1qpkyz5gxh

## 2. 准确口径

- 实际影响窗口：约 **80 分钟**；
- 从首次 investigating 到 resolved post：约 98 分钟；
- “1h38m outage”是按 status-post 生命周期计算，不等于官方事后确认的全部请求都坏了 98 分钟；
- 官方没有在公开页披露详细 root cause，只说 identified / fix；
- 因此不能写“某数据中心 / 某模型服务架构发生 XX 故障”。

证据等级：**A**（官方 status page）。

## 3. 为什么仍值得留档

单次 80 分钟故障未必达到“改变行业路线”的大事年表门槛，但它满足本仓库的 reliability 主线，尤其因为：

- 同时涉及多代 flagship model；
- API + chat + coding agent + Cowork 同时列为 affected components；
- 9 月 3 日已有多厂商大面积故障；
- Agent workflow 对持续在线模型、checkpoint、retry、provider fallback 的依赖越来越深。

因此建议：

- 写入 9 月月度可靠性段或 `志/Agent宣传、实测与可靠性.md`；
- **不必单独进入“大事年表”**，除非 9 月后续出现同根因复发或 Anthropic 发布 RCA 显示更大结构问题。

---

# 七、Alibaba Apsara：V900 与 5T—10T 模型计划——“模型更大”与“算力供应链自主化”同时推进

## 1. 9 月 22 日能确认什么

Reuters 9 月 22 日现场报道 Alibaba CEO Eddie Wu 在 Apsara Conference 表示：

- Alibaba 正在开发 **5T—10T parameters** 的新 AI model；
- 当前旗舰 Qwen3.8 Max 约 2.4T，因此计划中的下一模型约是其 2—4× total-parameter scale；
- Qwen team 的方向是更复杂、更长程任务；
- T-Head 推出 / 展示 **Zhenwu V900**；
- Alibaba 口径称 V900 性能约为前代 M890 的 3×；
- 目标单集群规模可达 500,000 cards；
- 公司给出 2032 年全球 data-center capacity 超过 20GW 的目标。

高质量独立来源：

- Reuters, 2026-09-22  
  https://www.reuters.com/business/retail-consumer/alibaba-plans-ai-model-with-5-trillion-10-trillion-parameters-unveils-new-chip-2026-09-22/

Apsara Conference 官方日期也能由 Alibaba Cloud conference site 交叉核验为 9 月 22—24 日：

- https://www.alibabacloud.com/zh/apsara-conference/2026-guide

## 2. 证据等级与必须保留的边界

建议：

| 命题 | 等级 | 边界 |
|---|---|---|
| CEO 在 Apsara 宣布 5T—10T 模型研发目标 | B+/A- | Reuters 现场具名引述；尚未找到同日 Alibaba Group 英文新闻稿 |
| 这是已经发布的新 Qwen SKU | 否 | 明确不是 |
| V900 当日被公开展示 / 宣布 | B+/A- | Reuters / conference 报道 |
| V900 实际生产性能一定是 M890 3× | B | 厂商 claim，待独立 deployment telemetry |
| 单集群已实际部署 500K 卡 | 否 | 这是 capability / target 口径，不是已部署规模 |
| 2032 >20GW 已建成 | 否 | 长期目标 |

因此绝不能把新闻标题压缩成：

> “Alibaba 9 月 22 日发布了 10T Qwen 和 50 万卡集群。”

准确写法是：

> **Alibaba 9 月 22 日公开了 5T—10T 下一模型研发路线与 V900 / 超大集群 / 20GW 数据中心目标；模型仍在开发，硬件大规模生产与集群部署也需后续验证。**

## 3. 历史意义

它把近期中国模型竞争里经常被分开讨论的两条线重新合并：

- Qwen / DeepSeek / Kimi / GLM / MiMo 的模型能力竞赛；
- 国产 accelerator、serving kernels、network / cluster、数据中心电力的基础设施自主化。

如果模型规模真的继续走到 5T—10T，而 inference / training 又要更多部署在国产 accelerator 上，后续历史关键问题不再只是“参数量”，而是：

- memory capacity / bandwidth；
- interconnect；
- MoE routing / all-to-all；
- failure domain；
- compiler / kernel maturity；
- training efficiency；
- inference tokens/J；
- cluster utilization；
- production yield 与 power availability。

## 4. 建议入库

- `编年/2026/09.md`：9 月 22 日 Apsara infrastructure roadmap；
- `志/AI基础设施与芯片.md`：Zhenwu V900；
- `志/参数竞赛.md`：5T—10T 是研发计划，单列“announced / training / released”状态；
- Qwen 世家：只加未来路线观察，不新增正式型号。

---

# 八、跨事件横向比较：本月应该怎样写“模型竞争”

本轮最值得在 9 月月度整理时加入一个更完整的比较框架：

| 维度 | Grok 4.7 | MiMo-V2.6-Pro | Qwen-Audio 3.1 RT Plus | OpenAI standards / US-China dialogue | Alibaba V900 路线 |
|---|---|---|---|---|---|
| 对象 | closed flagship | open-weight flagship | realtime voice SKU | governance | compute infrastructure |
| 正式状态 | released | released / weights open | released | policy / dialogue | hardware roadmap + model plan |
| context | 500K | 1M | 262K（语音另有历史时长限制） | — | — |
| 模态 | text/image → text | text/image/video/audio → text | text/audio ↔ text/audio | — | — |
| reasoning / agent | 强调 long-horizon / coding | mixed-harness agent RL | tool calling / search | automated-R&D / RSI oversight | 为 frontier training/inference 服务 |
| 开放性 | proprietary | MIT weights | API-only | 公共政策文本 | proprietary hardware / roadmap |
| 主要竞争轴 | price + coding agent | open weights + price + multimodal | realtime interaction | incident / oversight standards | domestic compute + scale |

由此，月度层面最好不要再只做“模型 A benchmark > 模型 B benchmark”的平面表，而至少同时比较：

- **能力**：intelligence / coding / agent / multimodal；
- **价格**：token rate、cache、batch；
- **任务成本**：token consumption、retry、wall time；
- **运行权**：API、weights、自托管、region；
- **分发**：Copilot / Cursor / cloud / first-party；
- **可靠性**：outage / rate limit / failover；
- **治理**：access tier、incident reporting、RSI oversight；
- **基础设施**：chip / interconnect / power / deployment scale。

---

# 九、证据等级总表

| 事件 / 结论 | 等级 | 当前可以说 | 当前不能说 |
|---|---|---|---|
| Grok 4.7 9/21 正式发布并可通过 xAI API / Cursor / Grok Build 使用 | A | 新正式型号，实际可用 | 所有用户 / 所有地区同一秒完成 rollout |
| GitHub Copilot 开始 rollout Grok 4.7 | A | 多 SKU 可选，企业 admin 可控制 model policy | 所有 seat 当天都已看到 |
| Grok 4.7 比 4.6 在 AA agent/coding 指标明显进步 | B+ | 特定 AA config / harness 下成立 | 全任务全面更强、生产 ROI 已证实 |
| MiMo-V2.6-Pro / Flash 正式开放 | A | 权重与 API 均已可用 | 完整训练数据 / 端到端训练完全复现 |
| MiMo-V2.6-Pro 是 AA 当前 open-weight #1 | B+ | 当前榜单 snapshot | 永久 #1、所有 benchmark #1 |
| Qwen-Audio 3.1 RT Plus 9/20 上线 | A | 正式 realtime voice SKU | 已有强独立语音稳定性评测 |
| 中美 formalized AI dialogue / incident line | A-/B+ | 美财长称双方已同意；中方确认 AI 对话 | 已有联合文本、条约、完整 protocol |
| OpenAI fully autonomous RSI 不应在不安全条件下追求 | A | 正式公司政策立场 | 美国法律 / 全行业 binding rule |
| Claude 9/22 多模型 incident | A | 00:50—02:10 UTC impact；多产品面受影响 | root cause 已知 / 数据丢失 / 同源于其他厂商 |
| Alibaba 5T—10T model plan / V900 roadmap | B+/A- | CEO / conference public disclosure | 5T—10T 模型已发布；500K cluster 已部署 |

---

# 十、建议的仓库后续动作

本 PR 先保留为**研究包**，避免在同一轮把所有事实直接硬塞进正文并制造重复。合并后建议分两步吸收：

1. **编年 / 年表**：Grok 4.7、MiMo-V2.6、Qwen-Audio 3.1 RT Plus、9/21 AI dialogue follow-up、OpenAI standards、9/22 Claude incident、Alibaba Apsara roadmap；其中 Claude incident 可只进月度编年 / 可靠性志，不必进大事年表。
2. **专题志 / 表**：Grok / MiMo 写入模型竞争与开放运动；AI dialogue / OpenAI standards 写治理；Claude 写可靠性；V900 写基础设施；月度模型表新增 task-cost、distribution、runtime/deployment、governance 字段。

后续重点核验：

- Grok 4.7 在更广泛 production coding workload 的 cost-per-success；
- MiMo-V2.6 在不同 provider / self-host harness 的稳定性，以及官方宣称的 UltraSpeed 20× 是否有独立复测；
- 深圳 AI safety 后续会议是否产生中美共同文本、incident threshold 与 contact protocol；
- Anthropic 是否公布 9 月 22 日 incident RCA；
- Alibaba V900 的正式规格、量产时间、实际 cluster deployment 与独立性能；
- 5T—10T Qwen 项目何时从“研发计划”升级为命名模型 / public release。

## 本轮没有发现 / 不应误记为今日新模型的项目

- Anthropic 9 月 17 日 AI-R&D automation telemetry 今天被再次报道，但仓库 PR #40 已经记录，不重复；
- Gemini 3.8 Live / Extended Thinking、Koa、Qwen3.8 Omni / LiveTranslate、DeepSeek V4.1 Flash 都已经在前序研究包覆盖；
- Alibaba 5T—10T 计划不是一个已经发布的 `Qwen4` / `Qwen5` SKU；
- V900 的公开不等于 500K-card production cluster 已存在；
- 中美 incident line 的美方表述不等于双方已发布完整共同 protocol。
