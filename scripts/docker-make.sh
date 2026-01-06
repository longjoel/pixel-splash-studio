#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="pixel-splash-studio-ci"

docker build -f Dockerfile.ci -t "${IMAGE_NAME}" .

docker run --rm \
  -u "$(id -u):$(id -g)" \
  -e npm_config_cache=/tmp/npm-cache \
  -v "$(pwd)":/repo \
  -w /repo \
  "${IMAGE_NAME}" \
  bash -lc "npm ci && npm run make"
