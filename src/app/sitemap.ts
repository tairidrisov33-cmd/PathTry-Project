import type { MetadataRoute } from 'next';
import { professions } from '@/data/professions';
import { HOME_URLS, SITE_LANGUAGES, SITE_URL } from '@/lib/seo';

// One entry per language version (each is its own canonical URL), cross-linked with hreflang.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = (path: string) => Object.fromEntries(SITE_LANGUAGES.map((language) => [language, `${SITE_URL}${path}?lang=${language}`]));
  const entries = (path: string, priority: number): MetadataRoute.Sitemap => SITE_LANGUAGES.map((language) => ({
    url: `${SITE_URL}${path}?lang=${language}`, changeFrequency: 'weekly', priority, alternates: { languages: languages(path) }
  }));
  const home: MetadataRoute.Sitemap = SITE_LANGUAGES.map((language) => ({ url: HOME_URLS[language], changeFrequency: 'weekly', priority: 1, alternates: { languages: { en: HOME_URLS.en, ru: HOME_URLS.ru } } }));
  return [...home,...entries('/about', 0.6), ...entries('/schools', 0.7), ...professions.flatMap((profession) => entries(`/try/${profession.slug}`, 0.8))];
}
