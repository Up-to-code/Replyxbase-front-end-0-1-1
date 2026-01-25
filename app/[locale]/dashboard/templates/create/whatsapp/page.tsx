'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  MessageCircle,
  Image,
  Video,
  FileText,
  ShoppingCart,
  Plus,
  X,
  AlertCircle,
  Info,
  CheckCircle2,
  Globe,
  Phone,
  Link as LinkIcon
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { Switch } from '@/components/ui/Switch';
import { toast } from 'sonner';

type HeaderType = 'none' | 'text' | 'image' | 'video' | 'document';
type ButtonType = 'quick_reply' | 'url' | 'phone_number';
type Category = 'transactional' | 'marketing' | 'utility' | 'authentication';

interface ButtonConfig {
  type: ButtonType;
  text?: string;
  url?: string;
  phone?: string;
}

// RTL language codes
const RTL_LANGUAGES = [
  'ar', 'ar_EG', 'ar_AE', 'ar_LB', 'ar_MA', 'ar_QA',
  'he', 'fa', 'ur', 'ps_AF', 'prs_AF'
];

// Check if language is RTL
const isRTL = (langCode: string): boolean => {
  return RTL_LANGUAGES.some(rtl => langCode.startsWith(rtl));
};

// Complete WhatsApp supported languages with native names
const WHATSAPP_LANGUAGES = [
  { code: 'af', name: 'Afrikaans', native: 'Afrikaans' },
  { code: 'sq', name: 'Albanian', native: 'Shqip' },
  { code: 'ar', name: 'Arabic', native: 'العربية' },
  { code: 'ar_EG', name: 'Arabic (Egypt)', native: 'العربية (مصر)' },
  { code: 'ar_AE', name: 'Arabic (UAE)', native: 'العربية (الإمارات)' },
  { code: 'ar_LB', name: 'Arabic (Lebanon)', native: 'العربية (لبنان)' },
  { code: 'ar_MA', name: 'Arabic (Morocco)', native: 'العربية (المغرب)' },
  { code: 'ar_QA', name: 'Arabic (Qatar)', native: 'العربية (قطر)' },
  { code: 'az', name: 'Azerbaijani', native: 'Azərbaycan' },
  { code: 'be_BY', name: 'Belarusian', native: 'Беларуская' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'bn_IN', name: 'Bengali (India)', native: 'বাংলা (ভারত)' },
  { code: 'bg', name: 'Bulgarian', native: 'Български' },
  { code: 'ca', name: 'Catalan', native: 'Català' },
  { code: 'zh_CN', name: 'Chinese (Simplified)', native: '中文 (简体)' },
  { code: 'zh_HK', name: 'Chinese (Hong Kong)', native: '中文 (香港)' },
  { code: 'zh_TW', name: 'Chinese (Taiwan)', native: '中文 (繁體)' },
  { code: 'hr', name: 'Croatian', native: 'Hrvatski' },
  { code: 'cs', name: 'Czech', native: 'Čeština' },
  { code: 'da', name: 'Danish', native: 'Dansk' },
  { code: 'prs_AF', name: 'Dari', native: 'دری' },
  { code: 'nl', name: 'Dutch', native: 'Nederlands' },
  { code: 'nl_BE', name: 'Dutch (Belgium)', native: 'Nederlands (België)' },
  { code: 'en', name: 'English', native: 'English' },
  { code: 'en_GB', name: 'English (UK)', native: 'English (UK)' },
  { code: 'en_US', name: 'English (US)', native: 'English (US)' },
  { code: 'en_AE', name: 'English (UAE)', native: 'English (UAE)' },
  { code: 'en_AU', name: 'English (Australia)', native: 'English (Australia)' },
  { code: 'en_CA', name: 'English (Canada)', native: 'English (Canada)' },
  { code: 'en_GH', name: 'English (Ghana)', native: 'English (Ghana)' },
  { code: 'en_IE', name: 'English (Ireland)', native: 'English (Ireland)' },
  { code: 'en_IN', name: 'English (India)', native: 'English (India)' },
  { code: 'en_JM', name: 'English (Jamaica)', native: 'English (Jamaica)' },
  { code: 'en_MY', name: 'English (Malaysia)', native: 'English (Malaysia)' },
  { code: 'en_NZ', name: 'English (New Zealand)', native: 'English (New Zealand)' },
  { code: 'en_QA', name: 'English (Qatar)', native: 'English (Qatar)' },
  { code: 'en_SG', name: 'English (Singapore)', native: 'English (Singapore)' },
  { code: 'en_UG', name: 'English (Uganda)', native: 'English (Uganda)' },
  { code: 'en_ZA', name: 'English (South Africa)', native: 'English (South Africa)' },
  { code: 'et', name: 'Estonian', native: 'Eesti' },
  { code: 'fil', name: 'Filipino', native: 'Filipino' },
  { code: 'fi', name: 'Finnish', native: 'Suomi' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'fr_BE', name: 'French (Belgium)', native: 'Français (Belgique)' },
  { code: 'fr_CA', name: 'French (Canada)', native: 'Français (Canada)' },
  { code: 'fr_CH', name: 'French (Switzerland)', native: 'Français (Suisse)' },
  { code: 'fr_CI', name: 'French (Ivory Coast)', native: 'Français (Côte d\'Ivoire)' },
  { code: 'fr_MA', name: 'French (Morocco)', native: 'Français (Maroc)' },
  { code: 'ka', name: 'Georgian', native: 'ქართული' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'de_AT', name: 'German (Austria)', native: 'Deutsch (Österreich)' },
  { code: 'de_CH', name: 'German (Switzerland)', native: 'Deutsch (Schweiz)' },
  { code: 'el', name: 'Greek', native: 'Ελληνικά' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'ha', name: 'Hausa', native: 'Hausa' },
  { code: 'he', name: 'Hebrew', native: 'עברית' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'hu', name: 'Hungarian', native: 'Magyar' },
  { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia' },
  { code: 'ga', name: 'Irish', native: 'Gaeilge' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'kk', name: 'Kazakh', native: 'Қазақ' },
  { code: 'rw_RW', name: 'Kinyarwanda', native: 'Ikinyarwanda' },
  { code: 'ko', name: 'Korean', native: '한국어' },
  { code: 'ky_KG', name: 'Kyrgyz', native: 'Кыргызча' },
  { code: 'lo', name: 'Lao', native: 'ລາວ' },
  { code: 'lv', name: 'Latvian', native: 'Latviešu' },
  { code: 'lt', name: 'Lithuanian', native: 'Lietuvių' },
  { code: 'mk', name: 'Macedonian', native: 'Македонски' },
  { code: 'ms', name: 'Malay', native: 'Bahasa Melayu' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'nb', name: 'Norwegian', native: 'Norsk' },
  { code: 'ps_AF', name: 'Pashto', native: 'پښتو' },
  { code: 'fa', name: 'Persian', native: 'فارسی' },
  { code: 'pl', name: 'Polish', native: 'Polski' },
  { code: 'pt_BR', name: 'Portuguese (Brazil)', native: 'Português (Brasil)' },
  { code: 'pt_PT', name: 'Portuguese (Portugal)', native: 'Português (Portugal)' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'ro', name: 'Romanian', native: 'Română' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'sr', name: 'Serbian', native: 'Српски' },
  { code: 'si_LK', name: 'Sinhala', native: 'සිංහල' },
  { code: 'sk', name: 'Slovak', native: 'Slovenčina' },
  { code: 'sl', name: 'Slovenian', native: 'Slovenščina' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'es_AR', name: 'Spanish (Argentina)', native: 'Español (Argentina)' },
  { code: 'es_CL', name: 'Spanish (Chile)', native: 'Español (Chile)' },
  { code: 'es_CO', name: 'Spanish (Colombia)', native: 'Español (Colombia)' },
  { code: 'es_CR', name: 'Spanish (Costa Rica)', native: 'Español (Costa Rica)' },
  { code: 'es_DO', name: 'Spanish (Dominican Republic)', native: 'Español (República Dominicana)' },
  { code: 'es_EC', name: 'Spanish (Ecuador)', native: 'Español (Ecuador)' },
  { code: 'es_HN', name: 'Spanish (Honduras)', native: 'Español (Honduras)' },
  { code: 'es_MX', name: 'Spanish (Mexico)', native: 'Español (México)' },
  { code: 'es_PA', name: 'Spanish (Panama)', native: 'Español (Panamá)' },
  { code: 'es_PE', name: 'Spanish (Peru)', native: 'Español (Perú)' },
  { code: 'es_ES', name: 'Spanish (Spain)', native: 'Español (España)' },
  { code: 'es_UY', name: 'Spanish (Uruguay)', native: 'Español (Uruguay)' },
  { code: 'sw', name: 'Swahili', native: 'Kiswahili' },
  { code: 'sv', name: 'Swedish', native: 'Svenska' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'th', name: 'Thai', native: 'ไทย' },
  { code: 'tr', name: 'Turkish', native: 'Türkçe' },
  { code: 'uk', name: 'Ukrainian', native: 'Українська' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },
  { code: 'uz', name: 'Uzbek', native: 'O\'zbek' },
  { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt' },
  { code: 'zu', name: 'Zulu', native: 'isiZulu' },
];

export default function WhatsAppTemplateBuilder() {
  const t = useTranslations("Dashboard.Templates.WhatsApp");
  const router = useRouter();
  const searchParams = useSearchParams();
  const numberId = searchParams.get('number') || '1';

  const [formData, setFormData] = useState({
    name: '',
    category: 'transactional' as Category,
    language: 'en',
    headerType: 'none' as HeaderType,
    headerText: '',
    headerMedia: '',
    body: '',
    footer: '',
    hasButtons: false,
    hasProducts: false,
    buttons: [] as ButtonConfig[],
    exampleValues: {} as Record<string, string>,
  });

  const [variables, setVariables] = useState<string[]>([]);
  const [carriers, setCarriers] = useState<string[]>(['all']);

  // Extract variables from body and header
  useEffect(() => {
    const regex = /\{\{(\d+)\}\}/g;
    const bodyMatches = formData.body.matchAll(regex);
    const headerMatches = formData.headerText.matchAll(regex);
    
    const bodyVars = Array.from(bodyMatches, m => m[1]);
    const headerVars = Array.from(headerMatches, m => m[1]);
    const allVars = [...new Set([...bodyVars, ...headerVars])];
    
    setVariables(allVars);
    
    // Initialize example values
    const newExamples: Record<string, string> = {};
    allVars.forEach(v => {
      if (!formData.exampleValues[v]) {
        newExamples[v] = '';
      }
    });
    if (Object.keys(newExamples).length > 0) {
      setFormData(prev => ({
        ...prev,
        exampleValues: { ...prev.exampleValues, ...newExamples }
      }));
    }
  }, [formData.body, formData.headerText]);

  const handleAddButton = () => {
    if (formData.buttons.length >= 3) {
      toast.error('Maximum 3 buttons allowed');
      return;
    }
    setFormData(prev => ({
      ...prev,
      buttons: [...prev.buttons, { type: 'quick_reply', text: '' }]
    }));
  };

  const handleRemoveButton = (index: number) => {
    setFormData(prev => ({
      ...prev,
      buttons: prev.buttons.filter((_, i) => i !== index)
    }));
  };

  const handleButtonChange = (index: number, field: keyof ButtonConfig, value: string) => {
    setFormData(prev => ({
      ...prev,
      buttons: prev.buttons.map((btn, i) => 
        i === index ? { ...btn, [field]: value } : btn
      )
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.body) {
      toast.error('Template name and body are required');
      return;
    }

    if (formData.headerType === 'text' && !formData.headerText) {
      toast.error('Header text is required when header type is text');
      return;
    }

    if (formData.hasButtons && formData.buttons.length === 0) {
      toast.error('At least one button is required when buttons are enabled');
      return;
    }

    const missingExamples = variables.filter(v => !formData.exampleValues[v]?.trim());
    if (missingExamples.length > 0) {
      toast.error(`Please provide example values for all variables: ${missingExamples.join(', ')}`);
      return;
    }

    toast.success('Template created! It will be submitted for Meta approval.');
    router.push('/dashboard/templates');
  };

  // Replace variables with example values for preview
  const getPreviewText = (text: string) => {
    let preview = text;
    variables.forEach(v => {
      const example = formData.exampleValues[v] || `{{${v}}}`;
      preview = preview.replace(new RegExp(`\\{\\{${v}\\}\\}`, 'g'), example);
    });
    return preview;
  };

  // Check if current language is RTL
  const currentIsRTL = isRTL(formData.language);

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
              {t("title") || "Create WhatsApp Template"}
            </h1>
            <p className="text-slate-600 mt-1">
              {t("subtitle") || "Build a template that matches Meta's WhatsApp Business API requirements"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side: Settings Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold text-slate-900">{t("basicInfo.title") || "Basic Information"}</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t("basicInfo.templateName") || "Template Name *"}
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t("basicInfo.templateNamePlaceholder") || "e.g., welcome_message"}
                        required
                        pattern="[a-z0-9_]+"
                        title={t("basicInfo.templateNameHint") || "Only lowercase letters, numbers, and underscores"}
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        {t("basicInfo.templateNameHint") || "Only lowercase letters, numbers, and underscores"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t("basicInfo.category") || "Category *"}
                      </label>
                      <Select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                        options={[
                          { value: 'transactional', label: t("basicInfo.categoryTransactional") || 'Transactional' },
                          { value: 'marketing', label: t("basicInfo.categoryMarketing") || 'Marketing' },
                          { value: 'utility', label: t("basicInfo.categoryUtility") || 'Utility' },
                          { value: 'authentication', label: t("basicInfo.categoryAuthentication") || 'Authentication' },
                        ]}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t("basicInfo.language") || "Language *"}
                    </label>
                    <Select
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      options={WHATSAPP_LANGUAGES.map(lang => ({
                        value: lang.code,
                        label: `${lang.native} (${lang.name})`
                      }))}
                    />
                    {currentIsRTL && (
                      <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {t("basicInfo.rtlDetected") || "RTL language detected - Preview will display right-to-left"}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Header Component */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold text-slate-900">{t("header.title") || "Header (Optional)"}</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t("header.type") || "Header Type"}
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {(['none', 'text', 'image', 'video', 'document'] as HeaderType[]).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, headerType: type, headerText: '', headerMedia: '' })}
                          className={`p-3 border rounded-lg text-sm font-medium transition-all ${
                            formData.headerType === type
                              ? 'border-[#005bbc] bg-blue-50 text-[#005bbc]'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {type === 'none' && (t("header.typeNone") || 'None')}
                          {type === 'text' && (t("header.typeText") || 'Text')}
                          {type === 'image' && (t("header.typeImage") || 'Image')}
                          {type === 'video' && (t("header.typeVideo") || 'Video')}
                          {type === 'document' && (t("header.typeDocument") || 'Document')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.headerType === 'text' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t("header.textLabel") || "Header Text (max 60 characters, 1 variable allowed)"}
                      </label>
                      <Input
                        value={formData.headerText}
                        onChange={(e) => setFormData({ ...formData, headerText: e.target.value })}
                        placeholder={t("header.textPlaceholder") || "e.g., Welcome {{1}}!"}
                        maxLength={60}
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        {formData.headerText.length} / 60 {t("header.characters") || "characters"}
                      </p>
                    </div>
                  )}

                  {(formData.headerType === 'image' || formData.headerType === 'video' || formData.headerType === 'document') && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {formData.headerType === 'image' && (t("header.imageUrl") || 'Image URL')}
                        {formData.headerType === 'video' && (t("header.videoUrl") || 'Video URL')}
                        {formData.headerType === 'document' && (t("header.documentUrl") || 'Document URL')}
                      </label>
                      <Input
                        value={formData.headerMedia}
                        onChange={(e) => setFormData({ ...formData, headerMedia: e.target.value })}
                        placeholder={t("header.mediaPlaceholder") || "https://example.com/media.jpg"}
                        type="url"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Body Component */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold text-slate-900">{t("body.title") || "Body *"}</h2>
                  <p className="text-sm text-slate-600 mt-1">{t("body.subtitle") || "Main message content (required)"}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t("body.label") || "Message Body (max 1024 characters)"}
                    </label>
                    <Textarea
                      value={formData.body}
                      onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                      placeholder={t("body.placeholder") || "Enter your message. Use {{1}}, {{2}}, etc. for variables."}
                      rows={6}
                      required
                      maxLength={1024}
                    />
                    <div className="flex items-center justify-between mt-1">
                      <p className={`text-xs ${formData.body.length > 1024 ? 'text-red-500' : 'text-slate-500'}`}>
                        {formData.body.length} / 1024 {t("body.characters") || "characters"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {t("body.variables") || "Variables"}: {variables.length}
                      </p>
                    </div>
                  </div>

                  {/* Example Values for Variables */}
                  {variables.length > 0 && (
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Info className="w-4 h-4 text-slate-600" />
                        <p className="text-sm font-medium text-slate-900">{t("body.exampleValuesTitle") || "Example Values (Required for Approval)"}</p>
                      </div>
                      <div className="space-y-2">
                        {variables.map((varNum) => (
                          <div key={varNum} className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-700 w-20">
                              {`{{${varNum}}}:`}
                            </span>
                            <Input
                              value={formData.exampleValues[varNum] || ''}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                exampleValues: { ...prev.exampleValues, [varNum]: e.target.value }
                              }))}
                              placeholder={t("body.exampleValuePlaceholder", { num: varNum }) || `Example value for variable ${varNum}`}
                              className="flex-1"
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Footer Component */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold text-slate-900">{t("footer.title") || "Footer (Optional)"}</h2>
                </CardHeader>
                <CardContent>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t("footer.label") || "Footer Text (max 60 characters)"}
                    </label>
                    <Input
                      value={formData.footer}
                      onChange={(e) => setFormData({ ...formData, footer: e.target.value })}
                      placeholder={t("footer.placeholder") || "e.g., Powered by Your Company"}
                      maxLength={60}
                    />
                    <p className={`text-xs mt-1 ${formData.footer.length > 60 ? 'text-red-500' : 'text-slate-500'}`}>
                      {formData.footer.length} / 60 {t("footer.characters") || "characters"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Buttons Component */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{t("buttons.title") || "Buttons (Optional)"}</h2>
                      <p className="text-sm text-slate-600 mt-1">{t("buttons.subtitle") || "Add up to 3 call-to-action buttons"}</p>
                    </div>
                    <Switch
                      checked={formData.hasButtons}
                      onChange={(e) => setFormData({ ...formData, hasButtons: e.target.checked, buttons: e.target.checked ? [] : [] })}
                    />
                  </div>
                </CardHeader>
                {formData.hasButtons && (
                  <CardContent className="space-y-4">
                    {formData.buttons.map((button, index) => (
                      <div key={index} className="p-4 border border-slate-200 rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-slate-900">{t("buttons.buttonNumber", { num: index + 1 }) || `Button ${index + 1}`}</h3>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveButton(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            {t("buttons.type") || "Button Type"}
                          </label>
                          <Select
                            value={button.type}
                            onChange={(e) => handleButtonChange(index, 'type', e.target.value)}
                            options={[
                              { value: 'quick_reply', label: t("buttons.typeQuickReply") || 'Quick Reply' },
                              { value: 'url', label: t("buttons.typeUrl") || 'URL' },
                              { value: 'phone_number', label: t("buttons.typePhone") || 'Phone Number' },
                            ]}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            {t("buttons.text") || "Button Text *"}
                          </label>
                          <Input
                            value={button.text || ''}
                            onChange={(e) => handleButtonChange(index, 'text', e.target.value)}
                            placeholder={t("buttons.textPlaceholder") || "e.g., Get Started"}
                            required
                            maxLength={20}
                          />
                        </div>
                        {button.type === 'url' && (
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              {t("buttons.url") || "URL *"}
                            </label>
                            <Input
                              value={button.url || ''}
                              onChange={(e) => handleButtonChange(index, 'url', e.target.value)}
                              placeholder={t("buttons.urlPlaceholder") || "https://example.com"}
                              type="url"
                              required
                            />
                          </div>
                        )}
                        {button.type === 'phone_number' && (
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              {t("buttons.phone") || "Phone Number *"}
                            </label>
                            <Input
                              value={button.phone || ''}
                              onChange={(e) => handleButtonChange(index, 'phone', e.target.value)}
                              placeholder={t("buttons.phonePlaceholder") || "+1234567890"}
                              required
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    {formData.buttons.length < 3 && (
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={handleAddButton}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        {t("buttons.addButton") || "Add Button"}
                      </Button>
                    )}
                  </CardContent>
                )}
              </Card>

              {/* Products Option */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">{t("products.title") || "Products (Optional)"}</h2>
                      <p className="text-sm text-slate-600 mt-1">{t("products.subtitle") || "Showcase products in your template"}</p>
                    </div>
                    <Switch
                      checked={formData.hasProducts}
                      onChange={(e) => setFormData({ ...formData, hasProducts: e.target.checked })}
                    />
                  </div>
                </CardHeader>
                {formData.hasProducts && (
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <ShoppingCart className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900 mb-1">{t("products.mpmTitle") || "Multi-Product Message"}</p>
                          <p className="text-xs text-blue-700">
                            {t("products.mpmDescription") || "Connect your product catalog to showcase up to 30 products in 10 sections. Requires WhatsApp v2.22.24 or greater."}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t("products.catalogId") || "Catalog ID"}
                      </label>
                      <Input
                        placeholder={t("products.catalogIdPlaceholder") || "Enter your Meta Catalog ID"}
                      />
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* Carriers */}
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold text-slate-900">{t("carriers.title") || "Carriers (Optional)"}</h2>
                  <p className="text-sm text-slate-600 mt-1">{t("carriers.subtitle") || "Restrict template to specific mobile carriers"}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {['all', 'verizon', 'att', 't-mobile', 'sprint', 'vodafone', 'orange', 'ee'].map((carrier) => (
                      <Badge
                        key={carrier}
                        variant={carriers.includes(carrier) ? 'default' : 'secondary'}
                        className="cursor-pointer"
                        onClick={() => {
                          if (carrier === 'all') {
                            setCarriers(['all']);
                          } else {
                            setCarriers(prev => {
                              const newCarriers = prev.filter(c => c !== 'all');
                              if (newCarriers.includes(carrier)) {
                                return newCarriers.filter(c => c !== carrier);
                              }
                              return [...newCarriers, carrier];
                            });
                          }
                        }}
                      >
                        {carrier === 'all' ? (t("carriers.all") || 'All Carriers') : carrier.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Submit */}
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
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {t("actions.submit") || "Submit for Approval"}
                </Button>
              </div>
            </form>
          </div>

          {/* Right Side: Message Preview */}
          <div className="lg:sticky lg:top-6 h-fit">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-bold text-slate-900">{t("preview.title") || "Live Preview"}</h2>
                <p className="text-sm text-slate-500">{t("preview.subtitle") || "How your message will appear"}</p>
              </CardHeader>
              <CardContent>
                <div className="bg-[#e5ddd5] rounded-lg p-4 min-h-[500px] flex items-end">
                  <div className={`w-full space-y-3 ${currentIsRTL ? 'rtl' : 'ltr'}`} dir={currentIsRTL ? 'rtl' : 'ltr'}>
                    {/* WhatsApp Message Bubble */}
                    <div className={`bg-white rounded-lg p-4 shadow-sm max-w-[85%] ${
                      currentIsRTL ? 'mr-auto ml-0' : 'ml-auto mr-0'
                    }`}>
                      {/* Header */}
                      {formData.headerType !== 'none' && (
                        <div className={`mb-3 pb-3 border-b border-slate-200 ${currentIsRTL ? 'text-right' : 'text-left'}`}>
                          {formData.headerType === 'text' && (
                            <p className={`text-sm font-semibold text-slate-900 ${currentIsRTL ? 'text-right' : 'text-left'}`} dir={currentIsRTL ? 'rtl' : 'ltr'}>
                              {getPreviewText(formData.headerText || t("preview.headerText") || 'Header text')}
                            </p>
                          )}
                          {formData.headerType === 'image' && (
                            <div className="w-full h-48 bg-slate-200 rounded flex items-center justify-center">
                              <Image className="w-12 h-12 text-slate-400" />
                            </div>
                          )}
                          {formData.headerType === 'video' && (
                            <div className="w-full h-48 bg-slate-200 rounded flex items-center justify-center">
                              <Video className="w-12 h-12 text-slate-400" />
                            </div>
                          )}
                          {formData.headerType === 'document' && (
                            <div className="flex items-center gap-2 p-2 bg-slate-50 rounded">
                              <FileText className="w-5 h-5 text-slate-600" />
                              <span className="text-sm text-slate-700">{t("preview.document") || "Document"}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Body */}
                      <div className={`mb-3 ${currentIsRTL ? 'text-right' : 'text-left'}`}>
                        <p className={`text-sm text-slate-800 whitespace-pre-wrap leading-relaxed ${currentIsRTL ? 'text-right' : 'text-left'}`} dir={currentIsRTL ? 'rtl' : 'ltr'}>
                          {getPreviewText(formData.body || t("preview.bodyPlaceholder") || 'Your message body will appear here...')}
                        </p>
                      </div>

                      {/* Footer */}
                      {formData.footer && (
                        <div className={`mb-3 pt-3 border-t border-slate-200 ${currentIsRTL ? 'text-right' : 'text-left'}`}>
                          <p className={`text-xs text-slate-500 ${currentIsRTL ? 'text-right' : 'text-left'}`} dir={currentIsRTL ? 'rtl' : 'ltr'}>
                            {formData.footer}
                          </p>
                        </div>
                      )}

                      {/* Buttons */}
                      {formData.hasButtons && formData.buttons.length > 0 && (
                        <div className="space-y-2 mt-3 pt-3 border-t border-slate-200">
                          {formData.buttons.map((btn, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 p-2 bg-blue-50 rounded text-sm"
                            >
                              {btn.type === 'url' && <LinkIcon className="w-4 h-4 text-blue-600" />}
                              {btn.type === 'phone_number' && <Phone className="w-4 h-4 text-blue-600" />}
                              <span className="text-blue-700 font-medium">
                                {btn.text || t("preview.button") || 'Button'}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Products Indicator */}
                      {formData.hasProducts && (
                        <div className="mt-3 pt-3 border-t border-slate-200">
                          <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                            <ShoppingCart className="w-4 h-4 text-green-600" />
                            <span className="text-xs text-green-700 font-medium">
                              {t("preview.productCatalog") || "Product Catalog"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Time and Status */}
                    <div className={`flex items-center gap-1 text-xs text-slate-500 ${
                      currentIsRTL ? 'justify-start' : 'justify-end'
                    }`}>
                      <span>{t("preview.time") || "10:30 AM"}</span>
                      <CheckCircle2 className="w-3 h-3" />
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
