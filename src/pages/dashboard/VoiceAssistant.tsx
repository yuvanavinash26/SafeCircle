import React, { useState } from 'react';
import VoiceAnimation from '../../components/VoiceAnimation';
import ToastPlaceholder from '../../components/ToastPlaceholder';
import type { ToastMessage } from '../../components/ToastPlaceholder';
import { useVoiceRecognition } from '../../hooks/useVoiceRecognition';
import { Volume2, Sparkles, AlertTriangle, KeyRound, Play, Square, History, ShieldCheck } from 'lucide-react';

export const VoiceAssistant: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const handleCommandDetected = (command: string) => {
    const toastId = `toast-${Date.now()}`;
    let message = '';
    
    switch (command) {
      case 'SOS_TRIGGER':
        message = 'VOICE PANIC DECLARED: Initiating Emergency SOS Relay...';
        break;
      case 'CALL_EMERGENCY':
        message = 'VOICE COMMAND: Calling PCR Hotline (112)...';
        break;
      case 'NAVIGATE_HOME':
        message = 'VOICE COMMAND: Calculating Safest Route Home...';
        break;
      case 'SHARE_LOCATION':
        message = 'VOICE COMMAND: Sharing GPS coordinates to emergency circle...';
        break;
    }

    setToasts(prev => [
      ...prev,
      {
        id: toastId,
        type: 'warning',
        message
      }
    ]);
  };

  const {
    isListening,
    transcript,
    history,
    error,
    startListening,
    stopListening
  } = useVoiceRecognition(handleCommandDetected);

  const toggleAssistant = () => {
    if (isListening) {
      stopListening();
      setToasts(prev => [
        ...prev,
        {
          id: `toast-${Date.now()}`,
          type: 'info',
          message: 'Voice Engine standby mode.'
        }
      ]);
    } else {
      startListening();
      setToasts(prev => [
        ...prev,
        {
          id: `toast-${Date.now()}`,
          type: 'info',
          message: 'Voice Companion listening active. Whisper emergency trigger commands.'
        }
      ]);
    }
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-left relative">
      
      <div className="space-y-1">
        <h3 className="font-bold text-white text-xl tracking-tight flex items-center gap-2">
          Ambient Voice Panic Trigger
          <span className="text-xs bg-brand-purple-500/20 text-brand-purple-400 px-2 py-0.5 rounded font-semibold border border-brand-purple-500/25">
            Speech Recognition
          </span>
        </h3>
        <p className="text-xs text-slate-400">
          Offline vocal companion listening module triggers distress commands automatically using local speech filters.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-brand-red-500/10 border border-brand-red-500/20 text-xs text-brand-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Configurations Panel */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-5">
            <h4 className="text-xs uppercase font-bold text-slate-500 tracking-wider flex items-center gap-1.5 border-b border-slate-800/80 pb-3">
              <KeyRound className="w-4 h-4 text-brand-purple-400" />
              Verbal Trigger Phrases
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded-xl border border-slate-900">
                <span className="text-slate-300">"Emergency" or "Help"</span>
                <span className="text-[9px] font-bold text-brand-red-400 bg-brand-red-500/10 border border-brand-red-500/20 px-1.5 py-0.5 rounded uppercase">Distress SOS</span>
              </div>
              <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded-xl border border-slate-900">
                <span className="text-slate-300">"Call police" or "Dial 112"</span>
                <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded uppercase">PCR Hotline</span>
              </div>
              <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded-xl border border-slate-900">
                <span className="text-slate-300">"Navigate home" or "Go home"</span>
                <span className="text-[9px] font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-1.5 py-0.5 rounded uppercase">Safe Route</span>
              </div>
              <div className="flex justify-between items-center bg-slate-950/40 p-2.5 rounded-xl border border-slate-900">
                <span className="text-slate-300">"Share location" or "Track me"</span>
                <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase">GPS Broadcast</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-[10px] uppercase font-bold text-slate-500 mb-1 flex items-center gap-1">
                <History className="w-3.5 h-3.5" />
                Command History logs
              </div>
              <div className="bg-slate-950/60 rounded-xl p-3 max-h-[120px] overflow-y-auto border border-slate-900 space-y-2">
                {history.length === 0 ? (
                  <span className="text-[10px] text-slate-500 italic block text-center">No vocal commands logged in this session.</span>
                ) : (
                  history.map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px]">
                      <span className="font-semibold text-slate-300">{h.command}</span>
                      <span className={`font-mono text-[8px] px-1.5 rounded ${
                        h.recognized ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                      }`}>{h.recognized ? 'RECOGNIZED' : 'UNMATCHED'}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Test buttons controls */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={toggleAssistant}
              className={`py-3 rounded-xl font-bold text-xs border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isListening 
                  ? 'bg-slate-950 border-brand-purple-500 text-brand-purple-400 hover:bg-brand-purple-500/10'
                  : 'bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:from-brand-blue-500 hover:to-brand-purple-500 text-white shadow-lg'
              }`}
            >
              {isListening ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isListening ? 'Stop Listening' : 'Start Listening'}</span>
            </button>
            <button 
              onClick={() => handleCommandDetected('SOS_TRIGGER')}
              className="py-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-brand-red-500 animate-pulse" />
              <span>Force Trigger SOS</span>
            </button>
          </div>
        </div>

        {/* Bouncing Animation Panel */}
        <div className="lg:col-span-6 rounded-2xl glass-panel border border-slate-800 p-6 flex flex-col justify-between min-h-[350px]">
          <div className="flex-1 flex items-center justify-center">
            <VoiceAnimation 
              isActive={isListening} 
              statusText={transcript ? `"${transcript}"` : 'Say keyword or whisper command'} 
            />
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-900 text-[10px] text-slate-500 leading-relaxed flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-purple-400 shrink-0" />
            <p>
              Edge AI acoustics run locally. Transcripts are audited inside sandboxed frames, and never uploaded to external servers.
            </p>
          </div>
        </div>

      </div>

      <ToastPlaceholder toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
};

export default VoiceAssistant;
