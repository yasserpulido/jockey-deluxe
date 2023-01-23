import { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const { i18n } = useTranslation();

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <button onClick={() => handleLanguageChange("en")}>English</button>
      <button onClick={() => handleLanguageChange("es")}>Español</button>
      <button onClick={() => handleLanguageChange("pr")}>Português</button>
    </div>
  );
};

export default LanguageSwitcher;
