import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import Backend from "i18next-http-backend";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// import uz from "../public/locales/uz/translation.json";
// import ru from "../public/locales/ru/translation.json";
// import us from "../public/locales/us/translation.json";

import en from "../src/containers/lang/en.json";
import uz from "../src/containers/lang/uz.json";
import ru from "../src/containers/lang/ru.json";
// import us from "../src/containers/lang/us.json";
// import us from "../src/containers/lang/"
// import ru from "../src/containers/lang/ru.json";
// import uz from "../src/containers/lang/uz.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

const resources = {
  en: {
    translation: en,
  },
  uz: {
    translation: uz,
  },
  ru: {
    translation: ru,
  },
};
i18n
  // .use(Backend)
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    detection: {
      checkWhitelist: true, // options for language detection
    },
    debug: false,

    fallbackLng: "ru",
    keySeparator: false,
    debug: true,
    whitelist: resources,
    // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: { useSuspense: false },
  });
export default i18n;

// Importing translation files

//Creating object with the variables of imported translation files

//i18N Initialization
