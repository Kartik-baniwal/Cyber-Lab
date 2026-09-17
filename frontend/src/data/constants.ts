export const LAB_CATALOG = [
  {
    id: 'linux',
    name: 'Linux Fundamentals',
    category: 'Linux Essentials',
    level: 'Beginner',
    time: '30 min',
    os: 'Ubuntu 22.04',
    xp: 100,
    tags: ['CLI Basics', 'Permissions', 'File Nav', 'Process Mgmt'],
    icon: '🐧',
    description: 'Master core Linux terminal commands, bash pipeline mechanics, file inspection, and user privilege structures.',
    objectives: [
      'Navigate the hierarchical directory structure and inspect hidden files',
      'Manage user accounts, groups, and standard Unix permissions',
      'Pipe commands through grep, awk, and sed to parse system logs',
      'Capture the foundational operator flag'
    ],
    tools: ['bash', 'grep', 'find', 'awk', 'chmod', 'ps']
  },
  {
    id: 'recon',
    name: 'Network Reconnaissance',
    category: 'Network Security',
    level: 'Beginner',
    time: '45 min',
    os: 'Kali Linux',
    xp: 150,
    tags: ['Nmap', 'Port Scanning', 'OSINT', 'Service Detection'],
    icon: '🔍',
    description: 'Discover active network hosts, analyze open TCP/UDP ports, enumerate running daemon versions, and map network topologies.',
    objectives: [
      'Inspect local interface addresses and gateway routing tables',
      'Perform SYN stealth and UDP port scans against 10.10.0.10',
      'Enumerate service versions and banner information on port 80/443',
      'Locate target secret flag inside /flag.txt'
    ],
    tools: ['nmap', 'ip addr', 'netstat', 'traceroute', 'ping', 'whois']
  },
  {
    id: 'web',
    name: 'Web Application Security',
    category: 'Web Security',
    level: 'Intermediate',
    time: '60 min',
    os: 'Kali Linux',
    xp: 200,
    tags: ['OWASP Top 10', 'SQLi', 'XSS', 'Directory Fuzzing'],
    icon: '🌐',
    description: 'Audit and exploit high-risk vulnerabilities on a dedicated DVWA target sandbox. Extract SQL data and bypass authentication.',
    objectives: [
      'Fuzz hidden administrative endpoints with gobuster/dirb',
      'Bypass authentication forms using SQL injection payloads',
      'Extract password hashes and decrypt database contents',
      'Submit the cryptographic session challenge flag'
    ],
    tools: ['gobuster', 'sqlmap', 'nikto', 'curl', 'burp-suite-cli']
  },
  {
    id: 'permissions',
    name: 'Permission Denied: System Hardening',
    category: 'Linux Essentials',
    level: 'Intermediate',
    time: '45 min',
    os: 'Ubuntu 22.04',
    xp: 100,
    tags: ['chmod', 'SUID / SGID', 'POSIX ACLs', 'Sudoers'],
    icon: '🔒',
    description: 'Identify misconfigured file permissions, SUID root binaries, insecure sudo privileges, and tighten security barriers.',
    objectives: [
      'Find all binaries with SUID permission bits across root filesystem',
      'Audit /etc/sudoers file for wildcards and NOPASSWD vulnerabilities',
      'Remediate insecure POSIX permissions across sensitive directories',
      'Validate system hardening compliance score'
    ],
    tools: ['chmod', 'chown', 'getfacl', 'setfacl', 'find', 'sudo']
  },
  {
    id: 'forensics',
    name: 'Follow the Evidence: Digital Forensics',
    category: 'Digital Forensics',
    level: 'Intermediate',
    time: '60 min',
    os: 'Ubuntu 22.04',
    xp: 150,
    tags: ['Memory Dump', 'Log Analysis', 'Strings', 'Binwalk'],
    icon: '🕵️',
    description: 'Investigate a simulated breach scenario. Extract hidden payloads from memory dumps, analyze auth logs, and trace attacker pivots.',
    objectives: [
      'Analyze /var/log/auth.log to identify failed brute-force origin IPs',
      'Carve embedded files and strings from captured memory dumps',
      'Calculate MD5 and SHA-256 integrity hashes for forensic evidence',
      'Locate attacker artifact flag hidden inside carved image'
    ],
    tools: ['strings', 'binwalk', 'xxd', 'md5sum', 'journalctl', 'grep']
  },
  {
    id: 'incident',
    name: 'Contain the Breach: Incident Response',
    category: 'Incident Response',
    level: 'Advanced',
    time: '90 min',
    os: 'Kali Linux',
    xp: 150,
    tags: ['Malware Triage', 'Process Kill', 'iptables', 'C2 Detection'],
    icon: '🚨',
    description: 'Respond to an active ransomware beacon. Triage malicious outbound connections, terminate rogue PIDs, and deploy firewall rules.',
    objectives: [
      'Identify rogue background processes transmitting to external C2 IPs',
      'Kill malicious threads without triggering watchdog self-destruct',
      'Deploy iptables drop rules to sever egress command channels',
      'Recover encrypted flag payload and restore service health'
    ],
    tools: ['ps aux', 'kill -9', 'iptables', 'ss -tulnp', 'lsof', 'tcpdump']
  },
  {
    id: 'kali-sandbox',
    name: 'Kali Linux Full OS & Toolkit',
    category: 'Offensive Security',
    level: 'Advanced',
    time: '120 min',
    os: 'Kali Linux Rolling',
    xp: 150,
    tags: ['Metasploit', 'Hydra', 'Hashcat', 'John The Ripper'],
    icon: '🐉',
    description: 'Unrestricted offensive sandbox equipped with over 50+ pre-installed penetration testing utilities and realistic simulated target networks.',
    objectives: [
      'Launch automated reconnaissance and service fingerprinting',
      'Execute dictionary attack against target SSH daemon via Hydra',
      'Crack captured hashes using John the Ripper / Hashcat',
      'Simulate full kill-chain exploitation and post-exploitation reporting'
    ],
    tools: ['metasploit', 'hydra', 'hashcat', 'john', 'aircrack-ng', 'wireshark']
  }
];

