# Lesson 04 comparison: Back off before retrying

Reviewer: fresh independent comparison reviewer. Read before media inspection: AGENTS.md, docs/editorial-workflow.md, the architecture-flow-video review reference, and `video/timeouts-and-retries/sequence/lessons.json` item 4. No author source, self-review, plan, ledger or other review was read.

| | Candidate (motion-v2) | Published |
|---|---|---|
| File | `video/timeouts-and-retries/motion-v2/04/video.mp4` | `public/lessons/timeouts-and-retries/04.mp4` |
| SHA256 (before = after) | `dc1b6e4c20bc3c2047a7ef35b2418228621825e2ae0971e4bd17b5b439d1820a` | `a89d6e599fa7bbe43e50bf0952b9f528a0a7f6c2246604dd2fa37acf92c70833` |
| Stream | 1080x1920 H.264 30 fps, 1068 frames, AAC 44.1 kHz stereo, 35.6 s | 1080x1920 H.264 20 fps, 560 frames, AAC 44.1 kHz stereo, 28.0 s |
| Full decode | clean | clean |
| Faststart (moov in first 2 KB) | yes | yes |
| Audio peak / mean | -5.4 dB / -31.5 dB | -11.6 dB / -40.7 dB |
| Freezes (freezedetect, n=0.001, d>=2.5 s) | 32.1–34.6 s only (final hold, then 1 s fade) | 0–7, 7–14, 21–28 s |
| First vs last frame | match (PSNR 54.5 dB; title-only frame) | differ (19.0 dB); not required to loop |

Audio was **analysed only, not heard**: volumedetect, silencedetect onsets, spectrograms, and one frame rendered 0.15 s after every candidate onset.

## Verdict

**Candidate passes and is recommended over the published cut.** It covers every item in the lesson scope with motion, and inspection found no reproducible objective fault. The published cut is accurate in its captions but teaches almost entirely through text. It never shows the burst, the delays, or the stop, and its diagram does not change for three 7 s stretches.

## Scores (reviewer judgment, 1–5; not measured learning)

| | Causal clarity | Accuracy | Pacing | Legibility |
|---|---|---|---|---|
| Candidate | 5 | 5 | 4 | 4 |
| Published | 2 | 3 | 2 | 4 |

## Candidate by beat (native 1080 and 350 px frames inspected)

- **0–1.3 s** (n0, n15): title-only fade-in. At 1.4 s, envelopes leave A, B and C and the counters change from 0/2 to 1/2 (n45), with a send sound at 1.4 s.
- **Shared failure, 2.0–3.7 s** (n75–n105): the service turns from OK to Unavailable with a red ripple, and three 503 chips return to the callers. Arrival markers A, B and C land together in the "Service arrivals" strip. This is the loudest sound in the file (−5.4 dB at about 2.4 s), so the disruption carries the most weight.
- **Hypothetical burst, 5.9–8.6 s** (n195, n255): a grey label reads "Hypothetical: retry at once." Dashed hollow markers inside a dashed box are labelled "Second burst." The counters **stay at 1/2**, so these markers are not counted as requests. The style (dashed, hollow, grey heading) clearly differs from real markers (solid, filled). The paired sound is quiet (−23.9 dB). This part of the scope is satisfied and impossible to miss.
- **Fixed backoff, 9.6–12.9 s** (n285, n330): "Backoff: wait, then retry" adds three equal 1.5 s bars, and a dashed box labelled "Still aligned" shows that waiting alone does not spread the retries. This sets up why jitter matters.
- **Jitter, 13.0–15 s** (n405, n465): "Jitter: random wait per caller." The bars redraw to 1.0, 2.1 and 3.0 s with three distinct tick sounds, and the strip is labelled "Example draws · can match." That label directly states that random delays can coincide.
- **Retries arrive, 15.4–23 s** (n525, n585, n705): a playhead sweeps across the bars. As each bar ends, that caller's second attempt is sent and its counter changes to 2/2 (A at 17.4 s, B at 19.6 s, C at 21.4 s). Each attempt then arrives at the service and fails with a small return mark. The arrivals land in three separate columns. Every send, arrival and failure has its own sound.
- **Recap and limit, 24.9–32 s** (n750, n800, n900, n1000): the label changes to "Arrivals spread out" and the arrival markers pulse. Then "Service still unavailable" appears in red with a ripple at 28.8 s, so recovery is not implied. "Limit reached: stop" appears as the "Max 2 attempts" chip highlights (30.6 s), and every caller shows "2/2 stop" (31.2 s). The stop is finite and clear.
- **32.1–35.6 s**: a 2.5 s hold on the resolved state, then a 1 s fade to the title-only frame that matches frame 0. The padding is short.
- **Scope exclusions**: no overall deadline appears. The "Read · retry eligible" chip limits the case to a retryable read and avoids implying that every error is safe to retry. There are no paragraphs or physical metaphors.
- **350 px**: all labels are legible, including the faint "Example draws · can match" and "time →" (s0195, s0330, s0465, s0705, s1000).
- **Sound mapping**: all 32 onsets matched a visible event (send, failure, hypothetical cue, bar draw, playhead tick, arrival, failure return, recap pulse, limit, stop). No visible event was silent apart from the deliberate fades.

