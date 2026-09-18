import React, { useEffect, useState } from "react";
import { LAB_CATALOG } from "./data/constants";

import { initApp } from "./logic/app";
import { initDimension } from "./logic/dimension";

export default function App() {
  useEffect(() => {
    // Run vanilla JS initializers after React mounts the HTML
    let cleanupMotion: (() => void) | undefined;
    const startup = setTimeout(() => {
      try {
        initApp();
        cleanupMotion = initDimension();
      } catch (err) {
        console.error("Initialization error:", err);
      }
    }, 100);
    return () => { clearTimeout(startup); cleanupMotion?.(); };
  }, []);
  return (
    <>
      {/* Ported from vanilla HTML */}

      <a className="skip-link" href="#main-content">Skip to content</a>


      <div className="cyber-background">
        <div className="mouse-spotlight"></div>
        <div className="cyber-grid"></div>
        <div className="cyber-horizon-grid"></div>
        <div className="ambient-orb ambient-orb-1"></div>
        <div className="ambient-orb ambient-orb-2"></div>
        <div className="ambient-orb ambient-orb-3"></div>
      </div>

      <div className="app-container portal-modern">


        <div className="top-beacon-bar">
          <div className="beacon-status">
            <span className="pulse-dot"></span>
            <span>A SPACE TO BUILD YOUR CYBER SKILLS</span>
          </div>
          <div className="beacon-metrics">
            <div className="beacon-metric"><span>KALI ROLLING · UBUNTU 24.04</span></div>
            <div className="beacon-metric"><span>BUILT FOR HANDS-ON LEARNING</span></div>
          </div>
        </div>


        <header className="header-nav">
          <div className="container nav-inner">
            <a href="#hero" className="logo-brand">
              <div className="logo-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L3 7V12C3 17.5 6.8 21.7 12 23C17.2 21.7 21 17.5 21 12V7L12 2Z" fill="url(#rf-logo-grad)" stroke="#00f0ff" strokeWidth="1.8" strokeLinejoin="round" />
                  <path d="M12 7V17M8 11L12 7L16 11" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="rf-logo-grad" x1="3" y1="2" x2="21" y2="23" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00f0ff" stopOpacity="0.35" />
                      <stop offset="1" stopColor="#7c3aed" stopOpacity="0.45" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="logo-text-wrap">
                <span className="logo-title">Cyber <span className="logo-title-accent">Lab</span></span>
                <span className="logo-tag">TRAIN · ATTACK · DEFEND</span>
              </div>
            </a>

            <nav>
              <ul className="nav-links" id="nav-links">
                <li><a href="#labs" className="nav-link">Labs</a></li>
                <li><a href="#terminal-demo" className="nav-link">The workspace</a></li>
                <li><a href="#overview" className="nav-link">How it works</a></li>
                <li><a href="#docs" className="nav-link">Docs</a></li>
              </ul>
            </nav>

            <div className="nav-actions">

              <div className="auth-nav-group" id="auth-nav-group">
                <a href="/workspace/" className="nav-btn-login" id="btn-nav-login" title="Operator Log In">
                  Log In
                </a>
                <button className="nav-btn-signup" id="btn-nav-signup" title="Create Operator Account">
                  Get started ↗
                </button>
              </div>


              <div className="auth-logged-in" id="auth-logged-in" style={{ display: 'none' }}>
                <a href="/workspace/" className="operator-badge-pill" id="operator-badge-pill" style={{ cursor: 'pointer', textDecoration: 'none' }} title="Launch Cyber Lab Dashboard">
                  <span className="operator-avatar">🛡️</span>
                  <span className="operator-name" id="operator-name-display">Operator</span>
                  <span className="operator-level">L3</span>
                </a>
                <a href="/workspace/" className="nav-btn-signup" style={{ padding: '7px 14px', fontSize: '12px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Open Dashboard ↗
                </a>
                <button className="btn-logout-small" id="btn-nav-logout" title="Sign Out">Sign Out</button>
              </div>


              <div className="theme-toggle-wrap">
                <button className="theme-toggle-btn" id="btn-theme-toggle" title="Switch between Dark and Light mode" aria-label="Toggle Dark / Light Mode">
                  <span className="theme-toggle-slider"></span>
                  <span className="theme-label theme-label-dark active" id="lbl-dark">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                    <span>Dark</span>
                  </span>
                  <span className="theme-label theme-label-light" id="lbl-light">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
                    <span>Light</span>
                  </span>
                </button>
              </div>
              <button className="btn-mobile-menu" id="btn-mobile-menu" aria-label="Open Navigation Menu" aria-expanded="false" aria-controls="nav-links">
                ☰
              </button>
            </div>
          </div>
        </header>


        <main id="main-content">

          <section className="section hero-section" id="hero">
            <div className="container">
              <div className="hero-layout">
                <div className="hero-copy">
                  <div className="hero-pill-badge"><span className="pulse-dot"></span> THE CYBER LAB, REIMAGINED <span className="hero-badge-arrow">↗</span></div>
                  <h1 className="hero-title">Build skills.<br />Break limits.<br /><span>Stay curious.</span></h1>
                  <p className="hero-description">Your next breakthrough starts with a command. Explore hands-on security labs, experiment in Kali Linux and Ubuntu, and build the confidence to take on real challenges.</p>
                  <div className="hero-cta-group">
                    <a href="/workspace/" className="btn btn-primary btn-lg">Enter the lab <span aria-hidden="true">↗</span></a>
                    <a href="#labs" className="btn btn-secondary btn-lg">Explore challenges <span aria-hidden="true">↓</span></a>
                  </div>
                  <div className="hero-footnote"><span>Browser workspace</span><i aria-hidden="true"/><span>Kali &amp; Ubuntu containers</span><i aria-hidden="true"/><span>Learn by doing</span></div>
                </div>
                <div className="dimension-scene" aria-label="Animated three-dimensional Cyber Lab security core">
                  <div className="scene-stars" aria-hidden="true"></div>
                  <div className="scene-coordinate coord-top">CYBER LAB / EXPLORATION CORE <span>01 — 11</span></div>
                  <div className="scene-rotation" aria-hidden="true">
                    <div className="orbital-system">
                      <div className="orbit orbit-a"></div><div className="orbit orbit-b"></div><div className="orbit orbit-c"></div>
                      <div className="core-cube">
                        <div className="core-face core-front"><span>◈</span><small>CYBER LAB</small></div>
                        <div className="core-face core-back"><span>⌘</span><small>ISOLATED</small></div>
                        <div className="core-face core-right"><span>⌁</span><small>DEFEND</small></div>
                        <div className="core-face core-left"><span>›_</span><small>DISCOVER</small></div>
                        <div className="core-face core-top"><span>✧</span><small>EVOLVE</small></div>
                        <div className="core-face core-bottom"><span>◈</span><small>TRAIN</small></div>
                      </div>
                    </div>
                    <div className="core-platform platform-one"></div><div className="core-platform platform-two"></div><div className="core-platform platform-three"></div>
                  </div>
                  <div className="holo-chip chip-left"><span className="holo-icon">⌘</span><div><small>YOUR WORKSTATION</small><strong>4 vCPU · 3.5 GB</strong></div><i></i></div>
                  <div className="holo-chip chip-right"><span className="holo-icon">↗</span><div><small>FIND YOUR NEXT CHALLENGE</small><strong>7 paths to explore</strong></div></div>
                  <div className="holo-terminal"><div className="holo-terminal-head"><span><i></i><i></i><i></i></span><span>WORKSPACE PREVIEW</span><span>↗</span></div><p><em>root@kali</em> ~ # cat /etc/os-release</p><p className="holo-success">Kali GNU/Linux Rolling <b>▍</b></p></div>
                  <div className="scene-coordinate coord-bottom"><span>TRAIN / ATTACK / DEFEND</span><button id="motion-toggle" type="button" aria-pressed="false">Pause motion Ⅱ</button></div>
                </div>
              </div>
              <div className="hero-stats-row">
                <div className="hero-stat-card"><div className="hero-stat-val">11<span> practice labs</span></div><div className="hero-stat-label">A new challenge at every level.</div></div>
                <div className="hero-stat-card"><div className="hero-stat-val">2<span> Linux environments</span></div><div className="hero-stat-label">Kali Rolling and Ubuntu 24.04 LTS.</div></div>
                <div className="hero-stat-card"><div className="hero-stat-val">4<span> vCPU per lab</span></div><div className="hero-stat-label">Room to run your experiments.</div></div>
                <div className="hero-stat-card"><div className="hero-stat-val">Your<span> own pace</span></div><div className="hero-stat-label">Start small. Keep going.</div></div>
              </div>
            </div>
          </section>


          <section className="section" id="overview">
            <div className="container">
              <div className="section-header">
                <div className="section-badge purple">
                  <span>01 / BUILT FOR PRACTICE</span>
                </div>
                <h2 className="section-title">A little curiosity goes a long way.</h2>
                <p className="section-desc">
                  Choose a challenge, open your workspace, and start exploring. You bring the questions. The lab gives you room to find the answers.
                </p>
              </div>

              <div className="modern-learning-grid">
                <article className="modern-learning-card spatial-card"><div className="learning-top"><span className="learning-glyph">⌘</span><span>01 / CHOOSE</span></div><h3>Find your starting point.</h3><p>Learn Ubuntu fundamentals, explore network security, or dive into the Kali toolkit. Pick the challenge that meets you where you are.</p><a href="#labs">Explore the collection <span>↗</span></a></article>
                <article className="modern-learning-card spatial-card"><div className="learning-top"><span className="learning-glyph">&gt;_</span><span>02 / EXPERIMENT</span></div><h3>Make the terminal yours.</h3><p>Work through clear objectives in your own lab session. Run commands, follow the clues, and see what happens when you try something new.</p><a href="#terminal-demo">Try a practice command <span>↗</span></a></article>
                <article className="modern-learning-card spatial-card"><div className="learning-top"><span className="learning-glyph">↗</span><span>03 / GROW</span></div><h3>Turn practice into progress.</h3><p>Capture flags, review your session, and save useful discoveries. Every solved problem is another skill you can build on.</p><a href="/workspace/">Open your workspace <span>↗</span></a></article>
              </div>
              <div className="problem-solution-grid" hidden>

                <div className="comparison-box legacy tilt-card">
                  <div className="box-tag red">Traditional Cyber Labs</div>
                  <h3 className="box-header-title">Fragile, Costly, &amp; Convoluted</h3>
                  <ul className="comparison-list">
                    <li className="comparison-item">
                      <span className="comparison-icon">🚫</span>
                      <div>
                        <strong>Heavy Infrastructure Overhead</strong>
                        <span>Requires expensive hypervisors, 20GB+ VM images, and hours of network bridging before students run a single command.</span>
                      </div>
                    </li>
                    <li className="comparison-item">
                      <span className="comparison-icon">💸</span>
                      <div>
                        <strong>Prohibitive Recurring Costs</strong>
                        <span>Commercial platforms cost $14–$84/month per user, requiring continuous cloud connectivity and costly VM infrastructure.</span>
                      </div>
                    </li>
                    <li className="comparison-item">
                      <span className="comparison-icon">📉</span>
                      <div>
                        <strong>Work Lost on Disconnect</strong>
                        <span>No structured audit trail or command logs. When a VM session terminates, student proof-of-work vanishes into thin air.</span>
                      </div>
                    </li>
                    <li className="comparison-item">
                      <span className="comparison-icon">⚠️</span>
                      <div>
                        <strong>Cross-Student Contamination</strong>
                        <span>Shared training environments risk state drift, compromised target machines, and flag leaks across operators.</span>
                      </div>
                    </li>
                  </ul>
                </div>


                <div className="comparison-box rangeforge tilt-card">
                  <div className="box-tag cyan">The Cyber Lab Advantage</div>
                  <h3 className="box-header-title">Streamlined, Isolated, &amp; Real-Time</h3>
                  <ul className="comparison-list">
                    <li className="comparison-item">
                      <span className="comparison-icon">🐳</span>
                      <div>
                        <strong>Instant Ephemeral Docker Sandboxes</strong>
                        <span>Dedicated, lightweight containers spin up in milliseconds. Full isolation with automated pruning upon session completion.</span>
                      </div>
                    </li>
                    <li className="comparison-item">
                      <span className="comparison-icon">⌨️</span>
                      <div>
                        <strong>Real PTY Terminal via WebSocket</strong>
                        <span>Authentic Linux shell streaming directly to xterm.js over WebSockets. Real bash pipes, terminal signals, and keystrokes.</span>
                      </div>
                    </li>
                    <li className="comparison-item">
                      <span className="comparison-icon">💾</span>
                      <div>
                        <strong>Zero Data Loss Audit Architecture</strong>
                        <span>Downloadable session transcripts, complete command scrollbacks, and timestamped audit logs saved automatically.</span>
                      </div>
                    </li>
                    <li className="comparison-item">
                      <span className="comparison-icon">🔐</span>
                      <div>
                        <strong>Dynamic HMAC-SHA256 Flag Security</strong>
                        <span>Every session receives a cryptographically unique flag injected at boot time, preventing cheating and flag sharing.</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>


          <section className="section" id="terminal-demo">
            <div className="container">
              <div className="section-header">
                <div className="section-badge">
                  <span>02 / INTERACTIVE TERMINAL</span>
                </div>
                <h2 className="section-title">Your next discovery is one command away.</h2>
                <p className="section-desc">
                  Get a feel for the workflow with this interactive terminal simulation. Try a command, explore the tools, and capture your first practice flag.
                </p>
              </div>

              <div className="terminal-demo-wrapper">

                <div className="terminal-header">
                  <div className="terminal-window-dots">
                    <span className="t-dot red"></span>
                    <span className="t-dot yellow"></span>
                    <span className="t-dot green"></span>
                    <span className="terminal-title-pill">&gt;_ An introduction to the terminal</span>
                  </div>
                  <div className="terminal-session-telemetry">
                    <div className="telemetry-item"><span>INTERACTIVE DEMO</span></div>
                    <a className="terminal-live-link" href="/workspace/">Open a real lab ↗</a>
                  </div>
                </div>


                <div className="terminal-quick-pills">
                  <span className="quick-pill-label">Try Commands:</span>
                  <button className="command-pill" data-cmd="help">help</button>
                  <button className="command-pill" data-cmd="nmap 10.10.0.10">nmap 10.10.0.10</button>
                  <button className="command-pill" data-cmd="cat /flag.txt">cat /flag.txt</button>
                  <button className="command-pill" data-cmd="kali-tools">kali-tools</button>
                  <button className="command-pill" data-cmd="whoami">whoami</button>
                  <button className="command-pill" data-cmd="audit">audit</button>
                  <button className="command-pill" data-cmd="validate-flag RANGE{recon_master_2026}">validate-flag</button>
                  <button className="command-pill" data-cmd="clear">clear</button>
                </div>


                <div className="terminal-screen" id="terminal-screen">
                  <div className="terminal-output" id="terminal-output">

                    <div className="term-line cyan">Welcome to your first experiment.</div>
                    <div className="term-line muted">This is a practice preview. Launch a lab for the real Kali terminal.</div>
                    <div className="term-line green">Type 'help' to display available sandbox commands or click any command pill above.</div>
                    <div className="term-line muted">--------------------------------------------------------------------------------</div>
                  </div>


                  <div className="terminal-input-row">
                    <span className="terminal-prompt">
                      <span className="user">root</span>@<span className="path">kali</span>:~#
                    </span>
                    <input type="text" className="terminal-input" id="terminal-input" placeholder="Type command here (e.g. nmap 10.10.0.10, cat /flag.txt)..." autoComplete="off" spellCheck={false} />
                  </div>
                </div>


                <div className="terminal-footer-hint">
                  <span>Press <strong>Enter</strong> to execute · <strong>↑ / ↓</strong> for command history · <strong>Tab</strong> to autocomplete</span>
                  <span id="term-stats">Commands Run: 0 · Objectives: 0/3</span>
                </div>
              </div>
            </div>
          </section>


          <section className="section" id="labs">
            <div className="container">
              <div className="section-header">
                <div className="section-badge green">
                  <span>03 / THE LAB COLLECTION</span>
                </div>
                <h2 className="section-title">Find your next challenge.</h2>
                <p className="section-desc">
                  Choose from 7 Kali Linux labs and 4 dedicated Ubuntu labs, covering Linux fundamentals, file permissions, log analysis, and security tools.
                </p>
              </div>


              <div className="lab-catalog-controls">
                <div className="lab-domain-filters" id="lab-filters">
                  <button className="filter-btn active" data-filter="all">All Labs (11)</button>
                  <button className="filter-btn" data-filter="Kali Linux">Kali Linux labs</button><button className="filter-btn" data-filter="Ubuntu">Ubuntu labs</button><button className="filter-btn" data-filter="Linux Essentials">Linux Essentials</button>
                  <button className="filter-btn" data-filter="Network Security">Network Security</button>
                  <button className="filter-btn" data-filter="Web Security">Web Security</button>
                  <button className="filter-btn" data-filter="Digital Forensics">Digital Forensics</button>
                  <button className="filter-btn" data-filter="Incident Response">Incident Response</button>
                  <button className="filter-btn" data-filter="Offensive Security">Offensive Security</button>
                </div>

                <div className="lab-search-box">
                  <span className="search-icon-pos">🔍</span>
                  <input type="text" className="lab-search-input" id="lab-search" placeholder="Search labs or tools..." aria-label="Search labs or tools" />
                </div>
              </div>


              <div className="lab-grid" id="lab-cards-container">

              </div>
            </div>
          </section>


          <section className="section" id="kali-desktop">
            <div className="container">
              <div className="section-header">
                <div className="section-badge purple">
                  <span>04 / YOUR WORKSPACE</span>
                </div>
                <h2 className="section-title">A complete workspace. One browser tab.</h2>
                <p className="section-desc">
                  Explore the desktop preview: switch between your terminal, target application, files, and code. Everything you need, together in one focused workspace.
                </p>
              </div>

              <div className="desktop-showcase-box">

                <div className="desktop-taskbar-top">
                  <button className="kali-menu-btn" id="btn-kali-menu">
                    <span>🐉 Applications</span>
                  </button>

                  <div className="desktop-app-tabs">
                    <button className="desktop-tab-btn active" data-win="term">
                      <span>&gt;_</span> XFCE Terminal
                    </button>
                    <button className="desktop-tab-btn" data-win="browser">
                      <span>🌐</span> Chromium (Target App)
                    </button>
                    <button className="desktop-tab-btn" data-win="files">
                      <span>📁</span> Thunar File Manager
                    </button>
                    <button className="desktop-tab-btn" data-win="editor">
                      <span>📝</span> Mousepad (Exploit.py)
                    </button>
                  </div>

                  <div className="desktop-system-tray">
                    <span>📶 eth0: 10.10.0.15</span>
                    <span>🔊 100%</span>
                    <span id="desktop-clock">12:00 PM</span>
                  </div>
                </div>


                <div className="desktop-canvas">
                  <div className="desktop-wallpaper-logo">🐉</div>


                  <div className="desktop-window-view active" id="win-term">
                    <div className="win-titlebar">
                      <div className="win-titlebar-title">
                        <span>&gt;_</span> root@kali: ~ (XFCE Terminal)
                      </div>
                      <div className="win-controls">
                        <span className="win-btn" style={{ background: '#fbbf24' }}></span>
                        <span className="win-btn" style={{ background: '#34d399' }}></span>
                        <span className="win-btn" style={{ background: '#ef4444' }}></span>
                      </div>
                    </div>
                    <div className="win-body" style={{ background: '#080d14', color: '#e2e8f0' }}>
                      <div style={{ color: '#7b91a7', marginBottom: '8px' }}>Linux kali-rolling 6.6.15-amd64 · Dedicated Pod Sandbox</div>
                      <div style={{ color: '#34d399' }}>┌──(root㉿kali)-[~]</div>
                      <div><span style={{ color: '#34d399' }}>└─#</span> nmap -sV -sC 10.10.0.10</div>
                      <div style={{ color: '#7b91a7', margin: '6px 0' }}>Starting Nmap 7.94 ( https://nmap.org ) at 2026-09-17 12:00 UTC</div>
                      <div style={{ color: '#00f0ff' }}>PORT     STATE SERVICE VERSION</div>
                      <div>22/tcp   open  ssh     OpenSSH 9.3p1 Debian 1</div>
                      <div>80/tcp   open  http    Apache httpd 2.4.57 ((Debian))</div>
                      <div>443/tcp  open  ssl/ssl OpenSSL 3.0.11</div>
                      <div>3306/tcp open  mysql   MySQL 8.0.35</div>
                      <div style={{ color: '#34d399', marginTop: '8px' }}>┌──(root㉿kali)-[~]</div>
                      <div><span style={{ color: '#34d399' }}>└─#</span> <span style={{ color: '#00f0ff', animation: 'blink 1s infinite' }}>█</span></div>
                    </div>
                  </div>


                  <div className="desktop-window-view" id="win-browser">
                    <div className="win-titlebar">
                      <div className="win-titlebar-title">
                        <span>🌐</span> Chromium — Vulnerable Target Portal (http://10.10.0.10:8080)
                      </div>
                      <div className="win-controls">
                        <span className="win-btn" style={{ background: '#ef4444' }}></span>
                      </div>
                    </div>
                    <div className="win-body" style={{ background: '#0f172a', color: '#f8fafc', padding: '24px' }}>
                      <div style={{ background: '#1e293b', padding: '12px 18px', borderRadius: '6px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-display)', fontWeight: '700', color: '#38bdf8' }}>ACME CORP INTERNAL RECON PORTAL</span>
                        <span style={{ color: '#ef4444', fontSize: '11px', fontWeight: '600' }}>⚠️ STAGING ENVIRONMENT</span>
                      </div>
                      <p style={{ color: '#94a3b8', marginBottom: '12px' }}>Authentication Required. SQL Injection vulnerability detected in query parameter: <code>?user_id=1' OR '1'='1</code></p>
                      <div style={{ border: '1px dashed #38bdf8', padding: '14px', borderRadius: '6px', background: 'rgba(56, 189, 248, 0.05)' }}>
                        <div style={{ color: '#38bdf8', fontWeight: '600', marginBottom: '4px' }}>Server Response:</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#34d399' }}>[+] User: admin | Role: security_officer | Hash: $2y$12$e8...</div>
                      </div>
                    </div>
                  </div>


                  <div className="desktop-window-view" id="win-files">
                    <div className="win-titlebar">
                      <div className="win-titlebar-title">
                        <span>📁</span> Thunar — /root/investigation/evidence
                      </div>
                      <div className="win-controls">
                        <span className="win-btn" style={{ background: '#ef4444' }}></span>
                      </div>
                    </div>
                    <div className="win-body" style={{ background: '#0a1017', color: '#cbd5e1' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', padding: '10px' }}>
                        <div style={{ background: '#111c2a', padding: '14px', borderRadius: '6px', textAlign: 'center', border: '1px solid rgba(0,240,255,0.15)' }}>
                          <div style={{ fontSize: '26px' }}>📄</div>
                          <div style={{ fontWeight: '600', marginTop: '4px' }}>auth.log</div>
                          <div style={{ fontSize: '10px', color: '#64748b' }}>420 KB · System Log</div>
                        </div>
                        <div style={{ background: '#111c2a', padding: '14px', borderRadius: '6px', textAlign: 'center', border: '1px solid rgba(0,240,255,0.15)' }}>
                          <div style={{ fontSize: '26px' }}>📦</div>
                          <div style={{ fontWeight: '600', marginTop: '4px' }}>memory.dmp</div>
                          <div style={{ fontSize: '10px', color: '#64748b' }}>128 MB · RAM Capture</div>
                        </div>
                        <div style={{ background: '#111c2a', padding: '14px', borderRadius: '6px', textAlign: 'center', border: '1px solid rgba(52,211,153,0.3)' }}>
                          <div style={{ fontSize: '26px' }}>🚩</div>
                          <div style={{ fontWeight: '600', marginTop: '4px', color: '#34d399' }}>flag.txt</div>
                          <div style={{ fontSize: '10px', color: '#64748b' }}>32 Bytes · Captured</div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="desktop-window-view" id="win-editor">
                    <div className="win-titlebar">
                      <div className="win-titlebar-title">
                        <span>📝</span> Mousepad — /root/tools/payload.py
                      </div>
                      <div className="win-controls">
                        <span className="win-btn" style={{ background: '#ef4444' }}></span>
                      </div>
                    </div>
                    <div className="win-body" style={{ background: '#070b10', color: '#e2e8f0', fontFamily: 'var(--font-mono)' }}>
                      <span style={{ color: '#7b91a7' }}>#!/usr/bin/env python3</span><br />
                      <span style={{ color: '#a78bfa' }}>import</span> requests, hmac, hashlib<br /><br />
                      <span style={{ color: '#7b91a7' }}># Cyber Lab Exploit Verification Script</span><br />
                      target_url = <span style={{ color: '#34d399' }}>"http://10.10.0.10:8080/api/auth"</span><br />
                      session_token = <span style={{ color: '#00f0ff' }}>"rf_token_9f82d1c0"</span><br /><br />
                      <span style={{ color: '#fb923c' }}>def</span> <span style={{ color: '#38bdf8' }}>verify_breach</span>():<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;res = requests.get(target_url, headers={"{"}<span style={{ color: '#34d399' }}>"X-Session"</span>: session_token{"}"})<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#a78bfa' }}>if</span> res.status_code == 200:<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(<span style={{ color: '#34d399' }}>"[+] Target compromised! Dynamic flag verified."</span>)<br /><br />
                      verify_breach()
                    </div>
                  </div>

                </div>
              </div>


              <div className="desktop-feature-highlights">
                <div className="feature-pill-card">
                  <div className="feature-pill-icon">🖥️</div>
                  <h4>Draggable Windows &amp; Taskbar</h4>
                  <p>Simulates real window management with minimize, maximize, close, and taskbar pills—zero lag, zero streaming artifacts.</p>
                </div>
                <div className="feature-pill-card">
                  <div className="feature-pill-icon">🛠️</div>
                  <h4>50+ Simulated Tools</h4>
                  <p>Execute commands for Nmap, Hydra, SQLmap, Nikto, Metasploit, Wireshark, John the Ripper, Binwalk, and Hashcat.</p>
                </div>
                <div className="feature-pill-card">
                  <div className="feature-pill-icon">💾</div>
                  <h4>Integrated Transcript Save</h4>
                  <p>File menu and terminal action pills allow instant export of command scrollbacks, objective logs, and captured flags.</p>
                </div>
              </div>
            </div>
          </section>


          <section className="section" id="architecture">
            <div className="container">
              <div className="section-header">
                <div className="section-badge orange">
                  <span>05 / UNDER THE HOOD</span>
                </div>
                <h2 className="section-title">Engineered For High Concurrency &amp; Isolation</h2>
                <p className="section-desc">
                  Cyber Lab implements the Driver Pattern, allowing the exact same API and frontend to orchestrate local Docker engines, remote Kubernetes clusters, or offline mock drivers.
                </p>
              </div>

              <div className="arch-diagram-card">
                <div className="arch-layer-grid">


                  <div className="arch-node">
                    <div className="arch-node-header">
                      <span className="arch-node-title">🌐 Layer 1: Client Application (Browser SPA)</span>
                      <span className="arch-node-tag">ZERO-BUILD SPA</span>
                    </div>
                    <p className="arch-node-desc">
                      Pure Vanilla HTML5 / CSS3 / ES6+ JS · xterm.js v5 with WebLinks &amp; Fit Addons · localStorage Audit Cache · Dual Theme Engine
                    </p>
                  </div>

                  <div className="arch-connector">
                    <span>⬇ REST API (/api/*) + Bidirectional WebSocket Gateway (ws://.../ws/terminal/:id)</span>
                  </div>


                  <div className="arch-node">
                    <div className="arch-node-header">
                      <span className="arch-node-title">⚙️ Layer 2: Unified Node.js Server (Port 3001)</span>
                      <span className="arch-node-tag" style={{ color: 'var(--purple)', background: 'rgba(167,139,250,0.1)', borderColor: 'rgba(167,139,250,0.3)' }}>EXPRESS + WS</span>
                    </div>
                    <p className="arch-node-desc">
                      Singleton TerminalGateway · node-pty Pseudo-Terminal Bridge · HMAC-SHA256 Flag Signer · Rate Limiting · Static Asset Host
                    </p>
                  </div>

                  <div className="arch-connector">
                    <span>⬇ IOrchestrator Driver Interface (Factory Pattern)</span>
                  </div>


                  <div className="arch-sub-grid">
                    <div className="arch-sub-item">
                      <span className="title">DockerDriver</span>
                      <span className="desc">Production container creation, bridge networks, and auto-pruning</span>
                    </div>
                    <div className="arch-sub-item">
                      <span className="title">KubernetesDriver</span>
                      <span className="desc">Scales out to hundreds of operator pods with HPA &amp; namespaces</span>
                    </div>
                    <div className="arch-sub-item">
                      <span className="title">DevMockDriver</span>
                      <span className="desc">Simulates full terminal responses for offline UI demos</span>
                    </div>
                    <div className="arch-sub-item">
                      <span className="title">Traefik + Redis</span>
                      <span className="desc">Dynamic reverse proxy, SSL termination, and session TTL eviction</span>
                    </div>
                  </div>

                  <div className="arch-connector">
                    <span>⬇ Ephemeral Per-Session Containers (Isolated Network)</span>
                  </div>


                  <div className="arch-node" style={{ borderColor: 'rgba(52,211,153,0.35)' }}>
                    <div className="arch-node-header">
                      <span className="arch-node-title" style={{ color: 'var(--green)' }}>🐳 Layer 4: Ephemeral Target Pods</span>
                      <span className="arch-node-tag" style={{ color: 'var(--green)', background: 'rgba(52,211,153,0.1)', borderColor: 'rgba(52,211,153,0.3)' }}>ZERO PERSISTENCE</span>
                    </div>
                    <p className="arch-node-desc">
                      Kali Linux Sandboxes · Ubuntu 24.04 Workstations · DVWA Web Targets · Dynamic HMAC Flags Injected at Boot Time
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </section>


          <section className="section" id="audit">
            <div className="container">
              <div className="section-header">
                <div className="section-badge">
                  <span>06 / KEEP YOUR PROGRESS</span>
                </div>
                <h2 className="section-title">Save Terminal Progress &amp; Audit Trail</h2>
                <p className="section-desc">
                  Every command executed, every objective achieved, and all terminal scrollback is captured. Export clean, formatted forensic transcripts with a single click.
                </p>
              </div>

              <div className="audit-split">

                <div className="audit-feature-list">
                  <div className="audit-feature-item">
                    <span className="audit-item-icon">💾</span>
                    <div className="audit-item-content">
                      <h4>Workspace Save Progress</h4>
                      <p>Trigger a non-blocking snapshot download anytime without interrupting the active shell session.</p>
                    </div>
                  </div>

                  <div className="audit-feature-item">
                    <span className="audit-item-icon">📥</span>
                    <div className="audit-item-content">
                      <h4>Teardown Log Export</h4>
                      <p>Download full .txt log from the teardown dialog before container destruction and environment cleanup.</p>
                    </div>
                  </div>

                  <div className="audit-feature-item">
                    <span className="audit-item-icon">📋</span>
                    <div className="audit-item-content">
                      <h4>One-Click Buffer Copy</h4>
                      <p>Instantly copy the entire terminal scrollback to system clipboard with ANSI escape formatting stripped.</p>
                    </div>
                  </div>

                  <div className="audit-feature-item">
                    <span className="audit-item-icon">🔒</span>
                    <div className="audit-item-content">
                      <h4>Auto-Archive Checkbox</h4>
                      <p>Default silent backup to localStorage ensuring operators never lose evidence even on abrupt browser exit.</p>
                    </div>
                  </div>

                  <div style={{ marginTop: '12px' }}>
                    <button className="btn btn-green btn-lg" id="btn-download-sample-audit">
                      <span>📥 Download Sample Transcript (.txt)</span>
                    </button>
                  </div>
                </div>


                <div className="transcript-preview-box">
                  <div className="transcript-header">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--cyan)' }}>
                      📄 cyberlab_session_transcript.txt
                    </span>
                    <button className="btn btn-sm btn-outline" id="btn-copy-transcript">
                      📋 Copy Text
                    </button>
                  </div>
                  <pre className="transcript-code-block" id="transcript-code-preview">╔══════════════════════════════════════════════════════════════════════════╗
                    ║                    CYBER LAB SESSION TRANSCRIPT                         ║
                    ╚══════════════════════════════════════════════════════════════════════════╝

                    Session ID:    rf-9f82d1c0-44a2-4a0b-8d19-ee1239
                    Lab:           Network Reconnaissance (Kali Linux)
                    Operator:      Kartik Baniwal · Security Analyst (Level 3)
                    Timestamp:     2026-09-17T09:30:00Z
                    Status:        COMPLETED · ALL OBJECTIVES MET

                    [ OBJECTIVES PROGRESS ]
                    [✓] 1. Inspect local network configuration (ip addr)
                    [✓] 2. Enumerate active hosts & open ports (nmap 10.10.0.10)
                    [✓] 3. Locate and extract secret target flag (cat /flag.txt)

                    [ CAPTURED FLAG ]
                    Flag:        RANGE{"{"}map_the_network_2026{"}"}
                    Signature:   HMAC-SHA256 (VALIDATED)

                    [ COMMAND AUDIT LOG (4 Logged) ]
                    [09:30:15]  ip addr
                    [09:31:02]  nmap -sV 10.10.0.10
                    [09:33:40]  cat /flag.txt
                    [09:34:10]  validate-flag RANGE{"{"}map_the_network_2026{"}"}

                    [ TERMINAL SCROLLBACK EXTRACT ]
                    root@kali:~# nmap -sV 10.10.0.10
                    Starting Nmap 7.94 ( https://nmap.org )
                    Nmap scan report for 10.10.0.10
                    Host is up (0.00042s latency).
                    PORT   STATE SERVICE VERSION
                    22/tcp open  ssh     OpenSSH 9.3p1 Debian
                    80/tcp open  http    Apache httpd 2.4.57
                    Nmap done: 1 IP address (1 host up) scanned in 0.28 seconds
                    root@kali:~# cat /flag.txt
                    RANGE{"{"}map_the_network_2026{"}"}
============================================================================
Generated by Cyber Lab v2.9.0 Audit System · All rights reserved.</pre>
            </div>
          </div>
        </div>
      </section>


      <section className="section" id="calculator">
        <div className="container">
          <div className="section-header">
            <div className="section-badge purple">
              <span>07 / MEASURE YOUR GROWTH</span>
            </div>
            <h2 className="section-title">See how far you can go.</h2>
            <p className="section-desc">
              Test your proficiency standing. Use the sliders below to calculate your real-time Readiness Score and XP distribution using the Cyber Lab progression algorithm.
            </p>
          </div>

          <div className="calculator-box">
            <div className="calculator-grid">


              <div className="calc-sliders">
                <div className="slider-group">
                  <div className="slider-header">
                    <span className="slider-title">Labs Completed</span>
                    <span className="slider-val" id="val-labs">4 / 11</span>
                  </div>
                  <input type="range" className="calc-slider" id="slider-labs" min="0" max="11" value="4" />
                </div>

                <div className="slider-group">
                  <div className="slider-header">
                    <span className="slider-title">Mission Objectives Solved</span>
                    <span className="slider-val" id="val-objectives">12 / 33</span>
                  </div>
                  <input type="range" className="calc-slider" id="slider-objectives" min="0" max="33" value="12" />
                </div>

                <div className="slider-group">
                  <div className="slider-header">
                    <span className="slider-title">HMAC Flags Captured</span>
                    <span className="slider-val" id="val-flags">4 / 11</span>
                  </div>
                  <input type="range" className="calc-slider" id="slider-flags" min="0" max="11" value="4" />
                </div>

                <div style={{fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', background: 'rgba(0,240,255,0.05)', padding: '10px 14px', borderRadius: '6px', border: '1px solid rgba(0,240,255,0.15)'}}>
                  Formula: <code>min(100, round((Labs × 20 + Objectives × 4 + Flags × 8) / 1.7))</code>
                </div>
              </div>


              <div className="calc-result-panel">
                <div className="readiness-score-ring">
                  <div className="score-num" id="calc-score-display">94</div>
                </div>
                <div className="score-label" id="calc-rank-label">OPERATOR RANK: SENIOR SPECIALIST</div>


                <div className="domain-xp-bars">
                  <div className="xp-bar-item">
                    <div className="xp-bar-meta">
                      <span>Linux Essentials</span>
                      <span id="xp-linux">180 / 200 XP</span>
                    </div>
                    <div className="xp-track"><div className="xp-fill" id="bar-linux" style={{width: '90%'}}></div></div>
                  </div>

                  <div className="xp-bar-item">
                    <div className="xp-bar-meta">
                      <span>Network Security</span>
                      <span id="xp-network">150 / 150 XP</span>
                    </div>
                    <div className="xp-track"><div className="xp-fill" id="bar-network" style={{width: '100%'}}></div></div>
                  </div>

                  <div className="xp-bar-item">
                    <div className="xp-bar-meta">
                      <span>Web Security</span>
                      <span id="xp-web">160 / 200 XP</span>
                    </div>
                    <div className="xp-track"><div className="xp-fill" id="bar-web" style={{width: '80%'}}></div></div>
                  </div>

                  <div className="xp-bar-item">
                    <div className="xp-bar-meta">
                      <span>Digital Forensics</span>
                      <span id="xp-forensics">120 / 150 XP</span>
                    </div>
                    <div className="xp-track"><div className="xp-fill" id="bar-forensics" style={{width: '80%'}}></div></div>
                  </div>

                  <div className="xp-bar-item">
                    <div className="xp-bar-meta">
                      <span>Incident Response</span>
                      <span id="xp-ir">210 / 300 XP</span>
                    </div>
                    <div className="xp-track"><div className="xp-fill" id="bar-ir" style={{width: '70%'}}></div></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      <section className="section" id="docs">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <span>08 / THE DOCUMENTATION</span>
            </div>
            <h2 className="section-title">Comprehensive Documentation &amp; Guides</h2>
            <p className="section-desc">
              Explore the API specification, interactive endpoint runner, deployment scripts, and security architecture directly from the official project manual.
            </p>
          </div>

          <div className="docs-wrapper">

            <div className="docs-tabs-header">
              <button className="doc-tab-btn active" data-doc="deploy">🚀 Deployment Options</button>
              <button className="doc-tab-btn" data-doc="api">🔌 Backend API Tester</button>
              <button className="doc-tab-btn" data-doc="env">⚙️ Environment Variables</button>
              <button className="doc-tab-btn" data-doc="security">🛡️ Security Architecture</button>
            </div>


            <div className="docs-content-body">
              <div className="doc-pane active" id="pane-deploy">
                <h3 style={{fontSize: '20px', marginBottom: '14px'}}>Production-Ready Deployment Choices</h3>
                <p style={{color: 'var(--text-secondary)', marginBottom: '20px'}}>
                  Choose your deployment flavor. Cyber Lab runs seamlessly on a single developer laptop, inside Docker Compose, across local Wi-Fi for team trainings, or in Kubernetes.
                </p>

                <div className="deploy-tabs">
                  <button className="deploy-tab-btn active" data-target="dep-docker">Docker Compose (Recommended)</button>
                  <button className="deploy-tab-btn" data-target="dep-local">Local Dev (Zero Docker)</button>
                  <button className="deploy-tab-btn" data-target="dep-lan">LAN Wi-Fi Sharing</button>
                  <button className="deploy-tab-btn" data-target="dep-k8s">Kubernetes (Scale)</button>
                </div>

                <div className="deploy-code-box">
                  <button className="btn-copy-code" id="btn-copy-deploy">Copy Commands</button>
                  <pre style={{fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: '1.7', color: '#c6d4dc'}} id="deploy-code-text"># Option B: Full Containerized Stack (Traefik + Postgres + Redis + API)
git clone https://github.com/Kartik-baniwal/Cyber-Lab.git
cd Cyber-Lab
docker compose up -d

# Services will bind automatically:
# - Traefik Dashboard: http://localhost:8080
# - Cyber Lab App:    http://localhost:3001
# - PostgreSQL DB:     localhost:5432
# - Redis Cache:       localhost:6379</pre>
                </div>
              </div>


              <div className="doc-pane" id="pane-api">
                <h3 style={{fontSize: '20px', marginBottom: '14px'}}>Interactive REST API Test Runner</h3>
                <p style={{color: 'var(--text-secondary)', marginBottom: '16px'}}>
                  Base URL: <code>http://localhost:3001/api</code>. Click any endpoint below to test response payloads:
                </p>

                <div className="api-endpoint-selector">
                  <button className="api-ep-btn active" data-ep="health">GET /api/health</button>
                  <button className="api-ep-btn" data-ep="labs">GET /api/labs</button>
                  <button className="api-ep-btn" data-ep="session">POST /api/sessions</button>
                  <button className="api-ep-btn" data-ep="progress">GET /api/progress</button>
                </div>

                <div className="api-tester-card">
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)'}}>
                    <span>HTTP 200 OK · Content-Type: application/json</span>
                    <span id="api-latency">Response Time: 12ms</span>
                  </div>
                  <pre className="api-response-block" id="api-response-output">{"{"}
  "status": "ok",
  "uptime": 86420,
  "activeSessions": 3,
  "orchestrator": "DockerDriver",
  "clusterVersion": "2.9.0"
{"}"}</pre>
                </div>
              </div>


              <div className="doc-pane" id="pane-env">
                <h3 style={{fontSize: '20px', marginBottom: '14px'}}>Environment Variables &amp; Config</h3>
                <p style={{color: 'var(--text-secondary)', marginBottom: '16px'}}>
                  Cyber Lab is configured via root <code>.env</code> file. Default parameters out-of-the-box:
                </p>
                <div style={{overflowX: 'auto'}}>
                  <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '12.5px'}}>
                    <thead>
                      <tr style={{borderBottom: '1px solid var(--surface-border)', textAlign: 'left', color: 'var(--cyan)'}}>
                        <th style={{padding: '10px'}}>Variable</th>
                        <th style={{padding: '10px'}}>Default</th>
                        <th style={{padding: '10px'}}>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                        <td style={{padding: '10px', color: '#34d399'}}>PORT</td>
                        <td style={{padding: '10px'}}>3001</td>
                        <td style={{padding: '10px', color: 'var(--text-secondary)'}}>Server HTTP/WS listen port</td>
                      </tr>
                      <tr style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                        <td style={{padding: '10px', color: '#34d399'}}>ORCHESTRATOR_TYPE</td>
                        <td style={{padding: '10px'}}>docker</td>
                        <td style={{padding: '10px', color: 'var(--text-secondary)'}}>Driver mode: <code>docker</code> | <code>kubernetes</code> | <code>mock</code></td>
                      </tr>
                      <tr style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                        <td style={{padding: '10px', color: '#34d399'}}>HMAC_SECRET</td>
                        <td style={{padding: '10px'}}>(auto-generated)</td>
                        <td style={{padding: '10px', color: 'var(--text-secondary)'}}>Secret key for signing dynamic per-session CTF flags</td>
                      </tr>
                      <tr style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
                        <td style={{padding: '10px', color: '#34d399'}}>DATABASE_URL</td>
                        <td style={{padding: '10px'}}>postgres://...</td>
                        <td style={{padding: '10px', color: 'var(--text-secondary)'}}>PostgreSQL connection URI for sessions &amp; progress</td>
                      </tr>
                      <tr>
                        <td style={{padding: '10px', color: '#34d399'}}>REDIS_URL</td>
                        <td style={{padding: '10px'}}>redis://...</td>
                        <td style={{padding: '10px', color: 'var(--text-secondary)'}}>Redis URI for rate limiting &amp; session TTL eviction</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>


              <div className="doc-pane" id="pane-security">
                <h3 style={{fontSize: '20px', marginBottom: '14px'}}>Enterprise Security Architecture</h3>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '16px'}}>
                  <div style={{background: 'var(--bg-secondary)', padding: '18px', borderRadius: '8px', border: '1px solid var(--surface-border)'}}>
                    <h4 style={{color: 'var(--green)', marginBottom: '6px'}}>🔐 Dynamic Flag Injection</h4>
                    <p style={{fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5'}}>
                      Each session flag is computed via <code>HMAC-SHA256(sessionId + labId, HMAC_SECRET)</code>. Flags are injected exclusively at container creation into environment memory.
                    </p>
                  </div>
                  <div style={{background: 'var(--bg-secondary)', padding: '18px', borderRadius: '8px', border: '1px solid var(--surface-border)'}}>
                    <h4 style={{color: 'var(--cyan)', marginBottom: '6px'}}>🏰 Sandboxed Isolation</h4>
                    <p style={{fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5'}}>
                      Containers run in dedicated bridge networks without host mounts. Memory and CPU limits prevent container escape or resource exhaustion.
                    </p>
                  </div>
                  <div style={{background: 'var(--bg-secondary)', padding: '18px', borderRadius: '8px', border: '1px solid var(--surface-border)'}}>
                    <h4 style={{color: 'var(--purple)', marginBottom: '6px'}}>🛡️ Non-Sequential UUIDs</h4>
                    <p style={{fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5'}}>
                      All session identifiers use cryptographically secure v4 UUIDs, preventing enumeration attacks or cross-tenant session hijacking.
                    </p>
                  </div>
                  <div style={{background: 'var(--bg-secondary)', padding: '18px', borderRadius: '8px', border: '1px solid var(--surface-border)'}}>
                    <h4 style={{color: 'var(--orange)', marginBottom: '6px'}}>⚡ Redis-Backed Rate Limiting</h4>
                    <p style={{fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5'}}>
                      Redis token bucket rate limiters prevent container farm abuse. Automated TTL handlers prune orphan sessions on disconnect.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      <section className="section" id="quickstart">
        <div className="container">
          <div className="cta-banner">
            <h2 className="cta-title text-gradient-cyan">Your next chapter starts in the range.</h2>
            <p className="cta-desc">
              Empower your security teams, universities, and students with hands-on cyber defense skills. No credit card required, 100% open-source under MIT license.
            </p>

            <div className="quickstart-code-wrapper">
              <button className="btn-copy-code" id="btn-copy-cta">Copy</button>
              <code>git clone https://github.com/Kartik-baniwal/Cyber-Lab.git &amp;&amp; cd Cyber-Lab &amp;&amp; npm start</code>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap'}}>
              <a href="https://github.com/Kartik-baniwal/Cyber-Lab" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                <span>⭐ Star on GitHub</span>
              </a>
              <button className="btn btn-secondary btn-lg" id="btn-cta-deck">
                <span>📑 View 12-Slide Pitch Deck</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>


    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">

          <div className="footer-brand">
            <a href="#hero" className="logo-brand">
              <div className="logo-icon">🛡️</div>
              <div className="logo-text-wrap">
                <span className="logo-title">Cyber Lab</span>
                <span className="logo-tag">TRAIN · ATTACK · DEFEND</span>
              </div>
            </a>
            <p>
              Next-generation cybersecurity training platform. Real containers, real PTY terminal streaming, and dedicated Kali Linux and Ubuntu environments right in your browser.
            </p>
            <div style={{marginTop: '16px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--cyan)'}}>
              Created by Kartik Baniwal
            </div>
          </div>

          <div className="footer-col">
            <h5>Labs Catalog</h5>
            <ul className="footer-links">
              <li><a href="#labs" className="footer-link">Linux Fundamentals</a></li>
              <li><a href="#labs" className="footer-link">Network Reconnaissance</a></li>
              <li><a href="#labs" className="footer-link">Web App Security</a></li>
              <li><a href="#labs" className="footer-link">Digital Forensics</a></li>
              <li><a href="#labs" className="footer-link">Contain the Breach</a></li>
              <li><a href="/workspace/" className="footer-link">Kali Linux labs</a></li><li><a href="/workspace/" className="footer-link">Ubuntu labs</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Architecture</h5>
            <ul className="footer-links">
              <li><a href="#architecture" className="footer-link">Driver Pattern</a></li>
              <li><a href="#architecture" className="footer-link">Docker Engine</a></li>
              <li><a href="#architecture" className="footer-link">WebSocket Gateway</a></li>
              <li><a href="#architecture" className="footer-link">Dynamic HMAC Flags</a></li>
              <li><a href="#audit" className="footer-link">Audit &amp; Progress</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Resources</h5>
            <ul className="footer-links">
              <li><a href="#docs" className="footer-link">Documentation</a></li>
              <li><a href="#docs" className="footer-link">API Reference</a></li>
              <li><a href="#docs" className="footer-link">Deployment Guide</a></li>
              <li><a href="https://github.com/Kartik-baniwal/Cyber-Lab" target="_blank" className="footer-link">GitHub Repository</a></li>
              <li><a href="#hero" id="footer-deck-link" className="footer-link">Presentation Slides</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <div>© 2026 Cyber Lab. Released under MIT License · Author: Kartik Baniwal.</div>
          <div>Version 2.9.0 · Zero-Build SPA Architecture</div>
        </div>
      </div>
    </footer>

  </div>




  <div className="modal-backdrop" id="auth-modal" aria-hidden="true">
    <div className="modal-container" style={{maxWidth: '440px'}}>
      <div className="modal-header">
        <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
          <span style={{fontSize: '22px'}}>🛡️</span>
          <h3 style={{fontSize: '18px'}} id="auth-modal-title">Operator Access Gate</h3>
        </div>
        <button className="modal-close-btn" id="btn-close-auth-modal" aria-label="Close Modal">✕</button>
      </div>

      <div className="modal-body" style={{padding: '24px'}}>

        <div className="auth-tabs" style={{display: 'flex', borderBottom: '1px solid var(--surface-border)', marginBottom: '22px'}}>
          <button className="auth-tab active" id="auth-tab-login" type="button" style={{flex: '1', padding: '10px', background: 'transparent', border: 'none', borderBottom: '2px solid var(--cyan)', color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: '600', cursor: 'pointer'}}>
            Log In
          </button>
          <button className="auth-tab" id="auth-tab-signup" type="button" style={{flex: '1', padding: '10px', background: 'transparent', border: 'none', borderBottom: '2px solid transparent', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: '600', cursor: 'pointer'}}>
            Get started ↗
          </button>
        </div>


        {/* Auth Error Message */}
        <div id="auth-error-msg" style={{display: 'none', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.4)', color: '#fca5a5', padding: '10px 14px', borderRadius: '6px', fontSize: '12px', marginBottom: '16px', fontFamily: 'var(--font-mono)'}}>
          <span id="auth-error-text">⚠️ Invalid email or password. Please verify credentials.</span>
        </div>

        <form id="auth-form">
          <div className="auth-field-group" id="field-name-group" style={{display: 'none', marginBottom: '16px'}}>
            <label style={{display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '6px'}}>Operator Handle / Full Name</label>
            <input type="text" id="auth-input-name" className="lab-search-input" placeholder="e.g. Kartik Baniwal" style={{padding: '10px 14px'}} />
          </div>

          <div className="auth-field-group" style={{marginBottom: '16px'}}>
            <label style={{display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '6px'}}>Email Address</label>
            <input type="email" id="auth-input-email" className="lab-search-input" placeholder="operator@example.com" required style={{padding: '10px 14px'}} />
          </div>

          <div className="auth-field-group" style={{marginBottom: '18px'}}>
            <label style={{display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '6px'}}>Password</label>
            <input type="password" id="auth-input-pass" className="lab-search-input" placeholder="••••••••••••" required style={{padding: '10px 14px'}} />
          </div>

          <div className="auth-field-group" id="field-role-group" style={{display: 'none', marginBottom: '20px'}}>
            <label style={{display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '6px'}}>Primary Specialization</label>
            <select id="auth-input-role" className="lab-search-input" style={{padding: '10px 14px', background: 'var(--surface)', color: 'var(--text-primary)'}}>
              <option value="Security Analyst">Security Analyst</option>
              <option value="Penetration Tester">Penetration Tester</option>
              <option value="Incident Responder">Incident Responder</option>
              <option value="Student / Researcher">Student / Researcher</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" id="btn-auth-submit" style={{width: '100%'}}>
            Log In to Cyber Lab
          </button>
        </form>

        <p style={{fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '16px'}} id="auth-switch-prompt">
          Don't have an operator profile? <a href="#" id="link-switch-auth" style={{color: 'var(--cyan)', textDecoration: 'none'}}>Create account</a>
        </p>

        {/* Demo Credentials Helper Box */}
        <div id="auth-demo-hint-box" style={{marginTop: '18px', padding: '12px 14px', background: 'rgba(0,240,255,0.04)', border: '1px dashed rgba(0,240,255,0.25)', borderRadius: '6px', fontSize: '11.5px', fontFamily: 'var(--font-mono)'}}>
          <div style={{color: 'var(--cyan)', fontWeight: '600', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px'}}>
            <span>🔑</span> <span>Operator Credentials:</span>
          </div>
          <div style={{color: 'var(--text-secondary)', marginBottom: '3px'}}>
            • Admin: <code style={{color: '#34d399'}}>admin@cyberlab.io</code> / <code style={{color: '#34d399'}}>admin123</code>
          </div>
          <div style={{color: 'var(--text-secondary)', marginBottom: '3px'}}>
            • Analyst: <code style={{color: '#34d399'}}>kartik@cyberlab.io</code> / <code style={{color: '#34d399'}}>cyberlab2026</code>
          </div>
          <div style={{color: 'var(--text-muted)', fontSize: '11px', marginTop: '5px'}}>
            Or click <strong>Get started ↗</strong> to register a new account.
          </div>
        </div>
      </div>
    </div>
  </div>


  <div className="modal-backdrop" id="lab-detail-modal" aria-hidden="true">
    <div className="modal-container">
      <div className="modal-header">
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <span style={{fontSize: '24px'}} id="modal-lab-icon">🎯</span>
          <div>
            <h3 style={{fontSize: '18px'}} id="modal-lab-title">Lab Details</h3>
            <span style={{fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--cyan)'}} id="modal-lab-domain">DOMAIN</span>
          </div>
        </div>
        <button className="modal-close-btn" id="btn-close-lab-modal" aria-label="Close Modal">✕</button>
      </div>

      <div className="modal-body" id="modal-lab-body">

      </div>

      <div className="modal-footer">
        <button className="btn btn-outline btn-sm" id="btn-modal-cancel">Close</button>
        <button className="btn btn-primary btn-sm" id="btn-modal-launch">⚡ Launch Sandbox Demo</button>
      </div>
    </div>
  </div>


  <div className="modal-backdrop" id="presentation-modal" aria-hidden="true">
    <div className="modal-container modal-deck-container">
      <div className="modal-header" style={{background: '#09121d'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <span style={{fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: '700', color: 'var(--cyan)'}}>CYBER LAB PITCH DECK</span>
          <span style={{fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)'}} id="deck-slide-counter">01 / 12</span>
        </div>
        <button className="modal-close-btn" id="btn-close-presentation" aria-label="Close Presentation">✕</button>
      </div>


      <div className="deck-view-screen" id="deck-viewport">

      </div>


      <div className="deck-nav-controls">
        <button className="btn btn-outline btn-sm" id="deck-btn-prev">← Previous</button>
        <div className="deck-dots-wrap" id="deck-dots"></div>
        <button className="btn btn-primary btn-sm" id="deck-btn-next">Next →</button>
      </div>
    </div>
  </div>


  <div className="toast-notice" id="toast-notice">
    <span id="toast-icon">✓</span>
    <span id="toast-msg">Action completed</span>
  </div>


  <button className="floating-theme-btn" id="btn-floating-theme" title="Switch Dark / Light Mode" aria-label="Switch Dark and Light Theme">
    <span className="floating-theme-icon" id="floating-theme-icon">🌙</span>
    <span className="floating-theme-text" id="floating-theme-text">Dark Mode</span>
  </button>




    </>
  );
}
