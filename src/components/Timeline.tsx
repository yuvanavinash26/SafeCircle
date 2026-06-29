import React from 'react';
import { Shield, Volume2, Activity, MapPin, CheckCircle } from 'lucide-react';
import type { EmergencyRecord } from '../types';

interface TimelineProps {
  events: EmergencyRecord[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'Voice Trigger':
        return { icon: Volume2, color: 'bg-brand-purple-500 text-white' };
      case 'Panic Detection':
        return { icon: Activity, color: 'bg-pink-500 text-white' };
      case 'Geofence Exit':
        return { icon: MapPin, color: 'bg-brand-blue-500 text-white' };
      default:
        return { icon: Shield, color: 'bg-brand-red-500 text-white' };
    }
  };

  return (
    <div className="p-6 rounded-2xl glass-panel text-left space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-slate-900/60">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-brand-red-500" />
          <span>Local Incident Response Log</span>
        </h3>
        <span className="text-[10px] text-slate-500 font-mono">Last updated: 1 min ago</span>
      </div>

      <div className="relative border-l border-slate-800 pl-6 ml-3 space-y-8">
        {events.map((event, i) => {
          const config = getTimelineIcon(event.type);
          const Icon = config.icon;

          return (
            <div key={event.id} className="relative">
              {/* Node Bullet Icon */}
              <span className={`absolute -left-[37px] top-0.5 p-1.5 rounded-full border-4 border-brand-dark-950 ${config.color} shadow-lg shadow-black/40`}>
                <Icon className="w-3.5 h-3.5" />
              </span>

              {/* Node Card details */}
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-xs font-bold text-slate-200">{event.type} Dispatch</h4>
                  <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                    event.status === 'Resolved' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-brand-red-500/10 text-brand-red-400 border border-brand-red-500/20'
                  }`}>
                    {event.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Secured contact <span className="text-slate-200 font-semibold">{event.contactName}</span> ({event.phone}) notified automatically.
                </p>
                <div className="text-[9px] text-slate-500 font-medium">Time: {event.time}</div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[9px] text-slate-500 italic mt-4">
        FUTURE LOGIC: Integrate client-side storage (IndexDB/localStorage) or fetch actual database logs from `/api/emergencies/logs` to render dynamically.
      </p>
    </div>
  );
};
export default Timeline;
