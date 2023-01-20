import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./app";
import { Theme } from "./providers";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import jockey_es from "./i18n/es/jockey.json";
import jockey_en from "./i18n/en/jockey.json";

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "en", // language to use
  resources: {
    en: {
      jockey: jockey_en,
    },
    es: {
      jockey: jockey_es,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Theme />
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
