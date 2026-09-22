'use client';

import type { Profession } from '@/data/professions';
import { professionRu, ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import TransitionLink from '@/components/TransitionLink';
import Icon, { professionColors, professionIcons } from '@/components/Icon';

export default function TryIntro({ profession }: { profession: Profession }) {
  const { language } = useLanguage();
  const text = ui[language];
  const localized = language === 'ru' ? professionRu[profession.slug] : profession;
  return <><TransitionLink className="back" href="/"><Icon name="arrowLeft" size={15} />{text.back}</TransitionLink><div className="try-title"><div className="try-title-row"><span className="try-icon" style={{ background: professionColors[profession.color] }}><Icon name={professionIcons[profession.slug]} size={26} /></span><div><div className="kicker">{text.experiment}</div><h1>{localized.title}</h1></div></div><p className="muted">{localized.reality}</p><div className="try-meta"><span><Icon name="layers" size={15} />{profession.tasks.length} {text.tasksShort}</span><span><Icon name="clock" size={15} />{text.minutes}</span><span><Icon name="shield" size={15} />{language === 'ru' ? 'Без оценок и регистрации' : 'No grades, no sign-up'}</span></div></div></>;
}
