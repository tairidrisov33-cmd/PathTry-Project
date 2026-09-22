import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import SiteChrome from '@/components/SiteChrome';

export const metadata: Metadata = { title: 'PathTry — Try a profession before you choose it', description: 'A 10-minute reality check for your future path.' };
export const viewport: Viewport = { themeColor: [{ media: '(prefers-color-scheme: light)', color: '#f7f8f3' }, { media: '(prefers-color-scheme: dark)', color: '#121917' }] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `try { if (localStorage.getItem('pathtry-theme') === 'dark') { document.documentElement.classList.add('dark'); document.documentElement.style.colorScheme = 'dark'; } } catch {}` }} /></head><body><LanguageProvider><SiteChrome>{children}</SiteChrome></LanguageProvider></body></html>;
}
