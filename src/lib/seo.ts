import type { Metadata } from 'next';

export const SITE_URL = 'https://pathtry.site';

// Pages that set their own openGraph object list the shared preview image explicitly.
export const OG_IMAGE = { url: '/opengraph-image', width: 1200, height: 630, alt: 'PathTry — Try a profession in 10 minutes before you choose it' };

// One URL per page; ?lang= pins the language for crawlers and shared links (see middleware.ts).
export function pageAlternates(path: string): Metadata['alternates'] {
  return { canonical: path, languages: { en: `${path}?lang=en`, ru: `${path}?lang=ru`, 'x-default': path } };
}
