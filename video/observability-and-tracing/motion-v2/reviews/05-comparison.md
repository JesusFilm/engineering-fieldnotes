# Observability and tracing lesson 05 — Missing and sensitive data: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/observability-and-tracing/sequence/lessons.json` item 5. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (runtime, export path and trace view bands; span A left and span B right; an allowlist policy; `export failed` on B's path) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/observability-and-tracing/motion-v2/05/video.mp4` | `b995ddd95389376d647f78dc8eb8fbd52c5152d86d927b0126647ef0b828f7ff` | 42.0 s | h264 1080×1920, 30 fps, 1260 frames | aac |
| public `public/lessons/observability-and-tracing/05.mp4` | `1b870595c9d7b384e3e306de453830696dcba86ea682c0eba77067342cbeb335` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/05/hash-before.txt`) and after (`scratch/05/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It shows both halves of the lesson as state on a single collection path: span A's red `token FAKE-9f2c` row is removed under an `attribute policy · keep: name, status` while span A itself is exported and appears in the trace view with `name` and `status`; span B, which also `ran ✓`, stops at `export failed` and the view stays at `1 span`; a dashed line from B's `ran ✓` to the failure makes "absence is not proof of absence" visible. The public cut is a valid alternative but uses generic boxes whose text changes to `A kept; token removed` and `A present; B missing` under captions. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/05/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 9.6, 10.4, 10.9, 11.6, 12.6, 13.4, 21.4, 22.4, 30.4 and 34.0 s (`t350/`, `t350_a.png`, `t350_b.png`).
- Frame-number select of frames 300–348 every 8 frames (10.0–11.6 s) to confirm the order of the token removal (`full/`, `sel_token.png`).
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (42 s).** Three bands: `runtime` (operation boxes `A · run_tests` and `B · report` with local `span A` / `span B` records), `export path` (`attribute policy` with `keep: name, status`, then `exporter`), and `trace view` with a span count.

| time | beat | evidence |
|---|---|---|
| 0–9 s | runtime operations produce tracing data; not every detail should be recorded | A and B go `idle` → `running` → `ran ✓`; span A records `name run_tests`, `status ok`, `token FAKE-9f2c` (orange); span B records `name report`, `status ok`; the token row is highlighted (≈ 7.4 s); `trace view · 0 spans` |
| 10–17 s | remove the secret attribute from span A; keep the span in the export | the policy glows (≈ 10.3 s) and the token row is outlined and fades from span A (gone by ≈ 11.3 s); span A's remaining rows pulse; a `span A` chip passes the policy and exporter (≈ 12.6–14.6 s) and `span A` appears in the view with `name run_tests`, `status ok`; count `1 span` |
| 20–25 s | separately, span B fails to export | a `span B` chip passes the policy and reaches the exporter; B's column below the exporter shows a red × and `export failed` (loudest event, 22.65 s, −3.5 dB); B's path turns red; count stays `1 span` |
| 29–36 s | use traces with their collection limits; absence is not proof of absence | `B · report · ran ✓` pulses; a dashed line runs from B's box down the right edge to the failure; span B's local rows pulse; the view's span A rows pulse |
| 36–42 s | hold and fade | final state, then fade to the title |

**Public (28 s).** Three boxes (RUNTIME, TRACE EXPORT, TRACE VIEW) with captions. A `SPAN A` chip moves down; TRACE EXPORT becomes `A kept; token removed`; another chip moves on; TRACE VIEW becomes `A present; B missing`. No attribute, token, failure or span B is shown as an object.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 4.5 | 2.5 | Candidate shows a specific row removed while the span survives, a specific span stopped at a specific step, and what ran versus what arrived side by side. Public reduces each to a status phrase. |
| accuracy | 4.5 | 4 | The secret is visibly fake; the policy is an allowlist (matching the concept's "approved metadata"); the span is kept; B's absence is attributed to an export failure, not to non-execution. The token is removed from the local record before the chip enters the export path, which is consistent with a processor acting before export but leaves the chip's later pass through the policy without visible effect. Sampling and missing instrumentation are not shown (write-up material). Public is accurate but abstract. |
| pacing | 4.5 | 2.5 | Events about 0.6–1 s apart with holds of ≈ 4 s after A arrives and ≈ 5 s after B fails, then a ≈ 6 s final hold. Public has 5–7 s static stretches. |
| legibility at 350 px | 4.5 | 4 | Card rows, policy text, `export failed` and the span count read at native 350; the token value is clear in orange. Public text is readable but small inside boxes. |
| meaningful variety | 4.5 | 1.5 | A banded collection path with per-column attrition suits "what was collected versus what happened" and differs from lessons 01–04. Public reuses the three-box layout. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −3.5 dB (below −0.5 dB) | −10.5 dB |
| loudest event | export failure at 22.65 s | n/a |
| sound on visible events | onsets 1.4–6.4 s (operations, span rows), 7.4 s (token flagged, quiet), 10.2–10.9 s (policy, removal), 11.9–16.6 s (span A through export into view), 21.0–24.6 s (span B, failure), 30.0–33.4 s (final comparison) | five onsets |
| clipping, overlap, off-stage | none found; the dashed line on the right edge stays inside the frame | none found |
| stillness beyond 3 s outside holds | none | 5–7 s static stretches |
| ending | finite, hold then fade | ends on caption frame |

## Investigated item (not a defect)

- **Token removed before span A's chip enters the export path.** Accurate seeks at 10.4, 10.9 and 11.6 s and a frame-number select across frames 300–348 agree: the policy glows at ≈ 10.3 s and the token row fades from the local `span A` record by ≈ 11.3 s; the `span A` chip enters the policy at ≈ 12.6 s. This reads as a span processor removing the attribute from the record before export, which is consistent with the lesson and the concept's preference for controlling attributes in the application. It is an ordering choice, not a fault.

## Optional improvements (not blockers)

1. **Tie the removal to the export step visibly.** Either remove the token as the `span A` chip passes the policy, or keep the current order and let the chip pass without a policy highlight, so the policy does not appear to act twice.
2. **Raise the token-flag cue.** The sound when the token row is first highlighted (≈ 7.4 s) peaks at −22.8 dB, far below neighbouring cues.
3. **Note other causes of missing spans in the write-up.** The cut shows export failure; sampling and missing instrumentation also omit spans, and exporters may retry.
4. **Note where removal should happen in the write-up.** Removing secrets only at a downstream collector means they have already left the process; not recording them at all is preferable.

## Scratch evidence

`video/observability-and-tracing/motion-v2/reviews/scratch/05/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, the frame-number strip through the token removal, and the candidate spectrogram.

