#!/bin/sh
set -eu
cd "$(dirname "$0")"
mkdir -p scratch/stills evidence ../../../public/media/queues-and-backpressure
# From this directory, Node also resolves the repository's pinned dependency.
# Standalone reproduction: (cd engine && npm ci).
node engine/render.mjs scene.js --stills 1.5,3.7,10.7,11.2,12.8,15.4,16.9,18,23.5,26,27.5 --stills-dir scratch/stills
if [ "${1:-}" = "--stills" ]; then exit 0; fi
node engine/render.mjs scene.js ../../../public/media/queues-and-backpressure/astra.mp4 --sheet evidence/encoded-sheet.png --wav scratch/sfx.wav
ffmpeg -y -v error -threads 2 -filter_threads 2 -ss 12.8 -i ../../../public/media/queues-and-backpressure/astra.mp4 -frames:v 1 -q:v 2 -threads 2 ../../../public/media/queues-and-backpressure/astra.jpg
python3 verify.py
