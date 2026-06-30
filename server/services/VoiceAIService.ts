import { logger } from '../utils/logger.js';
import { env } from '../config/env.js';

export interface IVoiceAnalysisRequest {
  audioStreamUrl?: string;
  transcriptText?: string;
  userId?: string;
}

export interface IVoiceAnalysisResult {
  panicDetected: boolean;
  confidenceScore: number;
  detectedKeywords: string[];
  recommendedAction: 'TriggerSOS' | 'LogWarning' | 'None';
}

export class VoiceAIService {
  private apiKey: string;

  constructor() {
    this.apiKey = env.VOICE_AI_API_KEY;
  }

  /**
   * Placeholder method to analyze live audio stream or transcript for distress / panic keywords
   */
  public async analyzeVoiceStream(request: IVoiceAnalysisRequest): Promise<IVoiceAnalysisResult> {
    logger.info('[VoiceAIService] Processing voice input analysis...', { userId: request.userId });

    // Mock keyword check
    const panicKeywords = ['help', 'save me', 'police', 'emergency', 'stop'];
    const transcript = (request.transcriptText || '').toLowerCase();
    const matches = panicKeywords.filter((kw) => transcript.includes(kw));

    const panicDetected = matches.length > 0;
    const result: IVoiceAnalysisResult = {
      panicDetected,
      confidenceScore: panicDetected ? 0.94 : 0.1,
      detectedKeywords: matches,
      recommendedAction: panicDetected ? 'TriggerSOS' : 'None',
    };

    logger.info('[VoiceAIService] Analysis complete.', result);
    return result;
  }
}

export const voiceAIService = new VoiceAIService();
