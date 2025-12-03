"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { TrendingUp, Zap, Clock, CheckCircle2, BarChart3, Activity } from "lucide-react";

const PerformanceSection = () => {
  const t = useTranslations("Landing.Features.Performance");

  const metrics = [
    { icon: Clock, label: "Response Time", value: "1.2s", change: "+15%", color: "text-[#005bbc]" },
    { icon: CheckCircle2, label: "Success Rate", value: "98.5%", change: "+3%", color: "text-green-600" },
    { icon: TrendingUp, label: "Satisfaction", value: "4.9/5", change: "+8%", color: "text-[#ffd600]" },
    { icon: Activity, label: "Uptime", value: "99.9%", change: "+0.2%", color: "text-[#005bbc]" }
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#005bbc]/10 text-[#005bbc] text-sm font-semibold mb-6 border-2 border-[#005bbc]/20">
              <BarChart3 className="w-4 h-4" />
              {t("badge") || "Performance Analytics"}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {t("title") || "Real-time Performance Insights"}
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {t("description") || "Monitor and optimize your AI agents with comprehensive analytics and performance metrics."}
            </p>
            
            <div className="space-y-4">
              {[
                { icon: Zap, text: t("feature1Title") || "Lightning Fast", desc: t("feature1Desc") || "Sub-second response times for optimal user experience" },
                { icon: TrendingUp, text: t("feature2Title") || "Continuous Improvement", desc: t("feature2Desc") || "AI learns and adapts from every interaction" }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white border-2 border-slate-200 hover:border-slate-300 transition-all">
                  <div className="mt-0.5 w-6 h-6 rounded-full bg-[#005bbc]/10 flex items-center justify-center shrink-0 border-2 border-[#005bbc]/20">
                    <feature.icon className="w-3.5 h-3.5 text-[#005bbc]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{feature.text}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl border-2 border-slate-200 p-8 max-w-md mx-auto relative hover:border-slate-300 transition-all">
              
              <div className="flex items-center justify-between mb-8 pb-6 border-b-2 border-slate-200">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Performance Dashboard</h3>
                  <p className="text-sm text-slate-500">Last 30 days</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#005bbc]/10 flex items-center justify-center border-2 border-[#005bbc]/20">
                  <BarChart3 className="w-5 h-5 text-[#005bbc]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {metrics.map((metric, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border-2 border-slate-200 hover:border-slate-300 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <metric.icon className={`w-4 h-4 ${metric.color}`} />
                      <span className="text-xs font-semibold text-slate-500 uppercase">{metric.label}</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-slate-900">{metric.value}</span>
                      <span className="text-xs font-semibold text-green-600">{metric.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-32 bg-gradient-to-t from-[#005bbc]/10 to-transparent rounded-xl border-2 border-slate-200 flex items-end justify-around p-4">
                {[65, 75, 68, 82, 78, 85, 90].map((height, idx) => (
                  <div 
                    key={idx} 
                    className="w-8 bg-[#005bbc] rounded-t-lg transition-all hover:bg-[#004a9f]"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-green-50 border-2 border-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-green-700">All systems optimal</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;
