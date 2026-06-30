import dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config();

interface EnvConfig {
  PORT: number;
  NODE_ENV: string;
  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  CORS_ORIGIN: string;
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX: number;
  VOICE_AI_API_KEY: string;
  MAPS_API_KEY: string;
  SMS_API_KEY: string;
  EMAIL_API_KEY: string;
}

export const env: EnvConfig = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/safecircle',
  JWT_SECRET: process.env.JWT_SECRET || 'super_secret_jwt_key_placeholder_for_safecircle_app_2026',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  VOICE_AI_API_KEY: process.env.VOICE_AI_API_KEY || 'mock_voice_ai_key_placeholder',
  MAPS_API_KEY: process.env.MAPS_API_KEY || 'mock_maps_key_placeholder',
  SMS_API_KEY: process.env.SMS_API_KEY || 'mock_sms_key_placeholder',
  EMAIL_API_KEY: process.env.EMAIL_API_KEY || 'mock_email_key_placeholder',
};
