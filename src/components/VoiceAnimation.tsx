import React from 'react';
import { Mic, Volume2 } from 'lucide-react';

interface VoiceAnimationProps {
  isActive: boolean;
  statusText?: string;
}

export const VoiceAnimation: React.FC<VoiceAnimationProps> = ({ 
  isActive, 
  statusText = 'Say "SafeCircle Emergency" to trigger' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center space-y-6">
      
      {/* Central Pulsing Mic Icon */}
      <div className="relative">
        <div className={`absolute -inset-4 rounded-full blur-xl opacity-30 transition-all duration-500 ${
          isActive 
            ? 'bg-brand-purple-500 animate-pulse' 
            : 'bg-slate-800'
        }`} />
        <div className={`w-28 h-28 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative ${
          isActive 
            ? 'border-brand-purple-500 bg-brand-purple-500/10 shadow-[0_0_30px_rgba(168,85,247,0.2)] text-brand-purple-400' 
            : 'border-slate-800 bg-slate-900/60 text-slate-500'
        }`}>
          {isActive && (
            <div className="absolute inset-0 rounded-full border border-brand-purple-500/40 animate-ping" />
          )}
          <Mic className={`w-10 h-10 transition-transform ${isActive ? 'scale-110' : ''}`} />
        </div>
      </div>

      {/* soundwave Bars */}
      <div className="flex items-end justify-center gap-1.5 h-16 w-60">
        {[0.4, 0.9, 0.3, 0.75, 1.1, 0.5, 0.85, 0.3, 0.6, 0.95].map((scale, i) => (
          <div
            key={i}
            style={{ 
              animationDelay: `${i * 0.12}s`,
              animationDuration: isActive ? `${1 + scale}s` : '0s',
              transform: isActive ? undefined : 'scaleY(0.15)',
              transformOrigin: 'bottom'
            }}
            className={`w-1.5 h-full rounded-full transition-all duration-300 voice-bar ${
              isActive 
                ? 'bg-gradient-to-t from-brand-blue-500 to-brand-purple-500' 
                : 'bg-slate-800'
            }`}
          />
        ))}
      </div>

      {/* Description HUD */}
      <div className="space-y-1">
        <h4 className={`text-sm font-bold tracking-wide transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`}>
          {isActive ? 'Companion Voice Engine: Listening...' : 'Engine Standby'}
        </h4>
        <p className="text-xs text-slate-500 max-w-xs">{statusText}</p>
      </div>

      {/* FUTURE DEVELOPMENT COMMENTS:
          Inside this file, you should import Web Audio API (getUserMedia) or React Speech Recognition.
          Wire up dynamic volume scaling to the height of the .voice-bar elements by passing live mic values.
      */}
    </div>
  );
};
export default VoiceAnimation;
