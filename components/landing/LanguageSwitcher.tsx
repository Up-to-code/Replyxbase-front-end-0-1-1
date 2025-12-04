"use client";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/navigation";

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Common");

  const languages = [
    { code: "en", label: t("localeEnglish") },
    { code: "ar", label: t("localeArabic") },
    { code: "fr", label: t("localeFrench") },
    { code: "es", label: t("localeSpanish") }
  ];

  const handleSwitch = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <select
      value={locale}
      onChange={(e) => handleSwitch(e.target.value)}
      className="px-3 py-2 rounded-xl border-2 border-slate-200 text-sm bg-white hover:bg-slate-50 focus:border-[#005bbc] focus:outline-none transition-colors"
      aria-label={t("languageSwitchLabel")}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
