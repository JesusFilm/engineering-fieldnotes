# Loop engineering — repeated evidence

Original author: anthropic/claude-fable-5-1, high reasoning. Revised by gpt-6-astra comparative review on 2026-10-19. The original beat sheet remains in `../../../reviews/comparisons/loop-engineering/original-sources/fable/beat-sheet.md`.

One mechanism: retain comparable observations, stop on a configured repeated-evidence limit, and hand off the trace. The first run contrasts a falling count and pass under a fixed suite; the second repeats the same normalized failure report a7. A flat count alone does not establish no progress. Three is an illustrative threshold.

| Time (seconds) | Movement | State change | Sound |
|---|---|---|---|
| 0.8–3.35 | EDIT 1 → fixed tests → 5 FAIL | First observation enters log | send E6, arrive C5, work, miss, arrive E5, store G5 |
| 4.2–7.2 | EDIT 2 → fixed tests → 2 FAIL | Shorter count bar and check | same cycle sounds, ack G6 |
| 7.6–11.15 | EDIT 3 → fixed tests → PASS | PASS log row and REVIEW verdict; ring dims | hit, store, ack, chime C6 |
| 11.35–13.55 | REVIEW log → human | Human receives patch for review; hold | send G5, deliver C6 at 12.05 |
| 13.55–15.05 | Whole stage fades out/in | Independent task; log clears; repeat limit 3 appears | deliberate transition |
| 15.35–17.9 | EDIT 1 → FAIL a7 | Log records 3 FAIL · a7 | cycle sounds |
| 18.75–21.75 | EDIT 2 → FAIL a7 | Same report; rows turn amber and warning appears | cycle sounds, thump |
| 22.15–25.15 | EDIT 3 → FAIL a7 | Third identical report; log shakes red | cycle sounds, stall alarm |
| 25.65–26.65 | Verdict appears; ring dims | REPEAT LIMIT; no fourth edit | thump at 25.65 |
| 26.55–27.25 | HAND OFF log → human | Human acknowledges receipt | send G5, chime C6 |
| 27.25–30.7667 | Hold then fade at 29.65 | Black loop boundary | deliberate final hold |

Original ring geometry and sound roles are retained. Log width is 560px, log text 36px and moving chips 34px; the log’s evidence persists at handoff. `variant.json` contains the accessible timeline and limitations. The MP4 contains 923 frames at 30fps; the source duration 30.75s rounds to 30.766667s of video.
