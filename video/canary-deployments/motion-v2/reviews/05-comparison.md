# Canary deployments lesson 05: Abort and verify recovery, comparison review

Reviewer: fresh comparison reviewer (claude-opus-5-5). I reviewed only the encoded files, the lesson item 5 text, the editorial workflow and the post-production review guide. I read no author source, self-review, plan, ledger or prior review before or during this inspection.

| | Candidate | Control |
|---|---|---|
| File | `video/canary-deployments/motion-v2/05/video.mp4` | `public/lessons/canary-deployments/05.mp4` |
| SHA256 before and after | `d6c4199b389ae298fae0c4c95fbef14508f8808220cad431b6b0b8633d0a5075` (unchanged) | `798740086144d74b2fe2f0669f2545549614a465581435edb76b3752ff36cce2` (unchanged) |
| Video | H.264 1080x1920 yuv420p, 30 fps, 1215 frames, 40.5 s | H.264 1080x1920 yuv420p, 20 fps, 560 frames, 28.0 s |
| Audio | AAC 44.1 kHz stereo, max -5.9 dB, mean -32.2 dB | AAC 44.1 kHz stereo, max -13.3 dB, mean -43.9 dB |
| Streaming | moov before mdat (faststart) | moov before mdat (faststart) |
| Full decode | clean, no errors | clean, no errors |

**Verdict: the candidate passes, and I recommend it over the control.** I found no reproducible objective fault in the candidate. Its remaining issues are optional refinements.

Audio was **analysed only, not heard**. The analysis used volumedetect, silencedetect at -45 dB, a 50 ms RMS envelope and onset alignment against frame-difference peaks.

## Method

I extracted every frame by exact index with `select=eq(n,N)`. Frames sampled at native 1080 and at 350 px width: candidate frames 15, 89, 98, 100–116, 180–200, 206–215, 245–255, 265–280, 326–335, 340, 389–398, 400–402, 435–470, 530–560, 640, 700, 800–814, 830, 866–875, 900, 914–922, 940–1056, 1100, 1170–1214. Control frames 10, 70, 100–116, 135–150, 180, 275–300, 360, 410–430, 450, 500–559. I also made 1 fps contact sheets of both files. For timing, I computed a grayscale frame-difference timeline to find static spans and transitions. Every apparent defect I checked against neighbouring frame indices, including the pulse rings at 108/112/116, 806/810/814 and 1030/1036/1042, plus the share-bar label from 280 to 1190. Scratch evidence is in `reviews/scratch/05/`.

## Candidate, beat by beat

- **0–3.1 s, failure is observed.** The release check rows start ghosted. At 3.1 s (frames 89→98), FAIL appears with `v2 export errors 40/100` in red against `v1 export errors 0/900` in green. A red ring pulses on v2, and the label changes to "v2 failed check". The 100/900 split matches the 10% share shown on the bar, and the v1 baseline shows the failure belongs to the candidate. This is the loudest moment in the file (-14.6 dB RMS at 3.1 s), which suits the disruption.
- **7.0 s, expansion stops.** A chevron lands on the 25% tick, 25% and 50% are struck through in red, and an orange HOLD badge appears at 10%. A sound onset at 7.0 s matches it.
- **8.35–11.1 s, new requests go to the control.** The router first shows `target: v2 0%` (8.35 s), then `applying…` (frame 280), then `observed: new → v1` (frame 340). Separating the intended setting from the observed result is the clearest point in either cut. The v2 label gains `new: 0`, while `in flight: 1` stays on the busy v2 slot. New packets visibly travel to v1 (frames 340, 400).
- **13.1 s, in-flight work is not cancelled.** The in-flight request finishes as `1 finished`, and `Shared DB v2 writes` steps from 11 to 12 with an orange ring and a sound onset at 13.1 s. This shows motion that rerouting neither cancels in-flight work nor undoes completed writes.
- **14.7–26.85 s, recovery is verified from fresh observations.** The release check panel is replaced by a dashed `Healthy?` panel whose rows read only "—" (frame 470). A five-segment `fresh n/5 min` meter fills (frames 530–700), and results appear only after the full window: `Errors 0/10,000`, then `Exports valid 1,000/1,000`, then `Latency (95%) 180 ms` against "need ≤ 250 ms". This teaches "do not assume abort means healthy" without a caption.
- **26.85 s, the service is confirmed.** The panel turns solid green, `Service OK · observed 5 min` (frame 830). The router and share bar dim so attention moves to the remaining risk.
- **29.0–32.2 s, data is a separate concern.** The DB turns orange with `12 · kept` (29.0 s), then adds `v1 ↔ v2 schema · unverified ?` with a dotted v1–DB link (30.6 s), then changes to `12 · repair?` with a dashed border (32.2 s, frame 1100). The green service panel sits beside the unresolved data panel, which covers the takeaway: rerouting does not undo writes or guarantee schema compatibility. The video shows no rollback or repair mechanism.
- **32.2–40.5 s, resolved hold and fade.** v1 keeps serving packets while the final state holds for about 7.5 s. Everything except the title fades from 39.7 s, and frames 1205–1214 show the title only. The ending is finite and the blank tail lasts about 0.3 s.

