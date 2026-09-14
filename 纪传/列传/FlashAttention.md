# 《FlashAttention 列传》

> FlashAttention 没有发明新的注意力公式，却让已有的公式在长序列上真正跑得动。它的故事不是"我们想出了一个更好的注意力机制"，而是"我们看清楚数据在 GPU 里怎么流，然后重写了算法"——这是一部 IO-aware computing 的微型列传。

---

## 一、技术背景：标准 Attention 的显存墙

自注意力（self-attention）的核心计算是 `softmax(QK^T / √d_k)V`。这个式子干净、强大，但有一个硬伤：Q 和 K 都是 `[N, d]` 的矩阵，QK^T 的结果是 `[N, N]`——序列长度的平方。N=2048 时矩阵有 4M 元素，还好。N=32K 时就有 1B 元素。N=128K 时超过 16B。更不用说 ViT 的高分辨率输入和长视频 patch 序列。

问题不只是计算量。问题在于 GPU 的**内存层次**。标准 Attention 的典型实现流程是：

- 把 Q 和 K 从 HBM（高带宽显存）读到片上 SRAM
- 算 S = QK^T，把完整的 `[N, N]` 中间矩阵 **写回 HBM**（因为 SRAM 装不下大矩阵）
- 再从 HBM 读回 S，算 P = softmax(S)，又**写回 HBM**
- 再从 HBM 读回 P，算 O = PV，再写回

每次把中间矩阵写回 HBM 再读回来，都是 I/O 开销。FlashAttention 论文把 GPU 的内存层次纳入算法设计：片上 SRAM 容量小、带宽高，HBM 容量大但搬运代价不可忽略。避免完整中间矩阵的反复读写，可以缓解这里的瓶颈；这不意味着所有序列长度、硬件和实现都只受带宽限制。[^1]

随着长文本、图像等任务延长序列，注意力的运行时间与存储压力逐渐成为建模长上下文的障碍。这正是 FA-1 论文开篇提出的问题。[^1]

---

## 二、核心创新

### 2.1 FlashAttention-1：分块、增量、不落盘

2022 年 5 月，Tri Dao（Stanford）、Dan Fu、Stefano Ermon、Atri Rudra、Christopher Ré 发表 FlashAttention。核心洞察只有一句话：**不要写回完整的 S 和 P 到 HBM**。[^1]

具体怎么做？三个关键技术：

**分块（Tiling）**。把 Q、K、V 切成小块，在 SRAM 里计算局部得分和 softmax 统计量。FA-1 原论文 Algorithm 1 的外层遍历 K/V 块，内层遍历 Q 块；每次更新的是部分输出与统计量，只有遍历完相应的全部 K/V 块，才得到最终输出。不能把一个局部 softmax 当成全行的答案。[^1]

**增量 softmax**。分块之后，一行被拆成了多个段。在线算法更新行最大值和指数和，并把旧累积量重新缩放到新的最大值基准。这里的 exact attention 指仍计算原来的稠密注意力公式，不用稀疏化或低秩近似替代它；这是数学等价性，**不是浮点实现逐比特一致的承诺**。改变求和与运算顺序可能改变舍入误差，实际数值精度须另行检查。[^1][^3]

**重计算（Recomputation）**。反向传播不必保存完整的 S、P 矩阵；保存输出与必要的 softmax 统计量，就能在反向时按块重算中间结果。这增加了一些计算，却减少了 HBM 搬运。要分清三个不同的量：[^1]

三个技术合起来的效果：

| 量 | 原论文的结论 | 不能改写成什么 |
|---|---|---|
| 算术工作量 | 稠密 attention 仍为 O(N²d) FLOPs（Theorem 1） | 计算变成线性 |
| 额外存储 | 输入/输出之外为 O(N)，不保存完整 N×N 中间矩阵（Theorem 1） | 所有模型显存或 KV cache 都只需 O(N) |
| HBM 访问量 | Θ(N²d²/M)，其中 d ≤ M ≤ Nd，M 按可容纳的标量元素数计（Theorem 2） | 不带 SRAM 条件的 O(N) I/O |

N 是序列长度，d 是每个 head 的维度。固定 d、M 时，上述 I/O 表达式仍随 N² 增长；省去二次大小的中间存储，不等于所有搬运也变成线性。性能数据同样要带上范围：论文 Table 2 的 GPT-2 medium / OpenWebText / 8 张 A100 实验，把 HuggingFace 基线的 21.0 天降至 6.9 天，表中记为 3.0×；这是该配置的端到端训练结果，不是任意模型的内核加速保证。[^1]

