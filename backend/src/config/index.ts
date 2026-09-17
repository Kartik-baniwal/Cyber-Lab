import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  host: process.env.HOST || '0.0.0.0',
  env: process.env.NODE_ENV || 'development',
  hmacSecret: process.env.HMAC_SECRET || 'cyberrange-super-secret-key-change-in-production',
  sessionTtlMinutes: parseInt(process.env.SESSION_TTL_MINUTES || '60', 10),
  orchestratorType: (process.env.ORCHESTRATOR_TYPE || 'dev-mock') as 'kubernetes' | 'docker' | 'dev-mock',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://cyberrange:secret@localhost:5432/cyberrange_db',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379'
};
