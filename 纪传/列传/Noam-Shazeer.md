# 《诺姆·沙泽尔列传》（Noam Shazeer）

> **记事断限：2026 年 11 月 12 日。** 研究者的论文、产品公司的自述、任职变化和独立报道各有不同的证据范围。本篇记一位在世研究者的工作与选择，不用后来的名望重新分配旧日团队的功劳，也不为职业转换预设终局。

## 一、从稀疏专家到 Transformer：研究如何改变规模的意义

沙泽尔在 Google 的机器学习团队长期从事算法与系统研究。2017 年初，他与 Azalia Mirhoseini、Krzysztof Maziarz、Andy Davis、Quoc Le、Geoffrey Hinton、Jeff Dean 等人发表稀疏门控混合专家网络论文。论文要回答的是：模型的参数容量能否增加，而每次处理一个样本时不必激活所有参数？门控网络只选用一部分“专家”，由此把网络容量与每步计算的关系重新安排。这不是后来全部 MoE 模型出自沙泽尔一人之手的依据，而是一次有明确合作者和实验背景的研究。[^1]

2017 年 6 月，《Attention Is All You Need》论文由八位作者署名：Ashish Vaswani、Noam Shazeer、Niki Parmar、Jakob Uszkoreit、Llion Jones、Aidan Gomez、Łukasz Kaiser、Illia Polosukhin。其设计让机器翻译中的序列建模不再依赖循环结构，成为后来 Transformer 模型的重要基础。沙泽尔虽是参与者，却不能取代其他七位作者成为“唯一发明者”；要理解这篇论文如何完成，应同时考察研究组织、实验任务与共同署名者的后续工作。[^2]

## 二、2019 年：对在线解码瓶颈的关注

2019 年 11 月，沙泽尔以单一作者身份发表《Fast Transformer Decoding: One Write-Head is All You Need》。其中的 multi-query attention（MQA）方案，使不同查询头共享 key 和 value，从而减轻自回归生成时的内存带宽压力。[^3]

这个研究对象与“把模型训练得更大”不同。在用户等待模型一词一词生成回复的场景里，执行成本、显存读写和延迟都有现实意义。沙泽尔此前研究如何不让所有参数每次都工作，此时又研究如何不让解码被内存访问拖慢。两项研究不能直接说成一条早已规划的道路，却可以看见相似的问题意识：**参数规模不能代替运行中的可用性**。

## 三、与 Daniel de Freitas 创办 Character.AI

沙泽尔与 Daniel de Freitas 离开 Google 后共同创办 Character.AI。2022 年 12 月，他们以创办者身份发表文章，回顾过往在 Google 参与的对话研究，并介绍用户可以自行创建人物角色、与之交谈的产品。文章称产品 beta 于当年 9 月开放，并披露上线初期的使用数据。后两项是公司提供的信息，不能直接据以认定长期留存、体验质量或安全性。[^4]

这次创业让研究的对象发生变化：论文里可以分别比较解码效率和模型指标，面向普通用户的角色会话产品却还要处理互动体验、用户期望与内容安全。对话不再仅是论文中的测试样例，还成为持续发生的使用行为。团队如何处理由此出现的商业和社会问题，应该从具体产品规则与可验证事件中寻找答案，而非把一切归为沙泽尔个人的技术追求。

## 四、2024 年：技术许可与返回 Google

2024 年 8 月 2 日，Character.AI 宣布与 Google 达成**非独家技术许可**安排；沙泽尔、de Freitas 及部分研究者加入 Google，Character.AI 保留其他团队继续运营，由 Dominic Perella 临时接任 CEO。同日 Reuters 报道亦作了交易与人员变动的区分。[^5]

这件事在人物传记里很容易被误写成“Google 收购 Character.AI，创业失败，研究者回归”；然而**技术许可、招聘人员、收购公司**是不同的法律和组织行为。该交易证明双方重新分配了技术和人才的使用方式，不能单凭此推断创办者的全部动机，也不能宣告原公司的故事已经结束。

## 五、从 Gemini 再转向 OpenAI：公布去向，不预断未来

Google 于 2026 年 5 月公布 Gemini 3.5 的官方文章列沙泽尔为 Google DeepMind 的副总裁及共同署名者。这足以说明他当时的公开职务及参与发布，却不足以把整代模型的算法、训练数据与结果归为他一人。Google 的 Gemini 演化，应与团队论文、公司本纪和产品发布的其他资料互相核对。[^6]

