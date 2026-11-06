# 2026-11-05 增量研究包：Kimi K3.1 Pro 权重落地与 Meta 收购 Conductor

> 核验日：2026-11-05（北京时间）；两项均非“11 月 5 日首次发布”。本包承接 `review/research-2026-10-25-kimi-k31-openai-training-containment.md` 的 Kimi 10/23 hosted launch 与 11/4 权重承诺，不重记旧事件。

## 一、Kimi K3.1 Pro：从计划开放到真实可下载权重

### 日期与事实
- **2026-10-23**：Kimi K3.1 Pro / Highspeed 已经在 Kimi、Work、Code、API 上线；当时权重仍为“最迟 11/4”承诺，仓库已有记录。
- **2026-11-02 至 11-04（精确上传/发布日待以 Hugging Face Git 历史核定）**：Moonshot 官方 Hugging Face 仓库 `moonshotai/Kimi-K3.1-Pro` 已提供真实模型文件、模型卡、专用 LICENSE；有二手报道称 11/2 上传，也有报道以 11/4 作为发布日。**2026-11-05 已直接核实 artifact 存在**，但不把报道日期分歧伪装成精确 commit 时间。建议之后读取 HF repo commit history / LFS metadata 固定首次完整可下载时间。
- 官方模型卡：2.8T total / 104B activated MoE，1,048,576 context，text+image，MoonViT-V2，MXFP4 weights / MXFP8 activations；`reasoning_effort` low/high/max；官方推荐 vLLM、SGLang、TokenSpeed；`reasoning_content` 与 `tool_calls` 的完整消息应在多轮中保留。下载权重并不等于已由第三方验证在普通消费级硬件稳定推理。
- 官方专用 `Kimi K3.1-Pro License` 允许下载、修改、微调和一般商业使用，但 **Model-as-a-Service 经营者及关联方连续 12 个月总营收超过 $20M 时，商业用途须另行与 Moonshot 签约**；产品月活超过 1 亿或月营收超过 $20M 还有显著标识要求；内部使用及官方/认证伙伴访问有明确例外。属于 **open weights / custom license**，不能简写为 OSI 开源或无限制商业使用。
- API 的先前价格 $2/M input、$10/M output 与 Highspeed 的 $4/$20 是 10/23 hosted 发布事实；权重下载没有统一的“每 token 定价”，自托管成本取决于硬件、并发、量化、吞吐、可靠性和维护。

### 证据、评价与历史位置
- **A（官方一手 artifact）**：Hugging Face 官方模型页 https://huggingface.co/moonshotai/Kimi-K3.1-Pro ，许可证 https://huggingface.co/moonshotai/Kimi-K3.1-Pro/blob/main/LICENSE 。可直接验证文件/许可/模型卡存在。
- **B（日期交叉报道）**：https://felloai.com/kimi-k3-1/ 称 11/2 上传；https://startupfortune.com/moonshot-ai-releases-full-weights-for-28-trillion-parameter-kimi-k31-pro/ 称 11/4 发布。两者日期不一致，须以仓库历史再核，不以任一二手文作为高等级准确时间证据。
- **B（独立评价、限特定 harness）**：10 月发布后的 Artificial Analysis 评价可作为模型能力背景，但**权重发布本身尚不能证明**自托管 checkpoint 与 hosted checkpoint 在 cyber、coding、长上下文、速度或幻觉率完全等价；Moonshot 模型卡中的 Terminal-Bench 4.0 65.7 等是厂商表格而非本轮独立权重复现。
- **社区**：已见开发者关注下载体积、推理资源和许可门槛，但缺少系统化的独立自托管重复测量；不可从下载量/点赞数推出生产采用或 ROI。
- **近 30 天竞争**：与 10/29 Mistral Large 4 正式开放权重、DeepSeek V4.1 Flash 和 GLM-5.3 的可部署生态形成新的开放权重竞争轴。此前“能力领先但只能 API 调用”的 K3.1 Pro 现在进入可自行托管/微调的模型池，**模型能力、许可证、部署控制权**需分别记录。
- **建议位置**：`编年/2026/11.md` 记实际权重节点（精确日期待核）；`表/模型版本沿革`、开放权重/许可证专题志；修订 10/25 研究包的“计划”状态为“已落地（见本包）”，保留 10/23 当时的史料语境。
- **不能推出**：无条件商用、第三方稳定运行、被削弱的 cyber 能力不可恢复、所有部署环境都能实现 1M context、与 hosted API checkpoint 完全相同。

