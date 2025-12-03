"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/navigation';
import { Globe } from 'lucide-react';

export const AppearanceSettings: React.FC = () => {
  const t = useTranslations("Dashboard.Settings.Appearance");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = [
    { code: "ar", label: "العربية", native: "العربية" },
    { code: "en", label: "English", native: "English (US)" },
    { code: "fr", label: "Français", native: "Français" },
    { code: "es", label: "Español", native: "Español" },
  ];

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-slate-900">{t("title")}</h2>
        <p className="text-base text-slate-500 mt-2">{t("description")}</p>
      </div>

      <div className="space-y-8">
        {/* Language Selection */}
        <div className="bg-white border-2 border-slate-200 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#005bbc]/10 flex items-center justify-center border-2 border-[#005bbc]/20">
              <Globe className="w-5 h-5 text-[#005bbc]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">{t("language.title")}</h3>
              <p className="text-sm text-slate-500">{t("language.description")}</p>
            </div>
          </div>
          <div className="relative">
            <select 
              value={locale}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="w-full bg-slate-50 border-2 border-transparent focus:bg-white focus:border-[#005bbc] focus:ring-0 rounded-xl px-5 py-4 text-base text-slate-900 appearance-none cursor-pointer transition-all duration-200 hover:border-slate-300"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.native}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none rtl:right-auto rtl:left-4">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4">
            {t("language.note") || "Changes will apply immediately and refresh the page."}
          </p>
        </div>
      </div>
    </div>
  );
};
