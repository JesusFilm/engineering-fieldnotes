#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../../.."
scene=video/cache-aside/astra
if [ ! -d "$scene/engine/node_modules/puppeteer-core" ]; then
  npm ci --prefix "$scene/engine"
fi
case "${1:-stills}" in
stills)
  node "$scene/engine/render.mjs" "$scene/scene.js" --stills 4.7,7.2,12.4,15.5,20.5,23.6,29.8 --stills-dir "$scene/scratch/stills"
  ;;
movie)
  node "$scene/engine/render.mjs" "$scene/scene.js" public/media/cache-aside/astra.mp4 --sheet "$scene/scratch/encoded-sheet.png" --wav "$scene/scratch/sfx.wav"
  python3 "$scene/verify.py"
  ;;
verify)
  python3 "$scene/verify.py"
  ;;
*) echo 'Usage: render.sh [stills|movie|verify]' >&2; exit 2 ;;
esac
