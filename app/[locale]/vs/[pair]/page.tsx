import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { getPairs, getPair } from '@/lib/data/pairs';
import { localeAlternates } from '@/lib/seo';
import { getScore, type StockScore } from '@/lib/data/score';
import type { StockDetail } from '@/lib/data/stocks';
import ScoreBadge from '@/components/ScoreBadge';
import LiveQuote from '@/components/LiveQuote';
import ShareBar from '@/components/ShareBar';
import BrokerCTA from '@/components/BrokerCTA';
import Disclaimer from '@/components/Disclaimer';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => getPairs().map((p) => ({ locale, pair: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; pair: string }>;
}): Promise<Metadata> {
  const { locale, pair } = await params;
  const p = getPair(pair);
  if (!p) return {};
  const loc = locale as Locale;
  const title =
    loc === 'zh'
      ? `${p.a.ticker} vs ${p.b.ticker}:传奇投资人怎么选?罗盘共识分对比`
      : `${p.a.ticker} vs ${p.b.ticker}: which do the legends prefer? Consensus Score comparison`;
  const description =
    loc === 'zh'
      ? `${p.a.name.zh}与${p.b.name.zh}的共识分、大佬持仓动作、多空逻辑并排对比,数据来自公开 13F,每季更新。`
      : `${p.a.name.en} vs ${p.b.name.en}: Consensus Scores, legendary investors' actions, and bull/risk views side by side. From public 13F data, refreshed quarterly.`;
  return { title, description, alternates: localeAlternates(loc, `/vs/${p.slug}`) };
}

function verdict(a: StockDetail, b: StockDetail, sa: StockScore | undefined, sb: StockScore | undefined, loc: Locale): string {
  const scoreA = sa?.score ?? 0;
  const scoreB = sb?.score ?? 0;
  const [hi, lo, hiS, loS] = scoreA >= scoreB ? [a, b, scoreA, scoreB] : [b, a, scoreB, scoreA];
  if (hiS - loS > 20) {
    return loc === 'zh'
      ? `本季传奇投资人的集体动作明显更偏向 ${hi.ticker}(共识分 ${hiS} vs ${loS})。这不代表 ${lo.ticker} 更差——分数反映的是大佬们的披露动作,不是股价预测。`
      : `This quarter the legends' collective actions clearly favor ${hi.ticker} (score ${hiS} vs ${loS}). That doesn't make ${lo.ticker} worse — the score reflects disclosed actions, not a price forecast.`;
  }
  if (hiS - loS > 5) {
    return loc === 'zh'
      ? `${hi.ticker} 的共识分略高(${hiS} vs ${loS}),但差距有限——两者都值得按各自的赛道逻辑单独研究。`
      : `${hi.ticker} scores slightly higher (${hiS} vs ${loS}), but the gap is modest — each deserves its own research within its layer.`;
  }
  return loc === 'zh'
    ? `两者共识分接近(${hiS} vs ${loS})——大佬们没有给出明确的集体倾向,分层逻辑与估值才是决定因素。`
    : `The scores are close (${hiS} vs ${loS}) — the legends show no clear collective lean; layer logic and valuation matter more here.`;
}

function Column({ stock, score, loc }: { stock: StockDetail; score: StockScore | undefined; loc: Locale }) {
  return (
    <div className="card">
      <div className="flex items-baseline justify-between gap-2">
        <Link href={`/${loc}/stocks/${stock.ticker}`} className="font-mono text-xl font-bold text-white hover:text-accent">
          {stock.ticker}
        </Link>
        <LiveQuote ticker={stock.ticker} />
      </div>
      <div className="mt-0.5 text-sm text-slate-400">{stock.name[loc]} · {stock.role[loc]}</div>
      <div className="mt-4">
        {score ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-300">{dict.score.short[loc]}</span>
              <ScoreBadge score={score.score} locale={loc} />
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-accent-deep to-accent" style={{ width: `${score.score}%` }} />
            </div>
            <ul className="mt-3 space-y-1 text-xs">
              {score.contributions.map((c) => (
                <li key={c.slug} className="flex justify-between gap-2">
                  <span className="text-slate-400">{c.investor[loc]} · {dict.score.actions[c.action][loc]}</span>
                  <span className={`font-mono ${c.points >= 0 ? 'text-gain' : 'text-loss'}`}>
                    {c.points >= 0 ? '+' : ''}{c.points}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-xs text-slate-500">{dict.compare.noScore[loc]}</p>
        )}
      </div>
      <div className="mt-4 space-y-2 text-sm">
        <p><span className="font-semibold text-gain">▲ </span><span className="text-slate-300">{stock.bull[loc]}</span></p>
        <p><span className="font-semibold text-loss">▼ </span><span className="text-slate-300">{stock.risk[loc]}</span></p>
      </div>
    </div>
  );
}

export default async function VsPage({ params }: { params: Promise<{ locale: string; pair: string }> }) {
  const { locale, pair } = await params;
  const loc = locale as Locale;
  const p = getPair(pair);
  if (!p) notFound();

  const sa = getScore(p.a.ticker);
  const sb = getScore(p.b.ticker);

  return (
    <div className="container-page py-12">
      <header className="max-w-3xl">
        <h1 className="section-title">
          <span className="font-mono">{p.a.ticker}</span> vs <span className="font-mono">{p.b.ticker}</span>
          <span className="ml-2 text-lg font-normal text-slate-400">
            {loc === 'zh' ? '· 传奇投资人怎么选?' : '· which do the legends prefer?'}
          </span>
        </h1>
        <p className="mt-4 rounded-xl border border-accent/25 bg-accent/5 p-4 text-sm leading-relaxed text-slate-200">
          {verdict(p.a, p.b, sa, sb, loc)}
        </p>
        <div className="mt-3">
          <ShareBar
            locale={loc}
            text={
              loc === 'zh'
                ? `${p.a.ticker}(共识分 ${sa?.score ?? '—'}) vs ${p.b.ticker}(共识分 ${sb?.score ?? '—'}):传奇投资人怎么选?· AI 投资罗盘`
                : `${p.a.ticker} (CCS ${sa?.score ?? '—'}) vs ${p.b.ticker} (CCS ${sb?.score ?? '—'}): which do the legends prefer? · AI Investing Compass`
            }
          />
        </div>
      </header>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Column stock={p.a} score={sa} loc={loc} />
        <Column stock={p.b} score={sb} loc={loc} />
      </div>

      <p className="mt-6 text-sm text-slate-400">
        {loc === 'zh' ? '想换其他标的对比?' : 'Want to compare other names?'}{' '}
        <Link href={`/${loc}/compare`} className="link-accent font-medium">{dict.nav.compare[loc]} →</Link>
        <span className="mx-2 text-slate-600">·</span>
        <Link href={`/${loc}/methodology#ccs`} className="link-accent">{dict.score.name[loc]}</Link>
      </p>

      <div className="mt-12">
        <BrokerCTA locale={loc} />
      </div>

      <div className="mt-8 max-w-3xl">
        <Disclaimer locale={loc} />
      </div>
    </div>
  );
}
