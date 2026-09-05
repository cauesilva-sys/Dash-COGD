import React, { useState } from 'react';
import { 
  ExternalLink, 
  Star, 
  Copy, 
  Check, 
  Cloud, 
  Sun, 
  Activity, 
  LineChart, 
  BellRing, 
  Cpu, 
  Wrench, 
  KeyRound, 
  Database, 
  CalendarDays,
  Zap,
  FolderOpen,
  Settings2,
  Maximize2,
  Flame
} from 'lucide-react';
import { LinkItem } from '../types';

interface LinkCardProps {
  item: LinkItem;
  customUrl?: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenEmbedded?: (type: 'access' | 'registry' | 'schedule') => void;
  onEditUrl?: (item: LinkItem) => void;
  isDark?: boolean;
}

export const LinkCard: React.FC<LinkCardProps> = ({
  item,
  customUrl,
  isFavorite,
  onToggleFavorite,
  onOpenEmbedded,
  onEditUrl,
  isDark = true
}) => {
  const [copied, setCopied] = useState(false);

  // Active URL (either custom or default)
  const activeUrl = customUrl || item.url;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (activeUrl) {
      navigator.clipboard.writeText(activeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Render icon based on name
  const renderIcon = () => {
    const iconClass = "w-4 h-4";
    switch (item.iconName) {
      case 'Cloud':
        return <Cloud className={`${iconClass} ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />;
      case 'Sun':
        return <Sun className={`${iconClass} ${isDark ? 'text-amber-400' : 'text-amber-500'}`} />;
      case 'Activity':
        return <Activity className={`${iconClass} ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />;
      case 'LineChart':
        return <LineChart className={`${iconClass} ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />;
      case 'BellRing':
        return <BellRing className={`${iconClass} ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />;
      case 'Cpu':
        return <Cpu className={`${iconClass} ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />;
      case 'Wrench':
        return <Wrench className={`${iconClass} ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />;
      case 'KeyRound':
        return <KeyRound className={`${iconClass} ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />;
      case 'Database':
        return <Database className={`${iconClass} ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />;
      case 'CalendarDays':
        return <CalendarDays className={`${iconClass} ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />;
      case 'Flame':
        return <Flame className={`${iconClass} ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />;
      default:
        return <Zap className={`${iconClass} ${isDark ? 'text-cyan-400' : 'text-sky-600'}`} />;
    }
  };

  const getBadgeStyle = () => {
    if (isDark) {
      switch (item.badgeColor) {
        case 'cyan':
          return 'bg-cyan-950 text-cyan-400 border-cyan-800';
        case 'emerald':
          return 'bg-green-950 text-green-400 border-green-800';
        case 'amber':
          return 'bg-amber-950 text-amber-400 border-amber-800';
        case 'purple':
          return 'bg-purple-950 text-purple-400 border-purple-800';
        case 'blue':
        default:
          return 'bg-sky-950 text-sky-400 border-sky-800';
      }
    } else {
      switch (item.badgeColor) {
        case 'cyan':
          return 'bg-sky-50 text-sky-700 border-sky-200';
        case 'emerald':
          return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        case 'amber':
          return 'bg-amber-50 text-amber-700 border-amber-200';
        case 'purple':
          return 'bg-purple-50 text-purple-700 border-purple-200';
        case 'blue':
        default:
          return 'bg-blue-50 text-blue-700 border-blue-200';
      }
    }
  };

  const isSpecialManagement = item.id === 'sismetro';
  const isDriveFolder = item.id === 'pasta-google-drive';
  const isSheet = item.categoryId === 'sheets';

  return (
    <div 
      id={`link-card-${item.id}`}
      className={`p-3.5 rounded-xl border transition-all duration-200 group flex flex-col justify-between ${
        isDark 
          ? `glass-card ${
              isDriveFolder ? 'border-amber-500/50 hover:border-amber-400 bg-amber-950/20' :
              isSheet ? 'border-slate-800 hover:border-amber-500/60' :
              isSpecialManagement ? 'border-emerald-800/80 hover:border-emerald-400 bg-emerald-950/20' :
              'border-slate-800 hover:border-cyan-500/50'
            }`
          : `bg-white shadow-xs hover:shadow-md ${
              isDriveFolder ? 'border-amber-300 hover:border-amber-500 bg-amber-50/30' :
              isSheet ? 'border-slate-200 hover:border-amber-500' :
              isSpecialManagement ? 'border-emerald-200 hover:border-emerald-500 bg-emerald-50/20' :
              'border-slate-200 hover:border-sky-500'
            }`
      }`}
    >
      <div>
        {/* Top bar: Icon, Title, Badge and Favorite Toggle */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
              isDark 
                ? 'bg-slate-900 border-slate-800 group-hover:border-cyan-500/40' 
                : 'bg-slate-50 border-slate-200 group-hover:border-sky-400'
            }`}>
              {renderIcon()}
            </div>
            
            <div className="min-w-0">
              <h3 className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                isDark 
                  ? (isSpecialManagement 
                      ? 'text-slate-100 group-hover:text-emerald-400' 
                      : isDriveFolder || isSheet
                      ? 'text-slate-100 group-hover:text-amber-300'
                      : 'text-slate-100 group-hover:text-cyan-400')
                  : (isSpecialManagement 
                      ? 'text-slate-900 group-hover:text-emerald-700' 
                      : isDriveFolder || isSheet
                      ? 'text-slate-900 group-hover:text-amber-700'
                      : 'text-slate-900 group-hover:text-sky-700')
              }`}>
                {item.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {item.badge && (
              <span className={`text-[9px] font-mono-code px-1.5 py-0.5 rounded border uppercase font-medium ${getBadgeStyle()}`}>
                {item.badge}
              </span>
            )}

            {/* Favorite Star */}
            <button
              onClick={() => onToggleFavorite(item.id)}
              title={isFavorite ? "Remover dos favoritos" : "Marcar como favorito"}
              className={`p-1 rounded transition-colors cursor-pointer ${
                isFavorite 
                  ? 'text-amber-400 hover:text-amber-300' 
                  : (isDark ? 'text-slate-600 hover:text-amber-300' : 'text-slate-300 hover:text-amber-500')
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className={`text-[11px] mb-3 leading-relaxed line-clamp-2 ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {item.description}
        </p>
      </div>

      {/* Action Buttons Section */}
      <div className={`pt-2.5 border-t mt-auto ${
        isDark ? 'border-slate-800/80' : 'border-slate-100'
      }`}>
        {/* If this has an embedded viewer (e.g. Planilha 1, 2, Escala) */}
        {item.embeddedType ? (
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => onOpenEmbedded && onOpenEmbedded(item.embeddedType!)}
              className={`w-full text-center text-[10px] py-1.5 px-2.5 rounded-lg font-bold uppercase tracking-wider border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                isDark 
                  ? 'bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border-amber-500/40' 
                  : 'bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white border-amber-300 shadow-xs'
              }`}
            >
              <Maximize2 className="w-3 h-3" />
              <span>{item.actionText}</span>
            </button>

            <div className={`flex items-center justify-between gap-1.5 text-[9px] ${
              isDark ? 'text-slate-500' : 'text-slate-500'
            }`}>
              {activeUrl ? (
                <a
                  href={activeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1 font-mono-code transition-colors ${
                    isDark ? 'hover:text-cyan-400' : 'hover:text-sky-600'
                  }`}
                >
                  <ExternalLink className="w-2.5 h-2.5" />
                  <span>Abrir no Drive</span>
                </a>
              ) : (
                <span className="font-mono-code text-[9px]">Base Integrada</span>
              )}

              {onEditUrl && (
                <button
                  onClick={() => onEditUrl(item)}
                  title="Configurar Link"
                  className={`flex items-center gap-0.5 transition-colors cursor-pointer ${
                    isDark ? 'hover:text-slate-300' : 'hover:text-slate-700'
                  }`}
                >
                  <Settings2 className="w-2.5 h-2.5 opacity-60" />
                  <span>{activeUrl ? 'Editar URL' : 'Vincular Link'}</span>
                </button>
              )}
            </div>
          </div>
        ) : isDriveFolder ? (
          /* Google Drive Folder Primary Button */
          <div className="space-y-1.5">
            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full text-center text-[11px] py-2 px-3 rounded-lg font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                isDark 
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.3)]' 
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>{item.actionText}</span>
              <ExternalLink className="w-3 h-3 stroke-[2.5]" />
            </a>
            <div className={`flex items-center justify-between text-[9px] font-mono-code ${
              isDark ? 'text-slate-500' : 'text-slate-500'
            }`}>
              <span>GOOGLE DRIVE OFICIAL</span>
              {activeUrl && (
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1 cursor-pointer transition-colors ${
                    isDark ? 'hover:text-amber-400' : 'hover:text-amber-600'
                  }`}
                  title="Copiar URL"
                >
                  {copied ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Copy className="w-2.5 h-2.5" />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
              )}
            </div>
          </div>
        ) : isSpecialManagement ? (
          /* Sismetro Primary Management Style */
          <div className="space-y-1.5">
            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full text-center text-[11px] py-2 px-3 rounded-lg font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                isDark 
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-[0_0_12px_rgba(34,197,94,0.35)]' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <span>{item.actionText}</span>
              <ExternalLink className="w-3 h-3 stroke-[2.5]" />
            </a>
            <div className={`flex items-center justify-between text-[9px] font-mono-code ${
              isDark ? 'text-slate-500' : 'text-slate-500'
            }`}>
              <span>ORDENS DE SERVIÇO & O&M</span>
              {activeUrl && (
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1 cursor-pointer transition-colors ${
                    isDark ? 'hover:text-emerald-400' : 'hover:text-emerald-600'
                  }`}
                  title="Copiar URL"
                >
                  {copied ? <Check className="w-2.5 h-2.5 text-emerald-500" /> : <Copy className="w-2.5 h-2.5" />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Standard Direct Link Button */
          <div className="flex items-center justify-between gap-2">
            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[10px] sm:text-[11px] px-3.5 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs ${
                isDark 
                  ? 'bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200' 
                  : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}
            >
              <span>{item.actionText}</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>

            {activeUrl && (
              <button
                onClick={handleCopy}
                title="Copiar link"
                className={`p-1 text-[10px] transition-colors cursor-pointer rounded ${
                  isDark ? 'text-slate-500 hover:text-cyan-400' : 'text-slate-400 hover:text-sky-600'
                }`}
              >
                {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
