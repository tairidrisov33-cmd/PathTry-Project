import type { Metadata } from 'next';
import type { Language } from '@/data/translations';

export const SITE_URL = 'https://pathtry.site';
export const SITE_LANGUAGES: Language[] = ['en', 'ru'];

// Pages that set their own openGraph object list the shared preview image explicitly.
export const OG_IMAGE = { url: '/opengraph-image', width: 1200, height: 630, alt: 'PathTry — Try a profession in 10 minutes before you choose it' };

// The home page is the exception: Next.js drops the query from a canonical of "/" (it keeps only the
// origin), so its links are rendered by the page itself. English lives at the bare domain, which is
// what search engines see as the site's home page; Russian at /?lang=ru.
export const HOME_URLS: Record<Language | 'x-default', string> = { en: `${SITE_URL}/`, ru: `${SITE_URL}/?lang=ru`, 'x-default': `${SITE_URL}/` };

// Each language version is its own canonical URL (?lang= pins the language, see middleware.ts),
// linked to the others with hreflang; the bare path is the x-default.
export function pageAlternates(path: string, language: Language): Metadata['alternates'] {
  return {
    canonical: `${path}?lang=${language}`,
    languages: { ...Object.fromEntries(SITE_LANGUAGES.map((item) => [item, `${path}?lang=${item}`])), 'x-default': path }
  };
}
