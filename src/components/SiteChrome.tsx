'use client';

import { useEffect, useRef } from 'react';
import { ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import AssistantWidget from '@/components/AssistantWidget';
import Icon from '@/components/Icon';

function LogoMark() {
  return <span className="logo-mark" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="18" r="2" /><path d="M8 18h7a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h7" /><path d="m15 1.5 2.5 2.5L15 6.5" /></svg></span>;
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const text = ui[language];
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current?.style.setProperty('--scroll', String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, []);

  return <>
    <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
    <header className="site-header"><a className="logo" href="/"><LogoMark />path<span>try</span></a><div className="header-tools"><span className="header-note">{text.headerNote}</span><LanguageToggle /><ThemeToggle /></div></header>
    {children}
    <footer className="footer"><div className="footer-brand"><span className="logo"><LogoMark />path<span>try</span></span><span>{text.footer}</span></div><button className="to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Icon name="arrowUp" size={15} />{language === 'ru' ? 'Наверх' : 'Back to top'}</button></footer>
    <AssistantWidget />
  </>;
}
