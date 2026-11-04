# Canary deployments lesson 04 comparison: Compare the same operation

Reviewer: fresh independent comparison reviewer (claude-opus-5-5). I read the lesson brief (`video/canary-deployments/sequence/lessons.json` item 4), `AGENTS.md`, `docs/editorial-workflow.md` and the post-production review reference before inspecting media. I did not read authoring source, self-review, plans, ledgers, other reviews or other sessions.

Scores are reviewer judgements on a 1–5 scale, not measured learning. Factual verification (counts, rates, scope claims) is reported separately from the scores.

## Files and hashes

| Role | File | SHA256 before | SHA256 after |
| --- | --- | --- | --- |
| Candidate (motion-v2) | `video/canary-deployments/motion-v2/04/video.mp4` | `ab8531f7de72985b8951a65b34a5778e884749be57b9f5beb7f0dc0ddea08a4c` | unchanged |
| Published control | `public/lessons/canary-deployments/04.mp4` | `9c9375845c20dae261bf151f5022f9b1c24d4ae154b3fad89c155b78f9b43dac` | unchanged |

## Verdict

**Candidate: pass. Recommended over the published cut.** I found no reproducible objective fault. The candidate makes the comparison itself the motion: two filter chips (`op = export`, `window A`) wire into both rows, both denominators count up together, each row resolves to its ratio and rate in turn, and a shared failure-rate bar puts 0% and 40% on one scale. The published cut is a three-box slideshow that changes only at 7, 14 and 21 s. It never marks the counts as illustrative and never shows that both groups come from the same observation window.

## Encoded stream checks

| Check | Candidate | Published |
| --- | --- | --- |
| Video | H.264 1080×1920 yuv420p, 30 fps, 1188 frames | H.264 1080×1920 yuv420p, 20 fps, 560 frames |
| Duration | 39.6 s | 28.0 s (matches `lessons.json` `duration: 28`) |
| Audio | AAC 44.1 kHz stereo | AAC 44.1 kHz stereo |
| Full decode | no errors | no errors |
| Streaming | `moov` before `mdat` (fast start) | `moov` before `mdat` |
| Levels | mean −32.6 dB, max −7.5 dBFS, no clipping | mean −44.4 dB, max −13.6 dBFS |
| Ending | content from frame 0; final state holds 36.5–38.5 s, fades 38.53–39.3 s, black for the last 0.3 s | static final state 23.2–28.0 s, cut |

## Method

I located change points with a frame-difference luma signal and audio onsets with 50 ms peak windows. I then inspected individual decoded frames at native 1080×1920 and at 350 px width for every beat and boundary. Candidate frames inspected: 0, 30, 60, 100, 170, 200, 233, 236, 245, 270, 300, 330, 345, 395, 405, 408, 445, 470, 500, 524, 545, 590, 600, 603, 615, 645, 648, 651, 670, 700, 712, 720, 740, 770, 790, 795, 830, 866, 880, 910, 930, 978, 990, 1027, 1029, 1031, 1040, 1060, 1085, 1093, 1110, 1186 and 1187. Published frames inspected: 0, 70, 139, 140, 200, 279, 280, 350, 419, 420, 430, 440, 450, 455, 458, 459, 460, 462, 520 and 559. I also made 1 fps contact sheets for both files and spectrograms for both audio tracks. Possible overlaps were rechecked at adjacent exact frame indices (candidate 929/931; published 455/458/460/462) so that a time seek landing on a neighbouring frame could not create or hide a fault. Working files are in `reviews/scratch/04/` (ignored by Git).

**Audio was analysed only, not heard.** All sound statements below come from onset detection, peak levels and spectrograms.

## Candidate beat walkthrough (timestamps from frame index ÷ 30)

| Time | What is on screen | Sound (analysed) |
| --- | --- | --- |
| 0.0 s | "illustrative counts" chip, title "Compare exports with exports", dim filter chips, empty v1 control and v2 candidate rows | silence |
| 0.5 s / 1.6 s | `op = export` then `window A` light up; bracket connectors draw into **both** rows (f60) | onsets at 0.50 s and 1.60 s |
| 2.8–5.8 s | column headings "failed / exports", "rate"; numerators "?"; denominators count up together at a constant 9:1 ratio (90/10 at f100, 810/90 at f170, 900/100 at f200) | tick every 0.3 s, 3.1–5.5 s; landing chord 5.8 s |
| 7.6–11.2 s | v1 row focused and v2 dimmed; "0" + "failed" (8.5 s), "exports" (9.5 s), "= 0%" (10.9 s) | 7.6, 8.5, 9.5, 10.9 s |
| 13.3–17.8 s | v1 dims and v2 is focused; red "40" + "failed" (15.0 s), "exports" (16.0 s), "= 40%" in red (17.4 s) | 13.3, 14.1, **15.0 s (loudest, −7 dB)**, 16.0, 17.4 s |
| 19.8–24.4 s | both rows at full contrast; failure-rate axis 0%–100% (20.7 s), v1 marker at 0 (21.6 s), v2 track (22.6 s), red fill grows to 40% of the track (lands 24.4 s; measured about 133 of 332 px) | 19.8, 20.7, 21.6, 22.6, 24.5 s |
| 25.6 / 26.5 s | 900 and 100 denominators glow in turn (f770, f795), restating that each rate has its own denominator | 25.6, 26.4 s |
| 28.7 s | red outline around 40%, "observed worse" under the bars (f880) | 28.7 s |
| 30.2 s | "argues against promotion" | 30.2 s |
| 32.5 / 34.2 / 36.1 s | grey limit line changes: "cause not proven" → "no universal threshold" → "a person decides next"; each old line fades out fully before the next fades in (f1027–1031) | 32.5, 34.4, 36.3 s |
| 36.5–39.6 s | hold on the final state, then fade to black | none |

