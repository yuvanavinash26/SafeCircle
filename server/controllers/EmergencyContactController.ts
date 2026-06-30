import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/request.js';
import { EmergencyContact } from '../models/EmergencyContact.js';
import { ResponseHelper } from '../utils/responseHelper.js';
import { HTTP_STATUS } from '../utils/constants.js';
import { AppError } from '../utils/AppError.js';

export class EmergencyContactController {
  /**
   * Add Contact
   */
  public static async addContact(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const { name, relationship, phone, isEmergency, avatar, lastLocation } = req.body;

      const contact = await EmergencyContact.create({
        userId,
        name,
        relationship,
        phone,
        isEmergency: isEmergency !== undefined ? isEmergency : true,
        avatar: avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        lastLocation: lastLocation || 'Location unknown',
      });

      const formatted = {
        id: contact._id.toString(),
        ...contact.toObject(),
      };

      ResponseHelper.success(res, formatted, 'Emergency contact added successfully', HTTP_STATUS.CREATED);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Contacts
   */
  public static async getContacts(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const contacts = await EmergencyContact.find().sort({ createdAt: -1 });

      const formatted = contacts.map((c) => ({
        id: c._id.toString(),
        ...c.toObject(),
      }));

      ResponseHelper.success(res, formatted, 'Emergency contacts retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update Contact
   */
  public static async updateContact(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;

      const contact = await EmergencyContact.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
      if (!contact) {
        throw new AppError('Emergency contact not found', HTTP_STATUS.NOT_FOUND);
      }

      const formatted = {
        id: contact._id.toString(),
        ...contact.toObject(),
      };

      ResponseHelper.success(res, formatted, 'Emergency contact updated successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete Contact
   */
  public static async deleteContact(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;

      const contact = await EmergencyContact.findByIdAndDelete(id);
      if (!contact) {
        throw new AppError('Emergency contact not found', HTTP_STATUS.NOT_FOUND);
      }

      ResponseHelper.success(res, { deletedId: id }, 'Emergency contact deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
