import type { Localized } from '@/lib/i18n/config';
import type { HoldingAction, Investor } from './types';
import { investors } from './investors';

/**
 * 罗盘共识分 · Compass Consensus Score (CCS)
 *
 * The site's proprietary, fully transparent methodology: it turns the tracked
 * legends' disclosed positioning into a 0–100 per-stock score. The formula is
 * published on /methodology — the moat is not secrecy but the accumulating
 * quarter-by-quarter history and the curated action data behind it.
 *
 *   CCS = holdersScore + actionScore + diversityBonus   (clamped 0–100)
 *
 *   holdersScore   = 12 per holder, capped at 48
 *   actionScore    = Σ action points, clamped to [-20, +40]
 *                    new +12 · add +10 · hold +4 · trim −8 · exit −12
 *   diversityBonus = +12 when holders span ≥3 style buckets (value/growth/macro)
 *                    — cross-style consensus is a stronger signal than one
 *                    school of thought agreeing with itself.
 *
 * Educational analytics derived from public filings — not investment advice.
 */

export const ACTION_POINTS: Record<HoldingAction, number> = {
  new: 12,
  add: 10,
  hold: 4,
  trim: -8,
  exit: -12,
};

export type ScoreContribution = {
  slug: string;
  investor: Localized;
  action: HoldingAction;
  points: number;
  note: Localized;
};

export type StockScore = {
  ticker: string;
  name: Localized;
  score: number;
  holders: number;
  holdersScore: number;
  actionScore: number;
  diversityBonus: number;
  styles: string[];
  contributions: ScoreContribution[];
};

export type ScoreBand = 'strong' | 'consensus' | 'split' | 'weak';

export function scoreBand(score: number): ScoreBand {
  if (score >= 80) return 'strong';
  if (score >= 60) return 'consensus';
  if (score >= 40) return 'split';
  return 'weak';
}

const IGNORE = new Set(['—', 'theme', '']);

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

/** Compute CCS for every ticker held by the tracked investors. */
export function computeScores(set: Investor[] = investors): StockScore[] {
  const byTicker = new Map<string, StockScore>();

  for (const inv of set) {
    for (const h of inv.holdings) {
      const ticker = h.ticker.trim();
      if (IGNORE.has(ticker)) continue;
      const action: HoldingAction = h.action ?? 'hold';
      let entry = byTicker.get(ticker);
      if (!entry) {
        entry = {
          ticker,
          name: h.name,
          score: 0,
          holders: 0,
          holdersScore: 0,
          actionScore: 0,
          diversityBonus: 0,
          styles: [],
          contributions: [],
        };
        byTicker.set(ticker, entry);
      }
      entry.holders += 1;
      if (inv.styleTag && inv.styleTag !== 'contrarian' && !entry.styles.includes(inv.styleTag)) {
        entry.styles.push(inv.styleTag);
      }
      entry.contributions.push({
        slug: inv.slug,
        investor: inv.name,
        action,
        points: ACTION_POINTS[action],
        note: h.note,
      });
    }
  }

  const scores = [...byTicker.values()];
  for (const s of scores) {
    s.holdersScore = Math.min(48, s.holders * 12);
    s.actionScore = clamp(
      s.contributions.reduce((sum, c) => sum + c.points, 0),
      -20,
      40,
    );
    s.diversityBonus = s.styles.length >= 3 ? 12 : 0;
    s.score = clamp(s.holdersScore + s.actionScore + s.diversityBonus, 0, 100);
  }

  return scores.sort((a, b) => b.score - a.score || a.ticker.localeCompare(b.ticker));
}

export function getScore(ticker: string): StockScore | undefined {
  return computeScores().find((s) => s.ticker === ticker.trim());
}

export type ConvictionBand = 'high' | 'balanced' | 'cautious';

export type Conviction = {
  /** 0–100: mean CCS across consensus names (held by 2+ legends). */
  index: number;
  /** How many names reach consensus (2+ holders) — the breadth of agreement. */
  breadth: number;
  /** Net action tilt: Σ action points across all holdings (+ = net adding). */
  netTilt: number;
  band: ConvictionBand;
};

/**
 * AI Conviction Index — a single site-wide read on how strongly the tracked
 * legends collectively agree on AI this quarter. Not a market forecast: it
 * summarizes disclosed positioning, nothing more. Published for citation on
 * /consensus and in llms.txt — a metric no 13F aggregator offers.
 */
export function convictionIndex(set: Investor[] = investors): Conviction {
  const scores = computeScores(set);
  const consensus = scores.filter((s) => s.holders >= 2);
  const index = consensus.length
    ? Math.round(consensus.reduce((sum, s) => sum + s.score, 0) / consensus.length)
    : 0;
  const netTilt = scores.reduce(
    (sum, s) => sum + s.contributions.reduce((a, c) => a + c.points, 0),
    0,
  );
  const band: ConvictionBand = index >= 70 ? 'high' : index >= 50 ? 'balanced' : 'cautious';
  return { index, breadth: consensus.length, netTilt, band };
}

/**
 * Quarterly score history — appended each 13F season by the ops pipeline.
 * This accumulating series is the dataset nobody else has; period keys use
 * the filing quarter the data reflects.
 */
export const scoreHistory: { period: string; note: Localized }[] = [
  {
    period: '2026Q1',
    note: {
      zh: '基期(首次发布)。此后每季 13F 更新时追加一期,形成可回溯的共识分时间序列。',
      en: 'Base period (first release). A new period is appended each 13F season, building a back-testable consensus time series.',
    },
  },
];
