# Load balancing lesson 02 — Share the work: comparison review

Comparison of the encoded motion-v2 candidate against the public lesson, judged against `video/load-balancing/sequence/lessons.json` item 2. This reviewer wrote an earlier planning document for this lesson, and the candidate's geometry (an app above two one-slot server cards, a two-row timeline with overlapping equal bars, a closing `req 3 ?`) closely resembles it; that context is acknowledged, and the candidate is judged against the lesson rather than plan fidelity. No authoring source, scene file, production metadata or self-review of the candidate was read before or during this encoded inspection. Model identity is not considered.

## Files and hashes

| file | SHA-256 (before = after) | duration | video | audio |
|---|---|---|---|---|
| candidate `video/load-balancing/motion-v2/02/video.mp4` | `1ec94579979f3bd865872666ac65e24a2eab074749f6b20236861d70ecfc5eef` | 37.7 s | h264 1080×1920, 30 fps, 1131 frames | aac |
| public `public/lessons/load-balancing/02.mp4` | `7eaa944b610ee00cd9b24977c777a01b311c08d21442085317149791359fd7ce` | 34.0 s | h264 1080×1920, 24 fps, 816 frames | aac |

Hashes were recorded before inspection (`scratch/02/hash-before.txt`) and after (`scratch/02/hash-after.txt`); they are identical. No media was modified.

## Recommendation

**Recommend the candidate.** It answers the lesson's question ("does a second server make one request twice as fast?") with measurable geometry: `req 2` starts on server B while `req 1` is still running on A, the `working` counter reads `2`, the two timeline bars overlap, and when both finish a dashed copy of `req 1`'s length is laid over `req 2` to show they are equal; a `same time` band marks the overlap, and a `req 3` with a `?` between the servers leaves the choice to the next lesson. The public cut is a sound alternative (two servers working at once, progress bars, a "who chooses the server?" ending) but carries the explanation in captions and shows no equal-duration comparison. Decision: `pass`, no blockers.

## Method

- One frame per second from each file at 350 px wide (`scratch/02/cand350/`, `pub350/`), tiled (`c1.png`, `c13.png`, `c25.png`, `c37.png`, `p1–p2.png`).
- Individual native 350 px frames by accurate seek at 3.0, 8.6, 13.4, 16.0, 18.4, 22.6, 25.6, 28.6, 31.0 and 34.0 s (`t350/`, `t350_a.png`, `t350_b.png`).
- Bar geometry measured at full resolution on two independent extractions (accurate seek at 33.0 s and frame-number select of frame 1000) (`full/`).
- Whole-file decode with `-xerror` for both files; atom order; `volumedetect` overall and per event; `silencedetect` onsets; candidate spectrogram (`cand_spec.png`).
- **Audio was analysed only, not heard.**

## Geometry check (full resolution, both extractions agree)

| bar | x span | width |
|---|---|---|
| `req 1` on row A | 257–655 | 398 px |
| `req 2` on row B | 466–864 | 398 px |
| overlap (`same time`) | 466–655 | 189 px |

The two requests take the same time and overlap for about half of it.

## What each cut shows

**Candidate (37.7 s).** Title `Share the work`, subtitle `TWO SERVERS · ONE SLOT EACH`. An `app` card listing requests and their states; `server A` and `server B` cards, each `profile service` with one slot (`free` or `req N` with a progress line); a timeline with `working N`, rows `A` and `B` and a moving playhead.

| time | beat | evidence |
|---|---|---|
| 0–6 s | two servers can run the same service | both cards pulse; both show `profile service` and `free` |
| 6–11 s | the first request starts on server A | app `req 1 · waiting`; a dot travels to A (≈ 7.8 s); A's slot `req 1` fills; bar `req 1` grows on row A; `working 1`; B stays `free` |
| 11–17 s | a second request starts on B while A works | app `req 2 · waiting`; dot to B (≈ 12.2 s); B's slot `req 2`; `working 2`; both bars grow |
| 17–24 s | both finish independently | A finishes first (`req 1 · done`, A `free`, bar green, `working 1`); B continues; B finishes later (`req 2 · done`, `working 0`) |
| 25–37.7 s | separate requests use separate capacity | a dashed outline of `req 1`'s length is laid over `req 2` (≈ 25.6 s); a `same time` band shades the overlap (≈ 28 s); `req 3` appears between the servers with dashed options and an orange `?` (≈ 31 s); hold, fade |

**Public (34 s).** `APPLICATION` above `SERVER A` and `SERVER B` with status lines and progress bars; `REQUEST 1` and `REQUEST 2` chips travel to A and B; both show `WORKING` together, then `READY`; captions explain each beat and end with "But who chooses the server? Next: the load balancer."

## Scores (1–5)

| criterion | candidate | public | concrete difference |
|---|---|---|---|
| causal clarity | 5 | 3.5 | Candidate's overlapping bars and the dashed equal-length overlay answer both halves of the question (at once, not faster) without words. Public shows simultaneous `WORKING` but states "each server has its own work" in a caption and never compares durations. |
| accuracy | 4.5 | 4.5 | Both keep one slot per server, give the routes without a selection rule, and avoid timing numbers. Candidate's equal bars are exact (398 px each). Neither notes that a shared dependency could still limit both servers. |
| pacing | 4.5 | 3.5 | Candidate events about 0.8–1 s apart with work ticks during processing, holds after each finish and ≈ 6 s at the end. Public is evenly paced with captions doing the explaining and a static closing caption section. |
| legibility at 350 px | 4.5 | 4 | Candidate's names, slots, app rows, counter and bar labels read at native 350; `profile service` and the subtitle are the smallest text but readable. Public's box text is small. |
| meaningful variety | 4.5 | 2 | Candidate adds a timeline to the app/server vocabulary of lesson 01, suited to concurrency. Public reuses the generic box layout with captions. |

## Objective checks

| check | candidate | public |
|---|---|---|
| full decode (`-xerror`) | clean | clean |
| atom order | ftyp, moov, free, mdat | same |
| audio peak | −6.4 dB (below −0.5 dB) | −4.9 dB |
| loudest events | request arrivals at A (7.8 s) and B (12.2 s) | n/a |
| sound on visible events | onsets 1.2–3.1 s (cards), 5.6–7.8 s (req 1), 11.0–12.2 s (req 2), 12.2–21.1 s (work ticks, A finishing, response), 22.3–23.7 s (B finishing, response), 26.2–31.7 s (equal-length, `same time`, `req 3 ?`) | six onsets |
| clipping, overlap, off-stage | none found | none found |
| stillness beyond 3 s outside holds | none | static stretches under captions |
| ending | finite, hold then fade | ends on caption frame |

## Optional improvements (not blockers)

1. **Hide bar labels until the bar fits them.** While a bar is just starting, its label is cut by the bar edge (for example `re` on row B at ≈ 13.4 s); reveal the label once the bar is wide enough.
2. **Label the request dots.** Requests travel as small rings; a short `req 1` / `req 2` chip on the link would tie the motion to the app list.
3. **Note shared dependencies in the write-up.** More servers add capacity only when requests do not compete for one shared resource such as a database.

## Scratch evidence

`video/load-balancing/motion-v2/reviews/scratch/02/`: hash files, 1 fps 350 px frames for both cuts, tiled sheets, native 350 seek frames, full-resolution seek and select frames, and the candidate spectrogram.

