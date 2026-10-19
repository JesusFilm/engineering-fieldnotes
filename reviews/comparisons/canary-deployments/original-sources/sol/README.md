# Canary the outcome — Sol

Independent scene by `gpt-6.1-sol`, reasoning `high`. The local engine is copied from the architecture-flow-video production aid; it has no runtime dependency on the installed skill.

From the repository root (Node >=22.12, Chrome, FFmpeg and Python 3):

```sh
npm ci
mkdir -p video/canary-deployments/sol/scratch
# Optional: expose the root-pinned puppeteer-core to the local engine.
ln -sfn ../../../node_modules video/canary-deployments/sol/node_modules
node video/canary-deployments/sol/engine/render.mjs video/canary-deployments/sol/scene.js --stills 3.3,8.8,14.6,18.5,24.3 --stills-dir video/canary-deployments/sol/scratch/stills
# Inspect stills before encoding.
node video/canary-deployments/sol/engine/render.mjs video/canary-deployments/sol/scene.js public/media/canary-deployments/sol.mp4 --sheet video/canary-deployments/sol/scratch/encoded-contact-sheet.png
python3 video/canary-deployments/sol/verify.py
```

Inspect the encoded contact sheet, all `scratch/beat-*-350.png` images, full-size frames, the spectrogram, and verification results after each encode. The verification command regenerates the poster. Update `variant.json` only after review passes; a new movie hash invalidates the prior visual review.

`puppeteer-core` is the repository-root pinned 25.14.0 dependency. No dependency installation or lockfile is vendored here. Set `CHROME_PATH` when Chrome is outside the renderer's normal Mac/Linux locations. Scratch, WAVs and the node_modules link are ignored by repository rules. Render serially; all FFmpeg codec/filter thread budgets are at most two.

Local engine changes: a generic animated status card; larger heading/subtitle typography; opt-in whole-canvas fade; honor wire default alpha; scratch under this cut; H264 CRF29/maxrate400k/bufsize800k, one-second GOP, AAC64k, -1.4 dB mix attenuation and a two-thread budget. `preview.html`, `flow-engine.js`, `sfx.js` and `render.mjs` are the renderer sources. For live preview serve/open local `engine/preview.html?scene=../scene.js` with file access enabled as appropriate; Play enables synthesized audio.
