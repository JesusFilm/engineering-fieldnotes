#!/usr/bin/env bash
# Reproduce public/media/harness-engineering/fable.mp4 and fable.jpg from this folder.
# Needs: Node >= 18, ffmpeg, Google Chrome (set CHROME_PATH if not in the default location),
# and puppeteer-core resolvable from engine/node_modules (here a gitignored directory holding a symlink
# to the installed skill's copy; otherwise run: (cd engine && npm install)).
# Encoding uses at most two ffmpeg threads; scratch output stays in ./scratch (gitignored).
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p scratch
if [ ! -e engine/node_modules/puppeteer-core ]; then (cd engine && npm install); fi
node engine/render.mjs harness-engineering.js scratch/fable.mp4 --sheet scratch/fable-sheet.png --wav scratch/fable-sfx.wav
ffmpeg -v error -threads 2 -ss 25.9 -i scratch/fable.mp4 -frames:v 1 -q:v 3 -y ../../../public/media/harness-engineering/fable.jpg
cp scratch/fable.mp4 ../../../public/media/harness-engineering/fable.mp4
# Optional checks (what review.md records):
#   node engine/render.mjs harness-engineering.js --stills 1.3,2.6,4.4,5.9,7.3,11.4,13.9,15.2,16.1,18.4,20.8,24.8,26.9 --stills-dir scratch/stills
#   ffmpeg -i scratch/fable.mp4 -af volumedetect -f null -
#   ffmpeg -i scratch/fable.mp4 -lavfi showspectrumpic=s=1800x500:fscale=log scratch/spec.png
# Live preview with sound:
#   open "file://$PWD/engine/preview.html?scene=file://$PWD/harness-engineering.js"

