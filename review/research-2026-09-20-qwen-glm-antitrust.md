# 2026-09-20 增量研究包：Qwen3.8-LiveTranslate、GLM 推理分层与前沿减速诉讼

> 检查窗口：以 2026-09-20 北京时间傍晚为基准，重点检查最近约 24 小时；同时按照“正式新模型 / 新型号不可因漏检而永久缺席”的规则，对本轮巡检发现、但实际发生于 9 月 17—18 日的 Qwen3.8-Omni-Flash 与 GLM-5.3-FlashX / GLM 推理基础设施作补录。
>
> 仓库基线：本轮开始时 `main` HEAD 为 `bdf6b763`；PR #41 已于 2026-09-20 15:31（北京时间）合并。已检查 `编年/2026/09.md`、`表/大事年表.md`、`志/AI Agent 生态.md`、`志/AI伦理与治理.md`、`志/AI基础设施与芯片.md`、`志/Agent宣传、实测与可靠性.md`，并检索最近研究包。仓库此前没有 Qwen3.8-LiveTranslate、Qwen3.8-Omni-Flash、GLM-5.3-FlashX 或 GLM-5.3 Infra Agent 的正式条目；9 月 12 日“前沿减速”与 embedded evaluator 则已有研究包，因此本轮 antitrust 事件作为后续修订，而不是重新讲一遍旧事件。

---

## 本轮结论

本轮确认四组值得留档的增量，其中一项是**最近约 24 小时内正式进入公开发布窗口的新模型**，两项是此前两天漏记但按本书规则必须补回的模型 / 基础设施节点，一项是对既有治理史的**法律后续**：

1. **2026-09-19：Qwen3.8-LiveTranslate-Flash-Realtime 正式进入公开发布窗口。** 阿里云官方模型页确认它是新的实时音视频翻译型号，输入音频 / 图像，输出文本 / 音频，理解 60 种语言、29 种语言可语音输出；上下文 53,248 token。需要把“公开宣布 / 模型页更新时间”与“最早文档可见 / 最早成功 API 调用”分开：相关 Realtime client 文档在 9 月 17—18 日已出现新 model id，因此目前不能声称 9 月 19 日才第一次可调用。
2. **补录 2026-09-18 前后：Qwen3.8-Omni-Flash。** 官方已经提供 `qwen3.8-omni-flash`，1M context，文本 / 图像 / 音频 / 视频输入、文本输出，支持 thinking、Function Calling、web search、缓存与 Responses / Chat Completions。外部 release tracker 将 9 月 18 日作为 release date，但官方模型页本身只足以确认“此时已正式可用”，并存在更早的文档更新时间，因此日期粒度应保留不确定性。
3. **补录 2026-09-17—18：Z.ai GLM-5.3 推理基础设施 + GLM-5.3-FlashX。** Z.ai 9 月 17 日官方披露：GLM-5.3-Flash 的生产推理系统构建在超过 100,000 张国产 AI accelerator 上，大量适配与优化工作由 GLM-5.3 驱动的 Infra Agent 完成；官方称从首次成功适配到 production readiness 少于两周、端到端性能约 3×。9 月 18 日 Vercel 又正式上线 `zai/glm-5.3-flashx`，明确把它定义为 GLM-5.3-Flash 的**高速 serving option**，约 200 tok/s。这里不能把 FlashX 写成全新权重，也不能把 Z.ai 的 3× / “成本可比 NVIDIA”自报指标当成独立审计。
4. **2026-09-18 提交、9 月 19 日进入广泛报道：`Buist et al. v. Anthropic, PBC et al.`。** 四名付费用户起诉 Anthropic、OpenAI、SpaceXAI、Google，指控 9 月 12 日围绕 “pace the frontier” 的公开响应构成违反 Sherman Act §1 的横向协议。诉讼的存在、案号、被告和 filing date 是事实；所谓“已经形成 cartel / binding pact”仍只是原告指控，没有法院认定，也没有证据足以推翻本书此前“公开表态 ≠ 已证明的约束性行业协议”的判断。

这一组事件把 9 月中旬的几条线进一步并到一起：

