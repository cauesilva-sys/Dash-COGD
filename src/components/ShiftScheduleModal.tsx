import React, { useState } from 'react';
import { 
  X, 
  CalendarDays, 
  Users, 
  Clock, 
  Info, 
  ShieldCheck, 
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { OPERATORS, SHIFT_DEFINITIONS, MONTHS_LIST } from '../data/shiftScheduleData';

interface ShiftScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShiftScheduleModal: React.FC<ShiftScheduleModalProps> = ({ isOpen, onClose }) => {
  const [selectedOperator, setSelectedOperator] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('Janeiro');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#090e17] border border-sky-500/40 rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-[0_0_50px_rgba(56,189,248,0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-sky-900/40 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-500/50 flex items-center justify-center text-sky-400">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-tech text-xs uppercase px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                  Escala Operacional COGD
                </span>
                <span className="text-xs text-slate-400 font-mono-code hidden sm:inline">
                  Equipe de Operações Solar
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-100 font-tech">
                Tabela de Escala de Trabalho & Atribuições
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

        {/* Shift Codes Legend Strip */}
        <div className="p-3.5 bg-slate-950 border-b border-slate-800/80 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-xs font-semibold text-slate-400 font-tech mr-1 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
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
                <span className="text-[11px] text-slate-300">({def.name})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* Operator Cards Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {OPERATORS.map(operator => (
              <div 
                key={operator.name}
                className="bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 rounded-xl p-4 transition-all"
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
                      <h4 className="font-bold text-slate-100 font-tech text-base">{operator.name}</h4>
                      <span className="text-[11px] text-slate-400">{operator.role}</span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[11px] font-mono-code bg-slate-950 text-cyan-300 border border-cyan-900/50">
                    {operator.currentDuty}
                  </span>
                </div>

                <div className="text-xs text-slate-400 mt-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Ciclo Típico:</span>
                    <span className="text-slate-300 font-medium">{operator.scheduleSummary}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Próximo Turno:</span>
                    <span className="text-emerald-400 font-medium">{operator.nextShift}</span>
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
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
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
          <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-slate-900/80 border border-cyan-900/50 rounded-xl p-4 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 font-bold font-tech text-sm text-cyan-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Instruções do Centro de Operação GD Sun (COGD)</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>Em caso de necessidade de permuta ou troca de turno, alinhar previamente com os operadores e registrar com a supervisão.</li>
              <li>Nos turnos de <strong className="text-cyan-300 font-mono-code">OP (Operação)</strong>, manter prioridade máxima na triagem de alarmes Huawei FusionSolar e status do Delfos Monitoring.</li>
              <li>Nos turnos de <strong className="text-emerald-300 font-mono-code">PR (Performance)</strong>, auditar indicadores de geração x irradiância e acionar manutenção via Sismetro quando identificado desvio.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Escala de Trabalho • Central de Operação GD Sun</span>
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
