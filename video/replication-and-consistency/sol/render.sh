#!/bin/sh
# Run from any directory; requires the repository's npm ci, Chrome, FFmpeg, Node.
set -eu
cd "$(dirname "$0")/../../.."
CUT=video/replication-and-consistency/sol
mkdir -p "$CUT/scratch" public/media/replication-and-consistency
node -e "const p=require('puppeteer-core/package.json'); if(p.version!=='25.14.0')throw Error('Run npm ci at repository root: expected puppeteer-core 25.14.0')"
node "$CUT/engine/render.mjs" "$CUT/scene.js" --stills 4.95,9.5,13.7,19.5,23.2,28.5 --stills-dir "$CUT/scratch/stills"
node "$CUT/engine/render.mjs" "$CUT/scene.js" public/media/replication-and-consistency/sol.mp4 --sheet "$CUT/scratch/encoded-sheet.png"
ffmpeg -y -v error -threads 2 -filter_threads 2 -ss 13.7 -i public/media/replication-and-consistency/sol.mp4 -frames:v 1 -q:v 3 -threads 2 public/media/replication-and-consistency/sol.jpg
python3 "$CUT/verify.py"
