import { Category, LinkItem } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'monitoring',
    name: 'Monitoramento',
    iconName: 'Zap',
    description: 'Plataformas de telemetria, centros de supervisão solar, acompanhamento de inversores, gestão de alarmes e alerta de queimadas.',
    accentColor: '#00f0ff',
    badge: '5 Plataformas'
  },
  {
    id: 'management',
    name: 'Gestão & OS',
    iconName: 'Wrench',
    description: 'Sistema de ordens de serviço (OS), chamados técnicos, manutenções preventivas e corretivas de O&M.',
    accentColor: '#10b981',
    badge: '1 Sistema'
  },
  {
    id: 'sheets',
    name: 'Planilhas e Escalas',
    iconName: 'BarChart3',
    description: 'Pasta oficial no Google Drive com acessos remotos das usinas, cadastro técnico e escalas operacionais.',
    accentColor: '#f59e0b',
    badge: 'Google Drive & Bases'
  }
];

export const DEFAULT_LINKS: LinkItem[] = [
  // 1. ⚡ Monitoramento
  {
    id: 'gdr-cloud',
    title: 'GDR Cloud',
    description: 'Roteamento e portal de telemetria em nuvem para acompanhamento de dados das plantas fotovoltaicas.',
    url: 'https://gdr.gdrcloud.workers.dev/',
    categoryId: 'monitoring',
    iconName: 'Cloud',
    badge: 'Telemetria',
    badgeColor: 'cyan',
    actionText: 'Acessar GDR Cloud',
    isExternal: true,
    tags: ['gdr', 'cloud', 'telemetria', 'workers', 'dados', 'inversores']
  },
  {
    id: 'monitoramento-gdsun',
    title: 'Monitoramento GD Sun',
    description: 'Portal proprietário de monitoramento em tempo real do parque de geração distribuída da GD Sun.',
    url: 'https://monitoramentogdsun.com.br/monitoring',
    categoryId: 'monitoring',
    iconName: 'Activity',
    badge: 'Portal Oficial',
    badgeColor: 'emerald',
    actionText: 'Acessar GD Sun',
    isExternal: true,
    tags: ['gdsun', 'gd sun', 'monitoring', 'oficial', 'usinas', 'geracao']
  },
  {
    id: 'huawei-fusionsolar',
    title: 'Huawei FusionSolar',
    description: 'Módulo SmartPVMS da Huawei para gestão e triagem de alarmes, severidade de falhas e diagnóstico de inversores.',
    url: 'https://la5.fusionsolar.huawei.com/uniportal/pvmswebsite/assets/build/cloud.html?app-id=smartpvms&instance-id=smartpvms&zone-id=21ecb9d3-8af1-4ac1-adfa-e38023d18142#/operation/alarmManagement',
    categoryId: 'monitoring',
    iconName: 'BellRing',
    badge: 'Alarmes',
    badgeColor: 'amber',
    actionText: 'Gestão de Alarmes',
    isExternal: true,
    tags: ['huawei', 'fusionsolar', 'smartpvms', 'alarmes', 'inversores', 'falhas']
  },
  {
    id: 'isolarcloud',
    title: 'iSolarCloud',
    description: 'Dashboard Sungrow para visualização detalhada de inversores, status de geração e telemetria de dispositivos.',
    url: 'https://web3.isolarcloud.com.hk/#/dashboard?uDSyKmIn76sFk2HMfUUMlxGzHDJxyOMRaif2GxMfWrI=',
    categoryId: 'monitoring',
    iconName: 'Cpu',
    badge: 'Sungrow',
    badgeColor: 'purple',
    actionText: 'Acessar iSolarCloud',
    isExternal: true,
    tags: ['isolarcloud', 'sungrow', 'dashboard', 'dispositivos', 'inversores', 'plantas']
  },
  {
    id: 'smac-climatempo',
    title: 'SMAC Climatempo',
    description: 'Sistema de Monitoramento e Alerta Climatempo: detecção em tempo real de focos de queimada, raios e riscos climáticos nas usinas.',
    url: 'https://smac.climatempo.io/',
    categoryId: 'monitoring',
    iconName: 'Flame',
    badge: 'Alerta de Queimada',
    badgeColor: 'amber',
    actionText: 'Acessar Alertas SMAC',
    isExternal: true,
    tags: ['smac', 'climatempo', 'queimada', 'fogo', 'incendio', 'clima', 'alerta', 'meteorologia', 'raios', 'focos']
  },

  // 2. 🛠️ Gestão & OS
  {
    id: 'sismetro',
    title: 'Sismetro',
    description: 'Sistema corporativo de abertura e controle de ordens de serviço (OS), manutenção em campo e histórico de O&M.',
    url: 'https://br.sismetro.com/indexNEW.php',
    categoryId: 'management',
    iconName: 'Wrench',
    badge: 'Ordens de Serviço',
    badgeColor: 'emerald',
    actionText: 'Abrir Sismetro',
    isExternal: true,
    tags: ['sismetro', 'os', 'ordem de servico', 'manutencao', 'chamados', 'gestao', 'o&m']
  },

  // 3. 📊 Planilhas e Escalas
  {
    id: 'pasta-google-drive',
    title: 'Pasta de Planilhas e Escalas (Google Drive)',
    description: 'Acesso direto à pasta oficial no Google Drive com todas as planilhas de acessos, cadastro de usinas e escalas do COGD.',
    url: 'https://drive.google.com/drive/folders/14FaEk1JqV-VH1ynO9-j_c0ExnphaK9Tk',
    categoryId: 'sheets',
    iconName: 'Database',
    badge: 'Google Drive',
    badgeColor: 'amber',
    actionText: 'Abrir Pasta no Drive',
    isExternal: true,
    tags: ['google drive', 'drive', 'pasta', 'planilhas', 'escalas', 'acessos', 'cadastro']
  },
  {
    id: 'planilha-operacoes-1',
    title: 'Planilha 1: Acessos & Redes',
    description: 'Consulta rápida de acessos remotos: Anydesk (GDSun, Tracker, Delfos), IPs Smartlogger, CFTV e Tomadas Inteligentes.',
    url: 'https://drive.google.com/drive/folders/14FaEk1JqV-VH1ynO9-j_c0ExnphaK9Tk',
    isCustomizable: true,
    categoryId: 'sheets',
    iconName: 'KeyRound',
    badge: 'Acessos & IPs',
    badgeColor: 'cyan',
    actionText: 'Visualizar Acessos',
    isExternal: false,
    embeddedType: 'access',
    tags: ['planilha 1', 'operacoes 1', 'anydesk', 'cftv', 'smartlogger', 'senhas', 'ips', 'acessos', 'usinas']
  },
  {
    id: 'planilha-operacoes-2',
    title: 'Planilha 2: Cadastro das Usinas',
    description: 'Inventário técnico completo: potência kWac/kWp, inversores, módulos, concessionárias, códigos e supervisores.',
    url: 'https://drive.google.com/drive/folders/14FaEk1JqV-VH1ynO9-j_c0ExnphaK9Tk',
    isCustomizable: true,
    categoryId: 'sheets',
    iconName: 'Sun',
    badge: 'Cadastro & Specs',
    badgeColor: 'emerald',
    actionText: 'Ver Dados Técnicos',
    isExternal: false,
    embeddedType: 'registry',
    tags: ['planilha 2', 'operacoes 2', 'cadastro', 'potencia', 'kwp', 'kwac', 'inversores', 'concessionaria']
  },
  {
    id: 'tabela-escala-trabalho',
    title: 'Tabela de Escala de Trabalho',
    description: 'Escala dos operadores do Centro de Operação GD Sun (COGD): turnos de Operação (OP), Apoio (AP) e Folgas.',
    url: 'https://drive.google.com/drive/folders/14FaEk1JqV-VH1ynO9-j_c0ExnphaK9Tk',
    isCustomizable: true,
    categoryId: 'sheets',
    iconName: 'CalendarDays',
    badge: 'Escala COGD',
    badgeColor: 'blue',
    actionText: 'Consultar Escala',
    isExternal: false,
    embeddedType: 'schedule',
    tags: ['escala', 'trabalho', 'turnos', 'operadores', 'cogd', 'folga', 'operacao']
  }
];
