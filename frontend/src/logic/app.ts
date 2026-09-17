import { LAB_CATALOG, PRESENTATION_SLIDES, DEPLOY_SNIPPETS, API_RESPONSES } from '../data/constants';
/**
 * Cyber Lab Official Website Application Logic
 * Author: Kartik Baniwal
 * Version: 2.9.0
 */

// =============================================================================
// 1. DATA MODELS & STATE
// =============================================================================



// Presentation Slides Data (Adapted from RangeForge_Presentation.html)


// Deployment Code Snippets


// API Mock Responses



// =============================================================================
// 2. TERMINAL SIMULATOR ENGINE
// =============================================================================

class TerminalSimulator {
  screen: any;
  output: any;
  input: any;
  statsLabel: any;
  commandHistory: any[];
  historyIndex: number;
  commandsRun: number;
  objectivesDone: Set<string>;
  flagCaptured: boolean;
  availableCommands: string[];
  constructor() {
    this.screen = document.getElementById('terminal-screen');
    this.output = document.getElementById('terminal-output');
    this.input = document.getElementById('terminal-input');
    this.statsLabel = document.getElementById('term-stats');
    
    this.commandHistory = [];
    this.historyIndex = -1;
    this.commandsRun = 0;
    this.objectivesDone = new Set();
    this.flagCaptured = false;

    this.availableCommands = [
      'help', 'nmap', 'cat', 'kali-tools', 'whoami', 'id', 'uname',
      'ip', 'ps', 'audit', 'validate-flag', 'clear', 'echo', 'date'
    ];

    this.initEvents();
  }

