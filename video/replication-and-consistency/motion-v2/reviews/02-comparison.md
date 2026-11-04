# Lesson 02 "A replica can lag": encoded comparison

Reviewer: fresh comparison session (claude-opus-5-5), independent of the author and planners. Before this review I read only AGENTS.md, docs/editorial-workflow.md, the skill's references/review.md, and lessons.json item 2. I did not open the candidate's scene source, beat sheet, self-review, verification file, plans or ledgers.

| | Candidate (motion-v2/02/video.mp4) | Original (public/lessons/replication-and-consistency/02.mp4) |
|---|---|---|
| SHA256 before and after review | 4230b9ad141a6e28681db1b83b8689a05cae0f17a5dbafe8ba1e8ee30c70da6c (unchanged) | cdb1a648d6f0253d1b2ce724765ed90fdbc6c475292770f33a249897a25e3d76 (unchanged) |
| Format | 1080x1920 H.264, 30 fps, 38.0 s, 1140 frames; AAC 44.1 kHz stereo | 1080x1920 H.264, 20 fps, 28.0 s, 560 frames; AAC 44.1 kHz stereo |
| Full decode | no errors | no errors |
| Streaming | moov before mdat (faststart) | moov before mdat |
| Audio levels | max -6.6 dB, mean -34.9 dB | max -12.5 dB, mean -44.2 dB |

The audio verdicts below come from volumedetect and silencedetect timings matched against frames. I did not listen to either file.

## Method

I took 350px frames at 1 s intervals from both files (scratch/02/c350, o350, contact sheets c_sheet.png and o_sheet.png). I added exact 350px frames at every candidate sound onset (cbeat/) and at mid-flight and boundary moments (cmid/), and full 1080 frames at 5.9, 17.3 and 37.9 s (candidate) and 8 and 20 s (original). Freezedetect (n=0.0005, d=1.5 s) measured still stretches. One suspected fault, a lone arrowhead at 5.9 s, was checked again using frame-index selection (alt/save_arrow_n177-220.png).

## What each cut shows

**Candidate.** This is a sequence diagram with three lifelines: primary, app and replica, each topped by a state box showing a status and a revision.

- 0–3.5 s: the boxes fade in, then each actor is highlighted with a chime (1.6, 2.5, 3.4 s). Primary and replica both read "draft v7".
- 5.8–7.8 s: the app's write counter goes from 0 to 1, and a "save v8" message travels from app to primary.
- 8.6 s: the primary changes to "ready v8" with a green outline.
- 9.8–10.2 s: an "ok · v8" ack travels back to the app.
- 10.9 s: the replica's "draft v7" turns orange and a "behind" label appears.
- 14.6–16.6 s: a "read R42" message travels from app to replica.
- 17.2–18.8 s: "ok · v7" returns, with "ok" in green and "v7" in orange.
- 23–28.3 s: the primary's v8 and the replica's v7 are re-highlighted, an orange ≠ bracket is drawn on the app lifeline between the two answers, and the app box pulses.
- 29.6 s onward: the frame holds still until 38 s.

**Original.** Three stacked boxes (APPLICATION, PRIMARY revision 8, REPLICA revision 7) sit above a caption that changes at each lesson beat.

- 0–7 s: the frame is completely still.
- 7–9 s: a READ chip moves from the application to the replica along a dotted path on the right.
- 14–16 s: a v7 chip returns, and the application box turns orange with "observed v7".
- 16.5–28 s: only the caption changes.

## Scores (1–5)

| Axis | Candidate | Original |
|---|---|---|
| Causal clarity | 5 | 2 |
| Accuracy | 5 | 4 |
| Pace | 3 | 2 |
| Visual legibility | 5 | 4 |
| Useful variety | 4 | 2 |

These scores are judgements about teaching. They are recorded separately from the factual checks in the first table.

