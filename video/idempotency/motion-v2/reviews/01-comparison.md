# Idempotency lesson 01 — One intended operation: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/idempotency/sequence/lessons.json` item 1. This reviewer wrote an earlier planning document for this lesson; the candidate shares its idea (the saved ticket appears before the caller knows about it, with a `saved tickets` count and a closing "saved first, reported after") but uses its own nested layout, with the database inside the service panel and the caller's knowledge as a row in the caller card. That context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/idempotency/motion-v2/01/video.mp4` | `07327aaac9a81237d9265269e08bceafe52b0bcdd9a9575f46a679dfbf708010` | 43.4 s | h264 1080×1920, 30 fps, 1302 frames | aac |
| public `public/lessons/idempotency/01.mp4` | `e059559029002ec9afa8da783f56888aa8811d97adb9c6647b1d773182774a0a` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/01/hash-before.txt`) and after (`scratch/01/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It separates the effect from its report: the caller `wants 1 ticket for release v1` and `knows nothing yet`; `create v1` reaches the `Ticket service` (`working`, `create ticket · v1`); `insert 47` writes `47 v1` into `Database · tickets` and `saved tickets: 1`, while the caller still shows `waiting` and `knows nothing yet` under the note `saved · caller not told yet`. Only when the `ticket 47` response lands does the caller's row become `knows ticket 47`, and the cut ends on `saved first · reported after`. The public cut is accurate but shows the same sequence as status changes in three boxes with captions, without the "saved but not yet known" moment. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/01/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 18.4, 26.0 and 34.0 s (`t350/`, `t350_a.png`), viewed at native size.
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (43.4 s).** Title `Idempotency`, subtitle `ONE INTENDED OPERATION`. A `Caller` card (`wants`, `knows`, state), `request` and `response` lanes, and a dashed `Ticket service` panel containing the operation line and a `Database · tickets` table with `saved tickets: N`.

| time | beat | evidence |
|---|---|---|
| 0–8 s | the caller wants one release ticket; the service must save that effect | caller `wants 1 ticket for release v1`, `knows nothing yet`; empty ticket table; `saved tickets: 0`; the `knows` row and empty table row are highlighted in turn |
| 8–14 s | the create request reaches the service; the service begins | caller `waiting`; `create v1` travels down the request lane; service `working`, `create ticket · v1` |
| 14–24 s | the service saves ticket 47; the database records the effect | `insert 47` (≈ 14.5–15.7 s); row `47 v1`, service `saved` (loudest cue, −4.5 dB at 15.7 s); `saved tickets: 1`; `saved · caller not told yet` while the caller still reads `waiting` / `knows nothing yet` (≈ 17–24 s) |
| 24–31 s | a response reports ticket 47; this normal attempt succeeds | service `replied`; `ticket 47` travels up the response lane; caller `got reply`, `knows ticket 47` (≈ 26 s), then the caller card turns green |
| 31–43.4 s | the report points to the effect | caller row and database row highlighted together; `saved first · reported after`; hold and fade |

**Public (28 s).** `CALLER`, `TICKET SERVICE` and `DATABASE no ticket` stacked; a `CREATE` chip goes down; a `TICKET 47` chip goes to the database, which becomes `ticket 47`; another `TICKET 47` chip returns and the caller shows `ticket 47`; captions per beat.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3.5 | Candidate holds a visible stretch where the effect exists and the caller does not know it (`saved · caller not told yet`), which is the lesson's distinction. Public shows the database and then the caller updating, with the distinction in captions. |
| accuracy | 5 | 4.5 | Candidate counts one saved ticket, reports after commit, and avoids keys, retries and the word "success" for the network alone. Public is accurate; it reuses the label `TICKET 47` for both the write and the reply, which blurs effect and report. |
| pacing | 4.5 | 3 | Events 0.7–1.5 s apart; ≈ 7 s hold in the saved-but-unreported state; ≈ 9 s final hold, slightly long. Public holds 7 s caption blocks. |
| legibility at 350 px | 4.5 | 3.5 | Caller rows, states, lane labels, the operation line, table rows, `saved tickets` and the notes read at native 350; `request` / `response` lane labels are the smallest text. Public box text is small. |
| meaningful variety | 4.5 | 2 | A caller's knowledge row set against a database table suits "effect versus report" and opens the chapter with the objects later lessons need. Public reuses three stacked boxes with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −4.5 dB at the database write (15.7 s), below −0.5 dB | −10.2 dB |
| loudest events | ticket saved (15.7 s), response received (26.0 s, −6.5 dB) | n/a |
| sound on visible events | onsets for the intro highlights (1.2–4.8 s), the request and work (7.9–11.8 s), the insert and count (14.5–17.8 s), the response (24.5–26.0 s), the final pairing (32.5–35.0 s) | sparse |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | ≈ 17.8–24.5 s is a deliberate hold on the saved-but-unreported state | caption blocks |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Settle the caller's state colour with the reply.** At ≈ 26 s the caller reads `got reply` with an amber dot and amber row before turning green ≈ 1 s later; switching together would avoid a brief mixed state.
2. **Enlarge the `request` / `response` lane labels.** They are the smallest text at 350 px.
3. **Shorten the final hold** (≈ 35–43 s) to about 6 s before the fade.

## Scratch evidence

`video/idempotency/motion-v2/reviews/scratch/01/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, and the candidate spectrogram.

