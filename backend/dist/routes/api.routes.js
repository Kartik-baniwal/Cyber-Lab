"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const labs_data_1 = require("../models/labs.data");
const session_manager_1 = require("../services/session.manager");
const flag_service_1 = require("../services/flag.service");
const command_policy_1 = require("../services/command-policy");
const router = (0, express_1.Router)();
const sessionManager = session_manager_1.SessionManager.getInstance();
const flagService = flag_service_1.FlagService.getInstance();
// API Root / Service Info
router.get('/', (req, res) => {
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
router.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        activeSessions: sessionManager.getAllSessions().length
    });
});
// Lab Catalog Endpoints
router.get('/labs', (req, res) => {
    res.json(labs_data_1.LAB_CATALOG);
});
router.get('/labs/:id', (req, res) => {
    const lab = labs_data_1.LAB_CATALOG.find((l) => l.id === req.params.id);
    if (!lab) {
        return res.status(404).json({ error: 'Lab not found' });
    }
    res.json(lab);
});
router.get('/sessions', (req, res) => {
    res.json(sessionManager.getAllSessions());
});
// Session Lifecycle Endpoints
router.post('/sessions', async (req, res) => {
    try {
        const { labId, os, userId = 'user_default' } = req.body;
        if (!labId || !os) {
            return res.status(400).json({ error: 'Missing labId or os parameter' });
        }
        const lab = labs_data_1.LAB_CATALOG.find(l => l.id === labId);
        if (!lab)
            return res.status(404).json({ error: 'Lab not found' });
        if (os !== lab.os)
            return res.status(400).json({ error: `${lab.name} requires ${lab.os}. Choose the matching OS lab.` });
        // Check if user already has an active session
        const existing = sessionManager.getAllSessions().find((s) => s.userId === userId && s.status === 'active');
        if (existing) {
            if (existing.labId === labId && existing.os === os) {
                return res.status(200).json(existing);
            }
            // If launching another lab or OS, cleanly close the previous session
            await sessionManager.endSession(existing.id);
        }
        const session = await sessionManager.createSession(userId, labId, os);
        res.status(201).json(session);
    }
    catch (err) {
        console.error('Error creating session:', err);
        res.status(500).json({ error: err.message || 'Failed to launch session' });
    }
});
router.get('/sessions/:id', (req, res) => {
    const session = sessionManager.getSession(req.params.id);
    if (!session) {
        return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
});
router.post('/sessions/:id/extend', async (req, res) => {
    try {
        const session = await sessionManager.extendSession(req.params.id, 15);
        res.json({ message: 'Session extended by 15 minutes', session });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.post('/sessions/:id/end', async (req, res) => {
    try {
        await sessionManager.endSession(req.params.id);
        res.json({ message: 'Session ended successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.delete('/sessions/:id', async (req, res) => {
    try {
        await sessionManager.endSession(req.params.id);
        res.json({ message: 'Session ended successfully' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Command Execution (REST alternative to WebSocket)
router.post('/sessions/:id/command', async (req, res) => {
    let session = sessionManager.getSession(req.params.id);
    if (!session || session.status !== 'active') {
        try {
            session = await sessionManager.recoverOrCreateSession(req.params.id, 'kali-sandbox', 'Kali Linux');
        }
        catch (e) {
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
    if ((0, command_policy_1.blocksCommand)(session, cleanCmd)) {
        return res.json({
            command: cleanCmd,
            output: `${command_policy_1.COMMAND_BLOCKED_MESSAGE}\n`,
            exitCode: 126,
            completedObjectives: session.completedObjectives
        });
    }
    const result = await sessionManager.getDriver().executeCommand(session, cleanCmd);
    if (result.exitCode !== 0)
        return res.json({ command: cleanCmd, output: result.stdout, exitCode: result.exitCode, completedObjectives: session.completedObjectives });
    const lowCmd = cleanCmd.toLowerCase();
    const cmd0 = (session.lab.commands[0] || '').toLowerCase();
    const cmd1 = (session.lab.commands[1] || '').toLowerCase();
    // Check objective 0
    if (cleanCmd === session.lab.commands[0] ||
        (cmd0.includes('uname') && (lowCmd.includes('uname') || lowCmd === 'whoami')) ||
        (cmd0.includes('ip addr') && (lowCmd.startsWith('ip a') || lowCmd.startsWith('ip addr') || lowCmd.startsWith('ifconfig'))) ||
        (cmd0.includes('pwd') && lowCmd === 'pwd') ||
        (cmd0.includes('curl') && lowCmd.startsWith('curl')) ||
        (cmd0.includes('ls') && lowCmd.startsWith('ls')) ||
        (cmd0.includes('auth.log') && lowCmd.includes('auth.log')) ||
        (cmd0.includes('ps') && lowCmd.startsWith('ps'))) {
        flagService.completeObjective(session.id, 0);
    }
    // Check objective 1
    if (cleanCmd === session.lab.commands[1] ||
        (cmd1.includes('kali-tools') && (lowCmd.includes('kali-tools') || lowCmd.includes('which') || lowCmd === 'tools')) ||
        (cmd1.includes('nmap') && lowCmd.startsWith('nmap')) ||
        (cmd1.includes('ls') && lowCmd.startsWith('ls')) ||
        (cmd1.includes('notes') && lowCmd.includes('notes')) ||
        (cmd1.includes('chmod') && lowCmd.includes('chmod')) ||
        (cmd1.includes('grep') && lowCmd.includes('grep')) ||
        (cmd1.includes('kill') && lowCmd.includes('kill'))) {
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
router.post('/sessions/:id/flags', (req, res) => {
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
router.get('/progress', (req, res) => {
    const userId = req.query.userId || 'user_default';
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
router.use((req, res) => {
    res.status(404).json({
        error: 'API endpoint not found',
        path: req.originalUrl,
        availableEndpoints: ['/api', '/api/health', '/api/labs', '/api/sessions', '/api/progress']
    });
});
exports.default = router;
