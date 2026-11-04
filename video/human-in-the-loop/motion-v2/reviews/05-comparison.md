# Human-in-the-loop lesson 05 — Record the outcome: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/human-in-the-loop/sequence/lessons.json` item 5. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (a sequence diagram) resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than against plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/human-in-the-loop/motion-v2/05/video.mp4` | `d453b4bf77bd822f973f3b20894b36fd05b9d15f6c8f7482fe1d162c7dcaca35` | 42.0 s | h264 1080×1920, 30 fps, 1260 frames | aac |
| public `public/lessons/human-in-the-loop/05.mp4` | `5c8a99ff1fbbc049e6998333ea68ec752a7f8ef67884ac7a3e1ad18bd31f64be` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/05/hash-before.txt`) and after (`scratch/05/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It turns the lesson's warning that "a restart must not blindly repeat effects" into a visible event: the executor crashes before the `applied` reply arrives, retries with the same key `k7`, and the deploy API answers `already done` while production's `effects 1` never changes. It then records the observed result tied to A and separates the approval fact from the observed facts. The public cut is a valid, readable alternative but carries the lesson in captions over three generic boxes, and its restart beat shows only a progress bar filling. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/05/cand350/`, `pub350/`), tiled (`c1–c4.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 3.6, 8.5, 10.4, 11.6, 13.2, 15.6, 17.4, 19.4, 22.4, 24.4, 27.6, 32.6, 34.6, 35.6, 39.5 and 41.5 s (`t350/`, `t350_a–c.png`); 17.4 s also viewed alone at native size.
- Full-resolution frames by accurate seek (11.6, 17.4, 24.0, 30.0, 36.0 s) and a full-resolution crop of the diagram at 17.4 s (`full/`); frame-number select of frames 318–354 every 6 frames through the lost response and crash (`sel_crash.png`).
- Text extent measured at full resolution: the executor state block spans y 560–699 and the first arrow label 46 px of rows (≈ 40 px type).
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (42 s).** A sequence diagram: three lifelines (`executor`, `deploy API`, `production`) with live state under each header, messages drawn as arrows down the stage, and an `OUTCOME · A` record below. A line `new run · release A approved` marks the separate run.

| time | beat | evidence |
|---|---|---|
| 0–8 s | separate run: approved and permitted | `approved A ✓`, `may deploy ✓`, `key k7` appear under the executor; API `keys —`; production `run prev · effects 0`; record shows `target checkout · production`, `approved R1`, `effects —`, `observed unknown`, status `unknown` |
| 8–12.5 s | perform the operation | `deploy A · k7` arrow to the API, which shows `seen k7`; `apply A` arrow to production, which shows `run A · effects 1`; an `applied` reply travels left (frames 318–354) |
| 12–21 s | restart without repeating the effect | executor header turns red with a red × on its lifeline (loudest sound, 12.0 s, −1.6 dB); `applied` is struck through and its line stops short of the executor; `restart`; a second `deploy A · k7` (accent) reaches the API; `already done` returns; no arrow goes to production; `effects 1` pulses unchanged |
| 21–30 s | record the observed result | `health?` probe to production and `ok · A` reply; record rows fill: `effects 1 · key k7`, `observed ok · A running`; status `recorded` |
| 32–36 s | approval and execution differ | `approved A ✓` and the record's `approved R1` highlight together (≈ 32.6 s); production `effects 1`, the `ok · A` label and the `observed` row highlight together (≈ 34.6 s); the lost `applied` pulses (≈ 35.6 s) |
| 36–42 s | hold and fade | final state held, then fade to an empty stage under the title |

**Public (28 s).** Three boxes (APPROVED ACTION artifact A, EXECUTOR, OUTCOME RECORD) with two-line captions per 7 s beat. Motion: an `APPROVED A` chip drops to the executor (≈ 1–2 s); a progress bar fills under `EXECUTOR executing` (7–14 s); an `A: SUCCESS` chip drops to the record, which becomes `A: deployed` (≈ 15–16 s). Nothing changes from 16 to 28 s. No restart, duplicate or observation is shown; five sound onsets.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 2 | Candidate shows why a blind repeat is dangerous (the effect happened but the reply was lost, 10.4–12 s) and how the key prevents it (`already done`, no second `apply A`, 17–20 s). Public states this only in a caption while a bar fills. |
| accuracy | 4.5 | 3 | Candidate keeps one effect, ties the record to A, target and reviewer, and records observation separately from approval. The record omits A's digest (identity carried by the header `OUTCOME · A`). Public's `A: SUCCESS` is asserted with no observation, which blurs the lesson's point that approval and successful execution differ. |
| pacing | 4.5 | 2 | Candidate events about 0.8–1.6 s apart with 3.4–3.7 s holds after beats and a ≈ 6 s final hold. Public has a 12 s static tail. |
| legibility at 350 px | 4.5 | 4.5 | Candidate diagram text measures ≈ 40 px at 1080 and reads clearly at native 350; no overlap or clipping found. Public text is also readable. |
| meaningful variety | 4.5 | 1 | A sequence diagram suits request, lost reply and retry, and differs from the dashboards of the lesson 03 and 04 candidates. Public is the generic three-box pattern with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −1.6 dB (below −0.5 dB; the crash) | −10.6 dB |
| loudest event | executor crash at 12.0 s | n/a |
| sound on visible events | onsets 0.5–4.6 s (checks, key), 8.0–10.4 s (request, apply, reply), 12.0 s (crash), 13.9–20.4 s (restart, retry, `already done`, unchanged effect), 24.0–28.3 s (probe, reply, record rows), 32.0 and 33.6 s (final pairings) | five onsets |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none; quiet stretches are holds after beats | 16–28 s static |
| ending | finite, hold then fade | ends on caption frame |

## Investigated items (not defects)

- **Red × and struck `applied` remain after the restart.** Confirmed by seek frames at 17.4–41.5 s. After the restart they are dimmed and stay as diagram history, which is how a sequence diagram records a lost reply; the executor header itself returns to normal. Not a fault.
- **Record shows `effects —` while production already shows `effects 1`** (≈ 10–27 s). Deliberate: the record fills only after observation (`effects 1 · key k7` at ≈ 27.6 s). Consistent with "record the observed execution result".
- **Crash timing.** Frame-number selection (frames 318–354) and accurate seeks agree: the `applied` reply is in flight at 10.6–11.8 s and the crash follows at ≈ 12 s.

## Optional improvements (not blockers)

1. **Add A's identity to the record** (for example `artifact A · 9f3a…`). The header `OUTCOME · A` ties the record to A, but the concept's exercise asks the log to identify reviewer, artifact and target; a digest row would make the artifact binding explicit.
2. **Give the final `applied` pulse (≈ 35.6 s) a quiet sound or remove the pulse.** It is the only highlight without a matching onset.
3. **Name the key once for beginners.** `key k7` / `seen k7` works by repetition; a one-word cue such as `request key k7` would help viewers who do not know idempotency keys.
4. **Audio headroom.** The crash peaks at −1.6 dB, within the limit; a little more headroom would be safer if the mix changes.

## Scratch evidence

`video/human-in-the-loop/motion-v2/reviews/scratch/05/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, full-resolution seek frames and crop, the frame-number crash strip, and the candidate spectrogram.

