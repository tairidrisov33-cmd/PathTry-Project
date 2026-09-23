'use client';

import { useEffect, useMemo, useState } from 'react';
import { localize, storageKey, type ProfessionDef, type Skill } from '@/data/catalog/helpers';
import TransitionLink from '@/components/TransitionLink';
import { ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import RadarSkillChart, { type SkillPoint } from '@/components/RadarSkillChart';
import VerificationCard from '@/components/VerificationCard';
import LeadCapture from '@/components/LeadCapture';
import { energyLevel, type SavedAnswer } from '@/components/TaskRunner';
import Icon, { professionColors, professionIcons, type IconName } from '@/components/Icon';
import CountUp from '@/components/CountUp';
import Confetti from '@/components/Confetti';

const enjoymentValues: Record<string, number> = { yes: 2, 'so-so': 1, no: 0 };
const enjoymentIcons: Record<number, IconName> = { 2: 'smile', 1: 'meh', 0: 'frown' };
const skillOrder: Skill[] = ['solve', 'people', 'analyze', 'create', 'pressure'];
const skillIcons: Record<Skill, IconName> = { solve: 'puzzle', people: 'heart', analyze: 'chart', create: 'bulb', pressure: 'shield' };
const skillLabels: Record<Skill, [string, string]> = { solve: ['Problem Solving', 'Решение задач'], people: ['Empathy & Communication', 'Эмпатия и общение'], analyze: ['Analytical Thinking', 'Аналитика'], create: ['Creativity & Vision', 'Креативность'], pressure: ['Stress Resilience', 'Стрессоустойчивость'] };
const RING = 2 * Math.PI * 44;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

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

  useEffect(() => {
    try { setAnswers(JSON.parse(localStorage.getItem(storageKey(definition.slug)) || '{}').answers || []); } catch { /* unreadable progress counts as none */ }
    if (sessionStorage.getItem('pathtry-celebrate') === definition.slug) { sessionStorage.removeItem('pathtry-celebrate'); setCelebrate(true); }
    setReady(true);
  }, [definition.slug]);

  // Set on the client only, so the prerendered page never hydrates with a stale date.
  useEffect(() => { setPrintDate(new Date().toLocaleDateString(ru ? 'ru-RU' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })); }, [ru]);

  const total = profession.tasks.length;
  const score = answers.reduce((sum, answer) => sum + answer.score, 0);
  const performance = total ? score / total : 0;
  const energy = energyLevel(answers.map((answer) => answer.enjoyment));

  // Each task is tagged with the skill it exercises; the radar shows how each skill went.
  const skills = useMemo<SkillPoint[]>(() => skillOrder.map((skill) => {
    const related = answers.filter((answer) => profession.tasks.find((task) => task.id === answer.taskId)?.skill === skill);
    const ratio = related.length ? related.reduce((sum, answer) => sum + answer.score, 0) / related.length : 0.5;
    const mood = related.reduce((sum, answer) => sum + (answer.enjoyment === 'yes' ? 8 : answer.enjoyment === 'no' ? -8 : 0), 0) / Math.max(1, related.length);
    return { label: skillLabels[skill][lang], icon: skillIcons[skill], value: Math.round(clamp(32 + ratio * 58 + mood, 15, 98)) };
  }), [answers, profession.tasks, lang]);

  const ranked = [...skills].sort((a, b) => b.value - a.value);
  const strongest = ranked[0];
  const match = Math.round(clamp(energy === null ? 38 + performance * 56 : 30 + performance * 44 + energy * 0.24, 25, 98));
  const verdictKey = performance >= 0.75 && (energy === null || energy >= 60) ? 'good' : performance >= 0.5 || (energy !== null && energy >= 55) ? 'explore' : 'probably';
  const verdict = { good: text.good, explore: text.exploreMore, probably: text.probably }[verdictKey];
  const reason = { good: text.goodReason, explore: text.exploreReason, probably: text.probablyReason }[verdictKey];
  const verdictIcon: IconName = ({ good: 'trophy', explore: 'route', probably: 'eye' } as const)[verdictKey];
  const decimals = Number.isInteger(score) ? 0 : 1;
  const locale = ru ? 'ru-RU' : 'en-GB';

  const recap = profession.tasks.map((task) => {
    const answer = answers.find((item) => item.taskId === task.id);
    const feeling = answer?.enjoyment && answer.enjoyment in enjoymentValues ? enjoymentValues[answer.enjoyment] : undefined;
    const outcome = !answer ? null : task.type === 'choice' ? (answer.score ? text.strong : text.rethink) : answer.score >= 1 ? text.counted : answer.score > 0 ? text.partial : answer.verdict === 'offtopic' ? text.offtopic : text.tooShort;
    return { id: task.id, prompt: task.prompt, state: !answer ? 'is-empty' : answer.score >= 1 ? 'is-good' : answer.score > 0 ? 'is-partial' : 'is-miss', answered: Boolean(answer), outcome, feeling };
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
    <div className="result-hero">
      <div><div className="result-title-row"><span className="try-icon" style={{ background: professionColors[definition.color] }}><Icon name={professionIcons[definition.slug]} size={26} /></span><div className="kicker">{text.snapshot}</div></div><h1>{profession.title}</h1><p className="muted">{text.resultText}</p>
        <div className="summary-strip">
          <div><strong><CountUp value={match} suffix="%" /></strong><span>{ru ? 'совпадение с профессией' : 'profession match'}</span></div>
          <div><strong>{strongest.label}</strong><span>{ru ? 'главная сильная сторона' : 'top strength'}</span></div>
          <div><strong>{energy === null ? '—' : `${energy}%`}</strong><span>{ru ? 'интерес и энергия' : 'interest & energy'}</span></div>
        </div>
        <div className="share-row"><button className="btn btn-primary share-btn" type="button" onClick={shareResult}><Icon name="share" size={16} />{ru ? 'Поделиться результатом' : 'Share my result'}</button>{shareStatus && <span className="share-status" role="status"><Icon name="check" size={13} strokeWidth={3} />{shareStatus}</span>}</div>
      </div>
      <div className={`score-card verdict-${verdictKey}`}>
        <div className="score-ring"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="44" className="ring-track" /><circle cx="50" cy="50" r="44" className="ring-fill" strokeDasharray={RING} strokeDashoffset={RING * (1 - performance)} /></svg><div><span className="score">{ready ? <CountUp value={score} duration={900} decimals={decimals} locale={locale} /> : 0}<small>/{total}</small></span><span className="score-label">{text.workScore}</span></div></div>
        <div className="score-body"><div className="verdict"><Icon name={verdictIcon} size={20} />{ready ? verdict : text.reading}</div><span className="score-reason">{reason}</span><div className="enjoy-meter"><span>{text.enjoyment}</span><span className="enjoy-meter-track"><span style={{ width: `${energy ?? 0}%` }} /></span><b>{energy === null ? '—' : `${energy}%`}</b></div></div>
      </div>
    </div>
    <section className="dashboard-grid">
      <div className="dashboard-panel radar-panel"><div className="panel-kicker"><Icon name="target" size={14} />{ru ? 'Профиль навыков' : 'Your skill profile'}</div><h2>{ru ? 'Карта твоего рабочего стиля' : 'Your working style map'}</h2><RadarSkillChart skills={skills} strongest={strongest.label} /></div>
      <div className="dashboard-panel ai-breakdown"><div className="ai-orb"><Icon name="compassNav" size={22} /></div><div className="panel-kicker">PATHFINDER · AI CAREER BREAKDOWN</div><h2>{ru ? 'Разбор твоего эксперимента' : 'Your experiment, decoded'}</h2><div className="ai-thinking"><span /> <span /> <span /> <em>{ru ? 'Собираем сигналы из ответов' : 'Reading signals from your answers'}</em></div><div className="ai-stat"><span><Icon name={strongest.icon} size={14} />{ru ? 'Сильные стороны' : 'Strengths'}</span><strong>{`${ranked[0].label}, ${ranked[1].label.toLowerCase()}.`}</strong></div><div className="ai-match"><strong><CountUp value={match} suffix="%" /></strong><span>{ru ? 'совпадение с рабочим стилем' : 'work style match'}</span></div><div className="match-bar"><span style={{ width: `${match}%` }} /></div><p className="ai-alternative"><Icon name="route" size={14} />{ru ? 'Похожее направление, которое стоит попробовать: ' : 'A related path worth trying: '}<TransitionLink href={`/try/${alternative.slug}`}>{alternative.title[lang]} <Icon name="arrowUpRight" size={13} /></TransitionLink></p></div>
    </section>
    <LeadCapture language={language} type="roadmap" profession={definition.slug} professionTitle={profession.title} match={match} />
    {answers.length > 0 && <section className="recap"><div className="recap-head"><h2><Icon name="flag" size={20} />{text.recap}</h2><span className="muted">{text.recapText}</span></div><ol className="recap-list">{recap.map((item, index) => <li className={item.state} key={item.id} style={{ animationDelay: `${index * 50}ms` }}><span className="recap-num">{item.answered ? <Icon name={item.state === 'is-good' ? 'check' : item.state === 'is-partial' ? 'route' : 'x'} size={13} strokeWidth={3} /> : index + 1}</span><span className="recap-prompt">{item.prompt}</span>{item.outcome && <span className="recap-outcome">{item.outcome}</span>}<span className={`recap-feel ${item.feeling === undefined ? 'none' : ''}`} title={item.feeling === undefined ? text.skipped : undefined}>{item.feeling === undefined ? '—' : <Icon name={enjoymentIcons[item.feeling]} size={17} />}</span></li>)}</ol></section>}
    <section className="result-section"><h2><span className="section-icon"><Icon name="book" size={18} /></span>{text.subjects}</h2><div><p className="muted">{text.foundations}</p><div className="tag-list">{[...profession.subjects, ...profession.exams].map((item) => <span className="tag" key={item}>{item}</span>)}</div></div></section>
    <section className="result-section"><h2><span className="section-icon"><Icon name="cap" size={18} /></span>{text.majors}</h2><div className="tag-list">{profession.majors.map((major) => <span className="tag" key={major}>{major}</span>)}</div></section>
    <section className="result-section"><h2><span className="section-icon"><Icon name="route" size={18} /></span>{text.steps}</h2><ol className="next-list">{profession.nextSteps.map((next) => <li key={next}>{next}</li>)}</ol></section>
    <div className="result-actions"><button className="btn btn-primary" type="button" onClick={() => setShowCard(true)}><Icon name="badge" size={17} />{ru ? 'Получить карточку результата' : 'Get my result card'}</button><TransitionLink className="btn btn-outline" href={`/try/${definition.slug}`}><Icon name="refresh" size={16} />{text.retake}</TransitionLink><TransitionLink className="btn btn-outline" href="/#professions"><Icon name="grid" size={16} />{text.another}</TransitionLink><button className="btn btn-ghost" type="button" onClick={savePdf}><Icon name="printer" size={16} />{text.pdf}</button></div>
    {showCard && <VerificationCard profession={profession.title} match={match} strongest={strongest.label} skills={skills} language={language} onClose={() => setShowCard(false)} />}
  </>;
}
