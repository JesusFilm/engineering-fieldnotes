# Load balancing lesson 04 — Unequal work: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/load-balancing/sequence/lessons.json` item 4. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (a round-robin strip with a `next` marker above two server columns, each with `assigned` count, `run` and `wait` slots and a `work left` bar) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/load-balancing/motion-v2/04/video.mp4` | `e8c34f550cf9b4aa1d9bb6cea673bc118b9f7383830e068737dbc0d64cd5012f` | 47.67 s | h264 1080×1920, 30 fps, 1430 frames | aac |
| public `public/lessons/load-balancing/04.mp4` | `d1b343fcad83d4598b16565c52da04315aabdaeb65a48709d06213497c76e0eb` | 38.0 s | h264 1080×1920, 24 fps, 912 frames | aac |

Hashes were recorded before inspection (`scratch/04/hash-before.txt`) and after (`scratch/04/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It puts the lesson's contrast side by side: after a slow `report` goes to A and a quick `lookup` to B, both columns read `assigned 1` while A's `work left` bar is still long and B's is empty and `idle`; round robin's `next` is on A, so `req 3` lands in A's dashed `wait` slot while B stays idle, and only moves up into A's `run` slot after the report finishes. The public cut is accurate (it shows request 3 parked beside server A while B reads `READY`) but explains the counts-versus-work point in captions. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/04/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 17.4, 23.4, 27.0, 31.4 and 33.6 s (`t350/`, `t350_a.png`).
- Frame-number select of frames 990–1035 every 5 frames (33.0–34.5 s), cropped to server A, to confirm how `req 3` moves from the wait slot to the run slot (`full/`, `sel_move.png`).
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (47.67 s).** Title `Unequal work`, subtitle `ROUND ROBIN · ONE SLOT EACH`. An `app` bar (shows the request being sent, e.g. `req 1 · report`); a `round robin · next (A)(B)` strip; `server A` and `server B` columns with `assigned N`, a `run` slot, a dashed `wait` slot and a `work left` bar.

| time | beat | evidence |
|---|---|---|
| 0–4 s | some requests take longer | identical columns, `assigned 0`, `idle`, empty bars; `next` on A |
| 5–11 s | A receives a slow request | `req 1 · report`; A `run req 1 report`, `assigned 1`, bar fills; `next` → B; A's bar drains slowly with work ticks |
| 11–17 s | B receives a quick request | `req 2 · lookup`; B `run req 2 lookup`, `assigned 1`, short bar; `next` → A; B's bar empties and B shows `done` then `idle` (≈ 19 s) |
| 19–25 s | B is ready while A remains busy | both `assigned 1` (highlighted together); A's bar still part full; B `idle` with an empty bar |
| 25–33 s | round robin selects A and request 3 waits | `req 3 · lookup`; `next` on A; `req 3` lands in A's dashed `wait` slot (≈ 27 s), `assigned 2`; `next` → B; B remains `idle`, `assigned 1`; A's bar drains to empty |
| 33–37 s | A finishes and the waiting request starts | A `done · report`, then `req 3` slides up into A's `run` slot (confirmed by frame select) with a short bar; it finishes; A `idle` |
| 37–47.67 s | hold and fade | `assigned 2` and `assigned 1` pulse; both bars empty; hold, fade |

**Public (38 s).** `APPLICATION`, `LOAD BALANCER`, `SERVER A`, `SERVER B` with status lines and progress bars; `REQUEST` chips; a `REQUEST 3` tag parked beside server A while B reads `READY`; captions explain each beat ("One request each; different work left", "Request 3 waits while B is ready", "Equal turns did not balance the work").

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3.5 | Candidate shows equal `assigned 1` counters next to unequal `work left` bars, `next` pointing at A as `req 3` arrives, and `req 3` in a wait slot beside an idle B. Public shows the waiting tag next to an idle B but states the count-versus-work contrast in captions. |
| accuracy | 4.5 | 4.5 | Candidate keeps one run slot and one wait slot per server, routes by turn without looking at load, and starts `req 3` only after the report finishes. The `work left` bar is a viewer aid that a real balancer would not see (write-up material). Public is accurate. |
| pacing | 4.5 | 3.5 | The report drains for ≈ 22 s with steady ticks, so it reads as slow; the lookup takes ≈ 4 s; holds after each beat; ≈ 10 s final hold. Public is paced by 6–7 s caption blocks. |
| legibility at 350 px | 4.5 | 4 | Counters, slot text, `next` cells and `work left` read at native 350; the `report` / `lookup` sublabels and `wait` tag are the smallest text but readable. Public box text is small. |
| meaningful variety | 4.5 | 2 | Server internals (count, run, wait, remaining work) suit this lesson and differ from lesson 03's picks log. Public reuses the generic layout with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −5.1 dB (below −0.5 dB) | −8.1 dB |
| sound on visible events | onsets for each send, pick and arrival (5.0–7.25, 11.0–12.35, 25.45–26.8 s), continuous work ticks while A's report runs (≈ 7.6–33 s) with B's ticks only during the lookup, `req 3` queued (26.8 s, ≈ −8.3 dB), report done and `req 3` start (≈ 33–34 s, −6.4 dB), final pulses (39.45–41.75 s) | sparse |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none; A's draining bar and ticks keep the long wait active | caption blocks |
| ending | finite, hold then fade | ends on caption frame |

## Investigated item (not a defect)

- **`req 3` text crosses the line between the wait and run slots** at ≈ 33.3–33.6 s (seen in a 1 fps frame and an accurate seek at 33.6 s). Frame-number selection of frames 990–1035 shows a continuous slide from the dashed wait slot up into the run slot, after A shows `done · report` and `idle`, ending with `req 3 · lookup` in the run slot. It is the intended "waiting request starts" motion.

## Optional improvements (not blockers)

1. **Say "lookup" when `req 3` waits.** `req 3` is a short lookup (its app badge says so), but its wait slot shows only `req 3`; showing `lookup` there would emphasise that a quick job is stuck behind a slow one.
2. **Hold the equal-count moment a little longer.** Both `assigned 1` counters are highlighted together briefly (≈ 19–20 s); a slightly longer pulse would make "equal counts" land before request 3 arrives.
3. **Note in the write-up that `work left` is a teaching aid.** Real balancers rarely know a request's cost in advance; round robin does not see this bar.

## Scratch evidence

`video/load-balancing/motion-v2/reviews/scratch/04/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, the frame-number strip through the wait-to-run move, and the candidate spectrogram.

