import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import zh from './zh-CN.json';
import en from './en.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: en,
  },
  zh: {
    translation: zh,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: window.navigator.language || 'zh',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
