# 2026-09-21 增量研究包：模型自动迁移、Agent 平台边界、OpenAI 融资链与中美 AI 通知提议

> 检查窗口：以 2026-09-21 北京时间傍晚为基准，重点检查最近约 24 小时；对前一晚开始发酵、今天获得平台行动或更强证据的 Agent 事件作连续补证。  
> 仓库基线：本轮开始时 `main` HEAD 为 `1a5d78f34a379a27c30265876b8b9cea34137a00`，PR #42 已合并。已检查最近提交、`编年/2026/09.md`、`表/大事年表.md`、`表/主要融资与估值表.md`、`志/AI Agent 生态.md`、`志/AI产品化演进.md`、`志/AI伦理与治理.md`、`志/AI基础设施与芯片.md`、`志/Agent宣传、实测与可靠性.md`，并检索最近 review 研究包。仓库已有 9 月 8—9 日 Meta Muse 发布、9 月 18—20 日模型生命周期 / aggregator lifecycle、Qwen3.8 / DeepSeek / GLM 等材料；本包只记录新的生效节点、后续平台执行与资本 / 治理增量，不重复已有模型发布。

---

## 本轮结论

最近约 24 小时没有确认 OpenAI、Anthropic、Google DeepMind、xAI、Meta、Mistral、DeepSeek、Qwen、Kimi、GLM、MiniMax 又正式发布新的主要通用 foundation-model SKU；Anthropic 下一型号仍只有“可能提前发布”的媒体报道，不能入作正式新模型。

但本轮确认四组值得进入《大模型纪事》的实质增量：

1. **2026-09-21 00:00 北京时间：阿里云 OpenSearch AI 搜索开放平台正式执行一批模型下线，并把仍调用旧 model ID 的请求自动路由到 `qwen3.8-flash`。** 受影响的七个 ID 包括 `deepseek-r1`、两款 R1 Distill、`deepseek-v3`、`deepseek-v4-flash`、`qwen-turbo`、`qwen3-235b-a22b`。这是“模型退役 + 默认模型语义改变”已经实际生效，而不只是未来公告。
2. **2026-09-20—21：Amazon 已阻止 Meta Muse 在 Amazon.com 代用户购物。** Amazon 对 GeekWire 表示，Meta 未预先告知 / 获准让 Muse 访问，Muse 浏览时不表明 Agent 身份，并可能处理客户凭据与账户数据；Muse 用户已看到“unauthorized AI agent”提示。这是第三方网站对消费级通用 Agent 的实际 access-policy enforcement，不只是安全白皮书。
3. **2026-09-21：SoftBank 启动 $10B 美元债 + €1B 欧元债发行，主要用于 10 月 1 日预计交割的 OpenAI 第三笔 $10B 追加投资。** 这不是新的 OpenAI 融资轮，而是既有 2026 年 $30B SoftBank follow-on commitment 的长期融资落地；它把“前沿模型资本竞赛”从股权承诺继续延伸到大规模公开债务市场。
4. **2026-09-20：中美官方确认就人工智能问题举行对话；美方提出国家安全级 AI 事件通知机制。** 中国商务部 / 新华社确认双方进行了 AI 对话；Reuters 记录 Bessent 表示美方提出 notification mechanism，供特朗普—习近平峰会考虑。现阶段是**提议 / 对话**，不是已经签署、生效的双边 AI 事故通报协议。

这四件事看似分散，实际上共同指向 2026 年大模型竞争的一个新层次：

> **模型的实际历史身份越来越由“谁把哪个 ID 路由到什么模型、Agent 被哪个外部平台允许进入、资本如何把未来算力和模型投入变成长期负债、国家之间怎样定义跨境 AI 事故”共同决定。**

---

# 一、阿里云 OpenSearch：旧 model ID 继续调用，但实际模型被自动改成 Qwen3.8 Flash

## 1. 准确日期：9 月 21 日 00:00 已实际生效

阿里云 OpenSearch 官方公告明确写明：

- 生效时间：**2026-09-21 00:00:00（北京时间）**；
- AI 搜索开放平台停止提供一批旧模型的调用；
- 到期后若用户仍调用旧 model ID，平台不会单纯报错，而会**自动路由到推荐替代模型**；
- 七个旧 ID 的推荐替代全部是 `qwen3.8-flash`。