// Presentation Slides Data (Adapted from RangeForge_Presentation.html)
export const PRESENTATION_SLIDES = [
  {
    num: '01 / 12',
    eyebrow: 'Cybersecurity Training Platform',
    title: 'Cyber Lab',
    subtitle: 'TRAIN · ATTACK · DEFEND',
    content: `
      <p style="font-size:16px; color:var(--text-secondary); max-width:680px; text-align:center; line-height:1.6; margin-bottom:28px;">
        Enterprise-grade cyber range platform delivering realistic, isolated security training environments with live container orchestration, PTY terminal streaming, and an interactive Kali Linux desktop — all in your browser.
      </p>
      <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap;">
        <div class="stat-pill"><div class="val">7</div><div class="lbl">Labs</div></div>
        <div class="stat-pill"><div class="val">200K+</div><div class="lbl">Lines of Code</div></div>
        <div class="stat-pill"><div class="val">v2.9</div><div class="lbl">Version</div></div>
        <div class="stat-pill"><div class="val">MIT</div><div class="lbl">License</div></div>
      </div>
      <p style="margin-top:24px; font-family:var(--font-mono); font-size:12px; color:var(--text-muted);">Kartik Baniwal · September 2026</p>
    `
  },
  {
    num: '02 / 12',
    eyebrow: 'The Problem',
    title: 'Cybersecurity Training is Broken',
    subtitle: 'High friction, high cost, and zero audit persistence.',
    content: `
      <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:16px; max-width:840px;">
        <div class="card red">
          <div style="font-size:24px; margin-bottom:8px;">🚫</div>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--red); text-transform:uppercase;">Infrastructure Overhead</div>
          <h4 style="margin:4px 0 8px;">Complex Setup</h4>
          <p style="font-size:12.5px; color:var(--text-secondary);">Traditional cyber labs require dedicated hardware, complex VM setups, and hours of configuration before students type a single command.</p>
        </div>
        <div class="card orange">
          <div style="font-size:24px; margin-bottom:8px;">💸</div>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--orange); text-transform:uppercase;">Cost Barrier</div>
          <h4 style="margin:4px 0 8px;">Expensive Platforms</h4>
          <p style="font-size:12.5px; color:var(--text-secondary);">Existing platforms cost $14–$84/mo per user and require constant internet connectivity to remote VM farms.</p>
        </div>
        <div class="card purple">
          <div style="font-size:24px; margin-bottom:8px;">📉</div>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--purple); text-transform:uppercase;">Poor Progress Tracking</div>
          <h4 style="margin:4px 0 8px;">No Audit Trail</h4>
          <p style="font-size:12.5px; color:var(--text-secondary);">Students lose their command history, terminal output, and proof of work when a session ends.</p>
        </div>
        <div class="card">
          <div style="font-size:24px; margin-bottom:8px;">🔒</div>
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--cyan); text-transform:uppercase;">No Isolation</div>
          <h4 style="margin:4px 0 8px;">Shared Contamination</h4>
          <p style="font-size:12.5px; color:var(--text-secondary);">Shared lab environments contaminate results and create security risks. Every operator needs a dedicated sandbox.</p>
        </div>
      </div>
    `
  },
  {
    num: '03 / 12',
    eyebrow: 'The Solution',
    title: 'One Platform, Everything in Browser',
    subtitle: 'From zero to full offensive shell in seconds.',
    content: `
      <ul style="list-style:none; display:flex; flex-direction:column; gap:12px; max-width:780px;">
        <li style="display:flex; gap:14px; align-items:flex-start;">
          <span style="font-size:20px;">🐳</span>
          <div><strong>Ephemeral Docker Containers:</strong> <span style="color:var(--text-secondary);">Dedicated sandbox per operator. Spun up in milliseconds. Zero config, zero persistence.</span></div>
        </li>
        <li style="display:flex; gap:14px; align-items:flex-start;">
          <span style="font-size:20px;">⌨️</span>
          <div><strong>Live PTY Terminal via xterm.js:</strong> <span style="color:var(--text-secondary);">Real bash shell streaming over WebSockets. Real pipes, interactive commands, and live signals.</span></div>
        </li>
        <li style="display:flex; gap:14px; align-items:flex-start;">
          <span style="font-size:20px;">🐉</span>
          <div><strong>Kali Linux XFCE Desktop:</strong> <span style="color:var(--text-secondary);">Draggable windows, taskbar, Chromium, Thunar, Mousepad — fully rendered in browser.</span></div>
        </li>
        <li style="display:flex; gap:14px; align-items:flex-start;">
          <span style="font-size:20px;">🚩</span>
          <div><strong>Dynamic HMAC-Signed CTF Flags:</strong> <span style="color:var(--text-secondary);">Session-unique flags prevent cheating and prove authentic skill demonstration.</span></div>
        </li>
        <li style="display:flex; gap:14px; align-items:flex-start;">
          <span style="font-size:20px;">💾</span>
          <div><strong>Complete Audit Trail:</strong> <span style="color:var(--text-secondary);">Timestamped command history, terminal scrollback, and exportable forensic transcripts.</span></div>
        </li>
      </ul>
    `
  },
  {
    num: '04 / 12',
    eyebrow: 'Technical Architecture',
    title: 'Unified Full-Stack Architecture',
    subtitle: 'Built on modular layers and the Driver Pattern.',
    content: `
      <div style="display:flex; flex-direction:column; gap:10px; align-items:center; width:100%; max-width:760px; font-family:var(--font-mono); font-size:12px;">
        <div style="border:1px solid var(--cyan); padding:10px 16px; border-radius:6px; background:rgba(0,240,255,0.06); width:100%; text-align:center;">
          🌐 Browser SPA — index.html · app.js · style.css (Vanilla Zero-Build)
        </div>
        <div style="color:var(--text-muted);">⬇ REST API + WebSocket (/ws/terminal/:sessionId)</div>
        <div style="border:1px solid var(--purple); padding:10px 16px; border-radius:6px; background:rgba(167,139,250,0.06); width:100%; text-align:center;">
          ⚙️ Node.js Server (Port 3001) — Express REST · WebSocket Gateway · node-pty
        </div>
        <div style="color:var(--text-muted);">⬇ IOrchestrator Driver Interface</div>
        <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:8px; width:100%;">
          <div style="border:1px solid rgba(52,211,153,0.3); padding:8px; border-radius:4px; text-align:center; color:var(--green);">🐳 Docker</div>
          <div style="border:1px solid rgba(52,211,153,0.3); padding:8px; border-radius:4px; text-align:center; color:var(--green);">🐘 PostgreSQL</div>
          <div style="border:1px solid rgba(52,211,153,0.3); padding:8px; border-radius:4px; text-align:center; color:var(--green);">⚡ Redis</div>
          <div style="border:1px solid rgba(52,211,153,0.3); padding:8px; border-radius:4px; text-align:center; color:var(--green);">🔀 Traefik</div>
        </div>
      </div>
    `
  },
  {
    num: '05 / 12',
    eyebrow: 'Platform Features',
    title: 'Everything an Operator Needs',
    subtitle: 'From terminal emulator to skill progression metrics.',
    content: `
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:14px; max-width:840px;">
        <div class="card"><h4 style="color:var(--cyan); margin-bottom:4px;">⌨️ Terminal</h4><p style="font-size:12px; color:var(--text-secondary);">Real PTY shell via xterm.js v5 with auto-fit and web links.</p></div>
        <div class="card green"><h4 style="color:var(--green); margin-bottom:4px;">🏆 Objectives</h4><p style="font-size:12px; color:var(--text-secondary);">Regex output matching triggers real-time task completion.</p></div>
        <div class="card purple"><h4 style="color:var(--purple); margin-bottom:4px;">🐉 Desktop</h4><p style="font-size:12px; color:var(--text-secondary);">Simulated Kali XFCE desktop with draggable windows and tools.</p></div>
        <div class="card orange"><h4 style="color:var(--orange); margin-bottom:4px;">🚩 HMAC Flags</h4><p style="font-size:12px; color:var(--text-secondary);">HMAC-SHA256 flags injected into container at boot.</p></div>
        <div class="card"><h4 style="color:var(--cyan); margin-bottom:4px;">💾 Audit Trail</h4><p style="font-size:12px; color:var(--text-secondary);">Forensic session transcript download with full command log.</p></div>
        <div class="card green"><h4 style="color:var(--green); margin-bottom:4px;">📊 Analytics</h4><p style="font-size:12px; color:var(--text-secondary);">Readiness score and XP bars across 5 security domains.</p></div>
      </div>
    `
  },
  {
    num: '06 / 12',
    eyebrow: 'Lab Catalog',
    title: '7 Labs Across 5 Domains',
    subtitle: 'Curated curriculum from essentials to offensive operations.',
    content: `
      <table style="width:100%; max-width:800px; border-collapse:collapse; font-size:12px; font-family:var(--font-mono);">
        <tr style="border-bottom:1px solid var(--surface-border); color:var(--cyan); text-align:left;">
          <th style="padding:6px;">Lab Name</th>
          <th style="padding:6px;">Domain</th>
          <th style="padding:6px;">Level</th>
          <th style="padding:6px;">OS</th>
          <th style="padding:6px;">Time</th>
        </tr>
        <tr><td style="padding:6px;">Linux Fundamentals</td><td>Linux Essentials</td><td><span style="color:var(--green);">Beginner</span></td><td>Ubuntu</td><td>30m</td></tr>
        <tr><td style="padding:6px;">Network Reconnaissance</td><td>Network Security</td><td><span style="color:var(--green);">Beginner</span></td><td>Kali</td><td>45m</td></tr>
        <tr><td style="padding:6px;">Web App Security</td><td>Web Security</td><td><span style="color:var(--orange);">Intermediate</span></td><td>Kali</td><td>60m</td></tr>
        <tr><td style="padding:6px;">Permission Denied</td><td>System Hardening</td><td><span style="color:var(--orange);">Intermediate</span></td><td>Ubuntu</td><td>45m</td></tr>
        <tr><td style="padding:6px;">Follow the Evidence</td><td>Digital Forensics</td><td><span style="color:var(--orange);">Intermediate</span></td><td>Ubuntu</td><td>60m</td></tr>
        <tr><td style="padding:6px;">Contain the Breach</td><td>Incident Response</td><td><span style="color:var(--red);">Advanced</span></td><td>Kali</td><td>90m</td></tr>
        <tr><td style="padding:6px;">Kali Full OS & Tools</td><td>Offensive Security</td><td><span style="color:var(--red);">Advanced</span></td><td>Kali</td><td>120m</td></tr>
      </table>
    `
  },
  {
    num: '07 / 12',
    eyebrow: 'Kali Linux Desktop',
    title: 'Full OS Experience in Browser',
    subtitle: 'XFCE desktop simulation rendered without VNC lag.',
    content: `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; max-width:840px; align-items:center;">
        <div style="background:#080d14; border:1px solid var(--surface-border); border-radius:8px; padding:14px; font-family:var(--font-mono); font-size:11px;">
          <div style="color:var(--cyan); margin-bottom:6px;">&gt;_ root@kali: ~ (XFCE Terminal)</div>
          <div style="color:#7b91a7;">Linux kali-rolling 6.6.15-amd64</div>
          <div style="color:#34d399;">┌──(root㉿kali)-[~]</div>
          <div><span style="color:#34d399;">└─#</span> nmap 10.10.0.10</div>
          <div style="color:#00f0ff;">PORT     STATE SERVICE</div>
          <div>22/tcp   open  ssh</div>
          <div>80/tcp   open  http</div>
          <div>443/tcp  open  https</div>
        </div>
        <div style="font-size:13px; color:var(--text-secondary); line-height:1.6;">
          <p>• <strong>Draggable Windows:</strong> Terminal, Browser, File Manager, Editor.</p>
          <p>• <strong>Taskbar & Menu:</strong> System clock, tray icons, quick launcher.</p>
          <p>• <strong>Quick Command Pills:</strong> One-click commands for rapid execution.</p>
          <p>• <strong>50+ Tools:</strong> Nmap, Hydra, SQLmap, Metasploit, Wireshark, etc.</p>
        </div>
      </div>
    `
  },
  {
    num: '08 / 12',
    eyebrow: 'Audit System',
    title: 'Never Lose Your Work',
    subtitle: 'Zero data loss architecture with 6 save entrypoints.',
    content: `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; max-width:840px;">
        <div style="display:flex; flex-direction:column; gap:10px; font-size:13px;">
          <div class="card" style="padding:10px;">💾 <strong>Save Progress:</strong> Non-blocking session download</div>
          <div class="card" style="padding:10px;">📥 <strong>Teardown Log:</strong> Download before container destroy</div>
          <div class="card" style="padding:10px;">📋 <strong>Copy Buffer:</strong> One-click scrollback clipboard copy</div>
          <div class="card" style="padding:10px;">☑ <strong>Auto-Archive:</strong> Silent fallback to localStorage</div>
        </div>
        <div style="background:#05090f; border:1px solid var(--surface-border); border-radius:8px; padding:14px; font-family:var(--font-mono); font-size:11px; color:#c6d4dc; max-height:220px; overflow:hidden;">
          <span style="color:var(--cyan);">╔══════════════════════════════════════╗</span><br>
          <span style="color:var(--cyan);">║  CYBER LAB SESSION TRANSCRIPT       ║</span><br>
          <span style="color:var(--cyan);">╚══════════════════════════════════════╝</span><br>
          Lab: Network Reconnaissance<br>
          Operator: Kartik Baniwal · Level 3<br>
          Captured Flag: RANGE{map_the_network}<br>
          Commands: ip addr, nmap 10.10.0.10, cat flag.txt...
        </div>
      </div>
    `
  },
  {
    num: '09 / 12',
    eyebrow: 'Technology Stack',
    title: 'Purpose-Built, Zero Overhead',
    subtitle: 'No heavy frontend frameworks. Instant load, total control.',
    content: `
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; max-width:840px;">
        <div class="card">
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--cyan); margin-bottom:6px;">FRONTEND</div>
          <p style="font-size:12.5px; color:var(--text-secondary);">Vanilla JS · HTML5 · CSS3 Custom Tokens · xterm.js v5 · Glassmorphism · localStorage</p>
        </div>
        <div class="card green">
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--green); margin-bottom:6px;">BACKEND</div>
          <p style="font-size:12.5px; color:var(--text-secondary);">Node.js 20+ · TypeScript · Express · ws WebSocket · node-pty · Dockerode · HMAC-SHA256</p>
        </div>
        <div class="card purple">
          <div style="font-family:var(--font-mono); font-size:11px; color:var(--purple); margin-bottom:6px;">INFRASTRUCTURE</div>
          <p style="font-size:12.5px; color:var(--text-secondary);">Docker Engine · Compose · Traefik v3 · PostgreSQL 16 · Redis 7 · Kubernetes Driver</p>
        </div>
      </div>
    `
  },
  {
    num: '10 / 12',
    eyebrow: 'Deployment Options',
    title: 'Laptop to Production in Minutes',
    subtitle: 'Four deployment modes for any environment.',
    content: `
      <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:14px; max-width:840px; font-family:var(--font-mono); font-size:12px;">
        <div class="card">
          <div style="color:var(--cyan); margin-bottom:4px;">Option A: Local Dev</div>
          <code style="color:var(--green);">npm start</code>
          <p style="font-size:11px; color:var(--text-secondary); margin-top:4px;">Dev-Mock mode for offline demo & UI work.</p>
        </div>
        <div class="card green">
          <div style="color:var(--green); margin-bottom:4px;">Option B: Docker Stack</div>
          <code style="color:var(--green);">docker compose up -d</code>
          <p style="font-size:11px; color:var(--text-secondary); margin-top:4px;">Full stack with Traefik, Postgres & Redis.</p>
        </div>
        <div class="card purple">
          <div style="color:var(--purple); margin-bottom:4px;">Option C: LAN Wi-Fi</div>
          <code style="color:var(--green);">npm start (Host 0.0.0.0)</code>
          <p style="font-size:11px; color:var(--text-secondary); margin-top:4px;">Share via Wi-Fi for classroom trainings.</p>
        </div>
        <div class="card orange">
          <div style="color:var(--orange); margin-bottom:4px;">Option D: Kubernetes</div>
          <code style="color:var(--green);">kubectl apply -f k8s/</code>
          <p style="font-size:11px; color:var(--text-secondary); margin-top:4px;">Scale to 100s of concurrent operators.</p>
        </div>
      </div>
    `
  },
  {
    num: '11 / 12',
    eyebrow: 'Security Architecture',
    title: 'Built for Security From Day One',
    subtitle: 'Cryptographic flags, ephemeral sandboxes, and rate limits.',
    content: `
      <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:16px; max-width:840px;">
        <div class="card green">
          <h4 style="color:var(--green); margin-bottom:6px;">🔐 Dynamic HMAC Flags</h4>
          <p style="font-size:12.5px; color:var(--text-secondary);">Session flags computed via HMAC-SHA256(sessionId + labId, SECRET). Server-side validation prevents flag sharing.</p>
        </div>
        <div class="card">
          <h4 style="color:var(--cyan); margin-bottom:6px;">🏰 Container Isolation</h4>
          <p style="font-size:12.5px; color:var(--text-secondary);">Dedicated Docker bridge networks per session. Auto-pruned on teardown — zero persistence by design.</p>
        </div>
        <div class="card purple">
          <h4 style="color:var(--purple); margin-bottom:6px;">🛡️ Non-Sequential UUIDs</h4>
          <p style="font-size:12.5px; color:var(--text-secondary);">Random UUIDs prevent session enumeration or prediction attacks across operators.</p>
        </div>
        <div class="card orange">
          <h4 style="color:var(--orange); margin-bottom:6px;">⚡ Redis Rate Limiting</h4>
          <p style="font-size:12.5px; color:var(--text-secondary);">Token bucket rate limits on session creation protect host infrastructure against abuse.</p>
        </div>
      </div>
    `
  },
  {
    num: '12 / 12',
    eyebrow: 'Ready to Deploy',
    title: 'Train. Attack. Defend.',
    subtitle: 'Self-hosted, open-source, and ready for your team.',
    content: `
      <div style="text-align:center; max-width:680px; margin:0 auto 24px;">
        <p style="font-size:15px; color:var(--text-secondary); line-height:1.6; margin-bottom:20px;">
          Cyber Lab provides everything you need to level up your cybersecurity capabilities — from foundational Linux mastery to advanced incident response.
        </p>
        <div style="font-family:var(--font-mono); font-size:13px; background:rgba(0,240,255,0.08); border:1px solid var(--surface-border); border-radius:6px; padding:12px; color:var(--cyan); margin-bottom:16px;">
          git clone https://github.com/Kartik-baniwal/Range_Forge.git
        </div>
        <p style="font-family:var(--font-mono); font-size:12px; color:var(--text-muted);">
          Kartik Baniwal · kartik@cyberlab.io · MIT License · v2.9.0
        </p>
      </div>
    `
  }
];

