# Reproduce Astra cache-aside

Authored by **gpt-6-astra**, reasoning **high**, 2026-10-19. Run these commands from the repository root. Node, Google Chrome (or `CHROME_PATH`), Python 3, FFmpeg and ffprobe must be available.

```sh
bash video/cache-aside/astra/render.sh stills
# Inspect scratch/stills before proceeding.
bash video/cache-aside/astra/render.sh movie
# Inspect scratch/encoded-sheet.png, scratch/encoded/*-350.png and spectrogram.png.
```

`movie` renders the final MP4, then extracts the JPEG poster and review images and writes `verification.json`. It does not mark a new render visually reviewed. Existing `variant.json` describes the checked delivered version; after changing the scene, repeat review before replacing verification metadata.

To check an existing movie with its retained scratch/sfx.wav:

```sh
bash video/cache-aside/astra/render.sh verify
python3 reviews/concepts/cache-aside/race-demo.py
```

The renderer, engine, synthesizer, preview, package manifest and lockfile are copied locally in `engine/`. The installed skill was not edited. `npm ci --prefix video/cache-aside/astra/engine` installs the locked renderer dependency into ignored `node_modules`; this session reused the installed dependency through a local ignored symlink. The symlink is not part of the portable source. Remove an absent-target local symlink before installing on a different machine. No dependencies belong in source control.

Local modifications: a generic record panel with large animated values; 44px packet chips; 40px subtitle; optional full-stage fade and blank endpoints; renderer scratch fixed to this variant; two-thread FFmpeg/filter limits; H.264 CRF 24, 410 kbit/s VBV maximum, AAC 64 kbit/s and 0.65 audio gain. Rendering and verification invoke encoders sequentially. The code has no absolute local dependency paths. System font availability can alter text rasterization across platforms; binary-identical output across different Chrome/font/FFmpeg versions is not promised.

Optional browser preview (enable sound with Play): open `engine/preview.html` with a `scene=file://.../scene.js` query using absolute file URLs for your checkout. A portable command that prints that URL:

```sh
node -e 'const p=require("node:path"),u=require("node:url"); const d=p.resolve("video/cache-aside/astra"); console.log(u.pathToFileURL(p.join(d,"engine/preview.html")).href+"?scene="+encodeURIComponent(u.pathToFileURL(p.join(d,"scene.js")).href))'
```

Evidence: `beat-sheet.md`, `review.md`, `timing-audit.json`, `verification.json`, and `../../../reviews/concepts/cache-aside/`. Scratch retains encoded beat frames, spectrogram, source/decoded WAVs, and decode logs. No physical listening is claimed.
