"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMAND_BLOCKED_MESSAGE = void 0;
exports.isFundamentals = isFundamentals;
exports.isRestrictedLab = isRestrictedLab;
exports.commandsForSession = commandsForSession;
exports.blocksCommand = blocksCommand;
exports.runnerForSession = runnerForSession;
// Tool collections evolve with Kali Rolling. A static command allowlist prevents
// installed tools, scripts, pipelines and normal Linux administration from working.
// These labs run a real shell inside their own Docker workstation.
exports.COMMAND_BLOCKED_MESSAGE = 'This command is not allowed in this lab.';
function isFundamentals(session) {
    return session.labId === 'linux';
}
function isRestrictedLab(_session) { return false; }
function commandsForSession(_session) { return null; }
function blocksCommand(_session, _command) { return false; }
function runnerForSession(_session) { return null; }
