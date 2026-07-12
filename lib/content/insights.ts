import type { Localized } from '@/lib/i18n/config';

/**
 * On-site insights/blog content — the organic-marketing engine. Each article is
 * evergreen prose targeting a real high-intent search query; the /insights pages
 * add a live "current data" callout (from computeScores/convictionIndex) so every
 * article stays fresh each deploy. New articles are appended here by the weekly
 * ops workflow. Educational, sourced from public 13F filings; not advice.
 */
export type Insight = {
  slug: string;
  date: string; // YYYY-MM-DD
  title: Localized;
  description: Localized;
  keywords: string[];
  body: { h: Localized; p: Localized }[];
};

export const insights: Insight[] = [
  {
    slug: 'buffett-ai-holdings-2026',
    date: '2026-07-12',
    title: {
      zh: '巴菲特 2026 在 AI 上买了什么?伯克希尔的 AI 敞口拆解',
      en: 'What AI does Buffett own in 2026? Berkshire’s AI exposure, decoded',
    },
    description: {
      zh: '巴菲特一向"不碰科技"?其实伯克希尔的 AI 敞口藏在云与平台里。用公开 13F 拆解他的 AI 相关持仓,并和其他 7 位传奇投资人的共识对比。',
      en: 'Buffett “avoids tech”? Berkshire’s real AI exposure hides in cloud and platforms. We decode his AI-related holdings from public 13F filings and compare them with seven other legends.',
    },
    keywords: ['巴菲特 AI 持仓', '伯克希尔 AI', 'Buffett AI stocks', 'Berkshire AI holdings'],
    body: [
      {
        h: { zh: '巴菲特买 AI 吗?', en: 'Does Buffett buy AI?' },
        p: {
          zh: '流传的说法是"巴菲特不碰科技"。但真相更细致:伯克希尔的 AI 敞口不在芯片博弈,而在**能把 AI 变成现金流的云与平台巨头**——这更符合他"买有护城河的现金牛"的一贯风格。与其猜他的态度,不如看他公开披露的动作。',
          en: 'The cliché is “Buffett avoids tech.” The truth is subtler: Berkshire’s AI exposure isn’t a chip bet — it’s the **cloud-and-platform giants that turn AI into cash flow**, which fits his lifelong preference for moaty cash machines. Rather than guess his stance, read his disclosed actions.',
        },
      },
      {
        h: { zh: '为什么是"云与平台",不是芯片', en: 'Why cloud/platforms, not chips' },
        p: {
          zh: '芯片赛道竞争激烈、资本开支巨大、周期性强——不在巴菲特的能力圈舒适区。而云与应用平台拥有规模、分发与定价权,AI 是它们的增量而非生死赌注。这也是为什么在"罗盘共识分"里,平台型标的往往比纯算力标的获得更稳的跨风格共识。',
          en: 'Chips are fiercely competitive, capital-hungry, and cyclical — outside Buffett’s comfort zone. Cloud and application platforms have scale, distribution, and pricing power; AI is upside for them, not a bet-the-company gamble. It’s also why, in the Compass Consensus Score, platform names tend to earn steadier cross-style consensus than pure-compute names.',
        },
      },
      {
        h: { zh: '怎么自己看清他的 AI 组合', en: 'See his AI sleeve for yourself' },
        p: {
          zh: '与其读二手解读,不如直接看数据:在"跟投大佬"页可以一键把巴菲特的 AI 相关持仓放进组合体检,看这套组合的共识分,以及哪些标的同时被其他大佬持有。共识越跨风格,信号越强——这正是把持仓量化成分数的价值。',
          en: 'Instead of second-hand takes, go to the data: the “copy a legend” page loads Buffett’s AI-related holdings into the Portfolio Check in one click, showing the sleeve’s Consensus Score and which names other legends also hold. The more cross-style the agreement, the stronger the signal — the whole point of quantifying positioning.',
        },
      },
    ],
  },
  {
    slug: 'best-ai-stocks-investor-consensus',
    date: '2026-07-12',
    title: {
      zh: 'AI 龙头股谁的机构共识最强?罗盘共识分 Top 榜(每季更新)',
      en: 'Which AI stocks have the strongest investor consensus? The leaderboard',
    },
    description: {
      zh: '与其听单一分析师喊单,不如看 8 位传奇投资人的集体动作。罗盘共识分把他们的公开 13F 量化为每只 AI 股 0–100 分,每季更新——这是找"强共识 AI 龙头"的另一种视角。',
      en: 'Instead of one analyst’s call, look at eight legendary investors’ collective actions. The Compass Consensus Score turns their public 13F into a 0–100 score per AI stock, refreshed quarterly — a different lens on “consensus AI leaders.”',
    },
    keywords: ['AI 龙头股', 'AI 股票 推荐', '机构共识 AI', 'best AI stocks', 'top AI stocks'],
    body: [
      {
        h: { zh: '"龙头"不该由一个人说了算', en: '“Leaders” shouldn’t be one person’s call' },
        p: {
          zh: '网上"最佳 AI 股"清单大多是单一观点、缺出处。更稳的做法:看多位风格迥异的传奇投资人**是否在同一批标的上达成共识**。当价值派、成长派、宏观派同时持有同一只 AI 股,这种跨风格共识比任何单一喊单都更值得研究。',
          en: 'Most “best AI stocks” lists are one opinion with no sourcing. A sturdier approach: check whether several style-diverse legends **converge on the same names**. When value, growth, and macro investors all hold the same AI stock, that cross-style consensus is worth more study than any single call.',
        },
      },
      {
        h: { zh: '共识分怎么算', en: 'How the score works' },
        p: {
          zh: '罗盘共识分 = 持有人基础分 + 动作分(新建/加仓加分,减持/清仓扣分)+ 跨风格共识加成,夹到 0–100。公式完全公开、每季随 13F 更新。它不是股价预测,而是把"大佬当季在这只票上怎么动手"压缩成一个可比较、可追踪的数字。',
          en: 'CCS = holders base + action score (new/adds add points; trims/exits subtract) + a cross-style bonus, clamped to 0–100. The formula is fully published and refreshes each 13F season. It isn’t a price forecast — it compresses “what the legends actually did on this name this quarter” into one comparable, trackable number.',
        },
      },
      {
        h: { zh: '看当前榜单 + 测你自己的组合', en: 'See the live leaderboard — and test your mix' },
        p: {
          zh: '共识榜每季更新,页顶还有"AI 共识温度计"——一个衡量大佬对 AI 整体信念强度的单一指标。看完榜单,可以顺手用免费的"组合共识体检"贴上你自己的持仓,看你和哪位大佬最合拍、逐只共识分如何。',
          en: 'The leaderboard refreshes quarterly, topped by the AI Conviction Index — a single read on how strongly the legends collectively back AI. After the leaderboard, drop your own holdings into the free Portfolio Consensus Check to see which legend you align with most and how each name scores.',
        },
      },
    ],
  },
  {
    slug: 'should-you-buy-nvidia-investor-actions',
    date: '2026-07-12',
    title: {
      zh: '英伟达还值得买吗?先看 8 位传奇投资人本季的真实动作',
      en: 'Is Nvidia still a buy? Start with what 8 legendary investors actually did',
    },
    description: {
      zh: '关于英伟达的多空吵翻天。与其看观点,不如看动作:段永平大幅加仓,而 Tepper、Coatue 同期减持——分歧本身就是重要信息。用公开 13F 还原大佬们在 NVDA 上的真实分歧。',
      en: 'The Nvidia bull/bear debate is endless. Skip the opinions, read the actions: Duan Yongping added sharply while Tepper and Coatue trimmed — the disagreement itself is the signal. We reconstruct the legends’ split on NVDA from public 13F filings.',
    },
    keywords: ['英伟达 值得买吗', '英伟达 机构持仓', 'NVDA 大佬', 'should I buy Nvidia', 'Nvidia hedge funds'],
    body: [
      {
        h: { zh: '英伟达的共识分为什么不高?', en: 'Why isn’t Nvidia’s consensus score high?' },
        p: {
          zh: '很多人以为最热的 AI 票一定共识最强。恰恰相反:英伟达的罗盘共识分并不高,因为大佬们在它上面**明显分歧**——有人大幅加仓,有人同期减持。共识分忠实反映动作的净方向,而分歧本身,就是它想告诉你的信息。',
          en: 'Many assume the hottest AI name must have the strongest consensus. The opposite is true: Nvidia’s Compass Consensus Score isn’t high because the legends **clearly disagree** — some add sharply while others trim in the same quarter. The score faithfully reflects the net direction of actions, and the disagreement is precisely the signal.',
        },
      },
      {
        h: { zh: '谁在加、谁在减', en: 'Who’s adding, who’s trimming' },
        p: {
          zh: '以本站收录的动作为例:段永平把英伟达加成前三大重仓,而 David Tepper 与 Coatue(Philippe Laffont)同期减持。同一只票、相反的手——这不是谁对谁错,而是提醒你:高关注度的标的,往往定价已包含了大量预期,分歧因此更大。',
          en: 'From the actions tracked here: Duan Yongping built Nvidia into a top-three position, while David Tepper and Coatue (Philippe Laffont) trimmed in the same window. Same name, opposite hands — not about who’s right, but a reminder that high-attention names often price in a lot of expectation, which is exactly why the split widens.',
        },
      },
      {
        h: { zh: '把分歧变成你的检查清单', en: 'Turn the split into your checklist' },
        p: {
          zh: '当大佬分歧时,答案不在"跟谁",而在"你更认同哪套逻辑"。在英伟达的个股页可以看到多空双方的备注与来源;在"NVDA vs 其他标的"对比页,能把它和共识更强的名字并排看。研究清楚再决定,而不是追热度。',
          en: 'When the legends split, the answer isn’t “who to follow” but “whose logic you find more convincing.” Nvidia’s stock page shows both sides’ notes and sources; the “NVDA vs …” compare pages put it side by side with higher-consensus names. Decide after the research, not by chasing heat.',
        },
      },
    ],
  },
  {
    slug: 'duan-yongping-ai-2026',
    date: '2026-07-10',
    title: {
      zh: '段永平 2026 的 AI 持仓:从苹果到英伟达、拼多多的渐进押注',
      en: 'Duan Yongping’s 2026 AI bets: a gradual shift from Apple toward AI',
    },
    description: {
      zh: '以苹果、伯克希尔为压舱石的价值投资者,2026 起明显向 AI 倾斜:大幅加仓英伟达、新建 AI 软件股,同时重仓拼多多。对华语读者尤具参考。用公开动作还原他的 AI 组合。',
      en: 'A value investor anchored in Apple and Berkshire, Duan Yongping tilted toward AI from 2026 — adding Nvidia sharply, opening AI-software positions, and holding PDD. We reconstruct his AI sleeve from disclosed actions.',
    },
    keywords: ['段永平 持仓', '段永平 英伟达', '段永平 拼多多', 'Duan Yongping portfolio', 'Duan Yongping AI'],
    body: [
      {
        h: { zh: '"本分"与能力圈', en: '“Stay within your circle”' },
        p: {
          zh: '段永平强调"本分"与能力圈:长期重仓自己彻底理解的苹果、伯克希尔,极少频繁交易。他对苹果的表态很典型——"很成熟、依然会增长,但股价不便宜了",这是一种估值纪律,而不是追涨杀跌。',
          en: 'Duan Yongping preaches staying within your circle of competence: long-held, deeply understood positions in Apple and Berkshire, with little trading. His line on Apple — “mature, still growing, but no longer cheap” — is valuation discipline, not momentum chasing.',
        },
      },
      {
        h: { zh: '他在 AI 上怎么动手', en: 'How he moved into AI' },
        p: {
          zh: '2026 一季度他把英伟达加成前三大重仓,并新建 Palantir 等 AI 软件/算力股——从纯价值向 AI 渐进倾斜,同时保留拼多多这类中概敞口。这不是"all in AI",而是在能力圈边界内的谨慎扩张。想看这套组合与其他大佬的重合度,用"跟投大佬"页一键载入。',
          en: 'In Q1 2026 he built Nvidia into a top-three holding and opened AI-software/compute names like Palantir — a gradual tilt from pure value toward AI, while keeping China exposure such as PDD. Not “all in AI,” but a careful expansion at the edge of his circle. The “copy a legend” page loads this sleeve in one click.',
        },
      },
      {
        h: { zh: '对普通投资者的启示', en: 'The takeaway' },
        p: {
          zh: '渐进、估值纪律、只买懂的——这套原则比"他买了什么"更值得抄。与其照单全收他的持仓,不如看哪些标的同时获得多位大佬的跨风格共识,再结合你自己的能力圈决定。',
          en: 'Gradualism, valuation discipline, only-what-you-understand — those principles are worth copying more than the tickers. Rather than mirror his holdings wholesale, look for names that earn cross-style consensus from several legends, then decide within your own circle.',
        },
      },
    ],
  },
  {
    slug: 'cathie-wood-ark-ai-2026',
    date: '2026-07-09',
    title: {
      zh: 'Cathie Wood / ARK 2026 的 AI 押注:算力、云与"下一代"',
      en: 'Cathie Wood / ARK’s 2026 AI bets: compute, cloud, and the next generation',
    },
    description: {
      zh: '成长派代表 Cathie Wood 押注 AI 的方式和价值派截然不同:重仓下一代算力与云基建。高波动往往意味着高分歧——用罗盘共识分看她的持仓在大佬中是"共识"还是"孤注"。',
      en: 'Growth-style investor Cathie Wood bets on AI very differently from the value camp: next-generation compute and cloud infrastructure. High volatility often means high disagreement — the Consensus Score shows whether her names are consensus or a lone bet.',
    },
    keywords: ['Cathie Wood 持仓', '木头姐 AI', 'ARK AI', 'Cathie Wood AI stocks', 'ARK Invest holdings'],
    body: [
      {
        h: { zh: '成长派怎么看 AI', en: 'The growth lens on AI' },
        p: {
          zh: '与巴菲特"买现金牛"不同,Cathie Wood 追逐的是**颠覆性拐点**:她更愿意为"下一代"算力与 AI 原生公司支付高估值,承受高波动。这不是对错问题,而是风格差异——理解风格,才能理解她为什么持有别人不碰的标的。',
          en: 'Unlike Buffett’s cash-cow approach, Cathie Wood chases disruptive inflections: she’ll pay up for next-gen compute and AI-native companies and stomach the volatility. Not right or wrong — a style difference. Understand the style and you understand why she holds names others avoid.',
        },
      },
      {
        h: { zh: '她押注的方向', en: 'Where she leans' },
        p: {
          zh: '她的 AI 敞口偏向新一代算力与云基建(如 CoreWeave、Cerebras 一类),而非已被充分定价的巨头。这类标的在本站往往共识分不高——不是因为差,而是因为只有少数风格的投资者持有,跨风格共识尚未形成。',
          en: 'Her AI exposure leans toward newer compute and cloud infrastructure (the CoreWeave / Cerebras cohort) rather than fully-priced megacaps. Such names often score lower here — not because they’re bad, but because only a few investing styles hold them, so cross-style consensus hasn’t formed yet.',
        },
      },
      {
        h: { zh: '高分歧标的怎么研究', en: 'How to research high-divergence names' },
        p: {
          zh: '当一只票只有成长派持有、共识分不高时,答案不在"跟不跟",而在你是否认同这套成长逻辑、能否承受波动。先在她的"跟投"页看这套组合的整体共识分,再逐只对照多空逻辑。',
          en: 'When a name is held only by growth investors and scores low, the question isn’t whether to follow but whether you buy the growth thesis and can bear the swings. Start from her sleeve’s overall Consensus Score on the “copy a legend” page, then read each name’s bull/risk.',
        },
      },
    ],
  },
  {
    slug: 'ai-energy-nuclear-stocks',
    date: '2026-07-08',
    title: {
      zh: 'AI 最被忽略的受益股:耗电、核电与"二阶"AI 敞口',
      en: 'AI’s most overlooked winners: power, nuclear, and second-order exposure',
    },
    description: {
      zh: 'AI 的尽头是电力。算力狂飙推高数据中心耗电,把能源、核电、电网变成"二阶"AI 受益方向。这条线索常被追芯片的人忽略——用长期视角和大佬的公开布局审视它。',
      en: 'AI ends at electricity. Soaring compute drives data-center power demand, turning energy, nuclear, and the grid into second-order AI beneficiaries — a thread chip-chasers often miss. We examine it through a long-term lens and the legends’ disclosed positioning.',
    },
    keywords: ['AI 能源 股票', 'AI 核电', 'AI 耗电', 'AI energy stocks', 'nuclear AI stocks', 'datacenter power'],
    body: [
      {
        h: { zh: '为什么 AI 是"电力问题"', en: 'Why AI is a “power problem”' },
        p: {
          zh: 'AI 的算力扩张直接推高数据中心用电,电力从"成本项"变成"瓶颈项"。当芯片估值已高时,聪明的资金开始沿产业链往上游看:谁给这些算力供电?这就是"二阶"AI 敞口的由来。',
          en: 'AI’s compute build-out drives data-center electricity demand, turning power from a cost line into a bottleneck. With chip valuations stretched, smart money looks upstream: who powers all this compute? That’s the origin of “second-order” AI exposure.',
        },
      },
      {
        h: { zh: '能源、核电、电网', en: 'Energy, nuclear, the grid' },
        p: {
          zh: '基载电力(尤其核电)、电网与冷却环节,都是 AI 耗电叙事的受益方向。本站把这类标的归入"AI 能源与电力"赛道——属于典型的"二阶"受益者:不直接卖 AI,却被 AI 的电力需求托底。',
          en: 'Baseload power (nuclear especially), the grid, and cooling all sit downstream of the AI power story. The site groups these under the “AI energy & power” layer — classic second-order beneficiaries: they don’t sell AI, but AI’s electricity demand underpins them.',
        },
      },
      {
        h: { zh: '用分层逻辑,而不是追热度', en: 'Use layer logic, not hype' },
        p: {
          zh: '在 AI 行情页,你可以按"卖铲人 → 云与平台 → 应用 → 能源底座"四层拆解整个板块,先分清你买的是哪一层。能源是最慢、但也最实的一层——适合长期、耐得住波动的资金。',
          en: 'On the AI market page you can split the sector into four layers — picks-and-shovels → cloud/platforms → applications → the energy base — and know which one you’re buying. Energy is the slowest but sturdiest layer, suited to patient, long-term capital.',
        },
      },
    ],
  },
  {
    slug: 'how-to-copy-13f-portfolios',
    date: '2026-07-07',
    title: {
      zh: '如何"跟投"13F?照抄大佬持仓的正确姿势与三个陷阱',
      en: 'How to “copy” a 13F: the right way to mirror the legends — and 3 traps',
    },
    description: {
      zh: '"抄大佬作业"听起来简单,做起来全是坑:数据滞后 45 天、只披露多头、不含成本价。讲清 13F 是什么、三个常见陷阱,以及用共识而非单一持仓的正确姿势。',
      en: '“Copy the legends’ homework” sounds easy but is full of traps: 45-day lag, longs-only disclosure, no cost basis. We explain what a 13F is, three common traps, and the right way — consensus over any single holding.',
    },
    keywords: ['13F 跟投', '抄作业 持仓', '13F 是什么', 'copy 13F portfolio', '13F filing explained'],
    body: [
      {
        h: { zh: '13F 是什么', en: 'What a 13F is' },
        p: {
          zh: '13F 是美国大型机构每季度向 SEC 披露美股持仓的报告,截止日为季度结束后 45 天。它是"跟投大佬"最公开、最可靠的数据源——但正因为公开,坑也都在明处。',
          en: 'A 13F is the quarterly SEC filing where large U.S. institutions disclose their equity holdings, due 45 days after quarter-end. It’s the most public, reliable data source for mirroring the legends — but being public, its pitfalls are hiding in plain sight.',
        },
      },
      {
        h: { zh: '三个陷阱', en: 'Three traps' },
        p: {
          zh: '一、滞后:你看到的是最多 45 天前的持仓,大佬可能早已加减。二、只报多头:13F 不含做空、期权对冲,你看到的未必是他的真实净敞口。三、不含成本:你不知道他的买入价,盲目追高风险大。',
          en: 'One, lag: you see holdings up to 45 days old; the legend may have already moved. Two, longs-only: 13F excludes shorts and options hedges, so it isn’t their true net exposure. Three, no cost basis: you don’t know their entry, so blindly chasing is risky.',
        },
      },
      {
        h: { zh: '正确姿势:看共识,不看单一持仓', en: 'The right way: consensus over any single name' },
        p: {
          zh: '与其押注某一位大佬的某一只票,不如看**多位风格迥异的投资人在哪些标的上达成共识**——跨风格共识对滞后和个体偏差都更稳健。用免费的"组合共识体检"把你自己的持仓和大佬对照,比照抄一份过期名单靠谱得多。',
          en: 'Rather than bet on one legend’s one stock, look at where **style-diverse investors converge** — cross-style consensus is more robust to lag and individual quirks. Comparing your own holdings against the legends in the free Portfolio Consensus Check beats copying a stale list.',
        },
      },
    ],
  },
  {
    slug: 'is-ai-a-bubble-investor-view',
    date: '2026-07-06',
    title: {
      zh: 'AI 是泡沫吗?别看观点,看传奇投资人真金白银的动作',
      en: 'Is AI a bubble? Don’t read opinions — read where the legends put real money',
    },
    description: {
      zh: '"AI 泡沫"之争永无定论。与其听观点,不如量化大佬集体的真实动作:AI 共识温度计衡量 8 位传奇投资人本季对 AI 的信念强度,而英伟达的分歧说明市场远没有一致答案。',
      en: 'The “AI bubble” debate never settles. Instead of opinions, quantify the legends’ actual moves: the AI Conviction Index measures how strongly eight investors back AI this quarter, while the split on Nvidia shows the market is far from a single answer.',
    },
    keywords: ['AI 泡沫', 'AI 泡沫 2026', 'AI 估值', 'AI bubble', 'is AI overvalued'],
    body: [
      {
        h: { zh: '"泡沫"之争为什么无解', en: 'Why the bubble debate is unwinnable' },
        p: {
          zh: '"是不是泡沫"取决于你用什么估值、看多长周期——所以永远吵不完。更有用的问题是:那些管着真金白银、且风格各异的传奇投资人,**当季在 AI 上是净加仓还是净减仓**?动作比观点诚实。',
          en: 'Whether it’s a bubble depends on your valuation model and horizon — which is why it never settles. A more useful question: are the style-diverse legends who run real money **net adding or net trimming** AI this quarter? Actions are more honest than opinions.',
        },
      },
      {
        h: { zh: '把"信念"量化成一个数字', en: 'Quantifying conviction into one number' },
        p: {
          zh: '"AI 共识温度计"取共识标的的平均共识分,给出一个 0–100 的集体信念读数,并标出净动作是增持还是减持。它不预测泡沫破不破,但能让你一眼看到:大佬们是在集体加码,还是在悄悄撤退。',
          en: 'The AI Conviction Index takes the mean Consensus Score across consensus names for a single 0–100 read of collective conviction, and flags whether net action is adding or trimming. It won’t call the top, but it shows at a glance whether the legends are piling in or quietly stepping back.',
        },
      },
      {
        h: { zh: '分歧本身就是答案', en: 'The disagreement is the answer' },
        p: {
          zh: '最能说明"没有一致答案"的,是英伟达:有人大幅加仓,有人同期减持。当最热的标的都存在明显分歧,说明市场把大量预期都定进了价——这时候,估值纪律和长期视角比"追不追"更重要。',
          en: 'Nothing shows “no single answer” better than Nvidia: some add sharply while others trim. When even the hottest name is clearly split, the market has priced in a lot of expectation — and valuation discipline plus a long horizon matter more than whether to chase.',
        },
      },
    ],
  },
  {
    slug: 'david-tepper-amazon-ai',
    date: '2026-07-05',
    title: {
      zh: 'David Tepper 为什么重仓亚马逊?押注 AI"变现端"的逻辑',
      en: 'Why David Tepper bets big on Amazon: the “AI monetization” thesis',
    },
    description: {
      zh: '当很多人还在追芯片,Appaloosa 的 David Tepper 把亚马逊加成头号重仓,同时减持英伟达、AMD。这是一种"押注 AI 变现端、而非算力军备"的思路。用公开动作与共识分拆解他的逻辑。',
      en: 'While many chase chips, Appaloosa’s David Tepper made Amazon a top position while trimming Nvidia and AMD — a “bet on AI monetization, not the compute arms race” thesis. We decode it with disclosed actions and the Consensus Score.',
    },
    keywords: ['David Tepper 亚马逊', 'Tepper 持仓', 'Appaloosa AI', 'David Tepper Amazon', 'Tepper Nvidia'],
    body: [
      {
        h: { zh: 'Tepper 的宏观+机会主义风格', en: 'Tepper’s macro-opportunist style' },
        p: {
          zh: 'David Tepper 以宏观判断和逆向机会主义著称,敢重仓、也敢快速调整。2026 他把亚马逊加成头号重仓,同时减持英伟达与 AMD——这不是看空 AI,而是把筹码从"算力军备"挪向"AI 变现端"。',
          en: 'David Tepper is known for macro calls and contrarian opportunism — big positions, fast adjustments. In 2026 he made Amazon a top holding while trimming Nvidia and AMD — not bearish on AI, but moving chips from the “compute arms race” toward the “monetization” side.',
        },
      },
      {
        h: { zh: '为什么是亚马逊', en: 'Why Amazon' },
        p: {
          zh: '云(AWS)是 AI 最直接的变现管道之一,叠加广告与成本周期改善,亚马逊被视为"把 AI 需求转成现金流"的标的。这也是为什么它在本站拿到最高的共识分之一——价值派、成长派、宏观派同时持有,跨风格共识极强。',
          en: 'Cloud (AWS) is one of AI’s most direct monetization pipes; add advertising and an improving cost cycle, and Amazon reads as a name that turns AI demand into cash flow. It’s why Amazon earns one of the highest Consensus Scores here — held across value, growth, and macro styles, a very strong cross-style consensus.',
        },
      },
      {
        h: { zh: '变现端 vs 算力端', en: 'Monetization vs compute' },
        p: {
          zh: 'Tepper 加亚马逊、减英伟达,恰好体现了 AI 板块的一条主线分歧:是买"卖铲人"(算力),还是买"淘金变现"(应用与云)?没有标准答案——但看清多位大佬各自站哪一边,能帮你想清自己的逻辑。用对比页把亚马逊和英伟达并排看。',
          en: 'Tepper adding Amazon while trimming Nvidia captures a core fault line in AI: buy the “shovel sellers” (compute) or the “monetizers” (apps and cloud)? No standard answer — but seeing which side each legend stands on helps you clarify your own. Put Amazon and Nvidia side by side on the compare page.',
        },
      },
    ],
  },
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}
