'use client';

import type { Language } from '@/data/translations';
import { validation } from '@/data/validation';
import Icon, { type IconName } from '@/components/Icon';

type Stat = { value: string; text: [string, string]; source: [string, string]; url: string; icon: IconName };

// Only these three published figures are used; each links to its source.
const IMPACT: Stat[] = [
  { icon: 'cap', value: '68.7%', text: ['of 2025 university graduates in Kazakhstan were employed by June 2026 (75.2% a year earlier)', 'выпускников вузов Казахстана 2025 года были трудоустроены к июню 2026 года (годом ранее — 75,2%)'], source: ['MSHE RK via Tengrinews, 17 Sep 2026', 'МНВО РК, Tengrinews, 17.09.2026'], url: 'https://tengrinews.kz/educationscience/kazahstan-tratit-milliardyi-studentov-pochemu-tsifryi-607508/' },
  { icon: 'users', value: '~40%', text: ['of 40,000+ surveyed school students say schools lack career-guidance opportunities', 'из 40 000+ опрошенных школьников говорят, что в школе не хватает возможностей для профориентации'], source: ['Tengrinews, 2024', 'Tengrinews, 2024'], url: 'https://tengrinews.kz/kazakhstan_news/kazahstanskie-shkolniki-podelilis-karernyimi-ojidaniyami-529757/' },
  { icon: 'trend', value: '39%', text: ['of key job skills are expected to change by 2030', 'ключевых профессиональных навыков, по прогнозу, изменятся к 2030 году'], source: ['WEF Future of Jobs Report 2025', 'WEF, Future of Jobs Report 2025'], url: 'https://www.weforum.org/publications/the-future-of-jobs-report-2025/' }
];

export function WhyItMatters({ language }: { language: Language }) {
  const ru = language === 'ru';
  const lang = ru ? 1 : 0;
  return <section className="section impact" data-reveal aria-labelledby="impact-title">
    <div className="section-head"><div><div className="kicker">{ru ? 'Почему это важно' : 'Why it matters'}</div><h2 id="impact-title">{ru ? 'Выбор профессии — вслепую' : 'Career choice happens blind'}</h2></div><span className="muted">{ru ? 'Школьники выбирают на годы вперёд, ни разу не попробовав работу.' : 'Students commit for years without ever trying the work.'}</span></div>
    <div className="impact-grid">{IMPACT.map((item) => <article className="impact-card" key={item.url}><span className="step-icon"><Icon name={item.icon} size={20} /></span><strong>{ru ? item.value.replace('.', ',') : item.value}</strong><p>{item.text[lang]}</p><a href={item.url} target="_blank" rel="noreferrer">{item.source[lang]}<Icon name="arrowUpRight" size={12} /></a></article>)}</div>
  </section>;
}

type Mark = 'yes' | 'no' | 'partly';
const ROWS: { label: [string, string]; tests: Mark; internships: Mark }[] = [
  { label: ['Real work tasks', 'Реальные рабочие задачи'], tests: 'no', internships: 'yes' },
  { label: ['Takes 10 minutes', 'Занимает 10 минут'], tests: 'yes', internships: 'no' },
  { label: ['Made for school students', 'Для школьников'], tests: 'yes', internships: 'no' },
  { label: ['AI mentor feedback', 'Обратная связь от AI-наставника'], tests: 'no', internships: 'no' },
  { label: ['Free & no sign-up', 'Бесплатно и без регистрации'], tests: 'partly', internships: 'no' }
];
const MARK_ICON: Record<Exclude<Mark, 'partly'>, IconName> = { yes: 'check', no: 'x' };

export function Comparison({ language }: { language: Language }) {
  const ru = language === 'ru';
  const lang = ru ? 1 : 0;
  const markLabel = (mark: Mark) => ({ yes: ru ? 'да' : 'yes', no: ru ? 'нет' : 'no', partly: ru ? 'частично' : 'partly' })[mark];
  const cell = (mark: Mark) => <td className={`mark-${mark}`}><span className="mark">{mark === 'partly' ? <span className="mark-dash" /> : <Icon name={MARK_ICON[mark]} size={14} strokeWidth={2.8} />}<span className="sr-only">{markLabel(mark)}</span></span></td>;
  return <section className="section compare" data-reveal aria-labelledby="compare-title">
    <div className="section-head"><div><div className="kicker">{ru ? 'Чем мы отличаемся' : 'What makes it different'}</div><h2 id="compare-title">{ru ? 'Не тест. Проба настоящей работы.' : 'Not a test. A trial of real work.'}</h2></div><span className="muted">{ru ? 'Тесты угадывают тип личности, стажировки недоступны школьникам. PathTry даёт попробовать саму работу.' : 'Tests guess your personality type; internships are out of reach for most teens. PathTry lets you try the work itself.'}</span></div>
    <div className="compare-wrap"><table className="compare-table">
      <thead><tr><th scope="col"><span className="sr-only">{ru ? 'Критерий' : 'Criterion'}</span></th><th scope="col">{ru ? 'Профтесты' : 'Personality tests'}</th><th scope="col">{ru ? 'Стажировки' : 'Internships'}</th><th scope="col" className="is-us">PathTry</th></tr></thead>
      <tbody>{ROWS.map((row) => <tr key={row.label[0]}><th scope="row">{row.label[lang]}</th>{cell(row.tests)}{cell(row.internships)}<td className="mark-yes is-us"><span className="mark"><Icon name="check" size={14} strokeWidth={2.8} /><span className="sr-only">{markLabel('yes')}</span></span></td></tr>)}</tbody>
    </table></div>
  </section>;
}

