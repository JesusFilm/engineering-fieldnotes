# Astra: Recall is not current

Independent scene and editorial review by gpt-6-astra, high reasoning, 2026-10-19. See beat-sheet.md for objective, sequence, cue map, and teaching boundaries; review.md for actual inspection results.

## Reproduce

Requires Node, Python 3, FFmpeg/ffprobe, and Chrome (set CHROME_PATH if outside the renderer’s default locations). Run from repository root:

```sh
npm ci --prefix video/memory-architecture/astra/engine
bash video/memory-architecture/astra/render.sh
```

The local working copy currently symlinks engine/node_modules to the installed skill’s existing dependency directory. node_modules is ignored by the repository. A fresh checkout uses npm ci with the included package-lock.json; it does not require the skill installation. Do not commit or vendor node_modules. No installed-skill files were changed.

For a manual pre-movie checkpoint, render and inspect stills first:

```sh
node video/memory-architecture/astra/engine/render.mjs video/memory-architecture/astra/scene.js --stills 4.5,7,9,11.8,14.4,16.5,18.6,20.8,24 --stills-dir video/memory-architecture/astra/scratch/stills
```

Then run render.sh and inspect scratch/encoded-sheet.png, phone-*.png, and spectrogram.png. verify.py decodes the entire movie, compares first/last decoded-frame hashes, checks format/size/faststart/audio peak and cue energy, generates encoded review frames and the JPG poster, and writes scratch/verification.json. It deliberately does not mark variant.json verified: human or agent visual inspection is also required.

All commands use project-relative paths; verify.py locates the root from its own file. Scratch data and intermediate WAV/video are under this variant’s scratch directory. Run one renderer at a time. Each FFmpeg encoder/filter process is limited to two threads. Output: public/media/memory-architecture/astra.mp4 and astra.jpg.

## Local renderer changes

The engine directory is a self-contained copy of the architecture-flow-video scripts and dependency lock. Local edits add configurable title/subtitle sizes and spacing, a full-canvas fade, and a larger configurable box sublabel with more line separation. The renderer puts temporary files in ../scratch, limits FFmpeg threads, uses H.264 CRF 29/slow, AAC 64 kbps, an audio gain of 0.8, and faststart. Fonts use the engine’s system-font fallback: exact glyph metrics may differ between operating systems, so repeat visual inspection after rendering elsewhere.

## Live preview

From the variant directory on macOS:

```sh
open "file://$(pwd)/engine/preview.html?scene=file://$(pwd)/scene.js"
```

Play enables sound; space pauses; arrow keys step; speed control reloads. Encoded output and the saved verification report are the handover evidence. Audio was analysed, not physically heard during production.
