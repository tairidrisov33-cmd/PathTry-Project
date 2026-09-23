'use client';

import { categoryLabel, type ProfessionDef } from '@/data/catalog/helpers';
import { ui } from '@/data/translations';
import { useLanguage } from '@/components/LanguageProvider';
import TransitionLink from '@/components/TransitionLink';
import Icon, { professionColors, professionIcons } from '@/components/Icon';

export default function TryIntro({ definition }: { definition: ProfessionDef }) {
  const { language } = useLanguage();
  const text = ui[language];
  const lang = language === 'ru' ? 1 : 0;
  return <><TransitionLink className="back" href="/"><Icon name="arrowLeft" size={15} />{text.back}</TransitionLink><div className="try-title"><div className="try-title-row"><span className="try-icon" style={{ background: professionColors[definition.color] }}><Icon name={professionIcons[definition.slug]} size={26} /></span><div><div className="kicker">{text.experiment} · {categoryLabel(definition.category, language)}</div><h1>{definition.title[lang]}</h1></div></div><p className="muted">{definition.reality[lang]}</p><div className="try-meta"><span><Icon name="layers" size={15} />{definition.tasks.length} {text.tasksShort}</span><span><Icon name="clock" size={15} />{text.minutes}</span><span><Icon name="compassNav" size={15} />{language === 'ru' ? 'AI-наставник PathFinder' : 'AI mentor PathFinder'}</span><span><Icon name="shield" size={15} />{language === 'ru' ? 'Без регистрации' : 'No sign-up'}</span></div></div></>;
}
