import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthenticatedRequest } from '../types/request.js';
import { User } from '../models/User.js';
import { ResponseHelper } from '../utils/responseHelper.js';
import { HTTP_STATUS } from '../utils/constants.js';
import { env } from '../config/env.js';
import { AppError } from '../utils/AppError.js';

export class UserController {
  /**
   * Register User
   */
  public static async registerUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, phone, password, bloodGroup, medicalNotes, emergencyMessage } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new AppError('User with this email already exists', HTTP_STATUS.CONFLICT);
      }

      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

      const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        bloodGroup,
        medicalNotes,
        emergencyMessage,
      });

      const token = jwt.sign(
        { id: user._id.toString(), email: user.email, name: user.name },
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRES_IN }
      );

      ResponseHelper.success(
        res,
        { user, token },
        'User registered successfully',
        HTTP_STATUS.CREATED
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * Login (Placeholder generating JWT)
   */
  public static async loginUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;

      let user = await User.findOne({ email }).select('+password');
      if (!user) {
        // In MVP placeholder mode, if user not found, fallback to default seed user or create dummy
        user = await User.findOne();
      }

      if (!user) {
        throw new AppError('No users found in database. Please run seed script.', HTTP_STATUS.NOT_FOUND);
      }

      const token = jwt.sign(
        { id: user._id.toString(), email: user.email, name: user.name },
        env.JWT_SECRET,
        { expiresIn: env.JWT_EXPIRES_IN }
      );

      ResponseHelper.success(res, { user, token }, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Profile
   */
  public static async getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      let user = await User.findById(userId);

      if (!user) {
        user = await User.findOne(); // Fallback to first seeded user
      }

      if (!user) {
        throw new AppError('User profile not found', HTTP_STATUS.NOT_FOUND);
      }

      ResponseHelper.success(res, user, 'Profile fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update Profile
   */
  public static async updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const updates = req.body;

      // Prevent updating sensitive fields directly
      delete updates.password;
      delete updates.email;

      let user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
      if (!user) {
        user = await User.findOneAndUpdate({}, updates, { new: true });
      }

      if (!user) {
        throw new AppError('User not found', HTTP_STATUS.NOT_FOUND);
      }

      ResponseHelper.success(res, user, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  }
}
