"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { Globe, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function LanguageSwitcher() {
  const t = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", label: t("localeEnglish"), native: "English" },
    { code: "ar", label: t("localeArabic"), native: "العربية" },
    { code: "fr", label: t("localeFrench"), native: "Français" },
    { code: "es", label: t("localeSpanish"), native: "Español" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
    router.replace(pathname, { locale: newLocale });
    }
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all duration-200 border-2 border-transparent hover:border-slate-200 active:scale-95 flex items-center gap-2"
        aria-label={t("languageSwitchLabel")}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium uppercase hidden sm:block">{locale}</span>
      </button>

      {isOpen && (
        <div className="absolute end-0 top-full mt-2 w-48 bg-white border-2 border-slate-200 rounded-2xl shadow-lg z-100 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="py-1">
            {languages.map((lang) => (
            <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-start hover:bg-slate-50 transition-colors ${
                  locale === lang.code 
                    ? "text-[#005bbc] font-semibold bg-[#005bbc]/10" 
                    : "text-slate-700"
              }`}
            >
                <div className="flex items-center gap-3">
                  <span className="font-medium">{lang.native}</span>
                  <span className="text-xs text-slate-500">({lang.label})</span>
                </div>
                {locale === lang.code && (
                  <Check className="w-4 h-4 text-[#005bbc] flex-shrink-0" />
                )}
            </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
