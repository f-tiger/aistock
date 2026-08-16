import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { localeAlternates, breadcrumbJsonLd, itemListJsonLd } from '@/lib/seo';
import { getInvestor } from '@/lib/data/investors';
import ShareBar from '@/components/ShareBar';
import NewsletterSignup from '@/components/NewsletterSignup';
import Disclaimer from '@/components/Disclaimer';
import homework from '@/lib/data/copy-homework.json';
import HomeworkCalculator from '@/components/HomeworkCalculator';
import EmbedCode from '@/components/EmbedCode';
import { siteUrl } from '@/lib/site';

type Leg = { from: string; to: string; ret: number; holdings: number; coverage: number; bench: number | null };
type Row = {
  slug: string;
  name: string;
  entityName: string;
  cik: string;
  from: string;
  to: string;
  quarters: number;
  cumulativeReturn: number;
  benchmarkQQQ: number | null;
  legs: Leg[];
};

const rows = homework.investors as Row[];

const pct = (n: number) => `${n > 0 ? '+' : ''}${n.toFixed(1)}%`;
const tone = (n: number) => (n > 0 ? 'text-emerald-400' : n < 0 ? 'text-rose-400' : 'text-slate-300');

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: dict.homework.title[loc],
    description:
      loc === 'zh'
        ? '抄大佬的 AI 作业,过去两年真的赚了吗?用 13F 申报当天的收盘价回测——不是穿越价——逐期给出累计收益与同期 QQQ 对照。'
        : 'Does copying the legends’ AI holdings actually make money? Backtested at each 13F’s filing-date close — not a price you could never have got — with QQQ as the benchmark.',
    alternates: localeAlternates(loc, '/track-record'),
  };
}

