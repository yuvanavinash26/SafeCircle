import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

export interface ISMSPayload {
  toPhone: string;
  messageBody: string;
}

export class SMSService {
  private apiKey: string;

  constructor() {
    this.apiKey = env.SMS_API_KEY;
  }

  /**
   * Placeholder method to dispatch critical emergency SMS to trusted contacts and police helplines
   */
  public async sendEmergencySMS(payload: ISMSPayload): Promise<{ success: boolean; messageId: string }> {
    logger.info('[SMSService] Sending Emergency SMS:', { to: payload.toPhone, body: payload.messageBody });

    // Mock successful SMS dispatch
    return {
      success: true,
      messageId: `sms_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    };
  }
}

export const smsService = new SMSService();
