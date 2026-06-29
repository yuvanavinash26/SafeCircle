import React, { useState } from 'react';
import PanicIndicator from '../../components/PanicIndicator';
import { Activity, ShieldAlert, Watch, Bell, ShieldCheck } from 'lucide-react';
import ToastPlaceholder from '../../components/ToastPlaceholder';
import type { ToastMessage } from '../../components/ToastPlaceholder';

export const AIPanicDetection: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [panicLevel, setPanicLevel] = useState('High (90 bpm + Accel Change)');
  const [smartwatchSync, setSmartwatchSync] = useState(true);

  const simulateSensorTrigger = (eventMsg: string) => {
    const toastId = `toast-${Date.now()}`;
    setToasts(prev => [...prev, {
      id: toastId,
      type: 'warning',
      message: `BIOMETRIC EVENT: ${eventMsg}`
    }]);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 text-left relative">
      
      {/* Sensor panel config */}
      <div className="lg:col-span-6 space-y-6 flex flex-col justify-between h-full">
        
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-white text-base">AI Biometric & Crash Sensors</h3>
            <p className="text-xs text-slate-400">Uses internal mobile accelerometer coordinates and companion watch telemetry to audit shockwaves, fall metrics, and heart-rate escalations.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            
            {/* Smartwatch Hook toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-xs font-bold text-slate-200 cursor-pointer flex items-center gap-1.5">
                  <Watch className="w-4 h-4 text-brand-purple-400" />
                  Smartwatch Biometric Link
                </label>
                <p className="text-[10px] text-slate-500">Sync live pulse rate parameters from WearOS / Apple Watch.</p>
              </div>
              <button
                onClick={() => setSmartwatchSync(!smartwatchSync)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors relative outline-none border border-slate-800 ${
                  smartwatchSync ? 'bg-brand-purple-600' : 'bg-slate-950'
                }`}
              >
                <div 
                  className={`w-4.5 h-4.5 rounded-full bg-white shadow transform transition-transform duration-200 ${
                    smartwatchSync ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Threshold level setting */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Breach Algorithm Level</label>
              <select
                value={panicLevel}
                onChange={(e) => setPanicLevel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl py-2.5 px-3 text-xs text-slate-200 outline-none cursor-pointer focus:border-brand-purple-500/50"
              >
                <option value="High (90 bpm + Accel Change)">High (90 bpm + Accel change) - Standard</option>
                <option value="Pulse Extreme (140 bpm)">Extreme Pulse breach only (140 bpm)</option>
                <option value="G Force Decel (3.0 G)">Collision G-Force decay only (3.0 G)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Integration guide */}
        <div className="p-4 rounded-xl bg-brand-blue-500/5 border border-brand-blue-500/10 space-y-2 shrink-0">
          <div className="flex gap-2 items-center text-xs font-bold text-slate-200">
            <ShieldCheck className="w-4 h-4 text-brand-blue-400" />
            <span>Hardware Verification status</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-normal">
            SafeCircle triggers alerts after checking filters to avoid false positives (e.g. while workout running or mobile drops). Users get a 10s window to abort dispatches.
          </p>
        </div>

      </div>

      {/* Simulator graph indicators */}
      <div className="lg:col-span-6 space-y-4">
        <PanicIndicator />
      </div>

      {/* Toast popup overlay */}
      <ToastPlaceholder toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
};
export default AIPanicDetection;
