import { Document, Types } from 'mongoose';

export interface IEmergencyContact {
  userId?: Types.ObjectId | string;
  name: string;
  relationship: string;
  phone: string;
  isEmergency: boolean;
  avatar?: string;
  lastLocation?: string;
}

export interface IEmergencyContactDocument extends IEmergencyContact, Document {
  createdAt: Date;
  updatedAt: Date;
}
