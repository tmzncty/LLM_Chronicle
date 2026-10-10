# 2026-10-09 增量研究包：Anthropic Usage Policy / Cyber Mission / ARTEX

> 范围：约 2026-10-08—09 新出现或确认的实质事件。与 10 月 6 日已入库的 Anthropic Cyber Verification Program 分开记录，避免把同一治理链重复计为一个事件。

## 1. Anthropic 发布 2026 Usage Policy 更新（10 月 8 日宣布，11 月 12 日生效）

### 核心事实
- Anthropic 于 2026-10-08 发布新版 Usage Policy，明确注明 **2026-11-12 生效**。因此应区分 announcement date 与 effective date。
- 新版整合并明确“deceptive campaigns / artificial activity”规则，覆盖政治和商业领域中隐藏消息来源、假账号/帖子放大等行为。
- 高风险健康、法律、金融、就业和基本服务等用途继续要求合格 human-in-the-loop，并要求受影响者知晓使用了 AI；官方称这些要求本身不是本次新增，而是重新表述得更明确。
- 对与 Claude 连接、可自主采取物理行动且可能造成人身伤害的硬件，新增/明确 operational controls：合格操作员须能观察并停止设备；Claude 断连时设备须能保持安全状态。
- 新增对“sustained and needless abusive or cruel behavior toward our models”的禁止，官方限定为反复、无明显目的的极端情况，不覆盖普通挫折、反驳、黑暗创作、模型测试或研究。Claude.ai / Claude Code 已允许模型结束极少数持续虐待式对话，Anthropic 称这仍将是主要执行机制。
- Supported Regions Policy 的执行范围被进一步明确到：人在 unsupported region、实体在当地注册/总部、以及被当地个人/实体多数持有或控制的情形。

### 证据
- **A：Anthropic 官方公告**：`https://www.anthropic.com/news/2026-usage-policy-update`（2026-10-08）。
- **B：The Guardian / The Verge 等独立报道（2026-10-08/09）**，重点报道“模型虐待”条款，同时也核对了欺骗活动、武器、监控、自主硬件等政策变化。

### 证据边界
- “11 月 12 日生效”不能写成“10 月 8 日已经全面按新版执行”；但官方同时说明某些执行行为（例如 Claude 结束极端虐待会话）此前已存在。
- Anthropic 明确称多项变化是 clarification，而不是 enforcement practice 的改变；不能把整份政策逐条都写成新禁令。
- “model welfare”条款不证明 Claude 有意识或具有道德地位；官方自己强调相关问题仍不确定。

### 历史意义 / 30 天关系
这次政策更新把 agentic / physical-action 能力正式映射到产品使用规则：不仅规定“模型能回答什么”，也规定当模型连接真实硬件并能自主行动时，谁必须能够观察、停止，以及断连时系统应如何进入安全状态。它与 9 月末 NVIDIA Open Agent Safety Platform、10 月初 macOS Full Disk Access、Windows Agent runtime 一起，形成从模型 policy 到 OS/runtime/hardware stop authority 的连续治理轴。

同时，“abusive behavior toward models”第一次成为 Anthropic Usage Policy 的显式条款，值得作为 AI welfare / model moral-status 争论进入政策史，但应与传统用户安全/内容政策分栏记录。

### 建议写入
- `编年/2026/10.md`：10 月 8 日政策宣布；11 月 12 日另记生效节点。
- 产品治理志 / 使用政策表：deceptive activity、high-risk HITL、physical-action hardware、model-abuse、supported regions。
- Agent identity/permission/runtime 志：补“qualified operator stop authority / safe state on disconnect”。

---

## 2. Anthropic Cyber Mission：Critical Infrastructure Defense Program + OSS Scanner（10 月 8 日）

### 核心事实
- Anthropic 于 2026-10-08 启动 **Anthropic Cyber Mission**，明确为长期计划，首批两条线：critical infrastructure 与 open-source software。
- **Critical Infrastructure Defense Program (CIDP)** 将 frontier Claude models、on-site engineers 和 threat research 带给 OT / critical-infrastructure defenders。创始合作方包括 Accenture、Booz Allen、CrowdStrike、Deloitte、Dragos、Hitachi、Insane Cyber、Nozomi Networks、Palo Alto Networks、PwC、Rockwell Automation。官方称已有若干合作方正在用 Claude 修复漏洞并帮助客户。
- **OSS Scanner** 是 opt-in、免费服务，为开源项目定期运行 Anthropic 最强模型扫描。报告包含漏洞利用 proof-of-concept、解释及在可用时给出修复建议；报告 **model-generated and sent without human review**。
- Anthropic 预期 OSS Scanner true-positive rate >90%，但这是厂商预期/内部口径，不是成熟独立生产可靠性数据。
- 官方明确承认 Project Glasswing 的经验：finding vulnerabilities 变快，但 verifying / prioritizing / fixing 仍是瓶颈，甚至发现到修复可能相隔数月。

### 证据
- **A：Anthropic 官方公告**：`https://www.anthropic.com/news/anthropic-cyber-mission`（2026-10-08）。
- 官方合作方名单和运行状态可视为产品/项目存在的 A 级证据；合作方引语属于 partner testimony，不等于独立 benchmark。

### 证据边界
- “已有合作方使用”不等于 CIDP 已在所有关键基础设施部门大规模生产部署。
- >90% true-positive rate 是官方 expectation；需后续记录公开样本、maintainer 反馈、误报率、修复接受率和 time-to-fix。
- 报告无人工审核意味着“发现”与“已验证漏洞/已接受补丁”必须严格分开。

