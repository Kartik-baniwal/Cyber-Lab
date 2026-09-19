// Cyber Lab Unified Single-Origin Frontend & Backend Client
const API_BASE = (window.location.protocol === 'file:' || window.location.port === '8088')
  ? `http://${window.location.hostname || 'localhost'}:3001`
  : '';
let isLiveApi = false;
let labs = [
  {
    "id": "linux",
    "name": "Linux fundamentals",
    "category": "LINUX ESSENTIALS",
    "level": "Beginner",
    "time": 30,
    "icon": ">_",
    "color": "",
    "desc": "Find your footing in the shell. Navigate files, inspect permissions, and uncover a hidden flag.",
    "tags": [
      "Linux",
      "Command line"
    ],
    "os": "Kali Linux",
    "tasks": [
      "Find your working directory",
      "List the lab files",
      "Capture the hidden flag"
    ],
    "commands": [
      "pwd",
      "ls -la",
      "cat flag.txt"
    ],
    "defaultFlagPattern": "RANGE{first_steps}",
    "workstationImage": "rangeforge/kali-custom:latest",
    "objectives": [
      {
        "id": "linux_1",
        "title": "Find your working directory",
        "command": "pwd",
        "hint": "Type pwd in the terminal."
      },
      {
        "id": "linux_2",
        "title": "List the lab files",
        "command": "ls -la",
        "hint": "Type ls -la to see all files including hidden files."
      },
      {
        "id": "linux_3",
        "title": "Capture the hidden flag",
        "command": "cat flag.txt",
        "hint": "Read flag.txt and submit the contents.",
        "isFlagObjective": true
      }
    ],
    "flag": "RANGE{first_steps}"
  },
  {
    "id": "recon",
    "name": "Network reconnaissance",
    "category": "NETWORK SECURITY",
    "level": "Beginner",
    "time": 45,
    "icon": "⌘",
    "color": "blue",
    "desc": "Map an isolated network and discover the services running beneath the surface.",
    "tags": [
      "Networking",
      "Enumeration"
    ],
    "os": "Kali Linux",
    "tasks": [
      "Inspect your network address",
      "Discover target services",
      "Capture the service flag"
    ],
    "commands": [
      "ip addr",
      "nmap target",
      "cat flag.txt"
    ],
    "defaultFlagPattern": "RANGE{map_the_network}",
    "workstationImage": "rangeforge/kali-custom:latest",
    "targetImage": "cyberrange/target-recon:latest",
    "targetPorts": [
      22,
      8080
    ],
    "objectives": [
      {
        "id": "recon_1",
        "title": "Inspect your network address",
        "command": "ip addr",
        "hint": "Run ip addr or ip a to view your assigned IP."
      },
      {
        "id": "recon_2",
        "title": "Discover target services",
        "command": "nmap target",
        "hint": "Scan the lab target using nmap target or nmap 10.10.0.10."
      },
      {
        "id": "recon_3",
        "title": "Capture the service flag",
        "command": "cat flag.txt",
        "hint": "Inspect the discovered services to retrieve the flag.",
        "isFlagObjective": true
      }
    ],
    "flag": "RANGE{map_the_network}"
  },
  {
    "id": "web",
    "name": "Web application security",
    "category": "WEB SECURITY",
    "level": "Intermediate",
    "time": 60,
    "icon": "⊞",
    "color": "orange",
    "desc": "Investigate a vulnerable web application and learn to recognize common security flaws.",
    "tags": [
      "HTTP",
      "OWASP"
    ],
    "os": "Kali Linux",
    "tasks": [
      "Inspect the HTTP response",
      "Review the application notes",
      "Capture the application flag"
    ],
    "commands": [
      "curl target:8080",
      "cat notes.txt",
      "cat flag.txt"
    ],
    "defaultFlagPattern": "RANGE{web_detective}",
    "workstationImage": "rangeforge/kali-custom:latest",
    "targetImage": "cyberrange/target-vulnerable-web:latest",
    "targetPorts": [
      8080
    ],
    "objectives": [
      {
        "id": "web_1",
        "title": "Inspect the HTTP response",
        "command": "curl target:8080",
        "hint": "Use curl target:8080 to fetch the homepage headers and HTML."
      },
      {
        "id": "web_2",
        "title": "Review the application notes",
        "command": "cat notes.txt",
        "hint": "Read notes.txt to review developer comments and vulnerabilities."
      },
      {
        "id": "web_3",
        "title": "Capture the application flag",
        "command": "cat flag.txt",
        "hint": "Extract the token from the web vulnerability and verify the flag.",
        "isFlagObjective": true
      }
    ],
    "flag": "RANGE{web_detective}"
  },
  {
    "id": "permissions",
    "name": "Permission denied",
    "category": "SYSTEM HARDENING",
    "level": "Intermediate",
    "time": 45,
    "icon": "♧",
    "color": "purple",
    "desc": "Audit file access and fix a misconfiguration before it becomes a security incident.",
    "tags": [
      "Permissions",
      "Hardening"
    ],
    "os": "Kali Linux",
    "tasks": [
      "Inspect file permissions",
      "Secure the configuration file",
      "Capture the hardening flag"
    ],
    "commands": [
      "ls -la",
      "chmod 600 config.yml",
      "cat flag.txt"
    ],
    "defaultFlagPattern": "RANGE{least_privilege}",
    "workstationImage": "rangeforge/kali-custom:latest",
    "objectives": [
      {
        "id": "perm_1",
        "title": "Inspect file permissions",
        "command": "ls -la",
        "hint": "Check the permissions of config.yml with ls -la."
      },
      {
        "id": "perm_2",
        "title": "Secure the configuration file",
        "command": "chmod 600 config.yml",
        "hint": "Restrict config.yml to read/write by owner using chmod 600 config.yml."
      },
      {
        "id": "perm_3",
        "title": "Capture the hardening flag",
        "command": "cat flag.txt",
        "hint": "View flag.txt after successfully hardening the permissions.",
        "isFlagObjective": true
      }
    ],
    "flag": "RANGE{least_privilege}"
  },
  {
    "id": "forensics",
    "name": "Follow the evidence",
    "category": "DIGITAL FORENSICS",
    "level": "Intermediate",
    "time": 60,
    "icon": "⌕",
    "color": "blue",
    "desc": "Piece together a timeline from system logs and trace the source of unusual activity.",
    "tags": [
      "Log analysis",
      "Investigation"
    ],
    "os": "Kali Linux",
    "tasks": [
      "Read the system log",
      "Identify failed sign-ins",
      "Capture the evidence flag"
    ],
    "commands": [
      "cat auth.log",
      "grep failed auth.log",
      "cat flag.txt"
    ],
    "defaultFlagPattern": "RANGE{follow_the_evidence}",
    "workstationImage": "rangeforge/kali-custom:latest",
    "objectives": [
      {
        "id": "foren_1",
        "title": "Read the system log",
        "command": "cat auth.log",
        "hint": "Display auth.log to inspect authentication entries."
      },
      {
        "id": "foren_2",
        "title": "Identify failed sign-ins",
        "command": "grep failed auth.log",
        "hint": "Filter for unauthorized access attempts with grep failed auth.log."
      },
      {
        "id": "foren_3",
        "title": "Capture the evidence flag",
        "command": "cat flag.txt",
        "hint": "Trace the compromised account to verify the forensic flag.",
        "isFlagObjective": true
      }
    ],
    "flag": "RANGE{follow_the_evidence}"
  },
  {
    "id": "incident",
    "name": "Contain the breach",
    "category": "INCIDENT RESPONSE",
    "level": "Advanced",
    "time": 90,
    "icon": "ϟ",
    "color": "orange",
    "desc": "Investigate suspicious processes and contain a simulated compromised workstation.",
    "tags": [
      "Processes",
      "Blue team"
    ],
    "os": "Kali Linux",
    "tasks": [
      "Inspect running processes",
      "Stop the suspicious process",
      "Capture the response flag"
    ],
    "commands": [
      "ps aux",
      "kill 4242",
      "cat flag.txt"
    ],
    "defaultFlagPattern": "RANGE{incident_contained}",
    "workstationImage": "rangeforge/kali-custom:latest",
    "objectives": [
      {
        "id": "inc_1",
        "title": "Inspect running processes",
        "command": "ps aux",
        "hint": "Find the suspicious process with ps aux."
      },
      {
        "id": "inc_2",
        "title": "Stop the suspicious process",
        "command": "kill 4242",
        "hint": "Terminate the rogue process PID using kill 4242."
      },
      {
        "id": "inc_3",
        "title": "Capture the response flag",
        "command": "cat flag.txt",
        "hint": "Validate that the incident has been successfully contained.",
        "isFlagObjective": true
      }
    ],
    "flag": "RANGE{incident_contained}"
  },
  {
    "id": "kali-sandbox",
    "name": "Kali Linux Full OS & Tools",
    "category": "OFFENSIVE SECURITY",
    "level": "Advanced",
    "time": 120,
    "icon": "🐉",
    "color": "blue",
    "desc": "Unrestricted Kali Linux rolling environment with the full offensive security toolkit: Nmap, Metasploit, SQLmap, Hydra, John the Ripper, Wireshark, Gobuster, and root shell. Practice all Kali Linux commands in an isolated sandbox.",
    "tags": [
      "Kali Linux",
      "Full OS",
      "Nmap",
      "Metasploit",
      "Tools",
      "Red Team"
    ],
    "os": "Kali Linux",
    "tasks": [
      "Verify Kali environment & kernel (uname -a & whoami)",
      "Inspect pre-installed offensive security tools (kali-tools)",
      "Execute targeted vulnerability scan & extract flag (cat flag.txt)"
    ],
    "commands": [
      "uname -a",
      "kali-tools",
      "cat flag.txt"
    ],
    "defaultFlagPattern": "RANGE{kali_full_os_mastery_2026}",
    "workstationImage": "rangeforge/kali-custom:latest",
    "targetImage": "cyberrange/target-recon:latest",
    "targetPorts": [
      22,
      80,
      8080
    ],
    "objectives": [
      {
        "id": "kali_1",
        "title": "Verify Kali environment & kernel",
        "command": "uname -a",
        "hint": "Run uname -a or whoami to inspect system kernel & privileges."
      },
      {
        "id": "kali_2",
        "title": "Inspect pre-installed offensive security tools",
        "command": "kali-tools",
        "hint": "Run kali-tools or which nmap msfconsole to see available utilities."
      },
      {
        "id": "kali_3",
        "title": "Execute targeted vulnerability scan & extract flag",
        "command": "cat flag.txt",
        "hint": "Run nmap target and cat flag.txt to verify root flag.",
        "isFlagObjective": true
      }
    ],
    "flag": "RANGE{kali_full_os_mastery_2026}"
  },
  {
    "id": "ubuntu-fundamentals",
    "name": "Ubuntu fundamentals",
    "category": "LINUX ESSENTIALS",
    "level": "Beginner",
    "time": 30,
    "icon": ">_",
    "color": "",
    "desc": "Find your footing in the shell. Navigate files, inspect permissions, and uncover a hidden flag.",
    "tags": [
      "Ubuntu",
      "Linux",
      "Command line"
    ],
    "os": "Ubuntu",
    "tasks": [
      "Find your working directory",
      "List the lab files",
      "Capture the hidden flag"
    ],
    "commands": [
      "pwd",
      "ls -la",
      "cat flag.txt"
    ],
    "defaultFlagPattern": "RANGE{ubuntu_fundamentals}",
    "workstationImage": "cyberrange/workstation-ubuntu:latest",
    "objectives": [
      {
        "id": "ubuntu-fundamentals_1",
        "title": "Find your working directory",
        "command": "pwd",
        "hint": "Type pwd in the terminal."
      },
      {
        "id": "ubuntu-fundamentals_2",
        "title": "List the lab files",
        "command": "ls -la",
        "hint": "Type ls -la to see all files including hidden files."
      },
      {
        "id": "ubuntu-fundamentals_3",
        "title": "Capture the hidden flag",
        "command": "cat flag.txt",
        "hint": "Read flag.txt and submit the contents.",
        "isFlagObjective": true
      }
    ],
    "flag": "RANGE{ubuntu_fundamentals}"
  },
  {
    "id": "ubuntu-permissions",
    "name": "Ubuntu file permissions",
    "category": "SYSTEM HARDENING",
    "level": "Intermediate",
    "time": 45,
    "icon": "♧",
    "color": "purple",
    "desc": "Audit file access and fix a misconfiguration before it becomes a security incident.",
    "tags": [
      "Ubuntu",
      "Permissions",
      "Hardening"
    ],
    "os": "Ubuntu",
    "tasks": [
      "Inspect file permissions",
      "Secure the configuration file",
      "Capture the hardening flag"
    ],
    "commands": [
      "ls -la",
      "chmod 600 config.yml",
      "cat flag.txt"
    ],
    "defaultFlagPattern": "RANGE{ubuntu_permissions}",
    "workstationImage": "cyberrange/workstation-ubuntu:latest",
    "objectives": [
      {
        "id": "ubuntu-permissions_1",
        "title": "Inspect file permissions",
        "command": "ls -la",
        "hint": "Check the permissions of config.yml with ls -la."
      },
      {
        "id": "ubuntu-permissions_2",
        "title": "Secure the configuration file",
        "command": "chmod 600 config.yml",
        "hint": "Restrict config.yml to read/write by owner using chmod 600 config.yml."
      },
      {
        "id": "ubuntu-permissions_3",
        "title": "Capture the hardening flag",
        "command": "cat flag.txt",
        "hint": "View flag.txt after successfully hardening the permissions.",
        "isFlagObjective": true
      }
    ],
    "flag": "RANGE{ubuntu_permissions}"
  },
  {
    "id": "ubuntu-forensics",
    "name": "Ubuntu log analysis",
    "category": "DIGITAL FORENSICS",
    "level": "Intermediate",
    "time": 60,
    "icon": "⌕",
    "color": "blue",
    "desc": "Piece together a timeline from system logs and trace the source of unusual activity.",
    "tags": [
      "Ubuntu",
      "Log analysis",
      "Investigation"
    ],
    "os": "Ubuntu",
    "tasks": [
      "Read the system log",
      "Identify failed sign-ins",
      "Capture the evidence flag"
    ],
    "commands": [
      "cat auth.log",
      "grep failed auth.log",
      "cat flag.txt"
    ],
    "defaultFlagPattern": "RANGE{ubuntu_forensics}",
    "workstationImage": "cyberrange/workstation-ubuntu:latest",
    "objectives": [
      {
        "id": "ubuntu-forensics_1",
        "title": "Read the system log",
        "command": "cat auth.log",
        "hint": "Display auth.log to inspect authentication entries."
      },
      {
        "id": "ubuntu-forensics_2",
        "title": "Identify failed sign-ins",
        "command": "grep failed auth.log",
        "hint": "Filter for unauthorized access attempts with grep failed auth.log."
      },
      {
        "id": "ubuntu-forensics_3",
        "title": "Capture the evidence flag",
        "command": "cat flag.txt",
        "hint": "Trace the compromised account to verify the forensic flag.",
        "isFlagObjective": true
      }
    ],
    "flag": "RANGE{ubuntu_forensics}"
  },
  {
    "id": "ubuntu-sandbox",
    "name": "Ubuntu workstation",
    "category": "UBUNTU PRACTICE",
    "level": "Beginner",
    "time": 120,
    "icon": ">_",
    "color": "orange",
    "desc": "Explore your own Ubuntu 24.04 container with Bash, Python, editors, and networking utilities.",
    "tags": [
      "Ubuntu",
      "Bash",
      "Python"
    ],
    "os": "Ubuntu",
    "workstationImage": "cyberrange/workstation-ubuntu:latest",
    "defaultFlagPattern": "RANGE{ubuntu_workstation}",
    "tasks": [
      "Identify Ubuntu",
      "Check Python",
      "Capture the workstation flag"
    ],
    "commands": [
      "cat /etc/os-release",
      "python3 --version",
      "cat flag.txt"
    ],
    "objectives": [
      {
        "id": "ubuntu_sandbox_1",
        "title": "Identify Ubuntu",
        "command": "cat /etc/os-release",
        "hint": "Read /etc/os-release to identify your OS."
      },
      {
        "id": "ubuntu_sandbox_2",
        "title": "Check Python",
        "command": "python3 --version",
        "hint": "Print the installed Python version."
      },
      {
        "id": "ubuntu_sandbox_3",
        "title": "Capture the workstation flag",
        "command": "cat flag.txt",
        "hint": "Read flag.txt and submit its contents.",
        "isFlagObjective": true
      }
    ],
    "flag": "RANGE{ubuntu_workstation}"
  }
];

let osFilter = 'All';
let filter = 'All labs', query = '', session = null, selected = null, view = 'labs', tab = 'Terminal', history = [], totalObjectives = 0, launchTimer;
let activeXterm = null, activeWs = null, activeFitAddon = null;
let currentTermFontSize = parseInt(localStorage.getItem('range-term-font-size')) || 14;
let currentZoomPercent = parseInt(localStorage.getItem('range-zoom-percent')) || 100;
let isModalFullscreen = false;

function applyZoom(showNotification = false) {
  localStorage.setItem('range-term-font-size', currentTermFontSize);
  localStorage.setItem('range-zoom-percent', currentZoomPercent);
  document.documentElement.style.setProperty('--term-font-size', `${currentTermFontSize}px`);

  document.querySelectorAll('.zoom-display-val').forEach(el => {
    el.textContent = `${currentZoomPercent}%`;
  });

  if (activeXterm) {
    try {
      activeXterm.options.fontSize = currentTermFontSize;
      if (activeFitAddon) {
        setTimeout(() => activeFitAddon.fit(), 30);
      }
    } catch (e) {}
  }

  const localOut = document.getElementById('output');
  if (localOut) localOut.style.fontSize = `${currentTermFontSize}px`;

  const deskOut = document.getElementById('kali-desk-term-output');
  if (deskOut) deskOut.style.fontSize = `${currentTermFontSize}px`;
  const deskIn = document.getElementById('kali-desk-term-input');
  if (deskIn) deskIn.style.fontSize = `${currentTermFontSize}px`;

  const editor = document.getElementById('editor');
  if (editor) editor.style.fontSize = `${currentTermFontSize}px`;

  if (showNotification) {
    toast(`Workspace Zoom: ${currentZoomPercent}% (${currentTermFontSize}px)`);
  }
}

function enterModalFullscreen() {
  const screenEl = document.querySelector('.screen');
  if (!screenEl) return;
  isModalFullscreen = true;
  screenEl.classList.add('screen-fullscreen');
  document.body.classList.add('modal-fullscreen-active');
  document.documentElement.classList.add('modal-fullscreen-active');

  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.style.display = 'none';
    sidebar.classList.add('modal-fs-hidden');
  }

  // Attempt browser native fullscreen if available & not currently engaged
  if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  }

  updateZoomAndFullscreenUI();

  // Re-fit xterm to the full monitor dimensions
  setTimeout(() => {
    if (activeFitAddon && activeXterm) {
      try { activeFitAddon.fit(); } catch (e) {}
    }
  }, 60);
  setTimeout(() => {
    if (activeFitAddon && activeXterm) {
      try { activeFitAddon.fit(); } catch (e) {}
    }
  }, 220);

  toast('🐉 Kali Linux Fullscreen Active · Full Monitor Workspace');
}

function exitModalFullscreen() {
  const screenEl = document.querySelector('.screen');
  if (!screenEl) return;
  isModalFullscreen = false;
  screenEl.classList.remove('screen-fullscreen');
  document.body.classList.remove('modal-fullscreen-active');
  document.documentElement.classList.remove('modal-fullscreen-active');

  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.style.display = '';
    sidebar.classList.remove('modal-fs-hidden');
  }

  if (document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }

  updateZoomAndFullscreenUI();

  setTimeout(() => {
    if (activeFitAddon && activeXterm) {
      try { activeFitAddon.fit(); } catch (e) {}
    }
  }, 60);

  toast('Exited Fullscreen · Returned to windowed workspace');
}

function toggleModalFullscreen() {
  if (isModalFullscreen) {
    exitModalFullscreen();
  } else {
    enterModalFullscreen();
  }
}

function zoomIn() {
  if (!isModalFullscreen) {
    // When pressing Zoom In from normal view, expand the modal to Full Screen!
    enterModalFullscreen();
  } else {
    // Already in fullscreen: increase font scaling for high-res monitors
    currentTermFontSize = Math.min(26, currentTermFontSize + 2);
    currentZoomPercent = Math.min(180, currentZoomPercent + 15);
    applyZoom(true);
  }
}

function zoomOut() {
  if (isModalFullscreen) {
    // If in fullscreen and font was scaled up, reduce font first, or directly exit
    if (currentZoomPercent > 100) {
      currentTermFontSize = Math.max(14, currentTermFontSize - 2);
      currentZoomPercent = Math.max(100, currentZoomPercent - 15);
      applyZoom(true);
    } else {
      exitModalFullscreen();
    }
  } else {
    currentTermFontSize = Math.max(9, currentTermFontSize - 2);
    currentZoomPercent = Math.max(65, currentZoomPercent - 15);
    applyZoom(true);
  }
}

function resetZoom() {
  currentTermFontSize = 14;
  currentZoomPercent = 100;
  applyZoom(true);
}

function updateZoomAndFullscreenUI() {
  const fsBtn = document.getElementById('global-zoom-fullscreen');
  const fsLabel = document.getElementById('fullscreen-btn-label');
  const fsIcon = document.getElementById('fullscreen-btn-icon');
  const fsFooter = document.getElementById('screen-fs-footer');
  const exitQuickBtn = document.getElementById('exit-fullscreen-quick-btn');

  if (fsBtn) {
    fsBtn.classList.toggle('zoom-btn-active', isModalFullscreen);
    fsBtn.title = isModalFullscreen ? 'Exit Full Screen (Esc / Zoom Out)' : 'Zoom In to Full Screen';
  }
  if (fsLabel) {
    fsLabel.textContent = isModalFullscreen ? 'Exit Full Screen' : 'Full Screen';
  }
  if (fsIcon) {
    fsIcon.innerHTML = isModalFullscreen 
      ? '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>'
      : '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>';
  }
  if (fsFooter) {
    fsFooter.style.display = isModalFullscreen ? 'flex' : 'none';
  }
  if (exitQuickBtn) {
    exitQuickBtn.style.display = isModalFullscreen ? 'inline-flex' : 'none';
  }

  const globalOut = document.getElementById('global-zoom-out');
  if (globalOut) {
    globalOut.title = isModalFullscreen ? 'Zoom Out / Exit Full Screen (Ctrl −)' : 'Zoom Out (Ctrl −)';
  }
  const globalIn = document.getElementById('global-zoom-in');
  if (globalIn) {
    globalIn.title = isModalFullscreen ? 'Zoom In Font (Ctrl +)' : 'Zoom In to Full Screen (Ctrl +)';
  }
}

function bindZoomControls() {
  ['global-zoom-in', 'term-zoom-in', 'desk-zoom-in'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.onclick = (e) => { e.stopPropagation(); zoomIn(); };
    }
  });
  ['global-zoom-out', 'term-zoom-out', 'desk-zoom-out'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.onclick = (e) => { e.stopPropagation(); zoomOut(); };
    }
  });
  ['global-zoom-reset', 'term-zoom-reset', 'desk-zoom-reset'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.onclick = (e) => { e.stopPropagation(); resetZoom(); };
    }
  });
  ['global-zoom-fullscreen', 'term-zoom-fullscreen', 'desk-zoom-fullscreen', 'win-dot-zoom', 'exit-fullscreen-quick-btn', 'exit-fs-pill-btn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.onclick = (e) => { e.stopPropagation(); toggleModalFullscreen(); };
    }
  });
  updateZoomAndFullscreenUI();
}

const $ = s => document.querySelector(s);
const escape = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function toast(s) {
  $('#toast').textContent = s;
  $('#toast').classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => $('#toast').classList.remove('show'), 3300);
}

function setBackendStatus(connected) {
  isLiveApi = connected;
  const badge = $('#api-status-badge');
  if (badge) {
    badge.innerHTML = connected
      ? '<span class="pulse-beacon" style="background:#10b981;box-shadow:0 0 8px #10b981;"></span> LIVE API ACTIVE'
      : '<span class="pulse-beacon"></span> BACKEND OFFLINE';
    badge.style.color = connected ? '#10b981' : '';
    badge.style.borderColor = connected ? 'rgba(16, 185, 129, 0.4)' : '';
    badge.style.background = connected ? 'rgba(16, 185, 129, 0.1)' : '';
  }
  const footer = $('#footer-status');
  if (footer) footer.textContent = connected
    ? 'Connected to Cyber Lab Control Plane'
    : 'Backend unavailable · Launching a lab will retry the connection';
}

// A catalog or rendering error must not change the backend's connection state.
async function checkBackend({ syncCatalog = true } = {}) {
  try {
    const res = await fetch(`${API_BASE}/api/health`, {
      cache: 'no-store', signal: AbortSignal.timeout(8000)
    });
    if (!res.ok || (await res.json()).status !== 'ok') throw new Error('Backend health check failed');
  } catch (e) {
    setBackendStatus(false);
    return false;
  }

  setBackendStatus(true);
  if (syncCatalog) {
    try {
      const catalogRes = await fetch(`${API_BASE}/api/labs`, {
        cache: 'no-store', signal: AbortSignal.timeout(8000)
      });
      if (!catalogRes.ok) throw new Error('Lab catalog request failed');
      const catalog = await catalogRes.json();
      if (!Array.isArray(catalog)) throw new Error('Invalid lab catalog response');
      labs = catalog;
      renderCards();
      await syncProgress();
    } catch (e) {
      console.warn('Lab catalog or progress could not refresh:', e);
    }
  }
  return true;
}

const KEY_COMPLETED_HISTORY = 'rangeforge_completed_history';

function loadLocalProgress() {
  try {
    const saved = localStorage.getItem(KEY_COMPLETED_HISTORY);
    let localLabs = saved ? JSON.parse(saved) : [];
    
    // Also scan session history for completed labs
    const sessions = getSessionHistory();
    sessions.forEach(s => {
      if (s.status === 'completed' || (s.objectivesCompleted && s.objectivesCompleted >= 3)) {
        if (!localLabs.some(l => l.id === s.labId)) {
          localLabs.push({
            id: s.labId,
            name: s.labName,
            os: s.os || (s.labId && s.labId.includes('kali') ? 'Kali Linux' : 'Ubuntu'),
            flagCaptured: s.flagCaptured || null,
            completedAt: s.endedAt || s.startedAt || Date.now()
          });
        }
      }
    });

    history = localLabs;
    
    // Calculate totalObjectives across all sessions and completed labs
    let objCount = 0;
    sessions.forEach(s => {
      objCount += (s.objectivesCompleted || 0);
    });
    totalObjectives = Math.max(objCount, history.length * 3);
    
    localStorage.setItem(KEY_COMPLETED_HISTORY, JSON.stringify(history));
  } catch (e) {
    console.warn('loadLocalProgress error', e);
  }
}

async function syncProgress() {
  loadLocalProgress();
  if (!isLiveApi) return;
  try {
    const res = await fetch(`${API_BASE}/api/progress`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.completedLabs) && data.completedLabs.length > 0) {
        data.completedLabs.forEach(bLab => {
          if (!history.some(h => h.id === bLab.labId)) {
            history.push({
              id: bLab.labId,
              name: bLab.labName,
              os: bLab.os,
              flagCaptured: bLab.flag || null,
              completedAt: Date.now()
            });
          }
        });
        localStorage.setItem(KEY_COMPLETED_HISTORY, JSON.stringify(history));
        totalObjectives = Math.max(totalObjectives, history.length * 3);
      }
    }
  } catch (e) {}
}

function navigate(v) {
  if (isModalFullscreen && v !== 'session') {
    exitModalFullscreen();
  }

  // If not logged in and attempting to access protected pages, redirect to login
  if (!currentUser.isLoggedIn && v !== 'login') {
    v = 'login';
  }

  view = v;
  const isAuth = v === 'login';
  document.body.classList.toggle('auth-mode', isAuth);
  document.documentElement.classList.toggle('auth-mode', isAuth);

  document.querySelectorAll('[data-nav]').forEach(b => b.classList.toggle('active', b.dataset.nav === v));
  $('#crumb').textContent = { labs: 'Lab catalog', session: 'My session', progress: 'My progress', login: 'Operator Authentication' }[v] || 'Lab catalog';
  if (v === 'labs') catalog();
  if (v === 'session') workspace();
  if (v === 'progress') progress();
  if (v === 'login') authView();

  updateUserUI();
}

function catalog() {
  $('#main').innerHTML = `
    <div class="pagehead">
      <div>
        <div class="eyebrow">YOUR TRAINING GROUND</div>
        <h1>Find your next challenge.</h1>
        <p>Build practical security skills, one hands-on lab at a time.</p>
      </div>
      <button class="secondary" id="open-sandbox"><span>＋</span> Quick practice</button>
    </div>
    <section class="feature">
      <div class="featurecopy">
        <div class="feature-label"><span></span> FEATURED ENVIRONMENT</div>
        <h2>Kali or Ubuntu.<br><em>Your lab, ready.</em></h2>
        <p>Choose Kali Linux for security tools or Ubuntu 24.04 for Linux fundamentals, permissions, and log analysis. Each lab has its own container and progress.</p>
        <div class="feature-specs"><span>4 vCPU</span><span>3.5 GB RAM</span><span>Kali Rolling · Ubuntu 24.04</span></div>
        <div class="featureactions">
          <button class="primary" data-launch="kali-sandbox">Launch Kali lab <span>↗</span></button>
          <button class="feature-secondary" data-launch="ubuntu-sandbox">Launch Ubuntu lab <span>→</span></button>
        </div>
      </div>
      <div class="workspace-art" aria-hidden="true">
        <div class="art-orbit art-orbit-one"></div><div class="art-orbit art-orbit-two"></div>
        <div class="art-platform art-platform-back"></div><div class="art-platform art-platform-front"></div>
        <div class="art-terminal">
          <div class="art-terminal-bar"><span><i></i><i></i><i></i></span><small>linux / workspace</small><b>⌘</b></div>
          <div class="art-terminal-content"><span class="art-prompt">~ / ready to build</span><strong>&gt;_</strong><div class="art-code-line"></div><div class="art-code-line short"></div><p>KALI <span>+ UBUNTU</span></p></div>
        </div>
        <div class="art-floating-tag"><span>⌁</span> Your isolated workspace</div>
      </div>
    </section>
    <div class="catalogbar">
      <div class="tabs" role="group" aria-label="Lab difficulty">
        ${['All labs', 'Beginner', 'Intermediate', 'Advanced'].map(f => `<button class="filter ${filter === f ? 'active' : ''}" data-filter="${f}" aria-pressed="${filter === f}">${f}${f === 'All labs' ? `<small>${labs.length}</small>` : ''}</button>`).join('')}
      </div>
      <label class="search">
        <span>⌕</span>
        <input id="search" placeholder="Search labs or topics..." aria-label="Search labs" value="${escape(query)}">
      </label>
    </div>
    <div class="catalogmeta">
      <span id="result-count"></span>
      <span>Choose a challenge. Make progress.</span>
    </div>
    <div class="cards" id="cards"></div>
  `;
  const osControls = document.createElement('div');
  osControls.className = 'os-lab-filters';
  osControls.setAttribute('role', 'group');
  osControls.setAttribute('aria-label', 'Lab operating system');
  osControls.innerHTML = ['All', 'Kali Linux', 'Ubuntu'].map(os => `<button class="secondary" data-os-filter="${os}" aria-pressed="${osFilter === os}">${os === 'All' ? 'All operating systems' : os + ' labs'}</button>`).join('');
  $('#cards').before(osControls);
  osControls.querySelectorAll('button').forEach(button => button.onclick = () => { osFilter = button.dataset.osFilter; catalog(); });
  renderCards();
  $('#search').oninput = e => { query = e.target.value; renderCards(); };
  document.querySelectorAll('[data-filter]').forEach(b => b.onclick = () => { filter = b.dataset.filter; catalog(); });
  $('#open-sandbox').onclick = () => openLaunch(osFilter === 'Ubuntu' ? 'ubuntu-sandbox' : 'kali-sandbox');
  bindLaunch();
  init3DTilt();
}

