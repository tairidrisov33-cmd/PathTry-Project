'use client';

import Link from 'next/link';
import { professions } from '@/data/professions';
import { professionRu, ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import TransitionLink from '@/components/TransitionLink';
import ProfessionExplorer from '@/components/ProfessionExplorer';

export default function Home() {
  const { language } = useLanguage();
  const text = ui[language];
  const featured = language === 'ru' ? professionRu[professions[0].slug].title : professions[0].title;
  return <main>
    <section className="hero"><div><div className="kicker">{text.kicker}</div><h1>{text.heroTitle}</h1><p>{text.heroText}</p><Link className="btn btn-primary" href="#professions">{text.explore} <span>↓</span></Link><TransitionLink className="featured-inline" href={`/try/${professions[0].slug}`}><span className="featured-badge">{text.featured}</span><strong>{text.todays}</strong><span>{text.could}</span><small>{featured} · 5 {language === 'ru' ? 'заданий' : 'tasks'} <b>{text.tryIt} ↗</b></small></TransitionLink></div><div className="hero-art"><div className="orbit" /></div></section>
    <section className="section"><div className="section-head"><div><div className="kicker">{text.howKicker}</div><h2>{text.howTitle}</h2></div><span className="muted">{text.built}</span></div><div className="steps"><div className="step"><span className="step-num">01</span><h3>{text.pick}</h3><p>{text.pickText}</p></div><div className="step"><span className="step-num">02</span><h3>{text.work}</h3><p>{text.workText}</p></div><div className="step"><span className="step-num">03</span><h3>{text.notice}</h3><p>{text.noticeText}</p></div></div></section>
    <section className="section" id="professions"><div className="section-head"><div><div className="kicker">{text.choose}</div><h2>{text.paths}</h2></div><span className="muted">{text.count}</span></div><ProfessionExplorer professions={professions} /></section>
    <section className="method-section"><div><div className="kicker">{text.methodKicker}</div><h2>{text.methodTitle}</h2></div><div><p>{text.methodText}</p><p className="method-note">{text.methodNote}</p><div className="source-links"><a href="https://www.onetonline.org/" target="_blank" rel="noreferrer">O*NET OnLine ↗</a><a href="https://esco.ec.europa.eu/" target="_blank" rel="noreferrer">European ESCO ↗</a></div></div></section>
  </main>;
}
