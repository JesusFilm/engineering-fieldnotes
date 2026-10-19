# Queued ≠ complete — Astra alternative

Authored independently by **gpt-6-astra**, reasoning **high**, 19 October 2026.

This cut follows a documentation-check agent’s search job through admission and completion: a slow B lets C/D/E fill the waiting queue; F stays with the producer until a place opens, then visibly remains QUEUED while earlier jobs execute, and becomes COMPLETE only after its own execution. The different example and extended ending teach the agent’s reporting contract as well as bounded admission. No other variant scene was read or used. The baseline’s encoded media was inspected only after the first independent scene was completed; that comparison motivated the explicit admission-versus-completion focus. There is no claim that model diversity alone establishes quality.

## Reproduce from repository root

Requires Node >=22.12, Chrome/Chromium, FFmpeg/ffprobe, and Python 3 with NumPy/Pillow. Puppeteer Core is pinned to the repository's **25.14.0** in the local package and lockfile. The engine resolves an installed root dependency, or install its own ignored dependency directory:

```sh
(cd video/queues-and-backpressure/astra/engine && npm ci)
python3 -m venv video/queues-and-backpressure/astra/scratch/venv
video/queues-and-backpressure/astra/scratch/venv/bin/pip install -r video/queues-and-backpressure/astra/requirements.txt
PATH="$PWD/video/queues-and-backpressure/astra/scratch/venv/bin:$PATH" sh video/queues-and-backpressure/astra/render.sh --stills
# Inspect scratch/stills before rendering the movie.
PATH="$PWD/video/queues-and-backpressure/astra/scratch/venv/bin:$PATH" sh video/queues-and-backpressure/astra/render.sh
```

Set `CHROME_PATH` to your browser executable if automatic discovery is insufficient. All production arguments are relative; the installed personal skill is not a runtime dependency. In this workspace, `engine/node_modules` is an ignored relative symlink to the root installation. No dependencies are vendored or committed.

`render.sh` writes the MP4/JPEG only to the two assigned public paths; all temporary frames, WAVs and intermediate encodes stay under this cut's `scratch/`. It runs one encoder at a time with at most two FFmpeg codec/filter threads. Verification writes this cut's evidence and does not call the shared manifest-writing media checker. A new encode requires another visual review before retaining `verified: true`.

## Local rendering changes

The copied engine adds configurable large box sublabels/title size, 44px packet chips and a whole-canvas fade for exact empty boundary frames. Software canvas readback and disabled GPU make headless readback reproducible. Apparent missing labels in displayed previews were investigated; direct pixel comparison found identical title pixels and the all-frame encoded title check passed, so no actual glyph-loss defect is claimed. Rendering uses CRF 29, AAC 64 kb/s, two-thread limits, volume 0.7, faststart, and a forced keyframe after the final fade. None of these edits touched the installed skill.

## Review and evidence

- `beat-sheet.md`: six beats, actor coordinates, sound grammar, lesson boundaries.
- `scene.js`, `engine/`, `export-cues.cjs`: local scene and renderer sources.
- `verify.py`, `verification.json`: decoded format, pixel equality, full decode, audio peak, file size, faststart, cue energy/alignment and FIFO bounds; hashes bind review to this output.
- `evidence/`: encoded contact sheet, 350px beat images, transition sheet, spectrogram and cue energy.
- `review.md`: timestamped defect/improvement review and limitations.
- `variant.json`: verified metadata and six timestamped accessible beat descriptions.

For a local preview, start from this directory:

```sh
python3 -m http.server 8769 --directory .
```

Then open `http://localhost:8769/engine/preview.html?scene=../scene.js`. Press Play to enable sound, use Space to pause and arrow keys to step. The delivered audio was analysed, not physically heard.

The isolated chapter/comparison browser check can be reproduced from the repository root: run `python3 video/queues-and-backpressure/astra/preview-site.py`, serve its `scratch/site` directory on localhost port 8789, then run `node video/queues-and-backpressure/astra/check-page.cjs`. This generates no shared dist output. Production used Node 24.3.0, FFmpeg 8.0.1, NumPy 2.0.2 and Pillow 10.4.0.
