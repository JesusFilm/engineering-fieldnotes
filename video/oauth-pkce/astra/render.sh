#!/bin/sh
set -eu
cd "$(dirname "$0")"
mkdir -p scratch ../../../public/media/oauth-pkce
# If the repository dependency is unavailable: npm ci --prefix engine
node engine/render.mjs scene.js ../../../public/media/oauth-pkce/astra.mp4 --sheet scratch/contact-sheet.png
ffmpeg -y -v error -threads 2 -filter_threads 2 -ss 24.6 -i ../../../public/media/oauth-pkce/astra.mp4 -frames:v 1 -threads 2 -q:v 2 ../../../public/media/oauth-pkce/astra.jpg
python3 verify.py