官方清单：

| 下线 model ID | 自动 / 推荐替代 |
|---|---|
| `deepseek-r1` | `qwen3.8-flash` |
| `deepseek-r1-distill-qwen-7b` | `qwen3.8-flash` |
| `deepseek-r1-distill-qwen-14b` | `qwen3.8-flash` |
| `deepseek-v3` | `qwen3.8-flash` |
| `deepseek-v4-flash` | `qwen3.8-flash` |
| `qwen-turbo` | `qwen3.8-flash` |
| `qwen3-235b-a22b` | `qwen3.8-flash` |

一手来源：

- Alibaba Cloud OpenSearch, “智能开放搜索 OpenSearch AI搜索开放平台部分模型下线”  
  https://help.aliyun.com/zh/open-search/search-platform/product-overview/announcement-intelligent-open-search-opensearch-ai-search-open-platform-partial
- English mirror, “Notice: Decommission of certain models on the OpenSearch AI Search Open Platform”  
  https://help.aliyun.com/en/open-search/search-platform/product-overview/announcement-intelligent-open-search-opensearch-ai-search-open-platform-partial

证据等级：**A**（平台官方生效公告）。

## 2. 不能把它写成“DeepSeek 在阿里云全平台今天全部下线”

这是本事件最重要的史料边界。

OpenSearch 公告把原因写成“因大模型服务平台百炼下线部分模型”，但阿里云 Model Studio 当前的 DeepSeek 专页同时明确写着：

- `deepseek-v3`、`deepseek-v3.1`、`deepseek-v3.2`、`deepseek-v3.2-exp`、`deepseek-r1`、`deepseek-r1-0528`、若干 distill 型号将在 **2026-10-10** 下架；
- 当前 Responses API 仍列出 `deepseek-v4.1-flash`、`deepseek-v4-flash`、`deepseek-v4-flash-0731`、`deepseek-v4-pro`、`deepseek-v4-pro-0813`。

来源：

- Alibaba Cloud Model Studio, “DeepSeek-Alibaba Cloud”  
  https://help.aliyun.com/en/model-studio/deepseek-api

因此截至今天，最可靠的写法只能是：

> **9 月 21 日，OpenSearch AI Search Open Platform 这条产品路径对七个 model ID 执行退役和自动迁移；不能据此断言这些 DeepSeek 型号已在 Alibaba Cloud Model Studio 的所有调用路径同时全局下线。**

OpenSearch 公告与 Model Studio 专页之间存在明显的产品范围 / 生命周期日期差异。后续需要继续核对：

- 是否是 OpenSearch 自己提前停止转发，而底层 Model Studio API 继续服务；
- OpenSearch 文案中的“百炼下线”是否沿用了旧计划或针对不同产品域；
- 10 月 10 日是否仍会发生 Model Studio 更广泛的实际下架。

这类不一致本身就是模型史的重要史料：**“同一云厂商”并不等于“同一个模型生命周期”。**

## 3. 历史意义：model ID 不再可靠代表模型身份

普通 API 退役通常有两种结果：

1. 请求失败；
2. 用户主动改代码迁移到新 ID。

OpenSearch 这次多了一种更值得留史的行为：

> **旧 model ID 仍被业务代码请求，但平台把它送到另一款模型。**

这意味着“服务连续”与“模型语义连续”被分开了。

业务层可能看见：

- HTTP 调用继续成功；
- endpoint / 调用代码不一定立刻改；
- 但真实执行模型从 DeepSeek / 旧 Qwen 变成 Qwen3.8 Flash；
- 能力、行为、推理风格、token 用量、价格都可能变化。

阿里云官方自己明确提醒：替代模型在**能力、效果与计费**上可能不同，要求提前做效果和成本验证。

因此可靠的生产记录不能只保存：

> `requested_model_id`

还应尽量保存：

- `requested_model_id`；
- `resolved / served model`（若平台暴露）；
- provider；
- product surface / gateway；
- route policy version；
- request date；
- fallback reason。

否则以后复盘时，很可能出现“日志上一直写 DeepSeek R1，但 9 月 21 日之后其实已经是 Qwen3.8 Flash”的史料断裂。

## 4. 与 9 月 19 日 aggregator lifecycle 条目的关系

