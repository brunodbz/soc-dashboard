import { Request, Response } from 'express';
import * as elasticService from '../services/integrations/elasticService';
import * as defenderService from '../services/integrations/defenderService';
import * as openctiService from '../services/integrations/openctiService';
import * as tenableService from '../services/integrations/tenableService';
import * as rssService from '../services/integrations/rssService';
import * as configService from '../services/configService';
import { DashboardData } from '../types';

export const getDashboardData = async (req: Request, res: Response): Promise<void> => {
  try {
    const [
      elasticConfig,
      defenderConfig,
      openctiConfig,
      tenableConfig,
      rssConfig,
    ] = await Promise.all([
      configService.getConfig('elastic'),
      configService.getConfig('defender'),
      configService.getConfig('opencti'),
      configService.getConfig('tenable'),
      configService.getConfig('rss'),
    ]);

    const results = await Promise.allSettled([
      elasticService.getAlerts(elasticConfig),
      defenderService.getAlerts(defenderConfig),
      openctiService.getIndicators(openctiConfig),
      tenableService.getVulnerabilities(tenableConfig),
      rssService.getFeeds(rssConfig),
    ]);

    const dashboardData: DashboardData = {
      elastic: results[0].status === 'fulfilled' 
        ? results[0].value 
        : { error: results[0].reason.message },
      defender: results[1].status === 'fulfilled' 
        ? results[1].value 
        : { error: results[1].reason.message },
      opencti: results[2].status === 'fulfilled' 
        ? results[2].value 
        : { error: results[2].reason.message },
      tenable: results[3].status === 'fulfilled' 
        ? results[3].value 
        : { error: results[3].reason.message },
      rss: results[4].status === 'fulfilled' 
        ? results[4].value 
        : { error: results[4].reason.message },
    };

    res.json(dashboardData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
