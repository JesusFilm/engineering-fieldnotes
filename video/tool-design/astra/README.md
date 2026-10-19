# Tool design / Astra — Empty ≠ failed

Independent scene and guide review authored by **gpt-6-astra**, **high** reasoning, 2026-10-19. The local engine derives from the architecture-flow-video skill; no other variant scene was inspected. This folder and the two public `astra` media assets are the video author's complete write scope.

## Reproduce

Requirements: Node.js, Python 3, FFmpeg/ffprobe with libx264 and AAC, and Google Chrome (or `CHROME_PATH`). Run the following from the repository root. All repository paths are relative. Dependencies are pinned in `engine/package-lock.json`; `node_modules` stays ignored. This session reused a symlink to the existing installed dependencies. On another machine use a local install:

```sh
npm ci --prefix video/tool-design/astra/engine
node video/tool-design/astra/engine/render.mjs video/tool-design/astra/scene.js --stills 4.9,10.9,17.9,20.5,25 --stills-dir video/tool-design/astra/scratch/stills
```

Inspect these stills before encoding. Then:

```sh
node video/tool-design/astra/engine/render.mjs video/tool-design/astra/scene.js public/media/tool-design/astra.mp4 --sheet video/tool-design/astra/scratch/encoded-sheet.png
python3 video/tool-design/astra/verify.py
```

Verification exports the poster at 17.9 seconds, full/350px beat frames, beat-boundary sheet, spectrogram, decoded audio, original synthesized audio, cue inventory, and `checks.json`. It checks 30 seconds, 900 frames, H.264/yuv420p/AAC, file size under 2,000,000 bytes, full decode, identical decoded endpoint MD5, moov-before-mdat, peak <= -0.5 dBFS, signal at all cues and waveform alignment within a frame. **It does not replace visual inspection or listening.** After a new render, inspect the encoded sheet, all phone images, full-size beats and boundary images; update review/metadata for the new artifact. Do not carry a previous verified flag across unreviewed edits.

One encoder runs at a time. Every rendering/verification FFmpeg command limits codec and filter threads to at most two. Temporary renderer output is confined to this folder's ignored `scratch/`. The asset uses CRF 28, slow preset, 80 kbps AAC and faststart. Fonts use the local engine's system-font fallback stack; different platforms may rasterize text differently, so repeat visual QA there.

Local interactive preview (macOS, from repository root):

```sh
open "file://$PWD/video/tool-design/astra/engine/preview.html?scene=file://$PWD/video/tool-design/astra/scene.js"
```

Press Play to enable synthesized sound. Space pauses; arrows step frames. Preview is not the encoded-file QA artifact.

## Local engine changes

- Optional `subSize`, packet `size`, and `titleSize`; extra vertical separation between box title and result.
- Whole-frame fade so title and stage share identical loop endpoints.
- Canvas/font warm-up before capture as a precaution; see the investigated preview anomaly in review.md.
- Variant-local scratch, two-thread FFmpeg caps, smaller codec settings and faststart.

The installed skill was never modified. `engine/` contains the renderer, drawing engine, synthesizer, preview and dependency lockfile needed to rebuild. No installed dependency tree is part of the deliverable source.

See `beat-sheet.md`, `review.md`, `checks.json`, and `variant.json`. The source-based guide review is in `reviews/concepts/tool-design/`. The video is an illustrative contract failure and repair, not an executed agent evaluation, security guarantee, or comparative winner.


## Comparative revision — 2026-10-19

Edited by **gpt-6-astra comparative review**; original model provenance is retained. The earlier review and numerical measurements above describe the author render. Current corrections, encoded validation and recommendation are in `reviews/comparisons/tool-design/after.md` and `checks.json` (paths from repository root); `variant.json` includes the final MP4 hash and revised transcript. Audio was analysed, not heard.