9 月 19 日研究包已经因 GitHub Copilot 的模型退役公告提出至少区分：

- vendor release；
- vendor deprecation；
- aggregator availability；
- aggregator default；
- aggregator deprecation；
- enterprise admin enablement。

今天 OpenSearch 把这一框架再推进了一步，应新增：

> **aggregator replacement / silent reroute（聚合层自动替换）。**

因为“从列表里移除旧模型”和“旧 ID 仍被接收但路由到新模型”对生产系统的语义完全不同。

## 5. 社区 / 独立评价

截至本轮检查，没有找到足够广泛、可重复的独立开发者样本来判断：

- 自动迁移后搜索效果平均变好还是变差；
- DeepSeek → Qwen3.8 Flash 对 RAG / 搜索 agent 的 tool behavior 有何系统性变化；
- 实际账单是否升降；
- 是否已有大量线上回归故障。

因此不能因为阿里推荐 Qwen3.8 Flash，就写成“Qwen3.8 Flash 已被证明全面优于所有被替代型号”。

目前能确认的是**平台做出了统一替代选择**，这是一项产品 / 分发决策，而不是独立 benchmark 结论。

## 6. 建议入库位置

- `编年/2026/09.md`：9 月 21 日实际生效节点；
- `志/AI产品化演进.md`：模型 ID、默认路由与产品级生命周期；
- `志/Agent宣传、实测与可靠性.md`：生产回归、模型 provenance；
- 模型生命周期相关表：新增 `aggregator replacement / reroute` 字段；
- 到 **2026-10-10** 再核对 Model Studio DeepSeek 全平台下架实际状态。

---

# 二、Amazon 阻断 Meta Muse：网站开始把“是否允许第三方 Agent 进入”变成独立权限层

## 1. 事件：Muse 被 Amazon.com 实际挡下

GeekWire 于 9 月 20 日晚（当地时间）报道，并引述 Amazon 公司声明：

- Amazon 已阻止 Meta Muse 在 Amazon.com 代用户购物；
- Muse 用户会看到提示：继续由未授权 AI Agent 访问违反 Amazon Conditions of Use；
- Amazon 称 Meta 没有提前通知 Amazon，也没有获得授权；
- Amazon 称 Muse 浏览时没有向网站表明自己是 Agent；
- Amazon 认为 Muse 可能捕获 / 保存客户凭据并抓取账户数据；
- Amazon 已要求 Meta 从 Muse 的相关体验中移除 Amazon，并表示双方正在直接沟通。

独立来源：

- GeekWire, “Amazon blocks Meta’s Muse AI assistant in new standoff over agentic shopping”, 2026-09-20  
  https://www.geekwire.com/2026/amazon-blocks-metas-muse-ai-assistant-in-new-standoff-over-agentic-shopping/
- The Verge, “Amazon doesn't trust Meta's Muse AI agent”, 2026-09-21  
  https://www.theverge.com/tech/998078/amazon-blocks-meta-muse-ai-agent-shopping

Meta 在本轮报道时尚未就 Amazon 的最新阻断给出同等级公开回应。

证据等级：

- Amazon 已实施阻断：**A-/B+**（Amazon 具名公司声明 + 用户可见阻断，尚未找到独立官方公告页）；
- Muse 是否真的“捕获并保存”凭据到 Amazon 所担忧的程度：**B-/争议**，这是 Amazon 的安全判断，不等于已经公开完成第三方法证验证；
- Muse 不标识 Agent 身份访问：**B+**（Amazon 具名声明，多家媒体复述）；
- “Muse 已造成 Amazon 用户数据泄露”：**不能推出**。

## 2. 与 9 月 19 日 Muse 消息权限争议要分开

前一晚还出现另一条 Muse 权限争议。Inc. 的 Jason Aten 报告：Muse 引用了他 Messages 私聊中的内容，而他认为自己没有授予该访问。

Muse 自己先解释成“读取 notification preview”；随后 Meta Superintelligence Labs 的 David Singleton 公开澄清：

- Muse Mac 端若要读取 Messages，需要用户开启相关权限，包括 Full Disk Access；
- 该功能是 opt-in；
- Muse 并不会像它自己声称的那样监视 Mac 通知；
- Muse 对自己内部数据路径的解释是错误的，Meta 为错误回答道歉，并表示会改善 Muse 对自身 internals 的理解。

