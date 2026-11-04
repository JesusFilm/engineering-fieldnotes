# Lesson 03 comparison: An average hides failure

Reviewer: fresh comparison reviewer (claude-opus-5-5). Inputs used before inspecting media: AGENTS.md, docs/editorial-workflow.md, the architecture-flow-video review reference, and `video/canary-deployments/sequence/lessons.json` item 3. I did not read author source, self-reviews, plans, ledgers, or other sessions.

| File | SHA256 (before = after) | Format |
|---|---|---|
| Candidate `motion-v2/03/video.mp4` | `4706a3fca44d982fa93b0230791464e1d85c9e6e7a52b29a5c8577e5719cd530` | 1080×1920, 30 fps, 1326 frames, 44.20 s, AAC 44.1 kHz stereo, moov before mdat |
| Published `public/lessons/canary-deployments/03.mp4` | `a8e22dc0e89d5a2e81e2b09f51377004d222aae890becd9c9ba242255928dcb7` | 1080×1920, 20 fps, 560 frames, 28.00 s, AAC 44.1 kHz stereo, moov before mdat |

Both files decode completely with no ffmpeg errors. Hashes were identical before and after review; see `scratch/03/sha_before.txt` and `sha_after.txt`.

## Verdict

Recommend the candidate. It passes with no reproducible objective fault. It shows every number in scope, keeps one unit per grid, and links the overall rate and the export rate through the same 40 failures. The published cut never shows the 40/100 = 40% export rate. It adds an unbriefed "CANDIDATE 1,000 requests" tier and holds still frames for up to 6.95 s.

Scores are reviewer judgements on a 1–5 scale. They are not measured learning outcomes and are separate from the factual checks below.

| Axis | Candidate | Published |
|---|---|---|
| Causal clarity | 4.5 | 2 |
| Accuracy | 5 | 2 |
| Pacing | 4 | 1.5 |
| Visual legibility | 4.5 | 3.5 |

## Candidate beat walkthrough (exact frame indices, 30 fps)

Every beat and boundary below was inspected as an individual frame at native 1080 width and at 350 px. Frames are in `scratch/03/c_native` and `c_350`. Settled content stays within x 74–912 and y 162–1858.

| Time | Frame | What is on screen |
|---|---|---|
| 0.0–1.8 s | 15, 57 | The title and "illustrative numbers" pill fade in. A 10×10 grid fills row by row, with one tick per row. |
| 4.3–5.2 s | 129, 156 | ALL REQUESTS shows 10,000, with a "= 100 requests" legend. |
| 6.6–9.2 s | 198–276 | One cell gets an orange ring, "v2" and "export" pills, and the label 100. |
| 9.2–10.3 s | 276, 309 | The split "other requests 9,900" and "9,900 + 100 = 10,000" appears. |
| 12.2–13.2 s | 366, 396 | 99 cells turn green, and "✓ succeeded" appears under 9,900. The export cell stays grey. |
| 14.0–15.5 s | 420, 465 | The export cell fills 40% red, labelled "40 ×", then "60 ✓". |
| 16.4–17.6 s | 492–528 | The breakdown dims, and a red "40" lifts out of the failed cell. |
| 18.6–19.3 s | 558, 579 | "40 / 10,000" appears, then 0.4%. |
| 20.4–24.0 s | 612–720 | A 0–1% bar fills to 40% of its width under "1% example alert". A "quiet" pill appears. |
| 25.4–27.2 s | 762–816 | The grid shrinks to the upper left, with "below 1% example alert". A ring pulses on the export cell. |
| 27.6–29.6 s | 830–888 | A grey 10×10 grid grows out of that cell, with "= 1 request", "v2" and "export". |
| 30.5–33.0 s | 915–990 | Check marks fill 60 cells and crosses fill 40 cells, labelled "60 ✓" and "40 ×". |
| 34.0–36.5 s | 1020–1095 | "40 / 100" and then "40%" appear in red. |
| 38.6–41.0 s | 1158–1230 | A "same 40" bracket joins both 40s. The 10,000 and 100 denominators are circled. |
| 42.6–44.2 s | 1278–1325 | The resolved state holds, then fades to black, which is a finite ending. |

## Accuracy check (candidate)

- **Units:** The overview has 100 cells at 100 requests each, for 10,000 requests. The export cell stands for 100 requests, and its expansion has 100 cells at 1 request each. The two grids never mix units.
- **Denominators:** The overall rate is 40/10,000 = 0.4%. The bar fill ends at 40% of the 0–1% track, from x 100 to 393 on a 730 px track in frame 720. The export rate is 40/100 = 40%. Both denominators are circled at 39–41 s.
- **No double counting:** 9,900 "other" requests succeed, and the export cell is 40 failed plus 60 succeeded. That makes 9,960 successes in total, although 9,960 is never shown as a number. The "same 40" bracket ties the numerators together, and the 40 appears once in each fraction.
- **Scope limits:** The video makes no causal claim, mentions no unique users, and shows no automated rollout action. The threshold is labelled "1% example alert" and "illustrative numbers", so it does not read as universal. No later mechanisms appear, and there are no caption paragraphs.

