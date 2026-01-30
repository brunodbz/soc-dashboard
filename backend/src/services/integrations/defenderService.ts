import axios from 'axios';
import { SecurityItem } from '../../types';
import { generateMockDefenderAlerts } from '../mocks/mockDataGenerator';
import { Config } from '../../types';

export const getAlerts = async (config: Config | null): Promise<SecurityItem[]> => {
  if (!config || !config.token || !config.is_active) {
    return generateMockDefenderAlerts();
  }

  try {
    const response = await axios.get(
      'https://graph.microsoft.com/v1.0/security/alerts',
      {
        headers: {
          'Authorization': `Bearer ${config.token}`,
          'Content-Type': 'application/json',
        },
        params: {
          $top: 5,
          $orderby: 'createdDateTime desc',
        },
        timeout: 5000,
      }
    );

    return normalizeDefenderData(response.data);
  } catch (error: any) {
    throw new Error(`Microsoft Defender falhou: ${error.message}`);
  }
};

const normalizeDefenderData = (data: any): SecurityItem[] => {
  if (!data.value || !Array.isArray(data.value)) {
    return [];
  }

  return data.value.slice(0, 5).map((alert: any) => ({
    id: alert.id,
    title: alert.title || 'Alerta sem título',
    severity: mapDefenderSeverity(alert.severity),
    timestamp: alert.createdDateTime || new Date().toISOString(),
    category: alert.category || 'Unknown',
  }));
};

const mapDefenderSeverity = (severity: string): 'critical' | 'high' | 'medium' | 'low' => {
  const severityLower = severity?.toLowerCase() || '';
  
  if (severityLower === 'high') return 'critical';
  if (severityLower === 'medium') return 'high';
  if (severityLower === 'low') return 'medium';
  return 'low';
};