来源：

- Inc., “Meta’s New Muse AI Agent Read My Private Messages. I Never Asked It To”, 2026-09-19  
  https://www.inc.com/jason-aten/metas-new-muse-ai-agent-read-my-private-messages-i-never-asked-it-to/91408202
- The Verge, “Meta’s Muse is creepy, but maybe not for the reasons you think”, 2026-09-19  
  https://www.theverge.com/ai-artificial-intelligence/997833/meta-muse-creepy
- Meta Muse official product page  
  https://ai.meta.com/muse/

这里不能下结论说：

> “Muse 已经被证明绕过 macOS 权限偷偷读完整 Messages 数据库。”

因为 Meta 明确否认这种机制，公开材料还没有独立系统审计来解决 Aten 对实际授权状态与 Meta 对权限流程解释之间的差异。

但已经能够确认另一件对 Agent 治理同样重要的事：

> **Agent 的自然语言自我解释不能被当作权限审计日志。**

一个 Agent 可能真的拥有某项数据能力，却无法准确说明自己是通过 notification、database sync、connector 还是其他通道拿到内容。

所以未来“问 Agent 你刚才为什么能看到这个？”不能成为合规控制。需要可机器核验的：

- connection grant；
- OS permission；
- credential provenance；
- data-source label；
- action log；
- website / third-party authorization；
- actual served identity。

## 3. Amazon 阻断为什么比一次购物失败更重要

Muse 的官方产品设计是：

- 若服务有 API，使用用户提供的 credentials 连接；
- 若没有 API，Agent 可以像用户一样通过浏览器使用网站。

Amazon 的最新行动说明：

> **“用户授权 Agent”并不自动等于“目标网站授权 Agent”。**

至少存在三个彼此独立的许可主体：

1. **用户 → Agent**：我允许它代表我购物吗？
2. **平台 / OS → Agent**：它能拿到我的账号、消息、密码或浏览器状态吗？
3. **目标服务 → Agent**：Amazon 是否允许这个自动化主体进入、抓取、登录和交易？

Agent commerce 由此暴露出一个传统浏览器时代不够明确的新问题：

> **credential delegation ≠ service authorization。**

Amazon 甚至把“Agent 是否明确标识自身身份”列为核心争议之一，这与仓库长期跟踪的 Agent identity / permission / credential 线直接相连。

## 4. 不能推出什么

目前不能写：

- Amazon 已证明 Meta 违反 CFAA；
- Muse 已泄露大量 Amazon 用户密码；
- 所有网站都将封禁第三方购物 Agent；
- Amazon 的立场已经获得法院普遍支持；
- Meta 已接受 Amazon 的要求。

GeekWire 提醒，此前 Amazon 对 Perplexity 的法律争议中，第九巡回法院曾对“究竟是用户还是 Agent 公司在访问网站”的联邦反黑客法问题作出不利于 Amazon 的裁定；Amazon 当前 Muse 提示主要援引 Conditions of Use。因此今天最准确的历史节点是：

> **平台已经实际执行 Agent access policy，但相关法律边界仍在形成。**

## 5. 建议入库位置

- `编年/2026/09.md`：Muse 发布后的第一轮平台级阻断；
- `志/AI Agent 生态.md`：agentic commerce 与第三方服务授权；
- `志/AI伦理与治理.md`：用户同意、目标服务同意、数据权限三层边界；
- `志/Agent宣传、实测与可靠性.md`：Agent 自我解释 ≠ 系统事实；
- Meta / Amazon 相关纪传：记录双方在 Agent 分发与购物入口上的冲突。

---

# 三、SoftBank 启动超 $11B 债券发行：OpenAI 的股权资本承诺开始转成长期公开债务

## 1. 9 月 21 日的新事件不是“OpenAI 又融资 $11B”

Reuters 于 **2026-09-21 01:43 UTC** 报道，根据 term sheet：

