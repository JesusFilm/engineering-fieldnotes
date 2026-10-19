#!/bin/sh
set -eu
cd "$(dirname "$0")/../../.."
REVIEW_SCRATCH=reviews/comparisons/load-balancing/scratch/astra
mkdir -p "$REVIEW_SCRATCH" public/media/load-balancing
case "${1:-stills}" in
  stills) node video/load-balancing/astra/engine/render.mjs video/load-balancing/astra/scene.js --stills 4.4,10,12.7,16.8,23.2,25 --stills-dir "$REVIEW_SCRATCH/stills" ;;
  movie) node video/load-balancing/astra/engine/render.mjs video/load-balancing/astra/scene.js public/media/load-balancing/astra.mp4 --sheet "$REVIEW_SCRATCH/final-overview.png" ;;
  verify) python3 reviews/comparisons/load-balancing/verify.py ;;
  *) printf '%s\n' 'Usage: sh render.sh [stills|movie|verify]' >&2; exit 2 ;;
esac
