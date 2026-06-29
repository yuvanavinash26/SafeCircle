import apiClient from './apiClient';
import type { SOSRequest, SOSResponse, EmergencyRecord } from '../types';

export const sosService = {
  triggerSOS: async (payload: SOSRequest): Promise<SOSResponse> => {
    const response = await apiClient.post<SOSResponse>('/sos/trigger', payload);
    return response.data;
  },

  getSOSHistory: async (): Promise<EmergencyRecord[]> => {
    const response = await apiClient.get<EmergencyRecord[]>('/sos/history');
    return response.data;
  },

  resolveSOS: async (incidentId: string): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post<{ success: boolean; message: string }>(`/sos/resolve/${incidentId}`);
    return response.data;
  }
};

export default sosService;
