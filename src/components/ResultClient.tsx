'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Profession } from '@/data/professions';
import { professions } from '@/data/professions';
import TransitionLink from '@/components/TransitionLink';
import { professionRu, ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import { professionRuDetails } from '@/data/professionRuDetails';
import RadarSkillChart, { type SkillPoint } from '@/components/RadarSkillChart';
import VerificationCard from '@/components/VerificationCard';
import Icon, { professionColors, professionIcons, type IconName } from '@/components/Icon';
import CountUp from '@/components/CountUp';
import Confetti from '@/components/Confetti';

type SavedAnswer = { taskId?: string; choice?: number | null; score: number; enjoyment?: string; text?: string };

const enjoymentValues: Record<string, number> = { yes: 2, 'so-so': 1, no: 0, Да: 2, 'Так себе': 1, Нет: 0, Yes: 2, 'So-so': 1, No: 0 };
const enjoymentIcons: Record<number, IconName> = { 2: 'smile', 1: 'meh', 0: 'frown' };
const RING = 2 * Math.PI * 44;

export default function ResultClient({ profession }: { profession: Profession }) {
  const { language } = useLanguage();
  const text = ui[language];
  const ru = language === 'ru';
  const [result, setResult] = useState<{ score: number; enjoyment: number | null; ready: boolean }>({ score: 0, enjoyment: null, ready: false });
  const [showCard, setShowCard] = useState(false);
  const [answers, setAnswers] = useState<SavedAnswer[]>([]);
  const [celebrate, setCelebrate] = useState(false);
  const [printDate, setPrintDate] = useState('');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`pathtry-${profession.slug}`) || '{}');
      const stored: SavedAnswer[] = saved.answers || [];
      const score = stored.reduce((total, answer) => total + answer.score, 0);
      const rated = stored.filter((answer) => answer.enjoyment && enjoymentValues[answer.enjoyment] !== undefined);
      // Unrated tasks are left out entirely, so skipping the optional question never reads as "did not enjoy".
      const enjoyment = rated.length ? Math.round(rated.reduce((total, answer) => total + enjoymentValues[answer.enjoyment || ''], 0) / rated.length * 50) : null;
      setAnswers(stored); setResult({ score, enjoyment, ready: true });
      if (sessionStorage.getItem('pathtry-celebrate') === profession.slug) { sessionStorage.removeItem('pathtry-celebrate'); setCelebrate(true); }
    } catch { setResult((current) => ({ ...current, ready: true })); }
  }, [profession.slug]);

  // Set on the client only, so the prerendered page never hydrates with a stale date.
  useEffect(() => { setPrintDate(new Date().toLocaleDateString(ru ? 'ru-RU' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })); }, [ru]);

  const skills = useMemo<SkillPoint[]>(() => {
    const labels = ru ? ['Решение задач', 'Эмпатия и общение', 'Аналитика', 'Креативность и видение', 'Стрессоустойчивость'] : ['Problem Solving', 'Empathy & Communication', 'Analytical Thinking', 'Creativity & Vision', 'Stress Resilience'];
    const icons: IconName[] = ['puzzle', 'heart', 'chart', 'bulb', 'shield'];
    const values = [36, 36, 36, 36, 36];
    answers.forEach((answer, index) => {
      const task = profession.tasks.find((item) => item.id === answer.taskId) || profession.tasks[index];
      if (!task) return;
      const axis = index % 5;
      const enjoyment = answer.enjoyment === 'yes' || answer.enjoyment === 'Да' || answer.enjoyment === 'Yes' ? 8 : answer.enjoyment === 'so-so' || answer.enjoyment === 'Так себе' || answer.enjoyment === 'So-so' ? 4 : 0;
      const textQuality = (answer.text?.length || 0) >= 40 ? 10 : (answer.text?.length || 0) >= 20 ? 7 : 3;
      const choiceSignal = answer.choice !== null && answer.choice !== undefined && task.answer !== undefined ? Math.max(0, 5 - Math.abs(answer.choice - task.answer) * 2) : textQuality;
      values[axis] += answer.score * 13 + enjoyment + choiceSignal;
      values[(axis + 1) % 5] += Math.round((answer.score * 5 + textQuality) / 2);
    });
    return labels.map((label, index) => ({ label, icon: icons[index], value: Math.min(98, Math.round(values[index])) }));
  }, [answers, profession.tasks, ru]);

  const strongest = skills.reduce((best, current) => current.value > best.value ? current : best, skills[0]);
  const skillAverage = skills.reduce((total, skill) => total + skill.value, 0) / skills.length;
  const match = Math.min(98, Math.max(42, Math.round(result.enjoyment === null ? skillAverage : skillAverage * .72 + result.enjoyment * .28)));
  const currentIndex = professions.findIndex((item) => item.slug === profession.slug);
  const alternative = professions[(currentIndex + 1) % professions.length];
  const alternativeTitle = ru ? professionRu[alternative.slug].title : alternative.title;
  const localized = ru ? professionRu[profession.slug] : profession;
  const details = ru ? professionRuDetails[profession.slug] : profession;
  const enjoyed = result.enjoyment;
  const verdictKey = result.score >= 4 && (enjoyed === null || enjoyed >= 65) ? 'good' : result.score >= 3 || (enjoyed !== null && enjoyed >= 40) ? 'explore' : 'probably';
  const verdict = { good: text.good, explore: text.exploreMore, probably: text.probably }[verdictKey];
  const reason = { good: text.goodReason, explore: text.exploreReason, probably: text.probablyReason }[verdictKey];
  const verdictIcon: IconName = { good: 'trophy', explore: 'route', probably: 'eye' }[verdictKey] as IconName;

  const recap = profession.tasks.map((task) => {
    const answer = answers.find((item) => item.taskId === task.id);
    const prompt = (ru ? professionRuDetails[profession.slug]?.tasks[task.id]?.prompt : undefined) || task.prompt;
    const feeling = answer?.enjoyment !== undefined ? enjoymentValues[answer.enjoyment] : undefined;
    const outcome = !answer ? null : task.type === 'choice' ? (answer.score ? text.strong : text.rethink) : (answer.score ? text.counted : text.tooShort);
    return { id: task.id, prompt, good: !!answer?.score, answered: !!answer, outcome, feeling };
  });

  const savePdf = () => {
    // The browser uses the document title as the default PDF file name.
    const previousTitle = document.title;
    document.title = `PathTry — ${localized.title}`;
    const restore = () => { document.title = previousTitle; window.removeEventListener('afterprint', restore); };
    window.addEventListener('afterprint', restore);
    window.print();
  };

  return <>
    <div className="print-header" aria-hidden="true"><span className="print-brand">path<span>try</span></span><span>{text.snapshot}{printDate && ` · ${printDate}`}</span></div>
    {celebrate && result.ready && <><Confetti /><div className="toast" role="status"><Icon name="sparkle" size={16} />{text.celebrate}</div></>}
    <TransitionLink className="back" href="/"><Icon name="arrowLeft" size={15} />{text.back}</TransitionLink>
    <div className="result-hero">
      <div><div className="result-title-row"><span className="try-icon" style={{ background: professionColors[profession.color] }}><Icon name={professionIcons[profession.slug]} size={26} /></span><div className="kicker">{text.snapshot}</div></div><h1>{localized.title}</h1><p className="muted">{text.resultText}</p></div>
      <div className={`score-card verdict-${verdictKey}`}>
        <div className="score-ring"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" className="ring-track" /><circle cx="50" cy="50" r="44" className="ring-fill" strokeDasharray={RING} strokeDashoffset={RING * (1 - result.score / 5)} /></svg><div><span className="score">{result.ready ? <CountUp value={result.score} duration={900} /> : 0}<small>/5</small></span><span className="score-label">{text.workScore}</span></div></div>
        <div className="score-body"><div className="verdict"><Icon name={verdictIcon} size={20} />{result.ready ? verdict : text.reading}</div><span className="score-reason">{reason}</span><div className="enjoy-meter"><span>{text.enjoyment}</span><span className="enjoy-meter-track"><span style={{ width: `${enjoyed ?? 0}%` }} /></span><b>{enjoyed === null ? '—' : `${enjoyed}%`}</b></div></div>
      </div>
    </div>
    <section className="dashboard-grid">
      <div className="dashboard-panel radar-panel"><div className="panel-kicker"><Icon name="target" size={14} />{ru ? 'Профиль навыков' : 'Your skill profile'}</div><h2>{ru ? 'Карта твоего рабочего стиля' : 'Your working style map'}</h2><RadarSkillChart skills={skills} strongest={strongest.label} /></div>
      <div className="dashboard-panel ai-breakdown"><div className="ai-orb"><Icon name="sparkle" size={22} /></div><div className="panel-kicker">AI CAREER BREAKDOWN</div><h2>{ru ? 'Разбор твоего эксперимента' : 'Your experiment, decoded'}</h2><div className="ai-thinking"><span /> <span /> <span /> <em>{ru ? 'Собираем сигналы из ответов' : 'Reading signals from your answers'}</em></div><div className="ai-stat"><span><Icon name={strongest.icon} size={14} />{ru ? 'Главная сильная сторона' : 'Strength highlight'}</span><strong>{ru ? `Твоя сильная сторона — ${strongest.label}.` : `Your strongest signal is ${strongest.label}.`}</strong></div><div className="ai-match"><strong><CountUp value={match} suffix="%" /></strong><span>{ru ? 'совпадение с рабочим стилем' : 'work style match'}</span></div><div className="match-bar"><span style={{ width: `${match}%` }} /></div><p className="ai-alternative"><Icon name="route" size={14} />{ru ? 'Если тебе понравился этот кейс, попробуй ещё: ' : 'If this case felt interesting, also try: '}<TransitionLink href={`/try/${alternative.slug}`}>{alternativeTitle} <Icon name="arrowUpRight" size={13} /></TransitionLink></p></div>
    </section>
    {answers.length > 0 && <section className="recap"><div className="recap-head"><h2><Icon name="flag" size={20} />{text.recap}</h2><span className="muted">{text.recapText}</span></div><ol className="recap-list">{recap.map((item, index) => <li className={item.answered ? (item.good ? 'is-good' : 'is-miss') : 'is-empty'} key={item.id} style={{ animationDelay: `${index * 70}ms` }}><span className="recap-num">{item.answered ? <Icon name={item.good ? 'check' : 'x'} size={13} strokeWidth={3} /> : index + 1}</span><span className="recap-prompt">{item.prompt}</span>{item.outcome && <span className="recap-outcome">{item.outcome}</span>}<span className={`recap-feel ${item.feeling === undefined ? 'none' : ''}`} title={item.feeling === undefined ? text.skipped : undefined}>{item.feeling === undefined ? '—' : <Icon name={enjoymentIcons[item.feeling]} size={17} />}</span></li>)}</ol></section>}
    <section className="result-section"><h2><span className="section-icon"><Icon name="book" size={18} /></span>{text.subjects}</h2><div><p className="muted">{text.foundations}</p><div className="tag-list">{[...details.subjects, ...details.exams].map((item) => <span className="tag" key={item}>{item}</span>)}</div></div></section>
    <section className="result-section"><h2><span className="section-icon"><Icon name="cap" size={18} /></span>{text.majors}</h2><div className="tag-list">{details.majors.map((major) => <span className="tag" key={major}>{major}</span>)}</div></section>
    <section className="result-section"><h2><span className="section-icon"><Icon name="route" size={18} /></span>{text.steps}</h2><ol className="next-list">{details.nextSteps.map((next) => <li key={next}>{next}</li>)}</ol></section>
    <div className="result-actions"><button className="btn btn-primary" type="button" onClick={() => setShowCard(true)}><Icon name="badge" size={17} />{ru ? 'Получить verification-карточку' : 'Get My Verification Card'}</button><TransitionLink className="btn btn-outline" href={`/try/${profession.slug}`}><Icon name="refresh" size={16} />{text.retake}</TransitionLink><TransitionLink className="btn btn-outline" href="/"><Icon name="grid" size={16} />{text.another}</TransitionLink><button className="btn btn-ghost" type="button" onClick={savePdf}><Icon name="printer" size={16} />{text.pdf}</button></div>
    {showCard && <VerificationCard profession={localized.title} match={match} strongest={strongest.label} skills={skills} language={language} onClose={() => setShowCard(false)} />}
  </>;
}
