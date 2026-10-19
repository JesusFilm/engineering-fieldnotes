#!/bin/sh
# Reproduce the fable cut of load-balancing from this folder. Portable relative paths; every FFmpeg call inside
# engine/render.mjs and verify.mjs is capped at two threads. Needs Node 22+, ffmpeg/ffprobe and Google Chrome
# (set CHROME_PATH if Chrome is elsewhere). engine/node_modules is a relative symlink to the repository root's
# node_modules (git-ignored); run `npm ci --ignore-scripts` at the repository root first, or `npm install` in engine/.
set -eu
cd "$(dirname "$0")"
if [ ! -e engine/node_modules/puppeteer-core ]; then
  echo "Installing puppeteer-core locally (engine/node_modules is git-ignored)"; (cd engine && npm install --no-audit --no-fund)
fi
mkdir -p scratch
node check-timing.cjs | head -1
node engine/render.mjs scene.js scratch/fable.mp4 --sheet scratch/fable-sheet.png --wav scratch/fable-sfx.wav --qp 25 --abr 128k --peak -1.0 --normalize
cp scratch/fable.mp4 ../../../public/media/load-balancing/fable.mp4
ffmpeg -y -v error -threads 2 -ss 14.0 -i ../../../public/media/load-balancing/fable.mp4 -frames:v 1 -q:v 3 ../../../public/media/load-balancing/fable.jpg
node verify.mjs ../../../public/media/load-balancing/fable.mp4 checks.json > /dev/null
echo "wrote public/media/load-balancing/fable.mp4 and fable.jpg; checks in checks.json"
