# load-balancing / fable

Independent alternative cut of the load-balancing lesson, authored by `anthropic/claude-fable-5-1` at high reasoning on 19 October 2026. Lesson: a request counter is not a work counter; route on in-flight load. Outputs: `public/media/load-balancing/fable.mp4` and `fable.jpg`.

- `scene.js` — the scene (motion and sound scheduled up front; counters and the latency badge derived from sorted events).
- `beat-sheet.md` — objective, actors, pitches, and the time / motion / state / sound table.
- `evidence.md` — primary sources with retrieval dates and what each one supports.
- `review.md` — defects fixed, improvements applied, open suggestions, honest limitations.
- `variant.json` — metadata for the comparison page, including a timestamped transcript and verification hashes.
- `render.sh` — reproducible render with portable relative paths; `check-timing.cjs` prints cue times without rendering; `verify.mjs` runs the media checks and writes `checks.json`.
- `engine/` — local copy of the skill's renderer. `render.mjs` differs from the installed skill: FFmpeg capped at two threads, `--master`, `--peak`, `--normalize`, `--abr`, and `--qp` with forced keyframes on the first and last frame so the loop boundary decodes byte-identically. `node_modules` is a relative symlink to the repository root (git-ignored).
- `scratch/` — git-ignored renders, stills, review frames, spectrograms and the baseline contact sheet used to understand scope.

Live preview with sound: `open "file://$(pwd)/engine/preview.html?scene=file://$(pwd)/scene.js"` from this folder.

## Comparative revision — 2026-10-19

Original model provenance is retained in `variant.json`; edits are attributed to `gpt-6-astra comparative review`. The original author reports and evidence remain historical records of the original hashes. The current encoded validation is `reviews/comparisons/load-balancing/encoded-checks.json`, with the decision and frame/source audit in `reviews/comparisons/load-balancing/after.md`. Original changed sources and metadata are preserved in that review's `original-sources/` directory.

The revised render used repository-pinned puppeteer-core 25.14.0 through the ignored relative `engine/node_modules` symlink. Both local renderers cap FFmpeg decoder, encoder and filter threads at two. Scratch evidence is in the comparison review folder. Audio was analysed, not heard. From the repository root, reproduce the revised movie with:

```sh
node video/load-balancing/fable/engine/render.mjs video/load-balancing/fable/scene.js public/media/load-balancing/fable.mp4 --sheet reviews/comparisons/load-balancing/scratch/fable/final-overview.png --wav reviews/comparisons/load-balancing/scratch/fable/final-sfx.wav --qp 25 --abr 128k --peak -1.2 --normalize
python3 reviews/comparisons/load-balancing/verify.py
```

The validator regenerates posters and encoded evidence; inspect the resulting images again before marking any newly encoded file verified. Re-encoding can change hashes across runtime/OS versions.