**Accuracy.** Every value is fictional and labelled `Illustrative values · time compressed` on every frame. "Service OK" appears only after observed results and never as an automatic outcome. The v2 servers stay running and idle, and nothing claims a real deployment, a guaranteed recovery or automatic data repair. The video contains no unrelated later mechanism, explanatory paragraph or decorative subtitle.

**Sync and sound (analysed).** Sound onsets line up within a few frames with every major visible event: 3.1, 7.0, 8.35, 11.1, 13.1, 14.7, 26.85, 29.0, 30.6, 32.2 and 33.2 s. The quieter onsets between them match packet arrivals. Gaps between sounds never exceed about 2.2 s (35.2–37.4 s). The highest peak is -5.9 dB, so nothing clips.

**Pacing.** The frame-difference timeline shows no static run of 1.5 s or longer before the final 0.25 s. At 40.5 s the cut is long for four beats. The fresh-window fill from 14.7 to 26.85 s takes about 12 s, and the final hold takes about 7.5 s. Both stretches have continuous motion, so I treat the length as an optional refinement.

**Legibility.** At native 1080, primary labels measure about 40–50 px and secondary grey qualifiers ("need 0", "need ≤ 250 ms", `observed: new → v1`) about 32–36 px. Nothing is clipped or off stage, and no text overlaps other text in any frame I inspected, including the busiest frame (1100). At 350 px the headings and values read clearly. The grey qualifiers and the `Illustrative values` footer are small, roughly 10–12 px, but still legible. Pulse rings cross "v2 failed check" (frames 108–116), "Service OK" (810–814) and the DB edge (402). Each ring is thin, fades within about 0.3 s and leaves the text readable in neighbouring frames, so I do not count it as a defect.

## Control, beat by beat

- **0–7 s.** `CANDIDATE v2 · promotion stopped` sits in a red box from frame 0. The video never shows the failing check or any evidence of failure, so the failure exists only in the on-screen caption, "The candidate fails the release check. Stop increasing its share." After the first sound ends at 0.18 s, silence runs to 7.0 s. Only faint dotted-line motion appears.
- **7–14 s.** A `NEW REQUESTS` chip moves from the router toward v1 (7–9 s, with sounds at 7.0 and 9.0), and the v2 box changes to `0% new traffic`. The text is clear, but no requests visibly flow and no in-flight work is shown. The screen holds still from 9.75 to 12.5 s.
- **14–21 s.** A `RESULTS` chip moves from v1 to the recovery check (sounds at 14.0 and 16.0), and an unlabelled progress bar fills. No metric or threshold is shown, so the viewer cannot see what a healthy observation looks like. The screen holds still from 16.65 to 19.3 s.
- **21–28 s.** The recovery check turns orange with `verify recovery`, and the caption says "Data changes may need separate repair." The video never reaches a confirmed state. The data caveat appears only in the caption, and no database is drawn. The screen holds still from 22.15 to 25.0 s, and the last sound plays at 21.0 s, leaving 7 s of silence to the end.

