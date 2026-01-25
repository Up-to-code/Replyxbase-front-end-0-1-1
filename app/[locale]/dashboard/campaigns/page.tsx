'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { 
  Plus, 
  MessageCircle, 
  Send, 
  Calendar, 
  Users, 
  TrendingUp,
  MoreHorizontal,
  Edit2,
  Trash2,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

// Mock campaigns data
const mockCampaigns = [
  {
    id: '1',
    name: 'Welcome Campaign',
    type: 'whatsapp',
    status: 'active',
    recipients: 1250,
    sent: 1250,
    delivered: 1180,
    opened: 890,
    clicked: 234,
    scheduledAt: '2024-01-20T10:00:00Z',
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: '2',
    name: 'Product Launch',
    type: 'whatsapp',
    status: 'scheduled',
    recipients: 5000,
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    scheduledAt: '2024-01-25T14:00:00Z',
    createdAt: '2024-01-18T10:00:00Z'
  },
  {
    id: '3',
    name: 'Holiday Promotion',
    type: 'whatsapp',
    status: 'completed',
    recipients: 3200,
    sent: 3200,
    delivered: 3050,
    opened: 2100,
    clicked: 567,
    scheduledAt: '2024-01-10T09:00:00Z',
    createdAt: '2024-01-05T08:00:00Z'
  },
];

export default function CampaignsPage() {
  const t = useTranslations("Dashboard.Campaigns");
  const [filter, setFilter] = useState<'all' | 'active' | 'scheduled' | 'completed'>('all');

  const filteredCampaigns = filter === 'all' 
    ? mockCampaigns 
    : mockCampaigns.filter(c => c.status === filter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success"><CheckCircle2 className="w-3 h-3 mr-1" />Active</Badge>;
      case 'scheduled':
        return <Badge variant="warning"><Clock className="w-3 h-3 mr-1" />Scheduled</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {t("title") || "Campaigns"}
            </h1>
            <p className="text-slate-600 mt-2">
              {t("subtitle") || "Create and manage messaging campaigns"}
            </p>
          </div>
          <Link href="/dashboard/campaigns/create">
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              {t("createCampaign") || "Create Campaign"}
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Campaigns</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">{mockCampaigns.length}</p>
                </div>
                <MessageCircle className="w-8 h-8 text-[#005bbc]" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Active</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {mockCampaigns.filter(c => c.status === 'active').length}
                  </p>
                </div>
                <Play className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Total Sent</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {mockCampaigns.reduce((sum, c) => sum + c.sent, 0).toLocaleString()}
                  </p>
                </div>
                <Send className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">Open Rate</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">68%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between">
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="w-auto min-w-[150px]"
            options={[
              { value: 'all', label: 'All Campaigns' },
              { value: 'active', label: 'Active' },
              { value: 'scheduled', label: 'Scheduled' },
              { value: 'completed', label: 'Completed' },
            ]}
          />
        </div>

        {/* Campaigns List */}
        <div className="space-y-4">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-slate-900">{campaign.name}</h3>
                        {getStatusBadge(campaign.status)}
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        WhatsApp • Created {new Date(campaign.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Recipients</p>
                    <p className="text-sm font-bold text-slate-900">{campaign.recipients.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Sent</p>
                    <p className="text-sm font-bold text-slate-900">{campaign.sent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Delivered</p>
                    <p className="text-sm font-bold text-slate-900">{campaign.delivered.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Opened</p>
                    <p className="text-sm font-bold text-slate-900">{campaign.opened.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Clicked</p>
                    <p className="text-sm font-bold text-slate-900">{campaign.clicked.toLocaleString()}</p>
                  </div>
                </div>
                {campaign.status === 'scheduled' && (
                  <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Calendar className="w-4 h-4" />
                      <span>Scheduled for {new Date(campaign.scheduledAt).toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