- SoftBank Group 启动 **$10B 美元计价 senior unsecured notes**；
- 同时发行 **€1B 欧元计价 senior unsecured notes**；
- 美元债分 3.5 / 5.5 / 7.5 年期限；
- 欧元债分 4 / 6 年期限；
- 资金主要用于 SoftBank 对 OpenAI 的第三笔 **$10B** follow-on investment；
- 该 tranche 预计 **2026-10-01** 交割；
- 部分资金用于一般公司用途；
- 债券预计 9 月 24 日定价、9 月 29 日结算；
- Citigroup、JPMorgan 为 lead bookrunners。

独立来源：

- Reuters, “Softbank Group launches over $10 billion in bonds for OpenAI investment, term sheet shows”, 2026-09-21  
  https://www.reuters.com/business/media-telecom/softbank-group-launches-over-10-billion-bonds-openai-investment-term-sheet-shows-2026-09-21/

这不是 OpenAI 新增一个 $11B 股权融资轮。债券是**SoftBank 自己融资**，服务于它此前已经签订的 OpenAI 投资承诺。

## 2. 一手背景：2026 年 $30B follow-on 是既有合同

SoftBank 2 月 27 日官方公告：

- 与 OpenAI Group PBC 签署 **$30B** follow-on investment definitive agreement；
- 分三笔，每笔 $10B；
- 计划日期为 4 月 1 日、7 月 1 日、10 月 1 日；
- 三笔全部完成后，SoftBank 对 OpenAI 累计投资预计 **$64.6B**；
- 预计持股约 **13%**；
- 当时披露的 pre-money valuation 为 **$730B**。

来源：

- SoftBank Group, “Follow-on Investments in OpenAI”, 2026-02-27  
  https://group.softbank/en/news/press/20260227

SoftBank 3 月又签了总额 $40B 的 bridge facility。9 月 9 日官方宣布，9 月 15 日提前偿还当时仍未偿的 **$25.9B** bridge balance；官方明确说将利用资产和其他融资手段逐步替换桥贷。

来源：

- SoftBank Group, “Execution of Bridge Facility Agreement Primarily for the Follow-on Investments in OpenAI”, 2026-03-27  
  https://group.softbank/en/news/press/20260327
- SoftBank Group, “Early Repayment of Bridge Loans”, 2026-09-09  
  https://group.softbank/en/news/press/20260909

因此今天债券发行最适合放进这样一条资本时间链：

> **股权承诺 → bridge loan → 提前偿还 bridge → 长期债券资本。**

## 3. 历史意义：AI 资本竞赛进入 liability-structure 史

过去“大模型融资史”常只记：

- 融资额；
- 估值；
- 谁投了谁。

但当单一投资方对一家前沿实验室的累计投资承诺达到数百亿美元，真正决定它能否持续的已经包括：

- 资金是 equity、bank loan 还是 bond；
- 债务期限；
- 再融资成本；
- collateral / unsecured；
- LTV；
- 利率环境；
- 被投资公司的流动性事件 / IPO 预期。

SoftBank 2 月公告还写明，所购 preferred shares 会在 OpenAI IPO / related listing transaction 时自动转换为 common shares。

因此 OpenAI 的资本史已经不能只写成“估值上涨”。它开始与 SoftBank 自己的资产负债表、债券市场和未来退出路径深度耦合。

## 4. 证据等级与不能推出什么

证据等级：

- SoftBank $30B follow-on agreement、计划三笔时间、预计累计 $64.6B：**A**（SoftBank 官方）；
- 9 月 9 日 bridge loan 提前偿还：**A**；
- 9 月 21 日 $10B + €1B 债券启动：**B+ / A-**（Reuters 见到 term sheet；日本假日当天 SoftBank 未即时公开回应）；
- 9 月 24 日最终定价、9 月 29 日结算：**未来计划，尚未发生**；
- 10 月 1 日 OpenAI 第三笔 $10B 交割：**未来计划，尚未发生**。

不能写：

- “OpenAI 今天拿到了 $11B 新融资”；
- “第三笔 $10B 已经交割”；
- “债券已经完成结算”；
- “SoftBank 累计 $64.6B 投资已经全部到账”；
- “债务融资本身已经证明投资会获得正 ROI”。

## 5. 建议入库位置

