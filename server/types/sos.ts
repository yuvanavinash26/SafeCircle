import { Document, Types } from 'mongoose';

export type SOSTriggerType = 'SOS Button' | 'Voice Trigger' | 'Panic Detection' | 'Geofence Exit' | 'Fake Call Trigger';
export type SOSStatus = 'Resolved' | 'Dispatched' | 'Active';

export interface IEmergencyLog {
  userId?: Types.ObjectId | string;
  contactName: string;
  phone: string;
  time: string;
  type: SOSTriggerType;
  status: SOSStatus;
  coordinates?: {
    lat: number;
    lng: number;
  };
  notes?: string;
}

export interface IEmergencyLogDocument extends IEmergencyLog, Document {
  createdAt: Date;
  updatedAt: Date;
}

export type NotificationType = 'alert' | 'info' | 'success';

export interface INotification {
  userId?: Types.ObjectId | string;
  title: string;
  description: string;
  timestamp: string;
  type: NotificationType;
  isRead: boolean;
}

export interface INotificationDocument extends INotification, Document {
  createdAt: Date;
  updatedAt: Date;
}
