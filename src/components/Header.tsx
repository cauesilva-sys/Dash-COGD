import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Search, 
  X, 
  Clock, 
  Calendar, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Sun,
  Moon,
  BarChart3,
  Wrench
} from 'lucide-react';
import { GdSunLogo } from './GdSunLogo';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  totalLinks: number;
  filteredCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  totalLinks,
  filteredCount,
  isDark,
  onToggleTheme
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return (
    <header className={`relative sticky top-0 z-30 transition-colors duration-200 ${
      isDark 
        ? 'border-b border-slate-800 bg-[#05070a]/95 backdrop-blur-md grid-bg text-slate-100' 
        : 'border-b border-slate-200 bg-white/95 backdrop-blur-md text-slate-800 shadow-xs'
    }`}>
      {/* Top accent line */}
      <div className={`h-[2px] w-full ${
        isDark 
          ? 'bg-gradient-to-r from-cyan-500/30 via-cyan-400 to-amber-400/40 shadow-[0_0_10px_rgba(6,182,212,0.8)]'
          : 'bg-gradient-to-r from-sky-500 via-amber-400 to-blue-600'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Main top bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4">
          
          {/* Logo and Main Title: Principais Ferramentas */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* GD SUN official brand emblem logo */}
            <div className={`p-1 rounded-xl transition-all ${
              isDark ? 'bg-slate-900/80 border border-slate-800' : 'bg-slate-50 border border-slate-200'
            }`}>
              <GdSunLogo isDark={isDark} />
            </div>

            <div className="h-9 w-[1px] bg-slate-700/40 hidden sm:block" />

            <div>
              <div className="flex items-center gap-2">
                <span className={`font-mono-code text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 rounded ${
                  isDark ? 'text-amber-400 bg-amber-950/60 border border-amber-800/60' : 'text-amber-700 bg-amber-50 border border-amber-200'
                }`}>
                  COGD
                </span>
                <span className={`text-[10px] font-mono-code flex items-center gap-1 ${
                  isDark ? 'text-emerald-400' : 'text-emerald-600'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  OPERACIONAL
                </span>
              </div>

              {/* Required Header Title: "Principais Ferramentas" */}
              <h1 className={`text-lg sm:text-xl font-bold tracking-tight font-tech flex items-center gap-2 ${
                isDark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                <span>Principais Ferramentas</span>
              </h1>
            </div>
          </div>

          {/* Search Bar centered */}
          <div className="flex-1 max-w-md mx-0 md:mx-4">
            <div className="relative">
              <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`} />
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Filtrar links, plataformas ou usinas..."
                className={`w-full rounded-lg py-2 pl-9 pr-8 text-xs sm:text-sm transition-all font-sans focus:outline-none focus:ring-1 ${
                  isDark 
                    ? 'bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:ring-cyan-500' 
                    : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 focus:bg-white'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded ${
                    isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Limpar busca"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Group: Theme Switcher & Real-time Digital Clock */}
          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
            
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              title={isDark ? "Alternar para Modo Claro" : "Alternar para Modo Escuro"}
              aria-label="Alternador de tema"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer select-none ${
                isDark 
                  ? 'bg-slate-900/90 text-amber-300 border-slate-700 hover:border-amber-400 hover:bg-slate-800 hover:shadow-[0_0_10px_rgba(251,191,36,0.2)]' 
                  : 'bg-white text-slate-700 border-slate-300 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-700 shadow-xs'
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                  <span className="text-[11px] font-mono-code">Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-sky-600" />
                  <span className="text-[11px] font-mono-code">Modo Escuro</span>
                </>
              )}
            </button>

            {/* Real-time Digital Clock */}
            <div className="text-right shrink-0 border-l pl-3 border-slate-700/40">
              <div id="clock" className={`text-xl sm:text-2xl font-mono font-bold leading-none ${
                isDark ? 'neon-text-cyan' : 'text-sky-700 font-semibold'
              }`}>
                {formattedTime}
              </div>
              <div className={`text-[10px] uppercase font-medium tracking-tighter mt-0.5 ${
                isDark ? 'text-slate-500' : 'text-slate-500'
              }`}>
                {formattedDate}
              </div>
            </div>

          </div>
        </div>

        {/* Category Filter Pills Row */}
        <div className={`mt-3 pt-2.5 border-t flex items-center justify-between gap-2 ${
          isDark ? 'border-slate-800/80' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-all flex items-center gap-1.5 uppercase tracking-wider text-[11px] cursor-pointer ${
                selectedCategory === 'all'
                  ? (isDark ? 'bg-cyan-500 text-slate-950 shadow-[0_0_8px_rgba(6,182,212,0.4)]' : 'bg-sky-600 text-white shadow-xs')
                  : (isDark ? 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200' : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 hover:text-slate-900')
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Todos ({totalLinks})</span>
            </button>

            <button
              onClick={() => onSelectCategory('monitoring')}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-all flex items-center gap-1.5 uppercase tracking-wider text-[11px] cursor-pointer ${
                selectedCategory === 'monitoring'
                  ? (isDark ? 'bg-cyan-500 text-slate-950 shadow-[0_0_8px_rgba(6,182,212,0.4)]' : 'bg-sky-600 text-white shadow-xs')
                  : (isDark ? 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200' : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 hover:text-slate-900')
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>⚡ Monitoramento</span>
            </button>

            <button
              onClick={() => onSelectCategory('management')}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-all flex items-center gap-1.5 uppercase tracking-wider text-[11px] cursor-pointer ${
                selectedCategory === 'management'
                  ? (isDark ? 'bg-green-500 text-slate-950 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-emerald-600 text-white shadow-xs')
                  : (isDark ? 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200' : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 hover:text-slate-900')
              }`}
            >
              <ShieldCheck className="w-3 h-3" />
              <span>🛠️ Gestão & OS</span>
            </button>

            <button
              onClick={() => onSelectCategory('sheets')}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-all flex items-center gap-1.5 uppercase tracking-wider text-[11px] cursor-pointer ${
                selectedCategory === 'sheets'
                  ? (isDark ? 'bg-amber-500 text-slate-950 shadow-[0_0_8px_rgba(245,158,11,0.4)]' : 'bg-amber-600 text-white shadow-xs')
                  : (isDark ? 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200' : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 hover:text-slate-900')
              }`}
            >
              <BarChart3 className="w-3 h-3" />
              <span>📊 Planilhas e Escalas</span>
            </button>
          </div>

          <div className={`hidden sm:flex items-center gap-2 text-[10px] font-mono-code ${
            isDark ? 'text-slate-500' : 'text-slate-500'
          }`}>
            <span>PORTAL COGD</span>
            <span>•</span>
            <span className={isDark ? 'text-cyan-400 font-semibold' : 'text-sky-700 font-semibold'}>GD SUN</span>
          </div>
        </div>

        {/* Search Feedback */}
        {searchQuery && (
          <div className={`mt-2 text-xs flex items-center gap-1.5 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            <span>Resultados para <strong className={isDark ? "text-cyan-300 font-medium" : "text-sky-700 font-medium"}>"{searchQuery}"</strong>:</span>
            <span className={isDark ? "text-slate-200 font-semibold" : "text-slate-900 font-semibold"}>{filteredCount}</span>
            <span>item(ns) encontrado(s).</span>
          </div>
        )}
      </div>
    </header>
  );
};
