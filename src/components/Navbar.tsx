import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-gradient-to-br from-brand-blue-500 to-brand-purple-600">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="font-bold text-white tracking-tight text-lg">SafeCircle</span>
          <span className="text-[10px] bg-brand-red-500/20 text-brand-red-400 border border-brand-red-500/30 font-bold px-1 rounded ml-1 font-mono">AI</span>
        </div>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <Link to="/features" className="hover:text-white transition-colors">Features</Link>
        <Link to="/about" className="hover:text-white transition-colors">About Team</Link>
      </div>

      {/* CTA Button */}
      <button 
        onClick={() => navigate('/dashboard/sos')}
        className="px-5 py-2 text-xs md:text-sm font-semibold rounded-xl bg-gradient-to-r from-brand-blue-600 to-brand-purple-600 hover:from-brand-blue-500 hover:to-brand-purple-500 text-white shadow-lg shadow-brand-purple-500/20 hover:shadow-brand-purple-500/35 transition-all flex items-center gap-1.5 border border-white/10 group"
      >
        <span>Open Console</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </nav>
  );
};
export default Navbar;
