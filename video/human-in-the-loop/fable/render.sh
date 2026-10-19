#!/usr/bin/env bash
# Reproduce the fable cut of human-in-the-loop from this folder's scene and local engine copy.
# Needs Node, ffmpeg and Google Chrome (set CHROME_PATH if Chrome is elsewhere). Paths are relative to this file.
# Every ffmpeg call in engine/render.mjs is capped at two threads.
set -euo pipefail
cd "$(dirname "$0")"
if [ ! -e engine/node_modules/puppeteer-core/package.json ]; then (cd engine && npm install); fi
review_scratch="$PWD/../../../reviews/comparisons/human-in-the-loop/scratch/reproduction"
mkdir -p "$review_scratch"
export TMPDIR="$review_scratch"
node engine/render.mjs human-in-the-loop.js "$review_scratch/fable.mp4" --sheet "$review_scratch/fable-sheet.png"
cp "$review_scratch/fable.mp4" ../../../public/media/human-in-the-loop/fable.mp4
# Poster: the resolved beat, notify after approve?, one notice sent and schema v8 applied.
ffmpeg -y -v error -threads 2 -filter_threads 2 -filter_complex_threads 2 -ss 27.6 -i "$review_scratch/fable.mp4" -frames:v 1 -threads 2 -q:v 3 ../../../public/media/human-in-the-loop/fable.jpg
echo "wrote public/media/human-in-the-loop/fable.mp4 and fable.jpg"