  initEvents() {
    if (!this.input) return;

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const rawCmd = this.input.value.trim();
        if (rawCmd) {
          this.executeCommand(rawCmd);
          this.commandHistory.push(rawCmd);
          this.historyIndex = this.commandHistory.length;
          this.input.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (this.commandHistory.length > 0 && this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.commandHistory[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (this.historyIndex < this.commandHistory.length - 1) {
          this.historyIndex++;
          this.input.value = this.commandHistory[this.historyIndex];
        } else {
          this.historyIndex = this.commandHistory.length;
          this.input.value = '';
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.autocomplete();
      }
    });

    // Quick Command Pills
    document.querySelectorAll('.command-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');
        if (cmd) {
          this.executeCommand(cmd);
          this.commandHistory.push(cmd);
          this.historyIndex = this.commandHistory.length;
          this.input.focus();
        }
      });
    });

    // Auto-focus terminal on click anywhere inside screen
    this.screen.addEventListener('click', () => {
      this.input.focus();
    });
  }

  autocomplete() {
    const val = this.input.value.trim();
    if (!val) return;
    const match = this.availableCommands.find(c => c.startsWith(val));
    if (match) {
      this.input.value = match;
    }
  }

  appendLine(text, className = '') {
    const line = document.createElement('div');
    line.className = `term-line ${className}`;
    line.textContent = text;
    this.output.appendChild(line);
    this.scrollToBottom();
  }

  appendPromptEcho(cmd) {
    const row = document.createElement('div');
    row.className = 'term-line';
    row.innerHTML = `<span style="color:var(--green)">root@kali:~#</span> <span style="color:var(--text-primary)">${escapeHtml(cmd)}</span>`;
    this.output.appendChild(row);
  }

  scrollToBottom() {
    this.screen.scrollTop = this.screen.scrollHeight;
  }

  updateStats() {
    if (this.statsLabel) {
      this.statsLabel.textContent = `Commands Run: ${this.commandsRun} · Objectives: ${this.objectivesDone.size}/3`;
    }
  }

  executeCommand(cmdStr) {
    this.commandsRun++;
    this.appendPromptEcho(cmdStr);
    const parts = cmdStr.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').trim();

    switch (cmd) {
      case 'help':
        this.appendLine('Available Sandbox Commands:');
        this.appendLine('  help                           - Show this help menu', 'cyan');
        this.appendLine('  nmap [target]                  - Port and service scan (try: nmap 10.10.0.10)', 'cyan');
        this.appendLine('  cat /flag.txt                  - Inspect target flag file', 'cyan');
        this.appendLine('  validate-flag [flag]           - Verify HMAC-signed flag', 'cyan');
        this.appendLine('  kali-tools                     - Display preloaded offensive tool categories', 'cyan');
        this.appendLine('  ip addr                        - Show container network interfaces', 'cyan');
        this.appendLine('  whoami / id                    - Print current security context', 'cyan');
        this.appendLine('  uname -a                       - Print Linux kernel specification', 'cyan');
        this.appendLine('  ps aux                         - Inspect active background processes', 'cyan');
        this.appendLine('  audit                          - Dump session command audit transcript', 'cyan');
        this.appendLine('  clear                          - Clear terminal display', 'cyan');
        break;

      case 'nmap':
        this.objectivesDone.add('nmap');
        this.appendLine('Starting Nmap 7.94 ( https://nmap.org ) at 2026-09-17 12:00 UTC', 'muted');
        this.appendLine('Nmap scan report for 10.10.0.10 (target-node.cyberrange.local)');
        this.appendLine('Host is up (0.00034s latency).');
        this.appendLine('PORT     STATE SERVICE VERSION', 'cyan');
        this.appendLine('22/tcp   open  ssh     OpenSSH 9.3p1 Debian', 'green');
        this.appendLine('80/tcp   open  http    Apache httpd 2.4.57 (Debian)', 'green');
        this.appendLine('443/tcp  open  ssl/tls OpenSSL 3.0.11', 'green');
        this.appendLine('3306/tcp open  mysql   MySQL 8.0.35 Community Server', 'green');
        this.appendLine('Nmap done: 1 IP address (1 host up) scanned in 0.38 seconds', 'muted');
        this.appendLine('🎯 OBJECTIVE 1 MET: Host ports and service daemon enumerated!', 'orange');
        break;

      case 'cat':
        if (arg === '/flag.txt' || arg === 'flag.txt') {
          this.objectivesDone.add('flag_seen');
          this.appendLine('RANGE{map_the_network_2026}', 'green');
          this.appendLine('🎯 OBJECTIVE 2 MET: Found dynamic flag! Use validate-flag RANGE{...}', 'orange');
        } else {
          this.appendLine(`cat: ${arg}: No such file or directory. Try 'cat /flag.txt'`, 'red');
        }
        break;

      case 'validate-flag':
        if (arg === 'RANGE{map_the_network_2026}' || arg.includes('RANGE{')) {
          this.flagCaptured = true;
          this.objectivesDone.add('flag_validated');
          this.appendLine('═════════════════════════════════════════════════════════', 'green');
          this.appendLine('🎉 FLAG VALIDATED! Cryptographic HMAC-SHA256 confirmed.', 'green');
          this.appendLine('Session: rf-9f82d1c0 | Award: +150 XP | Status: COMPLETED', 'cyan');
          this.appendLine('═════════════════════════════════════════════════════════', 'green');
          showToast('🎯 Lab Completed! +150 XP awarded.', '✓');
        } else {
          this.appendLine('Usage: validate-flag RANGE{map_the_network_2026}', 'red');
        }
        break;

      case 'kali-tools':
        this.appendLine('Cyber Lab Preloaded Kali Linux Toolkit (50+ Utilities):');
        this.appendLine('  [+] Recon:      nmap, masscan, netcat, dnsenum, sublist3r, whois', 'cyan');
        this.appendLine('  [+] Web App:    sqlmap, nikto, gobuster, dirb, wpscan, curl', 'cyan');
        this.appendLine('  [+] Password:   hydra, john, hashcat, medusa, aircrack-ng', 'cyan');
        this.appendLine('  [+] Exploit:    metasploit-framework, searchsploit, evil-winrm', 'cyan');
        this.appendLine('  [+] Forensics:  strings, binwalk, xxd, foremost, volatility3, exiftool', 'cyan');
        break;

      case 'whoami':
        this.appendLine('root', 'green');
        break;

      case 'id':
        this.appendLine('uid=0(root) gid=0(root) groups=0(root)', 'green');
        break;

      case 'uname':
        this.appendLine('Linux kali-rolling 6.6.15-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux', 'muted');
        break;

      case 'ip':
        this.appendLine('1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN');
        this.appendLine('    inet 127.0.0.1/8 scope host lo');
        this.appendLine('2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP');
        this.appendLine('    inet 10.10.0.15/24 brd 10.10.0.255 scope global eth0', 'green');
        break;

      case 'ps':
        this.appendLine('USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND', 'cyan');
        this.appendLine('root         1  0.0  0.1  22140  3412 ?        Ss   12:00   0:00 /sbin/init');
        this.appendLine('root        18  0.0  0.2  14200  4120 pts/0    Ss   12:00   0:00 /bin/bash');
        this.appendLine('root        84  0.1  0.8 112400 18200 ?        S    12:00   0:02 python3 /opt/target_service.py', 'orange');
        break;

      case 'audit':
        this.appendLine('--- ACTIVE SESSION AUDIT LOG ---', 'purple');
        this.appendLine(`Session ID:      rf-9f82d1c0-44a2-4a0b-8d19-ee1239`);
        this.appendLine(`Commands Run:    ${this.commandsRun}`);
        this.appendLine(`Objectives Met:  ${this.objectivesDone.size}/3`);
        this.appendLine(`Flag Captured:   ${this.flagCaptured ? 'YES (Verified)' : 'Pending'}`);
        this.appendLine('Timestamp:       ' + new Date().toISOString(), 'muted');
        break;

      case 'clear':
        this.output.innerHTML = '';
        this.appendLine('Cyber Lab Terminal Gateway v2.9.0 [Container: kali-sandbox-session-9f82]', 'cyan');
        this.appendLine('Type \'help\' to display available sandbox commands.', 'muted');
        break;

      default:
        this.appendLine(`bash: ${cmd}: command not found. Type 'help' for available commands.`, 'red');
        break;
    }

    this.updateStats();
  }
}


// =============================================================================
// 3. LAB CATALOG RENDERER & FILTER
// =============================================================================

