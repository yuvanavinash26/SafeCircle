import { logger } from '../utils/logger.js';
import { Notification } from '../models/Notification.js';

export interface IPushNotificationPayload {
  userId?: string;
  title: string;
  description: string;
  type?: 'alert' | 'info' | 'success';
}

export class NotificationService {
  /**
   * Placeholder method to broadcast in-app push alerts and save notification to database
   */
  public async sendPushNotification(payload: IPushNotificationPayload): Promise<boolean> {
    logger.info('[NotificationService] Dispatching notification:', payload);

    try {
      await Notification.create({
        userId: payload.userId,
        title: payload.title,
        description: payload.description,
        type: payload.type || 'info',
        timestamp: 'Just now',
        isRead: false,
      });
      return true;
    } catch (error) {
      logger.error('[NotificationService] Failed to persist notification:', error);
      return false;
    }
  }
}

export const notificationService = new NotificationService();
