'use client';

import { useEffect, useState } from 'react';
import type { Profession } from '@/data/professions';
import TransitionLink from '@/components/TransitionLink';
import { professionRu, ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import { professionRuDetails } from '@/data/professionRuDetails';

type SavedAnswer = { score: number; enjoyment: string };

export default function ResultClient({ profession }: { profession: Profession }) {
  const { language } = useLanguage();
  const text = ui[language];
  const [result, setResult] = useState({ score: 0, enjoyment: 0, ready: false });

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`pathtry-${profession.slug}`) || '{}');
      const answers: SavedAnswer[] = saved.answers || [];
      const score = answers.reduce((total, answer) => total + answer.score, 0);
      const values: Record<string, number> = language === 'ru' ? { Да: 2, 'Так себе': 1, Нет: 0 } : { Yes: 2, 'So-so': 1, No: 0 };
      const enjoyment = answers.length
        ? Math.round(answers.reduce((total, answer) => total + (values[answer.enjoyment] || 0), 0) / answers.length * 50)
        : 0;
      setResult({ score, enjoyment, ready: true });
    } catch {
      setResult((current) => ({ ...current, ready: true }));
    }
  }, [language, profession.slug]);

  const verdict = result.score >= 4 && result.enjoyment >= 65
    ? text.good
    : result.score >= 3 || result.enjoyment >= 40
      ? text.exploreMore
      : text.probably;
  const localized = language === 'ru' ? professionRu[profession.slug] : profession;
  const details = language === 'ru' ? professionRuDetails[profession.slug] : profession;
  const reason = verdict === text.good ? text.goodReason : verdict === text.exploreMore ? text.exploreReason : text.probablyReason;

  return <>
    <div className="result-hero">
      <div><div className="kicker">{text.snapshot}</div><h1>{localized.title}</h1><p className="muted">{text.resultText}</p></div>
      <div className="score-card"><span className="muted">{text.workScore}</span><div className="score">{result.score}/5</div><div className="verdict">{result.ready ? verdict : text.reading}</div><span>{reason}</span><br /><span className="muted">{text.enjoyment}: {result.enjoyment}%</span></div>
    </div>
    <div className="result-section"><h2>{text.subjects}</h2><div><p className="muted">{text.foundations}</p><div className="tag-list">{[...details.subjects, ...details.exams].map((item) => <span className="tag" key={item}>{item}</span>)}</div></div></div>
    <div className="result-section"><h2>{text.majors}</h2><div className="tag-list">{details.majors.map((major) => <span className="tag" key={major}>{major}</span>)}</div></div>
    <div className="result-section"><h2>{text.steps}</h2><ol className="next-list">{details.nextSteps.map((next) => <li key={next}>{next}</li>)}</ol></div>
    <div className="result-actions"><TransitionLink className="btn btn-primary" href="/">{text.another}</TransitionLink><button className="btn btn-outline" onClick={() => window.print()}>{text.pdf}</button></div>
  </>;
}
