'use client';

import { useLanguage } from '@/components/LanguageProvider';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return <div className="language-toggle" aria-label="Choose language"><button className={language === 'en' ? 'active' : ''} type="button" onClick={() => setLanguage('en')}>EN</button><button className={language === 'ru' ? 'active' : ''} type="button" onClick={() => setLanguage('ru')}>RU</button></div>;
}
