#!/usr/bin/env bash
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive
apt-get update
# Install maintained category collections with all recommended dependencies.
apt-get install -y --install-recommends \
  kali-tools-web kali-tools-information-gathering \
  kali-tools-vulnerability kali-tools-sniffing-spoofing \
  bash bash-completion coreutils findutils diffutils grep sed gawk \
  util-linux procps psmisc file tree plocate less man-db manpages \
  manpages-dev info nano vim-tiny tar gzip bzip2 xz-utils zip unzip \
  sudo passwd acl attr rsync lsof strace time bc jq curl wget git \
  openssh-client net-tools iproute2 iputils-ping iputils-tracepath \
  bind9-dnsutils traceroute whois netcat-openbsd tcpdump python3 python3-pip \
  build-essential cron logrotate
# Fail the build if dependencies are broken; store a reproducible package manifest.
apt-get check
mkdir -p /usr/local/share/kali-lab
for group in kali-tools-web kali-tools-information-gathering kali-tools-vulnerability kali-tools-sniffing-spoofing; do
  test "$(dpkg-query -W -f='${Status}' "$group")" = 'install ok installed'
done
dpkg-query -W -f='${binary:Package}\t${Version}\t${Status}\n' > /usr/local/share/kali-lab/packages.tsv
apt-get clean
rm -rf /var/lib/apt/lists/*
