import mongoose, { Schema } from 'mongoose';
import { IEmergencyContactDocument } from '../types/contact.js';

const EmergencyContactSchema: Schema<IEmergencyContactDocument> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    name: {
      type: String,
      required: [true, 'Contact name is required'],
      trim: true,
    },
    relationship: {
      type: String,
      required: [true, 'Relationship is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    isEmergency: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    lastLocation: {
      type: String,
      default: 'Location unknown',
    },
  },
  {
    timestamps: true,
  }
);

export const EmergencyContact = mongoose.model<IEmergencyContactDocument>('EmergencyContact', EmergencyContactSchema);
