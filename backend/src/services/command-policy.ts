import { LabSession } from '../models/types';

export const PWD_BLOCKED_MESSAGE = 'pwd: This command is not allowed in Linux fundamentals.';

export function restrictsPwd(session: LabSession): boolean {
  return session.labId === 'linux';
}

// This is a teaching restriction in the supplied Bash shell, not a security
// boundary against a learner with root access to the container.
export const LINUX_SHELL_POLICY = `
pwd() { printf '%s\\n' '${PWD_BLOCKED_MESSAGE}' >&2; return 126; }
readonly -f pwd
export -f pwd
`;

export function blocksPwd(session: LabSession, command: string): boolean {
  return restrictsPwd(session) && /^pwd(?:\s|$)/.test(command.trim());
}