export default async function TrackRecordPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = dict.homework;

  // 中英同名:回测脚本只存了中文名,英文名从 investors 档案取,取不到才回落。
  const label = (r: Row) => getInvestor(r.slug)?.name[loc] ?? r.name;

  return (
    <div className="container-page py-12">
      {/* ?embed=1 时在首屏绘制前就打上标记,否则外站会先闪一下完整页面再收起来。 */}
      <script
        dangerouslySetInnerHTML={{
          __html:
            "try{if(/[?&]embed=1/.test(location.search))document.documentElement.classList.add('embed-mode')}catch(e){}",
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd(loc, [
            { name: dict.nav.home[loc], path: '' },
            { name: dict.nav.tools[loc], path: '/tools' },
            { name: t.title[loc], path: '/track-record' },
          ]),
        }}
      />
      {rows.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: itemListJsonLd(
              loc,
              t.title[loc],
              rows.map((r) => ({ name: `${label(r)} — ${pct(r.cumulativeReturn)}`, path: `/follow/${r.slug}` })),
            ),
          }}
        />
      )}

      {/* 站规(2026-07-26):每个可交互工具必须带 WebApplication JSON-LD。 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: t.title[loc],
            url: `${siteUrl}/${loc}/track-record`,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any (web browser)',
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: 0, priceCurrency: 'USD' },
            inLanguage: loc === 'zh' ? 'zh-CN' : 'en',
            featureList: [
              'Backtest each legend\u2019s AI sleeve at 13F filing-date closes',
              'Pick any filing date as the start and any stake',
              'Blend several investors into one basket',
              'QQQ benchmark computed over the same window',
              'Shareable result links and an embeddable iframe',
            ],
            isPartOf: { '@type': 'WebSite', name: 'AI Investing Compass', url: siteUrl },
          }),
        }}
      />

      <header className="max-w-3xl" data-embed-hide>
        <h1 className="section-title">{t.title[loc]}</h1>
        <p className="mt-3 text-lg text-slate-300">{t.intro[loc]}</p>
        <p className="mt-3 text-sm text-slate-500">
          {dict.labels.asOf[loc]} {homework.generated}
        </p>
        <div className="mt-4">
          <ShareBar locale={loc} text={t.title[loc]} />
        </div>
      </header>

      {/* 方法论放在表格之前,而不是脚注里:这套算法本身就是这一页的卖点。 */}
      <section className="mt-8 max-w-3xl rounded-xl border border-accent/25 bg-accent/5 p-5" data-embed-hide>
        <h2 className="text-base font-bold text-white">{t.methodTitle[loc]}</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">{t.methodBody[loc]}</p>
      </section>

      {rows.length > 0 && (
        <HomeworkCalculator
          locale={loc}
          asOf={homework.generated}
          rows={rows.map((r) => ({ slug: r.slug, label: label(r), from: r.from, to: r.to, legs: r.legs }))}
        />
      )}

      {rows.length === 0 ? (
        <p className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">{t.empty[loc]}</p>
      ) : (
        <>
          <section className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="py-3 pr-4 font-medium">{t.thInvestor[loc]}</th>
                  <th className="py-3 pr-4 font-medium">{t.thWindow[loc]}</th>
                  <th className="py-3 pr-4 text-right font-medium">{t.thQuarters[loc]}</th>
                  <th className="py-3 pr-4 text-right font-medium">{t.thReturn[loc]}</th>
                  <th className="py-3 pr-4 text-right font-medium">{t.thBench[loc]}</th>
                  <th className="py-3 pr-4 text-right font-medium">{t.thExcess[loc]}</th>
                  <th className="py-3 font-medium" />
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {rows.map((r) => {
                  const excess = r.benchmarkQQQ == null ? null : r.cumulativeReturn - r.benchmarkQQQ;
                  return (
                    <tr key={r.slug} className="border-b border-white/5">
                      <td className="py-3 pr-4 font-semibold text-white">{label(r)}</td>
                      <td className="py-3 pr-4 text-xs text-slate-400">
                        {r.from} → {r.to}
                      </td>
                      <td className="py-3 pr-4 text-right text-slate-400">{r.quarters}</td>
                      <td className={`py-3 pr-4 text-right font-bold ${tone(r.cumulativeReturn)}`}>
                        {pct(r.cumulativeReturn)}
                      </td>
                      <td className="py-3 pr-4 text-right text-slate-400">
                        {r.benchmarkQQQ == null ? '—' : pct(r.benchmarkQQQ)}
                      </td>
                      <td className={`py-3 pr-4 text-right ${excess == null ? 'text-slate-500' : tone(excess)}`}>
                        {excess == null ? '—' : pct(excess)}
                      </td>
                      <td className="py-3">
                        <Link href={`/${loc}/follow/${r.slug}`} className="text-xs font-medium text-accent hover:underline">
                          {t.copyThis[loc]} →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-bold text-white">{t.legsTitle[loc]}</h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {rows.map((r) => (
                <details key={r.slug} className="card">
                  <summary className="cursor-pointer list-none">
                    <span className="font-semibold text-white">{label(r)}</span>
                    <span className={`ml-2 font-bold tabular-nums ${tone(r.cumulativeReturn)}`}>
                      {pct(r.cumulativeReturn)}
                    </span>
                    <span className="ml-2 text-xs text-slate-500">
                      {r.benchmarkQQQ != null && r.cumulativeReturn > r.benchmarkQQQ ? t.beat[loc] : t.lost[loc]}
                    </span>
                  </summary>
                  <table className="mt-3 w-full text-xs tabular-nums">
                    <tbody>
                      {r.legs.map((l) => (
                        <tr key={l.from} className="border-t border-white/5">
                          <td className="py-1.5 pr-3 text-slate-400">
                            {l.from} → {l.to}
                          </td>
                          <td className={`py-1.5 pr-3 text-right font-medium ${tone(l.ret * 100)}`}>
                            {pct(l.ret * 100)}
                          </td>
                          <td className="py-1.5 text-right text-slate-500">
                            {l.holdings} {t.legHoldings[loc]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-3 text-xs text-slate-500">
                    CIK {r.cik} ·{' '}
                    <a
                      href={`https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${r.cik}&type=13F-HR`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline"
                    >
                      EDGAR
                    </a>
                  </p>
                </details>
              ))}
            </div>
          </section>
        </>
      )}

      {/* 反面说明必须和数字同屏,不能藏在页脚:一个只写好消息的回测页不值得信。 */}
      <section className="mt-10 max-w-3xl rounded-xl border border-white/10 bg-white/5 p-5" data-embed-hide>
        <h2 className="text-base font-bold text-white">{t.caveatTitle[loc]}</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">{t.caveats[loc]}</p>
        <p className="mt-3 text-xs text-slate-500">{t.source[loc]}</p>
      </section>

      <div className="mt-6 max-w-3xl" data-embed-hide>
        <Disclaimer locale={loc} variant="long" />
      </div>

      {/* 嵌入是唯一不需要站长动手的外链引擎——每一次嵌入都是一个分发节点。 */}
      <section className="mt-10 max-w-3xl" data-embed-hide>
        <h2 className="text-lg font-bold text-white">{t.embedTitle[loc]}</h2>
        <p className="mt-2 text-sm text-slate-400">{t.embedNote[loc]}</p>
        <EmbedCode locale={loc} src={`${siteUrl}/${loc}/track-record/?embed=1`} label={t.embedCopy[loc]} />
      </section>

      <section className="mt-10 max-w-2xl" data-embed-hide>
        <h2 className="text-lg font-bold text-white">{t.subTitle[loc]}</h2>
        <p className="mt-2 text-sm text-slate-400">{t.subBody[loc]}</p>
        <div className="mt-4">
          <NewsletterSignup locale={loc} source="track-record" />
        </div>
      </section>

      <p className="mt-8 text-xs text-slate-500">{t.warn[loc]}</p>

      {/* 嵌入版的品牌回链——每个嵌入都是一个指回本页的分发节点。 */}
      <p className="mt-4 hidden text-xs text-slate-400 [.embed-mode_&]:block">
        <a
          href={`${siteUrl}/${loc}/track-record?utm_source=widget`}
          target="_blank"
          rel="noopener noreferrer"
          className="link-accent font-medium"
        >
          {t.title[loc]} · AI Investing Compass →
        </a>
      </p>
    </div>
  );
}
