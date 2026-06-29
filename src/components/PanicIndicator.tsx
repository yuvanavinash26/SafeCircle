import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Zap, AlertTriangle, Heart, Mic, Sliders, ShieldCheck } from 'lucide-react';

export const PanicIndicator: React.FC = () => {
  const [heartRate, setHeartRate] = useState(72);
  const [gForce, setGForce] = useState(1.0);
  const [deviceState, setDeviceState] = useState<'Stable' | 'Potential Fall' | 'Impact Alert'>('Stable');
  const [isAlertState, setIsAlertState] = useState(false);

  // Panic detection specialized metrics
  const [voiceIntensity, setVoiceIntensity] = useState(30); // in dB
  const [stressLevel, setStressLevel] = useState(15); // in %
  const [confidenceScore, setConfidenceScore] = useState(96); // classifier confidence
  const [dominantEmotion, setDominantEmotion] = useState('Calm');

  // Real-time sensor changes
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(60, Math.min(180, prev + delta));
      });
      setGForce(prev => {
        return parseFloat((1.0 + (Math.random() * 0.4) - 0.2).toFixed(2));
      });
      // Wave intensity fluctuations
      setVoiceIntensity(prev => {
        const delta = Math.floor(Math.random() * 15) - 7;
        return Math.max(25, Math.min(85, prev + delta));
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Update stress levels and classifier thresholds dynamically
  useEffect(() => {
    let calculatedStress = 10;
    if (heartRate > 100) calculatedStress += 30;
    if (heartRate > 130) calculatedStress += 30;
    if (gForce > 2.0) calculatedStress += 20;
    if (voiceIntensity > 60) calculatedStress += 15;
    
    setStressLevel(Math.min(100, calculatedStress + (heartRate % 10)));

    if (calculatedStress > 60) {
      setDominantEmotion('Agitated (High Alert)');
      setConfidenceScore(94);
    } else if (calculatedStress > 30) {
      setDominantEmotion('Anxious');
      setConfidenceScore(88);
    } else {
      setDominantEmotion('Calm');
      setConfidenceScore(96);
    }
  }, [heartRate, gForce, voiceIntensity]);

  const simulateImpact = () => {
    setGForce(4.8);
    setHeartRate(145);
    setVoiceIntensity(85);
    setDeviceState('Impact Alert');
    setIsAlertState(true);
    setTimeout(() => {
      setDeviceState('Stable');
      setIsAlertState(false);
      setGForce(1.0);
      setHeartRate(82);
      setVoiceIntensity(35);
    }, 6000);
  };

  const simulatePanicHeartRate = () => {
    setHeartRate(165);
    setVoiceIntensity(82);
    setDeviceState('Stable');
    setIsAlertState(true);
    setTimeout(() => {
      setIsAlertState(false);
      setHeartRate(78);
      setVoiceIntensity(30);
    }, 6000);
  };

  return (
    <div className="p-6 rounded-2xl glass-panel text-left space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-900/60 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-purple-400 animate-pulse" />
          <h3 className="font-bold text-sm text-white">Biometric Telemetry Nodes</h3>
        </div>
        <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${
          isAlertState 
            ? 'bg-brand-red-500/20 text-brand-red-400 border-brand-red-500/30 animate-pulse' 
            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        }`}>
          {isAlertState ? 'CRITICAL ALERT' : 'SECURE LINE'}
        </span>
      </div>

      {/* Grid of Sensors */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Heart Rate */}
        <div className={`p-4 rounded-xl border transition-all duration-300 ${
          heartRate > 120 
            ? 'bg-brand-red-500/5 border-brand-red-500/30 text-brand-red-400' 
            : 'bg-slate-950/60 border-slate-900 text-slate-200'
        }`}>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Heart Rate</div>
          <div className="flex items-baseline justify-between gap-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className={`text-3xl font-black transition-all ${heartRate > 120 ? 'animate-pulse text-brand-red-500' : 'text-white'}`}>
                {heartRate}
              </span>
              <span className="text-[10px] text-slate-400">BPM</span>
            </div>
            <Heart 
              className={`w-5 h-5 shrink-0 ${
                heartRate > 120 ? 'text-brand-red-500 fill-brand-red-500' : 'text-rose-500/70 fill-rose-500/20'
              }`}
              style={{
                animation: `pulse ${60 / heartRate}s cubic-bezier(0.4, 0, 0.6, 1) infinite`
              }}
            />
          </div>
          <p className="text-[9px] text-slate-500 mt-2">Watch telemetry synced</p>
        </div>

        {/* Accelerometer */}
        <div className={`p-4 rounded-xl border transition-all duration-300 ${
          gForce > 3.0 
            ? 'bg-brand-red-500/5 border-brand-red-500/30 text-brand-red-400 animate-bounce' 
            : 'bg-slate-950/60 border-slate-900 text-slate-200'
        }`}>
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Accelerometer (G)</div>
          <div className="flex items-baseline justify-between gap-1.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-white">{gForce}</span>
              <span className="text-[10px] text-slate-400">G</span>
            </div>
            <Zap className={`w-5 h-5 ${gForce > 3.0 ? 'text-amber-500 fill-amber-500/20 animate-pulse' : 'text-slate-600'}`} />
          </div>
          <p className="text-[9px] text-slate-500 mt-2">Impact threshold &gt;3.0G</p>
        </div>

      </div>

      {/* Voice Activity Waveform */}
      <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-900 space-y-3">
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
            <Mic className="w-3.5 h-3.5 text-brand-purple-400" />
            Vocal Amplitude decibels
          </span>
          <span className="font-mono text-slate-300 font-bold">{voiceIntensity} dB</span>
        </div>
        
        {/* Animated waveform bar */}
        <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-850">
          <div 
            className={`h-full rounded-full transition-all duration-300 ${
              voiceIntensity > 70 ? 'bg-brand-red-500 animate-pulse' : 'bg-gradient-to-r from-brand-blue-500 to-brand-purple-500'
            }`} 
            style={{ width: `${(voiceIntensity / 100) * 100}%` }}
          />
        </div>

        {/* Real-time simulated waveform lines */}
        <div className="flex items-center justify-between h-8 gap-0.5 pt-1">
          {Array.from({ length: 30 }).map((_, i) => {
            const hVal = Math.max(10, Math.min(100, (voiceIntensity * (Math.sin(i + Date.now() / 1000) + 1.2)) / 2.2));
            return (
              <div 
                key={i} 
                className={`w-1 rounded-full transition-all duration-150 ${
                  voiceIntensity > 70 ? 'bg-brand-red-500/70' : 'bg-brand-purple-500/40'
                }`}
                style={{ height: `${hVal}%` }}
              />
            );
          })}
        </div>
      </div>

      {/* Stress & Emotion Classifiers */}
      <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900 space-y-1">
          <span className="text-[10px] text-slate-500">STRESS CLASSIFIER</span>
          <div className="flex items-center justify-between mt-1">
            <span className={`text-lg font-black ${stressLevel > 60 ? 'text-brand-red-400' : 'text-white'}`}>
              {stressLevel}%
            </span>
            <span className={`text-[8px] px-1.5 py-0.5 rounded font-black ${
              stressLevel > 60 ? 'bg-brand-red-500/10 text-brand-red-400' : 'bg-slate-800 text-slate-400'
            }`}>
              {stressLevel > 60 ? 'ELEVATED' : 'STABLE'}
            </span>
          </div>
        </div>

        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-900 space-y-1">
          <span className="text-[10px] text-slate-500">EMOTION ANALYSIS</span>
          <div className="text-white text-xs font-bold mt-1 truncate">{dominantEmotion}</div>
          <p className="text-[8px] text-slate-500">Confidence: {confidenceScore}%</p>
        </div>
      </div>

      {/* Simulation triggers */}
      <div className="space-y-2">
        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Hardware Sensor Simulations</div>
        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={simulateImpact}
            className="px-3 py-2 text-[10px] font-bold rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-850 hover:border-slate-700 transition-all flex items-center gap-1.5 justify-center cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-brand-red-500" />
            Simulate Impact
          </button>
          <button 
            onClick={simulatePanicHeartRate}
            className="px-3 py-2 text-[10px] font-bold rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-850 hover:border-slate-700 transition-all flex items-center gap-1.5 justify-center cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            Simulate Panic BPM
          </button>
        </div>
      </div>

    </div>
  );
};

export default PanicIndicator;
