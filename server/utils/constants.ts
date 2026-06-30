export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const SOS_TRIGGER_TYPES = [
  'SOS Button',
  'Voice Trigger',
  'Panic Detection',
  'Geofence Exit',
  'Fake Call Trigger',
] as const;

export const SOS_STATUS_TYPES = ['Resolved', 'Dispatched', 'Active'] as const;

export const LOCATION_STATUS_TYPES = ['safe', 'warning', 'danger'] as const;
export const CROWD_LEVEL_TYPES = ['high', 'medium', 'low'] as const;

export const DEFAULT_SAFETY_SCORE = 8.5;
