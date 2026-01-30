import axios from 'axios';
import { SecurityItem } from '../../types';
import { generateMockOpenCTIData } from '../mocks/mockDataGenerator';
import { Config } from '../../types';

export const getIndicators = async (config: Config | null): Promise<SecurityItem[]> => {
  if (!config || !config.url || !config.is_active) {
    return generateMockOpenCTIData();
  }

  try {
    const query = `
      query {
        indicators(first: 5, orderBy: created_at, orderMode: desc) {
          edges {
            node {
              id
              name
              created_              pattern_type
              valid_from
            }
          }
        }
      }
    `;

    const response = await axios.post(
      `${config.url}/graphql`,
      { query },
      {
        headers: {
          'Authorization': `Bearer ${config.api_key}`,
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      }
    );

    return normalizeOpenCTIData(response.data);
  } catch (error: any) {
    throw new Error(`OpenCTI falhou: ${error.message}`);
  }
};

const normalizeOpenCTIData = (data: any): SecurityItem[] => {
  if (!data.data || !data.data.indicators || !data.data.indicators.edges) {
    return [];
  }

  return data.data.indicators.edges.slice(0, 5).map((edge: any) => {
    const node = edge.node;
    return {
      id: node.id,
      title: node.name || 'Indicador sem nome',
      severity: 'medium',
      timestamp: node.valid_from || node.created_at || new Date().toISOString(),
      type: node.pattern_type || 'Unknown',
    };
  });
};
