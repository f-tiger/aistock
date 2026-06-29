import type { Investor } from './types';

/**
 * Curated profiles of legendary investors and their AI-related positioning.
 *
 * Holdings are drawn from public sources (quarterly SEC 13F filings and public
 * reporting) and are illustrative of each investor's AI stance, NOT a complete
 * portfolio. Each profile carries an `asOf` date and sources. This is education,
 * not advice — see the site-wide disclaimer.
 */
export const investors: Investor[] = [
  {
    slug: 'warren-buffett',
    name: { zh: '沃伦·巴菲特', en: 'Warren Buffett' },
    firm: { zh: '伯克希尔·哈撒韦', en: 'Berkshire Hathaway' },
    style: { zh: '价值投资 / 护城河', en: 'Value investing / moats' },
    horizon: { zh: '超长期（数十年）', en: 'Very long-term (decades)' },
    summary: {
      zh: '不追逐 AI 概念，而是通过有定价权、有护城河的优质企业“间接”持有 AI 敞口——典型如 Amazon 与 Apple。',
      en: 'Avoids chasing the AI theme; gains AI exposure indirectly through high-quality, moat-rich businesses — notably Amazon and Apple.',
    },
    thesis: [
      {
        zh: '巴菲特强调“能力圈”：他不押注难以预测的技术赢家，而是买入无论谁赢都能受益、且能长期复利的企业。',
        en: 'Buffett anchors on his “circle of competence”: rather than picking hard-to-forecast tech winners, he owns businesses that compound for decades and benefit no matter who wins.',
      },
      {
        zh: 'Amazon 是巴菲特与 Cathie Wood 罕见的“共识”持仓——AWS 把 AI 变现为云收入，是“卖铲人 + 应用”双重敞口。',
        en: 'Amazon is a rare position both Buffett and Cathie Wood hold — AWS monetizes AI as cloud revenue, giving dual “picks-and-shovels + application” exposure.',
      },
      {
        zh: '核心纪律：估值要有安全边际，业务要可理解、可持续，管理层要理性配置资本。',
        en: 'The discipline: demand a margin of safety on valuation, understandable and durable businesses, and rational capital allocation by management.',
      },
    ],
    holdings: [
      { ticker: 'AMZN', name: { zh: '亚马逊', en: 'Amazon' }, note: { zh: 'AWS 云 + AI 变现', en: 'AWS cloud + AI monetization' } },
      { ticker: 'AAPL', name: { zh: '苹果', en: 'Apple' }, note: { zh: '设备端 AI 与生态护城河', en: 'On-device AI and ecosystem moat' } },
    ],
    themeIds: ['infrastructure', 'applications'],
    asOf: '2026-03-31 (Q1 2026 13F)',
    sources: [
      { label: 'Motley Fool — Buffett & Wood both own Amazon', url: 'https://www.fool.com/investing/2025/11/04/cathie-wood-and-warren-buffett-both-own-this-artif/' },
      { label: 'MarketWise — Berkshire portfolio tracker', url: 'https://marketwise.com/investing/warren-buffett-portfolio-tracker-berkshire-hathaway-buys-sells/' },
    ],
  },
  {
    slug: 'cathie-wood',
    name: { zh: '凯茜·伍德', en: 'Cathie Wood' },
    firm: { zh: 'ARK Invest', en: 'ARK Invest' },
    style: { zh: '颠覆式创新 / 高成长', en: 'Disruptive innovation / high growth' },
    horizon: { zh: '长期（5 年以上主题）', en: 'Long-term (5+ year themes)' },
    summary: {
      zh: '最激进的 AI 多头之一。押注 AI 基础设施与下一代算力——CoreWeave、Cerebras，并以核电（X-Energy）布局 AI 的“能源底座”。',
      en: 'One of the most aggressive AI bulls. Bets on AI infrastructure and next-gen compute — CoreWeave, Cerebras — and on nuclear (X-Energy) as AI’s energy base layer.',
    },
    thesis: [
      {
        zh: 'Wood 认为 AI 是跨行业的“通用技术”，会带来生产力大爆发；她偏好仍处早期、弹性最大的环节。',
        en: 'Wood views AI as a cross-industry “general-purpose technology” driving a productivity boom; she favors the earliest, highest-beta layers.',
      },
      {
        zh: '2026 年她将 AI 交易“收敛到更小的赢家圈”，加仓 Amazon（约 7200 万美元）、CoreWeave，并买入 AI 芯片新股 Cerebras。',
        en: 'In 2026 she narrowed the AI trade to a smaller circle of winners — adding Amazon (~$72M), CoreWeave, and the newly public AI-chip name Cerebras.',
      },
      {
        zh: '风格提示：高波动、高换手，回撤可能很大；适合作为组合中明确的“高风险卫星”而非核心。',
        en: 'Style note: high volatility and turnover with deep drawdowns — better as a clearly-sized high-risk satellite than a core holding.',
      },
    ],
    holdings: [
      { ticker: 'AMZN', name: { zh: '亚马逊', en: 'Amazon' }, note: { zh: '云 + AI 平台', en: 'Cloud + AI platform' } },
      { ticker: 'CRWV', name: { zh: 'CoreWeave', en: 'CoreWeave' }, note: { zh: '纯 GPU 云', en: 'Pure-play GPU cloud' } },
      { ticker: 'CBRS', name: { zh: 'Cerebras', en: 'Cerebras' }, note: { zh: 'AI 芯片新股', en: 'Newly public AI chip' } },
      { ticker: 'TEM', name: { zh: 'Tempus AI', en: 'Tempus AI' }, note: { zh: 'AI + 医疗数据', en: 'AI + healthcare data' } },
    ],
    themeIds: ['infrastructure', 'compute', 'energy'],
    asOf: '2026-05 (public reporting)',
    sources: [
      { label: 'TheStreet — Wood buys $72M Amazon / X-Energy', url: 'https://www.thestreet.com/investing/cathie-wood-buys-another-72m-of-mega-cap-amazon-stock' },
      { label: 'Motley Fool — Wood bets on Cerebras', url: 'https://www.fool.com/investing/2026/05/19/cathie-wood-just-bet-46-million-on-a-newly-public/' },
      { label: 'Motley Fool — Wood adds CoreWeave', url: 'https://www.fool.com/investing/2026/03/07/cathie-wood-bargain-hunting-2-ai-stocks-bought/' },
    ],
  },
  {
    slug: 'stanley-druckenmiller',
    name: { zh: '斯坦利·德鲁肯米勒', en: 'Stanley Druckenmiller' },
    firm: { zh: 'Duquesne Family Office', en: 'Duquesne Family Office' },
    style: { zh: '宏观 / 集中押注', en: 'Macro / concentrated bets' },
    horizon: { zh: '灵活，但重仓长期主题', en: 'Flexible, but concentrates on long themes' },
    summary: {
      zh: '宏观大师在 AI 上避开“最拥挤交易”，转向变现更清晰的平台——连续两季加仓 Amazon 与 Alphabet，而非 Nvidia 或 Palantir。',
      en: 'The macro legend sidesteps the most crowded AI trade, rotating toward platforms with clearer monetization — adding Amazon and Alphabet for two straight quarters, not Nvidia or Palantir.',
    },
    thesis: [
      {
        zh: 'Druckenmiller 擅长在主题早期重仓、在拥挤时退出；他对纯算力的高估值保持警惕。',
        en: 'Druckenmiller is known for sizing up early in a theme and exiting when it gets crowded; he is wary of rich valuations in pure compute.',
      },
      {
        zh: '选择 AMZN/GOOGL，反映“买变现端而非卖铲端”的轮动思路——AI 收入正在云与广告中兑现。',
        en: 'Choosing AMZN/GOOGL reflects a rotation toward where AI revenue actually shows up — cloud and advertising — rather than the picks-and-shovels layer.',
      },
    ],
    holdings: [
      { ticker: 'AMZN', name: { zh: '亚马逊', en: 'Amazon' }, note: { zh: '连续两季加仓', en: 'Added two quarters running' } },
      { ticker: 'GOOGL', name: { zh: '谷歌', en: 'Alphabet' }, note: { zh: '全栈 AI + 估值相对合理', en: 'Full-stack AI at a relatively reasonable valuation' } },
    ],
    themeIds: ['applications', 'infrastructure'],
    asOf: '2026-03-31 (Q1 2026 13F)',
    sources: [
      { label: 'Motley Fool — Druckenmiller buys AMZN & GOOGL', url: 'https://www.fool.com/investing/2026/03/31/billionaire-stanley-druckenmiller-buys-amzn-googl/' },
    ],
  },
  {
    slug: 'bill-ackman',
    name: { zh: '比尔·阿克曼', en: 'Bill Ackman' },
    firm: { zh: 'Pershing Square', en: 'Pershing Square' },
    style: { zh: '集中价值 / 优质成长', en: 'Concentrated value / quality growth' },
    horizon: { zh: '长期（数年）', en: 'Long-term (multi-year)' },
    summary: {
      zh: '只持有少数高确定性公司。AI 敞口偏向“品质成长”而非投机——通过 Alphabet 等平台型龙头间接参与。',
      en: 'Holds only a handful of high-conviction names. Gains AI exposure through quality compounders like Alphabet rather than speculation.',
    },
    thesis: [
      {
        zh: 'Ackman 的风格是“少而精”：集中持有可预测、有护城河、现金流强的企业，长期持有。',
        en: 'Ackman runs a concentrated book of predictable, moat-protected, cash-generative businesses held for the long run.',
      },
      {
        zh: '对 AI，他更看重“以合理价格买入确定性赢家”，而非为高增长支付任意溢价。',
        en: 'On AI he prioritizes buying durable winners at sensible prices over paying any premium for hyper-growth.',
      },
    ],
    holdings: [
      { ticker: 'GOOGL', name: { zh: '谷歌', en: 'Alphabet' }, note: { zh: '平台型 AI 龙头', en: 'Platform AI leader' } },
    ],
    themeIds: ['applications'],
    asOf: '2026-03-31 (Q1 2026 13F)',
    sources: [
      { label: 'Super Investors — 13F portfolio trackers', url: 'https://super-investor.com/investors' },
      { label: 'Fiscal.ai — superinvestor portfolios', url: 'https://fiscal.ai/super-investors/' },
    ],
  },
];

export function getInvestor(slug: string): Investor | undefined {
  return investors.find((investor) => investor.slug === slug);
}
