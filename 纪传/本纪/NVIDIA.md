# 《NVIDIA 本纪》

> NVIDIA 在大模型史里不是“卖显卡的公司”这么简单。它真正出售的是一整套 AI 计算制度：GPU、NVLink、网络、CUDA、编译器、推理框架、机架、液冷、存储和参考数据中心。到 2026 年，竞争单位甚至已经从“一张 GPU”变成 **AI Factory**：训练、后训练、推理与 Agent runtime 都被装进同一套基础设施。

---

## 一、概述

NVIDIA 由 Jensen Huang、Chris Malachowsky、Curtis Priem 于 1993 年创立。它从图形芯片公司成长为 AI 基础设施公司的关键，并不只在硬件性能，而在 **CUDA 生态与系统级集成**。

大模型时代之前，GPU 是加速器；大模型时代之后，GPU 变成了训练和推理的主要生产资料。随着模型进入 Agent 阶段，NVIDIA 又试图把自己从“加速器供应商”推进成“AI Factory 平台供应商”。

因此 NVIDIA 的历史主线更适合分成四段：

1. GPU 成为通用并行计算平台；
2. CUDA 与深度学习绑定；
3. H100 / Blackwell 把 GPU 变成战略资源；
4. Vera Rubin 把竞争推进到机架、网络、存储与 Agent 工厂。

---

## 二、CUDA：真正难复制的不是芯片

**2006 年**，NVIDIA 发布 CUDA。[^1]

CUDA 让开发者可以用通用编程模型使用 GPU，而不必把计算伪装成图形任务。这个决定在 AlexNet 之前看不到大规模商业回报，却在深度学习爆发后产生巨大复利。

2012 年 AlexNet 使用 NVIDIA GPU 训练并赢得 ImageNet，GPU 训练神经网络从小众技巧变成主流路线。[^2]

之后 PyTorch、TensorFlow、JAX、cuDNN、NCCL、TensorRT 等不断围绕 NVIDIA 软件栈积累，形成一种比单代芯片更难迁移的生态壁垒。

这也是为什么“AMD 做出性能接近的芯片”与“AMD 立刻夺走训练市场”是两回事。

---

## 三、Transformer 与 GPU 集群：从实验设备到工业设施

2017 年 Transformer 论文的训练仍然可以在少量 P100 GPU 上完成。[^3]

但 GPT-3、PaLM、Llama、Claude 等模型将训练规模迅速推向成千上万张加速器。模型参数、数据量和训练计算量扩大以后，GPU 不再只是服务器零部件，而成为数据中心规划的核心约束。

NVIDIA 的几代关键产品因此与大模型时代几乎同步：

| 世代 | 代表产品 | 历史位置 |
|---|---|---|
| Volta | V100 | Transformer / GPT-3 早期大规模训练基础 |
| Ampere | A100 | 2020—2023 前沿训练主力 |
| Hopper | H100 / H200 | ChatGPT 后 AI 算力军备竞赛核心 |
| Blackwell | B200 / GB200 | 机架级 AI Factory 时代 |
| Blackwell Ultra | B300 / GB300 | reasoning / agentic inference 加速 |
| Vera Rubin | Rubin GPU + Vera CPU + NVLink72 | 2026 开始进入生产的新一代 Agentic AI Factory 平台 |

---

## 四、H100：算力第一次成为硅谷稀缺资产

H100 在 ChatGPT 爆发后迅速成为行业最稀缺的训练资源之一。[^4]

“有钱买不到 GPU”一度成为前沿模型公司的真实限制。大型云厂商、模型实验室和资本市场因此共同形成一种叙事：

> **更强 AI = 更多 H100。**

这套叙事在 2023—2024 极具解释力，但到 DeepSeek-R1 以后必须修正。

更准确的说法是：算力决定可探索空间，但**算法效率、激活参数、数据质量、后训练和 serving architecture**共同决定一单位算力最终换来多少智能。

---

## 五、出口管制：规则不是一条直线

### 5.1 A100 / H100 限制与中国特供型号

**2022-10-07**，美国 BIS 对先进计算芯片和半导体制造设备实施新的对华出口管制。[^5]

NVIDIA 随后推出 A800、H800 等满足当时规则的中国市场产品；**2023-10** 的新规又进一步收紧边界。[^6]

这个过程说明出口管制不是一次性事件，而是：

**规则 → 产品调整 → 规则再调整 → 供应链重新适配。**

### 5.2 AI Diffusion Rule：曾发布，但没有按原设计长期实施

**2025-01**，拜登政府发布 Framework for Artificial Intelligence Diffusion，试图把先进芯片与部分闭源模型权重的全球流动纳入分层制度。[^7]

旧稿把它写成 2025—2026 持续生效的全球三级框架，这是错误的。

