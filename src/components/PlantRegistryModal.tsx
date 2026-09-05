import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  Database, 
  MapPin, 
  Zap, 
  Phone, 
  MessageSquare, 
  User, 
  ExternalLink,
  ShieldCheck,
  Building,
  Gauge
} from 'lucide-react';
import { PLANT_REGISTRY_DATA } from '../data/plantRegistryData';
import { PlantRegistry } from '../types';

interface PlantRegistryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlantRegistryModal: React.FC<PlantRegistryModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedUf, setSelectedUf] = useState<string>('all');
  const [selectedOfftaker, setSelectedOfftaker] = useState<string>('all');

  const ufs = useMemo(() => {
    const list = Array.from(new Set(PLANT_REGISTRY_DATA.map(p => p.uf).filter(Boolean)));
    return list.sort();
  }, []);

  const offtakers = useMemo(() => {
    const list = Array.from(new Set(PLANT_REGISTRY_DATA.map(p => p.offtaker).filter(Boolean)));
    return list.sort();
  }, []);

  const filteredPlants = useMemo(() => {
    return PLANT_REGISTRY_DATA.filter(p => {
      const q = search.toLowerCase();
      const matchSearch = 
        p.usina.toLowerCase().includes(q) ||
        p.siglaAntiga.toLowerCase().includes(q) ||
        p.siglaNova.toLowerCase().includes(q) ||
        p.disco.toLowerCase().includes(q) ||
        p.supervisor.toLowerCase().includes(q) ||
        p.responsavelOS.toLowerCase().includes(q) ||
        p.endereco.toLowerCase().includes(q);

      if (!matchSearch) return false;
      if (selectedUf !== 'all' && p.uf !== selectedUf) return false;
      if (selectedOfftaker !== 'all' && p.offtaker !== selectedOfftaker) return false;

      return true;
    });
  }, [search, selectedUf, selectedOfftaker]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#090e17] border border-emerald-500/40 rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-[0_0_50px_rgba(16,185,129,0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-emerald-900/40 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-tech text-xs uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Planilha de Operações 2
                </span>
                <span className="text-xs text-slate-400 font-mono-code hidden sm:inline">
                  {PLANT_REGISTRY_DATA.length} Parques e Usinas Solares
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-100 font-tech">
                Cadastro Geral & Especificações Técnicas das Usinas
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
            <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por usina, sigla, concessionária (CPFL, Coelba, CEMIG, etc.) ou supervisor..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedUf}
              onChange={(e) => setSelectedUf(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-slate-300 px-3 py-2 rounded-xl focus:outline-none focus:border-emerald-400"
            >
              <option value="all">Todos os Estados (UF)</option>
              {ufs.map(uf => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>

            <select
              value={selectedOfftaker}
              onChange={(e) => setSelectedOfftaker(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-slate-300 px-3 py-2 rounded-xl focus:outline-none focus:border-emerald-400 max-w-[160px] truncate"
            >
              <option value="all">Todos os Clientes</option>
              {offtakers.map(off => (
                <option key={off} value={off}>{off}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Plant List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {filteredPlants.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Database className="w-12 h-12 mx-auto mb-3 text-slate-600" />
              <p className="text-base">Nenhuma usina encontrada para o filtro selecionado.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
              {filteredPlants.map((plant, idx) => (
                <div 
                  key={`${plant.usina}-${idx}`}
                  className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-emerald-500/40 rounded-xl p-4 transition-all"
                >
                  {/* Top line with plant name, status, and Google Maps link */}
                  <div className="flex items-start justify-between border-b border-slate-800 pb-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono-code text-xs font-semibold border border-emerald-800/70">
                          {plant.siglaNova || plant.siglaAntiga}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono-code">
                          UF: {plant.uf}
                        </span>
                        <span className="text-xs text-emerald-400 font-medium">
                          {plant.status}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-100 font-tech text-base mt-1">
                        {plant.usina}
                      </h3>
                    </div>

                    {plant.googleMapsUrl && (
                      <a
                        href={plant.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-800/80 text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap"
                        title="Ver no Google Maps"
                      >
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Maps</span>
                      </a>
                    )}
                  </div>

                  {/* Technical Specs Bento Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs mb-3">
                    <div className="bg-slate-950/70 border border-slate-800/80 p-2 rounded-lg">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Potência</span>
                      <span className="font-bold text-cyan-300 font-mono-code">{plant.potenciaKwac} kWac</span>
                      <span className="text-[10px] text-slate-400 block font-mono-code">{plant.potenciaKwp} kWp</span>
                    </div>

                    <div className="bg-slate-950/70 border border-slate-800/80 p-2 rounded-lg">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Inversores</span>
                      <span className="font-medium text-slate-200 truncate block" title={plant.inversores}>
                        {plant.inversores || 'N/A'}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        Qtd: {plant.qtdInversores || '-'}
                      </span>
                    </div>

                    <div className="bg-slate-950/70 border border-slate-800/80 p-2 rounded-lg col-span-2 sm:col-span-1">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Cliente / Offtaker</span>
                      <span className="font-semibold text-emerald-300 truncate block" title={plant.offtaker}>
                        {plant.offtaker}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        Cluster: {plant.cluster || '-'}
                      </span>
                    </div>
                  </div>

                  {/* Concessionária & Atendimento */}
                  <div className="bg-slate-950/50 border border-slate-800/80 p-2.5 rounded-lg text-xs space-y-1 mb-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1 font-medium">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        DisCo: <span className="text-slate-200">{plant.disco}</span>
                      </span>
                      {plant.contatoDisCo && (
                        <a 
                          href={`tel:${plant.contatoDisCo.replace(/\s+/g, '')}`}
                          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono-code text-[11px]"
                        >
                          <Phone className="w-3 h-3" />
                          {plant.contatoDisCo}
                        </a>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-x-3 text-[11px] text-slate-400 font-mono-code">
                      <span>Cód Instalação: <strong className="text-slate-200">{plant.codInstalacao || '-'}</strong></span>
                      <span>Medidor: <strong className="text-slate-200">{plant.medidor || '-'}</strong></span>
                    </div>

                    {plant.whatsappDisCo && (
                      <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono-code">
                        <MessageSquare className="w-3 h-3" />
                        <span>WhatsApp DisCo: {plant.whatsappDisCo}</span>
                      </div>
                    )}
                  </div>

                  {/* Operação / Equipe */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-500" />
                      Supervisor: <strong className="text-slate-300">{plant.supervisor || '-'}</strong>
                    </span>
                    <span>
                      OS: <strong className="text-slate-300">{plant.responsavelOS || '-'}</strong>
                    </span>
                  </div>

                  {plant.endereco && (
                    <div className="text-[10px] text-slate-500 truncate mt-1 px-1">
                      {plant.endereco}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Cadastro Geral de Parques Fotovoltaicos • GD Sun O&M</span>
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
