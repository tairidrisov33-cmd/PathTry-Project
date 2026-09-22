'use client';

import { ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const text = ui[language];
  return <><header className="site-header"><a className="logo" href="/">path<span>try</span></a><div className="header-tools"><span className="header-note">{text.headerNote}</span><LanguageToggle /><ThemeToggle /></div></header>{children}<footer className="footer"><span className="logo">path<span>try</span></span><span>{text.footer}</span></footer></>;
}
