'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Settings, Bot, Zap } from 'lucide-react';
import { SettingsMode } from './modes/SettingsMode';
import { DistinctAgentMode } from './modes/DistinctAgentMode';
import { AutomationMode } from './modes/AutomationMode';

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'training' | 'inactive';
  isWebsiteEnabled: boolean;
  isWhatsappEnabled: boolean;
  isDmEnabled: boolean;
  config: Record<string, any>;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  lastActive?: string;
  conversations?: number;
  conversion?: string;
  stats?: {
    conversations: number;
    users: number;
    satisfaction: number;
  };
}

interface AgentModeClientProps {
  agent: Agent;
}

type Mode = 'settings' | 'distinct-agent' | 'automation';

export default function AgentModeClient({ agent }: AgentModeClientProps) {
  const t = useTranslations("Dashboard.Agent");
  const [activeMode, setActiveMode] = useState<Mode>('settings');

  const modes = [
    { 
      id: 'settings' as Mode, 
      label: t('modes.settings') || 'Settings', 
      icon: Settings,
      description: t('modes.settingsDesc') || 'Configure agent settings and preferences'
    },
    { 
      id: 'distinct-agent' as Mode, 
      label: t('modes.distinctAgent') || 'Distinct Agent', 
      icon: Bot,
      description: t('modes.distinctAgentDesc') || 'Manage distinct agent configurations'
    },
    { 
      id: 'automation' as Mode, 
      label: t('modes.automation') || 'Automation', 
      icon: Zap,
      description: t('modes.automationDesc') || 'Set up automation rules and workflows'
    },
  ];

  const renderModeContent = () => {
    switch (activeMode) {
      case 'settings':
        return <SettingsMode agent={agent} />;
      case 'distinct-agent':
        return <DistinctAgentMode agent={agent} />;
      case 'automation':
        return <AutomationMode agent={agent} />;
      default:
        return <SettingsMode agent={agent} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-8 py-6 border-b-2 border-slate-200">
        <div className="mb-4">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#005bbc] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 rtl:hidden" />
            <ArrowRight className="w-4 h-4 ltr:hidden" />
            {t("backToDashboard") || "Back to Dashboard"}
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-xl bg-slate-50 border-2 border-slate-200 flex items-center justify-center text-slate-900 font-bold text-2xl">
              {agent.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-slate-900">{agent.name}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border-2 ${
                  agent.status === 'active' ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20' : 
                  agent.status === 'training' ? 'bg-[#005bbc]/10 text-[#005bbc] border-[#005bbc]/20' : 
                  'bg-slate-50 text-slate-700 border-slate-200'
                }`}>
                  {agent.status}
                </span>
              </div>
              <p className="text-sm text-slate-600">{agent.role} • {t("lastActive", { time: agent.lastActive || 'Just now' })}</p>
            </div>
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all whitespace-nowrap border-2 ${
                  isActive 
                    ? 'bg-[#005bbc] text-white border-[#005bbc]' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
                title={mode.description}
              >
                <Icon className="w-4 h-4" />
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mode Content */}
      <div className="bg-slate-50/50 p-8">
        <div className="max-w-7xl mx-auto">
          {renderModeContent()}
        </div>
      </div>
    </div>
  );
}
