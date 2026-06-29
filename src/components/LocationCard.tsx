import React from 'react';
import type { Location } from '../types';
import { MapPin, Shield, AlertTriangle } from 'lucide-react';

interface LocationCardProps {
  location: Location;
  onSelect?: (loc: Location) => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({ location, onSelect }) => {
  const getSafetyBadge = () => {
    if (location.safetyScore >= 8) {
      return {
        bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
        label: 'Highly Secure',
        dot: 'bg-emerald-500'
      };
    } else if (location.safetyScore >= 5) {
      return {
        bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
        label: 'Caution Needed',
        dot: 'bg-amber-500'
      };
    } else {
      return {
        bg: 'bg-brand-red-500/15 border-brand-red-500/30 text-brand-red-400',
        label: 'High Alert Zone',
        dot: 'bg-brand-red-500'
      };
    }
  };

  const badge = getSafetyBadge();

  return (
    <div 
      onClick={() => onSelect && onSelect(location)}
      className={`p-4 rounded-xl glass-panel border border-slate-800/80 hover:border-brand-purple-500/30 flex items-center justify-between gap-4 text-left transition-all ${onSelect ? 'cursor-pointer hover:-translate-y-0.5' : ''}`}
    >
      <div className="flex gap-3 items-center">
        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
          <MapPin className="w-5 h-5" />
        </div>
        <div className="space-y-0.5">
          <h4 className="font-bold text-slate-100 text-sm">{location.name}</h4>
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
              Crowd: {location.crowdLevel}
            </span>
            <span>&bull;</span>
            <span>Lat: {location.lat.toFixed(3)}, Lng: {location.lng.toFixed(3)}</span>
          </div>
        </div>
      </div>

      <div className="text-right">
        <div className="text-lg font-black text-white">{location.safetyScore.toFixed(1)}<span className="text-[10px] text-slate-500 font-normal">/10</span></div>
        <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded border ${badge.bg}`}>
          {badge.label}
        </span>
      </div>
    </div>
  );
};
export default LocationCard;
