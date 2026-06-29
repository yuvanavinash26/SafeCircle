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
  Cpu, 
  Bot, 
  Flame, 
  Network, 
  FileText,
  Lock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    <div className="bg-brand-dark-950 text-slate-100 min-h-screen flex flex-col justify-between relative overflow-hidden grid-bg">
      <Navbar />

      {/* Decorative Orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-brand-purple-600/10 blur-[120px] pointer-events-none" />

      {/* Main Body */}
      <main className="max-w-7xl mx-auto w-full px-6 pt-32 pb-20 relative z-10 text-left space-y-20">
        
        {/* Page Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue-500/10 border border-brand-blue-500/20 text-xs font-bold text-brand-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Sandbox Available</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Features Suite
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            SafeCircle AI offers a multi-layered ecosystem of defensive measures. Review active features and upcoming hardware conceptual integrations.
          </p>
        </div>

        {/* Active Core Features Section */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Active System Integrations
            </h2>
            <p className="text-xs text-slate-500 mt-1">Ready for sandbox testing in the Dashboard Console.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feat, i) => (
              <div key={i} className="p-6 rounded-2xl glass-panel border border-slate-800/80 flex flex-col justify-between space-y-4">
                <div className="p-3 rounded-xl bg-brand-blue-500/10 border border-brand-blue-500/20 text-brand-blue-400 w-fit">
                  <feat.icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-white">{feat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Integrations Section */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-purple-500 animate-pulse" />
              Future Roadmap Integrations
            </h2>
            <p className="text-xs text-slate-500 mt-1">Concept drafts and hardware blueprints under development.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {futureFeatures.map((feat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-brand-dark-900/40 border border-slate-900 flex flex-col justify-between space-y-4 relative group hover:border-brand-purple-500/20 transition-colors">
                <span className="absolute top-4 right-4 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-950 text-slate-500 border border-slate-800">
                  {feat.badge}
                </span>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 text-slate-500 group-hover:text-brand-purple-400 group-hover:bg-brand-purple-500/5 transition-all w-fit">
                  <feat.icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-slate-300 group-hover:text-white transition-colors">{feat.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-brand-blue-900/40 to-brand-purple-900/40 border border-brand-purple-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-white">Ready to test the live simulator?</h3>
            <p className="text-xs text-slate-400 max-w-xl">
              You can trigger fake calls, test active accelerometer impact telemetry, verify geofence alerts, and preview safety score indicators right now.
            </p>
          </div>
          <button 
            onClick={() => navigate('/dashboard/sos')}
            className="px-6 py-3 font-bold text-xs rounded-xl bg-white hover:bg-slate-100 text-brand-dark-950 transition-all flex items-center gap-1.5 shrink-0"
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
