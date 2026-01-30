import { query, encryptData, decryptData } from '../database/connection';
import { Config } from '../types';

export const saveConfig = async (config: Config): Promise<Config> => {
  const encryptedApiKey = config.api_key ? await encryptData(config.api_key) : null;
  const encryptedToken = config.token ? await encryptData(config.token) : null;

  const result = await query(
    `INSERT INTO configs (service_name, service_type, url, api_key, token, additional_params, is_active)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (service_name) 
     DO UPDATE SET 
       service_type = EXCLUDED.service_type,
       url = EXCLUDED.url,
       api_key = EXCLUDED.api_key,
       token = EXCLUDED.token,
       additional_params = EXCLUDED.additional_params,
       is_active = EXCLUDED.is_active,
       updated_at = NOW()
     RETURNING id, service_name, service_type, url, additional_params, is_active, created_at, updated_at`,
    [
      config.service_name,
      config.service_type,
      config.url,
      encryptedApiKey,
      encryptedToken,
      config.additional_params ? JSON.stringify(config.additional_params) : null,
      config.is_active !== undefined ? config.is_active : true,
    ]
  );

  return result.rows[0];
};

export const getConfig = async (serviceName: string): Promise<Config | null> => {
  const result = await query(
    'SELECT * FROM configs WHERE service_name = $1',
    [serviceName]
  );

  if (result.rows.length === 0) {
    return null;
  }

  const config = result.rows[0];

  return {
    ...config,
    api_key: config.api_key ? await decryptData(config.api_key) : undefined,
    token: config.token ? await decryptData(config.token) : undefined,
  };
};

export const getAllConfigs = async (): Promise<Partial<Config>[]> => {
  const result = await query(
    'SELECT id, service_name, service_type, url, is_active, created_at, updated_at FROM configs ORDER BY service_name'
  );

  return result.rows;
};

export const updateConfig = async (id: number, config: Partial<Config>): Promise<Config> => {
  const currentConfig = await query('SELECT * FROM configs WHERE id = $1', [id]);
  
  if (currentConfig.rows.length === 0) {
    throw new Error('Configuração não encontrada');
  }

  const updates: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (config.service_type !== undefined) {
    updates.push(`service_type = $${paramIndex++}`);
    values.push(config.service_type);
  }

  if (config.url !== undefined) {
    updates.push(`url = $${paramIndex++}`);
    values.push(config.url);
  }

  if (config.api_key !== undefined) {
    const encrypted = config.api_key ? await encryptData(config.api_key) : null;
    updates.push(`api_key = $${paramIndex++}`);
    values.push(encrypted);
  }

  if (config.token !== undefined) {
    const encrypted = config.token ? await encryptData(config.token) : null;
    updates.push(`token = $${paramIndex++}`);
    values.push(encrypted);
  }

  if (config.additional_params !== undefined) {
    updates.push(`additional_params = $${paramIndex++}`);
    values.push(JSON.stringify(config.additional_params));
  }

  if (config.is_active !== undefined) {
    updates.push(`is_active = $${paramIndex++}`);
    values.push(config.is_active);
  }

  updates.push(`updated_at = NOW()`);
  values.push(id);

  const result = await query(
    `UPDATE configs SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING id, service_name, service_type, url, is_active, created_at, updated_at`,
    values
  );

  return result.rows[0];
};

export const deleteConfig = async (id: number): Promise<void> => {
  await query('DELETE FROM configs WHERE id = $1', [id]);
};

export const getConfigById = async (id: number): Promise<Config | null> => {
  const result = await query('SELECT * FROM configs WHERE id = $1', [id]);

  if (result.rows.length === 0) {
    return null;
  }

  const config = result.rows[0];

  return {
    ...config,
    api_key: config.api_key ? await decryptData(config.api_key) : undefined,
    token: config.token ? await decryptData(config.token) : undefined,
  };
};