> **模型发布不仅在比 intelligence，也在比实时交互、模态、服务速度与部署边界；与此同时，Agent 已开始直接参与模型自己的 serving stack，而 frontier-safety coordination 又开始受到 competition law 的现实约束。**

---

# 一、Qwen3.8-LiveTranslate：新的实时音视频翻译型号

## 1. 日期：公开发布日与 API 文档可见日要拆开

阿里云 Model Studio 的专用模型页当前标注：

- model id：`qwen3.8-livetranslate-flash-realtime`；
- 页面更新时间：**2026-09-18 11:16**；
- 9 月 19 日进入 Qwen / 行业公开发布与报道窗口；
- 更早的 client-event / integration 文档在 9 月 17—18 日已经出现该 model id。

一手来源：

- Alibaba Cloud Model Studio, `qwen3.8-livetranslate-flash-realtime` model information  
  https://help.aliyun.com/en/model-studio/qwen3-8-livetranslate-flash-realtime
- Alibaba Cloud Model Studio, rate limits  
  https://help.aliyun.com/en/model-studio/rate-limit
- Alibaba Cloud Model Studio, model pricing  
  https://help.aliyun.com/en/model-studio/model-pricing

因此建议史料写法：

> **2026-09-19，Qwen3.8-LiveTranslate-Flash-Realtime 进入正式公开发布窗口；官方 API 文档至少在此前一两天已经开始暴露新 model id。**

不能写成：

- “9 月 19 日 00:00 才首次 API 可用”；
- “9 月 18 日页面更新时间就是全球正式发布日期”；
- “更早文档出现 model id 就证明当时所有地区都已可稳定调用”。

目前公开材料不能精确确定第一条成功生产 API 请求发生在什么时刻。

## 2. 产品形态

官方定义它为：

> multilingual real-time audio and video translation model

能力边界：

| 项目 | Qwen3.8-LiveTranslate-Flash-Realtime |
|---|---|
| 输入 | Audio、Image |
| 输出 | Text、Audio |
| 理解语言 | 60 |
| 可语音输出语言 | 29 |
| context window | 53,248 |
| max input | 49,152 |
| max output | 4,096 |
| API | WebSocket Realtime API |
| Function Calling | 不支持 |
| Structured Outputs | 不支持 |
| Web Search | 不支持 |
| Context Cache | 不支持 |
| Batch | 不支持 |
| Fine-tuning | 不支持 |

这意味着它不是一个“通用 Qwen3.8 加翻译 prompt”的营销别名，而是有独立 model id、API event schema、价格和限流的专用实时模型。

## 3. 价格与限流

官方原价按每百万 token 计：

### 华北 2（北京）

- audio input：**¥40 / 1M token**；
- image input：**¥3.3 / 1M token**；
- text output：**¥100 / 1M token**；
- audio output：**¥160 / 1M token**。

### 新加坡（International scope）

- audio input：**¥54.688 / 1M token**；
- image input：**¥4.01 / 1M token**；
- text output：**¥145.835 / 1M token**；
- audio output：**¥218.752 / 1M token**。

两地当前均是：

- **10 RPM**；
- **100,000 TPM**。

这组数字很值得保留，因为实时语音 / 翻译模型不能只写“每百万文本 token 多少钱”；输入与输出模态各自计费，真正的会话成本取决于音频 tokenization、持续时长与语音输出比例。

## 4. 与上一代的关系

官方旧 `qwen3-livetranslate-flash-realtime` 文档显示：

- 旧版理解 19 种语言；
- 可说 10 种语言；
- 同样属于 audio/image → text/audio 的 realtime translation 产品。

新 3.8 版把覆盖面扩大到 60 / 29，并且官方明确警告：

> parameters and events differ from `qwen3.5-livetranslate-flash-realtime`

因此这不是完全透明的 endpoint replacement。即使业务逻辑仍是“实时翻译”，客户端事件、参数与语言覆盖发生了实际变化，生产系统需要做兼容验证。

## 5. 延迟、质量与独立评价

同期官方 / 发布材料给出的一个关键指标是平均 character-level lagging / LAAL 从约 **2.8 秒降低到 2.3 秒**，并强调：

- 实时 speaker diarization；
- 视觉信息帮助口语歧义消解；
- 长上下文连续翻译；
- 多语种语音输出。

