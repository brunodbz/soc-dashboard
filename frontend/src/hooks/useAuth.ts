import { useState, useEffect } from 'react';
import * as authService from '../services/authService';
import { User } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(authService.getUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authService.isAuthenticated());

  useEffect(() => {
    setUser(authService.getUser());
    setIsAuthenticated(authService.isAuthenticated());
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await authService.login(username, password);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
}
