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
