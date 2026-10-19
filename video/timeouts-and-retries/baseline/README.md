# Revised baseline: timeout does not cancel work

Original prototype; authoring model not recorded. Revised by `gpt-6-astra comparative review` on 2026-10-19. Original sources are retained under `reviews/comparisons/timeouts-and-retries/original-sources/baseline/`; corrections are recorded in `variant.json`.

Mechanism: the caller expires an attempt while remote work continues, rejects a late reply, waits, and performs its final allowed read. Beat sheet is `transcript.json`; sound events are declared by the local scene. This is a read-only, per-attempt example, not an operation-wide deadline or fleet-jitter demonstration.

Run from the repository root with Node >=22.12, Chrome, FFmpeg and the repository's pinned `puppeteer-core` installed (`npm ci`). No installed personal skill is required.

```sh
mkdir -p reviews/comparisons/timeouts-and-retries/scratch/render
TMPDIR="$PWD/reviews/comparisons/timeouts-and-retries/scratch/render" node video/timeouts-and-retries/baseline/engine/render.mjs video/timeouts-and-retries/baseline/timeouts-and-retries.js public/media/timeouts-and-retries/baseline.mp4
ffmpeg -y -v error -threads 2 -filter_threads 2 -filter_complex_threads 2 -i public/media/timeouts-and-retries/baseline.mp4 -ss 10.5 -frames:v 1 -q:v 2 -threads 2 public/media/timeouts-and-retries/baseline.jpg
python3 reviews/comparisons/timeouts-and-retries/verify.py
```

The local renderer caps FFmpeg decoder/filter/encoder threads at two. A new encode requires new visual review and renewed comparison hashes, not just running the verifier. The verifier uses Python with Pillow and NumPy, FFmpeg/ffprobe and Node; scratch remains under the topic review. Audio checks are analytical, not listening.