但这部分目前主要来自厂商自己的模型说明与发布材料。

截至本轮检查，没有找到与 Artificial Analysis 对 Grok Transcribe 2.0 类似、足够成熟且可重复的第三方 LiveTranslate benchmark，能够独立验证：

- 2.3 秒在不同语言 / 网络条件 / 说话速度下是否稳定；
- 翻译质量相对上一代的幅度；
- 多 speaker 情况下 diarization 的错误率；
- 长会话中跨段上下文是否保持；
- 视觉信息加入后会不会增加误导 / hallucination。

因此证据等级应拆分：

- 型号存在、model id、输入输出、context、价格、限流：**A**；
- 厂商 LAAL / 质量改善数据：**A（厂商确实如此报告）/ B-（现实普遍成立）**；
- 广泛社区共识：**尚未形成**；
- production reliability：**尚不能推出**。

## 6. 与近 30 天竞争格局的关系

过去一周已经出现：

- Gemini 3.8 Live / Extended Thinking：原生实时 speech-to-speech + tool interaction；
- GPT-Live-1：从 ChatGPT Voice 进入 API；
- Grok Voice Transcribe 2.0：低价、高准确度 STT；
- Qwen3.8-LiveTranslate：实时多语种音视频翻译。

它们并不是完全同一类模型，不能只按一个 leaderboard 排名。更准确的实时语音栈应至少拆成：

> **ASR / transcription → translation → duplex conversation → multimodal grounding → tool-using voice agent。**

Qwen3.8-LiveTranslate 的位置更接近“专门的低延迟跨语种中间层”，而不是通用 reasoning model。

## 7. 建议入库位置

- `编年/2026/09.md`：9 月 19 日新型号节点；
- `表/大事年表.md`：若后续确认它代表实时翻译从单独 ASR+MT+TTS pipeline 向统一模型迁移，可列；现阶段可先研究包留档；
- `志/AI产品化演进.md`：记录 realtime model SKU 与模态分项计价；
- Qwen / 阿里纪传：补语言覆盖、API 与区域价格。

---

# 二、补录 Qwen3.8-Omni-Flash：1M context 的低价多模态理解型号

## 1. 为什么现在补录

本轮检索仓库没有找到 `qwen3.8-omni-flash`。

官方 Model Studio 文档已经把它列为正式可调用型号；多个 release tracker / 同期报道把 **2026-09-18** 作为发布节点。因此按本书规则，即使它不是“过去 24 小时刚发生”，也不能因为前一班巡检漏掉而永久缺席。

日期需保留一个小心点：

- 外部 release record 一致指向 9 月 18 日；
- 官方专用 model page 当前能够确认 9 月 18 日前后已可用；
- 但部分本地化文档存在更早的更新时间，文档更新时间本身不等于 canonical release announcement。

因此建议写：

> **2026-09-18 前后，Qwen3.8-Omni-Flash 进入正式可用 / 公开发布窗口；若后续 Qwen 给出 canonical announcement timestamp，应再据此校正精确发布日期。**

## 2. 官方能力

model id：`qwen3.8-omni-flash`

官方支持：

- 输入：**text / image / audio / video**；
- 输出：**text**；
- context：**1M token**；
- non-thinking max input：**991,808**；
- thinking max input：**983,616**；
- max output：**131,072**；
- thinking：默认开启，可调 reasoning effort；
- Function Calling：支持 custom tools；
- web search：支持，Responses built-in tool 为 `web_search`；
- context caching：automatic implicit caching + Responses Session caching；
- audio input：113 种语言 / 方言；
- multichannel audio：支持 spatial / multichannel input；
- APIs：Chat Completions、Responses。

部署区域包括：

- China (Beijing)；
- Singapore；
- Hong Kong；
- Tokyo；
- Frankfurt；
- Virginia。

这比 LiveTranslate 更像一个通用“多模态理解 + reasoning + tools”低价模型，但它**只输出文本**，不能因为名字有 Omni 就写成原生音频输出模型。

## 3. 价格

官方 Model Studio pricing 当前显示：

### Singapore / International

