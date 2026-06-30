import mongoose, { Schema } from 'mongoose';
import { IEmergencyLogDocument } from '../types/sos.js';
import { SOS_TRIGGER_TYPES, SOS_STATUS_TYPES } from '../utils/constants.js';

const EmergencyLogSchema: Schema<IEmergencyLogDocument> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    contactName: {
      type: String,
      required: [true, 'Contact name is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    time: {
      type: String,
      default: () => new Date().toISOString().replace('T', ' ').substring(0, 16),
    },
    type: {
      type: String,
      enum: SOS_TRIGGER_TYPES,
      default: 'SOS Button',
    },
    status: {
      type: String,
      enum: SOS_STATUS_TYPES,
      default: 'Active',
    },
    coordinates: {
      lat: { type: Number, default: 28.6304 },
      lng: { type: Number, default: 77.2177 },
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const EmergencyLog = mongoose.model<IEmergencyLogDocument>('EmergencyLog', EmergencyLogSchema);
