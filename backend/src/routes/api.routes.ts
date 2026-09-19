import { Router, Request, Response } from 'express';
import { LAB_CATALOG } from '../models/labs.data';
import { SessionManager } from '../services/session.manager';
import { FlagService } from '../services/flag.service';
import { OperatingSystem } from '../models/types';
import { blocksCommand, COMMAND_BLOCKED_MESSAGE } from '../services/command-policy';

const router = Router();
const sessionManager = SessionManager.getInstance();
const flagService = FlagService.getInstance();

// API Root / Service Info
router.get('/', (req: Request, res: Response) => {
  res.json({
    service: 'Cyber Lab Backend API & Orchestrator',
    status: 'online',
    version: '2.9.0',
    endpoints: {
      root: '/api',
      health: '/api/health',
      labs: '/api/labs',
      sessions: '/api/sessions',
      progress: '/api/progress'
    },
    documentation: 'https://github.com/Kartik-baniwal/Cyber-Lab'
  });
});

// Health Check
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    activeSessions: sessionManager.getAllSessions().length
  });
});

// Lab Catalog Endpoints
router.get('/labs', (req: Request, res: Response) => {
  res.json(LAB_CATALOG);
});

router.get('/labs/:id', (req: Request, res: Response) => {
  const lab = LAB_CATALOG.find((l) => l.id === req.params.id);
  if (!lab) {
    return res.status(404).json({ error: 'Lab not found' });
  }
  res.json(lab);
});

router.get('/sessions', (req: Request, res: Response) => {
  res.json(sessionManager.getAllSessions());
});

// Session Lifecycle Endpoints
router.post('/sessions', async (req: Request, res: Response) => {
  try {
    const { labId, os, userId = 'user_default' } = req.body;

    if (!labId || !os) {
      return res.status(400).json({ error: 'Missing labId or os parameter' });
    }

    const lab = LAB_CATALOG.find(l => l.id === labId);
    if (!lab) return res.status(404).json({ error: 'Lab not found' });
    if (os !== lab.os) return res.status(400).json({ error: `${lab.name} requires ${lab.os}. Choose the matching OS lab.` });

    // Check if user already has an active session
    const existing = sessionManager.getAllSessions().find(
      (s) => s.userId === userId && s.status === 'active'
    );
    if (existing) {
      if (existing.labId === labId && existing.os === os) {
        return res.status(200).json(existing);
      }
      // If launching another lab or OS, cleanly close the previous session
      await sessionManager.endSession(existing.id);
    }

    const session = await sessionManager.createSession(userId, labId, os as OperatingSystem);
    res.status(201).json(session);
  } catch (err: any) {
    console.error('Error creating session:', err);
    res.status(500).json({ error: err.message || 'Failed to launch session' });
  }
});

router.get('/sessions/:id', (req: Request, res: Response) => {
  const session = sessionManager.getSession(req.params.id);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  res.json(session);
});

