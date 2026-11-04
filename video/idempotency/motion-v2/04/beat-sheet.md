# Lesson 04 beat sheet: Retry the same key

**Mechanism:** after losing its first reply, the caller resends the same request with its saved key k7. The service looks up k7, finds the record that points to ticket 47, and takes the `found` branch, so it returns the saved result and writes nothing. The caller finally learns ticket 47, and the database still holds one ticket.

Scope: `sequence/lessons.json` item 4 only. The records from the first attempt already exist when the video starts. One retry request and one reply. No payload comparison or mismatch (lesson 05), no new key, no competing retry, no expiry.

Times are playback seconds for `video.mp4` (scene authored at speed 1). Duration 40.00 s, finite ending (fade to black).

## Choices between the plans

| Idea | From | Why |
|---|---|---|
| Service drawn as a decision: `lookup k7` splits into `found → return saved` and a dashed `new → create ticket` branch that never lights | B | Makes "no second ticket" a visible code path that was not taken; new geometry for the chapter |
| `tickets: 1` shown in the database title in every frame | A and B | Unchanged storage is visible evidence before, during, and after the retry |
| Caller card rows: `key k7 · release v1` (tag `saved` → `same key`), `attempts: 1 · reply lost` → `attempts: 2 · retry`, `knows: nothing` → `knows: ticket 47` | B (runner store, attempt log, knows field), A (caller saved request, result unknown) | The retry reuses the stored key; the caller's knowledge changes only on receipt |
| The probe travels from the lookup through the gap between the branches to the `k7 → 47` row | own (lesson 03 review item 1) | Shows the service reading the key record itself |
| `operation keys` and `tickets` drawn as separate tables, both pre-existing | A | Two related record types, not two tickets |
| Payload field matching left out | B | Comparing payloads is lesson 05's mechanism; the retry chip simply carries `v1` |
| Final line `2 attempts · 1 ticket` with one quiet chime | B (text, chime), A (`same operation · same effect`) | States the outcome as counts the viewer can check on screen |
| No `store` sound anywhere | A and B | Nothing is written in this lesson |

Pitches: caller C, service G, database E, key A5 (as in lesson 03).

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–8.0 | Opening: caller `outcome unknown` (lamp blinking), `attempts: 1 · reply lost`, `knows: nothing`; database already holds `k7 → 47` and `47 v1`, `tickets: 1`. 1.2 caller rows flash; `knows: nothing` outlined amber. 2.8 database and both rows flash. 4.4 caller `retrying`, `attempts: 2 · retry`. 4.9 key row flashes, tag `same key`. Hold. | The same saved key will be sent | 1.2 ack C6 · 2.8 ack E6 · 4.4 ack C6 · 4.9 ack A5 |
| 2 | 8.0–17.0 | 8.0 caller `waiting`; chip `retry v1 · k7` down the request lane. 9.4 service `looking up`, lookup box lights. 10.2 probe dot runs down to the key table. 11.3 `k7 → 47` row glows. 12.1 dot returns. 13.2 `lookup k7 → 47`, service `found`. Hold. | Record found | 8.0 send C6 · 8.25 ack A5 · 9.4 arrive G5 · 10.2 send A6 · **11.3 hit A5 (−6.4 dB)** · 13.2 ack G5 |
| 3 | 17.0–24.5 | 17.0 left arrow and `found · return saved` branch light green; the `new · create ticket` branch stays dashed and dim. 18.6 `tickets: 1` and the ticket row flash. Hold. | Nothing written | 17.0 ack G5 · 18.6 ack E6 |
| 4 | 24.5–40.0 | 24.5 service `replied`; chip `ticket 47` up the reply lane. 25.7 small ripple below the caller; `got ticket 47`, `knows: ticket 47`, card glows green. 27.4 `attempts: 2` flashes; 28.5 database and `tickets: 1` flash. 29.8 `2 attempts · 1 ticket`. Hold to 38.0; fade 38.0–39.0; black to 40.0. | Caller has the result; one ticket | 24.5 send G6 · **25.7 deliver C5 (loudest, −5.6 dB)** · 27.4 ack C6 · 28.5 ack E6 · 29.8 chime C5 (quiet) |

## Reproduce

From the repository root (root `node_modules` puppeteer-core 25.14.0, Chrome):

```
node video/idempotency/motion-v2/04/engine/render.mjs video/idempotency/motion-v2/04/scene.js video/idempotency/motion-v2/04/video.mp4 --sheet video/idempotency/motion-v2/04/scratch/contact-sheet.png --wav video/idempotency/motion-v2/04/scratch/sfx.wav
ffmpeg -y -ss 33 -i video/idempotency/motion-v2/04/video.mp4 -frames:v 1 -q:v 2 video/idempotency/motion-v2/04/poster.jpg
```

The local `engine/flow-engine.js` is a copy of the lesson 03 local engine, unchanged. It adds these general helpers to the skill engine: the `card` node with state, rows, and dashed row slots; chip `size`; subtitle size; `vbar`; `arrowhead`; `xmark`; and wire `reveal`, `solid`, and `width`. `render.mjs`, `sfx.js`, and `preview.html` are unchanged from the skill copy.

## Lesson text sync

`sequence/lessons.json` item 4 declares duration 28 with beats at 0/7/14/21. For this cut, use duration 40.0 with beats at **0 / 8.0 / 17.0 / 24.5**. This folder leaves that file unchanged.
