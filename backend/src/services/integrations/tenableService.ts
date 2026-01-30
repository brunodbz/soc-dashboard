import axios from 'axios';
import { SecurityItem } from '../../types';
import { generateMockTenableData } from '../mocks/mockDataGenerator';
import { Config } from '../../types';

export const getVulnerabilities = async (config: Config | null): Promise<SecurityItem[]> => {
  if (!config || !config.api_key || !config.is_active) {
    return generateMockTenableData();
  }

  try {
    const response = await axios.get(
      'https://cloud.tenable.com/workbenches/vulnerabilities',
      {
        headers: {
          'X-ApiKeys': `accessKey=${config.api_key};secretKey=${config.token}`,
          'Content-Type': 'application/json',
        },
        params: {
          size: 5,
          sort: 'severity:desc',
        },
        timeout: 5000,
      }
    );

    return normalizeTenableData(response.data);
  } catch (error: any) {
    throw new Error(`Tenable falhou: ${error.message}`);
  }
};

const normalizeTenableData = (data: any): SecurityItem[] => {
  if (!data.vulnerabilities || !Array.isArray(data.vulnerabilities)) {
    return [];
  }

  return data.vulnerabilities.slice(0, 5).map((vuln: any) => ({
    id: String(vuln.plugin_id || vuln.id),
    title: vuln.plugin_name || 'Vulnerabilidade sem nome',
    severity: mapTenableSeverity(vuln.severity),
    timestamp: vuln.last_found || new Date().toISOString(),
    asset: vuln.asset?.hostname || vuln.asset?.ipv4 || 'Unknown',
  }));
};

const mapTenableSeverity = (severity: number): 'critical' | 'high' | 'medium' | 'low' => {
  if (severity >= 4) return 'critical';
  if (severity >= 3) return 'high';
  if (severity >= 2) return 'medium';
  return 'low';
};
