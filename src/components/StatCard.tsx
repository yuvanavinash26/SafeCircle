import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  colorClass?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
  icon: Icon,
  colorClass = 'text-brand-blue-400 bg-brand-blue-500/10'
}) => {
  return (
    <div className="p-5 rounded-2xl glass-panel text-left flex items-center justify-between gap-4 transition-all hover:border-white/10">
      <div className="space-y-1">
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">{title}</span>
        <div className="text-2xl font-black text-white">{value}</div>
        {subtext && <p className="text-[10px] text-slate-400 font-medium">{subtext}</p>}
      </div>
      <div className={`p-3 rounded-xl ${colorClass} border border-white/5`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
};
export default StatCard;