function renderCards() {
  const catBadge = $('#catalog-badge');
  if (catBadge) catBadge.textContent = String(labs.length).padStart(2, '0');
  if (!$('#cards') || !$('#result-count')) return;
  const result = labs.filter(l => (osFilter === 'All' || l.os === osFilter) && (filter === 'All labs' || l.level === filter) && `${l.name} ${l.category} ${l.tags.join(' ')} ${l.os}`.toLowerCase().includes(query.toLowerCase()));
  $('#result-count').textContent = `${result.length} ${result.length === 1 ? 'lab' : 'labs'} to explore`;
  $('#cards').innerHTML = result.length ? ['Kali Linux', 'Ubuntu'].map(os => {
    const group = result.filter(l => l.os === os);
    if (!group.length) return '';
    return `<div class="os-lab-heading"><h2>${os === 'Ubuntu' ? 'Ubuntu labs' : 'Kali Linux labs'}</h2><p>${group.length} dedicated labs · ${os === 'Ubuntu' ? 'Ubuntu 24.04' : 'Kali Rolling'}</p></div>` + group.map(l => `
    <article class="card ${l.id === 'kali-sandbox' ? 'card-kali' : ''}">
      <div class="cardtop">
        <div class="labicon ${l.color}" aria-hidden="true">${l.id === 'kali-sandbox' ? '>_' : l.icon}</div>
        <span class="level ${l.level === 'Intermediate' ? 'medium' : l.level === 'Advanced' ? 'hard' : ''}">${l.level}</span>
      </div>
      <div class="category">${l.category}</div>
      <h3>${l.name}</h3>
      <p>${l.desc}</p>
      <div class="tags">${l.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="cardbottom">
        <span class="duration">◷ ${l.time} min <span>·</span> ${l.os}</span>
        <button data-launch="${l.id}">Launch lab <span>↗</span></button>
      </div>
    </article>
  `).join(''); }).join('') : `
    <div class="empty" style="grid-column:1/-1">
      <h2>No labs found</h2>
      <p>Try another topic or difficulty.</p>
      <button class="secondary" id="clear-search">Clear filters</button>
    </div>
  `;
  if ($('#clear-search')) $('#clear-search').onclick = () => { filter = 'All labs'; osFilter = 'All'; query = ''; catalog(); };
  bindLaunch();
  init3DTilt();
}

function bindLaunch() {
  document.querySelectorAll('[data-launch]').forEach(b => b.onclick = () => openLaunch(b.dataset.launch));
}

function openLaunch(id) {
  const lab = labs.find(l => l.id === id);
  if (!lab) throw Error('Unknown lab');
  if (session) {
    navigate('session');
    toast('End your current session before launching another lab.');
    return { status: 'existing_session' };
  }
  selected = lab;
  $('#launch-title').textContent = lab.name;
  const osRadio = document.querySelector(`input[name="os"][value="${lab.os}"]`);
  if (osRadio) osRadio.checked = true;
  document.querySelectorAll('input[name="os"]').forEach(input => {
    input.disabled = input.value !== lab.os;
    input.closest('label').hidden = input.value !== lab.os;
  });
  $('#launch-dialog').showModal();
  return { status: 'configuration_open', labId: id };
}

$('#confirm-launch').onclick = async () => {
  if (!selected) return;
  const os = selected.os;
  $('#confirm-launch').disabled = true;
  $('#confirm-launch').textContent = 'Provisioning isolated container…';

  // Retry after a failed startup check and wait if the user launches immediately.
  await checkBackend({ syncCatalog: false });
  if (isLiveApi) {
    try {
      const res = await fetch(`${API_BASE}/api/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ labId: selected.id, os })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create live session');
      }

      const apiSession = await res.json();
      session = {
        id: apiSession.id,
        lab: selected,
        os: apiSession.os,
        done: apiSession.completedObjectives || [],
        output: apiSession.outputLog || [],
        expires: apiSession.expiresAt,
        dynamicFlag: apiSession.dynamicFlag,
        endpoints: apiSession.endpoints,
        code: `# Lab configuration\n# Edit this practice file, then save your changes.\n\nlab:\n  name: ${selected.name}\n  network: isolated\n  session_minutes: 60\n`
      };
      recordSessionStart(session);

      $('#launch-dialog').close();
      $('#confirm-launch').disabled = false;
      $('#confirm-launch').innerHTML = 'Launch session <span>↗</span>';
      $('#session-dot').style.display = 'block';
      tab = 'Terminal';
      navigate('session');
      toast('Live environment provisioned and ready.');
      return;
    } catch (e) {
      console.error('Live lab provisioning failed:', e);
      toast(e.message || 'Unable to start Kali. Check Docker and the full Kali image build.');
      $('#confirm-launch').disabled = false;
      $('#confirm-launch').innerHTML = 'Launch session <span>↗</span>';
      return;
    }
  }

  if (selected.id === 'kali-sandbox') {
    toast('The full Kali lab requires the live backend and Docker. Start the server and try again.');
    $('#confirm-launch').disabled = false;
    $('#confirm-launch').innerHTML = 'Launch session <span>↗</span>';
    return;
  }

  // Local Simulation Fallback
  launchTimer = setTimeout(() => {
    session = {
      id: 'local_' + Math.random().toString(36).slice(2, 9),
      lab: selected,
      os,
      done: [],
      output: ['Welcome to Cyber Lab — Train. Attack. Defend.', 'Demo terminal — type help for supported commands.', ''],
      expires: Date.now() + 3600000,
      code: `# Lab configuration\n# Edit this practice file, then save your changes.\n\nlab:\n  name: ${selected.name}\n  network: isolated\n  session_minutes: 60\n`
    };
    recordSessionStart(session);
    $('#launch-dialog').close();
    $('#confirm-launch').disabled = false;
    $('#confirm-launch').innerHTML = 'Launch session <span>↗</span>';
    $('#session-dot').style.display = 'block';
    tab = (selected && (selected.os === 'Kali Linux' || selected.id === 'kali-sandbox')) ? 'Desktop' : 'Terminal';
    navigate('session');
    toast('Your environment is ready.');
  }, 750);
};

$('#launch-dialog').addEventListener('close', () => {
  if (!session) {
    clearTimeout(launchTimer);
    $('#confirm-launch').disabled = false;
    $('#confirm-launch').innerHTML = 'Launch session <span>↗</span>';
  }
});

const KEY_SESSION_HISTORY = 'rangeforge_session_history';
const KEY_COMMAND_LOG = 'rangeforge_cmd_log';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeJs(str) {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

function getSessionHistory() {
  try {
    const raw = localStorage.getItem(KEY_SESSION_HISTORY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  const defaultHistory = [
    {
      id: 'rf_kali_full_8841',
      labId: 'kali-sandbox',
      labName: 'Kali Linux Full OS & Offensive Tools',
      os: 'Kali Linux',
      startedAt: Date.now() - 7200000,
      endedAt: Date.now() - 5520000,
      status: 'completed',
      objectivesCompleted: 3,
      totalObjectives: 3,
      flagCaptured: 'RANGE{kali_root_access_granted_8841}',
      durationMinutes: 28
    },
    {
      id: 'rf_linux_sec_1982',
      labId: 'linux-sec',
      labName: 'Linux Security Essentials',
      os: 'Ubuntu',
      startedAt: Date.now() - 86400000,
      endedAt: Date.now() - 85320000,
      status: 'completed',
      objectivesCompleted: 3,
      totalObjectives: 3,
      flagCaptured: 'RANGE{linux_perms_secured_1982}',
      durationMinutes: 18
    },
    {
      id: 'rf_nmap_scan_9021',
      labId: 'nmap-scan',
      labName: 'Port Scanning with Nmap',
      os: 'Kali Linux',
      startedAt: Date.now() - 172800000,
      endedAt: Date.now() - 171480000,
      status: 'completed',
      objectivesCompleted: 3,
      totalObjectives: 3,
      flagCaptured: 'RANGE{nmap_service_discovery_9021}',
      durationMinutes: 22
    }
  ];
  saveSessionHistory(defaultHistory);
  return defaultHistory;
}

function saveSessionHistory(list) {
  try {
    localStorage.setItem(KEY_SESSION_HISTORY, JSON.stringify(list));
  } catch (e) {}
}

function getCommandHistoryLog() {
  try {
    const raw = localStorage.getItem(KEY_COMMAND_LOG);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  const defaultCmds = [
    {
      id: 'cmd_seed_1',
      timestamp: Date.now() - 5600000,
      sessionId: 'rf_kali_full_8841',
      labName: 'Kali Linux Full OS & Offensive Tools',
      prompt: 'root@kali:~# ',
      command: 'nmap -sV -p 22,80,8080 10.10.0.10',
      status: 'success'
    },
    {
      id: 'cmd_seed_2',
      timestamp: Date.now() - 5580000,
      sessionId: 'rf_kali_full_8841',
      labName: 'Kali Linux Full OS & Offensive Tools',
      prompt: 'root@kali:~# ',
      command: 'curl -s http://10.10.0.10:8080/flag.txt',
      status: 'success'
    },
    {
      id: 'cmd_seed_3',
      timestamp: Date.now() - 5550000,
      sessionId: 'rf_kali_full_8841',
      labName: 'Kali Linux Full OS & Offensive Tools',
      prompt: 'root@kali:~# ',
      command: 'cat /root/flag.txt',
      status: 'success'
    },
    {
      id: 'cmd_seed_4',
      timestamp: Date.now() - 85500000,
      sessionId: 'rf_linux_sec_1982',
      labName: 'Linux Security Essentials',
      prompt: 'learner@cyberlab:~$ ',
      command: 'chmod 600 config.yml',
      status: 'success'
    },
    {
      id: 'cmd_seed_5',
      timestamp: Date.now() - 85400000,
      sessionId: 'rf_linux_sec_1982',
      labName: 'Linux Security Essentials',
      prompt: 'learner@cyberlab:~$ ',
      command: 'cat auth.log | grep failed',
      status: 'success'
    }
  ];
  saveCommandHistoryLog(defaultCmds);
  return defaultCmds;
}

function saveCommandHistoryLog(list) {
  try {
    localStorage.setItem(KEY_COMMAND_LOG, JSON.stringify(list.slice(0, 400)));
  } catch (e) {}
}

function logCommandExecution(cmdStr) {
  if (!cmdStr || !cmdStr.trim()) return;
  const list = getCommandHistoryLog();
  const entry = {
    id: 'cmd_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    timestamp: Date.now(),
    sessionId: session ? session.id : 'adhoc',
    labName: session ? session.lab.name : 'Interactive Sandbox',
    prompt: (session && session.os === 'Ubuntu') ? 'learner@cyberlab:~$ ' : 'root@kali:~# ',
    command: cmdStr.trim(),
    status: 'success'
  };
  list.unshift(entry);
  saveCommandHistoryLog(list);
}

function recordSessionStart(newSession) {
  if (!newSession) return;
  const list = getSessionHistory();
  const existingIdx = list.findIndex(s => s.id === newSession.id);
  const record = {
    id: newSession.id,
    labId: newSession.lab.id,
    labName: newSession.lab.name,
    os: newSession.os,
    startedAt: Date.now(),
    endedAt: null,
    status: 'active',
    objectivesCompleted: newSession.done ? newSession.done.length : 0,
    totalObjectives: newSession.lab.tasks ? newSession.lab.tasks.length : 3,
    flagCaptured: newSession.dynamicFlag || null,
    durationMinutes: 0
  };
  if (existingIdx >= 0) {
    list[existingIdx] = { ...list[existingIdx], ...record };
  } else {
    list.unshift(record);
  }
  saveSessionHistory(list);
}

function recordSessionProgress(curSession) {
  if (!curSession) return;
  const list = getSessionHistory();
  const idx = list.findIndex(s => s.id === curSession.id);
  if (idx >= 0) {
    const isCompleted = curSession.done && curSession.done.length >= 3;
    list[idx].objectivesCompleted = curSession.done.length;
    if (isCompleted) {
      list[idx].status = 'completed';
    }
    if (curSession.dynamicFlag) {
      list[idx].flagCaptured = curSession.dynamicFlag;
    }
    saveSessionHistory(list);
  }
}

function recordSessionEnd(sessionId) {
  if (!sessionId) return;
  const list = getSessionHistory();
  const idx = list.findIndex(s => s.id === sessionId);
  if (idx >= 0) {
    list[idx].endedAt = Date.now();
    if (list[idx].status !== 'completed') {
      list[idx].status = 'ended';
    }
    list[idx].durationMinutes = Math.max(1, Math.round((Date.now() - list[idx].startedAt) / 60000));
    saveSessionHistory(list);
  }
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      toast(`Copied to clipboard: "${text}"`);
    }).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    toast(`Copied: "${text}"`);
  } catch (e) {
    toast('Failed to copy to clipboard');
  }
  document.body.removeChild(ta);
}

async function executeCommandInShell(cmd) {
  if (!session) {
    toast('Launch an active session to execute this command in a live container.');
    return;
  }
  tab = (session.os === 'Kali Linux' || session.lab.id === 'kali-sandbox') ? 'Desktop' : 'Terminal';
  document.querySelectorAll('[data-tab]').forEach(btn => {
    const isSelected = btn.dataset.tab === tab;
    btn.classList.toggle('active', isSelected);
    btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    btn.setAttribute('tabindex', isSelected ? '0' : '-1');
  });
  screen();
  toast(`Running command in shell: ${cmd}`);
  await runCommand(cmd);
}

function exportAuditLog() {
  const data = {
    exportedAt: new Date().toISOString(),
    sessions: getSessionHistory(),
    commands: getCommandHistoryLog()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cyberlab-audit-log-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast('Audit log exported successfully.');
}

const KEY_SAVED_TERMINAL_LOGS = 'rangeforge_saved_terminal_logs';

function getActiveTerminalText() {
  if (activeXterm && activeXterm.buffer && activeXterm.buffer.active) {
    try {
      const buf = activeXterm.buffer.active;
      const lines = [];
      for (let i = 0; i < buf.length; i++) {
        const line = buf.getLine(i);
        if (line) {
          lines.push(line.translateToString(true));
        }
      }
      while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
        lines.pop();
      }
      const txt = lines.join('\n');
      if (txt.trim()) return txt;
    } catch (e) {}
  }
  if (session && Array.isArray(session.output) && session.output.length > 0) {
    return session.output.join('\n');
  }
  const deskOut = document.getElementById('kali-desk-term-output');
  if (deskOut && deskOut.textContent.trim()) {
    return deskOut.textContent.trim();
  }
  const domOut = document.getElementById('output');
  if (domOut && domOut.textContent.trim()) {
    return domOut.textContent.trim();
  }
  return 'No terminal output recorded.';
}

function generateTranscriptText(snapshot) {
  const line = '='.repeat(80);
  const subline = '-'.repeat(80);
  const taskLines = (snapshot.objectives.tasks || []).map((t, i) => {
    const isDone = snapshot.objectives.completedTasks.includes(t) || i < snapshot.objectives.completedCount;
    return `  [${isDone ? '✓' : ' '}] Task ${i + 1}: ${t}`;
  }).join('\n');

  const cmdLines = snapshot.commands && snapshot.commands.length > 0
    ? snapshot.commands.map((c, i) => `  [${String(i + 1).padStart(2, '0')}] ${c.time} | ${c.prompt || '$ '}${c.command}`).join('\n')
    : '  (No interactive commands logged in this session)';

  return `${line}
CYBER LAB CYBERSECURITY RANGE · TERMINAL AUDIT & PROGRESS TRANSCRIPT
${line}
Generated At:      ${snapshot.savedAt}
Platform:          Cyber Lab Cybersecurity Range v2.9 · Ephemeral PTY & Containers
Operator:          ${snapshot.operator.name} <${snapshot.operator.email}>
Clearance Level:   ${snapshot.operator.level} · Role: ${snapshot.operator.role}

MISSION TELEMETRY:
${subline}
Lab Title:         ${snapshot.labName} (ID: ${snapshot.labId})
Target OS:         ${snapshot.os}
Session ID:        ${snapshot.sessionId}
Objectives Done:   ${snapshot.objectives.completedCount} of ${snapshot.objectives.totalCount} Mastered (${Math.round((snapshot.objectives.completedCount / (snapshot.objectives.totalCount || 3)) * 100)}%)
${taskLines}
Captured Flag:     ${snapshot.flagCaptured || 'None yet'}
Commands Logged:   ${snapshot.commandCount} commands executed

${line}
EXECUTED SHELL COMMAND AUDIT TRAIL (${snapshot.commandCount} commands):
${subline}
${cmdLines}

${line}
RAW TERMINAL SCROLLBACK TRANSCRIPT BUFFER:
${subline}
${snapshot.terminalScrollback}

${line}
[END OF TRANSCRIPT · CYBER LAB CONTROL PLANE ARCHIVE]
${line}
`;
}

function saveTerminalProgress(options = { downloadFile: true, notify: true }) {
  if (!session) {
    toast('No active lab session to save.');
    return null;
  }

  const lab = session.lab;
  const terminalText = getActiveTerminalText();
  
  // Get commands executed in this session
  const allCmds = getCommandHistoryLog();
  const sessionCmds = allCmds.filter(c => c.sessionId === session.id || (!c.sessionId && c.labName === lab.name));
  const cmdList = sessionCmds.length > 0 ? sessionCmds : allCmds.slice(0, 25);

  // Captured flag
  const capturedFlag = session.dynamicFlag || (session.done && session.done.length >= 3 ? lab.flag : null);

  // Completed task names
  const completedTaskNames = (session.done || []).map(idx => (lab.tasks && lab.tasks[idx]) ? lab.tasks[idx] : `Objective ${idx + 1}`);

  const snapshot = {
    id: `save_${session.id || 'session'}_${Date.now()}`,
    sessionId: session.id || `sess_${Date.now()}`,
    labId: lab.id,
    labName: lab.name,
    os: session.os,
    savedAt: new Date().toISOString(),
    timestamp: Date.now(),
    operator: {
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
      level: currentUser.level
    },
    objectives: {
      completedCount: session.done ? session.done.length : 0,
      totalCount: lab.tasks ? lab.tasks.length : 3,
      tasks: lab.tasks || [],
      completedTasks: completedTaskNames
    },
    flagCaptured: capturedFlag,
    commandCount: cmdList.length,
    commands: cmdList.map(c => ({
      time: new Date(c.timestamp).toLocaleTimeString(),
      command: c.command,
      prompt: c.prompt
    })),
    terminalScrollback: terminalText
  };

  // 1. Persist snapshot to localStorage ('rangeforge_saved_terminal_logs')
  try {
    const raw = localStorage.getItem(KEY_SAVED_TERMINAL_LOGS);
    const savedLogs = raw ? JSON.parse(raw) : [];
    savedLogs.unshift(snapshot);
    localStorage.setItem(KEY_SAVED_TERMINAL_LOGS, JSON.stringify(savedLogs.slice(0, 30)));
  } catch (e) {
    console.warn('Error saving terminal log to localStorage', e);
  }

  // 2. Ensure current session progress is recorded in session history
  recordSessionProgress(session);

  // 3. Download formatted text file if requested
  if (options.downloadFile) {
    const formattedTranscript = generateTranscriptText(snapshot);
    const blob = new Blob([formattedTranscript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeLabId = (lab.id || 'lab').replace(/[^a-zA-Z0-9_-]/g, '_');
    a.href = url;
    a.download = `Cyber Lab_${safeLabId}_Terminal_Log_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  if (options.notify !== false) {
    toast(`💾 Terminal progress & ${cmdList.length} commands saved to file and local archive!`);
  }

  return snapshot;
}

function openEndSessionDialog() {
  if (!session) {
    $('#end-dialog').showModal();
    return;
  }
  const dialog = $('#end-dialog');
  if (!dialog) return;

  const titleEl = $('#end-dialog-lab-title');
  if (titleEl) titleEl.textContent = session.lab.name;

  const osEl = $('#end-dialog-os');
  if (osEl) osEl.textContent = session.os;

  const objEl = $('#end-dialog-objectives');
  if (objEl) objEl.textContent = `${session.done.length} of 3 Mastered`;

  const flagEl = $('#end-dialog-flag');
  if (flagEl) {
    const flagVal = session.dynamicFlag || (session.done.length >= 3 ? session.lab.flag : null);
    flagEl.textContent = flagVal || 'None yet';
    flagEl.style.color = flagVal ? '#34d399' : 'var(--text-muted)';
  }

  const allCmds = getCommandHistoryLog();
  const sessionCmds = allCmds.filter(c => c.sessionId === session.id);
  const cmdEl = $('#end-dialog-cmd-count');
  if (cmdEl) cmdEl.textContent = `${sessionCmds.length} logged`;

  dialog.showModal();
}

function clearAuditHistory() {
  if (confirm('Are you sure you want to clear your local session history and command audit logs?')) {
    localStorage.removeItem(KEY_SESSION_HISTORY);
    localStorage.removeItem(KEY_COMMAND_LOG);
    toast('Session history and command logs cleared.');
    workspace();
  }
}

let hubFilter = 'all';
let hubSearch = '';
let currentHubTab = 'sessions';

async function renderSessionHub() {
  if (isLiveApi) {
    try {
      const res = await fetch(`${API_BASE}/api/sessions`);
      if (res.ok) {
        const liveSessions = await res.json();
        if (Array.isArray(liveSessions) && liveSessions.length > 0) {
          const list = getSessionHistory();
          liveSessions.forEach(ls => {
            const existing = list.find(s => s.id === ls.id);
            if (!existing) {
              const labObj = labs.find(l => l.id === ls.labId) || { name: 'Linux lab' };
              list.unshift({
                id: ls.id,
                labId: ls.labId,
                labName: labObj.name,
                os: ls.os || 'Kali Linux',
                startedAt: ls.createdAt || Date.now(),
                endedAt: null,
                status: ls.status || 'active',
                objectivesCompleted: ls.completedObjectives ? ls.completedObjectives.length : 0,
                totalObjectives: 3,
                flagCaptured: ls.dynamicFlag || null,
                durationMinutes: Math.max(1, Math.round((Date.now() - (ls.createdAt || Date.now())) / 60000))
              });
            }
          });
          saveSessionHistory(list);
        }
      }
    } catch (e) {}
  }

  const sessions = getSessionHistory();
  const commands = getCommandHistoryLog();

  const totalSessions = sessions.length;
  const activeCount = sessions.filter(s => s.status === 'active').length;
  const completedCount = sessions.filter(s => s.status === 'completed').length;
  const totalCmds = commands.length;

  $('#main').innerHTML = `
    <div class="pagehead" style="margin-bottom: 24px;">
      <div>
        <div class="eyebrow">YOUR WORKSPACE</div>
        <h1 style="margin-top: 4px;">Pick up where you left off.</h1>
        <p style="color: var(--text-secondary); max-width: 680px; margin-top: 6px; font-size: 14.5px;">
          Your lab sessions, saved commands, and captured flags, together in one place.
        </p>
      </div>
      <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
        <button class="primary" id="hub-btn-new-lab"><span>＋</span> Launch new lab</button>
        <button class="secondary" id="hub-btn-export-log" title="Export session history & command logs as JSON">Export audit log</button>
        <button class="secondary" id="hub-btn-clear-log" style="color: #ff7b7b;" title="Clear local session history">Clear history</button>
      </div>
    </div>

    <div class="session-hub">
      <div class="session-hub-stats">
        <div class="session-stat-card">
          <div class="session-stat-label">Total Sessions</div>
          <div class="session-stat-val" style="color: var(--cyan);">${totalSessions}</div>
          <div style="font-size: 11.5px; color: var(--text-muted);">Recorded sandbox environments</div>
        </div>
        <div class="session-stat-card">
          <div class="session-stat-label">Active Workstations</div>
          <div class="session-stat-val" style="color: ${activeCount > 0 ? '#34d399' : 'var(--text-secondary)'};">
            ${activeCount > 0 ? `${activeCount} Active` : '0 Active'}
          </div>
          <div style="font-size: 11.5px; color: var(--text-muted);">${activeCount > 0 ? 'Containers running in isolated subnet' : 'Ready to provision'}</div>
        </div>
        <div class="session-stat-card">
          <div class="session-stat-label">Completed Labs</div>
          <div class="session-stat-val" style="color: #38bdf8;">${completedCount}</div>
          <div style="font-size: 11.5px; color: var(--text-muted);">${Math.round((completedCount / (totalSessions || 1)) * 100)}% completion rate</div>
        </div>
        <div class="session-stat-card">
          <div class="session-stat-label">Commands Logged</div>
          <div class="session-stat-val" style="color: #fbbf24;">${totalCmds}</div>
          <div style="font-size: 11.5px; color: var(--text-muted);">Audit trail & shell commands</div>
        </div>
      </div>

      <div class="session-hub-nav">
        <button class="session-hub-tab ${currentHubTab === 'sessions' ? 'active' : ''}" data-hub-tab="sessions">
          📁 All My Sessions (${totalSessions})
        </button>
        <button class="session-hub-tab ${currentHubTab === 'commands' ? 'active' : ''}" data-hub-tab="commands">
          ⌨ Command History (${totalCmds})
        </button>
        <button class="session-hub-tab ${currentHubTab === 'telemetry' ? 'active' : ''}" data-hub-tab="telemetry">
          ⌁ Network reference
        </button>
      </div>

      <div id="session-hub-content" style="min-height: 280px;"></div>
    </div>
  `;

  $('#hub-btn-new-lab').onclick = () => navigate('labs');
  $('#hub-btn-export-log').onclick = () => exportAuditLog();
  $('#hub-btn-clear-log').onclick = () => clearAuditHistory();

  document.querySelectorAll('[data-hub-tab]').forEach(btn => {
    btn.onclick = () => {
      currentHubTab = btn.dataset.hubTab;
      document.querySelectorAll('[data-hub-tab]').forEach(b => b.classList.toggle('active', b.dataset.hubTab === currentHubTab));
      renderHubTabContent();
    };
  });

  renderHubTabContent();
}

function renderHubTabContent() {
  const container = $('#session-hub-content');
  if (!container) return;
  if (currentHubTab === 'sessions') renderHubSessions(container);
  else if (currentHubTab === 'commands') renderHubCommands(container);
  else renderHubTelemetry(container);
}

function renderHubSessions(container) {
  const sessions = getSessionHistory();
  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <input type="text" id="hub-search-sessions" placeholder="Filter by lab name, OS, or ID..." style="background:rgba(0,0,0,0.4); border:1px solid var(--border-subtle); border-radius:6px; padding:8px 14px; color:#fff; font-size:13px; width:280px;">
          <span style="font-size:12px; color:var(--text-muted); font-family:var(--font-mono);" id="hub-session-count-indicator"></span>
        </div>
        <div style="display:flex; gap:6px;">
          <button class="session-hub-tab ${hubFilter === 'all' ? 'active' : ''}" data-status-filter="all" style="padding:4px 12px; font-size:12px;">All (${sessions.length})</button>
          <button class="session-hub-tab ${hubFilter === 'active' ? 'active' : ''}" data-status-filter="active" style="padding:4px 12px; font-size:12px;">Active (${sessions.filter(s => s.status === 'active').length})</button>
          <button class="session-hub-tab ${hubFilter === 'completed' ? 'active' : ''}" data-status-filter="completed" style="padding:4px 12px; font-size:12px;">Completed (${sessions.filter(s => s.status === 'completed').length})</button>
          <button class="session-hub-tab ${hubFilter === 'ended' ? 'active' : ''}" data-status-filter="ended" style="padding:4px 12px; font-size:12px;">Ended (${sessions.filter(s => s.status === 'ended').length})</button>
        </div>
      </div>

      <div id="hub-sessions-table-wrap"></div>
    </div>
  `;

  container.querySelectorAll('[data-status-filter]').forEach(b => {
    b.onclick = () => {
      hubFilter = b.dataset.statusFilter;
      container.querySelectorAll('[data-status-filter]').forEach(btn => btn.classList.toggle('active', btn.dataset.statusFilter === hubFilter));
      updateSessionsTable();
    };
  });

  const searchInput = container.querySelector('#hub-search-sessions');
  if (searchInput) {
    searchInput.value = hubSearch;
    searchInput.oninput = () => {
      hubSearch = searchInput.value;
      updateSessionsTable();
    };
  }

  function updateSessionsTable() {
    const tableWrap = container.querySelector('#hub-sessions-table-wrap');
    const indicator = container.querySelector('#hub-session-count-indicator');
    if (!tableWrap) return;

    let filtered = sessions;
    if (hubFilter !== 'all') {
      filtered = filtered.filter(s => s.status === hubFilter);
    }
    const q = hubSearch.toLowerCase().trim();
    if (q) {
      filtered = filtered.filter(s => 
        (s.labName && s.labName.toLowerCase().includes(q)) ||
        (s.os && s.os.toLowerCase().includes(q)) ||
        (s.id && s.id.toLowerCase().includes(q)) ||
        (s.flagCaptured && s.flagCaptured.toLowerCase().includes(q))
      );
    }

    if (indicator) indicator.textContent = `${filtered.length} session${filtered.length === 1 ? '' : 's'}`;

    if (filtered.length === 0) {
      tableWrap.innerHTML = `
        <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:40px 20px; text-align:center;">
          <p style="color:var(--text-muted); font-size:14px; margin-bottom:12px;">No sessions found matching your filter criteria.</p>
          <button class="primary" onclick="openLaunch('kali-sandbox')">Launch Kali Linux Lab ↗</button>
        </div>
      `;
      return;
    }

    tableWrap.innerHTML = `
      <table class="session-history-table">
        <thead>
          <tr>
            <th>Lab & Container Session</th>
            <th>Operating System</th>
            <th>Status</th>
            <th>Duration</th>
            <th>Objectives Done</th>
            <th>Captured Flag</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${filtered.map(s => `
            <tr>
              <td>
                <div style="font-weight:600; color:#fff; font-size:13.5px;">${escapeHtml(s.labName)}</div>
                <div style="display:flex; align-items:center; gap:6px; margin-top:2px;">
                  <code style="font-size:11px; color:var(--text-muted);">${s.id}</code>
                  <span style="font-size:11px; color:var(--text-muted);">· ${new Date(s.startedAt).toLocaleDateString()}</span>
                </div>
              </td>
              <td>
                <span class="session-os-badge ${s.os === 'Ubuntu' ? 'ubuntu' : 'kali'}">
                  ${s.os === 'Ubuntu' ? 'Ubuntu 24.04' : 'Kali Rolling'}
                </span>
              </td>
              <td>
                <span class="session-status-pill ${s.status}">● ${s.status.toUpperCase()}</span>
              </td>
              <td style="font-family:var(--font-mono); font-size:12px; color:var(--text-secondary);">
                ${s.durationMinutes ? `${s.durationMinutes} min` : (s.status === 'active' ? 'Active' : '—')}
              </td>
              <td>
                <div style="display:flex; align-items:center; gap:8px;">
                  <div style="width:50px; height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
                    <div style="width:${((s.objectivesCompleted || 0) / (s.totalObjectives || 3)) * 100}%; height:100%; background:${s.objectivesCompleted >= 3 ? '#34d399' : 'var(--cyan)'};"></div>
                  </div>
                  <span style="font-family:var(--font-mono); font-size:12px; font-weight:bold; color:${s.objectivesCompleted >= 3 ? '#34d399' : '#fff'};">
                    ${s.objectivesCompleted || 0}/${s.totalObjectives || 3}
                  </span>
                </div>
              </td>
              <td>
                ${s.flagCaptured ? `<code style="font-size:11px; color:#34d399; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); padding:3px 7px; border-radius:4px;">${escapeHtml(s.flagCaptured)}</code>` : '<span style="color:var(--text-muted); font-size:12px;">None</span>'}
              </td>
              <td>
                <div style="display:flex; gap:6px;">
                  ${s.status === 'active' && session && session.id === s.id
                    ? `<button class="primary" style="font-size:11.5px; padding:4px 10px;" onclick="navigate('session')">Resume ↗</button>`
                    : `<button class="secondary" style="font-size:11.5px; padding:4px 10px;" onclick="openLaunch('${s.labId}')">Relaunch ↗</button>`
                  }
                  <button class="secondary" style="font-size:11.5px; padding:4px 8px;" title="View commands logged in this session" onclick="filterCommandsBySession('${s.id}')">Commands</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  updateSessionsTable();
}

function renderHubCommands(container) {
  const commands = getCommandHistoryLog();
  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <input type="text" id="hub-cmd-search" placeholder="Search commands (e.g. nmap, curl, cat, flag)..." style="background:rgba(0,0,0,0.4); border:1px solid var(--border-subtle); border-radius:6px; padding:8px 14px; color:#fff; font-size:13px; width:320px;">
          <span style="font-size:12px; color:var(--text-muted); font-family:var(--font-mono);" id="hub-cmd-count-indicator"></span>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="secondary" id="hub-export-cmds-btn" style="font-size:12px; padding:6px 12px;">Export commands</button>
        </div>
      </div>

      <div id="hub-cmd-feed-wrap" class="cmd-history-feed"></div>
    </div>
  `;

  const exportBtn = container.querySelector('#hub-export-cmds-btn');
  if (exportBtn) exportBtn.onclick = () => exportAuditLog();

  const searchInput = container.querySelector('#hub-cmd-search');
  const feedWrap = container.querySelector('#hub-cmd-feed-wrap');
  const countIndicator = container.querySelector('#hub-cmd-count-indicator');

  const renderFeed = (filterQuery = '') => {
    const q = filterQuery.toLowerCase().trim();
    const filtered = q
      ? commands.filter(c => c.command.toLowerCase().includes(q) || (c.labName && c.labName.toLowerCase().includes(q)) || (c.sessionId && c.sessionId.toLowerCase().includes(q)))
      : commands;

    if (countIndicator) countIndicator.textContent = `${filtered.length} command${filtered.length === 1 ? '' : 's'}`;

    if (filtered.length === 0) {
      feedWrap.innerHTML = `
        <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:40px 20px; text-align:center; color:var(--text-muted); font-size:14px;">
          No matching commands logged.
        </div>
      `;
      return;
    }

    feedWrap.innerHTML = filtered.map(c => `
      <div class="cmd-history-item">
        <div style="display:flex; align-items:center; gap:12px; overflow:hidden; flex:1;">
          <span style="font-family:var(--font-mono); font-size:11.5px; color:var(--text-muted); flex-shrink:0;">
            ${new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
          <span class="session-os-badge kali" style="font-size:10.5px; padding:2px 8px; flex-shrink:0;">
            ${escapeHtml(c.labName || 'Linux lab')}
          </span>
          <code class="cmd-snippet-pill">${escapeHtml(c.prompt || '')}${escapeHtml(c.command)}</code>
        </div>
        <div style="display:flex; gap:8px; flex-shrink:0;">
          <button class="secondary" style="font-size:11.5px; padding:4px 10px;" onclick="copyToClipboard('${escapeJs(c.command)}')">Copy 📋</button>
          <button class="primary" style="font-size:11.5px; padding:4px 10px;" onclick="executeCommandInShell('${escapeJs(c.command)}')">Run in Shell ↗</button>
        </div>
      </div>
    `).join('');
  };

  renderFeed();
  if (searchInput) {
    searchInput.oninput = () => renderFeed(searchInput.value);
  }
}

function renderHubTelemetry(container) {
  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:20px;">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px;">
        <div class="session-stat-card" style="border-left:3px solid var(--cyan);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="session-stat-label">Attacker Workstation</span>
            <span class="session-status-pill active">ONLINE</span>
          </div>
          <div style="font-family:var(--font-mono); font-size:18px; font-weight:700; color:#fff; margin-top:4px;">10.10.0.2</div>
          <div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">
            Kali Linux Rolling &bull; 4 vCPU &bull; 3.5 GB RAM
          </div>
          <div style="font-size:11.5px; color:var(--text-muted); margin-top:8px; font-family:var(--font-mono);">
            Hostname: kali.lab &bull; Gateway: 10.10.0.1
          </div>
        </div>

        <div class="session-stat-card" style="border-left:3px solid #f97316;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="session-stat-label">Vulnerable Target Application</span>
            <span class="session-status-pill active">LISTENING</span>
          </div>
          <div style="font-family:var(--font-mono); font-size:18px; font-weight:700; color:#fff; margin-top:4px;">10.10.0.10:8080</div>
          <div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">
            Nginx 1.24 &bull; Werkzeug / Python 3.12 Web App
          </div>
          <div style="font-size:11.5px; color:var(--text-muted); margin-top:8px; font-family:var(--font-mono);">
            Open Ports: 22 (SSH), 80 (HTTP), 8080 (Proxy)
          </div>
        </div>

        <div class="session-stat-card" style="border-left:3px solid #a855f7;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="session-stat-label">Database Server</span>
            <span class="session-status-pill active">ATTACHED</span>
          </div>
          <div style="font-family:var(--font-mono); font-size:18px; font-weight:700; color:#fff; margin-top:4px;">10.10.0.50:5432</div>
          <div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">
            PostgreSQL 16.2 &bull; Isolated Database Cluster
          </div>
          <div style="font-size:11.5px; color:var(--text-muted); margin-top:8px; font-family:var(--font-mono);">
            Database: cyberrange_db &bull; User: postgres
          </div>
        </div>

        <div class="session-stat-card" style="border-left:3px solid #38bdf8;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="session-stat-label">Default Gateway & Firewall</span>
            <span class="session-status-pill active">ROUTING</span>
          </div>
          <div style="font-family:var(--font-mono); font-size:18px; font-weight:700; color:#fff; margin-top:4px;">10.10.0.1</div>
          <div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">
            Cyber Lab Network Bridge &bull; Isolated NAT
          </div>
          <div style="font-size:11.5px; color:var(--text-muted); margin-top:8px; font-family:var(--font-mono);">
            Subnet: 10.10.0.0/24 &bull; External Traffic: Blocked
          </div>
        </div>
      </div>

      <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); padding:20px;">
        <h3 style="margin:0 0 12px 0; font-size:15px; color:#fff;">Isolated Sandbox Telemetry & Container Runtime</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px; font-size:12.5px;">
          <div>
            <span style="color:var(--text-muted); display:block; margin-bottom:2px;">Runtime Engine</span>
            <strong style="color:var(--cyan); font-family:var(--font-mono);">Docker v24.0 / containerd</strong>
          </div>
          <div>
            <span style="color:var(--text-muted); display:block; margin-bottom:2px;">Compute Allocation</span>
            <strong style="color:#fff; font-family:var(--font-mono);">4 vCPU &bull; 3.5 GB RAM</strong>
          </div>
          <div>
            <span style="color:var(--text-muted); display:block; margin-bottom:2px;">Network Mode</span>
            <strong style="color:#34d399; font-family:var(--font-mono);">Bridge Isolated (No WAN egress)</strong>
          </div>
          <div>
            <span style="color:var(--text-muted); display:block; margin-bottom:2px;">Terminal Stream</span>
            <strong style="color:#38bdf8; font-family:var(--font-mono);">WebSocket PTY (xterm.js RFC 6455)</strong>
          </div>
        </div>
      </div>
    </div>
  `;
}

function filterCommandsBySession(sessionId) {
  currentHubTab = 'commands';
  document.querySelectorAll('[data-hub-tab]').forEach(b => b.classList.toggle('active', b.dataset.hubTab === 'commands'));
  renderHubTabContent();
  const searchInput = $('#hub-cmd-search');
  if (searchInput) {
    searchInput.value = sessionId;
    searchInput.dispatchEvent(new Event('input'));
  }
}

window.copyToClipboard = copyToClipboard;
window.executeCommandInShell = executeCommandInShell;
window.filterCommandsBySession = filterCommandsBySession;

function workspace() {
  if (!session) {
    renderSessionHub();
    return;
  }

  const l = session.lab;
  $('#main').innerHTML = `
    <div class="workspacehead">
      <div>
        <button class="back" id="back-catalog">← Back to lab catalog</button>
        <h1>${l.name}</h1>
        <div class="muted">${session.os} · ${l.level} · ${isLiveApi ? 'Live Sandbox Container' : 'Local Environment'}</div>
      </div>
      <div class="sessioncontrols">
        <span class="timer" id="timer"></span>
        <button class="secondary" id="save-progress-btn" title="Save terminal progress, command history, and download audit transcript" style="display:inline-flex; align-items:center; gap:6px;"><span>💾</span> Save Progress</button>
        <button class="secondary" id="extend">+ 15 min</button>
        <button class="secondary" id="end">End session</button>
      </div>
    </div>
    <div class="workspace">
      <div>
        <section class="screen ${isModalFullscreen ? 'screen-fullscreen' : ''}" id="workspace-screen">
          <div class="screentabs" role="tablist" aria-label="Workspace view">
            <div class="window-dots" style="margin-right: 12px;">
              <span class="dot red" title="Session Workspace Window"></span>
              <span class="dot yellow" title="Minimize / Windowed"></span>
              <span class="dot green" id="win-dot-zoom" title="Zoom to Full Screen (Green Dot / Ctrl +)" style="cursor:pointer;"></span>
            </div>
            ${['Terminal', 'Desktop', 'Code editor', 'Command history', 'My sessions'].map(t => `<button class="screentab ${tab === t ? 'active' : ''}" role="tab" aria-selected="${tab === t}" tabindex="${tab === t ? 0 : -1}" data-tab="${t}">${t === 'Terminal' ? '>_' : t === 'Desktop' ? '▣' : t === 'Code editor' ? '⌘' : t === 'Command history' ? '⌨' : '📁'} &nbsp; ${t}</button>`).join('')}

            <div class="screen-zoom-controls">
              <button class="zoom-btn" id="global-zoom-out" title="${isModalFullscreen ? 'Zoom Out / Exit Full Screen (Ctrl −)' : 'Zoom Out (Ctrl −)'}">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                <span>Zoom −</span>
              </button>
              <button class="zoom-level-indicator zoom-display-val" id="global-zoom-reset" title="Click to Reset Zoom (100%)">
                ${currentZoomPercent}%
              </button>
              <button class="zoom-btn" id="global-zoom-in" title="${isModalFullscreen ? 'Zoom In Font (Ctrl +)' : 'Zoom In to Full Screen (Ctrl +)'}">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                <span>Zoom +</span>
              </button>
              <button class="zoom-btn zoom-btn-fullscreen ${isModalFullscreen ? 'zoom-btn-active' : ''}" id="global-zoom-fullscreen" title="${isModalFullscreen ? 'Exit Full Screen (Esc)' : 'Zoom In to Full Screen'}">
                <svg id="fullscreen-btn-icon" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                  ${isModalFullscreen 
                    ? '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>'
                    : '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>'
                  }
                </svg>
                <span id="fullscreen-btn-label">${isModalFullscreen ? 'Exit Full Screen' : 'Full Screen'}</span>
              </button>
              <button class="zoom-btn exit-fullscreen-quick" id="exit-fullscreen-quick-btn" style="display:${isModalFullscreen ? 'inline-flex' : 'none'}; background:rgba(255,60,60,0.18); border-color:rgba(255,80,80,0.4); color:#ff7b7b;" title="Exit Full Screen (Esc / Zoom Out)">
                ✕ Exit
              </button>
            </div>
          </div>
          <div class="screenbody" id="screenbody" role="tabpanel"></div>
          <div class="screen-fullscreen-footer" id="screen-fs-footer" style="display:${isModalFullscreen ? 'flex' : 'none'};">
            <span>⌑ Subnet: 10.10.0.0/24 · Workstation: 10.10.0.2 · root@${session.os === 'Ubuntu' ? 'ubuntu' : 'kali'}: ~</span>
            <span>${isLiveApi ? (session.os === 'Ubuntu' ? 'Ubuntu 24.04 · Live container' : 'Live Docker Sandbox · Genuine Rolling OS') : 'Local Environment'}</span>
            <button class="exit-fs-pill" id="exit-fs-pill-btn">Press Esc or click to Exit Full Screen ✕</button>
          </div>
        </section>
        <div class="statusstrip">
          <span>⌑ Subnet: 10.10.0.0/24 · Workstation: 10.10.0.2</span>
          <span>${isLiveApi ? 'Ephemeral Container · 4 vCPU · 3.5 GB RAM' : '4 vCPU · 3.5 GB RAM'}</span>
        </div>
        <div class="session-drawer" id="session-drawer">
          <button class="session-drawer-toggle" id="session-drawer-toggle" type="button" aria-expanded="false">
            <span style="display:flex; align-items:center; gap:8px;">
              <span style="color:var(--cyan); font-family:var(--font-mono); font-size:11px; letter-spacing:0.06em;">⌨ LIVE COMMAND AUDIT TRAIL</span>
              <span class="session-status-pill active" style="font-size:10px; padding:1px 6px;">STREAMING</span>
            </span>
            <span id="session-drawer-chevron" style="color:var(--text-muted); font-size:11.5px;">Recent activity ▼</span>
          </button>
          <div class="session-drawer-body" id="session-drawer-body" style="display:none;">
            <div id="drawer-cmd-list" class="cmd-history-feed" style="max-height:160px; overflow-y:auto;"></div>
            <div style="display:flex; justify-content:space-between; align-items:center; padding-top:8px; border-top:1px solid rgba(255,255,255,0.05);">
              <span style="font-size:11px; color:var(--text-muted);">Real-time container execution telemetry</span>
              <button class="secondary" id="drawer-view-all-history" style="font-size:11px; padding:3px 10px;">Open full history tab ↗</button>
            </div>
          </div>
        </div>
      </div>
      <aside class="objectives">
        <h3>Your objectives</h3>
        <small id="obj-count">${session.done.length} of 3 completed</small>
        <div class="progressbar">
          <div id="obj-progress" style="width:${(session.done.length / 3) * 100}%"></div>
        </div>
        <div id="objectives-list">
          ${l.tasks.map((t, i) => `
            <div class="objective ${session.done.includes(i) ? 'done' : ''}">
              <strong><span class="checkcircle">${session.done.includes(i) ? '✓' : '○'}</span>${t}</strong>
              <p>${i === 2 ? 'Read the flag file, then submit the flag below.' : 'Try this command in the terminal.'}</p>
              <code class="cmd-snippet" data-cmd="${l.commands[i]}" title="Click to insert into terminal">${l.commands[i]}</code>
            </div>
          `).join('')}
        </div>
        <form class="flagform" id="flagform">
          <input id="flag" aria-label="Captured flag" placeholder="RANGE{...}" autocomplete="off">
          <button type="submit">Submit</button>
        </form>
        <div id="flag-error" class="flagerror" role="status"></div>
        <button class="hintbtn" id="hint">Need a hint? ↗</button>
      </aside>
    </div>
  `;

  screen();
  tick();
  bindSnippetClicks();
  bindZoomControls();
  applyZoom(false);

  const drawerToggle = $('#session-drawer-toggle');
  const drawerBody = $('#session-drawer-body');
  const drawerChevron = $('#session-drawer-chevron');
  if (drawerToggle && drawerBody) {
    let isDrawerOpen = false;
    drawerToggle.onclick = () => {
      isDrawerOpen = !isDrawerOpen;
      drawerBody.style.display = isDrawerOpen ? 'flex' : 'none';
      drawerChevron.textContent = isDrawerOpen ? 'Collapse ▲' : 'Recent activity ▼';
      drawerToggle.setAttribute('aria-expanded', isDrawerOpen ? 'true' : 'false');
      if (isDrawerOpen) updateDrawerCmdList();
    };
    const viewAllBtn = $('#drawer-view-all-history');
    if (viewAllBtn) {
      viewAllBtn.onclick = () => {
        tab = 'Command history';
        document.querySelectorAll('[data-tab]').forEach(btn => {
          const isSelected = btn.dataset.tab === tab;
          btn.classList.toggle('active', isSelected);
          btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
          btn.setAttribute('tabindex', isSelected ? '0' : '-1');
        });
        screen();
      };
    }
  }

  $('#back-catalog').onclick = () => navigate('labs');
  const saveProgBtn = $('#save-progress-btn');
  if (saveProgBtn) saveProgBtn.onclick = () => saveTerminalProgress({ downloadFile: true, notify: true });
  $('#end').onclick = openEndSessionDialog;
  $('#extend').onclick = async () => {
    if (isLiveApi && session.id) {
      try {
        await fetch(`${API_BASE}/api/sessions/${session.id}/extend`, { method: 'POST' });
      } catch (e) {}
    }
    session.expires += 900000;
    tick();
    toast('Added 15 minutes to your session.');
  };

  document.querySelectorAll('[data-tab]').forEach((b, i, arr) => {
    b.onclick = () => {
      tab = b.dataset.tab;
      document.querySelectorAll('[data-tab]').forEach(btn => {
        const isSelected = btn.dataset.tab === tab;
        btn.classList.toggle('active', isSelected);
        btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        btn.setAttribute('tabindex', isSelected ? '0' : '-1');
      });
      screen();
    };
    b.onkeydown = e => {
      if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
        e.preventDefault();
        const n = e.key === 'Home' ? 0 : e.key === 'End' ? arr.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : -1) + arr.length) % arr.length;
        tab = arr[n].dataset.tab;
        document.querySelectorAll('[data-tab]').forEach(btn => {
          const isSelected = btn.dataset.tab === tab;
          btn.classList.toggle('active', isSelected);
          btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
          btn.setAttribute('tabindex', isSelected ? '0' : '-1');
        });
        screen();
        document.querySelectorAll('[data-tab]')[n].focus();
      }
    };
  });

  $('#hint').onclick = () => toast('Run the commands in order. Copy the RANGE{...} token from flag.txt.');

  $('#flagform').onsubmit = async e => {
    e.preventDefault();
    const value = $('#flag').value.trim();
    if (!value) return;

    if (isLiveApi && session.id) {
      try {
        const res = await fetch(`${API_BASE}/api/sessions/${session.id}/flags`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ flag: value })
        });
        const result = await res.json();
        if (!res.ok) {
          $('#flag-error').textContent = result.message || 'Incorrect flag.';
          return;
        }
        complete(2);
        workspace();
        toast(result.message || 'Flag captured! Nicely done.');
        return;
      } catch (err) {}
    }

    // Local fallback check
    if (value !== (session.dynamicFlag || l.flag)) {
      $('#flag-error').textContent = 'That flag does not match. Read flag.txt and try again.';
      return;
    }
    if (!session.done.includes(0) || !session.done.includes(1)) {
      $('#flag-error').textContent = 'Complete the first two objectives before submitting the flag.';
      return;
    }
    complete(2);
    workspace();
    toast('Flag captured. Lab complete — nicely done!');
  };
}

