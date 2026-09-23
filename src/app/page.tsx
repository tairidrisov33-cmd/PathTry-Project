'use client';

import Link from 'next/link';
import { professions } from '@/data/professions';
import { professionRu, ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import TransitionLink from '@/components/TransitionLink';
import ProfessionExplorer from '@/components/ProfessionExplorer';
import Icon, { professionColors, professionIcons } from '@/components/Icon';
import HeroArt from '@/components/HeroArt';

// Words wrapped in *asterisks* get the accent highlight; each word rises in on its own beat.
function HeroTitle({ title }: { title: string }) {
  const words = title.split(/(\*[^*]+\*)/).filter(Boolean).flatMap((part) => part.startsWith('*') ? [{ word: part.slice(1, -1), accent: true }] : part.trim().split(/\s+/).filter(Boolean).map((word) => ({ word, accent: false })));
  return <h1 aria-label={title.replace(/\*/g, '')}>{words.map((item, index) => <span className={`hero-word ${item.accent ? 'is-accent' : ''}`} aria-hidden="true" style={{ '--w': index } as React.CSSProperties} key={index}>{item.accent ? <><span className="hero-accent-text">{item.word}</span><svg className="hero-underline" viewBox="0 0 300 20" preserveAspectRatio="none"><path d="M4 14 C 70 4, 180 2, 296 10" pathLength={1} /></svg></> : item.word}</span>).flatMap((word, index) => index ? [' ', word] : [word])}</h1>;
}

export default function Home() {
  const { language } = useLanguage();
  const text = ui[language];
  const featuredProfession = professions[0];
  const featured = language === 'ru' ? professionRu[featuredProfession.slug].title : featuredProfession.title;
  const steps = [{ icon: 'target', title: text.pick, body: text.pickText }, { icon: 'puzzle', title: text.work, body: text.workText }, { icon: 'eye', title: text.notice, body: text.noticeText }] as const;
  return <main>
    <section className="hero">
      <div className="hero-copy">
        <div className="kicker"><span className="kicker-dot" />{text.kicker}</div>
        <HeroTitle title={text.heroTitle} key={language} />
        <p>{text.heroText}</p>
        <Link className="btn btn-primary" href="#professions">{text.explore} <Icon name="arrowDown" size={17} className="bounce-y" /></Link>
        <TransitionLink className="featured-inline" href={`/try/${featuredProfession.slug}`}>
          <span className="featured-icon" style={{ background: professionColors[featuredProfession.color] }}><Icon name={professionIcons[featuredProfession.slug]} size={20} /></span>
          <span className="featured-body"><span className="featured-badge">{text.featured}</span><strong>{text.todays}</strong><span>{text.could}</span><small>{featured} · 5 {text.tasksShort} <b>{text.tryIt} <Icon name="arrowUpRight" size={13} /></b></small></span>
        </TransitionLink>
      </div>
      <HeroArt language={language} timer={text.heroTimer} taskLabel={(step) => language === 'ru' ? `Задание ${step} из 5` : `Task ${step} of 5`} />
    </section>
    <section className="section" data-reveal><div className="section-head"><div><div className="kicker">{text.howKicker}</div><h2>{text.howTitle}</h2></div><span className="muted">{text.built}</span></div><div className="steps">{steps.map((step, index) => <div className="step" key={step.title}><div className="step-top"><span className="step-num">0{index + 1}</span><span className="step-icon"><Icon name={step.icon} size={20} /></span></div><h3>{step.title}</h3><p>{step.body}</p></div>)}</div></section>
    <section className="section" id="professions" data-reveal><div className="section-head"><div><div className="kicker">{text.choose}</div><h2>{text.paths}</h2></div><span className="muted">{text.count}</span></div><ProfessionExplorer professions={professions} /></section>
    <section className="method-section" data-reveal><div><div className="kicker">{text.methodKicker}</div><h2>{text.methodTitle}</h2></div><div><p>{text.methodText}</p><p className="method-note"><Icon name="shield" size={15} />{text.methodNote}</p><div className="source-links"><a href="https://www.onetonline.org/" target="_blank" rel="noreferrer">O*NET OnLine <Icon name="arrowUpRight" size={13} /></a><a href="https://esco.ec.europa.eu/" target="_blank" rel="noreferrer">European ESCO <Icon name="arrowUpRight" size={13} /></a></div></div></section>
  </main>;
}
