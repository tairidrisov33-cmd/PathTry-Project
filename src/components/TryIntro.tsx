'use client';

import type { Profession } from '@/data/professions';
import { professionRu, ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import TransitionLink from '@/components/TransitionLink';

export default function TryIntro({ profession }: { profession: Profession }) {
  const { language } = useLanguage();
  const text = ui[language];
  const localized = language === 'ru' ? professionRu[profession.slug] : profession;
  return <><TransitionLink className="back" href="/">← {text.back}</TransitionLink><div className="try-title"><div className="kicker">{text.experiment}</div><h1>{localized.title}</h1><p className="muted">{localized.reality}</p></div></>;
}