**纸上实验：后来的最大值，怎样改写已经算过的部分？**

只看一个 query，假设缩放后的 logits 是 `[ln 2, 0, ln 3]`，对应标量 values 是 `[1, 2, 4]`。完整 softmax 的权重为 `[2, 1, 3]/6`，所以输出为 `8/3`。现在把前两个位置放在第一块，最后一个放在第二块。以下是依据在线 softmax 公式构造的教学例子，不是论文的性能实验。[^1]

令 m 为目前最大值，l 为 `Σ exp(score − m)`，a 为 `Σ exp(score − m) × value`；输出是 a/l。

| 处理阶段 | m | l | a |
|---|---|---|---|
| 第一块 `[ln 2, 0]` | ln 2 | 1 + 1/2 = 3/2 | 1 + (1/2)×2 = 2 |
| 第二块带来更大的 ln 3，先将旧量乘 exp(ln 2 − ln 3) = 2/3 | ln 3 | 1 | 4/3 |
| 加入第二块的 exp(ln 3 − ln 3) = 1 | ln 3 | 2 | 16/3 |

最后 `(16/3)/2 = 8/3`。如果漏掉重缩放，直接把第二块接到旧 l、a 上，会得到 `(2+4)/(3/2+1) = 12/5`——这正是“分块后各算各的 softmax”为何会出错。可以复制下面的 JavaScript 片段核对；用 Node.js 即可，不需要 GPU。

<!-- online-softmax-example -->
```javascript
function onlineAttention(blocks) {
  // 教学输入：blocks 与每块均非空，各块为有限 [score, scalarValue] 对。
  let m = -Infinity, l = 0, a = 0;
  for (const block of blocks) {
    const newM = Math.max(m, ...block.map(([score]) => score));
    const rescale = Math.exp(m - newM);
    l *= rescale;
    a *= rescale;
    for (const [score, value] of block) {
      const weight = Math.exp(score - newM);
      l += weight;
      a += weight * value;
    }
    m = newM;
  }
  return a / l;
}

const pairs = [[Math.log(2), 1], [0, 2], [Math.log(3), 4]];
console.log(onlineAttention([pairs.slice(0, 2), pairs.slice(2)]));
// 约 2.6666666666666665，即 8/3；不是逐比特相等的承诺。
```

此片段只展示小型输入的前向一行加权平均；不实现 CUDA kernel、mask、dropout、向量 values 或反向传播，也不以 JavaScript 的运行时间代表 FlashAttention 的速度。从仓库根目录运行 `node --test tools/flashattention_example.test.js` 可检查正文中的实际代码，包括不同分块、较大正负 logits 与漏掉重缩放的反例。

FlashAttention 的历史作用很特殊。它没有提出新的注意力公式，但改变了注意力的**可实现性**。一个 O(N²) 的算法能不能在长序列上跑，不再只取决于公式是否漂亮，还取决于实现是否 IO-aware。

### 2.2 FlashAttention-2：更好的并行与工作划分

2023 年 7 月，Tri Dao 独自发表 FlashAttention-2。论文标题很直接：《Faster Attention with Better Parallelism and Work Partitioning》。[^2]

FA-2 的主要改进：

**减少非矩阵乘法 FLOPs**。例如维持未归一化的输出累积量，把除以 softmax 指数和的操作推迟到循环末尾，减少重复归一化；新的最大值出现时，重缩放仍不可省。[^2]

**优化并行策略**。FA-1 原始实现只对 batch 和 head 维度做并行。FA-2 把序列长度维度也加入并行——前向时用行间并行，反向时用列间并行——改善长序列且 batch/head 较少时的 GPU 利用率。[^2]

**更好的工作划分**。前向时，FA-1 的 split-K 方案把 K/V 分给不同 warp，各 warp 还要交换、合并部分结果。FA-2 改为切分 Q，让各 warp 共享 K/V、负责不同输出行，减少 shared memory 通信。这是 warp 间的工作划分，不是“动态调整块大小”；论文还明确说块大小采用手工调优。[^2]

论文的 A100 80GB SXM4 注意力内核测试中，相对 FA-1 大体约 2×，最高约 230 TFLOP/s（73% 理论峰值）；端到端 GPT 风格模型训练相对 FA-1 则最高约 1.3×。内核与整模型是不同口径，不能把前一个数字移给后者。[^2]

2024 年 1 月 30 日的 **PyTorch 2.2** 发布说明宣布，`torch.nn.functional.scaled_dot_product_attention` 开始支持 FlashAttention-2；这项在当时公告中列为 Beta。框架支持是进入主流的具体证据，但不等于所有硬件、数据类型和调用都会使用该内核。[^5]

