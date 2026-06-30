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
    stance: 'cautious',
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
    stance: 'bull',
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
    stance: 'cautious',
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
    stance: 'bull',
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
  {
    slug: 'duan-yongping',
    name: { zh: '段永平', en: 'Duan Yongping' },
    firm: { zh: 'H&H International Investment', en: 'H&H International Investment' },
    style: { zh: '价值投资 / 本分（中国巴菲特）', en: 'Value investing (“China’s Buffett”)' },
    horizon: { zh: '超长期', en: 'Very long-term' },
    stance: 'cautious',
    summary: {
      zh: '以苹果与伯克希尔为压舱石的价值投资者，2026 年起明显“押注 AI”：大幅加仓英伟达、谷歌，并新建 Palantir、Synopsys 等 AI 软件股；同时重仓拼多多。对华语读者尤具参考性。',
      en: 'A value investor anchored in Apple and Berkshire who clearly leaned into AI from 2026 — sharply adding Nvidia and Alphabet and opening Palantir, Synopsys and other AI names, while holding a large PDD stake. Especially relevant for Chinese readers.',
    },
    thesis: [
      {
        zh: '段永平强调“本分”与能力圈：长期重仓自己彻底理解的苹果、伯克希尔，极少频繁交易。',
        en: 'Duan emphasizes staying within his competence: he holds Apple and Berkshire for the long run and rarely trades.',
      },
      {
        zh: '2026 一季度他把英伟达加成第三大重仓（约 12%），并新建 Palantir、Synopsys、CrowdStrike、Snowflake 等 AI 软件/算力股——从纯价值向 AI 渐进倾斜，同时清掉了阿里与 CoreWeave。',
        en: 'In Q1 2026 he made Nvidia his #3 position (~12%) and opened Palantir, Synopsys, CrowdStrike and Snowflake — a gradual tilt from pure value toward AI — while exiting Alibaba and CoreWeave.',
      },
      {
        zh: '他对苹果的表态值得注意：“很成熟、依然会增长，但股价不便宜了”——典型的估值纪律。',
        en: 'His note on Apple — “mature, still growing, but no longer cheap” — captures his valuation discipline.',
      },
    ],
    holdings: [
      { ticker: 'AAPL', name: { zh: '苹果', en: 'Apple' }, note: { zh: '第一大重仓（小幅减持）', en: '#1 holding (slightly trimmed)' } },
      { ticker: 'BRK.B', name: { zh: '伯克希尔 B', en: 'Berkshire B' }, note: { zh: '增持，第二大重仓', en: 'Added — #2 holding' } },
      { ticker: 'NVDA', name: { zh: '英伟达', en: 'Nvidia' }, note: { zh: '大幅加仓至第三大重仓', en: 'Sharply added to #3' } },
      { ticker: 'PDD', name: { zh: '拼多多', en: 'PDD Holdings' }, note: { zh: '加仓，第四大重仓', en: 'Added — #4 holding' } },
      { ticker: 'PLTR', name: { zh: 'Palantir', en: 'Palantir' }, note: { zh: '新建仓（AI 软件）', en: 'New position (AI software)' } },
    ],
    themeIds: ['compute', 'china-ai', 'applications'],
    asOf: '2026-03-31 (Q1 2026 13F)',
    sources: [
      { label: '腾讯新闻 — 段永平 Q1 持仓：加仓英伟达、谷歌、拼多多', url: 'https://news.qq.com/rain/a/20260521A043DX00' },
      { label: '21 经济网 — 巴菲特减持苹果，段永平大举押注 AI', url: 'https://www.21jingji.com/article/20260218/herald/a14b281c02621704764f11665adad126.html' },
      { label: '新浪财经 — 段永平 1380 亿元持仓曝光', url: 'https://finance.sina.com.cn/roll/2026-05-20/doc-inhypaen2711821.shtml' },
    ],
  },
  {
    slug: 'david-tepper',
    name: { zh: '大卫·泰珀', en: 'David Tepper' },
    firm: { zh: 'Appaloosa Management', en: 'Appaloosa Management' },
    style: { zh: '宏观 / 困境与周期', en: 'Macro / distressed & cyclical' },
    horizon: { zh: '中长期，灵活调仓', en: 'Medium-to-long, actively rotated' },
    stance: 'bull',
    summary: {
      zh: '2026 一季度把亚马逊近乎翻倍、推上第一大重仓（AI 角度=AWS 提速），同时减持英伟达与 AMD、加注 Micron——“押注 AI 变现端与内存周期，而非纯算力”。',
      en: 'In Q1 2026 he nearly doubled Amazon into his #1 position (AI angle = accelerating AWS), while trimming Nvidia and AMD and leaning into Micron — “betting on AI monetization and the memory cycle, not pure compute.”',
    },
    thesis: [
      {
        zh: 'Tepper 以逆向与周期嗅觉著称；他的 AI 配置正从芯片转向“AI 收入真正兑现”的地方。',
        en: 'Known for contrarian, cyclical instincts, Tepper is rotating his AI exposure from chips toward where AI revenue actually lands.',
      },
      {
        zh: '亚马逊成为最大仓位（约 15%），因 AWS 一季度同比增长 28%、为 15 个季度最快，且利润率高。',
        en: 'Amazon became his largest position (~15%) as AWS grew 28% YoY in Q1 — its fastest in 15 quarters — at a high margin.',
      },
      {
        zh: '他减持 Nvidia（约 13%）与 AMD（约 32%），并配置 Micron 押注 HBM 内存紧缺与中概（含阿里）。',
        en: 'He trimmed Nvidia (~13%) and AMD (~32%), added Micron on the HBM shortage, and keeps China tech (incl. Alibaba) exposure.',
      },
    ],
    holdings: [
      { ticker: 'AMZN', name: { zh: '亚马逊', en: 'Amazon' }, note: { zh: '近乎翻倍，第一大重仓', en: 'Nearly doubled — #1 holding' } },
      { ticker: 'MU', name: { zh: '美光科技', en: 'Micron' }, note: { zh: '押注 HBM 内存周期', en: 'Bet on the HBM memory cycle' } },
      { ticker: 'GOOGL', name: { zh: '谷歌', en: 'Alphabet' }, note: { zh: '核心 AI 平台仓位', en: 'Core AI-platform position' } },
      { ticker: 'TSM', name: { zh: '台积电', en: 'TSMC' }, note: { zh: 'AI 制程受益者', en: 'AI foundry beneficiary' } },
      { ticker: 'NVDA', name: { zh: '英伟达', en: 'Nvidia' }, note: { zh: '减持约 13%', en: 'Trimmed ~13%' } },
    ],
    themeIds: ['infrastructure', 'compute', 'china-ai'],
    asOf: '2026-03-31 (Q1 2026 13F)',
    sources: [
      { label: 'Seeking Alpha — Tepper Appaloosa Q1 2026 update', url: 'https://seekingalpha.com/article/4908974-tracking-david-teppers-appaloosa-management-portfolio-q1-2026-update' },
      { label: '24/7 Wall St. — Tepper trimmed Nvidia/AMD, doubled an AI stock', url: 'https://247wallst.com/investing/2026/06/22/david-tepper-trimmed-nvidia-and-amd-but-doubled-down-on-this-ai-stock/' },
    ],
  },
  {
    slug: 'philippe-laffont',
    name: { zh: '菲利普·拉丰', en: 'Philippe Laffont' },
    firm: { zh: 'Coatue Management', en: 'Coatue Management' },
    style: { zh: '科技成长 / 趋势', en: 'Tech growth / trend' },
    horizon: { zh: '中长期成长', en: 'Medium-to-long growth' },
    stance: 'cautious',
    summary: {
      zh: '管理约 227 亿美元的科技成长大佬，前十大持仓几乎全为 AI 相关；近期减持英伟达与 Meta、加注 Netflix 等“AI 受益的应用龙头”，体现从硬件向应用/平台的轮动。',
      en: 'A tech-growth heavyweight running ~$22.7B whose top-10 holdings are nearly all AI-influenced. He recently trimmed Nvidia and Meta and added names like Netflix — rotating from hardware toward AI-benefiting application leaders.',
    },
    thesis: [
      {
        zh: 'Laffont 长期专注大型科技成长股与 AI 主线，是“顺势押注赢家”的代表。',
        en: 'Laffont has long focused on large-cap tech growth and the AI mega-trend, a representative of backing the winners.',
      },
      {
        zh: '他卖出部分英伟达、清掉 CoreWeave，并把仓位转向受 AI 需求拉动、变现确定性更高的应用与平台。',
        en: 'He sold down Nvidia, exited CoreWeave, and shifted toward applications and platforms with AI-driven demand and clearer monetization.',
      },
    ],
    holdings: [
      { ticker: 'NFLX', name: { zh: '奈飞', en: 'Netflix' }, note: { zh: '大幅加仓（+76%）', en: 'Sharply added (+76%)' } },
      { ticker: 'META', name: { zh: 'Meta', en: 'Meta' }, note: { zh: '部分减持', en: 'Partly trimmed' } },
      { ticker: 'NVDA', name: { zh: '英伟达', en: 'Nvidia' }, note: { zh: '减持', en: 'Trimmed' } },
      { ticker: 'AMZN', name: { zh: '亚马逊', en: 'Amazon' }, note: { zh: 'AI 受益的核心成长股', en: 'Core AI-benefiting growth' } },
    ],
    themeIds: ['applications', 'compute'],
    asOf: '2026 (public reporting)',
    sources: [
      { label: 'Motley Fool — Laffont’s new No.1 AI stock after selling Nvidia/Meta', url: 'https://www.fool.com/investing/2026/02/24/billionaire-philippe-laffont-has-new-no-1-ai-stock/' },
      { label: 'CNBC — Laffont explains his biggest AI trade', url: 'https://www.cnbc.com/2026/06/23/top-performing-tech-hedge-fund-manager-philippe-laffont-explains-his-biggest-ai-trade-.html' },
    ],
  },
  {
    slug: 'michael-burry',
    name: { zh: '迈克尔·伯里', en: 'Michael Burry' },
    firm: { zh: 'Scion Asset Management', en: 'Scion Asset Management' },
    style: { zh: '逆向 / 深度价值（空头）', en: 'Contrarian / deep value (short)' },
    horizon: { zh: '机会主义，灵活', en: 'Opportunistic, flexible' },
    stance: 'bear',
    summary: {
      zh: '《大空头》原型，以逆向与泡沫怀疑著称。作为本站的“反方视角”：提醒 AI 板块高估值、叙事拥挤与周期风险——并非看空 AI 技术本身，而是警惕为增长支付的价格。',
      en: 'The “Big Short” investor, famed for contrarian, bubble-skeptical bets. Featured here as the counterweight: a reminder of AI’s rich valuations, crowded narrative, and cycle risk — skeptical of the price paid for growth, not of AI the technology.',
    },
    thesis: [
      {
        zh: '收录 Burry 是为了平衡多头叙事：再强的趋势，估值与情绪也会周期性反转。',
        en: 'Burry is included to balance the bull narrative: even powerful trends see valuation and sentiment mean-revert.',
      },
      {
        zh: '他的历史教训——2000 与 2008——提醒投资者区分“伟大的技术”与“伟大的股票价格”，并保留安全边际。',
        en: 'His track record — 2000 and 2008 — reminds investors to separate “great technology” from “a great price”, and to keep a margin of safety.',
      },
      {
        zh: '注：Burry 仓位变动频繁且常含期权/对冲，13F 仅为快照；本页观点为长期教育性提示，非其实时持仓建议。',
        en: 'Note: Burry trades frequently and often via options/hedges; 13F is only a snapshot. This page is a long-term educational caution, not his live positioning.',
      },
    ],
    holdings: [
      { ticker: '—', name: { zh: '常以对冲/空头表达观点', en: 'Often expressed via hedges/shorts' }, note: { zh: '仓位多变，强调风险与估值', en: 'Positions shift; emphasizes risk and valuation' } },
    ],
    themeIds: ['compute', 'applications'],
    asOf: '2026 (general stance)',
    sources: [
      { label: 'Motley Fool — billionaires sold Nvidia ahead of earnings', url: 'https://www.fool.com/investing/2026/02/23/4-billionaires-sold-nvidia-ahead-earnings-wall-st/' },
    ],
  },
];

export function getInvestor(slug: string): Investor | undefined {
  return investors.find((investor) => investor.slug === slug);
}
