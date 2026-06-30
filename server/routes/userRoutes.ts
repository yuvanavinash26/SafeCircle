import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';
import { authMiddleware, validateRequest } from '../middlewares/index.js';
import { userRegistrationValidator, userUpdateValidator } from '../utils/validators.js';

const router = Router();

router.post('/register', userRegistrationValidator, validateRequest, UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/profile', authMiddleware, UserController.getProfile);
router.put('/profile', authMiddleware, userUpdateValidator, validateRequest, UserController.updateProfile);

export default router;