## 二、Meta 收购多 Agent 编程工具 Conductor：产品收购与云端服务终止

### 日期与核心事实
- **2026-11-04（美国时间）**：Conductor 创始人公告 `Conductor is joining Meta`，Meta 向 TechCrunch 确认收购；交易金额和条款未公开。Conductor 原有产品允许多个 coding agents 在并行隔离工作空间处理软件任务，调用第三方模型而非自行训练 foundation model。
- **11/4 当天已经改变用户使用条件**：停止新用户注册和 App 下载；现有付费用户可免费继续使用原有付费功能，原有免费用户不能升级。
- **11/13（计划）**：Conductor Cloud 变为只读，用户可查看/导出但不能发新消息；活跃订阅者退款。
- **11/20（计划）**：Conductor Cloud 关闭并开始删除云端用户数据；官方提供迁移到本地和导出路径。
- **2027 年初（计划）**：本地产品仍获得新模型和关键修复至此时，随后逐步停止；“新界面/新产品”只属未来预告，不是现成 Meta 产品发布。
- 不能把“Meta 收购”写成 Conductor 现有云服务更强、更便宜或已并入 Muse Code。**本次是资本/人才与 Agent 工作流收编，同时发生明确的产品访问收缩和数据迁移窗口**。

### 证据、评价与历史位置
- **A（当事方公告与用户时间线）**：https://www.conductor.build/announcement ，直接给出 11/4、11/13、11/20 日期及迁移、退款、删除规则。
- **B+（独立报道、Meta 确认）**：TechCrunch 2026-11-04 https://techcrunch.com/2026/11/04/meta-acquires-ai-coding-startup-conductor/ ；引用 Meta 确认，未披露交易价。
- **社区/独立评价**：目前能直接核验的主要是收购消息和厂商迁移规则；没有独立量化 Conductor 并行 Agent 的长期成功率、成本或 Meta 收购后的产品质量。用户迁移负担是政策事实带来的直接影响，广泛社区满意度/不满仍待取样，不能凭少数帖子下总体判断。
- **近 30 天关系**：与 OpenAI Codex/Work、Anthropic Claude Code、Meta Muse Code 及 DeepSeek 10/31 的 event-driven prototype 一起，展示 Agent 竞争从模型 benchmark 扩展到**多 Agent 编排、工作区隔离、云端状态归属与产品持续性**。Conductor 使用第三方模型这一点尤其说明 orchestration layer 本身可被收购，而不是“新基础模型”。
- **建议位置**：`编年/2026/11.md` 的 11/4 节点；`志/Agent产品与商业化.md`、`志/Agent记忆状态与可恢复性.md`、`表/Agent主流产品与商业化对照表.md`；11/13、11/20 后核验实际服务状态。
- **不能推出**：收购价格、具体团队组织去向、Meta 已经迁移 Conductor 功能、所有用户数据已被删除、迁移后任务状态百分之百可恢复、生产 ROI。

## 史识与后续验证
两条事件有共同的历史线索：模型权重开放扩大部署控制权；Agent 平台被收购并终止云服务则缩小部分用户对运行时/任务状态的控制权。不能用“开放”或“收购”一个词替代 **权重/许可/算力** 与 **身份/工作区/数据迁移/服务持续性** 的实证检查。

本轮没有把其他缺少官方公告或可验证 artifact 的传闻升级成新模型/政策事实。待核事项：Kimi HF 首次完整上传的 Git 时间；下载后独立推理、license 实务、cyber checkpoint 对比；Conductor 11/13 与 11/20 实际执行和迁移体验。