### 2.3 FlashAttention-3：新硬件的专项优化

2024 年 7 月，Shah、Dao 等人发表 FlashAttention-3，瞄准 NVIDIA Hopper (H100) 架构的新特性。[^3]

Hopper 带来的新能力：

- **WGMMA**（Warp Group Matrix Multiply-Accumulate）：比上一代 Tensor Core 更高效的矩阵乘法指令
- **TMA**（Tensor Memory Accelerator）：异步数据加载硬件单元，可以在计算进行的同时从 HBM 搬数据到 SRAM
- **FP8**：8 位浮点格式，比 BF16/FP16 更省显存和带宽

FA-3 的设计紧密围绕这三者：

- 用 WGMMA 做分块矩阵乘，最大化 Tensor Core 占用
- 用 TMA、warp specialization 与 GEMM-softmax 流水线，让数据搬运与计算更好地交错，减少等待
- 在 FP8 路径上用分块量化和 incoherent processing 缓解量化误差；这不等于低精度计算无损

论文在 H100 80GB SXM5 上测的是注意力内核：FP16 前向相对 FA-2 约快 1.5–2.0×，反向约快 1.5–1.75×；FP16 峰值约 740 TFLOP/s（约 75% 理论峰值），FP8 前向接近 1.2 PFLOP/s。[^3]

精度是另一张成绩单。§4.3 / Table 3 对含离群值的合成输入，以 FP64 为参考：FA3 FP8 的 RMSE 为 `9.1e−3`，低于 per-tensor scaling FP8 基线的 `2.4e−2`，但仍高于 FA3 FP16 的 `1.9e−4`。这说明它降低了该 FP8 基线的误差，不证明与 FP16 一样精确，更不能直接证明模型训练质量不变。论文的低 bit KV-cache 讨论属于其他研究的相关工作，不是 FA3 展示了 4–8× 的 cache 压缩；大规模低精度训练影响与进一步推理优化仍列在展望中。[^3]

到 FA-3，FlashAttention 已经不只是"加速 Attention"。它变成了一种**算法-硬件协同设计**的典范：新 GPU 出来，算法跟着硬件特性重写，把每一代硬件的潜力掏出来。

### 2.4 关键数据

| 版本 | 时间 | 核心改进 | 加速比 | 历史作用 |
|------|------|----------|--------|----------|
| FlashAttention-1 | 2022-05 | 分块 + 增量 softmax + 重计算 | GPT-2 medium / 8×A100 端到端：3.0× vs HuggingFace 基线 | 把 I/O 纳入 exact attention 的设计[^1] |
| FlashAttention-2 | 2023-07 | 序列维并行 + split-Q + 减少非 matmul FLOPs | A100 attention 内核约 2× vs FA-1；端到端另计 | PyTorch 2.2 宣布 SDPA 支持[^2][^5] |
| FlashAttention-3 | 2024-07 | H100 异步流水线 + FP8 误差控制 | H100 FP16 前向约 1.5–2.0× vs FA-2；反向另计 | 针对新硬件重新组织工作[^3] |

本表是作者论文/官方公告的单一一手来源口径汇总，未作独立 GPU 复现；不同行的模型、硬件、精度、阶段与基线不同，不能连乘成一个“通用加速比”。

---

## 三、影响与后继

### 3.1 长上下文不再是奢侈品

FlashAttention 缓解的是长序列注意力的中间存储与搬运成本，不是独自解决长上下文的全部问题。位置处理、数据、并行策略、硬件和其他内存开销仍然重要。仅凭某个模型公布了很长的上下文窗口，不能断言它采用了某一版本的 FlashAttention 内核。[^1][^2]

一个容易混淆的例子是 Llama 3 报告：§4.2.2 明确记载，**后训练 SFT 数据的拒绝采样**使用 PagedAttention 来管理和共享 KV cache。这是候选生成阶段的推理优化，不能写成预训练注意力内核采用 FA-2 的证据；该处也不能单凭方法引用确认 vLLM 软件部署。[^4]

### 3.2 I/O-aware computing 成为设计范式

FlashAttention 的另一个遗产是思维方式的传播。它告诉系统建模者和硬件工程师：一个算法的"理论复杂度"和"实际效率"之间，隔着内存层级。不看数据怎么在 HBM ↔ SRAM ↔ Register 之间流动，优化就只是调参。

