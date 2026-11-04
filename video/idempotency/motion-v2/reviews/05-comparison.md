# Idempotency lesson 05 — Changed intent, new key: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/idempotency/sequence/lessons.json` item 5. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (a caller list of keyed operations, a service comparison of `stored for k7` versus `incoming` with `=` and `≠` marks, an unchanged database, and a new `k8 · release v2` that is `not sent`) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/idempotency/motion-v2/05/video.mp4` | `a2b0b9982553f5a2ccbaf79d5bc4829cfa1f276ce28a8c4964ad993ca7ac0b3c` | 42.0 s | h264 1080×1920, 30 fps, 1260 frames | aac |
| public `public/lessons/idempotency/05.mp4` | `d9928043984adafbaf5357f6488674cb03193ef13e2902d0ffe73040cd8c3336` | 28.0 s | h264 1080×1920, 20 fps, 560 frames | aac |

Hashes were recorded before inspection (`scratch/05/hash-before.txt`) and after (`scratch/05/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It shows why the reused key is refused: the caller holds `k7 · release v1 · done` and adds `k7 · release v2 · new intent?`; `create v2 · k7` reaches the service, which fills `incoming` (`key k7`, `release v2`) and fetches `stored for k7` (`key k7`, `release v1`); the key row gets `=` and the release row `≠`, with `same key · different request`; the service is `rejected`, the `rejected` result returns, the caller's v2 row turns grey `rejected`, and the database keeps `k7 → 47 · v1`, `47 v1` and `tickets: 1` (`rejected · record unchanged`). The caller then prepares `k8 · release v2 · not sent` under `retry: same key · new intent: new key`. The public cut is accurate but shows `CHECK k7` and a `payload mismatch` label, with the comparison and the new-key rule in captions. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/05/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 15.0, 24.0 and 33.0 s (`t350/`, `t350_a.png`), viewed at native size.
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (42.0 s).** Title `Idempotency`, subtitle `CHANGED INTENT, NEW KEY`. A `Caller` card with two operation rows and a state, `request` / `reply` lanes, a `Service` card with `stored for k7` and `incoming` panels, and a `Database` card with `operation keys`, `tickets` and `tickets: N`.

| time | beat | evidence |
|---|---|---|
| 0–8 s | key k7 belongs to release v1; the new payload asks for v2 | caller `has ticket 47`, `k7 · release v1 · done`; database `k7 → 47 · v1`, `47 v1`, `tickets: 1`; a second row `k7 · release v2 · new intent?` (≈ 3 s) |
| 8–19 s | the service compares the payloads | `create v2 · k7` chip down (≈ 8.5–9.9 s); service `comparing`; `incoming` fills `key k7`, `release v2`; stored record fetched from `operation keys`; `stored for k7` fills `key k7`, `release v1`; key row `=` (≈ 13 s), release row `≠` (≈ 14.6 s); `same key · different request`; service `mismatch` |
| 19–28 s | the service rejects the mismatch; it does not overwrite | service `rejected` (loudest cue −5.3 dB at 19.0 s); `rejected` chip up the reply lane; caller `rejected`, v2 row grey `rejected`; database rows pulse unchanged; `rejected · record unchanged` |
| 28–42 s | a new operation needs a new key; a retry keeps its identity | caller's second row becomes `k8 · release v2 · not sent` (≈ 28 s); caller `new key ready`; `retry: same key · new intent: new key` (≈ 30 s); hold and fade |

**Public (28 s).** `CALLER k7 + release v2`, `TICKET SERVICE`, `DATABASE k7 used for v1`; a `k7 + v2` chip goes down; a `CHECK k7` chip goes to the database; the service turns red with `payload mismatch`; a `REJECTED` chip returns; captions per beat.

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3.5 | Candidate shows the field-by-field comparison (`=` on key, `≠` on release) that causes the rejection, the unchanged records afterwards, and a concrete new key for the new intent. Public reports `payload mismatch` as a label and states the new-key rule only in a caption. |
| accuracy | 5 | 4.5 | Candidate never writes to the database, keeps the original operation `done`, and leaves `k8` `not sent`. Public is accurate; it colours the service red, which can read as a service failure rather than a deliberate rejection. |
| pacing | 4.5 | 3 | Events 0.9–1.6 s apart; holds after the mismatch, after the rejection and after the new key; ≈ 10 s final hold, slightly long. Public holds 7 s caption blocks. |
| legibility at 350 px | 4.5 | 3.5 | Caller rows, comparison values and marks, verdict, database rows and both closing lines read at native 350; the `new intent?` / `not sent` tags are the smallest text. Public box text is small. |
| meaningful variety | 5 | 2 | A stored-versus-incoming comparison is new in this chapter and suits a contract check. Public reuses three stacked boxes with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −5.3 dB at the rejection (19.0 s), below −0.5 dB | −15.1 dB |
| loudest events | rejection (19.0 s), result received (20.6 s, −6.5 dB), new key (28.0 s, −6.4 dB) | n/a |
| sound on visible events | onsets for the intro rows (1.2–4.6 s), the request and comparison (8.5–14.6 s), rejection and receipt (19.0–21.8 s), the new key and rule (28.0–31.9 s); no database-write cue | sparse |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | ≈ 22–28 s is a hold on the unchanged record | caption blocks |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Make the `≠` the loudest moment of the comparison.** The mismatch (≈ 14.6 s, −13 dB) is quieter than the request arrival (−8.4 dB); the decisive cue should stand out before the rejection.
2. **Enlarge the operation-row tags** (`new intent?`, `rejected`, `not sent`), the smallest text at 350 px.
3. **Note in the write-up** that rejecting a changed payload is this design's contract; other services may behave differently, and real services compare the full request or a fingerprint of it.

## Scratch evidence

`video/idempotency/motion-v2/reviews/scratch/05/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, and the candidate spectrogram.

