# Observability and tracing lesson 04 — Visibility is not a speedup: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/observability-and-tracing/sequence/lessons.json` item 4. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (two stacked trace waterfalls on one scale, a separate-trace box in run 1, a `?` gap, a 3.0 s guide) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/observability-and-tracing/motion-v2/04/video.mp4` | `ee5650aae56ed4f9cd7b15c3e75efa87c10c7b1b6ddef7c7abccdb7a693ed9b0` | 43.0 s | h264 1080×1920, 30 fps, 1290 frames | aac |
| public `public/lessons/observability-and-tracing/04.mp4` | `dfbe143ea88d10870093ed8d483595b2f32576b5a669768c6b039d734eb0007e` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/04/hash-before.txt`) and after (`scratch/04/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It shows the lesson as measurable geometry on one time scale: in `run 1 · no context sent` the `agent task` bar runs to `3.0 s`, `model call` takes `0.6 s`, and the `2.4 s` tool bar sits only in a separate `trace 91d0` box while a dashed `?` row marks the unexplained part of the agent's time; in `run 2 · context sent` the same `2.4 s` bar grows under the agent task, `no separate trace` appears, and a 3.0 s guide shows both runs end in the same place. The public cut is accurate but states the numbers in box text and captions over a generic layout. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/04/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 8.0, 12.6, 14.4, 22.6, 28.6, 31.6, 33.3 and 35.0 s (`t350/`, `t350_a.png`, `t350_b.png`).
- Bar geometry measured at full resolution on two independent extractions of the final state (accurate seek at 38.0 s and frame-number select of frame 1140); both agree (`full/`).
- Text height measured at full resolution (row labels ≈ 31 px glyph height, panel header ≈ 28 px).
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## Geometry check (full resolution, both extractions)

| element | x span | width | implied duration (≈ 196 px/s) |
|---|---|---|---|
| model call (run 2; run 1 identical) | 360–477 | 117 px | 0.6 s |
| run 2 agent task | 360–949 | 589 px | 3.0 s |
| run 2 tool call | 478–949 | 471 px | 2.4 s, starting where the model call ends |
| run 1 tool call (separate trace, own zero) | 360–829 | 469 px | 2.4 s |

The two tool bars match within 2 px (edge anti-aliasing), and both agent bars end at the same x (confirmed visually against the dotted 3.0 s guide at 33.3 s). The run 1 tool bar starts at its own trace's zero, which is correct for a separate trace.

## What each cut shows

**Candidate (43 s).** Two panels on a shared 0–3 s axis.

| time | beat | evidence |
|---|---|---|
| 0–10 s | two sequential calls: 0.6 + 2.4 = 3.0 s | `run 1 · no context sent`, `trace 7c1e`; `agent task` and `model call` grow; `model call` stops at `0.6 s`; a separate box `trace 91d0` appears and `tool call` grows there to `2.4 s` with work ticks; `agent task` closes at `3.0 s`; the three durations pulse |
| 11–19 s | without linkage the tool looks separate | a dashed `?` row appears under the agent task across 0.6–3.0 s (≈ 12 s); the agent bar's unexplained portion turns grey; the separate trace box is highlighted |
| 19–28 s | next run: propagate context; export links the same 2.4 s span | `run 2 · context sent`, `trace 4bf9`; agent and model bars grow; `tool call` row appears under the agent task with a parent stub and grows from 0.6 s to 3.0 s (loudest cue at 22.2 s); totals `3.0 s`, `2.4 s`; `no separate trace` |
| 31–36 s | the run still takes 3.0 s | the two `3.0 s` agent bars pulse with a dotted guide at 3.0 s through both panels (two identical cues at 31.5 and 31.85 s); the two `2.4 s` tool bars pulse (identical cues at 33.2 and 33.55 s); run 1's `?` row is outlined |
| 36–43 s | hold and fade | final state, then fade to the title |

**Public (28 s).** Four boxes (AGENT `3.0s total`, MODEL `0.6s`, REMOTE TOOL `2.4s`, TRACE VIEW) with captions. TRACE VIEW turns red `tool disconnected` (7 s), `CONTEXT` and `TOOL SPAN` chips move, TRACE VIEW becomes `linked tool: 2.4s` (≈ 19 s) and AGENT becomes `still 3.0s` (≈ 21 s). Durations are text in boxes; no lengths can be compared.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3 | Candidate makes the attribution gap visible (`?` row under 2.4 s of the agent bar beside a separate `trace 91d0`) and then filled by the same-length bar; equal lengths prove "not faster" without argument. Public asserts `tool disconnected` and `still 3.0s` in text. |
| accuracy | 4.5 | 4 | Durations are exact on the shared scale; sequential calls add up; the separate trace uses its own zero; the run 1 tool span is present but in another trace, so no claim about missing spans. Identical totals across runs are an idealisation the write-up should note. Public is accurate but abstract. |
| pacing | 4.5 | 2.5 | Both runs play at the same rate (≈ 2 s of video per run second), so their lengths compare; holds of ≈ 3–5 s after run 1, after the gap and after run 2; ≈ 6 s final hold. Public has 5–7 s static stretches. |
| legibility at 350 px | 4 | 4 | Candidate labels, durations and trace IDs read at native 350 (≈ 36–40 px type); axis ticks and `no separate trace` are dim grey and the smallest elements. Public text is readable. |
| meaningful variety | 4.5 | 1.5 | Two aligned waterfalls suit a "same work, different visibility" comparison and differ from lessons 01–03. Public reuses the generic box layout. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −8.0 dB (below −0.5 dB) | −10.5 dB |
| loudest event | tool span joining run 2's trace at 22.2 s | n/a |
| sound on visible events | onsets 1.5–9.6 s (run 1 bars, work ticks, closes, recap), 12.0–14.2 s (gap, separate trace), 19.5–27.95 s (run 2), 31.5–35.5 s (paired comparison cues) | seven onsets |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none | 5–7 s static stretches |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Make the gap cue audible.** The sound when the `?` row appears (≈ 12 s) peaks at −23.6 dB, far below the other cues (≈ −8 to −14 dB); the moment the viewer should notice unexplained time is nearly silent.
2. **Brighten the axis ticks and `no separate trace`.** They are the dimmest text and the first to blur on a phone.
3. **Note the idealised equal totals.** Real repeated runs vary; the write-up should say the identical 3.0 s totals isolate the point that propagation does not shorten the work.
4. **Note the separate trace's own zero.** The run 1 tool bar starts at its trace's 0; the write-up should say that lining separate traces up by wall-clock time takes extra work in a real viewer.

## Scratch evidence

`video/observability-and-tracing/motion-v2/reviews/scratch/04/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, full-resolution seek and select frames, and the candidate spectrogram.

