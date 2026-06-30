import { Router } from 'express';
import { EmergencyController } from '../controllers/EmergencyController.js';
import { authMiddleware } from '../middlewares/index.js';

const router = Router();

router.use(authMiddleware);

router.route('/')
  .get(EmergencyController.getEmergencyHistory)
  .post(EmergencyController.createEmergencyLog);

export default router;