The control makes no false claim and has no clipping or overlap. Its static spans stay just under the 3 s threshold, so they count as weak pacing rather than a hard defect. As a teaching piece, though, its mechanism lives in two-line subtitle paragraphs that repeat the lesson text, which the brief asks to avoid. With the words ignored, a viewer could not explain why recovery needs verifying or what remains unresolved after the abort.

## Scores (reviewer judgements, 1–5; not measured learning outcomes)

| Dimension | Candidate | Control | Main evidence |
|---|---|---|---|
| Causal clarity | 5 | 2 | Candidate: failure with a v1 baseline (3.1 s), target → applying → observed (8.35–11 s), in-flight finish and write 11→12 (13.1 s), observation window (14.7–26.85 s). Control: the mechanism is carried by captions and chips. |
| Accuracy | 5 | 3 | Candidate covers every scope point and shows the data and schema risk directly. Control is correct but never shows failure evidence, observations, in-flight work or data. |
| Pacing | 4 | 2 | Candidate has continuous change but runs 40.5 s, with a 12 s window fill and a 7.5 s end hold. Control repeats static spans of about 2.8 s and is silent from 0.18–7.0 s and 21–28 s. |
| Visual legibility | 4 | 4 | Candidate is dense but well ordered, with small grey qualifiers at 350 px. Control uses large, sparse text with small chip text. |

## Concrete advantages and disadvantages

The candidate's advantages are:

- It shows the failure as data, 40/100 on v2 against 0/900 on v1, where the control only asserts it.
- It separates the router's target, applying and observed states, which teaches the brief's point about verifying from fresh observations at the traffic layer as well.
- It shows that rerouting leaves in-flight work running and keeps completed writes, through `in flight: 1 → 1 finished` and the write count moving from 11 to 12.
- It contrasts `Service OK` with `repair?` and an unverified schema, so the takeaway appears on screen without a caption.

The candidate's disadvantages are its length (40.5 s against the lesson's 28 s), higher density, and small secondary text at phone width.

The control's advantages are its short runtime, large type and minimal clutter. Its disadvantages are that it depends on captions, never shows observations or a confirmed result, has long silent stretches, and puts the data caveat only in text.

## Blockers

None. I found no reproducible objective fault in the candidate.

## Optional improvements (not blockers)

1. **Share label after the abort** (9.3–39.7 s, size S). Saw: after the bar empties, the 10% tick label stays orange, the colour it took for HOLD, while the bar shows 0. Change: return the 10% label to grey once the bar empties, or mark it as the step held before the abort. Effect: avoids a brief reading that v2 still holds 10%.
2. **Bar and router order** (9.3–11.1 s, size S). Saw: the v2 share bar drops to 0 while the router still shows `applying…`. Change: empty the bar when the router reports `observed`. Effect: keeps the rule that a state counts only once observed.
3. **Trim the observation window and end hold** (14.7–26.85 s and 32.2–39.7 s, size S). Saw: about 12 s of fill and 7.5 s of hold with no new information. Change: cut about 3 s and 2 s respectively. Effect: brings the file closer to the lesson length while keeping the deliberate wait.
4. **Phone-width qualifiers** (whole video, size S). Saw: "need …" qualifiers and the footer measure about 10–12 px at 350 px. Change: increase them slightly or raise their contrast. Effect: easier reading on a phone.
5. **Ring over "Service OK"** (27.0 s, frames 806–814, size S). Saw: the confirmation ring briefly crosses the heading. Change: centre the ring on the panel border or the check icons. Effect: a cleaner confirmation moment.
6. **Integration note for the coordinator.** lessons.json item 5 gives a duration of 28 s with beat times 0, 7, 14 and 21. The candidate's beats land at about 0–3.1, 7–13.1, 14.7–26.85 and 26.85–32.2 s across 40.5 s. If the candidate is promoted, update the lesson metadata and beat timing to match the file. This concerns metadata only, so I make no media change for it.

