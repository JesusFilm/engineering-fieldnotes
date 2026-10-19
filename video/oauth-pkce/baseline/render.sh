#!/bin/sh
set -eu
cd "$(dirname "$0")/../../.."
# npm ci at repository root installs the pinned puppeteer-core dependency.
node video/oauth-pkce/baseline/engine/render.mjs video/oauth-pkce/baseline/oauth-pkce.js public/media/oauth-pkce/baseline.mp4
ffmpeg -y -v error -threads 2 -filter_threads 2 -ss 17 -i public/media/oauth-pkce/baseline.mp4 -frames:v 1 -threads 2 -q:v 2 public/media/oauth-pkce/baseline.jpg
# Re-run the topic comparison's encoded checks after any new render.
