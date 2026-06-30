import React, { useState, useEffect } from 'react';
import MapPlaceholder from '../../components/MapPlaceholder';
import LocationCard from '../../components/LocationCard';
import { mockLocations } from '../../mock/dummyData';
import type { Location } from '../../types';
import { Search, SlidersHorizontal, MapPin, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { apiService } from '../../services/api';

export const LiveMap: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'safe' | 'warning' | 'danger'>('all');
  const [selectedLoc, setSelectedLoc] = useState<Location | null>(mockLocations[0] || null);

  useEffect(() => {
    apiService.getLocations()
      .then(data => {
        if (data && data.length > 0) {
          setLocations(data);
          setSelectedLoc(data[0]);
        }
      })
      .catch(err => console.log('Using local locations fallback:', err));
  }, []);

  const handleSelectLocation = (loc: Location) => {
    setSelectedLoc(loc);
  };

  const filteredLocations = locations.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || loc.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      
      {/* Search and Sidebar Controls */}
      <div className="lg:col-span-4 space-y-6 flex flex-col h-full justify-between">
        
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-white text-base">Local Safe Zone Grid</h3>
            <p className="text-xs text-slate-400">Search safety ratings of metropolitan regions in India.</p>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search cities, routes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 outline-none focus:border-brand-purple-500/50 transition-colors"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {(['all', 'safe', 'warning', 'danger'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all border ${
                  selectedFilter === filter 
                    ? 'bg-brand-purple-600 border-brand-purple-500 text-white shadow-lg' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Locations List */}
          <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
            {filteredLocations.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl bg-slate-900/10">
                No location nodes found matching filters.
              </div>
            ) : (
              filteredLocations.map(loc => (
                <div key={loc.id} className={selectedLoc?.id === loc.id ? 'ring-1 ring-brand-purple-500/50 rounded-xl' : ''}>
                  <LocationCard 
                    location={loc} 
                    onSelect={handleSelectLocation} 
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* HUD Selected Details Box */}
        {selectedLoc && (
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-3 shrink-0">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-sm text-white">{selectedLoc.name}</h4>
                <p className="text-[10px] text-slate-400">Coordinates: {selectedLoc.lat}, {selectedLoc.lng}</p>
              </div>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                selectedLoc.status === 'safe' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : selectedLoc.status === 'warning'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-brand-red-500/10 text-brand-red-400 border border-brand-red-500/20'
              }`}>
                {selectedLoc.status}
              </span>
            </div>

            <div className="text-[11px] text-slate-300 leading-normal bg-slate-950/60 border border-slate-850 p-2.5 rounded-lg space-y-1">
              <div className="flex justify-between">
                <span>Crowd density telemetry:</span>
                <span className="font-semibold text-white uppercase">{selectedLoc.crowdLevel}</span>
              </div>
              <div className="flex justify-between">
                <span>Nodal safety rating:</span>
                <span className="font-semibold text-white">{selectedLoc.safetyScore}/10</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Map Graphic container */}
      <div className="lg:col-span-8 space-y-4">
        {selectedLoc ? (
          <MapPlaceholder 
            centerName={`${selectedLoc.name} Region Monitoring`} 
            pins={[
              { 
                lat: selectedLoc.lat, 
                lng: selectedLoc.lng, 
                label: `${selectedLoc.name} (Safety Index: ${selectedLoc.safetyScore})`, 
                status: selectedLoc.status 
              }
            ]} 
            heightClass="h-[480px]" 
          />
        ) : (
          <MapPlaceholder heightClass="h-[480px]" />
        )}
      </div>

    </div>
  );
};
export default LiveMap;
