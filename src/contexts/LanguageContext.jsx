import { createContext, useContext, useState, useEffect } from 'react';
import ja from '../locales/ja.json';
import en from '../locales/en.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children, type = 'control' }) => {
  const [lang, setLang] = useState('ja');
  
  // 言語に応じた辞書を取得
  const dict = lang === 'ja' ? ja[type] : en[type];

  useEffect(() => {
    // localStorageから言語設定を読み込む
    const savedLang = localStorage.getItem(`lang_${type}`);
    if (savedLang) {
      setLang(savedLang);
    }

    // Electronからの言語変更イベントを監視
    if (window.electron && window.electron.receive) {
      window.electron.receive('change-language', ({ type: eventType, lang: newLang }) => {
        if (eventType === type) {
          changeLang(newLang);
        }
      });
    }
  }, [type]);

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem(`lang_${type}`, newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, dict, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}; 