import type { Localized } from '@/lib/i18n/config';
import type { HoldingAction } from './types';
import { investors } from './investors';

/**
 * Quarterly activity feed — the "biggest buys & sells" view that is the
 * most-visited page on incumbent 13F trackers (e.g. Dataroma's activity page).
 * Derived entirely from the holdings' structured `action` field.
 */
export type Move = {
  ticker: string;
  stockName: Localized;
  investorSlug: string;
  investorName: Localized;
  action: HoldingAction;
  note: Localized;
  asOf: string;
};

const BUY: HoldingAction[] = ['new', 'add'];
const SELL: HoldingAction[] = ['trim', 'exit'];
const IGNORE = new Set(['—', 'theme', '']);

function collect(actions: HoldingAction[]): Move[] {
  const moves: Move[] = [];
  for (const inv of investors) {
    for (const h of inv.holdings) {
      if (IGNORE.has(h.ticker.trim())) continue;
      const action = h.action ?? 'hold';
      if (!actions.includes(action)) continue;
      moves.push({
        ticker: h.ticker,
        stockName: h.name,
        investorSlug: inv.slug,
        investorName: inv.name,
        action,
        note: h.note,
        asOf: inv.asOf,
      });
    }
  }
  // new/exit (the strongest signals) first, then alphabetical for stability
  const rank: Record<string, number> = { new: 0, add: 1, trim: 1, exit: 0, hold: 2 };
  return moves.sort((a, b) => rank[a.action] - rank[b.action] || a.ticker.localeCompare(b.ticker));
}

export function getBuys(): Move[] {
  return collect(BUY);
}

export function getSells(): Move[] {
  return collect(SELL);
}
