import { LabSession, ProvisionedEnvironment, CommandResult } from '../models/types';
import { WebSocket } from 'ws';

export interface IOrchestratorDriver {
  /**
   * Provisions an ephemeral workstation and target containers/pods
   */
  provisionSession(session: LabSession): Promise<ProvisionedEnvironment>;

  /**
   * Tears down and completely deletes containers, networks, and routes
   */
  terminateSession(session: LabSession): Promise<void>;

  /**
   * Executes a command within the provisioned workstation
   */
  executeCommand(session: LabSession, command: string): Promise<CommandResult>;

  /**
   * Attaches a WebSocket stream to the workstation's PTY (for xterm.js)
   */
  attachTerminal(session: LabSession, ws: WebSocket): void;
}
