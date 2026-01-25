'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { 
  Plus, 
  FileText, 
  MessageCircle, 
  Phone,
  CheckCircle2,
  Clock,
  XCircle,
  Edit2,
  Trash2,
  Filter
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

// Mock templates data
const mockTemplates = [
  {
    id: '1',
    name: 'Welcome Message',
    type: 'whatsapp',
    category: 'transactional',
    status: 'approved',
    content: 'Welcome {{name}}! Thank you for joining us.',
    variables: ['name'],
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    name: 'Order Confirmation',
    type: 'whatsapp',
    category: 'transactional',
    status: 'approved',
    content: 'Your order {{orderId}} has been confirmed. Total: {{amount}}',
    variables: ['orderId', 'amount'],
    updatedAt: '2024-01-18T14:00:00Z'
  },
  {
    id: '3',
    name: 'Promotional Offer',
    type: 'whatsapp',
    category: 'marketing',
    status: 'pending',
    content: 'Special offer for {{name}}: Get {{discount}}% off!',
    variables: ['name', 'discount'],
    updatedAt: '2024-01-19T09:00:00Z'
  },
  {
    id: '4',
    name: 'SMS Reminder',
    type: 'sms',
    category: 'utility',
    status: 'approved',
    content: 'Reminder: Your appointment is on {{date}} at {{time}}',
    variables: ['date', 'time'],
    updatedAt: '2024-01-17T11:00:00Z'
  },
];

export default function TemplatesPage() {
  const t = useTranslations("Dashboard.Templates");
  const [typeFilter, setTypeFilter] = useState<'all' | 'whatsapp' | 'sms'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');

  const filteredTemplates = mockTemplates.filter(template => {
    const typeMatch = typeFilter === 'all' || template.type === typeFilter;
    const statusMatch = statusFilter === 'all' || template.status === statusFilter;
    return typeMatch && statusMatch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge variant="success"><CheckCircle2 className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'pending':
        return <Badge variant="warning"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'whatsapp' ? MessageCircle : Phone;
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {t("title") || "Message Templates"}
            </h1>
            <p className="text-slate-600 mt-2">
              {t("subtitle") || "Create and manage message templates for campaigns"}
            </p>
          </div>
          <Link href="/dashboard/templates/create">
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              {t("createTemplate") || "Create Template"}
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="w-auto min-w-[140px]"
              options={[
                { value: 'all', label: t("allTypes") || "All Types" },
                { value: 'whatsapp', label: 'WhatsApp' },
                { value: 'sms', label: 'SMS' },
              ]}
            />
          </div>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-auto min-w-[140px]"
            options={[
              { value: 'all', label: t("allStatus") || "All Status" },
              { value: 'approved', label: t("approved") || "Approved" },
              { value: 'pending', label: t("pending") || "Pending" },
              { value: 'rejected', label: t("rejected") || "Rejected" },
            ]}
          />
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => {
            const TypeIcon = getTypeIcon(template.type);
            return (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <TypeIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 truncate">{template.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusBadge(template.status)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{t("category") || "Category"}</p>
                      <Badge variant="secondary" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{t("contentPreview") || "Content Preview"}</p>
                      <p className="text-sm text-slate-700 line-clamp-2">{template.content}</p>
                    </div>
                    {template.variables.length > 0 && (
                      <div>
                        <p className="text-xs text-slate-500 mb-1">{t("variables") || "Variables"}</p>
                        <div className="flex flex-wrap gap-1">
                          {template.variables.map((variable) => (
                            <span 
                              key={variable}
                              className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                            >
                              {`{{${variable}}}`}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-xs text-slate-500">
                        {t("updated") || "Updated"} {new Date(template.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredTemplates.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">No templates found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
