#!/usr/bin/env sh
# Original author anthropic/claude-fable-5-1; edited by gpt-6-astra comparative review.
# Needs Node, Google Chrome, ffmpeg and puppeteer-core resolvable by the local engine.
set -eu
cd "$(dirname "$0")/../../.."
scratch="$PWD/reviews/comparisons/context-engineering/scratch"
mkdir -p "$scratch"
TMPDIR="$scratch" node video/context-engineering/fable/engine/render.mjs \
  video/context-engineering/fable/scene.js public/media/context-engineering/fable.mp4 \
  --loop-exact --qp 22 --wav "$scratch/fable-final.wav"
ffmpeg -v error -threads 2 -filter_threads 2 -ss 23.5 -i public/media/context-engineering/fable.mp4 \
  -frames:v 1 -threads 2 -q:v 3 -y public/media/context-engineering/fable.jpg
