import type { Localized } from '@/lib/i18n/config';
import type { Source } from './types';

export type CompetitorCategory = {
  category: Localized;
  examples: string[];
  gap: Localized;
  sources: Source[];
};

/** Competitive landscape uncovered during research — also shown on /methodology. */
export const competitorCategories: CompetitorCategory[] = [
  {
    category: { zh: 'AI 选股 / 研究工具', en: 'AI stock pickers / research tools' },
    examples: ['Prospero.ai', 'TrendSpider', 'AltIndex', 'Trade Ideas', 'Gainify', 'Fiscal.ai'],
    gap: {
      zh: '多为黑箱 AI 打分与偏短线信号，强调“买什么”，几乎不解释“为什么”，也缺乏长期投资教育。',
      en: 'Mostly black-box AI scores and short-term signals — they tell you “what to buy” but rarely “why”, with little long-term education.',
    },
    sources: [
      { label: 'Prospero — best AI stock pickers 2026', url: 'https://www.prospero.ai/resources-blog/the-10-best-ai-stock-pickers-in-2026-tools-that-actually-beat-the-market' },
      { label: 'Monday — best AI for investing 2026', url: 'https://monday.com/blog/ai-agents/best-ai-for-investing/' },
    ],
  },
  {
    category: { zh: '大佬持仓 / 13F 追踪', en: 'Superinvestor / 13F trackers' },
    examples: ['HedgeFollow', 'Stockcircle', 'super-investor.com', 'TIKR', 'InvestorLens', 'MarketWise'],
    gap: {
      zh: '罗列投资人的全部持仓，但不围绕“AI 主题”聚焦，也很少解读每笔布局背后的投资逻辑。',
      en: 'They list an investor’s entire portfolio, but are not organized around the AI theme and rarely explain the reasoning behind each position.',
    },
    sources: [
      { label: 'HedgeFollow — 13F tracker', url: 'https://hedgefollow.com/' },
      { label: 'Super Investors — 25+ legends', url: 'https://super-investor.com/investors' },
      { label: 'Fiscal.ai — superinvestor portfolios', url: 'https://fiscal.ai/super-investors/' },
    ],
  },
  {
    category: { zh: '中文综合炒股 App', en: 'Chinese all-in-one trading apps' },
    examples: ['同花顺', '东方财富', '雪球', '新浪财经', '富途牛牛'],
    gap: {
      zh: '大而全的交易/行情平台，AI 助手偏公告播报与选股；不是“AI 主题 + 传奇投资人 + 长期教育”的聚焦内容中枢。',
      en: 'Large all-in-one trading/quote platforms whose AI assistants focus on news read-outs and screening — not a focused “AI theme + legendary investors + long-term education” hub.',
    },
    sources: [
      { label: 'Eastmoney — 同花顺 vs 雪球 AI 评测', url: 'https://caifuhao.eastmoney.com/news/20260417164439259767630' },
      { label: 'Sina Finance — 2026 AI 炒股软件', url: 'https://finance.sina.com.cn/stock/aigcy/2025-11-20/doc-infxzrax2773121.shtml' },
    ],
  },
  {
    category: { zh: '内容 / 资讯网站', en: 'Content / media sites' },
    examples: ['Motley Fool', 'SoFi', 'BlackRock'],
    gap: {
      zh: '关于 AI 股票的文章丰富但零散，没有结构化、可持续追踪的“主题中枢”，更不是双语。',
      en: 'Rich but scattered articles on AI stocks — no structured, continuously-tracked “theme hub”, and not bilingual.',
    },
    sources: [
      { label: 'Motley Fool — best AI stocks 2026', url: 'https://www.fool.com/investing/stock-market/market-sectors/information-technology/ai-stocks/' },
      { label: 'BlackRock — AI stocks & 2026 playbook', url: 'https://www.blackrock.com/us/financial-professionals/insights/ai-stocks-alternatives-and-the-new-market-playbook-for-2026' },
    ],
  },
];

/** Our differentiation vs. the landscape above. */
export const differentiation: Localized[] = [
  {
    zh: '聚焦整合：把 ①AI 行情赛道 + ②传奇投资人的 AI 布局与逻辑 + ③长期投资教育 三者放进同一个结构化中枢——这是现有竞品都没有做的组合。',
    en: 'Focused integration: ①AI market layers + ②legends’ AI positioning and reasoning + ③long-term education in one structured hub — a combination none of the incumbents offer.',
  },
  {
    zh: '强调“为什么”而非交易信号：每个观点都附投资逻辑与公开来源，不做黑箱预测。',
    en: 'Explains the “why”, not trading signals: every view comes with reasoning and public sources, with no black-box predictions.',
  },
  {
    zh: '中英双语 + 长期视角：服务中文与全球读者，并把长期投资纪律装进可执行的检查清单。',
    en: 'Bilingual and long-term by design: serves Chinese and global readers, turning long-term discipline into an actionable checklist.',
  },
  {
    zh: '合规优先：全站标注“数据截至”日期与免责声明，明确为教育而非投资建议。',
    en: 'Compliance-first: every figure is dated with an “as of” label and disclaimer — clearly education, not advice.',
  },
];
