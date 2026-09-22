'use client';

import { useMemo, useState } from 'react';
import type { Profession } from '@/data/professions';
import TransitionLink from '@/components/TransitionLink';
import { categoryRu, professionRu, ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';

const colors: Record<string, string> = { coral: '#f16d59', teal: '#2a9d8f', gold: '#e1a33f', lilac: '#9b82c8', blue: '#3867db' };
const categories = ['All', 'Tech & Data', 'Healthcare & Science', 'Creative & Media', 'Humanities & Law'];
const categoryBySlug: Record<string, string> = {
  'software-developer': 'Tech & Data', 'data-analyst': 'Tech & Data',
  doctor: 'Healthcare & Science', psychologist: 'Healthcare & Science',
  designer: 'Creative & Media', journalist: 'Creative & Media', architect: 'Creative & Media',
  lawyer: 'Humanities & Law', teacher: 'Humanities & Law', entrepreneur: 'Humanities & Law'
};

export default function ProfessionExplorer({ professions }: { professions: Profession[] }) {
  const { language } = useLanguage();
  const text = ui[language];
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const filtered = useMemo(() => professions.filter((profession) => {
    const localized = language === 'ru' ? professionRu[profession.slug] : profession;
    const searchable = `${localized.title} ${localized.description}`.toLowerCase();
    return (category === 'All' || categoryBySlug[profession.slug] === category) && searchable.includes(query.trim().toLowerCase());
  }), [category, language, professions, query]);

  const reset = () => { setQuery(''); setCategory('All'); };

  const categoryLabels: Record<string, string> = { All: text.all, 'Tech & Data': text.tech, 'Healthcare & Science': text.health, 'Creative & Media': text.creative, 'Humanities & Law': text.humanities };
  return <>
    <div className="explorer-controls">
      <label className="search-box"><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></svg><span className="sr-only">{text.search}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={text.search} /></label>
      <div className="category-chips" aria-label={text.choose}>{categories.map((item) => <button className={`category-chip ${category === item ? 'active' : ''}`} type="button" onClick={() => setCategory(item)} key={item}>{categoryLabels[item]}</button>)}</div>
    </div>
    {filtered.length ? <div className="professions">{filtered.map((profession) => { const localized = language === 'ru' ? professionRu[profession.slug] : profession; return <TransitionLink className="profession-card" href={`/try/${profession.slug}`} key={profession.slug}><div><div className="profession-icon" style={{ background: colors[profession.color] }}>{profession.icon}</div><span className="profession-category">{language === 'ru' ? categoryRu[categoryBySlug[profession.slug]] : categoryBySlug[profession.slug]}</span><h3>{localized.title}</h3><p>{localized.description}</p></div><span className="arrow">↗</span></TransitionLink>; })}</div> : <div className="empty-results"><strong>{text.noResults}</strong><span>{text.trySearch}</span><button className="btn btn-outline" type="button" onClick={reset}>{text.reset}</button></div>}
  </>;
}
