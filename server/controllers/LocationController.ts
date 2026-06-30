import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types/request.js';
import { Location } from '../models/Location.js';
import { User } from '../models/User.js';
import { ResponseHelper } from '../utils/responseHelper.js';
import { HTTP_STATUS } from '../utils/constants.js';
import { mapsService } from '../services/MapsService.js';

export class LocationController {
  /**
   * Update Live Location
   */
  public static async updateLiveLocation(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user?.id;
      const { lat, lng, name, safetyScore, status, crowdLevel } = req.body;

      const locationName = name || (await mapsService.reverseGeocode({ lat, lng }));

      const location = await Location.create({
        userId,
        name: locationName,
        lat,
        lng,
        safetyScore: safetyScore !== undefined ? safetyScore : 8.5,
        status: status || 'safe',
        crowdLevel: crowdLevel || 'high',
        recordedAt: new Date(),
      });

      // Update user active geofence center if user exists
      if (userId) {
        await User.findByIdAndUpdate(userId, {
          'activeGeofence.lat': lat,
          'activeGeofence.lng': lng,
        });
      }

      const formatted = {
        id: location._id.toString(),
        ...location.toObject(),
      };

      ResponseHelper.success(res, formatted, 'Live location updated successfully', HTTP_STATUS.CREATED);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Current Location
   */
  public static async getCurrentLocation(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const latestLocation = await Location.findOne().sort({ recordedAt: -1, createdAt: -1 });

      if (!latestLocation) {
        const fallback = {
          id: 'l1',
          name: 'Connaught Place, New Delhi',
          lat: 28.6304,
          lng: 77.2177,
          safetyScore: 8.5,
          status: 'safe',
          crowdLevel: 'high',
        };
        ResponseHelper.success(res, fallback, 'Current location retrieved (fallback)');
        return;
      }

      const formatted = {
        id: latestLocation._id.toString(),
        ...latestLocation.toObject(),
      };

      ResponseHelper.success(res, formatted, 'Current location retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get Route History
   */
  public static async getRouteHistory(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const history = await Location.find().sort({ recordedAt: -1, createdAt: -1 }).limit(20);

      const formatted = history.map((loc) => ({
        id: loc._id.toString(),
        ...loc.toObject(),
      }));

      ResponseHelper.success(res, formatted, 'Route history retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}
