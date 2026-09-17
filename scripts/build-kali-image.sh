#!/usr/bin/env bash
set -e

# RangeForge - Build Custom Kali Linux Docker Image
echo "=== Building Custom Kali Linux Image for RangeForge ==="
DOCKER_BIN=$(which docker || echo "/usr/local/bin/docker")

$DOCKER_BIN build -t rangeforge/kali-custom:latest -f containers/workstation-kali/Dockerfile.custom .

echo "=== Build Complete ==="
$DOCKER_BIN images | grep rangeforge/kali-custom
