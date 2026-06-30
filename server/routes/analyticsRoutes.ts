import { Router } from 'express';
import { AnalyticsController } from '../controllers/AnalyticsController.js';
import { authMiddleware } from '../middlewares/index.js';

const router = Router();

router.get('/', authMiddleware, AnalyticsController.getAnalytics);

export default router;
