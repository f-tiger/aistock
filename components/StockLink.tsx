import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { hasStockPage } from '@/lib/data/stocks';

/**
 * Renders a ticker as a link to its detail page when one exists, otherwise as
 * plain text. Keeps tickers without a catalog page (e.g. holdings-only names)
 * from producing dead links.
 */
export default function StockLink({
  ticker,
  locale,
  className = '',
}: {
  ticker: string;
  locale: Locale;
  className?: string;
}) {
  if (!hasStockPage(ticker)) {
    return <span className={className}>{ticker}</span>;
  }
  return (
    <Link href={`/${locale}/stocks/${ticker}`} className={`hover:text-accent ${className}`}>
      {ticker}
    </Link>
  );
}
