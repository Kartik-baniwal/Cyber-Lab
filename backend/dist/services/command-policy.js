"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LINUX_SHELL_POLICY = exports.PWD_BLOCKED_MESSAGE = void 0;
exports.restrictsPwd = restrictsPwd;
exports.blocksPwd = blocksPwd;
exports.PWD_BLOCKED_MESSAGE = 'pwd: This command is not allowed in Linux fundamentals.';
function restrictsPwd(session) {
    return session.labId === 'linux';
}
// This is a teaching restriction in the supplied Bash shell, not a security
// boundary against a learner with root access to the container.
exports.LINUX_SHELL_POLICY = `
pwd() { printf '%s\\n' '${exports.PWD_BLOCKED_MESSAGE}' >&2; return 126; }
readonly -f pwd
export -f pwd
`;
function blocksPwd(session, command) {
    return restrictsPwd(session) && /^pwd(?:\s|$)/.test(command.trim());
}
