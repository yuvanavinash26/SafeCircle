import { IEmergencyLog } from './sos.js';

export interface SafetyScoreTrendItem {
  month: string;
  value: number;
}

export interface EmergencyEventCategory {
  category: string;
  count: number;
}

export interface IAnalyticsData {
  totalSOS: number;
  emergencyCount: number;
  activeContacts: number;
  weeklyActivity: { day: string; count: number }[];
  safetyScore: number;
  recentEmergencies: IEmergencyLog[];
  // Frontend compatible fields
  safetyScoreTrend: SafetyScoreTrendItem[];
  emergencyEvents: EmergencyEventCategory[];
  dangerZonesResolved: number;
  avgResponseTimeSec: number;
  totalAlertsSent: number;
}
