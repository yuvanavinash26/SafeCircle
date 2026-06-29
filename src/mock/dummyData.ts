import type { Contact, Location, Notification, AnalyticsData, EmergencyRecord } from '../types';

export const mockContacts: Contact[] = [
  {
    id: 'c1',
    name: 'Aarav Sharma',
    relationship: 'Father',
    phone: '+91 98765 43210',
    isEmergency: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    lastLocation: 'South Ext, New Delhi'
  },
  {
    id: 'c2',
    name: 'Priya Sharma',
    relationship: 'Mother',
    phone: '+91 98765 43211',
    isEmergency: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    lastLocation: 'Connaught Place, New Delhi'
  },
  {
    id: 'c3',
    name: 'Rohan Gupta',
    relationship: 'Friend (Local)',
    phone: '+91 99999 88888',
    isEmergency: false,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    lastLocation: 'Noida Sector 62'
  },
  {
    id: 'c4',
    name: 'National Emergency Service',
    relationship: 'Police Helpline',
    phone: '112',
    isEmergency: true,
  },
  {
    id: 'c5',
    name: 'Women Helpline',
    relationship: 'National Women Safety',
    phone: '1091',
    isEmergency: true,
  }
];

export const mockLocations: Location[] = [
  {
    id: 'l1',
    name: 'Connaught Place, New Delhi',
    lat: 28.6304,
    lng: 77.2177,
    safetyScore: 8.5,
    status: 'safe',
    crowdLevel: 'high'
  },
  {
    id: 'l2',
    name: 'Koramangala 5th Block, Bengaluru',
    lat: 12.9348,
    lng: 77.6227,
    safetyScore: 9.0,
    status: 'safe',
    crowdLevel: 'high'
  },
  {
    id: 'l3',
    name: 'Marine Drive, Mumbai',
    lat: 18.9438,
    lng: 72.8226,
    safetyScore: 8.8,
    status: 'safe',
    crowdLevel: 'high'
  },
  {
    id: 'l4',
    name: 'Noida Sector 18 Metro',
    lat: 28.5708,
    lng: 77.3261,
    safetyScore: 5.5,
    status: 'warning',
    crowdLevel: 'medium'
  },
  {
    id: 'l5',
    name: 'Old Delhi Market Alleys',
    lat: 28.6562,
    lng: 77.2309,
    safetyScore: 4.2,
    status: 'danger',
    crowdLevel: 'low'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'SOS Emergency Alert',
    description: 'Panic trigger registered from Rohan Gupta. Auto-broadcasting coordinates.',
    timestamp: '10 mins ago',
    type: 'alert',
    isRead: false
  },
  {
    id: 'n2',
    title: 'Safe Zone Geofence Exit',
    description: 'You have exited the designated safe perimeter around Noida Sector 62.',
    timestamp: '1 hour ago',
    type: 'info',
    isRead: false
  },
  {
    id: 'n3',
    title: 'AI Companion Running',
    description: 'Background AI Voice Assistant is actively listening for vocal panic commands.',
    timestamp: '2 hours ago',
    type: 'success',
    isRead: true
  }
];

export const mockAnalytics: AnalyticsData = {
  safetyScoreTrend: [
    { month: 'Jan', value: 7.2 },
    { month: 'Feb', value: 7.5 },
    { month: 'Mar', value: 7.8 },
    { month: 'Apr', value: 8.1 },
    { month: 'May', value: 8.4 },
    { month: 'Jun', value: 8.9 }
  ],
  emergencyEvents: [
    { category: 'SOS Button Triggers', count: 12 },
    { category: 'Voice Activation Alerts', count: 5 },
    { category: 'AI Heart-rate Panic', count: 3 },
    { category: 'Geofence Breach Alerts', count: 8 }
  ],
  dangerZonesResolved: 47,
  avgResponseTimeSec: 4.8,
  totalAlertsSent: 154
};

export const mockEmergencyHistory: EmergencyRecord[] = [
  {
    id: 'e1',
    contactName: 'Aarav Sharma',
    phone: '+91 98765 43210',
    time: '2026-06-28 23:45',
    type: 'Panic Detection',
    status: 'Resolved'
  },
  {
    id: 'e2',
    contactName: 'National Emergency Service (112)',
    phone: '112',
    time: '2026-06-20 18:22',
    type: 'SOS Button',
    status: 'Dispatched'
  },
  {
    id: 'e3',
    contactName: 'Priya Sharma',
    phone: '+91 98765 43211',
    time: '2026-06-15 01:10',
    type: 'Voice Trigger',
    status: 'Resolved'
  }
];
