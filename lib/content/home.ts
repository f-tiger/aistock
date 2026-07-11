import type { Locale } from '@/lib/i18n/config';

/** Page-level copy for the home hero and section intros. */
export const homeCopy = {
  heroTitle: {
    zh: '8 位传奇投资人的 AI 持仓,一个分数看懂共识与分歧',
    en: 'Eight legendary investors’ AI bets — one score for consensus vs. divergence',
  },
  heroSubtitle: {
    zh: '「罗盘共识分」把巴菲特、段永平、Cathie Wood 等 8 位大佬的公开持仓动作量化成每只 AI 股票的 0–100 评分,方法论完全公开、每季随 13F 更新。配套赛道地图、个股档案与长期投资框架——有出处、可追溯,不做黑箱信号。',
    en: 'The Compass Consensus Score turns the disclosed moves of Buffett, Duan Yongping, Cathie Wood and five more legends into a 0–100 score per AI stock — fully published methodology, refreshed every 13F season. With theme maps, stock profiles, and a long-term framework. Sourced and traceable, never a black box.',
  },
  stats: [
    { value: { zh: '8 位', en: '8' }, label: { zh: '传奇投资人', en: 'Legendary investors' } },
    { value: { zh: '12+', en: '12+' }, label: { zh: 'AI 标的评分', en: 'AI stocks scored' } },
    { value: { zh: '5 大', en: '5' }, label: { zh: '细分赛道', en: 'Sub-sectors' } },
    { value: { zh: '每季', en: 'Quarterly' }, label: { zh: '13F 更新', en: '13F refresh' } },
  ],
  snapshotIntro: {
    zh: '从“卖铲人”到能源底座，AI 板块可拆成四个清晰的环节。先分清你买的是哪一层。',
    en: 'From picks-and-shovels to the energy base layer, the AI market splits into four clear layers. Know which one you are buying.',
  },
  investorsIntro: {
    zh: '与其追逐概念，不如看清真正的长期主义者如何在 AI 中分配资本。',
    en: 'Rather than chase the theme, see how genuine long-term investors allocate capital across AI.',
  },
  longTermIntro: {
    zh: 'AI 会涨会跌，但长期投资的原则不变。把纪律装进检查清单。',
    en: 'AI will swing, but the principles of long-term investing do not. Put discipline into a checklist.',
  },
} satisfies Record<string, Record<Locale, string> | { value: Record<Locale, string>; label: Record<Locale, string> }[]>;
