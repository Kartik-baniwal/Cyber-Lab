"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockerDriver = void 0;
const child_process_1 = require("child_process");
const util_1 = __importDefault(require("util"));
const execFileAsync = util_1.default.promisify(child_process_1.execFile);
const DOCKER_BIN = process.env.DOCKER_BIN || (process.platform === 'darwin' ? '/usr/local/bin/docker' : 'docker');
/**
 * Docker Engine Orchestrator Driver
 * Provisions live isolated per-session Docker containers using official/custom Kali Linux images,
 * applies dynamic flag injection, executes real commands, and streams interactive PTY terminal.
 */
class DockerDriver {
    activeContainers = new Map();
    /**
     * Guarantees the container is created, running, and accessible before any command execution.
     */
    async ensureContainerRunning(session) {
        const wsContainerName = this.activeContainers.get(session.id) || `range_ws_${session.id.slice(0, 8)}`;
        this.activeContainers.set(session.id, wsContainerName);
        try {
            const { stdout } = await execFileAsync(DOCKER_BIN, [
                'inspect',
                '--format',
                '{{.State.Running}}',
                wsContainerName
            ]);
            if (stdout.trim() === 'true') {
                return wsContainerName;
            }
        }
        catch {
            // Container not found or stopped, will create below
        }
        console.log(`[Docker Driver] Auto-healing/re-creating container: ${wsContainerName}`);
        // Remove any stopped or dead container
        try {
            await execFileAsync(DOCKER_BIN, ['rm', '-f', wsContainerName]);
        }
        catch { }
        // Choose image
        let chosenImage = 'rangeforge/kali-custom:latest';
        try {
            await execFileAsync(DOCKER_BIN, ['image', 'inspect', chosenImage]);
        }
        catch {
            chosenImage = 'kalilinux/kali-rolling:latest';
        }
        await execFileAsync(DOCKER_BIN, [
            'run',
            '-d',
            '--name', wsContainerName,
            '--hostname', 'kali',
            '--cap-add=NET_ADMIN',
            '--cap-add=NET_RAW',
            '-w', '/root',
            chosenImage,
            'sleep', 'infinity'
        ]);
        // Inject dynamic flag into /root/flag.txt
        try {
            const injectCmd = `echo '${session.dynamicFlag}' > /root/flag.txt && chmod 600 /root/flag.txt`;
            await execFileAsync(DOCKER_BIN, ['exec', wsContainerName, '/bin/bash', '-c', injectCmd]);
            console.log(`[Docker Driver] Injected dynamic flag into ${wsContainerName}`);
        }
        catch (e) {
            console.warn(`[Docker Driver] Flag injection warning:`, e);
        }
        return wsContainerName;
    }
    async provisionSession(session) {
        const wsContainerName = await this.ensureContainerRunning(session);
        const netName = `range_net_${session.id.slice(0, 8)}`;
        return {
            networkId: netName,
            workstationId: wsContainerName,
            targetId: undefined,
            endpoints: {
                terminalWs: `/ws/terminal/${session.id}`,
                vncUrl: `/vnc/${session.id}/`,
                ideUrl: `/ide/${session.id}/`,
                targetUrl: `/target/${session.id}:8080/`
            }
        };
    }
    async terminateSession(session) {
        const wsContainerName = this.activeContainers.get(session.id) || `range_ws_${session.id.slice(0, 8)}`;
        console.log(`[Docker Driver] Pruning container: ${wsContainerName}`);
        try {
            await execFileAsync(DOCKER_BIN, ['rm', '-f', wsContainerName]);
            this.activeContainers.delete(session.id);
        }
        catch (e) {
            console.warn(`[Docker Driver] Error pruning container ${wsContainerName}:`, e);
        }
    }
    async executeCommand(session, rawCommand) {
        const cmd = rawCommand.trim();
        if (!cmd) {
            return { stdout: '', exitCode: 0 };
        }
        const wsContainerName = await this.ensureContainerRunning(session);
        console.log(`[Docker Driver] Executing inside ${wsContainerName}: ${cmd}`);
        try {
            const { stdout, stderr } = await execFileAsync(DOCKER_BIN, ['exec', wsContainerName, '/bin/bash', '-c', cmd], { timeout: 45000, maxBuffer: 1024 * 1024 * 2 });
            const combined = stdout || stderr || '';
            return {
                stdout: combined,
                exitCode: 0
            };
        }
        catch (err) {
            const out = err.stdout || err.stderr || err.message || 'Execution error\n';
            return {
                stdout: out,
                exitCode: err.code || 1
            };
        }
    }
    async attachTerminal(session, ws) {
        const wsContainerName = await this.ensureContainerRunning(session);
        const isKali = session.os === 'Kali Linux';
        const prompt = isKali
            ? '\x1b[1;31mroot\x1b[0m@\x1b[1;36mkali\x1b[0m:\x1b[1;34m~#\x1b[0m '
            : '\x1b[32mlearner@range\x1b[0m:\x1b[34m~/lab\x1b[0m$ ';
        ws.send(`\r\n\x1b[1;32m[Cyber Lab Docker Engine]\x1b[0m Connected to container: \x1b[1;36m${wsContainerName}\x1b[0m\r\n`);
        ws.send(`Live Workstation: \x1b[33m${session.os}\x1b[0m (Real Kali Linux Rolling Kernel)\r\n`);
        ws.send(`Type any Linux or offensive security tool commands. Type 'clear' to clear screen.\r\n\r\n`);
        ws.send(prompt);
        let currentInput = '';
        ws.on('message', async (data) => {
            const input = data.toString();
            if (input === '\r' || input === '\n') {
                ws.send('\r\n');
                const cmd = currentInput.trim();
                currentInput = '';
                if (cmd === 'clear') {
                    ws.send('\x1b[2J\x1b[H');
                    ws.send(prompt);
                    return;
                }
                if (cmd) {
                    const result = await this.executeCommand(session, cmd);
                    const formatted = result.stdout.replace(/\r?\n/g, '\r\n');
                    ws.send(formatted);
                    if (!formatted.endsWith('\r\n')) {
                        ws.send('\r\n');
                    }
                }
                ws.send(prompt);
            }
            else if (input === '\x7f' || input === '\b') {
                if (currentInput.length > 0) {
                    currentInput = currentInput.slice(0, -1);
                    ws.send('\b \b');
                }
            }
            else if (input >= ' ' && input <= '~') {
                currentInput += input;
                ws.send(input);
            }
        });
    }
}
exports.DockerDriver = DockerDriver;
