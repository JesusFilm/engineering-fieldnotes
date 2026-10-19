# Idempotency: Retry the intent

Authored by **gpt-6-astra**, reasoning **high**, 2026-10-19.

From the repository root:

```sh
cd video/idempotency/astra
bash render.sh deps
bash render.sh stills
# Inspect scratch/stills before rendering the movie.
bash render.sh movie
bash render.sh verify
```

Requires Node >=22.12, Chrome (or CHROME_PATH), FFmpeg/ffprobe, and Python 3. The renderer uses the repository-pinned puppeteer-core 25.14.0; its exact local dependency graph is in engine/package-lock.json. In this workspace engine/node_modules is a relative symlink to the ignored root node_modules. A standalone checkout can use `deps` to install locally. No dependency directory belongs in source control.

The renderer, engine, preview, and synthesizer are copied locally; the installed skill is not a runtime dependency and was not modified. FFmpeg encoders and filters are limited to two threads; commands run sequentially. All temporary media and review captures stay in scratch/. Encoded output and poster go to the assigned public/media/idempotency/ paths.

`verify.py` decodes the complete file, compares first and last decoded RGB frames byte-for-byte, checks format/size/audio peak/MP4 atoms, extracts a JPEG poster and encoded full-size/350px beat frames, draws a spectrogram, and checks decoded audio energy at every scheduled cue. Hash-bound results are written to verification.json. check-sync.py additionally compares every encoded cue onset against a deterministic synthesized reference, within one video frame; audio-sync.json records the results. Visual review is recorded separately in review.md; passing this script is not an automatic teaching-quality review.

For the live preview, run `bash render.sh preview` for the portable server command and URL. The Play button enables sound. The author analysed audio but did not physically listen.

The guide’s primary-source review is in ../../../reviews/concepts/idempotency/review.md. The accessible text equivalent is the five-beat transcript in variant.json. The video illustrates a proposed single-database tool contract, not a guarantee supplied by an agent or its prompt.
