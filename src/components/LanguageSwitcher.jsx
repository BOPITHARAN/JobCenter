import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[9999]">
      <div className="flex gap-2 rounded-full bg-[#2B0013] p-2">
        <Languages className="text-white" size={18} />

        <button onClick={() => changeLanguage("en")} className="text-white">
          EN
        </button>

        <button onClick={() => changeLanguage("ta")} className="text-white">
          தமிழ்
        </button>

        <button onClick={() => changeLanguage("si")} className="text-white">
          සිංහල
        </button>
      </div>
    </div>
  );
}