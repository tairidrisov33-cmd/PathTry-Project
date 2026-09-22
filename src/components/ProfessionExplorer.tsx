'use client';

import { useEffect, useRef, useState } from 'react';
import type { Profession } from '@/data/professions';
import TransitionLink from '@/components/TransitionLink';
import { categoryRu, professionRu, ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import Icon, { professionColors, professionIcons, type IconName } from '@/components/Icon';

const categories = ['All', 'Tech & Data', 'Healthcare & Science', 'Creative & Media', 'Humanities & Law'];
const categoryIcons: Record<string, IconName> = { All: 'grid', 'Tech & Data': 'code', 'Healthcare & Science': 'heart', 'Creative & Media': 'palette', 'Humanities & Law': 'book' };
const categoryBySlug: Record<string, string> = {
  'software-developer': 'Tech & Data', 'data-analyst': 'Tech & Data',
  doctor: 'Healthcare & Science', psychologist: 'Healthcare & Science',
  designer: 'Creative & Media', journalist: 'Creative & Media', architect: 'Creative & Media',
  lawyer: 'Humanities & Law', teacher: 'Humanities & Law', entrepreneur: 'Humanities & Law'
};

type Progress = { state: 'done' | 'progress'; score: number; step: number };

export default function ProfessionExplorer({ professions }: { professions: Profession[] }) {
  const { language } = useLanguage();
  const text = ui[language];
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [progress, setProgress] = useState<Record<string, Progress>>({});
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const next: Record<string, Progress> = {};
    professions.forEach((profession) => {
      try {
        const saved = JSON.parse(localStorage.getItem(`pathtry-${profession.slug}`) || 'null');
        const answers: { score: number }[] = saved?.answers || [];
        if (answers.length >= profession.tasks.length) next[profession.slug] = { state: 'done', score: answers.reduce((total, answer) => total + answer.score, 0), step: answers.length };
        else if (saved?.step > 0) next[profession.slug] = { state: 'progress', score: 0, step: saved.step };
      } catch { /* ignore unreadable progress */ }
    });
    setProgress(next);
  }, [professions]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (event.key !== '/' || ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;
      event.preventDefault();
      searchRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const localize = (profession: Profession) => language === 'ru' ? professionRu[profession.slug] : profession;
  const matchesQuery = (profession: Profession) => { const localized = localize(profession); return `${localized.title} ${localized.description}`.toLowerCase().includes(query.trim().toLowerCase()); };
  const filtered = professions.filter((profession) => (category === 'All' || categoryBySlug[profession.slug] === category) && matchesQuery(profession));
  const countFor = (item: string) => professions.filter((profession) => (item === 'All' || categoryBySlug[profession.slug] === item) && matchesQuery(profession)).length;

  const reset = () => { setQuery(''); setCategory('All'); };
  const categoryLabels: Record<string, string> = { All: text.all, 'Tech & Data': text.tech, 'Healthcare & Science': text.health, 'Creative & Media': text.creative, 'Humanities & Law': text.humanities };

  return <>
    <div className="explorer-controls">
      <div className="search-row">
        <label className="search-box"><Icon name="search" size={19} /><span className="sr-only">{text.search}</span><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === 'Escape' && setQuery('')} placeholder={text.search} />{query ? <button className="search-clear" type="button" onClick={() => { setQuery(''); searchRef.current?.focus(); }} aria-label={text.clear}><Icon name="x" size={14} strokeWidth={2.4} /></button> : <kbd title={text.searchHint}>/</kbd>}</label>
        <span className="result-count" aria-live="polite"><b>{filtered.length}</b> / {professions.length} {text.shown}</span>
      </div>
      <div className="category-chips" role="group" aria-label={text.choose}>{categories.map((item) => <button className={`category-chip ${category === item ? 'active' : ''}`} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} key={item}><Icon name={categoryIcons[item]} size={15} />{categoryLabels[item]}<span className="chip-count">{countFor(item)}</span></button>)}</div>
    </div>
    {filtered.length ? <div className="professions">{filtered.map((profession, index) => {
      const localized = localize(profession);
      const state = progress[profession.slug];
      const href = state?.state === 'done' ? `/result/${profession.slug}` : `/try/${profession.slug}`;
      return <TransitionLink className={`profession-card ${state ? `is-${state.state}` : ''}`} href={href} key={profession.slug} style={{ '--accent': professionColors[profession.color], animationDelay: `${Math.min(index, 6) * 55}ms` } as React.CSSProperties}>
        <div>
          <div className="profession-card-top"><div className="profession-icon"><Icon name={professionIcons[profession.slug]} size={21} /></div>{state && <span className={`progress-badge ${state.state}`}>{state.state === 'done' ? <><Icon name="check" size={12} strokeWidth={3} />{text.done} · {state.score}/5</> : <><span className="pulse-dot" />{text.inProgress} · {state.step}/5</>}</span>}</div>
          <span className="profession-category">{language === 'ru' ? categoryRu[categoryBySlug[profession.slug]] : categoryBySlug[profession.slug]}</span>
          <h3>{localized.title}</h3>
          <p>{localized.description}</p>
        </div>
        <div className="profession-meta"><span><Icon name="layers" size={14} />5 {text.tasksShort}</span><span><Icon name="clock" size={14} />{text.minutes}</span><span className="arrow"><Icon name={state?.state === 'done' ? 'arrowRight' : 'arrowUpRight'} size={16} /></span></div>
        {state?.state === 'progress' && <span className="card-progress" style={{ width: `${(state.step / profession.tasks.length) * 100}%` }} />}
      </TransitionLink>;
    })}</div> : <div className="empty-results"><span className="empty-icon"><Icon name="search" size={26} /></span><strong>{text.noResults}</strong><span>{text.trySearch}</span><button className="btn btn-outline" type="button" onClick={reset}><Icon name="refresh" size={16} />{text.reset}</button></div>}
  </>;
}
