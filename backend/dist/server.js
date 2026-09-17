"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ws_1 = require("ws");
const config_1 = require("./config");
const api_routes_1 = __importDefault(require("./routes/api.routes"));
const terminal_gateway_1 = require("./services/terminal.gateway");
const session_manager_1 = require("./services/session.manager");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ noServer: true });
// Middlewares
app.use((0, cors_1.default)({ origin: config_1.config.corsOrigin }));
app.use(express_1.default.json());
// API Routes
app.use('/api', api_routes_1.default);
// Serve frontend static assets if available
const candidatePaths = [
    path_1.default.resolve(__dirname, '../../frontend/dist'),
    path_1.default.resolve(__dirname, '../../frontend/public'),
    path_1.default.resolve(__dirname, '../../frontend'),
    path_1.default.resolve(__dirname, '../../')
];
const frontendPath = candidatePaths.find(p => fs_1.default.existsSync(path_1.default.join(p, 'index.html'))) || candidatePaths[0];
if (fs_1.default.existsSync(frontendPath)) {
    app.use(express_1.default.static(frontendPath));
}
// Serve RangeForge-Project static assets explicitly
const rangeForgeDist = path_1.default.resolve(__dirname, '../../frontend/dist/RangeForge-Project');
const rangeForgePublic = path_1.default.resolve(__dirname, '../../frontend/public/RangeForge-Project');
if (fs_1.default.existsSync(rangeForgeDist)) {
    app.use('/RangeForge-Project', express_1.default.static(rangeForgeDist));
}
else if (fs_1.default.existsSync(rangeForgePublic)) {
    app.use('/RangeForge-Project', express_1.default.static(rangeForgePublic));
}
// Redirect /login, /workspace, or /dashboard to /RangeForge-Project/
app.get(['/login', '/login/*', '/workspace', '/workspace/*', '/dashboard', '/dashboard/*'], (req, res) => {
    res.redirect('/RangeForge-Project/');
});
app.get('/RangeForge-Project', (req, res) => {
    res.redirect('/RangeForge-Project/');
});
// Fallback all non-API GET requests to index.html for Single Page Application routing
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/ws') || req.path.startsWith('/RangeForge-Project')) {
        return next();
    }
    const indexPath = path_1.default.join(frontendPath, 'index.html');
    if (fs_1.default.existsSync(indexPath)) {
        res.sendFile(indexPath);
    }
    else {
        res.json({
            service: 'Cyber Lab Backend API & Orchestrator',
            status: 'online',
            endpoints: {
                health: '/api/health',
                labs: '/api/labs',
                sessions: '/api/sessions',
                progress: '/api/progress'
            }
        });
    }
});
// WebSocket Upgrade Routing
server.on('upgrade', (request, socket, head) => {
    const url = request.url || '';
    const match = url.match(/^\/ws\/terminal\/([a-zA-Z0-9_-]+)/);
    if (match) {
        const sessionId = match[1];
        wss.handleUpgrade(request, socket, head, (ws) => {
            terminal_gateway_1.TerminalGateway.getInstance().handleConnection(ws, sessionId);
        });
    }
    else {
        socket.destroy();
    }
});
// Graceful Shutdown
const shutdown = async () => {
    console.log('\n[Cyber Lab Backend] Shutting down gracefully...');
    const sessionManager = session_manager_1.SessionManager.getInstance();
    for (const session of sessionManager.getAllSessions()) {
        try {
            await sessionManager.endSession(session.id);
        }
        catch (e) {
            // Ignore during shutdown
        }
    }
    server.close(() => {
        console.log('[Cyber Lab Backend] Server closed.');
        process.exit(0);
    });
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
// Start Server
server.listen(config_1.config.port, config_1.config.host, () => {
    console.log(`=======================================================`);
    console.log(`   CYBER LAB · UNIFIED FULL-STACK PLATFORM             `);
    console.log(`   Train. Attack. Defend.                              `);
    console.log(`=======================================================`);
    console.log(`[Unified Server]   http://${config_1.config.host}:${config_1.config.port}`);
    console.log(`[Frontend UI]      http://${config_1.config.host}:${config_1.config.port}/`);
    console.log(`[Backend API]      http://${config_1.config.host}:${config_1.config.port}/api`);
    console.log(`[Terminal Gateway] ws://${config_1.config.host}:${config_1.config.port}/ws/terminal/:sessionId`);
    console.log(`[Orchestrator]     Active driver: ${config_1.config.orchestratorType}`);
    console.log(`=======================================================\n`);
});
