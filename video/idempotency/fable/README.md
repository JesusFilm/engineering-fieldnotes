# Reproduce the fable idempotency cut

Authored by **anthropic/claude-fable-5-1**, reasoning **high**, 2026-10-19. Run from the repository root. Requires Node ≥ 22, Google Chrome (or `CHROME_PATH`), Python 3, FFmpeg and ffprobe.

```sh
npm ci                                   # installs the repository's pinned puppeteer-core 25.14.0
bash video/idempotency/fable/render.sh stills   # per-beat PNGs into scratch/stills; inspect before the movie
bash video/idempotency/fable/render.sh movie    # renders public/media/idempotency/fable.mp4, poster, verification.json
bash video/idempotency/fable/render.sh verify   # re-runs the checks on the existing media
```

The renderer, engine, synthesiser and preview page are copied into `engine/`. `engine/node_modules` is a relative symlink to the repository root `node_modules` (ignored by Git), so the cut uses the repository's pinned renderer dependency; nothing is installed inside the variant. The installed personal skill was not modified.

Local engine changes (all in `engine/`, reported for review):

- `flow-engine.js`: `box` accepts `subSize` and `subMono`; `store` accepts `rowH`, `textSize`, `subSize` and an animated `row{i}TextColor`; `badge` accepts `size`; chip packets accept `size`. The store anchor height follows `rowH`.
- `render.mjs`: FFmpeg limited to two threads; `--scratch <dir>` keeps temporary files beside the cut; `--master <gain>` sets the synthesiser master gain; `--crf` or `--qp` select rate control. `--qp` uses constant QP, disables macroblock-tree lookahead and forces a keyframe on the last frame so a loop with identical first/last source frames decodes to byte-identical boundary frames. AAC at 128 kbit/s.

Exact command used for the delivered file:

```sh
node video/idempotency/fable/engine/render.mjs video/idempotency/fable/scene.js public/media/idempotency/fable.mp4 \
  --sheet video/idempotency/fable/scratch/encoded-sheet.png --wav video/idempotency/fable/scratch/sfx.wav \
  --scratch video/idempotency/fable/scratch --master 0.8 --qp 22
python3 video/idempotency/fable/verify.py --poster-time 27.0
```

Timing dry run without Chrome:

```sh
node -e "const F=require('./video/idempotency/fable/engine/flow-engine.js');require('./video/idempotency/fable/scene.js');const sc=F.createScene(F.lastScene);console.log(sc.meta.renderDuration, sc.audioCues().length)"
```

Browser preview with sound (Play enables audio; space pauses; arrow keys step frames):

```sh
node -e 'const p=require("node:path"),u=require("node:url");const d=p.resolve("video/idempotency/fable");console.log(u.pathToFileURL(p.join(d,"engine/preview.html")).href+"?scene="+encodeURIComponent(u.pathToFileURL(p.join(d,"scene.js")).href))'
```

Evidence: `beat-sheet.md`, `review.md`, `verification.json`, `variant.json`, and `scratch/` (ignored: stills, encoded beat frames at full size and 350 px, contact sheet, spectrogram, synthesised WAV). Font rasterisation differs across platforms, so a re-render elsewhere is expected to be visually equivalent rather than byte-identical.

Sources consulted (retrieved 2026-10-19):

- AWS Builders' Library, *Making retries safe with idempotent APIs* — unique client request identifier (EC2 `ClientToken`); recording the token and the mutation must be one atomic operation; retention is finite. https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/
- Stripe API reference, *Idempotent requests* — the client generates the key; the first response is saved and returned on retry; keys with different parameters error; keys may be pruned after 24 h. https://docs.stripe.com/api/idempotent_requests
- Temporal docs, *Activities* — side-effecting steps such as sending an email are retried automatically by policy, so they should be idempotent to avoid duplicate side effects. https://docs.temporal.io/activities


## Comparative revision, 2026-10-19

Edited by **gpt-6-astra comparative review**; original author remains **anthropic/claude-fable-5-1**. Added moving rewind triangles above the transition fade so the alternate take cannot be mistaken for duplicate cleanup, and increased ticket-row/count typography. The causal events, 29.7-second timeline, and sound sequence are retained. `variant.json` records the correction and updated text sequence. The original `review.md` and `verification.json` describe the author’s earlier encode; current hash-bound evidence lives in `reviews/comparisons/idempotency/encoded-checks.json`.

Reproduce this revision from the repository root (using the pinned root dependency):

```sh
node video/idempotency/fable/engine/render.mjs video/idempotency/fable/scene.js public/media/idempotency/fable.mp4 --scratch reviews/comparisons/idempotency/scratch --master 0.8 --qp 22
ffmpeg -y -v error -threads 2 -filter_threads 2 -ss 27 -i public/media/idempotency/fable.mp4 -frames:v 1 -q:v 3 -threads 2 public/media/idempotency/fable.jpg
python3 reviews/comparisons/idempotency/verify.py
```

The local engine adds a generic rewind transport glyph and an overlay drawing pass. No installed skill or shared runtime was changed. Inspect decoded frames again after rerendering; the prior visual review does not automatically carry to a new hash.
