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

type SavedAnswer = { taskId?: string; choice?: number | null; score: number; enjoyment?: string; text?: string };

export default function ResultClient({ profession }: { profession: Profession }) {
  const { language } = useLanguage();
  const text = ui[language];
  const ru = language === 'ru';
  const [result, setResult] = useState({ score: 0, enjoyment: 0, ready: false });
  const [showCard, setShowCard] = useState(false);
  const [answers, setAnswers] = useState<SavedAnswer[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`pathtry-${profession.slug}`) || '{}');
      const stored: SavedAnswer[] = saved.answers || [];
      const score = stored.reduce((total, answer) => total + answer.score, 0);
      const values: Record<string, number> = { yes: 2, 'so-so': 1, no: 0, Да: 2, 'Так себе': 1, Нет: 0, Yes: 2, 'So-so': 1, No: 0 };
      const enjoymentAnswers = stored.filter((answer) => answer.enjoyment && values[answer.enjoyment] !== undefined);
      const enjoyment = enjoymentAnswers.length ? Math.round(enjoymentAnswers.reduce((total, answer) => total + values[answer.enjoyment || ''], 0) / enjoymentAnswers.length * 50) : 0;
      setAnswers(stored); setResult({ score, enjoyment, ready: true });
    } catch { setResult((current) => ({ ...current, ready: true })); }
  }, [profession.slug]);

  const skills = useMemo<SkillPoint[]>(() => {
    const labels = ru ? ['Решение задач', 'Эмпатия и общение', 'Аналитика', 'Креативность и видение', 'Стрессоустойчивость'] : ['Problem Solving', 'Empathy & Communication', 'Analytical Thinking', 'Creativity & Vision', 'Stress Resilience'];
    const values = [36, 36, 36, 36, 36];
    answers.forEach((answer, index) => {
      const task = profession.tasks.find((item) => item.id === answer.taskId) || profession.tasks[index];
      const axis = index % 5;
      const enjoyment = answer.enjoyment === 'yes' || answer.enjoyment === 'Да' || answer.enjoyment === 'Yes' ? 8 : answer.enjoyment === 'so-so' || answer.enjoyment === 'Так себе' || answer.enjoyment === 'So-so' ? 4 : 0;
      const textQuality = (answer.text?.length || 0) >= 40 ? 10 : (answer.text?.length || 0) >= 20 ? 7 : 3;
      const choiceSignal = answer.choice !== null && answer.choice !== undefined && task.answer !== undefined ? Math.max(0, 5 - Math.abs(answer.choice - task.answer) * 2) : textQuality;
      values[axis] += answer.score * 13 + enjoyment + choiceSignal;
      values[(axis + 1) % 5] += Math.round((answer.score * 5 + textQuality) / 2);
    });
    return labels.map((label, index) => ({ label, value: Math.min(98, Math.round(values[index])) }));
  }, [answers, profession.tasks, ru]);

  const strongest = skills.reduce((best, current) => current.value > best.value ? current : best, skills[0]);
  const match = Math.min(98, Math.max(42, Math.round(skills.reduce((total, skill) => total + skill.value, 0) / skills.length * .72 + result.enjoyment * .28)));
  const currentIndex = professions.findIndex((item) => item.slug === profession.slug);
  const alternative = professions[(currentIndex + 1) % professions.length];
  const alternativeTitle = ru ? professionRu[alternative.slug].title : alternative.title;
  const localized = ru ? professionRu[profession.slug] : profession;
  const details = ru ? professionRuDetails[profession.slug] : profession;
  const verdict = result.score >= 4 && result.enjoyment >= 65 ? text.good : result.score >= 3 || result.enjoyment >= 40 ? text.exploreMore : text.probably;
  const reason = verdict === text.good ? text.goodReason : verdict === text.exploreMore ? text.exploreReason : text.probablyReason;

  return <>
    <TransitionLink className="back" href="/">← {text.back}</TransitionLink>
    <div className="result-hero"><div><div className="kicker">{text.snapshot}</div><h1>{localized.title}</h1><p className="muted">{text.resultText}</p></div><div className="score-card"><span className="muted">{text.workScore}</span><div className="score">{result.score}/5</div><div className="verdict">{result.ready ? verdict : text.reading}</div><span>{reason}</span><br /><span className="muted">{text.enjoyment}: {result.enjoyment}%</span></div></div>
    <section className="dashboard-grid"><div className="dashboard-panel radar-panel"><div className="panel-kicker">{ru ? 'Профиль навыков' : 'Your skill profile'}</div><h2>{ru ? 'Карта твоего рабочего стиля' : 'Your working style map'}</h2><RadarSkillChart skills={skills} /></div><div className="dashboard-panel ai-breakdown"><div className="ai-orb">✦</div><div className="panel-kicker">AI CAREER BREAKDOWN</div><h2>{ru ? 'Разбор твоего эксперимента' : 'Your experiment, decoded'}</h2><div className="ai-thinking"><span /> <span /> <span /> <em>{ru ? 'Собираем сигналы из ответов' : 'Reading signals from your answers'}</em></div><div className="ai-stat"><span>{ru ? 'Главная сильная сторона' : 'Strength highlight'}</span><strong>{ru ? `Твоя сильная сторона — ${strongest.label}.` : `Your strongest signal is ${strongest.label}.`}</strong></div><div className="ai-match"><strong>{match}%</strong><span>{ru ? 'совпадение с рабочим стилем' : 'work style match'}</span></div><p className="ai-alternative">{ru ? 'Если тебе понравился этот кейс, попробуй ещё: ' : 'If this case felt interesting, also try: '}<TransitionLink href={`/try/${alternative.slug}`}>{alternativeTitle} ↗</TransitionLink></p></div></section>
    <section className="result-section"><h2>{text.subjects}</h2><div><p className="muted">{text.foundations}</p><div className="tag-list">{[...details.subjects, ...details.exams].map((item) => <span className="tag" key={item}>{item}</span>)}</div></div></section>
    <section className="result-section"><h2>{text.majors}</h2><div className="tag-list">{details.majors.map((major) => <span className="tag" key={major}>{major}</span>)}</div></section>
    <section className="result-section"><h2>{text.steps}</h2><ol className="next-list">{details.nextSteps.map((next) => <li key={next}>{next}</li>)}</ol></section>
    <div className="result-actions"><button className="btn btn-primary" type="button" onClick={() => setShowCard(true)}>{ru ? 'Получить verification-карточку' : 'Get My Verification Card'}</button><TransitionLink className="btn btn-outline" href="/">{text.another}</TransitionLink><button className="btn btn-outline" type="button" onClick={() => window.print()}>{text.pdf}</button></div>
    {showCard && <VerificationCard profession={localized.title} match={match} strongest={strongest.label} skills={skills} language={language} onClose={() => setShowCard(false)} />}
  </>;
}
