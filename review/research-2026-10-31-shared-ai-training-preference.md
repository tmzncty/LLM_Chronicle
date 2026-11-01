# 2026-10-31 增量研究包：四家主要 AI 厂商承诺采用共享训练偏好信号

> 事件实际发生日期：2026-10-30
> 扫描窗口：截至 2026-10-31 约 24 小时
> 主题：大厂政策与产品治理 / 训练数据治理 / Web 标准 / robots.txt / IETF AIPREF

## 1. 事件

2026 年 10 月 30 日，OpenAI、Google、Microsoft 与 Anthropic 围绕一个共享的 `robots.txt` AI 训练偏好信号作出采用承诺。该机制由 Anthropic 的 Kevin Kelley 提交为 IETF Internet-Draft `draft-kelley-aipref-training-preference-signal-00`，使用 policy token `__usage_ai-training`，使网站运营者可以用一个跨厂商信号表达其内容是否可用于生成式 AI 基础模型训练，而不必仅依赖逐个厂商、逐个 crawler 的规则。

这是一项实质性的数据/训练治理变化，达到本仓库对“实质政策变化”的低门槛记录标准。它不是新模型发布，也不是已经完成部署的统一强制标准。

## 2. 准确日期与状态

- **2026-10-30：** IETF Internet-Draft `Machine-Readable Training Preference Signal` 发布，版本 `-00`。
- **2026-10-30：** OpenAI 正式宣布将 honor 该共享信号，目标是在“coming months”实现，并承诺后续公布 implementation details。
- **2026-10-30：** Google、Microsoft 与 Anthropic 也对同一机制作出支持/采用承诺。公开报道给出的部署节奏并不一致：Anthropic 表示已经开始实现；Microsoft 计划自 **2027-02-01** 起开始 honor；Google 目标为 **2027 年**；OpenAI 为未来数月。
- 因此截至本包日期，准确状态应写作 **cross-vendor commitment + staggered implementation**，不能写作“四家公司已经全面支持”。

## 3. 机制本身：它是什么，也不是什么

IETF 草案沿用普通 `robots.txt` group 语法，不引入新的 directive 或 grammar。草案示例为：

```text
User-Agent: __usage_ai-training
Disallow: /
Allow: /press-kit/
```

含义是：运营者表达“不希望站点内容用于 AI training”，但 `/press-kit/` 例外。

需要特别保存三个边界：

1. **`__usage_ai-training` 是 policy token，不是 crawler 名称。**
2. **它表达的是 use preference，而不是 crawl prohibition。** 草案明确说明该 token “is not a directive for crawling behavior”；网站若要限制网络抓取本身，仍需使用针对实际 crawler 的访问规则或其他技术控制。
3. **当前定义聚焦 generative-AI training。** 它不能自动推出 search indexing、grounding、AI answers、ranking、retrieval、引用展示或 agent browsing 都被禁止。

因此，“网站声明不允许训练”与“bot 不访问网站”必须继续在编年中分开记录。

## 4. 一手证据

### A：OpenAI 官方公告

OpenAI 于 2026-10-30 发布《Making it easier for websites to express AI training preferences》，明确表示：

- 将 honor `robots.txt` 中的 common signal；
- 该机制用于网站表达其内容是否可用于 foundational generative AI training；
- 这是 voluntary effort；
- 目标是在未来数月实现；
- 现有 crawler controls 不会被替代，并将继续生效；
- 工作建立在 IETF AI Preferences (AIPREF) working group 的持续讨论之上。

来源：
https://openai.com/index/helping-websites-express-ai-training-preferences/

### A：IETF Internet-Draft

Kevin Kelley（Anthropic）提交的 `draft-kelley-aipref-training-preference-signal-00` 定义了使用 `robots.txt` policy-token group 绑定 AI-training usage preference 的方式，并明确说明不改变现有 robots.txt grammar。

来源：
https://www.ietf.org/ietf-ftp/internet-drafts/draft-kelley-aipref-training-preference-signal-00.html

**证据边界：** Internet-Draft 是 work in progress，不等于 IETF 已批准的 Internet Standard；不能把“四家公司承诺采用 IETF 草案”写成“IETF 已经确立强制行业标准”。

## 5. 独立证据

AFP/CNA 与 Straits Times 10 月 31 日的报道独立确认 OpenAI、Google、Microsoft、Anthropic 于 10 月 30 日作出共同采用承诺，并给出了分阶段实施时间：Anthropic 已开始 rollout；OpenAI 为未来数月；Microsoft 自 2027-02-01；Google 为 2027 年。

来源：
https://www.channelnewsasia.com/world/ai-giants-promise-publishers-new-way-block-some-scraping-6509181
https://www.straitstimes.com/world/ai-giants-promise-publishers-new-way-to-block-some-scraping

**证据等级：A（官方厂商 + IETF 草案）/ B（独立新闻交叉确认多厂商时间线）。**

## 6. 与既有 Web / AI 数据治理的关系

这不是“robots.txt 第一次被用于 AI 治理”。此前厂商已经存在 GPTBot、Google-Extended 等厂商级控制，Cloudflare 也在 2026-09-15 推出 `Disallow AI Training`、Accountable crawler designation 与 Bot Preference Sync，试图把 search、AI training 与 AI agents 分开控制。

Cloudflare 官方来源：
https://www.cloudflare.com/press/press-releases/2026/cloudflare-helps-end-the-search-or-ai-training-tradeoff/

本次真正的新节点是：**多家主要 foundation-model provider 开始围绕一个共同的 purpose-level signal 收敛。**

