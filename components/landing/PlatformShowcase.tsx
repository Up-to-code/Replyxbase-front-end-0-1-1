"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Globe, MessageCircle, Smartphone, ArrowRight } from "lucide-react";
import Link from "next/link";

const PlatformShowcase = () => {
  const t = useTranslations("Landing.PlatformShowcase");

  const platforms = [
    { 
      icon: Globe, 
      title: t("website.title"), 
      desc: t("website.desc"),
      color: "bg-[#005bbc]/10",
      borderColor: "border-[#005bbc]/20",
      iconColor: "text-[#005bbc]"
    },
    { 
      icon: MessageCircle, 
      title: t("whatsapp.title"), 
      desc: t("whatsapp.desc"),
      color: "bg-[#ffd600]/10",
      borderColor: "border-[#ffd600]/20",
      iconColor: "text-[#ffd600]"
    },
    { 
      icon: Smartphone, 
      title: t("messenger.title"), 
      desc: t("messenger.desc"),
      color: "bg-[#005bbc]/10",
      borderColor: "border-[#005bbc]/20",
      iconColor: "text-[#005bbc]"
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {platforms.map((platform, idx) => (
              <div
                key={idx}
                className="relative p-8 rounded-2xl border-2 border-slate-200 hover:border-slate-300 transition-all group"
              >
                <div className={`w-16 h-16 ${platform.color} rounded-xl flex items-center justify-center mb-4 border-2 ${platform.borderColor} group-hover:scale-110 transition-transform`}>
                  <platform.icon className={`w-8 h-8 ${platform.iconColor}`} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{platform.title}</h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">{platform.desc}</p>
                <Link 
                  href="#"
                  className="text-sm font-semibold text-[#005bbc] hover:text-[#004a9f] transition-colors inline-flex items-center gap-2 group/link"
                >
                  {t("learnMore")}
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformShowcase;
