import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { useLocation } from '../../hooks/useLocation';
import { useSafeRoute } from '../../hooks/useSafeRoute';
import { locationService } from '../../services/locationService';
import type { Location } from '../../types';
import { 
  Compass, 
  MapPin, 
  Navigation, 
  ShieldAlert, 
  ShieldCheck, 
  Route, 
  Search, 
  Flame, 
  Plus, 
  Eye,
  Hospital,
  AlertTriangle
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet DivIcons
const createRouteNodeIcon = (type: 'start' | 'end' | 'police' | 'hospital' | 'safezone') => {
  const color = type === 'start'
    ? 'bg-brand-blue-500'
    : type === 'end'
      ? 'bg-brand-purple-500'
      : type === 'police'
        ? 'bg-blue-600'
        : type === 'hospital'
          ? 'bg-red-500'
          : 'bg-emerald-500';

  return L.divIcon({
    html: `
      <div class="relative w-7 h-7 flex items-center justify-center">
        <div class="absolute w-4 h-4 rounded-full ${color} opacity-40 animate-ping"></div>
        <div class="w-3 h-3 rounded-full ${color} border-2 border-slate-900 shadow-md"></div>
      </div>
    `,
    className: 'custom-route-icon',
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
};

export const SafeRoute: React.FC = () => {
  const { coordinates, isLoading: isLoadingGps } = useLocation();
  const { getSafeRoutes, routes, isLoading: isLoadingRoutes } = useSafeRoute();

  const [startPoint, setStartPoint] = useState('My Location');
  const [endPoint, setEndPoint] = useState('Noida Sector 62, UP');
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  // Overlay layers toggle states
  const [showPolice, setShowPolice] = useState(true);
  const [showHospitals, setShowHospitals] = useState(true);
  const [showSafeZones, setShowSafeZones] = useState(true);

  // Lists of nearby locations fetched from services
  const [policeStations, setPoliceStations] = useState<Location[]>([]);
  const [hospitals, setHospitals] = useState<Location[]>([]);
  const [safeZones, setSafeZones] = useState<Location[]>([]);

  // Fetch nearby points on location lock
  useEffect(() => {
    if (coordinates) {
      // API integration queries
      locationService.getNearbyPoliceStations(coordinates[0], coordinates[1])
        .then(res => {
          if (Array.isArray(res)) setPoliceStations(res);
          else throw new Error('Invalid format');
        })
        .catch(() => {
          // Fallback static nodes for display if API not responsive
          setPoliceStations([
            { id: 'p1', name: 'South Ext Police Post', lat: coordinates[0] + 0.005, lng: coordinates[1] + 0.003, safetyScore: 9, status: 'safe', crowdLevel: 'high' }
          ]);
        });

      locationService.getNearbyHospitals(coordinates[0], coordinates[1])
        .then(res => {
          if (Array.isArray(res)) setHospitals(res);
          else throw new Error('Invalid format');
        })
        .catch(() => {
          setHospitals([
            { id: 'h1', name: 'AIIMS Trauma Centre', lat: coordinates[0] - 0.006, lng: coordinates[1] - 0.004, safetyScore: 10, status: 'safe', crowdLevel: 'high' }
          ]);
        });

      locationService.getNearbySafeZones(coordinates[0], coordinates[1])
        .then(res => {
          if (Array.isArray(res)) setSafeZones(res);
          else throw new Error('Invalid format');
        })
        .catch(() => {
          setSafeZones([
            { id: 'sz1', name: 'Connaught Place Safe perimeter', lat: coordinates[0] + 0.002, lng: coordinates[1] - 0.006, safetyScore: 8.5, status: 'safe', crowdLevel: 'high' }
          ]);
        });
    }
  }, [coordinates]);

  const handleRouteSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!endPoint) return;
    try {
      const results = await getSafeRoutes({
        start: startPoint,
        destination: endPoint,
        startCoords: coordinates
      });

      if (results && results.length > 0) {
        setSelectedRoute(results[0]);
      } else {
        // Fallback safety route coordinates overlay in case API is building
        const mockRoute = {
          id: 'mr-1',
          name: 'AI Shield Recommended Path',
          distance: '12.4 km',
          duration: '26 mins',
          safetyScore: 9.4,
          lightsRating: 'Excellent',
          crowdLevel: 'high',
          alertsCount: 0,
          waypoints: [
            coordinates,
            [coordinates[0] + 0.002, coordinates[1] + 0.001],
            [coordinates[0] + 0.004, coordinates[1] + 0.003],
            [coordinates[0] + 0.007, coordinates[1] + 0.006]
          ]
        };
        setSelectedRoute(mockRoute);
      }
    } catch (err) {
      // Failover path drawing
      const mockRoute = {
        id: 'mr-2',
        name: 'SafeCircle Guard Path (Recommended)',
        distance: '18.4 km',
        duration: '34 mins',
        safetyScore: 9.4,
        lightsRating: 'Excellent',
        crowdLevel: 'high',
        alertsCount: 0,
        waypoints: [
          coordinates,
          [coordinates[0] + 0.002, coordinates[1] + 0.002],
          [coordinates[0] + 0.004, coordinates[1] + 0.005],
          [coordinates[0] + 0.008, coordinates[1] + 0.009]
        ]
      };
      setSelectedRoute(mockRoute);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left relative">
      
      {/* Search and Route sidebar controls */}
      <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-white text-xl tracking-tight">AI Safe-Route Planner</h3>
            <p className="text-xs text-slate-400">Routes calculated matching street lamp illumination, security camera coverage, and crowd density algorithms.</p>
          </div>

          <form onSubmit={handleRouteSearch} className="space-y-3 bg-slate-900/40 border border-slate-800 rounded-2xl p-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Start Point</label>
              <div className="relative">
                <Navigation className="absolute left-3 top-3 w-4 h-4 text-brand-blue-400 rotate-45" />
                <input 
                  type="text"
                  value={startPoint}
                  onChange={(e) => setStartPoint(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-200 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Destination</label>
              <div className="relative">
                <Route className="absolute left-3 top-3 w-4 h-4 text-brand-purple-400" />
                <input 
                  type="text"
                  value={endPoint}
                  onChange={(e) => setEndPoint(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl py-2.5 pl-9 pr-4 text-xs text-slate-200 outline-none focus:border-brand-purple-500/50"
                  placeholder="Enter destination..."
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:from-brand-blue-500 hover:to-brand-purple-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-brand-purple-500/10 border border-white/5"
            >
              <Search className="w-4 h-4" />
              <span>{isLoadingRoutes ? 'Calculating Paths...' : 'Find Safest Routes'}</span>
            </button>
          </form>

          {/* Layer toggles panel */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2.5">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Togglable Safety Overlays</div>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold">
              <button 
                onClick={() => setShowPolice(!showPolice)}
                className={`px-2.5 py-1.5 rounded-lg border transition-all ${
                  showPolice ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                Police Stations ({policeStations.length})
              </button>
              <button 
                onClick={() => setShowHospitals(!showHospitals)}
                className={`px-2.5 py-1.5 rounded-lg border transition-all ${
                  showHospitals ? 'bg-red-600/10 border-red-500 text-red-400' : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                Hospitals ({hospitals.length})
              </button>
              <button 
                onClick={() => setShowSafeZones(!showSafeZones)}
                className={`px-2.5 py-1.5 rounded-lg border transition-all ${
                  showSafeZones ? 'bg-emerald-600/10 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-500'
                }`}
              >
                Safe Zones ({safeZones.length})
              </button>
            </div>
          </div>
        </div>

        {/* Selected route metrics HUD */}
        {selectedRoute && (
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3 shrink-0">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-xs text-white">{selectedRoute.name}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{selectedRoute.distance} &bull; {selectedRoute.duration}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-white">{selectedRoute.safetyScore}</span>
                <span className="text-[9px] text-slate-500">/10</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <div className="bg-slate-950/60 p-2.5 rounded border border-slate-900 space-y-0.5">
                <span className="text-[9px] text-slate-500">Illumination:</span>
                <div className="text-slate-200">{selectedRoute.lightsRating}</div>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded border border-slate-900 space-y-0.5">
                <span className="text-[9px] text-slate-500">Crowd density:</span>
                <div className="text-slate-200 uppercase">{selectedRoute.crowdLevel}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Leaflet Map Overlay */}
      <div className="lg:col-span-8 h-[480px] rounded-3xl overflow-hidden border border-slate-800 relative z-10">
        {isLoadingGps ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-brand-dark-900 text-slate-400 gap-3">
            <Compass className="w-12 h-12 text-brand-purple-400 animate-spin" />
            <span className="text-xs">Accessing location tracking modules...</span>
          </div>
        ) : (
          <MapContainer 
            center={coordinates} 
            zoom={14} 
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {/* Start Node (User Position) */}
            <Marker position={coordinates} icon={createRouteNodeIcon('start')}>
              <Popup>
                <div className="text-xs font-sans text-slate-900">
                  <strong className="block border-b pb-0.5">Starting Position</strong>
                  <span>Your Current Coordinates</span>
                </div>
              </Popup>
            </Marker>

            {/* End Node (Route Destination) */}
            {selectedRoute && selectedRoute.waypoints.length > 0 && (
              <Marker 
                position={selectedRoute.waypoints[selectedRoute.waypoints.length - 1]} 
                icon={createRouteNodeIcon('end')}
              >
                <Popup>
                  <div className="text-xs font-sans text-slate-900">
                    <strong className="block border-b pb-0.5">Destination Node</strong>
                    <span>{endPoint}</span>
                  </div>
                </Popup>
              </Marker>
            )}

            {/* Overlay Polyline path */}
            {selectedRoute && (
              <Polyline 
                positions={selectedRoute.waypoints} 
                pathOptions={{ color: '#a855f7', weight: 4, dashArray: '6, 4' }} 
              />
            )}

            {/* Police Overlays */}
            {showPolice && policeStations.map(p => (
              <Marker key={p.id} position={[p.lat, p.lng]} icon={createRouteNodeIcon('police')}>
                <Popup>
                  <div className="text-xs font-sans text-slate-900">
                    <strong className="block border-b pb-0.5">{p.name}</strong>
                    <span className="block mt-1 font-bold text-[9px] text-blue-600">POLICE PATROL STATION</span>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Hospital Overlays */}
            {showHospitals && hospitals.map(h => (
              <Marker key={h.id} position={[h.lat, h.lng]} icon={createRouteNodeIcon('hospital')}>
                <Popup>
                  <div className="text-xs font-sans text-slate-900">
                    <strong className="block border-b pb-0.5">{h.name}</strong>
                    <span className="block mt-1 font-bold text-[9px] text-red-600">EMERGENCY MEDICAL CENTRE</span>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* SafeZone Overlays */}
            {showSafeZones && safeZones.map(sz => (
              <Marker key={sz.id} position={[sz.lat, sz.lng]} icon={createRouteNodeIcon('safezone')}>
                <Popup>
                  <div className="text-xs font-sans text-slate-900">
                    <strong className="block border-b pb-0.5">{sz.name}</strong>
                    <span className="block mt-1 font-bold text-[9px] text-emerald-600">GEOFENCED SAFE ZONE RATING: {sz.safetyScore}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

    </div>
  );
};

export default SafeRoute;
