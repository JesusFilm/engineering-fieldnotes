#!/bin/sh
set -eu
# Invoke from any directory; source paths and outputs are repository-relative.
cd "$(dirname "$0")/../../.."
base=video/guardrails-and-permissions/astra
mkdir -p "$base/scratch" public/media/guardrails-and-permissions
if [ ! -d "$base/engine/node_modules/puppeteer-core" ]; then
  (cd "$base/engine" && npm ci --ignore-scripts)
fi
node "$base/engine/render.mjs" "$base/scene.js" --stills 3.8,6.8,12.8,18.7,24.3 --stills-dir "$base/scratch/stills"
node "$base/engine/render.mjs" "$base/scene.js" public/media/guardrails-and-permissions/astra.mp4 --sheet "$base/scratch/contact-sheet.png" --wav "$base/scratch/cues.wav"
node -e "const F=require('./$base/engine/flow-engine.js'); require('./$base/scene.js'); require('fs').writeFileSync('./$base/cues.json',JSON.stringify(F.createScene(F.lastScene).audioCues(),null,2)+'\n')"
python3 "$base/verify.py"
