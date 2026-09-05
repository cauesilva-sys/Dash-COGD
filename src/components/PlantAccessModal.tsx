import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  KeyRound, 
  ExternalLink, 
  Copy, 
  Check, 
  Monitor, 
  Camera, 
  Cpu, 
  Plug, 
  ShieldAlert,
  FileSpreadsheet
} from 'lucide-react';
import { PLANT_ACCESS_DATA } from '../data/plantAccessData';

interface PlantAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export const PlantAccessModal: React.FC<PlantAccessModalProps> = ({ 
  isOpen, 
  onClose,
  isDark = true 
}) => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'cftv' | 'smartlogger' | 'tomada'>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, keyId: string) => {
    if (!text || text === 'N/A') return;
    navigator.clipboard.writeText(text.trim());
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const filteredPlants = useMemo(() => {
    return PLANT_ACCESS_DATA.filter(item => {
      const q = search.toLowerCase();
      const matchSearch = 
        item.usina.toLowerCase().includes(q) ||
        item.sigla.toLowerCase().includes(q) ||
        item.loginAnydesk.toLowerCase().includes(q) ||
        item.smartloggerIp.toLowerCase().includes(q) ||
        item.cftvPlataforma.toLowerCase().includes(q);

      if (!matchSearch) return false;

      if (filterType === 'cftv') return item.cftvPlataforma && item.cftvPlataforma !== 'N/A';
      if (filterType === 'smartlogger') return item.smartloggerPossui === 'Sim';
      if (filterType === 'tomada') return item.tomadaPossui === 'Sim';

      return true;
    });
  }, [search, filterType]);

  if (!isOpen) return null;

  const sheetsUrl = "https://drive.google.com/drive/folders/14FaEk1JqV-VH1ynO9-j_c0ExnphaK9Tk";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden transition-all duration-200 ${
          isDark 
            ? 'bg-[#090e17] border border-cyan-500/40 text-slate-100 shadow-[0_0_50px_rgba(6,182,212,0.25)]' 
            : 'bg-white border border-slate-200 text-slate-900 shadow-2xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`p-4 sm:p-5 border-b flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 ${
          isDark 
            ? 'border-cyan-900/40 bg-slate-900/90 text-slate-100' 
            : 'border-slate-200 bg-slate-50 text-slate-900'
        }`}>
          {/* Title and Icon */}
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
              isDark 
                ? 'bg-cyan-950 border-cyan-500/50 text-cyan-400' 
                : 'bg-cyan-50 border-cyan-200 text-cyan-700'
            }`}>
              <KeyRound className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className={`font-tech text-xs uppercase px-2 py-0.5 rounded border ${
                  isDark 
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-800' 
                    : 'bg-cyan-100 text-cyan-800 border-cyan-200'
                }`}>
                  Planilha de Operações 1
                </span>
                <span className={`text-xs font-mono-code hidden sm:inline ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {PLANT_ACCESS_DATA.length} Usinas Cadastradas
                </span>
              </div>
              <h2 className={`text-base sm:text-xl font-bold font-tech truncate ${
                isDark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                Acessos Remotos, Anydesk, IPs & CFTV das Usinas
              </h2>
            </div>
          </div>

          {/* Area marked in RED: Direct Link to Google Sheets + Close Button */}
          <div className="flex items-center gap-2.5 shrink-0 ml-auto sm:ml-0">
            {/* Direct Google Sheets / Drive Link Button */}
            <a
              href={sheetsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold uppercase transition-all shadow-xs ${
                isDark
                  ? 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/60 hover:border-emerald-400'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600 hover:shadow-md'
              }`}
              title="Abrir pasta e planilhas oficiais no Google Sheets / Drive em nova aba"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400 sm:w-4 sm:h-4" />
              <span>Abrir no Google Sheets</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors ${
                isDark 
                  ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
              }`}
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className={`p-4 border-b flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 ${
          isDark 
            ? 'bg-slate-950/60 border-slate-800' 
            : 'bg-slate-100/70 border-slate-200'
        }`}>
          <div className="relative flex-1">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${
              isDark ? 'text-cyan-400' : 'text-slate-400'
            }`} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por usina, sigla (ex: AGU, CAN, BJL), Anydesk ou IP..."
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-sm border focus:outline-none transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-700/80 text-slate-100 placeholder-slate-500 focus:border-cyan-400'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-600'
              }`}
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
                filterType === 'all'
                  ? isDark 
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-500' 
                    : 'bg-cyan-600 text-white border-cyan-600'
                  : isDark 
                    ? 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Todas ({PLANT_ACCESS_DATA.length})
            </button>
            <button
              onClick={() => setFilterType('smartlogger')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                filterType === 'smartlogger'
                  ? isDark 
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-500' 
                    : 'bg-cyan-600 text-white border-cyan-600'
                  : isDark 
                    ? 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>Smartlogger</span>
            </button>
            <button
              onClick={() => setFilterType('cftv')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                filterType === 'cftv'
                  ? isDark 
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-500' 
                    : 'bg-cyan-600 text-white border-cyan-600'
                  : isDark 
                    ? 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Camera className="w-3 h-3 text-emerald-400" />
              <span>CFTV / Câmeras</span>
            </button>
            <button
              onClick={() => setFilterType('tomada')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                filterType === 'tomada'
                  ? isDark 
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-500' 
                    : 'bg-cyan-600 text-white border-cyan-600'
                  : isDark 
                    ? 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Plug className="w-3 h-3 text-sky-400" />
              <span>Tomada Inteligente</span>
            </button>
          </div>
        </div>

        {/* Content Table / Cards */}
        <div className={`flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 ${
          isDark ? 'bg-[#070b12]' : 'bg-slate-50'
        }`}>
          {filteredPlants.length === 0 ? (
            <div className={`text-center py-12 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              <ShieldAlert className="w-12 h-12 mx-auto mb-3 opacity-60" />
              <p className="text-base">Nenhuma usina encontrada com os critérios de busca.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
              {filteredPlants.map((plant, idx) => (
                <div 
                  key={`${plant.usina}-${idx}`}
                  className={`rounded-xl p-4 transition-all border ${
                    isDark
                      ? 'bg-slate-900/80 hover:bg-slate-900 border-slate-800/90 hover:border-cyan-500/40 text-slate-100'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-sky-400 text-slate-800 shadow-xs'
                  }`}
                >
                  {/* Plant Header */}
                  <div className={`flex items-center justify-between border-b pb-2.5 mb-3 ${
                    isDark ? 'border-slate-800/80' : 'border-slate-100'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded font-mono-code text-xs font-semibold border ${
                        isDark 
                          ? 'bg-cyan-950 text-cyan-300 border-cyan-800/70' 
                          : 'bg-cyan-100 text-cyan-800 border-cyan-200'
                      }`}>
                        {plant.sigla || 'UFV'}
                      </span>
                      <h3 className={`font-bold font-tech text-base ${
                        isDark ? 'text-slate-100' : 'text-slate-900'
                      }`}>
                        {plant.usina}
                      </h3>
                    </div>
                    <span className={`text-[11px] font-mono-code ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      Proj: {plant.proj || '-'}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    
                    {/* Anydesk PC GDSun */}
                    <div className={`rounded-lg p-2.5 border ${
                      isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`flex items-center gap-1 font-medium ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          <Monitor className="w-3.5 h-3.5 text-cyan-500" />
                          Anydesk GDSun
                        </span>
                        <span className={`text-[10px] font-semibold ${
                          isDark ? 'text-emerald-400' : 'text-emerald-600'
                        }`}>
                          {plant.pcGdsun === 'Sim' ? '✓ Ativo' : plant.pcGdsun || '-'}
                        </span>
                      </div>
                      
                      <div className={`flex items-center justify-between px-2 py-1.5 rounded font-mono-code mb-1 border ${
                        isDark 
                          ? 'bg-slate-900/90 text-cyan-300 border-slate-800' 
                          : 'bg-white text-cyan-800 border-slate-200 shadow-2xs'
                      }`}>
                        <span className="truncate font-bold">{plant.loginAnydesk || 'N/A'}</span>
                        {plant.loginAnydesk && plant.loginAnydesk !== 'N/A' && (
                          <button
                            onClick={() => handleCopy(plant.loginAnydesk, `${plant.usina}-anydesk-login`)}
                            className={`p-1 transition-colors ${
                              isDark ? 'hover:text-white text-slate-400' : 'hover:text-slate-900 text-slate-500'
                            }`}
                            title="Copiar ID Anydesk"
                          >
                            {copiedKey === `${plant.usina}-anydesk-login` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>

                      {plant.senhaAnydesk && plant.senhaAnydesk !== 'N/A' && (
                        <div className={`flex items-center justify-between text-[11px] px-1 ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          <span>Senha: <span className={`font-mono-code font-bold ${
                            isDark ? 'text-slate-200' : 'text-slate-900'
                          }`}>{plant.senhaAnydesk}</span></span>
                          <button
                            onClick={() => handleCopy(plant.senhaAnydesk, `${plant.usina}-anydesk-pass`)}
                            className="p-0.5 hover:text-cyan-500"
                            title="Copiar senha"
                          >
                            {copiedKey === `${plant.usina}-anydesk-pass` ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Smartlogger */}
                    <div className={`rounded-lg p-2.5 border ${
                      isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`flex items-center gap-1 font-medium ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          <Cpu className="w-3.5 h-3.5 text-cyan-500" />
                          Smartlogger
                        </span>
                        <span className={`text-[10px] font-mono-code ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          {plant.smartloggerPossui === 'Sim' ? 'IP Interno' : 'Sem SL'}
                        </span>
                      </div>
                      
                      <div className={`flex items-center justify-between px-2 py-1.5 rounded font-mono-code mb-1 border ${
                        isDark 
                          ? 'bg-slate-900/90 text-cyan-300 border-slate-800' 
                          : 'bg-white text-cyan-800 border-slate-200 shadow-2xs'
                      }`}>
                        <span className="truncate font-bold">{plant.smartloggerIp || 'N/A'}</span>
                        {plant.smartloggerIp && plant.smartloggerIp !== 'N/A' && (
                          <button
                            onClick={() => handleCopy(plant.smartloggerIp, `${plant.usina}-sl-ip`)}
                            className={`p-1 transition-colors ${
                              isDark ? 'hover:text-white text-slate-400' : 'hover:text-slate-900 text-slate-500'
                            }`}
                            title="Copiar IP Smartlogger"
                          >
                            {copiedKey === `${plant.usina}-sl-ip` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>

                      {plant.smartloggerLogin && plant.smartloggerLogin !== 'N/A' && (
                        <div className={`text-[10px] truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          User: <span className={isDark ? 'text-slate-200 font-bold' : 'text-slate-900 font-bold'}>{plant.smartloggerLogin}</span> | Pwd: <span className={isDark ? 'text-slate-200 font-bold' : 'text-slate-900 font-bold'}>{plant.smartloggerSenha}</span>
                        </div>
                      )}
                    </div>

                    {/* CFTV Câmeras */}
                    <div className={`rounded-lg p-2.5 border ${
                      isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`flex items-center gap-1 font-medium ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          <Camera className="w-3.5 h-3.5 text-emerald-500" />
                          CFTV ({plant.cftvPlataforma || 'N/A'})
                        </span>
                        {plant.cftvStatus && (
                          <span className={`text-[10px] font-mono-code ${
                            plant.cftvStatus.toLowerCase().includes('operacional') 
                              ? (isDark ? 'text-emerald-400' : 'text-emerald-700 font-semibold')
                              : (isDark ? 'text-amber-400' : 'text-amber-700 font-semibold')
                          }`}>
                            {plant.cftvStatus}
                          </span>
                        )}
                      </div>

                      <div className={`text-[11px] font-mono-code truncate ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        SN/Acesso: {plant.cftvSn || plant.cftvTipoAcesso || 'N/A'}
                      </div>
                      {plant.cftvLogin && (
                        <div className={`text-[10px] truncate mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          User: <span className={isDark ? 'text-slate-200 font-bold' : 'text-slate-900 font-bold'}>{plant.cftvLogin}</span> | Pwd: <span className={isDark ? 'text-slate-200 font-bold' : 'text-slate-900 font-bold'}>{plant.cftvSenha}</span>
                        </div>
                      )}
                    </div>

                    {/* Tomada Inteligente / Tracker */}
                    <div className={`rounded-lg p-2.5 border ${
                      isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`flex items-center gap-1 font-medium ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          <Plug className="w-3.5 h-3.5 text-sky-500" />
                          Tomada / Tracker
                        </span>
                        <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {plant.tomadaPossui === 'Sim' ? plant.tomadaApp : 'N/A'}
                        </span>
                      </div>

                      {plant.tomadaLogin ? (
                        <div className={`text-[10px] font-mono-code truncate ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          App: {plant.tomadaApp} | User: {plant.tomadaLogin}
                        </div>
                      ) : plant.loginTracker && plant.loginTracker !== 'N/A' ? (
                        <div className={`text-[10px] font-mono-code truncate ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          Tracker Any: {plant.loginTracker} ({plant.senhaTracker})
                        </div>
                      ) : (
                        <div className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                          Sem tomada inteligente configurada
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
          isDark 
            ? 'border-slate-800 bg-slate-950/80 text-slate-400' 
            : 'border-slate-200 bg-slate-50 text-slate-600'
        }`}>
          <div className="flex items-center gap-2">
            <span>Dados do Centro de Operação GD Sun (COGD)</span>
            <span>•</span>
            <a
              href={sheetsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:underline flex items-center gap-1 font-medium"
            >
              <span>Abrir pasta no Google Drive</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl font-medium transition-colors cursor-pointer ${
              isDark 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' 
                : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
            }`}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
