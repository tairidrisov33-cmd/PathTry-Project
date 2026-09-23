import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import SiteChrome from '@/components/SiteChrome';
import { serverLanguage } from '@/lib/serverLanguage';

export async function generateMetadata(): Promise<Metadata> {
  const ru = (await serverLanguage()) === 'ru';
  return ru
    ? { title: 'PathTry — попробуй профессию до того, как выбрать её', description: '10 реальных рабочих задач за 10 минут и AI-наставник PathFinder: пойми, подходит ли тебе профессия, до выбора специальности.' }
    : { title: 'PathTry — Try a profession before you choose it', description: 'Ten real-world tasks in ten minutes with an AI mentor: find out whether a career fits you before you choose a major.' };
}
export const viewport: Viewport = { themeColor: [{ media: '(prefers-color-scheme: light)', color: '#f7f8f3' }, { media: '(prefers-color-scheme: dark)', color: '#121917' }] };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Rendering in the visitor's language on the server avoids a flash of English on every page load.
  const language = await serverLanguage();
  return <html lang={language} data-language={language} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js'); try { if (localStorage.getItem('pathtry-theme') === 'dark') { document.documentElement.classList.add('dark'); document.documentElement.style.colorScheme = 'dark'; } } catch {}` }} /></head><body><LanguageProvider initialLanguage={language}><SiteChrome>{children}</SiteChrome></LanguageProvider><Analytics /></body></html>;
}
