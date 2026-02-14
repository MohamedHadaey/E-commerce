import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import ar from './locales/ar.json';

function applyRTL(lng) {
  const root = document.documentElement;
  if (lng === 'ar') {
    root.dir = 'rtl';
    root.lang = 'ar';
  } else {
    root.dir = 'ltr';
    root.lang = 'en';
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

i18n.on('languageChanged', (lng) => {
  applyRTL(lng);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('i18nextLng', lng);
  }
});

export default i18n;

// Apply RTL once i18n is ready (handles async detector)
const applyInitialRTL = () => {
  const lng = i18n.language || '';
  applyRTL(lng.startsWith('ar') ? 'ar' : 'en');
};
if (i18n.isInitialized) {
  applyInitialRTL();
} else {
  i18n.on('initialized', applyInitialRTL);
}
