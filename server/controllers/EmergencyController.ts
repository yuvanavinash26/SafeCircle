import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/request.js';
import { EmergencyLog } from '../models/EmergencyLog.js';
import { ResponseHelper } from '../utils/responseHelper.js';
import { HTTP_STATUS } from '../utils/constants.js';

export class EmergencyController {
  /**
   * Create Emergency Log
   */
  public static async createEmergencyLog(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const { contactName, phone, time, type, status, coordinates, notes } = req.body;

      const timeStr = time || new Date().toISOString().replace('T', ' ').substring(0, 16);

      const log = await EmergencyLog.create({
        userId,
        contactName: contactName || 'General Emergency Helpline',
        phone: phone || '112',
        time: timeStr,
        type: type || 'Panic Detection',
        status: status || 'Resolved',
        coordinates: coordinates || { lat: 28.6304, lng: 77.2177 },
        notes: notes || 'Automated emergency log entry',
      });

      const formatted = {
        id: log._id.toString(),
        ...log.toObject(),
      };

      ResponseHelper.success(res, formatted, 'Emergency log created successfully', HTTP_STATUS.CREATED);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Emergency History
   */
  public static async getEmergencyHistory(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const logs = await EmergencyLog.find().sort({ createdAt: -1 });

      const formatted = logs.map((log) => ({
        id: log._id.toString(),
        ...log.toObject(),
      }));

      ResponseHelper.success(res, formatted, 'Emergency history retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}
