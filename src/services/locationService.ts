import apiClient from './apiClient';
import type { Location } from '../types';

export const locationService = {
  getNearbyPoliceStations: async (lat: number, lng: number): Promise<Location[]> => {
    const response = await apiClient.get<Location[]>('/locations/police', { params: { lat, lng } });
    return response.data;
  },

  getNearbyHospitals: async (lat: number, lng: number): Promise<Location[]> => {
    const response = await apiClient.get<Location[]>('/locations/hospitals', { params: { lat, lng } });
    return response.data;
  },

  getNearbySafeZones: async (lat: number, lng: number): Promise<Location[]> => {
    const response = await apiClient.get<Location[]>('/locations/safe-zones', { params: { lat, lng } });
    return response.data;
  }
};

export default locationService;
