#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p scratch ../../../public/media/agent-evals
case "${1:-stills}" in
  stills)
    node engine/render.mjs scene.js --stills 4,8.8,12.3,17.8,21.5,24.7 --stills-dir scratch/stills
    ;;
  movie)
    node engine/render.mjs scene.js ../../../public/media/agent-evals/astra.mp4 --sheet scratch/contact-sheet.png --wav scratch/cues.wav
    ;;
  verify)
    python3 verify.py
    ;;
  *) echo 'Usage: bash render.sh [stills|movie|verify]' >&2; exit 2;;
esac