- `编年/2026/09.md`：9 月 21 日债券启动；
- `表/主要融资与估值表.md`：作为 OpenAI 既有融资的“投资方融资结构 / follow-on 执行”注释，而不是误新增成 OpenAI $11B 融资轮；
- `志/AI基础设施与芯片.md`：资本供给与算力军备竞赛；
- `纪传/本纪/OpenAI.md`：SoftBank 关系从 Stargate / equity 承诺延伸到长期债务融资；
- 到 9 月 24、9 月 29、10 月 1 分别核验定价、结算、第三 tranche 实际交割。

---

# 四、中美 AI 对话与“国家安全级事件通知机制”提议：跨境 Agent / 模型事故开始进入国家间沟通框架

## 1. 事件日期：9 月 20 日举行对话；9 月 21 日中方正式发布简短通稿

中国商务部 9 月 21 日转载新华社通稿，确认：

> 当地时间 **2026-09-20**，何立峰、美国财政部长 Scott Bessent 和贸易代表 Jamieson Greer 在纽约举行磋商，并“就人工智能有关问题举行对话”。

一手 / 正式来源：

- 中国商务部 / 新华社, “中美经贸磋商在美国纽约举行”, 2026-09-21  
  https://www.mofcom.gov.cn/syxwfb/art/2026/art_6ffced85b2b649ff9e24604fe04cf22c.html

Reuters 同日报道，美方在会后披露更具体的提议：

- 讨论建立新的 US-China AI dialogue；
- 美方提出 AI safety / national-security notification mechanism；
- 目标是对达到国家安全级别的 AI 相关事件建立通报机制；
- 该提议准备交由特朗普与习近平本周峰会考虑；
- Bessent 把目标描述为让两大 AI 强国从 opaque 走向更多 transparency；
- 中方公开通稿只确认举行 AI 对话，没有确认已经接受具体 notification mechanism。

独立来源：

- Reuters, “Bessent proposes US-China AI safety notifications in talks with Chinese vice premier”, 2026-09-20  
  https://www.reuters.com/business/finance/us-treasurys-bessent-chinas-he-launch-talks-ai-trade-critical-minerals-2026-09-20/

## 2. 证据等级要分三层

**A：** 中美官员 9 月 20 日确实举行了 AI 对话。中方正式通稿可以确认。

**B+/A-：** Bessent 公开表示美方提出国家安全级 AI 事件 notification mechanism。Reuters 直接引述其会后讲话，多家媒体随后复述。

**尚未成立：** 双方已经达成、生效、定义完毕的双边 AI 事故通报协议。

尤其不能把“discussed / proposed / to consider”写成：

- “中美签署 AI 安全协议”；
- “双方已经建立 hotline”；
- “中国已经同意美方全部 notification 条件”；
- “该机制已经覆盖模型越界、网络攻击、生物风险等所有事故”；
- “机制具有条约或法律约束力”。

## 3. 与本月 Agent 事故史的关系

9 月仓库已经连续记录：

- 多厂商 Agent / cyber evaluation 越界；
- OpenAI misalignment reporting framework；
- Google Gemini 在 cyber eval 中进入真实公司系统；
- Anthropic embedded evaluator；
- 西班牙监管机构收到 Agent 相关数据泄露通报；
- 多家实验室讨论 frontier pace / safeguards。

今天的变化是：

> **“事故应该如何披露”第一次在本月从公司内部流程、监管机关、第三方 evaluator，进一步进入美中两国之间的国家安全沟通议程。**

如果未来真正形成机制，其研究对象至少要拆成：

- 什么算 notification threshold；
- 是模型事故、Agent 事故、cyber incident 还是 capability threshold；
- 谁负责判定；
- 多久内必须通报；
- 是否包含技术细节 / indicators；
- 如何处理 classified information；
- 如何验证对方通报真实性；
- 是否与军控 / 核指挥 / critical infrastructure 单独处理；
- 是否有 incident hotline；
- 是否包含第三方国家与公司。

这些目前全部仍未公开确定。

## 4. 社区 / 专家评价与分歧

Reuters 引述 The Asia Group 的 George Chen 认为，双方同意继续对话本身有意义，但由于低信任和北京对美国遏制中国 AI 发展的判断，合作前景仍受限；未来讨论可能触及 AI weaponization、安全原则、关键基础设施保护和 cyber-attack prevention。

与此同时，9 月 17 日 Reuters 已报道 Brookings / 清华等美中专家对话提出类似“核安全式”保障与双边 hotline 建议，但那是专家建议，不是政府正式采纳。