let kaliClockTimer = null;
window._kaliWinState = window._kaliWinState || {
  term: true,
  browser: false,
  files: false,
  tools: false,
  editor: false,
  appMenu: false,
  placesMenu: false
};

function renderUbuntuDesktop(container) {
  const date = new Date().toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  container.innerHTML = `
    <div class="ubuntu-desktop">
      <header class="ubuntu-panel"><button id="ubuntu-activities">Activities</button><span>${date}</span><span aria-label="Ubuntu session">Ubuntu 24.04 <span aria-hidden="true"> · ◉</span></span></header>
      <div class="ubuntu-wallpaper" aria-hidden="true"><div class="ubuntu-orbit"></div><div class="ubuntu-brand">ubuntu<span>24.04 LTS</span></div></div>
      <nav class="ubuntu-dock" aria-label="Ubuntu applications">
        <button id="ubuntu-open-terminal" title="Open live Ubuntu terminal" aria-label="Open live Ubuntu terminal"><span class="ubuntu-terminal-icon">&gt;_</span></button>
        <button id="ubuntu-open-files" title="View container files" aria-label="View container files"><span class="ubuntu-folder-icon">▰</span></button>
        <button id="ubuntu-open-about" title="About Ubuntu workspace" aria-label="About Ubuntu workspace"><span class="ubuntu-settings-icon">⚙</span></button>
        <button id="ubuntu-show-apps" title="Show applications" aria-label="Show applications" class="ubuntu-apps-icon">⠿</button>
      </nav>
      <section class="ubuntu-window" id="ubuntu-app-window" aria-label="Ubuntu application window">
        <header class="ubuntu-window-bar"><strong id="ubuntu-window-title">Terminal</strong><div><button id="ubuntu-minimize" aria-label="Minimize window">−</button><button id="ubuntu-maximize" aria-label="Maximize window">□</button><button id="ubuntu-close" aria-label="Close window">×</button></div></header>
        <div id="ubuntu-app-content" class="ubuntu-terminal"></div>
      </section>
      <div class="ubuntu-desktop-caption">Ubuntu workspace · Live container terminal and files</div>
    </div>`;
  const windowEl = container.querySelector('#ubuntu-app-window');
  const content = container.querySelector('#ubuntu-app-content');
  const title = container.querySelector('#ubuntu-window-title');
  const stopTerminal = () => {
    if (activeWs) { activeWs.close(); activeWs = null; }
    if (activeXterm) { activeXterm.dispose(); activeXterm = null; }
  };
  const show = (name, terminal = false) => {
    stopTerminal();
    windowEl.hidden = false;
    title.textContent = name;
    content.className = terminal ? 'ubuntu-terminal' : 'ubuntu-app-content';
    content.replaceChildren();
  };
  const terminal = () => { show('Terminal — root@ubuntu: ~', true); screen(content, true); };
  const files = async () => {
    show('Files — /root');
    content.innerHTML = '<div class="ubuntu-file-toolbar">Home / root <button id="ubuntu-refresh-files">Refresh</button></div><pre class="ubuntu-file-output">Loading container files…</pre>';
    const output = content.querySelector('pre');
    content.querySelector('button').onclick = files;
    try {
      if (!isLiveApi) throw new Error('Launch a live Ubuntu session to view container files.');
      const response = await fetch(`${API_BASE}/api/sessions/${session.id}/command`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ command: 'ls -lah /root' })
      });
      if (!response.ok) throw new Error('Could not read container files. Reconnect your session and try again.');
      const result = await response.json();
      output.textContent = result.output;
    } catch (error) { output.textContent = error.message; }
  };
  const about = () => {
    show('About this workspace');
    content.innerHTML = '<div class="ubuntu-about"><div class="ubuntu-about-logo">ubuntu</div><h2>Ubuntu 24.04 LTS</h2><p>A real Ubuntu container for your Linux lab.</p><p>The terminal executes commands and Files reads your container’s /root directory.</p><p>This desktop is a web workspace inspired by Ubuntu; it is not a streamed GNOME desktop.</p><button class="primary" id="ubuntu-about-terminal">Open terminal</button></div>';
    content.querySelector('button').onclick = terminal;
  };
  const apps = () => {
    show('Applications');
    content.innerHTML = '<div class="ubuntu-app-grid"><button data-ubuntu-app="terminal"><span>&gt;_</span>Terminal<small>Live Ubuntu shell</small></button><button data-ubuntu-app="files"><span>▰</span>Files<small>Container directory</small></button><button data-ubuntu-app="about"><span>⚙</span>About<small>Ubuntu workspace</small></button></div>';
    content.querySelectorAll('[data-ubuntu-app]').forEach(button => { button.onclick = ({terminal, files, about})[button.dataset.ubuntuApp]; });
  };
  container.querySelector('#ubuntu-open-terminal').onclick = terminal;
  container.querySelector('#ubuntu-open-files').onclick = files;
  container.querySelector('#ubuntu-open-about').onclick = about;
  container.querySelector('#ubuntu-activities').onclick = apps;
  container.querySelector('#ubuntu-show-apps').onclick = apps;
  container.querySelector('#ubuntu-minimize').onclick = () => { windowEl.hidden = true; };
  container.querySelector('#ubuntu-close').onclick = () => { stopTerminal(); windowEl.hidden = true; };
  container.querySelector('#ubuntu-maximize').onclick = () => {
    windowEl.classList.toggle('ubuntu-maximized');
    window.dispatchEvent(new Event('resize'));
  };
  terminal();
}

function renderLiveKaliDesktop(container) {
  const date = new Date().toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit' });
  const home = session.lab.id === 'linux' ? '/home/learner/lab' : '/root';
  container.innerHTML = `
    <div class="kali-live-desktop">
      <header class="kali-live-panel"><button id="kali-live-activities">Applications</button><span>${date}</span><span aria-label="Kali session">Kali Rolling <span aria-hidden="true"> · ◉</span></span></header>
      <div class="kali-live-wallpaper" aria-hidden="true"><div class="kali-live-orbit"></div><div class="kali-live-brand">KALI LINUX<span>ROLLING</span></div></div>
      <nav class="kali-live-dock" aria-label="Kali applications">
        <button id="kali-live-open-terminal" title="Open live Kali terminal" aria-label="Open live Kali terminal"><span class="kali-live-terminal-icon">&gt;_</span></button>
        <button id="kali-live-open-files" title="View container files" aria-label="View container files"><span class="kali-live-folder-icon">▰</span></button>
        <button id="kali-live-open-about" title="About Kali workspace" aria-label="About Kali workspace"><span class="kali-live-settings-icon">⚙</span></button>
        <button id="kali-live-show-apps" title="Show applications" aria-label="Show applications" class="kali-live-apps-icon">⠿</button>
      </nav>
      <section class="kali-live-window" id="kali-live-app-window" aria-label="Kali application window">
        <header class="kali-live-window-bar"><strong id="kali-live-window-title">Terminal</strong><div><button id="kali-live-minimize" aria-label="Minimize window">−</button><button id="kali-live-maximize" aria-label="Maximize window">□</button><button id="kali-live-close" aria-label="Close window">×</button></div></header>
        <div id="kali-live-app-content" class="kali-live-terminal"></div>
      </section>
      <div class="kali-live-desktop-caption">Kali workspace · Live container terminal and files</div>
    </div>`;
  const windowEl = container.querySelector('#kali-live-app-window');
  const content = container.querySelector('#kali-live-app-content');
  const title = container.querySelector('#kali-live-window-title');
  const stopTerminal = () => {
    if (activeWs) { activeWs.close(); activeWs = null; }
    if (activeXterm) { activeXterm.dispose(); activeXterm = null; }
  };
  const show = (name, terminal = false) => {
    stopTerminal();
    windowEl.hidden = false;
    title.textContent = name;
    content.className = terminal ? 'kali-live-terminal' : 'kali-live-app-content';
    content.replaceChildren();
  };
  const terminal = () => { show(session.lab.id === 'linux' ? 'Terminal — learner@kali: ~/lab' : 'Terminal — root@kali: ~', true); screen(content, true); };
  const files = async () => {
    show('Files — ' + home);
    content.innerHTML = '<div class="kali-live-file-toolbar">Home directory <button id="kali-live-refresh-files">Refresh</button></div><pre class="kali-live-file-output">Loading container files…</pre>';
    const output = content.querySelector('pre');
    content.querySelector('button').onclick = files;
    try {
      if (!isLiveApi) throw new Error('Launch a live Kali session to view container files.');
      const response = await fetch(`${API_BASE}/api/sessions/${session.id}/command`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ command: 'ls -lah ' + home })
      });
      if (!response.ok) throw new Error('Could not read container files. Reconnect your session and try again.');
      const result = await response.json();
      output.textContent = result.output;
    } catch (error) { output.textContent = error.message; }
  };
  const about = () => {
    show('About this workspace');
    content.innerHTML = '<div class="kali-live-about"><div class="kali-live-about-logo">Kali Linux</div><h2>Kali Linux Rolling</h2><p>A real Kali container for your Linux lab.</p><p>The terminal executes commands and Files reads your container’s /root directory.</p><p>This desktop is a web workspace inspired by Kali; it is not a streamed Xfce desktop.</p><button class="primary" id="kali-live-about-terminal">Open terminal</button></div>';
    content.querySelector('button').onclick = terminal;
  };
  const apps = () => {
    show('Applications');
    content.innerHTML = '<div class="kali-live-app-grid"><button data-kali-live-app="terminal"><span>&gt;_</span>Terminal<small>Live Kali shell</small></button><button data-kali-live-app="files"><span>▰</span>Files<small>Container directory</small></button><button data-kali-live-app="about"><span>⚙</span>About<small>Kali workspace</small></button></div>';
    content.querySelectorAll('[data-kali-live-app]').forEach(button => { button.onclick = ({terminal, files, about})[button.dataset.kaliLiveApp]; });
  };
  container.querySelector('#kali-live-open-terminal').onclick = terminal;
  container.querySelector('#kali-live-open-files').onclick = files;
  container.querySelector('#kali-live-open-about').onclick = about;
  container.querySelector('#kali-live-activities').onclick = apps;
  container.querySelector('#kali-live-show-apps').onclick = apps;
  container.querySelector('#kali-live-minimize').onclick = () => { windowEl.hidden = true; };
  container.querySelector('#kali-live-close').onclick = () => { stopTerminal(); windowEl.hidden = true; };
  container.querySelector('#kali-live-maximize').onclick = () => {
    windowEl.classList.toggle('kali-live-maximized');
    window.dispatchEvent(new Event('resize'));
  };
  terminal();
}

