'use client';

import TransitionLink from '@/components/TransitionLink';
import { useLanguage } from '@/components/LanguageProvider';
import Icon from '@/components/Icon';

export default function NotFound() {
  const ru = useLanguage().language === 'ru';
  return <main className="try-shell"><div className="empty-results result-empty"><span className="empty-icon"><Icon name="compassNav" size={26} /></span><strong>{ru ? 'Такой страницы нет' : 'Page not found'}</strong><span>{ru ? 'Возможно, ссылка устарела. Выбери профессию и попробуй её за 10 минут.' : 'The link may be out of date. Pick a profession and try it in 10 minutes.'}</span><TransitionLink className="btn btn-primary" href="/#professions">{ru ? 'Все профессии' : 'All professions'}<Icon name="arrowRight" size={16} /></TransitionLink></div></main>;
}
