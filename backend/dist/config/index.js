"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: parseInt(process.env.PORT || '3001', 10),
    host: process.env.HOST || '0.0.0.0',
    env: process.env.NODE_ENV || 'development',
    hmacSecret: process.env.HMAC_SECRET || 'cyberrange-super-secret-key-change-in-production',
    sessionTtlMinutes: parseInt(process.env.SESSION_TTL_MINUTES || '60', 10),
    orchestratorType: (process.env.ORCHESTRATOR_TYPE || 'docker'),
    corsOrigin: process.env.CORS_ORIGIN || '*',
    databaseUrl: process.env.DATABASE_URL || 'postgresql://cyberrange:secret@localhost:5432/cyberrange_db',
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379'
};
