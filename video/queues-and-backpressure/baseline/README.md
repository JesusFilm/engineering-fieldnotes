# Bounded queue — revised original

Original prototype author/model was not recorded. Edited by `gpt-6-astra comparative review`, 19 October 2026. At 23.8s D dequeues and starts running at 24.45s, leaving E waiting. The fade at 25.2–25.8s now shows continued work instead of a stopped DONE worker with queued jobs. The scene still ends before the finite batch completes.

From repository root, with the pinned root dependency installed using `npm ci`:

```sh
node video/queues-and-backpressure/baseline/runtime/render.mjs video/queues-and-backpressure/baseline/queues-and-backpressure.js public/media/queues-and-backpressure/baseline.mp4
python3 reviews/comparisons/queues-and-backpressure/verify.py
```

The local renderer bounds input, output and filter threads to two and applies 0.7 audio gain before AAC encoding. It uses the repository’s pinned puppeteer-core 25.14.0. No installed skill is a runtime dependency. Final verification and hashes live under this topic’s comparison folder. Audio was analysed, not listened to.

| Time | Visible change | Sound |
|---|---|---|
| 1.2–8.05s | A starts; B/C/D fill three waiting slots | send, store, arrive |
| 8.7–9.6s | FULL reaches producer; E held outside queue | thump, miss |
| 10.5–14.2s | Worker keeps progressing while producer waits, then completes A | work ticks, chime |
| 15–18.65s | B dequeues; SPACE returns; E admitted | send, arrive, recover, store |
| 20.5–23.2s | B completes, C dequeues and completes | chime, send, arrive |
| 23.8–25.8s | D dequeues; E remains waiting; D runs through fade | send, arrive |
