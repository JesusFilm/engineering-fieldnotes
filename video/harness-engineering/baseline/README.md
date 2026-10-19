# Resume work — baseline with comparative orientation correction

Original prototype model was not recorded. Edited by `gpt-6-astra comparative review` on 2026-10-19. Original sources, transcript and encoded media are preserved under `reviews/comparisons/harness-engineering/original-sources/baseline/` and `original-media/`.

Only the visible title and full-frame fade changed in the scene; event timing, original sound cues and the session-continuity lesson remain. The local renderer limits FFmpeg decode/encode/filter work to two threads and accepts `FLOW_SCRATCH` for review-owned transient output. The installed skill is unchanged.

From the repository root, using the existing local Puppeteer dependency:

```sh
cd video/harness-engineering/astra/engine
FLOW_SCRATCH="$PWD/../../../../reviews/comparisons/harness-engineering/scratch" node ../../baseline/engine/render.mjs ../../baseline/harness-engineering.js ../../../../public/media/harness-engineering/baseline.mp4
```

The renderer also works with a local `puppeteer-core` installation in `baseline/engine`. Chrome, Node and FFmpeg are required.

| Playback | Motion and state | Existing sound |
|---|---|---|
| 1–6.4s | A goes through harness/workspace/tests; only PASS advances the progress record | send/arrive, work, hit, store |
| 9–11.5s | Old session disappears; new session appears while workspace/record persist | thump, recover |
| 12–15.7s | Read record, identify pending B, initialize, smoke-check workspace | send/arrive, hit |
| 17–22.4s | Change B, run its check, record PASS | send/arrive, work, hit, store |
| 22.4–26s | Hold recorded progress, then full-frame fade | intentional quiet hold |

The detailed final checks and comparative judgment are in `reviews/comparisons/harness-engineering/after.md`.
