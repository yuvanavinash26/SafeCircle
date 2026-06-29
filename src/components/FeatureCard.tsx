import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
  onClick?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  badge,
  onClick
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div 
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick || toggleExpand}
      className={`p-6 rounded-[24px] bg-[#0B1023]/60 hover:bg-[#0B1023]/90 border border-white/5 hover:border-cyan-500/30 flex flex-col justify-between text-left h-full transition-all duration-300 relative overflow-hidden group shadow-lg ${
        onClick || true ? 'cursor-pointer' : ''
      }`}
    >
      {/* Glow highlight follow-mouse mockup */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-cyan-500/5 group-hover:bg-cyan-500/10 pointer-events-none transition-colors blur-xl" />

      <div className="space-y-4">
        {/* Header Icon & Optional Badge */}
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-2xl bg-[#050816] border border-cyan-500/20 text-[#00D4FF] group-hover:text-[#00FFB2] group-hover:border-emerald-500/30 transition-all duration-300">
            <Icon className="w-5 h-5" />
          </div>
          {badge && (
            <span className="text-[8px] font-black uppercase px-2 py-0.5 rounded-full bg-[#050816] text-[#00FFB2] border border-emerald-500/20">
              {badge}
            </span>
          )}
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-white group-hover:text-[#00D4FF] transition-colors">{title}</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">{description}</p>
          
          {/* Micro Expand details details for immersive UX */}
          {!onClick && (
            <div className="pt-1">
              <span className="text-[9px] text-[#00D4FF] group-hover:underline uppercase tracking-wider font-extrabold flex items-center gap-1">
                <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
                <span>&rarr;</span>
              </span>
              
              {isExpanded && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-[10px] text-slate-500 mt-2 leading-relaxed border-t border-white/5 pt-2"
                >
                  Fully integrated with SafeCircle Nodal servers to verify signal latency, encrypt telemetry indexes, and broadcast automated guardian triggers under 5 seconds.
                </motion.p>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
