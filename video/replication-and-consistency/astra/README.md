# Reproduce the Astra cut

Authored by **gpt-6-astra**, high reasoning. This directory owns its scene, engine copy, pinned package manifest/lock, beat sheet, checks, and evidence. The installed architecture-flow-video skill was only read and copied; it was not modified. No other variant scene was inspected.

Requirements: Node >=22.12, npm, Python 3 (standard library only), FFmpeg/ffprobe with libx264 and AAC, and Chrome. Set `CHROME_PATH` if Chrome is not in a standard location. `engine/package.json` pins the repository's puppeteer-core 25.14.0. The current engine/node_modules is an ignored relative symlink to the root dependency directory; a fresh checkout with no dependencies uses `npm ci` locally in engine. No runtime dependency on the installed skill or absolute machine path is required.

From the repository root:

```sh
sh video/replication-and-consistency/astra/render.sh stills
# Inspect evidence/preflight.png and the full-resolution scratch/stills images.
sh video/replication-and-consistency/astra/render.sh encode
sh video/replication-and-consistency/astra/render.sh verify
# Inspect evidence/encoded-sheet.png, phone-*.png, encoded-full.png and spectrogram.png.
```

Outputs are public/media/replication-and-consistency/astra.mp4 and astra.jpg. All temporary renderer files stay under this directory's ignored scratch/. Commands run one FFmpeg process at a time with two encoder/decoder threads and two filter threads. The encode uses H264 CRF 29 slow, yuv420p, 1080×1920/30fps, AAC 80k, audio gain 0.75, and faststart. The poster is extracted at 19.6 seconds from the actual encode.

The local engine adds a generic animated card (label/value/detail), larger packet type, an 80 px title and 36 px subtitle, and optional full-stage fading. The local renderer changes scratch placement, encoding limits, and compression/audio settings. Other node APIs are unchanged. Fonts use the engine's platform fallback stack; a different operating system or Chrome/FFmpeg version can change pixel hashes and file size. Re-run both numerical and visual verification after regeneration; verified metadata must not be carried forward blindly.

For interactive preview, open engine/preview.html and pass the absolute scene URL using its `?scene=file:///.../scene.js` query; Play enables sound. The committed record reports analytical audio verification only, not listening.

`verify.py` checks a complete decode, exactly equal decoded first and last frames, atom ordering, codec/pixel format/size/duration, peak audio, and decoded signal energy at all cue times. Cue energy does not establish perceived loudness or absence of masking. Cues sharing an event are measured together. The accessible five-beat transcript is in variant.json. The source-backed written guide and claim audit live in the assigned content and reviews directories.

Optional isolated page check (does not touch shared dist or scripts):

```sh
python3 video/replication-and-consistency/astra/preview-chapter.py
node video/replication-and-consistency/astra/check-page.cjs
```

This uses the existing chapter/comparison templates with only the Astra cut. Browser captures cover 390 and 1280 px, including the exercise and expanded accessible transcript. It does not rank or integrate other variants.
