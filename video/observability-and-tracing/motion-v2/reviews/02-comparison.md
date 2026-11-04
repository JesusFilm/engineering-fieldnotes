# Observability and tracing lesson 02 — Related spans form a trace: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/observability-and-tracing/sequence/lessons.json` item 2. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (a root span card, two child cards and a trace tree view) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/observability-and-tracing/motion-v2/02/video.mp4` | `8d16e5eedcd8b71a6739be21f2aaf07f0adccccb54a93e412e9ca7b21f3ccde5` | 42.6 s | h264 1080×1920, 30 fps, 1278 frames | aac |
| public `public/lessons/observability-and-tracing/02.mp4` | `dfb1eeb4bca9c24037b2be9117d97986791d48280a92e14ac71ea819f8b94136` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/02/hash-before.txt`) and after (`scratch/02/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It shows the lesson's identity rules directly on span records: the root `agent task` card gets `trace 4bf9`, `span a1`, `parent —`; each child receives a copied `4bf9` chip, then its own span ID (`b2`, `c3`), then a copied `a1` as its parent; a `trace view · trace 4bf9` panel then lists the three as a tree. Shared trace identity and distinct span identities are both visible in every final frame. The public cut is a valid alternative but uses three generic boxes with captions and compresses the result into the text `T: A → M and U`. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/02/cand350/`, `pub350/`), tiled (`c1–c4.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 2.6, 9.4, 12.4, 14.6, 19.6, 22.4, 30.4 and 33.4 s (`t350/`, `t350_a.png`); 33.4 s viewed alone at native size.
- Full-resolution seek frame at 34.0 s and a crop of the cards (`full/`); glyph heights measured inside the root card (row text ≈ 31 px tall, card titles ≈ 41 px) and the tree rows (≈ 32–39 px), i.e. roughly 40 px type.
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (42.6 s).** Span cards with a name, a status (`running`/`ended`) and three rows (`trace`, `span`, `parent`), joined to the root by dotted parent connectors; a `trace view` panel at the bottom.

| time | beat | evidence |
|---|---|---|
| 0–8 s | the agent operation starts trace T | `agent task · running` card; `trace 4bf9` fills in blue with a ripple (≈ 2.2 s), then `span a1` (≈ 3.2 s), then `parent —` (≈ 4.2 s); hold |
| 8–17 s | the model call gets its own span ID, keeps trace T and the parent | `model call · running` card appears below; a blue `4bf9` chip travels down the connector and fills `trace 4bf9` (≈ 9.8 s); `span b2` appears in the card itself (≈ 10.8 s); an `a1` chip travels down and fills `parent a1` while the root's `span a1` is outlined (≈ 12–13 s); `model call` becomes `ended` (≈ 14.8 s) |
| 17–27 s | the tool call gets another span ID and belongs to trace T | `tool call · running` card on the right; the same three steps: copied `4bf9` (≈ 19.8 s), own `c3` (≈ 20.8 s), copied `a1` (≈ 22.8 s); `tool call` and then `agent task` become `ended` |
| 28–37 s | the trace view groups the spans; parent links show the shape | `trace view` panel gains `trace 4bf9` header; the three trace rows are outlined together; rows `agent task a1`, `model call b2`, `tool call c3` appear with indented tree connectors under the root (≈ 29.7–31.7 s); then `a1`, `b2`, `c3` are highlighted one at a time in cards and tree, and the parent rows are outlined |
| 37–42.6 s | hold and fade | final state, then fade to the title |

**Public (28 s).** Four boxes (AGENT SPAN `span A; trace T`, MODEL SPAN, TOOL SPAN, TRACE VIEW) with two-line captions per 7 s beat. A `trace T` chip goes to the model box, which becomes `M; parent A; T`; the same for the tool (`U; parent A; T`); `SPAN M` and `SPAN U` chips go to the trace view, which becomes `T: A → M and U`. Holds of 5–6 s with no change.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 4.5 | 3 | Candidate distinguishes copied values (chips carrying `4bf9` and `a1` down the connector) from new values (`b2`, `c3` appearing in place), which is exactly the lesson's "shared trace ID, own span ID, parent relation". Public packs each card's identity into one terse line and never shows a value being copied versus created. |
| accuracy | 4.5 | 4 | Root `parent —`; children share the trace and point to `a1`; spans in one process with no boundary drawn, leaving propagation to lesson 03; the `running`/`ended` statuses are consistent (model ends before tool starts; root ends last). IDs are short illustrative values, not stated as such on screen. Public is accurate but abstract. |
| pacing | 4.5 | 2.5 | Candidate events 0.8–1.2 s apart with ≈ 3–4 s holds after each beat and a ≈ 6 s final hold; the two child beats repeat the same rhythm, which reinforces the rule. Public has 5–6 s static stretches. |
| legibility at 350 px | 4.5 | 4 | Candidate rows are ≈ 40 px type and read clearly at native 350; IDs and labels never overlap. Public box text is smaller and denser (`M; parent A; T`). |
| meaningful variety | 4.5 | 1.5 | Candidate's record cards plus tree view suit an identity relationship and differ from lesson 01's timeline. Public is the generic box diagram with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −7.0 dB (below −0.5 dB) | −10.5 dB |
| loudest events | trace start (2.2 s) and tree assembly (30.7–31.7 s), ≈ −7 dB; no single disruption, which suits a non-failure lesson | n/a |
| sound on visible events | onsets 1.0–4.2 s (root fills), 8.0–14.8 s (model card, copies, own ID, ended), 18.0–25.6 s (tool card, same pattern, root ended), 28.5–36.2 s (trace view rows and pulses) | eight onsets |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none | 5–6 s static stretches |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Colour-code the span IDs.** `a1`, `b2` and `c3` are all white in the cards; giving each a distinct colour (matching its tree row) would make "each has its own span ID" readable at a glance, while `4bf9` stays the one blue value.
2. **Link the tree rows to their cards.** Tree rows pop in while the cards pulse; a brief chip from each card's `span` row to its tree row would make the grouping step visibly causal.
3. **Mark the IDs as shortened.** `4bf9` and `a1` are much shorter than real trace and span IDs; the write-up should say so, or the trace header could read `4bf9…`.
4. **Consider a label for the dotted connectors.** They carry the parent relation; outlining each child's `parent a1` together with its connector (as already done briefly) could be held a little longer in the final beat.

## Scratch evidence

`video/observability-and-tracing/motion-v2/reviews/scratch/02/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, a full-resolution frame and card crop, and the candidate spectrogram.

