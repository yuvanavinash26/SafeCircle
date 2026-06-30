import mongoose, { Schema } from 'mongoose';
import { INotificationDocument } from '../types/sos.js';

const NotificationSchema: Schema<INotificationDocument> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    title: {
      type: String,
      required: [true, 'Notification title is required'],
    },
    description: {
      type: String,
      required: [true, 'Notification description is required'],
    },
    timestamp: {
      type: String,
      default: 'Just now',
    },
    type: {
      type: String,
      enum: ['alert', 'info', 'success'],
      default: 'info',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.model<INotificationDocument>('Notification', NotificationSchema);
