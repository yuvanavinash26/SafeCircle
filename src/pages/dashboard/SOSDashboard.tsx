import React, { useState, useEffect } from 'react';
import EmergencyButton from '../../components/EmergencyButton';
import SOSCard from '../../components/SOSCard';
import Timeline from '../../components/Timeline';
import StatCard from '../../components/StatCard';
import ToastPlaceholder from '../../components/ToastPlaceholder';
import type { ToastMessage } from '../../components/ToastPlaceholder';
import { useEmergency } from '../../hooks/useEmergency';
import { useLocation } from '../../hooks/useLocation';
import { Shield, Clock, HeartHandshake, AlertCircle, RefreshCw } from 'lucide-react';

export const SOSDashboard: React.FC = () => {
  const { coordinates, accuracy, gpsStatus } = useLocation();
  const {
    history,
    isLoadingHistory,
    isErrorHistory,
    refetchHistory,
    triggerSOS,
    isTriggering,
    resolveSOS,
    isResolving
  } = useEmergency();

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const handleTriggerSOS = async () => {
    try {
      const response = await triggerSOS({
        latitude: coordinates[0],
        longitude: coordinates[1],
        timestamp: new Date().toISOString(),
        accuracy: accuracy || undefined
      });

      setToasts(prev => [
        ...prev,
        {
          id: `toast-${Date.now()}`,
          type: 'warning',
          message: `CRITICAL: SOS Dispatched! Coordinates (${coordinates[0].toFixed(4)}, ${coordinates[1].toFixed(4)}) sent to Circle & Police.`
        }
      ]);
    } catch (err: any) {
      setToasts(prev => [
        ...prev,
        {
          id: `toast-${Date.now()}`,
          type: 'warning',
          message: `Error sending SOS: ${err.message || 'Network gateway error'}`
        }
      ]);
    }
  };

  const handleResolve = async (id: string) => {
    try {
      await resolveSOS(id);
      setToasts(prev => [
        ...prev,
        {
          id: `toast-${Date.now()}`,
          type: 'success',
          message: 'Distress alert resolved successfully.'
        }
      ]);
    } catch (err: any) {
      setToasts(prev => [
        ...prev,
        {
          id: `toast-${Date.now()}`,
          type: 'warning',
          message: `Failed to resolve: ${err.message || 'Connection error'}`
        }
      ]);
    }
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const activeAlerts = history.filter(h => h.status === 'Active');
  const dispatchedAlerts = history.filter(h => h.status === 'Dispatched');

  return (
    <div className="space-y-8 text-left relative">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Active SOS Dispatches" 
          value={activeAlerts.length} 
          subtext="Monitoring live transmission streams" 
          icon={Shield} 
          colorClass={activeAlerts.length > 0 ? "text-brand-red-400 bg-brand-red-500/10 border-brand-red-500/30" : "text-slate-400 bg-slate-900"}
        />
        <StatCard 
          title="En Route Responders" 
          value={dispatchedAlerts.length} 
          subtext="PCR units / Emergency response dispatched" 
          icon={Clock} 
          colorClass="text-brand-blue-400 bg-brand-blue-500/10"
        />
        <StatCard 
          title="GPS Guard Status" 
          value={gpsStatus.toUpperCase()} 
          subtext={gpsStatus === 'locked' ? `Accuracy ±${accuracy?.toFixed(1)}m` : 'Seeking satellite signal'} 
          icon={HeartHandshake} 
          colorClass={gpsStatus === 'locked' ? "text-emerald-400 bg-emerald-500/10" : "text-amber-400 bg-amber-500/10 animate-pulse"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SOS Central Button Panel */}
        <div className="lg:col-span-7 rounded-3xl glass-panel border border-slate-800 p-6 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-4 left-6 flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5 text-brand-red-500 animate-pulse" />
            <span>Crisis Trigger Panel</span>
          </div>

          <div className="absolute top-4 right-6">
            {isTriggering && (
              <span className="text-[10px] text-brand-red-400 font-bold animate-pulse">Relaying to server...</span>
            )}
          </div>

          <EmergencyButton onTriggerSOS={handleTriggerSOS} />
        </div>

        {/* Incident History & Log */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider">Incident Activity Log</h4>
            <button 
              onClick={() => refetchHistory()} 
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
              title="Refresh log"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingHistory && 'animate-spin'}`} />
            </button>
          </div>

          {isLoadingHistory ? (
            <div className="p-12 text-center text-slate-500 text-xs rounded-2xl border border-slate-800/80 bg-slate-900/10">
              Loading incident history nodes...
            </div>
          ) : isErrorHistory ? (
            <div className="p-8 text-center text-brand-red-400 text-xs rounded-2xl border border-brand-red-500/20 bg-brand-red-500/5">
              Failed to connect with SOS endpoints.
            </div>
          ) : (
            <Timeline events={history.slice(0, 5)} />
          )}
        </div>
      </div>

      {/* Active Alerts List */}
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-white text-base">Active distress Broadcasts</h3>
          <p className="text-xs text-slate-400 mt-1">Incident streams and responders status channels.</p>
        </div>
        
        <div className="space-y-3">
          {isLoadingHistory ? (
            <div className="p-8 text-center text-slate-500 text-xs">Loading streams...</div>
          ) : history.filter(h => h.status !== 'Resolved').length === 0 ? (
            <div className="p-8 rounded-2xl border border-dashed border-slate-800 text-center text-slate-500 text-sm bg-slate-900/10">
              No active distress alerts currently. SafeCircle guard is idle.
            </div>
          ) : (
            history
              .filter(h => h.status !== 'Resolved')
              .map(record => (
                <SOSCard 
                  key={record.id} 
                  record={record} 
                  onResolve={handleResolve} 
                />
              ))
          )}
        </div>
      </div>

      {/* Toast popup overlay */}
      <ToastPlaceholder toasts={toasts} onDismiss={handleDismissToast} />
      
    </div>
  );
};

export default SOSDashboard;
