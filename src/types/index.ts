export interface Contact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isEmergency: boolean;
  avatar?: string;
  lastLocation?: string;
}

export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  safetyScore: number; // 1 to 10 scale
  status: 'safe' | 'warning' | 'danger';
  crowdLevel: 'high' | 'medium' | 'low';
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'alert' | 'info' | 'success';
  isRead: boolean;
}

export interface AnalyticsData {
  safetyScoreTrend: { month: string; value: number }[];
  emergencyEvents: { category: string; count: number }[];
  dangerZonesResolved: number;
  avgResponseTimeSec: number;
  totalAlertsSent: number;
}

export interface EmergencyRecord {
  id: string;
  contactName: string;
  phone: string;
  time: string;
  type: 'SOS Button' | 'Voice Trigger' | 'Panic Detection' | 'Geofence Exit';
  status: 'Resolved' | 'Dispatched' | 'Active';
}

export interface SOSRequest {
  latitude: number;
  longitude: number;
  timestamp: string;
  accuracy?: number;
}

export interface SOSResponse {
  success: boolean;
  incidentId: string;
  status: 'Active' | 'Dispatched' | 'Resolved';
  message: string;
  timestamp: string;
}

export interface SafeRouteQuery {
  start: string;
  destination: string;
  startCoords?: [number, number];
  destCoords?: [number, number];
}

export interface SafeRouteResult {
  id: string;
  name: string;
  distance: string;
  duration: string;
  safetyScore: number;
  lightsRating: 'Excellent' | 'Moderate' | 'Poor';
  crowdLevel: 'high' | 'medium' | 'low';
  alertsCount: number;
  waypoints: [number, number][];
}

export interface PanicTelemetry {
  heartRate: number;
  gForce: number;
  deviceState: 'Stable' | 'Potential Fall' | 'Impact Alert';
  voiceIntensity: number;
  stressLevel: number;
  confidenceScore: number;
  dominantEmotion: string;
  isBreach: boolean;
}

