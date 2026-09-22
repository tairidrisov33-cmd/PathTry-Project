'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import Icon from '@/components/Icon';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const nextDark = !dark;
    const root = document.documentElement;
    root.classList.add('theme-switching');
    root.classList.toggle('dark', nextDark);
    root.style.colorScheme = nextDark ? 'dark' : 'light';
    localStorage.setItem('pathtry-theme', nextDark ? 'dark' : 'light');
    setDark(nextDark);
    window.setTimeout(() => root.classList.remove('theme-switching'), 500);
  };

  const labels = language === 'ru' ? { dark: 'Тёмная тема', light: 'Светлая тема' } : { dark: 'Dark theme', light: 'Light theme' };
  return <button className={`theme-toggle ${dark ? 'is-dark' : ''}`} type="button" onClick={toggleTheme} aria-label={dark ? labels.light : labels.dark} title={dark ? labels.light : labels.dark}><span className="theme-icon" aria-hidden="true"><Icon name="sun" size={16} className="theme-sun" /><Icon name="moon" size={15} className="theme-moon" /></span><span className="theme-label">{dark ? labels.light : labels.dark}</span></button>;
}
