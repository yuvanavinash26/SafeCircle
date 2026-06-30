import { Router, Request, Response } from 'express';
import userRoutes from './userRoutes.js';
import contactRoutes from './contactRoutes.js';
import locationRoutes from './locationRoutes.js';
import sosRoutes from './sosRoutes.js';
import emergencyRoutes from './emergencyRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';
import mongoose from 'mongoose';
import { ResponseHelper } from '../utils/responseHelper.js';

const router = Router();

// Health Check Endpoint
router.get('/health', (req: Request, res: Response) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  ResponseHelper.success(res, {
    status: 'healthy',
    uptime: process.uptime(),
    database: dbStatus,
    timestamp: new Date().toISOString(),
  }, 'SafeCircle API backend is running properly');
});

// REST API routes
router.use('/users', userRoutes);
router.use('/contacts', contactRoutes);
router.use('/location', locationRoutes);
router.use('/sos', sosRoutes);
router.use('/emergencies', emergencyRoutes);
router.use('/analytics', analyticsRoutes);

export default router;
