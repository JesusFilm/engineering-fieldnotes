#!/bin/sh
set -eu
cd "$(dirname "$0")/../../.."
cut_dir=video/timeouts-and-retries/sol
mkdir -p "$cut_dir/scratch/stills"
case "${1:-movie}" in
  stills)
    node "$cut_dir/engine/render.mjs" "$cut_dir/scene.js" --stills 3.8,9.7,14.7,17.8,22.9,27.4 --stills-dir "$cut_dir/scratch/stills"
    ;;
  movie)
    TMPDIR="$PWD/$cut_dir/scratch" node "$cut_dir/engine/render.mjs" "$cut_dir/scene.js" public/media/timeouts-and-retries/sol.mp4 --sheet "$cut_dir/scratch/encoded-contact.png" --wav "$cut_dir/scratch/sfx.wav"
    ;;
  verify) python3 "$cut_dir/verify.py" ;;
  *) echo 'Usage: render.sh [stills|movie|verify]' >&2; exit 2 ;;
esac
