import type { Metadata } from 'next';
import Link from 'next/link';
import type { Locale, Localized } from '@/lib/i18n/config';
import { locales } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';
import { localeAlternates } from '@/lib/seo';
import NewsletterSignup from '@/components/NewsletterSignup';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const loc = locale as Locale;
  return {
    title: dict.pro.title[loc],
    description:
      loc === 'zh'
        ? 'AI 投资罗盘 Pro:共识分变动预警、每季 13F 深度解读、组合体检 Pro 与共识分历史回溯。加入早鸟候补,锁定前 500 名价格。'
        : 'AI Investing Compass Pro: consensus-shift alerts, quarterly 13F deep-dives, Portfolio Check Pro, and consensus-score history. Join the early-bird list and lock the first-500 price.',
    alternates: localeAlternates(loc, '/pro'),
  };
}

type Row = { label: Localized; free: boolean; pro: boolean };

const ROWS: Row[] = [
  { label: { zh: '共识榜 · 个股档案 · 传奇持仓', en: 'Leaderboard · stock profiles · legends’ holdings' }, free: true, pro: true },
  { label: { zh: '对比工具 · 组合共识体检(基础)', en: 'Compare tool · Portfolio Check (basic)' }, free: true, pro: true },
  { label: { zh: '季度动态 · 入门指南 · 术语表', en: 'Quarterly updates · guides · glossary' }, free: true, pro: true },
  { label: { zh: '共识分变动预警(邮件 / 推送)', en: 'Consensus-shift alerts (email / push)' }, free: false, pro: true },
  { label: { zh: '每季 13F 深度解读(PDF)', en: 'Quarterly 13F deep-dive (PDF)' }, free: false, pro: true },
  { label: { zh: '组合体检 Pro:多组合保存 · CSV 导出', en: 'Portfolio Check Pro: saved portfolios · CSV export' }, free: false, pro: true },
  { label: { zh: '共识分历史时间序列 & 回测视图', en: 'Consensus-score history & back-test view' }, free: false, pro: true },
  { label: { zh: '无广告 · 无推广位', en: 'No ads · no referral placements' }, free: false, pro: true },
  { label: { zh: '数据下载 / API(规划中)', en: 'Data download / API (planned)' }, free: false, pro: true },
];

function Check({ on }: { on: boolean }) {
  return on ? (
    <span className="font-bold text-gain">✓</span>
  ) : (
    <span className="text-slate-600">—</span>
  );
}

// Optional hosted checkout (Gumroad / Lemon Squeezy / Stripe Payment Link / Ko-fi …).
// When set, the Pro CTA becomes a real "subscribe" button; otherwise it collects
// the early-bird waitlist. Public by design (a shareable checkout URL).
const CHECKOUT_URL = process.env.NEXT_PUBLIC_PRO_CHECKOUT_URL || '';

export default async function ProPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  const t = dict.pro;

  return (
    <div className="container-page py-12">
      <header className="max-w-3xl">
        <span className="pill text-accent">{t.badge[loc]}</span>
        <h1 className="section-title mt-4">{t.title[loc]}</h1>
        <p className="mt-3 text-lg text-slate-300">{t.subtitle[loc]}</p>
      </header>

      {/* pricing cards */}
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="card">
          <h2 className="text-lg font-bold text-white">{t.freeTitle[loc]}</h2>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white">{t.freePrice[loc]}</span>
            <span className="text-sm text-slate-400">{t.freeNote[loc]}</span>
          </div>
          <Link href={`/${loc}/tools/portfolio`} className="btn-ghost mt-5 inline-block w-full text-center">
            {t.ctaFree[loc]}
          </Link>
        </div>

        <div className="card border-accent/40 bg-accent/[0.06]">
          <h2 className="text-lg font-bold text-white">{t.proTitle[loc]}</h2>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-accent">{t.proPrice[loc]}</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">{t.proNote[loc]}</p>
          {CHECKOUT_URL ? (
            <>
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-5 inline-block w-full text-center"
              >
                {t.buyNow[loc]} →
              </a>
              <a href="#waitlist" className="mt-3 block text-center text-xs link-accent">
                {t.orWaitlist[loc]}
              </a>
            </>
          ) : (
            <a href="#waitlist" className="btn-primary mt-5 inline-block w-full text-center">
              {t.ctaPro[loc]}
            </a>
          )}
        </div>
      </div>

      {/* feature comparison */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-white">{t.featuresHead[loc]}</h2>
        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-ink-900/60 text-left">
                <th className="px-4 py-3 font-semibold text-slate-300"> </th>
                <th className="w-24 px-4 py-3 text-center font-semibold text-slate-300">{t.freeTitle[loc]}</th>
                <th className="w-24 px-4 py-3 text-center font-semibold text-accent">{t.proTitle[loc]}</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={i} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-slate-200">{r.label[loc]}</td>
                  <td className="px-4 py-3 text-center"><Check on={r.free} /></td>
                  <td className="px-4 py-3 text-center"><Check on={r.pro} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* waitlist */}
      <section id="waitlist" className="mt-12 scroll-mt-24">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-white">{t.waitlistTitle[loc]}</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-400">{t.waitlistDesc[loc]}</p>
          <div className="mt-6">
            <NewsletterSignup locale={loc} source="pro" />
          </div>
          <p className="mt-6 text-center text-xs text-slate-500">{t.disclosure[loc]}</p>
        </div>
      </section>
    </div>
  );
}