**Causal clarity.** The candidate shows the whole causal chain without words. The save goes out and is acknowledged (7.0–10.2 s) before the read is sent (14.6 s), the read returns "ok" with an orange v7 (17.2–18.8 s), and the ≠ bracket at 26.7 s marks the two answers to the same app as conflicting. The original never shows the save or its ack. Viewers learn that revision 8 was saved only from the caption over a still frame (0–7 s). As a result, its main point, "not a failed write", rests on text alone.

**Accuracy.** Both cuts are correct for asynchronous replication: the primary acknowledges v8, the replica still serves v7, and the read succeeds. The candidate makes "successful but stale" visible by colouring "ok" green and "v7" orange in the response chip. Its "draft/ready" status gives the two revisions visibly different content, which is a useful touch. The original is accurate, but it states success only in the caption.

**Pace.** The candidate stretches the 28 s lesson to 38 s, which is allowed and illustrative. It has a 4.7 s still hold at 18.3–23.0 s after the stale result lands and an 8.4 s silent end hold at 29.6–38 s. Both are deliberate holds after a beat lands, so neither is a defect, but the end hold is long. The original opens with 7 s of stillness and offers nothing new to look at between 16.5 and 28 s.

**Legibility.** In the candidate at 1080 wide, the main text measures 40–70px. The smallest label, the grey "writes", is about 30px and still readable at 350px. Nothing overlaps or clips, and the title band stays clear. In the original, the box sub-labels are about 36px and the caption is large. The traveling READ and v7 chips are small at 350px (about 8px text) but readable.

**Useful variety.** The candidate has about 16 distinct visible events, each paired with a sound onset. The original has four.

## Concrete advantages

- **Candidate, 7.0–10.2 s:** the viewer sees the save acknowledged. The original has no visual counterpart, so "not a failed write" is only asserted.
- **Candidate, 17.2–18.8 s:** the result chip reads "ok · v7" with a green ok and an orange v7, which is success and staleness in one glyph. The original returns a bare "v7" chip at 14–16 s.
- **Candidate, 26.7–28.3 s:** the ≠ bracket sits on the app's own lifeline, between "ok · v8" and "ok · v7", so the contradiction is located at the reader that experiences it. The original's orange "observed v7" box at 16 s conveys this more weakly.
- **Original:** it is shorter and denser in prose. Its captions match the lesson text exactly, which helps viewers who read along. This is its only clear advantage.

## Defects

I found no objective defects in the candidate. I checked for:

- unreadable, clipped or overlapping text
- elements off the stage or inside the title band
- leftover state from earlier beats
- visible events without sound, or sound onsets without a visible event
- audio clipping
- unexplained still stretches outside holds after a beat lands

Looping is not required.

The lone arrowhead at 5.9 s was confirmed by frame-index extraction as the first frame of the save arrow being drawn from app to primary. It is not a fault.

## Optional improvements

1. **Shorten the end hold** (29.6–38 s, size S). An 8.4 s silent freeze is longer than the final state needs. Holding about 4 s would bring the cut closer to the lesson length without losing the resolved state.
2. **Trim the hold after the stale result** (18.3–23.0 s, size S). Shortening this 4.7 s still stretch to 2.5–3 s would move the ≠ comparison closer to the v7 result it explains.
3. **Clarify the app's "writes" counter** (5.8 s onward, size S). It changes once and then carries no meaning in the stale-read beat. Using that slot for what the app last observed (v8, then v7) would put the contradiction in the app box as well as on the lifeline.
4. **Consider the static "async copy" bracket** (whole clip, size S). It never animates. A faint, slow pulse would hint that the copy is still pending, with no catch-up required. Alternatively, dropping it would reduce density.

## Recommendation

The candidate passes, and on this evidence it is the stronger cut. It teaches a stale read that succeeds after a successful save through motion and timing. The original depends on captions for the key point. Both remain available to the reader, and promoting either to the recommended cut is a human editorial decision.
