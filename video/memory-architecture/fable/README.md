# Memory architecture — fable cut

Independent alternative to the baseline, authored by anthropic/claude-fable-5-1 (reasoning: high). Lesson, beats and sounds are in `beat-sheet.md`; review, fixed defects, limitations and evidence in `review.md`.

Files: `scene.js` (the scene), `engine/` (local copy of the skill's renderer; `render.mjs` and `flow-engine.js` carry commented local changes), `render.sh` (reproducible command), `verify.py` → `verification.json`, `variant.json` (library metadata), `scratch/` (ignored: stills, sheets, spectrogram, audio stem).

Render dependencies: Node, Google Chrome, ffmpeg, and `puppeteer-core` (declared in `engine/package.json`; `engine/node_modules` is an ignored symlink or local install).

```
./render.sh stills   # beat stills into scratch/stills
./render.sh movie    # encode to ../../../public/media/memory-architecture/fable.mp4, poster, verify
```

Live preview: `open "file://$PWD/engine/preview.html?scene=file://$PWD/scene.js"`

## Comparative revision

The final scene was revised by **gpt-6-astra comparative review**; the original model remains anthropic/claude-fable-5-1. Current corrections and transcript are in `variant.json`, the updated sequence in `beat-sheet.md`, and final review in [after.md](../../../reviews/comparisons/memory-architecture/after.md). The original `review.md` and `verification.json` describe the author encode; the comparison's verification report describes the current MP4.

Exact comparative render and verification commands, from repository root:

```sh
node video/memory-architecture/fable/engine/render.mjs video/memory-architecture/fable/scene.js public/media/memory-architecture/fable.mp4 --wav reviews/comparisons/memory-architecture/scratch/fable-final.wav
python3 reviews/comparisons/memory-architecture/verify.py fable
```

The renderer's temporary directory now lives under `reviews/comparisons/memory-architecture/scratch/render-fable`. The final poster is decoded frame 876 (29.2s). Dependencies, constant-QP settings and original seven-run timing are retained. Use one renderer at a time, with at most two FFmpeg threads. Reinspect encoded evidence after any rerender before setting verified metadata.
