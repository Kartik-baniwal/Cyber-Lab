"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalGateway = void 0;
const session_manager_1 = require("./session.manager");
const flag_service_1 = require("./flag.service");
class TerminalGateway {
    static instance;
    constructor() { }
    static getInstance() {
        if (!TerminalGateway.instance) {
            TerminalGateway.instance = new TerminalGateway();
        }
        return TerminalGateway.instance;
    }
    async handleConnection(ws, sessionId) {
        const sessionManager = session_manager_1.SessionManager.getInstance();
        let session = sessionManager.getSession(sessionId);
        if (!session || session.status !== 'active') {
            try {
                console.log(`[TerminalGateway] Auto-recovering sandbox session: ${sessionId}`);
                session = await sessionManager.recoverOrCreateSession(sessionId);
            }
            catch (e) {
                console.error(`[TerminalGateway] Failed to auto-recover session:`, e);
            }
        }
        if (!session || session.status !== 'active') {
            ws.send('\r\n\x1b[31m[Error] Session not found or inactive. Please relaunch lab from catalog.\x1b[0m\r\n');
            ws.close();
            return;
        }
        console.log(`[TerminalGateway] Client connected to terminal for session: ${sessionId}`);
        // Observe submitted objective commands without replacing the driver's executor.
        // All bytes still go directly to the persistent PTY.
        let submitted = '';
        ws.on('message', (data) => {
            for (const char of data.toString()) {
                if (char === '\r' || char === '\n') {
                    const command = submitted.trim();
                    submitted = '';
                    if (command === session.lab.commands[0]) {
                        flag_service_1.FlagService.getInstance().completeObjective(session.id, 0);
                    }
                    else if (command === session.lab.commands[1] && session.completedObjectives.includes(0)) {
                        flag_service_1.FlagService.getInstance().completeObjective(session.id, 1);
                    }
                }
                else if (char === '\x7f' || char === '\b') {
                    submitted = submitted.slice(0, -1);
                }
                else if (char === '\x03' || char === '\x15') {
                    submitted = '';
                }
                else if (char >= ' ' && submitted.length < 8192) {
                    submitted += char;
                }
            }
        });
        // Attach driver's PTY / socket handler
        try {
            await sessionManager.getDriver().attachTerminal(session, ws);
        }
        catch (error) {
            console.error('[TerminalGateway] Terminal attachment failed:', error);
            ws.send('\r\n[Error] Cannot start the real Kali terminal. Check Docker and the image build.\r\n');
            ws.close();
        }
        ws.on('close', () => {
            console.log(`[TerminalGateway] Client disconnected from terminal for session: ${sessionId}`);
        });
    }
}
exports.TerminalGateway = TerminalGateway;
