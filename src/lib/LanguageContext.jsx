import React, { createContext, useContext, useState, useCallback } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const toggleLang = useCallback(() => setLang(l => l === 'en' ? 'fr' : 'en'), []);
  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}

export function t(translations, lang) {
  return translations[lang] || translations.en;
}