"use client";
import React from "react";
import { Zap, Database, Globe, MessageCircle, Mail, Calendar, Users, BarChart3, Shield, Lock, Cloud, Code, Settings, Bell, FileText, Link2 } from "lucide-react";

const ToolsMarquee = () => {
    const tools = [
        { icon: Zap, name: "Zapier", color: "text-[#005bbc]" },
        { icon: Database, name: "Airtable", color: "text-[#ffd600]" },
        { icon: Globe, name: "Webflow", color: "text-[#005bbc]" },
        { icon: MessageCircle, name: "Slack", color: "text-[#ffd600]" },
        { icon: Mail, name: "Gmail", color: "text-[#005bbc]" },
        { icon: Calendar, name: "Calendly", color: "text-[#ffd600]" },
        { icon: Users, name: "HubSpot", color: "text-[#005bbc]" },
        { icon: BarChart3, name: "Analytics", color: "text-[#ffd600]" },
        { icon: Shield, name: "Security", color: "text-[#005bbc]" },
        { icon: Lock, name: "Auth0", color: "text-[#ffd600]" },
        { icon: Cloud, name: "AWS", color: "text-[#005bbc]" },
        { icon: Code, name: "API", color: "text-[#ffd600]" },
        { icon: Settings, name: "Settings", color: "text-[#005bbc]" },
        { icon: Bell, name: "Notifications", color: "text-[#ffd600]" },
        { icon: FileText, name: "Docs", color: "text-[#005bbc]" },
        { icon: Link2, name: "Integrations", color: "text-[#ffd600]" }
    ];

    return (
        <section className="py-16 bg-gradient-to-b from-white to-slate-50 border-y-2 border-slate-200 overflow-hidden relative">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#005bbc_1px,transparent_1px),linear-gradient(to_bottom,#005bbc_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-[0.02]" />
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#005bbc]/10 text-[#005bbc] text-sm font-semibold mb-4 border-2 border-[#005bbc]/20">
                        <Zap className="w-4 h-4" />
                        <span>200+ Integrations</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Works with your favorite tools</h3>
                    <p className="text-slate-600 text-sm">Connect seamlessly with the tools you already use</p>
                </div>

                <div className="relative w-full overflow-hidden" dir="ltr">
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none" />
                    
                    <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 mx-6">
                                {tools.map((tool, index) => (
                                    <div 
                                        key={`${i}-${index}`} 
                                        className="flex flex-col items-center gap-3 group cursor-pointer"
                                    >
                                        <div className={`w-16 h-16 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center transition-all group-hover:border-[#005bbc]/30 group-hover:scale-110 group-hover:shadow-lg ${tool.color === 'text-[#005bbc]' ? 'group-hover:bg-[#005bbc]/5' : 'group-hover:bg-[#ffd600]/5'}`}>
                                            <tool.icon className={`w-8 h-8 ${tool.color} transition-colors`} />
                                        </div>
                                        <span className="text-sm font-semibold text-slate-700 group-hover:text-[#005bbc] transition-colors">{tool.name}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ToolsMarquee;

