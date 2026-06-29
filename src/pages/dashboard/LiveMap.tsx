import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { useLocation } from '../../hooks/useLocation';
import { 
  Compass, 
  MapPin, 
  Wifi, 
  WifiOff, 
  Navigation, 
  Activity, 
  ShieldCheck, 
  ShieldAlert,
  Users
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix leaflet icon styling paths by creating pulsing SVG icons
const createPulsingIcon = (status: 'user' | 'safe' | 'warning' | 'danger') => {
  const color = status === 'user'
    ? 'bg-brand-blue-500'
    : status === 'safe'
      ? 'bg-emerald-500'
      : status === 'warning'
        ? 'bg-amber-500'
        : 'bg-brand-red-500';

  const pulse = status === 'user' ? 'animate-ping' : 'animate-pulse';

  return L.divIcon({
    html: `
      <div class="relative w-8 h-8 flex items-center justify-center">
        <div class="absolute inset-0 rounded-full ${color} opacity-20 ${pulse}"></div>
        <div class="absolute w-5 h-5 rounded-full ${color} opacity-40 animate-ping"></div>
        <div class="w-3.5 h-3.5 rounded-full ${color} border-2 border-slate-900 shadow-md"></div>
      </div>
    `,
    className: 'custom-pulsing-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

export const LiveMap: React.FC = () => {
  const { coordinates, accuracy, speed, heading, error, isLoading, gpsStatus } = useLocation();
  const [mapCenter, setMapCenter] = useState<[number, number]>(coordinates);
  const [isConnected, setIsConnected] = useState(true);

  // Sync center when location loads
  useEffect(() => {
    if (!isLoading && coordinates) {
      setMapCenter(coordinates);
    }
  }, [isLoading]);

  // Teammates mock coordinates nearby for Socket.IO ready representation
  const [teammates] = useState([
    { id: 't1', name: 'Rohan Gupta', role: 'Friend', lat: coordinates[0] + 0.003, lng: coordinates[1] - 0.002, status: 'safe' },
    { id: 't2', name: 'Priya Sharma', role: 'Mother', lat: coordinates[0] - 0.002, lng: coordinates[1] + 0.004, status: 'warning' },
  ]);

  const centerOnUser = () => {
    setMapCenter(coordinates);
  };

  return (
    <div className="space-y-6 text-left relative">
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-slate-900/60 pb-5">
        <div className="space-y-1">
          <h3 className="font-bold text-white text-xl tracking-tight">Live Guard Navigation</h3>
          <p className="text-xs text-slate-400">Continuous GPS telemetry feed mapped against companion circles.</p>
        </div>
        <div className="flex gap-2">
          {/* Connection Status Pill */}
          <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 text-[10px] font-bold uppercase transition-all ${
            isConnected 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-brand-red-500/10 border-brand-red-500/20 text-brand-red-400'
          }`}>
            {isConnected ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
            <span>{isConnected ? 'Socket Connected' : 'Link Offline'}</span>
          </div>

          <button 
            onClick={centerOnUser}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1"
          >
            <Compass className="w-4 h-4" />
            <span>Center GPS</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-brand-red-500/10 border border-brand-red-500/25 text-xs text-brand-red-400 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4" />
          <span>{error} Using default coordinates grid.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Telemetry sidebar */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-6">
            <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1.5 border-b border-slate-800/80 pb-3">
              <Activity className="w-4 h-4 text-brand-purple-400" />
              Live Telemetry HUD
            </h4>

            <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900 space-y-1">
                <span className="text-[10px] text-slate-500">LATITUDE</span>
                <div className="text-white font-mono">{coordinates[0].toFixed(6)}</div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900 space-y-1">
                <span className="text-[10px] text-slate-500">LONGITUDE</span>
                <div className="text-white font-mono">{coordinates[1].toFixed(6)}</div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900 space-y-1">
                <span className="text-[10px] text-slate-500">SPEED</span>
                <div className="text-white font-mono">{speed !== null ? `${speed.toFixed(1)} m/s` : '0.0 m/s'}</div>
              </div>
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900 space-y-1">
                <span className="text-[10px] text-slate-500">ACCURACY</span>
                <div className="text-white font-mono">{accuracy !== null ? `± ${accuracy.toFixed(1)}m` : '寻求信号...'}</div>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800/60">
              <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-brand-purple-400" />
                <span>Teammate Circle Nodes</span>
              </div>
              
              <div className="space-y-2">
                {teammates.map(t => (
                  <div key={t.id} className="flex justify-between items-center text-xs bg-slate-950/40 p-2.5 rounded-xl border border-slate-900">
                    <div>
                      <div className="font-bold text-slate-200">{t.name}</div>
                      <div className="text-[9px] text-slate-500">{t.role}</div>
                    </div>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                      t.status === 'safe' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-brand-blue-500/5 border border-brand-blue-500/10 text-[10px] text-slate-400 leading-normal flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-blue-400 shrink-0 mt-0.5" />
            <p>
              Socket communication link coordinates sync dynamically every 3 seconds to update relative vector alerts indices on your active circle grid.
            </p>
          </div>
        </div>

        {/* Leaflet Map Area */}
        <div className="lg:col-span-8 h-[480px] rounded-3xl overflow-hidden border border-slate-800 relative z-10">
          {isLoading && !error ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-brand-dark-900 text-slate-400 gap-3">
              <Compass className="w-12 h-12 text-brand-purple-400 animate-spin" />
              <span className="text-xs">Locking satellite GPS signals...</span>
            </div>
          ) : (
            <MapContainer 
              center={mapCenter} 
              zoom={15} 
              scrollWheelZoom={true}
              className="w-full h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />

              {/* User Current Location Marker */}
              <Marker position={coordinates} icon={createPulsingIcon('user')}>
                <Popup>
                  <div className="text-xs text-slate-900 text-left font-sans">
                    <strong className="block border-b pb-1 font-bold">Your Location</strong>
                    <span className="block mt-1">Accuracy: ±{accuracy?.toFixed(1)}m</span>
                    <span className="block">Heading: {heading ? `${heading}°` : 'Unknown'}</span>
                  </div>
                </Popup>
              </Marker>

              {/* User Location Accuracy Circle */}
              {accuracy && (
                <Circle 
                  center={coordinates} 
                  radius={accuracy} 
                  pathOptions={{ color: '#0ea5e9', fillColor: '#0ea5e9', fillOpacity: 0.1, weight: 1 }} 
                />
              )}

              {/* Teammates Coords Marker overlays */}
              {teammates.map(t => (
                <Marker key={t.id} position={[t.lat, t.lng]} icon={createPulsingIcon(t.status as any)}>
                  <Popup>
                    <div className="text-xs text-slate-900 text-left font-sans">
                      <strong className="block border-b pb-1 font-bold">{t.name} ({t.role})</strong>
                      <span className="block mt-1 font-semibold uppercase text-[9px] text-brand-purple-600">Status: {t.status}</span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>

      </div>
    </div>
  );
};

export default LiveMap;
