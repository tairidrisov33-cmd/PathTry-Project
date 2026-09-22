import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'PathTry — Try a profession before you choose it', description: 'A 10-minute reality check for your future path.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><header className="site-header"><a className="logo" href="/">path<span>try</span></a><span className="header-note">A little clarity, before a big decision</span></header>{children}<footer className="footer"><span className="logo">path<span>try</span></span><span>Made for curious minds everywhere.</span></footer></body></html>;
}