router.post('/sessions/:id/extend', async (req: Request, res: Response) => {
  try {
    const session = await sessionManager.extendSession(req.params.id, 15);
    res.json({ message: 'Session extended by 15 minutes', session });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/sessions/:id/end', async (req: Request, res: Response) => {
  try {
    await sessionManager.endSession(req.params.id);
    res.json({ message: 'Session ended successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/sessions/:id', async (req: Request, res: Response) => {
  try {
    await sessionManager.endSession(req.params.id);
    res.json({ message: 'Session ended successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Command Execution (REST alternative to WebSocket)
router.post('/sessions/:id/command', async (req: Request, res: Response) => {
  let session = sessionManager.getSession(req.params.id);
  if (!session || session.status !== 'active') {
    try {
      session = await sessionManager.recoverOrCreateSession(req.params.id, 'kali-sandbox', 'Kali Linux');
    } catch (e) {
      console.error('[API] Failed to auto-recover session:', e);
    }
  }

  if (!session || session.status !== 'active') {
    return res.status(404).json({ error: 'Active session not found' });
  }

  const { command } = req.body;
  if (!command) {
    return res.status(400).json({ error: 'No command provided' });
  }

  const cleanCmd = command.trim();
  if (blocksCommand(session, cleanCmd)) {
    return res.json({
      command: cleanCmd,
      output: `${COMMAND_BLOCKED_MESSAGE}\n`,
      exitCode: 126,
      completedObjectives: session.completedObjectives
    });
  }
  const result = await sessionManager.getDriver().executeCommand(session, cleanCmd);
  if (result.exitCode !== 0) return res.json({ command: cleanCmd, output: result.stdout, exitCode: result.exitCode, completedObjectives: session.completedObjectives });
  const lowCmd = cleanCmd.toLowerCase();
  const cmd0 = (session.lab.commands[0] || '').toLowerCase();
  const cmd1 = (session.lab.commands[1] || '').toLowerCase();

  // Check objective 0
  if (
    cleanCmd === session.lab.commands[0] ||
    (cmd0.includes('uname') && (lowCmd.includes('uname') || lowCmd === 'whoami')) ||
    (cmd0.includes('ip addr') && (lowCmd.startsWith('ip a') || lowCmd.startsWith('ip addr') || lowCmd.startsWith('ifconfig'))) ||
    (cmd0.includes('pwd') && lowCmd === 'pwd') ||
    (cmd0.includes('curl') && lowCmd.startsWith('curl')) ||
    (cmd0.includes('ls') && lowCmd.startsWith('ls')) ||
    (cmd0.includes('auth.log') && lowCmd.includes('auth.log')) ||
    (cmd0.includes('ps') && lowCmd.startsWith('ps'))
  ) {
    flagService.completeObjective(session.id, 0);
  }

  // Check objective 1
  if (
    cleanCmd === session.lab.commands[1] ||
    (cmd1.includes('kali-tools') && (lowCmd.includes('kali-tools') || lowCmd.includes('which') || lowCmd === 'tools')) ||
    (cmd1.includes('nmap') && lowCmd.startsWith('nmap')) ||
    (cmd1.includes('ls') && lowCmd.startsWith('ls')) ||
    (cmd1.includes('notes') && lowCmd.includes('notes')) ||
    (cmd1.includes('chmod') && lowCmd.includes('chmod')) ||
    (cmd1.includes('grep') && lowCmd.includes('grep')) ||
    (cmd1.includes('kill') && lowCmd.includes('kill'))
  ) {
    flagService.completeObjective(session.id, 1);
  }

  res.json({
    command: cleanCmd,
    output: result.stdout,
    exitCode: result.exitCode,
    completedObjectives: session.completedObjectives
  });
});

// Flag Submission & Verification
router.post('/sessions/:id/flags', (req: Request, res: Response) => {
  const { flag } = req.body;
  if (!flag) {
    return res.status(400).json({ error: 'No flag provided' });
  }

  const result = flagService.validateFlag(req.params.id, flag);
  if (!result.success) {
    return res.status(400).json(result);
  }

  res.json(result);
});

// User Progress & History
router.get('/progress', (req: Request, res: Response) => {
  const userId = (req.query.userId as string) || 'user_default';
  const history = flagService.getUserHistory(userId);
  const activeSession = sessionManager.getAllSessions().find((s) => s.userId === userId && s.status === 'active');

  res.json({
    userId,
    completedLabs: history,
    totalCompletedCount: history.length,
    activeSession: activeSession ? {
      id: activeSession.id,
      labId: activeSession.labId,
      labName: activeSession.lab.name,
      os: activeSession.os,
      expiresAt: activeSession.expiresAt,
      completedObjectives: activeSession.completedObjectives
    } : null
  });
});

// 404 fallback for unmatched /api routes
router.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'API endpoint not found',
    path: req.originalUrl,
    availableEndpoints: ['/api', '/api/health', '/api/labs', '/api/sessions', '/api/progress']
  });
});

export default router;
