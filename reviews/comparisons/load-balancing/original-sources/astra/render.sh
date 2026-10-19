#!/bin/sh
set -eu
cd "$(dirname "$0")"
mkdir -p scratch ../../../public/media/load-balancing
case "${1:-stills}" in
  stills) node engine/render.mjs scene.js --stills 4.4,10,12.7,16.8,23.2,25 --stills-dir scratch/stills ;;
  movie) node engine/render.mjs scene.js ../../../public/media/load-balancing/astra.mp4 --sheet scratch/contact-sheet.png ;;
  verify) python3 verify.py ;;
  *) printf '%s\n' 'Usage: sh render.sh [stills|movie|verify]' >&2; exit 2 ;;
esac
