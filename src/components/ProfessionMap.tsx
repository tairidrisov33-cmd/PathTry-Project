'use client';

import { useEffect, useState } from 'react';
import type { ProfessionSummary } from '@/data/professions';
import { storageKey } from '@/data/catalog/helpers';
import type { Language } from '@/data/translations';
import { scoreExperiment, type ExperimentScore, type SavedAnswer } from '@/lib/scoring';
import TransitionLink from '@/components/TransitionLink';
import Icon, { professionColors, professionIcons } from '@/components/Icon';

type Row = { profession: ProfessionSummary; score: ExperimentScore };

// Every experiment this browser has tried, compared side by side: where the fit and the energy
// are highest. Scored with the same scoreExperiment() as the result page, so numbers match.
export default function ProfessionMap({ index, current, alternative, language }: { index: ProfessionSummary[]; current: string; alternative: ProfessionSummary; language: Language }) {
  const ru = language === 'ru';
  const lang = ru ? 1 : 0;
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const found: Row[] = [];
    for (const profession of index) {
      try {
        const answers: SavedAnswer[] = JSON.parse(localStorage.getItem(storageKey(profession.slug)) || '{}').answers ?? [];
        if (Array.isArray(answers) && answers.length) found.push({ profession, score: scoreExperiment(answers, profession.tasks) });
      } catch { /* unreadable progress is skipped */ }
    }
    setRows(found.sort((a, b) => b.score.matchPercent - a.score.matchPercent));
  }, [index]);

  if (!rows.length) return null;
  const best = rows[0];
  const title = (profession: ProfessionSummary) => profession.title[lang].replace(/­/g, '');

  return <section className="profession-map" aria-labelledby="map-title">
    <div className="recap-head"><h2 id="map-title"><Icon name="map" size={20} />{ru ? 'Твоя карта профессий' : 'Your profession map'}</h2><span className="muted">{ru ? 'Все профессии, которые ты попробовал(а), рядом: где совпадение и энергия выше.' : 'Every profession you have tried, side by side: where the fit and the energy are highest.'}</span></div>
    <ol className="map-list">{rows.map(({ profession, score }) => <li key={profession.slug} className={profession.slug === current ? 'is-current' : ''}>
      <span className="map-icon" style={{ background: professionColors[profession.color] }}><Icon name={professionIcons[profession.slug]} size={16} /></span>
      <span className="map-name">{title(profession)}{profession.slug === best.profession.slug && rows.length > 1 && <em className="map-badge">{ru ? 'лучшее совпадение' : 'best fit'}</em>}{!score.complete && <em className="map-note">{ru ? `${score.answered} из ${score.total}` : `${score.answered} of ${score.total}`}</em>}</span>
      <span className="map-bar" aria-hidden="true"><span style={{ width: `${score.matchPercent}%` }} /></span>
      <b className="map-match">{score.matchPercent}%</b>
      <span className="map-energy" title={ru ? 'интерес и энергия' : 'interest & energy'}><Icon name="flame" size={13} />{score.energy === null ? '—' : `${score.energy}%`}</span>
    </li>)}</ol>
    {rows.length === 1 && <p className="map-cta"><Icon name="route" size={15} />{ru ? 'Попробуй вторую профессию — и здесь появится сравнение: ' : 'Try a second profession to see a comparison here: '}<TransitionLink href={`/try/${alternative.slug}`}>{title(alternative)}<Icon name="arrowRight" size={14} /></TransitionLink></p>}
  </section>;
}
