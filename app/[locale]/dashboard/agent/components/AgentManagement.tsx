'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Bot, Edit2, Settings, Power, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import AgentInitForm from './AgentInitForm';

interface AgentData {
  name: string;
  role: string;
  description: string;
  language: string;
  personality: string;
  responseStyle: string;
  enableWebsite: boolean;
  enableWhatsApp: boolean;
  enableDM: boolean;
  systemPrompt: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export default function AgentManagement() {
  const t = useTranslations("Dashboard.Agent.Manage");
  const [agentData, setAgentData] = useState<AgentData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load agent data from localStorage
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }
    const stored = localStorage.getItem('agent_data');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setAgentData(data);
      } catch (e) {
        console.error('Failed to parse agent data', e);
      }
    }
    setIsLoading(false);
  }, []);

  const handleToggleStatus = () => {
    if (!agentData) return;
    if (typeof window === 'undefined') return;
    const updated: AgentData = {
      ...agentData,
      status: (agentData.status === 'active' ? 'inactive' : 'active') as 'active' | 'inactive'
    };
    setAgentData(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('agent_data', JSON.stringify(updated));
    }
  };

  const handleDelete = () => {
    if (typeof window !== 'undefined' && window.confirm(t("deleteConfirm") || "Are you sure you want to delete this agent?")) {
      localStorage.removeItem('agent_data');
      window.location.reload();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#005bbc]"></div>
      </div>
    );
  }

  if (isEditing && agentData) {
    return (
      <AgentInitForm 
        initialData={agentData} 
        onComplete={() => {
          // Reload agent data after edit
          if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('agent_data');
            if (stored) {
              try {
                const data = JSON.parse(stored);
                setAgentData(data);
              } catch (e) {
                console.error('Failed to parse agent data', e);
              }
            }
          }
          setIsEditing(false);
        }} 
      />
    );
  }

  if (!agentData) {
    return <AgentInitForm />;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#005bbc] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 rtl:hidden" />
            <ArrowRight className="w-4 h-4 ltr:hidden" />
            {t("backToDashboard") || "Back to Dashboard"}
          </Link>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-[#005bbc] flex items-center justify-center">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold text-slate-900">{agentData.name}</h1>
                  <Badge 
                    variant={agentData.status === 'active' ? 'default' : 'secondary'}
                  >
                    {agentData.status === 'active' ? (t("active") || "Active") : (t("inactive") || "Inactive")}
                  </Badge>
                </div>
                <p className="text-slate-600">{agentData.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleToggleStatus}
                variant={agentData.status === 'active' ? 'secondary' : 'primary'}
              >
                <Power className="w-4 h-4 mr-2" />
                {agentData.status === 'active' ? (t("deactivate") || "Deactivate") : (t("activate") || "Activate")}
              </Button>
              <Button onClick={() => setIsEditing(true)} variant="primary">
                <Edit2 className="w-4 h-4 mr-2" />
                {t("edit") || "Edit Agent"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader className="pb-4">
                <h2 className="text-xl font-bold text-slate-900">{t("basicInfo") || "Basic Information"}</h2>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">{t("name") || "Name"}</label>
                  <p className="text-slate-900 mt-1">{agentData.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">{t("role") || "Role"}</label>
                  <p className="text-slate-900 mt-1">{agentData.role}</p>
                </div>
                {agentData.description && (
                  <div>
                    <label className="text-sm font-medium text-slate-600">{t("description") || "Description"}</label>
                    <p className="text-slate-900 mt-1">{agentData.description}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-slate-600">{t("language") || "Language"}</label>
                  <p className="text-slate-900 mt-1">{agentData.language.toUpperCase()}</p>
                </div>
              </CardContent>
            </Card>

            {/* Configuration */}
            <Card>
              <CardHeader className="pb-4">
                <h2 className="text-xl font-bold text-slate-900">{t("configuration") || "Configuration"}</h2>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">{t("personality") || "Personality"}</label>
                  <p className="text-slate-900 mt-1 capitalize">{agentData.personality}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">{t("responseStyle") || "Response Style"}</label>
                  <p className="text-slate-900 mt-1 capitalize">{agentData.responseStyle}</p>
                </div>
                {agentData.systemPrompt && (
                  <div>
                    <label className="text-sm font-medium text-slate-600">{t("systemPrompt") || "System Prompt"}</label>
                    <p className="text-slate-900 mt-1 whitespace-pre-wrap">{agentData.systemPrompt}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Channels */}
            <Card>
              <CardHeader className="pb-4">
                <h2 className="text-xl font-bold text-slate-900">{t("channels") || "Communication Channels"}</h2>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border-2 border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-slate-900">{t("website") || "Website Chat"}</span>
                    </div>
                    {agentData.enableWebsite ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 border-2 border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="font-medium text-slate-900">{t("whatsapp") || "WhatsApp"}</span>
                    </div>
                    {agentData.enableWhatsApp ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 border-2 border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-purple-600" />
                      </div>
                      <span className="font-medium text-slate-900">{t("dm") || "Direct Messages"}</span>
                    </div>
                    {agentData.enableDM ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-4">
                <h2 className="text-lg font-bold text-slate-900">{t("quickActions") || "Quick Actions"}</h2>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                <Button variant="secondary" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  {t("settings") || "Settings"}
                </Button>
                <Button 
                  onClick={handleDelete}
                  variant="secondary" 
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  {t("delete") || "Delete Agent"}
                </Button>
              </CardContent>
            </Card>

            {/* Status Card */}
            <Card>
              <CardHeader className="pb-4">
                <h2 className="text-lg font-bold text-slate-900">{t("status") || "Status"}</h2>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{t("created") || "Created"}</span>
                    <span className="text-sm font-medium text-slate-900">
                      {agentData.createdAt ? new Date(agentData.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">{t("lastUpdated") || "Last Updated"}</span>
                    <span className="text-sm font-medium text-slate-900">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
