import type { Localized } from '@/lib/i18n/config';
import type { Investor } from './types';

/** One investor's link to a ticker, with their per-holding note. */
export type ConsensusHolder = {
  slug: string;
  name: Localized;
  note: Localized;
};

/** A ticker and everyone (in our set) who holds it. */
export type ConsensusEntry = {
  ticker: string;
  /** Best display name we have for the ticker (from any holder). */
  name: Localized;
  holders: ConsensusHolder[];
};

const IGNORE = new Set(['—', 'theme', '']);

/**
 * Build a ticker → holders reverse index from the investor set.
 * Pure derivation over existing `investors` data — no new source of truth.
 * Returns entries sorted by holder count (desc), then ticker (asc).
 */
export function buildConsensus(investors: Investor[]): ConsensusEntry[] {
  const map = new Map<string, ConsensusEntry>();

  for (const inv of investors) {
    for (const h of inv.holdings) {
      const ticker = h.ticker.trim();
      if (IGNORE.has(ticker)) continue;
      let entry = map.get(ticker);
      if (!entry) {
        entry = { ticker, name: h.name, holders: [] };
        map.set(ticker, entry);
      }
      entry.holders.push({ slug: inv.slug, name: inv.name, note: h.note });
    }
  }

  return [...map.values()].sort(
    (a, b) => b.holders.length - a.holders.length || a.ticker.localeCompare(b.ticker),
  );
}

/** Tickers held by 2+ investors. */
export function consensusOnly(entries: ConsensusEntry[]): ConsensusEntry[] {
  return entries.filter((e) => e.holders.length >= 2);
}
