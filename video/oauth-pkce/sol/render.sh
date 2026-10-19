#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../../.."
# Repository-root package-lock.json pins puppeteer-core to 25.14.0. Run npm ci if missing.
test -d node_modules/puppeteer-core
mkdir -p video/oauth-pkce/sol/scratch public/media/oauth-pkce
node video/oauth-pkce/sol/engine/render.mjs video/oauth-pkce/sol/scene.js \
  --stills 4.6,8.5,15.3,20.9,28.5,16.55,17.9 \
  --stills-dir video/oauth-pkce/sol/scratch/stills
# Visually inspect these stills before continuing when changing the scene.
node video/oauth-pkce/sol/engine/render.mjs video/oauth-pkce/sol/scene.js \
  public/media/oauth-pkce/sol.mp4 --sheet video/oauth-pkce/sol/scratch/contact-sheet.png
python3 video/oauth-pkce/sol/verify.py
