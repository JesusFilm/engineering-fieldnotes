# Canary deployments — Astra

Authored by gpt-6-astra with high reasoning. Source is `scene.js`; the self-contained renderer is in `engine/`. The installed architecture-flow-video skill was read and copied, never edited. No other cut's scene was read.

From the repository root:

```sh
bash video/canary-deployments/astra/render.sh stills
# Inspect the generated images before encoding.
bash video/canary-deployments/astra/render.sh movie
bash video/canary-deployments/astra/render.sh verify
```

Requirements: Node >=22.12, Google Chrome (or set `CHROME_PATH`), FFmpeg/ffprobe with libx264 and AAC, Python 3. The renderer pins puppeteer-core 25.14.0 in its local package/lock files. The current `engine/node_modules` is a relative symlink into the repository's ignored dependency directory. If dependencies are absent, the script runs local `npm ci`; dependency folders are never part of the source deliverable.

All temporary files, frame captures and WAVs are under `scratch/`. Encoders run sequentially with two codec threads and two filter threads maximum; x264 lookahead has one thread. Output is H.264 CRF 30, slow preset, yuv420p, AAC nominal 64 kbit/s and faststart. The poster is extracted at 18.6 seconds by verification. Outputs are `public/media/canary-deployments/astra.mp4` and `astra.jpg`.

The local engine adds a general metric-card node, enlarges labels, uses black for deterministic loop closure, and fades the whole canvas. The renderer relocates temporary files into the cut, caps threads, and uses a compact encode with audio attenuation. No global library or installed skill modification is required.

Optional local preview, from the repository root:

```sh
python3 -m http.server 8042 --directory video/canary-deployments/astra
```

Open [the local preview](http://localhost:8042/engine/preview.html?scene=../scene.js). Play enables sound. The MP4 is the review artifact; browser preview is not a substitute for encoded checks.

`verify.py` checks format, size, full decode, exact decoded first/last RGB equality, audio peak, MP4 atom order, audio correlation and cue windows. It regenerates phone-size frames and a spectrogram and saves hash-bound `verification.json`. Inspect those images after any encode; `variant.json` must not be treated as renewed editorial approval merely because a command ran. Chrome/font/FFmpeg versions can change exact bytes, so reproduction is procedural rather than a promise of identical hashes across operating systems.
