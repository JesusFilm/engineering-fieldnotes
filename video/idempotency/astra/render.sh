#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p scratch
case "${1:-help}" in
  deps) if [ -L engine/node_modules ]; then unlink engine/node_modules; fi; (cd engine && npm ci --ignore-scripts) ;;
  stills) node engine/render.mjs scene.js --stills 2,4.6,7.1,10.2,13.2,17.6,19.6,21.9,23.7,26.5 --stills-dir scratch/stills ;;
  movie) node engine/render.mjs scene.js ../../../public/media/idempotency/astra.mp4 --sheet scratch/contact-sheet.png ;;
  verify) python3 verify.py && python3 check-sync.py ;;
  preview) printf '%s\n' 'Run from the repository root: python3 -m http.server 4174' 'Open http://localhost:4174/video/idempotency/astra/engine/preview.html?scene=../scene.js' ;;
  *) printf '%s\n' 'Usage: bash render.sh {deps|stills|movie|verify|preview}' ;;
esac
