import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      jockey: require("./en/jockey.json"),
      table: require("./en/table.json"),
      breed: require("./en/breed.json"),
      form: require("./en/form.json"),
    },
    es: {
      jockey: require("./es/jockey.json"),
      table: require("./es/table.json"),
      breed: require("./es/breed.json"),
      form: require("./es/form.json"),
    },
    pr: {
      jockey: require("./pr/jockey.json"),
      table: require("./pr/table.json"),
      breed: require("./pr/breed.json"),
      form: require("./pr/form.json"),
    },
    fr: {
      jockey: require("./fr/jockey.json"),
      table: require("./fr/table.json"),
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
