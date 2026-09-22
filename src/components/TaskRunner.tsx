'use client';

import { useEffect, useState } from 'react';
import type { Profession } from '@/data/professions';
import { ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import { professionRuDetails } from '@/data/professionRuDetails';

type SavedAnswer = { score: number; enjoyment: string; text: string };

export default function TaskRunner({ profession }: { profession: Profession }) {
  const { language } = useLanguage();
  const uiText = ui[language];
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [enjoyment, setEnjoyment] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [reviewFeedback, setReviewFeedback] = useState('');
  const [answers, setAnswers] = useState<SavedAnswer[]>([]);
  const [reviewing, setReviewing] = useState(false);
  const baseTask = profession.tasks[step];
  const task = language === 'ru' ? { ...baseTask, ...professionRuDetails[profession.slug]?.tasks[baseTask.id] } : baseTask;
  const hasAnswer = task.type === 'choice' ? choice !== null : text.trim().length > 0;

  useEffect(() => {
    const saved = localStorage.getItem(`pathtry-${profession.slug}`);
    if (!saved) return;
    try {
      const data = JSON.parse(saved);
      const savedAnswers: SavedAnswer[] = data.answers || [];
      if (savedAnswers.length >= profession.tasks.length && data.step === 0) {
        localStorage.removeItem(`pathtry-${profession.slug}`);
        return;
      }
      if (data.step !== undefined) { setStep(data.step); setAnswers(savedAnswers); }
    } catch { localStorage.removeItem(`pathtry-${profession.slug}`); }
  }, [profession.slug, profession.tasks.length]);

  const submitAnswer = async () => {
    if (!hasAnswer || submitted) return;
    setSubmitted(true);
    if (task.type !== 'text') return;
    setReviewing(true);
    try {
      const response = await fetch('/api/review', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answer: text, profession: profession.title }) });
      const review = await response.json();
      setReviewFeedback(review.feedback || (language === 'ru' ? 'Ответ записан.' : 'Your answer has been noted.'));
    } catch { setReviewFeedback(language === 'ru' ? 'Ответ записан. Попробуй добавить одну конкретную деталь.' : 'Your answer has been noted. Try making one detail more specific.'); }
    setReviewing(false);
  };

  const continueToNext = () => {
    if (!submitted || !enjoyment || reviewing) return;
    const score = task.type === 'choice' ? (choice === task.answer ? 1 : 0) : (text.trim().length >= 20 ? 1 : 0);
    const nextAnswers = [...answers, { score, enjoyment, text }];
    if (step === profession.tasks.length - 1) {
      localStorage.setItem(`pathtry-${profession.slug}`, JSON.stringify({ step: 0, answers: nextAnswers }));
      document.body.classList.add('page-exit');
      window.setTimeout(() => { window.location.href = `/result/${profession.slug}`; }, 260);
      return;
    }
    const nextStep = step + 1;
    setAnswers(nextAnswers); setStep(nextStep); setChoice(null); setText(''); setEnjoyment(null); setSubmitted(false); setReviewFeedback('');
    localStorage.setItem(`pathtry-${profession.slug}`, JSON.stringify({ step: nextStep, answers: nextAnswers }));
  };

  const answerContent = task.type === 'choice' ? <div className="options-list">
    {task.options?.map((option, index) => <button className={`option ${choice === index ? 'selected' : ''} ${submitted && index === task.answer ? 'correct' : ''} ${submitted && choice === index && choice !== task.answer ? 'wrong' : ''}`} onClick={() => !submitted && setChoice(index)} type="button" key={option}><span>{option}</span>{choice === index && <span className="option-check">{submitted ? (choice === task.answer ? '✓' : '×') : '○'}</span>}</button>)}
    {submitted && <div className="feedback">{choice === task.answer ? (language === 'ru' ? 'Это самый сильный вариант. ' : 'That is the strongest move. ') : (language === 'ru' ? 'Не совсем, но это полезная информация. ' : 'Not quite, but this is useful information. ')}{task.explanation}</div>}
  </div> : <textarea className="text-answer" value={text} onChange={(event) => !submitted && setText(event.target.value)} placeholder={task.placeholder} disabled={submitted} />;

  return <div>
    <div className="task-meta"><span>{uiText.task} {step + 1} / {profession.tasks.length}</span><span>{Math.round((step / profession.tasks.length) * 100)}% {uiText.complete}</span></div>
    <div className="progress-track"><div className="progress-fill" style={{ width: `${(step / profession.tasks.length) * 100}%` }} /></div>
    <div className="task-box" key={task.id}>
      <h2>{task.prompt}</h2>{task.context && <p className="context">{task.context}</p>}
      {answerContent}
      {submitted && task.type === 'text' && <div className="feedback">{reviewing ? (language === 'ru' ? 'Проверяем ответ...' : 'Reviewing your answer...') : reviewFeedback}</div>}
      {!submitted && <div className="task-actions"><button className="btn btn-primary" onClick={submitAnswer} type="button" disabled={!hasAnswer}>{task.type === 'choice' ? uiText.submit : uiText.response}</button></div>}
      {submitted && <div className="enjoy"><p>{uiText.enjoy}</p><div className="enjoy-options">{[uiText.yes, uiText.soSo, uiText.no].map((value) => <button className={enjoyment === value ? 'selected' : ''} onClick={() => setEnjoyment(value)} type="button" key={value}>{value}</button>)}</div></div>}
      {submitted && <div className="task-actions"><button className="btn btn-primary" onClick={continueToNext} type="button" disabled={!enjoyment || reviewing}>{step === profession.tasks.length - 1 ? `${uiText.result} →` : `${uiText.next} →`}</button></div>}
    </div>
  </div>;
}
