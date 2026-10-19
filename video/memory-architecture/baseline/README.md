# Memory: scope and explicit refresh

Original prototype; model not recorded. Revised by **gpt-6-astra comparative review** on 2026-10-19. Original source/media are retained under the comparison scratch archive. `variant.json` records provenance, corrections and the current transcript; `transcript.json` mirrors that transcript.

From repository root, with Node, Chrome, FFmpeg/ffprobe and Python with Pillow installed:

```sh
# A fresh checkout needs the local renderer dependency. Existing dependencies may be reused.
[ -d video/memory-architecture/baseline/engine/node_modules/puppeteer-core ] || npm ci --prefix video/memory-architecture/baseline/engine --ignore-scripts --no-audit --no-fund
node video/memory-architecture/baseline/engine/render.mjs video/memory-architecture/baseline/memory-architecture.js public/media/memory-architecture/baseline.mp4 --wav reviews/comparisons/memory-architecture/scratch/baseline-final.wav
python3 reviews/comparisons/memory-architecture/verify.py baseline
```

The topic-local renderer uses at most two FFmpeg threads, H.264 QP 22, a forced final keyframe, AAC 96 kbps and faststart. It normalizes the source mix to −1.5 dBFS. All temporary render files go under the comparison scratch folder. Run one render at a time; inspect the newly encoded evidence and audio peak before accepting another render. Font metrics can vary between machines. No installed skill files are modified.

The poster is decoded frame 648 (21.6s) saved as JPEG. Final comparative evidence and measured results are in [after.md](../../../reviews/comparisons/memory-architecture/after.md) and [verification.json](../../../reviews/comparisons/memory-architecture/verification.json). Audio was analysed, not heard.
