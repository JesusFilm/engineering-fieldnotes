# Cache-aside — fable cut

Independent alternative cut of the cache-aside lesson, authored by anthropic/claude-fable-5-1 (reasoning: high) on 19 October 2026. Teaches the write path: invalidate on write, the stale-set race, and expiration of the stale entry after its delayed fill. TTL is not a general bound on data age since the source write.

- `scene.js` — the scene (flow-engine format; times authored at speed 1, played at 0.9).
- `engine/` — local copy of the architecture-flow-video renderer. `render.mjs` differs from the skill original only as documented in its header (2 ffmpeg threads, scratch temp dir, peak normalisation, constant QP with forced last keyframe, 96 kb/s AAC). The comparative revision uses the repository’s pinned Puppeteer dependency first; run `npm ci` at the repository root if it is absent. No installed skill dependency is required.
- `render.sh [stills|movie|preview]` — reproducible commands with relative paths. `movie` writes `public/media/cache-aside/fable.mp4` and `fable.jpg`, then runs `verify.py`.
- `verify.py` — probes the encoded file: codec/size/fps, full decode, first/last frame equality, audio peak, faststart. Output is kept in `verification.json`.
- `beat-sheet.md` — lesson, learning objective, beats with sounds, and primary sources.
- `review.md` — defects fixed, clean defect pass, ranked improvement suggestions, limitations.
- `variant.json` — metadata for the comparison section, including a timestamped transcript.
- `scratch/` (ignored) — stills, contact sheets, spectrogram, downloaded sources.


## Comparative revision, 2026-10-19

Edited by `gpt-6-astra comparative review`; original author and model retained. The subtitle now names the stale-fill race. Row/source/packet/badge values are 36px, and feedback appears beside the cache row so it cannot cover the value. Policy values are not cache TTLs. The original source, transcript and verification are retained under `reviews/comparisons/cache-aside/original-sources/fable/`.

The same timeline and sound map remain. The renderer now resolves the repository's pinned Puppeteer before local dependencies and caps FFmpeg filters at two threads. From the repository root, the exact reviewed render is:

```sh
node video/cache-aside/fable/engine/render.mjs video/cache-aside/fable/scene.js public/media/cache-aside/fable.mp4 --tmp reviews/comparisons/cache-aside/scratch/tmp --wav reviews/comparisons/cache-aside/scratch/fable.wav
```

See `reviews/comparisons/cache-aside/encoded-checks.json` and `after.md` for the renewed hash-bound verification, rather than applying the old author's measurements to the new encode.
