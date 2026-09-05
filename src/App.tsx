import React, { useState, useEffect, useMemo } from 'react';
import { 
  Zap, 
  Wrench, 
  BarChart3, 
  Star, 
  Layers, 
  Compass, 
  Radio, 
  Sun, 
  Server, 
  ShieldCheck, 
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Database,
  Calendar,
  KeyRound,
  Eye,
  Settings,
  FolderOpen
} from 'lucide-react';
import { Header } from './components/Header';
import { LinkCard } from './components/LinkCard';
import { PlantAccessModal } from './components/PlantAccessModal';
import { PlantRegistryModal } from './components/PlantRegistryModal';
import { ShiftScheduleModal } from './components/ShiftScheduleModal';
import { EditUrlModal } from './components/EditUrlModal';
import { CATEGORIES, DEFAULT_LINKS } from './data/links';
import { LinkItem } from './types';

export default function App() {
  // Theme state: dark mode by default, persisted
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('gdsun_theme');
      return (saved === 'light' || saved === 'dark') ? saved : 'dark';
    } catch {
      return 'dark';
    }
  });

  const isDark = theme === 'dark';

  useEffect(() => {
    try {
      localStorage.setItem('gdsun_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gdsun_favorites');
      return saved ? JSON.parse(saved) : ['monitoramento-gdsun', 'huawei-fusionsolar', 'sismetro', 'pasta-google-drive'];
    } catch {
      return ['monitoramento-gdsun', 'huawei-fusionsolar', 'sismetro', 'pasta-google-drive'];
    }
  });

  const [customUrls, setCustomUrls] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('gdsun_custom_urls');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Modals state
  const [activeEmbedded, setActiveEmbedded] = useState<'access' | 'registry' | 'schedule' | null>(null);
  const [editingItem, setEditingItem] = useState<LinkItem | null>(null);

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gdsun_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Sync customUrls with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gdsun_custom_urls', JSON.stringify(customUrls));
    } catch (e) {
      console.error(e);
    }
  }, [customUrls]);

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSaveCustomUrl = (id: string, url: string) => {
    setCustomUrls(prev => ({
      ...prev,
      [id]: url
    }));
  };

  // Filter links based on search query and category
  const filteredLinks = useMemo(() => {
    return DEFAULT_LINKS.filter(link => {
      const query = searchQuery.toLowerCase().trim();
      const matchQuery = !query || 
        link.title.toLowerCase().includes(query) ||
        link.description.toLowerCase().includes(query) ||
        link.tags.some(tag => tag.toLowerCase().includes(query)) ||
        (link.badge && link.badge.toLowerCase().includes(query));

      const matchCategory = selectedCategory === 'all' || link.categoryId === selectedCategory;

      return matchQuery && matchCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Favorite items
  const favoriteLinks = useMemo(() => {
    return DEFAULT_LINKS.filter(link => favorites.includes(link.id));
  }, [favorites]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      isDark 
        ? 'bg-[#05070a] text-slate-100 selection:bg-cyan-500 selection:text-black' 
        : 'bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white'
    }`}>
      
      {/* Dynamic Header with Real-time Clock, Logo, "Principais Ferramentas" Title, and Theme Switcher */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        totalLinks={DEFAULT_LINKS.length}
        filteredCount={filteredLinks.length}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-6">
        
        {/* Quick Operations Banner */}
        <section className={`relative overflow-hidden rounded-xl border p-4 sm:p-5 transition-all ${
          isDark 
            ? 'border-slate-800 glass-card grid-bg text-slate-100' 
            : 'border-slate-200 bg-white shadow-xs text-slate-800'
        }`}>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className={`text-[10px] uppercase font-mono-code font-bold tracking-widest ${
                  isDark ? 'text-emerald-400' : 'text-emerald-700'
                }`}>
                  Cluster Operacional GD Sun
                </span>
              </div>
              <h2 className={`text-base sm:text-lg font-bold font-tech uppercase tracking-tight ${
                isDark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                Central Integrada de Monitoramento & Telemetria Solar
              </h2>
              <p className={`text-xs max-w-2xl leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Acesso direto às ferramentas de supervisão fotovoltaica, gestão de alarmes SmartPVMS, ordens de serviço e pasta oficial de planilhas no Google Drive.
              </p>
            </div>

            {/* Quick KPI indicators */}
            <div className="grid grid-cols-3 gap-2.5 w-full md:w-auto shrink-0">
              <div className={`px-3 py-2 rounded-lg text-center border transition-colors ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[9px] text-slate-500 uppercase block font-mono-code">Usinas</span>
                <span className={`text-base font-bold font-mono-code ${isDark ? 'text-cyan-400' : 'text-sky-600'}`}>50+</span>
              </div>
              <div className={`px-3 py-2 rounded-lg text-center border transition-colors ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[9px] text-slate-500 uppercase block font-mono-code">Monitoramento</span>
                <span className={`text-base font-bold font-mono-code ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>6 Nós</span>
              </div>
              <div className={`px-3 py-2 rounded-lg text-center border transition-colors ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="text-[9px] text-slate-500 uppercase block font-mono-code">Operação</span>
                <span className={`text-base font-bold font-mono-code ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>COGD</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Favorites (if any) */}
        {!searchQuery && selectedCategory === 'all' && favoriteLinks.length > 0 && (
          <section id="favorites-section" className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-xs font-bold">★</span>
              <h2 className={`text-xs font-bold uppercase tracking-wider ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Acesso Rápido & Favoritos
              </h2>
              <span className="text-[10px] text-slate-500 font-mono-code">({favoriteLinks.length})</span>
              <div className={`h-px flex-1 ml-2 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {favoriteLinks.map(link => (
                <LinkCard
                  key={`fav-${link.id}`}
                  item={link}
                  customUrl={customUrls[link.id]}
                  isFavorite={true}
                  onToggleFavorite={handleToggleFavorite}
                  onOpenEmbedded={setActiveEmbedded}
                  onEditUrl={setEditingItem}
                  isDark={isDark}
                />
              ))}
            </div>
          </section>
        )}

        {/* 3 Columns when "all" is active and no search */}
        {!searchQuery && selectedCategory === 'all' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            
            {/* Column 1: ⚡ Monitoramento */}
            {(() => {
              const cat = CATEGORIES.find(c => c.id === 'monitoring')!;
              const items = filteredLinks.filter(item => item.categoryId === 'monitoring');
              return (
                <section key="col-monitoring" className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-bold text-xs">⚡</span>
                    <h2 className={`text-xs font-bold uppercase tracking-wider ${
                      isDark ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      1. Monitoramento
                    </h2>
                    <span className={`text-[10px] font-mono-code ${
                      isDark ? 'text-cyan-400' : 'text-sky-600'
                    }`}>
                      ({items.length})
                    </span>
                    <div className={`h-px flex-1 ml-1 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
                  </div>

                  <div className="grid gap-3">
                    {items.map(item => (
                      <LinkCard
                        key={item.id}
                        item={item}
                        customUrl={customUrls[item.id]}
                        isFavorite={favorites.includes(item.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onOpenEmbedded={setActiveEmbedded}
                        onEditUrl={setEditingItem}
                        isDark={isDark}
                      />
                    ))}
                  </div>
                </section>
              );
            })()}

            {/* Column 2: 🛠️ Gestão & OS */}
            {(() => {
              const cat = CATEGORIES.find(c => c.id === 'management')!;
              const items = filteredLinks.filter(item => item.categoryId === 'management');
              return (
                <section key="col-management" className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold text-xs">🛠️</span>
                    <h2 className={`text-xs font-bold uppercase tracking-wider ${
                      isDark ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      2. Gestão & OS
                    </h2>
                    <span className={`text-[10px] font-mono-code ${
                      isDark ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      ({items.length})
                    </span>
                    <div className={`h-px flex-1 ml-1 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
                  </div>

                  <div className="grid gap-3">
                    {items.map(item => (
                      <LinkCard
                        key={item.id}
                        item={item}
                        customUrl={customUrls[item.id]}
                        isFavorite={favorites.includes(item.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onOpenEmbedded={setActiveEmbedded}
                        onEditUrl={setEditingItem}
                        isDark={isDark}
                      />
                    ))}
                  </div>

                  {/* Operational Guide Note */}
                  <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                    isDark 
                      ? 'bg-slate-900/60 border-slate-800 text-slate-400' 
                      : 'bg-white border-slate-200 text-slate-600 shadow-xs'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold uppercase text-[10px] text-emerald-500 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Procedimento Operacional</span>
                    </div>
                    <p className="text-[11px]">
                      Abertura de ordens de serviço no <strong>Sismetro</strong> obrigatória para todas as anomalias e atuações de campo identificadas nos inversores.
                    </p>
                  </div>
                </section>
              );
            })()}

            {/* Column 3: 📊 Planilhas e Escalas */}
            {(() => {
              const cat = CATEGORIES.find(c => c.id === 'sheets')!;
              const items = filteredLinks.filter(item => item.categoryId === 'sheets');
              return (
                <section key="col-sheets" className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold text-xs">📊</span>
                    <h2 className={`text-xs font-bold uppercase tracking-wider ${
                      isDark ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      3. Planilhas e Escalas
                    </h2>
                    <span className={`text-[10px] font-mono-code ${
                      isDark ? 'text-amber-400' : 'text-amber-600'
                    }`}>
                      ({items.length})
                    </span>
                    <div className={`h-px flex-1 ml-1 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
                  </div>

                  <div className="grid gap-3">
                    {items.map(item => (
                      <LinkCard
                        key={item.id}
                        item={item}
                        customUrl={customUrls[item.id]}
                        isFavorite={favorites.includes(item.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onOpenEmbedded={setActiveEmbedded}
                        onEditUrl={setEditingItem}
                        isDark={isDark}
                      />
                    ))}
                  </div>

                  {/* Status dos Sistemas Block */}
                  <div className={`p-3.5 rounded-xl border transition-all ${
                    isDark 
                      ? 'glass-card border-slate-800' 
                      : 'bg-white border-slate-200 shadow-xs'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`text-[10px] uppercase font-bold tracking-widest font-mono-code ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        Status dos Sistemas
                      </h4>
                      <span className={`text-[9px] font-mono-code font-bold ${
                        isDark ? 'text-emerald-400' : 'text-emerald-600'
                      }`}>
                        7/7 OPERACIONAIS
                      </span>
                    </div>

                    <div className="grid grid-cols-7 gap-1 h-7">
                      <div className={`border rounded flex items-center justify-center text-[8px] font-mono-code font-semibold ${
                        isDark ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      }`} title="Delfos Solar Monitoring: Operacional">
                        DELFOS
                      </div>
                      <div className={`border rounded flex items-center justify-center text-[8px] font-mono-code font-semibold ${
                        isDark ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      }`} title="GDR Cloud: Operacional">
                        GDR
                      </div>
                      <div className={`border rounded flex items-center justify-center text-[8px] font-mono-code font-semibold ${
                        isDark ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      }`} title="Monitoramento GD Sun: Operacional">
                        GDSUN
                      </div>
                      <div className={`border rounded flex items-center justify-center text-[8px] font-mono-code font-semibold ${
                        isDark ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      }`} title="Huawei FusionSolar: Operacional">
                        HUAWEI
                      </div>
                      <div className={`border rounded flex items-center justify-center text-[8px] font-mono-code font-semibold ${
                        isDark ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      }`} title="iSolarCloud Sungrow: Operacional">
                        ISOLAR
                      </div>
                      <div className={`border rounded flex items-center justify-center text-[8px] font-mono-code font-semibold ${
                        isDark ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      }`} title="SMAC Climatempo (Alerta de Queimadas): Operacional">
                        SMAC
                      </div>
                      <div className={`border rounded flex items-center justify-center text-[8px] font-mono-code font-semibold ${
                        isDark ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      }`} title="Sismetro Gestão de O&M: Operacional">
                        SISMETRO
                      </div>
                    </div>

                    <p className={`text-[9px] mt-2 text-center font-mono-code ${
                      isDark ? 'text-slate-500' : 'text-slate-500'
                    }`}>
                      Todos os sistemas operando dentro dos parâmetros nominais.
                    </p>
                  </div>
                </section>
              );
            })()}

          </div>
        ) : (
          /* Filtered or Single-Category Layout */
          <div className="space-y-6">
            {CATEGORIES.map(category => {
              if (selectedCategory !== 'all' && selectedCategory !== category.id) {
                return null;
              }

              const categoryItems = filteredLinks.filter(item => item.categoryId === category.id);
              if (categoryItems.length === 0) return null;

              return (
                <section key={category.id} id={`category-${category.id}`} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs">
                      {category.id === 'monitoring' ? '⚡' : category.id === 'management' ? '🛠️' : '📊'}
                    </span>
                    <h2 className={`text-xs font-bold uppercase tracking-wider ${
                      isDark ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      {category.name}
                    </h2>
                    <span className={`text-[10px] font-mono-code ${
                      isDark ? 'text-cyan-400' : 'text-sky-600'
                    }`}>
                      ({categoryItems.length})
                    </span>
                    <div className={`h-px flex-1 ml-2 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {categoryItems.map(item => (
                      <LinkCard
                        key={item.id}
                        item={item}
                        customUrl={customUrls[item.id]}
                        isFavorite={favorites.includes(item.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onOpenEmbedded={setActiveEmbedded}
                        onEditUrl={setEditingItem}
                        isDark={isDark}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Empty Search State */}
        {filteredLinks.length === 0 && (
          <div className={`py-12 text-center border border-dashed rounded-xl p-6 ${
            isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-300 bg-white'
          }`}>
            <div className={`w-10 h-10 mx-auto mb-3 rounded-lg border flex items-center justify-center ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-500' : 'bg-slate-100 border-slate-200 text-slate-400'
            }`}>
              <Layers className="w-5 h-5" />
            </div>
            <h3 className={`text-sm font-bold font-tech uppercase ${
              isDark ? 'text-slate-200' : 'text-slate-800'
            }`}>
              Nenhum link ou plataforma encontrada
            </h3>
            <p className={`text-xs max-w-md mx-auto mt-1 mb-3 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Não encontramos resultados para "{searchQuery}". Tente pesquisar por "smac", "queimada", "huawei", "isolarcloud" ou "sismetro".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-800 hover:bg-cyan-600 hover:text-slate-950 text-cyan-300' 
                  : 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
              }`}
            >
              Restaurar todos os links
            </button>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className={`mt-8 pt-4 pb-4 border-t flex flex-col sm:flex-row justify-between items-center text-[10px] font-medium px-4 sm:px-8 max-w-7xl w-full mx-auto gap-2 ${
        isDark ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-500'
      }`}>
        <div className="flex items-center gap-3">
          <span>&copy; GD SUN COGD • CENTRO DE OPERAÇÃO</span>
          <span>•</span>
          <span className="font-mono-code">PRINCIPAIS FERRAMENTAS</span>
        </div>

        <div className={`flex items-center gap-2 font-mono-code text-[10px] ${
          isDark ? 'text-emerald-400' : 'text-emerald-700'
        }`}>
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>SISTEMA CONECTADO AO CLUSTER SOLAR</span>
        </div>
      </footer>

      {/* Embedded Data Modals */}
      <PlantAccessModal
        isOpen={activeEmbedded === 'access'}
        onClose={() => setActiveEmbedded(null)}
        isDark={isDark}
      />

      <PlantRegistryModal
        isOpen={activeEmbedded === 'registry'}
        onClose={() => setActiveEmbedded(null)}
        isDark={isDark}
      />

      <ShiftScheduleModal
        isOpen={activeEmbedded === 'schedule'}
        onClose={() => setActiveEmbedded(null)}
        isDark={isDark}
      />

      <EditUrlModal
        item={editingItem}
        currentCustomUrl={editingItem ? customUrls[editingItem.id] : undefined}
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        onSave={handleSaveCustomUrl}
      />

    </div>
  );
}
