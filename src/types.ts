export interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
  defaultUrl?: string;
  isCustomizable?: boolean;
  categoryId: 'monitoring' | 'management' | 'sheets';
  iconName: string;
  badge?: string;
  badgeColor?: 'cyan' | 'emerald' | 'amber' | 'blue' | 'purple';
  actionText: string;
  isExternal: boolean;
  embeddedType?: 'access' | 'registry' | 'schedule';
  tags: string[];
}

export interface Category {
  id: 'monitoring' | 'management' | 'sheets';
  name: string;
  iconName: string;
  description: string;
  accentColor: string;
  badge: string;
}

export interface PlantAccess {
  proj: string;
  usina: string;
  sigla: string;
  pcGdsun: string;
  loginAnydesk: string;
  senhaAnydesk: string;
  loginTracker: string;
  senhaTracker: string;
  loginDelfos: string;
  senhaDelfos: string;
  smartloggerPossui: string;
  smartloggerIp: string;
  smartloggerLogin: string;
  smartloggerSenha: string;
  cftvPlataforma: string;
  cftvSn: string;
  cftvLogin: string;
  cftvSenha: string;
  cftvTipoAcesso: string;
  cftvStatus: string;
  cftvObs: string;
  tomadaPossui: string;
  tomadaApp: string;
  tomadaLogin: string;
  tomadaSenha: string;
}

export interface PlantRegistry {
  alian: string;
  status: string;
  usina: string;
  siglaAntiga: string;
  siglaNova: string;
  supervisor: string;
  coordenador: string;
  responsavelOS: string;
  id: string;
  loginBit8: string;
  offtaker: string;
  cluster: string;
  uf: string;
  gestao: string;
  dataEnergizacao: string;
  dataComercializacao: string;
  potenciaKwac: string;
  potenciaKwp: string;
  inversores: string;
  qtdInversores: string;
  modulos: string;
  tracker: string;
  razaoSocial: string;
  cnpj: string;
  razaoSocialCliente: string;
  cnpjCliente: string;
  disco: string;
  codCliente: string;
  codInstalacao: string;
  medidor: string;
  gestor: string;
  contatoDisCo: string;
  whatsappDisCo: string;
  observacoes: string;
  endereco: string;
  googleMapsUrl: string;
  lat: string;
  lng: string;
  statusDelfos: string;
}

export interface ShiftSchedulePerson {
  name: string;
  shifts: { [dateStr: string]: string };
}
