'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  MessageCircle, 
  Phone,
  CheckCircle2
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

// Mock WhatsApp numbers from integrations
const mockWhatsAppNumbers = [
  { id: '1', number: '+1 234 567 8900', name: 'Main Business Number', status: 'connected' },
  { id: '2', number: '+1 234 567 8901', name: 'Support Number', status: 'connected' },
  { id: '3', number: '+1 234 567 8902', name: 'Sales Number', status: 'connected' },
];

export default function CreateTemplatePage() {
  const t = useTranslations("Dashboard.Templates");
  const router = useRouter();
  const [step, setStep] = useState<'platform' | 'number'>('platform');
  const [selectedPlatform, setSelectedPlatform] = useState<'whatsapp' | 'sms' | ''>('');
  const [selectedNumber, setSelectedNumber] = useState('');

  const handlePlatformSelect = (platform: 'whatsapp' | 'sms') => {
    setSelectedPlatform(platform);
    if (platform === 'sms') {
      // For SMS, go directly to creation
      router.push('/dashboard/templates/create/sms');
    } else {
      // For WhatsApp, need to select number first
      setStep('number');
    }
  };

  const handleNumberSelect = () => {
    if (selectedNumber) {
      router.push(`/dashboard/templates/create/whatsapp?number=${selectedNumber}`);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/templates">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {t("createTemplate") || "Create Template"}
            </h1>
            <p className="text-slate-600 mt-1">
              {t("createSubtitle") || "Create a message template for WhatsApp or SMS"}
            </p>
          </div>
        </div>

        {/* Step 1: Platform Selection */}
        {step === 'platform' && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-slate-900">{t("choosePlatform") || "Choose Platform"}</h2>
              <p className="text-sm text-slate-600 mt-1">{t("choosePlatformDesc") || "Select the messaging platform for your template"}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                onClick={() => handlePlatformSelect('whatsapp')}
                className="p-6 border-2 border-slate-200 rounded-xl hover:border-[#005bbc] cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <MessageCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">{t("platforms.whatsapp") || "WhatsApp"}</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {t("platforms.whatsappDesc") || "Create templates for WhatsApp Business API with rich media, buttons, and products"}
                    </p>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-slate-400 group-hover:text-[#005bbc]" />
                </div>
              </div>

              <div 
                onClick={() => handlePlatformSelect('sms')}
                className="p-6 border-2 border-slate-200 rounded-xl hover:border-[#005bbc] cursor-pointer transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">{t("platforms.sms") || "SMS"}</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      {t("platforms.smsDesc") || "Create simple text message templates for SMS campaigns"}
                    </p>
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-slate-400 group-hover:text-[#005bbc]" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Number Selection (WhatsApp only) */}
        {step === 'number' && selectedPlatform === 'whatsapp' && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setStep('platform')}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{t("selectNumber") || "Select WhatsApp Number"}</h2>
                  <p className="text-sm text-slate-600 mt-1">{t("selectNumberDesc") || "Choose the phone number to create the template for"}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockWhatsAppNumbers.map((number) => (
                <div
                  key={number.id}
                  onClick={() => setSelectedNumber(number.id)}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedNumber === number.id
                      ? 'border-[#005bbc] bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        selectedNumber === number.id ? 'bg-[#005bbc]' : 'bg-slate-100'
                      }`}>
                        <MessageCircle className={`w-6 h-6 ${
                          selectedNumber === number.id ? 'text-white' : 'text-slate-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{number.name}</h3>
                        <p className="text-sm text-slate-600">{number.number}</p>
                      </div>
                    </div>
                    {selectedNumber === number.id && (
                      <CheckCircle2 className="w-6 h-6 text-[#005bbc]" />
                    )}
                  </div>
                </div>
              ))}
              
              <div className="pt-4">
                <Button
                  onClick={handleNumberSelect}
                  disabled={!selectedNumber}
                  variant="primary"
                  className="w-full"
                >
                  {t("continue") || "Continue to Template Builder"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
