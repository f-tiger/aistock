import type { Localized } from '@/lib/i18n/config';

/** A cited external source. */
export type Source = {
  label: string;
  url: string;
};

/** The most recent disclosed action on a holding (feeds the Consensus Score). */
export type HoldingAction = 'new' | 'add' | 'hold' | 'trim' | 'exit';

/** A holding tied to a theme, with a short rationale. */
export type Holding = {
  ticker: string;
  name: Localized;
  note: Localized;
  /** Latest disclosed action; defaults to 'hold' when omitted. */
  action?: HoldingAction;
};

/** An investor's overall stance toward the AI trade. */
export type Stance = 'bull' | 'cautious' | 'bear';

/** A legendary investor and their AI-related positioning. */
export type Investor = {
  slug: string;
  name: Localized;
  firm: Localized;
  style: Localized;
  horizon: Localized;
  /** Overall posture toward AI — drives a small badge. Defaults to bull. */
  stance?: Stance;
  /** Broad style bucket; cross-style consensus earns a score bonus. */
  styleTag?: 'value' | 'growth' | 'macro' | 'contrarian';
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
