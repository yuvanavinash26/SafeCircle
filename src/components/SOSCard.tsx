import React from 'react';
import type { EmergencyRecord } from '../types';
import { CheckCircle2, AlertOctagon, Clock, UserPlus } from 'lucide-react';

interface SOSCardProps {
  record: EmergencyRecord;
  onResolve?: (id: string) => void;
}

export const SOSCard: React.FC<SOSCardProps> = ({ record, onResolve }) => {
  const getStatusDetails = () => {
    switch (record.status) {
      case 'Active':
        return {
          icon: AlertOctagon,
          bg: 'bg-brand-red-500/10 border-brand-red-500/30',
          text: 'text-brand-red-400',
          pillBg: 'bg-brand-red-500/20 text-brand-red-400 border border-brand-red-500/30'
        };
      case 'Dispatched':
        return {
          icon: Clock,
          bg: 'bg-brand-blue-500/10 border-brand-blue-500/30',
          text: 'text-brand-blue-400',
          pillBg: 'bg-brand-blue-500/20 text-brand-blue-400 border border-brand-blue-500/30'
        };
      default:
        return {
          icon: CheckCircle2,
          bg: 'bg-emerald-500/10 border-emerald-500/20',
          text: 'text-emerald-400',
          pillBg: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
        };
    }
  };

  const status = getStatusDetails();
  const Icon = status.icon;

  return (
    <div className={`p-5 rounded-2xl border ${status.bg} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left transition-all hover:scale-[1.01]`}>
      <div className="flex gap-4 items-start">
        <div className={`p-3 rounded-xl bg-slate-900/60 border border-white/5 ${status.text}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="font-bold text-white text-sm">{record.contactName}</h4>
            <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${status.pillBg}`}>
              {record.status}
            </span>
          </div>
          <p className="text-xs text-slate-400">Trigger: <span className="text-slate-200 font-semibold">{record.type}</span></p>
          <div className="flex items-center gap-3 text-[10px] text-slate-500">
            <span>Time: {record.time}</span>
            <span>&bull;</span>
            <span>Phone: {record.phone}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 w-full sm:w-auto justify-end">
        {record.status !== 'Resolved' && onResolve && (
          <button
            onClick={() => onResolve(record.id)}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/10 transition-all border border-emerald-500/20"
          >
            Mark Resolved
          </button>
        )}
        <button 
          onClick={() => alert(`Connecting with emergency nodal details of ${record.phone}`)}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors"
        >
          View Log
        </button>
      </div>
    </div>
  );
};
export default SOSCard;
