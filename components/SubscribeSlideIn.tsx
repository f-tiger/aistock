'use client';

// 订阅滑入（2026-08-16,popups 技能规范):
// - 触发:滚动 50%(先有内容参与,再谈订阅——技能明确反对开屏弹脸)
// - 形态:底部滑入,不遮内容,不做全屏(Google 移动端插页惩罚)
// - 频控:localStorage 关闭=30 天不弹;订阅成功=永不再弹
// - 承诺与页面上下文一致:13F 读者 → 「下一季申报落地、本页变动时来一封信」。
//   地址第一方落 agiscorecard.com D1(与主站同一张 subscribers 表,location 区分),
//   邮件兑现路径=主站 CLAUDE.md 的翻转日/季度邮件包流程——先有兑现路径才有这句文案。
// - 事件走主站 /api/e(slidein_show/dismiss + sub_submit/ok/fail,location:compass_popup),
//   no-cors 文本体投递,不需要读响应。
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/i18n/config';

const KEY = 'compass-sub-slidein';
const API = 'https://agiscorecard.com';

function beacon(name: string, label?: string) {
  try {
    void fetch(API + '/api/e', {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      body: JSON.stringify({ n: name, l: 'compass_popup', b: label || null, p: location.pathname, u: '', r: document.referrer || null, g: navigator.language || null }),
    });
  } catch { /* analytics must never break the page */ }
}

export default function SubscribeSlideIn({ locale }: { locale: Locale }) {
  const zh = locale === 'zh';
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<'idle' | 'busy' | 'ok' | 'fail'>('idle');
  const email = useRef<HTMLInputElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      if (s) {
        const { until, done } = JSON.parse(s);
        if (done || Date.now() < until) return;
      }
    } catch { /* first visit */ }
    const onScroll = () => {
      if (fired.current) return;
      const d = document.documentElement;
      const depth = (window.scrollY + window.innerHeight) / d.scrollHeight;
      if (depth >= 0.5) {
        fired.current = true;
        setOpen(true);
        beacon('slidein_show');
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!open) return null;

  const dismiss = () => {
    setOpen(false);
    beacon('slidein_dismiss');
    try { localStorage.setItem(KEY, JSON.stringify({ until: Date.now() + 30 * 864e5 })); } catch { /* private mode */ }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = email.current?.value.trim();
    if (!v || state === 'busy') return;
    setState('busy');
    beacon('sub_submit');
    try {
      const r = await fetch(API + '/api/sub', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ e: v, l: 'compass_popup', p: location.pathname, g: navigator.language || null }),
      });
      const d = await r.json();
      if (d.ok) {
        setState('ok');
        beacon('sub_ok');
        try { localStorage.setItem(KEY, JSON.stringify({ done: true })); } catch { /* private mode */ }
      } else { throw new Error('nok'); }
    } catch {
      setState('fail');
      beacon('sub_fail');
    }
  };

  return (
    <div
      role="dialog"
      aria-label={zh ? '订阅' : 'Subscribe'}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 shadow-[0_-4px_24px_rgba(15,23,42,0.08)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/95"
    >
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-3 px-4 py-3">
        {state === 'ok' ? (
          <p className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-100">
            {zh ? '✓ 已登记。下一季 13F 落地、本站持仓页变动时，你会收到一封信。' : '✓ You are on the list. When the next 13F filings land and these pages change, you get one email.'}
          </p>
        ) : (
          <>
            <div className="min-w-[200px] flex-1">
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {zh ? '下一季 13F 落地时通知我' : 'The next 13F drop, in one email'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {zh ? '大佬持仓变动季更一封，不发周报。只要邮箱，无需注册。' : 'One email per filing season when these positions change. No weekly newsletter, no account.'}
              </p>
            </div>
            <form onSubmit={submit} className="flex flex-wrap items-center gap-2">
              <input
                ref={email}
                type="email"
                required
                autoComplete="email"
                placeholder={zh ? '你的邮箱' : 'you@example.com'}
                aria-label="Email"
                className="w-44 rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-600 dark:border-slate-600 dark:text-white"
              />
              <button
                type="submit"
                disabled={state === 'busy'}
                className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-60"
              >
                {state === 'busy' ? '…' : zh ? '订阅' : 'Subscribe'}
              </button>
              {state === 'fail' && (
                <span className="text-xs text-red-600">{zh ? '没成功，再试一次？' : 'Did not go through — try again?'}</span>
              )}
            </form>
          </>
        )}
        <button
          onClick={dismiss}
          aria-label={zh ? '关闭' : 'Close'}
          className="ml-auto rounded p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
