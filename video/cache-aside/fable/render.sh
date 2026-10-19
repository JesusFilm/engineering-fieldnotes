#!/usr/bin/env bash
# Reproducible render for the cache-aside "fable" cut. Run from anywhere; paths are relative to this script.
# Needs Node >= 22, Google Chrome (or CHROME_PATH), ffmpeg/ffprobe, python3. ffmpeg is capped at 2 threads.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p scratch/tmp
if [ ! -d ../../../node_modules/puppeteer-core ]; then
  (cd ../../.. && npm ci --ignore-scripts --no-audit --no-fund)   # node_modules stays ignored; never committed
fi
OUT=../../../public/media/cache-aside
case "${1:-movie}" in
  stills)
    node engine/render.mjs scene.js --stills 0,1.6,2.7,5.1,5.65,7.7,9.0,10.9,11.9,12.98,13.6,16.95,22.3,23.0,27.1,27.8,31.5 --stills-dir scratch/stills
    ;;
  movie)
    node engine/render.mjs scene.js "$OUT/fable.mp4" --sheet scratch/encoded-sheet.png --wav scratch/sfx.wav --tmp scratch/tmp
    ffmpeg -y -v error -threads 2 -filter_threads 2 -filter_complex_threads 2 -ss 17.1 -i "$OUT/fable.mp4" -frames:v 1 -q:v 3 -threads 2 "$OUT/fable.jpg"
    ffmpeg -y -v error -threads 2 -filter_threads 2 -filter_complex_threads 2 -i "$OUT/fable.mp4" -lavfi "showspectrumpic=s=1800x400:fscale=log" -threads 2 scratch/spectrogram.png
    python3 verify.py "$OUT/fable.mp4" | tee verification.json
    ;;
  preview)
    open "file://$(pwd)/engine/preview.html?scene=file://$(pwd)/scene.js"
    ;;
  *) echo 'Usage: ./render.sh [stills|movie|preview]' >&2; exit 2 ;;
esac

