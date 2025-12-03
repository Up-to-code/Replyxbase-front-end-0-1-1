"use client";
import React, { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Common");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", label: t("localeEnglish"), flag: "🇺🇸" },
    { code: "ar", label: t("localeArabic"), flag: "🇸🇦" },
    { code: "fr", label: t("localeFrench"), flag: "🇫🇷" },
    { code: "es", label: t("localeSpanish"), flag: "🇪🇸" }
  ];

  const handleSwitch = (newLocale: string) => {
    setIsOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium text-slate-600 border-2 border-transparent hover:border-slate-200"
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase">{locale}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl border-2 border-slate-200 overflow-hidden z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSwitch(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-slate-50 transition-colors border-2 border-transparent ${
                  locale === lang.code 
                    ? 'bg-[#005bbc]/10 text-[#005bbc] font-semibold border-[#005bbc]/20' 
                    : 'text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </div>
                {locale === lang.code && <Check className="w-4 h-4 text-[#005bbc]" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
