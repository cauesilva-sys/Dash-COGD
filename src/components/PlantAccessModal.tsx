import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  Copy, 
  Check, 
  KeyRound, 
  Monitor, 
  Cpu, 
  Camera, 
  Plug, 
  ShieldAlert, 
  Filter,
  ExternalLink
} from 'lucide-react';
import { PLANT_ACCESS_DATA } from '../data/plantAccessData';
import { PlantAccess } from '../types';

interface PlantAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlantAccessModal: React.FC<PlantAccessModalProps> = ({ isOpen, onClose }) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#090e17] border border-cyan-500/40 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-cyan-900/40 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-tech text-xs uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Planilha de Operações 1
                </span>
                <span className="text-xs text-slate-400 font-mono-code hidden sm:inline">
                  {PLANT_ACCESS_DATA.length} Usinas Cadastradas
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-100 font-tech">
                Acessos Remotos, Anydesk, IPs & CFTV das Usinas
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por usina, sigla (ex: AGU, CAN, BJL), Anydesk ou IP..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap ${
                filterType === 'all'
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              Todas ({PLANT_ACCESS_DATA.length})
            </button>
            <button
              onClick={() => setFilterType('smartlogger')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap flex items-center gap-1 ${
                filterType === 'smartlogger'
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-3 h-3 text-cyan-400" />
              <span>Smartlogger</span>
            </button>
            <button
              onClick={() => setFilterType('cftv')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap flex items-center gap-1 ${
                filterType === 'cftv'
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Camera className="w-3 h-3 text-emerald-400" />
              <span>CFTV / Câmeras</span>
            </button>
            <button
              onClick={() => setFilterType('tomada')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap flex items-center gap-1 ${
                filterType === 'tomada'
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Plug className="w-3 h-3 text-sky-400" />
              <span>Tomada Inteligente</span>
            </button>
          </div>
        </div>

        {/* Content Table / Cards */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {filteredPlants.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <ShieldAlert className="w-12 h-12 mx-auto mb-3 text-slate-600" />
              <p className="text-base">Nenhuma usina encontrada com os critérios de busca.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
              {filteredPlants.map((plant, idx) => (
                <div 
                  key={`${plant.usina}-${idx}`}
                  className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-cyan-500/40 rounded-xl p-4 transition-all"
                >
                  {/* Plant Header */}
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono-code text-xs font-semibold border border-cyan-800/70">
                        {plant.sigla || 'UFV'}
                      </span>
                      <h3 className="font-bold text-slate-100 font-tech text-base">
                        {plant.usina}
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono-code">
                      Proj: {plant.proj || '-'}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    
                    {/* Anydesk PC GDSun */}
                    <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5">
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="flex items-center gap-1 font-medium text-slate-300">
                          <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                          Anydesk GDSun
                        </span>
                        <span className="text-[10px] text-emerald-400">
                          {plant.pcGdsun === 'Sim' ? '✓ Ativo' : plant.pcGdsun || '-'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between bg-slate-900/90 px-2 py-1.5 rounded font-mono-code text-cyan-300 mb-1">
                        <span className="truncate">{plant.loginAnydesk || 'N/A'}</span>
                        {plant.loginAnydesk && plant.loginAnydesk !== 'N/A' && (
                          <button
                            onClick={() => handleCopy(plant.loginAnydesk, `${plant.usina}-anydesk-login`)}
                            className="p-1 hover:text-white"
                            title="Copiar ID Anydesk"
                          >
                            {copiedKey === `${plant.usina}-anydesk-login` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>

                      {plant.senhaAnydesk && plant.senhaAnydesk !== 'N/A' && (
                        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                          <span>Senha: <span className="text-slate-200 font-mono-code">{plant.senhaAnydesk}</span></span>
                          <button
                            onClick={() => handleCopy(plant.senhaAnydesk, `${plant.usina}-anydesk-pass`)}
                            className="p-0.5 hover:text-cyan-300"
                            title="Copiar senha"
                          >
                            {copiedKey === `${plant.usina}-anydesk-pass` ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Smartlogger */}
                    <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5">
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="flex items-center gap-1 font-medium text-slate-300">
                          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                          Smartlogger
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono-code">
                          {plant.smartloggerPossui === 'Sim' ? 'IP Interno' : 'Sem SL'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between bg-slate-900/90 px-2 py-1.5 rounded font-mono-code text-cyan-300 mb-1">
                        <span className="truncate">{plant.smartloggerIp || 'N/A'}</span>
                        {plant.smartloggerIp && plant.smartloggerIp !== 'N/A' && (
                          <button
                            onClick={() => handleCopy(plant.smartloggerIp, `${plant.usina}-sl-ip`)}
                            className="p-1 hover:text-white"
                            title="Copiar IP Smartlogger"
                          >
                            {copiedKey === `${plant.usina}-sl-ip` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}
                      </div>

                      {plant.smartloggerLogin && plant.smartloggerLogin !== 'N/A' && (
                        <div className="text-[10px] text-slate-400 truncate">
                          User: <span className="text-slate-200">{plant.smartloggerLogin}</span> | Pwd: <span className="text-slate-200">{plant.smartloggerSenha}</span>
                        </div>
                      )}
                    </div>

                    {/* CFTV Câmeras */}
                    <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5">
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="flex items-center gap-1 font-medium text-slate-300">
                          <Camera className="w-3.5 h-3.5 text-emerald-400" />
                          CFTV ({plant.cftvPlataforma || 'N/A'})
                        </span>
                        {plant.cftvStatus && (
                          <span className={`text-[10px] font-mono-code ${
                            plant.cftvStatus.toLowerCase().includes('operacional') ? 'text-emerald-400' : 'text-amber-400'
                          }`}>
                            {plant.cftvStatus}
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-300 font-mono-code truncate">
                        SN/Acesso: {plant.cftvSn || plant.cftvTipoAcesso || 'N/A'}
                      </div>
                      {plant.cftvLogin && (
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">
                          User: <span className="text-slate-200">{plant.cftvLogin}</span> | Pwd: <span className="text-slate-200">{plant.cftvSenha}</span>
                        </div>
                      )}
                    </div>

                    {/* Tomada Inteligente / Tracker */}
                    <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-2.5">
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="flex items-center gap-1 font-medium text-slate-300">
                          <Plug className="w-3.5 h-3.5 text-sky-400" />
                          Tomada / Tracker
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {plant.tomadaPossui === 'Sim' ? plant.tomadaApp : 'N/A'}
                        </span>
                      </div>

                      {plant.tomadaLogin ? (
                        <div className="text-[10px] text-slate-300 font-mono-code truncate">
                          App: {plant.tomadaApp} | User: {plant.tomadaLogin}
                        </div>
                      ) : plant.loginTracker && plant.loginTracker !== 'N/A' ? (
                        <div className="text-[10px] text-slate-300 font-mono-code truncate">
                          Tracker Any: {plant.loginTracker} ({plant.senhaTracker})
                        </div>
                      ) : (
                        <div className="text-[10px] text-slate-500">
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
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Dados do Centro de Operação GD Sun (COGD)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
