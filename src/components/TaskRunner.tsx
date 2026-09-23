'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { localize, storageKey, type ProfessionDef } from '@/data/catalog/helpers';
import { ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import { gradeOffline, type Review, type Verdict } from '@/lib/grader';
import { askPathfinder, setTaskContext } from '@/lib/taskContext';
import Icon, { type IconName } from '@/components/Icon';

type EnjoymentKey = 'yes' | 'so-so' | 'no' | 'skipped';
export type SavedAnswer = { taskId: string; choice: number | null; score: number; enjoyment: EnjoymentKey; text: string; verdict?: Verdict };

const letters = ['A', 'B', 'C', 'D', 'E'];
const energyValue: Record<string, number> = { yes: 100, 'so-so': 55, no: 15 };
const verdictIcon: Record<Verdict, IconName> = { strong: 'sparkle', partial: 'route', offtopic: 'target', empty: 'pencil' };

export function energyLevel(ratings: string[]) {
  const rated = ratings.filter((rating) => rating in energyValue);
  return rated.length ? Math.round(rated.reduce((total, rating) => total + energyValue[rating], 0) / rated.length) : null;
}

export default function TaskRunner({ definition }: { definition: ProfessionDef }) {
  const { language } = useLanguage();
  const uiText = ui[language];
  const ru = language === 'ru';
  const profession = useMemo(() => localize(definition, language), [definition, language]);
  const key = storageKey(definition.slug);
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [enjoyment, setEnjoyment] = useState<EnjoymentKey | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [review, setReview] = useState<Review | null>(null);
  const [answers, setAnswers] = useState<SavedAnswer[]>([]);
  const [reviewing, setReviewing] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [showHint, setShowHint] = useState(false);
  // Advancing by 1–3 each submit never repeats the previous phrase in pools of 4 or 5.
  const [variant, setVariant] = useState(0);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const total = profession.tasks.length;
  const task = profession.tasks[step];
  const hasAnswer = task.type === 'choice' ? choice !== null : text.trim().length > 0;
  const isLast = step === total - 1;
  const t = ru
    ? { hint: 'Подсказка PathFinder', ask: 'Спросить PathFinder', askText: 'Помоги мне разобраться с этим заданием, но не говори ответ.', insight: 'Взгляд профессионала', reviewingTitle: 'PathFinder читает ответ', rewrite: 'Переписать ответ', sample: 'Как ответил бы специалист', ai: 'Проверено PathFinder AI', rubric: 'Проверено PathFinder по критериям задания', drive: 'Интерес и энергия', driveEmpty: 'Отмечай, как тебе задания', driveLevels: ['Низкая', 'Разогреваешься', 'Высокая'], of: 'из', optional: 'необязательно', verdicts: { strong: 'Сильный ответ', partial: 'Частично', offtopic: 'Не по заданию', empty: 'Слишком коротко' } }
    : { hint: 'Hint from PathFinder', ask: 'Ask PathFinder', askText: 'Help me think through this task without giving me the answer.', insight: 'Pro insight', reviewingTitle: 'PathFinder is reading your answer', rewrite: 'Rewrite answer', sample: 'How a pro might answer', ai: 'Reviewed by PathFinder AI', rubric: 'Reviewed by PathFinder against the task criteria', drive: 'Interest & energy', driveEmpty: 'Rate tasks to see it', driveLevels: ['Low', 'Warming up', 'High'], of: 'of', optional: 'optional', verdicts: { strong: 'Strong answer', partial: 'Partly there', offtopic: 'Off the task', empty: 'Too short to review' } };

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(key) || 'null');
      if (!data) return;
      const savedAnswers: SavedAnswer[] = data.answers || [];
      // A finished run starts fresh; an unfinished one resumes where it stopped.
      if (savedAnswers.length >= total) { localStorage.removeItem(key); return; }
      setStep(Math.min(savedAnswers.length, total - 1)); setAnswers(savedAnswers);
    } catch { localStorage.removeItem(key); }
  }, [key, total]);

  useEffect(() => {
    setTaskContext({ profession: profession.title, prompt: task.prompt, type: task.type, options: task.options, submitted, hint: task.hint });
  }, [profession.title, task, submitted]);
  useEffect(() => () => setTaskContext(null), []);

  useEffect(() => { if (task.type === 'text' && !submitted) textRef.current?.focus({ preventScroll: true }); }, [step, task.type, submitted]);

  const submitAnswer = useCallback(async () => {
    if (!hasAnswer || submitted) return;
    setSubmitted(true);
    setShowHint(false);
    setVariant((current) => current + 1 + Math.floor(Math.random() * 3));
    if (task.type !== 'text') return;
    setReviewing(true);
    try {
      const response = await fetch('/api/review', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug: definition.slug, taskId: task.id, answer: text, language }) });
      if (!response.ok) throw new Error('review failed');
      setReview(await response.json());
    } catch {
      setReview(gradeOffline(text, { prompt: task.prompt, criteria: task.criteria ?? '', hint: task.hint, keywords: task.keywords ?? [] }, language));
    }
    setReviewing(false);
  }, [hasAnswer, submitted, task, text, definition.slug, language]);

  const rewrite = () => { setSubmitted(false); setReview(null); window.setTimeout(() => textRef.current?.focus(), 30); };

  const continueToNext = useCallback(() => {
    if (!submitted || reviewing || leaving) return;
    const score = task.type === 'choice' ? (choice === task.answer ? 1 : 0) : (review?.score ?? 0);
    const nextAnswers = [...answers, { taskId: task.id, choice, score, enjoyment: enjoyment || 'skipped', text, verdict: review?.verdict }];
    localStorage.setItem(key, JSON.stringify({ answers: nextAnswers }));
    if (isLast) {
      setLeaving(true);
      sessionStorage.setItem('pathtry-celebrate', definition.slug);
      document.body.classList.add('page-exit');
      window.setTimeout(() => { window.location.href = `/result/${definition.slug}`; }, 260);
      return;
    }
    setAnswers(nextAnswers); setStep(step + 1); setChoice(null); setText(''); setEnjoyment(null); setSubmitted(false); setReview(null); setShowHint(false);
    window.scrollTo({ top: Math.max(0, (document.querySelector('.task-meta') as HTMLElement | null)?.offsetTop ?? 0) - 90, behavior: 'smooth' });
  }, [submitted, reviewing, leaving, task, choice, text, review, answers, enjoyment, isLast, key, definition.slug, step]);

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

  const correct = choice === task.answer;
  const phrase = (pool: readonly string[]) => pool[variant % pool.length];
  const energy = energyLevel([...answers.map((answer) => answer.enjoyment), enjoyment || 'skipped']);
  const energyText = energy === null ? t.driveEmpty : t.driveLevels[energy < 40 ? 0 : energy < 70 ? 1 : 2];
  const progressClass = (answer?: SavedAnswer) => !answer ? '' : answer.score >= 1 ? 'done good' : answer.score > 0 ? 'done partial' : 'done miss';

  const answerContent = task.type === 'choice' ? <div className="options-list" role="radiogroup" aria-label={task.prompt}>
    {task.options?.map((option, index) => {
      const state = submitted ? (index === task.answer ? 'correct' : choice === index ? 'wrong' : 'dim') : choice === index ? 'selected' : '';
      return <button className={`option ${state}`} onClick={() => !submitted && setChoice(index)} type="button" role="radio" aria-checked={choice === index} disabled={submitted && state === 'dim'} key={option}><span className="option-letter">{letters[index]}</span><span className="option-text">{option}</span><span className="option-check">{submitted && index === task.answer ? <Icon name="check" size={13} strokeWidth={3} /> : submitted && choice === index ? <Icon name="x" size={12} strokeWidth={3} /> : choice === index ? <span className="option-dot" /> : null}</span></button>;
    })}
    {submitted && <div className={`feedback ${correct ? 'is-good' : 'is-tip'}`}><span className="feedback-icon"><Icon name={correct ? 'sparkle' : 'bulb'} size={17} /></span><div><span className="insight-label">{t.insight}</span><strong>{phrase(correct ? uiText.strongVariants : uiText.rethinkVariants)}</strong><p>{task.explanation}</p></div></div>}
  </div> : <div className="text-answer-wrap"><textarea ref={textRef} className="text-answer" value={text} onChange={(event) => !submitted && setText(event.target.value)} placeholder={task.placeholder} disabled={submitted} aria-describedby="text-goal" /><div className="text-meter" id="text-goal"><span className="text-meter-note"><Icon name="sparkle" size={13} />{uiText.charsGoal}</span><span>{text.trim().length} {uiText.chars}</span></div>{!submitted && <p className="text-hint">Ctrl + Enter</p>}</div>;

  const enjoyOptions = [{ key: 'yes', label: uiText.yes, icon: 'smile' }, { key: 'so-so', label: uiText.soSo, icon: 'meh' }, { key: 'no', label: uiText.no, icon: 'frown' }] as const;

  return <div>
    <div className="task-meta"><span>{uiText.task} <b>{step + 1}</b> {t.of} {total}</span><span>{Math.round((step / total) * 100)}% {uiText.complete}</span></div>
    <div className="progress-steps" style={{ '--n': total } as React.CSSProperties} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={step}>{profession.tasks.map((item, index) => <span key={item.id} className={index < step ? progressClass(answers[index]) : index === step ? 'current' : ''} />)}</div>
    <div className="drive-meter" aria-live="polite"><span className="drive-label"><Icon name="flame" size={15} />{t.drive}</span><span className="drive-track"><span style={{ width: `${energy ?? 0}%` }} className={energy === null ? '' : energy < 40 ? 'is-low' : energy < 70 ? 'is-mid' : 'is-high'} /></span><b>{energyText}</b></div>
    <div className="task-box" key={task.id}>
      <div className="task-chips"><span className="task-chip"><Icon name={task.type === 'choice' ? 'target' : 'pencil'} size={14} />{task.type === 'choice' ? uiText.choiceType : uiText.textType}</span>{task.type === 'choice' && !submitted && <span className="task-keys"><Icon name="keyboard" size={14} />{uiText.keysHint}</span>}{submitted && <span className="task-keys"><Icon name="keyboard" size={14} />{uiText.enterHint}</span>}</div>
      <h2>{task.prompt}</h2>{task.context && <p className="context">{task.context}</p>}
      {!submitted && <div className="hint-row"><button className={`hint-toggle ${showHint ? 'is-open' : ''}`} type="button" onClick={() => setShowHint((value) => !value)} aria-expanded={showHint}><Icon name="bulb" size={15} />{t.hint}</button><button className="hint-ask" type="button" onClick={() => askPathfinder(t.askText)}><Icon name="compassNav" size={15} />{t.ask}</button></div>}
      {showHint && !submitted && <div className="hint-box" role="note"><Icon name="compassNav" size={16} /><p>{task.hint}</p></div>}
      {answerContent}
      {submitted && task.type === 'text' && <div className={`feedback is-review ${reviewing ? 'is-loading' : `verdict-${review?.verdict}`}`}><span className="feedback-icon"><Icon name={reviewing || !review ? 'sparkle' : verdictIcon[review.verdict]} size={17} /></span><div>{reviewing || !review ? <><strong>{t.reviewingTitle}</strong><p className="typing-dots"><i /><i /><i /></p></> : <><span className={`verdict-chip verdict-${review.verdict}`}>{t.verdicts[review.verdict]}</span><p className="review-feedback">{review.feedback}</p>{review.tip && <p className="review-tip"><Icon name="bulb" size={14} />{review.tip}</p>}<small className="review-source">{review.source === 'ai' ? t.ai : t.rubric}</small></>}</div></div>}
      {submitted && task.type === 'text' && !reviewing && task.sample && <details className="pro-sample"><summary><Icon name="badge" size={15} />{t.sample}</summary><p>{task.sample}</p></details>}
      {!submitted && <div className="task-actions"><button className="btn btn-primary" onClick={submitAnswer} type="button" disabled={!hasAnswer}>{task.type === 'choice' ? uiText.submit : uiText.response}<Icon name={task.type === 'choice' ? 'check' : 'send'} size={16} strokeWidth={2.2} /></button></div>}
      {submitted && !reviewing && <div className="enjoy"><p>{uiText.enjoy} <span className="optional-note">({t.optional})</span></p><div className="enjoy-options">{enjoyOptions.map((option) => <button className={`enjoy-${option.key} ${enjoyment === option.key ? 'selected' : ''}`} onClick={() => setEnjoyment(enjoyment === option.key ? null : option.key)} type="button" aria-pressed={enjoyment === option.key} key={option.key}><Icon name={option.icon} size={18} />{option.label}</button>)}</div></div>}
      {submitted && <div className="task-actions">{task.type === 'text' && review && review.verdict !== 'strong' && <button className="btn btn-outline" type="button" onClick={rewrite}><Icon name="pencil" size={15} />{t.rewrite}</button>}<button className="btn btn-primary" onClick={continueToNext} type="button" disabled={reviewing || leaving}>{isLast ? uiText.result : uiText.next}<Icon name={isLast ? 'flag' : 'arrowRight'} size={16} /></button></div>}
    </div>
  </div>;
}
