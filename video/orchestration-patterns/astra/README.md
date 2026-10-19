# Astra: Join the checks

Authored by gpt-6-astra with high reasoning on 2026-10-19. Independently composed from the concept and skill documentation; no other variant scene was opened.

From the repository root, with Node, Python 3, FFmpeg/FFprobe and Chrome installed:

```sh
npm ci --prefix video/orchestration-patterns/astra/engine
node video/orchestration-patterns/astra/engine/render.mjs video/orchestration-patterns/astra/scene.js --stills 4.5,8.5,13.4,15.6,18.3,23.9,26.8 --stills-dir video/orchestration-patterns/astra/scratch/stills
node video/orchestration-patterns/astra/engine/render.mjs video/orchestration-patterns/astra/scene.js public/media/orchestration-patterns/astra.mp4 --sheet video/orchestration-patterns/astra/scratch/encoded-sheet.png
python3 video/orchestration-patterns/astra/verify.py
```

Inspect the stills before rendering. Inspect encoded-sheet.png, the 350px beat images and spectrogram under scratch after verification. Commands use relative project paths. Chrome is discovered in normal macOS/Linux locations; otherwise set CHROME_PATH. Local dependency manifests and lockfile are supplied. The production run used an ignored engine/node_modules symlink to the existing Puppeteer installation; `npm ci` provides an independent local installation. No installed skill was modified.

The engine directory is a local copy of architecture-flow-video's renderer, engine, synthesizer and preview. Local changes: configurable box sublabel font size, increased line separation, all temporary artifacts under ../scratch, FFmpeg encoding/filter thread limits of two, CRF 27 with 420 kbit/s VBV cap, 48 kbit/s AAC with 0.65 gain. Encoding runs sequentially. The exact encoded checksum may vary with Chrome/font/FFmpeg versions; semantic and format verification must be repeated on rerender.

To preview with sound enabled by a user click, run this from the repository root on macOS:

```sh
node -e 'const p=require("node:path"),u=require("node:url"),c=require("node:child_process");const base=p.resolve("video/orchestration-patterns/astra");c.spawnSync("open",[u.pathToFileURL(p.join(base,"engine/preview.html")).href+"?scene="+encodeURIComponent(u.pathToFileURL(p.join(base,"scene.js")).href)]);'
```

Press Play to enable audio; space toggles playback and arrow keys step. Preview audio is the synthesizer signal before the final encode gain, so encoded level measurements are authoritative. See beat-sheet.md, review.md and variant.json for the lesson, limitations and accessible transcript.

## Comparative revision, 2026-10-19

The original author and reasoning provenance above are retained. Edits by `gpt-6-astra comparative review` are listed in variant.json. The original media and author metadata were archived under reviews/comparisons/orchestration-patterns/scratch/original before editing. Current comparative evidence, primary-source audit and final checks live in reviews/comparisons/orchestration-patterns/. The accessible transcript describes the revised encoded cut; historical beat-sheet/review prose should be read with the revision note below.
