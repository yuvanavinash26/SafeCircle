import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  MapPin, 
  Volume2, 
  Activity, 
  Lock, 
  Brain, 
  HelpCircle, 
  Eye, 
  CheckCircle2, 
  Users, 
  Award, 
  Zap, 
  Compass,
  Cpu,
  Mic,
  Radio,
  Network,
  Server,
  ArrowRight,
  ShieldCheck,
  ZapOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';
import FloatingSOSButton from '../components/FloatingSOSButton';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Interactive Demonstration States
  const [demoState, setDemoState] = useState<'idle' | 'panic' | 'dispatched'>('idle');
  const [heartRate, setHeartRate] = useState(72);

  const coreFeatures = [
    {
      title: "One-Tap SOS Relay",
      description: "Direct cell link broadcast sends GPS telemetry to circles and police nodes under 5 seconds.",
      icon: Shield,
      badge: "Crisis Trigger"
    },
    {
      title: "Ambient Voice Monitor",
      description: "Passive local speech filters parse whispers for panic words, triggering alarms offline.",
      icon: Volume2,
      badge: "Edge AI Voice"
    },
    {
      title: "Safe Routing Maps",
      description: "Analyze crowd levels, street lamp illuminations, and camera grids in Delhi NCR.",
      icon: MapPin,
      badge: "Interactive OS Maps"
    },
    {
      title: "Crash & Shock Sensors",
      description: "Detects smartwatch fall vectors and high G-force deceleration impact anomalies.",
      icon: Activity,
      badge: "Biometric Sync"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Anchor Guardians",
      description: "Set primary designated family circles, safety groups, and local PCR dispatch channels."
    },
    {
      step: "02",
      title: "Initialize Audio Sensors",
      description: "Specify trigger key phrases and accelerometer impact ranges matching your device."
    },
    {
      step: "03",
      title: "Activate Guard Shield",
      description: "Launch real-time routing indices and geofence tracking tags on your commutes."
    }
  ];

  const stats = [
    { value: "4.8s", label: "AVERAGE PCR LINK" },
    { value: "12K+", label: "ACTIVE DELHI USERS" },
    { value: "99.8%", label: "GPS NODAL TRACK" },
    { value: "256bit", label: "EDGE DATA CRYPTO" }
  ];

  const futureConcepts = [
    { 
      title: "Smart Glasses HUD Display", 
      desc: "Project safest walking pathways directly on smart lenses overlays.",
      icon: Eye
    },
    { 
      title: "Offline Wearable Bands", 
      desc: "Direct cellular physical panic triggers for areas without internet connection.",
      icon: Radio
    },
    { 
      title: "Autonomous Response Drone", 
      desc: "Autonomously deploy localized safety drones to scan and spotlight coordinates.",
      icon: Cpu
    }
  ];

  const testimonials = [
    {
      quote: "SafeCircle AI gave my daughter complete peace of mind during late office commutes in Gurugram. The voice keyword triggers instantly.",
      author: "Aditi Rao",
      role: "Software Engineer, Bengaluru"
    },
    {
      quote: "The live safe map rating is incredibly useful. It helped us evaluate street light indexes around our colony roads in South Delhi.",
      author: "Vikram Malhotra",
      role: "Resident Association, Delhi"
    }
  ];

  const faqs = [
    {
      q: "Does SafeCircle AI require cellular internet connection?",
      a: "No. The system uses local databases for map grids and sends emergency coordinates via automated SMS frequencies if mobile network data is down."
    },
    {
      q: "How does the AI Voice Assistant protect user privacy?",
      a: "All vocal parsing runs directly on your device via Edge AI models. Audio is analyzed in local memory and is never uploaded to the cloud unless a panic SOS triggers."
    },
    {
      q: "Is this integrated with emergency helplines in India?",
      a: "Yes. SafeCircle connects to national portals (112, 1091 Women Helpline) to dispatch automated coordinates and alert regional nodal police officers."
    }
  ];

  const triggerDemoState = (state: 'idle' | 'panic' | 'dispatched') => {
    setDemoState(state);
    if (state === 'panic') {
      setHeartRate(148);
    } else if (state === 'dispatched') {
      setHeartRate(125);
    } else {
      setHeartRate(72);
    }
  };

  return (
    <div className="bg-[#050816] text-slate-100 min-h-screen relative overflow-hidden font-sans">
      
      {/* Background visual components */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d4ff05_1px,transparent_1px),linear-gradient(to_bottom,#00d4ff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Floating Header */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Trusted By / Hackathon Vision Branding Section */}
      <section className="py-12 border-y border-white/5 bg-[#0B1023]/25 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <div className="text-[10px] uppercase font-bold tracking-widest text-[#00D4FF]">
            Hackathon Vision & Trust Framework
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-55 text-xs font-bold text-slate-400">
            <div className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>NVIDIA Edge AI</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Network className="w-4 h-4 text-cyan-400" />
              <span>TanStack Network</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Server className="w-4 h-4 text-brand-red-400" />
              <span>India Helpline 112 Gateway</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-slate-400" />
              <span>AES-256 Endpoints</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="space-y-4 mb-16 text-center max-w-3xl mx-auto">
          <span className="text-[10px] uppercase font-black tracking-widest text-[#00D4FF] bg-cyan-500/5 px-3 py-1 rounded-full border border-cyan-500/10">
            System Operations
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Equipped with Edge Guard Technology
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Decentralized algorithms designed to maintain security perimeters, monitor biometrics, and calculate safety grids.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreFeatures.map((feat, i) => (
            <FeatureCard 
              key={i} 
              title={feat.title} 
              description={feat.description} 
              icon={feat.icon} 
              badge={feat.badge} 
            />
          ))}
        </div>
      </section>

      {/* Real-Time Interactive AI Demonstration Section */}
      <section id="demo-section" className="py-24 px-6 md:px-12 bg-[#0B1023]/40 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 text-left space-y-6">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#00FFB2] bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
              Interactive Sandbox
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Test the AI Nodal Dispatch Sequence
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed font-medium">
              Click the demo controls below to simulate how SafeCircle parses anomalies, monitors heartbeat thresholds, and triggers automated cellular alerts.
            </p>

            <div className="space-y-2">
              <div className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider">Demo States</div>
              <div className="flex gap-2">
                <button 
                  onClick={() => triggerDemoState('idle')}
                  className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                    demoState === 'idle' 
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-[#00D4FF]' 
                      : 'border-white/5 bg-[#050816] text-slate-400'
                  }`}
                >
                  Normal
                </button>
                <button 
                  onClick={() => triggerDemoState('panic')}
                  className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                    demoState === 'panic' 
                      ? 'bg-brand-red-500/10 border-brand-red-500/40 text-[#FF4D5A]' 
                      : 'border-white/5 bg-[#050816] text-slate-400'
                  }`}
                >
                  Simulate Shock/BPM
                </button>
                <button 
                  onClick={() => triggerDemoState('dispatched')}
                  className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                    demoState === 'dispatched' 
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-[#00FFB2]' 
                      : 'border-white/5 bg-[#050816] text-slate-400'
                  }`}
                >
                  PCR Dispatch
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Screen Display */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="w-full max-w-lg p-6 rounded-[24px] bg-[#050816] border border-white/5 space-y-6 text-left relative overflow-hidden shadow-2xl">
              
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest font-mono">SANDBOX TELEMETRY</span>
                </div>
                <div className="text-[9px] font-mono text-slate-500">RELAY LINK STATUS: ONLINE</div>
              </div>

              {/* Dynamic waveform based on state */}
              <div className="h-28 bg-[#0B1023]/60 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d4ff02_1px,transparent_1px)] bg-[size:12px] opacity-30" />
                
                <div className="flex justify-between items-center w-full px-8 h-12 gap-0.5 relative z-10">
                  {Array.from({ length: 32 }).map((_, i) => {
                    let heightPercent = Math.random() * 30 + 15;
                    if (demoState === 'panic') {
                      heightPercent = Math.random() * 70 + 30;
                    } else if (demoState === 'dispatched') {
                      heightPercent = Math.random() * 40 + 20;
                    }
                    return (
                      <motion.div 
                        key={i} 
                        className={`w-1 rounded-full transition-all duration-300 ${
                          demoState === 'panic' 
                            ? 'bg-[#FF4D5A]/70' 
                            : demoState === 'dispatched' 
                              ? 'bg-[#00FFB2]/60' 
                              : 'bg-cyan-500/40'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                        animate={{ scaleY: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1 + Math.random(), delay: i * 0.02 }}
                      />
                    );
                  })}
                </div>

                <div className="absolute top-2 right-3 text-[8px] font-mono text-slate-500 tracking-wider">
                  {demoState === 'panic' ? 'BIOMETRIC ANOMALY SIGNAL' : 'AMBIENT MONITOR ACTIVE'}
                </div>
              </div>

              {/* Status details */}
              <div className="grid grid-cols-3 gap-4 text-xs font-semibold">
                <div className="p-3 bg-[#0B1023] rounded-xl border border-white/5 space-y-1">
                  <span className="text-[8px] text-slate-500">HEARTBEAT</span>
                  <div className="text-white font-mono flex items-baseline gap-1 font-bold text-[11px]">
                    <span className={demoState === 'panic' ? 'text-[#FF4D5A] animate-pulse' : 'text-white'}>{heartRate}</span>
                    <span className="text-[8px] text-slate-400 font-sans">BPM</span>
                  </div>
                </div>

                <div className="p-3 bg-[#0B1023] rounded-xl border border-white/5 space-y-1">
                  <span className="text-[8px] text-slate-500">G-ACCEL VECTOR</span>
                  <div className="text-white font-mono font-bold text-[11px]">
                    {demoState === 'panic' ? '4.8G (Anomaly)' : '1.0G (Stable)'}
                  </div>
                </div>

                <div className="p-3 bg-[#0B1023] rounded-xl border border-white/5 space-y-1">
                  <span className="text-[8px] text-slate-500">SAFETY CONFIDENCE</span>
                  <div className="text-[#00FFB2] font-mono font-bold text-[11px]">
                    {demoState === 'panic' ? '98.4% Crisis' : '99.8% Secured'}
                  </div>
                </div>
              </div>

              {/* Step info alert box */}
              <AnimatePresence mode="wait">
                {demoState === 'idle' && (
                  <motion.div 
                    key="idle-box"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-xl text-[10px] text-slate-400 font-medium"
                  >
                    Biometrics are tracking smoothly. Smartwatch fall check lines and voice passive acoustic guards are standing by.
                  </motion.div>
                )}
                {demoState === 'panic' && (
                  <motion.div 
                    key="panic-box"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-[#FF4D5A]/10 border border-[#FF4D5A]/20 rounded-xl text-[10px] text-slate-300 font-medium"
                  >
                    <strong>ALERT RESOLUTION QUEUED:</strong> Heartbeat spike matched with sudden high deceleration vectors. Automated SMS countdown (5s) initialized.
                  </motion.div>
                )}
                {demoState === 'dispatched' && (
                  <motion.div 
                    key="dispatched-box"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[10px] text-slate-300 font-medium"
                  >
                    <strong>PCR GATEWAY ACTIVE:</strong> Alert coordinates routed through cellular band to nearest police nodal center. Live GPS coordinates updating every 3s.
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </section>

      {/* How SafeCircle Works Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center relative z-10">
        <div className="space-y-4 mb-16 max-w-3xl mx-auto">
          <span className="text-[10px] uppercase font-black tracking-widest text-[#00FFB2] bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
            Nodal Deployment
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">How SafeCircle Protects You</h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Configured in minutes. Built to operate securely in low-connectivity areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -4 }}
              className="p-6 rounded-[24px] bg-[#0B1023]/60 border border-white/5 text-left space-y-4 relative overflow-hidden group shadow-md"
            >
              <div className="text-5xl font-black text-[#00D4FF]/5 font-mono absolute top-4 right-6 group-hover:text-[#00D4FF]/10 transition-colors">
                {step.step}
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#050816] border border-cyan-500/20 flex items-center justify-center text-[#00D4FF] group-hover:border-[#00FFB2] group-hover:text-[#00FFB2] transition-colors">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-[#00D4FF] transition-colors">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dynamic Statistics Section */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto text-center relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 bg-[#0B1023]/50 rounded-[20px] border border-white/5 space-y-1 relative">
              <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-cyan-500/5 pointer-events-none blur-lg" />
              <div className="text-2xl md:text-4xl font-extrabold text-white font-mono tracking-tight">{stat.value}</div>
              <div className="text-[8px] text-slate-500 uppercase tracking-widest font-black">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Future Roadmap / Wearables Section */}
      <section className="py-24 px-6 md:px-12 bg-[#0B1023]/40 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4 mb-16 text-center max-w-3xl mx-auto">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#00D4FF] bg-cyan-500/5 px-3 py-1 rounded-full border border-cyan-500/10">
              Future Roadmap
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Decentralized Hardware Integration</h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Our continuous research expands into wearable IoT devices, head-up displays, and autonomous response grids.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {futureConcepts.map((item, i) => (
              <div key={i} className="p-6 rounded-[24px] bg-[#050816]/80 border border-white/5 text-left space-y-4 shadow-lg group">
                <div className="w-10 h-10 rounded-xl bg-[#0B1023] border border-cyan-500/20 text-[#00D4FF] group-hover:text-[#00FFB2] group-hover:border-emerald-500/30 flex items-center justify-center transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center relative z-10">
        <div className="space-y-4 mb-16 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase font-black tracking-widest text-[#00FFB2] bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
            Nodal Audits
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Trusted by Commuter Networks</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((test, i) => (
            <div key={i} className="p-6 rounded-[24px] bg-[#0B1023]/60 border border-white/5 text-left flex flex-col justify-between space-y-5 relative shadow-lg">
              <p className="text-xs text-slate-300 italic leading-relaxed relative z-10">&ldquo;{test.quote}&rdquo;</p>
              <div>
                <div className="font-bold text-white text-xs uppercase tracking-wider">{test.author}</div>
                <div className="text-[9px] text-slate-500 mt-0.5">{test.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions FAQ Section */}
      <section className="py-24 px-6 md:px-12 bg-[#0B1023]/40 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 mb-16 text-center">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#00D4FF] bg-cyan-500/5 px-3 py-1 rounded-full border border-cyan-500/10">
              Information Nook
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">System FAQ</h2>
          </div>

          <div className="space-y-4 text-left">
            {faqs.map((faq, i) => {
              const isFaqOpen = activeFaq === i;
              return (
                <div 
                  key={i} 
                  className="p-5 rounded-[20px] bg-[#050816] border border-white/5 space-y-2 cursor-pointer transition-all hover:border-cyan-500/20"
                  onClick={() => setActiveFaq(isFaqOpen ? null : i)}
                >
                  <div className="flex justify-between items-center text-xs font-bold text-white">
                    <span>{faq.q}</span>
                    <span className="text-slate-500 text-lg leading-none font-light">{isFaqOpen ? '−' : '+'}</span>
                  </div>
                  
                  {isFaqOpen && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-xs text-slate-400 leading-relaxed font-medium pt-2 border-t border-white/5"
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Persistent Floating SOS Quick-Link Trigger */}
      <FloatingSOSButton />

      {/* Modern High-Tech Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
