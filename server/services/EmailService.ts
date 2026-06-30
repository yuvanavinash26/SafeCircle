import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

export interface IEmailPayload {
  toEmail: string;
  subject: string;
  htmlContent: string;
}

export class EmailService {
  private apiKey: string;

  constructor() {
    this.apiKey = env.EMAIL_API_KEY;
  }

  /**
   * Placeholder method to send emergency email notifications or SOS summary reports
   */
  public async sendEmail(payload: IEmailPayload): Promise<{ success: boolean }> {
    logger.info('[EmailService] Sending Email:', { to: payload.toEmail, subject: payload.subject });

    return {
      success: true,
    };
  }
}

export const emailService = new EmailService();
