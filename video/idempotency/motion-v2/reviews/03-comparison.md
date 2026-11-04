# Idempotency lesson 03 — Name the operation: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/idempotency/sequence/lessons.json` item 3. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (a caller that saves `key k7 · release v1` locally before sending, a service that checks k7, and a database where `tickets` and `operation keys` commit together inside a `transaction` frame) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/idempotency/motion-v2/03/video.mp4` | `d0de6a64dabeb982e0b18735cfdecb410d36a67413d46660f4c9f078599ce8b7` | 46.0 s | h264 1080×1920, 30 fps, 1380 frames | aac |
| public `public/lessons/idempotency/03.mp4` | `c226114470ccc4624b86d22d653edf12f1c36e76a486ea259a026ad91bff4817` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/03/hash-before.txt`) and after (`scratch/03/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It shows each part of the protected first attempt as state: the caller's row `key k7 · release v1` is `saved locally` while the caller still reads `not sent`; `create v1 · k7` travels to the service, which reads `checking k7` and finds `no row for k7` (`no record`); a dashed `transaction` frame opens, `47 release v1` and `k7 → ticket 47` appear pending, and both become solid together as the frame reads `committed`, with `unique` on the keys table. The `ticket 47` reply is then lost, the caller goes `timed out` → `outcome unknown`, and `k7 still names ticket 47` closes on the saved rows. The public cut is accurate but shows a `COMMIT` chip and a `k7 → ticket 47` label in one database box, without the ticket row, the check, or a visible atomic commit. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/03/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 22.0 and 38.0 s (`t350/`, `t350_a.png`), viewed at native size.
- Frame-number select of frames 620–680 every 4 frames (20.7–22.7 s), cropped to the database, to check whether the ticket row and key row commit in the same frame (`full/`, `sel_commit.png`).
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (46.0 s).** Title `Idempotency`, subtitle `NAME THE OPERATION`. A `Caller` card (state and a key row), `request` / `reply` lanes, a `Service` card (state), and a `Database` card with `tickets` and `operation keys · unique` tables that sit inside a `transaction` frame during the commit.

| time | beat | evidence |
|---|---|---|
| 0–8 s | new attempt: save key k7 before sending | caller `not sent`; key row fills `key` → `key k7 · release v1` → `saved locally` (≈ 2.8 s) while the request lane is empty |
| 8–16 s | send the key with the request; the service checks its records | caller `sending` → `waiting`; `create v1 · k7` chip down the request lane (≈ 8–10 s); service `checking k7`; keys table shows `no row for k7`; service `no record` |
| 16–25 s | the first attempt creates ticket 47; store ticket and key atomically | service `creating`; dashed amber `transaction open` frame; `47 release v1` pending (≈ 17 s), `k7 → ticket 47` pending (≈ 18 s); frame `committed` and both rows solid green together (≈ 21.4 s, loudest cue −2.3 dB); service `committed` |
| 26–36 s | suppose the reply is lost too; k7 still identifies the saved ticket | service `replied`; `ticket 47` fades in the reply lane with a grey × and `reply lost` (≈ 27 s); caller `timed out` → `outcome unknown` (≈ 31 s); `k7 still names ticket 47` (≈ 35 s) with the ticket and key rows highlighted |
| 36–46 s | hold and fade | final state; fade |

**Public (28 s).** `CALLER k7 + release v1`, `TICKET SERVICE`, `DATABASE no key record`; a `k7 + v1` chip goes down; a `COMMIT` chip goes to the database, which becomes `k7 → ticket 47`; captions per beat ("Store the ticket and key atomically", "Suppose this protected reply is lost too").

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3 | Candidate shows the key saved before sending, the check finding no record, both rows committing together, and the lost reply leaving the caller unsure while the key still names the ticket. Public shows a key arriving and a single database label change; the ticket row, the check and the lost reply are caption-only. |
| accuracy | 5 | 4 | Candidate's commit is atomic on screen (both rows switch in one frame), marks the keys table `unique`, and keeps the caller amber (`outcome unknown`). Public's `COMMIT` chip and one-line database state do not show that ticket and key are stored together. |
| pacing | 4.5 | 3 | Events 0.6–1.6 s apart; holds after the local save, after the commit, and after the lost reply; ≈ 9 s final hold. Public holds 7 s caption blocks. |
| legibility at 350 px | 4.5 | 3.5 | Card titles, states, the key row, table names and rows, `unique`, `reply lost` and the closing note read at native 350; `saved locally`, `unique` and the lane labels are the smallest text. Public box text is small. |
| meaningful variety | 4.5 | 2 | A transaction frame around two tables is new in this chapter and suits atomic storage. Public reuses three stacked boxes with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −2.3 dB at the commit (21.4 s), below −0.5 dB with limited headroom | −10.5 dB |
| loudest events | commit (21.4 s), `outcome unknown` (31.0 s, −4.6 dB), key saved (2.8 s, −5.6 dB) | n/a |
| sound on visible events | onsets for the key save (1.2–4.4 s), send and arrival (8.2–10.8 s), the k7 check (11.4 s, quiet), pending rows (16.0–18.4 s), commit (21.4 s), reply and loss (26.5–27.6 s), timeout and unknown (31.0 s), closing pulses (34.0–36.2 s) | sparse |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none | caption blocks |
| ending | finite, hold then fade | ends on caption frame |

## Investigated item (confirmed correct)

- **Atomic commit.** Frame-number selection of frames 620–680 shows both rows pending (amber, dashed) through ≈ frame 644 and both solid green from the next sampled frame, together with the frame label `committed`; no sampled frame shows one row committed and the other pending.

## Optional improvements (not blockers)

1. **Give the commit cue a little more headroom.** It peaks at −2.3 dB; within the limit but close.
2. **Make the empty-lookup cue audible.** The `no row for k7` check (≈ 11.4 s) peaks at about −24 dB, far below the other cues; the first-attempt check is part of the lesson.
3. **Enlarge `saved locally` and `unique`.** They carry two key ideas (key saved before sending, database-enforced uniqueness) but are the smallest text at 350 px.

## Scratch evidence

`video/idempotency/motion-v2/reviews/scratch/03/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, the frame-number strip through the commit, and the candidate spectrogram.

