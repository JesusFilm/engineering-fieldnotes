# Lesson 01 beat sheet: One intended operation

**Mechanism:** the saved ticket row is the business effect. The response that arrives later only reports it. The viewer watches ticket 47 sit in the table while the caller's `knows` row still says `nothing yet`, and only then sees the reply fill it.

Scope: `sequence/lessons.json` item 1 only. The video contains no operation key, lost reply, timeout, retry, duplicate, or payload mismatch. One normal, successful attempt.

Times are playback seconds for `video.mp4`. The scene is authored at speed 1, so scene time equals playback time. Duration 43.40 s, finite ending (fade to black).

## Choices between the plans

| Idea | From | Why |
|---|---|---|
| Database table drawn inside the service's dashed workspace | A | Shows that the service owns the write; avoids a generic three-box pipeline |
| Separate request and response lanes; the save is a third, internal path (`insert 47`) | A | Network request, database write, and network response read as different operations |
| `saved tickets: 0 → 1`, changing once at commit | A (counter), B (effects) | A count makes "one effect" visible without the word idempotent |
| Caller card with a `knows` row: `nothing yet` → `ticket 47` | B (caller ledger) | Puts what the caller knows beside what it wants, so the gap after the save is visible on the caller itself |
| Sparse status line: `saved · caller not told yet`, later `saved first · reported after` | A (phase note), B (gap label) | Names the central state in five words; no paragraph captions |
| Matching emphasis: table row 47, then caller row 47 | A | Ties the report to the effect without drawing a second data path |
| Not used: B's dashed link from the caller's row to the table row | — | A line from caller to database could read as a fourth data path |
| Not used: A's separate receipt document | — | A second document labelled 47 could read as a second ticket |
| Caller blinks amber while waiting (visual only) | own | Keeps the long holds stateful without a looping sound |
| Actor pitches: caller C, service G, database E (B); sends an octave up | B | Same C major triad grammar as the series |

Title band: `Idempotency` / `ONE INTENDED OPERATION` (chapter name plus lesson name).

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–7.5 | 1.2 caller lights, `wants 1 ticket for release v1` types in. 3.4 empty table row and `saved tickets: 0` flash. 4.8 caller `knows nothing yet` flashes. Hold. | Caller `ready`; service `idle`; table empty; count 0 | 1.2 ack C6 · 3.4 ack E6 · 4.8 ack C6 |
| 2 | 7.5–14.5 | 7.5 caller `waiting`, lamp starts to blink. 7.9–9.4 chip `create v1` down the request lane. 9.4 ripple; service row `create ticket · v1` fills. 10.4/11.1/11.8 row pulses amber. Hold to 14.5. | Service `idle → working`; table still empty | 7.9 send C6 · 9.4 arrive G5 · 10.4, 11.1, 11.8 work G4 |
| 3 | 14.5–24.5 | 14.5–15.7 chip `insert 47` drops into the table. 15.7 row `47  v1` appears in teal, table glows. 16.6 count → 1. 17.8 `saved · caller not told yet` appears; caller `knows nothing yet` outlined amber. Hold 17.8–24.5 (central frame). | Service `saved`; table 1 row; count 1; caller still `waiting` / `nothing yet` | 14.5 send G6 · **15.7 store E5 (loudest peak, −4.5 dB)** · 16.6 ack E6 · 17.8 clock tick |
| 4 | 24.5–32.5 | 24.5 status line fades; service `replied`; chip `ticket 47` rises up the response lane. 26.0 small teal ripple under the caller; caller `got reply`, `knows ticket 47`. Hold. | Caller `waiting → got reply`; table and count unchanged | 24.5 send G6 · 26.0 deliver C5 (−6.5 dB) |
| 5 | 32.5–43.4 | 32.5 table row 47 and count flash. 33.7 caller row 47 flashes. 35.0 `saved first · reported after` appears. Hold to 41.4; fade 41.4–42.4; black to 43.4. | Final: one row, count 1, caller knows 47 | 32.5 ack E6 · 33.7 ack C6 · 35.0 arrive C5 (soft) · silent hold |

## Reproduce

From the repository root (uses the root `node_modules` puppeteer-core 25.14.0 and Chrome):

```
node video/idempotency/motion-v2/01/engine/render.mjs video/idempotency/motion-v2/01/scene.js video/idempotency/motion-v2/01/video.mp4 --sheet video/idempotency/motion-v2/01/scratch/contact-sheet.png --wav video/idempotency/motion-v2/01/scratch/sfx.wav
ffmpeg -y -ss 38.5 -i video/idempotency/motion-v2/01/video.mp4 -frames:v 1 -q:v 2 video/idempotency/motion-v2/01/poster.jpg
```

The local `engine/flow-engine.js` adds the general `card` node (copied from harness-engineering/motion-v2/01 and extended with a title-line state, tag size, and highlight colour), a `size` option for chip labels, and `meta.subtitleSize/subtitleY/subtitleSpacing`. `render.mjs`, `sfx.js`, and `preview.html` are unchanged from the skill copy.

## Lesson text sync

`sequence/lessons.json` item 1 declares duration 28 with beats at 0/7/14/21. For this cut the coordinator should use duration 43.4 with beats at **0 / 7.5 / 14.5 / 24.5**. This folder leaves that file unchanged.
