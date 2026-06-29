import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import Disclaimer from './Disclaimer';

export default function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-20 border-t border-white/10 bg-ink-950/60">
      <div className="container-page space-y-6 py-10">
        <Disclaimer locale={locale} variant="long" />
        <div className="flex flex-col items-start justify-between gap-3 text-sm text-slate-400 sm:flex-row sm:items-center">
          <div>
            <span className="font-semibold text-slate-200">{dict.brand[locale]}</span>
            <span className="mx-2 text-slate-600">·</span>
            <span>{dict.tagline[locale]}</span>
          </div>
          <div className="text-slate-500">
            {locale === 'zh'
              ? '© 2026 AI 投资罗盘 · 开源教育项目'
              : '© 2026 AI Investing Compass · Open-source education project'}
          </div>
        </div>
      </div>
    </footer>
  );
}
