# Load balancing lesson 03 — Take turns: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/load-balancing/sequence/lessons.json` item 3. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (an app above a round-robin balancer with A/B rows and a moving `next` marker, two server cards, a `picks` log with a `4 → ?` pause) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/load-balancing/motion-v2/03/video.mp4` | `11c81fff3887c8283069094af91ff3f244f93c2554173fcb8589578e692dccaa` | 45.75 s | h264 1080×1920, 30 fps, 1372 frames | aac |
| public `public/lessons/load-balancing/03.mp4` | `b28c9dd560c51f0890a0c6fb0d02bd253c9d53b9c12bd0f39c13611fff1cf623` | 36.0 s | h264 1080×1920, 24 fps, 864 frames | aac |

Hashes were recorded before inspection (`scratch/03/hash-before.txt`) and after (`scratch/03/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It makes round robin's state visible: the balancer lists `A eligible weight 1` and `B eligible weight 1` with a `next` marker that moves to the other row after each pick; a `picks` log fills `1 → A`, `2 → B`, `3 → A`; request 4 waits at the balancer while the log shows `4 → ?` long enough to answer the lesson's question, then goes to B. Every server is idle when its request arrives, so the cut makes no claim about busy servers (lesson 04). The public cut is accurate but explains the rule in captions over plain boxes and has no persistent record of the sequence. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/03/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek through the first pick (6.4, 6.9, 7.4, 7.9, 8.4 s) and the fourth request (30.4, 31.4, 32.4, 33.4, 34.0 s) (`t350/`, `t350_a.png`, `t350_b.png`).
- Frame-number select of frames 195–255 every 10 frames (6.5–8.5 s) to confirm when the `next` marker moves relative to the request (`full/`, `sel_pick1.png`).
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (45.75 s).** Title `Take turns`, subtitle `ROUND ROBIN`. An `app` box; a `load balancer · round robin` panel with rows `A eligible weight 1` and `B eligible weight 1` and a `next` marker; `server A` and `server B` cards (`idle`, `req N` with progress, `done`); a `picks` log with four cells.

| time | beat | evidence |
|---|---|---|
| 0–5 s | introduce the load balancer | balancer pulses, then both rows' `eligible weight 1` pulse; `next` appears on row A |
| 5–12 s | request 1 routes to A | `req 1` badge on the balancer; a dot leaves toward A (≈ 7 s); the `next` marker moves to row B while the dot is in flight (≈ 7.4 s, confirmed by seek and frame select); A shows `req 1` and `1 → A` fills (≈ 7.9 s); A works, `done`, `idle` |
| 13–20 s | request 2 routes to B | `req 2` on the balancer; dot to B; `next` moves to A; `2 → B`; B works and returns to `idle` |
| 21–28 s | request 3 routes to A | same pattern; `3 → A`; `next` moves to B |
| 29–45.75 s | the rule repeats A, B, A, B | `req 4` waits on the balancer while `4 → ?` shows (≈ 30.2–33.4 s, ≈ 3 s); then a dot goes to B, `4 → B`, `next` moves to A; the four cells pulse in turn (≈ 37.7–39.4 s); hold and fade |

**Public (36 s).** `APPLICATION`, `LOAD BALANCER`, `SERVER A` and `SERVER B` boxes; `REQUEST` chips move from the application through the balancer to the chosen server, which shows `WORKING` then `READY`; captions explain each beat and end with `A → B → A → B` / "Equal turns across these two servers."

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3 | Candidate's `next` marker shows that the rule has state and decides before the request arrives, and the log lets the viewer predict `4 → B`. Public shows chips going to alternating servers but the rule and sequence live in captions. |
| accuracy | 4.5 | 4.5 | Candidate shows the eligibility and equal weights the lesson's answer depends on, routes each request to exactly one server, and keeps every server idle at its turn, avoiding lesson 04's case. It does not mention that weights, connection routing or multiple balancers change the pattern (write-up material). Public is accurate. |
| pacing | 4.5 | 3 | Each request is a self-contained ≈ 8 s cycle with work ticks and a hold; the ≈ 3 s `4 → ?` pause gives time to answer; ≈ 6 s final hold. Public's cycles are similar but the closing caption section is static for ≈ 7 s. |
| legibility at 350 px | 4.5 | 4 | Candidate rows, `next`, server states and log cells read at native 350; `eligible` and `weight 1` are the smallest text but readable. Public box labels are small. |
| meaningful variety | 4.5 | 2 | A balancer with internal rule state and a decision log differs from lessons 01–02 and suits a selection rule. Public reuses the generic box layout with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −6.4 dB (below −0.5 dB) | −9.1 dB |
| loudest events | server arrivals with log fills (7.9, 15.9, 23.9, 34.2 s, ≈ −6.5 dB each) | n/a |
| sound on visible events | onsets 1.2–3.4 s (intro), then four request cycles (≈ 5.4–9.6, 13.4–17.6, 21.4–25.6, 29.4–35.9 s: send, balancer arrival, pick, server arrival, work, return), 37.7–39.35 s (four equal-level cell pulses) | sparse |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none; quiet stretches are holds after each cycle and the deliberate `4 → ?` pause | static closing captions |
| ending | finite, hold then fade | ends on caption frame |

## Investigated item (not a defect)

- **`next` moves before the request reaches A.** Accurate seeks (6.4–8.4 s) and frame selection (frames 195–255) agree: the marker moves to B at ≈ 7.4 s while `req 1`'s dot is still travelling to A. The pick has already been made when the dot leaves the balancer, so advancing then is correct for round robin and shows that the next choice is decided before request 2 arrives.

## Optional improvements (not blockers)

1. **Label the travelling dot.** The request appears as a `req N` badge on the balancer but travels to the server as an unlabelled ring; carrying the label would tie the dot to the log cell.
2. **Use server colours in the log.** `1 → A` and `2 → B` are both green; matching each cell to its server's colour would make the alternation visible at a glance.
3. **Note limits in the write-up.** Unequal weights, connection-level routing and several balancer instances each change the observed pattern.

## Scratch evidence

`video/load-balancing/motion-v2/reviews/scratch/03/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, the frame-number strip through the first pick, and the candidate spectrogram.

