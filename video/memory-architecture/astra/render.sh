#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../../.."
base=video/memory-architecture/astra
mkdir -p "$base/scratch" public/media/memory-architecture
node "$base/engine/render.mjs" "$base/scene.js" --stills 4.5,7,9,11.8,14.4,16.5,18.6,20.8,24 --stills-dir "$base/scratch/stills"
node "$base/engine/render.mjs" "$base/scene.js" public/media/memory-architecture/astra.mp4 --sheet "$base/scratch/encoded-sheet.png"
python3 "$base/verify.py"
