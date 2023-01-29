import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      human: require("./en/human.json"),
      table: require("./en/table.json"),
      breed: require("./en/breed.json"),
      form: require("./en/form.json"),
    },
    es: {
      human: require("./es/human.json"),
      table: require("./es/table.json"),
      breed: require("./es/breed.json"),
      form: require("./es/form.json"),
    },
    pr: {
      human: require("./pr/human.json"),
      table: require("./pr/table.json"),
      breed: require("./pr/breed.json"),
      form: require("./pr/form.json"),
    },
    fr: {
      human: require("./fr/human.json"),
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
