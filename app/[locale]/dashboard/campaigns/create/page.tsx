'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  MessageCircle, 
  Users, 
  Calendar, 
  FileText,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { toast } from 'sonner';

export default function CreateCampaignPage() {
  const t = useTranslations("Dashboard.Campaigns");
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: 'whatsapp',
    template: '',
    recipients: '',
    scheduleType: 'now',
    scheduledDate: '',
    scheduledTime: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock campaign creation
    toast.success('Campaign created successfully!');
    router.push('/dashboard/campaigns');
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/campaigns">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {t("createCampaign") || "Create Campaign"}
            </h1>
            <p className="text-slate-600 mt-1">
              {t("createSubtitle") || "Send messages to your customers via WhatsApp"}
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                step >= s 
                  ? 'bg-[#005bbc] border-[#005bbc] text-white' 
                  : 'bg-white border-slate-300 text-slate-400'
              }`}>
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-1 mx-2 ${
                  step > s ? 'bg-[#005bbc]' : 'bg-slate-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Campaign Details */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold text-slate-900">Campaign Details</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Campaign Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Welcome Campaign"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Channel
                  </label>
                  <Select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    options={[
                      { value: 'whatsapp', label: 'WhatsApp' },
                      { value: 'sms', label: 'SMS' },
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Template
                  </label>
                  <Select
                    value={formData.template}
                    onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                    options={[
                      { value: '', label: 'Select a template...' },
                      { value: 'welcome', label: 'Welcome Message' },
                      { value: 'promotion', label: 'Promotion Template' },
                      { value: 'reminder', label: 'Reminder Template' },
                    ]}
                  />
                  <Link href="/dashboard/templates/create" className="text-sm text-[#005bbc] mt-2 inline-block">
                    + Create New Template
                  </Link>
                </div>
                <Button 
                  type="button" 
                  variant="primary" 
                  onClick={() => setStep(2)}
                  disabled={!formData.name || !formData.template}
                  className="w-full"
                >
                  Next: Recipients
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Recipients */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold text-slate-900">Recipients</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Recipients
                  </label>
                  <Select
                    value={formData.recipients}
                    onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
                    options={[
                      { value: '', label: 'Select recipients...' },
                      { value: 'all', label: 'All Customers' },
                      { value: 'segment', label: 'Customer Segment' },
                      { value: 'list', label: 'Custom List' },
                    ]}
                  />
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Estimated Recipients</p>
                      <p className="text-2xl font-bold text-blue-900 mt-1">1,250</p>
                      <p className="text-xs text-blue-700 mt-1">Based on your selection</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    variant="primary" 
                    onClick={() => setStep(3)}
                    disabled={!formData.recipients}
                    className="flex-1"
                  >
                    Next: Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Schedule */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-bold text-slate-900">Schedule & Message</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    When to Send
                  </label>
                  <Select
                    value={formData.scheduleType}
                    onChange={(e) => setFormData({ ...formData, scheduleType: e.target.value })}
                    options={[
                      { value: 'now', label: 'Send Now' },
                      { value: 'scheduled', label: 'Schedule for Later' },
                    ]}
                  />
                </div>
                {formData.scheduleType === 'scheduled' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Date
                      </label>
                      <Input
                        type="date"
                        value={formData.scheduledDate}
                        onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                        required={formData.scheduleType === 'scheduled'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Time
                      </label>
                      <Input
                        type="time"
                        value={formData.scheduledTime}
                        onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                        required={formData.scheduleType === 'scheduled'}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message Content
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter your message here..."
                    rows={6}
                    required
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    {formData.message.length} / 1000 characters
                  </p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-900">WhatsApp Template Requirements</p>
                      <p className="text-xs text-amber-700 mt-1">
                        Templates must be approved by Meta before sending. Make sure your template is approved.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="secondary" 
                    onClick={() => setStep(2)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    disabled={!formData.message}
                    className="flex-1"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </div>
    </div>
  );
}