**2025-05-13**，特朗普政府商务部 / BIS 明确宣布撤销 Biden-era AI Diffusion Rule，并指示执法人员不执行原规则；原主要合规要求原定 5 月 15 日生效。BIS 同时表示将继续通过其他先进芯片出口管制和后续规则处理相关国家安全问题。[^8]

所以到 2026 年，不能把“AI Diffusion Rule 的 Tier 1 / 2 / 3 世界”当成已经稳定运行的制度现实。

更准确的历史是：

> **模型与芯片出口治理正在变化，但具体工具会随政府更替和战略调整而改变。**

### 5.3 2026：对华出口仍是动态政策工具

到 2026 年，对华高端 AI 芯片出口政策仍在调整。Reuters 7 月报道，美国官员确认部分 H200 对华有限出货已开始，说明政策并不是简单的“越来越严”单向曲线。[^9]

这也进一步证明，地缘竞争必须按具体规则和日期记录，不能用“美国永远只会继续加码封锁”的线性叙事代替事实。

---

## 六、DeepSeek 时刻：效率没有消灭 GPU，反而重写了需求逻辑

**2025-01**，DeepSeek-R1 的发布使 NVIDIA 单日市值大幅下跌。市场担忧的核心不是某个模型，而是一个假设被挑战：

> 如果更高效的模型能够用更少或更受限的硬件达到前沿能力，那么未来还需要指数增长的 GPU 吗？

后来的事实并没有简单回答“需要”或“不需要”。

更合理的解释是 **Jevons 式反弹**：

- 单次推理更便宜；
- 可承受的 Agent 数量增加；
- 一个任务会产生更多 reasoning / tool-use / subagent 调用；
- 总计算需求仍可能继续上升。

因此 DeepSeek 对 NVIDIA 的冲击不是“GPU 要过时了”，而是把 NVIDIA 的价值叙事从：

**训练一个更大的模型需要更多 GPU**

推进成：

**整个社会运行更多 Agent 和更长任务需要更多高效计算基础设施。**

---

## 七、Blackwell Ultra：从训练 GPU 转向 reasoning / agentic inference

到 2026 年，Blackwell Ultra B300 已进入生产部署。NVIDIA 与合作伙伴越来越强调 reasoning model、agentic AI 和大规模 inference，而不只是预训练。[^10]

这里出现一个重要变化：

过去 GPU 的明星指标是训练吞吐；

Agent 时代更关心的是：

- 长上下文 prefill；
- token-by-token decode；
- reasoning token；
- 多 Agent 并发；
- KV cache；
- 网络带宽；
- 电力与液冷；
- 每任务成本。

因此 B300 / GB300 的历史位置，是把硬件设计更明确地对准推理和 Agent 工作负载。

---

## 八、Vera Rubin：NVIDIA 开始卖“Agent 工厂”

**2026-05-31**，NVIDIA 宣布 Vera Rubin 平台进入全面量产爬坡。[^11]

NVIDIA 对 Vera Rubin 的描述已经不是单一 GPU：

- Vera CPU；
- Rubin GPU；
- NVLink72；
- Spectrum-X 网络；
- BlueField / storage；
- DSX AI Factory reference design；
- 大规模机架与数据中心基础设施。

官方称 Vera Rubin 面向 agentic AI factories，并宣称相较上一代 Grace Blackwell，在特定规模下可提供显著更高的 Agent throughput。厂商性能数字应作为厂商自述看待，但产品定位本身非常清楚：

> NVIDIA 想把“运行 Agent 的整个数据中心”做成标准产品。

### 8.1 为什么网络和存储也变成 AI 芯片公司业务

多 Agent 系统与长上下文使瓶颈越来越容易从 GPU core 转移到：

- GPU 间通信；
- KV / cache 迁移；
- checkpoint；
- 数据读取；
- 网络与存储延迟。

因此 NVIDIA 的平台边界不断向外扩张。它卖的越来越不是一张卡，而是一套计算拓扑。

---

## 九、NVIDIA 的护城河正在变化

旧时代，NVIDIA 的护城河可以写成：

**GPU 性能 + CUDA。**

2026 年更准确的版本是：

**GPU + CPU + NVLink + Ethernet / InfiniBand + CUDA + inference software + storage + rack design + power/cooling ecosystem。**

这意味着竞争也在变化。

AMD、Google TPU、AWS Trainium、华为昇腾等不只需要做出一块性能优秀的加速器，还必须回答：

> 怎样训练、怎样推理、怎样联网、怎样调度、怎样让已有框架低成本迁移？

这正是 NVIDIA 最难复制的部分。

---

## 十、2026年11月：黄仁勋离任与领导权交接

**2026-11-08**，董事会公告就媒体披露的外国情报活动相关风险启动独立调查，当时仍公开表示信任黄仁勋及管理团队，并称没有理由认为公司秘密或国家安全已受损。[^12]