// Deployment Code Snippets
export const DEPLOY_SNIPPETS = {
  'dep-docker': `# Option B: Full Containerized Stack (Traefik + Postgres + Redis + API)
git clone https://github.com/Kartik-baniwal/Range_Forge.git
cd Range_Forge
docker compose up -d

# Services will bind automatically:
# - Traefik Dashboard: http://localhost:8080
# - Cyber Lab App:    http://localhost:3001
# - PostgreSQL DB:     localhost:5432
# - Redis Cache:       localhost:6379`,

  'dep-local': `# Option A: Local Development (Dev-Mock Driver — No Docker Required)
git clone https://github.com/Kartik-baniwal/Range_Forge.git
cd Range_Forge
cd backend && npm install && npm run build && cd ..
npm start

# -> Open http://localhost:3001 in your browser`,

  'dep-lan': `# Option C: LAN Wi-Fi Sharing (Perfect for Classroom / Team Exercises)
git clone https://github.com/Kartik-baniwal/Range_Forge.git
cd Range_Forge
npm start

# Access from any student laptop on same Wi-Fi:
# -> http://<your-local-ip>:3001 (e.g. http://192.168.1.150:3001)`,

  'dep-k8s': `# Option D: Kubernetes Production Cluster Scale-Out
git clone https://github.com/Kartik-baniwal/Range_Forge.git
cd Range_Forge
kubectl create namespace cyberrange
kubectl apply -f k8s/ -n cyberrange
kubectl get pods -n cyberrange -w`
};

