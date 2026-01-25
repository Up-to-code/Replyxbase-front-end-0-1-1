'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Phone,
  FileText
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { toast } from 'sonner';

export default function SMSTemplateBuilder() {
  const t = useTranslations("Dashboard.Templates.SMS");
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    body: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.body) {
      toast.error(t("errors.required") || 'Template name and body are required');
      return;
    }

    toast.success(t("success") || 'SMS template created successfully!');
    router.push('/dashboard/templates');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/templates/create">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {t("title") || "Create SMS Template"}
            </h1>
            <p className="text-slate-600 mt-1">
              {t("subtitle") || "Create a simple text message template for SMS campaigns"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side: Settings Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold text-slate-900">{t("details.title") || "Template Details"}</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t("details.templateName") || "Template Name *"}
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t("details.templateNamePlaceholder") || "e.g., welcome_sms"}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t("details.messageBody") || "Message Body * (max 160 characters)"}
                    </label>
                    <Textarea
                      value={formData.body}
                      onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                      placeholder={t("details.messageBodyPlaceholder") || "Enter your SMS message..."}
                      rows={6}
                      required
                      maxLength={160}
                    />
                    <div className="flex items-center justify-between mt-1">
                      <p className={`text-xs ${formData.body.length > 160 ? 'text-red-500' : 'text-slate-500'}`}>
                        {formData.body.length} / 160 {t("details.characters") || "characters"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Link href="/dashboard/templates" className="flex-1">
                  <Button type="button" variant="secondary" className="w-full">
                    {t("actions.cancel") || "Cancel"}
                  </Button>
                </Link>
                <Button 
                  type="submit" 
                  variant="primary" 
                  className="flex-1"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {t("actions.create") || "Create Template"}
                </Button>
              </div>
            </form>
          </div>

          {/* Right Side: Message Preview */}
          <div className="lg:sticky lg:top-6 h-fit">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-bold text-slate-900">{t("preview.title") || "Live Preview"}</h2>
                <p className="text-sm text-slate-500">{t("preview.subtitle") || "How your SMS message will appear"}</p>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 rounded-lg p-6 min-h-[400px] flex items-center justify-center">
                  <div className="w-full max-w-sm">
                    {/* SMS Message Preview */}
                    <div className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200">
                        <Phone className="w-5 h-5 text-slate-600" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">SMS Message</p>
                          <p className="text-xs text-slate-500">From: +1234567890</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                          {formData.body || t("preview.placeholder") || "Your SMS message will appear here..."}
                        </p>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <p className="text-xs text-slate-500">
                          {formData.body.length} / 160 {t("preview.characters") || "characters"}
                        </p>
                      </div>
                    </div>
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
