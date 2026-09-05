import React from 'react';

interface GdSunLogoProps {
  className?: string;
  isDark?: boolean;
  compact?: boolean;
}

export const GdSunLogo: React.FC<GdSunLogoProps> = ({ 
  className = "h-11", 
  isDark = true,
  compact = false 
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Visual Solar Wing Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg 
          viewBox="0 0 100 80" 
          className="w-9 h-8 drop-shadow-sm transition-transform hover:scale-105"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 4 Angled Solar Rays / Panels in gradient yellow */}
          <defs>
            <linearGradient id="solarGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#FACC15" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
            <linearGradient id="cyanBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>

          {/* Top ray */}
          <path d="M5 5 L95 48 L75 51 L18 13 Z" fill="url(#solarGold)" />
          {/* Second ray */}
          <path d="M10 18 L95 56 L78 60 L24 26 Z" fill="url(#solarGold)" />
          {/* Third ray */}
          <path d="M18 31 L95 65 L80 69 L32 39 Z" fill="url(#solarGold)" />
          {/* Fourth ray */}
          <path d="M26 44 L95 74 L82 78 L40 52 Z" fill="url(#solarGold)" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-baseline tracking-tight font-black font-sans text-xl sm:text-2xl">
          <span className={isDark ? "text-cyan-400" : "text-sky-600"}>GD</span>
          <span className={isDark ? "text-blue-400" : "text-blue-800"}>SUN</span>
        </div>
        {!compact && (
          <span className={`text-[8.5px] font-medium tracking-normal mt-0.5 whitespace-nowrap ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}>
            Energia sustentável ao seu alcance
          </span>
        )}
      </div>
    </div>
  );
};
