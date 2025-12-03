"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Bot, CheckCircle2, TrendingUp, Users, BarChart3, ArrowRight, Clock, Zap } from "lucide-react";
import dynamic from "next/dynamic";

const ChartComponent = dynamic(
  () => import('./FeatureAnalyticsChart'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-64 flex items-center justify-center bg-slate-50 rounded-xl border-2 border-slate-200">
        <div className="w-6 h-6 border-2 border-[#005bbc] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
);

const FeatureSolutionFlow = () => {
  const t = useTranslations("Landing.Features.SolutionFlow");

  const steps = [
    {
      icon: Bot,
      number: "01",
      title: "إنشاء ونشر",
      desc: "درّب وكيلاً على بيانات عملك، قم بتكوين الإجراءات، ثم انشره لعملائك",
      color: "bg-[#005bbc]/10",
      borderColor: "border-[#005bbc]/20",
      iconColor: "text-[#005bbc]"
    },
    {
      icon: CheckCircle2,
      number: "02",
      title: "الوكيل يحل المشاكل",
      desc: "يتعامل وكيلك للذكاء الاصطناعي مع استفسارات العملاء ويحل المشاكل تلقائيًا",
      color: "bg-[#ffd600]/10",
      borderColor: "border-[#ffd600]/20",
      iconColor: "text-[#ffd600]"
    },
    {
      icon: TrendingUp,
      number: "03",
      title: "تحسين وتحسين",
      desc: "حسّن أداء وكيلك باستمرار بناءً على التفاعلات الحقيقية",
      color: "bg-[#005bbc]/10",
      borderColor: "border-[#005bbc]/20",
      iconColor: "text-[#005bbc]"
    },
    {
      icon: Users,
      number: "04",
      title: "توجيه للبشر",
      desc: "التصعيد الذكي يوجه المشاكل المعقدة إلى الوكلاء البشريين عند الحاجة",
      color: "bg-[#ffd600]/10",
      borderColor: "border-[#ffd600]/20",
      iconColor: "text-[#ffd600]"
    },
    {
      icon: BarChart3,
      number: "05",
      title: "مراجعة التحليلات",
      desc: "احصل على رؤى وحسّن أداء الوكيل مع تحليلات مفصلة",
      color: "bg-[#005bbc]/10",
      borderColor: "border-[#005bbc]/20",
      iconColor: "text-[#005bbc]"
    },
  ];

  const stats = [
    { 
      icon: Clock, 
      label: "Response Time", 
      value: "1m 42s", 
      bg: "bg-[#005bbc]/10", 
      color: "text-[#005bbc]", 
      border: "border-[#005bbc]/20",
      trend: "+12%"
    },
    { 
      icon: Zap, 
      label: "CSAT Score", 
      value: "4.9/5", 
      bg: "bg-[#ffd600]/10", 
      color: "text-[#ffd600]", 
      border: "border-[#ffd600]/20",
      trend: "+5%"
    },
    { 
      icon: TrendingUp, 
      label: "Resolution", 
      value: "94%", 
      bg: "bg-slate-50", 
      color: "text-slate-600", 
      border: "border-slate-200",
      trend: "+8%"
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#005bbc_1px,transparent_1px),linear-gradient(to_bottom,#005bbc_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#005bbc]/10 text-[#005bbc] text-sm font-semibold mb-6 border-2 border-[#005bbc]/20">
              <Bot className="w-4 h-4" />
              <span>AI Solution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4" dir="rtl">
              حل شامل للذكاء الاصطناعي المحادث
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed" dir="rtl">
              مع Replyxbase، يمكن لعملائك العثور على إجابات وحل المشكلات واتخاذ إجراءات ذات معنى من خلال محادثات سلسة مدعومة بالذكاء الاصطناعي.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="relative p-6 bg-white rounded-2xl border-2 border-slate-200 hover:border-slate-300 transition-all group"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-[#005bbc] text-white flex items-center justify-center text-sm font-bold border-2 border-white group-hover:scale-110 transition-transform">
                  {step.number}
                </div>
                
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-4 border-2 ${step.borderColor} group-hover:scale-110 transition-transform mt-2`}>
                  <step.icon className={`w-8 h-8 ${step.iconColor}`} aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2" dir="rtl">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed" dir="rtl">{step.desc}</p>
                
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 translate-y-[-50%] z-10">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-slate-200">
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Performance Overview Section */}
          <div className="bg-slate-50 rounded-3xl p-8 lg:p-12 border-2 border-slate-200">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Chart Side */}
              <div>
                <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 hover:border-slate-300 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Performance Overview</h3>
                      <p className="text-sm text-slate-500">Last 7 days</p>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    </div>
                  </div>

                  <div className="h-64 w-full mb-6 bg-slate-50 rounded-xl border-2 border-slate-200 p-4">
                    <ChartComponent />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {stats.map((stat, index) => (
                      <div key={index} className="p-4 rounded-xl bg-slate-50 border-2 border-slate-200 hover:border-slate-300 transition-all">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 border-2 ${stat.border} ${stat.bg}`}>
                          <stat.icon className={`w-4 h-4 ${stat.color}`} />
                        </div>
                        <p className="text-xs text-slate-400 font-medium mb-1">{stat.label}</p>
                        <div className="flex items-baseline gap-1.5">
                          <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                          <span className="text-xs font-semibold text-green-600 flex items-center gap-0.5">
                            <Zap className="w-3 h-3" />
                            {stat.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#005bbc]/10 text-[#005bbc] text-sm font-semibold mb-6 border-2 border-[#005bbc]/20">
                  <BarChart3 className="w-4 h-4" />
                  <span>التقارير والتحليلات</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight" dir="rtl">
                  قرارات مبنية على الأرقام
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed" dir="rtl">
                  لوحة تحكم شاملة تعطيك رؤية واضحة عن أداء فريقك، سرعة الاستجابة، ومعدلات رضا العملاء.
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-xl bg-white border-2 border-slate-200 hover:border-slate-300 transition-all">
                    <div className="mt-0.5 w-7 h-7 rounded-full bg-[#005bbc]/10 flex items-center justify-center shrink-0 border-2 border-[#005bbc]/20">
                      <Clock className="w-4 h-4 text-[#005bbc]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1.5" dir="rtl">متابعة حية</h4>
                      <p className="text-slate-500 text-sm leading-relaxed" dir="rtl">راقب الأداء لحظة بلحظة.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-4 rounded-xl bg-white border-2 border-slate-200 hover:border-slate-300 transition-all">
                    <div className="mt-0.5 w-7 h-7 rounded-full bg-[#ffd600]/10 flex items-center justify-center shrink-0 border-2 border-[#ffd600]/20">
                      <BarChart3 className="w-4 h-4 text-[#ffd600]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1.5" dir="rtl">تقارير دورية</h4>
                      <p className="text-slate-500 text-sm leading-relaxed" dir="rtl">احصل على تقارير أسبوعية وشهرية.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeatureSolutionFlow;

