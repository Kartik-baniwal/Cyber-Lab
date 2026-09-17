#!/usr/bin/env node
/**
 * RangeForge — Train. Attack. Defend.
 * Unified Full-Stack Platform Entrypoint (Frontend UI + Backend API + WebSocket Gateway)
 */

const path = require('path');

// Ensure module resolution locates backend dependencies
module.paths.push(path.resolve(__dirname, 'backend/node_modules'));

// Launch the compiled unified orchestrator
require('./backend/dist/server.js');
