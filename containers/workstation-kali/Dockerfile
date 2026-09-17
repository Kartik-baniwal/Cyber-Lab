# Production Kali Linux Workstation Container for Cyberrange
# Includes KasmVNC HTML5 Desktop, code-server, and PTY Terminal Server
FROM kalilinux/kali-rolling:latest

ENV DEBIAN_FRONTEND=noninteractive
ENV USER=learner
ENV HOME=/home/learner

# 1. Install core tools, XFCE4, and audio/graphics libraries
RUN apt-get update && apt-get install -y --no-install-recommends \
    sudo \
    curl \
    wget \
    git \
    vim \
    nano \
    net-tools \
    iproute2 \
    iputils-ping \
    nmap \
    python3 \
    python3-pip \
    xfce4 \
    xfce4-terminal \
    dbus-x11 \
    xauth \
    xinit \
    x11-xserver-utils \
    libnss3 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# 2. Install KasmVNC Server (Latest Debian release)
RUN KASM_DEB="kasmvncserver_jammy_1.3.1_amd64.deb" && \
    wget https://github.com/kasmtech/KasmVNC/releases/download/v1.3.1/${KASM_DEB} && \
    dpkg -i ${KASM_DEB} || apt-get install -f -y && \
    rm -f ${KASM_DEB}

# 3. Install code-server (VS Code web editor)
RUN curl -fsSL https://code-server.dev/install.sh | sh

# 4. Create learner user with isolated permissions
RUN useradd -m -s /bin/bash -u 1000 learner && \
    echo "learner ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/learner && \
    chmod 0440 /etc/sudoers.d/learner

# 5. Set up workspace directory and KasmVNC config
USER learner
WORKDIR /home/learner/lab

RUN mkdir -p /home/learner/.vnc && \
    mkdir -p /home/learner/.config/code-server

# Expose KasmVNC (6901), PTY Streamer (8081), and code-server (8443)
EXPOSE 6901 8081 8443

# Entrypoint starts XFCE desktop under KasmVNC and launches code-server
CMD ["sh", "-c", "code-server --bind-addr 0.0.0.0:8443 --auth none /home/learner/lab & vncserver -select-de xfce :1 -websocketPort 6901 -geometry 1280x720 -depth 24 && tail -f /dev/null"]
