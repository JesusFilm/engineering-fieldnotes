# Observability and tracing lesson 01 — One operation is a span: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/observability-and-tracing/sequence/lessons.json` item 1. This reviewer wrote an earlier planning document for this lesson; that context is acknowledged. The candidate takes a different approach from that plan (a before/after pair of calls with an instrumentation toggle), and it is judged against the lesson, not plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/observability-and-tracing/motion-v2/01/video.mp4` | `72c335286ef9aced6d3b29bed0c49a826266a582a8c8b9e2f8e2fa9d0a642b33` | 40.0 s | h264 1080×1920, 30 fps, 1200 frames | aac |
| public `public/lessons/observability-and-tracing/01.mp4` | `d53b9a759c9bd65331add09a03645bff7dc14b6b4cdd61911b0c61614b7708a4` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/01/hash-before.txt`) and after (`scratch/01/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It teaches the span as a record that exists only because instrumentation made it: call 1 runs with `instrumentation OFF` and `recorded spans` stays `0`; call 2 runs with it `ON`, and a `run_tests` span opens with the call, grows on a time axis while the tool works, closes when the result returns, and only then fills `duration 2.4 s` and `outcome returned`. That covers the intro (start, duration, attributes), every lesson beat except the forward reference to traces, and the takeaway about missing instrumentation. The public cut is readable and accurate but carries the lesson in captions over three generic boxes and does not show the missing-instrumentation takeaway. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/01/cand350/`, `pub350/`), tiled (`c1–c4.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 2.5, 8.6, 9.6, 10.3, 13.5, 16.6, 20.5, 21.6, 22.4, 23.2, 27.6, 29.0, 30.6, 32.4, 33.0 and 34.2 s (`t350/`, `t350_a.png`, `t350_b.png`); 23.2 s viewed alone at native size.
- Full-resolution seek frames at 4, 10, 17, 23.5, 26, 31 and 35 s (`full/`); text bands measured on the 26 s frame.
- Bar end checked against the axis at full resolution: tick 0 at x ≈ 160, tick 3 s at x ≈ 920, bar end at x ≈ 768, which is 2.4 s.
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (40 s).** Top: `call 1` / `call 2` tags, `caller` and `test tool` boxes joined by a dotted call line, and an `instrumentation` toggle linked to the caller. Bottom: a `recorded spans` panel with a count, a span row on a 0–3 s axis, and a record card (`start`, `duration`, `outcome`, `tool`).

| time | beat | evidence |
|---|---|---|
| 0–12 s | an operation takes time; without instrumentation nothing is recorded | `call 1`, toggle `OFF`; `run_tests` chip to the tool (≈ 2.5 s); tool `running` with a spinner; `result` returns (≈ 8.6 s); caller `got result`; `recorded spans 0` pulses (≈ 10 s, low sound); `call 1` tag becomes dashed |
| 13–16.5 s | switch instrumentation on | `call 2` tag; toggle `ON` (≈ 13.5 s) |
| 16.5–22.7 s | instrumentation records the start; the tool works | span row `run_tests` appears `open` with a start tick as the call leaves; count `1`; record `start 09:14:02.0`, `tool test-tool`, `duration …`, `outcome …`; the bar grows in orange while the tool shows `running` |
| 22.7–28 s | the operation ends and the span closes | tool `done`; `result` returns; bar turns green and `closed` with an end tick at 2.4 s (≈ 23 s, loudest sound −5.8 dB); then `duration 2.4 s` and `outcome returned` fill (≈ 24–25 s) |
| 28–34 s | this span describes one operation | record rows pulse in turn (`start`, `duration`, `outcome`, `tool`); `call 1` tag re-highlighted with a low sound (≈ 32.8 s); `call 2`, the bar and the card pulse together (≈ 34 s) |
| 34–40 s | hold and fade | final state held, then fade to an empty stage under the title |

**Public (28 s).** Three boxes (CALLER, TEST TOOL, SPAN RECORD) with two-line captions per 7 s beat. A `RUN TESTS` chip, a `START` chip, a progress bar under the tool (7–14 s), an `END` chip and the record changing to `2.4s; exit 0` (≈ 16 s). Nothing changes from 17 to 28 s; "several related spans can form a trace" is a caption only.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 4.5 | 3 | Candidate's paired calls show that the span comes from instrumentation (`0` vs `1` recorded spans for the same work) and that duration and outcome are known only at close. Public shows a start and end chip and a final record, but nothing distinguishes recorded from unrecorded work. |
| accuracy | 4.5 | 4 | Candidate's span opens when the call leaves and closes when the result returns, consistent with instrumentation on the caller (the toggle is linked to the caller); duration is 2.4 s on the axis and in the record; outcome is `returned`, which avoids implying the tests passed. The toggle simplifies instrumentation into a runtime switch. Public's `exit 0` is reasonable but the record appears whole at the end. |
| pacing | 4 | 2.5 | Candidate events 0.9–1.4 s apart with a ≈ 3.5 s hold after the close and a ≈ 6 s final hold. Public has an 11 s static tail. |
| legibility at 350 px | 5 | 4.5 | Candidate text is large (record rows ≈ 40 px type at 1080, labels larger) and every inspected native frame reads cleanly. Public text is readable but smaller relative to the frame. |
| meaningful variety | 4.5 | 1.5 | Candidate uses a span timeline and record card suited to a timed operation, distinct from the request-flow views of other chapters. Public is the generic three-box layout with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −5.8 dB (below −0.5 dB) | −10.6 dB |
| loudest event | span close and result return at ≈ 22.7 s | n/a |
| sound on visible events | onsets 2.3–9.2 s (call 1 send, run, result), 10.0 s (`0` spans), 12.0–13.2 s (call 2 tag, toggle), 15.5–21.8 s (call 2 send, span open, work ticks), 22.7–24.5 s (close, record rows), 28.0–30.8 s (row pulses), 32.8 s (`call 1` reminder), 34.0 s (final pairing) | six onsets |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none | 17–28 s static |
| ending | finite, hold then fade | ends on caption frame |

## Investigated items (not defects)

- **Span closes ≈ 0.8 s after the tool shows `done`** (22.4 s still `open`, 23.2 s `closed`). Seek frames confirm the close coincides with the `result` reaching the caller. With instrumentation on the caller side (the toggle's dotted link goes to the caller, and the span opened when the call left), closing on return is correct for a span covering the call.
- **`duration …` and `outcome …` while `closed`** at 23.2 s. They fill within about 1.5 s; the order (close, then record values) is deliberate and consistent with values being known at close.

## Optional improvements (not blockers)

1. **Match the on-screen title to the lesson.** The video reads "One operation is one span"; the lesson is "One operation is a span".
2. **Clarify what the toggle stands for.** Instrumentation is code or configuration around an operation; a one-word cue such as `instrumented call` or showing the toggle as part of the caller's code would avoid implying a live runtime switch.
3. **Say which side the span measures.** A small `caller` marker on the span row would make clear the 2.4 s covers the call from send to return, including transit.
4. **Optional forward reference.** The lesson's last beat mentions that related spans can form a trace; a faint second empty row would hint at this, though leaving it to lesson 02 is also defensible.

## Scratch evidence

`video/observability-and-tracing/motion-v2/reviews/scratch/01/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, full-resolution seek frames, and the candidate spectrogram.

