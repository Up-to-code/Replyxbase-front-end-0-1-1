'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/Switch';
import { Plus, Zap, Play, Pause, Trash2, Edit2 } from 'lucide-react';
import { toast } from 'sonner';

interface Agent {
  id: string;
  name: string;
}

interface AutomationModeProps {
  agent: Agent;
}

interface Automation {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  enabled: boolean;
  createdAt: string;
}

export function AutomationMode({ agent }: AutomationModeProps) {
  const t = useTranslations("Dashboard.Agent.Automation");
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: '1',
      name: 'Auto-respond to FAQs',
      description: 'Automatically respond to frequently asked questions',
      trigger: 'FAQ detected',
      action: 'Send predefined response',
      enabled: true,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Escalate to human',
      description: 'Transfer conversation to human agent when needed',
      trigger: 'Complex query',
      action: 'Transfer to support team',
      enabled: true,
      createdAt: '2024-01-20',
    },
    {
      id: '3',
      name: 'Schedule follow-up',
      description: 'Schedule automatic follow-up messages',
      trigger: 'Conversation ended',
      action: 'Schedule follow-up',
      enabled: false,
      createdAt: '2024-01-25',
    },
  ]);

  const handleToggle = (id: string) => {
    setAutomations(automations.map(a => 
      a.id === id ? { ...a, enabled: !a.enabled } : a
    ));
    toast.success(t("toggled") || "Automation toggled!");
  };

  const handleCreate = () => {
    toast.success(t("created") || "Automation created!");
  };

  const handleDelete = (id: string) => {
    setAutomations(automations.filter(a => a.id !== id));
    toast.success(t("deleted") || "Automation deleted!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{t("title") || "Automation Rules"}</h2>
          <p className="text-slate-600 mt-1">{t("subtitle") || "Create and manage automation workflows"}</p>
        </div>
        <Button onClick={handleCreate} variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          {t("create") || "Create Automation"}
        </Button>
      </div>

      {/* Automations List */}
      <div className="space-y-4">
        {automations.map((automation) => (
          <Card key={automation.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-slate-900">{automation.name}</h3>
                      <Badge 
                        variant={automation.enabled ? 'default' : 'secondary'}
                      >
                        {automation.enabled ? (t("enabled") || "Enabled") : (t("disabled") || "Disabled")}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{automation.description}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span><strong>{t("trigger") || "Trigger"}:</strong> {automation.trigger}</span>
                      <span><strong>{t("action") || "Action"}:</strong> {automation.action}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={automation.enabled}
                    onChange={() => handleToggle(automation.id)}
                  />
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4 text-slate-600" />
                  </button>
                  <button 
                    onClick={() => handleDelete(automation.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {automations.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Zap className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">{t("noAutomations") || "No automation rules yet. Create your first one!"}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