## Published by beat

- **0–7 s** (n0, n70): a static diagram shows three callers ("attempt failed") and "REMOTE SERVICE overloaded," with a two-line caption. Freezedetect confirms 7 s without change. The failure has no event or sound, and the "new burst" exists only in the caption. Nothing shows that retries would arrive together.
- **7–14 s** (n140, n200): one sound at 7.0 s. Boxes turn amber with "retry first," "2s later," "4s later." The caption says jitter makes the delays different, but the fixed round offsets look deterministic, and no aligned baseline is shown for comparison. The picture stays static for 7 s.
- **14–21 s** (n280–n419): small "A," "B" and "C" packets travel at 15.9, 17.9 and 19.8 s with sounds. The A packet at 15 s (n300) sits between the B and C boxes, so which path it is on is ambiguous. There is no arrival timeline, so the different times have to be inferred from playback order.
- **21–28 s** (n420, n559): every caller reads "2 attempts," the caption says "Keep further retries within a limit," and the frame is static for 7 s. No stop state or limit marker is shown.
- **Strengths**: large, highly legible type at native and 350 px. The captions match lessons.json exactly and claim nothing false. It fits the manifest's 28 s and its beat times.

## Concrete comparison

- **Burst**: candidate draws a labelled, uncounted hypothetical burst (5.9–8.6 s); published only mentions it in the caption.
- **Backoff vs jitter**: candidate separates fixed backoff ("Still aligned", 9.6 s) from random jitter (13 s) and warns that draws can match. Published merges both into fixed 2 s/4 s offsets.
- **Attempt counting**: candidate shows 1/2 → 2/2 counters at each real send; published only states "2 attempts" at 21 s.
- **No recovery**: candidate shows "Service still unavailable" (28.8 s) and a finite stop (30.6–32 s). Published says "may not recover" in the caption while the label still reads "overloaded."
- **Pacing**: candidate has no freeze outside the final hold, though 24.9–28.8 s partly repeats the arrivals already shown. Published has 21 of its 28 s static.
- **Density**: candidate has more on screen, but each beat lights one area. Published is calmer but leaves the reader to infer the mechanism from the captions.

## Objective faults

None reproducible in the candidate.

## Optional refinements (not blockers)

1. **Playhead crosses delay labels** (about 17–20 s; reproduced on frames 510, 516, 522, 528, 534, 540). The 2 px playhead passes through "2.1 s" and then "3.0 s." The text stays readable throughout. Drawing the line behind the bar label, or with a gap around the label, would remove the crossing. Size S.
2. **503 chips overlap box borders while moving** (frames 90 and 100). The chips briefly sit on the service box's top edge and B's bottom edge. They are readable and in motion; an offset path would keep them clear. Size S.
3. **Recap slack** (24.9–28.8 s). The pulse and replay of the arrivals repeat what 17.4–23 s already showed; trimming about 1–1.5 s would tighten the run time. Size S.
4. **Manifest integration** (coordinator, if adopted). lessons.json item 4 lists duration 28 with beats at 0/7/14/21. The candidate runs 35.6 s, and its matching events fall at about 0/1.4, 9.6–13, 15.4–23 and 28.8–31.2 s. The site renders beats as a transcript, so this does not break the video, but those duration and beat times should be updated when the candidate is registered.
