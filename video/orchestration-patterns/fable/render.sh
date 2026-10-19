#!/usr/bin/env bash
# Reproduce the "Split by dependency" cut. Run from anywhere; paths are relative to this file.
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p scratch
export TMPDIR="$PWD/scratch"   # renderer temp files stay under this variant's ignored scratch/
# engine/node_modules is ignored; it is a symlink to the installed skill runtime here, or a local install elsewhere.
if [ ! -d engine/node_modules/puppeteer-core ]; then
  (cd engine && npm ci --ignore-scripts --no-audit --no-fund)
fi
case "${1:-movie}" in
  stills)
    node engine/render.mjs scene.js --stills 1.3,2.4,3.7,4.6,7.7,9.4,10.2,11.3,13.4,16.9,18.3,19.9,20.9,22.9,24.5,26.1,27.5 --stills-dir scratch/stills
    ;;
  movie)
    node engine/render.mjs scene.js ../../../public/media/orchestration-patterns/fable.mp4 --sheet scratch/encoded-sheet.png --wav scratch/sfx.wav
    python3 verify.py
    ;;
  *) echo 'Usage: ./render.sh [stills|movie]' >&2; exit 2 ;;
esac