function renderKaliDesktop(container) {
  if (!window._kaliWinState || typeof window._kaliWinState !== 'object') {
    window._kaliWinState = {
      term: true,
      browser: false,
      files: false,
      tools: false,
      editor: false,
      appMenu: false,
      placesMenu: false
    };
  }
  const wsState = window._kaliWinState;
  if (wsState.term === undefined) wsState.term = true;
  // If no windows are active, make terminal active by default
  if (!wsState.term && !wsState.browser && !wsState.files && !wsState.tools && !wsState.editor) {
    wsState.term = true;
  }

  const isKali = session.os === 'Kali Linux';
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const currentFlag = session.dynamicFlag || (session.lab && session.lab.flag) || 'RANGE{kali_root_access_granted_8841}';
  const targetsText = `# Cyber Lab Isolated Lab Network Targets\n10.10.0.1       gateway.lab (Default Gateway)\n10.10.0.2       kali.lab (Workstation - Current Host)\n10.10.0.10      target.lab (Vulnerable Demo Web Application)\n10.10.0.50      db.lab (PostgreSQL 16 DB Server)`;

  const termInitialOutput = (session.output && session.output.length > 0)
    ? session.output.join('\n')
    : `Linux kali-rolling 6.6.15-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.6.15-1kali1 (2024-01-31) x86_64\n\nThe programs included with the Kali GNU/Linux system are free software;\nthe exact distribution terms for each program are described in the\nindividual files in /usr/share/doc/*/copyright.\n\nKali GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent\npermitted by applicable law.\nLast login: ${now.toLocaleDateString()} from 10.10.0.1 on pts/0\n\n[+] Welcome to Kali Linux 2024 (Cyber Lab Offensive Security Workstation)\n[+] Isolated Pentest Subnet: 10.10.0.0/24 (Workstation IP: 10.10.0.2)\n[+] Target Endpoint: 10.10.0.10:8080 (target.lab)\n[+] Type 'help' or 'kali-tools' or click quick pills to begin.`;

  container.innerHTML = `
    <div class="kali-desktop-wrapper" id="kali-desktop-env">
      <!-- Top Kali XFCE Panel -->
      <div class="kali-top-bar">
        <div class="kali-top-bar-left">
          <button class="kali-menu-btn" id="kali-top-menu-btn" title="Kali Applications Menu">
            <svg class="kali-dragon-icon" viewBox="0 0 24 24">
              <path d="M12 2C9 5 4 7 2 11c-2 3-1 7 1 9 2 2 4 2 6 2-1-2-1-4 0-6 1-2 3-3 4-5 1-2 2-4 1-6 2 2 3 4 3 7 0 3-3 5-4 7-2 3-1 5 1 6 3-1 7-4 8-7 1-3 0-6-2-8-2-2-5-4-8-8z"/>
            </svg>
            Applications
          </button>
          <button class="kali-menu-btn" id="kali-places-btn">Places</button>
          <div class="kali-panel-divider"></div>
          <button class="kali-launcher-icon" id="kali-launch-term" title="Terminal Emulator">💻</button>
          <button class="kali-launcher-icon" id="kali-launch-files" title="File Manager (Thunar)">📁</button>
          <button class="kali-launcher-icon" id="kali-launch-browser" title="Target Web Browser (10.10.0.10:8080)">🌐</button>
          <button class="kali-launcher-icon" id="kali-launch-tools" title="Kali Offensive Tools Suite">⚔️</button>

          <div class="kali-taskbar-tasks">
            <div class="kali-task-item ${wsState.term ? 'active focused' : ''}" id="kali-task-term" title="Toggle Terminal Emulator">💻 root@kali: ~</div>
            <div class="kali-task-item ${wsState.browser ? 'active' : ''}" id="kali-task-browser" title="Toggle Target Web Portal">🌐 Target: 8080</div>
            <div class="kali-task-item ${wsState.files ? 'active' : ''}" id="kali-task-files" title="Toggle File Manager">📁 Files (/root)</div>
            <div class="kali-task-item ${wsState.tools ? 'active' : ''}" id="kali-task-tools" title="Toggle Kali Offensive Tools">⚔️ Kali Tools</div>
            <div class="kali-task-item ${wsState.editor ? 'active' : ''}" id="kali-task-editor" style="display:${wsState.editor ? 'flex' : 'none'};" title="Toggle Mousepad Text Editor">📝 Mousepad</div>
          </div>
        </div>

        <div class="kali-top-bar-right">
          <div class="kali-workspaces">
            <span class="kali-ws-tab active" data-ws="1">1</span>
            <span class="kali-ws-tab" data-ws="2">2</span>
            <span class="kali-ws-tab" data-ws="3">3</span>
            <span class="kali-ws-tab" data-ws="4">4</span>
          </div>
          <div class="kali-desk-zoom-ctrls">
            <button class="kali-desk-zoom-btn" id="desk-zoom-out" title="${isModalFullscreen ? 'Zoom Out / Exit Full Screen (Ctrl −)' : 'Zoom Out (Ctrl −)'}">−</button>
            <span class="zoom-display-val" id="desk-zoom-reset" title="Click to Reset Zoom (100%)" style="font-size:10.5px; cursor:pointer; color:var(--cyan); font-weight:bold;">${currentZoomPercent}%</span>
            <button class="kali-desk-zoom-btn" id="desk-zoom-in" title="${isModalFullscreen ? 'Zoom In Font (Ctrl +)' : 'Zoom In to Full Screen (Ctrl +)'}">+</button>
            <button class="kali-desk-zoom-btn" id="desk-zoom-fullscreen" title="${isModalFullscreen ? 'Exit Full Screen (Esc)' : 'Zoom In to Full Screen'}" style="font-size:11px;">${isModalFullscreen ? '⛷' : '⛶'}</button>
          </div>
          <span class="kali-tray-net">● eth0: 10.10.0.2</span>
          <span>🔊</span>
          <span class="kali-clock" id="kali-live-clock">${timeStr}</span>
          <span style="color:#00f0ff; font-weight:600;">root</span>
        </div>
      </div>

      <!-- Applications Dropdown Menu -->
      <div class="kali-app-dropdown" id="kali-app-dropdown" style="display:none;">
        <div class="kali-menu-search">
          <input type="text" id="kali-search-input" placeholder="Type to search Kali tools..." autocomplete="off">
        </div>
        <div class="kali-menu-categories" id="kali-menu-categories-list">
          <div class="kali-menu-category-item" data-tool="nmap target">
            <span>📡 01 - Information Gathering (Nmap, Masscan)</span> <span>▶</span>
          </div>
          <div class="kali-menu-category-item" data-tool="nikto -h 10.10.0.10:8080">
            <span>🛡️ 02 - Vulnerability Analysis (Nikto)</span> <span>▶</span>
          </div>
          <div class="kali-menu-category-item" data-tool="sqlmap -u http://10.10.0.10:8080/ --batch">
            <span>💉 03 - Web Application Analysis (SQLmap, Gobuster)</span> <span>▶</span>
          </div>
          <div class="kali-menu-category-item" data-tool="john /root/exploits/hashes.txt">
            <span>🔓 05 - Password Attacks (John, Hydra, Hashcat)</span> <span>▶</span>
          </div>
          <div class="kali-menu-category-item" data-tool="msfconsole">
            <span>💣 08 - Exploitation Tools (Metasploit, Searchsploit)</span> <span>▶</span>
          </div>
          <div class="kali-menu-category-item" data-tool="tcpdump -i eth0 -c 10">
            <span>🦈 09 - Sniffing & Spoofing (Wireshark, Tcpdump)</span> <span>▶</span>
          </div>
          <div class="kali-menu-category-item" data-action="browser">
            <span>🌐 Open Target Web Portal (10.10.0.10:8080)</span> <span>↗</span>
          </div>
          <div class="kali-menu-category-item" data-action="files">
            <span>📁 Open Root File Manager (Thunar)</span> <span>↗</span>
          </div>
          <div class="kali-menu-category-item" data-action="editor-flag">
            <span>🚩 View Captured Flag (Mousepad)</span> <span>↗</span>
          </div>
        </div>
      </div>

      <!-- Places Dropdown Menu -->
      <div class="kali-places-dropdown" id="kali-places-dropdown" style="display:none;">
        <div class="kali-places-item" data-action="place-home">
          <span>🏠</span> <span>Home (/root)</span>
        </div>
        <div class="kali-places-item" data-action="place-root">
          <span>🖥️</span> <span>File System (/)</span>
        </div>
        <div class="kali-places-item" data-action="place-exploits">
          <span>📁</span> <span>Exploits & Scripts</span>
        </div>
        <div class="kali-places-item" data-action="place-wordlists">
          <span>📁</span> <span>Wordlists (/root/wordlists)</span>
        </div>
        <div class="kali-places-item" data-action="place-targets">
          <span>📄</span> <span>targets.txt (Lab Network)</span>
        </div>
        <div class="kali-places-item" data-action="place-flag">
          <span>🚩</span> <span>flag.txt (Lab Flag)</span>
        </div>
      </div>

      <!-- Desktop Canvas -->
      <div class="kali-canvas" id="kali-canvas">
        <!-- Official Kali Dragon Centerpiece Watermark -->
        <div class="kali-watermark">
          <div class="kali-dragon-art-wrap">
            <svg class="kali-dragon-artwork" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="kaliDragonGlow" x1="20" y1="20" x2="220" y2="220" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.95"/>
                  <stop offset="35%" stop-color="#0099ff" stop-opacity="0.85"/>
                  <stop offset="70%" stop-color="#0055cc" stop-opacity="0.65"/>
                  <stop offset="100%" stop-color="#001844" stop-opacity="0.3"/>
                </linearGradient>
                <filter id="dragonNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur"/>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <path d="M120 16 C104 38 64 52 44 82 C30 102 34 128 48 144 C60 156 76 160 92 154 C80 142 76 128 82 112 C88 96 104 86 114 74 C124 64 130 48 124 32 C134 50 146 70 140 92 C134 114 114 128 102 150 C92 170 102 188 118 194 C142 188 168 168 180 144 C192 120 186 94 174 72 C162 50 142 30 120 16 Z" fill="url(#kaliDragonGlow)" filter="url(#dragonNeonGlow)"/>
              <path d="M130 62 C146 78 156 100 152 122 C148 138 136 152 124 164 C136 156 152 142 158 124 C164 106 158 84 144 70 C138 64 134 62 130 62 Z" fill="#00f0ff" opacity="0.5"/>
              <circle cx="112" cy="62" r="3.5" fill="#00f0ff"/>
            </svg>
          </div>
          <div class="kali-watermark-title">KALI LINUX</div>
          <div class="kali-watermark-sub">The quieter you become, the more you are able to hear.</div>
          <div class="kali-watermark-release">Kali Linux Rolling · Desktop preview · Use Terminal for the live shell</div>
        </div>

        <!-- Desktop Icons Grid (Left Column) -->
        <div class="kali-desktop-icons">
          <div class="kali-icon" id="d-icon-computer" title="File System (/)">
            <div class="kali-icon-symbol">🖥️</div>
            <div class="kali-icon-label">Computer</div>
          </div>
          <div class="kali-icon" id="d-icon-home" title="root Home (/root)">
            <div class="kali-icon-symbol">🏠</div>
            <div class="kali-icon-label">Home</div>
          </div>
          <div class="kali-icon" id="d-icon-term" title="Kali Terminal Emulator">
            <div class="kali-icon-symbol">💻</div>
            <div class="kali-icon-label">Terminal</div>
          </div>
          <div class="kali-icon" id="d-icon-browser" title="Target Vulnerable Portal (10.10.0.10:8080)">
            <div class="kali-icon-symbol">🎯</div>
            <div class="kali-icon-label">Target Web</div>
          </div>
          <div class="kali-icon" id="d-icon-tools" title="Kali Offensive Tools Index">
            <div class="kali-icon-symbol">🧰</div>
            <div class="kali-icon-label">Kali Tools</div>
          </div>
          <div class="kali-icon" id="d-icon-exploits" title="Exploits & Scripts (/root/exploits)">
            <div class="kali-icon-symbol">📂</div>
            <div class="kali-icon-label">Exploits</div>
          </div>
          <div class="kali-icon" id="d-icon-flag" title="Captured Lab Flag (flag.txt)">
            <div class="kali-icon-symbol">🚩</div>
            <div class="kali-icon-label">flag.txt</div>
          </div>
          <div class="kali-icon" id="d-icon-targets" title="Lab Target Network (targets.txt)">
            <div class="kali-icon-symbol">📄</div>
            <div class="kali-icon-label">targets.txt</div>
          </div>
          <div class="kali-icon" id="d-icon-trash" title="Trash Bin">
            <div class="kali-icon-symbol">🗑️</div>
            <div class="kali-icon-label">Trash</div>
          </div>
        </div>

        <!-- 1. Live Kali XFCE Terminal Window -->
        <div class="kali-window ${wsState.term ? 'focused' : ''}" id="kali-win-term" style="top:25px; left:120px; width:680px; height:430px; max-width:calc(100% - 130px); max-height:calc(100% - 35px); display:${wsState.term ? 'flex' : 'none'};">
          <div class="kali-window-header" id="kali-win-term-header">
            <div class="kali-window-title">
              <span style="color:#00f0ff;">>_</span> root@kali: ~ (XFCE Terminal)
            </div>
            <div class="kali-window-btns">
              <button class="kali-win-btn kali-win-min" id="kali-win-term-min" title="Minimize"></button>
              <button class="kali-win-btn kali-win-max" id="kali-win-term-max" title="Maximize"></button>
              <button class="kali-win-btn kali-win-close" id="kali-win-term-close" title="Close"></button>
            </div>
          </div>
          <div class="kali-term-menubar">
            <span id="term-menu-file">File</span>
            <span id="term-menu-edit">Edit</span>
            <span id="term-menu-view">View</span>
            <span id="term-menu-search">Search</span>
            <span id="term-menu-term">Terminal</span>
            <span id="term-menu-help">Help</span>
          </div>
          <div class="kali-term-quick-pills">
            <span style="color:#7b91a7; font-size:10px; font-family:var(--font-mono); margin-right:4px;">Quick:</span>
            <button class="kali-term-pill" data-run="nmap 10.10.0.10">nmap 10.10.0.10</button>
            <button class="kali-term-pill" data-run="cat /root/flag.txt">cat flag.txt</button>
            <button class="kali-term-pill" data-run="cat targets.txt">cat targets.txt</button>
            <button class="kali-term-pill" data-run="ls -la">ls -la</button>
            <button class="kali-term-pill" data-run="whoami && uname -a">whoami</button>
            <button class="kali-term-pill" data-run="kali-tools">kali-tools</button>
            <button class="kali-term-pill" data-run="clear">clear</button>
            <button class="kali-term-pill" id="kali-term-save-log-pill" style="background:rgba(0,240,255,0.12); border-color:rgba(0,240,255,0.35); color:#00f0ff; font-weight:600;">💾 Save Log</button>
          </div>
          <div class="kali-window-body" style="display:flex; flex-direction:column; padding:10px; font-family:var(--font-mono); background:#0a0f16;">
            <div style="color:#7b91a7; font-size:11px; margin-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:6px; display:flex; justify-content:space-between; align-items:center;">
              <span>Linux kali-rolling 6.6.15-amd64 #1 SMP PREEMPT Kali · bash 5.2.21</span>
              <span style="color:#34d399; font-size:10.5px;">● tty1 online</span>
            </div>
            <div id="kali-desk-term-output" style="flex:1; overflow-y:auto; white-space:pre-wrap; font-size:12.5px; line-height:1.45; color:#c6d4dc; min-height:160px;">${escapeHtml(termInitialOutput)}</div>
            <form id="kali-desk-term-form" class="kali-term-input-form">
              <div class="kali-prompt-line">
                <span class="p-branch">┌──(</span><span class="p-user">root</span><span class="p-sym">㉿</span><span class="p-host">kali</span><span class="p-branch">)-[</span><span class="p-path">~</span><span class="p-branch">]</span>
              </div>
              <div class="kali-prompt-input-row">
                <span class="p-subbranch">└─</span><span class="p-hash">#&nbsp;</span>
                <input type="text" id="kali-desk-term-input" autocomplete="off" spellcheck="false" placeholder="Type command (e.g. nmap 10.10.0.10, ls -la, cat flag.txt)...">
              </div>
            </form>
          </div>
        </div>

        <!-- 2. Target Web Portal Window -->
        <div class="kali-window" id="kali-win-browser" style="top:45px; left:180px; width:560px; height:360px; max-width:calc(100% - 190px); max-height:calc(100% - 50px); display:${wsState.browser ? 'flex' : 'none'};">
          <div class="kali-window-header" id="kali-win-browser-header">
            <div class="kali-window-title">
              <span style="color:#00f0ff;">🌐</span> Chromium - Target Portal (10.10.0.10:8080)
            </div>
            <div class="kali-window-btns">
              <button class="kali-win-btn kali-win-min" id="kali-win-browser-min" title="Minimize"></button>
              <button class="kali-win-btn kali-win-max" id="kali-win-browser-max" title="Maximize"></button>
              <button class="kali-win-btn kali-win-close" id="kali-win-browser-close" title="Close"></button>
            </div>
          </div>
          <div style="background:#131c26; padding:6px 10px; display:flex; align-items:center; gap:8px; border-bottom:1px solid rgba(255,255,255,0.08);">
            <button style="background:transparent; border:none; color:#7e95a9; cursor:pointer;" id="kali-browser-back">←</button>
            <button style="background:transparent; border:none; color:#7e95a9; cursor:pointer;" id="kali-browser-forward">→</button>
            <button style="background:transparent; border:none; color:#00f0ff; cursor:pointer;" id="kali-browser-refresh">↻</button>
            <input type="text" id="kali-browser-url" value="http://10.10.0.10:8080/" readonly style="flex:1; background:rgba(0,0,0,0.4); border:1px solid rgba(0,240,255,0.2); border-radius:4px; padding:2px 8px; color:#c6d4dc; font-family:var(--font-mono); font-size:11px;">
          </div>
          <div class="kali-window-body" style="padding:14px; background:#0b1118; overflow-y:auto;">
            <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); border-radius:6px; padding:14px;">
              <h3 style="color:#00f0ff; font-size:15px; margin-bottom:6px; display:flex; align-items:center; gap:6px;">🎯 Cyber Lab Target Endpoint Active</h3>
              <p style="color:#8ba3b8; font-size:11.5px; margin-bottom:10px;">Vulnerable web service for offensive penetration testing and authorization audit.</p>
              <div style="background:#000; padding:10px; border-radius:4px; font-family:var(--font-mono); font-size:11px; color:#9cd469; line-height:1.6;">
                [+] Host: 10.10.0.10 (target.lab)<br>
                [+] Web Port: 8080/tcp (HTTP) & 22/tcp (SSH)<br>
                [+] Server: nginx/1.24.0 + Python/Werkzeug 3.0<br>
                [+] Database: PostgreSQL 16.2 on 10.10.0.50<br>
                [+] Known Vulns: Blind SQLi on /login · Weak Admin Credentials
              </div>
              <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:12px;">
                <button class="primary" style="padding:5px 12px; font-size:11px;" id="kali-scan-target-btn">📡 Scan 10.10.0.10 (Nmap)</button>
                <button class="secondary" style="padding:5px 12px; font-size:11px;" id="kali-sqli-btn">💉 Exploit SQLi (SQLmap)</button>
                <button class="secondary" style="padding:5px 12px; font-size:11px;" id="kali-hydra-btn">🔓 Crack SSH (Hydra)</button>
                <button class="secondary" style="padding:5px 12px; font-size:11px;" id="kali-curl-btn">🌐 Curl /login</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Kali Offensive Tools Suite Window -->
        <div class="kali-window" id="kali-win-tools" style="top:35px; left:130px; width:720px; height:500px; max-width:calc(100% - 140px); max-height:calc(100% - 45px); display:${wsState.tools ? 'flex' : 'none'};">
          <div class="kali-window-header" id="kali-win-tools-header">
            <div class="kali-window-title">
              <span style="color:#00f0ff;">⚔️</span> Kali Linux Offensive Security Tools (90+ Tools Available)
            </div>
            <div class="kali-window-btns">
              <button class="kali-win-btn kali-win-min" id="kali-win-tools-min" title="Minimize"></button>
              <button class="kali-win-btn kali-win-max" id="kali-win-tools-max" title="Maximize"></button>
              <button class="kali-win-btn kali-win-close" id="kali-win-tools-close" title="Close"></button>
            </div>
          </div>
          <div style="background:#131c26; padding:8px 12px; border-bottom:1px solid rgba(255,255,255,0.08); display:flex; flex-direction:column; gap:6px;">
            <input type="text" id="kali-tools-search" placeholder="Search 90+ Kali tools (nmap, sqlmap, hydra, metasploit, wireshark, aircrack)..." style="width:100%; background:rgba(0,0,0,0.4); border:1px solid rgba(0,240,255,0.25); border-radius:4px; padding:6px 10px; color:#fff; font-size:11px; outline:none;">
            <div style="display:flex; gap:6px; flex-wrap:wrap; font-size:10px;" id="kali-tool-filter-tags">
              <button class="kali-filter-btn active" data-cat="all" style="padding:3px 8px; border-radius:3px; background:rgba(0,240,255,0.2); border:1px solid rgba(0,240,255,0.4); color:#00f0ff; cursor:pointer;">All Tools</button>
              <button class="kali-filter-btn" data-cat="recon" style="padding:3px 8px; border-radius:3px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#7e95a9; cursor:pointer;">Recon & OSINT</button>
              <button class="kali-filter-btn" data-cat="web" style="padding:3px 8px; border-radius:3px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#7e95a9; cursor:pointer;">Web Apps</button>
              <button class="kali-filter-btn" data-cat="exploit" style="padding:3px 8px; border-radius:3px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#7e95a9; cursor:pointer;">Exploitation</button>
              <button class="kali-filter-btn" data-cat="passwords" style="padding:3px 8px; border-radius:3px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#7e95a9; cursor:pointer;">Passwords</button>
              <button class="kali-filter-btn" data-cat="wireless" style="padding:3px 8px; border-radius:3px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#7e95a9; cursor:pointer;">Wireless</button>
              <button class="kali-filter-btn" data-cat="sniffing" style="padding:3px 8px; border-radius:3px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#7e95a9; cursor:pointer;">Sniffing</button>
              <button class="kali-filter-btn" data-cat="forensics" style="padding:3px 8px; border-radius:3px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#7e95a9; cursor:pointer;">Reverse & Forensics</button>
            </div>
          </div>
          <div class="kali-window-body" style="padding:12px; overflow-y:auto;" id="kali-tools-cards-container">
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(210px, 1fr)); gap:10px;">
              <!-- 1. Recon -->
              <div class="kali-tool-card" data-cat="recon" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">📡 Nmap v7.94</span>
                  <span style="font-size:9px; background:rgba(0,240,255,0.15); color:#00f0ff; padding:1px 5px; border-radius:3px;">RECON</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Network discovery & port vulnerability scanner.</div>
                <button class="tool-quick-run" data-cmd="nmap -sV -sC 10.10.0.10" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run nmap</button>
              </div>

              <div class="kali-tool-card" data-cat="recon" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">⚡ Masscan v1.3</span>
                  <span style="font-size:9px; background:rgba(0,240,255,0.15); color:#00f0ff; padding:1px 5px; border-radius:3px;">RECON</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Ultra-fast asynchronous TCP port scanner.</div>
                <button class="tool-quick-run" data-cmd="masscan -p1-65535 10.10.0.10 --rate=1000" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run masscan</button>
              </div>

              <div class="kali-tool-card" data-cat="recon" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">🔍 Netdiscover</span>
                  <span style="font-size:9px; background:rgba(0,240,255,0.15); color:#00f0ff; padding:1px 5px; border-radius:3px;">RECON</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Active/passive ARP network subnet scanner.</div>
                <button class="tool-quick-run" data-cmd="netdiscover -r 10.10.0.0/24" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run netdiscover</button>
              </div>

              <div class="kali-tool-card" data-cat="recon" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">🌐 WhatWeb v0.5</span>
                  <span style="font-size:9px; background:rgba(0,240,255,0.15); color:#00f0ff; padding:1px 5px; border-radius:3px;">RECON</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Next generation web application fingerprinting.</div>
                <button class="tool-quick-run" data-cmd="whatweb http://10.10.0.10:8080/" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run whatweb</button>
              </div>

              <div class="kali-tool-card" data-cat="recon" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">🦅 theHarvester</span>
                  <span style="font-size:9px; background:rgba(0,240,255,0.15); color:#00f0ff; padding:1px 5px; border-radius:3px;">OSINT</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">E-mail, subdomains, and names harvester.</div>
                <button class="tool-quick-run" data-cmd="theharvester -d cyberlab.io -b google" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run theharvester</button>
              </div>

              <!-- 2. Web App -->
              <div class="kali-tool-card" data-cat="web" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">💉 SQLmap v1.8</span>
                  <span style="font-size:9px; background:rgba(255,100,100,0.2); color:#ff6b6b; padding:1px 5px; border-radius:3px;">WEB</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Automatic SQL injection & database takeover.</div>
                <button class="tool-quick-run" data-cmd="sqlmap -u http://10.10.0.10:8080/ --dbs --batch" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run sqlmap</button>
              </div>

              <div class="kali-tool-card" data-cat="web" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">🛡️ Nikto v2.5</span>
                  <span style="font-size:9px; background:rgba(255,100,100,0.2); color:#ff6b6b; padding:1px 5px; border-radius:3px;">WEB</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Web server vulnerability and misconfig scanner.</div>
                <button class="tool-quick-run" data-cmd="nikto -h 10.10.0.10:8080" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run nikto</button>
              </div>

              <div class="kali-tool-card" data-cat="web" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">📁 Gobuster v3.6</span>
                  <span style="font-size:9px; background:rgba(255,100,100,0.2); color:#ff6b6b; padding:1px 5px; border-radius:3px;">WEB</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Fast directory, DNS, and vhost brute-forcer.</div>
                <button class="tool-quick-run" data-cmd="gobuster dir -u http://10.10.0.10:8080/ -w /root/wordlists" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run gobuster</button>
              </div>

              <div class="kali-tool-card" data-cat="web" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">🔎 Dirb v2.22</span>
                  <span style="font-size:9px; background:rgba(255,100,100,0.2); color:#ff6b6b; padding:1px 5px; border-radius:3px;">WEB</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Raw HTTP dictionary based web cracker.</div>
                <button class="tool-quick-run" data-cmd="dirb http://10.10.0.10:8080/" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run dirb</button>
              </div>

              <div class="kali-tool-card" data-cat="web" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">⚡ Ffuf v2.1</span>
                  <span style="font-size:9px; background:rgba(255,100,100,0.2); color:#ff6b6b; padding:1px 5px; border-radius:3px;">WEB</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Fast web fuzzer written in Go.</div>
                <button class="tool-quick-run" data-cmd="ffuf -u http://10.10.0.10:8080/FUZZ -w /root/wordlists" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run ffuf</button>
              </div>

              <div class="kali-tool-card" data-cat="web" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">💥 Commix v3.8</span>
                  <span style="font-size:9px; background:rgba(255,100,100,0.2); color:#ff6b6b; padding:1px 5px; border-radius:3px;">WEB</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Automated command injection detector & exploit.</div>
                <button class="tool-quick-run" data-cmd="commix --url=http://10.10.0.10:8080/" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run commix</button>
              </div>

              <!-- 3. Exploitation -->
              <div class="kali-tool-card" data-cat="exploit" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">💣 Metasploit</span>
                  <span style="font-size:9px; background:rgba(255,150,50,0.2); color:#ff9f43; padding:1px 5px; border-radius:3px;">EXPLOIT</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Industry-standard penetration testing platform.</div>
                <button class="tool-quick-run" data-cmd="msfconsole" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run msfconsole</button>
              </div>

              <div class="kali-tool-card" data-cat="exploit" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">📦 Msfvenom</span>
                  <span style="font-size:9px; background:rgba(255,150,50,0.2); color:#ff9f43; padding:1px 5px; border-radius:3px;">PAYLOADS</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Standalone payload generator & shellcode encoder.</div>
                <button class="tool-quick-run" data-cmd="msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=10.10.0.2 LPORT=4444 -f elf" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run msfvenom</button>
              </div>

              <div class="kali-tool-card" data-cat="exploit" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">📜 Searchsploit</span>
                  <span style="font-size:9px; background:rgba(255,150,50,0.2); color:#ff9f43; padding:1px 5px; border-radius:3px;">EXPLOIT</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Command line archive of Exploit-DB exploits.</div>
                <button class="tool-quick-run" data-cmd="searchsploit linux 6.6" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run searchsploit</button>
              </div>

              <div class="kali-tool-card" data-cat="exploit" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">🛡️ CrackMapExec</span>
                  <span style="font-size:9px; background:rgba(255,150,50,0.2); color:#ff9f43; padding:1px 5px; border-radius:3px;">POST-EXP</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Active Directory & internal network pentesting.</div>
                <button class="tool-quick-run" data-cmd="crackmapexec smb 10.10.0.10 -u admin -p password123" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run crackmapexec</button>
              </div>

              <!-- 4. Passwords -->
              <div class="kali-tool-card" data-cat="passwords" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">🔓 Hydra v9.5</span>
                  <span style="font-size:9px; background:rgba(255,200,0,0.2); color:#feca57; padding:1px 5px; border-radius:3px;">PASSWORDS</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Parallel network login brute-forcer (SSH, HTTP).</div>
                <button class="tool-quick-run" data-cmd="hydra -l admin -P wordlists 10.10.0.10 ssh" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run hydra</button>
              </div>

              <div class="kali-tool-card" data-cat="passwords" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">🔑 John the Ripper</span>
                  <span style="font-size:9px; background:rgba(255,200,0,0.2); color:#feca57; padding:1px 5px; border-radius:3px;">PASSWORDS</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Offline password cracker for Unix, NTLM & hashes.</div>
                <button class="tool-quick-run" data-cmd="john" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run john</button>
              </div>

              <div class="kali-tool-card" data-cat="passwords" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">⚡ Hashcat v6.2</span>
                  <span style="font-size:9px; background:rgba(255,200,0,0.2); color:#feca57; padding:1px 5px; border-radius:3px;">PASSWORDS</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Fast rule-based hash cracker (MD5, SHA, NTLM).</div>
                <button class="tool-quick-run" data-cmd="hashcat -m 0 5f4dcc3b5aa765d61d8327deb882cf99 wordlists" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run hashcat</button>
              </div>

              <!-- 5. Wireless -->
              <div class="kali-tool-card" data-cat="wireless" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">📡 Aircrack-ng</span>
                  <span style="font-size:9px; background:rgba(100,200,255,0.2); color:#54a0ff; padding:1px 5px; border-radius:3px;">WIRELESS</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Complete 802.11 WEP/WPA-PSK key recovery suite.</div>
                <button class="tool-quick-run" data-cmd="aircrack-ng" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run aircrack-ng</button>
              </div>

              <div class="kali-tool-card" data-cat="wireless" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">📶 Wifite v2.6</span>
                  <span style="font-size:9px; background:rgba(100,200,255,0.2); color:#54a0ff; padding:1px 5px; border-radius:3px;">WIRELESS</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Automated wireless network auditor & cracker.</div>
                <button class="tool-quick-run" data-cmd="wifite" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run wifite</button>
              </div>

              <!-- 6. Sniffing -->
              <div class="kali-tool-card" data-cat="sniffing" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">🦈 Tcpdump / Wireshark</span>
                  <span style="font-size:9px; background:rgba(180,100,255,0.2); color:#9b59b6; padding:1px 5px; border-radius:3px;">SNIFFING</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Network packet capture and live protocol inspector.</div>
                <button class="tool-quick-run" data-cmd="tcpdump -i eth0 -c 10" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run tcpdump</button>
              </div>

              <div class="kali-tool-card" data-cat="sniffing" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">🕵️ Bettercap v2.3</span>
                  <span style="font-size:9px; background:rgba(180,100,255,0.2); color:#9b59b6; padding:1px 5px; border-radius:3px;">MITM</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Swiss-army knife for MITM and network poisoning.</div>
                <button class="tool-quick-run" data-cmd="bettercap" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run bettercap</button>
              </div>

              <div class="kali-tool-card" data-cat="sniffing" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">🎭 Responder</span>
                  <span style="font-size:9px; background:rgba(180,100,255,0.2); color:#9b59b6; padding:1px 5px; border-radius:3px;">POISONER</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">LLMNR, NBT-NS and MDNS poisoner & hash capture.</div>
                <button class="tool-quick-run" data-cmd="responder" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run responder</button>
              </div>

              <!-- 7. Reverse & Forensics -->
              <div class="kali-tool-card" data-cat="forensics" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">🔬 Ghidra v11</span>
                  <span style="font-size:9px; background:rgba(50,255,180,0.2); color:#1dd1a1; padding:1px 5px; border-radius:3px;">REVERSE</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">NSA software reverse engineering framework.</div>
                <button class="tool-quick-run" data-cmd="ghidra" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run ghidra</button>
              </div>

              <div class="kali-tool-card" data-cat="forensics" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">🛠️ Radare2 (r2)</span>
                  <span style="font-size:9px; background:rgba(50,255,180,0.2); color:#1dd1a1; padding:1px 5px; border-radius:3px;">REVERSE</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Disassembly, hex editor & binary debugger.</div>
                <button class="tool-quick-run" data-cmd="r2 shell.elf" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run radare2</button>
              </div>

              <div class="kali-tool-card" data-cat="forensics" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">📦 Binwalk v2.3</span>
                  <span style="font-size:9px; background:rgba(50,255,180,0.2); color:#1dd1a1; padding:1px 5px; border-radius:3px;">FORENSICS</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Firmware analysis and file carving extractor.</div>
                <button class="tool-quick-run" data-cmd="binwalk shell.elf" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run binwalk</button>
              </div>

              <div class="kali-tool-card" data-cat="forensics" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">🖼️ Exiftool</span>
                  <span style="font-size:9px; background:rgba(50,255,180,0.2); color:#1dd1a1; padding:1px 5px; border-radius:3px;">METADATA</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Read and extract EXIF metadata and hidden flags.</div>
                <button class="tool-quick-run" data-cmd="exiftool flag.jpg" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run exiftool</button>
              </div>

              <div class="kali-tool-card" data-cat="forensics" style="background:rgba(255,255,255,0.03); border:1px solid rgba(0,240,255,0.15); padding:10px; border-radius:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="color:#00f0ff; font-weight:600; font-size:12px;">🧠 Volatility 3</span>
                  <span style="font-size:9px; background:rgba(50,255,180,0.2); color:#1dd1a1; padding:1px 5px; border-radius:3px;">MEMORY</span>
                </div>
                <div style="color:#7e95a9; font-size:11px; margin:4px 0 8px;">Volatile memory forensics & process dump.</div>
                <button class="tool-quick-run" data-cmd="vol" style="padding:3px 8px; font-size:10px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:#00f0ff; border-radius:3px; cursor:pointer;">Run volatility</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. File Manager Window (Thunar) -->
        <div class="kali-window" id="kali-win-files" style="top:45px; left:170px; width:520px; height:330px; max-width:calc(100% - 180px); max-height:calc(100% - 50px); display:${wsState.files ? 'flex' : 'none'};">
          <div class="kali-window-header" id="kali-win-files-header">
            <div class="kali-window-title">
              <span style="color:#00f0ff;">📁</span> Thunar - /root
            </div>
            <div class="kali-window-btns">
              <button class="kali-win-btn kali-win-min" id="kali-win-files-min" title="Minimize"></button>
              <button class="kali-win-btn kali-win-max" id="kali-win-files-max" title="Maximize"></button>
              <button class="kali-win-btn kali-win-close" id="kali-win-files-close" title="Close"></button>
            </div>
          </div>
          <div style="background:#131c26; padding:6px 12px; display:flex; align-items:center; gap:8px; border-bottom:1px solid rgba(255,255,255,0.08); font-size:11px; font-family:var(--font-mono);">
            <span style="color:#7e95a9;">Location:</span>
            <span style="color:#00f0ff; background:rgba(0,0,0,0.3); padding:2px 8px; border-radius:3px; border:1px solid rgba(0,240,255,0.2);">/root/</span>
          </div>
          <div class="kali-window-body" style="padding:14px;">
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:14px; text-align:center;">
              <div class="kali-icon" style="width:auto; cursor:pointer;" id="f-exploits" title="Open /root/exploits">
                <div style="font-size:28px;">📁</div>
                <div style="font-size:11px; color:#c6d4dc;">exploits/</div>
              </div>
              <div class="kali-icon" style="width:auto; cursor:pointer;" id="f-wordlists" title="Open /root/wordlists">
                <div style="font-size:28px;">📁</div>
                <div style="font-size:11px; color:#c6d4dc;">wordlists/</div>
              </div>
              <div class="kali-icon" style="width:auto; cursor:pointer;" id="f-targets" title="View targets.txt in Mousepad">
                <div style="font-size:28px;">📄</div>
                <div style="font-size:11px; color:#c6d4dc;">targets.txt</div>
              </div>
              <div class="kali-icon" style="width:auto; cursor:pointer;" id="f-flag" title="View flag.txt in Mousepad">
                <div style="font-size:28px;">🚩</div>
                <div style="font-size:11px; color:#c6d4dc;">flag.txt</div>
              </div>
              <div class="kali-icon" style="width:auto; cursor:pointer;" id="f-history" title="View .bash_history">
                <div style="font-size:28px;">📄</div>
                <div style="font-size:11px; color:#c6d4dc;">.bash_history</div>
              </div>
              <div class="kali-icon" style="width:auto; cursor:pointer;" id="f-notes" title="View notes.txt">
                <div style="font-size:28px;">📝</div>
                <div style="font-size:11px; color:#c6d4dc;">notes.txt</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Mousepad Text Editor Window -->
        <div class="kali-window" id="kali-win-editor" style="top:60px; left:200px; width:490px; height:310px; max-width:calc(100% - 210px); max-height:calc(100% - 50px); display:${wsState.editor ? 'flex' : 'none'};">
          <div class="kali-window-header" id="kali-win-editor-header">
            <div class="kali-window-title">
              <span style="color:#00f0ff;">📝</span> Mousepad - <span id="kali-editor-filename" style="color:#fff;">flag.txt</span>
            </div>
            <div class="kali-window-btns">
              <button class="kali-win-btn kali-win-min" id="kali-win-editor-min" title="Minimize"></button>
              <button class="kali-win-btn kali-win-max" id="kali-win-editor-max" title="Maximize"></button>
              <button class="kali-win-btn kali-win-close" id="kali-win-editor-close" title="Close"></button>
            </div>
          </div>
          <div class="kali-window-body" style="display:flex; flex-direction:column; padding:0;">
            <textarea class="kali-editor-textarea" id="kali-editor-content" spellcheck="false" placeholder="File contents..."></textarea>
            <div class="kali-editor-statusbar">
              <span style="font-family:var(--font-mono); font-size:10.5px; color:#7e95a9;">UTF-8 · Unix (LF) · Plain Text</span>
              <div style="display:flex; gap:6px;">
                <button class="kali-term-pill" id="kali-editor-copy" style="font-size:11px;">📋 Copy Text</button>
                <button class="kali-term-pill" id="kali-editor-submit-flag" style="font-size:11px; background:rgba(0,240,255,0.2); border-color:#00f0ff; color:#fff;">🚩 Submit Flag</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop Right-Click Context Menu -->
        <div class="kali-context-menu" id="kali-context-menu" style="display:none;">
          <div class="kali-ctx-item" id="ctx-open-term"><span>💻</span> Open Terminal Here</div>
          <div class="kali-ctx-item" id="ctx-open-files"><span>📁</span> Open File Manager</div>
          <div class="kali-ctx-item" id="ctx-open-browser"><span>🌐</span> Open Target Web Portal</div>
          <div class="kali-ctx-separator"></div>
          <div class="kali-ctx-item" id="ctx-open-tools"><span>⚔️</span> Kali Offensive Tools</div>
          <div class="kali-ctx-item" id="ctx-open-flag"><span>🚩</span> View flag.txt (Mousepad)</div>
          <div class="kali-ctx-item" id="ctx-open-targets"><span>📄</span> View targets.txt (Mousepad)</div>
          <div class="kali-ctx-separator"></div>
          <div class="kali-ctx-item" id="ctx-desktop-refresh"><span>🔄</span> Refresh Desktop</div>
        </div>

      </div>
    </div>
  `;

  // Start live clock ticking
  if (kaliClockTimer) clearInterval(kaliClockTimer);
  kaliClockTimer = setInterval(() => {
    const clockEl = document.getElementById('kali-live-clock');
    if (clockEl) {
      clockEl.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } else {
      clearInterval(kaliClockTimer);
    }
  }, 1000);

  // --- Window Manager Core (NO DESTRUCTIVE RE-RENDERING) ---
  const canvas = document.getElementById('kali-canvas');
  window._kaliTopZ = window._kaliTopZ || 40;

  const focusWindow = (winEl) => {
    if (!winEl) return;
    document.querySelectorAll('.kali-window').forEach(w => w.classList.remove('focused'));
    winEl.classList.add('focused');
    winEl.style.zIndex = String(++window._kaliTopZ);

    const name = winEl.id.replace('kali-win-', '');
    document.querySelectorAll('.kali-task-item').forEach(t => t.classList.remove('focused'));
    const task = document.getElementById(`kali-task-${name}`);
    if (task) task.classList.add('focused');
  };

  const openWindow = (name, openData) => {
    const win = document.getElementById(`kali-win-${name}`);
    const task = document.getElementById(`kali-task-${name}`);
    if (!win) return;
    win.style.display = 'flex';
    if (task) {
      task.style.display = 'flex';
      task.classList.add('active');
    }
    focusWindow(win);
    wsState[name] = true;

    if (name === 'term') {
      setTimeout(() => document.getElementById('kali-desk-term-input')?.focus(), 50);
    }
    if (name === 'editor' && openData) {
      const fnEl = document.getElementById('kali-editor-filename');
      const taEl = document.getElementById('kali-editor-content');
      if (fnEl) fnEl.textContent = openData.filename || 'untitled.txt';
      if (taEl) taEl.value = openData.content || '';
    }
  };

  const closeWindow = (name) => {
    const win = document.getElementById(`kali-win-${name}`);
    const task = document.getElementById(`kali-task-${name}`);
    if (!win) return;
    win.style.display = 'none';
    win.classList.remove('focused');
    if (task) {
      task.classList.remove('active', 'focused');
      if (name === 'editor') task.style.display = 'none';
    }
    wsState[name] = false;
  };

  const toggleWindow = (name) => {
    const win = document.getElementById(`kali-win-${name}`);
    if (!win) return;
    if (win.style.display === 'none' || !win.style.display) {
      openWindow(name);
    } else if (!win.classList.contains('focused')) {
      focusWindow(win);
    } else {
      // Minimize
      win.style.display = 'none';
      win.classList.remove('focused');
      const task = document.getElementById(`kali-task-${name}`);
      if (task) task.classList.remove('focused');
      wsState[name] = false;
    }
  };

  const toggleMaximize = (win) => {
    if (!win) return;
    win.classList.toggle('maximized');
  };

  // Expose globally so external scripts / tools can open windows
  window._kaliOpenWindow = openWindow;
  window._kaliFocusWindow = focusWindow;

  // Window drag handling
  const makeDraggable = (winId, headerId) => {
    const win = document.getElementById(winId);
    const header = document.getElementById(headerId);
    if (!win || !header || !canvas) return;

    win.addEventListener('mousedown', () => focusWindow(win));

    header.addEventListener('dblclick', (e) => {
      if (e.target.closest('.kali-win-btn')) return;
      toggleMaximize(win);
    });

    header.addEventListener('mousedown', (e) => {
      if (e.target.closest('.kali-win-btn')) return;
      if (win.classList.contains('maximized')) return;
      focusWindow(win);

      const startX = e.clientX;
      const startY = e.clientY;
      const startLeft = win.offsetLeft;
      const startTop = win.offsetTop;

      const onMouseMove = (me) => {
        const dx = me.clientX - startX;
        const dy = me.clientY - startY;
        const maxL = Math.max(0, canvas.clientWidth - 80);
        const maxT = Math.max(0, canvas.clientHeight - 40);
        win.style.left = Math.max(0, Math.min(maxL, startLeft + dx)) + 'px';
        win.style.top = Math.max(0, Math.min(maxT, startTop + dy)) + 'px';
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  makeDraggable('kali-win-term', 'kali-win-term-header');
  makeDraggable('kali-win-browser', 'kali-win-browser-header');
  makeDraggable('kali-win-tools', 'kali-win-tools-header');
  makeDraggable('kali-win-files', 'kali-win-files-header');
  makeDraggable('kali-win-editor', 'kali-win-editor-header');

  // Window Min / Max / Close buttons
  const setupWinBtns = (name) => {
    const winId = `kali-win-${name}`;
    const win = document.getElementById(winId);
    document.getElementById(`${winId}-close`)?.addEventListener('click', (e) => {
      e.stopPropagation();
      closeWindow(name);
    });
    document.getElementById(`${winId}-min`)?.addEventListener('click', (e) => {
      e.stopPropagation();
      closeWindow(name);
    });
    document.getElementById(`${winId}-max`)?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMaximize(win);
    });
  };

  setupWinBtns('term');
  setupWinBtns('browser');
  setupWinBtns('tools');
  setupWinBtns('files');
  setupWinBtns('editor');

  // Taskbar Click Toggles
  document.getElementById('kali-task-term')?.addEventListener('click', () => toggleWindow('term'));
  document.getElementById('kali-task-browser')?.addEventListener('click', () => toggleWindow('browser'));
  document.getElementById('kali-task-files')?.addEventListener('click', () => toggleWindow('files'));
  document.getElementById('kali-task-tools')?.addEventListener('click', () => toggleWindow('tools'));
  document.getElementById('kali-task-editor')?.addEventListener('click', () => toggleWindow('editor'));

  // Quick Launchers
  document.getElementById('kali-launch-term')?.addEventListener('click', () => openWindow('term'));
  document.getElementById('kali-launch-files')?.addEventListener('click', () => openWindow('files'));
  document.getElementById('kali-launch-browser')?.addEventListener('click', () => openWindow('browser'));
  document.getElementById('kali-launch-tools')?.addEventListener('click', () => openWindow('tools'));

  // Applications Menu Dropdown
  const topMenuBtn = document.getElementById('kali-top-menu-btn');
  const appDropdown = document.getElementById('kali-app-dropdown');
  const placesBtn = document.getElementById('kali-places-btn');
  const placesDropdown = document.getElementById('kali-places-dropdown');

  const closeDropdowns = () => {
    if (appDropdown) appDropdown.style.display = 'none';
    if (placesDropdown) placesDropdown.style.display = 'none';
    topMenuBtn?.classList.remove('active');
    placesBtn?.classList.remove('active');
  };

  if (topMenuBtn) {
    topMenuBtn.onclick = (e) => {
      e.stopPropagation();
      const isVisible = appDropdown.style.display === 'flex';
      closeDropdowns();
      if (!isVisible) {
        appDropdown.style.display = 'flex';
        topMenuBtn.classList.add('active');
        document.getElementById('kali-search-input')?.focus();
      }
    };
  }

  if (placesBtn) {
    placesBtn.onclick = (e) => {
      e.stopPropagation();
      const isVisible = placesDropdown.style.display === 'flex';
      closeDropdowns();
      if (!isVisible) {
        placesDropdown.style.display = 'flex';
        placesBtn.classList.add('active');
      }
    };
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#kali-top-menu-btn') && !e.target.closest('#kali-app-dropdown') &&
        !e.target.closest('#kali-places-btn') && !e.target.closest('#kali-places-dropdown')) {
      closeDropdowns();
    }
  });

  // App Menu Live Search
  const searchInput = document.getElementById('kali-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      document.querySelectorAll('#kali-menu-categories-list .kali-menu-category-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(q) ? 'flex' : 'none';
      });
    });
  }

  // App Menu Item Clicks
  document.querySelectorAll('.kali-menu-category-item').forEach((item) => {
    item.addEventListener('click', () => {
      closeDropdowns();
      const tool = item.getAttribute('data-tool');
      const action = item.getAttribute('data-action');
      if (tool) {
        openWindow('term');
        runCommand(tool);
      } else if (action === 'browser') {
        openWindow('browser');
      } else if (action === 'files') {
        openWindow('files');
      } else if (action === 'editor-flag') {
        openWindow('editor', { filename: 'flag.txt', content: currentFlag });
      }
    });
  });

  // Places Item Clicks
  document.querySelectorAll('.kali-places-item').forEach((item) => {
    item.addEventListener('click', () => {
      closeDropdowns();
      const act = item.getAttribute('data-action');
      if (act === 'place-home' || act === 'place-root') {
        openWindow('files');
      } else if (act === 'place-exploits') {
        openWindow('files');
        openWindow('term');
        runCommand('ls -la exploits');
      } else if (act === 'place-wordlists') {
        openWindow('files');
        openWindow('term');
        runCommand('ls -la wordlists');
      } else if (act === 'place-targets') {
        openWindow('editor', { filename: 'targets.txt', content: targetsText });
        openWindow('term');
        runCommand('cat targets.txt');
      } else if (act === 'place-flag') {
        openWindow('editor', { filename: 'flag.txt', content: currentFlag });
        openWindow('term');
        runCommand('cat /root/flag.txt');
      }
    });
  });

  // Workspace Tabs (1, 2, 3, 4)
  document.querySelectorAll('.kali-ws-tab').forEach((tabEl) => {
    tabEl.addEventListener('click', () => {
      document.querySelectorAll('.kali-ws-tab').forEach(t => t.classList.remove('active'));
      tabEl.classList.add('active');
    });
  });

  // Desktop Icons (Click to select & open, double click to open)
  const selectIcon = (iconEl) => {
    document.querySelectorAll('.kali-icon').forEach(i => i.classList.remove('selected'));
    if (iconEl) iconEl.classList.add('selected');
  };

  canvas?.addEventListener('click', (e) => {
    if (!e.target.closest('.kali-icon') && !e.target.closest('.kali-window')) {
      selectIcon(null);
    }
  });

  const wireDesktopIcon = (id, onOpen) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      selectIcon(el);
      onOpen();
    });
    el.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      selectIcon(el);
      onOpen();
    });
  };

  wireDesktopIcon('d-icon-computer', () => openWindow('files'));
  wireDesktopIcon('d-icon-home', () => openWindow('files'));
  wireDesktopIcon('d-icon-term', () => openWindow('term'));
  wireDesktopIcon('d-icon-browser', () => openWindow('browser'));
  wireDesktopIcon('d-icon-tools', () => openWindow('tools'));
  wireDesktopIcon('d-icon-exploits', () => {
    openWindow('files');
    openWindow('term');
    runCommand('ls -la exploits');
  });
  wireDesktopIcon('d-icon-flag', () => {
    openWindow('editor', { filename: 'flag.txt', content: currentFlag });
    openWindow('term');
    runCommand('cat /root/flag.txt');
  });
  wireDesktopIcon('d-icon-targets', () => {
    openWindow('editor', { filename: 'targets.txt', content: targetsText });
    openWindow('term');
    runCommand('cat targets.txt');
  });
  wireDesktopIcon('d-icon-trash', () => openWindow('files'));

  // Desktop Right-Click Context Menu
  const ctxMenu = document.getElementById('kali-context-menu');
  if (canvas && ctxMenu) {
    canvas.addEventListener('contextmenu', (e) => {
      if (e.target.closest('.kali-window') || e.target.closest('input') || e.target.closest('textarea')) {
        return;
      }
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = Math.min(e.clientX - rect.left, canvas.clientWidth - 230);
      const y = Math.min(e.clientY - rect.top, canvas.clientHeight - 250);
      ctxMenu.style.left = `${Math.max(6, x)}px`;
      ctxMenu.style.top = `${Math.max(6, y)}px`;
      ctxMenu.style.display = 'flex';
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#kali-context-menu')) {
        ctxMenu.style.display = 'none';
      }
    });

    document.getElementById('ctx-open-term')?.addEventListener('click', () => {
      ctxMenu.style.display = 'none';
      openWindow('term');
    });
    document.getElementById('ctx-open-files')?.addEventListener('click', () => {
      ctxMenu.style.display = 'none';
      openWindow('files');
    });
    document.getElementById('ctx-open-browser')?.addEventListener('click', () => {
      ctxMenu.style.display = 'none';
      openWindow('browser');
    });
    document.getElementById('ctx-open-tools')?.addEventListener('click', () => {
      ctxMenu.style.display = 'none';
      openWindow('tools');
    });
    document.getElementById('ctx-open-flag')?.addEventListener('click', () => {
      ctxMenu.style.display = 'none';
      openWindow('editor', { filename: 'flag.txt', content: currentFlag });
      openWindow('term');
      runCommand('cat /root/flag.txt');
    });
    document.getElementById('ctx-open-targets')?.addEventListener('click', () => {
      ctxMenu.style.display = 'none';
      openWindow('editor', { filename: 'targets.txt', content: targetsText });
      openWindow('term');
      runCommand('cat targets.txt');
    });
    document.getElementById('ctx-desktop-refresh')?.addEventListener('click', () => {
      ctxMenu.style.display = 'none';
      toast('Refreshed Kali Desktop Environment.');
    });
  }

  // Quick file clicks inside Thunar File Manager
  document.getElementById('f-flag')?.addEventListener('click', () => {
    openWindow('editor', { filename: 'flag.txt', content: currentFlag });
    openWindow('term');
    runCommand('cat /root/flag.txt');
  });
  document.getElementById('f-targets')?.addEventListener('click', () => {
    openWindow('editor', { filename: 'targets.txt', content: targetsText });
    openWindow('term');
    runCommand('cat targets.txt');
  });
  document.getElementById('f-exploits')?.addEventListener('click', () => {
    openWindow('term');
    runCommand('ls -la exploits');
  });
  document.getElementById('f-wordlists')?.addEventListener('click', () => {
    openWindow('term');
    runCommand('ls -la wordlists');
  });
  document.getElementById('f-history')?.addEventListener('click', () => {
    openWindow('term');
    runCommand('history || cat .bash_history');
  });
  document.getElementById('f-notes')?.addEventListener('click', () => {
    openWindow('editor', { filename: 'notes.txt', content: 'Cyber Lab Security Audit Notes:\n- Review authorization mechanisms on /admin\n- Test SQL injection payload on /login\n- Retrieve root flag' });
  });

  // Browser Window Actions
  document.getElementById('kali-scan-target-btn')?.addEventListener('click', () => {
    openWindow('term');
    runCommand('nmap 10.10.0.10');
  });
  document.getElementById('kali-sqli-btn')?.addEventListener('click', () => {
    openWindow('term');
    runCommand('sqlmap -u http://10.10.0.10:8080/ --batch');
  });
  document.getElementById('kali-hydra-btn')?.addEventListener('click', () => {
    openWindow('term');
    runCommand('hydra -l admin -P wordlists 10.10.0.10 ssh');
  });
  document.getElementById('kali-curl-btn')?.addEventListener('click', () => {
    openWindow('term');
    runCommand('curl -i http://10.10.0.10:8080/login');
  });
  document.getElementById('kali-browser-refresh')?.addEventListener('click', () => {
    toast('Refreshing Chromium Target Portal...');
  });

  // Offensive Tools Search & Category Filter
  let activeToolCat = 'all';
  const toolsSearch = document.getElementById('kali-tools-search');
  if (toolsSearch) {
    toolsSearch.addEventListener('input', () => {
      filterToolCards();
    });
  }

  document.querySelectorAll('#kali-tool-filter-tags .kali-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#kali-tool-filter-tags .kali-filter-btn').forEach(b => {
        b.classList.remove('active');
        b.style.background = 'rgba(255,255,255,0.05)';
        b.style.color = '#7e95a9';
        b.style.borderColor = 'rgba(255,255,255,0.1)';
      });
      btn.classList.add('active');
      btn.style.background = 'rgba(0,240,255,0.2)';
      btn.style.color = '#00f0ff';
      btn.style.borderColor = 'rgba(0,240,255,0.4)';
      activeToolCat = btn.getAttribute('data-cat') || 'all';
      filterToolCards();
    });
  });

  function filterToolCards() {
    const q = (document.getElementById('kali-tools-search')?.value || '').toLowerCase().trim();
    document.querySelectorAll('#kali-tools-cards-container .kali-tool-card').forEach(card => {
      const cat = card.getAttribute('data-cat');
      const text = card.textContent.toLowerCase();
      const matchCat = (activeToolCat === 'all' || cat === activeToolCat);
      const matchSearch = (!q || text.includes(q));
      card.style.display = (matchCat && matchSearch) ? 'block' : 'none';
    });
  }

  // Quick Tool Run buttons
  document.querySelectorAll('.tool-quick-run').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) {
        openWindow('term');
        runCommand(cmd);
      }
    });
  });

  // Quick Pills inside Desktop Terminal
  document.querySelectorAll('.kali-term-pill').forEach((pill) => {
    const cmd = pill.getAttribute('data-run');
    if (cmd) {
      pill.addEventListener('click', () => {
        openWindow('term');
        runCommand(cmd);
      });
    }
  });

  // Terminal Menubar Actions
  document.getElementById('term-menu-file')?.addEventListener('click', () => {
    saveTerminalProgress({ downloadFile: true, notify: true });
  });

  // Kali desktop terminal quick pill - Save Log
  document.getElementById('kali-term-save-log-pill')?.addEventListener('click', () => {
    saveTerminalProgress({ downloadFile: true, notify: true });
  });
  document.getElementById('term-menu-edit')?.addEventListener('click', () => {
    toast('Shortcuts: Ctrl+C (Interrupt), Ctrl+L (Clear), Tab (Autocomplete)');
  });
  document.getElementById('term-menu-view')?.addEventListener('click', () => {
    const termWin = document.getElementById('kali-win-term');
    if (termWin) toggleMaximize(termWin);
  });
  document.getElementById('term-menu-search')?.addEventListener('click', () => {
    document.getElementById('kali-desk-term-input')?.focus();
  });
  document.getElementById('term-menu-term')?.addEventListener('click', () => {
    runCommand('clear');
  });
  document.getElementById('term-menu-help')?.addEventListener('click', () => {
    runCommand('help');
  });

  // Mousepad Text Editor Buttons
  document.getElementById('kali-editor-copy')?.addEventListener('click', () => {
    const content = document.getElementById('kali-editor-content')?.value || '';
    navigator.clipboard.writeText(content).then(() => {
      toast('Copied file contents to clipboard!');
    }).catch(() => {
      toast('Selected text ready to copy.');
    });
  });

  document.getElementById('kali-editor-submit-flag')?.addEventListener('click', () => {
    const flagInput = document.getElementById('flag');
    if (flagInput) {
      flagInput.value = currentFlag;
      toast('Flag loaded into submission input.');
      document.getElementById('flagform')?.requestSubmit();
    }
  });

  // Desktop Terminal Form Handler with Command History
  const termForm = document.getElementById('kali-desk-term-form');
  const termInput = document.getElementById('kali-desk-term-input');
  const termOutput = document.getElementById('kali-desk-term-output');

  if (termForm && termInput && termOutput) {
    termOutput.scrollTop = termOutput.scrollHeight;
    if (wsState.term) {
      setTimeout(() => termInput.focus(), 80);
    }

    const cmdHistory = [];
    let historyIdx = -1;

    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (cmdHistory.length === 0) return;
        if (historyIdx === -1) historyIdx = cmdHistory.length - 1;
        else if (historyIdx > 0) historyIdx--;
        termInput.value = cmdHistory[historyIdx] || '';
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (cmdHistory.length === 0) return;
        if (historyIdx < cmdHistory.length - 1 && historyIdx !== -1) {
          historyIdx++;
          termInput.value = cmdHistory[historyIdx] || '';
        } else {
          historyIdx = -1;
          termInput.value = '';
        }
      }
    });

    termForm.onsubmit = async (e) => {
      e.preventDefault();
      const val = termInput.value.trim();
      if (!val) return;
      cmdHistory.push(val);
      historyIdx = -1;
      termInput.value = '';
      await runCommand(val);
    };
  }

  // Bind zoom controls
  bindZoomControls();
  applyZoom(false);
}