- input：**¥1.094 / 1M token**；
- cache-hit input：**¥0.117 / 1M token**；
- output：**¥3.427 / 1M token**。

### Hong Kong / Tokyo / Frankfurt / Virginia（Global）

- input：**¥0.8 / 1M token**；
- cache-hit input：**¥0.1 / 1M token**；
- output：**¥2.7 / 1M token**。

这里应注意：这张表把该型号按统一 token 价列出，而旧 Qwen3.5-Omni 一些产品会按不同输入模态分别计价。实际成本比较时必须确认 tokenization 与地域，不宜只看“每百万 token 更便宜”。

## 4. 竞争意义

这一型号值得记录的不是“又一个 Flash”，而是几项以前往往分散在不同 SKU 的能力被塞进一个低价 endpoint：

> **1M context × multimodal input × thinking × Function Calling × built-in web search × caching。**

这会直接影响 Agent routing：很多 workflow 未必需要最强旗舰，只需要“看得懂视频 / 音频 + 能调用工具 + 能吃长上下文 + 价格足够低”。

与同月 Qwen3.8-Max、Google Live、OpenAI / Anthropic Agent runtime 的竞争相比，它代表的是另一个维度：**把多模态理解成本压到可大量调用的 serving tier**。

## 5. 独立评价边界

当前公开资料能很好确认产品规格与价格，但首日缺少成熟第三方 long-context / audio / video / tool-use 综合评测。

所以不能推出：

- 1M context 内任意位置都能稳定利用信息；
- 113 种语言都有同等 ASR / understanding 质量；
- tool use 已达到 GPT / Claude 同级生产可靠性；
- 极低 token price 自动等于更低的端到端 Agent cost；
- “Omni”表示支持音频输出。

证据等级：

- 产品存在、context、API、tools、区域、官方价格：**A**；
- 9 月 18 日精确 canonical release timestamp：**B+，待官方 release log 进一步钉死**；
- 广泛社区性能共识：**尚无**。

## 6. 建议入库位置

- `编年/2026/09.md`：补 9 月 18 日模型节点；
- Qwen / 阿里纪传：记录 Omni 家族分层；
- `志/AI Agent 生态.md`：作为低成本多模态 tool-using endpoint；
- `表/大事年表.md`：是否收录取决于后续实际 adoption，不必因“新模型必须进编年”而自动升格为大事年表。

---

# 三、GLM-5.3 Infra Agent 与 FlashX：模型开始参与建设自己的 serving stack

## 1. 9 月 17 日：Z.ai 官方披露 GLM-5.3-Flash 生产推理系统

一手来源：

- Z.ai, “Toward Recursive Self-Improvement: How GLM Built Its Own Inference Infrastructure”, **2026-09-17**  
  https://z.ai/blog/glm-built-its-inference-infrastructure

Z.ai 明确写道：

- GLM-5.3-Flash 的完整 production inference service 从头构建在 **超过 100,000 个中国国产 AI accelerators** 的集群上；
- GLM-5.3-Flash 的全部生产推理都运行于这一系统；
- 大量工程工作由 **GLM-5.3-powered Infra Agent** 完成；
- 从第一次成功适配到 production readiness **少于两周**；
- 官方称端到端 serving performance / throughput 相对初始 baseline 约 **3×**；
- 官方称硬件利用率和 per-token cost 已达到与 mainstream NVIDIA GPUs 可比的水平；
- 匿名 `Ox-Alpha` 在 OpenCode / OpenRouter 实际使用六天处理 **超过 62T tokens**，并被 Z.ai 称为一周内两平台 most-used model。

这比“模型帮工程师写代码”更进一步：Agent 被放进真实 inference engineering feedback loop 中，读取测试、trace、microbenchmark、runtime event，提出假设、改代码并验证。

## 2. 官方给出的三个具体案例

### 数值正确性

Infra Agent 通过 partitioned / unpartitioned kernel 对比发现 KDA Context Parallelism 路径数值误差，定位到 TF32 precision，并修改为 `tf32x3`；相关修复最终上游合并进 Flash Linear Attention。

### Python / C++ concurrency

