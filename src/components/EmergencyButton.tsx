import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmergencyButtonProps {
  onTriggerSOS: () => void;
}

export const EmergencyButton: React.FC<EmergencyButtonProps> = ({ onTriggerSOS }) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      onTriggerSOS();
      setCountdown(null);
      return;
    }

    const interval = setTimeout(() => {
      setCountdown(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(interval);
  }, [countdown, onTriggerSOS]);

  const startCountdown = () => {
    setCountdown(3);
  };

  const cancelSOS = () => {
    setCountdown(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="relative flex items-center justify-center h-80 w-80">
        
        {/* Decorative Radar Ring */}
        <AnimatePresence>
          {countdown !== null && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full bg-brand-red-500/30 border border-brand-red-500/50 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Ambient Ring Glow */}
        <div className={`absolute inset-0 rounded-full transition-all duration-500 pointer-events-none ${
          countdown !== null 
            ? 'bg-brand-red-500/10 border-2 border-brand-red-500/40 scale-110' 
            : 'bg-brand-red-500/5 border border-brand-red-500/15'
        }`} />

        {/* Main Trigger Button */}
        {countdown === null ? (
          <button
            onClick={startCountdown}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="h-60 w-60 rounded-full bg-gradient-to-tr from-brand-red-700 via-brand-red-600 to-red-500 hover:from-brand-red-600 hover:to-red-400 text-white font-black text-3xl shadow-[0_0_50px_rgba(239,68,68,0.4)] hover:shadow-[0_0_70px_rgba(239,68,68,0.7)] flex flex-col items-center justify-center gap-3 transition-all transform duration-300 hover:scale-105 border-4 border-brand-dark-950 outline-none select-none relative z-10 cursor-pointer"
          >
            <ShieldAlert className={`w-14 h-14 text-white transition-transform ${isHovered && 'scale-110 rotate-3'}`} />
            <span className="tracking-widest uppercase text-2xl font-black">Trigger SOS</span>
            <span className="text-[10px] tracking-widest text-red-100 font-semibold">TAP TO BROADCAST</span>
          </button>
        ) : (
          <button
            onClick={cancelSOS}
            className="h-60 w-60 rounded-full bg-slate-900 border-4 border-brand-red-500/80 hover:bg-brand-red-500/10 text-white font-black text-2xl shadow-xl flex flex-col items-center justify-center gap-2 transition-all relative z-10 cursor-pointer"
          >
            <AlertTriangle className="w-10 h-10 text-brand-red-500 animate-bounce" />
            <span className="text-sm font-semibold text-slate-400">ACTIVATING IN</span>
            <span className="text-5xl font-black text-brand-red-500">{countdown}s</span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">TAP TO CANCEL</span>
          </button>
        )}
      </div>

      <p className="text-xs text-slate-400 max-w-sm mt-4 leading-relaxed">
        {countdown === null 
          ? 'Tapping this button broadcasts your exact GPS coordinates, live microphone stream, and automated SMS alerts to your emergency contacts.'
          : 'Warning: SafeCircle AI is connecting to regional emergency nodes and alerting contacts.'}
      </p>
    </div>
  );
};
export default EmergencyButton;
