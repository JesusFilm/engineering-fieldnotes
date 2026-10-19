#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../../.."
cut=video/idempotency/fable
if [ ! -e node_modules/puppeteer-core/package.json ]; then
  echo "puppeteer-core missing: run 'npm ci' at the repository root" >&2; exit 1
fi
# Ignored relative link so engine/preview.html and render.mjs resolve the repository's pinned dependency.
[ -L "$cut/engine/node_modules" ] || ln -s ../../../../node_modules "$cut/engine/node_modules"
case "${1:-stills}" in
stills)
  node "$cut/engine/render.mjs" "$cut/scene.js" --stills 0,3.4,7.6,9.9,13.9,17.6,20.0,24.7,26.4,29.6 --stills-dir "$cut/scratch/stills"
  ;;
movie)
  node "$cut/engine/render.mjs" "$cut/scene.js" public/media/idempotency/fable.mp4 \
    --sheet "$cut/scratch/encoded-sheet.png" --wav "$cut/scratch/sfx.wav" --scratch "$cut/scratch" --master 0.8 --qp 22
  python3 "$cut/verify.py" --poster-time 27.0
  ;;
verify)
  python3 "$cut/verify.py" --no-poster
  ;;
*) echo 'Usage: render.sh [stills|movie|verify]' >&2; exit 2 ;;
esac

