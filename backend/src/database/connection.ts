import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'soc_dashboard',
  user: process.env.DB_USER || 'socadmin',
  password: process.env.DB_PASSWORD || 'securepassword',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  console.error('Erro inesperado no pool de conexões:', err);
  process.exit(-1);
});

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Query executada:', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Erro na query:', { text, error });
    throw error;
  }
};

export const getClient = async (): Promise<PoolClient> => {
  return await pool.connect();
};

export const encryptData = async (data: string): Promise<Buffer> => {
  const encryptionKey = process.env.ENCRYPTION_KEY || 'default-key-32-chars-required!!';
  const result = await query(
    `SELECT pgp_sym_encrypt($1, $2) as encrypted`,
    [data, encryptionKey]
  );
  return result.rows[0].encrypted;
};

export const decryptData = async (encryptedData: Buffer): Promise<string> => {
  const encryptionKey = process.env.ENCRYPTION_KEY || 'default-key-32-chars-required!!';
  const result = await query(
    `SELECT pgp_sym_decrypt($1, $2) as decrypted`,
    [encryptedData, encryptionKey]
  );
  return result.rows[0].decrypted;
};

export default pool;
