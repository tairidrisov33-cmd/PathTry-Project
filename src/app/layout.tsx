import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import SiteChrome from '@/components/SiteChrome';

export const metadata: Metadata = { title: 'PathTry — Try a profession before you choose it', description: 'A 10-minute reality check for your future path.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><script dangerouslySetInnerHTML={{ __html: `try { if (localStorage.getItem('pathtry-theme') === 'dark') document.documentElement.classList.add('dark'); } catch {}` }} /></head><body><LanguageProvider><SiteChrome>{children}</SiteChrome></LanguageProvider></body></html>;
}
