# Queues and backpressure lesson 01 — Submit a job: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/queues-and-backpressure/sequence/lessons.json` item 1. This reviewer wrote an earlier planning document for this lesson, and the candidate's structure (producer, queue and worker with a moving job ticket, and a `job A record` whose rows light per event while `complete` stays unset) closely resembles it, though its layout is a vertical stack rather than a horizontal pipeline; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/queues-and-backpressure/motion-v2/01/video.mp4` | `f89b0b0c46e05a801958f3b132243b2bd13aa0b8a0f57dd7fef92e26604a3064` | 35.6 s | h264 1080×1920, 30 fps, 1068 frames | aac |
| public `public/lessons/queues-and-backpressure/01.mp4` | `b0ff78411d8330c661fd9dd4d61015aeaac83e13e2aad042f037edcd8443adbd` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/01/hash-before.txt`) and after (`scratch/01/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It separates the events the lesson distinguishes: `job A: check docs` is created at the producer (`created ✓`), enters the queue (`waiting 1`) and the producer reads `submit: accepted` while the worker is still `idle` (`accepted ✓`); the worker then takes it (`has job A`, queue `empty`, `waiting 0`) and starts `running` with a slow progress line (`running in progress`); the record's `complete` row ends highlighted as `not yet`. The public cut is accurate and clear in its captions but shows the same events as text changes in three boxes, with no record separating accepted from complete. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/01/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 11.6, 19.4, 24.4 and 28.6 s (`t350/`, `t350_a.png`), viewed at native size.
- Frame-number select of frames 330–400 every 10 frames (11.0–13.3 s) to confirm the order of the producer's `accepted` and the record's `accepted ✓` (`full/`, `sel_accept.png`).
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (35.6 s).** Title `Submit a job`, subtitle `QUEUES · LESSON 1`. Stacked `Producer` (with `submit:` status), `Queue` (a lane with `waiting N`), `Worker` (state, a job slot and a progress line) and a `job A record` (`created`, `accepted`, `running`, `complete`).

| time | beat | evidence |
|---|---|---|
| 0–8 s | a producer creates a job; a queue holds it until a worker is ready | `job A: check docs` appears in the producer; record `created ✓`; queue `empty`, `waiting 0`; worker `idle`; queue and worker pulse in turn |
| 8–16 s | job A enters the queue; it has been accepted | producer `submit: sending…`; the job moves into the queue lane; `waiting 1`; producer `submit: accepted` (≈ 10.6 s); record `accepted ✓` (≈ 11.6–12 s); worker still `idle`; `running` and `complete` still `—` |
| 16–21 s | a worker takes job A; it leaves the waiting queue | worker `ready`; the job moves to the worker (`has job A`); queue `empty`, `waiting 0` |
| 22–35.6 s | execution happens at the worker; accepted is different from complete | worker `running` (amber) with a slowly advancing progress line; record `running in progress`; `complete not yet` highlighted (≈ 26 s); producer still `submit: accepted`; hold and fade with the work unfinished |

**Public (28 s).** `PRODUCER`, `QUEUE` and `WORKER` boxes stacked; a `JOB A` chip moves into the queue (`A waiting`), then to the worker (`A running`) with a progress line; captions per beat ("Job A enters the queue. The job has been accepted.", "Execution happens at the worker. Accepted is different from complete.").

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3.5 | Candidate puts the producer's `submit: accepted` beside a queue holding the job and an `idle` worker, and keeps a record whose `complete` row reads `not yet` while the job runs. Public shows the job moving and states the accepted/complete distinction in a caption. |
| accuracy | 5 | 4.5 | Candidate's order is correct (created → accepted while waiting → taken → running) and it ends without completion. Public is accurate; its `QUEUE` box turns green `empty` when the worker takes A, which can read as a success state. |
| pacing | 4.5 | 3.5 | Events about 0.8–1.5 s apart; holds after acceptance and after the take; ≈ 8 s of running with work ticks before the fade. Public holds 7 s caption blocks. |
| legibility at 350 px | 4.5 | 3.5 | Card titles, `submit: accepted`, `waiting N`, worker state, job label and record rows read at native 350; the `QUEUES · LESSON 1` subtitle and the record's dim `—` marks are the smallest elements. Public box text is small. |
| meaningful variety | 4.5 | 2 | A job record alongside the job's location suits a lesson about separate states and opens the chapter distinctly. Public is three stacked boxes with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −6.9 dB (below −0.5 dB) | −9.3 dB |
| loudest events | job enters queue and `accepted` (8.7–10.6 s), job reaches worker (18.4 s) | n/a |
| sound on visible events | onsets for creation (1.0–5.1 s), submission and acceptance (7.5–11.6 s), the take (16.0–18.4 s), running and record (22.0–22.8 s), then regular work ticks (24–32 s); no completion cue | sparse |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none; the progress line and ticks continue during the final stretch | caption blocks |
| ending | finite fade with the job still running | ends on caption frame |

## Investigated item (not a defect)

- **Producer shows `accepted` about 1 s before the record's `accepted ✓`.** Accurate seeks and frame selection (frames 330–400) agree: `submit: accepted` at ≈ 10.6 s, the record row outlined and ticked by ≈ 12 s. Both happen while the job waits in the queue and the worker is idle, so the order supports the lesson.

## Optional improvements (not blockers)

1. **Brighten the record's unset marks.** `running —` and `complete —` are dim before they change; slightly brighter dashes would make "not yet" visible from the start.
2. **Enlarge the subtitle.** `QUEUES · LESSON 1` is the smallest text at 350 px.
3. **Note in the write-up** that a broker's delivered-but-unacknowledged message can be redelivered, so "leaves the waiting queue" is not the same as "can never return".

## Scratch evidence

`video/queues-and-backpressure/motion-v2/reviews/scratch/01/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, the frame-number strip through acceptance, and the candidate spectrogram.

