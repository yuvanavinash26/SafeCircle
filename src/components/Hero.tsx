import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Sparkles, MapPin, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 px-6 overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-brand-blue-500/10 blur-[100px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-brand-purple-600/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Text Area */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-brand-purple-500/30 text-xs font-semibold text-brand-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-brand-purple-400" />
            <span>Winner Track Concept: AI Safety India</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] md:max-w-2xl">
            Empowering India with <span className="gradient-text-blue-purple font-black">AI-Powered</span> Companion Safety
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
            SafeCircle AI delivers modern, real-time safety guardrails. From ambient voice trigger panic monitors to crowd safety routing, we keep your circle secure.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={() => navigate('/dashboard/sos')}
              className="px-8 py-3.5 text-sm font-bold rounded-2xl bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:from-brand-blue-500 hover:to-brand-purple-500 text-white shadow-xl shadow-brand-purple-500/15 transition-all hover:scale-[1.02]"
            >
              Get Started (Launch Console)
            </button>
            <button 
              onClick={() => navigate('/features')}
              className="px-8 py-3.5 text-sm font-bold rounded-2xl glass-panel border border-slate-700/80 hover:bg-slate-900/60 text-white transition-all"
            >
              Explore Safety Suite
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-900/60 max-w-lg">
            <div>
              <div className="text-2xl font-bold text-white">4.8s</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1">Average Response</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1">Offline Guard</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-1">AI Vigilance</div>
            </div>
          </div>
        </div>

        {/* Mock Graphics Area */}
        <div className="lg:col-span-5 flex justify-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[380px] p-6 glass-panel rounded-[32px] border border-white/10 shadow-2xl relative"
          >
            {/* Embedded Active Alert Device Graphic */}
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-brand-red-500/15 text-brand-red-400 border border-brand-red-500/30 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red-500" />
              Live Demo
            </div>

            <div className="space-y-6">
              
              {/* Header Icon */}
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-brand-blue-500/10 border border-brand-blue-500/20 text-brand-blue-400">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">SafeCircle Active Guard</h3>
                  <p className="text-[10px] text-slate-400">Active Shielding Engine</p>
                </div>
              </div>

              {/* Status Graphic */}
              <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-900/60 relative overflow-hidden flex flex-col items-center py-6">
                <div className="w-20 h-20 rounded-full bg-brand-blue-500/5 flex items-center justify-center border border-brand-blue-500/20 mb-3 relative">
                  <div className="absolute inset-2 rounded-full border border-brand-purple-500/30 animate-pulse-slow" />
                  <Activity className="w-8 h-8 text-brand-blue-400" />
                </div>
                <div className="text-xs font-semibold text-slate-300">Biometric Sensor Connected</div>
                <div className="text-[10px] text-brand-blue-400 mt-0.5">Pulse Rate: 72 bpm (Normal)</div>
              </div>

              {/* Action Buttons Mockup */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-purple-400" />
                  <div>
                    <div className="text-[9px] text-slate-400">GEOFENCE STATUS</div>
                    <div className="text-[10px] font-bold text-white">In Secure Zone</div>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-brand-red-500/5 border border-brand-red-500/20 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-red-500 animate-ping" />
                  <div>
                    <div className="text-[9px] text-brand-red-400">PANIC SENSOR</div>
                    <div className="text-[10px] font-bold text-white">Idle Listener</div>
                  </div>
                </div>
              </div>

              <div className="text-[9px] text-center text-slate-500 italic">
                Interactive mockup. Launch Console to see page routers in action.
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
export default Hero;
