# 2026-11-11：United Airlines 限制未经授权的第三方 AI Agent 订票与服务

> 核验日：2026-11-12（北京时间）；**事件发生/公开政策日为美国当地 2026-11-11**，不是 11 月 12 日。类别：Agent 行动权、产品访问规则、交易授权与治理。证据等级 A/B/C 按来源而非宣传热度区分。

## 事件及可核事实

- **2026-11-11**，United Airlines 宣布限制**未经其许可**的第三方个人 AI Agent/assistant 通过 United 网站、App，以及旅行社/聚合商等间接渠道执行订票与相关操作；公司表示正在更新 booking、ticketing、distribution 规则。不是“禁止所有 AI 研究航班”，也不是“所有旅行代理都被禁止”。
- 当事方声明经 PhocusWire、Reuters、AirlineGeeks 直接引述：账户凭据共享可能泄露个人/支付信息；Agent 可能引发非预期购买、账户变更、MileagePlus 里程使用；自动办理值机可能绕过旅客对危险品等事项的法定确认。**这是公司提出的风险理由，不等于已有大规模真实事故证据**。
- PhocusWire 报道 United Digital Trust Center 对规则作进一步说明：旅行社或预订平台若使用第三方 AI Agent，需要 United 许可；浏览器扩展和自动化浏览器也可能被覆盖；**旅客授权 Agent ≠ 航司授权 Agent**。公司表示此前由 Agent 完成的预订不会仅因 11 月 11 日新限制而取消，但建议核对出票状态。
- 有二手报道称合同条款赋予取消 AI Agent 处理订单的权利；**具体条款版本、例外、执行与既有订单保护之间的关系仍应通过 United 当日正式合同文本及网页快照复核**，不可据此宣称所有订单已被自动取消。
- **政策公布/文本变更**已有当事方声明和多家独立报道交叉核验；**真实封禁技术实施率、检测准确率、各渠道是否同步生效**尚无独立大规模复现。

## 一手与独立证据

1. **A-（当事方原话，经多家独立媒体引述）**：PhocusWire, Abby Crotty, *United blocks third-party AI agents from app, website*, **2026-11-11**, https://www.phocuswire.com/news/technology/united-blocks-third-party-ai-agents-from-app-website 。直接引述 United 声明与 Digital Trust Center 的说明。待补 United 原站政策的定版 URL / 网页快照。
2. **B（独立通讯社）**：Reuters, *United Airlines moves to block AI agents from its platform over security concerns*, **2026-11-11**, https://www.reuters.com/legal/litigation/united-airlines-moves-block-ai-agents-its-platform-over-security-concerns-2026-11-11/ 。
3. **B（垂直媒体交叉核验）**：AirlineGeeks, Zach Vasile, *United Bans AI Agents From Booking Flights For Customers*, **2026-11-11**, https://airlinegeeks.com/2026/11/11/united-bans-ai-agents-from-booking-flights-for-customers/ 。
4. **B（同日产品影响报道）**：The Verge, *United won't let your AI agent book your flight*, https://www.theverge.com/ai-artificial-intelligence/1031623/united-unauthorized-ai-agents 。
5. **B（后续立场分歧）**：Reuters, *JetBlue president says airlines should follow customers' lead on AI booking agents*, **2026-11-12**, https://www.reuters.com/legal/litigation/jetblue-president-says-airlines-should-follow-customers-lead-ai-booking-agents-2026-11-12/ 。**11 月 12 日的反应，不应误记为 United 的政策发生日**。

## 30 天背景、独立评价与争议

- 过去一个月的 Agent 竞争从「能否替用户完成购买」转向「服务提供方是否允许第三方执行」。这不是新基础模型发布，而是**真实世界交易权限边界的变化**，影响 Meta Muse、其他 personal/browser Agent 与 OTA/aggregator 的可达范围。
- Reuters、The Information 记录了 Amazon、银行等对第三方 Agent 的限制；其他商家选择与 Agent 平台合作。**不能由 United 一家的决定推断整个行业已经全面禁止 Agent**。
- PhocusWire 引用 Propellic 的 **176 次脚本化预订任务**，称 Agent 可到达支付步骤。这是有限测试/特定 harness 的研究者或商业团队报告，**到达支付步骤 ≠ 成功出票、合规、授权或可重复生产可靠性**；尚需原始方法、样本与版本信息。
- JetBlue 高管 11 月 12 日主张航空公司应适应客户对 AI 预订的偏好，同时承认分销成本、安全与中介问题；属于**产业参与者不同立场**，不是代表全部航空公司共识。
- 目前缺少系统性的 Reddit/开发者样本、实际阻断率、误伤率、转化损失、客户迁移和财务 ROI；不推断消费者整体赞成/反对，也不将媒体评论当独立基准测试。

## 历史意义与建议入库位置

这是 **Agent 身份委托权与资源所有者准入权发生冲突** 的清晰、可定日案例。用户同意共享凭据并不自动获得商家准入；商家对第三方自动交易的限制可能使 Agent 的「技术上能完成」与「合同上被允许」分离。交易场景还引入不可逆副作用、支付责任、法定人类确认与审计问题。

- **编年/2026/11.md**：新增 11 月 11 日政策节点，注明实际部署尚待核验。
- **志/Agent身份权限与凭据治理.md**：增加 customer delegation vs merchant authorization、网站合同/渠道政策与法定确认的边界。
- **志/Agent产品与商业化.md**、**志/AI Agent 生态.md**：增加 Agent 商业化的外部平台准入与交易渠道控制。
- **表/Agent发展大事表.md**、**表/大事年表.md**：经编年整理后酌情加入，不以新闻曝光量直接判断大事年表等级。
- 需检查既有关于 Agent booking、Meta Muse、第三方平台接入的条目是否把「能操作网页」误写成「商家允许订票」。**本 PR 只保存增量研究包，暂不无依据改写已有历史正文**。

## 不能推出与待核问题

1. 未取得 United 原站 11 月 11 日合同及 Digital Trust Center 的可复查快照，正式条款逐字与执行例外需二次核对。
2. 不代表所有 AI Agent、所有浏览器自动化、辅助无障碍工具或人类旅行社都被禁止；也不能证明实际每次调用均被技术拦截。
3. 不代表 United 已取消 11 月 11 日之前的 AI Agent 订单，也不代表已经发生大量安全事故。
4. 不代表 Agent 订票技术失败；这是**授权/商业规则**变化，须与任务完成率分开记录。
5. 不能推导市场份额、Meta 股价变动的单一因果或商家 ROI；需要后续独立追踪与官方执行数据。
