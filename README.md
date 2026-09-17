# Cyber-Lab — Train. Attack. Defend.

An enterprise-grade cyber range platform providing realistic, isolated cybersecurity training environments with live Kali Linux & Ubuntu lab orchestration, interactive xterm.js PTY terminals, KasmVNC streaming, and complete operator progress tracking.

---

## 🚀 Unified Full-Stack Architecture

Frontend and backend are **fully merged** into a single cohesive service. A single server handles:
1. **Frontend Web UI**: Interactive RangeForge interface, authentication gate, 3D cybernetics, daylight & obsidian themes.
2. **Backend REST API**: Health monitoring, lab catalog provisioning, active container session control, and flag validation.
3. **WebSocket Gateway**: Real-time terminal streaming (`xterm.js` / PTY container attachments).
4. **LAN Wi-Fi Sharing**: Connect across multiple PCs and devices on the same Wi-Fi network with zero configuration.

---

## 🏁 Quick Start (Run Merged Server)

From the project root:

```bash
# Start the unified server (starts Frontend UI + Backend API + WebSocket Gateway)
npm start
```

Or run directly with Node:
```bash
node server.js
```

### Access URLs:
* **Local Machine**: [http://localhost:3001](http://localhost:3001)
* **Same Wi-Fi Network (LAN Sharing)**: `http://<your-local-ip>:3001` (e.g. `http://192.168.6.91:3001`)

---

## 🛠 Available Scripts

* `npm start`: Launches the merged RangeForge server on port `3001`.
* `npm run build`: Compiles TypeScript backend files into `backend/dist`.
* `npm run dev`: Runs the backend in live-reload TypeScript mode.
* `docker compose up -d`: Boots the complete containerized stack (Traefik, PostgreSQL, Redis, RangeForge API).

---

## 📁 Repository Structure

```
cyberrange-prototype/
├── index.html            # Main HTML document & view templates
├── style.css             # Cyber styling, 3D physics, obsidian & daylight themes
├── app.js                # Frontend client & live xterm.js / REST gateway
├── server.js             # Root entrypoint for unified server
├── package.json          # Root package scripts & configuration
├── backend/              # Node.js + Express + WebSocket backend service
│   ├── src/              # TypeScript source code
│   │   ├── config/       # Environment & port settings
│   │   ├── drivers/      # Container orchestration drivers (Docker, K8s, Mock)
│   │   ├── routes/       # API routes (/health, /labs, /sessions, /progress)
│   │   ├── services/     # Terminal WebSocket gateway & session manager
│   │   └── server.ts     # Express server & static asset host
│   └── dist/             # Compiled production build
├── docker-compose.yml    # Full-stack container orchestration
├── containers/           # Target container definitions (Kali, Ubuntu, Web, DVWA)
└── k8s/                  # Kubernetes Helm & manifest deployment.
```
