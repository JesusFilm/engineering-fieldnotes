#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
# Dependency resolution may use the repository's ignored node_modules; otherwise install locally.
if ! node -e 'const r=require("node:module").createRequire(process.cwd()+"/engine/render.mjs");r.resolve("puppeteer-core")' >/dev/null 2>&1; then
  if [ -L engine/node_modules ] && [ ! -e engine/node_modules ]; then unlink engine/node_modules; fi
  npm ci --prefix engine --ignore-scripts
fi
mkdir -p scratch/stills ../../../public/media/canary-deployments
mode="${1:-stills}"
case "$mode" in
  stills)
    node engine/render.mjs scene.js --stills 3.8,10,14,18.6,21,25.8 --stills-dir scratch/stills
    ;;
  movie)
    node engine/render.mjs scene.js ../../../public/media/canary-deployments/astra.mp4 --sheet scratch/contact-sheet.png --wav scratch/sfx.wav
    ;;
  verify)
    python3 verify.py
    ;;
  *) echo 'Usage: ./render.sh [stills|movie|verify]' >&2; exit 2 ;;
esac
