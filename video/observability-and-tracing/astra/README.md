# Follow the tool — Astra

Authored by gpt-6-astra with high reasoning on 2026-10-19. Read `beat-sheet.md` for the objective, scenario boundaries, and cue schedule; `review.md` records encoded-output inspection. The guide's detailed primary-source review lives in `../../../reviews/concepts/observability-and-tracing/review.md`.

From the project root:

```sh
# Only needed if engine/node_modules is absent:
(cd video/observability-and-tracing/astra/engine && npm ci --ignore-scripts)
bash video/observability-and-tracing/astra/render.sh
```

Dependencies: Node, Google Chrome (set `CHROME_PATH` if needed), ffmpeg/ffprobe, Python 3 standard library. The installed skill's dependencies are currently symlinked as ignored `engine/node_modules`; `package-lock.json` supports a clean local install. No dependency directory belongs in version control. Render files, intermediate media, decoded frames, PCM, and cue inspection remain under ignored `scratch/`. Only one video encoder runs at once; local FFmpeg commands explicitly cap codec/filter threads at two. The renderer may allocate browser resources separately from FFmpeg.

`verify.py` fully decodes video/audio, checks all 840 decoded frame hashes, tests exact endpoint equality, inspects MP4 atom order, checks encoded PCM peak and energy around every scheduled cue, and generates encoded full-resolution and 350px beat/boundary frames plus the JPEG poster. Inspect these images before setting `variant.json` to verified after any change. Numerical checks do not replace visual or listening review. `render.sh` does not mark metadata verified.

Local engine changes from the installed architecture-flow-video scripts:

- Generic `interval` node for proportionate duration bars with readable labels.
- Larger box sublabels and travelling header chip; adjusted title size and box spacing.
- Optional full-frame fade (`meta.fadeTitle`) to black for pixel-identical decoded endpoints. The final second repeats frame zero. First render's retained title card differed after lossy compression and was rejected.
- Scratch directory is local, with two FFmpeg threads, H.264 CRF 29, 30-frame GOP, AAC 64 kb/s, gain 0.7, and faststart.

The installed skill was not changed. Font fallback uses the local system (SF Pro/Inter/Helvetica/Arial); appearance and encoded bytes can vary across OS/font/Chrome/FFmpeg versions. Re-run verification after reproduction.

Preview (portable HTTP alternative to local file URLs), from this directory:

```sh
python3 -m http.server 8765
```

Open `http://localhost:8765/engine/preview.html?scene=../scene.js`. Press Play to enable sound. The preview uses synthesis before the encoded file's 0.7 gain; use the MP4 for final mix assessment. Space pauses, arrows step frames, and the speed menu changes playback. No physical listening was performed during this authoring run.
