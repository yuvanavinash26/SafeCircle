import { Document } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password?: string;
  phone: string;
  avatar?: string;
  bloodGroup?: string;
  medicalNotes?: string;
  emergencyMessage?: string;
  safetyScore?: number;
  activeGeofence?: {
    lat: number;
    lng: number;
    radiusMeter: number;
    enabled: boolean;
  };
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date;
  updatedAt: Date;
}
