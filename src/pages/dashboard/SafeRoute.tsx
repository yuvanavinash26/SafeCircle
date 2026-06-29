import React, { useState } from 'react';
import MapPlaceholder from '../../components/MapPlaceholder';
import { Route, Navigation, Shield, HeartHandshake, Eye, AlertTriangle } from 'lucide-react';

export const SafeRoute: React.FC = () => {
  const [startPoint, setStartPoint] = useState('South Extension II, Delhi');
  const [endPoint, setEndPoint] = useState('Noida Sector 62, Uttar Pradesh');
  const [routes, setRoutes] = useState([
    {
      id: 'r1',
      name: 'SafeCircle Guard Path (Recommended)',
      time: '34 mins',
      distance: '18.4 km',
      safetyScore: 9.4,
      crowdLevel: 'high',
      lightsRating: 'Excellent',
      alertCount: 0,
      badge: 'Highly Lit & Crowded'
    },
    {
      id: 'r2',
      name: 'Direct NH-24 Bypass',
      time: '28 mins',
      distance: '16.2 km',
      safetyScore: 6.8,
      crowdLevel: 'medium',
      lightsRating: 'Moderate',
      alertCount: 2,
      badge: 'Fastest Path'
    }
  ]);
  const [selectedRoute, setSelectedRoute] = useState(routes[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      
      {/* Route planning settings */}
      <div className="lg:col-span-4 space-y-6 flex flex-col justify-between h-full">
        
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-white text-base">AI Safe-Route Planner</h3>
            <p className="text-xs text-slate-400">Routes calculated matching street lamp illumination, security camera coverage, and crowd density algorithms.</p>
          </div>

          <div className="space-y-3 bg-slate-900/40 border border-slate-800 rounded-2xl p-4">
            
            {/* Start location */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Start point</label>
              <div className="relative">
                <Navigation className="absolute left-3 top-3 w-4 h-4 text-brand-blue-400 rotate-45" />
                <input 
                  type="text"
                  value={startPoint}
                  onChange={(e) => setStartPoint(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800/80 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-200 outline-none"
                />
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Destination</label>
              <div className="relative">
                <Route className="absolute left-3 top-3 w-4 h-4 text-brand-purple-400" />
                <input 
                  type="text"
                  value={endPoint}
                  onChange={(e) => setEndPoint(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800/80 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-200 outline-none"
                />
              </div>
            </div>

          </div>

          {/* Available paths list */}
          <div className="space-y-3">
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Calculated Safety Paths</div>
            
            {routes.map(path => (
              <div 
                key={path.id}
                onClick={() => setSelectedRoute(path)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedRoute.id === path.id 
                    ? 'glass-panel border-brand-purple-500/50 bg-brand-purple-500/5 shadow-md shadow-brand-purple-500/5' 
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700/50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-xs text-white">{path.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{path.time} &bull; {path.distance}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-white">{path.safetyScore}</span>
                    <span className="text-[9px] text-slate-500">/10</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <span className="text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-brand-blue-500/10 border border-brand-blue-500/20 text-brand-blue-400">
                    {path.badge}
                  </span>
                  {path.alertCount > 0 && (
                    <span className="text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-brand-red-500/15 border border-brand-red-500/30 text-brand-red-400 flex items-center gap-0.5">
                      <AlertTriangle className="w-2.5 h-2.5" />
                      {path.alertCount} alerts
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Selected route metrics HUD */}
        {selectedRoute && (
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 shrink-0">
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">AI Path Telemetry Details</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-950/60 border border-slate-850 p-2 rounded">
                <span className="text-slate-400 text-[10px]">Illumination:</span>
                <div className="font-bold text-slate-200">{selectedRoute.lightsRating}</div>
              </div>
              <div className="bg-slate-950/60 border border-slate-850 p-2 rounded">
                <span className="text-slate-400 text-[10px]">Crowd Density:</span>
                <div className="font-bold text-slate-200 uppercase">{selectedRoute.crowdLevel}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map visualization panel */}
      <div className="lg:col-span-8 space-y-4">
        {selectedRoute && (
          <MapPlaceholder 
            centerName={`AI SafeRoute Navigation Overlay`} 
            pins={[
              { lat: 28.630, lng: 77.217, label: `Start Point: ${startPoint}`, status: 'safe' },
              { lat: 28.570, lng: 77.326, label: `Route Guard Nodal Verify`, status: selectedRoute.safetyScore >= 8 ? 'safe' : 'warning' }
            ]} 
            heightClass="h-[480px]" 
          />
        )}
      </div>

    </div>
  );
};
export default SafeRoute;
