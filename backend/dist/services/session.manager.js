"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManager = void 0;
const crypto_1 = __importDefault(require("crypto"));
const labs_data_1 = require("../models/labs.data");
const config_1 = require("../config");
const drivers_1 = require("../drivers");
class SessionManager {
    static instance;
    sessions = new Map();
    driver;
    constructor() {
        this.driver = (0, drivers_1.getOrchestratorDriver)();
        // Start background TTL janitor running every 10 seconds
        setInterval(() => this.reapExpiredSessions(), 10000);
    }
    static getInstance() {
        if (!SessionManager.instance) {
            SessionManager.instance = new SessionManager();
        }
        return SessionManager.instance;
    }
    /**
     * Generates a tamper-proof cryptographic HMAC flag unique to this session & user
     */
    generateDynamicFlag(userId, labId) {
        const hash = crypto_1.default
            .createHmac('sha256', config_1.config.hmacSecret)
            .update(`${userId}:${labId}:${Date.now()}`)
            .digest('hex')
            .slice(0, 16);
        return `RANGE{${labId}_${hash}}`;
    }
    /**
     * Spawns a new isolated session and triggers driver provisioning
     */
    async createSession(userId, labId, os, customSessionId) {
        const lab = labs_data_1.LAB_CATALOG.find((l) => l.id === labId);
        if (!lab) {
            throw new Error(`Lab with id ${labId} not found`);
        }
        const sessionId = customSessionId || crypto_1.default.randomUUID();
        const dynamicFlag = this.generateDynamicFlag(userId, labId);
        const now = Date.now();
        const expiresAt = now + config_1.config.sessionTtlMinutes * 60 * 1000;
        const initialEndpoints = {
            terminalWs: `/ws/terminal/${sessionId}`,
            vncUrl: `/vnc/${sessionId}/`,
            ideUrl: `/ide/${sessionId}/`
        };
        const session = {
            id: sessionId,
            userId,
            labId,
            lab,
            os,
            status: 'provisioning',
            dynamicFlag,
            completedObjectives: [],
            createdAt: now,
            expiresAt,
            namespaceOrNetworkId: '',
            endpoints: initialEndpoints,
            outputLog: [
                'Welcome to your Cyberrange practice workspace.',
                `Workstation: ${os} | Network: 10.10.0.0/24 (Isolated)`,
                'Environment initialized.'
            ]
        };
        this.sessions.set(sessionId, session);
        try {
            const env = await this.driver.provisionSession(session);
            session.namespaceOrNetworkId = env.networkId;
            session.endpoints = env.endpoints;
            session.status = 'active';
            console.log(`[SessionManager] Session ${sessionId} is now ACTIVE.`);
            return session;
        }
        catch (err) {
            console.warn(`[SessionManager] Primary driver provisioning failed for session ${sessionId}. Falling back to DevMockDriver...`);
            try {
                const { DevMockDriver } = await Promise.resolve().then(() => __importStar(require('../drivers/dev-mock.driver')));
                this.driver = new DevMockDriver();
                const env = await this.driver.provisionSession(session);
                session.namespaceOrNetworkId = env.networkId;
                session.endpoints = env.endpoints;
                session.status = 'active';
                console.log(`[SessionManager] Session ${sessionId} is now ACTIVE via fallback DevMockDriver.`);
                return session;
            }
            catch (fallbackErr) {
                session.status = 'failed';
                console.error(`[SessionManager] Provisioning completely failed for session ${sessionId}:`, fallbackErr);
                throw fallbackErr;
            }
        }
    }
    getSession(sessionId) {
        return this.sessions.get(sessionId);
    }
    async recoverOrCreateSession(sessionId, labId = 'linux', os = 'Kali Linux') {
        const existing = this.sessions.get(sessionId);
        if (existing && existing.status === 'active') {
            return existing;
        }
        return this.createSession('user_default', labId, os, sessionId);
    }
    getAllSessions() {
        return Array.from(this.sessions.values());
    }
    async extendSession(sessionId, additionalMinutes = 15) {
        const session = this.sessions.get(sessionId);
        if (!session || session.status !== 'active') {
            throw new Error('Active session not found');
        }
        session.expiresAt += additionalMinutes * 60 * 1000;
        return session;
    }
    async endSession(sessionId) {
        const session = this.sessions.get(sessionId);
        if (!session)
            return;
        session.status = 'ended';
        session.endedAt = Date.now();
        try {
            await this.driver.terminateSession(session);
        }
        catch (err) {
            console.error(`[SessionManager] Error terminating session ${sessionId}:`, err);
        }
        this.sessions.delete(sessionId);
        console.log(`[SessionManager] Session ${sessionId} ended and cleaned up.`);
    }
    /**
     * Background TTL Janitor: destroys sessions that exceeded their countdown
     */
    async reapExpiredSessions() {
        const now = Date.now();
        for (const [id, session] of this.sessions.entries()) {
            if (session.status === 'active' && now > session.expiresAt) {
                console.log(`[SessionManager] Session ${id} expired. Reaping resources...`);
                session.status = 'expired';
                await this.endSession(id);
            }
        }
    }
    getDriver() {
        return this.driver;
    }
}
exports.SessionManager = SessionManager;
