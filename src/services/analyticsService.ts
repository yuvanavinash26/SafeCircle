import apiClient from './apiClient';
import type { AnalyticsData } from '../types';

export const analyticsService = {
  getAnalyticsData: async (): Promise<AnalyticsData> => {
    const response = await apiClient.get<AnalyticsData>('/analytics');
    return response.data;
  }
};

export default analyticsService;
