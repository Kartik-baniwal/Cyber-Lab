import { WebSocket } from 'ws';
import { SessionManager } from './session.manager';
import { FlagService } from './flag.service';

export class TerminalGateway {
  private static instance: TerminalGateway;

  private constructor() {}

  public static getInstance(): TerminalGateway {
    if (!TerminalGateway.instance) {
      TerminalGateway.instance = new TerminalGateway();
    }
    return TerminalGateway.instance;
  }

  public async handleConnection(ws: WebSocket, sessionId: string): Promise<void> {
    const sessionManager = SessionManager.getInstance();
    let session = sessionManager.getSession(sessionId);

    if (!session || session.status !== 'active') {
      try {
        console.log(`[TerminalGateway] Auto-recovering sandbox session: ${sessionId}`);
        session = await sessionManager.recoverOrCreateSession(sessionId);
      } catch (e) {
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
        FlagService.getInstance().completeObjective(s.id, 0);
      } else if (cleanCmd === s.lab.commands[1] && s.completedObjectives.includes(0)) {
        FlagService.getInstance().completeObjective(s.id, 1);
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
