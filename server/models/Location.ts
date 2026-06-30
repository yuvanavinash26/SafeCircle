import mongoose, { Schema } from 'mongoose';
import { ILocationDocument } from '../types/location.js';
import { LOCATION_STATUS_TYPES, CROWD_LEVEL_TYPES } from '../utils/constants.js';

const LocationSchema: Schema<ILocationDocument> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    name: {
      type: String,
      required: [true, 'Location name is required'],
      trim: true,
    },
    lat: {
      type: Number,
      required: [true, 'Latitude is required'],
    },
    lng: {
      type: Number,
      required: [true, 'Longitude is required'],
    },
    safetyScore: {
      type: Number,
      default: 8.0,
      min: 0,
      max: 10,
    },
    status: {
      type: String,
      enum: LOCATION_STATUS_TYPES,
      default: 'safe',
    },
    crowdLevel: {
      type: String,
      enum: CROWD_LEVEL_TYPES,
      default: 'high',
    },
    recordedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const Location = mongoose.model<ILocationDocument>('Location', LocationSchema);
