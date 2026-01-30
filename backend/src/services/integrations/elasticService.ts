import axios from 'axios';
import { SecurityItem } from '../../types';
import { generateMockElasticAlerts } from '../mocks/mockDataGenerator';
import { Config } from '../../types';

export const getAlerts = async (config: Config | null): Promise<SecurityItem[]> => {
  if (!config || !config.url || !config.is_active) {
    return generateMockElasticAlerts();
  }

  try {
    const response = await axios.get(`${config.url}/_search`, {
      headers: {
        'Authorization': `ApiKey ${config.api_key}`,
        'Content-Type': 'application/json',
      },
      params: {
        size: 5,
        sort: '@timestamp:desc',
      },
      timeout: 5000,
    });

    return normalizeElasticData(response.data);
  } catch (error: any) {
    throw new Error(`Elastic Search falhou: ${error.message}`);
  }
};

const normalizeElasticData = (data: any): SecurityItem[] => {
  if (!data.hits || !data.hits.hits) {
    return [];
  }

  return data.hits.hits.slice(0, 5).map((hit: any) => ({
    id: hit._id,
    title: hit._source.message || hit._source.rule?.name || 'Alerta sem título',
    severity: mapElasticSeverity(hit._source.event?.severity || hit._source.severity),
    timestamp: hit._source['@timestamp'] || new Date().toISOString(),
    source: hit._source.host?.name || hit._source.source || 'Elastic',
  }));
};

const mapElasticSeverity = (severity: any): 'critical' | 'high' | 'medium' | 'low' => {
  const severityStr = String(severity).toLowerCase();
  
  if (severityStr.includes('critical') || severityStr === '1' || severityStr === '4') {
    return 'critical';
  }
  if (severityStr.includes('high') || severityStr === '2' || severityStr === '3') {
    return 'high';
  }
  if (severityStr.includes('medium') || severityStr === '3' || severityStr === '2') {
    return 'medium';
  }
  return 'low';
};
