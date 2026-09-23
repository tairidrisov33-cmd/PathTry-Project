import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  // Result pages are personal snapshots, so they stay out of search results.
  return { rules: { userAgent: '*', allow: '/', disallow: '/result/' }, sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
