#!/usr/bin/env sh
# Reproduce public/media/guardrails-and-permissions/fable.mp4 and fable.jpg from scene.js.
# Run from anywhere; paths are relative to this script. Needs Node, ffmpeg and Google Chrome
# (set CHROME_PATH if Chrome is not in the standard location). FFmpeg is capped at 2 threads.
set -eu
here=$(cd "$(dirname "$0")" && pwd)
root="$here/../../.."
out="$root/public/media/guardrails-and-permissions"
cd "$here"
if [ ! -e engine/node_modules ]; then
  # Dependencies are not committed. Reuse the project's puppeteer-core, or install locally.
  if [ -d "$root/node_modules/puppeteer-core" ]; then ln -s ../../../../node_modules engine/node_modules
  else (cd engine && npm install --no-save); fi
fi
scratch="$root/reviews/comparisons/guardrails-and-permissions/scratch"
mkdir -p "$scratch" "$out"
node engine/render.mjs scene.js "$out/fable.mp4" --sheet "$scratch/fable-sheet.png" --wav "$scratch/fable-sfx.wav" --loop-exact
ffmpeg -y -v error -threads 2 -filter_threads 2 -ss 16.4 -i "$out/fable.mp4" -frames:v 1 -q:v 3 -threads 2 "$out/fable.jpg"
python3 verify.py