Prefill + KV Transfer 相对 Prefill-only 的性能差一度超过 20%。Agent 从 timeline 追到 DeepEP intra-node dispatch / combine 未释放 GIL，使 Mooncake Transfer Python thread 无法及时推进。修复后，官方称 gap 降到 **1% 以下**。

### kernel 优化

Agent 从不同实现中抽取 optimization skeleton，针对代表性 KDA Decode kernel 消除重复 FP32 normalization / gating，官方报告相对前一版本取得 **1.71×** speedup。

这些案例的重要性在于它们有：

> **具体 code path → 可测量异常 → hypothesis → patch → 局部 / 端到端验证。**

因此证据强于纯粹“我们的 Agent 很厉害”的广告 demo。

## 3. 但不能写成 recursive self-improvement 已经实现

Z.ai 自己在文章末尾明确否认：

> “we have not yet reached recursive self-improvement.”

而且工程循环仍由人类承担：

- objectives；
- boundaries；
- acceptance criteria；
- critical risk review。

所以准确表述应是：

> **AI-assisted / agent-led systems engineering 已进入真实大规模 inference infrastructure；它构成 recursive self-improvement 所需能力链的一部分，但不是自主设计、训练、评估、发布下一代模型的闭环。**

## 4. 100,000 国产 accelerator 的证据边界

“超过 100,000 张国产 AI accelerator”“全部 GLM-5.3-Flash production inference 运行于此”“成本 / 利用率可比 NVIDIA”等均来自 Z.ai 自己的官方技术披露。

因此应分层：

- Z.ai 已公开做出这些具体声明：**A**；
- 生产系统确实存在并承载 GLM-5.3-Flash：**A-/B+，有大规模实际流量信号但缺乏第三方基础设施审计**；
- 100,000 数量、3× throughput、62T token：**B（厂商 telemetry）**；
- “成本 / 利用率与 NVIDIA comparable”：**B-/C+，尚无独立成本审计 / 同 workload benchmark**。

不能由此推出：

- 这些 accelerator 是某一个单一国产 GPU 型号；
- 性能普遍等同 H100 / B200 / Vera Rubin；
- 所有训练也已完全运行在同一国产芯片集群；
- 国产软件生态问题已经解决；
- Z.ai 不再使用任何 NVIDIA GPU。

## 5. 9 月 18 日：GLM-5.3-FlashX 是 high-speed serving option，不应误写成新权重

Vercel 9 月 18 日正式上线：

- model id：`zai/glm-5.3-flashx`；
- 明确定义：**high-speed serving option for Z.ai's multimodal coding model**；
- advertised inference：约 **200 tokens/s**；
- 用途：coding agents、tool loops、interactive applications；
- Vercel AI Gateway price：**$0.37 / 1M input，$1.25 / 1M output**；
- underlying family：GLM-5.3-Flash，320B total / 18B active，1M context（Vercel model page）。

一手 / 平台来源：

- Vercel changelog, 2026-09-18  
  https://vercel.com/changelog/glm-5-3-flashx-now-available-on-ai-gateway
- Vercel AI Gateway model page  
  https://vercel.com/ai-gateway/models/glm-5.3-flashx

所以 FlashX 的历史意义是**serving tier 产品化**：

> 同一模型权重 / 家族可以按 latency / throughput 再切 SKU；“model name”开始同时指 checkpoint 与 serving configuration。

这和 9 月已经出现的模型聚合平台生命周期问题是同一条线：用户真正购买的常常不是“某组权重”，而是：

> **weights × provider × quantization / kernels × serving tier × region × rate limit × price。**

## 6. FlashX 的独立评价仍有限

Vercel 的“~200 tok/s”是具体 platform-serving claim，比厂商内部 demo 更接近可实测产品；但它依然不是跨 provider、跨 prompt distribution 的独立 benchmark。

当前能够确认：

- Vercel endpoint 存在；
- model id、价格与 advertised speed 存在；
- 它明确是 Flash 的 faster serving option。

尚不能推出：

- 任意输出长度都稳定 200 tok/s；
- TTFT 同时更低；
- FlashX 比普通 Flash 在 intelligence 上更强；
- FlashX 使用了新的权重 checkpoint；
- Z.ai 100k accelerator 集群全部专供 FlashX。

