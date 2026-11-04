# Idempotency lesson 02 — A missing reply: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/idempotency/sequence/lessons.json` item 2. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (a sequence diagram with caller, network and service lifelines, a timeout bar on the caller, a lost reply marked with a grey ×, `Caller sees` and `Database` cards, and a dashed `48 v1 duplicate?` row) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/idempotency/motion-v2/02/video.mp4` | `0277eb8e4d46e0505cb15b09477d9fdccee3c60ed536e20e1f213ad732daa545` | 43.0 s | h264 1080×1920, 30 fps, 1290 frames | aac |
| public `public/lessons/idempotency/02.mp4` | `211b5bc6bdea05e8cc901b92ac2ced0aad45aa2e5d29797c15d5cb10ff019c34` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/02/hash-before.txt`) and after (`scratch/02/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It puts the caller's knowledge and the database's state side by side on one timeline: `create v1` reaches the service, `save 47` makes the database `47 v1` and `saved 1`, the `ticket 47` reply breaks at the network (`reply lost`, grey ×), the caller's timeout bar runs out and `Caller sees` changes from `waiting · no reply yet` to `timed out` and `outcome unknown`, with `timeout ≠ no effect` beneath. A dashed `create again?` arrow and a dashed `48 v1 duplicate?` row show the risk without sending a retry, and `needs a stable operation ID` closes the lesson. The public cut is accurate but shows the caller as red `timed out`, which reads as a failure, and leaves the duplicate risk to a caption. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/02/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 15.6 and 31.0 s (`t350/`, `t350_a.png`), viewed at native size.
- Full-resolution seek frame at 31.0 s with text-band measurement (`full/`): `create v1` ≈ 42 px band, `reply lost` ≈ 31 px, `save 47` ≈ 25 px glyph height.
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (43.0 s).** Title `Idempotency`, subtitle `A MISSING REPLY`. Lifeline headers `caller`, `network` (dim), `service`; a timeout bar on the caller lifeline; `Caller sees` and `Database` (`saved N`, `id release`) cards below.

| time | beat | evidence |
|---|---|---|
| 0–9 s | the caller sends a create request; the service receives it | caller `ready` → `waiting · no reply yet`; `create v1` arrow caller → service (≈ 4–5 s); timeout bar begins |
| 9–17 s | the service saves ticket 47; its response will not reach the caller | `save 47`; database `47 v1`, `saved 1` (≈ 9–11 s); `ticket 47` leaves the service and stops at the network with a grey ×; `reply lost` dashed to the caller (≈ 14–15 s); `no reply yet` highlighted |
| 18–22 s | the caller stops waiting; its outcome is unknown | timeout bar full, `timeout` amber; `Caller sees timed out · no reply`, then `outcome unknown` (≈ 20 s); `timeout ≠ no effect` (≈ 22 s) |
| 25–43 s | another create could add a duplicate; the caller needs a stable operation ID | dashed `create again?` arrow (≈ 26 s); dashed `48 v1 duplicate?` row (≈ 29 s); `needs a stable operation ID` (≈ 34 s); hold and fade |

**Public (28 s).** `CALLER waiting`, `TICKET SERVICE`, `DATABASE no ticket`; a `CREATE` chip goes down; a `TICKET 47` chip reaches the database (`ticket 47`); no reply is drawn; the caller turns red `timed out` (≈ 14 s); captions per beat, ending "Another create could add a duplicate. The caller needs a stable operation ID."

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3 | Candidate shows the reply being sent and lost, the timeout running out, and the caller's `outcome unknown` beside a database that already holds `47 v1`. Public never draws the reply, so "lost" is only in the caption, and the duplicate risk is caption-only. |
| accuracy | 5 | 4 | Candidate keeps the caller amber (`outcome unknown`), marks `timeout ≠ no effect`, and draws the duplicate as dashed and hypothetical. Public colours the timed-out caller red, which implies failure rather than uncertainty. |
| pacing | 4.5 | 3 | Events 0.6–1.4 s apart; the timeout bar visibly runs ≈ 4 s after the loss; ≈ 9 s final hold. Public holds 7 s caption blocks with little motion. |
| legibility at 350 px | 4 | 3.5 | Card text and lifeline headers read clearly; the diagram's message labels (`save 47`, `ticket 47`, `reply lost`, `create again?`) are small (≈ 25–31 px glyph bands at 1080, ≈ 8–10 px at 350) but legible at native size. Public box text is small. |
| meaningful variety | 5 | 2 | A sequence diagram suits a lost message and a timeout and differs from lesson 01's nested panel. Public reuses three stacked boxes with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −3.2 dB at the request reaching the service (8.9 s), below −0.5 dB | −10.4 dB |
| sound on visible events | onsets for the intro (1.2–3.0 s), the request (4.6–9.6 s), the save and reply (12.8–15.4 s), timeout ticks and expiry (16.5–19.8 s), `outcome unknown` and `timeout ≠ no effect` (21.6–23.2 s), the duplicate (29.0–30.8 s, quiet) and the closing note (34.2 s) | sparse |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | ≈ 23–29 s is a hold on `outcome unknown`; otherwise none | caption blocks |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Enlarge the diagram's message labels.** `save 47`, `ticket 47`, `reply lost` and `create again?` are the smallest text (≈ 8–10 px at 350); they carry the story and would benefit from 40 px type.
2. **Rebalance the loudest cue.** The request arriving at the service (8.9 s, −3.2 dB) is louder than the save and the lost reply; the save or the loss is the event that matters.
3. **Raise the duplicate cue.** The dashed `48 v1 duplicate?` row arrives with a very quiet cue (≈ −19 to −23 dB at 29–31 s); a slightly louder warning tone would mark the risk.

## Scratch evidence

`video/idempotency/motion-v2/reviews/scratch/02/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, a full-resolution frame, and the candidate spectrogram.

