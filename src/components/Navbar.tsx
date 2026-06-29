import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' }
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto rounded-full border border-white/5 bg-[#050816]/75 backdrop-blur-xl px-6 py-3.5 flex items-center justify-between shadow-2xl shadow-cyan-500/5 relative overflow-hidden"
      >
        {/* Decorative Grid Line inside Navbar */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d4ff05_1px,transparent_1px)] bg-[size:16px] pointer-events-none opacity-20" />

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 relative z-10 group">
          <div className="p-2 rounded-xl bg-[#0B1023] border border-cyan-500/25 text-[#00D4FF] group-hover:border-cyan-400 group-hover:shadow-[0_0_10px_rgba(0,212,255,0.2)] transition-all">
            <Shield className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-white tracking-tight text-base leading-none">SafeCircle</span>
            <span className="text-[8px] text-[#00FFB2] tracking-wider uppercase font-black font-mono mt-0.5 flex items-center gap-0.5">
              <Activity className="w-2 h-2 animate-pulse" />
              <span>Nodal AI Network</span>
            </span>
          </div>
        </Link>

        {/* Nav Links with custom animated underline indicator */}
        <div className="hidden md:flex items-center gap-8 relative z-10">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path}
                to={link.path} 
                className={`relative py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D4FF] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action button with Cyan Border highlights */}
        <button 
          onClick={() => navigate('/dashboard/sos')}
          className="relative px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full border border-cyan-500/30 hover:border-cyan-400 text-white bg-[#0B1023]/60 hover:bg-[#0B1023] hover:shadow-[0_0_15px_rgba(0,212,255,0.15)] transition-all flex items-center gap-2 group cursor-pointer z-10"
        >
          <span>Launch Console</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#00D4FF] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </motion.nav>
    </div>
  );
};

export default Navbar;
