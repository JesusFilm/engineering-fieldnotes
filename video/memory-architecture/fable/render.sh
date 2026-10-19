#!/usr/bin/env bash
# Reproducible render for the fable cut. Run from anywhere; paths are relative to this script.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p scratch
if [ ! -d engine/node_modules/puppeteer-core ]; then
  (cd engine && npm ci --ignore-scripts --no-audit --no-fund)
fi
OUT=../../../public/media/memory-architecture
case "${1:-movie}" in
  stills)
    node engine/render.mjs scene.js --stills 1.2,2.7,3.5,7.2,7.8,11.8,18.7,20.9,22.2,23.7,24.8,25.7,29.2 --stills-dir scratch/stills
    ;;
  movie)
    node engine/render.mjs scene.js "$OUT/fable.mp4" --sheet scratch/encoded-sheet.png --wav scratch/sfx.wav
    ffmpeg -y -v error -threads 2 -i "$OUT/fable.mp4" -ss 29.2 -frames:v 1 -q:v 3 "$OUT/fable.jpg"
    ffmpeg -y -v error -threads 2 -i "$OUT/fable.mp4" -lavfi "showspectrumpic=s=1800x400:fscale=log" scratch/spectrogram.png
    python3 verify.py
    ;;
  *) echo 'Usage: ./render.sh [stills|movie]' >&2; exit 2 ;;
esac
