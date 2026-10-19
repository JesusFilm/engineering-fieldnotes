> Current comparative revision: use `sh reviews/comparisons/loop-engineering/render.sh` and `python3 reviews/comparisons/loop-engineering/verify.py` from the repository root. Current checks and hashes are in that review folder. The original production notes below describe the earlier encode; historical measurements do not certify the revised media. All FFmpeg codec/filter threads remain capped at two.

# Reproducing the render

All paths are relative to this folder (`video/loop-engineering/fable/`).

Requirements: Node ≥ 18, Google Chrome (or set `CHROME_PATH`), ffmpeg with libx264 and AAC.

```sh
# one-time: renderer dependency (puppeteer-core), kept out of Git by .gitignore (node_modules/).
# Install rather than symlink: the ignore pattern matches directories only, so a symlink would be committed.
cd engine && npm install && cd ..

# timing dry-run (no Chrome needed)
node -e "const F=require('./engine/flow-engine.js'); require('./loop-engineering.js'); const sc=F.createScene(F.lastScene); console.log(sc.meta.renderDuration, sc.audioCues().length)"

# beat stills
node engine/render.mjs loop-engineering.js --stills 2.0,3.5,7.3,11.5,18.0,21.9,25.5,27.6 --stills-dir scratch/stills

# full render (video + synthesised sound, contact sheet)
node engine/render.mjs loop-engineering.js scratch/fable.mp4 --sheet scratch/fable-sheet.png

# publish
cp scratch/fable.mp4 ../../../public/media/loop-engineering/fable.mp4
ffmpeg -y -threads 2 -ss 26.2 -i ../../../public/media/loop-engineering/fable.mp4 -frames:v 1 -q:v 4 ../../../public/media/loop-engineering/fable.jpg

# live preview with sound (space pauses, arrows step frames)
open "file://$PWD/engine/preview.html?scene=file://$PWD/loop-engineering.js"
```

## Local engine copy

`engine/` is a copy of the architecture-flow-video skill's `scripts/` folder (flow-engine.js, sfx.js, preview.html, render.mjs, package.json, package-lock.json). The installed skill was not modified. Changes in this copy, for review before the skill absorbs them:

- `flow-engine.js`: the `store` node accepts `textSize` (row text size; default 26) so run-log rows read at 30 px on a phone. `s.ripple` accepts `markR` (status-mark radius; default 13) so a ✓/✕ can be drawn large enough to read at 350 px wide.
- `render.mjs`: ffmpeg is capped at 2 threads; the temp directory lives in `scratch/` (ignored) instead of the system temp; video is encoded with constant QP 21, `aq-mode=0:mbtree=0`, and a forced keyframe on the final frame, so the identical opening and closing frames also decode identically after encoding (verified by md5 of the decoded first and last frames).

## Verification performed (19 October 2026)

- ffprobe: h264 1080×1920 30 fps yuv420p, AAC 44.1 kHz stereo, 923 frames, 30.77 s, 1,613,060 bytes, `moov` before `mdat` (faststart).
- Full decode with `ffmpeg -f null -`: no errors.
- First and last decoded frames: identical md5; both keyframes.
- Audio: max_volume −3.0 dB, mean −29.0 dB; spectrogram shows a cue on every beat and the stall alarm as the loudest event.
- Sync: decoded-audio onset of the stall alarm at 25.150 s; the log turns red and the ✕ ripple begins in frame 755 (25.17 s). First cue at 0.800 s matches `EDIT 1` leaving the Agent.
- Inspected: contact sheet (`contact-sheet.png`), 350 px beat strip (`beats-350px.png`), full-size frames at 7.3 s, 25.4 s and 26.2 s, spectrogram (`spectrogram.png`).
- Audio was analysed numerically and by spectrogram; it was not listened to.