## Published cut (exact frame indices, 20 fps)

I inspected frames 0, 70, 138, 140, 141, 200, 249, 250, 260, 280, 290, 300, 320, 330, 419, 420, 421, 480, 500, 520, 540 and 559 at native size and 350 px. The cut shows three stacked boxes, ALL REQUESTS 10,000, CANDIDATE 1,000 and v2 EXPORTS 100, with a two-sentence caption under each lesson beat.

Its content faults are objective and appear on every frame of their span:

1. **The export rate never appears.** From 7.0 s (frame 140) to the end, the v2 EXPORTS box reads "40 failures" in place of "100 requests". The 100 denominator leaves the screen, and 40/100 = 40% never appears, even though it is the lesson's contrast.
2. **An unbriefed tier.** "CANDIDATE 1,000 requests" sits outside the scope. Between 14.25 and 16.55 s, the "40 FAILURES" chip passes through that box, which implies a third rate of 40/1,000 that the video never explains.
3. **Long static holds.** Frame differencing finds no motion for 6.95 s (0–6.95 s), 5.45 s (7.0–12.45 s), 4.4 s (16.55–20.95 s) and 3.95 s (21.0–24.95 s). The review reference treats more than about 3 s without change as a defect.
4. **No visual for the alert.** The 1% alert appears only in caption text. The 21 s beat changes only the caption and has no matching sound.

Its native text is readable, with box labels about 30 px tall. The cut starts on a static frame and ends at 28.0 s without a fade.

## Concrete comparison

- **Causal clarity:** The candidate shows where the 40 failures sit (14.0 s), how they shrink into 0.4% of all traffic (18.6–24.0 s), and how the same 40 become 40% once the export cell is expanded (27.6–36.5 s). The published cut asserts the same story in captions, and its boxes never compare two rates.
- **Accuracy:** The candidate covers the full scope in "Accuracy check (candidate)" above. The published cut omits the 40%, adds the CANDIDATE tier, and hides the export denominator.
- **Pacing:** The candidate's longest still is 2.37 s, at 22.6 s and again at 35.6 s. At 44.2 s it runs 16 s longer than the lesson's 28 s with its beats at 0, 7, 14 and 21 s. It covers those beats at roughly 0, 12, 18 and 21–41 s, and the extra time goes to the export expansion, which the lesson needs. The published cut follows the 7 s beat timing exactly but spends most of each beat still.
- **Legibility:** At 350 px, both cuts' main numbers are readable. The candidate's smallest settled labels, such as "below 1% example alert", "quiet", "= 1 request" and "same 40", have capitals about 35–40 px tall at native size. The published cut depends on two-line captions.

## Sound (analysed, not heard)

The soundtracks were analysed with volumedetect, a 50 ms RMS onset scan and spectrograms (`scratch/03/*_spec.png`). I did not listen to them.

- **Candidate:** Max −4.7 dB and mean −32.1 dB, so it does not clip. It has 48 onsets, each matched to a visible event: row ticks at 1.2–3.9 s, the cell selection at 4.4 s, the 40/60 split at 13.5 s, the 40 lift at 16.8 s, 0.4% at 18.5 s, the quiet pill at 22.4 s, and the expansion ticks at 27.5–31.8 s. The loudest window is at 35.3 s, as 40% appears, which matches the lesson's disruption. The 43.0 s fade is silent, which suits an exit.
- **Published:** Max −12.5 dB and mean −46.5 dB, with onsets only at 7.0, 14.0 and 16.0 s. The 21 s beat has no sound.

## Reproduction of an apparent defect (candidate)

At 17.0 s (frame 510), a red "40" overlaps the green grid cells. I extracted every frame from 498 to 522 (`scratch/03/fly_tile.png`). The label rises from the failed cell at frame 506 and clears the grid by frame 517, so the overlap lasts about 0.35 s of motion and settles cleanly. I classify it as a polish item.

## Blockers

None for the candidate.

## Optional improvements (candidate, not blockers)

1. **Start the lifted 40 clear of the grid** (16.9–17.2 s, frames 506–516, size S). Fade the label in below the cell so its text never crosses the cells.
2. **Remove the stranded legend** (18.5–24.9 s, size S). After the 10,000 header leaves, "= 100 requests" floats alone at the right. Keep the header or drop the legend with it.
3. **Tighten the reflow** (24.9–29.6 s, size M). Shrinking, pulsing and expanding take about 4.7 s. Overlapping the shrink and expand would bring the cut closer to the lesson's length without losing the causal link.
4. **Update the lesson metadata before promotion** (integration, size S). `lessons.json` item 3 states 28 s with beats at 0, 7, 14 and 21 s. The candidate's beats fall at roughly 0, 12, 18 and 21–41 s, so the beat times and duration need updating if they drive any synced text. This does not change the encoded file.

