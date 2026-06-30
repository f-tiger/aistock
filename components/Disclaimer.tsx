import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';

export default function Disclaimer({
  locale,
  variant = 'short',
}: {
  locale: Locale;
  variant?: 'short' | 'long';
}) {
  const text = variant === 'long' ? dict.disclaimer.long[locale] : dict.disclaimer.short[locale];
  return (
    <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm text-amber-200/90">
      <span className="mr-1 font-semibold">⚠ {locale === 'zh' ? '免责声明' : 'Disclaimer'}:</span>
      {text}
    </div>
  );
}
