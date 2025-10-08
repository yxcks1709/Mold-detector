import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importa las traducciones
import en from "./locales/en.json";
import es from "./locales/es.json";
import ko from "./locales/ko.json";

// Detecta el idioma guardado o usa inglés por defecto
const savedLanguage = localStorage.getItem("language") || "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      ko: { translation: ko }
    },
    lng: savedLanguage, // idioma inicial
    fallbackLng: "en", // si falta alguna traducción
    interpolation: {
      escapeValue: false // react ya hace el escape
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"]
    }
  });

export default i18n;