No stretch longer than about 2.3 s passes without a change, apart from the deliberate final hold. Every visible event has a matching sound within about 0.1 s, and every sound has a visible event. I saw no stale state: the dimmed row returns to full contrast at 19.8 s before the bar compares both rows.

## Published cut beat walkthrough

| Time | What is on screen | Sound (analysed) |
| --- | --- | --- |
| 0–6.95 s | three boxes: "v1 EXPORTS 900 requests", "v2 EXPORTS 100 requests", "ROLLOUT DECISION"; caption "Compare exports with exports. Do not mix them with unrelated requests." No motion. | silence |
| 7.0 s | v1 box turns green, "0 / 900 fail"; caption changes | 7.0 s |
| 14.0 s | v2 box turns red, "40 / 100 fail"; caption changes | 14.0 s (quiet, −29 dB) |
| 21.0–23.0 s | caption "The candidate has a clear regression. The comparison argues against promotion."; orange "40% ERRORS" chip travels into the decision box, which turns red with "do not promote" | 21.0, 23.0 s |
| 23.2–28.0 s | static | none |

## Comparison by criterion

| Criterion | Candidate | Published |
| --- | --- | --- |
| Causal clarity | **5.** Same-operation scoping is drawn: both rows hang from `op = export` and `window A`. Proportional counting, row-by-row resolution and a shared rate bar let a viewer state the lesson with the words ignored. | **3.** The lesson is carried mainly by captions. The boxes say "EXPORTS", but nothing shows that both groups share a window, and there is no rate scale. |
| Accuracy | **5.** 0/900 = 0% and 40/100 = 40% are shown as explicit ratios with matching rates; the bar matches 40%. "illustrative counts" stays on screen throughout. The cut says "observed worse" and "cause not proven", and "a person decides next" rules out automatic rollout. No benchmark claims. | **4.** Counts are correct; percentages appear only in captions and the "40% ERRORS" chip. Nothing on screen marks the counts as illustrative. "Clear regression" is acceptable lesson text, but it leans closer to a causal claim than the candidate does. |
| Pacing | **4.** Each beat lands with a short hold. The bar and verdict section (19.8–30.2 s) is slower than it needs to be, and the verdict arrives about 9 s after the lesson's 21 s beat. Total 39.6 s with a short final hold and fade, without long padding. | **2.** Three motionless stretches of about 7 s (0–6.95, 7–13.95, 14–20.95 s) and a further 4.8 s static ending. Only one moving element in the whole cut. |
| Visual legibility | **4.** At native size, the main numbers are very large and the smallest labels measure about 40 px. At 350 px the fractions and rates stay clear, while secondary labels ("illustrative counts", column headings, bar scale, grey limit line) fall to roughly 13–15 px. | **4.** Clean and uncluttered. The small box subtitles ("900 requests", "0 / 900 fail") are about 30 px at native size and small at 350 px. The chip covers the decision box border at f455–458 (22.75–22.9 s) as it merges; reproducible, brief, and no text is hidden. |

The candidate's concrete advantages:

- It shows the operation and window filter feeding both groups (0.5–1.6 s), which is the lesson's central point.
- It shows each denominator: counting at 9:1 (2.8–5.8 s), then the 900 and 100 glows (25.6 and 26.5 s).
- It places both rates on one 0–100% scale (20.7–24.4 s).
- It keeps the scope limits on screen: illustrative counts, cause not proven, a person decides next.
- Its sound follows the visible events, with the 40 failures as the loudest moment.

Its disadvantages:

- It is longer than the lesson metadata.
- The verdict arrives late.
- The rotating limit line leaves only its last item on screen at the end.

The published cut's advantages are brevity, a 28 s length that matches the lesson metadata, and an explicit decision box that ends in "do not promote".

## Objective faults (blockers)

None in the candidate. Every possible overlap was checked at adjacent frames. The red 40% outline stays about 8 px inside its card at f929 and f931.

## Optional improvements (not blockers)

1. **Tighten the verdict** (19.8–30.2 s, size M). The rate bar lands at 24.4 s, but "argues against promotion" waits until 30.2 s. Bringing "observed worse" and the verdict within about 2 s of the bar landing would put the decision near the lesson's 21 s beat and shorten the cut to about 33 s.
2. **Keep the limits together at the end** (32.5–36.1 s, size S). "cause not proven" shows for only 1.7 s, and the final frame keeps only "a person decides next". "no universal threshold" is not in the lesson text and could be dropped, so the two brief-required limits can stay on screen together.
3. **Phone-width secondary labels** (whole cut, size S). At 350 px, "illustrative counts" and the grey limit line are about 13–15 px. A modest size or contrast increase would help on small phones; the core numbers are already clear.
4. **Integration note** (size S). `lessons.json` item 4 says `duration: 28` with beats at 0/7/14/21 s. If this 39.6 s cut is promoted, the coordinator must update that metadata so the beat text does not run ahead of the video. This is a manifest task, not a fault in the encoded video.

