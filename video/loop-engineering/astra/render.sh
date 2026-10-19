#!/bin/sh
# All paths resolve relative to this file. No global package/skill installation changes.
set -eu
cd "$(dirname "$0")"
case "${1:-}" in
  stills)
    node engine/render.mjs scene.js --stills 3.9,5.8,11.9,18.8,22.6 --stills-dir scratch/stills
    ;;
  movie)
    node engine/render.mjs scene.js ../../../public/media/loop-engineering/astra.mp4 --sheet scratch/contact-sheet.png --wav scratch/sfx.wav
    ;;
  verify)
    python3 verify.py
    ;;
  *)
    echo 'Usage: sh video/loop-engineering/astra/render.sh {stills|movie|verify}'
    exit 2
    ;;
esac
