#!/bin/sh
# From repository root; only topic-local scenes and engines. FFmpeg threads capped at 2.
set -eu
out=reviews/comparisons/loop-engineering/scratch/final
mkdir -p "$out"
node video/loop-engineering/baseline/engine/render.mjs video/loop-engineering/baseline/scene.js "$out/baseline.mp4" --wav "$out/baseline.wav"
node video/loop-engineering/astra/engine/render.mjs video/loop-engineering/astra/scene.js "$out/astra.mp4" --wav "$out/astra.wav"
node video/loop-engineering/fable/engine/render.mjs video/loop-engineering/fable/loop-engineering.js "$out/fable.mp4" --wav "$out/fable.wav"
