#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
DOCKER_BIN="${DOCKER_BIN:-docker}"
echo "Building full Kali Rolling (large download; requires substantial Docker disk space)..."
if [[ "${1:-}" == "--upgrade" ]]; then
  "$DOCKER_BIN" build -t rangeforge/kali-custom:latest -f containers/workstation-kali/Dockerfile.tools containers/workstation-kali
else
  "$DOCKER_BIN" build --pull --no-cache -t rangeforge/kali-custom:latest -f containers/workstation-kali/Dockerfile.custom containers/workstation-kali
fi
"$DOCKER_BIN" run --rm rangeforge/kali-custom:latest bash -lc 'cat /etc/os-release; kali-tools; sudo -n true; ifconfig -a'
