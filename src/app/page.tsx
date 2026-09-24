'use client';

import Link from 'next/link';
import { FEATURED_SLUG, getProfession, professions, TOTAL_TASKS } from '@/data/professions';
import { ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import TransitionLink from '@/components/TransitionLink';
import ProfessionExplorer from '@/components/ProfessionExplorer';
import LeadCapture from '@/components/LeadCapture';
import Icon, { professionColors, professionIcons, type IconName } from '@/components/Icon';
import HeroArt from '@/components/HeroArt';
import { Comparison, ValidationSection, WhyItMatters } from '@/components/EvidenceSections';

const STRUCTURED_DATA = JSON.stringify([
  { '@context': 'https://schema.org', '@type': 'WebSite', name: 'PathTry', alternateName: ['Path Try', 'pathtry.site'], url: 'https://pathtry.site/' },
  { '@context': 'https://schema.org', '@type': 'Organization', name: 'PathTry', url: 'https://pathtry.site/', logo: 'https://pathtry.site/icon-512.png' }
]);

// Words wrapped in *asterisks* get the accent highlight; each word rises in on its own beat.
function HeroTitle({ title }: { title: string }) {
  const words = title.split(/(\*[^*]+\*)/).filter(Boolean).flatMap((part) => part.startsWith('*') ? [{ word: part.slice(1, -1), accent: true }] : part.trim().split(/\s+/).filter(Boolean).map((word) => ({ word, accent: false })));
  return <h1 aria-label={title.replace(/\*/g, '')}>{words.map((item, index) => <span className={`hero-word ${item.accent ? 'is-accent' : ''}`} aria-hidden="true" style={{ '--w': index } as React.CSSProperties} key={index}>{item.accent ? <><span className="hero-accent-text">{item.word}</span><svg className="hero-underline" viewBox="0 0 300 20" preserveAspectRatio="none"><path d="M4 14 C 70 4, 180 2, 296 10" pathLength={1} /></svg></> : item.word}</span>).flatMap((word, index) => index ? [' ', word] : [word])}</h1>;
}

export default function Home() {
  const { language } = useLanguage();
  const text = ui[language];
  const ru = language === 'ru';
  const lang = ru ? 1 : 0;
  const featured = getProfession(FEATURED_SLUG)!;
  const steps = [{ icon: 'target', title: text.pick, body: text.pickText }, { icon: 'puzzle', title: text.work, body: text.workText }, { icon: 'eye', title: text.notice, body: text.noticeText }] as const;
  const stats: { icon: IconName; value: string; label: string }[] = [
    { icon: 'layers', value: String(professions.length), label: ru ? 'профессий в 4 сферах' : 'professions in 4 fields' },
    { icon: 'puzzle', value: String(TOTAL_TASKS), label: ru ? 'реальных рабочих задач' : 'real-world work tasks' },
    { icon: 'compassNav', value: 'AI', label: ru ? 'наставник PathFinder проверяет ответы' : 'mentor PathFinder reviews answers' },
    { icon: 'shield', value: 'O*NET · ESCO', label: ru ? 'международные стандарты профессий' : 'international occupation standards' }
  ];
  const partnerValue: { icon: IconName; title: string; body: string }[] = ru ? [
    { icon: 'chart', title: 'Аналитика интересов абитуриентов', body: 'Анонимная агрегированная статистика: какие профессии пробуют, где растёт интерес, какие задачи заряжают.' },
    { icon: 'users', title: 'Тёплые целевые лиды', body: 'Студенты, которые сами запросили дорожную карту по вашему направлению, — с согласием на контакт.' },
    { icon: 'puzzle', title: 'Брендированные эксперименты', body: 'Задания по вашим программам: абитуриент пробует профессию до подачи документов.' }
  ] : [
    { icon: 'chart', title: 'Applicant interest analytics', body: 'Anonymous, aggregated insight into which careers students try, where interest grows, and which tasks energise them.' },
    { icon: 'users', title: 'Warm, targeted leads', body: 'Students who asked for a roadmap in your field — with consent to be contacted.' },
    { icon: 'puzzle', title: 'Branded experiments', body: 'Tasks built around your programmes, so applicants try the career before they apply.' }
  ];

  return <main>
    {/* Site name and logo for search results (Google "site name" and knowledge panel). */}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: STRUCTURED_DATA }} />
    <section className="hero">
      <div className="hero-copy">
        <div className="kicker"><span className="kicker-dot" />{text.kicker}</div>
        <HeroTitle title={text.heroTitle} key={language} />
        <p>{text.heroText}</p>
        <div className="featured-hero" style={{ '--accent': professionColors[featured.color] } as React.CSSProperties}>
          <div className="featured-hero-top">
            <span className="featured-icon" style={{ background: professionColors[featured.color] }}><Icon name={professionIcons[featured.slug]} size={22} /></span>
            <div className="featured-hero-copy"><span className="featured-badge"><Icon name="flame" size={11} />{text.featured}</span><strong>{featured.title[lang]}</strong><small>{text.could}</small></div>
          </div>
          <div className="featured-hero-bottom">
            <span className="featured-meta"><span><Icon name="layers" size={14} />{featured.tasks.length} {text.tasksShort}</span><span><Icon name="clock" size={14} />{text.minutes}</span><span><Icon name="shield" size={14} />{ru ? 'без регистрации' : 'no sign-up'}</span></span>
            <TransitionLink className="btn btn-primary featured-cta" href={`/try/${featured.slug}`}>{text.tryIt}<Icon name="arrowRight" size={17} /></TransitionLink>
          </div>
        </div>
        <Link className="explore-link" href="#professions">{text.explore} ({professions.length}) <Icon name="arrowDown" size={15} className="bounce-y" /></Link>
      </div>
      <HeroArt language={language} timer={text.heroTimer} taskLabel={(step) => ru ? `Задание ${step} из 10` : `Task ${step} of 10`} />
    </section>
    <section className="stats-strip" aria-label={ru ? 'PathTry в цифрах' : 'PathTry at a glance'}>{stats.map((item) => <div className="stat" key={item.label}><span className="stat-icon"><Icon name={item.icon} size={18} /></span><div><strong>{item.value}</strong><span>{item.label}</span></div></div>)}</section>
    {/* Problem and method side by side, so the catalogue starts sooner. */}
    <div className="intro-pair">
    <WhyItMatters language={language} />
    <section className="section how-compact" data-reveal><div className="section-head"><div><div className="kicker">{text.howKicker}</div><h2>{text.howTitle}</h2></div><span className="muted">{text.built}</span></div><div className="steps">{steps.map((step, index) => <div className="step" key={step.title}><div className="step-top"><span className="step-num">0{index + 1}</span><span className="step-icon"><Icon name={step.icon} size={20} /></span></div><h3>{step.title}</h3><p>{step.body}</p></div>)}</div></section>
    </div>
    <Comparison language={language} />
    <section className="section" id="professions" data-reveal><div className="section-head"><div><div className="kicker">{text.choose}</div><h2>{text.paths}</h2></div><span className="muted">{text.count}</span></div><ProfessionExplorer /></section>
    <ValidationSection language={language} />
    <section className="section partners" id="partners" data-reveal>
      <div className="section-head"><div><div className="kicker">B2B · {ru ? 'Партнёрство' : 'Partnerships'}</div><h2>{ru ? 'Для вузов и EdTech' : 'For universities & EdTech'}</h2></div><span className="muted">{ru ? 'Модель монетизации PathTry' : 'How PathTry makes money'}</span></div>
      <div className="partner-grid">{partnerValue.map((item) => <div className="partner-card" key={item.title}><span className="step-icon"><Icon name={item.icon} size={20} /></span><h3>{item.title}</h3><p>{item.body}</p></div>)}</div>
      <Link className="schools-link" href="/schools"><Icon name="cap" size={16} />{ru ? 'Для школ: бесплатный урок профориентации на 45 минут, ссылка и QR-код для класса' : 'For schools: a free 45-minute career lesson with a class link and QR code'}<Icon name="arrowRight" size={15} /></Link>
      <LeadCapture language={language} type="partner" />
    </section>
    <section className="method-section" data-reveal><div><div className="kicker">{text.methodKicker}</div><h2>{text.methodTitle}</h2></div><div><p>{text.methodText}</p><p className="method-note"><Icon name="shield" size={15} />{text.methodNote}</p><div className="source-links"><a href="https://www.onetonline.org/" target="_blank" rel="noreferrer">O*NET OnLine <Icon name="arrowUpRight" size={13} /></a><a href="https://esco.ec.europa.eu/" target="_blank" rel="noreferrer">European ESCO <Icon name="arrowUpRight" size={13} /></a><a href="https://oecdedutoday.com/preparing-youth-for-work-what-works-career-guidance/" target="_blank" rel="noreferrer">OECD Career Readiness <Icon name="arrowUpRight" size={13} /></a><a href="https://dash.harvard.edu/entities/publication/73120378-9570-6bd4-e053-0100007fdf3b" target="_blank" rel="noreferrer">Harvard GSE · Pathways to Prosperity <Icon name="arrowUpRight" size={13} /></a></div></div></section>
  </main>;
}
