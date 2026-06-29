import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SettingsCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  settings: {
    id: string;
    label: string;
    description: string;
    checked: boolean;
    onToggle: (id: string) => void;
  }[];
}

export const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  description,
  icon: Icon,
  settings
}) => {
  return (
    <div className="p-6 rounded-2xl glass-panel text-left space-y-6">
      
      {/* Header Info */}
      <div className="flex gap-4 items-start border-b border-slate-900/60 pb-4">
        <div className="p-3 rounded-xl bg-brand-purple-500/10 border border-brand-purple-500/20 text-brand-purple-400">
          <Icon className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <h3 className="font-bold text-white text-base">{title}</h3>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>

      {/* Switch Toggles List */}
      <div className="space-y-4">
        {settings.map((setting) => (
          <div key={setting.id} className="flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <label htmlFor={`toggle-${setting.id}`} className="text-xs font-bold text-slate-200 cursor-pointer">{setting.label}</label>
              <p className="text-[10px] text-slate-500 leading-normal">{setting.description}</p>
            </div>
            
            {/* Custom Toggle Switch */}
            <button
              id={`toggle-${setting.id}`}
              onClick={() => setting.onToggle(setting.id)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors relative outline-none border border-slate-800 ${
                setting.checked ? 'bg-brand-purple-600' : 'bg-slate-900'
              }`}
            >
              <div 
                className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                  setting.checked ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
      
      {/* FUTURE LOGIC: Connect toggle switches to localStorage or Context settings provider. Add database sync inside onChange. */}
    </div>
  );
};
export default SettingsCard;
