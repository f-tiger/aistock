import type { Localized } from '@/lib/i18n/config';
import type { Source } from './types';

/** A dated AI-market development. Static, curated, with sources. */
export type MarketUpdate = {
  id: string;
  /** ISO date YYYY-MM-DD. */
  date: string;
  title: Localized;
  summary: Localized;
  /** Related theme ids (see themes.ts). */
  themeIds: string[];
  tickers?: string[];
  sources: Source[];
};

/**
 * Curated timeline of AI-market developments (2026). Static content — a CMS or
 * news API could later feed the same shape via MarketDataProvider.getUpdates().
 */
export const updates: MarketUpdate[] = [
  {
    id: 'memory-bear-market',
    date: '2026-07-17',
    title: { zh: '存储股一周入熊:美光/三星/海力士距高点均超 -20%', en: 'Memory stocks enter a bear market: Micron, Samsung and SK Hynix all down 20%+ from highs' },
    summary: {
      zh: '7/13–17 一周,存储链从"最热交易"变成熊市:SanDisk 周一单日 -12.6%、周四再 -8%,7/17 收 $1354.82(自 6 月峰值 $2000+ 回撤约 -35%);美光 7/17 收 $848.95;美光/三星/海力士及 Roundhill 存储 ETF 距近期高点均超 -20%。刚上市一周的 SK 海力士 ADR(SKHY)从 7/14 杠杆 ETF 上市日 +19% 的冲高一路回落至 $154.03,距 $149 发行价仅 3.4%。触发因素以获利了结为主——此前美光年内一度 +244%、SanDisk +640%,而 TrendForce 预计 3Q26 合约价涨幅收窄至 DRAM +13–18%、NAND +10–15%(前两季为 +90–95%、+58–63%)。',
      en: 'In the week of July 13–17 the memory chain went from hottest trade to bear market: SanDisk fell 12.6% on Monday and another 8% Thursday to close at $1,354.82 on 7/17 (roughly -35% from its $2,000+ June peak); Micron closed at $848.95; Micron, Samsung, SK Hynix and the Roundhill Memory ETF are all 20%+ below recent highs. SKHY — SK Hynix’s ADR, public for just a week — faded from a +19% spike on 7/14 (the day its leveraged ETFs launched) to $154.03, only 3.4% above the $149 IPO price. Profit-taking is the main driver: Micron was up as much as 244% YTD and SanDisk 640%, while TrendForce sees 3Q26 contract-price gains slowing to +13–18% for DRAM and +10–15% for NAND (vs +90–95% and +58–63% the prior two quarters).',
    },
    themeIds: ['memory', 'compute'],
    tickers: ['MU', 'SNDK', 'SKHY', 'WDC'],
    sources: [
      { label: 'Yahoo Finance — Micron, Samsung, SK Hynix drag memory stocks into a bear market', url: 'https://finance.yahoo.com/markets/article/micron-samsung-sk-hynix-just-dragged-memory-stocks-into-a-bear-market-154549356.html' },
      { label: '24/7 Wall St — traders take profits in memory stocks (7/15)', url: 'https://247wallst.com/investing/2026/07/15/sk-hynix-drops-5-sandisk-slides-6-western-digital-slips-4-as-traders-take-profits-in-memory-stocks/' },
      { label: 'TrendForce — 3Q26 memory contract-price outlook (7/3)', url: 'https://www.trendforce.com/presscenter/news/20260703-13134.html' },
      { label: 'stockanalysis.com — SNDK price history', url: 'https://stockanalysis.com/stocks/sndk/' },
    ],
  },
  {
    id: 'wood-buys-ai-dip',
    date: '2026-07-16',
    title: { zh: 'Cathie Wood 越跌越买:大跌中加仓 CoreWeave,ARK 三成仓位押在 5 只 AI 股', en: 'Cathie Wood buys the dip: adding CoreWeave in the sell-off, with 30% of ARK in 5 AI stocks' },
    summary: {
      zh: '当存储与 AI 算力股回调时,ARK 选择加仓:Wood 在 7 月中旬的抛售中继续买入正在下跌的 AI 云算力公司 CoreWeave。最新统计显示 ARK 约 30.4% 的仓位集中在 5 只 AI 股——特斯拉、SpaceX、Alphabet、AMD、亚马逊。在 8 位大佬的谱系里,Wood 依旧是"跌了就加"的最激进多头,与同周 Druckenmiller 系存储新仓的大幅回撤形成鲜明对照(其 Q1 转仓 SNDK/STX/MU,见 7/14 条目)。',
      en: 'As memory and AI-compute names corrected, ARK leaned in: Wood kept buying CoreWeave through the mid-July sell-off. Roughly 30.4% of Ark Invest’s portfolio now sits in five AI stocks — Tesla, SpaceX, Alphabet, AMD and Amazon. Among the eight tracked investors Wood remains the most aggressive buy-the-dip bull, a sharp contrast with the drawdown in Druckenmiller’s new memory positions the same week (he rotated into SNDK/STX/MU in Q1 — see the 7/14 entry).',
    },
    themeIds: ['compute', 'applications'],
    tickers: ['CRWV', 'TSLA', 'GOOGL', 'AMD', 'AMZN'],
    sources: [
      { label: 'The Motley Fool — Cathie Wood is doubling down on this AI stock during the sell-off (7/13)', url: 'https://www.fool.com/investing/2026/07/13/cathie-wood-is-doubling-down-on-this-ai-stock-duri/' },
      { label: 'The Motley Fool — 30% of Cathie Wood’s portfolio in 5 AI stocks (7/16)', url: 'https://www.fool.com/investing/2026/07/16/30-of-cathie-woods-portfolio-is-invested-in-these/' },
    ],
  },
  {
    id: 'berkshire-great-pivot',
    date: '2026-07-15',
    title: { zh: '伯克希尔“世纪换仓”:清仓亚马逊,Alphabet 加仓 225%', en: 'Berkshire’s great pivot: Amazon exited, Alphabet boosted 225%' },
    summary: {
      zh: 'Q1 2026 13F 显示伯克希尔组合从 40 只砍到 26 只、15 项清仓:亚马逊被全部卖出,Alphabet 获加仓 225% 成为最明确的 AI 表态,苹果三季连减后本季不动(仍占 22%)。Abel 接棒后的伯克希尔正把 AI 敞口从电商/云集中到“搜索现金流 + 全栈 AI”。',
      en: 'The Q1 2026 13F shows Berkshire cutting its book from 40 to 26 names with 15 full exits: Amazon sold entirely, Alphabet boosted 225% as its clearest AI statement, and Apple untouched (still 22%) after three quarters of trimming. Under Abel, Berkshire is concentrating AI exposure into search cash flow + full-stack AI.',
    },
    themeIds: ['applications', 'infrastructure'],
    tickers: ['GOOGL', 'AMZN', 'AAPL'],
    sources: [
      { label: 'Seeking Alpha — Tracking Berkshire portfolio Q1 2026', url: 'https://seekingalpha.com/article/4905557-tracking-berkshire-hathaway-portfolio-q1-2026-update' },
      { label: 'Forbes — Berkshire shifts as Abel reshapes the playbook', url: 'https://www.forbes.com/sites/bill_stone/2026/05/16/berkshire-portfolio-shifts-as-abel-reshapes-buffetts-playbook/' },
    ],
  },
  {
    id: 'hedge-funds-memory-rotation',
    date: '2026-07-14',
    title: { zh: '对冲基金转战“存储链”:半导体权重创纪录 10%,SanDisk 领衔 VIP 新贵', en: 'Hedge funds rotate into the memory chain: record 10% semis weight, SanDisk tops new VIP names' },
    summary: {
      zh: 'Goldman 对冲基金 VIP 榜 5 月末调仓:新进榜的人气股一半与 AI 相关,由 SanDisk、Lam Research、应用材料领衔;基金半导体权重升至历史新高约 10%、动量因子暴露达 90 分位。同季 Druckenmiller 清仓 Alphabet 转进 SNDK/STX/MU/AVGO——机构对“卖铲人”的定义正从 GPU 扩展到存储与设备。',
      en: 'Goldman’s Hedge Fund VIP list rebalanced in late May: about half of the biggest popularity gainers are AI-linked, led by SanDisk, Lam Research and Applied Materials; hedge-fund semis weight hit a record ~10% with momentum exposure at the 90th percentile. The same quarter, Druckenmiller exited Alphabet for SNDK/STX/MU/AVGO — institutions are widening “picks and shovels” from GPUs to memory and equipment.',
    },
    themeIds: ['memory', 'compute'],
    tickers: ['SNDK', 'MU', 'LRCX', 'AMAT', 'AVGO'],
    sources: [
      { label: 'Goldman Sachs — Hedge Fund Trend Monitor: All in on AI', url: 'https://www.cfsrating.com/media/uj4jftdo/hedge-fund-trend-monitor_-all-in-on-ai.pdf' },
      { label: 'HedgeFundAlpha — hedge funds pile into AI infrastructure', url: 'https://hedgefundalpha.com/news/hedge-funds-ai-stocks/' },
      { label: 'HeyGoTrade — Druckenmiller dumps GOOGL for storage names', url: 'https://www.heygotrade.com/en/news/billionaire-13f-druckenmiller-tepper-amzn-googl/' },
    ],
  },
  {
    id: 'sovereign-funds-ai-infra',
    date: '2026-07-13',
    title: { zh: '主权基金千亿美元入场:MGX 关账 490 亿美元 AI 基金', en: 'Sovereign wealth pours in: MGX closes a $49B AI fund' },
    summary: {
      zh: '主权基金 2025–26 已承诺约 1200 亿美元投向数据中心、晶圆厂与高性能计算网络;阿布扎比 MGX 于 7 月 1 日关账 490 亿美元 AI 基金,约三成资金用于“造国家队”。对二级市场的含义:AI 基建(电力、设备、存储)的资本开支下限被主权资金抬高,“AI×能源”正合并为同一个基建故事。',
      en: 'Sovereign funds have committed ~$120B across 2025–26 to data centers, fabs and HPC networks; Abu Dhabi’s MGX closed a $49B AI fund on July 1, with roughly 30% of allocations aimed at building national champions. For public markets, sovereign capital raises the capex floor under AI infrastructure (power, equipment, storage) — AI and energy are merging into one infrastructure story.',
    },
    themeIds: ['energy', 'infrastructure', 'memory'],
    tickers: ['GEV', 'TSM'],
    sources: [
      { label: 'Titan Investors — sovereign wealth funds commit $120B to AI buildout', url: 'https://titaninvestors.com/insights/sovereign-wealth-funds-ai-infrastructure-2026' },
      { label: 'Forbes — how sovereign wealth funds are shaping AI', url: 'https://www.forbes.com/sites/kensilverstein/2026/06/14/how-sovereign-wealth-funds-are-shaping-ai-and-global-growth/' },
    ],
  },
  {
    id: 'agentic-ai-enterprise',
    date: '2026-07-12',
    title: { zh: 'AI 智能体成企业软件新前沿:Agentforce ARR 增长约 330%', en: 'AI agents are enterprise software’s new frontier: Agentforce ARR up ~330%' },
    summary: {
      zh: '"智能体"(自主完成多步任务)成 2026 企业软件最热主线:Salesforce 的 Agentforce ARR 同比约 +330%、达约 5.4 亿美元;微软(Copilot/Azure AI Foundry)、谷歌与英伟达是主要敞口。但 CFO 们正收紧 AI 预算,从"无限实验"转向"要 ROI"——将拉开"变现"与"讲故事"的差距。',
      en: 'AI agents (autonomous multi-step task completion) are 2026’s hottest enterprise-software theme: Salesforce’s Agentforce grew ARR ~330% to about $540M; Microsoft (Copilot/Azure AI Foundry), Alphabet, and Nvidia are the main exposures. But CFOs are tightening AI budgets — from open-ended experiments to “show me the ROI” — which will separate monetization from storytelling.',
    },
    themeIds: ['applications', 'compute'],
    tickers: ['NVDA', 'GOOGL'],
    sources: [
      { label: 'US News — Best agentic AI stocks & ETFs to buy in 2026', url: 'https://money.usnews.com/investing/articles/best-agentic-ai-stocks-etfs-to-buy' },
      { label: 'MarketScale — CFOs tighten AI budgets as agentic platforms reshape enterprise AI', url: 'https://www.marketscale.com/industries/software-and-technology/cfos-tighten-ai-budgets-as-agentic-platforms-and-hardware-deals-reshape-enterprise-ai-in-2026' },
    ],
  },
  {
    id: 'ai-power-nuclear-gap',
    date: '2026-07-12',
    title: { zh: 'AI 电力缺口把核电推上风口:数据中心用电冲向全美 12%', en: 'AI’s power gap lifts nuclear: data centers racing toward 12% of U.S. electricity' },
    summary: {
      zh: '数据中心用电占全美比例预计从 2023 年底约 4.4% 升至约 12%;风光间歇性满足不了 AI 基载需求,核电被重新定价。微软、亚马逊、谷歌、Meta 已签核电购电协议,铀价维持约 86 美元/磅;电网互联排队达八年、近半在建 AI 数据中心因输电短缺延期。属典型"二阶"AI 主线。',
      en: 'Data centers are seen rising from ~4.4% of U.S. electricity at end-2023 toward ~12%; solar/wind intermittency can’t meet AI’s baseload need, so nuclear is repriced. Microsoft, Amazon, Google, and Meta have signed nuclear PPAs; uranium holds near $86/lb; grid queues stretch eight years and nearly half of planned AI data centers face transmission delays. A classic second-order AI theme.',
    },
    themeIds: ['energy', 'infrastructure'],
    tickers: ['AMZN', 'GOOGL'],
    sources: [
      { label: 'The Motley Fool — AI is creating a nuclear power renaissance (2026)', url: 'https://www.fool.com/investing/2026/03/16/artificial-intelligence-ai-is-creating-a-nuclear/' },
      { label: 'MarketWise — Best nuclear energy stocks as AI drains the grid', url: 'https://marketwise.com/investing/best-nuclear-energy-stocks/' },
    ],
  },
  {
    id: 'physical-ai-wave',
    date: '2026-07-11',
    title: { zh: '物理 AI 成市场新主线:人形机器人被称 40 万亿美元赛道', en: 'Physical AI is the market’s new theme: humanoids called a $40T arena' },
    summary: {
      zh: '黄仁勋称人形机器人对应约 40 万亿美元市场、是英伟达“AI 之后的第二增长曲线”;英伟达 6 月发布机器人全栈安全系统 Halos;软银孙正义称物理 AI 是下一个万亿美元公司的诞生地。公开市场纯玩家稀缺(Figure、Unitree 等未上市),敞口集中在英伟达、特斯拉、UBTECH、小米、现代与 ETF(KraneShares KOID)。',
      en: 'Jensen Huang calls humanoids a ~$40T market and robotics Nvidia’s second growth curve after AI; Nvidia launched Halos (a full-stack robotics safety system) in June; SoftBank’s Son calls physical AI the next trillion-dollar birthplace. Listed pure-plays are scarce (Figure, Unitree private), with exposure concentrated in Nvidia, Tesla, UBTECH, Xiaomi, Hyundai, and an ETF (KraneShares KOID).',
    },
    themeIds: ['physical-ai', 'compute'],
    tickers: ['NVDA', 'TSLA'],
    sources: [
      { label: '24/7 Wall St. — Huang: humanoid robots a $40T market', url: 'https://247wallst.com/investing/2026/05/31/jensen-huang-just-called-humanoid-robots-a-40-trillion-market-heres-why-wall-street-is-loading-up-on-physical-ai-stocks/' },
      { label: 'CNBC — Humanoid robots touted as next AI investment opportunity', url: 'https://www.cnbc.com/2026/06/03/humanoid-robots-trillion-dollar-ai-market.html' },
    ],
  },
  {
    id: 'tepper-doubles-amazon',
    date: '2026-06-22',
    title: { zh: 'Tepper 减英伟达、加倍亚马逊，押注 AI 变现端', en: 'Tepper trims Nvidia, doubles Amazon — betting on AI monetization' },
    summary: {
      zh: 'Appaloosa 一季度把亚马逊近乎翻倍、推上第一大重仓（看中 AWS 提速），同时减持 Nvidia 与 AMD、加注 Micron。反映“从算力转向 AI 收入兑现端”的轮动。',
      en: 'Appaloosa nearly doubled Amazon into its top position on accelerating AWS, while trimming Nvidia and AMD and adding Micron — a rotation from compute toward where AI revenue lands.',
    },
    themeIds: ['infrastructure', 'compute'],
    tickers: ['AMZN', 'NVDA', 'MU'],
    sources: [
      { label: '24/7 Wall St. — Tepper trimmed Nvidia/AMD, doubled an AI stock', url: 'https://247wallst.com/investing/2026/06/22/david-tepper-trimmed-nvidia-and-amd-but-doubled-down-on-this-ai-stock/' },
    ],
  },
  {
    id: 'laffont-biggest-ai-trade',
    date: '2026-06-23',
    title: { zh: 'Coatue 拉丰解读其最大 AI 交易', en: 'Coatue’s Laffont explains his biggest AI trade' },
    summary: {
      zh: '管理约 227 亿美元的拉丰减持英伟达与 Meta、加注应用龙头（如 Netflix），强调把仓位转向 AI 需求拉动、变现确定性更高的环节。',
      en: 'Running ~$22.7B, Laffont trimmed Nvidia and Meta and added application leaders (e.g., Netflix), shifting toward AI-driven, higher-certainty monetization.',
    },
    themeIds: ['applications', 'compute'],
    tickers: ['NVDA', 'NFLX', 'META'],
    sources: [
      { label: 'CNBC — Laffont explains his biggest AI trade', url: 'https://www.cnbc.com/2026/06/23/top-performing-tech-hedge-fund-manager-philippe-laffont-explains-his-biggest-ai-trade-.html' },
    ],
  },
  {
    id: 'duan-bets-ai',
    date: '2026-05-21',
    title: { zh: '段永平大举押注 AI：加仓英伟达、谷歌，新建 Palantir', en: 'Duan Yongping leans into AI: adds Nvidia & Alphabet, opens Palantir' },
    summary: {
      zh: '段永平一季度把英伟达加成第三大重仓，新建 Palantir、Synopsys、CrowdStrike、Snowflake 等 AI 软件/算力股，同时清掉阿里与 CoreWeave——价值投资者向 AI 渐进倾斜。',
      en: 'In Q1, Duan made Nvidia his #3 position and opened Palantir, Synopsys, CrowdStrike and Snowflake while exiting Alibaba and CoreWeave — a value investor tilting toward AI.',
    },
    themeIds: ['compute', 'applications', 'china-ai'],
    tickers: ['NVDA', 'PLTR', 'PDD'],
    sources: [
      { label: '腾讯新闻 — 段永平 Q1 持仓', url: 'https://news.qq.com/rain/a/20260521A043DX00' },
    ],
  },
  {
    id: 'buffett-wood-amazon',
    date: '2026-04-15',
    title: { zh: '罕见共识：巴菲特与 Cathie Wood 同持亚马逊', en: 'Rare consensus: Buffett and Cathie Wood both own Amazon' },
    summary: {
      zh: '风格迥异的两位大佬都持有亚马逊——把 AI 变现为云收入的“卖铲人 + 应用”双重敞口，成为 AI 板块少见的共识标的。',
      en: 'Two very different investors both hold Amazon — dual “picks-and-shovels + application” exposure that monetizes AI as cloud revenue — a rare consensus name.',
    },
    themeIds: ['infrastructure', 'applications'],
    tickers: ['AMZN'],
    sources: [
      { label: 'Motley Fool — Buffett & Wood both own Amazon', url: 'https://www.fool.com/investing/2025/11/04/cathie-wood-and-warren-buffett-both-own-this-artif/' },
    ],
  },
  {
    id: 'custom-silicon-rising',
    date: '2026-03-20',
    title: { zh: '自研芯片占比上升，挑战 Nvidia 通用 GPU', en: 'Custom silicon share rises, challenging Nvidia’s merchant GPUs' },
    summary: {
      zh: '超大厂自研加速器（Amazon Trainium、Google TPU、Microsoft Maia）份额预计从 2025 年约 21% 升至 2026 年约 28%，长期蚕食通用 GPU 市场。',
      en: 'Hyperscaler custom accelerators (Trainium, TPU, Maia) are projected to rise from ~21% (2025) to ~28% (2026) of the market, eroding merchant GPU share over time.',
    },
    themeIds: ['compute', 'infrastructure'],
    tickers: ['NVDA', 'AMZN', 'GOOGL'],
    sources: [
      { label: 'IO Fund — Nvidia thesis & competitive share', url: 'https://io-fund.com/ai-stocks/nvidia-stock-20-trillion-market-cap-timing' },
    ],
  },
  {
    id: 'blackwell-ramp',
    date: '2026-03-01',
    title: { zh: 'Nvidia Blackwell 放量，2027 年 AI 芯片机会指向万亿美元', en: 'Nvidia Blackwell ramps; AI-chip opportunity points to $1T by 2027' },
    summary: {
      zh: 'Nvidia 估计仍握有 85–92% 的 AI 加速器份额；管理层将 2027 年 AI 芯片收入机会指向至少 1 万亿美元，Blackwell 商用是核心叙事。',
      en: 'Nvidia still holds an estimated 85–92% of AI accelerators; management points the 2027 AI-chip opportunity to at least $1T, with Blackwell’s rollout central to the thesis.',
    },
    themeIds: ['compute'],
    tickers: ['NVDA'],
    sources: [
      { label: 'Intellectia — Nvidia 2026 AI demand outlook', url: 'https://intellectia.ai/blog/nvidia-stock-analysis-2026-ai-demand' },
    ],
  },
  {
    id: 'wood-nuclear-energy',
    date: '2026-02-18',
    title: { zh: 'Cathie Wood 押注核电，布局 AI 的“能源底座”', en: 'Cathie Wood bets on nuclear as AI’s energy base layer' },
    summary: {
      zh: 'ARK 在加仓 AI 算力（CoreWeave、Cerebras）之外，重金投向核电（如 X-Energy），把数据中心电力短缺视为下一个瓶颈与机会。',
      en: 'Beyond AI compute (CoreWeave, Cerebras), ARK invested heavily in nuclear (e.g., X-Energy), framing data-center power scarcity as the next bottleneck and opportunity.',
    },
    themeIds: ['energy', 'infrastructure'],
    tickers: ['CRWV'],
    sources: [
      { label: 'TheStreet — Wood buys Amazon / X-Energy', url: 'https://www.thestreet.com/investing/cathie-wood-buys-another-72m-of-mega-cap-amazon-stock' },
    ],
  },
  {
    id: 'druckenmiller-amzn-googl',
    date: '2026-03-31',
    title: { zh: 'Druckenmiller 连续加仓亚马逊与谷歌，避开最拥挤交易', en: 'Druckenmiller keeps adding Amazon & Alphabet, avoiding the crowded trade' },
    summary: {
      zh: '宏观大师连续两季加仓 AMZN 与 GOOGL，而非 Nvidia 或 Palantir，体现“买变现端而非卖铲端”的轮动思路。',
      en: 'The macro legend added AMZN and GOOGL for two straight quarters rather than Nvidia or Palantir — rotating toward where AI revenue shows up.',
    },
    themeIds: ['applications', 'infrastructure'],
    tickers: ['AMZN', 'GOOGL'],
    sources: [
      { label: 'Motley Fool — Druckenmiller buys AMZN & GOOGL', url: 'https://www.fool.com/investing/2026/03/31/billionaire-stanley-druckenmiller-buys-amzn-googl/' },
    ],
  },
];
