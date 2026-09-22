import type { Metadata } from 'next';
import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';

export const metadata: Metadata = { title: 'PathTry — Try a profession before you choose it', description: 'A 10-minute reality check for your future path.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><script dangerouslySetInnerHTML={{ __html: `try { const saved = localStorage.getItem('pathtry-theme'); const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches; if (dark) document.documentElement.classList.add('dark'); } catch {}` }} /></head><body><header className="site-header"><a className="logo" href="/">path<span>try</span></a><div className="header-tools"><span className="header-note">A little clarity, before a big decision</span><ThemeToggle /></div></header>{children}<footer className="footer"><span className="logo">path<span>try</span></span><span>Made for curious minds everywhere.</span></footer></body></html>;
}
