#!/bin/sh
set -eu
cd "$(dirname "$0")/../../.."
python3 video/load-balancing/sequence/generate.py
mkdir -p public/lessons/load-balancing video/load-balancing/sequence/scratch
for part in 01 02 03 04 05 06; do
  node video/load-balancing/sequence/engine/render.mjs "video/load-balancing/sequence/$part.js" "public/lessons/load-balancing/$part.mp4" --sheet "video/load-balancing/sequence/scratch/$part-sheet.png"
  ffmpeg -v error -y -ss 1 -i "public/lessons/load-balancing/$part.mp4" -frames:v 1 "public/lessons/load-balancing/$part.jpg"
done
