'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const nextDark = !dark;
    document.documentElement.classList.toggle('dark', nextDark);
    localStorage.setItem('pathtry-theme', nextDark ? 'dark' : 'light');
    setDark(nextDark);
  };

  const labels = language === 'ru' ? { dark: 'Тёмная тема', light: 'Светлая тема' } : { dark: 'Dark theme', light: 'Light theme' };
  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={dark ? labels.light : labels.dark} title={dark ? labels.light : labels.dark}><span className="theme-icon">{dark ? '☼' : '◐'}</span><span className="theme-label">{dark ? labels.light : labels.dark}</span></button>;
}
