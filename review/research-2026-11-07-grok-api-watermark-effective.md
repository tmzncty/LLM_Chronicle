# 2026-11-07：Grok API 七个型号的默认文本水印进入规定生效日

> 状态：增量研究包；**官方文档规定的生效日期已到**，尚无本研究独立持有 API key 的实际请求/响应验证。与 2026-10-31 的宣布日期分开记载。

## 事件与日期

- **2026-10-31**：SpaceXSI/xAI 官方开发者文档《Output Watermarking》最后更新，宣布七个 Grok API 型号自 11 月 7 日默认加不可见文本水印。
- **2026-11-07**：官方规定的默认启用日期；这是本轮增量节点。官方文档目前使用“Text responses ... include an invisible watermark”的现时态，但本研究未取得 live API response header，故不能声称逐个型号、所有区域已独立实测完成 rollout。
- 新闻在 10 月 31 日至 11 月 2 日已经报道，不可把 11 月 7 日的媒体复述误当成新宣布。

## 核心事实（官方产品规则，证据 A）

适用七个 model IDs：`grok-4.7`、`grok-4.6`、`grok-4.5`、`grok-4.3`、`grok-4.20-reasoning`、`grok-4.20-non-reasoning`、`grok-4.20-multi-agent`。覆盖全球与区域 API endpoints、Responses API 和 Chat Completions API，包含普通文本、structured outputs、**tool call arguments**。未宣称 Grok 消费端 App/X 的聊天输出同步适用。

水印在生成时轻微影响 token 选择，不是添加隐藏字符；可在原始 HTTP 响应读取 `x-watermark: true`，作为**该次请求已应用水印**的提供商侧指示。外部检测属于统计判断（watermarked / not watermarked / uncertain），检测 API 需要申请；不能把检测结果等同作者身份、用户追踪或可靠鉴定全部 AI 文本。

**治理及权限变化**：按 team × model 默认启用，team admin 可在 Console 逐型号关闭；关闭须声明适用法律例外并承担合规责任，部分型号可能锁定不可关闭；设置影响团队所有 API keys，新请求约五分钟内生效，变更写入 audit log。官方称无质量/速度影响，但缺少独立 A/B 测量。

## 证据与评价等级

- **A：官方一手文档**：[SpaceXSI Docs — Output Watermarking](https://docs.x.ai/developers/advanced-api-usage/watermarking)，最后更新 2026-10-31，明确 2026-11-07 日期、型号、覆盖范围、header、opt-out、审计与限制。
- **B/C：独立媒体核对宣布与日期**：[TSN 2026-11-01](https://tsnmedia.org/grok-api-text-watermark/)；[RouterPlus 2026-11-02](https://routerplus.com/news/grok-api-text-watermark-november-7)。报道支持政策文本的传播与开发者影响，不是 live rollout 复现。
- **D：社区早期争议**：担忧 provenance 被误用作作者认定，或默认改变 sampling 导致输出差异；也有观点认为默认标记便于下游合规。现有评论不构成广泛共识，且缺少公开误报率、漏报率、短文本有效性、改写/翻译鲁棒性和真实生产性能测试。

## 最近 30 天关系与历史位置

与 2026-11-03 Claude 旧型号水印扩围（仓库 `review/research-2026-11-03-claude-legacy-text-watermark-rollout.md`）相互对照：两家均把 provenance 作为 provider-side generation policy，但 Grok 明确提供 **per-team/per-model 的法律声明式 opt-out、HTTP header 与审计日志**；Claude 部分旧型号又存在 sampling configuration 边界。不能简单推论两家水印检测技术相同、效果等价或已形成正式行业标准。

这是**开发者默认输出行为与合规权限**的实质变化，即使没有新模型发布，也符合低门槛入档原则。模型价格、上下文、权重/许可证未因本次规则本身变化；不要当作模型发布。

## 入库建议及待核验

- 本研究包作为增量证据；未来写入 `编年/2026/11.md`（若建立）、`志/AI伦理与治理.md`、`志/AI产品化演进.md`，并视月度整理需求考虑 `表/大事年表.md`。大事年表门槛较高，不必仅为本节点立刻追加。
- 检索/修订已有水印条目时应区分 **10-31 announcement** 与 **11-07 scheduled effective date**，并与 11-03 Claude 扩围交叉链接。
- 待验证：使用实际 API key 对七个型号/区域请求采集 `x-watermark`；确认部分锁定模型、各分发平台与真实上线时间；独立测量质量、速度、检测误报/漏报与用户实际影响。**当前不能推出**全部用户已收到标记、每个地区同时切换、所有 AI 生成文本可检测、已形成可靠 provenance 基础设施或具备法律合规充分性。
