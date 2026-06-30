import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Clock, UserCheck, ShieldAlert, Sparkles } from 'lucide-react';
import ToastPlaceholder from '../../components/ToastPlaceholder';
import type { ToastMessage } from '../../components/ToastPlaceholder';

export const FakeCall: React.FC = () => {
  const [callerName, setCallerName] = useState('Papa (Home)');
  const [delaySeconds, setDelaySeconds] = useState(10);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRinging, setIsRinging] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const handleAcceptCall = () => {
    setIsRinging(false);
    setIsCallActive(true);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `Hello beta! Where are you right now? Listen carefully, I am sending our car to your exact GPS coordinates right now. Stay on line with me and do not hang up.`
      );
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }

    const toastId = `toast-${Date.now()}`;
    setToasts(prev => [...prev, {
      id: toastId,
      type: 'success',
      message: `Call Connected with ${callerName}. Playing emergency audio prompt.`
    }]);
  };

  const handleEndCall = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsCallActive(false);
    const toastId = `toast-${Date.now()}`;
    setToasts(prev => [...prev, {
      id: toastId,
      type: 'info',
      message: 'Call disconnected.'
    }]);
  };

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
        message: `Incoming Fake Call from ${callerName}...`
      }]);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, callerName]);

  const scheduleCall = () => {
    setCountdown(delaySeconds);
    setIsTimerActive(true);
    setIsRinging(false);

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

    const toastId = `toast-${Date.now()}`;
    setToasts(prev => [...prev, {
      id: toastId,
      type: 'info',
      message: 'Scheduled fake call cancelled.'
    }]);
  };

  const handleDismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-left relative">
      
      <div className="space-y-1">
        <h3 className="font-bold text-white text-base">Fake Call Simulator</h3>
        <p className="text-xs text-slate-400">Trigger a simulated phone call immediately or set a countdown timer to excuse yourself from uncomfortable environments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Settings Panel */}
        <div className="md:col-span-7 p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Caller Display Name</label>
            <input 
              type="text"
              value={callerName}
              onChange={(e) => setCallerName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-200 outline-none focus:border-brand-purple-500/50"
              placeholder="e.g. Papa, Police Head, Boss"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Trigger Time Delay</label>
            <select
              value={delaySeconds}
              onChange={(e) => setDelaySeconds(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-200 outline-none cursor-pointer focus:border-brand-purple-500/50"
            >
              <option value={5}>5 seconds</option>
              <option value={10}>10 seconds</option>
              <option value={30}>30 seconds</option>
              <option value={60}>1 minute (60s)</option>
              <option value={300}>5 minutes (300s)</option>
            </select>
          </div>

          <div className="pt-2">
            {!isTimerActive ? (
              <button
                onClick={scheduleCall}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:from-brand-blue-500 hover:to-brand-purple-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4" />
                <span>Schedule Fake Call</span>
              </button>
            ) : (
              <button
                onClick={cancelScheduledCall}
                className="w-full py-3 rounded-xl bg-slate-950 border border-brand-red-500/30 hover:border-brand-red-500 text-brand-red-400 font-bold text-xs transition-all flex items-center justify-center gap-2 animate-pulse"
              >
                <PhoneOff className="w-4 h-4 animate-bounce" />
                <span>Cancel Call ({countdown}s left)</span>
              </button>
            )}
          </div>

        </div>

        {/* Ringing Mockup Panel */}
        <div className="md:col-span-5 rounded-2xl glass-panel border border-slate-800 p-6 flex flex-col items-center justify-between min-h-[300px] text-center relative overflow-hidden">
          
          <div className="absolute inset-0 bg-slate-950/20 grid-bg opacity-30 pointer-events-none" />

          {isCallActive ? (
            <>
              <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
              <div className="space-y-1 relative z-10 pt-4">
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest animate-pulse">Connected • Active Call</span>
                <h4 className="text-xl font-black text-white">{callerName}</h4>
                <p className="text-xs font-mono text-emerald-300">
                  00:{callDuration < 10 ? `0${callDuration}` : callDuration}
                </p>
              </div>

              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-300 relative z-10">
                <Phone className="w-8 h-8 animate-pulse" />
              </div>

              <div className="w-full relative z-10 pb-2">
                <button 
                  onClick={handleEndCall}
                  className="w-full py-2.5 rounded-xl bg-brand-red-600 hover:bg-brand-red-500 text-white font-bold text-xs uppercase flex items-center gap-2 justify-center cursor-pointer shadow-lg shadow-brand-red-600/30"
                >
                  <PhoneOff className="w-4 h-4" />
                  End Call
                </button>
              </div>
            </>
          ) : isRinging ? (
            <>
              {/* Ringing animations */}
              <div className="absolute inset-0 bg-brand-purple-500/5 animate-pulse" />
              
              <div className="space-y-1 relative z-10 pt-4">
                <span className="text-[10px] text-brand-purple-400 font-bold uppercase tracking-widest animate-pulse">Incoming Audio Call</span>
                <h4 className="text-xl font-black text-white">{callerName}</h4>
                <p className="text-[10px] text-slate-500">SIMULATED TELEPHONY LINE</p>
              </div>

              {/* Pulsing visual */}
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 relative z-10 animate-bounce">
                <Phone className="w-8 h-8 text-emerald-400" />
                <span className="absolute inset-0 rounded-full scale-150 bg-emerald-500/10 map-ring pointer-events-none" />
              </div>

              {/* End/Accept */}
              <div className="flex gap-4 w-full relative z-10 pb-2">
                <button 
                  onClick={() => setIsRinging(false)}
                  className="flex-1 py-2 rounded-lg bg-brand-red-600 hover:bg-brand-red-500 text-white font-bold text-[10px] uppercase flex items-center gap-1 justify-center cursor-pointer"
                >
                  <PhoneOff className="w-3.5 h-3.5" />
                  Decline
                </button>
                <button 
                  onClick={handleAcceptCall}
                  className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] uppercase flex items-center gap-1 justify-center cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  Accept
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-4 my-auto relative z-10">
              <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-300">Simulator Idle</h4>
                <p className="text-[10px] text-slate-500 px-4 leading-normal mt-1">Schedule a test to verify dial UI graphics on mobile device wrappers.</p>
              </div>
            </div>
          )}

        </div>

      </div>

      <p className="text-[10px] text-slate-500 italic max-w-xl">
        FUTURE LOGIC: Integrate Twilio Voice APIs to dial the user's actual phone number with a pre-recorded AI call conversation, helping users escape unsafe environments.
      </p>

      {/* Toast popup overlay */}
      <ToastPlaceholder toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
};
export default FakeCall;
