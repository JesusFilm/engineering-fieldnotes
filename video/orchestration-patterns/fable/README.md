# Split by dependency

Independent orchestration-patterns video and evidence by **anthropic/claude-fable-5-1**, reasoning **high**, 19 October 2026. Seven beats, 30 seconds after comparative revision. See `beat-sheet.md`, `review.md`, `sources.md`, `verification.json`, and the accessible transcript in `variant.json`.

## Reproduce

From the repository root:

```sh
bash video/orchestration-patterns/fable/render.sh stills
# Inspect scratch/stills by eye before proceeding.
bash video/orchestration-patterns/fable/render.sh movie
```

The second command writes `public/media/orchestration-patterns/fable.mp4`, extracts `fable.jpg` from 27.5 s, runs `verify.py` (format, full decode, byte-equal first/last frame, decoded AAC peak, per-cue energy, envelope timing, faststart) and saves review images under this variant's ignored `scratch/`. Visual inspection is still a manual step; `verify.py` never marks the variant verified.

Requirements: Node, Google Chrome (or `CHROME_PATH`), FFmpeg/ffprobe, Python 3 standard library. Verified with Node 24.3.0, FFmpeg 8.0.1, Python 3.9, puppeteer-core 23.11.1.

`engine/` is a local copy of the architecture-flow-video skill's renderer, synthesiser, preview and locked npm manifest. `engine/node_modules` is ignored; here it is a symlink to the installed skill runtime, and `render.sh` installs locally from the lockfile when it is absent. The installed skill was not modified.

Local engine changes (all in `engine/`): `box` gains `subSize`, `subWeight`, `subMono`, `subGap`; `label` gains `spacing`; the renderer caps FFmpeg at two threads, forces a keyframe on the last frame and encodes at constant QP 23 with mb-tree/AQ off so the identical opening and closing stills encode byte-equal, and applies a 0.8 mux gain to the AAC track. Temp files go to `scratch/` via `TMPDIR`.

## Preview with sound

```sh
cd video/orchestration-patterns/fable
node -e 'const {pathToFileURL}=require("node:url");const p=require("node:path");console.log(pathToFileURL(p.resolve("engine/preview.html")).href+"?scene="+encodeURIComponent(pathToFileURL(p.resolve("scene.js")).href))'
```

Open the printed URL in Chrome and press Play. Space pauses, arrow keys step frames. The preview does not apply the final 0.8 mux gain. The MP4 is the deliverable; nobody physically listened to it during this review.


## Comparative revision, 2026-10-19

The original author and reasoning provenance above are retained. Edits by `gpt-6-astra comparative review` are listed in variant.json. The original media and author metadata were archived under reviews/comparisons/orchestration-patterns/scratch/original before editing. Current comparative evidence, primary-source audit and final checks live in reviews/comparisons/orchestration-patterns/. The accessible transcript describes the revised encoded cut; historical beat-sheet/review prose should be read with the revision note below.
