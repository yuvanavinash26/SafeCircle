import React from 'react';
import AnalyticsCard from '../../components/AnalyticsCard';
import StatCard from '../../components/StatCard';
import { ShieldCheck, BarChart3, AlertOctagon, TrendingUp } from 'lucide-react';
import { mockAnalytics } from '../../mock/dummyData';

export const SafetyAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 text-left relative">
      
      {/* Header */}
      <div className="space-y-1">
        <h3 className="font-bold text-white text-base">Safety Analytics & Intelligence</h3>
        <p className="text-xs text-slate-400">Review localized danger ratings trends and automated system telemetry performance logs.</p>
      </div>

      {/* Row of Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Overall Safety Rating" 
          value="8.4/10" 
          subtext="Based on regional crowd feeds" 
          icon={TrendingUp} 
          colorClass="text-brand-purple-400 bg-brand-purple-500/10"
        />
        <StatCard 
          title="Danger Zones Alerted" 
          value={mockAnalytics.dangerZonesResolved} 
          subtext="Nodal alerts verified & logged" 
          icon={AlertOctagon} 
          colorClass="text-brand-red-400 bg-brand-red-500/10"
        />
        <StatCard 
          title="Emergency Response Rate" 
          value="99.9%" 
          subtext="Police PCR relay connection uptime" 
          icon={ShieldCheck} 
          colorClass="text-emerald-400 bg-emerald-500/10"
        />
      </div>

      {/* Analytics Card Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Core Chart Metrics */}
        <div className="lg:col-span-8">
          <AnalyticsCard />
        </div>

        {/* Detailed telemetries explanations panel */}
        <div className="lg:col-span-4 rounded-2xl glass-panel border border-slate-800 p-6 space-y-5">
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-white">Nodal AI Threat Classifier</h4>
            <p className="text-[10px] text-slate-500">How safety telemetry scoring algorithms prioritize zone dispatches.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl space-y-1">
              <div className="font-bold text-slate-300">Level 3 Threat (Active SOS)</div>
              <p className="text-[10px] text-slate-400">High priority dispatch. Coordinates relayed instantly to closest PCR response vans within 2km.</p>
            </div>
            
            <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl space-y-1">
              <div className="font-bold text-slate-300">Level 2 Threat (Fall/Panic Pulse)</div>
              <p className="text-[10px] text-slate-400">Intermediate. Holds verification prompt check timer. Dispatches SMS circle alerts automatically on check fail.</p>
            </div>

            <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl space-y-1">
              <div className="font-bold text-slate-300">Level 1 Threat (Geofence Breach)</div>
              <p className="text-[10px] text-slate-400">Low. Visual companion warning notification display on screen. Logged into regional dashboard indices.</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
export default SafetyAnalytics;
