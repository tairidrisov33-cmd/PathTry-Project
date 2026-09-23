'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Language } from '@/data/translations';

const LanguageContext = createContext<{ language: Language; setLanguage: (language: Language) => void }>({ language: 'en', setLanguage: () => undefined });

// The server renders in the language from the cookie; the cookie keeps later page loads in sync.
function persist(language: Language) {
  document.cookie = `pathtry-language=${language}; path=/; max-age=31536000; samesite=lax`;
  try { localStorage.setItem('pathtry-language', language); } catch { /* storage may be blocked */ }
  document.documentElement.dataset.language = language;
  document.documentElement.lang = language;
}

export function LanguageProvider({ children, initialLanguage }: { children: React.ReactNode; initialLanguage: Language }) {
  const router = useRouter();
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  useEffect(() => {
    // Visitors from before the cookie existed keep the language they chose earlier.
    let saved: string | null = null;
    try { saved = localStorage.getItem('pathtry-language'); } catch { /* storage may be blocked */ }
    const next = saved === 'ru' || saved === 'en' ? saved : initialLanguage;
    setLanguageState(next);
    persist(next);
  }, [initialLanguage]);
  // Refreshing re-renders server-side parts (page titles) in the new language without a reload.
  const setLanguage = (next: Language) => { setLanguageState(next); persist(next); router.refresh(); };
  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }
