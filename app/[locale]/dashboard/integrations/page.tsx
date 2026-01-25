'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { 
  MessageCircle, 
  Globe, 
  Send, 
  Instagram, 
  ShoppingCart, 
  Plus, 
  CheckCircle2,
  Settings,
  ExternalLink,
  Zap
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const integrations = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'Send and receive messages via WhatsApp Business API',
    icon: MessageCircle,
    color: '#25D366',
    bg: 'bg-green-50',
    status: 'connected',
    messages: 5230,
    lastSync: '2 min ago'
  },
  {
    id: 'website',
    name: 'Website Widget',
    description: 'Chat widget for your website',
    icon: Globe,
    color: '#3b82f6',
    bg: 'bg-blue-50',
    status: 'connected',
    messages: 3450,
    lastSync: '1 min ago'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    description: 'Connect your Telegram bot',
    icon: Send,
    color: '#0088cc',
    bg: 'bg-sky-50',
    status: 'connected',
    messages: 2100,
    lastSync: '5 min ago'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Manage Instagram Direct Messages',
    icon: Instagram,
    color: '#E4405F',
    bg: 'bg-pink-50',
    status: 'connected',
    messages: 1670,
    lastSync: '3 min ago'
  },
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'Sync orders and customer data from Shopify',
    icon: ShoppingCart,
    color: '#96BF48',
    bg: 'bg-green-50',
    status: 'available',
    messages: 0,
    lastSync: null
  },
];

export default function IntegrationsPage() {
  const t = useTranslations("Dashboard.Integrations");

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {t("title") || "Integrations"}
            </h1>
            <p className="text-slate-600 mt-2">
              {t("subtitle") || "Connect your favorite apps and services"}
            </p>
          </div>
        </div>

        {/* Active Integrations */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            {t("active") || "Active Integrations"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations
              .filter(integration => integration.status === 'connected')
              .map((integration) => {
                const Icon = integration.icon;
                return (
                  <Card key={integration.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-slate-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900">{integration.name}</h3>
                            <Badge variant="success" className="mt-1">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Connected
                            </Badge>
                          </div>
                        </div>
                        <Link href={`/dashboard/integrations/${integration.id}`}>
                          <Settings className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 mb-4">{integration.description}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">Messages</span>
                          <span className="font-medium text-slate-900">{integration.messages.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">Last Sync</span>
                          <span className="font-medium text-slate-600">{integration.lastSync}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>

        {/* Available Integrations */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            {t("available") || "Available Integrations"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations
              .filter(integration => integration.status === 'available')
              .map((integration) => {
                const Icon = integration.icon;
                return (
                  <Card key={integration.id} className="border border-dashed border-slate-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-slate-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900">{integration.name}</h3>
                          <Badge variant="secondary" className="mt-1">
                            Available
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 mb-4">{integration.description}</p>
                      <Button 
                        variant="primary" 
                        className="w-full"
                        onClick={() => {
                          // TODO: Open connection flow
                          console.log('Connect', integration.id);
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Connect
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
