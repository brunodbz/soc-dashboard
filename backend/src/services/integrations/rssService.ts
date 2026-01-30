import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { SecurityItem } from '../../types';
import { generateMockRSSData } from '../mocks/mockDataGenerator';
import { Config } from '../../types';

export const getFeeds = async (config: Config | null): Promise<SecurityItem[]> => {
  if (!config || !config.url || !config.is_active) {
    return generateMockRSSData();
  }

  try {
    const response = await axios.get(config.url, {
      headers: {
        'User-Agent': 'SOC-Dashboard/1.0',
      },
      timeout: 5000,
    });

    const result = await parseStringPromise(response.data);
    return normalizeRSSData(result);
  } catch (error: any) {
    throw new Error(`RSS Feed falhou: ${error.message}`);
  }
};

const normalizeRSSData = (data: any): SecurityItem[] => {
  try {
    const items = data.rss?.channel?.[0]?.item || data.feed?.entry || [];
    
    return items.slice(0, 5).map((item: any, index: number) => {
      const title = item.title?.[0] || item.title || 'Notícia sem título';
      const link = item.link?.[0]?._ || item.link?.[0] || item.link?.href || '#';
      const pubDate = item.pubDate?.[0] || item.published?.[0] || new Date().toISOString();

      return {
        id: `rss-${Date.now()}-${index}`,
        title: typeof title === 'string' ? title : title._,
        severity: determineSeverityFromTitle(title),
        timestamp: pubDate,
        link: typeof link === 'string' ? link : link._,
      };
    });
  } catch (error) {
    return [];
  }
};

const determineSeverityFromTitle = (title: string): 'medium' | 'low' => {
  const titleLower = String(title).toLowerCase();
  
  if (
    titleLower.includes('critical') ||
    titleLower.includes('urgent') ||
    titleLower.includes('zero-day') ||
    titleLower.includes('breach')
  ) {
    return 'medium';
  }
  
  return 'low';
};
