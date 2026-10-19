# Keep the contract

Independent context-engineering video and evidence by **gpt-6-astra**, reasoning **high**, 2026-10-19. Five beats, 30 seconds. See `beat-sheet.md`, `review.md`, `verification.json`, and the accessible transcript in `variant.json`.

## Reproduce

From the repository root:

```sh
bash video/context-engineering/astra/render.sh stills
# Inspect generated stills before proceeding.
bash video/context-engineering/astra/render.sh movie
```

The second command writes `public/media/context-engineering/astra.mp4`, extracts `astra.jpg` from 26.8 seconds, checks encoding/loop/audio, and saves review frames beneath this variant's ignored `scratch/`. Visual inspection is still required; `verify.py` does not automatically claim it or set `variant.json` to verified.

Requirements: Node, Chrome (or `CHROME_PATH`), FFmpeg/ffprobe, Python 3 standard library. Verified here with Node 24.3.0, FFmpeg 8.0.1, Python 3.9.6, Puppeteer Core 23.11.1. Renderer font fallback can differ by OS; the exact picture/bytes are not promised across browser/font versions.

`engine/` is a local copy of the architecture-flow-video skill's renderer, synthesizer, preview, and locked npm dependencies. `engine/node_modules` is ignored and currently a symlink to the existing runtime. On another machine, the script installs from the included lockfile locally when the dependency is absent. No node_modules contents belong in source control. Installed skill files were never modified.

The copied engine adds a generic two-row sheet, configurable label spacing and title size, 44px packet labels, and an optional full-canvas fade. The copied renderer uses scratch beneath this variant, two FFmpeg codec/filter threads, CRF 28 with a 370k video cap, 64k AAC at 0.8 mux gain, and faststart. No shared renderer, build, UI, or manifest was edited.

A final audio-only improvement raised the session-change tick. The movie's video stream was copied unchanged while the regenerated audio was muxed, then all checks were rerun. A full reproduction uses the same revised scene and audio automatically.

## Preview with sound

From this variant directory, use the copied preview and scene:

```sh
node -e 'const {pathToFileURL}=require("node:url"); const path=require("node:path"); console.log(pathToFileURL(path.resolve("engine/preview.html")).href+"?scene="+encodeURIComponent(pathToFileURL(path.resolve("scene.js")).href))'
```

Open the printed URL in Chrome (allow local file access if required by browser policy) and press Play. Space pauses, arrows step, and the speed control reloads the scene. The encoded MP4 is the deliverable; preview synthesis does not include the final mux's 0.8 gain. No physical listening was performed during this review.

Primary-source critique and chapter provenance live in `reviews/concepts/context-engineering/`. The video is an illustration, not a recording of an agent, test run, permission system, or benchmark.
