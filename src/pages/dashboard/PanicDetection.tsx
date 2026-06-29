import React, { useState } from 'react';
import PanicIndicator from '../../components/PanicIndicator';
import { Activity, ShieldAlert, Watch, Bell, ShieldCheck, Heart } from 'lucide-react';
import ToastPlaceholder from '../../components/ToastPlaceholder';
import type { ToastMessage } from '../../components/ToastPlaceholder';

export const PanicDetection: React.FC = () => {
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
    <div className="max-w-6xl mx-auto space-y-6 text-left relative">
      <div className="space-y-1">
        <h3 className="font-bold text-white text-xl tracking-tight flex items-center gap-2">
          AI Biometric & Crash Sensors
          <span className="text-xs bg-brand-red-500/20 text-brand-red-400 px-2 py-0.5 rounded font-semibold border border-brand-red-500/25 animate-pulse">
            Realtime Audits
          </span>
        </h3>
        <p className="text-xs text-slate-400">
          Uses internal mobile accelerometer coordinates and companion watch telemetry to monitor shockwaves, fall metrics, and heart-rate escalations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Sensor config panel */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800/80 pb-3">
              <Activity className="w-4 h-4 text-brand-purple-400" />
              Sensor Configuration
            </h4>

            {/* Smartwatch Hook toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 pr-2">
                <label className="text-xs font-bold text-slate-200 cursor-pointer flex items-center gap-1.5">
                  <Watch className="w-4 h-4 text-brand-purple-400" />
                  Smartwatch Biometric Link
                </label>
                <p className="text-[10px] text-slate-500">Sync live pulse rate parameters from WearOS / Apple Watch.</p>
              </div>
              <button
                onClick={() => {
                  setSmartwatchSync(!smartwatchSync);
                  simulateSensorTrigger(
                    !smartwatchSync ? "Smartwatch connection synced." : "Smartwatch connection detached."
                  );
                }}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors relative outline-none border border-slate-800 shrink-0 cursor-pointer ${
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
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Breach Algorithm Level</label>
              <select
                value={panicLevel}
                onChange={(e) => {
                  setPanicLevel(e.target.value);
                  simulateSensorTrigger(`Threshold updated to ${e.target.value}`);
                }}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl py-2.5 px-3 text-xs text-slate-200 outline-none cursor-pointer focus:border-brand-purple-500/50 transition-colors"
              >
                <option value="High (90 bpm + Accel Change)">High (90 bpm + Accel change) - Standard</option>
                <option value="Pulse Extreme (140 bpm)">Extreme Pulse breach only (140 bpm)</option>
                <option value="G Force Decel (3.0 G)">Collision G-Force decay only (3.0 G)</option>
              </select>
            </div>

            {/* Live stats feed */}
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-900 space-y-2 text-xs">
              <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Sensors Active</div>
              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Accelerometer (3-Axis)
                </span>
                <span className="font-mono text-emerald-400 font-bold">100Hz</span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${smartwatchSync ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                  Photoplethysmogram (PPG)
                </span>
                <span className={`font-mono font-bold ${smartwatchSync ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {smartwatchSync ? 'Active' : 'Offline'}
                </span>
              </div>
            </div>
          </div>

          {/* Integration Guide */}
          <div className="p-4 rounded-xl bg-brand-blue-500/5 border border-brand-blue-500/10 space-y-2">
            <div className="flex gap-2 items-center text-xs font-bold text-slate-200">
              <ShieldCheck className="w-4 h-4 text-brand-blue-400" />
              <span>Hardware Guard Status</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              SafeCircle triggers alerts after validating telemetry arrays to prevent false positives (e.g. drop impacts or high workouts). In the event of a breach, you have a 10s cooldown window to abort dispatches.
            </p>
          </div>

        </div>

        {/* Visualizers graph and charts */}
        <div className="lg:col-span-7">
          <PanicIndicator />
        </div>

      </div>

      <p className="text-[9px] text-slate-500 italic">
        <strong>Technical Details:</strong> Production telemetry processes accelerometers via the HTML5 DeviceMotionEvent API, and heart rates using Web Bluetooth smartwatch profiles.
      </p>

      {/* Toast popup overlay */}
      <ToastPlaceholder toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
};

export default PanicDetection;
