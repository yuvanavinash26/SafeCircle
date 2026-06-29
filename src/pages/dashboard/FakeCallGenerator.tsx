import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Clock, UserCheck, ShieldAlert, Sparkles, Volume2 } from 'lucide-react';
import ToastPlaceholder from '../../components/ToastPlaceholder';
import type { ToastMessage } from '../../components/ToastPlaceholder';

export const FakeCallGenerator: React.FC = () => {
  const [callerName, setCallerName] = useState('Papa (Home)');
  const [callerPreset, setCallerPreset] = useState('custom');
  const [delaySeconds, setDelaySeconds] = useState(10);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRinging, setIsRinging] = useState(false);
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const presets = [
    { id: 'father', name: 'Papa (Home)', relationship: 'Father' },
    { id: 'mother', name: 'Mummy (Home)', relationship: 'Mother' },
    { id: 'boss', name: 'Ritesh (Manager)', relationship: 'Work Boss' },
    { id: 'police', name: 'Delhi Police PCR', relationship: 'Nodal Officer' },
    { id: 'delivery', name: 'Amazon Delivery', relationship: 'Courier Rider' },
  ];

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setIsRinging(true);
      setIsTimerActive(false);
      setCountdown(null);
      // Trigger Toast Ringing
      const toastId = `toast-${Date.now()}`;
      setToasts(prev => [...prev, {
        id: toastId,
        type: 'info',
        message: `Incoming simulated phone call from ${callerName}...`
      }]);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, callerName]);

  // Conversation Timer
  useEffect(() => {
    if (!isConversationActive) {
      setCallDuration(0);
      return;
    }
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isConversationActive]);

  const scheduleCall = () => {
    setCountdown(delaySeconds);
    setIsTimerActive(true);
    setIsRinging(false);
    setIsConversationActive(false);

    const toastId = `toast-${Date.now()}`;
    setToasts(prev => [...prev, {
      id: toastId,
      type: 'success',
      message: `Fake call scheduled in ${delaySeconds} seconds.`
    }]);
  };

  const cancelScheduledCall = () => {
    setCountdown(null);
    setIsTimerActive(false);
    setIsRinging(false);
    setIsConversationActive(false);

    const toastId = `toast-${Date.now()}`;
    setToasts(prev => [...prev, {
      id: toastId,
      type: 'info',
      message: 'Scheduled fake call cancelled.'
    }]);
  };

  const selectPreset = (presetId: string) => {
    setCallerPreset(presetId);
    if (presetId === 'custom') return;
    const selected = presets.find(p => p.id === presetId);
    if (selected) {
      setCallerName(selected.name);
    }
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Mock conversation scripts for the user to speak along to
  const getScript = () => {
    if (callerName.includes('Papa') || callerName.includes('Mummy')) {
      return [
        { speaker: 'Caller', text: "Beta, where are you? We are waiting. Reach home immediately." },
        { speaker: 'You (Read out)', text: "Yes, I am on my way. I will be home in 10 minutes." },
        { speaker: 'Caller', text: "Okay, sharing your live location on WhatsApp. Stay on the main road." },
      ];
    }
    if (callerName.includes('Delhi Police') || callerName.includes('PCR') || callerName.includes('Officer')) {
      return [
        { speaker: 'Caller', text: "This is Sub-Inspector Kumar. Confirming your location, is everything fine?" },
        { speaker: 'You (Read out)', text: "Yes Officer, I am walking towards the metro station now." },
        { speaker: 'Caller', text: "Copy that. We have a PCR patrol vehicle near your route node. Call us if needed." },
      ];
    }
    return [
      { speaker: 'Caller', text: "Hey! We need you at the meeting point right now. Where are you?" },
      { speaker: 'You (Read out)', text: "Oh, yes. I am just leaving. Be there in 5 minutes." },
      { speaker: 'Caller', text: "Perfect, we are waiting at the entrance gate. Make it quick." },
    ];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left relative">
      
      <div className="space-y-1">
        <h3 className="font-bold text-white text-xl tracking-tight flex items-center gap-2">
          Fake Call Simulator
          <span className="text-xs bg-brand-blue-500/20 text-brand-blue-400 px-2 py-0.5 rounded font-semibold border border-brand-blue-500/25">
            Excuse Helper
          </span>
        </h3>
        <p className="text-xs text-slate-400">
          Excuse yourself from uncomfortable or unsafe locations by triggering a simulated high-fidelity call immediately or with a timed delay.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Settings Panel */}
        <div className="lg:col-span-7 p-6 rounded-2xl glass-panel border border-slate-800 space-y-6 flex flex-col justify-between">
          
          <div className="space-y-4">
            {/* Quick Presets */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Quick Presets</label>
              <div className="flex flex-wrap gap-2">
                {presets.map(p => (
                  <button
                    key={p.id}
                    onClick={() => selectPreset(p.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      callerPreset === p.id 
                        ? 'bg-brand-purple-600/20 border-brand-purple-500 text-white' 
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
                <button
                  onClick={() => selectPreset('custom')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    callerPreset === 'custom' 
                      ? 'bg-brand-purple-600/20 border-brand-purple-500 text-white' 
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Custom
                </button>
              </div>
            </div>

            {/* Custom Input */}
            {callerPreset === 'custom' && (
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Caller Display Name</label>
                <input 
                  type="text"
                  value={callerName}
                  onChange={(e) => setCallerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-200 outline-none focus:border-brand-purple-500/50 transition-colors"
                  placeholder="e.g. Papa, Police Head, Boss"
                />
              </div>
            )}

            {/* Delay Selection */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Trigger Time Delay</label>
              <select
                value={delaySeconds}
                onChange={(e) => setDelaySeconds(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-200 outline-none cursor-pointer focus:border-brand-purple-500/50 transition-colors"
              >
                <option value={5}>5 seconds (Quick Test)</option>
                <option value={10}>10 seconds</option>
                <option value={30}>30 seconds</option>
                <option value={60}>1 minute (60s)</option>
                <option value={300}>5 minutes (300s)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/60">
            {!isTimerActive ? (
              <button
                onClick={scheduleCall}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:from-brand-blue-500 hover:to-brand-purple-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-purple-500/10 border border-white/5"
              >
                <Clock className="w-4 h-4" />
                <span>Schedule Fake Call</span>
              </button>
            ) : (
              <button
                onClick={cancelScheduledCall}
                className="w-full py-3 rounded-xl bg-slate-950 border border-brand-red-500/40 hover:border-brand-red-500 text-brand-red-400 font-bold text-xs transition-all flex items-center justify-center gap-2 animate-pulse cursor-pointer"
              >
                <PhoneOff className="w-4.5 h-4.5 animate-bounce" />
                <span>Cancel Scheduled Call ({countdown}s left)</span>
              </button>
            )}
          </div>

        </div>

        {/* Ringing Mockup Panel */}
        <div className="lg:col-span-5 rounded-2xl glass-panel border border-slate-800 p-6 flex flex-col items-center justify-between min-h-[360px] text-center relative overflow-hidden">
          
          <div className="absolute inset-0 bg-slate-950/20 grid-bg opacity-30 pointer-events-none" />

          {isRinging ? (
            <>
              {/* Ringing animations */}
              <div className="absolute inset-0 bg-brand-purple-500/5 animate-pulse" />
              
              <div className="space-y-1 relative z-10 pt-4">
                <span className="text-[10px] text-brand-purple-400 font-bold uppercase tracking-widest animate-pulse flex items-center justify-center gap-1">
                  <Volume2 className="w-3.5 h-3.5" />
                  Incoming Call...
                </span>
                <h4 className="text-2xl font-black text-white mt-1">{callerName}</h4>
                <p className="text-[9px] text-slate-500 tracking-wider">SECURE TELEPHONY GATEWAY</p>
              </div>

              {/* Pulsing visual circles */}
              <div className="w-24 h-24 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 relative z-10 animate-bounce">
                <Phone className="w-10 h-10 text-emerald-400" />
                <span className="absolute inset-0 rounded-full scale-150 bg-emerald-500/10 map-ring pointer-events-none" />
              </div>

              {/* Decline / Accept triggers */}
              <div className="flex gap-4 w-full relative z-10 pb-2">
                <button 
                  onClick={() => setIsRinging(false)}
                  className="flex-1 py-2.5 rounded-xl bg-brand-red-600 hover:bg-brand-red-500 text-white font-bold text-xs uppercase flex items-center gap-1.5 justify-center cursor-pointer border border-brand-red-500/30 shadow-md shadow-brand-red-500/10"
                >
                  <PhoneOff className="w-4 h-4" />
                  Decline
                </button>
                <button 
                  onClick={() => { 
                    setIsRinging(false); 
                    setIsConversationActive(true); 
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase flex items-center gap-1.5 justify-center cursor-pointer border border-emerald-500/30 shadow-md shadow-emerald-500/10"
                >
                  <UserCheck className="w-4 h-4" />
                  Accept
                </button>
              </div>
            </>
          ) : isConversationActive ? (
            <>
              {/* Call Connected State */}
              <div className="space-y-1 relative z-10 pt-4 w-full">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping-slow" />
                  Call Connected
                </span>
                <h4 className="text-xl font-bold text-white mt-1">{callerName}</h4>
                <p className="text-xs font-mono text-slate-400 font-semibold">{formatDuration(callDuration)}</p>
              </div>

              {/* Excuse Helper Script Reader */}
              <div className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-[11px] text-left space-y-2 relative z-10 max-h-[160px] overflow-y-auto">
                <div className="text-[9px] uppercase font-bold text-brand-purple-400 tracking-wider mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-brand-purple-400" />
                  Excuse Helper Script
                </div>
                {getScript().map((line, index) => (
                  <div key={index} className="space-y-0.5">
                    <span className={`font-bold uppercase text-[9px] ${
                      line.speaker.includes('You') ? 'text-brand-blue-400' : 'text-slate-400'
                    }`}>{line.speaker}:</span>
                    <p className={`leading-relaxed ${
                      line.speaker.includes('You') ? 'text-brand-blue-200 font-medium' : 'text-slate-300'
                    }`}>{line.text}</p>
                  </div>
                ))}
              </div>

              {/* End Call Button */}
              <button 
                onClick={() => setIsConversationActive(false)}
                className="w-full py-2.5 rounded-xl bg-brand-red-600 hover:bg-brand-red-500 text-white font-bold text-xs uppercase flex items-center gap-1.5 justify-center cursor-pointer border border-brand-red-500/30 relative z-10 shadow-lg shadow-brand-red-500/15"
              >
                <PhoneOff className="w-4.5 h-4.5" />
                End Excuse Call
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-4 my-auto relative z-10 p-4">
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 shadow-inner">
                <Phone className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-300">Simulator Standby</h4>
                <p className="text-[10px] text-slate-500 px-4 leading-relaxed">
                  Trigger or schedule a call to view high-fidelity dialog templates, excuse script widgets, and mock connection systems.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      <p className="text-[10px] text-slate-500 italic max-w-xl">
        <strong>Technical Note:</strong> For production integration, configure a backend route executing Twilio voice outbounds requesting synthesized voice flows to connect user nodes.
      </p>

      {/* Toast popup overlay */}
      <ToastPlaceholder toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
};

export default FakeCallGenerator;
