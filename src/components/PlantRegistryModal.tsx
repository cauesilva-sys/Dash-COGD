import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  Database, 
  MapPin, 
  Phone, 
  MessageSquare, 
  User, 
  ExternalLink,
  Building,
  FileSpreadsheet
} from 'lucide-react';
import { PLANT_REGISTRY_DATA } from '../data/plantRegistryData';

interface PlantRegistryModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export const PlantRegistryModal: React.FC<PlantRegistryModalProps> = ({ 
  isOpen, 
  onClose,
  isDark = true 
}) => {
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
        p.siglaNova.toLowerCase().includes(q) ||
        p.siglaAntiga.toLowerCase().includes(q) ||
        p.disco.toLowerCase().includes(q) ||
        p.supervisor.toLowerCase().includes(q) ||
        p.offtaker.toLowerCase().includes(q);

      if (!matchSearch) return false;
      if (selectedUf !== 'all' && p.uf !== selectedUf) return false;
      if (selectedOfftaker !== 'all' && p.offtaker !== selectedOfftaker) return false;

      return true;
    });
  }, [search, selectedUf, selectedOfftaker]);

  if (!isOpen) return null;

  const sheetsUrl = "https://drive.google.com/drive/folders/14FaEk1JqV-VH1ynO9-j_c0ExnphaK9Tk";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`rounded-2xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden transition-all duration-200 ${
          isDark 
            ? 'bg-[#090e17] border border-emerald-500/40 text-slate-100 shadow-[0_0_50px_rgba(16,185,129,0.25)]' 
            : 'bg-white border border-slate-200 text-slate-900 shadow-2xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`p-4 sm:p-5 border-b flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 ${
          isDark 
            ? 'border-emerald-900/40 bg-slate-900/90 text-slate-100' 
            : 'border-slate-200 bg-slate-50 text-slate-900'
        }`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
              isDark 
                ? 'bg-emerald-950 border-emerald-500/50 text-emerald-400' 
                : 'bg-emerald-50 border-emerald-300 text-emerald-700'
            }`}>
              <Database className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className={`font-tech text-xs uppercase px-2 py-0.5 rounded border ${
                  isDark 
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800' 
                    : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                }`}>
                  Planilha de Operações 2
                </span>
                <span className={`text-xs font-mono-code hidden sm:inline ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {PLANT_REGISTRY_DATA.length} Parques e Usinas Solares
                </span>
              </div>
              <h2 className={`text-base sm:text-xl font-bold font-tech truncate ${
                isDark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                Cadastro Geral & Especificações Técnicas das Usinas
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 ml-auto sm:ml-0">
            {/* Direct Google Sheets Link Button */}
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
              <FileSpreadsheet className="w-4 h-4 text-emerald-300 sm:w-4 sm:h-4" />
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
              isDark ? 'text-emerald-400' : 'text-slate-400'
            }`} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por usina, sigla, concessionária (CPFL, Coelba, CEMIG, etc.) ou supervisor..."
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-sm border focus:outline-none transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-700/80 text-slate-100 placeholder-slate-500 focus:border-emerald-400'
                  : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-600'
              }`}
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedUf}
              onChange={(e) => setSelectedUf(e.target.value)}
              className={`text-xs px-3 py-2 rounded-xl border focus:outline-none transition-colors ${
                isDark 
                  ? 'bg-slate-900 border-slate-700 text-slate-300 focus:border-emerald-400' 
                  : 'bg-white border-slate-300 text-slate-700 focus:border-emerald-600'
              }`}
            >
              <option value="all">Todos os Estados (UF)</option>
              {ufs.map(uf => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>

            <select
              value={selectedOfftaker}
              onChange={(e) => setSelectedOfftaker(e.target.value)}
              className={`text-xs px-3 py-2 rounded-xl border focus:outline-none max-w-[160px] truncate transition-colors ${
                isDark 
                  ? 'bg-slate-900 border-slate-700 text-slate-300 focus:border-emerald-400' 
                  : 'bg-white border-slate-300 text-slate-700 focus:border-emerald-600'
              }`}
            >
              <option value="all">Todos os Clientes</option>
              {offtakers.map(off => (
                <option key={off} value={off}>{off}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Plant List */}
        <div className={`flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 ${
          isDark ? 'bg-[#070b12]' : 'bg-slate-50'
        }`}>
          {filteredPlants.length === 0 ? (
            <div className={`text-center py-12 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              <Database className="w-12 h-12 mx-auto mb-3 opacity-60" />
              <p className="text-base">Nenhuma usina encontrada para o filtro selecionado.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
              {filteredPlants.map((plant, idx) => (
                <div 
                  key={`${plant.usina}-${idx}`}
                  className={`rounded-xl p-4 transition-all border ${
                    isDark
                      ? 'bg-slate-900/80 hover:bg-slate-900 border-slate-800/90 hover:border-emerald-500/40 text-slate-100'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 hover:border-emerald-400 text-slate-800 shadow-xs'
                  }`}
                >
                  {/* Top line with plant name, status, and Google Maps link */}
                  <div className={`flex items-start justify-between border-b pb-3 mb-3 ${
                    isDark ? 'border-slate-800' : 'border-slate-100'
                  }`}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded font-mono-code text-xs font-semibold border ${
                          isDark 
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800/70' 
                            : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                        }`}>
                          {plant.siglaNova || plant.siglaAntiga}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-mono-code ${
                          isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                        }`}>
                          UF: {plant.uf}
                        </span>
                        <span className={`text-xs font-medium ${
                          isDark ? 'text-emerald-400' : 'text-emerald-700 font-semibold'
                        }`}>
                          {plant.status}
                        </span>
                      </div>

                      <h3 className={`font-bold font-tech text-base mt-1 ${
                        isDark ? 'text-slate-100' : 'text-slate-900'
                      }`}>
                        {plant.usina}
                      </h3>
                    </div>

                    {plant.googleMapsUrl && (
                      <a
                        href={plant.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                          isDark 
                            ? 'bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border-emerald-800/80' 
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                        }`}
                        title="Ver no Google Maps"
                      >
                        <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Maps</span>
                      </a>
                    )}
                  </div>

                  {/* Technical Specs Bento Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs mb-3">
                    <div className={`p-2 rounded-lg border ${
                      isDark ? 'bg-slate-950/70 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Potência</span>
                      <span className={`font-bold font-mono-code ${
                        isDark ? 'text-cyan-300' : 'text-sky-700'
                      }`}>{plant.potenciaKwac} kWac</span>
                      <span className={`text-[10px] block font-mono-code ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>{plant.potenciaKwp} kWp</span>
                    </div>

                    <div className={`p-2 rounded-lg border ${
                      isDark ? 'bg-slate-950/70 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Inversores</span>
                      <span className={`font-medium truncate block ${
                        isDark ? 'text-slate-200' : 'text-slate-800'
                      }`} title={plant.inversores}>
                        {plant.inversores || 'N/A'}
                      </span>
                      <span className={`text-[10px] block ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        Qtd: {plant.qtdInversores || '-'}
                      </span>
                    </div>

                    <div className={`p-2 rounded-lg border col-span-2 sm:col-span-1 ${
                      isDark ? 'bg-slate-950/70 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                    }`}>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Cliente / Offtaker</span>
                      <span className={`font-semibold truncate block ${
                        isDark ? 'text-emerald-300' : 'text-emerald-700'
                      }`} title={plant.offtaker}>
                        {plant.offtaker}
                      </span>
                      <span className={`text-[10px] block ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        Cluster: {plant.cluster || '-'}
                      </span>
                    </div>
                  </div>

                  {/* Concessionária & Atendimento */}
                  <div className={`p-2.5 rounded-lg text-xs space-y-1 mb-2.5 border ${
                    isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50/80 border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`flex items-center gap-1 font-medium ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        DisCo: <span className={isDark ? 'text-slate-200 font-semibold' : 'text-slate-900 font-semibold'}>{plant.disco}</span>
                      </span>
                      {plant.contatoDisCo && (
                        <a 
                          href={`tel:${plant.contatoDisCo.replace(/\s+/g, '')}`}
                          className="text-cyan-500 hover:text-cyan-600 flex items-center gap-1 font-mono-code text-[11px]"
                        >
                          <Phone className="w-3 h-3" />
                          {plant.contatoDisCo}
                        </a>
                      )}
                    </div>

                    <div className={`flex flex-wrap gap-x-3 text-[11px] font-mono-code ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      <span>Cód Instalação: <strong className={isDark ? 'text-slate-200' : 'text-slate-900'}>{plant.codInstalacao || '-'}</strong></span>
                      <span>Medidor: <strong className={isDark ? 'text-slate-200' : 'text-slate-900'}>{plant.medidor || '-'}</strong></span>
                    </div>

                    {plant.whatsappDisCo && (
                      <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-mono-code">
                        <MessageSquare className="w-3 h-3" />
                        <span>WhatsApp DisCo: {plant.whatsappDisCo}</span>
                      </div>
                    )}
                  </div>

                  {/* Operação / Equipe */}
                  <div className={`flex items-center justify-between text-[11px] px-1 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      Supervisor: <strong className={isDark ? 'text-slate-300' : 'text-slate-800'}>{plant.supervisor || '-'}</strong>
                    </span>
                    <span>
                      OS: <strong className={isDark ? 'text-slate-300' : 'text-slate-800'}>{plant.responsavelOS || '-'}</strong>
                    </span>
                  </div>

                  {plant.endereco && (
                    <div className={`text-[10px] truncate mt-1 px-1 ${
                      isDark ? 'text-slate-500' : 'text-slate-500'
                    }`}>
                      {plant.endereco}
                    </div>
                  )}
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
            <span>Cadastro Geral de Parques Fotovoltaicos • GD Sun O&M</span>
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
