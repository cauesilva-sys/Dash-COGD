export interface ShiftDefinition {
  code: string;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}

export const SHIFT_DEFINITIONS: Record<string, ShiftDefinition> = {
  OP: {
    code: 'OP',
    name: 'Operação',
    color: '#00f0ff',
    bgColor: 'rgba(0, 240, 255, 0.12)',
    borderColor: 'rgba(0, 240, 255, 0.3)',
    description: 'Monitoramento ativo e controle em tempo real no COGD'
  },
  PR: {
    code: 'PR',
    name: 'Performance',
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    description: 'Análise de performance ratio, irradiação e perdas'
  },
  AP: {
    code: 'AP',
    name: 'Apoio',
    color: '#38bdf8',
    bgColor: 'rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    description: 'Apoio técnico à equipe de campo e tratativas com distribuidoras'
  },
  REL: {
    code: 'REL',
    name: 'Relatórios',
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.12)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
    description: 'Fechamento de relatórios diários, semanais e mensais de O&M'
  },
  D: {
    code: 'D',
    name: 'Dados',
    color: '#a855f7',
    bgColor: 'rgba(168, 85, 247, 0.12)',
    borderColor: 'rgba(168, 85, 247, 0.3)',
    description: 'Gestão de telemetria, integridade de dados e séries temporais'
  },
  T: {
    code: 'T',
    name: 'Turno / Plantão',
    color: '#ec4899',
    bgColor: 'rgba(236, 72, 153, 0.12)',
    borderColor: 'rgba(236, 72, 153, 0.3)',
    description: 'Plantão de sobreaviso e cobertura especial'
  },
  F: {
    code: 'F',
    name: 'Folga',
    color: '#64748b',
    bgColor: 'rgba(100, 116, 139, 0.12)',
    borderColor: 'rgba(100, 116, 139, 0.25)',
    description: 'Descanso semanal remunerado / folga de escala'
  },
  FER: {
    code: 'FÉR',
    name: 'Férias',
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.12)',
    borderColor: 'rgba(34, 197, 94, 0.3)',
    description: 'Período regulamentar de férias'
  }
};

export interface OperatorSchedule {
  name: string;
  role: string;
  badge: string;
  color: string;
  scheduleSummary: string;
  currentDuty: string;
  nextShift: string;
  keyDuties: string[];
}

export const OPERATORS: OperatorSchedule[] = [
  {
    name: 'Cauê Pavanelli',
    role: 'Operador COGD',
    badge: 'CP',
    color: '#00f0ff',
    scheduleSummary: 'Ciclos de Operação (OP), Relatórios (REL) e Apoio (AP)',
    currentDuty: 'Operação Ativa (OP)',
    nextShift: 'Plantão / Apoio',
    keyDuties: ['Supervisão GDR / FusionSolar', 'Emissão de Boletins', 'Interface Técnica']
  },
  {
    name: 'Eduardo Gomes',
    role: 'Operador COGD',
    badge: 'EG',
    color: '#10b981',
    scheduleSummary: 'Ciclos de Performance (PR), Operação (OP) e Apoio (AP)',
    currentDuty: 'Performance & PR',
    nextShift: 'Operação COGD',
    keyDuties: ['Controle de Geração vs Target', 'Auditoria de Inversores', 'Delfos Data Studio']
  },
  {
    name: 'Gabriel Kuroki',
    role: 'Operador COGD',
    badge: 'GK',
    color: '#a855f7',
    scheduleSummary: 'Ciclos de Análise de Dados (D), Performance (PR) e Operação (OP)',
    currentDuty: 'Gestão de Dados (D)',
    nextShift: 'Performance (PR)',
    keyDuties: ['Qualidade de Dados de Telemetria', 'Séries Temporais', 'Diagnóstico Remoto']
  },
  {
    name: 'Vinicius Pina',
    role: 'Operador COGD',
    badge: 'VP',
    color: '#38bdf8',
    scheduleSummary: 'Ciclos de Operação (OP), Apoio (AP) e Relatórios (REL)',
    currentDuty: 'Apoio & Tratativas (AP)',
    nextShift: 'Operação Central',
    keyDuties: ['Gestão de Ocorrências Sismetro', 'Atendimento Concessionárias', 'Acionamento de Campo']
  }
];

export const MONTHS_LIST = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];
