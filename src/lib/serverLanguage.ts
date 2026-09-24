import { cookies, headers } from 'next/headers';
import type { Language } from '@/data/translations';

export const LANGUAGE_COOKIE = 'pathtry-language';

// The saved choice wins; first-time visitors get the language of their browser.
export async function serverLanguage(): Promise<Language> {
  const saved = (await cookies()).get(LANGUAGE_COOKIE)?.value;
  if (saved === 'ru' || saved === 'en') return saved;
  const request = await headers();
  // Bare URLs are declared as the English versions (hreflang), so crawlers always get English there.
  if (/bot|crawl|spider|slurp|yandex|bing|google/i.test(request.get('user-agent') ?? '')) return 'en';
  const accept = request.get('accept-language')?.toLowerCase() ?? '';
  return /^(ru|uk|be|kk|ky|uz)\b/.test(accept) ? 'ru' : 'en';
}
