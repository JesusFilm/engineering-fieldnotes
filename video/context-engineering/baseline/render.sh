#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")/../../.."
scratch="$PWD/reviews/comparisons/context-engineering/scratch"
mkdir -p "$scratch"
TMPDIR="$scratch" node video/context-engineering/baseline/engine/render.mjs \
  video/context-engineering/baseline/context-engineering.js \
  public/media/context-engineering/baseline.mp4 --wav "$scratch/baseline-final.wav"
ffmpeg -v error -threads 2 -filter_threads 2 -ss 21.5 -i public/media/context-engineering/baseline.mp4 \
  -frames:v 1 -threads 2 -q:v 3 -y public/media/context-engineering/baseline.jpg
