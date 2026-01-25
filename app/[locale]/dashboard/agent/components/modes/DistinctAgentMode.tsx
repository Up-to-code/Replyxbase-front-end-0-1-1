'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Plus, Bot, Trash2, Edit2 } from 'lucide-react';
import { toast } from 'sonner';

interface Agent {
  id: string;
  name: string;
}

interface DistinctAgentModeProps {
  agent: Agent;
}

interface DistinctAgent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export function DistinctAgentMode({ agent }: DistinctAgentModeProps) {
  const t = useTranslations("Dashboard.Agent.DistinctAgent");
  const [distinctAgents, setDistinctAgents] = useState<DistinctAgent[]>([
    {
      id: '1',
      name: 'Sales Agent',
      description: 'Handles sales inquiries and product information',
      status: 'active',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Support Agent',
      description: 'Provides customer support and troubleshooting',
      status: 'active',
      createdAt: '2024-01-20',
    },
  ]);

  const handleCreate = () => {
    toast.success(t("created") || "Distinct agent created!");
  };

  const handleDelete = (id: string) => {
    setDistinctAgents(distinctAgents.filter(a => a.id !== id));
    toast.success(t("deleted") || "Distinct agent deleted!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{t("title") || "Distinct Agents"}</h2>
          <p className="text-slate-600 mt-1">{t("subtitle") || "Manage distinct agent configurations for different use cases"}</p>
        </div>
        <Button onClick={handleCreate} variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          {t("create") || "Create Distinct Agent"}
        </Button>
      </div>

      {/* Distinct Agents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {distinctAgents.map((distinctAgent) => (
          <Card key={distinctAgent.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{distinctAgent.name}</h3>
                    <Badge 
                      variant={distinctAgent.status === 'active' ? 'default' : 'secondary'}
                      className="mt-1"
                    >
                      {distinctAgent.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4 text-slate-600" />
                  </button>
                  <button 
                    onClick={() => handleDelete(distinctAgent.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 mb-4">{distinctAgent.description}</p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{t("created") || "Created"}: {distinctAgent.createdAt}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {distinctAgents.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Bot className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">{t("noAgents") || "No distinct agents yet. Create your first one!"}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
