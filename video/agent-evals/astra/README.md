# Astra: Test the fix

Independent lesson and scene authored by gpt-6-astra with high reasoning. See `beat-sheet.md`, `review.md`, `verification.json`, and `variant.json`. Primary-source evaluation is in `../../../reviews/concepts/agent-evals/review.md`.

## Reproduce

Prerequisites: Node.js, Python 3, FFmpeg/ffprobe, Google Chrome (or `CHROME_PATH`). The renderer uses `puppeteer-core` 25.14.0, pinned in `engine/package-lock.json`. Install into the ignored local directory from the repository root if dependencies are not already available:

```sh
npm ci --prefix video/agent-evals/astra/engine
bash video/agent-evals/astra/render.sh stills
# Inspect scratch/stills before rendering the movie.
bash video/agent-evals/astra/render.sh movie
bash video/agent-evals/astra/render.sh verify
```

Production used `engine/node_modules` symlinked to the existing repository `node_modules`; the symlink and dependency tree are ignored. The install command above permits an independent checkout without that symlink. No dependencies belong in versioned source. Commands use relative paths; scratch and renderer intermediates stay under this variant's `scratch/`.

One encoder runs at a time. FFmpeg decoding/encoding and filter thread caps are 2. The local renderer produces H.264/yuv420p, AAC 64 kb/s, 30 fps, 1080×1920, faststart, with CRF 28 and a 0.75 audio gain multiplier. Run verification after every render; asset size is asserted below 2,000,000 bytes.

## Local engine provenance and modifications

The four engine files were copied from the installed architecture-flow-video skill on 2026-10-19. The installed skill was not modified. This copy adds optional full-frame fading for exact blank loop boundaries and optional box sublabel size/gap for phone legibility. Its renderer caps threads, uses variant-local scratch, lowers video/audio bitrate, and leaves audio headroom. `sfx.js` and `preview.html` are unchanged copies.

From this variant directory on macOS, live preview with sound enabled by the Play button:

```sh
open "file://$(pwd)/engine/preview.html?scene=../scene.js"
```

The final movie is `../../../public/media/agent-evals/astra.mp4`; the JPEG poster is extracted from its 12.3-second frame. Scratch review frames can be regenerated with `verify.py`. Byte-for-byte rendering across platforms is not promised: installed browser/font and codec versions can change rasterization or compression. Verification checks the required properties of the new encode.
