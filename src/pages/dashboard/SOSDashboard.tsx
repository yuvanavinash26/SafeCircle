import React, { useState } from 'react';
import EmergencyButton from '../../components/EmergencyButton';
import SOSCard from '../../components/SOSCard';
import Timeline from '../../components/Timeline';
import StatCard from '../../components/StatCard';
import ToastPlaceholder from '../../components/ToastPlaceholder';
import type { ToastMessage } from '../../components/ToastPlaceholder';
import { mockEmergencyHistory } from '../../mock/dummyData';
import type { EmergencyRecord } from '../../types';
import { Shield, Clock, HeartHandshake, AlertCircle } from 'lucide-react';

export const SOSDashboard: React.FC = () => {
  const [history, setHistory] = useState<EmergencyRecord[]>(mockEmergencyHistory);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const triggerSOS = () => {
    const newRecord: EmergencyRecord = {
      id: `e-${Date.now()}`,
      contactName: 'Aarav Sharma & Priya Sharma (Broadcasting)',
      phone: '+91 Multiple',
      time: new Date().toISOString().replace('T', ' ').substring(0, 16),
      type: 'SOS Button',
      status: 'Active'
    };

    setHistory(prev => [newRecord, ...prev]);
    
    // Add toast
    const toastId = `toast-${Date.now()}`;
    const newToast: ToastMessage = {
      id: toastId,
      type: 'warning',
      message: 'CRITICAL: SOS Dispatched! Coordinates sent to Circle & Police (112).'
    };
    setToasts(prev => [...prev, newToast]);
  };

  const handleResolve = (id: string) => {
    setHistory(prev => prev.map(rec => rec.id === id ? { ...rec, status: 'Resolved' } : rec));
    
    // Add toast
    const toastId = `toast-${Date.now()}`;
    const newToast: ToastMessage = {
      id: toastId,
      type: 'success',
      message: 'SOS resolved successfully.'
    };
    setToasts(prev => [...prev, newToast]);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const activeAlertsCount = history.filter(h => h.status === 'Active').length;
  const dispatchAlertsCount = history.filter(h => h.status === 'Dispatched').length;

  return (
    <div className="space-y-8 text-left relative">
      
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Active SOS Dispatches" 
          value={activeAlertsCount} 
          subtext="Monitoring live transmission streams" 
          icon={Shield} 
          colorClass={activeAlertsCount > 0 ? "text-brand-red-400 bg-brand-red-500/10 border-brand-red-500/30" : "text-slate-400 bg-slate-900"}
        />
        <StatCard 
          title="En Route Responders" 
          value={dispatchAlertsCount} 
          subtext="Police PCR vans/Ambulances dispatched" 
          icon={Clock} 
          colorClass="text-brand-blue-400 bg-brand-blue-500/10"
        />
        <StatCard 
          title="SafeCircle Network Score" 
          value="9.8/10" 
          subtext="Telemetry link signals stable" 
          icon={HeartHandshake} 
          colorClass="text-emerald-400 bg-emerald-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SOS Central Button Panel */}
        <div className="lg:col-span-7 rounded-3xl glass-panel border border-slate-800 p-6 flex flex-col items-center relative overflow-hidden">
          <div className="absolute top-4 left-6 flex items-center gap-1 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5 text-brand-red-500 animate-pulse" />
            <span>Crisis Trigger Panel</span>
          </div>

          <EmergencyButton onTriggerSOS={triggerSOS} />
        </div>

        {/* Incident History & Log */}
        <div className="lg:col-span-5 space-y-6">
          <Timeline events={history.slice(0, 5)} />
        </div>
      </div>

      {/* Active Alerts List */}
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-white text-base">Active Broadcast Terminals</h3>
          <p className="text-xs text-slate-400 mt-1">Live tracking and nodal dispatches linked below.</p>
        </div>
        
        <div className="space-y-3">
          {history.filter(h => h.status !== 'Resolved').length === 0 ? (
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
      
      {/* FUTURE LOGIC: Connect Socket.io client to hear realtime broadcast dispatches from express server API. */}
    </div>
  );
};
export default SOSDashboard;
