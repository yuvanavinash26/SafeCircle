import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-brand-dark-950 text-slate-100 min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden grid-bg">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-red-500/5 blur-[120px] pointer-events-none" />

      <div className="text-center space-y-6 max-w-md relative z-10">
        
        {/* Warning Indicator */}
        <div className="inline-flex items-center justify-center p-5 rounded-full bg-brand-red-500/10 border border-brand-red-500/20 text-brand-red-500 animate-bounce">
          <ShieldAlert className="w-12 h-12" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tight text-white font-mono">404</h1>
          <h2 className="text-xl font-bold text-slate-200">Safety Grid Boundary Crossed</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            The page you are trying to visit does not exist. Ensure your coordinates are correct or return to the safe zone.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 font-bold text-xs rounded-xl bg-white hover:bg-slate-100 text-brand-dark-950 transition-all flex items-center gap-1.5 mx-auto shadow-lg shadow-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Safe Zone</span>
        </button>
      </div>

      <div className="absolute bottom-6 text-[10px] font-mono text-slate-600">
        SafeCircle AI Navigation Router Exception
      </div>
    </div>
  );
};
export default NotFound;
