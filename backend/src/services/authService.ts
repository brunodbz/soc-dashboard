import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../database/connection';
import { User, JWTPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';
const BCRYPT_ROUNDS = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, BCRYPT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Token inválido ou expirado');
  }
};

export const login = async (
  username: string,
  password: string
): Promise<{ token: string; user: { id: number; username: string } }> => {
  const result = await query(
    'SELECT id, username, password_hash FROM users WHERE username = $1',
    [username]
  );

  if (result.rows.length === 0) {
    throw new Error('Credenciais inválidas');
  }

  const user = result.rows[0];
  const isPasswordValid = await comparePassword(password, user.password_hash);

  if (!isPasswordValid) {
    throw new Error('Credenciais inválidas');
  }

  const payload: JWTPayload = {
    userId: user.id,
    username: user.username,
  };

  const token = generateToken(payload);

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
    },
  };
};

export const createUser = async (
  username: string,
  password: string
): Promise<User> => {
  const passwordHash = await hashPassword(password);
  
  const result = await query(
    'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at',
    [username, passwordHash]
  );

  return result.rows[0];
};
