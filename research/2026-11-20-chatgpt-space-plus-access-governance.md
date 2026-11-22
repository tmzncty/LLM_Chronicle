# 2026-11-20 ChatGPT Space 向 Plus 扩展：Library 替换、共享访问门槛与迁移边界

> 巡检日期：2026-11-22（Asia/Shanghai）。这是对 11 月 20 日实质产品访问政策的迟录；**不是**将 11 月 21—22 日社区跟帖误作产品首次发布日期。

## 事件、准确日期与实际可用性

- **2026-11-20（官方发布/开始分批推出）**：OpenAI 的 ChatGPT release notes 宣布 Space 向全球 **18 岁及以上 Plus** 用户逐步开放，无须超出 Plus 订阅的单独付费。已有 Pro / Business / Enterprise 的适用访问规则不因此取消。实际账户入口依资格、工作区配置与渐进部署而异，不能把「开始推出」写成「所有 Plus 当日已可使用」。
- Space 整合可编辑页面、演示文稿、上传文件和协作；可将页面/幻灯片与连接应用联动更新，并可在评论中请求 ChatGPT 修改。对已获得 Space 的账户，侧边栏 **Space 替代 Library**，但 **Projects 保持独立**。
- **访问与分享规则发生实质变化**：共享页面/演示文稿的接收者须拥有查看权限、登录且属于已获 Space 访问权的 Plus / Pro / Business / Enterprise；**Free 用户不能打开**这些共享内容，**没有公开链接**。企业管理权限继续生效。该条件是内容访问治理，不是模型 API 定价变化。
- 官方说明支持 web、desktop、iOS、Android 的页面使用，但不同设备编辑、展示、Slides 开放范围有差异；不得从发布说明推出全平台功能完全一致。

## 一手资料与独立/社区资料

1. **A / 官方一手发布记录**：OpenAI, *ChatGPT release notes*, 2026-11-20, https://help.openai.com/en/articles/6825453-chatgpt-release-notes （确认公告日期、Plus 18+、共享门槛、Library 替换与产品功能）。
2. **A / 官方帮助文档（持续更新，非发布日快照）**：*Getting started with ChatGPT Space*, https://help.openai.com/en/articles/20001549-getting-started-with-space-in-chatgpt （确认逐步开放、Projects 独立、平台/工作区差异；须保留网页随时变更的风险）。
3. **A / 官方治理说明（持续更新）**：*ChatGPT Space: sharing, data, and controls*, https://help.openai.com/en/articles/20001544-chatgpt-space-sharing-data-and-controls （权限、撤权、协作；不等于独立安全审计）。
4. **C / 少量社区个案**：OpenAI Developer Community, *Unable to Delete or Move Files Inside ChatGPT Space Folders*, 初帖 **2026-11-16**，11 月 21 日仍有跟帖，https://community.openai.com/t/unable-to-delete-or-move-files-inside-chatgpt-space-folders/1416985 。个别用户报告迁移后文件夹内文件无法删除/移动、权限异常；支持人员 11 月 18 日要求进一步 HAR 排查。**故障首次报告早于 Plus 扩展，不能断言 11 月 20 日推出造成该问题**。同一帖子多名发言者并不构成总体故障率。
5. **C / 社区延续反馈**：2026-11-21 的相关回复 https://community.openai.com/t/unable-to-delete-or-move-files-inside-chatgpt-space-folders/1416985/6 与 /7，说明个案仍在延续；不是平台级故障公告。

## 近 30 天竞争与历史位置

- 近期 GPT-6.2、Gemini 4、Qwen4 等竞争主要在模型性能、速度、价格、Agent 能力；Space 此次并**非新模型**，而是将协作型可编辑内容和连接应用工作流下放到更低付费层，扩大 AI 工作台的可接触用户群。
- 「Plus 可以创建」「Free 不能访问共享内容」「不提供公开链接」构成新的分发边界：用户协作网络受产品账户资格限制，不能仅以模型能力描述用户实际可用性。
- 对 Agent 史的意义是从一次性回答向持久页面、共同编辑和可更新工作对象扩展；但**不能**据此认定长任务自主可靠、跨人协作生产率或企业 ROI 已得到独立证明。

## 证据分层与未决

- **已确认**：官方公告、产品规则、逐步推出开始、文档所列功能及访问限制。
- **仅有个案**：文件夹删除/移动权限异常及迁移问题；缺少复现矩阵、影响账户比例、版本和修复确认。
- **不能推出**：全体 Plus 同日上线、Free 获得共享访问、旧 Library 数据被删除、所有 Slides/移动端能力完全一致、模型 benchmark 进步、可量化工作效率或财务回报。
- **需要后续**：按账户/地区/平台验证实际可用时间；核对用户权限迁移、撤权与文件恢复；补独立生产使用、失败率和成本数据；为官方页面留 dated snapshot（本轮未生成网页快照）。

## 建议落位与去重

- **编年/2026/11.md**：补 11 月 20 日简洁增量条目（与 Anthropic IPO 交割分开）。
- **志/Agent产品与商业化.md**：Plus 下放、Space/Library 替换、协作与付费层访问边界。
- **志/Agent身份权限与凭据治理.md**：共享授权、Free 不可打开、无公开链接、工作区管理员权限。
- **志/Agent宣传、实测与可靠性.md**：将 11 月 16—21 日社区迁移问题列为低等级个案，不归咎于 11 月 20 日发布。
- **表/Agent主流产品与商业化对照表.md**：核对 Space 访问层与持久内容协作项。
- 与现有 #79—#94 的模型、资本、Copilot 研究包区分；不重复 GPT-6.2 或 Anthropic IPO 记录。合并前再检查其他在途 PR 是否已补 Space。
