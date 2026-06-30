import { body, param } from 'express-validator';
import { SOS_TRIGGER_TYPES, SOS_STATUS_TYPES, LOCATION_STATUS_TYPES, CROWD_LEVEL_TYPES } from './constants.js';

export const userRegistrationValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone number is required'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

export const userUpdateValidator = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('phone').optional().trim().notEmpty().withMessage('Phone cannot be empty'),
  body('bloodGroup').optional().isString(),
  body('medicalNotes').optional().isString(),
  body('emergencyMessage').optional().isString(),
];

export const contactValidator = [
  body('name').trim().notEmpty().withMessage('Contact name is required'),
  body('phone').trim().notEmpty().withMessage('Contact phone is required'),
  body('relationship').trim().notEmpty().withMessage('Relationship is required'),
  body('isEmergency').optional().isBoolean().withMessage('isEmergency must be a boolean'),
];

export const locationValidator = [
  body('name').optional().isString(),
  body('lat').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
  body('lng').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180'),
  body('safetyScore').optional().isFloat({ min: 0, max: 10 }).withMessage('Safety score must be between 0 and 10'),
  body('status').optional().isIn(LOCATION_STATUS_TYPES).withMessage(`Status must be one of: ${LOCATION_STATUS_TYPES.join(', ')}`),
  body('crowdLevel').optional().isIn(CROWD_LEVEL_TYPES).withMessage(`Crowd level must be one of: ${CROWD_LEVEL_TYPES.join(', ')}`),
];

export const sosTriggerValidator = [
  body('type').optional().isIn(SOS_TRIGGER_TYPES).withMessage(`Type must be one of: ${SOS_TRIGGER_TYPES.join(', ')}`),
  body('coordinates').optional().isObject(),
  body('coordinates.lat').optional().isFloat(),
  body('coordinates.lng').optional().isFloat(),
];
