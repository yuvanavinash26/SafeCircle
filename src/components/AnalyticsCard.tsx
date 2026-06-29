import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';
import { mockAnalytics } from '../mock/dummyData';

export const AnalyticsCard: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl glass-panel text-left space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-900/60 pb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-brand-blue-400" />
          <h3 className="font-bold text-sm text-white">Threat Index & Response Metrics</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-brand-purple-400 font-bold bg-brand-purple-500/10 px-2 py-0.5 rounded border border-brand-purple-500/20">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Safety index: +15% improve</span>
        </div>
      </div>

      {/* Grid Counters */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-3">
          <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Danger zones resolved</div>
          <div className="text-xl font-black text-white mt-1">{mockAnalytics.dangerZonesResolved}</div>
        </div>
        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-3">
          <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Avg response time</div>
          <div className="text-xl font-black text-white mt-1">{mockAnalytics.avgResponseTimeSec}s</div>
        </div>
        <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-3">
          <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Total alerts sent</div>
          <div className="text-xl font-black text-white mt-1">{mockAnalytics.totalAlertsSent}</div>
        </div>
      </div>

      {/* Safety Score Trend Bar Graph */}
      <div className="space-y-3">
        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Monthly Safety Score Trend</div>
        <div className="flex items-end justify-between h-36 gap-2 bg-slate-950/40 border border-slate-900 rounded-2xl p-4">
          {mockAnalytics.safetyScoreTrend.map((data, i) => {
            const heightPercent = `${(data.value / 10) * 100}%`;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                <div className="text-[8px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {data.value.toFixed(1)}
                </div>
                {/* Visual score bar */}
                <div 
                  style={{ height: heightPercent }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-brand-blue-600 to-brand-purple-500 hover:from-brand-blue-500 hover:to-brand-purple-400 transition-all duration-300 shadow-lg shadow-brand-blue-500/10"
                />
                <span className="text-[9px] text-slate-500 font-medium">{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category distribution */}
      <div className="space-y-3">
        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Trigger Alert Types Distribution</div>
        <div className="space-y-2">
          {mockAnalytics.emergencyEvents.map((event, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-300 font-medium">{event.category}</span>
                <span className="text-slate-400 font-bold">{event.count} counts</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
                <div 
                  className="bg-brand-purple-500 h-1.5 rounded-full" 
                  style={{ width: `${(event.count / 20) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[9px] text-slate-500 italic">
        FUTURE LOGIC: Integrate high fidelity charting frameworks like Chart.js or Recharts inside this card. Feed from server telemetry.
      </p>
    </div>
  );
};
export default AnalyticsCard;