## 7. 与最近 30 天模型竞争的关系

这组事件改变“竞争”的计量单位。

过去常问：

> 哪个模型 score 更高？

现在 coding / Agent workload 还必须问：

- 每轮 tool loop 要等几秒？
- first-token latency 与 token throughput 各是多少？
- 长任务能否靠更高输出速率显著缩短 wall-clock time？
- 同一 checkpoint 的高速 serving tier 要多付多少钱？
- provider / region 是否真的有足够 capacity？

因此 FlashX 值得和前几天记录的 Amp Free Agent、SWE-2、Qwen 低价 tier、DeepSeek Flash 一起放进“Agent economics / serving”线，而不是只进模型能力排行榜。

## 8. 建议入库位置

- `编年/2026/09.md`：9 月 17 日 Infra Agent；9 月 18 日 FlashX；
- `志/AI基础设施与芯片.md`：100k 国产 accelerator 与 inference stack；
- `志/AI Agent 生态.md`：Infra Agent + dense feedback engineering loop；
- `志/Agent宣传、实测与可靠性.md`：把 3× / 62T / NVIDIA-comparable 保留为厂商 telemetry；
- `志/AI产品化演进.md`：同一模型按 serving speed 分层 SKU。

---

# 四、Buist v. Anthropic：AI safety coordination 首次直接进入 antitrust 诉讼

## 1. 案件事实

公开 docket：

- **Case**：`Buist et al. v. Anthropic, PBC et al.`；
- **Case No.**：`5:2026cv10693`（部分媒体简写为 `3:26-cv-10693`，正式 docket 当前显示 5:2026cv10693）；
- **Court**：U.S. District Court for the Northern District of California；
- **Filed**：**2026-09-18**；
- **Nature of Suit**：Anti-Trust；
- **Cause**：15 U.S.C. § 1；
- **Defendants**：Anthropic, PBC；OpenAI OpCo, LLC；SpaceXAI LLC；Google LLC。

公开 docket：

- Justia docket  
  https://dockets.justia.com/docket/california/candce/5%3A2026cv10693/479357

9 月 19 日，多家媒体开始广泛报道，使它进入本轮约 24 小时的信息窗口。

## 2. 原告指控是什么

四名原告都是至少一种 ChatGPT / Claude / Grok / Gemini 付费服务的订阅者，寻求代表全国付费用户 class。

核心理论不是传统 price fixing，而是：

> 如果主要 frontier competitors 协调“比自由竞争状态更慢地提高模型能力”，那么付费用户得到的产品改进 / output 被人为限制，可能构成横向限制竞争。

诉状把主要时间点放在 **9 月 12 日**：

- Dario Amodei 发布 “We Must Pace the Frontier”；
- Sam Altman、Elon Musk、Demis Hassabis 等公开回应 / 支持安全协调的方向；
- 原告试图从这些公开表态和更早的安全协调讨论推导存在 horizontal agreement。

## 3. 这会修订 9 月 12 日研究包，但不是推翻

本仓库 PR #35 已经明确区分：

1. 公开安全承诺；
2. embedded evaluator 等实际部署；
3. **binding industry pact**。

当时结论是：第三层没有被证明。

本轮应修订为：

> **binding pact 仍未被证明，但是否存在违法横向协调已经被具体原告写入联邦反垄断诉讼，安全协调的 competition-law 风险由政策讨论进入司法程序。**

这是“证据状态发生变化”，不是“事实结论已经改变”。

## 4. 必须坚持的诉讼证据边界

已经可以高等级确认：

- 案件确实提交；
- filing date、案号、法院、原告 / 被告、Section 1 cause 确实存在；
- 原告确实主张 9 月 12 日前后存在非法协调。

不能推出：

- 四家公司确实达成了 legally enforceable agreement；
- 模型发布速度实际已经因此放慢；
- 原告定义的 relevant market 会被法院接受；
- class 已被认证；
- 法院已经发 injunction；
- 用户已经被证明遭受可量化损失；
- safety coordination 本身当然违法。

截至 9 月 19 日主要报道时，四家公司尚未给出足以构成正式答辩的公开回应，法院也没有实体裁判。

所以证据等级：

