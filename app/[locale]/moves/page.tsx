import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { getBuys, getSells, type Move } from '@/lib/data/moves';
import { getScore } from '@/lib/data/score';
import StockLink from '@/components/StockLink';
import ScoreBadge from '@/components/ScoreBadge';
import ShareBar from '@/components/ShareBar';
import Disclaimer from '@/components/Disclaimer';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return { title: dict.nav.moves[locale as Locale] };
}

function MoveRow({ move, locale }: { move: Move; locale: Locale }) {
  const ccs = getScore(move.ticker);
  const isBuy = move.action === 'new' || move.action === 'add';
  return (
    <li className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3">
      <span
        className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${
          isBuy ? 'border-gain/40 bg-gain/10 text-gain' : 'border-loss/40 bg-loss/10 text-loss'
        }`}
      >
        {dict.score.actions[move.action][locale]}
      </span>
      <span className="w-14 font-mono font-bold text-white">
        <StockLink ticker={move.ticker} locale={locale} />
      </span>
      <Link href={`/${locale}/investors/${move.investorSlug}`} className="link-accent text-sm font-medium">
        {move.investorName[locale]}
      </Link>
      <span className="flex-1 text-sm text-slate-400">{move.note[locale]}</span>
      {ccs && <ScoreBadge score={ccs.score} locale={locale} />}
    </li>
  );
}

export default async function MovesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const buys = getBuys();
  const sells = getSells();

  return (
    <div className="container-page py-12">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-3xl">
          <h1 className="section-title">{dict.nav.moves[loc]}</h1>
          <p className="mt-3 text-slate-300">
            {loc === 'zh'
              ? '本季 13F 与公开报道中,传奇投资人在 AI 标的上的全部买卖动作——新建与清仓是最强信号。'
              : 'Every disclosed AI move by the tracked legends this 13F season — new positions and exits are the strongest signals.'}
          </p>
        </div>
        <ShareBar
          locale={loc}
          text={
            loc === 'zh'
              ? `本季传奇投资人 AI 持仓大动作:${buys.length} 笔买入 vs ${sells.length} 笔卖出 · AI 投资罗盘`
              : `The legends' AI moves this quarter: ${buys.length} buys vs ${sells.length} sells · AI Investing Compass`
          }
        />
      </header>

      <div className="mt-4 max-w-3xl">
        <Disclaimer locale={loc} />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 className="text-lg font-bold text-gain">▲ {dict.moves.buys[loc]}</h2>
          <ul className="mt-4 space-y-2">
            {buys.length > 0
              ? buys.map((m, i) => <MoveRow key={`${m.investorSlug}-${m.ticker}-${i}`} move={m} locale={loc} />)
              : <li className="text-sm text-slate-500">{dict.moves.empty[loc]}</li>}
          </ul>
        </section>
        <section>
          <h2 className="text-lg font-bold text-loss">▼ {dict.moves.sells[loc]}</h2>
          <ul className="mt-4 space-y-2">
            {sells.length > 0
              ? sells.map((m, i) => <MoveRow key={`${m.investorSlug}-${m.ticker}-${i}`} move={m} locale={loc} />)
              : <li className="text-sm text-slate-500">{dict.moves.empty[loc]}</li>}
          </ul>
        </section>
      </div>
    </div>
  );
}
