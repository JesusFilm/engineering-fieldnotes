#!/bin/sh
# Reproduce the fable cut of load-balancing from this folder. Portable relative paths; every FFmpeg call inside
# engine/render.mjs and the comparative validator is capped at two threads. Needs Node 22.12+, ffmpeg/ffprobe and Google Chrome
# (set CHROME_PATH if Chrome is elsewhere). engine/node_modules is a relative symlink to the repository root's
# node_modules (git-ignored); run `npm ci --ignore-scripts` at the repository root first, or `npm install` in engine/.
set -eu
cd "$(dirname "$0")"
if [ ! -e engine/node_modules/puppeteer-core ]; then
  echo "Installing puppeteer-core locally (engine/node_modules is git-ignored)"; (cd engine && npm install --no-audit --no-fund)
fi
REVIEW_SCRATCH=../../../reviews/comparisons/load-balancing/scratch/fable
mkdir -p "$REVIEW_SCRATCH"
node check-timing.cjs | head -1
node engine/render.mjs scene.js "$REVIEW_SCRATCH/fable.mp4" --sheet "$REVIEW_SCRATCH/fable-sheet.png" --wav "$REVIEW_SCRATCH/fable-sfx.wav" --qp 25 --abr 128k --peak -1.2 --normalize
cp "$REVIEW_SCRATCH/fable.mp4" ../../../public/media/load-balancing/fable.mp4
cd ../../..
python3 reviews/comparisons/load-balancing/verify.py
echo "wrote public/media/load-balancing/fable.mp4 and fable.jpg; current checks in reviews/comparisons/load-balancing/encoded-checks.json"
