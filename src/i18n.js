import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./local/en.json";
import es from "./local/es.json";
import ko from "./local/ko.json";
import lao from "./local/lao.json";

const savedLanguage = localStorage.getItem("language") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      ko: { translation: ko },
      lao: { translation: lao }
    },
    lng: savedLanguage, 
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false 
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"]
    }
  });

export default i18n;
