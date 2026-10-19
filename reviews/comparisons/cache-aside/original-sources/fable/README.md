# Cache-aside — fable cut

Independent alternative cut of the cache-aside lesson, authored by anthropic/claude-fable-5-1 (reasoning: high) on 19 October 2026. Teaches the write path: invalidate on write, the stale-set race, and TTL as the staleness bound.

- `scene.js` — the scene (flow-engine format; times authored at speed 1, played at 0.9).
- `engine/` — local copy of the architecture-flow-video renderer. `render.mjs` differs from the skill original only as documented in its header (2 ffmpeg threads, scratch temp dir, peak normalisation, constant QP with forced last keyframe, 96 kb/s AAC). `node_modules` is a symlink to the installed skill's dependencies and is ignored by Git; `npm ci` in `engine/` installs them locally when the symlink is absent.
- `render.sh [stills|movie|preview]` — reproducible commands with relative paths. `movie` writes `public/media/cache-aside/fable.mp4` and `fable.jpg`, then runs `verify.py`.
- `verify.py` — probes the encoded file: codec/size/fps, full decode, first/last frame equality, audio peak, faststart. Output is kept in `verification.json`.
- `beat-sheet.md` — lesson, learning objective, beats with sounds, and primary sources.
- `review.md` — defects fixed, clean defect pass, ranked improvement suggestions, limitations.
- `variant.json` — metadata for the comparison section, including a timestamped transcript.
- `scratch/` (ignored) — stills, contact sheets, spectrogram, downloaded sources.

