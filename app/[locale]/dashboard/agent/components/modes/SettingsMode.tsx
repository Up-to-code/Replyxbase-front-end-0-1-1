'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { Button } from '@/components/ui/Button';
import { Save, Globe, MessageCircle, Bell, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'training' | 'inactive';
  config: Record<string, any>;
}

interface SettingsModeProps {
  agent: Agent;
}

export function SettingsMode({ agent }: SettingsModeProps) {
  const t = useTranslations("Dashboard.Agent.Settings");
  const [formData, setFormData] = useState({
    name: agent.name,
    role: agent.role,
    language: 'en',
    timezone: 'UTC',
    responseDelay: '0',
    maxConversations: '100',
    enableNotifications: true,
    enableAnalytics: true,
    privacyMode: false,
  });

  const handleSave = () => {
    toast.success(t("saved") || "Settings saved successfully!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Basic Settings */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-slate-900">{t("basic.title") || "Basic Settings"}</h2>
          <p className="text-sm text-slate-600 mt-1">{t("basic.subtitle") || "Configure basic agent information"}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t("basic.name") || "Agent Name *"}
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t("basic.namePlaceholder") || "Enter agent name"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t("basic.role") || "Role *"}
              </label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder={t("basic.rolePlaceholder") || "e.g., Customer Support"}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                {t("basic.language") || "Language"}
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
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t("basic.timezone") || "Timezone"}
              </label>
              <Select
                value={formData.timezone}
                onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                options={[
                  { value: 'UTC', label: 'UTC' },
                  { value: 'America/New_York', label: 'America/New_York' },
                  { value: 'Europe/London', label: 'Europe/London' },
                  { value: 'Asia/Dubai', label: 'Asia/Dubai' },
                ]}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Settings */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-slate-900">{t("performance.title") || "Performance Settings"}</h2>
          <p className="text-sm text-slate-600 mt-1">{t("performance.subtitle") || "Configure agent performance parameters"}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t("performance.responseDelay") || "Response Delay (seconds)"}
              </label>
              <Input
                type="number"
                value={formData.responseDelay}
                onChange={(e) => setFormData({ ...formData, responseDelay: e.target.value })}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t("performance.maxConversations") || "Max Concurrent Conversations"}
              </label>
              <Input
                type="number"
                value={formData.maxConversations}
                onChange={(e) => setFormData({ ...formData, maxConversations: e.target.value })}
                placeholder="100"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature Toggles */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-slate-900">{t("features.title") || "Features"}</h2>
          <p className="text-sm text-slate-600 mt-1">{t("features.subtitle") || "Enable or disable agent features"}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-slate-600" />
              <div>
                <p className="font-medium text-slate-900">{t("features.notifications") || "Notifications"}</p>
                <p className="text-sm text-slate-600">{t("features.notificationsDesc") || "Receive notifications for important events"}</p>
              </div>
            </div>
            <Switch
              checked={formData.enableNotifications}
              onChange={(e) => setFormData({ ...formData, enableNotifications: e.target.checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-slate-600" />
              <div>
                <p className="font-medium text-slate-900">{t("features.analytics") || "Analytics"}</p>
                <p className="text-sm text-slate-600">{t("features.analyticsDesc") || "Track and analyze agent performance"}</p>
              </div>
            </div>
            <Switch
              checked={formData.enableAnalytics}
              onChange={(e) => setFormData({ ...formData, enableAnalytics: e.target.checked })}
            />
          </div>

          <div className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-slate-600" />
              <div>
                <p className="font-medium text-slate-900">{t("features.privacyMode") || "Privacy Mode"}</p>
                <p className="text-sm text-slate-600">{t("features.privacyModeDesc") || "Enable enhanced privacy protection"}</p>
              </div>
            </div>
            <Switch
              checked={formData.privacyMode}
              onChange={(e) => setFormData({ ...formData, privacyMode: e.target.checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} variant="primary">
          <Save className="w-4 h-4 mr-2" />
          {t("save") || "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
