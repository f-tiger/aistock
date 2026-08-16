'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n/config';
import dict from '@/lib/i18n/dictionaries';

export type Leg = { from: string; to: string; ret: number; holdings: number; coverage: number; bench: number | null };
export type Row = { slug: string; label: string; from: string; to: string; legs: Leg[] };

/**
 * 两字母短码。存在的唯一理由:Telegram 的 start 载荷上限 64 字符,
 * 而 slug 拼起来(stanley-druckenmiller…)一个人就快用完了。
 * 这张表只存在于本仓 —— bot 那边不需要它,它只负责把收到的短码原样拼回链接,
 * 所以这里加人不需要同时改另一个仓库。
 */
const CODE: Record<string, string> = {
  'warren-buffett': 'wb',
  'cathie-wood': 'cw',
  'stanley-druckenmiller': 'sd',
  'bill-ackman': 'ba',
  'duan-yongping': 'dy',
  'david-tepper': 'dt',
  'philippe-laffont': 'pl',
  'michael-burry': 'mb',
};
const SLUG: Record<string, string> = Object.fromEntries(Object.entries(CODE).map(([k, v]) => [v, k]));
// Telegram 的 start 载荷上限。全选 8 位也只有 34 字符,所以这条守卫今天不可能触发——
// 留着是因为它便宜且正确:名单一旦变长,宁可让按钮消失,也不能去盯一份被悄悄截断的选择。
const TG_MAX = 64;

/**
 * 「如果我从那时候开始抄，今天多少钱」——把榜单变成工具的那一步。
 *
 * 全部在浏览器里算，没有任何请求：数据是构建时烘进页面的申报日回测结果。
 * 基准是每位投资人**自己那段窗口**的 QQQ 逐期复利，而不是全程基准套用到
 * 一个更短的窗口上——后者会得出一个谁都没经历过的对照数字。
 */
