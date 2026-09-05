import React, { useState } from 'react';
import { 
  X, 
  CalendarDays, 
  Info, 
  ShieldCheck, 
  ExternalLink,
  FileSpreadsheet
} from 'lucide-react';
import { OPERATORS, SHIFT_DEFINITIONS } from '../data/shiftScheduleData';

interface ShiftScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

export const ShiftScheduleModal: React.FC<ShiftScheduleModalProps> = ({ 
  isOpen, 
  onClose,
  isDark = true 
}) => {
  if (!isOpen) return null;

  const sheetsUrl = "https://drive.google.com/drive/folders/14FaEk1JqV-VH1ynO9-j_c0ExnphaK9Tk";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden transition-all duration-200 ${
          isDark 
            ? 'bg-[#090e17] border border-sky-500/40 text-slate-100 shadow-[0_0_50px_rgba(56,189,248,0.25)]' 
            : 'bg-white border border-slate-200 text-slate-900 shadow-2xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-4 sm:p-5 border-b flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 ${
          isDark 
            ? 'border-sky-900/40 bg-slate-900/90 text-slate-100' 
            : 'border-slate-200 bg-slate-50 text-slate-900'
        }`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
              isDark 
                ? 'bg-sky-950 border-sky-500/50 text-sky-400' 
                : 'bg-sky-50 border-sky-300 text-sky-700'
            }`}>
              <CalendarDays className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className={`font-tech text-xs uppercase px-2 py-0.5 rounded border ${
                  isDark 
                    ? 'bg-sky-950 text-sky-300 border-sky-800' 
                    : 'bg-sky-100 text-sky-800 border-sky-200'
                }`}>
                  Escala Operacional COGD
                </span>
                <span className={`text-xs font-mono-code hidden sm:inline ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Equipe de Operações Solar
                </span>
              </div>
              <h2 className={`text-base sm:text-xl font-bold font-tech truncate ${
                isDark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                Tabela de Escala de Trabalho & Atribuições
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

        {/* Shift Codes Legend Strip */}
        <div className={`p-3.5 border-b overflow-x-auto scrollbar-none ${
          isDark ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-100 border-slate-200'
        }`}>
          <div className="flex items-center gap-2 min-w-max">
            <span className={`text-xs font-semibold font-tech mr-1 flex items-center gap-1 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              <Info className="w-3.5 h-3.5 text-sky-500" />
              Legenda de Turnos:
            </span>
            {Object.values(SHIFT_DEFINITIONS).map(def => (
              <div 
                key={def.code}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border"
                style={{ 
                  backgroundColor: def.bgColor, 
                  borderColor: def.borderColor,
                  color: def.color 
                }}
                title={def.description}
              >
                <span className="font-mono-code font-bold">{def.code}</span>
                <span className="text-[11px] opacity-90">({def.name})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div className={`flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 ${
          isDark ? 'bg-[#070b12]' : 'bg-slate-50'
        }`}>
          {/* Operator Cards Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OPERATORS.map(operator => (
              <div 
                key={operator.name}
                className={`rounded-xl p-4 transition-all border ${
                  isDark
                    ? 'bg-slate-900/80 border-slate-800 hover:border-sky-500/40 text-slate-100'
                    : 'bg-white border-slate-200 hover:border-sky-400 text-slate-800 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-mono-code font-bold text-xs border"
                      style={{ 
                        backgroundColor: `${operator.color}20`, 
                        borderColor: operator.color,
                        color: operator.color 
                      }}
                    >
                      {operator.badge}
                    </div>
                    <div>
                      <h4 className={`font-bold font-tech text-base ${
                        isDark ? 'text-slate-100' : 'text-slate-900'
                      }`}>{operator.name}</h4>
                      <span className={`text-[11px] ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>{operator.role}</span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono-code border ${
                    isDark 
                      ? 'bg-slate-950 text-cyan-300 border-cyan-900/50' 
                      : 'bg-cyan-50 text-cyan-800 border-cyan-200 font-semibold'
                  }`}>
                    {operator.currentDuty}
                  </span>
                </div>

                <div className={`text-xs mt-2 p-2.5 rounded-lg border space-y-1 ${
                  isDark ? 'bg-slate-950/60 border-slate-800/80 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-slate-500' : 'text-slate-500'}>Ciclo Típico:</span>
                    <span className={`font-medium ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>{operator.scheduleSummary}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={isDark ? 'text-slate-500' : 'text-slate-500'}>Próximo Turno:</span>
                    <span className={`font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>{operator.nextShift}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-1.5 font-mono-code">
                    Principais Atividades:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {operator.keyDuties.map((duty, idx) => (
                      <span 
                        key={idx}
                        className={`text-[11px] px-2 py-0.5 rounded border ${
                          isDark 
                            ? 'bg-slate-800 text-slate-300 border-slate-700/60' 
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {duty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Operational Guidance Card */}
          <div className={`border rounded-xl p-4 text-xs space-y-2 ${
            isDark 
              ? 'bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-slate-900/80 border-cyan-900/50 text-slate-300' 
              : 'bg-sky-50/70 border-sky-200 text-slate-700'
          }`}>
            <div className={`flex items-center gap-2 font-bold font-tech text-sm ${
              isDark ? 'text-cyan-300' : 'text-sky-800'
            }`}>
              <ShieldCheck className="w-4 h-4 text-sky-500" />
              <span>Instruções do Centro de Operação GD Sun (COGD)</span>
            </div>
            <ul className={`list-disc list-inside space-y-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <li>Em caso de necessidade de permuta ou troca de turno, alinhar previamente com os operadores e registrar com a supervisão.</li>
              <li>Nos turnos de <strong className={`font-mono-code ${isDark ? 'text-cyan-300' : 'text-cyan-800'}`}>OP (Operação)</strong>, manter prioridade máxima na triagem de alarmes Huawei FusionSolar e status do Delfos Monitoring.</li>
              <li>Nos turnos de <strong className={`font-mono-code ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>PR (Performance)</strong>, auditar indicadores de geração x irradiância e acionar manutenção via Sismetro quando identificado desvio.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
          isDark 
            ? 'border-slate-800 bg-slate-950/80 text-slate-400' 
            : 'border-slate-200 bg-slate-50 text-slate-600'
        }`}>
          <div className="flex items-center gap-2">
            <span>Escala de Trabalho • Central de Operação GD Sun</span>
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