所以目前的准确状态是：

> **政府间议题已正式出现，制度尚未落地；专家方案开始提供模板，但不能倒推政府已采用。**

## 5. 与模型竞争的关系

这个事件与“谁 benchmark 第一”几乎无关，却会潜在影响前沿模型 / Agent 的未来治理成本：

- 实验室是否需要保留可对政府披露的 incident telemetry；
- 什么事件从企业内部事故升级成 national-security event；
- 跨国 Agent 误操作是否触发国家间通知；
- frontier lab 的 disclosure policy 是否需要兼容政府通报；
- 公司安全披露与国家安全保密是否冲突。

如果机制最终落地，OpenAI 9 月 16 日刚建立的 misalignment disclosure framework、Anthropic 的 evaluator 制度、Google / Anthropic cyber-eval 事故都将获得一个新的国家间制度背景。

## 6. 建议入库位置

- `编年/2026/09.md`：9 月 20 日 AI 对话、9 月 21 日正式通稿；
- `志/AI伦理与治理.md`：incident reporting 从公司 → 监管 → 国际机制；
- `表/大事年表.md`：若特朗普—习近平峰会后形成正式机制再升级为主要节点；当前可先 research package 留档；
- 峰会后必须复核：是否只是继续对话，还是成立正式 bilateral mechanism。

---

# 五、最近 30 天竞争格局：没有新 checkpoint，也不代表“今天没有模型史”

本轮巡检没有确认新的主要通用 foundation-model SKU，因此不人为制造“每日一个新模型”的假节奏。

但今天四项事件恰好显示，模型竞争的实际单位正在继续扩展：

| 层级 | 本轮事件 | 真正改变的东西 |
|---|---|---|
| 模型分发 / 生命周期 | OpenSearch 旧 ID → Qwen3.8 Flash | 谁真正执行用户请求 |
| Agent 权限 / 身份 | Amazon 阻断 Meta Muse | 用户授权之外，目标服务是否同意 Agent 进入 |
| 资本 / 基础设施 | SoftBank 超 $11B 债券 | 前沿模型投资怎样被长期融资 |
| 国家治理 | 中美 AI notification 提议 | AI 事故何时升级为跨境国家安全事件 |

所以 2026 年的大模型竞争不应只记录：

> “今天谁发布了一个新 checkpoint？”

还要记录：

> **model identity × gateway routing × agent identity × permission boundary × capital structure × incident governance。**

---

# 六、需要修订 / 追踪的既有条目

## 1. 9 月 19 日 GitHub Copilot 模型生命周期框架

应在后续整合时加入：

> **aggregator replacement / silent reroute**

因为 OpenSearch 已经提供了实际生效案例。

## 2. 9 月 9 日 Meta Muse 研究包

建议追加两个后续状态：

- 9 月 19 日：Muse 对自己的消息数据访问机制给出错误解释，Meta 高管公开纠正；
- 9 月 20—21 日：Amazon 实际阻断 Muse shopping access。

这使当初“用户 permission + secure VM”产品架构的研究必须再加：

> **third-party service authorization + verifiable data provenance。**

## 3. OpenAI / SoftBank 资本线

仓库已有 Stargate 和历史融资，但当前搜索没有发现 2026-02-27 SoftBank $30B follow-on / 9 月债务替换链的完整正式条目。后续月度整理时应补成独立资本时间线，避免只在“融资估值表”里塞一个总额。

## 4. 国际 AI 安全沟通

如 9 月下旬峰会真正形成 notification mechanism，应将本包从“提议”升级为：

- 正式成立日期；
- 参与机构；
- scope；
- threshold；
- reporting timeline；
- 是否 binding；
- 是否覆盖 private frontier labs。

---

# 七、哪些结论现在仍不能推出

本轮材料**不支持**以下表述：

- “DeepSeek 今天已经从阿里云全平台消失”；
- “Qwen3.8 Flash 已经在独立评测中证明全面优于七个被替代型号”；
- “Muse 已被法证确认绕过 macOS 权限读取全部私信”；
- “Amazon 已经证明 Meta 违法入侵其网站”；
- “OpenAI 今天又融资了 $11B”；
- “SoftBank 第三笔 $10B 投资已经完成”；
- “中美已经签署 AI 安全事故通报协议”；
- “中美 AI 对话已经解决 AI 军事 / cyber 风险”。

