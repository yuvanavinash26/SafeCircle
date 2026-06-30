import { Router } from 'express';
import { EmergencyContactController } from '../controllers/EmergencyContactController.js';
import { authMiddleware, validateRequest } from '../middlewares/index.js';
import { contactValidator } from '../utils/validators.js';

const router = Router();

router.use(authMiddleware);

router.route('/')
  .get(EmergencyContactController.getContacts)
  .post(contactValidator, validateRequest, EmergencyContactController.addContact);

router.route('/:id')
  .put(contactValidator, validateRequest, EmergencyContactController.updateContact)
  .delete(EmergencyContactController.deleteContact);

export default router;
