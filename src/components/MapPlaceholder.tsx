import React, { useState } from 'react';
import { Map, MapPin, Eye, Compass, ShieldAlert, Sparkles } from 'lucide-react';

interface MapPlaceholderProps {
  centerName?: string;
  pins?: { lat: number; lng: number; label: string; status: 'safe' | 'warning' | 'danger' }[];
  heightClass?: string;
}

export const MapPlaceholder: React.FC<MapPlaceholderProps> = ({
  centerName = 'Delhi NCR Safe Zone Monitoring',
  pins = [
    { lat: 28.630, lng: 77.217, label: 'Safe Zone (Connaught Place)', status: 'safe' },
    { lat: 28.570, lng: 77.326, label: 'Geofence Guard Alert', status: 'warning' },
    { lat: 28.656, lng: 77.230, label: 'Uncrowded Dark Alley Report', status: 'danger' }
  ],
  heightClass = 'h-[400px]'
}) => {
  const [activePin, setActivePin] = useState<number | null>(null);

  return (
    <div className={`w-full ${heightClass} rounded-3xl bg-brand-dark-900 border border-slate-800/80 overflow-hidden relative select-none`}>
      {/* Sci-fi Map Grid Graphic Background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      
      {/* Simulated Coordinate Grid Lines */}
      <div className="absolute inset-0 flex items-center justify-between pointer-events-none border-x border-slate-800/20" />
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-y border-slate-800/20" />

      {/* Map Control HUD Overlay */}
      <div className="absolute top-4 left-4 z-10 glass-panel rounded-xl px-3 py-1.5 border border-white/5 flex items-center gap-2">
        <Compass className="w-4 h-4 text-brand-blue-400 animate-spin-slow" />
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-300">
          {centerName}
        </span>
      </div>

      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <div className="glass-panel rounded-xl px-3 py-1.5 border border-white/5 flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Nodal Server Sync
        </div>
      </div>

      {/* Sci-fi Radar Target Rings */}
      <div className="absolute top-[40%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-brand-purple-500/10 pointer-events-none flex items-center justify-center">
        <div className="w-52 h-52 rounded-full border border-brand-blue-500/10 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full border border-brand-red-500/10" />
        </div>
      </div>

      {/* Stylized Simulated Route Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M 120 280 Q 220 180 340 220 T 560 140" 
          fill="none" 
          stroke="url(#routeGradient)" 
          strokeWidth="3" 
          className="route-path"
        />
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Simulated Map Markers */}
      {pins.map((pin, i) => {
        const topOffsets = ['30%', '55%', '70%'];
        const leftOffsets = ['40%', '65%', '25%'];
        const color = pin.status === 'safe' 
          ? 'text-emerald-400 border-emerald-500 bg-emerald-500/10' 
          : pin.status === 'warning' 
            ? 'text-amber-400 border-amber-500 bg-amber-500/10' 
            : 'text-brand-red-400 border-brand-red-500 bg-brand-red-500/10';

        return (
          <div 
            key={i} 
            style={{ top: topOffsets[i] || '50%', left: leftOffsets[i] || '50%' }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10"
            onClick={() => setActivePin(activePin === i ? null : i)}
          >
            {/* Live Ripple */}
            <span className={`absolute inset-0 rounded-full scale-150 opacity-40 map-ring ${
              pin.status === 'safe' ? 'bg-emerald-500' : pin.status === 'warning' ? 'bg-amber-500' : 'bg-brand-red-500'
            }`} />
            
            {/* Pin Pinpoint */}
            <div className={`p-2 rounded-full border shadow-lg ${color} relative z-10 transition-all hover:scale-110`}>
              <MapPin className="w-4 h-4" />
            </div>

            {/* Hover Tooltip/Detail Drawer */}
            <div className={`absolute top-8 left-1/2 -translate-x-1/2 w-48 p-2.5 rounded-xl glass-panel border border-slate-700 shadow-2xl transition-all duration-200 z-20 ${
              activePin === i ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100'
            }`}>
              <div className="text-[10px] font-bold text-white leading-tight">{pin.label}</div>
              <div className="text-[8px] text-slate-400 mt-1 flex items-center justify-between">
                <span>Lat: {pin.lat.toFixed(3)}</span>
                <span className="font-mono text-brand-purple-400 uppercase font-black">{pin.status}</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Map Backdrop Mockup Image / Graphics Overlay */}
      <div className="absolute bottom-4 left-4 z-10 glass-panel rounded-xl p-3 border border-white/5 text-[9px] text-slate-400 flex flex-col gap-1 text-left w-52">
        <div className="font-bold text-slate-200 uppercase flex items-center gap-1">
          <Eye className="w-3 h-3 text-brand-blue-400" />
          <span>Indian Nodal Database</span>
        </div>
        <p className="leading-normal">
          FUTURE LOGIC: Integrate Mapbox GL JS, Google Maps API, or OpenStreetMap Leaflet layer. Add mock layers inside this file.
        </p>
      </div>
      
      <div className="absolute bottom-4 right-4 z-10 text-[9px] font-mono text-slate-500">
        Grid Coordinate: Delhi 28&deg;N 77&deg;E
      </div>
    </div>
  );
};
export default MapPlaceholder;
