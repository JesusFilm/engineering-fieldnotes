> Current comparative revision: use `sh reviews/comparisons/loop-engineering/render.sh` and `python3 reviews/comparisons/loop-engineering/verify.py` from the repository root. Current checks and hashes are in that review folder. The original production notes below describe the earlier encode; historical measurements do not certify the revised media. All FFmpeg codec/filter threads remain capped at two.

# Evidence first — reproducible Astra cut

Authored by **gpt-6-astra**, high reasoning, on 2026-10-19. See `beat-sheet.md` for intent and `review.md` for the review. `variant.json` is written only after media checks and encoded-frame inspection.

From the repository root, with Node, Python 3, FFmpeg, and Chrome installed:

```sh
# Only when engine/node_modules is absent in a clean checkout:
npm ci --prefix video/loop-engineering/astra/engine

sh video/loop-engineering/astra/render.sh stills
# Inspect scratch/stills before proceeding.
sh video/loop-engineering/astra/render.sh movie
sh video/loop-engineering/astra/render.sh verify
```

For a nonstandard browser location set `CHROME_PATH` to your installed Chrome/Chromium executable. The scripts resolve their paths relative to this folder, so they do not depend on this machine's checkout location. Dependencies are pinned by `engine/package-lock.json`. This working directory uses an ignored `engine/node_modules` symlink to the existing dependency install; do not run package installation through that symlink. A clean checkout uses the local `npm ci` command above. No node_modules contents belong in version control.

All generated intermediates, browser profiles, synthesized WAVs, contact sheets, encoded frame captures, and signal analysis logs live in `scratch/`. Every FFmpeg command limits codec and filter threading to two. Rendering is serial, and muxing follows video encoding. Final delivery uses CRF 28 / slow H.264, 64kbps AAC, yuv420p, 30fps, faststart, 28 seconds. Verification asserts a strict decimal 2,000,000-byte ceiling.

`verify.py` performs full audio/video decode, all 840 frame hashes, exact first/last equality, stream/atom inspection, audio sample peak, all 25 cue windows, and comparison of decoded audio to the synthesized reference. It also exports the poster, full-resolution/350px review frames, and spectrogram. It does not substitute for inspecting these images or for listening. The current review reports no physical listening.

Live preview, from this folder on macOS (Play enables audio):

```sh
node -e 'const {pathToFileURL}=require("node:url"); const p=require("node:path"); const u=pathToFileURL(p.resolve("engine/preview.html")); u.searchParams.set("scene",pathToFileURL(p.resolve("scene.js")).href); require("node:child_process").spawn("open",[u.href],{stdio:"inherit"});'
```

Local engine changes from the installed architecture-flow-video skill: configurable box state-text size and line offsets; configurable title/subtitle layout; optional whole-frame fade for exact blank boundary frames; output compression/thread limits; all renderer scratch and Chrome profiles confined here. The installed skill was not changed. Engine provenance is the skill's `scripts/flow-engine.js`, `sfx.js`, `preview.html`, and `render.mjs`; this directory preserves the actual local runtime source.

Observed toolchain: Node v24.3.0, Python 3.9.6, FFmpeg 8.0.1, Google Chrome 155.0.8059.84. System font availability and encoder/browser versions can change pixels or bytes on another platform; re-run verification there rather than assuming bit-identical output.
