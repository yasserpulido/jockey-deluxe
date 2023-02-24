import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  resources: {
    en: {
      breed: require("./en/breed.json"),
      form: require("./en/form.json"),
      horse: require("./en/horse.json"),
      human: require("./en/human.json"),
      stud: require("./en/stud.json"),
      table: require("./en/table.json"),
      track: require("./en/track.json"),
      category: require("./en/category.json"),
    },
    es: {
      breed: require("./es/breed.json"),
      form: require("./es/form.json"),
      human: require("./es/human.json"),
      stud: require("./es/stud.json"),
      table: require("./es/table.json"),
      track: require("./es/track.json"),
    },
    pr: {
      breed: require("./pr/breed.json"),
      form: require("./pr/form.json"),
      human: require("./pr/human.json"),
      stud: require("./pr/stud.json"),
      table: require("./pr/table.json"),
      track: require("./pr/track.json"),
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
