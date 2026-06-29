import React, { useState } from 'react';
import VoiceAnimation from '../../components/VoiceAnimation';
import ToastPlaceholder from '../../components/ToastPlaceholder';
import type { ToastMessage } from '../../components/ToastPlaceholder';
import { Volume2, Sparkles, AlertTriangle, KeyRound, Play, Square } from 'lucide-react';

export const VoiceAssistant: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [vocalKeyword, setVocalKeyword] = useState('SafeCircle Emergency');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toggleAssistant = () => {
    setIsActive(!isActive);
    const toastId = `toast-${Date.now()}`;
    setToasts(prev => [...prev, {
      id: toastId,
      type: 'info',
      message: !isActive ? 'Voice Companion active. Listening for emergency keyword.' : 'Voice Companion deactivated.'
    }]);
  };

  const simulateVocalTrigger = () => {
    if (!isActive) {
      const toastId = `toast-${Date.now()}`;
      setToasts(prev => [...prev, {
        id: toastId,
        type: 'warning',
        message: 'Enable voice assistant listener first.'
      }]);
      return;
    }

    // Trigger SOS alert
    const toastId = `toast-${Date.now()}`;
    setToasts(prev => [...prev, {
      id: toastId,
      type: 'warning',
      message: `VOICE EMERGENCY! Keyword "${vocalKeyword}" detected. Sending SOS alerts.`
    }]);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 text-left relative">
      
      {/* Configuration Panel */}
      <div className="lg:col-span-6 space-y-6 flex flex-col justify-between h-full">
        
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="font-bold text-white text-base">Ambient Voice Panic Trigger</h3>
            <p className="text-xs text-slate-400">Offline speech assistant triggers emergency distress dispatches when you whisper preset keywords.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            
            {/* Keyword Input */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1">
                <KeyRound className="w-3.5 h-3.5 text-brand-purple-400" />
                <span>Panic phrase trigger</span>
              </label>
              <input 
                type="text"
                value={vocalKeyword}
                onChange={(e) => setVocalKeyword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl py-2.5 px-3 text-xs text-slate-200 outline-none focus:border-brand-purple-500/50"
                placeholder="e.g. Help me now, SafeCircle emergency"
              />
            </div>

            {/* Micro details */}
            <p className="text-[10px] text-slate-400 leading-relaxed bg-slate-950/40 p-2.5 rounded-lg border border-slate-850">
              The Edge AI voice assistant processes audio arrays locally on your device GPU using WebAssembly WebNN libraries. Your microphone stream is never synced to servers.
            </p>
          </div>
        </div>

        {/* Controls block */}
        <div className="space-y-3 shrink-0">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Manual Testing Simulator</div>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={toggleAssistant}
              className={`py-3 rounded-xl font-bold text-xs border transition-all flex items-center justify-center gap-2 ${
                isActive 
                  ? 'bg-slate-950 border-brand-purple-500 text-brand-purple-400 hover:bg-brand-purple-500/10'
                  : 'bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:from-brand-blue-500 hover:to-brand-purple-500 text-white shadow-lg'
              }`}
            >
              {isActive ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isActive ? 'Deactivate Listener' : 'Activate Voice Assist'}</span>
            </button>
            
            <button 
              onClick={simulateVocalTrigger}
              className="py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-brand-red-500" />
              <span>Simulate vocal trigger</span>
            </button>
          </div>
        </div>

      </div>

      {/* Voice Animation Visualization Panel */}
      <div className="lg:col-span-6 rounded-2xl glass-panel border border-slate-800 p-8 flex items-center justify-center min-h-[350px]">
        <VoiceAnimation 
          isActive={isActive} 
          statusText={`Keyword: "${vocalKeyword}"`} 
        />
      </div>

      {/* Toast popup overlay */}
      <ToastPlaceholder toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
};
export default VoiceAssistant;
