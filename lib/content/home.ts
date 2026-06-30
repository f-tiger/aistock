import type { Locale } from '@/lib/i18n/config';

/** Page-level copy for the home hero and section intros. */
export const homeCopy = {
  heroTitle: {
    zh: '看懂 AI 行情，像传奇投资人一样做长期投资',
    en: 'Understand the AI market — and invest for the long run, like the greats',
  },
  heroSubtitle: {
    zh: '我们把三件事整合到一处：AI 板块的细分赛道与趋势、巴菲特 / Cathie Wood / Druckenmiller 等大佬的 AI 布局与逻辑、以及可执行的长期投资原则。不做交易信号，只做有出处、强调长期的投资教育。',
    en: 'Three things in one place: AI sub-sectors and trends, how Buffett / Cathie Wood / Druckenmiller are positioned in AI and why, and actionable long-term principles. No trading signals — just sourced, long-term-minded investing education.',
  },
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
} satisfies Record<string, Record<Locale, string>>;
