# Lesson 05 beat sheet: Changed intent, new key

**Mechanism:** key k7 already names "create a ticket for release v1". A request reuses k7 but asks for release v2. The service compares the stored request with the incoming one field by field: the key matches, the release differs, so it rejects the request and leaves ticket 47 untouched. A separate intent needs a new key; a retry keeps k7.

Scope: `sequence/lessons.json` item 5 only. One mismatched request is sent and rejected. The new key k8 is prepared but never sent, and no ticket 48 appears. No concurrency, expiry, or provider comparison.

Times are playback seconds for `video.mp4` (scene authored at speed 1). Duration 42.00 s, finite ending (fade to black).

## Choices between the plans

| Idea | From | Why |
|---|---|---|
| Field-by-field comparison inside the service: `stored for k7` and `incoming` columns, rows `key` and `release`, with `=` then `≠` between them | A and B | The comparison is the new mechanism; key match is shown before payload mismatch |
| Stored record fetched from `operation keys` by a dot on a short wire before the stored column fills | B | Shows where the stored request comes from |
| Database with `k7 → 47 · v1`, `47 v1`, and `tickets: 1` visible in every frame | A and B | Rejection visibly preserves the record |
| Caller rows: `k7 · release v1 · done` and `k7 · release v2 · new intent?` → `rejected` → `k8 · release v2 · not sent` | B (runner store, k8), A (`not submitted`) | Shows the correct pattern concretely without sending anything |
| Rejection styled amber with a small jolt and a low thump; no red crash | A and B | A handled contract error, not a failure of the system |
| Footers `rejected · record unchanged` then `retry: same key · new intent: new key` | A (footer), B (rule line) | Two short statements of the outcome and the rule |
| Same stage as lesson 04 (caller card, two lanes, service, database) | own | Continuity across the key lessons; the service interior carries the new object |

Pitches: caller C, service G, database E, key k7 A5, new key k8 B5.

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–8.5 | Opening: caller `has ticket 47`, row `k7 · release v1 · done`; database `k7 → 47 · v1`, `47 v1`, `tickets: 1`. 1.2 caller row and key row flash together. 3.0 second row `k7 · release v2 · new intent?` appears (amber). 4.6 both rows flash. Hold. | Same key, new intent | 1.2 ack A5 · 3.0 ack C6 · 4.6 ack A5 |
| 2 | 8.5–19.0 | 8.5 caller `sending`; amber chip `create v2 · k7` down. 9.9 service `comparing`; incoming column fills. 10.9 dot from the key row up to the service; 11.8 stored column fills. 13.2 key rows outlined green, `=`. 14.6 release rows outlined amber, `≠` with a jolt. 15.6 `same key · different request`, service `mismatch`. Hold. | Mismatch found | 8.5 send C6 · 8.75 ack A5 · 9.9 arrive G5 · 10.9 send A6 · 11.8 ack E5 · 13.2 ack A5 · **14.6 miss E5 (−13.0 dB)** |
| 3 | 19.0–28.0 | 19.0 service `rejected` with a small jolt. 19.4 amber chip `rejected` up the reply lane. 20.6 caller `rejected`; v2 row dims, tag `rejected`. 21.8 database and both rows flash; `tickets: 1`. 22.8 `rejected · record unchanged`. Hold. | Nothing written | **19.0 thump G4 (−5.3 dB, loudest)** · 19.4 send G6 · 20.6 deliver C4 (−6.5 dB) · 21.8 ack E6 |
| 4 | 28.0–42.0 | 28.0 v2 row becomes `k8 · release v2 · not sent` (green); caller `new key ready`. 29.6 k7 row flashes; 30.7 k8 row flashes. 31.9 `retry: same key · new intent: new key`. Hold to 40.0; fade 40.0–41.0; black to 42.0. | k8 prepared, not sent | 28.0 store B5 (−6.4 dB, caller-local) · 29.6 ack A5 · 30.7 ack B5 · 31.9 chime C5 (quiet) |

No `store` sound plays at the database; the only store cue is the caller saving k8 locally.

## Reproduce

From the repository root (root `node_modules` puppeteer-core 25.14.0, Chrome):

```
node video/idempotency/motion-v2/05/engine/render.mjs video/idempotency/motion-v2/05/scene.js video/idempotency/motion-v2/05/video.mp4 --sheet video/idempotency/motion-v2/05/scratch/contact-sheet.png --wav video/idempotency/motion-v2/05/scratch/sfx.wav
ffmpeg -y -ss 35 -i video/idempotency/motion-v2/05/video.mp4 -frames:v 1 -q:v 2 video/idempotency/motion-v2/05/poster.jpg
```

The local `engine/flow-engine.js` is an unchanged copy of the lesson 04 local engine. It adds these general helpers to the skill engine: the `card` node with state, rows, and dashed or coloured row slots; chip `size`; subtitle size; `vbar`; `arrowhead`; `xmark`; and wire `reveal`, `solid`, and `width`. `render.mjs`, `sfx.js`, and `preview.html` are unchanged from the skill copy.

## Lesson text sync

`sequence/lessons.json` item 5 declares duration 28 with beats at 0/7/14/21. For this cut, use duration 42.0 with beats at **0 / 8.5 / 19.0 / 28.0**. This folder leaves that file unchanged.
