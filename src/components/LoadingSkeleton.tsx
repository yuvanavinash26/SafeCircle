import React from 'react';

interface LoadingSkeletonProps {
  count?: number;
  heightClass?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  count = 3, 
  heightClass = 'h-16' 
}) => {
  return (
    <div className="space-y-3 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className={`w-full ${heightClass} rounded-xl bg-slate-900 border border-slate-800/40 relative overflow-hidden`}
        >
          {/* Shimmer sweep animation overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-800/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          
          <div className="p-4 flex gap-4 items-center h-full">
            <div className="w-10 h-10 rounded-lg bg-slate-850 shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="w-1/3 h-3.5 bg-slate-850 rounded" />
              <div className="w-2/3 h-2.5 bg-slate-850 rounded" />
            </div>
          </div>
        </div>
      ))}
      
      {/* Dynamic Keyframes injected globally for shimmer */}
      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};
export default LoadingSkeleton;