function screen(targetContainer = null, desktopTerminal = false) {
  if (activeWs) {
    try { activeWs.close(); } catch (e) {}
    activeWs = null;
  }
  if (activeXterm) {
    try { activeXterm.dispose(); } catch (e) {}
    activeXterm = null;
  }

  const container = targetContainer || $('#screenbody');
  if (!targetContainer && container) {
    container.classList.toggle('has-desktop', tab === 'Desktop');
    container.classList.toggle('ubuntu-terminal', session?.os === 'Ubuntu' && tab === 'Terminal');
    container.classList.toggle('kali-live-terminal', session?.os === 'Kali Linux' && tab === 'Terminal');
  }

  if (tab === 'Terminal' || desktopTerminal) {
    // If xterm.js CDN loaded and we are connected to Live API WebSocket
    if (window.Terminal && isLiveApi && session && session.id) {
      container.innerHTML = `
        <div class="termhead" style="display:flex; justify-content:space-between; align-items:center;">
          <span>${session.os === 'Ubuntu' ? 'Terminal — root@ubuntu: ~' : (session.lab.id === 'linux' ? 'Terminal — learner@kali: ~/lab' : 'Terminal — root@kali: ~')}</span>
          <div style="display:flex; align-items:center; gap:8px;">
            <div class="term-zoom-cluster">
              <button class="term-action-btn" id="term-zoom-out" title="${isModalFullscreen ? 'Zoom Out / Exit Full Screen (Ctrl −)' : 'Zoom Out Terminal Font (Ctrl −)'}">
                <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                <span>Zoom −</span>
              </button>
              <button class="term-zoom-badge zoom-display-val" id="term-zoom-reset" title="Click to Reset Zoom (100%)">${currentZoomPercent}%</button>
              <button class="term-action-btn" id="term-zoom-in" title="${isModalFullscreen ? 'Zoom In Font (Ctrl +)' : 'Zoom In to Full Screen (Ctrl +)'}">
                <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                <span>Zoom +</span>
              </button>
              <button class="term-action-btn" id="term-zoom-fullscreen" title="${isModalFullscreen ? 'Exit Full Screen (Esc)' : 'Zoom In to Full Screen'}" style="color:var(--cyan);">
                <span style="font-size:11px;">${isModalFullscreen ? '⛷' : '⛶'}</span>
              </button>
            </div>
            <button class="term-save-btn" id="xterm-save-btn" title="Save terminal progress and download transcript (.txt)" style="font-size:11px; padding:2px 8px;"><span>💾</span> Save Log</button>
            <button id="reconnect-term-btn" style="font-size:11px; padding:2px 8px; border-radius:4px; background:rgba(0,240,255,0.15); border:1px solid rgba(0,240,255,0.3); color:var(--cyan); cursor:pointer;">↺ Reconnect</button>
            <span style="font-size:10px; color:#8fab51;">${session.os === 'Ubuntu' ? '● Live Ubuntu shell' : '● Live Kali shell'}</span>
          </div>
        </div>
        ${['linux', 'recon', 'web'].includes(session.lab.id) && session.os === 'Kali Linux' ? `<details style="padding:12px; color:#c6d0e0;"><summary>${escapeHtml(session.lab.name)} · installed tools</summary><p style="line-height:1.8; margin-top:8px;">Run <code>kali-tools ${session.lab.id === 'linux' ? 'linux' : session.lab.id}</code> to list installed packages and versions, or <code>kali-tools all</code> for all three collections. Use <code>dpkg -L &lt;package&gt;</code> to locate its commands.</p><p>Bash, scripts, pipelines, and sudo are available. Graphical tools require a real desktop display.</p></details>` : ''}
        <div id="xterm-container" style="min-height:380px; height:100%; background:${session.os === 'Ubuntu' ? '#300a24' : '#17191f'}; border-radius:6px; padding:8px; overflow:hidden;"></div>
      `;

      try {
        const term = new window.Terminal({
          cursorBlink: true,
          fontFamily: session.os === 'Ubuntu' ? '"Ubuntu Mono", "DejaVu Sans Mono", monospace' : 'ui-monospace, monospace',
          fontSize: currentTermFontSize,
          theme: session.os === 'Ubuntu' ? {
            background: '#300a24', foreground: '#eeeeec', cursor: '#eeeeec',
            selectionBackground: '#ffffff40', black: '#2e3436', red: '#cc0000',
            green: '#4e9a06', yellow: '#c4a000', blue: '#3465a4', magenta: '#75507b',
            cyan: '#06989a', white: '#d3d7cf', brightBlack: '#555753',
            brightRed: '#ef2929', brightGreen: '#8ae234', brightYellow: '#fce94f',
            brightBlue: '#729fcf', brightMagenta: '#ad7fa8', brightCyan: '#34e2e2', brightWhite: '#eeeeec'
          } : {
            background: '#17191f',
            foreground: '#e6e6e6',
            cursor: '#ffffff',
            selectionBackground: '#367bf050',
            blue: '#367bf0', brightBlue: '#61afef',
            red: '#e06c75', green: '#98c379'
          }
        });
        const fitAddon = window.FitAddon ? new window.FitAddon.FitAddon() : null;
        if (fitAddon) term.loadAddon(fitAddon);

        term.open($('#xterm-container'));
        if (fitAddon) fitAddon.fit();

        const wsProto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsHost = (window.location.protocol === 'file:' || window.location.port === '8088')
          ? `${window.location.hostname || 'localhost'}:3001`
          : (window.location.host || 'localhost:3001');
        let ws = new WebSocket(`${wsProto}//${wsHost}/ws/terminal/${session.id}`);

        let isReconnecting = false;
        const reconnect = async () => {
          if (isReconnecting) return;
          isReconnecting = true;
          term.write('\r\n\x1b[33m[Cyber Lab] Synchronizing live container environment...\x1b[0m\r\n');
          try {
            const res = await fetch(`${API_BASE}/api/sessions`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ labId: session.lab.id, os: session.os })
            });
            if (res.ok) {
              const data = await res.json();
              session.id = data.id;
              session.dynamicFlag = data.dynamicFlag;
              try { if (ws && ws.readyState === WebSocket.OPEN) ws.close(); } catch (e) {}
              const newWs = new WebSocket(`${wsProto}//${wsHost}/ws/terminal/${session.id}`);
              newWs.onmessage = evt => {
                term.write(evt.data);
                syncSessionObjectives();
              };
              newWs.onopen = () => {
                term.write('\r\n\x1b[32m[Cyber Lab] Terminal reconnected.\x1b[0m\r\n');
              };
              newWs.onerror = () => {
                term.write('\r\n\x1b[31m[Cyber Lab] Terminal connection error.\x1b[0m\r\n');
              };
              ws = newWs;
              activeWs = newWs;
            }
          } catch (e) {
            console.error('Failed to auto-reconnect terminal session:', e);
          } finally {
            isReconnecting = false;
          }
        };

        const reconnectBtn = $('#reconnect-term-btn');
        if (reconnectBtn) {
          reconnectBtn.onclick = () => reconnect();
        }

        term.onData(data => {
          const currentWs = activeWs || ws;
          if (currentWs && currentWs.readyState === WebSocket.OPEN) {
            currentWs.send(data);
          }
        });

        ws.onmessage = e => {
          if (typeof e.data === 'string' && e.data.includes('Session not found or inactive')) {
            reconnect();
            return;
          }
          term.write(e.data);
          // Check for objective completion triggers
          syncSessionObjectives();
        };

        ws.onerror = () => {
          term.write('\r\n\x1b[33m[Error] Live terminal unavailable. Check the backend and reconnect.\x1b[0m\r\n');
        };

        activeXterm = term;
        activeFitAddon = fitAddon;
        activeWs = ws;
        bindZoomControls();
        applyZoom(false);
        $('#xterm-save-btn')?.addEventListener('click', () => saveTerminalProgress({ downloadFile: true, notify: true }));
        return;
      } catch (err) {
        console.error('Error instantiating xterm.js:', err);
      }
    }

    // Default High-Fidelity Shell
    container.innerHTML = `
      <div class="termhead" style="display:flex; justify-content:space-between; align-items:center;">
        <span>${session.os === 'Ubuntu' ? 'ubuntu' : 'kali'}@cyberlab: ~/lab</span>
        <div style="display:flex; align-items:center; gap:8px;">
          <div class="term-zoom-cluster">
            <button class="term-action-btn" id="term-zoom-out" title="${isModalFullscreen ? 'Zoom Out / Exit Full Screen (Ctrl −)' : 'Zoom Out Terminal Font (Ctrl −)'}">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              <span>Zoom −</span>
            </button>
            <button class="term-zoom-badge zoom-display-val" id="term-zoom-reset" title="Click to Reset Zoom (100%)">${currentZoomPercent}%</button>
            <button class="term-action-btn" id="term-zoom-in" title="${isModalFullscreen ? 'Zoom In Font (Ctrl +)' : 'Zoom In to Full Screen (Ctrl +)'}">
              <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              <span>Zoom +</span>
            </button>
            <button class="term-action-btn" id="term-zoom-fullscreen" title="${isModalFullscreen ? 'Exit Full Screen (Esc)' : 'Zoom In to Full Screen'}" style="color:var(--cyan);">
              <span style="font-size:11px;">${isModalFullscreen ? '⛷' : '⛶'}</span>
            </button>
          </div>
          <button class="term-save-btn" id="local-term-save-btn" title="Save terminal progress and download transcript (.txt)" style="font-size:11px; padding:2px 8px;"><span>💾</span> Save Log</button>
          <span style="font-size:11px; color:var(--cyan); font-family:var(--font-mono); letter-spacing:0.06em;">● TTY0 SESSION ONLINE</span>
        </div>
      </div>
      <div class="terminaloutput" id="output"></div>
      <form class="terminalform" id="terminal">
        <label for="command">learner@cyberlab:~$</label>
        <input id="command" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Terminal command">
      </form>
    `;
    $('#output').textContent = session.output.join('\n');
    $('#output').scrollTop = $('#output').scrollHeight;
    $('#local-term-save-btn')?.addEventListener('click', () => saveTerminalProgress({ downloadFile: true, notify: true }));
    $('#terminal').onsubmit = e => {
      e.preventDefault();
      runCommand($('#command').value);
    };
  } else if (tab === 'Desktop') {
    if (session.os === 'Ubuntu') renderUbuntuDesktop(container);
    else renderLiveKaliDesktop(container);
  } else if (tab === 'Code editor') {
    container.innerHTML = `
      <div class="idefile">
        <span>EXPLORER / lab / config.yml</span>
        <span id="saved" style="margin-left:auto; color:#a1b87c;">Integrated code-server (:8443)</span>
      </div>
      <textarea class="editor" id="editor" aria-label="Edit lab configuration" spellcheck="false"></textarea>
      <div class="ideactions">
        <button class="primary" id="save-code">Save changes</button>
      </div>
    `;
    $('#editor').value = session.code;
    $('#editor').oninput = () => {
      session.code = $('#editor').value;
      $('#saved').textContent = '· Unsaved changes';
    };
    $('#save-code').onclick = () => {
      $('#saved').textContent = '· Saved to container';
      toast('Configuration saved in this session.');
    };
  } else if (tab === 'Command history') {
    renderInlineCommandHistory(container);
  } else if (tab === 'My sessions') {
    renderInlineSessionHistory(container);
  }

  bindZoomControls();
  applyZoom(false);
}

function updateDrawerCmdList() {
  const drawerList = $('#drawer-cmd-list');
  if (!drawerList) return;
  const cmds = getCommandHistoryLog().slice(0, 8);
  if (cmds.length === 0) {
    drawerList.innerHTML = '<div style="color:var(--text-muted); font-size:12px; padding:8px 0;">No commands executed in this session yet.</div>';
    return;
  }
  drawerList.innerHTML = cmds.map(c => `
    <div class="cmd-history-item" style="padding:6px 12px;">
      <div style="display:flex; align-items:center; gap:8px; overflow:hidden; flex:1;">
        <span style="color:var(--text-muted); font-size:10.5px; font-family:var(--font-mono);">${new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        <code class="cmd-snippet-pill" style="font-size:11.5px; padding:2px 8px;">${escapeHtml(c.command)}</code>
      </div>
      <div style="display:flex; gap:6px; flex-shrink:0;">
        <button class="secondary" style="font-size:10.5px; padding:2px 6px;" onclick="copyToClipboard('${escapeJs(c.command)}')">Copy</button>
        <button class="primary" style="font-size:10.5px; padding:2px 6px;" onclick="executeCommandInShell('${escapeJs(c.command)}')">Run ↗</button>
      </div>
    </div>
  `).join('');
}

function renderInlineCommandHistory(container) {
  const cmds = getCommandHistoryLog();
  container.innerHTML = `
    <div style="padding:20px; display:flex; flex-direction:column; gap:16px; height:100%; overflow-y:auto;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div>
          <h2 style="font-size:18px; color:#fff; margin:0 0 4px 0;">Command History & Audit Trail</h2>
          <div style="color:var(--text-muted); font-size:12px;">Log of all commands issued across active and previous container sessions</div>
        </div>
        <div style="display:flex; gap:8px;">
          <input type="text" id="inline-cmd-search" placeholder="Search commands..." style="background:rgba(0,0,0,0.4); border:1px solid var(--border-subtle); border-radius:4px; padding:6px 12px; color:#fff; font-size:12.5px; width:220px;">
          <button class="secondary" id="inline-export-cmd" style="font-size:12px; padding:6px 12px;">Export</button>
        </div>
      </div>

      <div id="inline-cmd-feed" class="cmd-history-feed"></div>
    </div>
  `;

  const searchInput = $('#inline-cmd-search');
  const feed = $('#inline-cmd-feed');
  const exportBtn = $('#inline-export-cmd');

  if (exportBtn) exportBtn.onclick = () => exportAuditLog();

  const renderFeed = (filterText = '') => {
    const q = filterText.toLowerCase().trim();
    const filtered = q ? cmds.filter(c => c.command.toLowerCase().includes(q) || (c.labName && c.labName.toLowerCase().includes(q))) : cmds;
    if (filtered.length === 0) {
      feed.innerHTML = `
        <div style="text-align:center; padding:40px 20px; color:var(--text-muted); font-size:13.5px;">
          No matching commands found.
        </div>
      `;
      return;
    }
    feed.innerHTML = filtered.map(c => `
      <div class="cmd-history-item">
        <div style="display:flex; align-items:center; gap:10px; overflow:hidden; flex:1;">
          <span style="font-family:var(--font-mono); font-size:11px; color:var(--text-muted); flex-shrink:0;">${new Date(c.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          <span class="session-os-badge kali" style="font-size:10px; padding:1px 6px; flex-shrink:0;">${escapeHtml(c.labName || 'Linux lab')}</span>
          <code class="cmd-snippet-pill">${escapeHtml(c.prompt || '')}${escapeHtml(c.command)}</code>
        </div>
        <div style="display:flex; gap:8px; flex-shrink:0;">
          <button class="secondary" style="font-size:11.5px; padding:3px 10px;" onclick="copyToClipboard('${escapeJs(c.command)}')">Copy 📋</button>
          <button class="primary" style="font-size:11.5px; padding:3px 10px;" onclick="executeCommandInShell('${escapeJs(c.command)}')">Run in Shell ↗</button>
        </div>
      </div>
    `).join('');
  };

  renderFeed();
  if (searchInput) {
    searchInput.oninput = () => renderFeed(searchInput.value);
  }
}

function renderInlineSessionHistory(container) {
  const sessions = getSessionHistory();
  container.innerHTML = `
    <div style="padding:20px; display:flex; flex-direction:column; gap:16px; height:100%; overflow-y:auto;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div>
          <h2 style="font-size:18px; color:#fff; margin:0 0 4px 0;">All My Sessions</h2>
          <div style="color:var(--text-muted); font-size:12px;">Review current active session and past laboratory runs</div>
        </div>
        <button class="secondary" id="inline-export-sessions" style="font-size:12px; padding:6px 12px;">Export Audit JSON</button>
      </div>

      <table class="session-history-table">
        <thead>
          <tr>
            <th>Lab & Container ID</th>
            <th>Operating System</th>
            <th>Status</th>
            <th>Duration</th>
            <th>Objectives</th>
            <th>Captured Flag</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${sessions.map(s => `
            <tr>
              <td>
                <div style="font-weight:600; color:#fff;">${escapeHtml(s.labName)}</div>
                <code style="font-size:10.5px; color:var(--text-muted);">${s.id}</code>
              </td>
              <td>
                <span class="session-os-badge ${s.os === 'Ubuntu' ? 'ubuntu' : 'kali'}">${s.os}</span>
              </td>
              <td>
                <span class="session-status-pill ${s.status}">● ${s.status.toUpperCase()}</span>
              </td>
              <td style="font-family:var(--font-mono); font-size:11.5px; color:var(--text-secondary);">
                ${s.durationMinutes ? `${s.durationMinutes}m` : (s.status === 'active' ? 'Active now' : '—')}
              </td>
              <td>
                <span style="font-family:var(--font-mono); font-weight:bold; color:${s.objectivesCompleted >= 3 ? '#34d399' : 'var(--cyan)'};">
                  ${s.objectivesCompleted || 0} / ${s.totalObjectives || 3}
                </span>
              </td>
              <td>
                ${s.flagCaptured ? `<code style="font-size:10.5px; color:#34d399; background:rgba(16,185,129,0.1); padding:2px 6px; border-radius:3px;">${escapeHtml(s.flagCaptured)}</code>` : '<span style="color:var(--text-muted); font-size:11.5px;">Not captured</span>'}
              </td>
              <td>
                ${s.id === (session && session.id)
                  ? `<button class="primary" style="font-size:11.5px; padding:3px 10px;" onclick="tab='Terminal'; document.querySelectorAll('[data-tab]').forEach(b => b.classList.toggle('active', b.dataset.tab === 'Terminal')); screen();">Current ↗</button>`
                  : `<button class="secondary" style="font-size:11.5px; padding:3px 10px;" onclick="openLaunch('${s.labId}')">Relaunch ↗</button>`
                }
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  const exportBtn = $('#inline-export-sessions');
  if (exportBtn) exportBtn.onclick = () => exportAuditLog();
}

async function syncSessionObjectives() {
  if (!isLiveApi || !session || !session.id) return;
  try {
    const res = await fetch(`${API_BASE}/api/sessions/${session.id}`);
    if (res.ok) {
      const live = await res.json();
      if (JSON.stringify(live.completedObjectives) !== JSON.stringify(session.done)) {
        session.done = live.completedObjectives || [];
        updateObjectivesUI();
      }
    }
  } catch (e) {}
}

function updateObjectivesUI() {
  const count = $('#obj-count');
  const bar = $('#obj-progress');
  const list = $('#objectives-list');
  if (count) count.textContent = `${session.done.length} of 3 completed`;
  if (bar) bar.style.width = `${(session.done.length / 3) * 100}%`;
  if (list) {
    list.innerHTML = session.lab.tasks.map((t, i) => `
      <div class="objective ${session.done.includes(i) ? 'done' : ''}">
        <strong><span class="checkcircle">${session.done.includes(i) ? '✓' : '○'}</span>${t}</strong>
        <p>${i === 2 ? 'Read the flag file, then submit the flag below.' : 'Try this command in the terminal.'}</p>
        <code class="cmd-snippet" data-cmd="${session.lab.commands[i]}" title="Click to insert into terminal">${session.lab.commands[i]}</code>
      </div>
    `).join('');
    bindSnippetClicks();
  }
}

function bindSnippetClicks() {
  document.querySelectorAll('.cmd-snippet').forEach(codeEl => {
    codeEl.style.cursor = 'pointer';
    codeEl.onclick = () => {
      const input = $('#command');
      if (input) {
        input.value = codeEl.dataset.cmd;
        input.focus();
        toast(`Loaded into terminal: ${codeEl.dataset.cmd}`);
      }
    };
  });
}

function complete(i) {
  if (!session.done.includes(i)) {
    session.done.push(i);
    session.done.sort((a, b) => a - b);
    totalObjectives++;
  }
  if (session.done.length >= 3 && !history.some(h => h.id === session.lab.id)) {
    const completedRecord = {
      id: session.lab.id,
      name: session.lab.name,
      os: session.os,
      flagCaptured: session.dynamicFlag || session.lab.flag,
      completedAt: Date.now()
    };
    history.push(completedRecord);
    try {
      localStorage.setItem(KEY_COMPLETED_HISTORY, JSON.stringify(history));
    } catch (e) {}
    toast(`🎉 Lab Completed: ${session.lab.name}! All objectives mastered.`);
  }
  recordSessionProgress(session);
  updateObjectivesUI();
}

function updateTermDisplay() {
  const deskOutput = document.getElementById('kali-desk-term-output');
  if (deskOutput) {
    deskOutput.textContent = session.output.join('\n');
    deskOutput.scrollTop = deskOutput.scrollHeight;
  }
  const mainOutput = document.getElementById('output');
  if (mainOutput) {
    mainOutput.textContent = session.output.join('\n');
    mainOutput.scrollTop = mainOutput.scrollHeight;
  }
  updateObjectivesUI();
}

function simulateKaliTool(cmd, session) {
  if (!cmd) return null;
  let normalized = cmd.trim();
  if (normalized.startsWith('sudo ')) {
    normalized = normalized.slice(5).trim();
  }
  if (normalized.startsWith('get ')) {
    normalized = 'apt-get ' + normalized.slice(4).trim();
  }
  const parts = normalized.split(/\s+/);
  const tool = parts[0].toLowerCase();
  const flag = session?.dynamicFlag || (session?.lab && session?.lab.flag) || 'CYBERLAB{kali_full_offensive_mastery_2026}';
  const targetIp = '10.10.0.10';
  const targetHost = 'target.lab';
  const myIp = '10.10.0.2';

  if (tool === 'sudo') {
    return `usage: sudo -h | -K | -k | -V\nusage: sudo -v [-ABkNnS] [-g group] [-h host] [-p prompt] [-u user]\nusage: sudo -l [-ABkNnS] [-g group] [-h host] [-p prompt] [-U user] [-u user] [command]\nusage: sudo [-AbEHkNnPS] [-C num] [-D directory] [-g group] [-h host] [-p prompt] [-u user] [command]`;
  }

  // 0. PACKAGE MANAGEMENT (APT, APT-GET)
  if (tool === 'apt' || tool === 'apt-get' || tool === 'get') {
    const action = (parts[1] || '').toLowerCase();
    if (action === 'update') {
      return `Hit:1 http://http.kali.org/kali kali-rolling InRelease\nReading package lists... Done\nBuilding dependency tree... Done\nReading state information... Done\nAll packages are up to date.`;
    }
    if (action === 'upgrade') {
      return `Reading package lists... Done\nBuilding dependency tree... Done\nReading state information... Done\nCalculating upgrade... Done\n0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.`;
    }
    if (action === 'install') {
      const pkgs = parts.slice(2).filter(p => !p.startsWith('-')).join(' ') || 'security-tools';
      return `Reading package lists... Done\nBuilding dependency tree... Done\nReading state information... Done\nThe following NEW packages will be installed:\n  ${pkgs}\n0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.\nNeed to get 14.2 MB of archives.\nAfter this operation, 48.6 MB of additional disk space will be used.\nGet:1 http://http.kali.org/kali kali-rolling/main amd64 ${pkgs} [14.2 MB]\nFetched 14.2 MB in 0s (32.4 MB/s)\nSelecting previously unselected package ${pkgs}.\n(Reading database ... 245120 files and directories currently installed.)\nPreparing to unpack .../${pkgs}.deb ...\nUnpacking ${pkgs} ...\nSetting up ${pkgs} ...\nProcessing triggers for man-db (2.12.0-1) ...`;
    }
    return `apt 2.9.3 (amd64)\nUsage: apt [options] command\n\nCommands:\n  update - update list of available packages\n  upgrade - upgrade the system by installing/upgrading packages\n  install - install packages\n  remove - remove packages\n  search - search in package descriptions`;
  }

  // 1. RECON & OSINT
  if (tool === 'nmap') {
    if (parts.length === 1 || parts.includes('-h') || parts.includes('--help')) {
      return `Nmap 7.94SVN ( https://nmap.org )
Usage: nmap [Scan Type(s)] [Options] {target specification}
TARGET SPECIFICATION:
  Ex: 10.10.0.10, 10.10.0.0/24, target.lab
SCAN TECHNIQUES:
  -sS/sT: TCP SYN/Connect() scan
  -sV: Probe open ports to determine service/version info
  -sC: Equivalent to --script=default
  -p <port ranges>: Only scan specified ports (-p- for all 65535 ports)
EXAMPLES:
  nmap -sV -sC -p 22,80,8080 10.10.0.10`;
    }
    const isAll = normalized.includes('-p-');
    const isAgg = normalized.includes('-A') || (normalized.includes('-sV') && normalized.includes('-sC'));
    let p = `PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 9.6p1 Debian 4
80/tcp   open  http        nginx 1.24.0 (Cyber Lab Gateway)
8080/tcp open  http-proxy  Werkzeug/3.0.1 Python/3.12 (Vulnerable Demo App)
5432/tcp open  postgresql  PostgreSQL 16.2`;
    if (isAll) p += `\n9090/tcp open  zeus-admin  Cyber Lab Terminal Gateway\nNot shown: 65530 closed tcp ports`;
    let sc = '';
    if (isAgg) sc = `\n| http-title: Cyber Lab Vulnerable Target Service (10.10.0.10:8080)\n| ssh-hostkey: 256 71:92:ea:98:85:2b:86:d3:a6:3d:74:e2:bb:a1:03:19 (ECDSA)\nService Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel`;
    return `Starting Nmap 7.94SVN ( https://nmap.org ) at 2026-09-17 12:00 UTC
Nmap scan report for ${targetHost} (${targetIp})
Host is up (0.00041s latency).
${p}${sc}

Nmap done: 1 IP address (1 host up) scanned in 1.32 seconds`;
  }

  if (tool === 'masscan') {
    return `Starting masscan 1.3.2 (http://bit.ly/14GZzcT) at 2026-09-17 12:00:00 GMT
Initiating SYN Stealth Scan
Discovered open port 22/tcp on ${targetIp}
Discovered open port 80/tcp on ${targetIp}
Discovered open port 8080/tcp on ${targetIp}
Discovered open port 5432/tcp on ${targetIp}
Rate: 10000.00-kpps, 100.00% done, 0:00:01 remaining`;
  }

  if (tool === 'netdiscover') {
    return ` Currently scanning: 10.10.0.0/24   |   Screen View: Unique Hosts                         
 4 Captured ARP Req/Rep packets, from 4 hosts. Total size: 240                 
 _____________________________________________________________________________
   IP            At MAC Address     Count     Len  MAC Vendor / Hostname      
 -----------------------------------------------------------------------------
 10.10.0.1       02:42:0a:0a:00:01      1      60  Gateway Router (Default)   
 10.10.0.2       02:42:0a:0a:00:02      1      60  Kali Workstation (Local)   
 10.10.0.10      02:42:0a:0a:00:0a      1      60  Target Vulnerable Server   
 10.10.0.50      02:42:0a:0a:00:32      1      60  PostgreSQL DB Node`;
  }

  if (tool === 'fping') {
    return `10.10.0.1  is alive (0.24 ms)
10.10.0.2  is alive (0.04 ms)
10.10.0.10 is alive (0.38 ms)
10.10.0.50 is alive (0.42 ms)`;
  }

  if (tool === 'whatweb') {
    return `http://${targetIp}:8080/ [200 OK] Bootstrap[5.3.2], HTML5, HTTPServer[Werkzeug/3.0.1 Python/3.12], IP[${targetIp}], Python[3.12.2], Title[Cyber Lab Target Application], X-Powered-By[Flask/Python]`;
  }

  if (tool === 'wafw00f') {
    return `~ WAFW00F : v2.2.0 ~
[*] Checking http://${targetIp}:8080/
[+] The site http://${targetIp}:8080/ is behind an unprotected reverse proxy (nginx 1.24.0).
[~] No Cloudflare/CloudFront/ModSecurity WAF detected. Direct exploitation possible.`;
  }

  if (tool === 'theharvester') {
    return `theHarvester 4.4.4 - Coded by Christian Martorella
[*] Target: cyberlab.io
[*] Searching Google, Bing, Yahoo...
[*] Emails found:
admin@cyberlab.io
operator@cyberlab.io
security@cyberlab.io
kartik@cyberlab.io
[*] Hosts found:
target.lab (10.10.0.10)
db.lab (10.10.0.50)
gateway.lab (10.10.0.1)`;
  }

  if (tool === 'amass' || tool === 'sublist3r') {
    return `[+] Subdomain Enumeration Completed for cyberlab.io
  admin.cyberlab.io
  api.cyberlab.io
  target.lab
  db.lab
[+] Total unique subdomains discovered: 4`;
  }

  if (tool === 'enum4linux') {
    return `Starting enum4linux v0.9.1 on ${targetIp}
[+] Server allows anonymous SMB sessions
[+] Discovered Share: IPC$ (IPC Service)
[+] Discovered Share: public (Read/Write Guest Share)
[+] Users found: admin, guest, learner, operator`;
  }

  if (tool === 'dig' || tool === 'nslookup' || tool === 'dnsenum' || tool === 'whois') {
    if (tool === 'whois') {
      return `Domain Name: CYBERLAB.IO
Registry Domain ID: D503300000000000000-LROR
Updated Date: 2026-01-15T00:00:00Z
Creation Date: 2024-03-12T00:00:00Z
Registrant Organization: Cyber Lab Range Systems
Name Server: NS1.CYBERLAB.IO`;
    }
    return `; <<>> DiG 9.18.24-1-Debian <<>> ${parts[1] || targetHost}
;; ANSWER SECTION:
${parts[1] || targetHost}.	300	IN	A	10.10.0.10
;; Query time: 1 msec
;; SERVER: 10.10.0.1#53(10.10.0.1)`;
  }

  // 2. WEB APPLICATION SECURITY
  if (tool === 'sqlmap') {
    if (parts.length === 1 || parts.includes('-h') || parts.includes('--help')) {
      return `        ___
       __H__
 ___ ___["]_____ ___ ___  {1.8.5#stable}
|_ -| . [)]     | .'| . |
|___|_  ["]_|_|_|__,|  _|
      |_|V...       |_|   https://sqlmap.org
Usage: python3 sqlmap.py [options]
  -u URL, --url=URL     Target URL (e.g. "http://10.10.0.10:8080/?id=1")
  --dbs                 Enumerate DBMS databases
  --tables              Enumerate DBMS database tables
  --dump                Dump DBMS database table entries
  --batch               Never ask for user input`;
    }
    if (normalized.includes('--dbs')) {
      return `[INFO] testing connection to http://${targetIp}:8080/
[+] parameter 'id' is vulnerable to SQL injection
available databases [3]:
[*] cyberrange_db
[*] information_schema
[*] pg_catalog`;
    }
    if (normalized.includes('--tables') || normalized.includes('--dump')) {
      return `Database: cyberrange_db
Table: users [3 entries]
+----+----------+----------------------------------+-----------------------+
| id | username | password_hash                    | email                 |
+----+----------+----------------------------------+-----------------------+
| 1  | admin    | 5f4dcc3b5aa765d61d8327deb882cf99 | admin@cyberlab.io     |
| 2  | operator | e10adc3949ba59abbe56e057f20f883e | operator@cyberlab.io  |
| 3  | flag     | ${flag} | root@target.lab       |
+----+----------+----------------------------------+-----------------------+`;
    }
    return `[INFO] testing connection to http://${targetIp}:8080/
[+] Parameter: id (GET)
    Type: boolean-based blind
    Payload: id=1 AND 8492=8492
[+] Back-end DBMS: PostgreSQL 16.2
[INFO] Run with '--dbs' or '--dump' to retrieve schema contents.`;
  }

  if (tool === 'nikto') {
    return `- Nikto v2.5.0
+ Target IP:          ${targetIp}
+ Target Port:        8080
+ Server: Werkzeug/3.0.1 Python/3.12.2
+ The anti-clickjacking X-Frame-Options header is not present.
+ Root page directs to: /login
+ /admin/: Admin console directory indexing enabled (HTTP 301).
+ /flag.txt: Sensitive file found exposed (HTTP 200).
+ 7892 requests made in 3.4 seconds.`;
  }

  if (tool === 'gobuster') {
    return `===============================================================
Gobuster v3.6 - Directory Enumeration Mode
===============================================================
[+] Url:         http://${targetIp}:8080/
[+] Wordlist:    /usr/share/wordlists/dirb/common.txt
===============================================================
/admin               (Status: 301) [Size: 178]
/api                 (Status: 200) [Size: 42]
/login               (Status: 200) [Size: 1845]
/flag.txt            (Status: 200) [Size: 38]
/targets.txt         (Status: 200) [Size: 312]
===============================================================`;
  }

  if (tool === 'dirb') {
    return `DIRB v2.22 By DarkRaider
URL_BASE: http://${targetIp}:8080/
==> DIRECTORY: http://${targetIp}:8080/admin/
+ http://${targetIp}:8080/api (CODE:200|SIZE:42)
+ http://${targetIp}:8080/flag.txt (CODE:200|SIZE:38)
+ http://${targetIp}:8080/login (CODE:200|SIZE:1845)
DOWNLOADED: 4612 - FOUND: 3`;
  }

  if (tool === 'ffuf') {
    return `        /'___\\  /'___\\           /'___\\       
       /\\ \\__/ /\\ \\__/  __  __  /\\ \\__/       
       v2.1.0-dev
admin                   [Status: 301, Size: 178, Words: 12]
api                     [Status: 200, Size: 42, Words: 2]
login                   [Status: 200, Size: 1845, Words: 140]
flag.txt                [Status: 200, Size: 38, Words: 1]
:: Progress: [4614/4614] :: 2307 req/sec ::`;
  }

  if (tool === 'wfuzz') {
    return `Wfuzz 3.1.0 - The Web Fuzzer
Target: http://${targetIp}:8080/FUZZ
000000001:   200        45 L     140 W      1845 Ch     "login"
000000002:   301        8 L      12 W       178 Ch      "admin"
000000003:   200        1 L      2 W        42 Ch       "api"
000000004:   200        1 L      1 W        38 Ch       "flag.txt"`;
  }

  if (tool === 'commix') {
    return `Commix v3.8-stable - Automated Command Injection Exploiter
[+] Target: http://${targetIp}:8080/
[+] Parameter 'cmd' is vulnerable to Command Injection!
    Payload: ; cat /root/flag.txt
    Result:  ${flag}`;
  }

  if (tool === 'burpsuite' || tool === 'burp') {
    return `[+] Launching Burp Suite Community Edition v2024.1
[+] Proxy service listening on 127.0.0.1:8080 (Interception Active).
[+] Target Scope: http://${targetIp}:8080/ added to Live Sitemap.`;
  }

  // 3. EXPLOITATION & SHELLS
  if (tool === 'msfconsole') {
    return `  + -- --=[ Metasploit Framework v6.4.12-dev                          ]
  + -- --=[ 2,420 exploits - 1,248 auxiliary - 428 post               ]
  + -- --=[ 1,465 payloads - 47 encoders - 11 nops                    ]
msf6 > use exploit/multi/http/werkzeug_debug_rce
msf6 exploit(multi/http/werkzeug_debug_rce) > set RHOSTS ${targetIp}
msf6 exploit(multi/http/werkzeug_debug_rce) > exploit
[*] Started reverse TCP handler on ${myIp}:4444 
[+] Meterpreter session 1 opened (${myIp}:4444 -> ${targetIp}:48912)
meterpreter > sysinfo
OS      : Linux 6.6.15-amd64
Computer: target-sandbox`;
  }

  if (tool === 'msfvenom') {
    return `msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=${myIp} LPORT=4444 -f elf -o shell.elf
Payload size: 250 bytes
Final size of elf file: 370 bytes
Saved as: shell.elf (Executable ELF binary)`;
  }

  if (tool === 'searchsploit') {
    return `------------------------------------------------------- ---------------------------------
 Exploit Title                                         |  Path
------------------------------------------------------- ---------------------------------
 OpenSSH 9.6p1 - Remote Code Execution (RegreSSHion)    | linux/remote/52079.py
 Werkzeug < 3.0.3 - Debug Console Remote Code Execution | multiple/remote/51982.py
 Linux Kernel 6.6 - Local Privilege Escalation          | linux/local/51901.c
 PostgreSQL 16.x - Arbitrary Code Execution (pg_read)   | linux/remote/49210.py
------------------------------------------------------- ---------------------------------`;
  }

  if (tool === 'crackmapexec' || tool === 'cme' || tool === 'netexec' || tool === 'nxc') {
    return `SMB         10.10.0.10     445    TARGET           [*] Windows 10 / Debian Linux (Samba 4.19)
SMB         10.10.0.10     445    TARGET           [+] target.lab\\admin:password123 (Pwn3d!)
TARGET\\admin:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::`;
  }

  if (tool === 'evil-winrm') {
    return `Evil-WinRM shell v3.5
Info: Establishing WinRM session with ${targetIp}...
*Evil-WinRM* PS C:\\Users\\Administrator> whoami
target\\administrator
*Evil-WinRM* PS C:\\Users\\Administrator> type C:\\flag.txt
${flag}`;
  }

  // 4. PASSWORDS
  if (tool === 'hydra') {
    return `Hydra v9.5 (c) 2023 by van Hauser / THC
[22][ssh] host: ${targetIp}   login: admin   password: password123
1 of 1 target successfully completed, 1 valid password found`;
  }

  if (tool === 'john') {
    return `John the Ripper 1.9.0-jumbo-1 OMP [linux-gnu 64-bit x86_64 AVX2 AC]
Loaded 1 password hash (Raw-MD5, crypt(3) $1$)
password123      (admin)
1g 0:00:00:01 DONE (2026-09-17 12:00) 1.02g/s`;
  }

  if (tool === 'hashcat') {
    return `hashcat (v6.2.6) starting in dictionary attack mode...
Hash-Target: 5f4dcc3b5aa765d61d8327deb882cf99
5f4dcc3b5aa765d61d8327deb882cf99:password
Status...........: Cracked`;
  }

  if (tool === 'crunch') {
    return `Crunch will now generate data:
crunch 4 4 0123456789 -o wordlist.txt
[+] Generated 10,000 candidate words written to wordlist.txt`;
  }

  if (tool === 'cewl') {
    return `CeWL 5.4.8 (Custom Word List generator)
Crawling: http://${targetIp}:8080/
[+] Extracted 148 unique domain-specific passwords.`;
  }

  if (tool === 'hashid' || tool === 'hash-identifier') {
    return `Analyzing hash:
[+] MD5 [Hashcat Mode: 0]
[+] NTLM [Hashcat Mode: 1000]
[+] MD4 [Hashcat Mode: 900]`;
  }

  // 5. WIRELESS
  if (tool === 'aircrack-ng') {
    return `Aircrack-ng 1.7 
[00:00:01] Tested 45,210 keys (got 14,201 IVs)
KEY FOUND! [ 1F:90:3A:4B:5C ] (ASCII: cyberlab2026)
Decrypted correctly: 100%`;
  }

  if (tool === 'airmon-ng') {
    return `PHY	Interface	Driver		Chipset
phy0	wlan0		mac80211_hwsim	Software 802.11 Radiotap Sim
		(monitor mode enabled on wlan0mon)`;
  }

  if (tool === 'airodump-ng') {
    return `CH  6 ][ Elapsed: 12 s ][ 2026-09-17 12:00 
 BSSID              PWR  Beacons    #Data   CH  ENC  AUTH ESSID
 02:00:00:00:01:00  -42       24       128   6  WPA2 PSK  CyberLab-Secure-AP`;
  }

  if (tool === 'wifite') {
    return `wifite v2.6.0 automated wireless auditor
[+] Scanning on wlan0mon. Found target AP: CyberLab-Secure-AP
[+] Captured WPA 4-way Handshake!
[+] Cracking handshake with rockyou.txt: Key = 'cyberlab2026'`;
  }

  // 6. SNIFFING & SPOOFING
  if (tool === 'tcpdump') {
    return `tcpdump: verbose output suppressed, listening on eth0, capture size 262144 bytes
12:00:01.104 IP ${myIp}.45120 > ${targetIp}.8080: Flags [S], seq 1849201
12:00:01.105 IP ${targetIp}.8080 > ${myIp}.45120: Flags [S.], seq 4819203
12:00:01.106 IP ${myIp}.45120 > ${targetIp}.8080: Flags [P.], HTTP: GET / HTTP/1.1
12:00:01.108 IP ${targetIp}.8080 > ${myIp}.45120: Flags [P.], HTTP: HTTP/1.1 200 OK
4 packets captured, 4 packets received by filter`;
  }

  if (tool === 'wireshark' || tool === 'tshark') {
    return `Capturing on 'eth0'
    1 0.000000    ${myIp} → ${targetIp}    TCP 74 45120 → 8080 [SYN]
    2 0.000102    ${targetIp} → ${myIp}    TCP 74 8080 → 45120 [SYN, ACK]
    3 0.000210    ${myIp} → ${targetIp}    HTTP 208 GET /login HTTP/1.1 
    4 0.000450    ${targetIp} → ${myIp}    HTTP 494 HTTP/1.1 200 OK
4 packets captured`;
  }

  if (tool === 'bettercap' || tool === 'ettercap') {
    return `bettercap v2.32.0 [type 'help' for a list of commands]
[12:00:00] [inf] net.recon discovering hosts on subnet 10.10.0.0/24...
[12:00:01] [inf] arp.spoof started (poisoning ${targetIp} <-> 10.10.0.1)
[12:00:02] [inf] Intercepted credential: admin / password123`;
  }

  if (tool === 'responder') {
    return `Responder v3.1 - LLMNR, NBT-NS and MDNS Poisoner
[+] Listening on eth0 (${myIp})
[+] [LLMNR] Poisoned answer sent to ${targetIp} for name TARGET
[+] [NTLMv2] Captured Hash: admin::TARGET:1122334455667788:A98F7C6B...`;
  }

  // 7. SHELLS & NETWORKING
  if (tool === 'nc' || tool === 'netcat' || tool === 'ncat') {
    if (normalized.includes('-l')) {
      return `Listening on [0.0.0.0] (port 4444)
Connection from ${targetIp}:48912 accepted
root@target:~# whoami
root
root@target:~# cat /root/flag.txt
${flag}`;
    }
    return `Ncat: Version 7.94SVN Connected to ${parts[1] || targetIp}:${parts[2] || '8080'}.
HTTP/1.1 200 OK
Server: Werkzeug/3.0.1 Python/3.12.2`;
  }

  if (tool === 'socat') {
    return `[+] socat TCP-LISTEN:4444,reuseaddr,fork EXEC:/bin/sh
Relaying input/output streams between endpoints.`;
  }

  if (tool === 'chisel') {
    return `2026/09/17 12:00:00 client: Connected to http://${targetIp}:8080
[+] Reverse SOCKS5 tunnel active on 127.0.0.1:1080`;
  }

  // 8. REVERSE & FORENSICS
  if (tool === 'binwalk') {
    return `DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             ELF, 64-bit LSB executable, AMD x86-64
370           0x172           gzip compressed data
1204          0x4B4           POSIX tar archive (GNU)`;
  }

  if (tool === 'exiftool') {
    return `ExifTool Version Number : 12.76
File Name               : target_capture.jpg
Camera Model Name       : Cyber Lab LabCam 4K
Comment                 : Stored Flag: ${flag}`;
  }

  if (tool === 'steghide') {
    return `steghide -- extract -sf flag.jpg
wrote extracted data to "flag.txt".
Contents: ${flag}`;
  }

  if (tool === 'radare2' || tool === 'r2') {
    return ` -- Run r2 with -AA to analyze all referenced code!
[0x00001040]> aaa
[0x00001040]> pdf @ main
|   sym.main ();
|           0x00001150      lea rdi, str.FLAG_IS_${flag}
|           0x00001157      call sym.imp.puts
\\           0x00001162      ret`;
  }

  if (tool === 'ghidra') {
    return `[*] Launching Ghidra Headless Analyzer v11.0.3
[*] Decompiled entry point:
undefined8 main(void) {
    puts("Cyber Lab Offensive Training Binary");
    check_flag("${flag}");
    return 0;
}`;
  }

  if (tool === 'checksec') {
    return `[*] '/root/exploits/shell.elf'
    Arch:     amd64-64-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX unknown
    PIE:      No PIE (0x400000)
    RWX:      Has RWX segments (Exploitable)`;
  }

  if (tool === 'strings') {
    return `/lib64/ld-linux-x86-64.so.2
libc.so.6
puts
Cyber Lab Target Workstation
${flag}`;
  }

  if (tool === 'volatility' || tool === 'vol') {
    return `Volatility 3 Framework 2.5.0
PID	PPID	ImageFileName	CreateTime
1	0	systemd		2026-09-17 12:00:00
4242	1	cyber-backdoor	2026-09-17 12:01:10
[+] Discovered active persistence backdoor process (PID 4242)`;
  }

  // 9. SYSTEM UTILITIES
  if (tool === 'which' || tool === 'whereis') {
    const queried = parts.slice(1).filter(Boolean);
    if (tool === 'which') {
      const items = queried.length ? queried : ['nmap'];
      return items.map(t => `/usr/bin/${t}`).join('\n');
    } else {
      const items = queried.length ? queried : ['nmap'];
      return items.map(t => `${t}: /usr/bin/${t} /usr/share/man/man1/${t}.1.gz`).join('\n');
    }
  }

  if (tool === 'man') {
    const p = parts[1] || 'nmap';
    return `${p.toUpperCase()}(1) - Kali Linux security & pentesting tool\nRun '${p} --help' for complete command flags.`;
  }

  if (tool === 'top' || tool === 'htop') {
    return `top - 12:00:00 up 4 days,  1 user,  load average: 0.08, 0.12, 0.09
Tasks: 128 total,   1 running, 127 sleeping
    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM  COMMAND
      1 root      20   0  168400  12480   8920 S   0.0   0.3  systemd
    101 root      20   0   14210   4100   3200 S   0.0   0.1  bash
    445 root      20   0   84200  18400  12100 S   0.0   0.4  postgres
    808 root      20   0   48120   9200   7400 S   0.0   0.2  nginx
   4242 root      20   0   28900   6100   4800 S   0.0   0.1  cyber-backdoor`;
  }

  if (tool === 'netstat' || tool === 'ss') {
    return `Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      101/sshd            
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      808/nginx           
tcp        0      0 0.0.0.0:8080            0.0.0.0:*               LISTEN      912/python3         
tcp        0      0 0.0.0.0:5432            0.0.0.0:*               LISTEN      445/postgres        
tcp        0      0 127.0.0.1:4444          0.0.0.0:*               LISTEN      1204/nc`;
  }

  if (tool === 'arp') {
    return `Address                  HWtype  HWaddress           Flags Mask            Iface
10.10.0.1                ether   02:42:0a:0a:00:01   C                     eth0
10.10.0.10               ether   02:42:0a:0a:00:0a   C                     eth0
10.10.0.50               ether   02:42:0a:0a:00:32   C                     eth0`;
  }

  if (tool === 'route') {
    return `Kernel IP routing table
Destination     Gateway         Genmask         Flags Iface
default         10.10.0.1       0.0.0.0         UG    eth0
10.10.0.0       0.0.0.0         255.255.255.0   U     eth0`;
  }

  if (tool === 'free') {
    return `               total        used        free      shared  buff/cache   available
Mem:         4194304      698880     2913280       14200      582144     3259904
Swap:        2097152           0     2097152`;
  }

  if (tool === 'df') {
    return `Filesystem     1K-blocks     Used Available Use% Mounted on
overlay         61254320 14829100  43284220  26% /
tmpfs              65536        0     65536   0% /dev`;
  }

  if (tool === 'hostname') return 'kali-cyberlab';
  if (tool === 'uptime') return ' 12:00:00 up 4 days, 2:14, 1 user, load average: 0.08, 0.12, 0.09';
  if (tool === 'date') return new Date().toUTCString();

  // 10. KALI OFFENSIVE SUITE INDEX
  if (tool === 'kali-tools' || tool === 'tools') {
    return `================================================================================
                    KALI LINUX 2024 · OFFENSIVE SECURITY SUITE                   
================================================================================
[01] Recon & OSINT:       nmap, masscan, fping, netdiscover, amass, sublist3r,
                          enum4linux, theharvester, whatweb, wafw00f, whois, dig
[02] Web Vulnerability:   sqlmap, nikto, gobuster, dirb, ffuf, wfuzz, wpscan,
                          burpsuite, commix, zap, cadaver, curl, wget
[03] Exploitation:        msfconsole, msfvenom, searchsploit, crackmapexec,
                          evil-winrm, impacket-psexec, secretsdump, chisel
[04] Password Attacks:    john, hashcat, hydra, medusa, crunch, cewl, hashid
[05] Wireless Attacks:    aircrack-ng, airmon-ng, airodump-ng, wifite, kismet
[06] Sniffing & Spoofing: wireshark, tshark, tcpdump, bettercap, responder,
                          arpspoof, macchanger, ettercap, mitmproxy
[07] Reverse Engineering: ghidra, radare2, r2, gdb, objdump, readelf, strings,
                          checksec, ltrace, strace
[08] Forensics & Carving: volatility, binwalk, exiftool, steghide, autopsy
[09] Network Pivoting:    nc, netcat, socat, ssh, scp, iptables, ufw
================================================================================
Type any tool name followed by '-h' or target (10.10.0.10) to run.`;
  }

  return null;
}

async function runCommand(raw) {
  if (!session) return;
  const rawInput = raw.trim();
  if (!rawInput) return;
  logCommandExecution(rawInput);
  updateDrawerCmdList();
  const l = session.lab;
  const isKali = session.os === 'Kali Linux';
  const promptStr = isKali ? 'root@kali:~# ' : 'learner@cyberlab:~$ ';

  session.output.push(promptStr + rawInput);

  if (isLiveApi && session.id) {
    try {
      const res = await fetch(`${API_BASE}/api/sessions/${session.id}/command`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: rawInput })
      });
      if (res.ok) {
        const data = await res.json();
        session.output.push(data.output.trim());
        if (Array.isArray(data.completedObjectives)) {
          data.completedObjectives.forEach(objIdx => {
            if (!session.done.includes(objIdx)) {
              complete(objIdx);
            }
          });
        }
        session.output = session.output.slice(-160);
        updateTermDisplay();
        if (tab === 'Desktop') {
          window._kaliOpenWindow && window._kaliOpenWindow('term');
          document.getElementById('kali-desk-term-input')?.focus();
        } else {
          $('#command')?.focus();
        }
        return;
      }
    } catch (e) {}
  }

  if (isLiveApi || session.lab.id === 'kali-sandbox') {
    session.output.push(`[Error] The live ${session.os} command could not run. Check the backend and reconnect.`);
    updateTermDisplay();
    return;
  }

  // Local command runner
  let cmd = rawInput.replace(/^(sudo\s+|bash\s+|sh\s+|\.\/|\/bin\/|\/usr\/bin\/)+/i, '').trim();
  let result = '';

  const kaliToolRes = simulateKaliTool(cmd, session);
  if (kaliToolRes) {
    result = kaliToolRes;
  } else if (cmd === 'clear') {
    session.output = [];
  } else if (cmd === 'help') {
    result = `Supported commands:\n  help, clear, whoami, id, uname -a, pwd, ls, ls -la, nmap, kali-tools\n  ${l.commands.join('\n  ')}\n\nEnvironment: Ephemeral sandbox.`;
  } else if (cmd === 'whoami') {
    result = isKali ? 'root' : 'learner';
  } else if (cmd === 'id') {
    result = isKali ? 'uid=0(root) gid=0(root) groups=0(root)' : 'uid=1000(learner) gid=1000(learner)';
  } else if (cmd === 'pwd') {
    result = isKali ? '/root' : '/home/learner/lab';
  } else if (cmd.startsWith('cd')) {
    result = '';
  } else if (cmd.startsWith('echo ')) {
    result = cmd.slice(5).replace(/^["']|["']$/g, '');
  } else if (cmd.startsWith('mkdir ') || cmd.startsWith('touch ') || cmd.startsWith('rm ') || cmd.startsWith('chmod ') || cmd.startsWith('chown ')) {
    result = '';
  } else if (cmd === 'uname' || cmd === 'uname -a') {
    result = isKali
      ? 'Linux kali-cyberlab 6.6.15-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.6.15-1kali1 (2024-02-01) x86_64 GNU/Linux'
      : 'Linux ubuntu-sandbox 6.5.0-28-generic #29-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux';
  } else if (cmd === 'ls' || cmd === 'ls -la' || cmd === 'ls -l' || cmd === 'dir') {
    result = isKali
      ? 'drwxr-xr-x 4 root root 4096 Sep 16 12:00 .\ndrwxr-xr-x 3 root root 4096 Sep 16 11:59 ..\n-rw------- 1 root root  512 Sep 16 12:00 .bash_history\n-rw-r--r-- 1 root root   38 Sep 16 12:00 flag.txt\n-rw-r--r-- 1 root root  312 Sep 16 12:00 targets.txt\ndrwxr-xr-x 2 root root 4096 Sep 16 12:00 exploits\ndrwxr-xr-x 2 root root 4096 Sep 16 12:00 wordlists'
      : 'drwxr-xr-x  learner  lab\n-rw-r--r--  learner  notes.txt\n-rw-r--r--  learner  flag.txt\n-rw-r--r--  learner  config.yml\n-rw-r--r--  learner  auth.log';
  } else if (cmd.startsWith('cat ')) {
    const target = cmd.slice(4).trim();
    if (target.includes('flag.txt')) {
      result = session.dynamicFlag || l.flag;
    } else if (target === 'targets.txt') {
      result = '# Cyber Lab Isolated Lab Network Targets\n10.10.0.1       gateway.lab (Default Gateway)\n10.10.0.2       kali.lab (Workstation - Current Host)\n10.10.0.10      target.lab (Vulnerable Demo Web Application)\n10.10.0.50      db.lab (PostgreSQL 16 DB Server)';
    } else if (target === '/etc/os-release' || target === '/etc/issue') {
      result = 'PRETTY_NAME="Kali GNU/Linux Rolling"\nNAME="Kali GNU/Linux"\nVERSION_ID="2024.1"\nID=kali\nID_LIKE=debian';
    } else if (target === '/etc/passwd') {
      result = 'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nlearner:x:1000:1000:learner,,,:/home/learner:/bin/bash';
    } else if (target === 'notes.txt') {
      result = 'Training application: review input validation and authentication.\nThe application flag is stored in flag.txt.';
    } else if (target === 'auth.log') {
      result = '09:41 sign-in accepted: learner\n09:42 failed sign-in: unknown\n09:43 failed sign-in: unknown';
    } else {
      result = `cat: ${target}: No such file or directory`;
    }
  } else if (cmd.startsWith('apt')) {
    if (cmd.includes('update')) {
      result = 'Get:1 http://http.kali.org/kali kali-rolling InRelease [41.5 kB]\nGet:2 http://http.kali.org/kali kali-rolling/main amd64 Packages [19.8 MB]\nFetched 19.8 MB in 2s (9,900 kB/s)\nReading package lists... Done\nBuilding dependency tree... Done\nAll packages are up to date.';
    } else if (cmd.includes('install')) {
      const pkg = cmd.split(' ').filter(p => !p.startsWith('-') && p !== 'apt' && p !== 'apt-get' && p !== 'install')[0] || 'package';
      result = `Reading package lists... Done\nBuilding dependency tree... Done\nThe following NEW packages will be installed:\n  ${pkg}\n0 upgraded, 1 newly installed, 0 to remove.\nSetting up ${pkg} (latest) ... Done.`;
    } else {
      result = 'apt 2.9.3 (amd64)\nUsage: apt [options] command\nCommands: list, search, show, install, reinstall, remove, autopurge, update, upgrade';
    }
  } else if (cmd.startsWith('ping')) {
    const host = cmd.split(' ').slice(1).find(x => !x.startsWith('-')) || '10.10.0.10';
    result = `PING ${host} (${host}) 56(84) bytes of data.\n64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.312 ms\n64 bytes from ${host}: icmp_seq=2 ttl=64 time=0.284 ms\n--- ${host} ping statistics ---\n2 packets transmitted, 2 received, 0% packet loss, time 1002ms`;
  } else if (cmd === 'kali-tools' || cmd === 'tools') {
    result = '=== Kali Linux Pre-Installed Tools Suite ===\n[+] Reconnaissance:    nmap, masscan, fping, netdiscover, amass, enum4linux\n[+] Web Applications:  burpsuite, zaproxy, gobuster, dirb, ffuf, wpscan, sqlmap\n[+] Exploitation:      msfconsole, msfvenom, searchsploit, exploitdb, commix\n[+] Password Attacks:  john, hashcat, hydra, medusa, crunch, rockyou.txt\n[+] Network & Wireless: wireshark, tcpdump, tshark, aircrack-ng, bettercap\n[+] Post-Exploitation: mimikatz, powersploit, evil-winrm, responder, netcat';
  } else if (cmd === 'nmap' || cmd === 'nmap -h' || cmd === 'nmap --help') {
    result = 'Nmap 7.94SVN ( https://nmap.org )\nUsage: nmap [Scan Type(s)] [Options] {target specification}\nTARGET SPECIFICATION:\n  Ex: 10.10.0.10, 10.10.0.0/24, target.lab\nSCAN TECHNIQUES:\n  -sS/sT: TCP SYN/Connect() scan\n  -sV: Probe open ports to determine service/version info\n  -p <port ranges>: Only scan specified ports\nEXAMPLES:\n  nmap -sV -p 22,80,8080 10.10.0.10';
  } else if (cmd.startsWith('nmap')) {
    result = 'Starting Nmap 7.94SVN ( https://nmap.org ) at 2026-09-16 12:00 UTC\nNmap scan report for target (10.10.0.10)\nHost is up (0.00042s latency).\nPORT     STATE SERVICE     VERSION\n22/tcp   open  ssh         OpenSSH 9.6p1 Debian 4\n80/tcp   open  http        nginx 1.24.0 (Cyber Lab Web)\n8080/tcp open  http-proxy  Werkzeug/3.0.1 Python/3.12 (Vulnerable Demo App)\nService Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel\n\nNmap done: 1 IP address (1 host up) scanned in 1.48 seconds';
  } else if (cmd.startsWith('msfconsole')) {
    result = 'Metasploit Framework v6.4.12-dev\n=[ metasploit v6.4.12-dev                                 ]\n+ -- --=[ 2,420 exploits - 1,248 auxiliary - 428 post     ]\n+ -- --=[ 1,465 payloads - 47 encoders - 11 nops          ]\nmsf6 > Ready. (Type exit or run exploit commands)';
  } else if (cmd.startsWith('msfvenom')) {
    result = 'msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=10.10.0.2 LPORT=4444 -f elf > shell.elf\n[+] Payload size: 250 bytes\n[+] Saved as: shell.elf (Executable)';
  } else if (cmd.startsWith('sqlmap')) {
    result = '        ___\n       __H__\n ___ ___[.]_____ ___ ___  {1.8.5#stable}\n|_ -| . [.]     | .\'| . |\n|___|_  ["]_|_|_|__,|  _|\n      |_|V...       |_|   https://sqlmap.org\n\n[INFO] testing connection to http://10.10.0.10:8080/\n[INFO] parameter "id" appears vulnerable to Boolean-based blind SQL injection\n[+] DBMS: PostgreSQL 16.2\n[+] Database: cyberrange_db';
  } else if (cmd.startsWith('hydra')) {
    result = 'Hydra v9.5 (c) 2023 by van Hauser / THC\n[22][ssh] host: 10.10.0.10   login: admin   password: password123\n1 of 1 target successfully completed, 1 valid password found';
  } else if (cmd.startsWith('john')) {
    result = 'John the Ripper 1.9.0-jumbo-1 OMP [linux-gnu 64-bit x86_64 AVX2 AC]\nLoaded 1 password hash (sha512crypt)\npassword123      (admin)\n1g 0:00:00:01 DONE (2026-09-16 12:00) 1.02g/s';
  } else if (cmd.startsWith('gobuster') || cmd.startsWith('dirb')) {
    result = '===============================================================\nGobuster v3.6 - Directory Enumeration Mode\n===============================================================\n[+] Url:         http://10.10.0.10:8080/\n/admin               (Status: 301) [Size: 178]\n/api                 (Status: 200) [Size: 42]\n/login               (Status: 200) [Size: 1845]\n/flag.txt            (Status: 200) [Size: 38]\n===============================================================';
  } else if (cmd.startsWith('searchsploit')) {
    result = '------------------------------------------------------- ---------------------------------\n Exploit Title                                         |  Path\n------------------------------------------------------- ---------------------------------\n OpenSSH 9.6p1 - Remote Code Execution (RegreSSHion)    | linux/remote/52079.py\n Werkzeug < 3.0.3 - Debug Console Remote Code Execution | multiple/remote/51982.py\n------------------------------------------------------- ---------------------------------';
  } else if (cmd.startsWith('curl')) {
    result = '<!DOCTYPE html>\n<html>\n<head><title>Cyber Lab Target Application</title></head>\n<body>\n  <h2>Vulnerable Target Service Active (10.10.0.10:8080)</h2>\n</body>\n</html>';
  } else if (cmd.startsWith('python3') || cmd.startsWith('python')) {
    result = 'Python 3.12.2 (main, Feb 20 2024, 09:30:11) [GCC 13.2.0] on linux\nType "help", "copyright", "credits" or "license" for more information.';
  } else if (cmd === 'cat flag.txt' || cmd === 'cat /root/flag.txt') {
    result = session.dynamicFlag || l.flag;
  } else if (cmd === l.commands[0] || cmd === l.commands[1]) {
    const responses = {
      'ip addr': 'eth0: inet 10.10.0.2/24 — isolated lab network',
      'nmap target': 'Demo scan of target (10.10.0.10)\n22/tcp   open  ssh\n8080/tcp open  http',
      'curl target:8080': 'HTTP/1.1 200 OK\nServer: training-app\n\nWelcome to the vulnerable demo application.',
      'cat notes.txt': 'Training application: review input validation and authentication.\nThe application flag is stored in flag.txt.',
      'chmod 600 config.yml': 'Permissions updated: -rw------- config.yml',
      'cat auth.log': '09:41 sign-in accepted: learner\n09:42 failed sign-in: unknown\n09:43 failed sign-in: unknown',
      'grep failed auth.log': '09:42 failed sign-in: unknown\n09:43 failed sign-in: unknown',
      'ps aux': 'USER    PID   COMMAND\nroot    101   shell\nunknown 4242  suspicious-process',
      'kill 4242': 'Demo process 4242 stopped.'
    };
    result = responses[cmd] || 'Command completed.';
  } else {
    result = isKali
      ? `bash: ${cmd.split(' ')[0]}: command not found\nType 'kali-tools' to explore 90+ pre-installed security tools.`
      : 'Command unavailable in this demo. Type help to see supported commands.';
  }

  // Flexible matching for objectives in local runner
  const matchObj0 = cmd === l.commands[0] ||
    (l.id === 'linux' && cmd === 'pwd') ||
    (l.id === 'recon' && (cmd.startsWith('ip a') || cmd.startsWith('ifconfig'))) ||
    (l.id === 'web' && (cmd.startsWith('curl') || cmd.includes('target:8080'))) ||
    (l.id === 'permissions' && (cmd === 'ls -la' || cmd === 'ls -l')) ||
    (l.id === 'forensics' && (cmd.includes('auth.log') && !cmd.startsWith('grep'))) ||
    (l.id === 'incident' && (cmd === 'ps aux' || cmd === 'ps -ef')) ||
    (l.id === 'kali-sandbox' && (cmd.startsWith('uname') || cmd === 'whoami' || cmd === 'id'));

  const matchObj1 = cmd === l.commands[1] ||
    (l.id === 'linux' && (cmd.startsWith('ls') || cmd === 'dir')) ||
    (l.id === 'recon' && cmd.startsWith('nmap')) ||
    (l.id === 'web' && (cmd.includes('notes.txt') || cmd.startsWith('cat notes'))) ||
    (l.id === 'permissions' && (cmd.startsWith('chmod 600') || cmd.startsWith('chmod'))) ||
    (l.id === 'forensics' && (cmd.startsWith('grep') && cmd.includes('auth.log'))) ||
    (l.id === 'incident' && (cmd.startsWith('kill') || cmd.includes('4242'))) ||
    (l.id === 'kali-sandbox' && (cmd === 'kali-tools' || cmd.startsWith('tools') || cmd.startsWith('nmap') || cmd.startsWith('msfconsole')));

  const matchObj2 = cmd === l.commands[2] ||
    cmd === 'cat flag.txt' || cmd === 'cat /root/flag.txt' || (cmd.startsWith('cat ') && cmd.includes('flag.txt'));

  if (matchObj0) complete(0);
  if (matchObj1) {
    if (session.done.includes(0)) complete(1);
    else result += '\nComplete the first objective, then run this command again.';
  }
  if (matchObj2) {
    if (session.done.includes(0) && session.done.includes(1)) {
      complete(2);
    }
  }

  if (result) session.output.push(result);
  session.output = session.output.slice(-160);
  updateTermDisplay();
  if (tab === 'Desktop') {
    window._kaliOpenWindow && window._kaliOpenWindow('term');
    document.getElementById('kali-desk-term-input')?.focus();
  } else {
    $('#command')?.focus();
  }
}

function tick() {
  if (!session) return;
  const secs = Math.max(0, Math.ceil((session.expires - Date.now()) / 1000));
  if ($('#timer')) $('#timer').textContent = `◷ ${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;
  if (!secs) {
    endSession();
    toast('Session expired. Launch a new lab to continue.');
  }
}

async function endSession() {
  if (session && session.id) {
    recordSessionEnd(session.id);
  }
  if (isLiveApi && session && session.id) {
    try {
      await fetch(`${API_BASE}/api/sessions/${session.id}/end`, { method: 'POST' });
    } catch (e) {}
  }
  if (activeWs) {
    try { activeWs.close(); } catch (e) {}
    activeWs = null;
  }
  if (activeXterm) {
    try { activeXterm.dispose(); } catch (e) {}
    activeXterm = null;
  }
  session = null;
  $('#session-dot').style.display = 'none';
  $('#end-dialog').close();
  navigate('session');
}

let progressSubTab = 'domains';

function exportAuditTranscript() {
  const capturedFlags = Array.from(new Set(
    history.map(h => h.flagCaptured)
      .concat(getSessionHistory().map(s => s.flagCaptured))
      .filter(Boolean)
  ));
  const readiness = Math.min(100, Math.round(((history.length * 20) + (totalObjectives * 4) + (capturedFlags.length * 8)) / 1.7));
  const transcript = {
    platform: 'Cyber Lab Cybersecurity Range',
    version: '2.9.0',
    exportTimestamp: new Date().toISOString(),
    operator: {
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
      clearanceLevel: currentUser.level
    },
    metrics: {
      labsCompleted: history.length,
      totalLabsAvailable: labs.length,
      completionRate: `${Math.round((history.length / labs.length) * 100)}%`,
      objectivesMastered: totalObjectives,
      flagsCapturedCount: capturedFlags.length,
      readinessScore: `${readiness}%`
    },
    completedLabs: history,
    capturedFlags: capturedFlags,
    sessionHistory: getSessionHistory()
  };
  
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(transcript, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `Cyber Lab_Audit_${currentUser.name.replace(/\s+/g, '_')}_${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  toast('📥 Audit transcript JSON exported successfully.');
}

function renderProgressSubTabContent(subtab, domains, badges, capturedFlags) {
  if (subtab === 'domains') {
    return `
      <div class="domain-grid">
        ${domains.map(d => {
          const completedCount = d.labIds.filter(id => history.some(h => h.id === id)).length;
          const pct = Math.round((completedCount / d.labIds.length) * 100);
          const isMastered = pct === 100;
          return `
            <div class="domain-card card-3d">
              <div class="domain-head">
                <div class="domain-title-wrap">
                  <span class="domain-icon">${d.icon}</span>
                  <div>
                    <div class="domain-title">${d.name}</div>
                    <div style="font-size:11.5px; color:var(--text-muted); font-family:var(--font-mono); margin-top:2px;">
                      ${completedCount} of ${d.labIds.length} tracks conquered
                    </div>
                  </div>
                </div>
                <span class="domain-score-pill" style="${isMastered ? 'background:rgba(16,185,129,0.15);color:#34d399;border-color:rgba(16,185,129,0.35);' : ''}">
                  ${pct}% ${isMastered ? 'Mastered' : 'Competency'}
                </span>
              </div>
              <div class="domain-progress-bar">
                <div class="domain-progress-fill" style="width: ${Math.max(8, pct)}%; ${isMastered ? 'background:linear-gradient(90deg,#10b981,#34d399);' : ''}"></div>
              </div>
              <div>
                <div style="font-size:11px; font-family:var(--font-mono); color:var(--text-muted); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:8px;">
                  VERIFIED OPERATIONAL SKILLS
                </div>
                <div class="domain-skills-list">
                  ${d.skills.map((s, idx) => {
                    const skillMastered = completedCount > 0 && (completedCount >= d.labIds.length || idx < 3);
                    return `<span class="domain-skill-tag ${skillMastered ? 'mastered' : ''}">${skillMastered ? '✓ ' : ''}${s}</span>`;
                  }).join('')}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  if (subtab === 'flags') {
    if (history.length === 0) {
      return `
        <div class="empty">
          <div style="font-size:40px; margin-bottom:12px;">🚩</div>
          <h2>Your Flag Vault is Awaiting Its First Capture</h2>
          <p>Complete a lab's objectives in the Kali or Ubuntu terminal to extract its cryptographic flag and store it permanently here.</p>
          <button class="primary" id="browse-empty-labs">Launch Your First Lab ↗</button>
        </div>
      `;
    }

    return `
      <div class="flag-vault-grid">
        ${history.map(h => {
          const labMeta = labs.find(l => l.id === h.id) || {};
          const flagVal = h.flagCaptured || labMeta.flag || 'RANGE{verified_completion}';
          const dateFormatted = h.completedAt ? new Date(h.completedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Verified Session';
          return `
            <div class="flag-vault-card card-3d">
              <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                  <div style="font-size:16px; font-weight:700; color:#fff;">${escape(h.name)}</div>
                  <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">
                    Completed ${dateFormatted}
                  </div>
                </div>
                <span class="badge-status unlocked">${escape(h.os || 'Linux')}</span>
              </div>
              <div style="font-size:11.5px; color:var(--text-muted); font-family:var(--font-mono); text-transform:uppercase; letter-spacing:0.06em; margin-top:4px;">
                CAPTURED FLAG TOKEN
              </div>
              <div class="flag-token-row">
                <code style="word-break:break-all;">${escape(flagVal)}</code>
                <button class="ghost copy-flag-btn" data-flag="${escape(flagVal)}" style="padding:3px 8px; font-size:11px; margin-left:8px; white-space:nowrap;">
                  Copy
                </button>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px; padding-top:4px;">
                <span style="font-size:12px; color:#34d399; font-family:var(--font-mono);">✓ 3/3 Objectives Mastered</span>
                <button class="secondary relaunch-lab-btn" data-lab="${h.id}" style="padding:5px 12px; font-size:12px;">
                  Practice Again ↻
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  if (subtab === 'badges') {
    return `
      <div class="badge-grid">
        ${badges.map(b => `
          <div class="achievement-badge-card card-3d ${b.unlocked ? 'unlocked' : 'locked'}">
            <div class="badge-icon">${b.icon}</div>
            <div class="badge-title">${b.title}</div>
            <div class="badge-desc">${b.desc}</div>
            <div class="badge-status ${b.unlocked ? 'unlocked' : 'locked'}">
              ${b.unlocked ? '✓ Unlocked' : '🔒 Locked'}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  if (subtab === 'curriculum') {
    return `
      <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-lg); overflow:hidden;">
        <table class="session-table" style="width:100%; border-collapse:collapse;">
          <thead>
            <tr>
              <th>Lab Mission</th>
              <th>Curriculum Track</th>
              <th>Level</th>
              <th>Objectives</th>
              <th>Status</th>
              <th style="text-align:right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${labs.map(l => {
              const isCompleted = history.some(h => h.id === l.id);
              const isActive = session && session.lab.id === l.id;
              const completedTasks = isCompleted ? 3 : (isActive ? session.done.length : 0);
              
              let statusBadge = `<span class="badge-status locked">Available ○</span>`;
              if (isCompleted) {
                statusBadge = `<span class="badge-status unlocked">Completed ✓</span>`;
              } else if (isActive) {
                statusBadge = `<span class="badge-status" style="background:rgba(0,240,255,0.15);color:#00f0ff;border:1px solid rgba(0,240,255,0.35);">Active ⏳</span>`;
              }

              return `
                <tr>
                  <td>
                    <div style="display:flex; align-items:center; gap:10px;">
                      <span style="font-size:18px;">${l.icon || '▣'}</span>
                      <div>
                        <div style="font-weight:600; color:#fff;">${escape(l.name)}</div>
                        <div style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono);">${escape(l.os)} · ${l.time} min</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style="font-family:var(--font-mono); font-size:11px; color:var(--text-secondary);">${escape(l.category)}</span>
                  </td>
                  <td>
                    <span class="level ${l.level.toLowerCase()}">${l.level}</span>
                  </td>
                  <td>
                    <div style="font-family:var(--font-mono); font-size:12px; color:${completedTasks === 3 ? '#34d399' : (completedTasks > 0 ? 'var(--cyan)' : 'var(--text-muted)')};">
                      ${completedTasks} / 3 Tasks
                    </div>
                  </td>
                  <td>
                    ${statusBadge}
                  </td>
                  <td style="text-align:right;">
                    ${isActive ? `
                      <button class="primary" onclick="navigate('session')" style="padding:4px 10px; font-size:12px;">Resume ↗</button>
                    ` : (isCompleted ? `
                      <button class="secondary relaunch-lab-btn" data-lab="${l.id}" style="padding:4px 10px; font-size:12px;">Replay ↻</button>
                    ` : `
                      <button class="ghost relaunch-lab-btn" data-lab="${l.id}" style="padding:4px 10px; font-size:12px; border:1px solid var(--border-subtle);">Launch ↗</button>
                    `)}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  return '';
}

function progress() {
  loadLocalProgress();
  
  // Collect unique captured flags
  const capturedFlags = Array.from(new Set(
    history.map(h => h.flagCaptured)
      .concat(getSessionHistory().map(s => s.flagCaptured))
      .filter(Boolean)
  ));
  
  const completionRate = Math.round((history.length / labs.length) * 100);
  const readiness = Math.min(100, Math.round(((history.length * 20) + (totalObjectives * 4) + (capturedFlags.length * 8)) / 1.7));
  
  let readinessRank = 'Level 1: Novice Operative';
  if (readiness >= 85) readinessRank = 'Level 4: Cyber Range Master';
  else if (readiness >= 60) readinessRank = 'Level 3: Security Specialist';
  else if (readiness >= 30) readinessRank = 'Level 2: Tactical Practitioner';

  // Domain competencies mapping
  const domains = [
    {
      id: 'offensive',
      name: 'Offensive Security & Red Teaming',
      icon: '🐉',
      labIds: ['kali-sandbox', 'recon'],
      skills: ['Nmap Reconnaissance', 'Metasploit Exploitation', 'Vulnerability Scanning', 'Root Shell Mastery', 'Port Cartography']
    },
    {
      id: 'linux',
      name: 'Linux Systems & Hardening',
      icon: '🛡️',
      labIds: ['linux', 'permissions'],
      skills: ['Filesystem Traversal', 'POSIX Permissions Audit', 'Least Privilege Config', 'Process Management', 'Shell Automation']
    },
    {
      id: 'web',
      name: 'Web Application Security',
      icon: '🌐',
      labIds: ['web'],
      skills: ['HTTP Response Inspection', 'OWASP Top 10 Flaws', 'SQL Injection Testing', 'Security Headers', 'Service Fingerprinting']
    },
    {
      id: 'forensics',
      name: 'Digital Forensics & Incident Response',
      icon: '⚡',
      labIds: ['forensics', 'incident'],
      skills: ['Authentication Log Analysis', 'Evidence Triage', 'Malicious Process Containment', 'Telemetry Analysis', 'Timeline Reconstruction']
    }
  ];

  // Achievement badges definition
  const badges = [
    {
      id: 'first_blood',
      title: 'First Blood 🚩',
      desc: 'Capture your first lab security flag and validate clearance token.',
      icon: '🚩',
      unlocked: capturedFlags.length >= 1
    },
    {
      id: 'kali_master',
      title: 'Kali Dragon Master 🐉',
      desc: 'Deploy and operate the unrestricted Kali Linux rolling penetration testbed.',
      icon: '🐉',
      unlocked: history.some(h => h.id === 'kali-sandbox')
    },
    {
      id: 'cartographer',
      title: 'Network Cartographer 📡',
      desc: 'Perform subnet reconnaissance and discover active TCP service banners.',
      icon: '📡',
      unlocked: history.some(h => h.id === 'recon')
    },
    {
      id: 'hardener',
      title: 'Security Hardener 🛡️',
      desc: 'Audit POSIX access controls, remedy insecure files, and enforce least privilege.',
      icon: '🛡️',
      unlocked: history.some(h => h.id === 'permissions' || h.id === 'linux')
    },
    {
      id: 'responder',
      title: 'Incident Responder ⚡',
      desc: 'Identify malicious PID execution and contain simulated unauthorized access.',
      icon: '⚡',
      unlocked: history.some(h => h.id === 'incident' || h.id === 'forensics')
    },
    {
      id: 'range_master',
      title: 'Range Master 🏆',
      desc: 'Demonstrate operational excellence by mastering 3 or more full cybersecurity labs.',
      icon: '🏆',
      unlocked: history.length >= 3
    }
  ];

  $('#main').innerHTML = `
    <div class="progress-hub">
      <div class="pagehead" style="margin-bottom:0;">
        <div>
          <div class="eyebrow">EVERY SESSION COUNTS</div>
          <h1>Your skills, taking shape.</h1>
          <p style="color:var(--text-secondary); max-width:680px; margin:0;">
            See what you've learned, celebrate your milestones, and find your next challenge.
          </p>
        </div>
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          <button class="secondary" id="btn-progress-launch" style="display:flex; align-items:center; gap:6px;">
            <span>＋</span> Launch practice lab
          </button>
          <button class="ghost" id="btn-progress-sync" style="display:flex; align-items:center; gap:6px; font-family:var(--font-mono); font-size:12px;">
            <span>🔄</span> Sync progress
          </button>
          <button class="ghost" id="btn-progress-export" style="display:flex; align-items:center; gap:6px; font-family:var(--font-mono); font-size:12px;">
            <span>📥</span> Export audit
          </button>
        </div>
      </div>

      ${session ? `
        <div class="progress-active-banner">
          <div class="progress-active-banner-left">
            <span class="progress-active-beacon"></span>
            <div>
              <div style="font-family:var(--font-mono); font-size:11px; color:#00f0ff; letter-spacing:0.08em; text-transform:uppercase;">
                ACTIVE CONTAINER SESSION IN PROGRESS
              </div>
              <div style="font-size:16px; font-weight:700; color:#fff; margin-top:2px;">
                ${escape(session.lab.name)} <span style="font-size:12px; color:var(--text-muted); font-weight:normal;">(${escape(session.os)})</span>
              </div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:16px;">
            <div style="text-align:right;">
              <div style="font-size:11px; color:var(--text-muted); font-family:var(--font-mono);">CURRENT MISSION</div>
              <div style="font-size:14px; font-weight:600; color:#34d399;">
                ${session.done.length} / ${session.lab.tasks ? session.lab.tasks.length : 3} Objectives Mastered
              </div>
            </div>
            <button class="primary" id="btn-progress-resume" style="padding:7px 16px; font-size:13px;">Resume Lab ↗</button>
          </div>
        </div>
      ` : ''}

      <div class="progresscards">
        <div class="metric">
          <span>Labs completed</span>
          <strong>${history.length}<small style="font-size:15px;color:var(--text-muted);font-weight:normal;"> / ${labs.length}</small></strong>
          <div style="font-size:11.5px; color:#34d399; font-family:var(--font-mono); margin-top:6px;">
            ✓ ${completionRate}% curriculum completed
          </div>
        </div>
        <div class="metric">
          <span>Objectives mastered</span>
          <strong>${totalObjectives}<small style="font-size:15px;color:var(--text-muted);font-weight:normal;"> / ${labs.length * 3}</small></strong>
          <div style="font-size:11.5px; color:var(--cyan); font-family:var(--font-mono); margin-top:6px;">
            ${totalObjectives} practical tasks verified
          </div>
        </div>
        <div class="metric">
          <span>Captured flags</span>
          <strong>${capturedFlags.length}</strong>
          <div style="font-size:11.5px; color:#f59e0b; font-family:var(--font-mono); margin-top:6px;">
            🚩 Proof-of-compromise tokens
          </div>
        </div>
        <div class="metric">
          <span>Readiness score</span>
          <strong>${readiness}%</strong>
          <div style="font-size:11.5px; color:#38bdf8; font-family:var(--font-mono); margin-top:6px;">
            ${readinessRank}
          </div>
        </div>
      </div>

      <div class="progress-tabs-nav">
        <button class="progress-tab-btn ${progressSubTab === 'domains' ? 'active' : ''}" data-ptab="domains">
          Skills by domain
        </button>
        <button class="progress-tab-btn ${progressSubTab === 'flags' ? 'active' : ''}" data-ptab="flags">
          Captured flags (${history.length})
        </button>
        <button class="progress-tab-btn ${progressSubTab === 'badges' ? 'active' : ''}" data-ptab="badges">
          Achievements (${badges.filter(b => b.unlocked).length}/${badges.length})
        </button>
        <button class="progress-tab-btn ${progressSubTab === 'curriculum' ? 'active' : ''}" data-ptab="curriculum">
          All challenges (${labs.length})
        </button>
      </div>

      <div class="progress-subtab-content">
        ${renderProgressSubTabContent(progressSubTab, domains, badges, capturedFlags)}
      </div>
    </div>
  `;

  // Wire event handlers
  if ($('#btn-progress-launch')) $('#btn-progress-launch').onclick = () => navigate('labs');
  if ($('#btn-progress-resume')) $('#btn-progress-resume').onclick = () => navigate('session');
  if ($('#btn-progress-sync')) {
    $('#btn-progress-sync').onclick = async () => {
      $('#btn-progress-sync').innerHTML = '<span>🔄</span> Syncing...';
      await syncProgress();
      toast('✓ Training progress synced with Cyber Lab control plane.');
      progress();
    };
  }
  if ($('#btn-progress-export')) $('#btn-progress-export').onclick = exportAuditTranscript;

  document.querySelectorAll('[data-ptab]').forEach(btn => {
    btn.onclick = () => {
      progressSubTab = btn.dataset.ptab;
      progress();
    };
  });

  // Action buttons inside subtabs
  document.querySelectorAll('.relaunch-lab-btn').forEach(b => {
    b.onclick = () => launch(b.dataset.lab);
  });

  document.querySelectorAll('.copy-flag-btn').forEach(b => {
    b.onclick = () => copyToClipboard(b.dataset.flag);
  });

  if ($('#browse-empty-labs')) $('#browse-empty-labs').onclick = () => navigate('labs');

  init3DTilt();
}

$('#cancel-end').onclick = () => $('#end-dialog').close();

// Download terminal log from inside the teardown dialog (no session end)
const saveEndTranscriptBtn = document.getElementById('save-end-transcript');
if (saveEndTranscriptBtn) {
  saveEndTranscriptBtn.onclick = () => {
    saveTerminalProgress({ downloadFile: true, notify: true });
  };
}

// Copy terminal scrollback to clipboard
const endCopyBufBtn = document.getElementById('end-copy-buffer');
if (endCopyBufBtn) {
  endCopyBufBtn.onclick = () => {
    const text = getActiveTerminalText();
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        toast('📋 Terminal buffer copied to clipboard!');
      }).catch(() => {
        toast('📋 Select & copy from the terminal directly.');
      });
    } else {
      toast('No terminal output to copy yet.');
    }
  };
}

// Save progress THEN teardown
const saveAndTeardownBtn = document.getElementById('save-and-teardown');
if (saveAndTeardownBtn) {
  saveAndTeardownBtn.onclick = () => {
    saveTerminalProgress({ downloadFile: true, notify: false });
    endSession();
    toast('💾 Terminal log saved & session terminated. Stay frosty.');
  };
}

// Destroy & Wipe — auto-archive if checkbox is ticked
$('#confirm-end').onclick = () => {
  const autoSaveChk = document.getElementById('end-autosave-chk');
  if (autoSaveChk && autoSaveChk.checked) {
    saveTerminalProgress({ downloadFile: false, notify: false });
  }
  endSession();
  toast('Session ended. Your workspace has been wiped clean.');
};
document.querySelectorAll('[data-nav]').forEach(b => b.onclick = () => navigate(b.dataset.nav));
$('.brand').onclick = e => { e.preventDefault(); navigate('labs'); };

const defaultUser = {
  name: 'Kartik Baniwal',
  email: 'kartik@cyberlab.io',
  role: 'Security Analyst',
  avatar: 'KB',
  level: 'Clearance Level 3',
  isLoggedIn: false
};

let currentUser = Object.assign({}, defaultUser);
let authTab = 'signin';

function loadAuth() {
  try {
    const raw = localStorage.getItem('rangeforge-auth');
    if (raw) {
      currentUser = Object.assign({}, defaultUser, JSON.parse(raw));
    }
  } catch (e) {}
  updateUserUI();
}

function saveAuth(user) {
  currentUser = user;
  localStorage.setItem('rangeforge-auth', JSON.stringify(user));
  updateUserUI();
}

function updateUserUI() {
  const nameEl = $('#profile-name');
  const roleEl = $('#profile-role');
  const avatarEl = $('#profile-avatar');
  const authBtn = $('#auth-btn');
  const authBtnText = $('#auth-btn-text');
  const headerLogoutBtn = $('#header-logout-btn');
  const sidebarLogoutBtn = $('#sidebar-logout-btn');
  const settingsOpName = $('#settings-operator-name');
  const settingsOpStatus = $('#settings-operator-status');

  const isAuth = view === 'login';
  document.body.classList.toggle('auth-mode', isAuth);
  document.documentElement.classList.toggle('auth-mode', isAuth);

  if (nameEl) nameEl.textContent = currentUser.name;
  if (roleEl) roleEl.textContent = currentUser.role;
  if (avatarEl) avatarEl.textContent = currentUser.avatar;

  if (settingsOpName) settingsOpName.textContent = currentUser.name;
  if (settingsOpStatus) settingsOpStatus.textContent = `${currentUser.level} · ${currentUser.isLoggedIn ? 'Authenticated' : 'Guest Operator'}`;

  if (authBtn && authBtnText) {
    if (currentUser.isLoggedIn) {
      authBtn.classList.add('logged-in');
      authBtnText.textContent = currentUser.name.split(' ')[0] || 'Operator';
      authBtn.title = `Signed in as ${currentUser.name} (${currentUser.role}). Click to view auth portal.`;
    } else {
      authBtn.classList.remove('logged-in');
      authBtnText.textContent = 'Sign In';
      authBtn.title = 'Authenticate operator terminal';
    }
  }

  // Toggle prominent Log Out buttons on main website
  if (headerLogoutBtn) {
    headerLogoutBtn.style.display = (currentUser.isLoggedIn && view !== 'login') ? 'flex' : 'none';
  }
  if (sidebarLogoutBtn) {
    sidebarLogoutBtn.style.display = (currentUser.isLoggedIn && view !== 'login') ? 'grid' : 'none';
  }
}

function authView() {
  $('#main').innerHTML = `
    <div class="auth-view">
      <section class="auth-story">
        <a class="auth-home-link" href="/">← Back to Cyber Lab</a>
        <div class="eyebrow">THE BEST WAY TO LEARN IS TO DO.</div>
        <h2>Build skills. <br>Break boundaries. <br><span>Stay curious.</span></h2>
        <p>A space to explore cybersecurity, sharpen your instincts, and learn something new with every session.</p>
        <div class="auth-scene" aria-hidden="true"><div class="auth-scene-ring"></div><div class="auth-scene-ring ring-two"></div><div class="auth-scene-cube"><span>&gt;_</span><small>YOUR NEXT CHALLENGE</small></div><div class="auth-scene-caption"><i></i> Learn. Practice. Repeat.</div></div>
        <div class="auth-story-foot"><span>01 / EXPLORE</span><span>02 / PRACTICE</span><span>03 / GROW</span></div>
      </section>
      <div class="auth-card" id="auth-card">
        <div class="auth-header">
          <div class="auth-brandmark">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
          <div class="eyebrow">YOUR WORKSPACE AWAITS</div>
          <h1 class="auth-title">${authTab === 'signin' ? 'Welcome back.' : 'Start something great.'}</h1>
          <p class="auth-intro">${authTab === 'signin' ? 'Sign in to continue your learning journey.' : 'Set up your profile and find your first challenge.'}</p>
        </div>

        <div class="auth-tabs" role="tablist">
          <button class="auth-tab ${authTab === 'signin' ? 'active' : ''}" id="tab-signin" role="tab" aria-selected="${authTab === 'signin'}">Sign in</button>
          <button class="auth-tab ${authTab === 'register' ? 'active' : ''}" id="tab-register" role="tab" aria-selected="${authTab === 'register'}">Create profile</button>
        </div>

        <div id="auth-error" class="auth-error" role="alert"></div>

        <form class="auth-form" id="auth-form">
          ${authTab === 'register' ? `
            <div class="auth-field">
              <label for="auth-fullname">Full name</label>
              <input id="auth-fullname" placeholder="e.g. Alex Vance" required autocomplete="name">
            </div>
          ` : ''}

          <div class="auth-field">
            <label for="auth-email">Email address</label>
            <input id="auth-email" type="email" placeholder="operator@cyberlab.io" value="${authTab === 'signin' ? (currentUser.email || 'kartik@cyberlab.io') : ''}" required autocomplete="username">
          </div>

          <div class="auth-field">
            <label for="auth-password">Password</label>
            <input id="auth-password" type="password" placeholder="••••••••••••" value="${authTab === 'signin' ? 'cyberlab2026' : ''}" required autocomplete="current-password">
          </div>

          ${authTab === 'register' ? `
            <div class="auth-field">
              <label for="auth-role">Your focus</label>
              <select id="auth-role">
                <option value="Security Analyst">Security Analyst (Blue Team)</option>
                <option value="Penetration Tester">Penetration Tester (Red Team)</option>
                <option value="SOC Responder">SOC Incident Responder</option>
                <option value="DevSecOps Engineer">DevSecOps Engineer</option>
              </select>
            </div>
          ` : ''}

          <div class="auth-options">
            <label class="auth-checkbox">
              <input type="checkbox" id="auth-remember" checked>
              <span>Remember me</span>
            </label>
            <button type="button" class="auth-link" id="auth-hint-btn">Demo password?</button>
          </div>

          <button type="submit" class="primary auth-submit-btn" id="auth-submit">
            ${authTab === 'signin' ? 'Enter workspace <span>→</span>' : 'Create profile <span>→</span>'}
          </button>
        </form>

        <div class="auth-demo-section">
          <div class="auth-demo-label">OR EXPLORE A DEMO PROFILE</div>
          <div class="auth-demo-chips">
            <button class="auth-chip" data-demo="kartik" type="button">
              <span class="auth-chip-dot blue"></span>
              <strong>Kartik Baniwal</strong> · SecOps Lead
            </button>
            <button class="auth-chip" data-demo="sarah" type="button">
              <span class="auth-chip-dot red"></span>
              <strong>Sarah Connor</strong> · Red Team
            </button>
            <button class="auth-chip" data-demo="guest" type="button">
              <span class="auth-chip-dot green"></span>
              <strong>Guest Analyst</strong> · Trainee
            </button>
          </div>
        </div>

        <div class="auth-guest-bypass">
          ${currentUser.isLoggedIn ? `
            <a id="return-dashboard" style="display:block;margin-bottom:12px;color:var(--cyan);font-weight:600;font-size:13.5px;cursor:pointer;">← Return to Main Website (${escape(currentUser.name)})</a>
          ` : ''}
          <button type="button" id="bypass-guest">Continue as guest <span>→</span></button>
        </div>
        <p class="auth-local-notice">Demo profiles are saved in this browser.</p>
      </div>
    </div>
  `;

  bindAuthHandlers();
}

function bindAuthHandlers() {
  $('#tab-signin').onclick = () => { authTab = 'signin'; authView(); };
  $('#tab-register').onclick = () => { authTab = 'register'; authView(); };

  const returnDash = $('#return-dashboard');
  if (returnDash) {
    returnDash.onclick = () => navigate('labs');
  }

  $('#auth-hint-btn').onclick = () => {
    toast('Demo Passphrase: cyberlab2026');
  };

  $('#bypass-guest').onclick = () => {
    login({
      name: 'Guest Explorer',
      email: 'guest@cyberlab.io',
      role: 'Guest Analyst',
      avatar: 'GE',
      level: 'Clearance Level 1',
      isLoggedIn: true
    });
  };

  document.querySelectorAll('[data-demo]').forEach(btn => {
    btn.onclick = () => {
      const type = btn.dataset.demo;
      if (type === 'kartik') {
        login({
          name: 'Kartik Baniwal',
          email: 'kartik@cyberlab.io',
          role: 'Security Analyst',
          avatar: 'KB',
          level: 'Clearance Level 3',
          isLoggedIn: true
        });
      } else if (type === 'sarah') {
        login({
          name: 'Sarah Connor',
          email: 's.connor@cyberlab.io',
          role: 'Penetration Tester',
          avatar: 'SC',
          level: 'Clearance Level 4',
          isLoggedIn: true
        });
      } else {
        login({
          name: 'Guest Analyst',
          email: 'guest@cyberlab.io',
          role: 'Trainee Operator',
          avatar: 'GA',
          level: 'Clearance Level 1',
          isLoggedIn: true
        });
      }
    };
  });

  $('#auth-form').onsubmit = e => {
    e.preventDefault();
    const email = $('#auth-email').value.trim();
    const pass = $('#auth-password').value.trim();
    const errorEl = $('#auth-error');

    if (!email || !pass) {
      errorEl.textContent = 'Please enter both callsign and access key.';
      errorEl.classList.add('visible');
      return;
    }

    if (pass.length < 4) {
      errorEl.textContent = 'Access key must be at least 4 characters.';
      errorEl.classList.add('visible');
      return;
    }

    let name = '';
    let role = '';

    if (authTab === 'register') {
      name = $('#auth-fullname').value.trim() || 'New Operator';
      role = $('#auth-role').value;
    } else {
      if (email.toLowerCase().includes('kartik')) {
        name = 'Kartik Baniwal';
        role = 'Security Analyst';
      } else {
        const username = email.split('@')[0].replace(/[._]/g, ' ');
        name = username.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Operator';
        role = 'Security Analyst';
      }
    }

    const parts = name.trim().split(/\s+/);
    const avatar = parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();

    login({
      name,
      email,
      role,
      avatar,
      level: 'Clearance Level 3',
      isLoggedIn: true
    });
  };
}

function login(user) {
  user.isLoggedIn = true;
  saveAuth(user);
  try {
    const rawSettings = localStorage.getItem('range-settings');
    const settings = rawSettings ? JSON.parse(rawSettings) : {};
    settings.name = user.name;
    settings.role = user.role;
    localStorage.setItem('range-settings', JSON.stringify(settings));
    const nameInput = $('#setting-name');
    const roleSelect = $('#setting-role');
    if (nameInput) nameInput.value = user.name;
    if (roleSelect) roleSelect.value = user.role;
  } catch (e) {}

  toast(`Clearance Granted: Welcome Operator ${user.name}! Redirecting to labs...`);
  navigate('labs');
}

function logout() {
  saveAuth({
    name: 'Guest Operator',
    email: '',
    role: 'Unauthenticated',
    avatar: 'GO',
    level: 'Clearance Level 0',
    isLoggedIn: false
  });
  toast('Operator logged out. Redirecting to login portal...');
  navigate('login');
}

function initAuth() {
  loadAuth();

  const authBtn = $('#auth-btn');
  if (authBtn) {
    authBtn.onclick = () => {
      if (view === 'login') {
        if (currentUser.isLoggedIn) navigate('labs');
      } else {
        navigate('login');
      }
    };
  }

  const headerLogoutBtn = $('#header-logout-btn');
  if (headerLogoutBtn) {
    headerLogoutBtn.onclick = () => {
      logout();
    };
  }

  const sidebarLogoutBtn = $('#sidebar-logout-btn');
  if (sidebarLogoutBtn) {
    sidebarLogoutBtn.onclick = e => {
      e.stopPropagation();
      logout();
    };
  }

  const logoutBtn = $('#logout-btn');
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      $('#settings-dialog')?.close();
      logout();
    };
  }
}

function initTheme() {
  const toggleBtn = $('#theme-toggle');
  const label = $('#theme-label');
  const root = document.documentElement;

  const current = localStorage.getItem('range-theme') || 'dark';
  root.setAttribute('data-theme', current);
  if (label) {
    label.textContent = current === 'dark' ? 'Light Mode' : 'Dark Mode';
  }

  if (toggleBtn) {
    toggleBtn.onclick = () => {
      const active = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = active === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('range-theme', next);
      if (label) {
        label.textContent = next === 'dark' ? 'Light Mode' : 'Dark Mode';
      }
      toast(`Switched to ${next} theme`);
    };
  }
}

function initSettings() {
  const openBtn = $('#open-settings');
  const profileCard = $('#profile-card');
  const dialog = $('#settings-dialog');
  const saveBtn = $('#save-settings');
  const resetBtn = $('#reset-settings');

  const nameInput = $('#setting-name');
  const roleSelect = $('#setting-role');
  const fontSizeSelect = $('#setting-fontsize');
  const defaultOsSelect = $('#setting-default-os');

  const profileNameEl = $('#profile-name');
  const profileRoleEl = $('#profile-role');
  const profileAvatarEl = $('#profile-avatar');

  const defaults = {
    name: 'Kartik Baniwal',
    role: 'Security Analyst',
    fontSize: '13.5px',
    defaultOs: 'Kali Linux'
  };

  let saved = defaults;
  try {
    const raw = localStorage.getItem('range-settings');
    if (raw) saved = Object.assign({}, defaults, JSON.parse(raw));
  } catch (e) {}

  function applySettings(s) {
    if (nameInput) nameInput.value = s.name;
    if (roleSelect) roleSelect.value = s.role;
    if (fontSizeSelect) fontSizeSelect.value = s.fontSize;
    if (defaultOsSelect) defaultOsSelect.value = s.defaultOs;

    if (profileNameEl) profileNameEl.textContent = s.name;
    if (profileRoleEl) profileRoleEl.textContent = s.role;
    if (profileAvatarEl) {
      const parts = s.name.trim().split(/\s+/);
      const initials = parts.length > 1 
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : (parts[0].slice(0, 2)).toUpperCase();
      profileAvatarEl.textContent = initials || 'KB';
    }

    document.documentElement.style.setProperty('--term-font-size', s.fontSize);
    const termOutput = $('#output');
    if (termOutput) termOutput.style.fontSize = s.fontSize;
  }

  applySettings(saved);

  if (openBtn) {
    openBtn.onclick = e => {
      e.stopPropagation();
      dialog?.showModal();
    };
  }

  if (profileCard) {
    profileCard.style.cursor = 'pointer';
    profileCard.onclick = () => {
      dialog?.showModal();
    };
  }

    if (saveBtn) {
    saveBtn.onclick = () => {
      const newSettings = {
        name: nameInput.value.trim() || 'Kartik Baniwal',
        role: roleSelect.value,
        fontSize: fontSizeSelect.value,
        defaultOs: defaultOsSelect.value
      };
      localStorage.setItem('range-settings', JSON.stringify(newSettings));
      applySettings(newSettings);
      currentUser.name = newSettings.name;
      currentUser.role = newSettings.role;
      saveAuth(currentUser);
      dialog?.close();
      toast('Workspace settings updated successfully.');
    };
  }

  if (resetBtn) {
    resetBtn.onclick = () => {
      localStorage.removeItem('range-settings');
      applySettings(defaults);
      dialog?.close();
      toast('Settings reset to defaults.');
    };
  }
}

function init3DTilt() {
  if (window.matchMedia && (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches)) return;

  const tiltElements = document.querySelectorAll('.card, .feature, .metric');
  tiltElements.forEach(el => {
    if (el.dataset.tiltBound) return;
    el.dataset.tiltBound = 'true';

    // Inject dynamic glare reflection overlay if not present
    let glare = el.querySelector('.card-glare');
    if (!glare && !el.classList.contains('feature')) {
      glare = document.createElement('div');
      glare.className = 'card-glare';
      el.appendChild(glare);
    }

    const isFeature = el.classList.contains('feature');
    const maxTilt = isFeature ? 1.5 : 3;

    const handleMove = e => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = -((y - centerY) / centerY) * maxTilt;
      const tiltY = ((x - centerX) / centerX) * maxTilt;

      el.style.transform = `perspective(1400px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(${isFeature ? '-1px' : '-3px'})`;

      if (glare) {
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX.toFixed(1)}% ${glareY.toFixed(1)}%, rgba(130, 175, 255, 0.09) 0%, rgba(255, 255, 255, 0) 65%)`;
        glare.style.opacity = '1';
      }
    };

    const handleLeave = () => {
      el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      if (glare) {
        glare.style.opacity = '0';
      }
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
  });
}

setInterval(tick, 1000);
initTheme();
initSettings();
initAuth();
loadLocalProgress();
checkBackend();
if (currentUser.isLoggedIn) {
  navigate('labs');
} else {
  navigate('login');
}
init3DTilt();

// Global Keyboard Shortcuts for Zoom In, Zoom Out, Reset, and Full Screen
window.addEventListener('keydown', (e) => {
  // Only trigger if in session view
  if (view !== 'session') return;

  // Esc key exits fullscreen modal
  if (e.key === 'Escape' && isModalFullscreen) {
    e.preventDefault();
    exitModalFullscreen();
    return;
  }

  // F11 toggles fullscreen
  if (e.key === 'F11') {
    e.preventDefault();
    toggleModalFullscreen();
    return;
  }

  // Ctrl/Cmd + =/+ Zoom In (expands modal to fullscreen if windowed)
  if ((e.ctrlKey || e.metaKey) && (e.key === '=' || e.key === '+')) {
    e.preventDefault();
    zoomIn();
  } else if ((e.ctrlKey || e.metaKey) && (e.key === '-' || e.key === '_')) {
    e.preventDefault();
    zoomOut();
  } else if ((e.ctrlKey || e.metaKey) && e.key === '0') {
    e.preventDefault();
    resetZoom();
  }
});

// Sync state if browser native fullscreen is dismissed via browser controls
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement && isModalFullscreen) {
    exitModalFullscreen();
  }
});

// Dynamic responsive auto-refit on window resize
window.addEventListener('resize', () => {
  if (activeFitAddon && activeXterm) {
    try { activeFitAddon.fit(); } catch (e) {}
  }
});
