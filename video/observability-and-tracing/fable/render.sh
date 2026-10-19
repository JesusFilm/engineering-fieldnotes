#!/usr/bin/env bash
# Reproduce the fable cut of observability-and-tracing from this folder's scene and local engine copy.
# Needs Node (>=22), ffmpeg and Google Chrome (set CHROME_PATH if Chrome is elsewhere). Paths are relative to this file.
# The engine copy is the skill's scripts/ with four local changes (see README section in beat-sheet.md):
# store textSize/row{i}TextColor, box subSize/subMono, wire width, chip text 28px; render.mjs adds a -3 dBFS peak
# ceiling, constant-QP encoding with a forced final keyframe, two ffmpeg threads and FLOWVID_TMP for scratch.
set -euo pipefail
cd "$(dirname "$0")"
if [ ! -e engine/node_modules/puppeteer-core/package.json ]; then (cd engine && npm install); fi
mkdir -p scratch
FLOWVID_TMP=scratch node engine/render.mjs observability-and-tracing.js scratch/fable.mp4 --sheet scratch/fable-sheet.png
cp scratch/fable.mp4 ../../../public/media/observability-and-tracing/fable.mp4
# Poster: the resolved beat, the linked failure with the check badge between the two span lists.
ffmpeg -y -v error -threads 2 -ss 27.0 -i scratch/fable.mp4 -frames:v 1 -threads 2 -q:v 3 ../../../public/media/observability-and-tracing/fable.jpg
echo "wrote public/media/observability-and-tracing/fable.mp4 and fable.jpg"

