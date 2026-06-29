import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Zap, AlertTriangle } from 'lucide-react';

export const PanicIndicator: React.FC = () => {
  const [heartRate, setHeartRate] = useState(72);
  const [gForce, setGForce] = useState(1.0);
  const [deviceState, setDeviceState] = useState<'Stable' | 'Potential Fall' | 'Impact Alert'>('Stable');
  const [isAlertState, setIsAlertState] = useState(false);

  // Simulate biosensor inputs
  useEffect(() => {
    const interval = setInterval(() => {
      // Random walk for heart rate
      setHeartRate(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = Math.max(60, Math.min(180, prev + delta));
        return next;
      });
      // Random walk for G Force
      setGForce(prev => {
        const next = parseFloat((1.0 + (Math.random() * 0.4) - 0.2).toFixed(2));
        return next;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const simulateImpact = () => {
    setGForce(4.8);
    setHeartRate(145);
    setDeviceState('Impact Alert');
    setIsAlertState(true);
    setTimeout(() => {
      setDeviceState('Stable');
      setIsAlertState(false);
      setGForce(1.0);
      setHeartRate(82);
    }, 6000);
  };

  const simulatePanicHeartRate = () => {
    setHeartRate(165);
    setDeviceState('Stable');
    setIsAlertState(true);
    setTimeout(() => {
      setIsAlertState(false);
      setHeartRate(78);
    }, 6000);
  };

  return (
    <div className="p-6 rounded-2xl glass-panel text-left space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-purple-400" />
          <h3 className="font-bold text-sm text-white">Biometric & Accel Sensors</h3>
        </div>
        <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
          isAlertState 
            ? 'bg-brand-red-500/20 text-brand-red-400 border border-brand-red-500/30' 
            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
        }`}>
          {isAlertState ? 'ALERT' : 'SECURE'}
        </span>
      </div>

      {/* Sensor Dashboard Grid */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Heart Rate Block */}
        <div className={`p-4 rounded-xl border transition-all duration-300 ${
          heartRate > 120 
            ? 'bg-brand-red-500/5 border-brand-red-500/30 text-brand-red-400 shadow-md shadow-brand-red-500/5' 
            : 'bg-slate-950/60 border-slate-900 text-slate-200'
        }`}>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Heart Rate</div>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-3xl font-black transition-all ${heartRate > 120 ? 'animate-pulse text-brand-red-500' : 'text-white'}`}>
              {heartRate}
            </span>
            <span className="text-[10px] text-slate-400">BPM</span>
          </div>
          <p className="text-[9px] text-slate-500 mt-2">Normal Range: 60 - 100 BPM</p>
        </div>

        {/* Accelerometer Block */}
        <div className={`p-4 rounded-xl border transition-all duration-300 ${
          gForce > 3.0 
            ? 'bg-brand-red-500/5 border-brand-red-500/30 text-brand-red-400' 
            : 'bg-slate-950/60 border-slate-900 text-slate-200'
        }`}>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Accelerometer (G)</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-white">{gForce}</span>
            <span className="text-[10px] text-slate-400">G</span>
          </div>
          <p className="text-[9px] text-slate-500 mt-2">Impact Threshold: &gt; 3.0 G</p>
        </div>

      </div>

      {/* Device Position Status Indicator */}
      <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-900 flex items-center justify-between text-xs">
        <div className="text-slate-400">Device State:</div>
        <div className="flex items-center gap-1.5 font-bold">
          <span className={`w-2 h-2 rounded-full ${
            deviceState === 'Stable' ? 'bg-emerald-400' : 'bg-brand-red-500 animate-ping'
          }`} />
          <span className={deviceState !== 'Stable' ? 'text-brand-red-400' : 'text-slate-200'}>
            {deviceState}
          </span>
        </div>
      </div>

      {/* Simulation triggers */}
      <div className="space-y-2">
        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Simulate Breaches</div>
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={simulateImpact}
            className="px-3 py-2 text-[10px] font-bold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-850 hover:border-slate-700 transition-all flex items-center gap-1.5 justify-center"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-brand-red-500" />
            Simulate Fall (Impact)
          </button>
          <button 
            onClick={simulatePanicHeartRate}
            className="px-3 py-2 text-[10px] font-bold rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-850 hover:border-slate-700 transition-all flex items-center gap-1.5 justify-center"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            Simulate Panic Pulse
          </button>
        </div>
      </div>

      <p className="text-[9px] text-slate-500 italic leading-relaxed">
        FUTURE LOGIC: Read real-time mobile gyroscope/accelerometer sensor values via standard HTML5 DeviceMotionEvent API, and heart rate values via companion smartwatch BLE Bluetooth API.
      </p>
    </div>
  );
};
export default PanicIndicator;
