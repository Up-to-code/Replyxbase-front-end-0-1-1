'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Zap, MessageSquare, Tag, Bell, Send, Search, Trash2, Edit2, Play, Pause } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/Switch';
import Input from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Modal } from '@/components/ui/Modal';
import { toast } from 'sonner';

interface AutomationRule {
  id: string;
  name: string;
  trigger: {
    type: 'new_message' | 'message_contains' | 'message_from';
    value?: string;
  };
  actions: Array<{
    type: 'add_tag' | 'notify' | 'assign' | 'send_reply' | 'forward';
    value?: string;
  }>;
  enabled: boolean;
  createdAt: string;
}

export default function AutomationClient() {
  const t = useTranslations("Dashboard.Automation");
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Welcome New Users',
      trigger: { type: 'new_message' },
      actions: [
        { type: 'add_tag', value: 'new-user' },
        { type: 'notify' }
      ],
      enabled: true,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Urgent Keywords',
      trigger: { type: 'message_contains', value: 'urgent,help,emergency' },
      actions: [
        { type: 'add_tag', value: 'urgent' },
        { type: 'notify' }
      ],
      enabled: true,
      createdAt: '2024-01-20',
    },
    {
      id: '3',
      name: 'Support Requests',
      trigger: { type: 'message_contains', value: 'support,issue,problem' },
      actions: [
        { type: 'add_tag', value: 'support' },
        { type: 'assign', value: 'support-team' }
      ],
      enabled: false,
      createdAt: '2024-01-25',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<AutomationRule | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    triggerType: 'new_message' as 'new_message' | 'message_contains' | 'message_from',
    triggerValue: '',
    actions: [] as Array<{ type: string; value?: string }>,
  });

  const handleToggle = (id: string) => {
    setRules(rules.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
    toast.success(t("toggled") || "Automation toggled!");
  };

  const handleCreate = () => {
    setEditingRule(null);
    setFormData({
      name: '',
      triggerType: 'new_message',
      triggerValue: '',
      actions: [],
    });
    setIsModalOpen(true);
  };

  const handleEdit = (rule: AutomationRule) => {
    setEditingRule(rule);
    setFormData({
      name: rule.name,
      triggerType: rule.trigger.type,
      triggerValue: rule.trigger.value || '',
      actions: rule.actions,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (typeof window !== 'undefined' && window.confirm(t("deleteConfirm") || "Are you sure you want to delete this automation?")) {
      setRules(rules.filter(r => r.id !== id));
      toast.success(t("deleted") || "Automation deleted!");
    }
  };

  const handleAddAction = () => {
    setFormData({
      ...formData,
      actions: [...formData.actions, { type: 'add_tag', value: '' }]
    });
  };

  const handleRemoveAction = (index: number) => {
    setFormData({
      ...formData,
      actions: formData.actions.filter((_, i) => i !== index)
    });
  };

  const handleActionChange = (index: number, field: 'type' | 'value', value: string) => {
    const updated = [...formData.actions];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, actions: updated });
  };

  const handleSave = () => {
    if (!formData.name) {
      toast.error(t("errors.nameRequired") || "Rule name is required");
      return;
    }

    if (formData.triggerType === 'message_contains' && !formData.triggerValue) {
      toast.error(t("errors.triggerValueRequired") || "Trigger value is required");
      return;
    }

    if (formData.actions.length === 0) {
      toast.error(t("errors.actionRequired") || "At least one action is required");
      return;
    }

    const newRule: AutomationRule = {
      id: editingRule?.id || Date.now().toString(),
      name: formData.name,
      trigger: {
        type: formData.triggerType,
        value: formData.triggerValue || undefined,
      },
      actions: formData.actions.map(a => ({
        type: a.type as 'add_tag' | 'notify' | 'assign' | 'send_reply' | 'forward',
        value: a.value,
      })),
      enabled: editingRule?.enabled ?? true,
      createdAt: editingRule?.createdAt || new Date().toISOString(),
    };

    if (editingRule) {
      setRules(rules.map(r => r.id === editingRule.id ? newRule : r));
      toast.success(t("updated") || "Automation updated!");
    } else {
      setRules([...rules, newRule]);
      toast.success(t("created") || "Automation created!");
    }

    setIsModalOpen(false);
  };

  const getTriggerLabel = (trigger: AutomationRule['trigger']) => {
    if (trigger.type === 'new_message') {
      return t("triggers.newMessage") || "When user sends a new message";
    }
    if (trigger.type === 'message_contains') {
      return `${t("triggers.messageContains") || "When message contains"}: ${trigger.value}`;
    }
    if (trigger.type === 'message_from') {
      return `${t("triggers.messageFrom") || "When message from"}: ${trigger.value}`;
    }
    return '';
  };

  const getActionLabel = (action: AutomationRule['actions'][0]) => {
    const labels: Record<string, string> = {
      'add_tag': t("actions.addTag") || "Add tag",
      'notify': t("actions.notify") || "Notify",
      'assign': t("actions.assign") || "Assign",
      'send_reply': t("actions.sendReply") || "Send reply",
      'forward': t("actions.forward") || "Forward",
    };
    const label = labels[action.type] || action.type;
    return action.value ? `${label}: ${action.value}` : label;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{t("title") || "Automation Rules"}</h1>
            <p className="text-slate-600 mt-1">{t("subtitle") || "Create rules to automate actions based on messages"}</p>
          </div>
          <Button onClick={handleCreate} variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            {t("create") || "Create Automation"}
          </Button>
        </div>

        {/* Rules List */}
        <div className="space-y-4">
          {rules.map((rule) => (
            <Card key={rule.id}>
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{rule.name}</h3>
                        <Badge 
                          variant={rule.enabled ? 'default' : 'secondary'}
                          className="mt-1"
                        >
                          {rule.enabled ? (t("enabled") || "Enabled") : (t("disabled") || "Disabled")}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3 ml-16 mt-4">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-sm text-slate-600">
                          <strong className="text-slate-700">{t("trigger") || "Trigger"}:</strong> {getTriggerLabel(rule.trigger)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Zap className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-sm text-slate-600">
                          <strong className="text-slate-700">{t("actionsLabel") || "Actions"}:</strong> {rule.actions.map(getActionLabel).join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Switch
                      checked={rule.enabled}
                      onChange={() => handleToggle(rule.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(rule)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(rule.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {rules.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Zap className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 mb-4">{t("noRules") || "No automation rules yet. Create your first one!"}</p>
              <Button onClick={handleCreate} variant="primary">
                <Plus className="w-4 h-4 mr-2" />
                {t("create") || "Create Automation"}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Create/Edit Modal */}
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingRule ? (t("editRule") || "Edit Automation Rule") : (t("createRule") || "Create Automation Rule")}
        >
          <div className="space-y-6 p-6">
            {/* Rule Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t("ruleName") || "Rule Name *"}
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t("ruleNamePlaceholder") || "e.g., Welcome New Users"}
                required
              />
            </div>

            {/* Trigger */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t("trigger") || "Trigger *"}
              </label>
              <Select
                value={formData.triggerType}
                onChange={(e) => setFormData({ ...formData, triggerType: e.target.value as any, triggerValue: '' })}
                options={[
                  { value: 'new_message', label: t("triggers.newMessage") || 'When user sends a new message' },
                  { value: 'message_contains', label: t("triggers.messageContains") || 'When message contains keywords' },
                  { value: 'message_from', label: t("triggers.messageFrom") || 'When message from specific user' },
                ]}
              />
            </div>

            {(formData.triggerType === 'message_contains' || formData.triggerType === 'message_from') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  {formData.triggerType === 'message_contains' 
                    ? (t("keywords") || "Keywords (comma-separated) *")
                    : (t("userId") || "User ID or Email *")
                  }
                </label>
                <Input
                  value={formData.triggerValue}
                  onChange={(e) => setFormData({ ...formData, triggerValue: e.target.value })}
                  placeholder={
                    formData.triggerType === 'message_contains'
                      ? (t("keywordsPlaceholder") || "e.g., urgent, help, emergency")
                      : (t("userIdPlaceholder") || "e.g., user@example.com")
                  }
                  required
                />
              </div>
            )}

            {/* Actions */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-slate-700">
                  {t("actionsLabel") || "Actions *"}
                </label>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleAddAction}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  {t("addAction") || "Add Action"}
                </Button>
              </div>
              <div className="space-y-3">
                {formData.actions.map((action, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg">
                    <Select
                      value={action.type}
                      onChange={(e) => handleActionChange(index, 'type', e.target.value)}
                      options={[
                        { value: 'add_tag', label: t("actions.addTag") || 'Add Tag' },
                        { value: 'notify', label: t("actions.notify") || 'Notify' },
                        { value: 'assign', label: t("actions.assign") || 'Assign' },
                        { value: 'send_reply', label: t("actions.sendReply") || 'Send Reply' },
                        { value: 'forward', label: t("actions.forward") || 'Forward' },
                      ]}
                      className="flex-1"
                    />
                    {(action.type === 'add_tag' || action.type === 'assign' || action.type === 'send_reply' || action.type === 'forward') && (
                      <Input
                        value={action.value || ''}
                        onChange={(e) => handleActionChange(index, 'value', e.target.value)}
                        placeholder={
                          action.type === 'add_tag' ? (t("tagPlaceholder") || "Tag name")
                          : action.type === 'assign' ? (t("assignPlaceholder") || "Team/User")
                          : action.type === 'send_reply' ? (t("replyPlaceholder") || "Reply message")
                          : (t("forwardPlaceholder") || "Forward to")
                        }
                        className="flex-1"
                      />
                    )}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveAction(index)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                ))}
                {formData.actions.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-6">
                    {t("noActions") || "No actions added. Click 'Add Action' to get started."}
                  </p>
                )}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-3 pt-6 mt-6 border-t-2 border-slate-200">
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
              >
                {t("cancel") || "Cancel"}
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
              >
                <Zap className="w-4 h-4 mr-2" />
                {editingRule ? (t("update") || "Update") : (t("create") || "Create")}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
