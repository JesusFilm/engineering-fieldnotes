# Lesson 05 "Bound the whole operation": comparison review

Reviewer: fresh independent comparison reviewer (claude-opus-5-5). Only the two encoded files, the lesson item and the review guides were read before inspection; no author source, self-review, plan, ledger or other session was opened.

| Cut | File | SHA256 (before and after review, unchanged) | Format |
|---|---|---|---|
| Candidate | `video/timeouts-and-retries/motion-v2/05/video.mp4` | `ca05dc0cd176dd8d276916c70356dd619ccdeb44353a5d691f7d3f0aaa75538b` | 1080x1920, 30 fps, 1302 frames, 43.4 s, AAC stereo 44.1 kHz, moov before mdat |
| Published | `public/lessons/timeouts-and-retries/05.mp4` | `c15a46b71482808105ea694b65b1de50703aa460ecad233f39c2ce77f989eb99` | 1080x1920, 20 fps, 560 frames, 28.0 s, AAC stereo 44.1 kHz, moov before mdat |

Both files decode end to end without errors.

## Verdict

The candidate passes, with no reproducible objective fault, and I recommend it over the published cut. It teaches the mechanism through the picture: a per-try ring with a 5 s limit sits beside a shared 0–12 s budget bar that never resets, and the gate visibly refuses a third try at zero. The published cut states the same arithmetic in captions, but its picture never shows the backoff, never separates the per-try limit from the shared deadline, and freezes for 5.45 s with no sign that simulated time is paused.

Scores are reviewer judgments (1–5), not measured learning outcomes.

| Criterion | Candidate (motion-v2) | Published |
|---|---|---|
| Causal clarity | 5 | 2 |
| Accuracy | 5 | 3 |
| Pacing | 4 | 2 |
| Visual legibility | 4 | 4 |

## Required checks (candidate)

Times are video time; exact frame indices (30 fps) are given where an edge matters.

- **Illustrative policy, zero overhead.** The subtitle "EXAMPLE POLICY · ZERO OVERHEAD" stays on screen throughout. At 2.5 s it shows "deadline = start + 12s / measured on a monotonic clock", and the bar is labelled 0–12s with a "deadline" marker. The numbers are presented as exact under zero overhead, and nothing claims they are universal.
- **Gate permits try 1.** At 5.0 s the gate glows with "12s left → go", and a dashed "try 1 · ≤5s" box appears.
- **Try 1 times out at 5, leaving 7.** The ring and the shared counter step together on frames 228/276/324/372 (1s/11s … 4s/8s). On frame 420 (14.0 s) both change in the same frame to a red 5s ring and "7s left" (frames 418–419 show 4s/8s; 420–421 show 5s/7s). "try 1 timed out" ends exactly at the 5 tick. At 16.0 s "12s − 5s = 7s left" appears.
- **2 s backoff leaves 5.** During "sleep 2s" (about 16.6–19.8 s) the ring is dimmed while only the shared counter falls: 6s left at frame 546 (18.2 s), 5s left at frame 594 (19.8 s). The blue segment fills 5→7 on the bar. At 20.3 s "7s − 2s = 5s left" appears; at 21.9 s the gate shows "5s left → go"; at 22.7 s "try 2 limit = min(5s, 5s left)" appears with "at most 5s, less any overhead".
- **Shared deadline is never reset.** From 24.4 s the label reads "whole operation · no reset". On restart the ring resets to 0s (frame 708, 23.6 s) while the shared counter stays at 5s left. This is the clearest picture of the per-attempt limit versus the shared deadline in either cut.
- **Try 2 is bounded and ends at the deadline.** The dashed "try 2 · ≤5s" box spans exactly 7→12. The counters step together on frames 828/876/924/972 (1s/4s … 4s/1s). On frame 1020 (34.0 s) the ring turns red at 5s, the counter turns red at "0s left", the bar border and the 12s tick turn red, and the box reads "try 2 timed out".
- **The gate rejects try 3.** At 36.0 s a request leaves the caller; at 36.3 s the gate turns red with "0s left → stop", and "try 3 refused ⊗" appears on the deadline line.
- **Unknown result with two timed-out tries.** At 38.0 s the result chip reads "result: unknown", with "2 tries, both timed out" and "remote work may continue" beneath it. CI status keeps a "?" from 7 s to the end. Nothing implies that a timeout stops remote work.
- **Explanatory holds pause simulated time, and the picture says so.** Every hold that freezes the clocks shows the "animation paused" badge (5.0–5.9 s, 14.0–16.5 s, 20.3–26 s, 34.5–36.5 s). Running stretches show "animation slowed": each simulated second takes 1.6 s of video, confirmed by the 1.6 s spacing of counter changes and ticks. After 38 s nothing is running, and the badge is removed.
- **Arithmetic.** 5 + 2 + 5 = 12; 12 − 5 = 7; 7 − 2 = 5; min(5, 5) = 5. Elapsed time plus time left equals 12 on every inspected counter frame: try 1 (n + (12 − n)) and try 2 (7 + n + (5 − n)).

## Frame inspection

