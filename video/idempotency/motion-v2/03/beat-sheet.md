# Lesson 03 beat sheet: Name the operation

**Mechanism:** before sending, the caller saves key k7 with its release request. The key travels with the request. The service finds no record for k7, then writes the ticket row and the key row in one transaction, so both become saved at the same moment. When this reply is lost too, the caller still holds k7 and the database still maps k7 to ticket 47.

Scope: `sequence/lessons.json` item 3 only. One new, protected attempt. The video shows no resend of k7, no lookup hit, no changed payload, no competing caller, and no key expiry. Uniqueness is shown as a property of the key table only.

Times are playback seconds for `video.mp4` (scene authored at speed 1). Duration 46.00 s, finite ending (fade to black).

## Choices between the plans

| Idea | From | Why |
|---|---|---|
| Vertical stack: caller card with its local key row, request and reply lanes, service bar, database card | B | One reading direction for intent → request → storage; differs from lesson 01's nested service and lesson 02's lifelines |
| Two full-width tables stacked inside the database: `tickets` and `operation keys` | A (stacked rows) | Full-width rows keep `k7 → ticket 47` large at 350 px |
| Dashed amber `transaction · open` frame around both tables, pending dashed rows, then a single commit flips the frame and both rows solid in the same frame | A and B | Shows "both or neither" as one state change; the frame fades afterwards because the transaction is over |
| `unique` marker on the key table, turning amber when k7 is claimed | A (constraint strip), B (`key is unique`) | The database enforces the key; the lookup alone is not the safeguard |
| Lookup shown as `no row for k7` in the key table, then service `no record` | B | Grounds "the service checks its stored records" without a long chip route |
| Caller row `key k7 · release v1` tagged `saved locally` before any request leaves; the caller reads `not sent` | A and B | Key first is the beat-1 lesson |
| Lost reply: chip fades on the reply lane, grey ×, lane label becomes `reply lost`; caller `timed out` → `outcome unknown` | A and B | Continues lesson 02's grammar |
| Closing: caller k7 row, key row, ticket row highlight in turn, then `k7 still names ticket 47` | A (in-turn emphasis), B (note text) | Avoids B's dashed link line, which could read as another data path |
| Key pitch A5, separate from caller C, service G, database E | B | The ear follows k7: saved, sent, claimed, committed, still held |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–8.0 | 1.2 caller lights; `key k7 · release v1` types in. 2.8 row turns solid green, tag `saved locally`. 4.4 `not sent` flashes. Hold. | Key saved before sending; database empty | 1.2 ack A6 · **2.8 store A5 (−5.6 dB)** · 4.4 clock tick |
| 2 | 8.0–16.0 | 8.0 caller `sending`; chip `create v1 · k7` down the request lane (8.2–9.8). 9.8 service `checking k7`, caller `waiting` (lamp blinks). 10.8 probe dot to the database. 11.4 key table shows `no row for k7`. 12.4 probe returns; 12.9 service `no record`. Hold. | Lookup finds nothing; tables still empty | 8.2 send C6 · 8.45 ack A5 · 9.8 arrive G5 · 10.8 send A6 · 11.4 miss E5 (soft) |
| 3 | 16.0–26.5 | 16.0 service `creating`; dashed `transaction · open` frame appears. 17.2 pending `47  release v1` (dashed amber). 18.4 pending `k7 → ticket 47`, `unique` turns amber. Hold with both pending. **21.4 commit:** frame, both rows and both tables turn solid green in the same video frame (641 → 642); `committed`. 24.4 the frame fades; the rows stay. | Both rows saved together | 16.0 ack E4 · 17.2, 18.4 work E4 · 18.55 ack A5 · **21.4 store E5 + store A5 together (loudest, −2.3 dB)** |
| 4 | 26.5–46.0 | 26.5 service `replied`; chip `ticket 47` rises and fades at the grey × (27.6); lane label `reply lost`. Caller keeps waiting. 31.0 `timed out` with a jolt; 32.3 `outcome unknown`. 34.0, 35.1, 36.2 caller k7 row, key row, ticket row highlight in turn. 37.4 `k7 still names ticket 47`. Hold to 44.0; fade 44.0–45.0; black to 46.0. | Rows unchanged; caller still holds k7 | 26.5 send G6 · 27.6 poof · 31.0 thump C4 (−4.6 dB) · 34.0 ack A5 · 35.1 ack A5 · 36.2 ack E5 |

## Reproduce

From the repository root (root `node_modules` puppeteer-core 25.14.0, Chrome):

```
node video/idempotency/motion-v2/03/engine/render.mjs video/idempotency/motion-v2/03/scene.js video/idempotency/motion-v2/03/video.mp4 --sheet video/idempotency/motion-v2/03/scratch/contact-sheet.png --wav video/idempotency/motion-v2/03/scratch/sfx.wav
ffmpeg -y -ss 41 -i video/idempotency/motion-v2/03/video.mp4 -frames:v 1 -q:v 2 video/idempotency/motion-v2/03/poster.jpg
```

The local `engine/flow-engine.js` is a copy of the lesson 02 local engine, unchanged. It adds these general helpers to the skill engine: the `card` node with state, rows, and dashed or coloured row slots; chip `size`; subtitle size; `vbar`; `arrowhead`; `xmark`; and wire `reveal`, `solid`, and `width`. `render.mjs`, `sfx.js`, and `preview.html` are unchanged from the skill copy.

## Lesson text sync

`sequence/lessons.json` item 3 declares duration 28 with beats at 0/7/14/21. For this cut, use duration 46.0 with beats at **0 / 8.0 / 16.0 / 26.5**. This folder leaves that file unchanged.
