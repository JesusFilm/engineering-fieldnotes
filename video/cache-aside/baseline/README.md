# Cache-aside baseline, comparative revision

Original prototype model was not recorded. Edited by `gpt-6-astra comparative review` after blind encoded comparison; this does not replace the original provenance. The original scene/renderer/transcript are retained under `reviews/comparisons/cache-aside/original-sources/baseline/`; original media are retained in review scratch with hashes in `original-hashes.json`.

The application owns miss lookup, source read, cache fill and delivery. A later cache hit avoids the database and does not renew the continuously draining TTL. At 14.5s the entry expires; the next read repeats the miss path. No source mutation or concurrency is shown.

From the repository root, use the root lockfile dependency (`npm ci` if dependencies are absent), Google Chrome and FFmpeg:

```sh
node video/cache-aside/baseline/runtime/render.mjs video/cache-aside/baseline/scene.js public/media/cache-aside/baseline.mp4 --tmp reviews/comparisons/cache-aside/scratch/tmp --wav reviews/comparisons/cache-aside/scratch/baseline.wav
ffmpeg -y -v error -threads 2 -filter_threads 2 -ss 10.5 -i public/media/cache-aside/baseline.mp4 -frames:v 1 -q:v 2 -threads 2 public/media/cache-aside/baseline.jpg
python3 reviews/comparisons/cache-aside/verify.py
```

Renderer copied from the topic's existing fable renderer, with its constant-QP endpoint encoding and peak normalization retained. Dependency lookup prefers the repository's pinned Puppeteer, and FFmpeg encoder/filter pools are capped at two. No installed skill code is modified.
