# 2026-10-01 备份考古研究线索包：Agensh / RLM / RAG 批评 / Kimi Code 上下文

> 来源说明：本包来自 2026-09-30 ChatGPT 导出备份中的私人分析对话（2026-09-05 至 09-25），不是独立研究。每条按凡例 §0.3 证据分层标注：**对话中的分析结论一律视为待验证线索，不构成入史证据**；本包价值在于指出哪些题目值得开正式研究包核验。原对话中的来源引用（论文页/官方文档）已随文注出，编纂时需重新核实链接与快照。

## 线索一：Agensh（微软研究院，2026-09-22 论文）——对等 Worker 自组织

**原对话核查结论（09-25）**：论文真实，主体可信。核心数字：GPT-5.6 Sol (high) 驱动 **1,024 个 Agent**，pandoc 任务通过率 **33.89% → 55.06%**。架构事实：Gitea + Mattermost + append-only shared context；Worker 循环 `gather → claim → act → verify → merge`；消息类型 CLAIM / FACT / FAIL / OBSERVED / PATCH_SUMMARY 存在。

**值得入史的角度**（对话中提出，需核验后展开）：
- 「管理者消失了，管理本身一件都没有少」——管理职责被拆成基础设施原语（Git=历史与并发、CLAIM=软任务锁、Mattermost=局部协商、FAIL=群体避坑）；
- **LLM Agent 的组织结构本身可以成为性能变量**（不是「1024」这个数字有意思）；
- cooperation loop 未硬编码进 runtime，只写在 Worker prompt 里——「智能层可以很薄，状态层必须很硬」，Agent 是可替换执行单元，持久的是 artifact/event/relation/claim/provenance。

**待办**：检索论文与项目页、双源核验数字、判断是否与 9 月 22-23 agent governance 研究包（PR #45 线）合并成一条。

## 线索二：RLM（Root LM）——context 降级为程序对象

**原对话分析（09-05，群聊纠错向）**：RLM 的可看点不是「agent 包装成函数」（subagent/delegate 早有），而是 **context as data, LM call as function, reasoning as program execution**——root LM 在 REPL 里 peek/slice/search/transform 构造小 context 再调 sub-LLM。群友「可 unroll 成 DAG」的批评在执行轨迹层面成立，但 RLM 的准确定位是「**让模型在线生成 DAG 的机制**」而非「不能表示成 DAG 的计算」。非黑箱：实现可存完整 trajectory（root iteration/code/sub-LLM calls/config/usage）为 JSONL 并有 visualizer；真正的问题是「执行过程可追踪，但控制策略难以静态分析」。

**待办**：找 RLM 原始论文/repo（对话引用的是项目文档），核验 trajectory 声明，评估是否够「趋势」级（与 09-22 Grok/MiMo 包的 agent 主线呼应）。

## 线索三：「RAG 已死」批评潮的靶子辨析

**原对话结论（09-20）**：批评打中的是 **2023–24 朴素 RAG**（固定 chunk→embedding→cosine top-k→塞 prompt），不是 RAG 本身。三个实锤问题：① 明知结构的数据被降级为概率检索（SQL/BM25/metadata filter 更可靠）；② chunking 主动破坏文档结构（chunk 失去「它是谁」——Anthropic Contextual Retrieval 正是补上下文再 embed，且配 BM25+rerank 而非纯向量）；③ 前提部分消失（大 context window 下「整个给模型」有时最优）。但 ICML 2025 LaRA 比较结论并非 RAG 全面落败（对话中被截断，需回查）。附带的传播学观察：技术 buzzword 生命周期循环（有用→神化→卖课→骂→宣布已死→下一个），以及「辅导班把工程折中包装成标准技术路线」——可作《论/Agent 时代》素材候选。

**待办**：核验 Anthropic Contextual Retrieval 帖与 LaRA 论文结论；「RAG 批评潮」若做条目应写成技术辨析而非站队。

## 线索四：Kimi Code 上下文档位变化（2026-09）

**原对话事实（09-17）**：`kimi-for-coding` = K2.8 Preview，**1M tokens（1,048,576）**，官方 9 月更新称全会员档位开放 1M；`k3` 同为 1M 上限但高档会员限定（否则 k3-256k）；`kimi-for-coding-highspeed` = 256K。工程坑：第三方模型接入时 CLI 环境变量 `KIMI_MODEL_MAX_CONTEXT_SIZE` 默认仍 262144，不显式配置则按 256K 管理。

**待办**：这是「中国模型上下文竞赛」条目的候选素材，需官方 changelog 双源；与 DeepSeek 256K、Qwen 1M 档对照（备份中另有 09-05/09-25 上下文规律对话，多为个人用量观察，不入史）。

## 本包明确不处理的备份条目（skip 理由）

DeepSeek 套餐查询×2 / 烧钱请求排查 / 3090 跑 Qwen 配置 / Token 消耗估算 / Pro 限额 / Lux 多会话耗 Token / 上下文大小规律查询×2 / 模型上下文对比 / SWE 上下文确认 / 改成 DeepSeek 版本 / 群聊智能体测试 / Agent 测试任务 —— 个人用量与运维咨询，无公共史价值。GPT-5.5 上下文（07-28）、DeepSeek-V4-Flash-0731（07-31）超出 9 月备份主线且编年已有 9-10 DeepSeek 调价条，待正式研究包覆盖。
