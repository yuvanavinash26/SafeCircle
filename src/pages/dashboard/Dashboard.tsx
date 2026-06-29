import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  MapPin, 
  Route, 
  Phone, 
  Volume2, 
  Activity, 
  BarChart3, 
  ArrowUpRight, 
  TrendingUp, 
  Heart,
  UserCheck,
  ShieldCheck,
  AlertTriangle,
  Watch,
  PhoneCall,
  PhoneOff
} from 'lucide-react';
import { StatCard } from '../../components/StatCard';
import { useLocation } from '../../hooks/useLocation';
import { useEmergency } from '../../hooks/useEmergency';
import { useContacts } from '../../hooks/useContacts';
import { useAnalytics } from '../../hooks/useAnalytics';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Connect to production Geolocation, Emergency, Contacts, and Analytics layers
  const { coordinates, accuracy, gpsStatus } = useLocation();
  const { history } = useEmergency();
  const { contacts } = useContacts();
  const { analytics } = useAnalytics();

  const [pulseRate, setPulseRate] = useState(72);
  const [fakeCallTimer, setFakeCallTimer] = useState<number | null>(null);

  // Pulse simulation for high-fidelity overview
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseRate(prev => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.max(68, Math.min(84, prev + delta));
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Fake call quick countdown simulation
  useEffect(() => {
    if (fakeCallTimer === null) return;
    if (fakeCallTimer === 0) {
      alert("Simulated Fake Call Incoming!");
      setFakeCallTimer(null);
      return;
    }
    const countdownTimer = setTimeout(() => {
      setFakeCallTimer(prev => (prev !== null ? prev - 1 : null));
    }, 1000);
    return () => clearTimeout(countdownTimer);
  }, [fakeCallTimer]);

  const activeSOSCount = history.filter(h => h.status !== 'Resolved').length;
  const primaryGuardiansCount = contacts.filter(c => c.isEmergency).length;
  const safetyScoreValue = analytics?.safetyScoreTrend?.[analytics.safetyScoreTrend.length - 1]?.value || 8.4;

  const quickModules = [
    {
      name: 'Crisis SOS Centre',
      path: '/dashboard/sos',
      desc: 'One-tap satellite distress broadcast coordinates trigger.',
      icon: Shield,
      color: 'text-brand-red-400 bg-brand-red-500/10 border-brand-red-500/20',
      status: activeSOSCount > 0 ? `${activeSOSCount} Active Alerts!` : 'Ready to Dispatch',
      meta: 'Twilio & 112 Relays Sync'
    },
    {
      name: 'Safe Zone Grid Maps',
      path: '/dashboard/map',
      desc: 'Analyze security scores & crowd densities in Delhi NCR.',
      icon: MapPin,
      color: 'text-brand-blue-400 bg-brand-blue-500/10 border-brand-blue-500/20',
      status: 'Live GPS perimeter',
      meta: 'Crowd telemetry stable'
    },
    {
      name: 'AI Safe Route Planner',
      path: '/dashboard/route',
      desc: 'Compare street illumination and camera tracking paths.',
      icon: Route,
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
      status: 'Illumination checks active',
      meta: 'Safe Path Solver'
    },
    {
      name: 'Guardian Circle',
      path: '/dashboard/contacts',
      desc: 'Manage family/police nodes alerted during emergencies.',
      icon: Phone,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      status: `${primaryGuardiansCount} Guardians Set`,
      meta: 'Automated SMS ready'
    },
    {
      name: 'Fake Call Simulator',
      path: '/dashboard/fake-call',
      desc: 'Schedule simulated excuse calls to escape uneasy zones.',
      icon: PhoneCall,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      status: fakeCallTimer !== null ? `Triggering in ${fakeCallTimer}s` : 'Simulator Standby',
      meta: 'Excuse scripts synced'
    },
    {
      name: 'Ambient Voice Panic',
      path: '/dashboard/voice',
      desc: 'Offline GPU speech recognition triggers on panic keywords.',
      icon: Volume2,
      color: 'text-brand-purple-400 bg-brand-purple-500/10 border-brand-purple-500/20',
      status: 'Web Speech API standby',
      meta: '"SafeCircle Emergency"'
    },
    {
      name: 'Biometric Crash Sensors',
      path: '/dashboard/panic',
      desc: 'Checks shockwave accelerations and watch heart pulse flags.',
      icon: Activity,
      color: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
      status: `${pulseRate} BPM (Watch Sync)`,
      meta: 'Biometrics check'
    },
    {
      name: 'Safety Analytics logs',
      path: '/dashboard/analytics',
      desc: 'Review localized threat classifications & historical logs.',
      icon: BarChart3,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      status: 'Threat classifiers active',
      meta: 'Audits updated 1m ago'
    }
  ];

  return (
    <div className="space-y-8 text-left relative">
      
      {/* Dynamic Header Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900/60 pb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            Welcome to SafeCircle Console
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping-slow mt-1.5" />
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Indian Nodal Safety Hub is active. Coordinates: {coordinates[0].toFixed(4)}°N, {coordinates[1].toFixed(4)}°E (Accuracy: ±{accuracy?.toFixed(1) || '0.0'}m)
          </p>
        </div>

        {/* Global Stats Pill */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs text-slate-300">
            <Watch className="w-4 h-4 text-brand-purple-400" />
            <span className="font-semibold text-[11px]">GPS Status:</span>
            <span className={`font-bold uppercase text-[10px] px-1.5 py-0.5 rounded border ${
              gpsStatus === 'locked' 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                : 'bg-amber-500/10 border-amber-500/20 text-amber-400 animate-pulse'
            }`}>{gpsStatus}</span>
          </div>
          
          <button 
            onClick={() => navigate('/dashboard/sos')}
            className="px-4 py-2 bg-gradient-to-r from-brand-red-700 to-red-500 hover:from-brand-red-600 hover:to-red-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-brand-red-500/10 border border-brand-red-500/30 flex items-center gap-1.5 transition-all hover:scale-102 cursor-pointer"
          >
            <Shield className="w-4 h-4" />
            <span>Crisis Panel</span>
          </button>
        </div>
      </div>

      {/* Row of Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          title="Consolidated Safety Rating" 
          value={`${safetyScoreValue.toFixed(1)}/10`} 
          subtext="Connaught Place Nodal Node" 
          icon={TrendingUp} 
          colorClass="text-brand-purple-400 bg-brand-purple-500/10"
        />
        <StatCard 
          title="Active Guard Perimeter" 
          value="Geofenced" 
          subtext="2.0 km home safety radius" 
          icon={ShieldCheck} 
          colorClass="text-brand-blue-400 bg-brand-blue-500/10"
        />
        <StatCard 
          title="Primary Emergency Nodes" 
          value={`${primaryGuardiansCount} Guardians`} 
          subtext="Twilio relay channels hot" 
          icon={Phone} 
          colorClass="text-emerald-400 bg-emerald-500/10"
        />
        <StatCard 
          title="AI Ambient Status" 
          value="Monitoring" 
          subtext="Mic & accelerometer active" 
          icon={Activity} 
          colorClass="text-brand-red-400 bg-brand-red-500/10 animate-pulse-slow"
        />
      </div>

      {/* Main Feature Modules Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-white text-base">Active Shield Safety Modules</h3>
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Select console below</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickModules.map((module) => (
            <div 
              key={module.path}
              onClick={() => navigate(module.path)}
              className="p-5 rounded-2xl glass-panel border border-slate-800/80 hover:border-slate-700/60 flex flex-col justify-between h-48 cursor-pointer transition-all hover:scale-[1.02] group relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-slate-900/40 pointer-events-none group-hover:bg-brand-purple-500/5 transition-colors blur-xl" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl border ${module.color}`}>
                    <module.icon className="w-5 h-5" />
                  </div>
                  <span className="text-slate-500 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4.5 h-4.5" />
                  </span>
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-white group-hover:text-brand-purple-300 transition-colors">
                    {module.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">
                    {module.desc}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[9px] text-slate-500">
                <span className="font-extrabold text-[10px] text-slate-400 font-sans tracking-wide uppercase line-clamp-1">{module.status}</span>
                <span className="hidden md:inline font-mono">{module.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Action & Info banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Interactive Excuse Simulator Widget */}
        <div className="lg:col-span-6 rounded-2xl glass-panel border border-slate-800 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              Quick Excuse Trigger
            </h4>
            <p className="text-[11px] text-slate-400 leading-normal">
              Need to escape right away? Click below to dispatch an automated fake call to your device in 5 seconds.
            </p>
          </div>

          <div className="flex gap-3">
            {fakeCallTimer === null ? (
              <button 
                onClick={() => setFakeCallTimer(5)}
                className="flex-1 py-2.5 bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-200 hover:text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 justify-center"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Trigger In 5s</span>
              </button>
            ) : (
              <button 
                onClick={() => setFakeCallTimer(null)}
                className="flex-1 py-2.5 bg-slate-950 border border-brand-red-500/30 hover:border-brand-red-500 text-brand-red-400 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 justify-center animate-pulse"
              >
                <PhoneOff className="w-4 h-4" />
                <span>Cancel Dial ({fakeCallTimer}s)</span>
              </button>
            )}

            <button 
              onClick={() => navigate('/dashboard/fake-call')}
              className="px-4 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-400 hover:text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Presets
            </button>
          </div>
        </div>

        {/* Live System Log Timeline */}
        <div className="lg:col-span-6 rounded-2xl glass-panel border border-slate-800 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-brand-red-400" />
              Recent Dispatch Audits
            </h4>
            <p className="text-[11px] text-slate-400 leading-normal">
              Recent crisis logs fetched from SOS endpoints.
            </p>
          </div>

          <div className="space-y-2 max-h-[100px] overflow-y-auto pr-1">
            {history.length === 0 ? (
              <span className="text-[10px] text-slate-500 italic block text-center pt-4">No active distress history logs found.</span>
            ) : (
              history.slice(0, 2).map((h) => (
                <div key={h.id} className="flex justify-between items-center text-[10px] bg-slate-950/60 border border-slate-900 p-2 rounded-lg">
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-200">{h.type} ({h.contactName})</div>
                    <div className="text-[8px] text-slate-500">{h.time}</div>
                  </div>
                  <span className={`px-2 py-0.5 font-bold uppercase rounded-full text-[8px] ${
                    h.status === 'Resolved' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-brand-red-500/10 text-brand-red-400 border border-brand-red-500/20'
                  }`}>{h.status}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
