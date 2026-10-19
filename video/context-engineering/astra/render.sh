#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p scratch
# Local install is only needed if the ignored node_modules link/install is absent.
if [ ! -d engine/node_modules/puppeteer-core ]; then
  (cd engine && npm ci --ignore-scripts --no-audit --no-fund)
fi
case "${1:-movie}" in
  stills)
    node engine/render.mjs scene.js --stills 4.8,8.8,14.5,17.7,19.5,24.5,26.8 --stills-dir scratch/stills
    ;;
  movie)
    node engine/render.mjs scene.js ../../../public/media/context-engineering/astra.mp4 --sheet scratch/encoded-sheet.png --wav scratch/sfx.wav
    python3 verify.py
    ;;
  *) echo 'Usage: ./render.sh [stills|movie]' >&2; exit 2 ;;
esac
