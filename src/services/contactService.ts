import apiClient from './apiClient';
import type { Contact } from '../types';

export const contactService = {
  getContacts: async (search?: string): Promise<Contact[]> => {
    const params = search ? { q: search } : {};
    const response = await apiClient.get<Contact[]>('/contacts', { params });
    return response.data;
  },

  createContact: async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
    const response = await apiClient.post<Contact>('/contacts', contact);
    return response.data;
  },

  updateContact: async (id: string, contact: Partial<Contact>): Promise<Contact> => {
    const response = await apiClient.put<Contact>(`/contacts/${id}`, contact);
    return response.data;
  },

  deleteContact: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete<{ success: boolean; message: string }>(`/contacts/${id}`);
    return response.data;
  }
};

export default contactService;
