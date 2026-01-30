import { Severity, SecurityItem } from '../../types';

const severities: Severity[] = ['critical', 'high', 'medium', 'low'];

const getRandomSeverity = (): Severity => {
  return severities[Math.floor(Math.random() * severities.length)];
};

const getRecentTimestamp = (minutesAgo: number = 0): string => {
  const date = new Date();
  date.setMinutes(date.getMinutes() - minutesAgo);
  return date.toISOString();
};

export const generateMockElasticAlerts = (): SecurityItem[] => {
  return [
    {
      id: 'elastic-1',
      title: 'Tentativa de acesso não autorizado detectada',
      severity: 'critical',
      timestamp: getRecentTimestamp(5),
      source: 'Firewall-01',
    },
    {
      id: 'elastic-2',
      title: 'Tráfego anômalo detectado na rede',
      severity: 'high',
      timestamp: getRecentTimestamp(15),
      source: 'IDS-02',
    },
    {
      id: 'elastic-3',
      title: 'Múltiplas tentativas de login falhadas',
      severity: 'medium',
      timestamp: getRecentTimestamp(30),
      source: 'AD-Server',
    },
    {
      id: 'elastic-4',
      title: 'Porta não autorizada aberta',
      severity: 'low',
      timestamp: getRecentTimestamp(45),
      source: 'Server-03',
    },
    {
      id: 'elastic-5',
      title: 'Configuração de segurança alterada',
      severity: 'medium',
      timestamp: getRecentTimestamp(60),
      source: 'Config-Manager',
    },
  ];
};

export const generateMockDefenderAlerts = (): SecurityItem[] => {
  return [
    {
      id: 'defender-1',
      title: 'Malware detectado no endpoint',
      severity: 'critical',
      timestamp: getRecentTimestamp(3),
      category: 'Malware',
    },
    {
      id: 'defender-2',
      title: 'Atividade suspeita de phishing',
      severity: 'high',
      timestamp: getRecentTimestamp(20),
      category: 'Phishing',
    },
    {
      id: 'defender-3',
      title: 'Aplicação não autorizada executada',
      severity: 'medium',
      timestamp: getRecentTimestamp(35),
      category: 'AppControl',
    },
    {
      id: 'defender-4',
      title: 'Atualização de segurança pendente',
      severity: 'low',
      timestamp: getRecentTimestamp(50),
      category: 'Updates',
    },
    {
      id: 'defender-5',
      title: 'Comportamento anômalo de processo',
      severity: 'high',
      timestamp: getRecentTimestamp(65),
      category: 'BehaviorAnalysis',
    },
  ];
};

export const generateMockOpenCTIData = (): SecurityItem[] => {
  return [
    {
      id: 'opencti-1',
      title: 'Novo IOC de ransomware identificado',
      severity: 'critical',
      timestamp: getRecentTimestamp(8),
      type: 'Indicator',
    },
    {
      id: 'opencti-2',
      title: 'Campanha de APT detectada',
      severity: 'high',
      timestamp: getRecentTimestamp(25),
      type: 'Campaign',
    },
    {
      id: 'opencti-3',
      title: 'Domínio malicioso reportado',
      severity: 'medium',
      timestamp: getRecentTimestamp(40),
      type: 'Domain',
    },
    {
      id: 'opencti-4',
      title: 'IP associado a botnet',
      severity: 'medium',
      timestamp: getRecentTimestamp(55),
      type: 'IPv4-Addr',
    },
    {
      id: 'opencti-5',
      title: 'Hash de arquivo malicioso',
      severity: 'high',
      timestamp: getRecentTimestamp(70),
      type: 'File',
    },
  ];
};

export const generateMockTenableData = (): SecurityItem[] => {
  return [
    {
      id: 'tenable-1',
      title: 'Vulnerabilidade crítica CVE-2024-1234',
      severity: 'critical',
      timestamp: getRecentTimestamp(10),
      asset: 'web-server-01',
    },
    {
      id: 'tenable-2',
      title: 'SSL/TLS configuração fraca',
      severity: 'high',
      timestamp: getRecentTimestamp(22),
      asset: 'api-gateway',
    },
    {
      id: 'tenable-3',
      title: 'Patch de segurança ausente',
      severity: 'medium',
      timestamp: getRecentTimestamp(38),
      asset: 'db-server-02',
    },
    {
      id: 'tenable-4',
      title: 'Porta desnecessária exposta',
      severity: 'low',
      timestamp: getRecentTimestamp(52),
      asset: 'app-server-03',
    },
    {
      id: 'tenable-5',
      title: 'Credenciais padrão detectadas',
      severity: 'high',
      timestamp: getRecentTimestamp(68),
      asset: 'iot-device-05',
    },
  ];
};

export const generateMockRSSData = (): SecurityItem[] => {
  return [
    {
      id: 'rss-1',
      title: 'Nova vulnerabilidade zero-day anunciada',
      severity: 'medium',
      timestamp: getRecentTimestamp(12),
      link: 'https://security-news.example.com/article1',
    },
    {
      id: 'rss-2',
      title: 'Atualização de segurança crítica disponível',
      severity: 'medium',
      timestamp: getRecentTimestamp(28),
      link: 'https://security-news.example.com/article2',
    },
    {
      id: 'rss-3',
      title: 'Alerta: Campanha de malware em andamento',
      severity: 'low',
      timestamp: getRecentTimestamp(42),
      link: 'https://security-news.example.com/article3',
    },
    {
      id: 'rss-4',
      title: 'Novas técnicas de ataque documentadas',
      severity: 'low',
      timestamp: getRecentTimestamp(58),
      link: 'https://security-news.example.com/article4',
    },
    {
      id: 'rss-5',
      title: 'Relatório de ameaças do trimestre',
      severity: 'low',
      timestamp: getRecentTimestamp(72),
      link: 'https://security-news.example.com/article5',
    },
  ];
};
