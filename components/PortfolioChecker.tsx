'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { Locale, Localized } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { scoreBand } from '@/lib/data/score';
import ScoreBadge from '@/components/ScoreBadge';
import CompassGauge from '@/components/CompassGauge';
import ShareBar from '@/components/ShareBar';

export type ScoreLite = {
  ticker: string;
  name: Localized;
  score: number;
  holders: { slug: string; name: Localized }[];
};
export type InvestorLite = { slug: string; name: Localized; tickers: string[] };

const TICKER_RE = /^[A-Z][A-Z.\-]{0,9}$/;
const EXAMPLE = 'NVDA AMZN GOOGL TSLA MSFT';

function parseTickers(raw: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const tok of raw.toUpperCase().split(/[^A-Z.\-]+/)) {
    const t = tok.trim();
    if (t && TICKER_RE.test(t) && !seen.has(t)) {
      seen.add(t);
      out.push(t);
    }
  }
  return out;
}

export default function PortfolioChecker({
  scores,
  investors,
  locale,
}: {
  scores: ScoreLite[];
  investors: InvestorLite[];
  locale: Locale;
}) {
  const t = dict.tools;
  const [raw, setRaw] = useState('');

  // Prefill from a shareable ?p= link (deferred so it's not a sync effect setState).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const p = new URLSearchParams(window.location.search).get('p');
    if (!p) return;
    const id = requestAnimationFrame(() => setRaw(p));
    return () => cancelAnimationFrame(id);
  }, []);

  // Keep the URL in sync so the current input is shareable.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    const tickers = parseTickers(raw);
    if (tickers.length) url.searchParams.set('p', tickers.join(','));
    else url.searchParams.delete('p');
    window.history.replaceState(null, '', url);
  }, [raw]);

  const byTicker = useMemo(() => {
    const m = new Map<string, ScoreLite>();
    for (const s of scores) m.set(s.ticker, s);
    return m;
  }, [scores]);

  const result = useMemo(() => {
    const tickers = parseTickers(raw);
    if (tickers.length === 0) return null;
    const recognized = tickers.filter((t) => byTicker.has(t));
    const unrecognized = tickers.filter((t) => !byTicker.has(t));
    const rows = recognized
      .map((t) => byTicker.get(t)!)
      .sort((a, b) => b.score - a.score);
    const avg = rows.length
      ? Math.round(rows.reduce((sum, r) => sum + r.score, 0) / rows.length)
      : 0;
    const recognizedSet = new Set(recognized);
    const alignment = investors
      .map((inv) => ({
        slug: inv.slug,
        name: inv.name,
        overlap: inv.tickers.filter((tk) => recognizedSet.has(tk)),
      }))
      .filter((a) => a.overlap.length > 0)
      .sort((a, b) => b.overlap.length - a.overlap.length)
      .slice(0, 3);
    return { total: tickers.length, recognized, unrecognized, rows, avg, alignment };
  }, [raw, byTicker, investors]);

  const shareText = result
    ? t.shareText[locale].replace('{score}', String(result.avg))
    : '';

  return (
    <div>
      <div className="card">
        <label htmlFor="pf" className="text-sm font-semibold text-slate-200">
          {t.inputLabel[locale]}
        </label>
        <input
          id="pf"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder={t.placeholder[locale]}
          className="mt-3 w-full rounded-lg border border-white/15 bg-ink-900 px-4 py-3 font-mono text-sm text-slate-200 outline-none placeholder:text-slate-500 focus:border-accent/60"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
        />
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <button
            type="button"
            onClick={() => setRaw(EXAMPLE)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-slate-300 transition hover:border-accent/40 hover:text-white"
          >
            {t.tryExample[locale]}: {EXAMPLE}
          </button>
        </div>

        {/* quick-load a legend's whole AI sleeve */}
        <div className="mt-4 border-t border-white/5 pt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.quickLoad[locale]}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {investors
              .filter((inv) => inv.tickers.length > 0)
              .map((inv) => (
                <button
                  key={inv.slug}
                  type="button"
                  onClick={() => setRaw(inv.tickers.join(' '))}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 transition hover:border-accent/40 hover:text-white"
                >
                  {inv.name[locale]}
                </button>
              ))}
          </div>
        </div>
      </div>

      {!result && (
        <p className="mt-6 text-sm text-slate-400">{t.empty[locale]}</p>
      )}

      {result && result.rows.length > 0 && (
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* score dial */}
          <div className="card flex flex-col items-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {t.scoreLabel[locale]}
            </span>
            <CompassGauge
              key={result.avg}
              score={result.avg}
              ticker={locale === 'zh' ? '组合' : 'MIX'}
              locale={locale}
              size={220}
            />
            <p className="mt-2 text-center text-xs leading-relaxed text-slate-400">{t.scoreNote[locale]}</p>
            <p className="mt-3 text-sm text-slate-300">
              {locale === 'zh' ? (
                <>
                  {t.coveragePrefix.zh}
                  <span className="font-mono font-bold text-accent"> {result.recognized.length} </span>
                  / {result.total} {t.coverageSuffix.zh}
                </>
              ) : (
                <>
                  <span className="font-mono font-bold text-accent">{result.recognized.length}</span>
                  {' / '}
                  {result.total} {t.coverageSuffix.en}
                </>
              )}
            </p>
            <div className="mt-4 w-full">
              <ShareBar locale={locale} text={shareText} />
            </div>
          </div>

          {/* right column: alignment + breakdown */}
          <div className="space-y-6">
            {result.alignment.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-white">{t.alignTitle[locale]}</h2>
                <p className="mt-1 text-sm text-slate-400">{t.alignNote[locale]}</p>
                <div className="mt-4 space-y-2">
                  {result.alignment.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/${locale}/investors/${a.slug}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 transition hover:border-accent/40"
                    >
                      <span className="font-medium text-white">{a.name[locale]}</span>
                      <span className="flex items-center gap-2">
                        <span className="hidden font-mono text-xs text-slate-400 sm:inline">
                          {a.overlap.join(' · ')}
                        </span>
                        <span className="pill whitespace-nowrap">
                          {a.overlap.length} {t.overlap[locale]}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-lg font-bold text-white">{t.breakdownTitle[locale]}</h2>
              <div className="mt-4 space-y-2">
                {result.rows.map((r) => (
                  <div key={r.ticker} className="rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={`/${locale}/stocks/${r.ticker}`}
                        className="font-mono font-bold text-white hover:text-accent"
                      >
                        {r.ticker}
                        <span className="ml-2 text-xs font-normal text-slate-400">{r.name[locale]}</span>
                      </Link>
                      <ScoreBadge score={r.score} locale={locale} />
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full ${
                          scoreBand(r.score) === 'strong'
                            ? 'bg-gain'
                            : scoreBand(r.score) === 'weak'
                              ? 'bg-slate-500'
                              : 'bg-gradient-to-r from-accent-deep to-accent'
                        }`}
                        style={{ width: `${r.score}%` }}
                      />
                    </div>
                    {r.holders.length > 0 && (
                      <p className="mt-2 text-xs text-slate-400">
                        {dict.labels.heldBy[locale]} {r.holders.length} {dict.labels.holders[locale]}:{' '}
                        {r.holders.slice(0, 3).map((h) => h.name[locale]).join('、')}
                        {r.holders.length > 3 ? '…' : ''}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {result && result.unrecognized.length > 0 && (
        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
          <p className="text-xs text-slate-400">
            {t.notTrackedNote[locale]}{' '}
            <span className="font-mono text-slate-300">{result.unrecognized.join(', ')}</span>
          </p>
        </div>
      )}

      {result && (
        <>
          <p className="mt-6 text-xs text-slate-500">{t.checkerDisclaimer[locale]}</p>
          <div className="mt-6 flex flex-wrap items-center gap-2 rounded-xl border border-accent/25 bg-accent/5 px-4 py-3 text-sm">
            <span className="text-slate-200">{t.proTeaser[locale]}</span>
            <Link href={`/${locale}/pro`} className="link-accent font-semibold">
              {t.proTeaserCta[locale]}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
