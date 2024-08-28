import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

interface LanguageSwitcherProps {
  currentLanguage: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLanguage }) => {
  const { i18n } = useTranslation();
  const router = useRouter();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // refresh URL without page reload
    router.push(router.pathname, undefined, { locale: lng });
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')} disabled={currentLanguage === 'en'}>
        English
      </button>
      <button onClick={() => changeLanguage('ja')} disabled={currentLanguage === 'ja'}>
        日本語
      </button>
    </div>
  );
};

export default LanguageSwitcher;
