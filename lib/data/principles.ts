import type { Principle } from './types';

/** Long-term investing principles, each with an AI-specific application. */
export const principles: Principle[] = [
  {
    id: 'circle-of-competence',
    title: { zh: '能力圈：只投你真正理解的', en: 'Circle of competence: invest in what you understand' },
    body: {
      zh: '只在你能解释清楚商业模式与竞争格局的领域下注。理解的深度，决定你在波动中能否拿得住。',
      en: 'Only bet where you can explain the business model and competitive landscape. Depth of understanding is what lets you hold through volatility.',
    },
    aiAngle: {
      zh: '面对 AI，先分清你买的是“算力、基建、应用还是能源”——每一层的护城河与风险完全不同。',
      en: 'With AI, first separate compute vs. infrastructure vs. applications vs. energy — each layer has a very different moat and risk profile.',
    },
  },
  {
    id: 'moat',
    title: { zh: '护城河：寻找持久的竞争优势', en: 'Moats: look for durable competitive advantage' },
    body: {
      zh: '可持续的高回报来自难以复制的优势：网络效应、转换成本、规模、专有数据或生态绑定。',
      en: 'Durable high returns come from advantages that are hard to copy: network effects, switching costs, scale, proprietary data, or ecosystem lock-in.',
    },
    aiAngle: {
      zh: '警惕没有护城河的“套壳”应用；优先关注掌握分发渠道、专有数据或全栈能力的公司。',
      en: 'Beware moat-less “wrapper” apps; favor companies that own distribution, proprietary data, or a full-stack position.',
    },
  },
  {
    id: 'valuation',
    title: { zh: '估值纪律：好公司也要好价格', en: 'Valuation discipline: a great company still needs a fair price' },
    body: {
      zh: '为增长支付的价格决定回报。再好的故事，过高的估值也会透支未来多年的收益。',
      en: 'The price you pay for growth determines your return. Even a great story can pre-spend years of future gains if bought too dear.',
    },
    aiAngle: {
      zh: '高估值让 AI 龙头对“增速放缓”极其敏感；留出安全边际，避免在情绪高点 all-in。',
      en: 'Rich valuations make AI leaders acutely sensitive to any slowdown; keep a margin of safety and avoid going all-in at peak euphoria.',
    },
  },
  {
    id: 'time-in-market',
    title: { zh: '长期持有：时间在市场，而非择时', en: 'Time in the market, not timing the market' },
    body: {
      zh: '复利需要时间。频繁择时往往跑输持续持有，并增加交易成本与决策失误。',
      en: 'Compounding needs time. Frequent timing tends to underperform staying invested, while adding costs and decision errors.',
    },
    aiAngle: {
      zh: '若相信 AI 是十年级别的趋势，就按十年的视角下注；用定投平滑入场，而非追涨杀跌。',
      en: 'If you believe AI is a decade-long trend, size positions for a decade; use dollar-cost averaging to smooth entries instead of chasing.',
    },
  },
  {
    id: 'diversify',
    title: { zh: '分散与仓位管理：活下来才能赢', en: 'Diversify & size positions: survive to compound' },
    body: {
      zh: '没有人能确定哪只 AI 标的会胜出。控制单一仓位上限，保证任何一笔失误都不致命。',
      en: 'No one knows which AI name will win. Cap single-position size so no single mistake is fatal.',
    },
    aiAngle: {
      zh: '用“核心 + 卫星”：核心配宽基或平台龙头，卫星小仓位博弈高弹性主题。',
      en: 'Use a core-plus-satellite approach: core in broad index or platform leaders, small satellites for high-beta themes.',
    },
  },
  {
    id: 'ignore-noise',
    title: { zh: '忽略噪音：与情绪保持距离', en: 'Ignore the noise: keep distance from emotion' },
    body: {
      zh: '市场每天制造大量噪音。把注意力放在企业基本面与长期论点是否成立，而非每日价格。',
      en: 'Markets generate endless noise. Focus on whether the business fundamentals and long-term thesis still hold — not the daily price.',
    },
    aiAngle: {
      zh: 'AI 板块波动剧烈、叙事多变；设定好规则与检查清单，避免被 FOMO 或恐慌驱动。',
      en: 'AI is volatile and narrative-driven; predefine rules and a checklist so FOMO or panic does not drive your decisions.',
    },
  },
];
