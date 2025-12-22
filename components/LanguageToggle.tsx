
import React from 'react';
import { Language } from '../types';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="inline-flex bg-slate-100 p-1 rounded-lg border border-slate-200">
      {Object.values(Language).map((lang) => (
        <button
          key={lang}
          onClick={() => onLanguageChange(lang)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
            currentLanguage === lang
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
