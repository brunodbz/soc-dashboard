import { Request, Response } from 'express';
import * as configService from '../services/configService';
import * as auditService from '../services/auditService';

export const getAllConfigs = async (req: Request, res: Response): Promise<void> => {
  try {
    const configs = await configService.getAllConfigs();
    res.json(configs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getConfigById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const config = await configService.getConfigById(id);

    if (!config) {
      res.status(404).json({ error: 'Configuração não encontrada' });
      return;
    }

    res.json(config);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    const config = await configService.saveConfig(req.body);

    if (req.user) {
      await auditService.logAction(
        req.user.userId,
        'CREATE',
        'config',
        config.id || null,
        null,
        req.body,
        req.ip || null
      );
    }

    res.status(201).json(config);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const oldConfig = await configService.getConfigById(id);

    if (!oldConfig) {
      res.status(404).json({ error: 'Configuração não encontrada' });
      return;
    }

    const updatedConfig = await configService.updateConfig(id, req.body);

    if (req.user) {
      await auditService.logAction(
        req.user.userId,
        'UPDATE',
        'config',
        id,
        oldConfig,
        req.body,
        req.ip || null
      );
    }

    res.json(updatedConfig);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteConfig = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const config = await configService.getConfigById(id);

    if (!config) {
      res.status(404).json({ error: 'Configuração não encontrada' });
      return;
    }

    await configService.deleteConfig(id);

    if (req.user) {
      await auditService.logAction(
        req.user.userId,
        'DELETE',
        'config',
        id,
        config,
        null,
        req.ip || null
      );
    }

    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAuditLog = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 100;
    const offset = parseInt(req.query.offset as string) || 0;

    const logs = await auditService.getAuditLog(limit, offset);
    res.json(logs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