I inspected native 1080 frames individually at 1, 2.5, 4, 5, 5.5, 7, 14, 15, 16, 18, 18.5, 21, 22, 22.5, 23, 24, 27, 33, 33.5, 35, 36, 39, 42 and 43 s, plus adjacent-frame stacks at 418–421 and 1010–1023. I also checked 350 px frames individually (5, 14.5, 22.5, 27, 35, 39 s and 2.5 s) and contact sheets at 2 s and 0.5 s spacing. Scratch evidence is in `reviews/scratch/05/`.

- **Legibility.** The smallest captions measure 23 px ("measured on a monotonic clock", no descenders) and 30 px ink height ("at most 5s, less any overhead", "remote work may continue"), which is about 28–32 px type at 1080 wide. At 350 px the counters, bar labels, try boxes and result chip read clearly. The grey secondary lines are small but readable. No text is clipped and nothing enters the title band.
- **Near-collision checked.** From 33.6 to 34.0 s (frames 1010–1020) the playhead triangle reaches the "deadline" label but leaves a gap of a few pixels, and it fades by frame 1023. There is no overlap.
- **Static stretches.** Measured at 108x192: 3.33–4.37, 15.1–16.17, 34.67–36.0 and 36.97–38.03 s (each ≈1.0–1.3 s), plus 38.47–41.67 s (3.2 s). The last is the deliberate hold on the resolved result, followed by a fade from 42.7 s to 43.4 s. The ending is finite and its padding is short.
- **No stale state.** Pause and slow badges change exactly at clock start and stop. The gate's green or red highlight clears after each check.

## Sound (analysed only, not heard)

I did not listen to either soundtrack. Everything below comes from 50 ms RMS onset analysis, a spectrogram, volumedetect and EBU R128 measurement.

- **Candidate levels.** Max −1.9 dB (true peak −2.0 dBFS), mean −32.5 dB; no clipping.
- **Every onset matches a visible event.** Box and timeline intros fall at 0.4, 1.4, 2.9 and 4.4 s. The gate check is at 4.85 s and the try 1 send at 5.6 s. Quiet ticks (≈ −39 dB) at 7.6/9.2/10.8/12.4 s fall on the counter changes. The try 1 timeout lands at 14.0 s (−15 dB). Sleep events are at 16.2, 18.2 and 19.8 s; the formula and gate events at 20.3, 21.4, 21.85, 22.7, 23.6, 24.35 and 25.45 s. Try 2 ticks fall at 27.6/29.2/30.8/32.4 s. The deadline lands at 34.0 s, the loudest broadband event (−12.7 dB). The try 3 send is at 35.8 s, the refusal at 36.3 s and the result at 38.0 s. I found no visible event without a sound, and no sound without a visible event. Silence from 38.9 s covers the result hold and fade.
- **Published levels.** Max −13.8 dB, mean −40.1 dB. There are 12 onsets, the loudest at 24.0 s (try 3 blocked), and 6.9 s of silence (7.1–14.0 s) that coincides with the visual freeze.

## Published cut, for comparison

- **Advantages.** The cut is short (28 s). Its large uppercase box labels and burned-in captions are easy to read. The gate's states ("12s remaining" → "7s remaining" → "5s remaining" → "0s: CLOSED" → "0s: TRY 3 blocked") and the caller's "2 timeouts; unknown" are correct.
- **Disadvantage: a long freeze.** From 7.05 to 12.5 s (5.45 s, frames 141–250) the picture does not change, and frames 180 and 220 are byte-identical in framemd5. No pause indicator explains why "7s remaining" holds while the caption describes elapsed time. This exceeds the guide's roughly 3 s static limit, and the soundtrack is silent over the same stretch.
- **Disadvantage: the picture omits the mechanism.** No per-try timer is drawn, so the 5 s limit exists only in the caption. The backoff is never shown; the gate jumps from 7s to 5s at 14.0 s. Try 2 appears only as a chip at 16.5 s, so nothing shows that it is bounded by the remaining time. The picture never makes "no reset" or "remote work may continue" explicit.
- **Disadvantage: one box layout throughout.** Because the same three-box stack is reused for every beat, motion carries little of the causality.

## Objective faults (candidate)

None reproduced.

## Optional refinements (not blockers)

1. **Tighten the pre-try-2 hold** (20.3–26.0 s, S). Seven events play inside one paused stretch of about 5.7 s. Cutting about 1.5 s, for example by revealing "no reset" together with the ring reset, would bring the total closer to 40 s without dropping a step.
2. **Make the paused request travel explicit** (5.5 s and 25.5 s, S). The request packet moves to CI status while the badge reads "animation paused". This matches zero overhead, but a viewer may wonder whether time is passing. A short gap before the slowed badge, or launching the packet as the clock starts, would remove the question.
3. **Raise the secondary caption contrast** (2.5 s, 22.7 s, 38.0 s, S). At 350 px, "measured on a monotonic clock", "at most 5s, less any overhead" and "remote work may continue" are dim grey. A slightly brighter grey would help phone reading without adding text.
4. **Give the playhead more room near the deadline label** (33.6–34.0 s, S). The playhead nearly touches "deadline"; a few pixels more clearance would help.

## Integration note

`lessons.json` item 5 currently describes the published cut: `duration` 28, with beats at 0/7/14/21 s. If this candidate is adopted, the coordinator will need to retime the beats to about 0, 5, 14, 20 and 34 s and change the duration to 43.4 s. This review did not edit that file.

