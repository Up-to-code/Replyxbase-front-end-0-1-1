'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Bot, CheckCircle2, Globe, MessageCircle, Zap, Save } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';

interface AgentInitFormProps {
  initialData?: any;
  onComplete?: () => void;
}

export default function AgentInitForm({ initialData, onComplete }: AgentInitFormProps) {
  const t = useTranslations("Dashboard.Agent.Init");
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    description: '',
    language: 'en',
    personality: 'professional',
    responseStyle: 'friendly',
    enableWebsite: false,
    enableWhatsApp: false,
    enableDM: false,
    systemPrompt: '',
  });

  useEffect(() => {
    setMounted(true);
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        role: initialData.role || '',
        description: initialData.description || '',
        language: initialData.language || 'en',
        personality: initialData.personality || 'professional',
        responseStyle: initialData.responseStyle || 'friendly',
        enableWebsite: initialData.enableWebsite || false,
        enableWhatsApp: initialData.enableWhatsApp || false,
        enableDM: initialData.enableDM || false,
        systemPrompt: initialData.systemPrompt || '',
      });
    }
  }, [initialData]);

  const totalSteps = 3;

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name || !formData.role) {
        toast.error(t("errors.nameRequired") || "Agent name and role are required");
        return;
      }
    }
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.role) {
      toast.error(t("errors.nameRequired") || "Agent name and role are required");
      return;
    }
    
    // Save agent data to localStorage
    if (mounted && typeof window !== 'undefined') {
      const agentData = {
        ...formData,
        status: 'active',
        createdAt: initialData?.createdAt || new Date().toISOString(),
      };
      localStorage.setItem('agent_data', JSON.stringify(agentData));
      
      // Trigger storage event for same-tab updates
      window.dispatchEvent(new Event('storage'));
      
      toast.success(t("success") || "Agent initialized successfully!");
      
      // If editing, call onComplete callback, otherwise redirect to show management view
      if (onComplete) {
        setTimeout(() => {
          onComplete();
        }, 500);
      } else {
        // Redirect to show the agent management view
        setTimeout(() => {
          router.push('/dashboard/agent');
        }, 1000);
      }
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#005bbc]"></div>
      </div>
    );
  }

        return (
          <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
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
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-[#005bbc] flex items-center justify-center">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {initialData ? (t("editTitle") || "Edit Your Agent") : (t("title") || "Initialize Your Agent")}
              </h1>
              <p className="text-slate-600 mt-1">
                {initialData ? (t("editSubtitle") || "Update your AI agent settings") : (t("subtitle") || "Set up your AI agent in a few simple steps")}
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-8">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    step >= s 
                      ? 'bg-[#005bbc] border-[#005bbc] text-white' 
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}>
                    {step > s ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span className="font-bold">{s}</span>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${step >= s ? 'text-slate-900' : 'text-slate-400'}`}>
                    {s === 1 && (t("step1") || "Basic Info")}
                    {s === 2 && (t("step2") || "Configuration")}
                    {s === 3 && (t("step3") || "Channels")}
                  </span>
                </div>
                {s < totalSteps && (
                  <div className={`h-1 w-16 ${step > s ? 'bg-[#005bbc]' : 'bg-slate-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

              {/* Form Content */}
              <Card>
                <CardContent className="p-6 lg:p-8">
                  {/* Step 1: Basic Information */}
                  {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="mb-4">
                        <h2 className="text-xl font-bold text-slate-900 mb-2">{t("step1Title") || "Basic Information"}</h2>
                        <p className="text-slate-600">{t("step1Desc") || "Tell us about your agent"}</p>
                      </div>

                      <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("name") || "Agent Name *"}
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t("namePlaceholder") || "e.g., Customer Support Bot"}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("role") || "Role *"}
                  </label>
                  <Input
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder={t("rolePlaceholder") || "e.g., Customer Support, Sales Assistant"}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("description") || "Description"}
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={t("descriptionPlaceholder") || "Brief description of what your agent does..."}
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-2" />
                    {t("language") || "Language"}
                  </label>
                  <Select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    options={[
                      { value: 'en', label: 'English' },
                      { value: 'ar', label: 'Arabic' },
                      { value: 'es', label: 'Spanish' },
                      { value: 'fr', label: 'French' },
                    ]}
                  />
                </div>
              </div>
            )}

                  {/* Step 2: Configuration */}
                  {step === 2 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="mb-4">
                        <h2 className="text-xl font-bold text-slate-900 mb-2">{t("step2Title") || "Agent Configuration"}</h2>
                        <p className="text-slate-600">{t("step2Desc") || "Customize your agent's behavior"}</p>
                      </div>

                      <div className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("personality") || "Personality"}
                  </label>
                  <Select
                    value={formData.personality}
                    onChange={(e) => setFormData({ ...formData, personality: e.target.value })}
                    options={[
                      { value: 'professional', label: t("personalityProfessional") || 'Professional' },
                      { value: 'friendly', label: t("personalityFriendly") || 'Friendly' },
                      { value: 'casual', label: t("personalityCasual") || 'Casual' },
                      { value: 'formal', label: t("personalityFormal") || 'Formal' },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("responseStyle") || "Response Style"}
                  </label>
                  <Select
                    value={formData.responseStyle}
                    onChange={(e) => setFormData({ ...formData, responseStyle: e.target.value })}
                    options={[
                      { value: 'friendly', label: t("styleFriendly") || 'Friendly' },
                      { value: 'concise', label: t("styleConcise") || 'Concise' },
                      { value: 'detailed', label: t("styleDetailed") || 'Detailed' },
                      { value: 'empathetic', label: t("styleEmpathetic") || 'Empathetic' },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {t("systemPrompt") || "System Prompt (Optional)"}
                  </label>
                  <Textarea
                    value={formData.systemPrompt}
                    onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
                    placeholder={t("systemPromptPlaceholder") || "Custom instructions for your agent..."}
                    rows={6}
                  />
                  <p className="text-xs text-slate-500 mt-1">{t("systemPromptHint") || "Define how your agent should behave and respond"}</p>
                </div>
              </div>
            )}

                  {/* Step 3: Channels */}
                  {step === 3 && (
                    <div className="space-y-6 animate-fade-in">
                      <div className="mb-4">
                        <h2 className="text-xl font-bold text-slate-900 mb-2">{t("step3Title") || "Communication Channels"}</h2>
                        <p className="text-slate-600">{t("step3Desc") || "Select where your agent will be available"}</p>
                      </div>

                      <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{t("website") || "Website Chat"}</p>
                        <p className="text-sm text-slate-600">{t("websiteDesc") || "Embed chat widget on your website"}</p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.enableWebsite}
                      onChange={(e) => setFormData({ ...formData, enableWebsite: e.target.checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{t("whatsapp") || "WhatsApp"}</p>
                        <p className="text-sm text-slate-600">{t("whatsappDesc") || "Connect to WhatsApp Business API"}</p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.enableWhatsApp}
                      onChange={(e) => setFormData({ ...formData, enableWhatsApp: e.target.checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{t("dm") || "Direct Messages"}</p>
                        <p className="text-sm text-slate-600">{t("dmDesc") || "Enable direct messaging capabilities"}</p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.enableDM}
                      onChange={(e) => setFormData({ ...formData, enableDM: e.target.checked })}
                    />
                  </div>
                </div>
              </div>
            )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t-2 border-slate-200 gap-4">
              <Button
                onClick={handlePrevious}
                disabled={step === 1}
                variant="secondary"
              >
                {t("previous") || "Previous"}
              </Button>
              
              {step < totalSteps ? (
                <Button onClick={handleNext} variant="primary">
                  {t("next") || "Next"}
                </Button>
              ) : (
                <Button onClick={handleSubmit} variant="primary">
                  <Save className="w-4 h-4 mr-2" />
                  {t("complete") || "Complete Setup"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
