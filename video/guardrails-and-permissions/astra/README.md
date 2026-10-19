# Astra: Separate authority

Authored by **gpt-6-astra**, high reasoning, 2026-10-19. Source is `scene.js`; reviewed evidence and limits are in `review.md`; teaching sequence and sound timing are in `beat-sheet.md`. The associated reading lives at `content/concepts/guardrails-and-permissions.json` from repository root.

From repository root:

```sh
sh video/guardrails-and-permissions/astra/render.sh
```

Requires Node, Python 3 (standard library only), Chrome, and FFmpeg/FFprobe. Set `CHROME_PATH` if Chrome is not at a standard platform location. The engine directory includes a lockfile and local copies of flow-engine.js, sfx.js, preview.html, and render.mjs from the architecture-flow-video skill. Dependencies are resolved from ignored node_modules; the current machine uses a symlink to the existing dependency installation. A clean checkout runs `npm ci --ignore-scripts` locally. No dependency packages are committed. Chrome/font differences can change pixels across machines; verification is against each produced encode.

All FFmpeg codecs and filters use at most two threads; rendering and checking run serially. Scratch, temporary encoded intermediates, audio, stills, and frame hashes stay under `scratch/`. The final MP4 and JPEG are written to `public/media/guardrails-and-permissions/`. `verify.py` checks the delivery constraints and regenerates the poster and encoded evidence. Human/agent visual review is still required after a changed scene; the script does not silently set variant.json verified.

Local engine changes: configurable card sublabel and packet text sizes; configurable title size; optional whole-frame fade for exact loop endpoints; packets drawn behind opaque cards so arrivals cannot obscure actor labels. The local renderer disables accelerated canvas and uses a CPU-backed canvas to fix disappearing text; limits FFmpeg threads, bitrate, and audio gain; and keeps temporary output in this variant's scratch directory. Installed skill files are untouched.

For interactive preview on macOS, from repository root:

```sh
open "file://$(pwd)/video/guardrails-and-permissions/astra/engine/preview.html?scene=file://$(pwd)/video/guardrails-and-permissions/astra/scene.js"
```

Play enables sound; space pauses; arrow keys step frames. Preview sound is the synthesis mix; the delivery encoder applies 0.7 gain. The movie has been measured, not physically listened to.
