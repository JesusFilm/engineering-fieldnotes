#!/bin/sh
# Reproduce the fable variant of tool-design from this folder. Portable relative paths; FFmpeg capped at 2 threads
# inside engine/render.mjs. Needs Node, ffmpeg and Google Chrome (set CHROME_PATH if Chrome is elsewhere).
set -eu
cd "$(dirname "$0")"
if [ ! -e engine/node_modules/puppeteer-core ]; then
  echo "Installing puppeteer-core locally (engine/node_modules is git-ignored)"; (cd engine && npm install --no-audit --no-fund)
fi
mkdir -p scratch
node check-timing.cjs | head -1
node engine/render.mjs scene.js scratch/fable.mp4 --sheet scratch/fable-sheet.png --wav scratch/fable-sfx.wav --master 0.6 --qp 20
cp scratch/fable.mp4 ../../../public/media/tool-design/fable.mp4
ffmpeg -y -v error -threads 2 -ss 14.0 -i ../../../public/media/tool-design/fable.mp4 -frames:v 1 -q:v 3 ../../../public/media/tool-design/fable.jpg
echo "wrote public/media/tool-design/fable.mp4 and fable.jpg"