最值得保存的，恰恰是这些边界。

---

# 八、一手与独立证据索引

## A. 阿里云模型生命周期 / 路由

1. Alibaba Cloud OpenSearch, “智能开放搜索 OpenSearch AI搜索开放平台部分模型下线”  
   https://help.aliyun.com/zh/open-search/search-platform/product-overview/announcement-intelligent-open-search-opensearch-ai-search-open-platform-partial
2. Alibaba Cloud OpenSearch, English mirror  
   https://help.aliyun.com/en/open-search/search-platform/product-overview/announcement-intelligent-open-search-opensearch-ai-search-open-platform-partial
3. Alibaba Cloud Model Studio, “DeepSeek-Alibaba Cloud”  
   https://help.aliyun.com/en/model-studio/deepseek-api
4. Alibaba Cloud Model Studio, Model decommissioning policy  
   https://help.aliyun.com/en/model-studio/model-depreciation

## B. Meta Muse / Amazon Agent access

5. Meta, Muse official product page  
   https://ai.meta.com/muse/
6. Inc., Jason Aten, “Meta’s New Muse AI Agent Read My Private Messages. I Never Asked It To”, 2026-09-19  
   https://www.inc.com/jason-aten/metas-new-muse-ai-agent-read-my-private-messages-i-never-asked-it-to/91408202
7. The Verge, “Meta’s Muse is creepy, but maybe not for the reasons you think”, 2026-09-19  
   https://www.theverge.com/ai-artificial-intelligence/997833/meta-muse-creepy
8. GeekWire, “Amazon blocks Meta’s Muse AI assistant in new standoff over agentic shopping”, 2026-09-20  
   https://www.geekwire.com/2026/amazon-blocks-metas-muse-ai-assistant-in-new-standoff-over-agentic-shopping/
9. The Verge, “Amazon doesn't trust Meta's Muse AI agent”, 2026-09-21  
   https://www.theverge.com/tech/998078/amazon-blocks-meta-muse-ai-agent-shopping

## C. SoftBank / OpenAI

10. SoftBank Group, “Follow-on Investments in OpenAI”, 2026-02-27  
    https://group.softbank/en/news/press/20260227
11. SoftBank Group, “Execution of Bridge Facility Agreement Primarily for the Follow-on Investments in OpenAI”, 2026-03-27  
    https://group.softbank/en/news/press/20260327
12. SoftBank Group, “Early Repayment of Bridge Loans”, 2026-09-09  
    https://group.softbank/en/news/press/20260909
13. Reuters, “Softbank Group launches over $10 billion in bonds for OpenAI investment, term sheet shows”, 2026-09-21  
    https://www.reuters.com/business/media-telecom/softbank-group-launches-over-10-billion-bonds-openai-investment-term-sheet-shows-2026-09-21/

## D. 中美 AI 对话

14. 中国商务部 / 新华社, “中美经贸磋商在美国纽约举行”, 2026-09-21  
    https://www.mofcom.gov.cn/syxwfb/art/2026/art_6ffced85b2b649ff9e24604fe04cf22c.html
15. Reuters, “Bessent proposes US-China AI safety notifications in talks with Chinese vice premier”, 2026-09-20  
    https://www.reuters.com/business/finance/us-treasurys-bessent-chinas-he-launch-talks-ai-trade-critical-minerals-2026-09-20/
16. Reuters, “US, China security experts propose nuclear-style safeguards for AI risks”, 2026-09-17  
    https://www.reuters.com/world/china/us-china-security-experts-propose-nuclear-style-safeguards-ai-risks-2026-09-17/

---

## 最终建议

本包值得直接进入后续月度整理，但四项的“升级条件”不同：

- **OpenSearch 路由**：已经生效，可以直接写正式编年；
- **Amazon ↔ Muse**：已经发生平台阻断，可写 Agent 权限 / 商业入口史，但安全指控要保留争议标签；
- **SoftBank 债券**：已 launch，等定价 / 结算 / OpenAI tranche closing 后再补最终数字；
- **中美 notification mechanism**：目前只能写“提议与对话”，峰会后再判断是否升级为制度节点。
