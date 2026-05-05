import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const translations = {
  en: {
    home: 'Home',
    schemes: 'Schemes',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    profile: 'Profile',
    apply: 'Apply',
    logout: 'Logout',
    welcome: 'Welcome to Smart Government Scheme Portal',
    viewSchemes: 'View All Schemes',
    applyNow: 'Apply Now',
    search: 'Search schemes...',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => translations[language][key] || key;

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage('en');
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
