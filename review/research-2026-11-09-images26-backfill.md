# 2026-11-09 补录：OpenAI Images 2.6（实际发布 2026-11-04）

> 事件日期：2026-11-04；补录核验日期：2026-11-09。**不是 11 月 9 日的新发布。** 之前的 11 月研究包未覆盖此正式型号更新，按新模型低门槛入档规则补录。

## 核心事实与可用性（证据 A）

OpenAI 于 **2026-11-04** 发布 Images 2.6，公告称当日全球在 ChatGPT 与 Codex 的所有订阅层级（桌面、移动、Web）可用，并在 API 提供两款明确型号：**GPT-Image-2.6 Flare** 和 **GPT-Image-2.6 Sunburst**。这是图像生成与编辑模型，不是新通用文本 LLM。

官方声称生成速度较前代提高 **50%**；Flare 在 low quality 配置下最快约 **6 秒**，适合快速迭代；Sunburst 在 medium/high quality 配置下主打更高画质及编辑一致性。这些是厂商声明，不是独立重复测试或 SLA。

公告描述新增 GIF 动画工作流（包括 sprite sheet）、API image markup 定点编辑、SVG 导出、可调 complexity（规划复杂度）与独立 image quality 设置。GIF 示例不等于无限长视频生成能力，单次 demo 不等于多轮编辑可靠性。

## 访问、价格、模态、限制

- 发布与可用日期：2026-11-04；官方宣布 ChatGPT、Codex 全层级及 API 当日可用，尚未逐地区/账号实测。
- API 型号：GPT-Image-2.6 Flare / GPT-Image-2.6 Sunburst；偏向速度/画质的产品分层。
- 价格：公告仅链接开发者价格页，未在公告正文列出稳定分型号单价。待核官方计费单位和实时价格；不得编造。
- 模态：图像生成/编辑，GIF 工作流；没有证据表明其提供通用 coding、Agent/tool、长上下文推理能力。
- 权重与部署：官方只说明托管产品/API，未提供开放权重或本地部署许可；不可称为 open-weight。
- 安全与可靠性：官方链接 system card，需另行核查；不能推断生成无误、编辑无漂移、跨多轮角色一致。

## 证据等级、独立评价与分歧

**A（一手）**：OpenAI《Introducing Images 2.6》，2026-11-04，https://openai.com/index/introducing-images-2-6/ 。明确发布日、型号、功能、平台；速度和质量属于厂商自述。

**B（独立媒体核实发布，而非独立 benchmark）**：Times of India 2026-11-05 左右报道，https://timesofindia.indiatimes.com/technology/tech-news/openai-launches-images-2-6-in-chatgpt-codex-and-api-adds-gif-creation-feature/articleshow/135558059.cms 。确认发布及 GIF 新功能，但没有独立 A/B 测速。

**C（合作方演示/主观反馈）**：OpenAI 发布页引用 OpenArt、Figma Weave、Picsart、Town 等早期合作或展示；只证明存在案例及合作方主张，不是盲测、广泛社区共识或生产 ROI。

**D（仍待独立验证）**：暂无本研究核实的同 prompt、quality、complexity、网络条件下足量样本的 Flare/Sunburst/前代速度、成本、编辑漂移、SVG 保真、GIF 时间一致性、文字渲染及失败率比较。不能断言性能优于所有竞品；社区体验分歧需按任务、版本、配置和平台归档。

## 最近 30 天竞争位置、意义与入库建议

10 月通用模型竞争围绕 GPT-6.1 Terra、Gemini 4 Carbon、Mistral Large 4、Kimi K3.1 Pro 等；本次更新属于另一条**图像创作模型分层与可编排编辑 API**主线，不能把图像延迟与文本 token/s 或 coding benchmark 直接横比。新 API 型号、速度/质量分层、GIF 与编辑控制面确实改变开发者可选项，虽尚不能证明市场转折，仍满足新型号留档门槛。

建议将 **2026-11-04** 写入未来 编年/2026/11.md，并视证据充足程度更新 志/AI产品化演进.md；表/大事年表.md 门槛更高，暂不强行追加。已有 11 月 Kimi 权重、Meta–Conductor、Claude/Grok 水印研究包不需要改写；避免把补录日当首发日。

**不能推出**：50% 提速独立成立、GIF 可任意长稳定生成、所有 API 区域同步无故障、SVG 完全可编辑、合作方示例代表广泛生产采用、已形成价格战或开放权重部署。
