import type { Locale, Localized } from './config';

/** UI chrome strings (navigation, buttons, labels, disclaimer). */
const dict = {
  brand: { zh: 'AI 投资罗盘', en: 'AI Investing Compass' },
  tagline: {
    zh: 'AI 行情 · 传奇投资人 · 长期主义',
    en: 'AI Trends · Legendary Investors · Long-Term Thinking',
  },
  nav: {
    home: { zh: '首页', en: 'Home' },
    guide: { zh: '入门指南', en: 'Start Here' },
    market: { zh: 'AI 行情', en: 'AI Market' },
    investors: { zh: '传奇人物', en: 'Investors' },
    stocks: { zh: '个股', en: 'Stocks' },
    longTerm: { zh: '长期投资', en: 'Long-Term' },
    consensus: { zh: '持仓共识', en: 'Consensus' },
    news: { zh: '行情动态', en: 'Updates' },
    glossary: { zh: '术语表', en: 'Glossary' },
    methodology: { zh: '方法与竞品', en: 'Method & Rivals' },
  },
  cta: {
    explore: { zh: '浏览 AI 行情', en: 'Explore AI Market' },
    seeInvestors: { zh: '看大佬怎么投', en: 'See How the Greats Invest' },
    learnMore: { zh: '了解更多', en: 'Learn more' },
    readThesis: { zh: '阅读逻辑', en: 'Read the thesis' },
    viewProfile: { zh: '查看持仓与逻辑', en: 'View holdings & thesis' },
    back: { zh: '返回', en: 'Back' },
    source: { zh: '来源', en: 'Source' },
    sources: { zh: '资料来源', en: 'Sources' },
  },
  labels: {
    asOf: { zh: '数据截至', en: 'As of' },
    keyHoldings: { zh: 'AI 相关持仓', en: 'AI-related holdings' },
    thesis: { zh: '投资逻辑', en: 'Investment thesis' },
    style: { zh: '风格', en: 'Style' },
    horizon: { zh: '周期', en: 'Horizon' },
    tickers: { zh: '代表标的', en: 'Key tickers' },
    bullCase: { zh: '多头逻辑', en: 'Bull case' },
    risks: { zh: '主要风险', en: 'Key risks' },
    checklist: { zh: '长期投资检查清单', en: 'Long-term checklist' },
    featuredInvestors: { zh: '精选传奇投资人', en: 'Featured legendary investors' },
    marketSnapshot: { zh: 'AI 行情速览', en: 'AI market snapshot' },
    themes: { zh: 'AI 细分赛道', en: 'AI sub-sectors' },
    relatedThemes: { zh: '相关赛道', en: 'Related themes' },
    latestUpdates: { zh: '最新动态', en: 'Latest updates' },
    consensusHoldings: { zh: '共识持仓', en: 'Consensus holdings' },
    divergence: { zh: '分歧标的', en: 'Where they disagree' },
    holdingsMatrix: { zh: '持仓矩阵', en: 'Holdings matrix' },
    heldBy: { zh: '持有人', en: 'Held by' },
    holders: { zh: '位投资人', en: 'investors' },
    livePrice: { zh: '实时价', en: 'Live' },
    priceDelayed: { zh: '行情延迟，仅供参考', en: 'Quotes delayed; for reference only' },
    stance: { zh: '立场', en: 'Stance' },
    searchInvestors: { zh: '搜索投资人 / 机构…', en: 'Search investors / firm…' },
    searchStocks: { zh: '搜索代码 / 名称…', en: 'Search ticker / name…' },
    filterTheme: { zh: '赛道', en: 'Theme' },
    filterStance: { zh: '立场', en: 'Stance' },
    all: { zh: '全部', en: 'All' },
    noResults: { zh: '没有匹配的结果。', en: 'No matching results.' },
    illustrativeTrend: { zh: '示意走势（非真实历史）', en: 'Illustrative trend (not real history)' },
    inThemes: { zh: '所属赛道', en: 'In themes' },
    heldByInvestors: { zh: '持有该股的投资人', en: 'Investors holding this stock' },
    noHolders: { zh: '本站收录投资人中暂无持有。', en: 'None of the featured investors hold this — per our set.' },
    allStocks: { zh: '全部个股', en: 'All stocks' },
    viewStock: { zh: '查看个股', en: 'View stock' },
  },
  stance: {
    bull: { zh: '看多', en: 'Bullish' },
    cautious: { zh: '谨慎', en: 'Cautious' },
    bear: { zh: '看空', en: 'Bearish' },
  },
  newsletter: {
    title: { zh: '订阅季度 13F 更新', en: 'Get quarterly 13F updates' },
    desc: {
      zh: '每季度大佬持仓变化 + AI 板块要点,一封邮件讲清楚。免费,随时退订。',
      en: 'Each quarter: how the legends moved + what mattered in AI, in one email. Free, unsubscribe anytime.',
    },
    placeholder: { zh: '你的邮箱', en: 'Your email' },
    button: { zh: '订阅', en: 'Subscribe' },
    submitting: { zh: '提交中…', en: 'Submitting…' },
    success: { zh: '订阅成功!下次 13F 更新时见。', en: 'Subscribed! See you at the next 13F update.' },
    invalid: { zh: '请输入有效的邮箱地址。', en: 'Please enter a valid email address.' },
    error: { zh: '暂时无法订阅,请稍后再试。', en: 'Subscription is unavailable right now — please try again later.' },
  },
  broker: {
    title: { zh: '想持有大佬同款股票?', en: 'Want to own what the legends own?' },
    desc: {
      zh: '研究清楚之后,你需要一个能交易美股的券商账户。以下是常见选择:',
      en: 'Once you’ve done the research, you’ll need a brokerage account for U.S. stocks. Common choices:',
    },
    cta: { zh: '了解开户', en: 'Learn more' },
    disclosure: {
      zh: '本区域含推广链接,若你经由链接开户,本站可能获得返佣;这不影响内容独立性,也不构成投资建议。',
      en: 'This section contains referral links; we may earn a commission if you open an account through them. This does not affect our content and is not investment advice.',
    },
  },
  disclaimer: {
    short: {
      zh: '仅供教育与信息参考，不构成投资建议。',
      en: 'For education and information only. Not investment advice.',
    },
    long: {
      zh: '本网站所有内容（包括 AI 行情、传奇投资人持仓与投资逻辑、长期投资原则）均为教育与信息参考，不构成任何投资、法律或税务建议，也不构成买卖任何证券的要约或邀约。持仓与数据来自公开来源（如 SEC 13F 季度披露与公开报道），可能滞后或不完整，并标注「数据截至」日期。过往业绩不代表未来表现。投资有风险，决策请自行研究并咨询持牌专业人士。',
      en: 'All content on this site (AI market trends, investors’ holdings and theses, long-term principles) is for education and information only. It is not investment, legal, or tax advice, nor an offer or solicitation to buy or sell any security. Holdings and figures come from public sources (e.g., quarterly SEC 13F filings and public reporting), may be delayed or incomplete, and are labeled with an “as of” date. Past performance does not guarantee future results. Investing involves risk; do your own research and consult a licensed professional.',
    },
  },
} satisfies Record<string, unknown>;

export type Dict = typeof dict;

/** Convenience accessor: resolves a Localized leaf for the active locale. */
export function tr(value: Localized, locale: Locale): string {
  return value[locale];
}

export default dict;
