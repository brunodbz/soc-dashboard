import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: 'Username e password são obrigatórios' });
      return;
    }

    const result = await authService.login(username, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: 'Username e password são obrigatórios' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: 'Password deve ter no mínimo 6 caracteres' });
      return;
    }

    const user = await authService.createUser(username, password);
    res.status(201).json({ user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
