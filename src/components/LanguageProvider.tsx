'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Language } from '@/data/translations';

const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: 'en', setLanguage: () => undefined });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  useEffect(() => {
    const saved = localStorage.getItem('pathtry-language');
    const next = saved === 'ru' ? 'ru' : 'en';
    setLanguageState(next);
    document.documentElement.dataset.language = next;
    document.documentElement.lang = next;
  }, []);
  const setLanguage = (next: Language) => { setLanguageState(next); localStorage.setItem('pathtry-language', next); document.documentElement.dataset.language = next; document.documentElement.lang = next; };
  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }
