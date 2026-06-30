import { Router } from 'express';
import { LocationController } from '../controllers/LocationController.js';
import { authMiddleware, validateRequest } from '../middlewares/index.js';
import { locationValidator } from '../utils/validators.js';

const router = Router();

router.use(authMiddleware);

router.post('/live', locationValidator, validateRequest, LocationController.updateLiveLocation);
router.post('/', locationValidator, validateRequest, LocationController.updateLiveLocation);
router.get('/current', LocationController.getCurrentLocation);
router.get('/', LocationController.getCurrentLocation);
router.get('/history', LocationController.getRouteHistory);

export default router;