// Shown only once real survey numbers are filled in (src/data/validation.ts). Never fake numbers.
export function ValidationSection({ language }: { language: Language }) {
  const ru = language === 'ru';
  if (!(validation.testers > 0)) return null;
  const lang = ru ? 1 : 0;
  const format = (value: number) => value.toLocaleString(ru ? 'ru-RU' : 'en-GB', { maximumFractionDigits: 1 });
  const scale = validation.understandingScale;
  const cards: { value: string; label: string }[] = [];
  if (validation.understandingBefore !== null && validation.understandingAfter !== null) cards.push({ value: `${validation.understandingBefore.toFixed(1)} → ${validation.understandingAfter.toFixed(1)}`.replace(/\./g, ru ? ',' : '.'), label: ru ? `понимание, чем специалист занимается каждый день, до и после (из ${scale})` : `understanding of the day-to-day work, before → after (out of ${scale})` });
  if (validation.learnedNewPercent !== null) cards.push({ value: `${format(validation.learnedNewPercent)}%`, label: ru ? 'узнали что-то новое о реальной работе' : 'learned something new about the real work' });
  if (validation.moreInterestedPercent !== null) cards.push({ value: `${format(validation.moreInterestedPercent)}%`, label: ru ? 'профессия стала интереснее' : 'found the profession more interesting' });
  if (validation.recommendPercent !== null) cards.push({ value: `${format(validation.recommendPercent)}%`, label: ru ? 'порекомендуют другу, который выбирает профессию' : 'would recommend it to a friend choosing a career' });
  if (validation.resultMatchedPercent !== null) cards.push({ value: `${format(validation.resultMatchedPercent)}%`, label: ru ? 'итоговый результат совпал с ощущениями (полностью или частично)' : 'said the result matched how they felt (fully or partly)' });
  if (validation.notForMePercent !== null) cards.push({ value: `${format(validation.notForMePercent)}%`, label: ru ? 'поняли, что профессия, скорее всего, не их, — ещё до поступления' : 'realised the profession is probably not for them — before applying' });
  if (validation.realismScore !== null) cards.push({ value: `${format(validation.realismScore)}/5`, label: ru ? 'насколько задания похожи на настоящую работу' : 'how close the tasks feel to real work' });
  if (validation.usabilityScore !== null) cards.push({ value: `${format(validation.usabilityScore)}/5`, label: ru ? 'удобство и понятность сайта' : 'ease of use' });
  if (validation.pathfinderScore !== null) cards.push({ value: `${format(validation.pathfinderScore)}/5`, label: ru ? 'полезность PathFinder у тех, кто им пользовался' : 'PathFinder usefulness among those who used it' });
  const others = validation.testers - validation.schoolStudents;
  const intro = ru
    ? `Пилотный опрос: ${validation.testers} участников${others > 0 ? `, из них ${validation.schoolStudents} школьников` : ''}. Каждый прошёл одну профессию и ответил на вопросы до и после.`
    : `Pilot survey: ${validation.testers} participants${others > 0 ? `, ${validation.schoolStudents} of them school students` : ''}. Each tried one profession and answered questions before and after.`;
  return <section className="section validation" data-reveal aria-labelledby="validation-title">
    <div className="section-head"><div><div className="kicker">{ru ? 'Проверка' : 'Validation'}</div><h2 id="validation-title">{ru ? 'Проверено на реальных школьниках' : 'Tested with real students'}</h2></div><span className="muted">{intro}</span></div>
    {cards.length > 0 && <div className="impact-grid validation-grid">{cards.map((card) => <article className="impact-card" key={card.label}><strong>{card.value}</strong><p>{card.label}</p></article>)}</div>}
    {(validation.liked.length > 0 || validation.improving.length > 0) && <div className="business-model feedback-summary">
      {validation.liked.length > 0 && <div><strong>{ru ? 'Что отметили участники' : 'What participants liked'}</strong><ul>{validation.liked.map((item) => <li key={item[0]}>{item[lang]}</li>)}</ul></div>}
      {validation.improving.length > 0 && <div><strong>{ru ? 'Что мы улучшаем по отзывам' : 'What we are improving from feedback'}</strong><ul>{validation.improving.map((item) => <li key={item[0]}>{item[lang]}</li>)}</ul></div>}
    </div>}
    {validation.quotes.length > 0 && <div className="quote-grid">{validation.quotes.map((quote) => <figure className="quote-card" key={quote.text}><blockquote>“{quote.translation && !(ru ? /[А-Яа-яЁё]/ : /[A-Za-z]/).test(quote.text) ? quote.translation : quote.text}”</blockquote><figcaption>— {quote.author[lang]}</figcaption></figure>)}</div>}
  </section>;
}
