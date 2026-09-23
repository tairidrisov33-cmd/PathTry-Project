'use client';

import { useEffect, useRef, useState } from 'react';
import { badges, categories, categoryLabel, professions, storageKey, type Badge, type CategoryKey } from '@/data/professions';
import TransitionLink from '@/components/TransitionLink';
import { ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import Icon, { professionColors, professionIcons, type IconName } from '@/components/Icon';

type Filter = 'all' | CategoryKey;
type Progress = { state: 'done' | 'progress'; score: number; step: number };

const categoryIcons: Record<Filter, IconName> = { all: 'grid', tech: 'code', health: 'heart', creative: 'palette', society: 'book' };
const badgeIcons: Record<Badge, IconName> = { popular: 'flame', demand: 'trend', fast: 'bolt', new: 'star' };
const badgeLabels: Record<Badge, [string, string]> = { popular: ['Popular', 'Популярное'], demand: ['High demand', 'Востребовано'], fast: ['Fast try', 'Быстрый старт'], new: ['New', 'Новое'] };

export default function ProfessionExplorer() {
  const { language } = useLanguage();
  const text = ui[language];
  const lang = language === 'ru' ? 1 : 0;
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [progress, setProgress] = useState<Record<string, Progress>>({});
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const next: Record<string, Progress> = {};
    professions.forEach((profession) => {
      try {
        const answers: { score: number }[] = JSON.parse(localStorage.getItem(storageKey(profession.slug)) || 'null')?.answers || [];
        if (answers.length >= profession.tasks.length) next[profession.slug] = { state: 'done', score: answers.reduce((total, answer) => total + answer.score, 0), step: answers.length };
        else if (answers.length > 0) next[profession.slug] = { state: 'progress', score: 0, step: answers.length };
      } catch { /* ignore unreadable progress */ }
    });
    setProgress(next);
  }, []);

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

  // Search matches both languages, so "врач" and "doctor" both find the same card.
  const matchesQuery = (slug: string) => {
    const profession = professions.find((item) => item.slug === slug)!;
    const haystack = [...profession.title, ...profession.description].join(' ').replace(/­/g, '').toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  };
  const inFilter = (key: Filter, category: CategoryKey) => key === 'all' || key === category;
  const filtered = professions.filter((profession) => inFilter(filter, profession.category) && matchesQuery(profession.slug));
  const countFor = (key: Filter) => professions.filter((profession) => inFilter(key, profession.category) && matchesQuery(profession.slug)).length;
  const filters: { key: Filter; label: string }[] = [{ key: 'all', label: text.all }, ...categories.map((category) => ({ key: category.key, label: category.label[lang] }))];
  const reset = () => { setQuery(''); setFilter('all'); };

  return <>
    <div className="explorer-controls">
      <div className="search-row">
        <label className="search-box"><Icon name="search" size={19} /><span className="sr-only">{text.search}</span><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => event.key === 'Escape' && setQuery('')} placeholder={text.search} />{query ? <button className="search-clear" type="button" onClick={() => { setQuery(''); searchRef.current?.focus(); }} aria-label={text.clear}><Icon name="x" size={14} strokeWidth={2.4} /></button> : <kbd title={text.searchHint}>/</kbd>}</label>
        <span className="result-count" aria-live="polite"><b>{filtered.length}</b> / {professions.length} {text.shown}</span>
      </div>
      <div className="category-chips" role="group" aria-label={text.choose}>{filters.map((item) => <button className={`category-chip ${filter === item.key ? 'active' : ''}`} type="button" aria-pressed={filter === item.key} onClick={() => setFilter(item.key)} key={item.key}><Icon name={categoryIcons[item.key]} size={15} />{item.label}<span className="chip-count">{countFor(item.key)}</span></button>)}</div>
    </div>
    {filtered.length ? <div className="professions" key={`${filter}-${query}`}>{filtered.map((profession, index) => {
      const state = progress[profession.slug];
      const href = state?.state === 'done' ? `/result/${profession.slug}` : `/try/${profession.slug}`;
      const cardBadges = badges[profession.slug] ?? [];
      return <TransitionLink className={`profession-card ${state ? `is-${state.state}` : ''}`} href={href} key={profession.slug} style={{ '--accent': professionColors[profession.color], animationDelay: `${Math.min(index, 8) * 45}ms` } as React.CSSProperties}>
        <div>
          <div className="profession-card-top"><div className="profession-icon"><Icon name={professionIcons[profession.slug]} size={21} /></div>{state ? <span className={`progress-badge ${state.state}`}>{state.state === 'done' ? <><Icon name="check" size={12} strokeWidth={3} />{text.done} · {state.score}/{profession.tasks.length}</> : <><span className="pulse-dot" />{text.inProgress} · {state.step}/{profession.tasks.length}</>}</span> : cardBadges[0] && <span className={`market-badge badge-${cardBadges[0]}`}><Icon name={badgeIcons[cardBadges[0]]} size={11} />{badgeLabels[cardBadges[0]][lang]}</span>}</div>
          <span className="profession-category">{categoryLabel(profession.category, language)}</span>
          <h3>{profession.title[lang]}</h3>
          <p>{profession.description[lang]}</p>
          {cardBadges.length > 1 && !state && <div className="badge-row">{cardBadges.slice(1).map((badge) => <span className={`market-badge badge-${badge}`} key={badge}><Icon name={badgeIcons[badge]} size={11} />{badgeLabels[badge][lang]}</span>)}</div>}
        </div>
        <div className="profession-meta"><span><Icon name="layers" size={14} />{profession.tasks.length} {text.tasksShort}</span><span><Icon name="clock" size={14} />{text.minutes}</span><span className="arrow"><Icon name={state?.state === 'done' ? 'arrowRight' : 'arrowUpRight'} size={16} /></span></div>
        {state?.state === 'progress' && <span className="card-progress" style={{ width: `${(state.step / profession.tasks.length) * 100}%` }} />}
      </TransitionLink>;
    })}</div> : <div className="empty-results"><span className="empty-icon"><Icon name="search" size={26} /></span><strong>{text.noResults}</strong><span>{text.trySearch}</span><button className="btn btn-outline" type="button" onClick={reset}><Icon name="refresh" size={16} />{text.reset}</button></div>}
  </>;
}
