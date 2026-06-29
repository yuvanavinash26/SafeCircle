import apiClient from './apiClient';
import type { SafeRouteQuery, SafeRouteResult } from '../types';

export const routeService = {
  getSafeRoutes: async (query: SafeRouteQuery): Promise<SafeRouteResult[]> => {
    const response = await apiClient.post<SafeRouteResult[]>('/routes/calculate', query);
    return response.data;
  }
};

export default routeService;
