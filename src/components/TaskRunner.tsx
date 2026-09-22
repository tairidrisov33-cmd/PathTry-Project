'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Profession } from '@/data/professions';
import { ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import { professionRuDetails } from '@/data/professionRuDetails';
import { explanationsRu } from '@/data/explanationsRu';
import Icon from '@/components/Icon';

type EnjoymentKey = 'yes' | 'so-so' | 'no' | 'skipped';
type SavedAnswer = { taskId: string; choice: number | null; score: number; enjoyment: EnjoymentKey; text: string };

const TEXT_GOAL = 20;
const letters = ['A', 'B', 'C', 'D', 'E'];

export default function TaskRunner({ profession }: { profession: Profession }) {
  const { language } = useLanguage();
  const uiText = ui[language];
  const ru = language === 'ru';
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [enjoyment, setEnjoyment] = useState<EnjoymentKey | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [reviewFeedback, setReviewFeedback] = useState('');
  const [answers, setAnswers] = useState<SavedAnswer[]>([]);
  const [reviewing, setReviewing] = useState(false);
  const [leaving, setLeaving] = useState(false);
  // Advancing by 1–3 each submit never repeats the previous phrase in pools of 4 or 5.
  const [variant, setVariant] = useState(0);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const baseTask = profession.tasks[step];
  const ruTask = professionRuDetails[profession.slug]?.tasks[baseTask.id];
  const task = ru ? { ...baseTask, ...ruTask } : baseTask;
  const hasAnswer = task.type === 'choice' ? choice !== null : text.trim().length > 0;
  const isLast = step === profession.tasks.length - 1;
  const explanation = ru ? (ruTask?.explanation || explanationsRu[task.id] || 'Это задание помогает заметить, как ты принимаешь решения.') : task.explanation;

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

  useEffect(() => { if (task.type === 'text' && !submitted) textRef.current?.focus({ preventScroll: true }); }, [step, task.type, submitted]);

  const submitAnswer = useCallback(async () => {
    if (!hasAnswer || submitted) return;
    setSubmitted(true);
    setVariant((current) => current + 1 + Math.floor(Math.random() * 3));
    if (task.type !== 'text') return;
    setReviewing(true);
    try {
      const response = await fetch('/api/review', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answer: text, profession: profession.title, language }) });
      const review = await response.json();
      setReviewFeedback(review.feedback || (ru ? 'Ответ записан.' : 'Your answer has been noted.'));
    } catch { setReviewFeedback(ru ? 'Ответ записан. Попробуй добавить одну конкретную деталь.' : 'Your answer has been noted. Try making one detail more specific.'); }
    setReviewing(false);
  }, [hasAnswer, submitted, task.type, text, profession.title, language, ru]);

  const continueToNext = useCallback(() => {
    // Enjoyment is optional: an unrated task is stored as 'skipped'.
    if (!submitted || reviewing || leaving) return;
    const score = task.type === 'choice' ? (choice === task.answer ? 1 : 0) : (text.trim().length >= TEXT_GOAL ? 1 : 0);
    const nextAnswers = [...answers, { taskId: task.id, choice, score, enjoyment: enjoyment || 'skipped', text }];
    if (isLast) {
      setLeaving(true);
      localStorage.setItem(`pathtry-${profession.slug}`, JSON.stringify({ step: 0, answers: nextAnswers }));
      sessionStorage.setItem('pathtry-celebrate', profession.slug);
      document.body.classList.add('page-exit');
      window.setTimeout(() => { window.location.href = `/result/${profession.slug}`; }, 260);
      return;
    }
    const nextStep = step + 1;
    setAnswers(nextAnswers); setStep(nextStep); setChoice(null); setText(''); setEnjoyment(null); setSubmitted(false); setReviewFeedback('');
    localStorage.setItem(`pathtry-${profession.slug}`, JSON.stringify({ step: nextStep, answers: nextAnswers }));
    window.scrollTo({ top: Math.max(0, (document.querySelector('.task-meta') as HTMLElement | null)?.offsetTop ?? 0) - 90, behavior: 'smooth' });
  }, [submitted, reviewing, leaving, task, choice, text, answers, enjoyment, isLast, profession.slug, step]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const typing = target.tagName === 'TEXTAREA' || target.tagName === 'INPUT';
      if (event.metaKey || event.altKey || target.closest('.assistant-widget')) return;
      if (!submitted && task.type === 'choice' && !typing && /^[1-9]$/.test(event.key)) {
        const index = Number(event.key) - 1;
        if (task.options && index < task.options.length) setChoice(index);
        return;
      }
      if (event.key !== 'Enter' || (typing && !event.ctrlKey)) return;
      // Primary buttons already react to Enter natively; outside the task box Enter belongs to other controls.
      if (target.closest('.btn') || (target !== document.body && !target.closest('.task-box'))) return;
      event.preventDefault();
      if (!submitted) submitAnswer(); else continueToNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [submitted, task, submitAnswer, continueToNext]);

  const length = text.trim().length;
  const correct = choice === task.answer;
  const phrase = (pool: readonly string[]) => pool[variant % pool.length];
  const answerContent = task.type === 'choice' ? <div className="options-list" role="radiogroup" aria-label={task.prompt}>
    {task.options?.map((option, index) => {
      const state = submitted ? (index === task.answer ? 'correct' : choice === index ? 'wrong' : 'dim') : choice === index ? 'selected' : '';
      return <button className={`option ${state}`} onClick={() => !submitted && setChoice(index)} type="button" role="radio" aria-checked={choice === index} disabled={submitted && state === 'dim'} key={option}><span className="option-letter">{letters[index]}</span><span className="option-text">{option}</span><span className="option-check">{submitted && index === task.answer ? <Icon name="check" size={13} strokeWidth={3} /> : submitted && choice === index ? <Icon name="x" size={12} strokeWidth={3} /> : choice === index ? <span className="option-dot" /> : null}</span></button>;
    })}
    {submitted && <div className={`feedback ${correct ? 'is-good' : 'is-tip'}`}><span className="feedback-icon"><Icon name={correct ? 'sparkle' : 'bulb'} size={17} /></span><div><strong>{phrase(correct ? uiText.strongVariants : uiText.rethinkVariants)}</strong><p>{explanation}</p></div></div>}
  </div> : <div className="text-answer-wrap"><textarea ref={textRef} className="text-answer" value={text} onChange={(event) => !submitted && setText(event.target.value)} placeholder={task.placeholder} disabled={submitted} aria-describedby="text-goal" /><div className="text-meter" id="text-goal"><span className="text-meter-track"><span className={length >= TEXT_GOAL ? 'full' : ''} style={{ width: `${Math.min(100, (length / TEXT_GOAL) * 100)}%` }} /></span><span className={length >= TEXT_GOAL ? 'meter-ok' : ''}>{length >= TEXT_GOAL && <Icon name="check" size={12} strokeWidth={3} />}{length} {uiText.chars}</span></div>{!submitted && <p className="text-hint">{uiText.charsGoal} · Ctrl + Enter</p>}</div>;

  const enjoyOptions = [{ key: 'yes', label: uiText.yes, icon: 'smile' }, { key: 'so-so', label: uiText.soSo, icon: 'meh' }, { key: 'no', label: uiText.no, icon: 'frown' }] as const;

  return <div>
    <div className="task-meta"><span>{uiText.task} <b>{step + 1}</b> {ru ? 'из' : 'of'} {profession.tasks.length}</span><span>{Math.round((step / profession.tasks.length) * 100)}% {uiText.complete}</span></div>
    <div className="progress-steps" role="progressbar" aria-valuemin={0} aria-valuemax={profession.tasks.length} aria-valuenow={step}>{profession.tasks.map((item, index) => <span key={item.id} className={index < step ? (answers[index]?.score ? 'done good' : 'done miss') : index === step ? 'current' : ''} />)}</div>
    <div className="task-box" key={task.id}>
      <div className="task-chips"><span className="task-chip"><Icon name={task.type === 'choice' ? 'target' : 'pencil'} size={14} />{task.type === 'choice' ? uiText.choiceType : uiText.textType}</span>{task.type === 'choice' && !submitted && <span className="task-keys"><Icon name="keyboard" size={14} />{uiText.keysHint}</span>}{submitted && <span className="task-keys"><Icon name="keyboard" size={14} />{uiText.enterHint}</span>}</div>
      <h2>{task.prompt}</h2>{task.context && <p className="context">{task.context}</p>}
      {answerContent}
      {submitted && task.type === 'text' && <div className={`feedback is-review ${reviewing ? 'is-loading' : ''}`}><span className="feedback-icon"><Icon name="sparkle" size={17} /></span><div><strong>{reviewing ? (ru ? 'Проверяем ответ' : 'Reviewing your answer') : phrase(uiText.notedVariants)}</strong>{reviewing ? <p className="typing-dots"><i /><i /><i /></p> : <p>{reviewFeedback}</p>}</div></div>}
      {!submitted && <div className="task-actions"><button className="btn btn-primary" onClick={submitAnswer} type="button" disabled={!hasAnswer}>{task.type === 'choice' ? uiText.submit : uiText.response}<Icon name="check" size={16} strokeWidth={2.4} /></button></div>}
      {submitted && <div className="enjoy"><p>{uiText.enjoy} <span className="optional-note">({ru ? 'необязательно' : 'optional'})</span></p><div className="enjoy-options">{enjoyOptions.map((option) => <button className={`enjoy-${option.key} ${enjoyment === option.key ? 'selected' : ''}`} onClick={() => setEnjoyment(enjoyment === option.key ? null : option.key)} type="button" aria-pressed={enjoyment === option.key} key={option.key}><Icon name={option.icon} size={18} />{option.label}</button>)}</div></div>}
      {submitted && <div className="task-actions"><button className="btn btn-primary" onClick={continueToNext} type="button" disabled={reviewing || leaving}>{isLast ? uiText.result : uiText.next}<Icon name={isLast ? 'flag' : 'arrowRight'} size={16} /></button></div>}
    </div>
  </div>;
}
