#!/usr/bin/env bash
# Reproduce the fable cut of agent-evals from this folder's scene and local engine copy.
# Needs Node, ffmpeg and Google Chrome (set CHROME_PATH if Chrome is elsewhere). Paths are relative to this file.
set -euo pipefail
cd "$(dirname "$0")"
if [ ! -e engine/node_modules/puppeteer-core/package.json ]; then (cd engine && npm install); fi
scratch=../../../reviews/comparisons/agent-evals/scratch/fable-render
mkdir -p "$scratch"
node engine/render.mjs agent-evals.js "$scratch/fable.mp4" --sheet "$scratch/fable-sheet.png"
cp "$scratch/fable.mp4" ../../../public/media/agent-evals/fable.mp4
# Poster: the resolved beat, both assertions visible and the FAIL verdict shown.
ffmpeg -y -v error -threads 2 -ss 23.6 -i "$scratch/fable.mp4" -frames:v 1 -threads 2 -q:v 3 ../../../public/media/agent-evals/fable.jpg
echo "wrote public/media/agent-evals/fable.mp4 and fable.jpg"
