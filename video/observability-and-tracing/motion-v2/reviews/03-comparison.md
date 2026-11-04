# Observability and tracing lesson 03 — Cross a service boundary: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/observability-and-tracing/sequence/lessons.json` item 3. This reviewer wrote an earlier planning document for this lesson; that context is acknowledged. The candidate shares that plan's vocabulary (process frames, context lines, a request with a `traceparent` header, an empty trace view until export) but uses its own vertical layout, and it is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/observability-and-tracing/motion-v2/03/video.mp4` | `a6a8fd7d7aa9fb7b5674a904647f2b630a47f3cce24d6d5a514eb56b5f6bc7fe` | 47.0 s | h264 1080×1920, 30 fps, 1410 frames | aac |
| public `public/lessons/observability-and-tracing/03.mp4` | `9e0cf51e68ecea563a072d2f87c5700d545f0ccd94378bf99674a60ce1532a8f` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/03/hash-before.txt`) and after (`scratch/03/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It makes every step of propagation a visible state change: the agent's `context 4bf9 · a1` sits in its own process while the test service's context reads `—`; the request's `traceparent —` line fills with `00-4bf9-a1-01` (tagged `trace` and `parent`); the request travels down to the service; the service's context fills from the header; its `run tests` span copies `4bf9`, gets its own `d4`, and names `a1` as parent. A trace view then reads `0 spans received` until each side exports its span, which carries the takeaway that headers alone do not create a complete trace. The public cut is a valid alternative but uses three generic boxes with captions and never shows export. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/03/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 12.4, 13.6, 15.6, 22.4, 30.6, 34.8, 35.5 and 37.4 s (`t350/`, `t350_a.png`, `t350_b.png`), viewed at native size.
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (47 s).** An `agent process` frame at the top and a `test service` frame at the bottom, each with a span card and a `context` box; a dotted `HTTP` path between them; a `POST /run-tests` request panel that moves along that path; later a `trace view` panel in the same middle space.

| time | beat | evidence |
|---|---|---|
| 0–9 s | a local parent relation cannot cross alone | `agent task · running` card fills `trace 4bf9`, `span a1`, `parent —`; the agent's `context` box fills `4bf9 · a1`; the test service's `context` reads `—`; a `POST /run-tests` panel appears with `traceparent —` |
| 9–14 s | include trace context in the request | a `4bf9 · a1` chip drops from the agent's context into the header (≈ 10 s); the line becomes `traceparent 00-4bf9-a1-01` with `trace` under `4bf9` and `parent` under `a1` |
| 13–20 s | the request crosses | the request panel moves down the `HTTP` path to the test service (≈ 13–15 s); the service frame pulses on arrival |
| 20–27 s | the receiver extracts context and starts a child span | a `4bf9 · a1` chip rises from the header into the service's `context` (≈ 21 s); `run tests · running` card appears and fills `trace 4bf9` (≈ 22.7 s), its own `span d4` (≈ 23.6 s), `parent a1` |
| 28–33 s | the work finishes | `run tests` and then `agent task` become `ended`; a `200 OK` chip returns up the path |
| 33–41 s | export both spans to see the whole path | the request panel is replaced by `trace view` reading `0 spans received` (≈ 33.4 s); an `a1` chip exports along the right edge and the row `agent task · agent · a1` appears with header `trace 4bf9` (≈ 35–36 s); a `d4` chip follows and `run tests · test service · d4` appears nested beneath (≈ 37 s); trace rows and parent rows pulse (≈ 38–39.4 s, loudest sound −5.9 dB) |
| 41–47 s | hold and fade | final state, then fade to the title |

**Public (28 s).** Three boxes (AGENT SERVICE `trace T`, REMOTE REQUEST, TOOL SERVICE) with two-line captions per 7 s beat. A `T; parent A` chip moves into the request (`trace=T; parent=A`) and then into the tool service (`U; parent A; trace T`). The last beat (export to see the whole path) changes nothing on screen; it exists only in the caption.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3 | Candidate shows the empty receiver context before propagation, the header as the only carrier, extraction into the receiver's context, and an empty trace view until export. Public shows the chip hand-off but not why export matters. |
| accuracy | 4.5 | 4 | Candidate respects inject → transport → extract → child span → export, with the receiver's own span ID and `parent a1`; spans are exported after they end. The header `00-4bf9-a1-01` uses shortened IDs without an ellipsis, so it is not a valid `traceparent` as written; the write-up should say so. The caller's span `a1` is used as the header parent, a simplification of setups with an HTTP client span. Public is accurate but omits export. |
| pacing | 4.5 | 2.5 | Candidate events about 0.8–1.4 s apart with holds of 3–5 s after the header fills, after extraction and after the trace view assembles; total 47 s. Public has 5–6 s static stretches and an unchanged final beat. |
| legibility at 350 px | 4.5 | 4 | Candidate's card rows, context values, header line and trace view rows read clearly at native 350; the small `trace` / `parent` tags under the header are the smallest text but remain readable. Public text is readable but sparse. |
| meaningful variety | 4.5 | 1.5 | Candidate's two-process layout with a moving request panel and an export step suits a boundary crossing and differs from lessons 01 and 02. Public is the generic three-box layout with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −5.9 dB (below −0.5 dB) | −10.5 dB |
| loudest event | final shared-trace pulse at 39.4 s | n/a |
| sound on visible events | onsets 1.2–4.4 s (agent card, contexts, request), 9.1–10.9 s (inject), 13.0–14.4 s (request travel and arrival), 17.1–23.6 s (extract, new span rows), 28.0–33.4 s (ended, `200 OK`, trace view), 35.0–40.8 s (exports, rows, pulses) | five onsets |
| clipping, overlap, off-stage | none found; the moving request panel clears both frames, and export chips stay inside the right edge | none found |
| stillness beyond 3 s outside holds | none; quiet stretches are holds after beats | 5–6 s static stretches |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Mark the shortened header.** `traceparent 00-4bf9-a1-01` looks like a complete value; `00-4bf9…-a1…-01` (or a note in the write-up) would avoid teaching an invalid header format.
2. **Note the parent simplification in the write-up.** In many setups an HTTP client span sits between `agent task` and the request, and its ID would be the header's parent.
3. **Anchor the `HTTP` label to the path.** It floats at the right of the middle space, away from the dotted path the request travels.
4. **Keep the request visible during export.** The trace view replaces the request panel; keeping a small trace of the header (for example in the service frame) would let the final frame show all three: header, both spans and the trace view.

## Scratch evidence

`video/observability-and-tracing/motion-v2/reviews/scratch/03/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, and the candidate spectrogram.

