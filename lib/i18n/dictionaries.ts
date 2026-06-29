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
    market: { zh: 'AI 行情', en: 'AI Market' },
    investors: { zh: '传奇人物', en: 'Investors' },
    longTerm: { zh: '长期投资', en: 'Long-Term' },
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
