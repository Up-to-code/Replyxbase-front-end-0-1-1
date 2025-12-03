import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 z-100 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#005bbc]/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#ffd600]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#005bbc]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative flex flex-col items-center z-10">
        {/* Animated Logo Container */}
        <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
          {/* Pulse Rings */}
          <div className="absolute inset-0 rounded-xl bg-[#005bbc]/20 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute inset-2 rounded-xl bg-[#ffd600]/20 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.2s' }} />
          
          {/* Core Logo */}
          <div className="relative w-16 h-16 bg-white rounded-xl border-2 border-slate-200 flex items-center justify-center z-10 overflow-hidden shadow-lg">
             <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white" />
             {/* Simple Geometric Logo Icon */}
             <div className="relative w-8 h-8 flex gap-1">
                <div className="w-4 h-8 bg-[#005bbc] rounded-l-lg animate-[pulse_1s_ease-in-out_infinite]" />
                <div className="w-4 h-8 bg-[#ffd600] rounded-r-lg animate-[pulse_1s_ease-in-out_infinite_0.2s]" />
             </div>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-1.5 bg-slate-200 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm">
          <div className="h-full bg-gradient-to-r from-[#005bbc] via-[#005bbc] to-[#ffd600] rounded-full" style={{
             width: '100%',
             transformOrigin: '0% 50%',
             animation: 'progress 1.5s ease-in-out infinite'
          }} />
        </div>
        
        {/* Text */}
        <div className="mt-6 text-sm font-semibold text-slate-700 animate-pulse">
          Initializing AI...
        </div>

        <style>{`
          @keyframes progress {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </div>
  );
}
