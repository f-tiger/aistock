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
