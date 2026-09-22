'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const nextDark = !dark;
    document.documentElement.classList.toggle('dark', nextDark);
    localStorage.setItem('pathtry-theme', nextDark ? 'dark' : 'light');
    setDark(nextDark);
  };

  return <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} title={dark ? 'Light theme' : 'Dark theme'}><span className="theme-icon">{dark ? '☼' : '◐'}</span><span className="theme-label">{dark ? 'Light' : 'Dark'}</span></button>;
}
