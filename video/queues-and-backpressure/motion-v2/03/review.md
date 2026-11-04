# A backlog grows review (render 3)

Reviewed from encoded frames of `video.mp4` (sha256 `c51105bf…90ddd`) at 1080 and 350 px, the contact sheet, the spectrogram, and levels. Audio was analysed, not listened to. These checks cover this cut's scope; passing them does not establish universal correctness.

## Fixed before handover

- 9.0–9.35, 17.0–17.35, 25.0–25.35 s, render 2: at each arrival `waiting` went up 0.35 s before `arrived`, briefly showing `arrived 1 · waiting 1` while A was also running, which is an impossible count. Both counters now change in the same frame, confirmed on encoded 350 px frames at 9.05, 17.05, and 25.05 s.
- Whole video, render 1: the `producer` label nearly touched its card's edges. The card is 14 px wider.

Defect pass on render 3: text is at least 36 px at 1080 wide; the 350 px frames at 13.0 and 29.1 s and the arrival boundaries read cleanly. The 30 boundary and beat frames show no overlaps. A stays in the worker with `running A` in every frame, and B, C, D never move toward it. `completed` reads 0 throughout, and the chart rises only when a chip lands. Every visible event has a cue. Peak is -6.0 dBFS with no clipping. The full decode reports 0 errors, and moov comes before mdat. The holds at 4–7, 11.8–15, 19.5–23, and 30–37.6 are deliberate, and the ending is finite.

## Suggested improvements

1. **The top row is compact** (whole video, size M). Saw: producer, queue, and worker share one 200 px band while the chart card takes 560 px, so the jobs are the smallest moving things. Change: give the pipeline row more height (taller lane, 52 px chips) and trim the chart's empty space above level 3. Effect: the line of waiting jobs reads first on a phone.
2. **Show elapsed time on the chart** (whole video, size S). Saw: the chart has no x-axis label, and its "now" dot is easy to miss. Change: a dim `now` tag riding the head dot. Effect: makes clear the line is a timeline, not a ranking of B, C, D.
3. **The waiting line could show waiting age** (beat 4, size M). Saw: B has been waiting longest, but nothing shows it. Change: a faint age bar under each waiting chip that grows while it waits. Effect: introduces the concept's advice to track oldest waiting age, without words.
4. **The worker's slowness is only a bar** (whole video, size S). Saw: the bar moves about 2 px per second, which is hard to see as motion at 350 px. Change: a subtle sweep inside the bar (plan A's activity sweep). Effect: the worker reads as busy rather than stalled.
5. **The ticks and arrivals blend** (beats 2–4, size S). Saw: the worker tick sits close to the arrival cues around each landing. Change: skip the work tick that falls within 0.5 s of an arrival. Effect: cleaner arrival moments.
6. **The final hold is long** (30–37.6 s, size S). Saw: about 7.5 s with only the chart head moving. Change: trim it to about 5 s if reviewers find it slack. Effect: tighter ending; the flat line at 3 still registers.

## Notes for the skill (optional)

- A `stepchart` primitive (count over time with labelled rises) would suit any lesson about depth, lag, or error budgets.
