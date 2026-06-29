import apiClient from './apiClient';
import type { Notification } from '../types';

export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    const response = await apiClient.get<Notification[]>('/notifications');
    return response.data;
  },

  markAllRead: async (): Promise<{ success: boolean }> => {
    const response = await apiClient.post<{ success: boolean }>('/notifications/mark-read');
    return response.data;
  }
};

export default notificationService;
