import type { Locale } from '@/lib/i18n/config';
import type { Principle } from '@/lib/data/types';

export default function PrincipleCard({
  principle,
  index,
  locale,
}: {
  principle: Principle;
  index: number;
  locale: Locale;
}) {
  return (
    <div className="card">
      <div className="flex items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/15 font-mono text-sm font-bold text-accent">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <h3 className="text-base font-bold text-white">{principle.title[locale]}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{principle.body[locale]}</p>
          <p className="mt-3 rounded-lg border-l-2 border-accent/50 bg-accent/5 px-3 py-2 text-sm text-accent-soft">
            <span className="font-semibold">AI · </span>
            {principle.aiAngle[locale]}
          </p>
        </div>
      </div>
    </div>
  );
}
