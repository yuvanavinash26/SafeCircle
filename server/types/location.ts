import { Document, Types } from 'mongoose';

export type LocationStatus = 'safe' | 'warning' | 'danger';
export type CrowdLevel = 'high' | 'medium' | 'low';

export interface ILocation {
  userId?: Types.ObjectId | string;
  name: string;
  lat: number;
  lng: number;
  safetyScore: number;
  status: LocationStatus;
  crowdLevel: CrowdLevel;
  recordedAt?: Date;
}

export interface ILocationDocument extends ILocation, Document {
  createdAt: Date;
  updatedAt: Date;
}
