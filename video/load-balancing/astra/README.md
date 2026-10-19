# Reproducing Astra's load-balancing cut

Authored by **gpt-6-astra**, high reasoning, 2026-10-19. Scene and guide were independently authored; no other variant scene or encoded baseline was read. This directory contains the actual local engine used, not a dependency on mutable installed skill source. The installed skill was not changed.

Requirements: Node, Python 3, FFmpeg/ffprobe with libx264 and AAC, and Google Chrome/Chromium. Set `CHROME_PATH` if Chrome is not in a renderer-supported standard location. The original author’s verified environment used Node 24.3.0, FFmpeg 8.0.1, and puppeteer-core 23.11.1. The copied package lock pins JavaScript dependencies. Font fallback can change raster appearance across OSes; numeric content and schedule are portable, but byte-identical cross-platform rendering is not promised.

From this directory, install into the ignored local dependency directory if it does not already exist:

```sh
npm ci --prefix engine
```

This session used an ignored `engine/node_modules` symlink to an existing puppeteer installation. Dependencies are not vendored. On a fresh checkout `npm ci` creates a local directory; do not commit node_modules. If replacing the session's symlink, remove only that symlink before running npm ci.

From the repository root:

```sh
sh video/load-balancing/astra/render.sh stills
# Inspect reviews/comparisons/load-balancing/scratch/astra/stills with view_image before continuing.
sh video/load-balancing/astra/render.sh movie
sh video/load-balancing/astra/render.sh verify
# Inspect scratch/contact-sheet.png, phone-sheet.png, boundaries.png,
# spectrogram.png and representative full-size beat PNGs with view_image.
```

`verify.py` decodes the entire movie, validates codecs/dimensions/rate/size, compares the exact decoded first and last frames, parses MP4 box ordering, measures decoded audio peaks, checks signal at every cue, and compares several PCM cue windows with the source audio for mux synchronization. It also regenerates the poster and evidence images. It does not replace visual inspection or claim physical listening. The final `variant.json` was created only after both automated checks and visual review passed.

Local renderer changes: generic workstation node with animated occupancy/task/progress; phone-size chips and configurable title sizes; whole-canvas fade for an exact black loop seam; software canvas rendering (`--disable-gpu`), a fresh canvas each frame, and synchronous pixel readback after observing missing raster content; scratch rooted in the comparison review folder after revision; FFmpeg decoder/encoder/filter thread limits of two; CRF 24 with a 430 kbit/s video cap, AAC 64 kbit/s with gain 0.8, and faststart. Only one encoder runs at a time. `audio-cues.json` and `verification.json` retain the original author’s machine-readable evidence; regenerated large captures and WAVs stay under ignored `scratch/`.

Live local preview, from this directory on macOS (Play enables audio):

```sh
node -e 'const {pathToFileURL}=require("node:url"); const p=require("node:path"); const {execFileSync}=require("node:child_process"); const url=pathToFileURL(p.resolve("engine/preview.html")); url.searchParams.set("scene",pathToFileURL(p.resolve("scene.js")).href); execFileSync("open",[url.href]);'
```

Space pauses, arrows step frames, and the speed selector reloads the scene. Final media paths are `../../../public/media/load-balancing/astra.mp4` and `astra.jpg`. See `beat-sheet.md`, `review.md`, and the chapter review at `../../../reviews/concepts/load-balancing/review.md` for teaching scope and limitations.

## Comparative revision — 2026-10-19

Original model provenance is retained in `variant.json`; edits are attributed to `gpt-6-astra comparative review`. The original author reports and evidence remain historical records of the original hashes. The current encoded validation is `reviews/comparisons/load-balancing/encoded-checks.json`, with the decision and frame/source audit in `reviews/comparisons/load-balancing/after.md`. Original changed sources and metadata are preserved in that review's `original-sources/` directory.

The revised render used repository-pinned puppeteer-core 25.14.0 through the ignored relative `engine/node_modules` symlink. Both local renderers cap FFmpeg decoder, encoder and filter threads at two. Scratch evidence is in the comparison review folder. Audio was analysed, not heard. From the repository root, reproduce the revised movie with:

```sh
node video/load-balancing/astra/engine/render.mjs video/load-balancing/astra/scene.js public/media/load-balancing/astra.mp4 --sheet reviews/comparisons/load-balancing/scratch/astra/final-overview.png
python3 reviews/comparisons/load-balancing/verify.py
```

The validator regenerates posters and encoded evidence; inspect the resulting images again before marking any newly encoded file verified. Re-encoding can change hashes across runtime/OS versions.