- filing / docket metadata：**A-/A**；
- complaint 中关于 collusion 的描述：**A（原告确实如此主张），不是 A（指控本身为真）**；
- “行业已形成 cartel”：**不能推出**。

## 5. 为什么这个法律节点值得进大模型史

这不是普通的公司诉讼花边，因为它打到 frontier governance 的一个结构性难题：

### 单家独立减速

每家公司独自决定增加 eval、延长 release gate、降低 capability rollout，通常属于自己的产品 / 安全决策。

### 多家共同制定安全阈值

如果竞争对手要共同确定：

- 哪一类 capability 必须停；
- 何时统一不发布；
- 统一投入多少安全时间；
- 对哪些产品能力共同限制；

就可能与 competition law 产生张力。

Amodei 在 9 月 12 日原文其实已经意识到这一点，讨论了：

- government mediation；
- narrow antitrust waiver / exemption；
- 让公共规则而非纯私人协议承担协调机制。

而 Altman 同期主张 national mandatory rules，不认为所有安全工作都必须等 antitrust exemption 才能开始。

因此这起诉讼会逼迫“前沿安全合作”回答一个以前容易抽象化的问题：

> **谁有权让所有竞争者一起慢下来？**

可能的制度路线会分化成：

- 各公司 unilateral safeguards；
- 政府规定统一 capability thresholds；
- regulator-supervised coordination；
- 明确 antitrust safe harbor / exemption；
- 第三方 evaluator 提供公共测量标准，但不直接协调 release output。

## 6. 社区 / 政治反应不能替代法律事实

围绕 9 月 12 日 pacing 呼吁，已经出现两组相反观点：

- **安全派**：frontier race 存在 collective-action problem，任何单家公司单边放慢都可能被竞争者惩罚，因此需要共同规则；
- **竞争 / 反垄断派**：最大的 frontier labs 自己协商“少生产多少能力”可能变成 incumbents cartel，既减弱竞争，也可能抬高进入门槛。

这些分歧本身值得保存，但不能用政治人物、社交媒体或律师评论直接证明 Sherman Act 要件成立。

## 7. 与 embedded evaluation 的区别

9 月 18 日 Anthropic × Accenture / Faculty 的 embedded evaluation 是另一种机制：

- 第三方进入模型开发流程做 eval / red teaming；
- 它主要解决“内部说自己安全是否可信”；
- 它不必然要求 Anthropic 与 OpenAI / Google / SpaceXAI 协调产品 release quantity。

所以本书后续应把两条治理技术分开：

> **shared measurement / independent evaluation** 与 **competitor coordination / shared pacing** 不是同一件事。

这起诉讼反而可能推动厂商更多采用前者：共享评测标准，但把具体 release decision 保持为单家公司决策，或交给公共监管框架。

## 8. 建议入库位置与已有条目修订

- `编年/2026/09.md`：9 月 18—19 日新增 litigation follow-up；
- `志/AI伦理与治理.md`：新增“frontier safety cooperation × antitrust”小节；
- `表/大事年表.md`：现在尚可先不升格；若后续出现 injunction、政府 safe harbor、和解或行业治理制度变化，再升格；
- `review/research-2026-09-13-agent-economics-frontier-pacing.md`：后续整合时在“binding pact 未证明”后补一句“9 月 18 日已有消费者提起 antitrust suit，但仍无法院实体认定”。

---

# 五、本轮未升级为正式主事件的观察项

## 1. 美国政府 “AI Force”

9 月 19 日出现特朗普宣布将组建 “AI Force” / 任命 AI 负责人一类报道，但当前公开信息对组织架构、负责人、权限、预算、法律依据、与既有机构关系均不够清楚。

目前只适合作为 frontier-safety / 国家竞争政治背景，不足以写成一套已经生效的重大 AI governance regime。待正式 executive order、任命或机构文件再入编年。

## 2. OpenAI 中长期现金消耗预测

Financial Times / Reuters 报道了 OpenAI 内部 presentation 的极大规模 compute / infrastructure 与负自由现金流预测。这能说明 frontier model 的资本结构压力，但公开数字来自媒体获得的内部材料，OpenAI 未发布完整口径；并且其中大部分是未来预测，不是已经支出的事实。

