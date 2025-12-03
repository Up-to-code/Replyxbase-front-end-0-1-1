"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import HeroVisual from "./HeroVisual";

const HeroSection = React.memo(({ session: initialSession }: { session?: any }) => {
  const { data: session } = authClient.useSession();
  const t = useTranslations("Landing.Hero");

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20"
      aria-label={t("ariaLabel")}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#005bbc]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#ffd600]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#005bbc]/10 text-[#005bbc] text-sm font-semibold mb-6 border-2 border-[#005bbc]/20">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Customer Experience</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-slate-900">
                {t("heading.line1")}
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-600 leading-relaxed max-w-2xl">
                {t("description")}
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                <Link 
                  href={session ? "/dashboard" : "/signup"} 
                  className="group"
                  aria-label={t("cta.getStarted.ariaLabel")}
                >
                  <button 
                    className="h-12 px-8 text-base font-semibold rounded-xl bg-[#005bbc] text-white hover:bg-[#004a9f] transition-all flex items-center justify-center gap-2 border-2 border-[#005bbc] focus:outline-none focus:ring-4 focus:ring-[#005bbc]/20 active:scale-95"
                    aria-label={t("cta.getStarted.ariaLabel")}
                  >
                    <span>{t("cta.buildAgent")}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                </Link>
                
                <div className="text-sm text-slate-500 font-medium pt-3">
                  {t("cta.noCreditCard")}
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <HeroVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
