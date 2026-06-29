import { notFound } from 'next/navigation';
import { locales, isLocale, type Locale } from '@/lib/i18n/config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HtmlLang from '@/components/HtmlLang';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;

  return (
    <div className="flex min-h-screen flex-col">
      <HtmlLang locale={loc} />
      <Navbar locale={loc} />
      <main className="flex-1">{children}</main>
      <Footer locale={loc} />
    </div>
  );
}