### 历史意义 / 与 10 月 6 日 CVP 的关系
CVP 解决的是 **谁能获得降低 blocking 的高级 cyber capability**；Cyber Mission 则把能力进一步变成 **持续服务、工程师部署、免费 OSS scanning、漏洞报告与修复工作流**。因此不应重复合并为同一事件。

值得长期追踪的指标从 benchmark success 扩展为：`finding rate → verification → maintainer triage → patch acceptance → time-to-fix → residual risk`。

### 建议写入
- `编年/2026/10.md`：10 月 8 日 Cyber Mission / CIDP / OSS Scanner。
- Agent / cyber 志：CVP（access governance）与 Cyber Mission（deployment/service）相邻但分项。
- 产业采用表：记录创始合作方，但标注“program partner ≠ organization-wide production adoption”。

---

## 3. ARTEX 从开源转闭源：AI pentest agent 被关联到韩国金融机构攻击（10 月 8—9 日）

### 核心事实
- CrowdStrike 于 2026-10-07 发布威胁研究，称其发现针对韩国金融组织的 campaign，活动期为 9 月末至 10 月初；分析攻击者控制的开放目录时获得 Claude Code session histories、ARTEX 配置和 Claude memory files，并观察到 ARTEX 与 LLM 的组合使用。
- ARTEX 是面向 agentic penetration testing 的工具/harness，不是 foundation model；可连接外部 LLM。
- Reuters 10 月 9 日报道：ARTEX 开发者（GitHub handle `Autumn-27`）于 **10 月 8 日**表示，因工具被滥用，项目不再公开更新并转为 closed source，不再提供公开版本或维护支持；Reuters 检查时 GitHub 页面已经下线。
- Reuters 报道至少九家韩国银行自 9 月末以来成为攻击目标，韩国警方正在调查。CrowdStrike 对攻击者身份/来源的判断应按其威胁情报置信度记录，而不能写成司法定案。

### 证据
- **A/B+：CrowdStrike 原始威胁研究**：`https://www.crowdstrike.com/en-us/blog/unknown-threat-actor-uses-artex-to-target-south-korean-finance/`（2026-10-07），提供其收集到的 session/config/memory 证据链。
- **B+：Reuters**（2026-10-09），独立核对开发者公告、GitHub 页面下线、韩国调查及相关机构回应。

### 证据边界
- “ARTEX 出现在攻击链/攻击者工作流中”不等于 ARTEX 独自完成攻击，也不证明某个底层 LLM 对攻击结果负主要责任。
- 工具从开源转闭源是开发者治理动作，不等于代码已经从既有 forks、缓存或下载者手中消失，也不能据此推出滥用会停止。
- CrowdStrike attribution 与警方调查仍不是法院认定；攻击者身份、所有受害范围、各模型具体贡献需继续追踪。

### 历史意义
这是一个很清晰的 **open agent governance after misuse** 节点：治理动作不是模型厂商调整 API safeguard，而是独立 agent/harness 开发者直接撤回公开代码与维护。它适合与模型访问分级、cyber verification、开源权重治理并列比较。

同时该事件展示了 agent forensic provenance 的史料价值：session history、config、memory artifacts 能让调查者重建“operator → harness → model/backend → action”的部分链条。以后 cyber-agent 事件应单独记录 harness 与 model，不应把二者统称为“某某 AI 攻击”。

### 建议写入
- `编年/2026/10.md`：10 月 8 日 ARTEX 开发者宣布转闭源；10 月 9 日 Reuters 独立确认与调查状态。
- Agent / 开源治理志：open-source withdrawal after misuse。
- Agent reliability / provenance 志：session/config/memory artifacts 作为事后调查材料。

---

## 4. 观察项：OpenAI 三名安全研究人员解雇争议（10 月 8—9 日出现新的公开反驳）

这不是 24 小时内新发生的解雇本身：解雇发生在此前一周，故不应误记成 10 月 9 日新的人事事件。但 10 月 8 日三名前员工公开信、10 月 9 日 Reuters 对 OpenAI 回应的报道，构成后续治理史料。

- 前员工称解雇会对内部 safety discussion / external evaluator collaboration 产生 chilling effect，并否认部分 misconduct 叙述。
- OpenAI 表示调查发现的是 sensitive information handling / pattern of misconduct 与重大信任破坏，明确否认因其提出安全关切而解雇；具体违规细节未公开。
- 因双方事实叙述冲突、关键内部材料不可见，当前只宜作为 **B/C 级组织治理争议** 保存，不应判断哪一方动机叙述已被证实。

建议：若仓库已有最初解雇条目，则追加“10 月 8—9 日公开信与公司反驳”的 follow-up；若没有，可在月度整理时作为组织治理条目补入，但不要用报道发布日期替代原始解雇日期。

## 本轮结论
最近约 24 小时未确认 OpenAI、Anthropic、Google DeepMind、xAI、Meta、Mistral、DeepSeek、Qwen、Kimi、GLM、MiniMax 又正式发布新的主要通用 foundation-model checkpoint。

本轮真正的新历史轴是：

`usage policy for autonomous/physical action → defensive deployment program → open agent withdrawal after misuse → forensic provenance`

这进一步说明 Agent 史需要同时保存 capability、access policy、runtime/stop authority、deployment workflow、open-source distribution 和 post-incident provenance。