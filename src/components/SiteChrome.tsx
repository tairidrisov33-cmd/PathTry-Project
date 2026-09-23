'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import AssistantWidget from '@/components/AssistantWidget';
import Icon from '@/components/Icon';

// Surfaces that get a cursor-following glow.
export const GITHUB_URL = 'https://github.com/tairidrisov33-cmd/VentureHack-Project1.0';

const SPOTLIGHT ='.profession-card, .featured-inline, .option, .dashboard-panel, .recap-list li';

function LogoMark() {
  return <span className="logo-mark" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="18" r="2" /><path d="M8 18h7a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h7" /><path d="m15 1.5 2.5 2.5L15 6.5" /></svg></span>;
}

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const { language } = useLanguage();
  const text = ui[language];
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current?.style.setProperty('--scroll', String(max > 0 ? Math.min(1, window.scrollY / max) : 0));
      headerRef.current?.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, []);

  // Sections marked data-reveal play their entrance only once they scroll into view.
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)');
    if (!('IntersectionObserver' in window)) { targets.forEach((el) => el.classList.add('is-in')); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    }), { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    // Coalesce pointer events to one style write per frame.
    let frame = 0, last: PointerEvent | null = null;
    const apply = () => {
      frame = 0;
      const surface = (last?.target as HTMLElement | null)?.closest?.<HTMLElement>(SPOTLIGHT);
      if (!surface || !last) return;
      const rect = surface.getBoundingClientRect();
      surface.style.setProperty('--mx', `${last.clientX - rect.left}px`);
      surface.style.setProperty('--my', `${last.clientY - rect.top}px`);
    };
    const onMove = (event: PointerEvent) => { last = event; if (!frame) frame = requestAnimationFrame(apply); };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => { document.removeEventListener('pointermove', onMove); cancelAnimationFrame(frame); };
  }, []);

  return <>
    <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
    <div className="header-shell" ref={headerRef}><header className="site-header"><a className="logo" href="/"><LogoMark />path<span>try</span></a><div className="header-tools"><span className="header-note">{text.headerNote}</span><LanguageToggle /><ThemeToggle /></div></header></div>
    {children}
    <footer className="footer"><div className="footer-brand"><span className="logo"><LogoMark />path<span>try</span></span><span>{text.footer}</span><nav className="footer-nav" aria-label={language === 'ru' ? 'Ссылки' : 'Links'}><a className="footer-link" href="/about"><Icon name="book" size={14} />{language === 'ru' ? 'О проекте' : 'About'}</a><a className="footer-link" href="/#partners"><Icon name="building" size={14} />{language === 'ru' ? 'Для вузов и EdTech' : 'For universities & EdTech'}</a><a className="footer-link" href={GITHUB_URL} target="_blank" rel="noreferrer"><Icon name="code" size={14} />GitHub</a></nav></div><button className="to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Icon name="arrowUp" size={15} />{language === 'ru' ? 'Наверх' : 'Back to top'}</button></footer>
    <AssistantWidget />
  </>;
}
