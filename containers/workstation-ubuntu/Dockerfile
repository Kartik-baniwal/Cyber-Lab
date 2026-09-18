FROM ubuntu:24.04

RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    bash bash-completion ca-certificates coreutils curl wget git nano vim-tiny \
    sudo util-linux procps psmisc less file findutils grep sed gawk \
    iproute2 iputils-ping net-tools dnsutils netcat-openbsd openssh-client \
    python3 python3-pip python3-venv tar unzip zip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /root
RUN printf '%s\n' 'Training workspace: inspect the files and complete your lab objectives.' > notes.txt \
    && printf '%s\n' 'service: training-app' 'debug: false' > config.yml \
    && chmod 644 config.yml \
    && printf '%s\n' '09:41 sign-in accepted: learner' '09:42 failed sign-in: unknown' '09:43 failed sign-in: unknown' > auth.log

ENV TERM=xterm-256color
CMD ["sleep", "infinity"]
