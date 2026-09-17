# RangeForge — Complete Project Documentation

> **Version:** 2.9.0 · **Author:** Kartik Baniwal · **License:** MIT

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Technology Stack](#3-technology-stack)
4. [Repository Structure](#4-repository-structure)
5. [Lab Catalog](#5-lab-catalog)
6. [Backend API Reference](#6-backend-api-reference)
7. [Frontend Application](#7-frontend-application)
8. [Container Orchestration](#8-container-orchestration)
9. [WebSocket Terminal Gateway](#9-websocket-terminal-gateway)
10. [Session Management](#10-session-management)
11. [Progress & Audit System](#11-progress--audit-system)
12. [Kali Linux Desktop Environment](#12-kali-linux-desktop-environment)
13. [Save Terminal Progress Feature](#13-save-terminal-progress-feature)
14. [Themes & UI System](#14-themes--ui-system)
15. [Deployment Guide](#15-deployment-guide)
16. [Environment Variables](#16-environment-variables)
17. [Security Considerations](#17-security-considerations)

---

## 1. Project Overview

**RangeForge** is an enterprise-grade cybersecurity training platform that provides realistic, isolated lab environments for hands-on security training. It combines a rich browser-based UI with live Docker container orchestration, PTY terminal streaming, and a simulated Kali Linux desktop — all accessible from a single browser tab.

### Key Capabilities

| Feature | Description |
|---|---|
| Live Terminal | Real PTY terminal via xterm.js connected to Docker containers over WebSocket |
| Kali Desktop | Simulated Kali Linux XFCE desktop with draggable windows, menubar, taskbar |
| Objective Tracking | Per-session mission objectives with real-time completion detection |
| Dynamic Flags | HMAC-signed, session-unique CTF flags injected at container boot |
| Audit Trail | Full command history, terminal scrollback, and downloadable session transcripts |
| Progress Module | Operator skill domains, XP, completion metrics, and session history |
| Auth Gate | User login/register with localStorage-persisted profile |
| Dual Theme | Obsidian (dark) and Daylight (light) theme with CSS variable system |
| Multi-Driver | Docker, Kubernetes, and Dev-Mock orchestration drivers |
| Docker Compose | Full stack: Traefik + PostgreSQL + Redis + RangeForge API |

---

## 2. Architecture

```
Browser (Client)
  index.html (Templates)
  app.js     (SPA Logic)       REST API + WebSocket (ws://…/ws/terminal/:id)
  style.css  (Design System)
         |
Node.js Unified Server (port 3001)
  Express REST API           WebSocket Terminal Gateway
  /api/health                ws://…/ws/terminal/:session
  /api/labs                  TerminalGateway (singleton)
  /api/sessions              PTY <-> Container stdin/out
  /api/progress
         |
  Orchestration Layer (Driver Pattern)
  DockerDriver | KubernetesDriver | DevMockDriver
         |
Docker Engine
  Kali Lab Container  |  Ubuntu Lab Container  |  DVWA Container
  PostgreSQL          |  Redis
```

### Data Flow

1. **User selects a lab** → `app.js` calls `POST /api/sessions` with lab config
2. **Backend creates container** → DockerDriver runs image, injects dynamic flag via HMAC
3. **Session returned** → Frontend opens `ws://…/ws/terminal/<sessionId>`
4. **xterm.js streams PTY** → bidirectional: keystrokes → container stdin, stdout → terminal render
5. **Objective tracking** → output regex matches trigger `markObjectiveDone()`
6. **Flag validation** → `POST /api/sessions/:id/validate-flag` with operator input
7. **Session teardown** → user triggers End Session → container pruned, progress recorded

---

## 3. Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| Vanilla HTML5 / CSS3 / JS | Zero-build SPA — instant load, no bundler |
| xterm.js v5 | Full-featured PTY terminal emulator |
| xterm-addon-fit | Auto-resize terminal to container element |
| xterm-addon-web-links | Clickable URLs in terminal output |
| CSS Custom Properties | Complete design token system (50+ variables) |
| CSS Animations | Glassmorphism, scan lines, particle effects |
| localStorage | Session history, command log, audit trail, user profile |

### Backend

| Technology | Purpose |
|---|---|
| Node.js 20+ | JavaScript runtime |
| Express.js | REST API framework |
| TypeScript | Type-safe backend code |
| ws (WebSocket) | WebSocket server for terminal gateway |
| node-pty | Pseudo-terminal spawning & container attach |
| Dockerode | Docker Engine API client |
| HMAC-SHA256 | Dynamic flag signing & verification |

### Infrastructure

| Technology | Purpose |
|---|---|
| Docker Engine | Container runtime for lab sandboxes |
| Docker Compose | Local full-stack orchestration |
| Traefik v3 | Reverse proxy, ingress, dynamic routing |
| PostgreSQL 16 | Relational DB for labs, sessions, progress |
| Redis 7 | Session state, TTL expiry, rate limiting |
| Kubernetes (optional) | Production-scale container orchestration |

---

## 4. Repository Structure

```
cyberrange-prototype/
  index.html            # Main HTML — dialog templates, nav shell, SPA mount
  style.css             # Complete design system (109KB) — themes, components, animations
  app.js                # SPA frontend + REST client + xterm gateway (200KB)
  server.js             # Unified server entrypoint (auto-detects Docker/mock)
  package.json          # Root npm scripts
  docker-compose.yml    # Full containerized stack
  .env                  # Environment config

  backend/
    src/
      config/           # Port, CORS, HMAC, orchestrator settings
      drivers/
        orchestrator.interface.ts    # IOrchestrator contract
        docker.driver.ts             # DockerDriver (production)
        kubernetes.driver.ts         # KubernetesDriver (scale-out)
        dev-mock.driver.ts           # DevMockDriver (offline/demo)
        index.ts                     # Driver factory
      models/           # TypeScript interfaces (Lab, Session, Progress)
      routes/
        api.routes.ts               # All REST route handlers
      services/
        terminal.gateway.ts          # WebSocket PTY bridge
        session.manager.ts           # In-memory session lifecycle
      server.ts                      # Express + WS server
    Dockerfile
    package.json

  containers/           # Dockerfile definitions for lab target images
  k8s/                  # Kubernetes manifests and Helm values
  traefik/              # Traefik dynamic config and TLS settings
  scripts/              # Helper deployment and seeding scripts
```

---

## 5. Lab Catalog

RangeForge ships with **7 built-in labs** across 5 security domains:

| ID | Name | Category | Level | Time | OS |
|---|---|---|---|---|---|
| linux | Linux Fundamentals | Linux Essentials | Beginner | 30 min | Ubuntu |
| recon | Network Reconnaissance | Network Security | Beginner | 45 min | Kali Linux |
| web | Web Application Security | Web Security | Intermediate | 60 min | Kali Linux |
| permissions | Permission Denied | System Hardening | Intermediate | 45 min | Ubuntu |
| forensics | Follow the Evidence | Digital Forensics | Intermediate | 60 min | Ubuntu |
| incident | Contain the Breach | Incident Response | Advanced | 90 min | Kali Linux |
| kali-sandbox | Kali Linux Full OS & Tools | Offensive Security | Advanced | 120 min | Kali Linux |

---

## 6. Backend API Reference

**Base URL:** `http://localhost:3001/api`

### Health
```
GET /api/health
Response: { status: 'ok', uptime: number, activeSessions: number }
```

### Labs
```
GET /api/labs          -> Lab[]
GET /api/labs/:id      -> Lab
```

### Sessions
```
POST /api/sessions
  Body: { labId: string, os?: string }
  Response: { id, labId, containerId, status, wsUrl, dynamicFlag, expiresAt }

GET  /api/sessions             -> Session[]
GET  /api/sessions/:id         -> Session
POST /api/sessions/:id/extend  -> { expiresAt }  (+15 minutes)
DELETE /api/sessions/:id       -> { success: true }

POST /api/sessions/:id/validate-flag
  Body: { flag: string }
  Response: { valid: boolean, message: string }
```

### Progress
```
GET /api/progress
  Response: { labsCompleted, totalObjectives, capturedFlags[], readinessScore }
```

---

## 7. Frontend Application

`app.js` is a **4,400-line single-file SPA** structured around these major systems:

### Navigation Views
```
navigate(view)
  'labs'     -> renderLabCatalog()   card grid with filters
  'session'  -> workspace()          active lab workspace
  'progress' -> renderProgress()     skill domains, XP, history
  'profile'  -> renderProfile()      user settings
```

### Workspace Tabs

| Tab | Description |
|---|---|
| >_ Terminal | Live xterm.js PTY connected to container |
| Desktop | Simulated Kali XFCE desktop |
| Code editor | Monaco-style editor for scripts |
| Command history | Filterable audit log of all commands |
| My sessions | Past sessions and re-launch options |

### Key Functions

| Function | Description |
|---|---|
| `launchSession(lab)` | Creates session via API, opens WebSocket, starts xterm |
| `endSession()` | Closes WS, disposes xterm, records progress |
| `openEndSessionDialog()` | Populates teardown dialog with live session telemetry |
| `markObjectiveDone(i)` | Marks objective complete, checks full completion |
| `saveTerminalProgress(options)` | Saves command history + terminal log to localStorage & file |
| `generateTranscriptText(snapshot)` | Formats rich ASCII audit transcript for download |
| `getActiveTerminalText()` | Extracts text from xterm buffer, session.output, or DOM |
| `recordSessionProgress(session)` | Persists completed session to localStorage history |

---

## 8. Container Orchestration

### Driver Pattern

All container operations go through the `IOrchestrator` interface:

```typescript
interface IOrchestrator {
  createSession(labId: string, os: string): Promise<Session>;
  endSession(sessionId: string): Promise<void>;
  getSession(sessionId: string): Promise<Session | null>;
  getAllSessions(): Session[];
  extendSession(sessionId: string, ms: number): Promise<void>;
  validateFlag(sessionId: string, flag: string): Promise<boolean>;
  attachTerminal(sessionId: string, ws: WebSocket): Promise<void>;
}
```

### DockerDriver (Production)

- Creates per-session containers named `range_ws_<sessionId[:8]>`
- Injects dynamic flag as env var `RANGE_FLAG=<HMAC-signed value>`
- Attaches PTY via `docker exec -it <id> /bin/bash`
- Auto-heals on reconnect (re-creates if container stopped)
- Prunes container on session end — zero persistence

### DevMockDriver (Offline/Demo)

- No Docker required — simulates realistic responses for all 7 labs
- Perfect for UI development and demos without infrastructure

---

## 9. WebSocket Terminal Gateway

**Endpoint:** `ws://localhost:3001/ws/terminal/:sessionId`

### Protocol

```
CLIENT -> SERVER:
  { type: 'input', data: '\r' }    keystrokes
  { type: 'resize', cols, rows }   terminal resize event

SERVER -> CLIENT:
  Raw PTY output bytes (string)    terminal render
```

- Singleton TerminalGateway manages one WS per active session
- Pipes WS messages to container stdin via docker attach / node-pty
- Handles reconnection: if container restarted, re-attaches automatically

---

## 10. Session Management

### Session Lifecycle

```
User clicks Launch
  -> POST /api/sessions
  -> Container created, dynamicFlag injected (HMAC-SHA256)
  -> WebSocket URL returned
  -> xterm.js connects, session ACTIVE, timer starts

Session expires OR user ends session
  -> endSession() called
  -> WebSocket closed, xterm disposed
  -> Container stopped & removed
  -> Progress recorded to localStorage
  -> Navigate to hub
```

### localStorage Keys

| Key | Contents |
|---|---|
| `rangeforge-session-history` | Array of past completed sessions |
| `rangeforge-command-log` | Full command audit log with timestamps |
| `rangeforge_saved_terminal_logs` | Saved terminal snapshots (max 30) |
| `rangeforge-auth` | User profile (name, email, role, level) |
| `range-term-font-size` | Terminal font size preference |
| `range-zoom-percent` | Workspace zoom level preference |

---

## 11. Progress & Audit System

### Skill Domains

| Domain | Labs | Max XP |
|---|---|---|
| Linux Essentials | linux, permissions | 200 |
| Network Security | recon | 150 |
| Web Security | web | 200 |
| Digital Forensics | forensics | 150 |
| Incident Response | incident, kali-sandbox | 300 |

### Readiness Score Formula

```
readinessScore = min(100, round(
  (labsCompleted x 20 + totalObjectives x 4 + capturedFlags x 8) / 1.7
))
```

---

## 12. Kali Linux Desktop Environment

The Desktop tab renders a fully interactive simulated Kali XFCE environment:

| Component | Description |
|---|---|
| Desktop area | Wallpaper, icons, draggable windows |
| Taskbar | Clock, system tray, window pills |
| Terminal window | XFCE Terminal with bash simulation |
| Browser window | Chromium pointing to target web portal |
| File manager | Thunar-style file browser |
| Text editor | Mousepad text editor |
| Kali Menu | App launcher with security tool categories |

### Supported Command Categories

- **System:** uname -a, whoami, id, hostname, uptime, ps aux
- **Network:** ip addr, nmap, netstat, ping, traceroute
- **Files:** ls -la, cat, find, grep, chmod, chown
- **Security tools:** nmap, hydra, sqlmap, nikto, gobuster, metasploit
- **Forensics:** strings, file, binwalk, xxd, md5sum
- **Password:** john, hashcat, aircrack-ng
- **Special:** kali-tools (shows full toolkit), help, clear, history

---

## 13. Save Terminal Progress Feature

### Save Entrypoints

| Location | Control | Action |
|---|---|---|
| Workspace header | Save Progress button | Downloads full transcript |
| Teardown dialog | Download Terminal Log button | Downloads .txt, session stays alive |
| Teardown dialog | Copy buffer button | Copies scrollback to clipboard |
| Teardown dialog | Save & Teardown button | Saves + downloads + ends session |
| Teardown dialog | Auto-archive checkbox | Silent local save before Destroy & Wipe |
| Kali Desktop terminal | Save Log quick pill | Instant transcript download |
| Kali Desktop terminal | File menu | Triggers save terminal progress |

### Snapshot Schema (localStorage)

```javascript
{
  id, sessionId, labId, labName, os, savedAt, timestamp,
  operator: { name, email, role, level },
  objectives: { completedCount, totalCount, tasks[], completedTasks[] },
  flagCaptured: string | null,
  commandCount: number,
  commands: [{ time, command, prompt }],
  terminalScrollback: string
}
```

- **Storage key:** `rangeforge_saved_terminal_logs`
- **Max stored:** 30 most recent snapshots

---

## 14. Themes & UI System

### CSS Design Tokens (excerpt)

```css
--bg: #0a0f16            /* Main background */
--surface: #111827       /* Card/panel surface */
--cyan: #00f0ff          /* Terminal glow accent */
--green: #34d399         /* Success / flag captured */
--red: #ef4444           /* Danger / teardown */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace
--font-display: 'Orbitron', sans-serif
```

| Theme | Trigger | Background | Accent |
|---|---|---|---|
| Obsidian (Dark) | `.obsidian` | #0a0f16 | #00f0ff cyan |
| Daylight (Light) | `.daylight` | #f1f5f9 | #0ea5e9 sky blue |

### Animation System

- Scan line effect on terminal screens
- Glow pulse on active session indicators
- 3D tilt with CSS perspective + JS mousemove on lab cards
- Glassmorphism with backdrop-filter: blur(12px) on dialogs

---

## 15. Deployment Guide

### Option A: Local Development

```bash
git clone https://github.com/Kartik-baniwal/Range_Forge.git
cd Range_Forge
cd backend && npm install && npm run build && cd ..
npm start
# -> Open http://localhost:3001
```

### Option B: Full Docker Stack

```bash
docker compose up -d
# Traefik: port 80/8080
# RangeForge API: port 3001
# PostgreSQL: port 5432
# Redis: port 6379

docker compose down      # Stop
docker compose down -v   # Stop + wipe volumes
```

### Option C: LAN Wi-Fi Sharing

```bash
npm start
# Access from other devices: http://<your-local-ip>:3001
```

### Option D: Kubernetes

```bash
kubectl apply -f k8s/
kubectl get pods -n cyberrange
```

---

## 16. Environment Variables

| Variable | Default | Description |
|---|---|---|
| PORT | 3001 | Server listen port |
| HOST | 0.0.0.0 | Server bind address |
| NODE_ENV | development | Runtime environment |
| ORCHESTRATOR_TYPE | docker | docker / kubernetes / mock |
| DATABASE_URL | — | PostgreSQL connection string |
| REDIS_URL | — | Redis connection string |
| HMAC_SECRET | — | Secret key for dynamic flag signing |
| CORS_ORIGIN | * | Allowed CORS origins |

---

## 17. Security Considerations

### Dynamic Flag Injection
Each session gets a unique flag: `HMAC-SHA256(sessionId + labId, HMAC_SECRET)` — prevents flag sharing between operators.

### Container Isolation
- Each session runs in a **separate Docker container** in an isolated network
- Containers are **automatically pruned** on session end — zero persistence
- Resource limits enforced per container

### Input Validation
- Flag submissions validated server-side against HMAC
- Session IDs are UUIDs — no sequential enumeration
- WebSocket connections require valid session UUID in URL path

### Rate Limiting
- Redis-backed rate limiting on session creation
- Prevents container farm abuse

---

*RangeForge v2.9.0 — Train. Attack. Defend. — September 2026*
