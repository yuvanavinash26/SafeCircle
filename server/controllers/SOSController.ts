import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/request.js';
import { EmergencyLog } from '../models/EmergencyLog.js';
import { EmergencyContact } from '../models/EmergencyContact.js';
import { ResponseHelper } from '../utils/responseHelper.js';
import { HTTP_STATUS } from '../utils/constants.js';
import { notificationService, smsService, emailService } from '../services/index.js';
import { AppError } from '../utils/AppError.js';

export class SOSController {
  /**
   * Trigger SOS
   */
  public static async triggerSOS(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const { type = 'SOS Button', coordinates = { lat: 28.6304, lng: 77.2177 }, notes = 'EMERGENCY SOS TRIGGERED' } = req.body;

      // Find emergency contacts
      const contacts = await EmergencyContact.find({ isEmergency: true });

      const primaryContact = contacts[0] || {
        name: 'National Emergency Service (112)',
        phone: '112',
      };

      const timeStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

      // 1. Create Emergency Log
      const emergencyLog = await EmergencyLog.create({
        userId,
        contactName: primaryContact.name,
        phone: primaryContact.phone,
        time: timeStr,
        type,
        status: 'Active',
        coordinates,
        notes,
      });

      // 2. Trigger Push Notification Service
      await notificationService.sendPushNotification({
        userId,
        title: `CRITICAL ALERT: ${type} Triggered`,
        description: `Emergency broadcast initiated at Lat: ${coordinates.lat}, Lng: ${coordinates.lng}. Alerting trusted contacts.`,
        type: 'alert',
      });

      // 3. Dispatch SMS alerts asynchronously
      for (const contact of contacts) {
        await smsService.sendEmergencySMS({
          toPhone: contact.phone,
          messageBody: `URGENT SOS ALERT! User triggered ${type}. Location: Lat ${coordinates.lat}, Lng ${coordinates.lng}. Please assist immediately!`,
        });
      }

      // 4. Send Email report
      if (req.user?.email) {
        await emailService.sendEmail({
          toEmail: req.user.email,
          subject: `EMERGENCY ALERT: ${type} ACTIVATED`,
          htmlContent: `<h3>SOS Triggered</h3><p>Your emergency alert was broadcasted to ${contacts.length} contacts.</p>`,
        });
      }

      const formatted = {
        id: emergencyLog._id.toString(),
        ...emergencyLog.toObject(),
      };

      ResponseHelper.success(
        res,
        { log: formatted, contactsAlerted: contacts.length },
        'SOS emergency alert triggered and broadcasted successfully',
        HTTP_STATUS.CREATED
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Stop SOS
   */
  public static async stopSOS(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { logId } = req.body;

      if (logId) {
        await EmergencyLog.findByIdAndUpdate(logId, { status: 'Resolved' });
      } else {
        // Mark all active logs as Resolved
        await EmergencyLog.updateMany({ status: 'Active' }, { status: 'Resolved' });
      }

      await notificationService.sendPushNotification({
        title: 'SOS Alert Stopped',
        description: 'You have deactivated the active emergency SOS alert. Safety status restored.',
        type: 'success',
      });

      ResponseHelper.success(res, { resolved: true }, 'SOS emergency alert stopped successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get SOS History
   */
  public static async getSOSHistory(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const history = await EmergencyLog.find().sort({ createdAt: -1 });

      const formatted = history.map((log) => ({
        id: log._id.toString(),
        ...log.toObject(),
      }));

      ResponseHelper.success(res, formatted, 'SOS history retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}
