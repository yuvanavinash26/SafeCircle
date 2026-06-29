import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'info';
  message: string;
}

interface ToastPlaceholderProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastPlaceholder: React.FC<ToastPlaceholderProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const typeConfig = {
            success: {
              icon: ShieldCheck,
              border: 'border-emerald-500/30',
              bg: 'bg-emerald-500/10 text-emerald-400'
            },
            warning: {
              icon: AlertTriangle,
              border: 'border-brand-red-500/30',
              bg: 'bg-brand-red-500/10 text-brand-red-400'
            },
            info: {
              icon: Info,
              border: 'border-brand-blue-500/30',
              bg: 'bg-brand-blue-500/10 text-brand-blue-400'
            }
          }[toast.type];

          const Icon = typeConfig.icon;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`p-4 rounded-xl glass-panel border ${typeConfig.border} flex items-center justify-between gap-4 pointer-events-auto shadow-2xl relative overflow-hidden text-left`}
            >
              <div className="flex gap-3 items-center">
                <div className={`p-2 rounded-lg ${typeConfig.bg}`}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
                <p className="text-xs font-semibold text-slate-200">{toast.message}</p>
              </div>

              <button
                onClick={() => onDismiss(toast.id)}
                className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
export default ToastPlaceholder;
