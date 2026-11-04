# Load balancing lesson 06 — Avoid a failed server: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/load-balancing/sequence/lessons.json` item 6. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (a balancer with a server/status table and a `health checks` timeline with per-server tracks, a `timeout` bar on A's track, two server cards) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/load-balancing/motion-v2/06/video.mp4` | `6ce62a6ab2ffb94ed077a6e261ccde6d4fcc60f8e7640bfd90e4c25ec85a1b7b` | 38.7 s | h264 1080×1920, 30 fps, 1161 frames | aac |
| public `public/lessons/load-balancing/06.mp4` | `83e529a4ff9b94ddc1c11ac8220ea4011b285638ba1366c577442e7b2a20497f` | 38.0 s | h264 1080×1920, 24 fps, 912 frames | aac |

Hashes were recorded before inspection (`scratch/06/hash-before.txt`) and after (`scratch/06/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It shows detection as a timeline: two rounds of passing checks put green dots on both tracks; server A turns red `no response` just after the second round while the table still says `A eligible`; the next probe gets a reply from B but leaves a hollow ring on A's track, a `timeout` bar fills and ends in a red ×, and only then does A's status become `unavailable`. A new request then goes to B and its response returns through the balancer to the app (`waiting` → `received`). That answers the lesson's question (detection is not immediate) on screen. The public cut is accurate and states the same points, including "Earlier requests may still have failed", but in captions over generic boxes. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/06/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 10.4, 16.6, 20.4, 24.0 and 30.6 s (`t350/`, `t350_a.png`), viewed at native size.
- Full-resolution seek frame at 20.4 s with text-height measurement (`full/`): timeline labels and `timeout` are ≈ 60–70 px bands including glyph padding, consistent with ≈ 40 px type.
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## What each cut shows

**Candidate (38.7 s).** Title `Avoid a failed server`, subtitle `HEALTH CHECKS`. An `app` bar with a state (`idle`, `waiting`, `received`); a `load balancer` panel with a `server / last check` table and `health checks` tracks A and B with a moving `now` marker; `server A` and `server B` cards.

| time | beat | evidence |
|---|---|---|
| 0–10 s | periodic checks pass | probe dots to both servers (≈ 3 s and 9 s); green marks on both tracks; both `eligible` |
| 10–15 s | A stops responding | server A snaps red with a red × and `no response` (10.2 s, loudest event); table still `A eligible` for ≈ 5 s |
| 15–19 s | the balancer sends a probe; it times out | round 3: B's mark green; A's mark a hollow ring; `timeout` bar fills on A's track (≈ 16–18.7 s) and ends in a red × |
| 19–23 s | A is excluded from new selection | A's status `unavailable` (≈ 19.8 s); A's link dims |
| 23–28 s | a new request routes to B | app `waiting`; B's row highlighted; request travels to B; B `working`, then `ready` |
| 28–38.7 s | B returns its response through the balancer | response returns through the balancer; app `received` (≈ 29–30 s); B and the detection state pulse; hold and fade |

**Public (38 s).** `APPLICATION`, `LOAD BALANCER`, `SERVER A`, `SERVER B` with status labels; a `HEALTH CHECK` chip goes to A; A becomes `UNAVAILABLE` and its link turns red; a `REQUEST` goes to B and a `RESPONSE` returns; captions explain each beat ("The balancer does not know yet", "No successful response arrives", "The configured check times out", "New requests go to B. Earlier requests may still have failed.").

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3.5 | Candidate shows the undetected gap (red A beside `eligible`), the missing reply (hollow ring beside B's green mark) and the timeout as a filling bar, so the cause of exclusion is visible. Public shows the same sequence with captions doing the explaining. |
| accuracy | 4.5 | 5 | Candidate's order is correct: failure, gap, probe, timeout, exclusion, routing to B, response through the balancer. It uses one missed check (as the lesson does) without noting thresholds, and does not mention that requests sent during the gap can still fail; the public cut states the latter on screen ("Earlier requests may still have failed"). |
| pacing | 4.5 | 3.5 | Gap ≈ 5 s, timeout ≈ 3 s, events about 0.8–1.2 s apart, ≈ 8 s final hold. Public is paced by caption blocks with long static stretches. |
| legibility at 350 px | 4.5 | 4 | Status pills, track labels, `timeout`, server cards and app state read at native 350; `last check` and `health checks` headers are small grey but readable. Public status labels are small. |
| meaningful variety | 5 | 2 | A probe timeline inside the balancer is new in this chapter and suits periodic detection. Public reuses the generic layout. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −1.5 dB at A's failure (10.2 s); below −0.5 dB, but with little headroom | −9.3 dB |
| loudest events | A fails (10.2 s, −1.5 dB), timeout reached (18.75 s, −5.1 dB) | n/a |
| sound on visible events | onsets for probe rounds (3.0–4.2, 9.0, 15.0–16.2 s), failure (10.2 s), timeout ticks and end (17.4–18.75 s), exclusion (19.8 s), request to B and work (23.0–27.7 s), response and final pulses (28.4–31.3 s) | sparse |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none; the undetected gap is a deliberate hold with the `now` marker moving | caption blocks |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Leave more audio headroom on the failure.** It peaks at −1.5 dB; within the limit, but close.
2. **Name what the health check cannot rescue.** The lesson's answer says a request already sent can still fail; the public cut shows this as text. A brief marker or write-up note would cover it in the candidate.
3. **Note thresholds in the write-up.** Real health checkers usually require several consecutive failures before marking a server unavailable; the cut uses one, as the lesson's example does.
4. **Brighten `last check` and `health checks` headers.** They are the dimmest text on a phone.

## Scratch evidence

`video/load-balancing/motion-v2/reviews/scratch/06/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, a full-resolution frame, and the candidate spectrogram.