**2026 年 6 月 17 日（美国当地日期，部分转发页面记为 6 月 18 日）**，沙泽尔在 X 公开表示将离开 Google、加入 OpenAI。他感谢 Google 同事，并称这是一个艰难决定。Reuters 当日独立报道此事，同时说明具体离职生效日与入职时间尚不明确。有关他在 OpenAI 的具体研究任务，媒体有报道，但在缺乏明确任命文书前，本传只把**已公开的转职意向**写作事实，不把“宣布加入”简化为“已在某日就职”。[^7][^8]

这一转折打断了此前容易写成圆满故事的“离开 Google—创业—回到 Google”叙事。回归并非结局；机构与研究方向都仍在变。

| 时间 | 事件 | 互见 |
|---|---|---|
| 2017-01 | 共同发表稀疏门控混合专家网络论文 | 《MoE 列传》 |
| 2017-06 | 为 Transformer 论文八位作者之一 | 《Transformer 列传》《Attention 列传》 |
| 2019-11 | 发表 multi-query attention 论文 | 《志·推理优化》 |
| 2022-09—12 | Character.AI beta 开放；创办者公开介绍产品 | 《志·AI产品化演进》 |
| 2024-08 | 与 de Freitas 回到 Google；Character.AI 达成非独家许可 | 《Google 本纪》 |
| 2026-05 | 以 Google DeepMind 副总裁身份共同署名 Gemini 3.5 公告 | 《Gemini 世家》 |
| 2026-06-17（美国当地） | 公开宣布将离开 Google、加入 OpenAI；生效和到职日期待核 | 《OpenAI 本纪》《Google 本纪》 |

**考异与限制：** 论文能够证明作者、公开实验与设计主张，不能机械推断每个人的实际工作比例；公司创办者文章中的使用数字属自述，未在本文作独立验证；2024 年协议不是收购事实；2026 年 6 月转职属于公开宣布，不能据此捏造入职日期。全文所引网页**尚未归档 HTML 快照（snapshot pending）**。

## 评曰

沙泽尔的研究与任职轨迹，连接了网络容量、注意力结构、推理效率和面对大众的会话服务。这些工作看似分属算法、工程与商业，实际不断遇到同一个约束：实验中成立的能力，如何成为人可以持续使用的系统？Character.AI 的创立与其后技术许可，让这一问题进入组织和产品的选择之中。2026 年再从 Google 转向 OpenAI，更提醒读者一段“回归”的故事并不自动结束。创办者的决定不等于公司全部人员的决定，一名共同作者的贡献也不等于整代模型的来历。他后来的工作仍在继续，本传只记已可求证之事。

---

*据公开论文、公司自述与同时代报道初校于 2026-11-12；在世人物，随史料续修。*

[^1]: Noam Shazeer et al., “Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer”, 2017-01. https://arxiv.org/abs/1701.06538
[^2]: Ashish Vaswani et al., “Attention Is All You Need”, 2017-06. https://arxiv.org/abs/1706.03762
[^3]: Noam Shazeer, “Fast Transformer Decoding: One Write-Head is All You Need”, 2019-11. https://arxiv.org/abs/1911.02150
[^4]: Noam Shazeer, Daniel de Freitas and Character.AI, “Introducing Character”, 2022-12-05. https://blog.character.ai/introducing-character/
[^5]: Reuters, “Google hires top talent from startup Character.AI, signs licensing deal”, 2024-08-02. https://www.reuters.com/technology/artificial-intelligence/google-hires-characterai-cofounders-licenses-its-models-information-reports-2024-08-02/
[^6]: Google, “Gemini 3.5: frontier intelligence with action”, 2026-05-19. https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/
[^7]: Noam Shazeer, 2026-06-17（美国当地）在 X 的公开转职声明，存有可读文本转录。https://threadreaderapp.com/thread/2067400851438932297.html
[^8]: Reuters, “Google's Gemini co-lead Noam Shazeer to join OpenAI”, 2026-06-17（美国当地）. https://www.reuters.com/technology/googles-gemini-co-lead-noam-shazeer-join-openai-2026-06-18/
