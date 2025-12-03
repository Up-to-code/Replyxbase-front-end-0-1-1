"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { MessageCircle, Send, Globe, Zap, ArrowRight } from "lucide-react";

const OmnichannelFlow = () => {
  const t = useTranslations("Landing.Features.Omnichannel");

  const channels = [
    { 
      icon: MessageCircle, 
      label: "WhatsApp", 
      color: "bg-[#005bbc]/10", 
      borderColor: "border-[#005bbc]/20", 
      iconColor: "text-[#005bbc]",
      count: "2.4K"
    },
    { 
      icon: Globe, 
      label: "Website", 
      color: "bg-[#ffd600]/10", 
      borderColor: "border-[#ffd600]/20", 
      iconColor: "text-[#ffd600]",
      count: "1.8K"
    },
    { 
      icon: Send, 
      label: "Telegram", 
      color: "bg-[#005bbc]/10", 
      borderColor: "border-[#005bbc]/20", 
      iconColor: "text-[#005bbc]",
      count: "950"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#005bbc]/10 text-[#005bbc] text-sm font-semibold mb-6 border-2 border-[#005bbc]/20">
            <Zap className="w-4 h-4" />
            <span>Unified Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 lg:p-12 hover:border-slate-300 transition-all">
          <div className="grid md:grid-cols-3 gap-8 items-center relative">
            {channels.map((channel, idx) => (
              <div key={idx} className="text-center relative group">
                <div className={`w-20 h-20 ${channel.color} rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 ${channel.borderColor} transition-all group-hover:scale-110`}>
                  <channel.icon className={`w-10 h-10 ${channel.iconColor}`} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{channel.label}</h3>
                <div className="text-sm text-slate-500 font-medium">{channel.count} messages</div>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-slate-200">
                      <ArrowRight className="w-5 h-5 text-slate-400" aria-hidden="true" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-8 py-5 bg-[#005bbc]/10 rounded-2xl border-2 border-[#005bbc]/20 hover:border-[#005bbc]/30 transition-all group">
              <div className="w-12 h-12 bg-[#005bbc] rounded-xl flex items-center justify-center border-2 border-[#005bbc] group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div className="text-left">
                <span className="text-xl font-bold text-slate-900 block">Unified AI Brain</span>
                <span className="text-sm text-slate-500">Processing all channels</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OmnichannelFlow;
