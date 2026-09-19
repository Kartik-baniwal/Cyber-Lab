import { LabSession } from '../models/types';

// Tool collections evolve with Kali Rolling. A static command allowlist prevents
// installed tools, scripts, pipelines and normal Linux administration from working.
// These labs run a real shell inside their own Docker workstation.
export const COMMAND_BLOCKED_MESSAGE = 'This command is not allowed in this lab.';
export function isFundamentals(session: LabSession): boolean {
  return session.labId === 'linux';
}
export function isRestrictedLab(_session: LabSession): boolean { return false; }
export function commandsForSession(_session: LabSession): string[] | null { return null; }
export function blocksCommand(_session: LabSession, _command: string): boolean { return false; }
export function runnerForSession(_session: LabSession): string | null { return null; }
