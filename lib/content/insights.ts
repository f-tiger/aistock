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
];

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}
