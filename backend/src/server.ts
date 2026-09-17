import fs from 'fs';
import http from 'http';
import path from 'path';
import express from 'express';
import cors from 'cors';
import { WebSocketServer, WebSocket } from 'ws';
import { config } from './config';
import apiRoutes from './routes/api.routes';
import { TerminalGateway } from './services/terminal.gateway';
import { SessionManager } from './services/session.manager';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

// Middlewares
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Serve frontend static assets if available
const candidatePaths = [
  path.resolve(__dirname, '../../frontend/dist'),
  path.resolve(__dirname, '../../frontend/public'),
  path.resolve(__dirname, '../../frontend'),
  path.resolve(__dirname, '../../')
];
const frontendPath = candidatePaths.find(p => fs.existsSync(path.join(p, 'index.html'))) || candidatePaths[0];
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
}

// Serve RangeForge-Project static assets explicitly
const rangeForgeDist = path.resolve(__dirname, '../../frontend/dist/RangeForge-Project');
const rangeForgePublic = path.resolve(__dirname, '../../frontend/public/RangeForge-Project');
if (fs.existsSync(rangeForgeDist)) {
  app.use('/RangeForge-Project', express.static(rangeForgeDist));
} else if (fs.existsSync(rangeForgePublic)) {
  app.use('/RangeForge-Project', express.static(rangeForgePublic));
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
  const indexPath = path.join(frontendPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
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
      TerminalGateway.getInstance().handleConnection(ws, sessionId);
    });
  } else {
    socket.destroy();
  }
});

// Graceful Shutdown
const shutdown = async () => {
  console.log('\n[Cyber Lab Backend] Shutting down gracefully...');
  const sessionManager = SessionManager.getInstance();
  for (const session of sessionManager.getAllSessions()) {
    try {
      await sessionManager.endSession(session.id);
    } catch (e) {
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
server.listen(config.port, config.host, () => {
  console.log(`=======================================================`);
  console.log(`   CYBER LAB · UNIFIED FULL-STACK PLATFORM             `);
  console.log(`   Train. Attack. Defend.                              `);
  console.log(`=======================================================`);
  console.log(`[Unified Server]   http://${config.host}:${config.port}`);
  console.log(`[Frontend UI]      http://${config.host}:${config.port}/`);
  console.log(`[Backend API]      http://${config.host}:${config.port}/api`);
  console.log(`[Terminal Gateway] ws://${config.host}:${config.port}/ws/terminal/:sessionId`);
  console.log(`[Orchestrator]     Active driver: ${config.orchestratorType}`);
  console.log(`=======================================================\n`);
});
