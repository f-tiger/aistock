import dict from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';

export default function AsOfBadge({ asOf, locale }: { asOf: string; locale: Locale }) {
  return (
    <span className="pill" title={dict.disclaimer.short[locale]}>
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
      {dict.labels.asOf[locale]}: {asOf}
    </span>
  );
}
