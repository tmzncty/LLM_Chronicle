# 阿莫代兄妹合传：史料底稿与待校问题（2026-11-12）

> 与 `纪传/列传/Dario-Daniela-Amodei.md` 配套。目的不是提高人物赞誉，而是使其机构、论文、治理职责可以逐项追溯。本文不代替来源归档和独立史料校勘。

## 一、选择合传的理由

- 两人为兄妹，**但亲属关系本身不足以入合传**。真正的史料联系是 2018—2020 年在 OpenAI 任职、2021 年参与共同创办 Anthropic、2023—2026 年持续承担不同的机构职务及治理责任。
- Dario 的研究生涯有论文、机构公告与 SEC 履历作证；Daniela 的风险管理、人员、工程、安全政策及董事治理岗位，则有 SEC 履历及 Anthropic 高管说明作证。
- 合传让人物差异保留下来：不能把 Daniela 缩成“负责融资的妹妹”，不能把 Dario 误写成 Anthropic 研究的唯一发明者。

## 二、重要事实与直接出处

| 命题 | 关键出处 | 证据范围与注意 |
|---|---|---|
| Dario 的教育、Google Brain、OpenAI 任职年月 | [SEC S-1/A-2 2026-11-10](https://www.sec.gov/Archives/edgar/data/2130357/000162828026072484/anthropicpbc-sx1ax2.htm), Executive Officers；[Hertz biography](https://www.hertzfoundation.org/people/dario-amodei/) | 法定申报与人物简介；未据此推定当年动机 |
| Daniela UC Santa Cruz 英语文学、Stripe 风险岗位、OpenAI 人员/政策/工程岗位 | 同上 SEC S-1/A-2, Executive Officers | 明确不同职务，不宜统称运营副总裁 |
| 2020 规模定律论文作者与排名 | [Kaplan et al., 2020](https://arxiv.org/abs/2001.08361) | Kaplan 第一作者，Dario 共同作者；不是一人发明 |
| Dario 2020 年离职与其在 OpenAI 的研究领导关系 | [OpenAI, 2020-12-29](https://openai.com/index/organizational-update/) | 当时机构自述，不完整说明离任私人原因 |
| Anthropic 2021-01 七名共同创办者、Dario CEO 与 Daniela President/Chair | SEC S-1/A-2, Our Co-Founders / Executive Officers | 2026 年正式申报，对 2021 创办作事后法定陈述 |
| 2022 Constitutional AI 论文作者 | [Bai et al., 2022](https://arxiv.org/abs/2212.08073) | Bai 第一作者，Dario 共同作者；Daniela 不在名单，不能编为算法发明人 |
| 2023 Claude、RSP 与 LTBT | [Claude 2023-03](https://www.anthropic.com/news/introducing-claude)；[RSP 2023-09](https://www.anthropic.com/news/anthropics-responsible-scaling-policy)；[LTBT 2023-09](https://www.anthropic.com/news/the-long-term-benefit-trust) | 发布、原则与制度设计可核；无法据公告证明部署可靠性及治理效果 |
| 2026 IPO：10/26 申报、11/10 修订与路演 | [S-1/A-2](https://www.sec.gov/Archives/edgar/data/2130357/000162828026072484/anthropicpbc-sx1ax2.htm)；[Anthropic 路演公告](https://www.anthropic.com/news/roadshow-launch) | 截至 11/10 公告注册尚未生效；不可写成已上市 |
| 2026 治理结构：LTBT 选任董事 vs 创办者股权表决 | SEC S-1/A-2, Our Governance Structure and Its Goals | 董事多数任免权、股东投票权、日常经营权互不等同，需分别书写 |

## 三、与既存仓库内容的差异

1. **`表/人物谱系.md`** 旧记“Dario 提出 Constitutional AI”，需要在 PR #82 合并后另开小补丁，把归属改为“Bai 等人共同研究；Dario 为共同作者和研究管理者”；否则会与本次合传冲突。
2. 同表旧记 Daniela 为“OpenAI 运营副总裁”，并将其主要贡献缩为商业化融资。SEC 公开申报可直接核正为**工程经理、人员管理副总裁、安全与政策副总裁**等岗位，及其在 Anthropic 的总裁、董事长职责。
3. **`纪传/本纪/Anthropic.md`** 已有公司技术产品史，不宜复制整个 Claude 型号表。合传主要写人的教育、职位、合作关系、机构制度及一手论文分工。
4. **`纪传/列传/Ilya-Sutskever.md`** 在待审 PR #82 中，提供 OpenAI 的另一研究/治理人物视角；正式合并后宜建立互见，不能假设该文件已在 `main`。
5. **`表/人物谱系.md` 与 `00_体例.md` 同时由 PR #82 修改**，本 PR 有意不碰，避免两个并行草稿 PR 对同一路径产生冲突。

## 四、下次史料复核的重点

- OpenAI 2018—2020 的同时代内部职位公告、同期人物采访或可信独立报道，进一步确认二人在不同岗位的行动，不从 2026 年职业履历补写当时心态。
- 2021 年成立初期的注册/融资文件，以及七名创办者各自的工作记录，补强 2026 年招股回顾以外的材料。
- LTBT 2023 设计到 2026 法定版本间的权利变化，需要法律文件对读，特别注意 Class F、Class T 及董事免任的触发条件。
- Dario 个人公开文章属于**公开思想**，不自动代表 Daniela 观点或公司全部人员意见。
- 提到公司“安全”时，应分别检查论文实验、公司治理承诺、实际风险报告与独立部署结果，不将愿景视为验证通过。

**快照状态：** 本次未在 `sources/` 保存原始网页 HTML（`snapshot pending`）；正式审校仍须核验页面可达性、版本与时点。未修改生成索引 `INDEX.md`。

## 五、下一批不宜急写的人物

- Sam Altman：2015 联合主席、后任 CEO、2023 董事会危机、2025—2026 法人治理必须各自核准，再写个人言行与合作关系。
- Demis Hassabis：DeepMind 的学术、公司与管理轨迹不能由 AlphaGo/Gemini 的成果堆叠代替；应先收集公司早期创办材料与合作者的口述。
- 梁文锋：中文媒体的二手叙述多，材料薄弱部分先建史料卡，拒绝创业神话化写法。