function initLabCatalog() {
  const container = document.getElementById('lab-cards-container');
  const filtersWrap = document.getElementById('lab-filters');
  const searchInput = document.getElementById('lab-search');

  let activeFilter = 'all';
  let searchQuery = '';

  function render() {
    if (!container) return;
    container.innerHTML = '';

    const filtered = LAB_CATALOG.filter(lab => {
      const matchFilter = (activeFilter === 'all' || lab.category === activeFilter);
      const matchSearch = searchQuery === '' || 
        lab.name.toLowerCase().includes(searchQuery) ||
        lab.description.toLowerCase().includes(searchQuery) ||
        lab.tags.some(t => t.toLowerCase().includes(searchQuery));
      return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding: 48px; color: var(--text-muted); font-family: var(--font-mono);">
          No labs found matching criteria "${escapeHtml(searchQuery)}" in domain "${escapeHtml(activeFilter)}".
        </div>
      `;
      return;
    }

    filtered.forEach(lab => {
      const card = document.createElement('div');
      let accentClass = '';
      if (lab.level === 'Beginner') accentClass = 'green';
      else if (lab.level === 'Intermediate') accentClass = 'orange';
      else if (lab.level === 'Advanced') accentClass = 'red';

      card.className = `lab-card ${accentClass} tilt-card`;
      card.innerHTML = `
        <div class="lab-card-top">
          <div class="lab-card-header">
            <span class="lab-domain-badge">${lab.category}</span>
            <span class="lab-badge ${lab.level.toLowerCase()}">${lab.level}</span>
          </div>
          <h3 class="lab-title">${lab.name}</h3>
          <p class="lab-desc">${lab.description}</p>
          <div class="lab-meta-row">
            <div class="lab-meta-item"><span>💻</span> ${lab.os}</div>
            <div class="lab-meta-item"><span>⏱️</span> ${lab.time}</div>
          </div>
          <div class="lab-tags">
            ${lab.tags.map(t => `<span class="lab-tag">${t}</span>`).join('')}
          </div>
        </div>
        <div class="lab-card-actions">
          <span class="lab-xp">✨ +${lab.xp} XP</span>
          <button class="btn btn-outline btn-sm btn-lab-detail" data-lab-id="${lab.id}">
            View Lab Details →
          </button>
        </div>
      `;
      container.appendChild(card);
    });

    // Attach click handlers to lab detail buttons
    container.querySelectorAll('.btn-lab-detail').forEach(btn => {
      btn.addEventListener('click', () => {
        const labId = btn.getAttribute('data-lab-id');
        openLabModal(labId);
      });
    });

    // Re-initialize 3D tilt on newly rendered cards
    init3DTilt();
  }

  if (filtersWrap) {
    filtersWrap.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filtersWrap.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter');
        render();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = (e.target as any).value.toLowerCase().trim();
      render();
    });
  }

  render();
}

// Open Lab Details Modal
function openLabModal(labId) {
  const lab = LAB_CATALOG.find(l => l.id === labId);
  if (!lab) return;

  const modal = document.getElementById('lab-detail-modal');
  const icon = document.getElementById('modal-lab-icon');
  const title = document.getElementById('modal-lab-title');
  const domain = document.getElementById('modal-lab-domain');
  const body = document.getElementById('modal-lab-body');
  const launchBtn = document.getElementById('btn-modal-launch');

  icon.textContent = lab.icon;
  title.textContent = lab.name;
  domain.textContent = `${lab.category.toUpperCase()} · ${lab.level.toUpperCase()} · +${lab.xp} XP`;

  body.innerHTML = `
    <div style="margin-bottom:20px;">
      <p style="font-size:15px; color:var(--text-secondary); line-height:1.6; margin-bottom:16px;">
        ${lab.description}
      </p>
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; background:var(--bg-secondary); padding:12px; border-radius:6px; font-family:var(--font-mono); font-size:12px; margin-bottom:20px;">
        <div>Target OS: <strong style="color:var(--cyan);">${lab.os}</strong></div>
        <div>Estimated Duration: <strong style="color:var(--green);">${lab.time}</strong></div>
        <div>XP Reward: <strong style="color:var(--purple);">+${lab.xp} XP</strong></div>
      </div>
    </div>

    <h4 style="font-size:14px; margin-bottom:10px; color:var(--cyan); font-family:var(--font-mono); text-transform:uppercase;">
      🎯 Mission Objectives
    </h4>
    <ul style="list-style:none; display:flex; flex-direction:column; gap:8px; margin-bottom:20px;">
      ${lab.objectives.map((obj, i) => `
        <li style="display:flex; gap:10px; font-size:13.5px; color:var(--text-secondary);">
          <span style="color:var(--green); font-family:var(--font-mono); font-weight:700;">[0${i+1}]</span>
          <span>${obj}</span>
        </li>
      `).join('')}
    </ul>

    <h4 style="font-size:14px; margin-bottom:10px; color:var(--cyan); font-family:var(--font-mono); text-transform:uppercase;">
      🛠️ Target &amp; Defense Utilities
    </h4>
    <div style="display:flex; flex-wrap:wrap; gap:6px;">
      ${lab.tools.map(t => `<span class="lab-tag" style="background:rgba(0,240,255,0.08); border-color:rgba(0,240,255,0.2); color:var(--cyan);">${t}</span>`).join('')}
    </div>
  `;

  launchBtn.onclick = () => {
    closeModal(modal);
    // Smooth scroll to terminal demo
    document.getElementById('terminal-demo')?.scrollIntoView({ behavior: 'smooth' });
    showToast(`🚀 Sandbox container spun up for ${lab.name}`, '⚡');
  };

  openModal(modal);
}


// =============================================================================
// 4. KALI LINUX DESKTOP SIMULATOR
// =============================================================================

function initKaliDesktop() {
  const tabs = document.querySelectorAll('.desktop-tab-btn');
  const windows = document.querySelectorAll('.desktop-window-view');
  const clock = document.getElementById('desktop-clock');
  const kaliMenuBtn = document.getElementById('btn-kali-menu');

  // Update clock every second
  function updateClock() {
    if (!clock) return;
    const now = new Date();
    clock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetWinId = tab.getAttribute('data-win');
      tabs.forEach(t => t.classList.remove('active'));
      windows.forEach(w => w.classList.remove('active'));

      tab.classList.add('active');
      const win = document.getElementById(`win-${targetWinId}`);
      if (win) win.classList.add('active');
    });
  });

  if (kaliMenuBtn) {
    kaliMenuBtn.addEventListener('click', () => {
      showToast('🐉 Kali Linux Application Launcher (50+ Penetration Testing Tools Loaded)', '🐉');
    });
  }
}


// =============================================================================
// 5. READINESS SCORE & XP CALCULATOR
// =============================================================================

function initCalculator() {
  const sliderLabs = document.getElementById('slider-labs');
  const sliderObjectives = document.getElementById('slider-objectives');
  const sliderFlags = document.getElementById('slider-flags');

  const valLabs = document.getElementById('val-labs');
  const valObjectives = document.getElementById('val-objectives');
  const valFlags = document.getElementById('val-flags');

  const scoreDisplay = document.getElementById('calc-score-display');
  const rankLabel = document.getElementById('calc-rank-label');

  const barLinux = document.getElementById('bar-linux');
  const barNetwork = document.getElementById('bar-network');
  const barWeb = document.getElementById('bar-web');
  const barForensics = document.getElementById('bar-forensics');
  const barIr = document.getElementById('bar-ir');

  const xpLinux = document.getElementById('xp-linux');
  const xpNetwork = document.getElementById('xp-network');
  const xpWeb = document.getElementById('xp-web');
  const xpForensics = document.getElementById('xp-forensics');
  const xpIr = document.getElementById('xp-ir');

  function calculate() {
    const labs = parseInt((sliderLabs as any)?.value || 0, 10);
    const objectives = parseInt((sliderObjectives as any)?.value || 0, 10);
    const flags = parseInt((sliderFlags as any)?.value || 0, 10);

    if (valLabs) valLabs.textContent = `${labs} / 7`;
    if (valObjectives) valObjectives.textContent = `${objectives} / 21`;
    if (valFlags) valFlags.textContent = `${flags} / 7`;

    // Official Formula from Documentation of Cyber Lab
    // readinessScore = min(100, round((labsCompleted x 20 + totalObjectives x 4 + capturedFlags x 8) / 1.7))
    const rawScore = (labs * 20 + objectives * 4 + flags * 8) / 1.7;
    const score = Math.min(100, Math.round(rawScore));

    if (scoreDisplay) scoreDisplay.textContent = score.toString();

    // Rank label
    let rank = 'OPERATOR RANK: RECRUIT';
    if (score >= 95) rank = 'OPERATOR RANK: ELITE RANGE MASTER (L5)';
    else if (score >= 80) rank = 'OPERATOR RANK: SENIOR SPECIALIST (L4)';
    else if (score >= 50) rank = 'OPERATOR RANK: CERTIFIED OPERATOR (L3)';
    else if (score >= 25) rank = 'OPERATOR RANK: SECURITY APPRENTICE (L2)';
    else if (score > 0) rank = 'OPERATOR RANK: NOVICE CADET (L1)';

    if (rankLabel) rankLabel.textContent = rank;

    // Dynamic XP Domain calculations
    const ratio = score / 100;
    const linXP = Math.round(200 * Math.min(1, ratio * 1.1));
    const netXP = Math.round(150 * Math.min(1, ratio * 1.05));
    const webXP = Math.round(200 * Math.min(1, ratio * 0.95));
    const forXP = Math.round(150 * Math.min(1, ratio * 0.9));
    const irXP = Math.round(300 * Math.min(1, ratio * 0.85));

    if (barLinux) barLinux.style.width = `${(linXP / 200) * 100}%`;
    if (barNetwork) barNetwork.style.width = `${(netXP / 150) * 100}%`;
    if (barWeb) barWeb.style.width = `${(webXP / 200) * 100}%`;
    if (barForensics) barForensics.style.width = `${(forXP / 150) * 100}%`;
    if (barIr) barIr.style.width = `${(irXP / 300) * 100}%`;

    if (xpLinux) xpLinux.textContent = `${linXP} / 200 XP`;
    if (xpNetwork) xpNetwork.textContent = `${netXP} / 150 XP`;
    if (xpWeb) xpWeb.textContent = `${webXP} / 200 XP`;
    if (xpForensics) xpForensics.textContent = `${forXP} / 150 XP`;
    if (xpIr) xpIr.textContent = `${irXP} / 300 XP`;
  }

  [sliderLabs, sliderObjectives, sliderFlags].forEach(slider => {
    slider?.addEventListener('input', calculate);
  });

  calculate();
}


// =============================================================================
// 6. DOCUMENTATION & API TESTER
// =============================================================================

function initDocsAndAPI() {
  // Doc Main Tabs
  const docTabs = document.querySelectorAll('.doc-tab-btn');
  const docPanes = document.querySelectorAll('.doc-pane');

  docTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetDoc = tab.getAttribute('data-doc');
      docTabs.forEach(t => t.classList.remove('active'));
      docPanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(`pane-${targetDoc}`)?.classList.add('active');
    });
  });

  // Deploy Sub-tabs
  const deployTabs = document.querySelectorAll('.deploy-tab-btn');
  const deployCode = document.getElementById('deploy-code-text');

  deployTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-target');
      deployTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      if (deployCode && DEPLOY_SNIPPETS[key]) {
        deployCode.textContent = DEPLOY_SNIPPETS[key];
      }
    });
  });

  // Copy Deploy Code
  document.getElementById('btn-copy-deploy')?.addEventListener('click', () => {
    if (deployCode) {
      copyToClipboard(deployCode.textContent);
      showToast('📋 Deployment commands copied to clipboard!', '✓');
    }
  });

  // Copy CTA Code
  document.getElementById('btn-copy-cta')?.addEventListener('click', () => {
    copyToClipboard('git clone https://github.com/Kartik-baniwal/Range_Forge.git && cd Range_Forge && npm start');
    showToast('📋 Quickstart command copied!', '✓');
  });

  // API Tester Buttons
  const apiBtns = document.querySelectorAll('.api-ep-btn');
  const apiOutput = document.getElementById('api-response-output');
  const apiLatency = document.getElementById('api-latency');

  apiBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const epKey = btn.getAttribute('data-ep');
      apiBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Simulate network request
      if (apiOutput) {
        apiOutput.textContent = 'Fetching response from http://localhost:3001/api...';
        const ms = Math.floor(Math.random() * 18) + 8;
        setTimeout(() => {
          if (API_RESPONSES[epKey]) {
            apiOutput.textContent = JSON.stringify(API_RESPONSES[epKey], null, 2);
          }
          if (apiLatency) apiLatency.textContent = `Response Time: ${ms}ms`;
        }, 120);
      }
    });
  });
}


// =============================================================================
// 7. PRESENTATION SLIDE DECK MODAL
// =============================================================================

class PresentationDeck {
  modal: any;
  viewport: any;
  dotsWrap: any;
  counter: any;
  btnPrev: any;
  btnNext: any;
  total: number;
  current: number;
  constructor() {
    this.modal = document.getElementById('presentation-modal');
    this.viewport = document.getElementById('deck-viewport');
    this.dotsWrap = document.getElementById('deck-dots');
    this.counter = document.getElementById('deck-slide-counter');
    this.btnPrev = document.getElementById('deck-btn-prev');
    this.btnNext = document.getElementById('deck-btn-next');
    
    this.total = PRESENTATION_SLIDES.length;
    this.current = 1;

    this.renderSlides();
    this.buildDots();
    this.initEvents();
  }

  renderSlides() {
    if (!this.viewport) return;
    this.viewport.innerHTML = '';

    PRESENTATION_SLIDES.forEach((slide, idx) => {
      const item = document.createElement('div');
      item.className = `deck-slide-item ${idx === 0 ? 'active' : ''}`;
      item.id = `deck-s-${idx + 1}`;
      item.innerHTML = `
        <div class="eyebrow">${slide.eyebrow}</div>
        <h2 class="slide-title" style="margin-bottom:12px;">${slide.title}</h2>
        <div class="subtitle" style="font-size:14px; margin-bottom:24px;">${slide.subtitle}</div>
        ${slide.content}
      `;
      this.viewport.appendChild(item);
    });
  }

  buildDots() {
    if (!this.dotsWrap) return;
    this.dotsWrap.innerHTML = '';
    for (let i = 1; i <= this.total; i++) {
      const dot = document.createElement('span');
      dot.className = `deck-dot ${i === this.current ? 'active' : ''}`;
      dot.onclick = () => this.goTo(i);
      this.dotsWrap.appendChild(dot);
    }
  }

  goTo(n) {
    if (n < 1 || n > this.total) return;
    const prevSlide = document.getElementById(`deck-s-${this.current}`);
    if (prevSlide) {
      prevSlide.classList.remove('active');
      prevSlide.classList.add('out');
      setTimeout(() => prevSlide.classList.remove('out'), 400);
    }

    this.current = n;
    const nextSlide = document.getElementById(`deck-s-${this.current}`);
    if (nextSlide) nextSlide.classList.add('active');

    if (this.counter) {
      this.counter.textContent = `${this.current < 10 ? '0' + this.current : this.current} / ${this.total}`;
    }

    if (this.btnPrev) this.btnPrev.disabled = this.current === 1;
    if (this.btnNext) this.btnNext.disabled = this.current === this.total;

    this.buildDots();
  }

  change(dir) {
    this.goTo(this.current + dir);
  }

  initEvents() {
    this.btnPrev?.addEventListener('click', () => this.change(-1));
    this.btnNext?.addEventListener('click', () => this.change(1));

    document.addEventListener('keydown', (e) => {
      if (this.modal?.classList.contains('active')) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
          e.preventDefault();
          this.change(1);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.change(-1);
        } else if (e.key === 'Escape') {
          closeModal(this.modal);
        }
      }
    });

    // Presentation launch buttons
    ['btn-open-presentation', 'btn-hero-deck', 'btn-cta-deck', 'footer-deck-link'].forEach(id => {
      document.getElementById(id)?.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(this.modal);
      });
    });

    document.getElementById('btn-close-presentation')?.addEventListener('click', () => {
      closeModal(this.modal);
    });
  }
}


// =============================================================================
// 8. AUDIT TRANSCRIPT DOWNLOAD & COPY
// =============================================================================

function initAuditDownloader() {
  const downloadBtn = document.getElementById('btn-download-sample-audit');
  const copyBtn = document.getElementById('btn-copy-transcript');
  const preview = document.getElementById('transcript-code-preview');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const text = preview ? preview.textContent : 'Cyber Lab Session Transcript';
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cyberlab_session_transcript_${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('📥 Transcript downloaded successfully (.txt)', '💾');
    });
  }

  if (copyBtn && preview) {
    copyBtn.addEventListener('click', () => {
      copyToClipboard(preview.textContent);
      showToast('📋 Audit transcript copied to clipboard!', '✓');
    });
  }
}


// =============================================================================
// 9. THEME TOGGLE & GENERAL UTILITIES
// =============================================================================

function initTheme() {
  const toggleBtn = document.getElementById('btn-theme-toggle');
  const floatingBtn = document.getElementById('btn-floating-theme');
  const lblDark = document.getElementById('lbl-dark');
  const lblLight = document.getElementById('lbl-light');
  const floatingIcon = document.getElementById('floating-theme-icon');
  const floatingText = document.getElementById('floating-theme-text');
  const root = document.documentElement;

  const savedTheme = localStorage.getItem('cyberlab-theme') || localStorage.getItem('rangeforge-theme') || 'obsidian';
  applyTheme(savedTheme, false);

  function applyTheme(theme, notify = true) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('cyberlab-theme', theme);
    localStorage.setItem('rangeforge-theme', theme);

    if (lblDark && lblLight) {
      if (theme === 'obsidian') {
        lblDark.classList.add('active');
        lblLight.classList.remove('active');
      } else {
        lblDark.classList.remove('active');
        lblLight.classList.add('active');
      }
    }

    if (floatingIcon && floatingText) {
      floatingIcon.textContent = theme === 'obsidian' ? '🌙' : '☀️';
      floatingText.textContent = theme === 'obsidian' ? 'Dark Mode' : 'Light Mode';
    }

    if (notify) {
      showToast(`Switched to ${theme === 'obsidian' ? 'Obsidian Dark' : 'Daylight Light'} Mode`, theme === 'obsidian' ? '🌙' : '☀️');
    }
  }

  function toggle() {
    const current = root.getAttribute('data-theme') || 'obsidian';
    const next = current === 'obsidian' ? 'daylight' : 'obsidian';
    applyTheme(next, true);
  }

  toggleBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle();
  });

  floatingBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle();
  });
}

function initMobileNav() {
  const menuBtn = document.getElementById('btn-mobile-menu');
  const navLinks = document.getElementById('nav-links');

  menuBtn?.addEventListener('click', () => {
    const expanded = navLinks?.classList.toggle('mobile-open');
    menuBtn.setAttribute('aria-expanded', String(Boolean(expanded)));
  });

  // Close nav on click link
  navLinks?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      menuBtn?.setAttribute('aria-expanded', 'false');
    });
  });
}

function openModal(modal) {
  if (!modal) return;
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function initModals() {
  const labModal = document.getElementById('lab-detail-modal');
  document.getElementById('btn-close-lab-modal')?.addEventListener('click', () => closeModal(labModal));
  document.getElementById('btn-modal-cancel')?.addEventListener('click', () => closeModal(labModal));

  // Close when clicking outside modal container
  document.querySelectorAll('.modal-backdrop').forEach(b => {
    b.addEventListener('click', (e) => {
      if (e.target === b) closeModal(b);
    });
  });
}

function showToast(msg, icon = '✓') {
  const toast = document.getElementById('toast-notice');
  const msgEl = document.getElementById('toast-msg');
  const iconEl = document.getElementById('toast-icon');

  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  if (iconEl) iconEl.textContent = icon;

  toast.classList.add('show');
  clearTimeout((toast as any)._timeout);
  (toast as any)._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(err => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}


// =============================================================================
// 10. AUTH GATE SYSTEM (LOGIN & SIGN UP)
// =============================================================================

function initAuthGate() {
  const btnLogin = document.getElementById('btn-nav-login');
  const btnSignup = document.getElementById('btn-nav-signup');
  const modal = document.getElementById('auth-modal');
  const btnClose = document.getElementById('btn-close-auth-modal');
  const tabLogin = document.getElementById('auth-tab-login');
  const tabSignup = document.getElementById('auth-tab-signup');
  const modalTitle = document.getElementById('auth-modal-title');
  const btnSubmit = document.getElementById('btn-auth-submit');
  const nameGroup = document.getElementById('field-name-group');
  const roleGroup = document.getElementById('field-role-group');
  const inputName = document.getElementById('auth-input-name') as HTMLInputElement | null;
  const inputEmail = document.getElementById('auth-input-email') as HTMLInputElement | null;
  const inputPass = document.getElementById('auth-input-pass') as HTMLInputElement | null;
  const inputRole = document.getElementById('auth-input-role') as HTMLSelectElement | null;
  const switchPrompt = document.getElementById('auth-switch-prompt');
  const authErrorMsg = document.getElementById('auth-error-msg');
  const authErrorText = document.getElementById('auth-error-text');

  const navAuthGroup = document.getElementById('auth-nav-group');
  const navLoggedIn = document.getElementById('auth-logged-in');
  const operatorNameDisplay = document.getElementById('operator-name-display');
  const btnLogout = document.getElementById('btn-nav-logout');

  // Pre-approved operator credentials
  const PREDEFINED_ACCOUNTS: Record<string, { pass: string; name: string; role: string; level: string; avatar: string }> = {
    'admin@cyberlab.io': { pass: 'admin123', name: 'Administrator', role: 'SecOps Lead / Administrator', level: 'Clearance Level 4 (Admin)', avatar: 'AD' },
    'admin': { pass: 'admin123', name: 'Administrator', role: 'SecOps Lead / Administrator', level: 'Clearance Level 4 (Admin)', avatar: 'AD' },
    'kartik@cyberlab.io': { pass: 'cyberlab2026', name: 'Kartik Baniwal', role: 'Security Analyst', level: 'Clearance Level 3', avatar: 'KB' },
    'kartik': { pass: 'cyberlab2026', name: 'Kartik Baniwal', role: 'Security Analyst', level: 'Clearance Level 3', avatar: 'KB' },
    'sarah@cyberlab.io': { pass: 'redteam2026', name: 'Sarah Connor', role: 'Penetration Tester', level: 'Clearance Level 4', avatar: 'SC' },
    'operator@cyberlab.io': { pass: 'operator123', name: 'Operator', role: 'Cyber Analyst', level: 'Clearance Level 2', avatar: 'OP' }
  };

  function getRegisteredUsers(): Record<string, { pass: string; name: string; role: string; level: string; avatar: string }> {
    try {
      const raw = localStorage.getItem('cyberlab-registered-users') || localStorage.getItem('rangeforge-registered-users');
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function showError(msg: string) {
    if (authErrorMsg) {
      authErrorMsg.style.display = 'block';
      if (authErrorText) authErrorText.textContent = `⚠️ ${msg}`;
    }
  }

  function clearError() {
    if (authErrorMsg) {
      authErrorMsg.style.display = 'none';
    }
  }

  let currentMode = 'login'; // 'login' | 'signup'

  function setMode(mode: string) {
    currentMode = mode;
    clearError();

    if (mode === 'login') {
      tabLogin?.classList.add('active');
      tabSignup?.classList.remove('active');
      if (tabLogin) {
        tabLogin.style.borderBottomColor = 'var(--cyan)';
        tabLogin.style.color = 'var(--cyan)';
      }
      if (tabSignup) {
        tabSignup.style.borderBottomColor = 'transparent';
        tabSignup.style.color = 'var(--text-muted)';
      }
      if (modalTitle) modalTitle.textContent = 'Operator Access Gate';
      if (btnSubmit) btnSubmit.textContent = 'Log In to Cyber Lab';
      if (nameGroup) nameGroup.style.display = 'none';
      if (roleGroup) roleGroup.style.display = 'none';
      if (switchPrompt) {
        switchPrompt.innerHTML = `Don't have an operator profile? <a href="#" id="link-switch-auth" style="color:var(--cyan); text-decoration:none;">Create account</a>`;
      }
    } else {
      tabSignup?.classList.add('active');
      tabLogin?.classList.remove('active');
      if (tabSignup) {
        tabSignup.style.borderBottomColor = 'var(--cyan)';
        tabSignup.style.color = 'var(--cyan)';
      }
      if (tabLogin) {
        tabLogin.style.borderBottomColor = 'transparent';
        tabLogin.style.color = 'var(--text-muted)';
      }
      if (modalTitle) modalTitle.textContent = 'Create Operator Profile';
      if (btnSubmit) btnSubmit.textContent = 'Register & Deploy Sandbox';
      if (nameGroup) nameGroup.style.display = 'block';
      if (roleGroup) roleGroup.style.display = 'block';
      if (switchPrompt) {
        switchPrompt.innerHTML = `Already have an account? <a href="#" id="link-switch-auth" style="color:var(--cyan); text-decoration:none;">Log in here</a>`;
      }
    }

    // Rebind dynamic switch link
    document.getElementById('link-switch-auth')?.addEventListener('click', (e) => {
      e.preventDefault();
      setMode(currentMode === 'login' ? 'signup' : 'login');
    });
  }

  function updateAuthUI() {
    const raw = localStorage.getItem('cyberlab-auth') || localStorage.getItem('rangeforge-auth');
    if (raw) {
      try {
        const user = JSON.parse(raw);
        if (user.isLoggedIn) {
          if (navAuthGroup) navAuthGroup.style.display = 'none';
          if (navLoggedIn) navLoggedIn.style.display = 'flex';
          if (operatorNameDisplay) operatorNameDisplay.textContent = user.name || 'Operator';
          return;
        }
      } catch (e) {
        localStorage.removeItem('cyberlab-auth');
        localStorage.removeItem('rangeforge-auth');
      }
    }
    if (navAuthGroup) navAuthGroup.style.display = 'flex';
    if (navLoggedIn) navLoggedIn.style.display = 'none';
  }

  btnLogin?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/RangeForge-Project/';
  });

  btnSignup?.addEventListener('click', () => {
    setMode('signup');
    openModal(modal);
  });

  document.getElementById('operator-badge-pill')?.addEventListener('click', () => {
    window.location.href = '/RangeForge-Project/';
  });

  tabLogin?.addEventListener('click', () => setMode('login'));
  tabSignup?.addEventListener('click', () => setMode('signup'));
  btnClose?.addEventListener('click', () => {
    clearError();
    closeModal(modal);
  });

  // Form submission with strict credential verification
  document.getElementById('auth-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    clearError();

    const email = (inputEmail?.value || '').trim().toLowerCase();
    const pass = (inputPass?.value || '').trim();

    if (!email || !pass) {
      showError('Please enter both Email/Callsign and Password.');
      return;
    }

    const registeredUsers = getRegisteredUsers();

    if (currentMode === 'login') {
      // Check predefined accounts or registered users
      const account = PREDEFINED_ACCOUNTS[email] || registeredUsers[email];

      if (!account) {
        showError('No operator account found with this email. Check credentials or click "Get started ↗" to register.');
        inputEmail?.focus();
        return;
      }

      if (account.pass !== pass) {
        showError('Incorrect password! Please verify your password. (Hint: check demo credentials below)');
        inputPass?.focus();
        return;
      }

      // Valid Credentials Verified!
      const userProfile = {
        name: account.name,
        email: email,
        role: account.role,
        level: account.level || 'Clearance Level 3',
        avatar: account.avatar || 'OP',
        isLoggedIn: true,
        loginAt: new Date().toISOString()
      };

      localStorage.setItem('cyberlab-auth', JSON.stringify(userProfile));
      localStorage.setItem('rangeforge-auth', JSON.stringify(userProfile));
      updateAuthUI();
      closeModal(modal);

      showToast(`Access Granted! Welcome Operator ${account.name}. Opening Dashboard...`, '⚡');

      setTimeout(() => {
        window.location.href = '/RangeForge-Project/';
      }, 500);

    } else {
      // Registration flow
      const name = (inputName?.value || '').trim();
      const role = inputRole?.value || 'Security Analyst';

      if (!name) {
        showError('Please enter your full name or operator callsign.');
        inputName?.focus();
        return;
      }

      if (pass.length < 4) {
        showError('Password must be at least 4 characters long.');
        inputPass?.focus();
        return;
      }

      if (PREDEFINED_ACCOUNTS[email] || registeredUsers[email]) {
        showError('An account with this email already exists. Please switch to Log In.');
        return;
      }

      // Create new registered user
      const parts = name.split(/\s+/);
      const avatar = parts.length > 1
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : name.slice(0, 2).toUpperCase();

      registeredUsers[email] = {
        pass: pass,
        name: name,
        role: role,
        level: 'Clearance Level 2',
        avatar: avatar
      };

      localStorage.setItem('cyberlab-registered-users', JSON.stringify(registeredUsers));
      localStorage.setItem('rangeforge-registered-users', JSON.stringify(registeredUsers));

      const userProfile = {
        name: name,
        email: email,
        role: role,
        level: 'Clearance Level 2',
        avatar: avatar,
        isLoggedIn: true,
        loginAt: new Date().toISOString()
      };

      localStorage.setItem('cyberlab-auth', JSON.stringify(userProfile));
      localStorage.setItem('rangeforge-auth', JSON.stringify(userProfile));
      updateAuthUI();
      closeModal(modal);

      showToast(`Account Created! Welcome Operator ${name}. Opening Dashboard...`, '🛡️');

      setTimeout(() => {
        window.location.href = '/RangeForge-Project/';
      }, 500);
    }
  });

  // Logout
  btnLogout?.addEventListener('click', () => {
    localStorage.removeItem('cyberlab-auth');
    localStorage.removeItem('rangeforge-auth');
    updateAuthUI();
    showToast('Signed out of operator terminal.', '✓');
  });

  updateAuthUI();
}

