import type { Contact, Location, EmergencyRecord } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const apiService = {
  // --- EMERGENCY CONTACTS ---
  async getContacts(): Promise<Contact[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/contacts`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data.map((item: any) => ({
          id: item._id || item.id,
          name: item.name,
          relationship: item.relationship || 'Family',
          phone: item.phone,
          isEmergency: item.isPrimary ?? item.isEmergency ?? true
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching contacts from API:', error);
      throw error;
    }
  },

  async addContact(contact: Omit<Contact, 'id'>): Promise<Contact> {
    const res = await fetch(`${API_BASE_URL}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: contact.name,
        relationship: contact.relationship,
        phone: contact.phone,
        isPrimary: contact.isEmergency
      })
    });
    const json = await res.json();
    if (json.success && json.data) {
      const item = json.data;
      return {
        id: item._id || item.id,
        name: item.name,
        relationship: item.relationship,
        phone: item.phone,
        isEmergency: item.isPrimary
      };
    }
    throw new Error(json.message || 'Failed to add contact');
  },

  async deleteContact(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'DELETE'
    });
    const json = await res.json();
    return json.success;
  },

  // --- LOCATIONS ---
  async getLocations(): Promise<Location[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/location/history`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data.map((item: any) => ({
          id: item._id || item.id,
          name: item.name || 'Monitoring Point',
          lat: item.coordinates?.latitude || item.lat || 28.6139,
          lng: item.coordinates?.longitude || item.lng || 77.2090,
          status: item.status || 'safe',
          safetyScore: item.safetyScore || 9.0,
          crowdLevel: item.crowdLevel || 'Moderate'
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching locations from API:', error);
      throw error;
    }
  },

  // --- SOS & EMERGENCY LOGS ---
  async getEmergencyLogs(): Promise<EmergencyRecord[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/emergencies`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data.map((item: any) => ({
          id: item._id || item.id,
          contactName: 'Circle Guardians Dispatched',
          phone: '+91 Alert Broadcast',
          time: new Date(item.timestamp || item.createdAt || Date.now()).toISOString().replace('T', ' ').substring(0, 16),
          type: item.triggerType || 'SOS Button',
          status: item.status || 'Active'
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching emergency logs from API:', error);
      throw error;
    }
  },

  async triggerSOS(): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/sos/trigger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        latitude: 28.6139,
        longitude: 77.2090,
        triggerType: 'SOS Button'
      })
    });
    return res.json();
  },

  async resolveSOS(id: string): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/emergencies/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'Resolved' })
    });
    return res.json();
  },

  // --- ANALYTICS ---
  async getAnalytics(): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/analytics`);
    const json = await res.json();
    return json.success ? json.data : null;
  }
};
