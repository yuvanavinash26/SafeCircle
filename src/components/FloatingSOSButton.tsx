import React, { useState } from 'react';
import { ShieldAlert, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingSOSButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-4 rounded-full shadow-2xl shadow-brand-red-500/20 text-white flex items-center justify-center transition-all scale-100 hover:scale-105 border-2 outline-none cursor-pointer ${
            isOpen 
              ? 'bg-slate-900 border-slate-700 hover:bg-slate-800' 
              : 'bg-brand-red-600 border-brand-red-500 hover:bg-brand-red-500 animate-pulse-slow'
          }`}
        >
          {isOpen ? <X className="w-6 h-6 text-white" /> : <ShieldAlert className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Quick SOS Panel Drawer overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-30"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="fixed bottom-24 right-6 w-[340px] glass-panel border border-brand-red-500/30 rounded-2xl p-5 shadow-2xl z-30 overflow-hidden text-left"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red-600 to-amber-500 animate-pulse" />
              
              <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <div className="p-2 rounded-lg bg-brand-red-500/10 text-brand-red-400 border border-brand-red-500/20">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">Quick SOS Panel</h4>
                    <p className="text-[10px] text-slate-400">Ambience monitoring active</p>
                  </div>
                </div>

                <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-900/60 space-y-2">
                  <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Estimated Location</div>
                  <div className="text-xs text-white font-medium">South Extension, New Delhi (Accuracy: 12m)</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => { alert('SOS Activated via Quick Panel!'); setIsOpen(false); }}
                    className="py-2.5 rounded-xl bg-brand-red-600 hover:bg-brand-red-500 text-white font-bold text-xs shadow-lg shadow-brand-red-500/10 border border-brand-red-500/20"
                  >
                    Confirm Alert
                  </button>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default FloatingSOSButton;
