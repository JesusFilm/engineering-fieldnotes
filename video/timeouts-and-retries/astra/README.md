# Reproduce the Astra cut

Authored by **gpt-6-astra**, high reasoning, 2026-10-19. All commands below run from the repository root and use relative paths. No installed skill is needed to reproduce this cut.

Requirements: Node >=22.12, Chrome/Chromium, FFmpeg/ffprobe, Python 3 with Pillow and NumPy. `CHROME_PATH` can point to a nonstandard browser executable. Renderer copies are in `engine/`; Puppeteer is pinned to the repository's 25.14.0 version. Dependency directories and scratch are ignored. This checkout uses an ignored local `node_modules` symlink to the repository's installed dependencies. For a clean checkout, install locally:

```sh
npm ci --prefix video/timeouts-and-retries/astra --ignore-scripts
```

Render and inspect pre-movie stills first:

```sh
node video/timeouts-and-retries/astra/engine/render.mjs video/timeouts-and-retries/astra/scene.js --stills 5,11,14,17,23 --stills-dir video/timeouts-and-retries/astra/scratch/stills
```

Render one movie at a time, then run the owned verification script:

```sh
node video/timeouts-and-retries/astra/engine/render.mjs video/timeouts-and-retries/astra/scene.js public/media/timeouts-and-retries/astra.mp4 --sheet video/timeouts-and-retries/astra/scratch/contact.png
python3 video/timeouts-and-retries/astra/verify.py
```

The script produces the poster, contact sheet, beat images at full resolution and 350px, boundary captures, spectrogram, decoded audio, frame hashes, cue evidence, and `verification.json`. Inspect these images before setting `variant.json` verified. Numerical checks do not replace perceptual review. No shared build or verification manifest is modified.

Local preview with Play enabling sound (serve the project, then open this URL):

```sh
python3 -m http.server 4178
```

[Preview](http://localhost:4178/video/timeouts-and-retries/astra/engine/preview.html?scene=../scene.js)

Local changes from the skill engine: 44px box subtitles and larger separated label baselines; 42px header subtitle; full-stage fade and exact uniform endpoint frames; CPU canvas readback to fix a missing-glyph still capture; max two FFmpeg threads including filters; capped video bitrate and 64kbps AAC with gain reduction; scratch located only under this variant. The source, engine, command and metadata are portable; font rendering and codec versions can change bytes across machines. `verification.json` binds this review to the delivered encode.
