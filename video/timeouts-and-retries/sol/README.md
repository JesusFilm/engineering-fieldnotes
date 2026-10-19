# One retry owner

Independent GPT-6.1 Sol cut, authored with high reasoning. See `beat-sheet.md` for objective, primary evidence and technical limits; `review.md` for verification and repairs.

From the repository root (Node ≥22.12, Google Chrome, FFmpeg/FFprobe, Python 3 + Pillow):

```sh
npm ci
sh video/timeouts-and-retries/sol/render.sh stills
# Inspect the stills before encoding.
sh video/timeouts-and-retries/sol/render.sh movie
sh video/timeouts-and-retries/sol/render.sh verify
```

`npm ci` uses the repository-root lockfile's pinned `puppeteer-core` 25.14.0. It is not bundled or committed under this cut. The renderer resolves that dependency from the current repository root. No installed personal skill is needed for reproduction. `engine/` contains the local canvas engine, synthesizer, browser preview and renderer copied from architecture-flow-video. They are source dependencies, not an additional npm installation.

Local changes: larger configurable box sublabels and packet labels; larger subtitle; full-canvas pure-black fade for exact decoded loop endpoints; two FFmpeg threads with restricted filter threading; 330 kb/s H.264 target/430 kb/s maximum, 64 kb/s AAC and 0.65 audio gain. Temporary render files honor `TMPDIR` under this cut's ignored `scratch/` directory. The shared skill was not modified. No root package or lockfile edits were made.

Local live preview (file access may require the Chrome flag used by the renderer):

```sh
open "file://$PWD/video/timeouts-and-retries/sol/engine/preview.html?scene=file://$PWD/video/timeouts-and-retries/sol/scene.js"
```

Play enables sound; space pauses; arrow keys step frames. Audio was analyzed in production, not physically listened to. Scratch images and WAV are regenerable and ignored. `verification.json` binds machine checks to the delivered media hashes; `review.md` records human visual inspection. Re-encoding requires renewed inspection.
