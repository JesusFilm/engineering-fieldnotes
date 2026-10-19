# Read your write

Independent GPT-6.1 Sol / high cut of replication and consistency. The normal case, stale read, and primary retry are shown through version chips and a tool-wrapper check. See [beat sheet](beat-sheet.md), [evidence and assumptions](evidence.md), [review](review.md), and [verification](verification.json).

## Reproduce

From the repository root, install the exact renderer dependency with `npm ci` if needed, then:

```sh
sh video/replication-and-consistency/sol/render.sh
```

Requires Node >=22.12, Google Chrome (or `CHROME_PATH`), FFmpeg with libx264, and Python 3. The root package-lock pins puppeteer-core 25.14.0. This cut stores its renderer, engine, synthesizer and preview beside its scene. It has no dependency on the installed personal skill. Scratch frames, intermediate encodes and WAVs stay in this cut's ignored `scratch/`; dependencies remain in ignored repository-root `node_modules/`.

Encoding uses at most two FFmpeg codec threads, two filter threads, x264 lookahead 1, CRF 30, fixed one-second GOP, AAC 64 kb/s, yuv420p, and faststart. Render one encoder at a time. `render.sh` makes pre-render beat stills, movie, encoded sheet and poster, then runs the local checks. Changes require renewed visual review; verification data alone cannot establish legibility or teaching quality.

## Preview

From the repository root:

```sh
python3 -m http.server 4177 --bind 127.0.0.1
```

Open [the local preview](http://localhost:4177/video/replication-and-consistency/sol/engine/preview.html?scene=../scene.js). Press Play to enable synthesized sound. Space pauses, arrows step frames, and the speed control changes playback pace. This source preview is not a substitute for reviewing the actual encoded MP4.

## Local engine changes

- A general `panel` node with large state text, animation-aware properties and matching anchors.
- Larger chip text (40 px) for phone readability.
- Whole-canvas fade for a uniform loop boundary.
- Renderer scratch constrained to this cut, reduced output size, and explicit thread limits.

Outputs: `public/media/replication-and-consistency/sol.mp4` and `sol.jpg`. `variant.json` is written only after actual encoded checks and visual review. Audio was analysed, not physically listened to. The video is self-reviewed and has not been promoted through a fresh comparative review.

## Comparative revision — 2026-10-19

GPT-6.1 Sol remains the authoring model. `gpt-6-astra comparative review` separated the wrapper-to-tool delivery from the crossing replication wire and made the later tool step visibly wait for its own check. The transcript and corrections are in `variant.json`; the independent review, original blind findings and final hash-bound checks are under `reviews/comparisons/replication-and-consistency/`. The self-review above describes the original authored cut. Comparative review does not imply human editorial promotion.