本轮不把它和正式模型 / 政策事件并列升级。后续如果 SEC / 融资文件、正式公司披露或实际 capex 合同提供更强证据，再系统进入公司资本与基础设施史。

---

# 六、30 天竞争格局小结

9 月前 20 天已经出现一个越来越清晰的变化：

过去所谓“模型竞争”，常被写成：

> GPT vs Claude vs Gemini vs Grok vs Qwen vs DeepSeek，谁 benchmark 第一？

现在至少要拆成六个轴：

1. **checkpoint / intelligence**：底模本身能力；
2. **specialized SKU**：Law、LiveTranslate、STT、decision model 等；
3. **serving tier**：FlashX、高速 / 低延迟 endpoint；
4. **runtime / Agent harness**：Agents API、Projects、one Claude；
5. **deployment boundary**：Bedrock、ZDR、region / residency、self-host / commercial weights；
6. **governance boundary**：谁评估、谁能减速、事故如何披露、竞争者能否共同设限。

本轮最值得保存的历史线索不是“Qwen 又多了两个名字”或“GLM 又快了”，而是：

> **模型正在被拆成越来越多可商品化的服务层；同时 Agent 已经反向进入模型的基础设施生产，而治理制度必须开始处理‘竞争者为了安全能否协调’这一现实法律问题。**

---

# 七、证据分层总表

| 事件 / 结论 | 证据等级 | 当前可以说 | 当前不能说 |
|---|---|---|---|
| Qwen3.8-LiveTranslate 型号 / API / 价格存在 | A | 正式专用 realtime model 已可通过 Model Studio 调用 | 9/19 00:00 才首次可用 |
| LiveTranslate 60 输入语言 / 29 语音输出 | A | 官方规格如此 | 每种语言质量都同等高 |
| LiveTranslate 约 2.3s lagging | B（厂商 eval） | 厂商报告更低延迟 | 独立 benchmark 已普遍复现 |
| Qwen3.8-Omni-Flash 产品规格 | A | 1M、multimodal input、thinking、tools、web search 已有正式文档 | “Omni”代表音频输出 |
| Omni-Flash 精确 9/18 首发时间 | B+ | 9/18 前后已进入正式可用 / 发布窗口 | 官方 canonical timestamp 已完全钉死 |
| GLM-5.3-Flash 100k 国产 accelerator | B（厂商 telemetry） | Z.ai 正式披露该生产架构 | 第三方审计已验证数量 / 型号 / 成本 |
| Infra Agent <2 weeks / 3× throughput | B（厂商 telemetry） | Z.ai 给出具体工程过程与指标 | 已实现自主 recursive self-improvement |
| FlashX endpoint / ~200 tok/s advertised | A-/B+ | Vercel 正式提供 high-speed serving option | 是新的权重 checkpoint / 任意 workload 都稳定 200 tok/s |
| Buist 案 filed | A-/A | 反垄断案件确实存在 | 原告已经胜诉 |
| 四家公司存在非法 slowdown pact | allegation only | 原告这样指控 | cartel 已被司法认定 |

---

# 八、后续应追踪

1. Qwen 是否给出 LiveTranslate / Omni 的 canonical release post、模型卡或独立 benchmark；
2. Qwen3.8-LiveTranslate 的实际首批社区延迟、speaker diarization、长会话稳定性；
3. GLM-5.3-FlashX 是否在 Z.ai 自有 API / OpenRouter / Vercel 等不同 provider 出现稳定、可重复的 TTFT / TPS 数据；
4. Z.ai 是否公开国产 accelerator 的具体硬件组成、独立性能 / 成本数据或更完整的 infra open-source artifacts；
5. Infra Agent 的 human review boundary、patch acceptance rate、回滚 / incident telemetry；
6. `Buist` 案是否出现 motions to dismiss、class certification、实质答辩或法院对“共同安全标准 vs output restriction”的法律分析；
7. 美国政府是否真的建立具法律依据的 AI Force / AI czar 机构；
8. frontier labs 是否转向 government-mediated safety thresholds、antitrust safe harbor 或更多 independent evaluation，以绕开私人横向协调风险。

本轮不对以上未来事项提前下结论。