'use client';

import { useEffect, useMemo, useState } from 'react';
import { localize, storageKey, type ProfessionDef, type Skill } from '@/data/catalog/helpers';
import TransitionLink from '@/components/TransitionLink';
import { ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import RadarSkillChart, { type SkillPoint } from '@/components/RadarSkillChart';
import VerificationCard from '@/components/VerificationCard';
import LeadCapture from '@/components/LeadCapture';
import ViewFeedback from '@/components/ViewFeedback';
import { describeResult, scoreExperiment, SKILL_LABELS, type SavedAnswer } from '@/lib/scoring';
import Icon, { professionColors, professionIcons, type IconName } from '@/components/Icon';
import CountUp from '@/components/CountUp';
import Confetti from '@/components/Confetti';

const enjoymentIcons: Record<string, IconName> = { yes: 'smile', 'so-so': 'meh', no: 'frown' };
const skillIcons: Record<Skill, IconName> = { solve: 'puzzle', people: 'heart', analyze: 'chart', create: 'bulb', pressure: 'shield' };
const RING = 2 * Math.PI * 44;
const BREAKDOWN_TIMEOUT_MS = 10_000;

type Breakdown = { text: string; source: 'ai' | 'rules' };

export default function ResultClient({ definition, alternative }: { definition: ProfessionDef; alternative: ProfessionDef }) {
  const { language } = useLanguage();
  const text = ui[language];
  const ru = language === 'ru';
  const lang = ru ? 1 : 0;
  const profession = useMemo(() => localize(definition, language), [definition, language]);
  const [answers, setAnswers] = useState<SavedAnswer[]>([]);
  const [ready, setReady] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [printDate, setPrintDate] = useState('');
  const [shareStatus, setShareStatus] = useState('');
  const [breakdown, setBreakdown] = useState<Breakdown | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey(definition.slug)) || '{}').answers;
      setAnswers(Array.isArray(saved) ? saved : []);
    } catch { /* unreadable progress counts as none */ }
    if (sessionStorage.getItem('pathtry-celebrate') === definition.slug) { sessionStorage.removeItem('pathtry-celebrate'); setCelebrate(true); }
    setReady(true);
  }, [definition.slug]);

  // Set on the client only, so the prerendered page never hydrates with a stale date.
  useEffect(() => { setPrintDate(new Date().toLocaleDateString(ru ? 'ru-RU' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })); }, [ru]);

  // Every number, verdict and label below comes from this one result.
  const result = useMemo(() => scoreExperiment(answers, profession.tasks), [answers, profession.tasks]);
  const { total, proMoves, performance, energy, ratedTasks, matchPercent: match, verdict: verdictKey } = result;
  const skills: SkillPoint[] = result.skills.map((item) => ({ label: SKILL_LABELS[item.skill][lang], icon: skillIcons[item.skill], value: item.value }));
  const [topSkill, secondSkill] = result.strengths;
  const strongest = { label: SKILL_LABELS[topSkill][lang], icon: skillIcons[topSkill] };
  // The label and its reason never contradict the numbers: an unfinished run is only preliminary,
  // and without ratings the reason talks about decisions, not energy.
  const verdict = !result.complete ? (ru ? 'Предварительный результат' : 'Preliminary result') : { good: text.good, explore: text.exploreMore, probably: text.probably }[verdictKey];
  const reason = !result.complete
    ? (ru ? `Вывод появится после всех ${total} заданий; неотвеченные задания пока считаются как 0.` : `The verdict appears after all ${total} tasks; unanswered tasks count as 0 for now.`)
    : energy !== null ? { good: text.goodReason, explore: text.exploreReason, probably: text.probablyReason }[verdictKey]
    : {
      good: ru ? 'Ты принимал(а) профессиональные решения в большинстве задач. Отмечай, как тебе задания, — так станет видно, подходит ли тебе сама работа.' : 'You made professional calls on most tasks. Rate how tasks feel next time to see whether the work suits you too.',
      explore: text.exploreReason,
      probably: ru ? 'В этот раз немногие решения совпали с профессиональными. Это полезная информация, а не окончательный ответ.' : 'Few of your calls matched what professionals do this time. That is useful information, not a final answer.'
    }[verdictKey];
  const verdictIcon: IconName = ({ good: 'trophy', explore: 'route', probably: 'eye' } as const)[verdictKey];
  const decimals = Number.isInteger(proMoves) ? 0 : 1;
  const locale = ru ? 'ru-RU' : 'en-GB';
  const energyValue = energy === null ? (ru ? 'Не оценено' : 'Not rated') : `${energy}%`;
  const energyBasis = energy === null ? (ru ? 'интерес и энергия' : 'interest & energy') : ru ? `интерес и энергия · по ${ratedTasks} из ${total} задач` : `interest & energy · based on ${ratedTasks} of ${total} tasks`;

  // PathFinder writes a personal breakdown on the server; a rule-based one from the same score
  // replaces it on error or after 10 seconds, so the panel never loads forever.
  useEffect(() => {
    if (!ready || !answers.length) return;
    let active = true;
    const fallback = () => { if (active) setBreakdown({ text: describeResult(result, profession.title, language), source: 'rules' }); };
    setBreakdown(null);
    fetch('/api/assistant', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(BREAKDOWN_TIMEOUT_MS),
      body: JSON.stringify({ mode: 'breakdown', slug: definition.slug, language, answers: answers.map(({ taskId, score, enjoyment }) => ({ taskId, score, enjoyment })) })
    }).then(async (response) => {
      if (!response.ok) throw new Error('breakdown failed');
      const data = await response.json();
      if (typeof data.answer !== 'string' || !data.answer.trim()) throw new Error('empty breakdown');
      if (active) setBreakdown({ text: data.answer.trim(), source: data.source === 'ai' ? 'ai' : 'rules' });
    }).catch(fallback);
    return () => { active = false; };
    // The result is derived from answers and language, which are the real dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, answers, language, definition.slug]);

  const recap = profession.tasks.map((task, index) => {
    const step = result.steps[index];
    const outcome = step.status === 'empty' ? null : task.type === 'choice' ? (step.status === 'good' ? text.strong : text.rethink) : step.status === 'good' ? text.counted : step.status === 'partial' ? text.partial : step.verdict === 'offtopic' ? text.offtopic : text.tooShort;
    return { id: task.id, prompt: task.prompt, state: `is-${step.status === 'empty' ? 'empty' : step.status === 'good' ? 'good' : step.status === 'partial' ? 'partial' : 'miss'}`, answered: step.status !== 'empty', outcome, feeling: step.enjoyment };
  });

  const shareResult = async () => {
    // The shared link invites friends to try the same profession: the viral loop.
    const url = `${window.location.origin}/try/${definition.slug}?ref=share`;
    const message = ru ? `Я попробовал(а) профессию «${profession.title}» на PathTry — совпадение ${match}%. Проверь себя за 10 минут:` : `I tried being a ${profession.title} on PathTry — ${match}% match. Try it yourself in 10 minutes:`;
    try {
      if (navigator.share) { await navigator.share({ title: 'PathTry', text: message, url }); return; }
      await navigator.clipboard.writeText(`${message} ${url}`);
      setShareStatus(ru ? 'Ссылка скопирована' : 'Link copied');
    } catch { /* the user closed the share sheet */ }
  };

  const savePdf = () => {
    // The browser uses the document title as the default PDF file name.
    const previousTitle = document.title;
    document.title = `PathTry — ${profession.title}`;
    const restore = () => { document.title = previousTitle; window.removeEventListener('afterprint', restore); };
    window.addEventListener('afterprint', restore);
    window.print();
  };

  if (ready && !answers.length) return <>
    <TransitionLink className="back" href="/"><Icon name="arrowLeft" size={15} />{text.back}</TransitionLink>
    <div className="empty-results result-empty"><span className="empty-icon"><Icon name={professionIcons[definition.slug]} size={26} /></span><strong>{ru ? 'Результата пока нет' : 'No result yet'}</strong><span>{ru ? `Пройди 10 заданий, чтобы узнать, подходит ли тебе профессия «${profession.title}».` : `Complete 10 tasks to see whether ${profession.title} fits you.`}</span><TransitionLink className="btn btn-primary" href={`/try/${definition.slug}`}>{text.tryIt}<Icon name="arrowRight" size={16} /></TransitionLink></div>
  </>;

  return <>
    <div className="print-header" aria-hidden="true"><span className="print-brand">path<span>try</span></span><span>{text.snapshot}{printDate && ` · ${printDate}`}</span></div>
    {celebrate && ready && <><Confetti /><div className="toast" role="status"><Icon name="sparkle" size={16} />{text.celebrate}</div></>}
    <TransitionLink className="back" href="/"><Icon name="arrowLeft" size={15} />{text.back}</TransitionLink>
    {ready && !result.complete && <div className="partial-notice" role="note"><Icon name="flag" size={16} /><span>{ru ? `Пройдено ${result.answered} из ${total} заданий — результат предварительный.` : `You completed ${result.answered} of ${total} tasks — this result is preliminary.`}</span><TransitionLink href={`/try/${definition.slug}`}>{ru ? 'Продолжить' : 'Continue'}<Icon name="arrowRight" size={14} /></TransitionLink></div>}
    <div className="result-hero">
      <div><div className="result-title-row"><span className="try-icon" style={{ background: professionColors[definition.color] }}><Icon name={professionIcons[definition.slug]} size={26} /></span><div className="kicker">{text.snapshot}</div></div><h1>{profession.title}</h1><p className="muted">{text.resultText}</p>
        <div className="summary-strip">
          <div><strong>{ready ? <CountUp value={match} suffix="%" /> : '—'}</strong><span>{ru ? 'совпадение с профессией' : 'profession match'}</span></div>
          <div><strong>{ready ? strongest.label : '—'}</strong><span>{ru ? 'главная сильная сторона' : 'top strength'}</span></div>
          <div><strong>{ready ? energyValue : '—'}</strong><span>{energyBasis}</span></div>
        </div>
        <div className="share-row"><button className="btn btn-primary share-btn" type="button" onClick={shareResult}><Icon name="share" size={16} />{ru ? 'Поделиться результатом' : 'Share my result'}</button><button className="btn btn-outline share-btn" type="button" onClick={savePdf}><Icon name="printer" size={16} />{text.pdf}</button>{shareStatus && <span className="share-status" role="status"><Icon name="check" size={13} strokeWidth={3} />{shareStatus}</span>}</div>
      </div>
      <div className={`score-card verdict-${verdictKey}`}>
        <div className="score-ring"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" className="ring-track" /><circle cx="50" cy="50" r="44" className="ring-fill" strokeDasharray={RING} strokeDashoffset={RING * (1 - performance)} /></svg><div><span className="score">{ready ? <CountUp value={proMoves} duration={900} decimals={decimals} locale={locale} /> : '—'}<small>/{total}</small></span><span className="score-label">{text.workScore}</span></div></div>
        <div className="score-body"><div className="verdict"><Icon name={verdictIcon} size={20} />{ready ? verdict : text.reading}</div><span className="score-reason">{reason}</span><div className="enjoy-meter"><span>{text.enjoyment}</span><span className="enjoy-meter-track"><span style={{ width: `${energy ?? 0}%` }} /></span><b>{energy === null ? (ru ? 'не оценено' : 'not rated') : `${energy}%`}</b></div>{energy !== null && <small className="enjoy-basis">{ru ? `по ${ratedTasks} из ${total} задач` : `based on ${ratedTasks} of ${total} tasks`}</small>}</div>
      </div>
    </div>
    <section className="dashboard-grid">
      <div className="dashboard-panel radar-panel"><div className="panel-kicker"><Icon name="target" size={14} />{ru ? 'Профиль навыков' : 'Your skill profile'}</div><h2>{ru ? 'Карта твоего рабочего стиля' : 'Your working style map'}</h2><RadarSkillChart skills={skills} strongest={strongest.label} /></div>
      <div className="dashboard-panel ai-breakdown"><div className="ai-orb"><Icon name="compassNav" size={22} /></div><div className="panel-kicker">{ru ? 'PATHFINDER · AI-РАЗБОР' : 'PATHFINDER · AI CAREER BREAKDOWN'}</div><h2>{ru ? 'Разбор твоего эксперимента' : 'Your experiment, decoded'}</h2>
        {breakdown ? <div className="ai-text" aria-live="polite"><p>{breakdown.text}</p><small>{breakdown.source === 'ai' ? (ru ? 'Написано PathFinder AI' : 'Written by PathFinder AI') : (ru ? 'PathFinder · по правилам оценки' : 'PathFinder · rule-based summary')}</small></div> : <div className="ai-thinking" role="status"><span /> <span /> <span /> <em>{ru ? 'Собираем сигналы из ответов' : 'Reading signals from your answers'}</em></div>}
        <div className="ai-stat"><span><Icon name={strongest.icon} size={14} />{ru ? 'Сильные стороны' : 'Strengths'}</span><strong>{`${SKILL_LABELS[topSkill][lang]}, ${SKILL_LABELS[secondSkill][lang].toLowerCase()}.`}</strong></div><div className="ai-match"><strong>{ready ? <CountUp value={match} suffix="%" /> : '—'}</strong><span>{ru ? 'совпадение с рабочим стилем' : 'work style match'}</span></div><div className="match-bar"><span style={{ width: `${match}%` }} /></div><p className="ai-alternative"><Icon name="route" size={14} />{ru ? 'Похожее направление, которое стоит попробовать: ' : 'A related path worth trying: '}<TransitionLink href={`/try/${alternative.slug}`}>{alternative.title[lang]} <Icon name="arrowUpRight" size={13} /></TransitionLink></p></div>
    </section>
    <ViewFeedback slug={definition.slug} language={language} />
    <LeadCapture language={language} type="roadmap" profession={definition.slug} professionTitle={profession.title} match={match} />
    {answers.length > 0 && <section className="recap"><div className="recap-head"><h2><Icon name="flag" size={20} />{text.recap}</h2><span className="muted">{text.recapText}</span></div><ol className="recap-list">{recap.map((item, index) => <li className={item.state} key={item.id} style={{ animationDelay: `${index * 50}ms` }}><span className="recap-num">{item.answered ? <Icon name={item.state === 'is-good' ? 'check' : item.state === 'is-partial' ? 'route' : 'x'} size={13} strokeWidth={3} /> : index + 1}</span><span className="recap-prompt">{item.prompt}</span>{item.outcome && <span className="recap-outcome">{item.outcome}</span>}<span className={`recap-feel ${item.feeling === null ? 'none' : ''}`} title={item.feeling === null ? text.skipped : undefined}>{item.feeling === null ? '—' : <Icon name={enjoymentIcons[item.feeling]} size={17} />}</span></li>)}</ol></section>}
    <section className="result-section"><h2><span className="section-icon"><Icon name="book" size={18} /></span>{text.subjects}</h2><div><p className="muted">{text.foundations}</p><div className="tag-list">{[...profession.subjects, ...profession.exams].map((item) => <span className="tag" key={item}>{item}</span>)}</div></div></section>
    <section className="result-section"><h2><span className="section-icon"><Icon name="cap" size={18} /></span>{text.majors}</h2><div className="tag-list">{profession.majors.map((major) => <span className="tag" key={major}>{major}</span>)}</div></section>
    <section className="result-section"><h2><span className="section-icon"><Icon name="route" size={18} /></span>{text.steps}</h2><ol className="next-list">{profession.nextSteps.map((next) => <li key={next}>{next}</li>)}</ol></section>
    <div className="result-actions"><button className="btn btn-primary" type="button" onClick={() => setShowCard(true)}><Icon name="badge" size={17} />{ru ? 'Получить карточку результата' : 'Get my result card'}</button><TransitionLink className="btn btn-outline" href={`/try/${definition.slug}`}><Icon name="refresh" size={16} />{text.retake}</TransitionLink><TransitionLink className="btn btn-outline" href="/#professions"><Icon name="grid" size={16} />{text.another}</TransitionLink><button className="btn btn-ghost" type="button" onClick={savePdf}><Icon name="printer" size={16} />{text.pdf}</button></div>
    {showCard && <VerificationCard slug={definition.slug} profession={profession.title} match={match} proMoves={proMoves} total={total} complete={result.complete} strongest={strongest.label} skills={skills} language={language} onClose={() => setShowCard(false)} />}
  </>;
}
