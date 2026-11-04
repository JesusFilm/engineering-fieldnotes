# Lesson 02 beat sheet: A missing reply

**Mechanism:** the service saves ticket 47 and replies, but the reply is lost before it reaches the caller. The caller's timeout then expires with no reply, so from its side the outcome is unknown, while the database already holds the ticket. Another plain create could add a second ticket.

Scope: `sequence/lessons.json` item 2 only. The video sends exactly one request and commits one ticket. The possible duplicate is drawn as a dashed hypothetical and never sent. There is no key, `k7`, transaction, actual retry, or rejection. The stable operation ID is only named.

Times are playback seconds for `video.mp4` (scene authored at speed 1). Duration 43.00 s, finite ending (fade to black).

## Choices between the plans

| Idea | From | Why |
|---|---|---|
| Sequence diagram: three lifelines (caller, network, service), time running down, messages drawn as they happen | B | Makes "sent, saved, lost, timed out" readable as positions in time; varies the geometry from lesson 01 |
| Caller and service lifelines end in two cards: `Caller sees` and `Database` | A (two views), B (knows field + table) | The caller's view and the saved effect sit side by side at the bottom for the whole video |
| Caller timeout drawn as a bar growing down the caller's lifeline; its edge reaches each message row as that message happens | A (deadline cursor), B (timeout bar on lifeline) | Time passing is visible during every hold; the deadline mark sits below the lost reply, so expiry follows the loss |
| Lost reply: chip fades at the network line, grey ×, dim dashed remainder, label `reply lost` | B (fade, grey ×), A (label outside the caller's view) | Loss looks like a missing delivery, not a crash or a cancellation sent to the service |
| Caller states `waiting → timed out → outcome unknown`; the word "failed" never appears | Both | Timeout is the caller stopping, not a result |
| `timeout ≠ no effect` footer | A | Five-word statement of the takeaway |
| Dashed `create again?` arrow and dashed amber row `48 v1 · duplicate?` | B | Makes the duplicate risk concrete while showing it never happened |
| `saved 1` stays at 1 (plan B's `saved 2?` not used) | A | A changed count could read as a second ticket actually saved |
| `needs a stable operation ID` | lesson text, A and B | Names the next lesson's need without showing a key |
| Network header dim, no pitch | B | It is a path, not an actor |

Pitches: caller C, service G, database E; sends an octave up. No chime: nothing resolves.

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–7.9 | 1.2 caller header and `ready` flash. 2.2 empty database row and `saved 0` flash. 3.0 timeout bar appears and starts growing; `create v1` chip and line travel caller → service (3.0–4.6). 4.6 service ripple; label `create v1` stays above the line. | Caller `waiting`, `no reply yet` | 1.2 ack C6 · 2.2 ack E6 · 3.0 send C6 · 4.6 arrive G5 |
| 2 | 7.9–14.4 | 7.9 `save 47` on the service lifeline; a green dot runs down it into the database. 8.9 row `47 v1` appears, card glows. 9.6 `saved 1`. 12.8 reply chip `ticket 47` leaves the service; 14.0 it fades at the network line, grey × pops. 14.4 dashed remainder and `reply lost` appear. | Database holds 47; caller still `waiting` | 7.9 work G4 · **8.9 store E5 (−5.1 dB)** · 9.6 ack E6 · 12.8 send G6 · 14.0 poof (broadband) |
| — | 14.4–20.0 | Hold. Caller's `no reply yet` outlined amber; the timeout bar keeps growing toward its mark. | — | clock ticks at 15.4, 16.5, 17.4, 18.2, 18.85, 19.4, 19.8 (gaps shortening) |
| 3 | 20.0–29.0 | 20.0 bar reaches its mark, glows; `timeout` turns amber; caller card jolts. 21.6 `outcome unknown`, card turns amber. 23.2 database row 47 flashes. 24.6 `timeout ≠ no effect`. Hold. | Caller `timed out` → `outcome unknown`, `no reply` | **20.0 thump C4 (−5.2 dB)** · 21.6 ack C5 · 23.2 ack E6 |
| 4 | 29.0–43.0 | 29.0 dashed `create again?` arrow draws (no chip travels). 30.8 dashed amber row `48 v1 duplicate?` appears. 32.2–33.1 rows 47 and 48 flash in turn. 34.2 `needs a stable operation ID`. Hold to 41.0; fade 41.0–42.0; black to 43.0. | Hypothetical only; `saved 1` unchanged | 29.0 send C6 (quiet) · 30.8 miss E4 (quiet) · 34.2 ack C5 |

## Reproduce

From the repository root (root `node_modules` puppeteer-core 25.14.0, Chrome):

```
node video/idempotency/motion-v2/02/engine/render.mjs video/idempotency/motion-v2/02/scene.js video/idempotency/motion-v2/02/video.mp4 --sheet video/idempotency/motion-v2/02/scratch/contact-sheet.png --wav video/idempotency/motion-v2/02/scratch/sfx.wav
ffmpeg -y -ss 38 -i video/idempotency/motion-v2/02/video.mp4 -frames:v 1 -q:v 2 video/idempotency/motion-v2/02/poster.jpg
```

The local `engine/flow-engine.js` starts from the lesson 01 local copy (general `card` node, chip `size`, subtitle size) and adds general helpers: `vbar` (vertical bar growing from its top with an end mark), `arrowhead`, `xmark` (persistent circled × or check), a dashed and coloured card row slot (`l{i}Dash`, `l{i}SlotColor`), and wire props `reveal` (progressive draw), `solid`, and `width`. `render.mjs`, `sfx.js`, and `preview.html` are unchanged from the skill copy.

## Lesson text sync

`sequence/lessons.json` item 2 declares duration 28 with beats at 0/7/14/21. For this cut, use duration 43.0 with beats at **0 / 7.9 / 20.0 / 29.0**. This folder leaves that file unchanged.