export default function HomeworkCalculator({
  locale,
  rows,
  asOf,
}: {
  locale: Locale;
  rows: Row[];
  asOf: string;
}) {
  const t = dict.homework;
  const zh = locale === 'zh';

  // 所有可选起点：各投资人申报日的并集，由新到旧。
  const starts = useMemo(() => {
    const s = new Set<string>();
    rows.forEach((r) => r.legs.forEach((l) => s.add(l.from)));
    return [...s].sort();
  }, [rows]);

  // 深链是页面加载后才能读到的（服务端预渲染时没有 window），所以三个输入
  // 合成一个 state，挂载后一次性回填 —— 一次 setState，不是三次。
  const [ui, setUi] = useState<{ picked: string[]; start: string; amount: number }>({
    picked: [],
    start: starts[0] ?? '',
    amount: 10000,
  });
  const { picked, start, amount } = ui;
  const setPicked = (fn: (p: string[]) => string[]) => setUi((u) => ({ ...u, picked: fn(u.picked) }));
  const setStart = (v: string) => setUi((u) => ({ ...u, start: v }));
  const setAmount = (v: number) => setUi((u) => ({ ...u, amount: v }));
  const [copied, setCopied] = useState(false);

  // 深链回填：?who=a-_-b&from=YYYY-MM-DD&amt=10000
  // 静态导出的页面必须先按默认值水合，再读 URL，否则 hydration 不匹配；
  // 这就是这里必须在 effect 里落一次 state 的原因。
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search);
      // 两种写法都收:?who=<slug>-_-<slug>(页面自己写的)和 ?w=sd-cw(Telegram 回链)
      const who = (q.get('who') || '').split('-_-').filter(Boolean);
      const short = (q.get('w') || '').split('-').filter(Boolean).map((c) => SLUG[c]).filter(Boolean);
      const valid = [...who, ...short].filter((w) => rows.some((r) => r.slug === w));
      const f = q.get('from');
      const a = Number(q.get('amt'));
      setUi((u) => ({
        picked: valid.length ? valid : u.picked,
        start: f && starts.includes(f) ? f : u.start,
        amount: Number.isFinite(a) && a > 0 ? Math.min(a, 100_000_000) : u.amount,
      }));
    } catch {
      /* 深链坏了不该拖垮工具 */
    }
    // rows/starts 在构建时固定，只需跑一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // 选择写回 URL：结果因此是可分享的固定链接，不需要账号。
  useEffect(() => {
    try {
      const q = new URLSearchParams();
      if (picked.length) q.set('who', picked.join('-_-'));
      if (start) q.set('from', start);
      if (amount !== 10000) q.set('amt', String(amount));
      if (document.documentElement.classList.contains('embed-mode')) q.set('embed', '1');
      const s = q.toString();
      window.history.replaceState(null, '', window.location.pathname + (s ? `?${s}` : ''));
    } catch {
      /* 历史 API 不可用时静默 */
    }
  }, [picked, start, amount]);

  const result = useMemo(() => {
    const chosen = rows.filter((r) => picked.includes(r.slug));
    if (!chosen.length || !start) return null;
    const per = chosen.map((r) => {
      const legs = r.legs.filter((l) => l.from >= start);
      let m = 1;
      let b = 1;
      let benchKnown = true;
      legs.forEach((l) => {
        m *= 1 + l.ret;
        if (l.bench == null) benchKnown = false;
        else b *= 1 + l.bench;
      });
      return {
        slug: r.slug,
        label: r.label,
        legs,
        mult: m,
        bench: benchKnown && legs.length ? b : null,
        window: legs.length ? { from: legs[0].from, to: legs[legs.length - 1].to } : null,
      };
    }).filter((p) => p.legs.length > 0);

    if (!per.length) return null;
    const stake = amount / per.length;                       // 等额分配，各自复利
    const end = per.reduce((sum, p) => sum + stake * p.mult, 0);
    const benchAll = per.every((p) => p.bench != null)
      ? per.reduce((sum, p) => sum + stake * (p.bench as number), 0)
      : null;
    return { per, end, benchAll, from: per.map((p) => p.window!.from).sort()[0], to: per.map((p) => p.window!.to).sort().slice(-1)[0] };
  }, [rows, picked, start, amount]);

  const money = (n: number) =>
    n.toLocaleString(zh ? 'zh-CN' : 'en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const pct = (n: number) => `${n > 0 ? '+' : ''}${(n * 100).toFixed(1)}%`;

  function toggle(slug: string) {
    setPicked((p) => (p.includes(slug) ? p.filter((x) => x !== slug) : [...p, slug]));
    try {
      (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.('event', 'tool_click', {
        location: 'homework_calc',
        label: slug,
      });
    } catch {
      /* 统计失败不影响工具 */
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* 剪贴板不可用 */
    }
  }

  return (
    <section className="mt-8 rounded-2xl border border-accent/25 bg-accent/5 p-5 sm:p-6">
      <h2 className="text-lg font-bold text-white">{t.calcTitle[locale]}</h2>
      <p className="mt-1 text-sm text-slate-400">{t.calcIntro[locale]}</p>

      <div className="mt-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.calcWho[locale]}</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {rows.map((r) => {
            const on = picked.includes(r.slug);
            return (
              <button
                key={r.slug}
                type="button"
                onClick={() => toggle(r.slug)}
                aria-pressed={on}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                  on
                    ? 'border-accent bg-accent text-ink-950'
                    : 'border-white/15 bg-white/5 text-slate-300 hover:border-accent/50 hover:text-white'
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-5">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.calcFrom[locale]}</span>
          <select
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="rounded-lg border border-white/15 bg-ink-900 px-3 py-2 text-sm text-white"
          >
            {starts.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.calcAmount[locale]}</span>
          <input
            type="number"
            min={1}
            step={1000}
            value={amount}
            onChange={(e) => setAmount(Math.max(1, Math.min(100_000_000, Number(e.target.value) || 0)))}
            className="w-40 rounded-lg border border-white/15 bg-ink-900 px-3 py-2 text-sm tabular-nums text-white"
          />
        </label>
      </div>

      {!result ? (
        <p className="mt-5 text-sm text-slate-400">{t.calcEmpty[locale]}</p>
      ) : (
        <div className="mt-6">
          <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
            <div>
              <span className="block text-xs uppercase tracking-wide text-slate-500">{t.calcEnd[locale]}</span>
              <span
                className={`text-3xl font-bold tabular-nums ${
                  result.end >= amount ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {money(result.end)}
              </span>
              <span className="ml-2 text-sm tabular-nums text-slate-400">{pct(result.end / amount - 1)}</span>
            </div>
            {result.benchAll != null && (
              <div>
                <span className="block text-xs uppercase tracking-wide text-slate-500">{t.calcBench[locale]}</span>
                <span className="text-xl font-semibold tabular-nums text-slate-300">{money(result.benchAll)}</span>
                <span className="ml-2 text-sm tabular-nums text-slate-500">
                  {pct(result.benchAll / amount - 1)}
                </span>
              </div>
            )}
          </div>

          {result.benchAll != null && (
            <p className="mt-3 text-sm text-slate-300">
              {t.calcVs[locale]
                .replace('{diff}', money(Math.abs(result.end - result.benchAll)))
                .replace('{word}', result.end >= result.benchAll ? t.calcMore[locale] : t.calcLess[locale])
                .replace('{from}', result.from)
                .replace('{to}', result.to)}
            </p>
          )}

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[420px] text-xs tabular-nums">
              <thead>
                <tr className="border-b border-white/10 text-left text-slate-500">
                  <th className="py-2 pr-4 font-medium">{t.thInvestor[locale]}</th>
                  <th className="py-2 pr-4 text-right font-medium">{t.thQuarters[locale]}</th>
                  <th className="py-2 pr-4 text-right font-medium">{t.thReturn[locale]}</th>
                  <th className="py-2 text-right font-medium">{t.thBench[locale]}</th>
                </tr>
              </thead>
              <tbody>
                {result.per.map((p) => (
                  <tr key={p.slug} className="border-b border-white/5">
                    <td className="py-2 pr-4 text-slate-200">{p.label}</td>
                    <td className="py-2 pr-4 text-right text-slate-400">{p.legs.length}</td>
                    <td
                      className={`py-2 pr-4 text-right font-semibold ${
                        p.mult >= 1 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {pct(p.mult - 1)}
                    </td>
                    <td className="py-2 text-right text-slate-500">{p.bench == null ? '—' : pct(p.bench - 1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 绑定 = 这个工具唯一能兑现的「订阅」。邮件发不出去(没有 ESP 密钥),
              Telegram 能发,所以承诺只写在这条路径上。文案只答应 bot 那边
              notifyHomework() 真的会做的事:下一次 13F 落地、成绩单重算时的一条消息。 */}
          {(() => {
            const codes = result.per.map((p) => CODE[p.slug]).filter(Boolean);
            const payload = `h_${codes.join('-')}_${start.replace(/-/g, '')}`;
            if (codes.length !== result.per.length) return null;
            return (
              <div className="mt-5 rounded-xl border border-white/10 bg-ink-900/50 p-4">
                {payload.length <= TG_MAX ? (
                  <>
                    <a
                      href={`https://t.me/sunwatchBot?start=${payload}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        try {
                          (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.('event', 'tool_click', {
                            location: 'homework_tg_watch',
                            label: codes.join('-'),
                          });
                        } catch {
                          /* 统计失败不影响绑定 */
                        }
                      }}
                      className="btn-primary"
                    >
                      {t.tgBtn[locale]}
                    </a>
                    <p className="mt-3 text-xs leading-relaxed text-slate-400">{t.tgNote[locale]}</p>
                  </>
                ) : (
                  <p className="text-xs leading-relaxed text-slate-400">{t.tgLong[locale]}</p>
                )}
              </div>
            );
          })()}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button type="button" onClick={copyLink} className="pill transition hover:border-accent/50 hover:text-white">
              {copied ? dict.share.copied[locale] : t.calcShare[locale]}
            </button>
            <span className="text-xs text-slate-500">
              {dict.labels.asOf[locale]} {asOf}
            </span>
          </div>
        </div>
      )}

      <p className="mt-5 text-xs leading-relaxed text-slate-500">{t.calcFine[locale]}</p>
    </section>
  );
}