FA-1 减少 HBM 访问，FA-2 进一步减少 shared memory 通信，FA-3 则用异步流水线适应 Hopper：三代工作的延续，不只是“同一个算法再快一点”，而是不断重新判断瓶颈在哪里。PagedAttention 所处理的 KV-cache 分配又是另一层问题；它可以帮助理解内存管理的重要性，却不应被简单归为 FlashAttention 的直接后代。[^1][^2][^3][^4]

### 3.3 与其他 Attention 优化互补

FlashAttention 没有取代稀疏注意力和线性注意力，而是与它们互补。

稀疏化减少需要计算的注意力位置；FlashAttention 的稠密版本不改变这些位置，而在实现上减少 I/O。FA-1 论文 §3.3 另给出 block-sparse 扩展：跳过预定为零的块。必须区分“对原稠密公式的 exact 实现”和“改变稀疏模式的模型选择”，不能因为同属一个项目就认为数学对象也相同。[^1]

改变注意力公式的路线与优化同一公式的实现，回答的是不同问题。FA-1 Theorem 1 保留 O(N²d) 算术工作量，不能把其线性额外存储写成线性 attention；也不能只靠复杂度符号判断一台具体 GPU 上谁更快。[^1]

### 3.4 消退或被吸收

PyTorch 2.2 的 SDPA 支持给出了一个可核实的“论文走进框架”的节点。是否实际选用该实现，仍要看版本、硬件与调用条件；框架集成不代表所有训练和推理都必经同一个内核。[^5]

其历史意义不需要依赖“每一次调用都在用它”这种无法证明的说法。FlashAttention 留下的启发是：**写算法的人，要看得见硬件里的水流。**

---

## 评曰

FlashAttention 的历史位置，不在注意力公式，而在打通了注意力与现实硬件之间的沟。

标准 Attention 的理论很干净，长序列的 N² 中间矩阵却会带来现实的显存和带宽压力。FlashAttention 把计算拆成块，在快速的 SRAM 里完成局部工作，再用在线 softmax 合并结果。数学等价、浮点误差、额外存储与搬运量各有边界，恰恰不能为了赞扬加速而混为一谈。

从 FA-1 的 I/O，到 FA-2 的并行划分，再到 FA-3 的异步和低精度，真正可贵的是把“为什么快”拆成可检查的机制。算法与硬件共同前进，史料也应把论文数字与它们成立的条件一同保存。

---

*本篇由终末地工业史官团队编纂：缪尔赛思（系统建模）。*

---


（相关条目：《推理优化》。）

[^1]: Dao et al., "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness", 2022 年首发。本次核对 arXiv:2205.14135v2（2022-06-23）：§3.1 / Algorithm 1 / Theorem 1，pp. 4–5；§3.2 / Theorem 2，p. 6；§4.1 / Table 2，pp. 7–8。算法与性能为作者论文的一手来源，未独立复现 GPU 实验。https://arxiv.org/pdf/2205.14135v2
[^2]: Dao, "FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning", arXiv:2307.08691v1（2023-07-17）：§§3.1–3.3，pp. 5–9；§4，pp. 9–12。注意区分 kernel benchmark 与端到端训练口径。https://arxiv.org/pdf/2307.08691v1
[^3]: Shah et al., "FlashAttention-3: Fast and Accurate Attention with Asynchrony and Low-Precision", 2024 年 7 月首发。本次核对 arXiv:2407.08608v2（2024-07-12）：§3.3，pp. 8–9；§4.1，p. 9；§4.3 / Table 3 / §5，pp. 10–12；Appendix A，p. 17。性能与误差数据为作者实验，不是模型质量无损证明。https://arxiv.org/pdf/2407.08608v2
[^4]: Dubey et al., "The Llama 3 Herd of Models"。本次核对 arXiv:2407.21783v3（2024-11-23），§4.2.2 “SFT Data / Rejection sampling”，pp. 17–18。采用方法及阶段的单一一手来源，不据此推断未披露的软件实现。https://arxiv.org/pdf/2407.21783v3
[^5]: PyTorch, "PyTorch 2.2: FlashAttention-v2 integration, AOTInductor", 2024-01-30 发布说明，`[Beta] FlashAttention-2 support in torch.nn.functional.scaled_dot_product_attention` 小节；页面另标有 2025-04-30 更新日期，不将其作为发布日。https://pytorch.org/blog/pytorch2-2/

来源核对日期：2026-09-14。版本、证据范围与尚未入库的快照状态见[来源索引](../../sources/纪传/FlashAttention/index.json)；下载用于核对不等于已归档全文。
