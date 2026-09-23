import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import SiteChrome from '@/components/SiteChrome';
import { serverLanguage } from '@/lib/serverLanguage';
import { pageAlternates, SITE_URL } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const ru = (await serverLanguage()) === 'ru';
  const title = ru ? 'PathTry — попробуй профессию до того, как выбрать её' : 'PathTry — Try a profession before you choose it';
  const description = ru ? '10 реальных рабочих задач за 10 минут и AI-наставник PathFinder: пойми, подходит ли тебе профессия, до выбора специальности.' : 'Ten real-world tasks in ten minutes with an AI mentor: find out whether a career fits you before you choose a major.';
  return {
    metadataBase: new URL(SITE_URL),
    title, description,
    applicationName: 'PathTry',
    alternates: pageAlternates('/'),
    openGraph: { type: 'website', siteName: 'PathTry', title, description, url: '/', locale: ru ? 'ru_RU' : 'en_US', alternateLocale: ru ? 'en_US' : 'ru_RU' },
    twitter: { card: 'summary_large_image', title, description },
    // Ownership tags for Google Search Console and Yandex Webmaster (public by design; env vars override).
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION || 'XGqG-trItOiDPONPW3Ps94e12ogEqvPjBQKJbMqRkc8',
      yandex: process.env.YANDEX_VERIFICATION || undefined
    }
  };
}
export const viewport: Viewport = { themeColor: [{ media: '(prefers-color-scheme: light)', color: '#f7f8f3' }, { media: '(prefers-color-scheme: dark)', color: '#121917' }] };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Rendering in the visitor's language on the server avoids a flash of English on every page load.
  const language = await serverLanguage();
  return <html lang={language} data-language={language} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js'); try { if (localStorage.getItem('pathtry-theme') === 'dark') { document.documentElement.classList.add('dark'); document.documentElement.style.colorScheme = 'dark'; } } catch {}` }} /></head><body><LanguageProvider initialLanguage={language}><SiteChrome>{children}</SiteChrome></LanguageProvider><Analytics /></body></html>;
}
