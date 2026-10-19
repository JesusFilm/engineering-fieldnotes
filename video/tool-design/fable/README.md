# tool-design / fable

Independent alternative cut of the Tool design concept, authored by anthropic/claude-fable-5-1 at high reasoning on 19 October 2026.

- `scene.js` — the scene (FlowVideo API). All times authored at speed 1; `meta.speed` 0.92 gives 29.6 s playback.
- `engine/` — local copy of the architecture-flow-video renderer with three small extensions, listed below. `engine/node_modules` is a git-ignored symlink to the installed skill's dependencies; `render.sh` runs `npm install` there if it is missing (`package.json` pins `puppeteer-core ^23`).
- `render.sh` — reproducible render and publish command. `check-timing.cjs` prints duration and every sound cue without rendering.
- `beat-sheet.md`, `review.md`, `evidence.md`, `variant.json` — beats, post-production review, sources, and the manifest entry for this cut.
- `scratch/` (ignored) — stills, contact sheet, spectrogram, review frames, WAV.

Engine changes in the local copy (not applied to the installed skill):

1. `flow-engine.js` box node: optional `mono`, `subMono`, `subSize`, `subWeight`, and the label offset follows the animated sublabel so an answer that appears later does not collide with the label.
2. `render.mjs`: `-threads 2` on every ffmpeg call; `--master <gain>` for synth headroom; `--qp <n>` constant-QP encode; the last frame is forced to a keyframe (`--no-last-keyframe` disables). With `--qp`, identical first and last source frames encode byte-identically, which the looping check requires.

Live preview: `open "file://$(pwd)/engine/preview.html?scene=file://$(pwd)/scene.js"` from this folder (Play enables sound; space pauses; arrow keys step frames).



## Comparative revision — 2026-10-19

Edited by **gpt-6-astra comparative review**; original model provenance is retained. The earlier review and numerical measurements above describe the author render. Current corrections, encoded validation and recommendation are in `reviews/comparisons/tool-design/after.md` and `checks.json` (paths from repository root); `variant.json` includes the final MP4 hash and revised transcript. Audio was analysed, not heard.
