#!/bin/sh
set -eu
cd "$(dirname "$0")"
mkdir -p scratch evidence ../../../public/media/replication-and-consistency
if ! test -d engine/node_modules/puppeteer-core; then
  (cd engine && npm ci --ignore-scripts --no-audit --no-fund)
fi
case "${1:-encode}" in
  stills)
    node engine/render.mjs scene.js --stills 4,8.8,13.7,19.6,24.8 --stills-dir scratch/stills
    ffmpeg -y -v error -threads 2 -filter_threads 2 -pattern_type glob -i 'scratch/stills/*.png' -vf 'scale=350:-1,tile=5x1' -frames:v 1 -threads 2 evidence/preflight.png
    ;;
  encode)
    node engine/render.mjs scene.js ../../../public/media/replication-and-consistency/astra.mp4 --sheet evidence/encoded-sheet.png
    ;;
  verify)
    node export-cues.cjs
    python3 verify.py
    ;;
  *) echo 'Usage: sh render.sh stills|encode|verify' >&2; exit 2 ;;
esac
