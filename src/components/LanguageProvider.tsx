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
  // The server already picked the language (?lang=, cookie, or browser); the client just follows it.
  useEffect(() => { setLanguageState(initialLanguage); persist(initialLanguage); }, [initialLanguage]);
  // Refreshing re-renders server-side parts (page titles) in the new language without a reload.
  // A ?lang= in the address would switch it straight back, so it is dropped on a manual switch.
  const setLanguage = (next: Language) => {
    setLanguageState(next); persist(next);
    const url = new URL(window.location.href);
    if (!url.searchParams.has('lang')) { router.refresh(); return; }
    url.searchParams.delete('lang');
    router.replace(`${url.pathname}${url.search}${url.hash}`, { scroll: false });
  };
  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }
