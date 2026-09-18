"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LAB_CATALOG = void 0;
const KALI_LABS = [
    {
        id: 'linux',
        name: 'Linux fundamentals',
        category: 'LINUX ESSENTIALS',
        level: 'Beginner',
        time: 30,
        icon: '>_',
        color: '',
        desc: 'Find your footing in the shell. Navigate files, inspect permissions, and uncover a hidden flag.',
        tags: ['Linux', 'Command line'],
        os: 'Kali Linux',
        tasks: ['Find your working directory', 'List the lab files', 'Capture the hidden flag'],
        commands: ['pwd', 'ls -la', 'cat flag.txt'],
        defaultFlagPattern: 'RANGE{first_steps}',
        workstationImage: 'rangeforge/kali-custom:latest',
        objectives: [
            { id: 'linux_1', title: 'Find your working directory', command: 'pwd', hint: 'Type pwd in the terminal.' },
            { id: 'linux_2', title: 'List the lab files', command: 'ls -la', hint: 'Type ls -la to see all files including hidden files.' },
            { id: 'linux_3', title: 'Capture the hidden flag', command: 'cat flag.txt', hint: 'Read flag.txt and submit the contents.', isFlagObjective: true }
        ]
    },
    {
        id: 'recon',
        name: 'Network reconnaissance',
        category: 'NETWORK SECURITY',
        level: 'Beginner',
        time: 45,
        icon: '⌘',
        color: 'blue',
        desc: 'Map an isolated network and discover the services running beneath the surface.',
        tags: ['Networking', 'Enumeration'],
        os: 'Kali Linux',
        tasks: ['Inspect your network address', 'Discover target services', 'Capture the service flag'],
        commands: ['ip addr', 'nmap target', 'cat flag.txt'],
        defaultFlagPattern: 'RANGE{map_the_network}',
        workstationImage: 'rangeforge/kali-custom:latest',
        targetImage: 'cyberrange/target-recon:latest',
        targetPorts: [22, 8080],
        objectives: [
            { id: 'recon_1', title: 'Inspect your network address', command: 'ip addr', hint: 'Run ip addr or ip a to view your assigned IP.' },
            { id: 'recon_2', title: 'Discover target services', command: 'nmap target', hint: 'Scan the lab target using nmap target or nmap 10.10.0.10.' },
            { id: 'recon_3', title: 'Capture the service flag', command: 'cat flag.txt', hint: 'Inspect the discovered services to retrieve the flag.', isFlagObjective: true }
        ]
    },
    {
        id: 'web',
        name: 'Web application security',
        category: 'WEB SECURITY',
        level: 'Intermediate',
        time: 60,
        icon: '⊞',
        color: 'orange',
        desc: 'Investigate a vulnerable web application and learn to recognize common security flaws.',
        tags: ['HTTP', 'OWASP'],
        os: 'Kali Linux',
        tasks: ['Inspect the HTTP response', 'Review the application notes', 'Capture the application flag'],
        commands: ['curl target:8080', 'cat notes.txt', 'cat flag.txt'],
        defaultFlagPattern: 'RANGE{web_detective}',
        workstationImage: 'rangeforge/kali-custom:latest',
        targetImage: 'cyberrange/target-vulnerable-web:latest',
        targetPorts: [8080],
        objectives: [
            { id: 'web_1', title: 'Inspect the HTTP response', command: 'curl target:8080', hint: 'Use curl target:8080 to fetch the homepage headers and HTML.' },
            { id: 'web_2', title: 'Review the application notes', command: 'cat notes.txt', hint: 'Read notes.txt to review developer comments and vulnerabilities.' },
            { id: 'web_3', title: 'Capture the application flag', command: 'cat flag.txt', hint: 'Extract the token from the web vulnerability and verify the flag.', isFlagObjective: true }
        ]
    },
    {
        id: 'permissions',
        name: 'Permission denied',
        category: 'SYSTEM HARDENING',
        level: 'Intermediate',
        time: 45,
        icon: '♧',
        color: 'purple',
        desc: 'Audit file access and fix a misconfiguration before it becomes a security incident.',
        tags: ['Permissions', 'Hardening'],
        os: 'Kali Linux',
        tasks: ['Inspect file permissions', 'Secure the configuration file', 'Capture the hardening flag'],
        commands: ['ls -la', 'chmod 600 config.yml', 'cat flag.txt'],
        defaultFlagPattern: 'RANGE{least_privilege}',
        workstationImage: 'rangeforge/kali-custom:latest',
        objectives: [
            { id: 'perm_1', title: 'Inspect file permissions', command: 'ls -la', hint: 'Check the permissions of config.yml with ls -la.' },
            { id: 'perm_2', title: 'Secure the configuration file', command: 'chmod 600 config.yml', hint: 'Restrict config.yml to read/write by owner using chmod 600 config.yml.' },
            { id: 'perm_3', title: 'Capture the hardening flag', command: 'cat flag.txt', hint: 'View flag.txt after successfully hardening the permissions.', isFlagObjective: true }
        ]
    },
    {
        id: 'forensics',
        name: 'Follow the evidence',
        category: 'DIGITAL FORENSICS',
        level: 'Intermediate',
        time: 60,
        icon: '⌕',
        color: 'blue',
        desc: 'Piece together a timeline from system logs and trace the source of unusual activity.',
        tags: ['Log analysis', 'Investigation'],
        os: 'Kali Linux',
        tasks: ['Read the system log', 'Identify failed sign-ins', 'Capture the evidence flag'],
        commands: ['cat auth.log', 'grep failed auth.log', 'cat flag.txt'],
        defaultFlagPattern: 'RANGE{follow_the_evidence}',
        workstationImage: 'rangeforge/kali-custom:latest',
        objectives: [
            { id: 'foren_1', title: 'Read the system log', command: 'cat auth.log', hint: 'Display auth.log to inspect authentication entries.' },
            { id: 'foren_2', title: 'Identify failed sign-ins', command: 'grep failed auth.log', hint: 'Filter for unauthorized access attempts with grep failed auth.log.' },
            { id: 'foren_3', title: 'Capture the evidence flag', command: 'cat flag.txt', hint: 'Trace the compromised account to verify the forensic flag.', isFlagObjective: true }
        ]
    },
    {
        id: 'incident',
        name: 'Contain the breach',
        category: 'INCIDENT RESPONSE',
        level: 'Advanced',
        time: 90,
        icon: 'ϟ',
        color: 'orange',
        desc: 'Investigate suspicious processes and contain a simulated compromised workstation.',
        tags: ['Processes', 'Blue team'],
        os: 'Kali Linux',
        tasks: ['Inspect running processes', 'Stop the suspicious process', 'Capture the response flag'],
        commands: ['ps aux', 'kill 4242', 'cat flag.txt'],
        defaultFlagPattern: 'RANGE{incident_contained}',
        workstationImage: 'rangeforge/kali-custom:latest',
        objectives: [
            { id: 'inc_1', title: 'Inspect running processes', command: 'ps aux', hint: 'Find the suspicious process with ps aux.' },
            { id: 'inc_2', title: 'Stop the suspicious process', command: 'kill 4242', hint: 'Terminate the rogue process PID using kill 4242.' },
            { id: 'inc_3', title: 'Capture the response flag', command: 'cat flag.txt', hint: 'Validate that the incident has been successfully contained.', isFlagObjective: true }
        ]
    },
    {
        id: 'kali-sandbox',
        name: 'Kali Linux Full OS & Tools',
        category: 'OFFENSIVE SECURITY',
        level: 'Advanced',
        time: 120,
        icon: '🐉',
        color: 'blue',
        desc: 'Unrestricted Kali Linux rolling environment with the full offensive security toolkit: Nmap, Metasploit, SQLmap, Hydra, John the Ripper, Wireshark, Gobuster, and root shell. Practice all Kali Linux commands in an isolated sandbox.',
        tags: ['Kali Linux', 'Full OS', 'Nmap', 'Metasploit', 'Tools', 'Red Team'],
        os: 'Kali Linux',
        tasks: [
            'Verify Kali environment & kernel (uname -a & whoami)',
            'Inspect pre-installed offensive security tools (kali-tools)',
            'Execute targeted vulnerability scan & extract flag (cat flag.txt)'
        ],
        commands: ['uname -a', 'kali-tools', 'cat flag.txt'],
        defaultFlagPattern: 'RANGE{kali_full_os_mastery_2026}',
        workstationImage: 'rangeforge/kali-custom:latest',
        targetImage: 'cyberrange/target-recon:latest',
        targetPorts: [22, 80, 8080],
        objectives: [
            { id: 'kali_1', title: 'Verify Kali environment & kernel', command: 'uname -a', hint: 'Run uname -a or whoami to inspect system kernel & privileges.' },
            { id: 'kali_2', title: 'Inspect pre-installed offensive security tools', command: 'kali-tools', hint: 'Run kali-tools or which nmap msfconsole to see available utilities.' },
            { id: 'kali_3', title: 'Execute targeted vulnerability scan & extract flag', command: 'cat flag.txt', hint: 'Run nmap target and cat flag.txt to verify root flag.', isFlagObjective: true }
        ]
    }
];
// Separate identities keep Ubuntu progress and flags independent of Kali labs.
const ubuntuTemplates = [
    { source: 'linux', id: 'ubuntu-fundamentals', name: 'Ubuntu fundamentals' },
    { source: 'permissions', id: 'ubuntu-permissions', name: 'Ubuntu file permissions' },
    { source: 'forensics', id: 'ubuntu-forensics', name: 'Ubuntu log analysis' }
];
const UBUNTU_LABS = ubuntuTemplates.map(({ source, id, name }) => {
    const template = KALI_LABS.find(lab => lab.id === source);
    return {
        ...template, id, name, os: 'Ubuntu',
        workstationImage: 'cyberrange/workstation-ubuntu:latest',
        tags: ['Ubuntu', ...template.tags],
        defaultFlagPattern: `RANGE{${id.replace(/-/g, '_')}}`,
        tasks: [...template.tasks], commands: [...template.commands],
        objectives: template.objectives.map((objective, index) => ({ ...objective, id: `${id}_${index + 1}` }))
    };
});
UBUNTU_LABS.push({
    id: 'ubuntu-sandbox', name: 'Ubuntu workstation', category: 'UBUNTU PRACTICE',
    level: 'Beginner', time: 120, icon: '>_', color: 'orange',
    desc: 'Explore your own Ubuntu 24.04 container with Bash, Python, editors, and networking utilities.',
    tags: ['Ubuntu', 'Bash', 'Python'], os: 'Ubuntu',
    workstationImage: 'cyberrange/workstation-ubuntu:latest',
    defaultFlagPattern: 'RANGE{ubuntu_workstation}',
    tasks: ['Identify Ubuntu', 'Check Python', 'Capture the workstation flag'],
    commands: ['cat /etc/os-release', 'python3 --version', 'cat flag.txt'],
    objectives: [
        { id: 'ubuntu_sandbox_1', title: 'Identify Ubuntu', command: 'cat /etc/os-release', hint: 'Read /etc/os-release to identify your OS.' },
        { id: 'ubuntu_sandbox_2', title: 'Check Python', command: 'python3 --version', hint: 'Print the installed Python version.' },
        { id: 'ubuntu_sandbox_3', title: 'Capture the workstation flag', command: 'cat flag.txt', hint: 'Read flag.txt and submit its contents.', isFlagObjective: true }
    ]
});
exports.LAB_CATALOG = [...KALI_LABS, ...UBUNTU_LABS];