**2026-11-12**，Reuters 与 AP 独立报道：黄仁勋辞去 CEO 职务并退出董事会；Colette Kress 临时接任 CEO；Reuters 另报道 Harvey C. Jones 出任董事会主席。黄仁勋自 1993 年联合创办 NVIDIA 后掌舵约 33 年。[^13][^14]

这次人事变化把一个长期被公司品牌遮蔽的问题推到前台：**依赖创始人协调的 GPU、CUDA、网络、机架、投资与供应伙伴体系，能否在领导权交接后继续稳定执行？** 它并不意味着已有技术路线立刻失效，也不能据此宣告继任计划成败。相关私人关系与安全指控仍须和董事会正式调查结论区分，不由离职事实倒推责任。

> 📖 详见《黄仁勋本纪》《编年·2026年11月》。

---

## 评曰

NVIDIA 最重要的发明不是某一张 GPU，而是让 GPU 变成了一个**可编程、可扩展、可被整个开发者社会依赖的计算平台**。

CUDA 用二十年完成了这件事。

大模型时代又给这个平台增加第二层：数据中心本身开始像一台巨型计算机。H100 时代，人们数 GPU；Blackwell 时代，人们数机架；Vera Rubin 时代，NVIDIA 直接把机架、网络、存储、液冷和 Agent runtime 所需的计算组织方式打包成 AI Factory。

DeepSeek 之后，“堆更多 GPU 就会赢”的粗糙叙事已经失效。但这并没有自动削弱 NVIDIA。恰恰相反，如果同样预算可以运行十倍 Agent，市场可能选择运行十倍 Agent，而不是少买九成 GPU。

所以 NVIDIA 在 Agent 时代真正面对的不是“效率会不会毁掉算力需求”，而是：

> **效率红利最终会被用户拿去省钱，还是拿去制造更多计算？**

如果后者持续成立，那么 NVIDIA 的增长逻辑就从模型训练军备竞赛，转化成了整个社会的机器工作量增长。

这也是 2026 年以后理解 NVIDIA 最重要的新视角。

---

*本篇由终末地工业史官团队编纂：庄方宜（主笔）。*  
*2026-08 补订：GPT-5.6 Sol（OpenAI）。*

---

[^1]: NVIDIA, CUDA Zone / CUDA history. https://developer.nvidia.com/cuda-zone
[^2]: Krizhevsky, Sutskever & Hinton, “ImageNet Classification with Deep Convolutional Neural Networks”, NeurIPS 2012. https://proceedings.neurips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html
[^3]: Vaswani et al., “Attention Is All You Need”, 2017. https://arxiv.org/abs/1706.03762
[^4]: NVIDIA, H100 Tensor Core GPU materials. https://www.nvidia.com/en-us/data-center/h100/
[^5]: U.S. BIS, advanced computing export controls, 2022-10. https://www.federalregister.gov/documents/2022/10/13/2022-21658/
[^6]: U.S. BIS, updated advanced computing controls, 2023-10. https://www.federalregister.gov/documents/2023/10/25/2023-23049/
[^7]: U.S. BIS, Framework for Artificial Intelligence Diffusion, 2025-01. https://www.bis.gov/press-release/biden-harris-administration-announces-regulatory-framework-responsible-diffusion-advanced-artificial
[^8]: U.S. BIS, “Department of Commerce Announces Rescission of Biden-Era Artificial Intelligence Diffusion Rule”, 2025-05-13. https://www.bis.gov/press-release/department-commerce-announces-rescission-biden-era-artificial-intelligence-diffusion-rule-strengthens
[^9]: Reuters, “US official says Nvidia has begun shipping powerful H200 AI chips to China”, 2026-07-14.
[^10]: NVIDIA / GTC 2026 materials on Blackwell Ultra B300 and agentic AI deployments. https://www.nvidia.com/gtc/
[^11]: NVIDIA Newsroom, “NVIDIA Vera Rubin Ramps Into Full Production to Power Agentic AI Factories Worldwide”, 2026-05-31. https://nvidianews.nvidia.com/news/vera-rubin-full-production-agentic-ai-factory
[^12]: NVIDIA Board of Directors, “Statement from NVIDIA Board of Directors”, 2026-11-08. https://investor.nvidia.com/news/press-release-details/2026/Statement-from-NVIDIA-Board-of-Directors/default.aspx
[^13]: Reuters, “Nvidia CEO Jensen Huang steps down in big blow to AI boom”, 2026-11-12. https://www.reuters.com/business/retail-consumer/nvidia-ceo-jensen-huang-step-down-big-blow-ai-boom-2026-11-12/
[^14]: Associated Press, “Nvidia CEO Jensen Huang resigns after his affair raises national security concerns”, 2026-11-12. https://apnews.com/article/nvidia-megaspeed-china-singapore-huang-5403f152a601cf82ce939f1d24fffa0f
