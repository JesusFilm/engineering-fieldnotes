#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p scratch ../../../public/media/harness-engineering
if [ ! -d engine/node_modules/puppeteer-core ]; then
  (cd engine && npm ci --ignore-scripts)
fi
node engine/render.mjs scene.js --stills 3.5,7.5,10,13,19.5,23 --stills-dir scratch/stills
if [ "${1:-}" = "--stills-only" ]; then exit 0; fi
node engine/render.mjs scene.js ../../../public/media/harness-engineering/astra.mp4 --sheet scratch/encoded-sheet.png
python3 verify.py
