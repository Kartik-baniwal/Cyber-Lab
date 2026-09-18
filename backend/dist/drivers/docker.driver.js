"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockerDriver = void 0;
const ws_1 = require("ws");
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
        const chosenImage = process.env.KALI_IMAGE || 'rangeforge/kali-custom:latest';
        try {
            await execFileAsync(DOCKER_BIN, ['image', 'inspect', chosenImage]);
        }
        catch {
            throw new Error(`Full Kali image ${chosenImage} is missing. Run bash scripts/build-kali-image.sh first.`);
        }
        await execFileAsync(DOCKER_BIN, [
            'run',
            '-d',
            '--name', wsContainerName,
            '--hostname', 'kali',
            '--cpus', '4',
            '--memory', '3584m',
            '--memory-swap', '3584m',
            '--cap-add=NET_ADMIN',
            '--cap-add=NET_RAW',
            '-w', '/root',
            chosenImage,
            'sleep', 'infinity'
        ]);
        // Preserve the real sudo binary supplied by Kali.
        await execFileAsync(DOCKER_BIN, ['exec', wsContainerName, '/bin/bash', '-c',
            'printf "%s\\n" "$1" > /root/flag.txt && chmod 600 /root/flag.txt', '--', session.dynamicFlag]);
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
        const cleanCmd = cmd;
        const wsContainerName = await this.ensureContainerRunning(session);
        console.log(`[Docker Driver] Executing inside ${wsContainerName}: ${cleanCmd}`);
        try {
            const { stdout, stderr } = await execFileAsync(DOCKER_BIN, ['exec', wsContainerName, '/bin/bash', '-c', cleanCmd], { timeout: 45000, maxBuffer: 1024 * 1024 * 2 });
            const combined = stdout + stderr;
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
        ws.send('\r\nConnected to real Kali Rolling. This container shares the Docker host kernel.\r\n');
        // script allocates a real Linux PTY, preserving shell state, Ctrl-C, and interactive tools.
        const terminal = (0, child_process_1.spawn)(DOCKER_BIN, [
            'exec', '-i', '-e', 'TERM=xterm-256color', wsContainerName,
            'script', '-qefc', '/bin/bash -il', '/dev/null'
        ], { stdio: ['pipe', 'pipe', 'pipe'] });
        const send = (data) => {
            if (ws.readyState === ws_1.WebSocket.OPEN)
                ws.send(data.toString());
        };
        terminal.stdout.on('data', send);
        terminal.stderr.on('data', send);
        terminal.on('error', (error) => {
            send(Buffer.from(`\r\nTerminal failed: ${error.message}\r\n`));
            ws.close();
        });
        terminal.on('close', () => ws.close());
        terminal.stdin.on('error', () => ws.close());
        ws.on('message', (data) => {
            if (terminal.stdin.writable)
                terminal.stdin.write(data.toString());
        });
        ws.on('close', () => {
            terminal.stdin.end();
            terminal.kill();
        });
    }
}
exports.DockerDriver = DockerDriver;
