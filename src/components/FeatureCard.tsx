import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  onClick?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  badge,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between text-left h-full ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="space-y-4">
        {/* Header Icon & Optional Badge */}
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-xl bg-brand-blue-500/10 border border-brand-blue-500/20 text-brand-blue-400">
            <Icon className="w-6 h-6" />
          </div>
          {badge && (
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-brand-purple-600/20 text-brand-purple-300 border border-brand-purple-500/30">
              {badge}
            </span>
          )}
        </div>

        {/* Text Content */}
        <div className="space-y-1">
          <h3 className="font-bold text-base text-white">{title}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
        </div>
      </div>
      
      {/* Dev guidelines marker */}
      {/* FUTURE LOGIC: Connect this card's triggers to their respective service APIs inside src/services/ */}
    </div>
  );
};
export default FeatureCard;
