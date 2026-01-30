import { usePolling } from './usePolling';
import api from '../services/api';
import { DashboardData } from '../types';

const fetchDashboardData = async (): Promise<DashboardData> => {
  const response = await api.get<DashboardData>('/dashboard/data');
  return response.data;
};

export function useSecurityData(interval: number = 30000) {
  return usePolling(fetchDashboardData, interval);
}
