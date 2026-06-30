export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** A string available in both supported languages. */
export type Localized = { zh: string; en: string };

/** Resolve a Localized value for the active locale. */
export function t(value: Localized, locale: Locale): string {
  return value[locale];
}