// API Mock Responses
export const API_RESPONSES = {
  'health': {
    status: 'ok',
    uptime: 86420,
    activeSessions: 3,
    orchestrator: 'DockerDriver',
    clusterVersion: '2.9.0',
    memoryUsageMB: 142.6
  },
  'labs': [
    { id: 'linux', name: 'Linux Fundamentals', os: 'Ubuntu 22.04', difficulty: 'Beginner', duration: '30m' },
    { id: 'recon', name: 'Network Reconnaissance', os: 'Kali Linux', difficulty: 'Beginner', duration: '45m' },
    { id: 'web', name: 'Web Application Security', os: 'Kali Linux', difficulty: 'Intermediate', duration: '60m' },
    { id: 'permissions', name: 'Permission Denied', os: 'Ubuntu 22.04', difficulty: 'Intermediate', duration: '45m' },
    { id: 'forensics', name: 'Follow the Evidence', os: 'Ubuntu 22.04', difficulty: 'Intermediate', duration: '60m' },
    { id: 'incident', name: 'Contain the Breach', os: 'Kali Linux', difficulty: 'Advanced', duration: '90m' },
    { id: 'kali-sandbox', name: 'Kali Linux Full OS & Tools', os: 'Kali Linux', difficulty: 'Advanced', duration: '120m' }
  ],
  'session': {
    id: 'rf-9f82d1c0-44a2-4a0b-8d19-ee1239',
    labId: 'recon',
    containerId: 'range_ws_9f82d1c0',
    status: 'ACTIVE',
    wsUrl: 'ws://localhost:3001/ws/terminal/rf-9f82d1c0-44a2-4a0b-8d19-ee1239',
    expiresAt: new Date(Date.now() + 45 * 60000).toISOString(),
    dynamicFlagHMAC: 'RANGE{map_the_network_2026}'
  },
  'progress': {
    operator: 'Kartik Baniwal',
    labsCompleted: 4,
    totalObjectives: 12,
    capturedFlags: 4,
    readinessScore: 94,
    skillDomains: {
      linuxEssentials: { xp: 180, max: 200 },
      networkSecurity: { xp: 150, max: 150 },
      webSecurity: { xp: 160, max: 200 },
      digitalForensics: { xp: 120, max: 150 },
      incidentResponse: { xp: 210, max: 300 }
    }
  }
};

