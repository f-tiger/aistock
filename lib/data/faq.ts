import type { Localized } from '@/lib/i18n/config';

export type FaqItem = { q: Localized; a: Localized };

/** FAQ shown on /guide and emitted as FAQPage JSON-LD for search rich results. */
export const faq: FaqItem[] = [
  {
    q: { zh: '什么是罗盘共识分(CCS)?', en: 'What is the Compass Consensus Score (CCS)?' },
    a: {
      zh: 'CCS 把 8 位传奇投资人对每只 AI 股票的公开持仓动作,量化为 0–100 的可解释评分:持有人基础分 + 动作分(新建/增持加分,减持/清仓扣分)+ 跨风格共识加成。公式完全公开,每季随 13F 更新。它是教育性分析指标,不预测股价。',
      en: 'CCS quantifies eight legendary investors’ disclosed moves on each AI stock into an explainable 0–100 score: a holders base, an action score (new/added positions add points, trims/exits subtract), and a cross-style bonus. The formula is fully published and refreshes each 13F season. It is an educational analytic, not a price prediction.',
    },
  },
  {
    q: { zh: '13F 是什么?数据多久更新一次?', en: 'What is a 13F, and how often does the data refresh?' },
    a: {
      zh: '13F 是美国大型机构每季度向 SEC 披露美股持仓的报告,截止日为季度结束后 45 天。本站在每个 13F 披露季核对 8 位投资人的最新持仓并更新评分与解读;数据可能滞后,均标注「数据截至」日期。',
      en: 'A 13F is the quarterly SEC filing in which large U.S. institutions disclose their equity holdings, due 45 days after quarter-end. This site verifies the eight investors’ latest filings each season and refreshes scores and analysis; data can lag and every figure carries an as-of date.',
    },
  },
  {
    q: { zh: '这是投资建议吗?', en: 'Is this investment advice?' },
    a: {
      zh: '不是。本站全部内容(含共识分、持仓与逻辑解读)均为教育与信息参考,不构成投资建议,也不构成买卖任何证券的要约。投资有风险,请自行研究并咨询持牌专业人士。',
      en: 'No. Everything on this site — including the Consensus Score, holdings, and analysis — is for education and information only. It is not investment advice or an offer to buy or sell any security. Investing involves risk; do your own research and consult a licensed professional.',
    },
  },
  {
    q: { zh: '为什么英伟达的共识分不高?', en: 'Why isn’t Nvidia’s score higher?' },
    a: {
      zh: '因为大佬们正在分歧:段永平大幅加仓,而 Tepper 与 Coatue 同期减持。CCS 忠实反映动作的净方向——分歧本身就是重要信息,这正是把持仓量化成分数的价值。',
      en: 'Because the legends disagree: Duan Yongping added sharply while Tepper and Coatue trimmed. CCS faithfully reflects the net direction of disclosed actions — the disagreement itself is the signal, which is exactly why quantifying positioning is useful.',
    },
  },
  {
    q: { zh: '网站的数据来源是什么?', en: 'Where does the data come from?' },
    a: {
      zh: '公开来源:SEC 13F 季度披露、投资人公开访谈与主流财经媒体报道。每条数据在站内均附来源链接;可选的实时行情由 Finnhub 提供(有延迟,仅供参考)。',
      en: 'Public sources: quarterly SEC 13F filings, investors’ public interviews, and mainstream financial media. Every figure links to its source on-site; optional live quotes come from Finnhub (delayed, for reference only).',
    },
  },
];
