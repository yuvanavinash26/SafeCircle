import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Sparkles, MapPin, Activity, Compass, Wifi, Phone, ShieldAlert, Cpu, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  // Simulated live parameters for the Control Center mockup
  const [lat, setLat] = useState(28.6304);
  const [lng, setLng] = useState(77.2177);
  const [pulse, setPulse] = useState(74);
  const [dB, setDB] = useState(32);
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLat(prev => prev + (Math.random() * 0.0004 - 0.0002));
      setLng(prev => prev + (Math.random() * 0.0004 - 0.0002));
      setPulse(prev => {
        const delta = Math.floor(Math.random() * 4) - 2;
        return Math.max(68, Math.min(88, prev + delta));
      });
      setDB(prev => {
        const delta = Math.floor(Math.random() * 12) - 6;
        return Math.max(20, Math.min(55, prev + delta));
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const toggleDemoAlert = () => {
    setIsAlert(prev => !prev);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-16 px-6 md:px-12 overflow-hidden bg-[#050816]">
      
      {/* Premium Visual Background Layers */}
      {/* 1. Grid Line Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d4ff05_1px,transparent_1px),linear-gradient(to_bottom,#00d4ff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-45" />

      {/* 2. Soft Gradient Glow Orbs (Cyan & Emerald) */}
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-emerald-500/5 blur-[140px] pointer-events-none" />

      {/* 3. Subtle Light Beam */}
      <div className="absolute top-0 left-[50%] -translate-x-[50%] w-[1px] h-[600px] bg-gradient-to-b from-cyan-500/15 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Side: Copywriting & High Impact CTAs */}
        <div className="lg:col-span-6 space-y-8 text-left">
          
          {/* Tagline Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-[#0B1023]/60 backdrop-blur-md text-xs font-bold text-[#00D4FF]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest text-[9px]">National Security Concept Shield &bull; India</span>
          </motion.div>

          {/* Core Title */}
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-7xl font-black text-white tracking-tight leading-[1.05]"
            >
              Your Personal <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#00FFB2]">
                AI Guardian
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl"
            >
              Decentralized Edge AI monitors biometrics, detects impacts, and listens for whisper panic triggers to secure your circle instantly, even completely offline.
            </motion.p>
          </div>

          {/* Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-8 py-4 text-xs font-bold uppercase tracking-widest rounded-full bg-[#00D4FF] hover:bg-[#00e1ff] text-slate-950 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all cursor-pointer border border-[#00D4FF]"
            >
              Start Protecting
            </button>
            
            <button 
              onClick={() => {
                const target = document.getElementById('demo-section');
                target?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 text-xs font-bold uppercase tracking-widest rounded-full border border-white/10 hover:border-cyan-500/40 text-white bg-transparent hover:bg-[#0B1023]/30 transition-all cursor-pointer"
            >
              Watch Demo
            </button>
          </motion.div>

          {/* High Trust Metrics */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5 max-w-md text-xs"
          >
            <div>
              <div className="text-xl font-extrabold text-white font-mono">&lt; 4.8s</div>
              <div className="text-[9px] text-slate-500 uppercase font-black tracking-wider mt-1">RESPONSE RATE</div>
            </div>
            <div>
              <div className="text-xl font-extrabold text-white font-mono">100%</div>
              <div className="text-[9px] text-slate-500 uppercase font-black tracking-wider mt-1">EDGE PRIVACY</div>
            </div>
            <div>
              <div className="text-xl font-extrabold text-white font-mono">112 / SMS</div>
              <div className="text-[9px] text-slate-500 uppercase font-black tracking-wider mt-1">NODAL GATEWAYS</div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Animated AI Control Center */}
        <div className="lg:col-span-6 flex justify-center relative">
          
          {/* Decorative radar beam */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] border border-cyan-500/5 rounded-full pointer-events-none" />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full max-w-[440px] p-6 rounded-[24px] bg-[#0B1023]/80 backdrop-blur-xl border transition-all duration-500 space-y-6 shadow-2xl relative overflow-hidden ${
              isAlert 
                ? 'border-brand-red-500/50 shadow-brand-red-500/10' 
                : 'border-white/5 shadow-cyan-500/5'
            }`}
          >
            {/* Top Bar Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl border ${
                  isAlert 
                    ? 'bg-brand-red-500/10 border-brand-red-500/30 text-brand-red-400' 
                    : 'bg-cyan-500/10 border-cyan-500/20 text-[#00D4FF]'
                }`}>
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-xs text-white">GUARD HUB UNIT</h3>
                  <p className="text-[9px] text-slate-500 font-mono">STATUS: {isAlert ? 'ALERTING' : 'SECURED'}</p>
                </div>
              </div>

              {/* Toggle Simulated Alert Button */}
              <button 
                onClick={toggleDemoAlert}
                className={`px-3 py-1 text-[9px] font-black uppercase rounded-full border transition-all cursor-pointer ${
                  isAlert 
                    ? 'bg-[#FF4D5A]/10 border-[#FF4D5A]/30 text-[#FF4D5A] hover:bg-[#FF4D5A]/25' 
                    : 'bg-cyan-500/5 border-cyan-500/20 text-[#00D4FF] hover:bg-cyan-500/10'
                }`}
              >
                {isAlert ? 'CANCEL DISPATCH' : 'TEST SOS TRIGGER'}
              </button>
            </div>

            {/* Simulated Live Radar Scanner */}
            <div className="h-44 bg-[#050816]/80 rounded-2xl border border-white/5 relative overflow-hidden flex items-center justify-center">
              
              {/* Spinning sweep line */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[120px] h-[120px] border border-cyan-500/10 rounded-full" />
                <div className="w-[60px] h-[60px] border border-cyan-500/10 rounded-full" />
                <div className="w-[180px] h-[180px] border border-cyan-500/10 rounded-full" />
                
                {/* Rotating Line */}
                <div className="absolute w-[180px] h-[2px] bg-gradient-to-r from-transparent to-cyan-500/40 origin-center animate-spin" style={{ animationDuration: '4s' }} />
              </div>

              {/* Pulsing signal indicators */}
              <div className="absolute top-1/4 left-1/3 flex items-center justify-center">
                <span className="absolute w-4 h-4 bg-emerald-500/30 rounded-full animate-ping" />
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span className="text-[7px] text-slate-500 font-mono absolute -bottom-3 white-space-nowrap">POLICE UNIT</span>
              </div>

              <div className="absolute bottom-1/3 right-1/4 flex items-center justify-center">
                <span className="absolute w-4 h-4 bg-cyan-500/30 rounded-full animate-ping" />
                <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full" />
                <span className="text-[7px] text-slate-500 font-mono absolute -bottom-3 white-space-nowrap">YOUR POSITION</span>
              </div>

              {/* Custom dynamic audio waveform at bottom */}
              <div className="absolute bottom-2 left-4 right-4 flex justify-between items-center h-4 gap-0.5">
                {Array.from({ length: 42 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-0.5 rounded-full transition-all duration-150 ${
                      isAlert ? 'bg-[#FF4D5A]/50' : 'bg-cyan-500/40'
                    }`}
                    style={{ height: `${Math.random() * (isAlert ? 100 : 60) + 20}%` }}
                  />
                ))}
              </div>

              <span className="absolute top-2 left-3 text-[7px] text-slate-500 font-mono tracking-wider flex items-center gap-1 uppercase">
                <Mic className="w-2.5 h-2.5 text-[#00D4FF]" />
                Ambient sound db: {dB}
              </span>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#050816]/60 rounded-xl border border-white/5 text-left space-y-1 relative">
                <span className="text-[8px] text-slate-500 font-black tracking-wider uppercase">Satellite Node Coords</span>
                <div className="font-mono text-white font-bold tracking-tight text-[11px] truncate">
                  {lat.toFixed(5)}N, {lng.toFixed(5)}E
                </div>
              </div>

              <div className="p-3 bg-[#050816]/60 rounded-xl border border-white/5 text-left space-y-1 relative">
                <span className="text-[8px] text-slate-500 font-black tracking-wider uppercase flex items-center gap-1">
                  <Activity className="w-2.5 h-2.5 text-rose-500" />
                  Biometrics Watch
                </span>
                <div className="font-mono text-white font-bold tracking-tight text-[11px] flex items-center gap-1">
                  <span>{pulse} BPM</span>
                  <span className="text-[8px] text-slate-500 font-sans">({isAlert ? 'STRESSED' : 'NORMAL'})</span>
                </div>
              </div>
            </div>

            {/* Current safety indexes or alerts panel */}
            <AnimatePresence mode="wait">
              {isAlert ? (
                <motion.div 
                  key="alert-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-xl bg-gradient-to-r from-brand-red-500/10 to-brand-red-500/5 border border-brand-red-500/25 flex items-start gap-3 text-left"
                >
                  <ShieldAlert className="w-5 h-5 text-brand-red-400 shrink-0 mt-0.5 animate-pulse" />
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-xs text-white">CRITICAL CRISIS ALERT ACTIVE</h4>
                    <p className="text-[9px] text-[#FF4D5A] leading-normal font-medium">
                      GPS dispatch coordinates sent via cell link to Rohan Gupta & South Ext Police post relays.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="secure-panel"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 flex items-start gap-3 text-left"
                >
                  <Compass className="w-5 h-5 text-[#00D4FF] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-xs text-white">NEIGHBORHOOD RATINGS: SAFE</h4>
                    <p className="text-[9px] text-slate-400 leading-normal">
                      Geofence matches Connaught Place safety score index grid (9.2 / 10). Live relays monitoring stable.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
