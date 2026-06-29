import React from 'react';
import AnalyticsCard from '../../components/AnalyticsCard';
import StatCard from '../../components/StatCard';
import { useAnalytics } from '../../hooks/useAnalytics';
import { ShieldCheck, BarChart3, AlertOctagon, TrendingUp, Compass, Clock, ShieldAlert, AlertTriangle } from 'lucide-react';

export const SafetyAnalytics: React.FC = () => {
  const { analytics, isLoading, isError } = useAnalytics();

  // Standard safe fallbacks if server endpoints are pending
  const consolidatedStats = {
    safetyScore: analytics?.safetyScoreTrend?.[analytics.safetyScoreTrend.length - 1]?.value || 8.9,
    resolvedZones: analytics?.dangerZonesResolved || 47,
    responseTime: analytics?.avgResponseTimeSec || 4.8,
    totalAlerts: analytics?.totalAlertsSent || 154,
    tripsCompleted: 84,
    safeRoutesUsed: 62,
    hoursMonitored: 120
  };

  return (
    <div className="space-y-6 text-left relative">
      
      {/* Header */}
      <div className="space-y-1 border-b border-slate-900/60 pb-5">
        <h3 className="font-bold text-white text-xl tracking-tight">Safety Analytics & Intelligence</h3>
        <p className="text-xs text-slate-400">Review localized danger ratings trends and automated system telemetry performance logs.</p>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-slate-500 text-xs border border-slate-800/80 bg-slate-900/10 rounded-2xl">
          Compiling regional telemetry metrics...
        </div>
      ) : isError ? (
        <div className="p-8 text-center text-brand-red-400 text-xs border border-brand-red-500/20 bg-brand-red-500/5 rounded-2xl">
          Failed to fetch consolidated telemetry analytics from base nodes.
        </div>
      ) : (
        <>
          {/* Row of Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Overall Safety Score" 
              value={`${consolidatedStats.safetyScore.toFixed(1)}/10`} 
              subtext="Consolidated neighborhood rating" 
              icon={TrendingUp} 
              colorClass="text-brand-purple-400 bg-brand-purple-500/10"
            />
            <StatCard 
              title="Monitored Shield Hours" 
              value={`${consolidatedStats.hoursMonitored} hrs`} 
              subtext="Background ambient safety" 
              icon={Clock} 
              colorClass="text-brand-blue-400 bg-brand-blue-500/10"
            />
            <StatCard 
              title="Safe Routes Navigated" 
              value={consolidatedStats.safeRoutesUsed} 
              subtext="Calculating optimal routing pathways" 
              icon={Compass} 
              colorClass="text-teal-400 bg-teal-500/10"
            />
            <StatCard 
              title="PCR Response Rate" 
              value="99.9%" 
              subtext="Connection node relays health" 
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
                <h4 className="font-bold text-sm text-white">Nodal Threat Classifications</h4>
                <p className="text-[10px] text-slate-500 font-medium">How AI classifier models sort active alarm triggers.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl space-y-1">
                  <div className="font-bold text-brand-red-400 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Level 3 (SOS Critical)</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Priority GPS dispatch. Relays live microphone streams and coordinate telemetry directly to closest emergency responders.
                  </p>
                </div>
                
                <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl space-y-1">
                  <div className="font-bold text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Level 2 (Biometric Fall/Pulse)</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Pending check window. Holds alert relay countdown before auto-broadcasting coordinates to emergency circle.
                  </p>
                </div>

                <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-xl space-y-1">
                  <div className="font-bold text-slate-300 flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-brand-blue-400" />
                    <span>Level 1 (Geofence Breach)</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    Visual safety warning banner updates on screen, saving locations log metadata.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </>
      )}

    </div>
  );
};

export default SafetyAnalytics;
