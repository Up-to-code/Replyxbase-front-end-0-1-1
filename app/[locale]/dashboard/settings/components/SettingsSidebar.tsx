import { User, Settings, Bell, Palette, CreditCard, Building2, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SettingsSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ activeTab, setActiveTab }) => {
  const t = useTranslations("Dashboard.Settings.nav");
  const tOrg = useTranslations("Dashboard.Settings.Organization");
  const tTeam = useTranslations("Dashboard.Settings.Team");

  const menuItems = [
    { id: 'profile', label: t('profile'), icon: User },
    { id: 'organization', label: tOrg('title'), icon: Building2 },
    { id: 'team', label: tTeam('title'), icon: Users },
    { id: 'notifications', label: t('notifications'), icon: Bell },
    { id: 'appearance', label: t('appearance'), icon: Palette },
    { id: 'billing', label: t('billing'), icon: CreditCard },
  ];

  return (
    <nav className="w-full space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 text-base font-medium rounded-lg transition-all duration-200 border-2
              ${isActive 
                ? 'bg-[#005bbc] text-white border-[#005bbc]' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-transparent hover:border-slate-200'
              }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'}`} />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
};
