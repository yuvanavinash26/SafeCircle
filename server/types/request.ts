import { Request } from 'express';
import { IUserDocument } from './user.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}
