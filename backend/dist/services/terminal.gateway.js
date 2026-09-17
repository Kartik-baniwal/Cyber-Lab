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
        // Track command completion for objectives
        const originalExecute = sessionManager.getDriver().executeCommand.bind(sessionManager.getDriver());
        sessionManager.getDriver().executeCommand = async (s, cmd) => {
            const result = await originalExecute(s, cmd);
            const cleanCmd = cmd.trim();
            // Automatically mark objectives done if matched
            if (cleanCmd === s.lab.commands[0]) {
                flag_service_1.FlagService.getInstance().completeObjective(s.id, 0);
            }
            else if (cleanCmd === s.lab.commands[1] && s.completedObjectives.includes(0)) {
                flag_service_1.FlagService.getInstance().completeObjective(s.id, 1);
            }
            return result;
        };
        // Attach driver's PTY / socket handler
        sessionManager.getDriver().attachTerminal(session, ws);
        ws.on('close', () => {
            console.log(`[TerminalGateway] Client disconnected from terminal for session: ${sessionId}`);
        });
    }
}
exports.TerminalGateway = TerminalGateway;