// =============================================================================
// 12. 3D INTERACTIVE ENGINE & PARALLAX
// =============================================================================

function init3DTilt() {
  // Cards use subtle CSS hover states, without pointer-driven transforms.
}


function init3DCube() {
  const cube = document.getElementById('cyber-cube');
  if (!cube) return;

  let mouseX = 0, mouseY = 0;
  let targetX = -15, targetY = 25;
  let currentX = -15, currentY = 25;

  window.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseX = (e.clientX - cx) / cx;
    mouseY = (e.clientY - cy) / cy;

    targetX = -mouseY * 35 - 15;
    targetY = mouseX * 45 + 25;

    // Update global 3D cursor spotlight
    document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
  });

  // Smooth dampening loop
  function animateCube() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    cube.style.transform = `rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg)`;
    requestAnimationFrame(animateCube);
  }
  requestAnimationFrame(animateCube);
}

// =============================================================================
// 13. ENTRYPOINT INITIALIZATION
// =============================================================================

export function initApp() {
  new TerminalSimulator();
  initLabCatalog();
  initKaliDesktop();
  initCalculator();
  initDocsAndAPI();
  new PresentationDeck();
  initAuditDownloader();
  initTheme();
  initMobileNav();
  initModals();
  initAuthGate();
  init3DTilt();
  init3DCube();
}

