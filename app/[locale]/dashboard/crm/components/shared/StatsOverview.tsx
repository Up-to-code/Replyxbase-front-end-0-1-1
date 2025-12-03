import React from 'react';
import { TrendingUp, Users, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Booking } from '../../types';

/**
 * Props for the StatsOverview component.
 */
interface StatsOverviewProps {
  /** List of bookings to calculate stats from */
  bookings: Booking[];
  /** Whether data is loading */
  isLoading?: boolean;
  /** Current active filter */
  currentFilter?: string;
  /** Callback to change filter */
  onFilterChange?: (filter: string) => void;
}

/**
 * Displays key statistics about bookings as interactive tabs.
 */
export const StatsOverview: React.FC<StatsOverviewProps> = ({ 
  bookings, 
  isLoading,
  currentFilter,
  onFilterChange
}) => {
  const t = useTranslations("Dashboard.CRM.Stats");

  const stats = React.useMemo(() => {
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;

    return [
      {
        id: 'all',
        title: t("totalBookings"),
        value: totalBookings,
        icon: Calendar,
        color: 'text-[#005bbc]',
        bg: 'bg-[#005bbc]/10',
        activeBorder: 'border-[#005bbc]',
        activeBg: 'bg-[#005bbc]/10'
      },
      {
        id: 'pending',
        title: t("pending"),
        value: pendingBookings,
        icon: Clock,
        color: 'text-[#F59E0B]',
        bg: 'bg-[#F59E0B]/10',
        activeBorder: 'border-[#F59E0B]',
        activeBg: 'bg-[#F59E0B]/10'
      },
      {
        id: 'confirmed',
        title: t("confirmed"),
        value: confirmedBookings,
        icon: CheckCircle,
        color: 'text-[#10B981]',
        bg: 'bg-[#10B981]/10',
        activeBorder: 'border-[#10B981]',
        activeBg: 'bg-[#10B981]/10'
      },
      {
        id: 'cancelled',
        title: t("cancelled"),
        value: cancelledBookings,
        icon: AlertCircle,
        color: 'text-[#EF4444]',
        bg: 'bg-[#EF4444]/10',
        activeBorder: 'border-[#EF4444]',
        activeBg: 'bg-[#EF4444]/10'
      }
    ];
  }, [bookings, t]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border-2 border-slate-200 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
              <div className="space-y-2">
                <div className="h-4 w-20 bg-slate-100 rounded"></div>
                <div className="h-6 w-12 bg-slate-100 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 mb-6 overflow-x-auto pb-2 scrollbar-none snap-x">
      {stats.map((stat) => {
        const isActive = currentFilter === stat.id;
        return (
          <button
            key={stat.id}
            onClick={() => onFilterChange?.(stat.id)}
            className={`
              relative p-4 rounded-2xl border-2 transition-all duration-200 text-left group min-w-[200px] flex-1 snap-center
              ${isActive 
                ? `bg-white ${stat.activeBorder}` 
                : 'bg-white border-slate-200 hover:border-slate-300'
              }
            `}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl border-2 ${stat.bg} ${isActive ? stat.activeBorder : 'border-transparent'}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600 group-hover:text-slate-700 transition-colors">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
            </div>
            {isActive && (
              <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl ${stat.bg}`} />
            )}
          </button>
        );
      })}
    </div>
  );
};
