"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Brain, Sparkles, Zap, Shield, Globe, MessageSquare, TrendingUp, CheckCircle2 } from "lucide-react";

const AICapabilitiesSection = () => {
  const t = useTranslations("Landing.AICapabilities");

  const capabilities = [
    {
      icon: Brain,
      title: "Natural Language Understanding",
      description: "Advanced AI that understands context, intent, and sentiment across all conversations.",
      color: "bg-[#005bbc]/10",
      borderColor: "border-[#005bbc]/20",
      iconColor: "text-[#005bbc]"
    },
    {
      icon: Sparkles,
      title: "Multi-Language Support",
      description: "Communicate seamlessly in 50+ languages with automatic translation and localization.",
      color: "bg-[#ffd600]/10",
      borderColor: "border-[#ffd600]/20",
      iconColor: "text-[#ffd600]"
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Instant responses with sub-second latency, powered by optimized AI infrastructure.",
      color: "bg-[#005bbc]/10",
      borderColor: "border-[#005bbc]/20",
      iconColor: "text-[#005bbc]"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "End-to-end encryption, SOC 2 compliant, with data privacy and compliance built-in.",
      color: "bg-[#ffd600]/10",
      borderColor: "border-[#ffd600]/20",
      iconColor: "text-[#ffd600]"
    },
    {
      icon: Globe,
      title: "Omnichannel Intelligence",
      description: "Unified AI brain that connects WhatsApp, Telegram, Webchat, and Email seamlessly.",
      color: "bg-[#005bbc]/10",
      borderColor: "border-[#005bbc]/20",
      iconColor: "text-[#005bbc]"
    },
    {
      icon: TrendingUp,
      title: "Continuous Learning",
      description: "AI that gets smarter over time, learning from every interaction to improve responses.",
      color: "bg-[#ffd600]/10",
      borderColor: "border-[#ffd600]/20",
      iconColor: "text-[#ffd600]"
    }
  ];

  const stats = [
    { label: "Response Accuracy", value: "98.5%", icon: CheckCircle2 },
    { label: "Languages Supported", value: "50+", icon: Globe },
    { label: "Avg Response Time", value: "< 1s", icon: Zap },
    { label: "Uptime SLA", value: "99.9%", icon: Shield }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/30 to-white overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#005bbc]/5 rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#ffd600]/5 rounded-full blur-[120px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#005bbc]/10 text-[#005bbc] text-sm font-semibold mb-6 border-2 border-[#005bbc]/20">
            <Brain className="w-4 h-4" />
            <span>AI Intelligence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            Powered by Advanced AI
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Experience the future of customer support with cutting-edge artificial intelligence that understands, learns, and adapts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {capabilities.map((cap, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 ${cap.color} rounded-xl flex items-center justify-center mb-6 border-2 ${cap.borderColor} group-hover:scale-110 transition-transform`}>
                <cap.icon className={`w-7 h-7 ${cap.iconColor}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{cap.title}</h3>
              <p className="text-slate-600 leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#005bbc] rounded-3xl p-12 md:p-16 text-white relative overflow-hidden border-2 border-[#005bbc]">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          </div>
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ffd600]/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">AI Performance Metrics</h3>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Real-time statistics that demonstrate the power and reliability of our AI infrastructure
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white/5 rounded-2xl border-2 border-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4 border-2 border-white/20">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">How Our AI Works</h3>
            <p className="text-slate-600 text-lg">A seamless flow from input to intelligent response</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#005bbc]/20 via-[#005bbc]/40 to-[#005bbc]/20 -translate-y-1/2" />
            
            <div className="grid md:grid-cols-4 gap-6 relative">
              {[
                { icon: MessageSquare, label: "Receive", desc: "Message arrives" },
                { icon: Brain, label: "Analyze", desc: "AI processes" },
                { icon: Sparkles, label: "Generate", desc: "Response created" },
                { icon: CheckCircle2, label: "Deliver", desc: "Sent instantly" }
              ].map((step, index) => (
                <div
                  key={index}
                  className="relative z-10"
                >
                  <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-[#005bbc]/30 transition-all group">
                    <div className="w-16 h-16 bg-[#005bbc]/10 rounded-xl flex items-center justify-center mx-auto mb-4 border-2 border-[#005bbc]/20 group-hover:bg-[#005bbc]/20 transition-colors">
                      <step.icon className="w-8 h-8 text-[#005bbc]" />
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-[#005bbc] mb-1 uppercase tracking-wide">{step.label}</div>
                      <div className="text-slate-500 text-sm">{step.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICapabilitiesSection;
