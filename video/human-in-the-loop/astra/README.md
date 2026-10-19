# Astra: Approve the artifact

Authored by gpt-6-astra with high reasoning, 2026-10-19. Independent alternative for human-in-the-loop. All commands below run from the repository root, with Node, Python 3, FFmpeg/FFprobe and Google Chrome installed. Set CHROME_PATH if needed.

```sh
npm ci --prefix video/human-in-the-loop/astra/engine
node video/human-in-the-loop/astra/engine/render.mjs video/human-in-the-loop/astra/scene.js --stills 4.7,9.9,15.3,21.9,26.5 --stills-dir video/human-in-the-loop/astra/scratch/stills
node video/human-in-the-loop/astra/engine/render.mjs video/human-in-the-loop/astra/scene.js public/media/human-in-the-loop/astra.mp4 --sheet video/human-in-the-loop/astra/scratch/encoded-contact.png
python3 video/human-in-the-loop/astra/verify.py
python3 video/human-in-the-loop/astra/check-audio.py
```

Inspect stills before running the movie command; inspect encoded contact sheet, five 350px beat images, boundaries and spectrogram after verification. `verify.py` also creates the JPEG poster and writes `verification.json`; a passing script alone does not replace visual review. The original build used an ignored `engine/node_modules` symlink to the installed skill dependency directory. For a fresh standalone checkout, `npm ci` installs from the included lockfile. No dependencies are committed in node_modules.

Local engine copied from architecture-flow-video; installed skill untouched. Local changes: optional title size and box sublabel sizes for readable scene labels, larger box sublabels and vertical spacing, generic retracting barrier node, scratch allocation beside the scene, two-thread encoding/filter limits, CRF 30 with one-second GOP, 64 kb/s AAC with 0.7 gain, and faststart. The final local copy also supports a full-stage fade (including title), disables Chrome GPU rendering and requests a canvas suited to pixel readback. Renderer and synthesizer sources plus package lock are retained here. No network libraries are needed at render time after dependency installation.

Preview: serve the repository locally or open `engine/preview.html` with a `scene` query pointing to `../scene.js` (relative to the preview page). Press Play to enable sound. Rendering uses the same engine and timeline. Audio review here was analytical, not physical listening.

Portable live preview command (repository root):

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/video/human-in-the-loop/astra/engine/preview.html?scene=../scene.js`; Play enables sound. This is optional and was not used to claim listening.
