import type { Localized } from '@/lib/i18n/config';

/** A cited external source. */
export type Source = {
  label: string;
  url: string;
};

/** A holding tied to a theme, with a short rationale. */
export type Holding = {
  ticker: string;
  name: Localized;
  note: Localized;
};

/** A legendary investor and their AI-related positioning. */
export type Investor = {
  slug: string;
  name: Localized;
  firm: Localized;
  style: Localized;
  horizon: Localized;
  /** One-line summary shown on cards. */
  summary: Localized;
  /** Longer narrative of their AI thesis. */
  thesis: Localized[];
  holdings: Holding[];
  themeIds: string[];
  asOf: string;
  sources: Source[];
};

/** A single AI stock with a compact bull/risk view. */
export type AiStock = {
  ticker: string;
  name: Localized;
  role: Localized;
  bull: Localized;
  risk: Localized;
};

/** An AI sub-sector / investable theme. */
export type AiTheme = {
  id: string;
  name: Localized;
  summary: Localized;
  bullCase: Localized[];
  risks: Localized[];
  stocks: AiStock[];
  asOf: string;
  sources: Source[];
};

/** A long-term investing principle. */
export type Principle = {
  id: string;
  title: Localized;
  body: Localized;
  /** A concrete way to apply it to AI investing. */
  aiAngle: Localized;
};
