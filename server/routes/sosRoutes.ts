import { Router, Response } from 'express';
import { SOSController } from '../controllers/SOSController.js';
import { authMiddleware, validateRequest } from '../middlewares/index.js';
import { sosTriggerValidator } from '../utils/validators.js';
import { voiceAIService } from '../services/VoiceAIService.js';
import { AuthenticatedRequest } from '../types/request.js';
import { ResponseHelper } from '../utils/responseHelper.js';

const router = Router();

router.use(authMiddleware);

router.post('/trigger', sosTriggerValidator, validateRequest, SOSController.triggerSOS);
router.post('/', sosTriggerValidator, validateRequest, SOSController.triggerSOS);
router.post('/stop', SOSController.stopSOS);
router.get('/history', SOSController.getSOSHistory);
router.get('/', SOSController.getSOSHistory);

// Frontend Voice Assistant Integration Endpoint
router.post('/voice-analyze', async (req: AuthenticatedRequest, res: Response) => {
  const { transcriptText } = req.body;
  const result = await voiceAIService.analyzeVoiceStream({
    transcriptText,
    userId: req.user?.id,
  });
  ResponseHelper.success(res, result, 'Voice stream analyzed');
});

export default router;
