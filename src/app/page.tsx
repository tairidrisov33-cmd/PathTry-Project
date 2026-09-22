'use client';

import Link from 'next/link';
import { professions } from '@/data/professions';
import { professionRu, ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import TransitionLink from '@/components/TransitionLink';
import ProfessionExplorer from '@/components/ProfessionExplorer';
import Icon, { professionColors, professionIcons } from '@/components/Icon';

export default function Home() {
  const { language } = useLanguage();
  const text = ui[language];
  const featuredProfession = professions[0];
  const featured = language === 'ru' ? professionRu[featuredProfession.slug].title : featuredProfession.title;
  const steps = [{ icon: 'target', title: text.pick, body: text.pickText }, { icon: 'puzzle', title: text.work, body: text.workText }, { icon: 'eye', title: text.notice, body: text.noticeText }] as const;
  return <main>
    <section className="hero">
      <div>
        <div className="kicker"><span className="kicker-dot" />{text.kicker}</div>
        <h1>{text.heroTitle}</h1>
        <p>{text.heroText}</p>
        <Link className="btn btn-primary" href="#professions">{text.explore} <Icon name="arrowDown" size={17} className="bounce-y" /></Link>
        <TransitionLink className="featured-inline" href={`/try/${featuredProfession.slug}`}>
          <span className="featured-icon" style={{ background: professionColors[featuredProfession.color] }}><Icon name={professionIcons[featuredProfession.slug]} size={20} /></span>
          <span className="featured-body"><span className="featured-badge">{text.featured}</span><strong>{text.todays}</strong><span>{text.could}</span><small>{featured} · 5 {text.tasksShort} <b>{text.tryIt} <Icon name="arrowUpRight" size={13} /></b></small></span>
        </TransitionLink>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="hero-grid" />
        <div className="hero-orbit">{professions.map((profession, index) => <span className="orbit-chip" key={profession.slug} style={{ '--i': index, '--n': professions.length, '--c': professionColors[profession.color] } as React.CSSProperties}><Icon name={professionIcons[profession.slug]} size={17} /></span>)}</div>
        <div className="hero-timer"><Icon name="clock" size={16} />{text.heroTimer}</div>
        <div className="hero-mock">
          <div className="hero-mock-head"><span>{text.heroTask}</span><span className="hero-mock-dots"><i className="on" /><i className="on" /><i /><i /><i /></span></div>
          <strong>{text.heroPrompt}</strong>
          <div className="hero-mock-option"><span>{text.heroOptionA}</span></div>
          <div className="hero-mock-option is-correct"><span>{text.heroOptionB}</span><Icon name="check" size={14} strokeWidth={2.6} /></div>
          <div className="hero-mock-foot"><Icon name="sparkle" size={14} />{text.strong}</div>
        </div>
        <div className="hero-stat"><Icon name="layers" size={18} /><span><b>{text.heroStat}</b><small>{text.heroStatText}</small></span></div>
      </div>
    </section>
    <section className="section"><div className="section-head"><div><div className="kicker">{text.howKicker}</div><h2>{text.howTitle}</h2></div><span className="muted">{text.built}</span></div><div className="steps">{steps.map((step, index) => <div className="step" key={step.title}><div className="step-top"><span className="step-num">0{index + 1}</span><span className="step-icon"><Icon name={step.icon} size={20} /></span></div><h3>{step.title}</h3><p>{step.body}</p></div>)}</div></section>
    <section className="section" id="professions"><div className="section-head"><div><div className="kicker">{text.choose}</div><h2>{text.paths}</h2></div><span className="muted">{text.count}</span></div><ProfessionExplorer professions={professions} /></section>
    <section className="method-section"><div><div className="kicker">{text.methodKicker}</div><h2>{text.methodTitle}</h2></div><div><p>{text.methodText}</p><p className="method-note"><Icon name="shield" size={15} />{text.methodNote}</p><div className="source-links"><a href="https://www.onetonline.org/" target="_blank" rel="noreferrer">O*NET OnLine <Icon name="arrowUpRight" size={13} /></a><a href="https://esco.ec.europa.eu/" target="_blank" rel="noreferrer">European ESCO <Icon name="arrowUpRight" size={13} /></a></div></div></section>
  </main>;
}
