'use client';

import { useEffect } from 'react';
import type { Locale } from '@/lib/i18n/config';

/** Keeps <html lang> in sync with the active locale (root layout defaults to zh). */
export default function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
