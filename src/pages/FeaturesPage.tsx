import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  MapPin, 
  Volume2, 
  Activity, 
  Radio, 
  Glasses, 
  Watch, 
  Bot, 
  Flame, 
  Cpu, 
  FileText, 
  Network, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export const FeaturesPage: React.FC = () => {
  const navigate = useNavigate();

  const coreFeatures = [
    {
      title: "One-Tap SOS Dispatch",
      description: "Direct alerts triggered instantly to your designated emergency contact circle, along with automatic location map data routing.",
      icon: Shield
    },
    {
      title: "Geofenced Safe Zones",
      description: "Define custom tracking perimeters around your home, workplace, or route. Triggers automated warnings upon crossing boundary coordinates.",
      icon: MapPin
    },
    {
      title: "Acoustic Voice Panic Engine",
      description: "Always-on offline edge voice model detecting preset panic vocal triggers like 'help me now' or 'activate safecircle'.",
      icon: Volume2
    },
    {
      title: "Accelerometric Fall Detection",
      description: "Detects sudden G-force impact transitions indicative of falls or device crashes, initiating prompt confirmation countdowns.",
      icon: Activity
    }
  ];

  const futureFeatures = [
    {
      title: "Smart Glasses HUD Integration",
      description: "Render navigation direction markers and real-time safe zone color codes directly on compatible smart glass lenses.",
      icon: Glasses,
      badge: "Concept"
    },
    {
      title: "Wearable Device Support",
      description: "Offline BLE Bluetooth beacon integrations that alert your smartphone from up to 50 meters away.",
      icon: Radio,
      badge: "In Dev"
    },
    {
      title: "Smartwatch SOS Hook",
      description: "Activate SOS sequences directly from Apple Watch, WearOS, or Garmin widgets using customizable vibration tap codes.",
      icon: Watch,
      badge: "Concept"
    },
    {
      title: "AI Companion Guardian",
      description: "An automated voice call bot that rings you during walks in uncrowded dark locations, checking in on safety parameters.",
      icon: Bot,
      badge: "Beta"
    },
    {
      title: "Drone Emergency Response",
      description: "Autonomous drone dispatcher that pilots direct search-light coverage to your coordinate radius upon Active SOS triggers.",
      icon: Flame,
      badge: "Concept"
    },
    {
      title: "Nodal Police Integration",
      description: "Direct terminal hook to nearby regional PCR vans to share speed telemetry and live audio logs during active emergencies.",
      icon: Cpu,
      badge: "API Phase"
    },
    {
      title: "Hospital Trauma Dispatch",
      description: "Pre-alert blood type records, allergy profiles, and GPS collision coordinates to emergency rooms.",
      icon: FileText,
      badge: "Concept"
    },
    {
      title: "Women Safety Mutual Network",
      description: "Connect localized circles of verified nearby female responders to assist within a 500m radius before official dispatches arrive.",
      icon: Network,
      badge: "In Dev"
    }
  ];

  return (
    <div className="bg-[#050816] text-slate-100 min-h-screen flex flex-col justify-between relative overflow-hidden">
      
      {/* Decorative background grid and glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d4ff05_1px,transparent_1px),linear-gradient(to_bottom,#00d4ff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

      {/* Glass Floating Navigation */}
      <Navbar />

      {/* Main Body */}
      <main className="max-w-7xl mx-auto w-full px-6 pt-36 pb-20 relative z-10 text-left space-y-20">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/5 border border-cyan-500/20 text-xs font-bold text-[#00D4FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Operational Nodal Architecture</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Features Suite
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
            SafeCircle AI delivers a unified mesh of passive telemetry guards and automated emergency triggers. Learn about our active features and conceptual hardware blueprints.
          </p>
        </div>

        {/* Active Core Features Section */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FFB2]" />
              Active System Integrations
            </h2>
            <p className="text-[10px] text-slate-500 font-mono mt-1">READY FOR DIRECT TESTING IN ACTIVE NODES CONSOLE</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -4 }}
                className="p-6 rounded-[24px] bg-[#0B1023]/60 hover:bg-[#0B1023] border border-white/5 hover:border-cyan-500/30 flex flex-col justify-between space-y-4 shadow-lg transition-colors group"
              >
                <div className="p-3 rounded-2xl bg-[#050816] border border-cyan-500/20 text-[#00D4FF] group-hover:border-emerald-500/30 group-hover:text-[#00FFB2] w-fit transition-colors">
                  <feat.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-white group-hover:text-[#00D4FF] transition-colors">{feat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">{feat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Integrations Section */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              Future Roadmap Concepts
            </h2>
            <p className="text-[10px] text-slate-500 font-mono mt-1">DRAFT BLUEPRINTS & HARDWARE PROTOTYPING SCHEMES</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {futureFeatures.map((feat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -4 }}
                className="p-6 rounded-[24px] bg-[#0B1023]/30 hover:bg-[#0B1023]/60 border border-white/5 hover:border-cyan-500/20 flex flex-col justify-between space-y-4 relative group transition-colors shadow-md"
              >
                <span className="absolute top-4 right-4 text-[7px] font-black uppercase px-2 py-0.5 rounded bg-[#050816] text-[#00FFB2] border border-emerald-500/20">
                  {feat.badge}
                </span>
                <div className="p-3 rounded-2xl bg-[#050816]/80 border border-white/5 text-slate-500 group-hover:text-[#00D4FF] group-hover:border-cyan-500/30 transition-all w-fit">
                  <feat.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1 text-left">
                  <h3 className="font-bold text-xs text-slate-300 group-hover:text-white transition-colors uppercase tracking-wider">{feat.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium mt-1">{feat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action callout panel */}
        <div className="p-8 rounded-[24px] bg-gradient-to-r from-cyan-500/5 to-emerald-500/5 border border-cyan-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          {/* Subtle inside glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />

          <div className="space-y-1">
            <h3 className="font-bold text-base text-white">Ready to test the live simulator?</h3>
            <p className="text-xs text-slate-400 max-w-xl font-medium">
              You can trigger fake calls, test active accelerometer impact telemetry, verify geofence alerts, and preview safety score indicators right now.
            </p>
          </div>
          
          <button 
            onClick={() => navigate('/dashboard/sos')}
            className="px-6 py-3.5 font-bold text-xs uppercase tracking-widest rounded-full bg-[#00D4FF] hover:bg-[#00e1ff] text-slate-950 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all flex items-center gap-1.5 shrink-0 border border-[#00D4FF] cursor-pointer"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default FeaturesPage;
