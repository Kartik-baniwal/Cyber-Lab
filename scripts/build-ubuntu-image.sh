#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
DOCKER_BIN="${DOCKER_BIN:-docker}"
echo "Building the separate Ubuntu 24.04 terminal workstation..."
"$DOCKER_BIN" build --pull --no-cache -t cyberrange/workstation-ubuntu:latest containers/workstation-ubuntu
"$DOCKER_BIN" run --rm cyberrange/workstation-ubuntu:latest bash -lc 'test "$(. /etc/os-release; echo "$ID")" = ubuntu && command -v script && python3 --version && cat /etc/os-release'
