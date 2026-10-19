#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
# Dependencies: Node, Chrome (or CHROME_PATH), FFmpeg/ffprobe, Python 3.
# On a clean checkout: (cd engine && npm ci --ignore-scripts)
mkdir -p scratch ../../../public/media/observability-and-tracing
node engine/render.mjs scene.js --stills 0,3.5,8.8,14.5,19.8,23.8,27.97 --stills-dir scratch/stills
node engine/render.mjs scene.js ../../../public/media/observability-and-tracing/astra.mp4 --sheet scratch/encoded-sheet.png --wav scratch/sfx.wav
python3 verify.py
