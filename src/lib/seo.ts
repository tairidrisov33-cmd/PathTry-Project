import type { Metadata } from 'next';
import type { Language } from '@/data/translations';

export const SITE_URL = 'https://pathtry.site';
export const SITE_LANGUAGES: Language[] = ['en', 'ru'];

// Pages that set their own openGraph object list the shared preview image explicitly.
export const OG_IMAGE = { url: '/opengraph-image', width: 1200, height: 630, alt: 'PathTry — Try a profession in 10 minutes before you choose it' };

// Each language version is its own canonical URL (?lang= pins the language, see middleware.ts),
// linked to the others with hreflang; the bare path is the x-default.
export function pageAlternates(path: string, language: Language): Metadata['alternates'] {
  return {
    canonical: `${path}?lang=${language}`,
    languages: { ...Object.fromEntries(SITE_LANGUAGES.map((item) => [item, `${path}?lang=${item}`])), 'x-default': path }
  };
}
