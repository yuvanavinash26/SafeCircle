import mongoose, { Schema } from 'mongoose';
import { IUserDocument } from '../types/user.js';
import { DEFAULT_SAFETY_SCORE } from '../utils/constants.js';

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    bloodGroup: {
      type: String,
      default: 'O+',
    },
    medicalNotes: {
      type: String,
      default: 'No known allergies',
    },
    emergencyMessage: {
      type: String,
      default: 'EMERGENCY! I need immediate help. My current live location is attached below.',
    },
    safetyScore: {
      type: Number,
      default: DEFAULT_SAFETY_SCORE,
      min: 0,
      max: 10,
    },
    activeGeofence: {
      lat: { type: Number, default: 28.6304 },
      lng: { type: Number, default: 77.2177 },
      radiusMeter: { type: Number, default: 500 },
      enabled: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUserDocument>('User', UserSchema);
