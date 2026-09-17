import crypto from 'crypto';
import { LabSession, LabDefinition, OperatingSystem, EndpointSpecs } from '../models/types';
import { LAB_CATALOG } from '../models/labs.data';
import { config } from '../config';
import { getOrchestratorDriver, IOrchestratorDriver } from '../drivers';

export class SessionManager {
  private static instance: SessionManager;
  private sessions: Map<string, LabSession> = new Map();
  private driver: IOrchestratorDriver;

  private constructor() {
    this.driver = getOrchestratorDriver();
    // Start background TTL janitor running every 10 seconds
    setInterval(() => this.reapExpiredSessions(), 10000);
  }

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  /**
   * Generates a tamper-proof cryptographic HMAC flag unique to this session & user
   */
  public generateDynamicFlag(userId: string, labId: string): string {
    const hash = crypto
      .createHmac('sha256', config.hmacSecret)
      .update(`${userId}:${labId}:${Date.now()}`)
      .digest('hex')
      .slice(0, 16);
    return `RANGE{${labId}_${hash}}`;
  }

  /**
   * Spawns a new isolated session and triggers driver provisioning
   */
  public async createSession(userId: string, labId: string, os: OperatingSystem, customSessionId?: string): Promise<LabSession> {
    const lab = LAB_CATALOG.find((l) => l.id === labId);
    if (!lab) {
      throw new Error(`Lab with id ${labId} not found`);
    }

    const sessionId = customSessionId || crypto.randomUUID();
    const dynamicFlag = this.generateDynamicFlag(userId, labId);
    const now = Date.now();
    const expiresAt = now + config.sessionTtlMinutes * 60 * 1000;

    const initialEndpoints: EndpointSpecs = {
      terminalWs: `/ws/terminal/${sessionId}`,
      vncUrl: `/vnc/${sessionId}/`,
      ideUrl: `/ide/${sessionId}/`
    };

    const session: LabSession = {
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
    } catch (err) {
      console.warn(`[SessionManager] Primary driver provisioning failed for session ${sessionId}. Falling back to DevMockDriver...`);
      try {
        const { DevMockDriver } = await import('../drivers/dev-mock.driver');
        this.driver = new DevMockDriver();
        const env = await this.driver.provisionSession(session);
        session.namespaceOrNetworkId = env.networkId;
        session.endpoints = env.endpoints;
        session.status = 'active';
        console.log(`[SessionManager] Session ${sessionId} is now ACTIVE via fallback DevMockDriver.`);
        return session;
      } catch (fallbackErr) {
        session.status = 'failed';
        console.error(`[SessionManager] Provisioning completely failed for session ${sessionId}:`, fallbackErr);
        throw fallbackErr;
      }
    }
  }

  public getSession(sessionId: string): LabSession | undefined {
    return this.sessions.get(sessionId);
  }

  public async recoverOrCreateSession(
    sessionId: string,
    labId: string = 'linux',
    os: OperatingSystem = 'Kali Linux'
  ): Promise<LabSession> {
    const existing = this.sessions.get(sessionId);
    if (existing && existing.status === 'active') {
      return existing;
    }
    return this.createSession('user_default', labId, os, sessionId);
  }

  public getAllSessions(): LabSession[] {
    return Array.from(this.sessions.values());
  }

  public async extendSession(sessionId: string, additionalMinutes = 15): Promise<LabSession> {
    const session = this.sessions.get(sessionId);
    if (!session || session.status !== 'active') {
      throw new Error('Active session not found');
    }
    session.expiresAt += additionalMinutes * 60 * 1000;
    return session;
  }

  public async endSession(sessionId: string): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    session.status = 'ended';
    session.endedAt = Date.now();

    try {
      await this.driver.terminateSession(session);
    } catch (err) {
      console.error(`[SessionManager] Error terminating session ${sessionId}:`, err);
    }

    this.sessions.delete(sessionId);
    console.log(`[SessionManager] Session ${sessionId} ended and cleaned up.`);
  }

  /**
   * Background TTL Janitor: destroys sessions that exceeded their countdown
   */
  private async reapExpiredSessions(): Promise<void> {
    const now = Date.now();
    for (const [id, session] of this.sessions.entries()) {
      if (session.status === 'active' && now > session.expiresAt) {
        console.log(`[SessionManager] Session ${id} expired. Reaping resources...`);
        session.status = 'expired';
        await this.endSession(id);
      }
    }
  }

  public getDriver(): IOrchestratorDriver {
    return this.driver;
  }
}
