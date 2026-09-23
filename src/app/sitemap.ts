import type { MetadataRoute } from 'next';
import { professions } from '@/data/professions';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`, changeFrequency: 'weekly', priority,
    alternates: { languages: { en: `${SITE_URL}${path}?lang=en`, ru: `${SITE_URL}${path}?lang=ru` } }
  });
  return [entry('/', 1), entry('/about', 0.6), ...professions.map((profession) => entry(`/try/${profession.slug}`, 0.8))];
}