可以把治理演进写成：

`per-crawler identity → per-provider opt-out → purpose-level preference → cross-provider policy token → staggered provider enforcement`

这和 Agent identity / permission 的演进有相似之处：控制对象开始从“谁来访问”扩展到“内容被拿去做什么”。

## 7. 对用户与开发者的实际影响

若后续实现兑现，网站运营者表达“不用于训练”的维护成本会明显下降：同一偏好不必为每个新 crawler 重复配置。

但截至 2026-10-31，实际影响仍受以下限制：

- rollout 尚未在四家同时完成；
- 该机制是 voluntary preference，不是技术 DRM，也不是法律强制执行层；
- 不适用于已经进入既有训练集的数据；
- 不等于阻止 crawling；
- 不自动覆盖 grounding / search / retrieval / AI answer citation；
- 私有授权、许可合同及厂商专属控制仍可能形成不同规则；
- 对不采用该草案的 crawler / AI provider 没有普遍约束力。

因此网站管理员现阶段不应因为加入共享 token 就立即删除现有 GPTBot、Google-Extended 等厂商级控制。

## 8. 社区与独立评价

本轮公开讨论的主要正面评价集中在 **降低配置碎片化**：从维护多套 crawler/provider 规则转向一个用途信号。

争议则集中在四点：

1. `robots.txt` 本质仍是声明式、依赖对方自愿 honor；
2. training 与 crawling/search/grounding 被拆开后，普通站长容易误以为“opt out = bot 不再访问”；
3. 选择退出 training 是否会间接影响内容在 AI 产品中的 visibility，需要按厂商具体实现观察；
4. IETF draft 尚处于早期阶段，token 语义和实现细节仍可能变化。

目前没有足够证据形成“行业已经普遍遵守”的社区共识，更没有独立审计证明各家在大规模训练数据管线中已经可靠执行该偏好。

## 9. 与最近 30 天竞争/治理格局的关系

10 月的竞争不只发生在模型能力和 token price 上，也越来越发生在 **模型训练与 Agent 所依赖的数据、身份和权限治理层**。

本月已记录的治理线包括：

- frontier training containment 与 high-compute safety case；
- partner/router/gateway policy portability；
- Agent monitor / permission / dynamic containment；
- OpenAI Model Spec 对 intent/context/agency/oversight 的重构；
- 本次跨厂商 training-preference signal。

因此可以把 10 月的数据治理轴概括为：

`data source → declared use preference → provider ingestion policy → training eligibility → model provenance → downstream access / enforcement`

这使“训练数据能否被使用”开始从单个厂商的 crawler policy，向跨厂商可机器读取的用途偏好层移动。

## 10. 为什么值得留档

这不是一个已经完成的互联网标准，但它至少值得作为政策/标准化节点留档，原因是：

1. OpenAI、Google、Microsoft、Anthropic 同日围绕同一个训练用途信号作出承诺；
2. 它把 AI content governance 的抽象层从 crawler identity 提升到 intended use；
3. 它直接影响 publisher / website operator 与 foundation-model training pipeline 的边界；
4. 若 2027 年多厂商 implementation 按计划落地，它可能成为训练数据 consent/preferences 的重要互操作层；
5. 即使最终未成为正式标准，今天的承诺本身也是大型模型厂商对 Web 内容训练治理的一次可核验集体收敛。

## 11. 建议写入位置

- **编年**：2026-10-30，记录四家主要 AI 厂商承诺采用共享 `robots.txt` training-preference signal。
- **志 / 数据与训练治理**：建立 `crawler identity → usage preference → training eligibility` 演进链。
- **志 / 标准与协议**：IETF AIPREF、Internet-Draft、跨厂商 adoption timeline。
- **表 / 厂商政策**：按 Anthropic / OpenAI / Microsoft / Google 分别记录宣布日期、计划生效日期、现有专属控制、是否覆盖 crawling / training / grounding。

## 12. 是否需要修订已有条目

当前仓库代码搜索未发现 `__usage_ai-training` 既有条目，因此本包不覆盖旧事件。

后续月度整理时，可以把 2026-09-15 Cloudflare `Disallow AI Training` / Accountable crawler controls 与本事件串联，避免误写成 10 月 30 日才首次出现“search 与 AI training 分离控制”的思想。

## 13. 尚不能推出的结论

当前不能推出：

- IETF 已经正式批准这一机制；
- 四家公司已经全部完成部署；
- 该信号具有法律强制力；
- 加入该 token 后 crawler 就不会访问网站；
- opt-out 会删除历史训练数据或让既有模型“忘记”内容；
- 它自动覆盖 search、grounding、RAG、AI summaries 或 Agent browsing；
- 所有 AI 厂商都会采用；
- 厂商在未来训练管线中的执行已经被第三方独立审计验证。

## 14. 后续观察点

- Anthropic 的实际 rollout 范围与产品覆盖；
- OpenAI 公布 implementation details 的日期与 GPTBot / OAI-SearchBot 的交互；
- Microsoft 2027-02-01 实际生效情况；
- Google 2027 年实现时与 Google-Extended、Search、Gemini grounding 的关系；
- IETF draft 是否进入 working-group adoption / 后续版本 / RFC 流程；
- 是否有 Meta、xAI、Mistral、DeepSeek、Qwen、Kimi、MiniMax 等更多模型厂商加入；
- 是否出现可重复的 compliance audit，验证声明偏好与训练数据管线实际执行的一致性。
