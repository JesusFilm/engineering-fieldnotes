# Focused sequences

The approved rollout uses five focused lessons for each topic except load balancing, which has six. All are finite 1080×1920 videos with explicit playback; no automatic advance. The shared sequences use four seven-second teaching beats per 28-second lesson. Time is illustrative, not measured system performance. Captions explain the mechanism without requiring prior knowledge; source-backed guide text remains available on demand.

## Reproduction

From the repository root with Python 3, Node 22.12+, Chrome/Chromium and FFmpeg:

```sh
npm ci --ignore-scripts
python3 video/shared/author_sequences.py
python3 scripts/render_sequences.py cache-aside queues-and-backpressure
# Supply any other topic IDs from content/order.json, except load-balancing.
# Load balancing preserves its separately authored six-scene pipeline:
sh video/load-balancing/sequence/render.sh
python3 scripts/check_media.py
python3 scripts/check_sequences.py
python3 scripts/build.py
python3 scripts/check.py
python3 -m http.server 4174 --directory dist
# In another terminal:
node scripts/check_sequence.mjs
```

`author_sequences.py` is the authored curriculum. It writes per-topic storyboards with actors, beats, movement, state changes, teaching explanations and primary-source references. `sequence-engine/compile.py` produces standalone scene scripts and lesson manifests. `render_sequences.py` compiles and renders selected topics, resuming only when source/engine hashes and the actual MP4 hash match. Do not edit generated scene files as the source of truth.

The engine is derived from the existing load-balancing sequence engine. It keeps moving text chips within the stage. The pinned root puppeteer dependency is used; no installed skill is a runtime dependency. MP4s and posters are published from `public/lessons/`. Scratch frames and rendering logs are ignored.

Every packet send/arrival has a quiet synthesised cue. State changes use acknowledgment, success or failure cues; work progress starts with a quiet cue. Reading holds intentionally have no additional sounds. Audio is optional and there is no narration. The captions and fixed reading holds implement the user's request for slower, explicit teaching; the source skill's motion-only and looping conventions do not apply.

## Review

The authoring provenance is the Codex assistant; inherited engine provenance is separate and is not a quality claim. `content/sequences.json` registers all default sequences. `content/variants.json` continues to register the retained original comparison cuts. Integrity evidence belongs in `reviews/sequence-media-checks.json`, browser evidence in `reviews/sequence-browser-checks.json`, and teaching observations under `reviews/sequences/`. A re-encode invalidates its hash-bound review. Measurements and frame inspection are not a claim that audio was listened to or that learner comprehension was tested.
