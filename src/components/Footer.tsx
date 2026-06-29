import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="glass-panel border-t border-white/5 py-12 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-brand-purple-600/5 blur-[80px] pointer-events-none" />
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 relative z-10 text-left">
        
        {/* Info Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-brand-blue-500 to-brand-purple-600">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white tracking-tight">SafeCircle AI</span>
          </div>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            Revolutionizing personal safety across India using cutting-edge AI panic detection, geofenced voice assist, and community-driven safe routing.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors">
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Features Suite</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/dashboard/sos" className="hover:text-white transition-colors">SOS Dashboard</Link></li>
            <li><Link to="/dashboard/map" className="hover:text-white transition-colors">Live Safe Map</Link></li>
            <li><Link to="/dashboard/route" className="hover:text-white transition-colors">Safe Routes</Link></li>
            <li><Link to="/dashboard/panic" className="hover:text-white transition-colors">AI Panic Sensor</Link></li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Info</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link to="/about" className="hover:text-white transition-colors">Hackathon Team</Link></li>
            <li><Link to="/features" className="hover:text-white transition-colors">Documentation</Link></li>
            <li><a href="https://www.india.gov.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Helplines portal</a></li>
          </ul>
        </div>

      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 relative z-10">
        <p>&copy; {new Date().getFullYear()} SafeCircle AI. Built for India Hackathons.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 text-brand-red-500 fill-brand-red-500" /> in India
        </p>
      </div>
    </footer>
  );
};
export default Footer;
