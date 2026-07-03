import type { Localized } from '@/lib/i18n/config';

export type Broker = {
  id: string;
  name: Localized;
  blurb: Localized;
  /**
   * Destination URL. ⚠️ MONETIZATION: replace these with your affiliate /
   * referral links once you join each broker's program — that single edit
   * turns every BrokerCTA on the site into a revenue channel.
   */
  url: string;
};

/** Brokers surfaced in the conversion CTA. Ordered by relevance to our audience. */
export const brokers: Broker[] = [
  {
    id: 'futu',
    name: { zh: '富途 moomoo', en: 'moomoo (Futu)' },
    blurb: {
      zh: '华语用户常用的美股/港股券商,行情与社区一体。',
      en: 'Popular with Chinese-speaking investors for U.S./HK stocks; quotes and community built in.',
    },
    url: 'https://www.moomoo.com/',
  },
  {
    id: 'tiger',
    name: { zh: '老虎国际 Tiger', en: 'Tiger Brokers' },
    blurb: {
      zh: '面向全球华人的美港股券商,开户流程较友好。',
      en: 'U.S./HK brokerage for overseas Chinese investors with a friendly onboarding flow.',
    },
    url: 'https://www.itigerup.com/',
  },
  {
    id: 'ibkr',
    name: { zh: '盈透 IBKR', en: 'Interactive Brokers' },
    blurb: {
      zh: '老牌全球券商,费率低、市场覆盖广,适合长期投资者。',
      en: 'The veteran global brokerage: low fees, broad market access, suited to long-term investors.',
    },
    url: 'https://www.interactivebrokers.com/',
  },
];
