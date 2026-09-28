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

type Leg = { from: string; to: string; ret: number; holdings: number; coverage: number; bench: number | null; entryDate?: string; exitDate?: string };
type Row = {
  slug: string;
  name: string;
  entityName: string;
  cik: string;
  from: string;
  to: string;
  entryDate?: string;
  exitDate?: string;
  quarters: number;
  cumulativeReturn: number;
  benchmarkQQQ: number | null;
  legs: Leg[];
};

const rows = homework.investors as Row[];
const legacy = String(homework.methodVersion) !== '13f-next-session-v2';

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
        ? '复核公开 13F 的 AI 持仓历史模拟：数据版本、申报与执行时点、价格覆盖及同期 QQQ 对照。'
        : 'Audit historical AI-sleeve simulations: method version, filing and execution dates, price coverage and matched QQQ benchmark.',
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
      {!legacy && rows.length > 0 && (
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
              'Inspect versioned historical AI-sleeve simulations',
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
        {/* 同一套回测的判定页在主站(AGI Scorecard 投资板块):方法、四条反面说明与完整表格。读者相关的站内互链。 */}
        <p className="mt-3 text-sm">
          <a
            href={loc === 'zh' ? 'https://agiscorecard.com/zh/does-copying-13f-work' : 'https://agiscorecard.com/does-copying-13f-work'}
            className="text-accent underline decoration-accent/40 underline-offset-2 hover:text-white"
          >
            {loc === 'zh' ? '抄 13F 作业到底赚不赚钱？方法、反面说明与完整表格 →' : 'Does copying 13F filings actually work? Method, caveats and the full table →'}
          </a>
        </p>
      </section>

      <section className="mt-6 rounded-xl border border-amber-400/50 bg-amber-400/10 p-5" role="note">
        <h2 className="font-bold text-white">{loc === 'zh' ? (legacy ? '旧版快照 · 待重算' : '历史模拟 · 非实盘收益') : (legacy ? 'Legacy snapshot · recomputation pending' : 'Historical simulation · not live returns')}</h2>
        <p className="mt-2 text-sm text-slate-300">{loc === 'zh'
          ? (legacy ? '下方数值来自旧版：可能使用披露前的申报日收盘价、混入期权记录、跳过缺失数据。保留供审计，不能用来证明可赚到这些收益。' : '已采用次交易日收盘、期权过滤和完整价格覆盖。仍受当前选股名单、申报权重及未扣交易成本等假设影响，尚未证明未来超额收益。')
          : (legacy ? 'The figures below use the old method: same-day prices may precede disclosure, option rows may be included, and missing data were skipped. Retained for audit; they do not demonstrate achievable returns.' : 'Uses next-session closes, option filtering and complete price coverage. Current-universe selection, filed weights and excluded trading costs remain limitations; future excess returns are unproven.')}</p>
        <p className="mt-2 text-xs text-slate-400">{homework.methodVersion} · {homework.generated}</p>
        <a className="mt-2 inline-block text-sm text-accent underline" href="/copy-homework.json" download>{loc === 'zh' ? '下载带方法与状态的原始数据' : 'Download versioned data and status'}</a>
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
                        {r.entryDate ?? r.from} → {r.exitDate ?? r.to}
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
                            {l.entryDate ?? l.from} → {l.exitDate ?? l.to}
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

