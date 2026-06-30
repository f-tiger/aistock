import type { AiTheme, Investor } from './types';
import { themes, getTheme } from './themes';
import { investors, getInvestor } from './investors';
import { buildConsensus, type ConsensusEntry } from './consensus';
import { updates, type MarketUpdate } from './updates';
import { getStocks, getStock, type StockDetail } from './stocks';

/**
 * Data access boundary for the whole site.
 *
 * Pages depend ONLY on this interface, never on the raw data modules. That keeps
 * the UI decoupled from the data source, so the static content here can later be
 * swapped for a live feed (13F / quotes API) WITHOUT touching any page or
 * component — see `LiveApiProvider` stub below.
 */
export interface MarketDataProvider {
  getThemes(): Promise<AiTheme[]>;
  getTheme(id: string): Promise<AiTheme | undefined>;
  getInvestors(): Promise<Investor[]>;
  getInvestor(slug: string): Promise<Investor | undefined>;
  getConsensus(): Promise<ConsensusEntry[]>;
  getUpdates(): Promise<MarketUpdate[]>;
  getStocks(): Promise<StockDetail[]>;
  getStock(ticker: string): Promise<StockDetail | undefined>;
}

/** Default provider: serves the curated static content in lib/data/*. */
export class StaticProvider implements MarketDataProvider {
  async getThemes() {
    return themes;
  }
  async getTheme(id: string) {
    return getTheme(id);
  }
  async getInvestors() {
    return investors;
  }
  async getInvestor(slug: string) {
    return getInvestor(slug);
  }
  async getConsensus() {
    return buildConsensus(investors);
  }
  async getUpdates() {
    return [...updates].sort((a, b) => b.date.localeCompare(a.date));
  }
  async getStocks() {
    return getStocks();
  }
  async getStock(ticker: string) {
    return getStock(ticker);
  }
}

/**
 * Reserved hook for live data. Implement these methods against a real provider
 * (e.g., Finnhub / Polygon for quotes, an SEC 13F source for holdings), then
 * switch `provider` below. On Cloudflare Pages this can be backed by Pages
 * Functions / Workers so the front end stays static.
 *
 * Example:
 *   export class LiveApiProvider implements MarketDataProvider {
 *     constructor(private readonly apiKey: string) {}
 *     async getThemes() { ... fetch + map to AiTheme[] ... }
 *     ...
 *   }
 */

/** The single provider the app consumes. Swap the implementation to go live. */
export const provider: MarketDataProvider = new StaticProvider();
