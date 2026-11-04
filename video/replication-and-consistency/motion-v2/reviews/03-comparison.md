# Lesson 03 comparison: "Check the revision you need"

Reviewer: fresh independent comparison session. I inspected only the encoded files, the lesson spec (`video/replication-and-consistency/sequence/lessons.json` item 3), the repository workflow and the post-production review reference. I did not open the candidate's beat sheet, self-review, scene source, verification record, plans, other comparison files or the other sessions. While checking how the site uses beat times, a search result incidentally showed one line of `scripts/motion_production_driver.js` (a generic production prompt). It says nothing about this cut and did not affect the scores.

| | Candidate | Published |
|---|---|---|
| File | `video/replication-and-consistency/motion-v2/03/video.mp4` | `public/lessons/replication-and-consistency/03.mp4` |
| SHA256 before | `9108c253865984dc2c44b2875d07835846ea42b34851d053ada90b35018f2479` | `38bd195382e4fbcae21d577ff1ed864ae79a30a1fe187c5992d0ef3de7d2febd` |
| SHA256 after | unchanged (same) | unchanged (same) |
| Format | 1080×1920, 30 fps, 1065 frames, 35.5 s, H.264 + AAC stereo | 1080×1920, 20 fps, 560 frames, 28.0 s, H.264 + AAC stereo |
| Full decode | clean, no errors | clean, no errors |
| Faststart (moov before mdat) | yes | yes |
| Audio | max −10.1 dB, mean −36.3 dB, 19 onsets | max −10.6 dB, mean −41.5 dB, 6 onsets |

Audio was **analysed only (volumedetect, RMS onsets, spectrogram), not listened to.**

## Verdict

**Candidate: pass. I recommend it over the published cut.** It shows the lesson's decision as a picture: a "need 8" slot and a "seen" slot. A successful replica response (`ok · rev 7`) lands in "seen" as 8 ≠ 7 and stays amber "unverified". A fresh primary read (`ok · rev 8`) then produces 8 = 8 "match". The published cut tells the same story mostly through captions and box text, with long static stretches. No reproducible objective defect was found in the candidate. The published cut also has no objective fault I would call blocking, so it can remain available to readers as an alternative.

## Scope and accuracy check (candidate)

- Expected application revision 8: "need 8" from 1.0 s, held for the whole video.
- Stale but successful replica response 7 is insufficient: the `ok · rev 7` chip arrives at 7.4 s and its 7 travels into "seen" at about 9.0–9.4 s. At 10.5 s the frame shows 8 ≠ 7 with amber "unverified". The "ok" on the chip makes clear the query succeeded and was still not enough.
- Fresh primary query returns 8 and matches: "fresh read R42" under primary from 18.8 s, `ok · rev 8` at 20.8 s, 8 enters "seen" at about 22.6 s, "=" at 23.8 s, green "match" at 26.8 s.
- No overclaim. Nothing on screen implies every primary read is universally fresh, and it presents no catch-up, received-vs-applied or failover material. The demand is scoped to "this check needs 8". The video also never says replicas are always stale. The rev 7 chip dims after it is rejected and is not deleted, which honestly keeps the observation on record.

## Beat and boundary inspection

I took 1 fps frames at 350 px width (contact sheets `scratch/03/a_sheet.png` and `b_sheet.png`), full-resolution 1080 frames near each beat midpoint and the busiest frames, and frame-accurate extraction (select by frame number) at the boundaries listed below.

Candidate:

- 0–1.5 s: fade-in. Title, "verify R42", "need 8", empty "seen", replica/primary labels.
- 1.5–5.4 s: replica selected (underline), "read R42" with a growing progress underline (5.6–6.5 s). Under frame extraction this underline first looks like a stray dash at about 5.5 s. Frames at 5.6/5.9/6.2/6.5 s show it is the request-in-flight bar, and the same bar recurs under "fresh read R42" at 18.9–19.2 s. Not a fault.
- 7.4 s: `ok · rev 7` chip arrives (loudest onset class, −18 dB RMS).
- 9.0–9.4 s: the 7 lifts out of the chip and travels a dotted path to "seen". At 9.4 s the glyph briefly overlaps the chip border. That is the departure moment of a moving value, it lasts a few frames, and I confirmed it with seek-based and frame-number extraction. Not a fault.
- 10.5–14.8 s: 8 ≠ 7, amber brackets and "unverified". Then "seen" clears, the rev 7 chip dims, and "unverified" stays amber.
- 16.6–20.8 s: primary selected, fresh read with progress bar, `ok · rev 8` chip arrives.
- 22.6–26.8 s: 8 travels into "seen", "=" fades in, then green brackets and "match".
- 30.0 s: both chips glow briefly. 31.6 s: both digits glow. Each has a matching sound onset, so there is no sound without a visible event.
- 33.4–35.5 s: final hold on the resolved state (finite ending).
- Longest static run outside the final hold: 27.2–30.03 s (about 2.8 s, right after the match lands). Others: 1.47–3.23, 3.77–5.43, 17.27–18.83, 21.03–22.63 s. None exceeds 3 s.
- Legibility at 1080: "verify R42", "need/seen" and "YOU NEED" are about 28–32 px tall, the digits about 100 px, and chip text about 30 px. No clipping, overlap or title-band intrusion. All text is readable at 350 px, the smallest labels faintly so.

Published:

- 0–2 s: three boxes (APPLICATION expects revision 8, PRIMARY revision 8, REPLICA revision 7). A `v7` chip travels up the right connector. At about 1 s it sits beside PRIMARY and could briefly be read as coming from the primary. At 2 s the application turns red "v7 ≠ expected v8".
- 7–9 s: READ chip descends to the primary. 14–16 s: REVISION 8 chip rises. At about 17 s the application turns green "v8 = expected v8".
- 21 s: caption change only, with no motion and no sound onset (onsets at 0, 2, 7, 9, 14, 16 s only).
- Static runs: 2.70–6.55, 9.70–12.50, 16.70–21.00 and 21.45–25.00 s. From about 17 s to the end, nothing moves except the caption swap.
- The replica's "success" is never shown. The lesson's point that a *successful* query is not enough exists only in the final caption.

## Scores (1–5)

| Axis | Candidate | Published | Evidence |
|---|---|---|---|
| Causal clarity | 4.5 | 3.5 | Candidate: the need/seen comparator turns "check the revision" into one visible test (10.5 s ≠, 26.8 s match), and `ok · rev 7` shows success plus insufficiency without words. Published: the boxes state the result as text ("v7 ≠ expected v8"). The stale chip passes PRIMARY at 1 s. Success is never visualised. |
| Accuracy | 4.5 | 4 | Both stay inside scope. The candidate keeps the rejected rev 7 observation visible but dimmed. The published static "PRIMARY revision 8 / REPLICA revision 7" labels are correct for the illustration but give away the answer before any read happens. |
| Pace | 4 | 2.5 | Candidate: steady events with static runs of 3 s or less. The opening (1.5–5.4 s) and the recap glows (30–32 s) are slightly slack at 35.5 s total. Published: roughly 16 of 28 s are static, including 8.3 s from 16.7 s on. |
| Visual legibility | 4.5 | 4 | Candidate: large digits, colour-coded brackets, one focal point per beat. The lower third of the frame is empty. Published: readable captions and box text, but the meaning sits in small state lines inside the boxes. |
| Useful variety | 4.5 | 2.5 | Candidate: travelling values, progress bars, chip arrival, ≠/= states, 19 distinct sound events matched to visuals. Published: three-box template, 6 onsets, and beat 4 is a caption swap with no sound. |

Concrete advantages of the candidate: the viewer sees the comparison (need vs seen) rather than reading its result; the "ok" chip makes "a successful query alone is not enough" visible; every sound has a matching visual. Concrete advantages of the published cut: shorter (28 s), and the three named nodes make the replica/primary topology explicit at a glance; the captions carry the lesson's wording.

## Objective defects

None found in the candidate. I re-extracted the apparent artefacts (dash at about 5.5 s, glyph over chip border at about 9.4 s, late sounds at 26.8/30.0/31.6 s) and each turned out to be intended motion with a matching visual.

Integration note (metadata, not a video fault): `lessons.json` item 3 lists `duration: 28` and beat times 0/7/14/21. The site renders beats as a static transcript, but `scripts/check_sequences.py` asserts the duration matches. If the candidate is promoted, the duration needs to become 35.5 and the beat times about 0 / 7.4 / 16.6 / 22.6.

## Optional improvements (not blockers)

1. **"R42" could be read as a revision** (0–35.5 s, S). Saw: "verify R42", "read R42" next to revision numbers 7 and 8. Change: rename the record id to something that does not start with R, or drop it. Effect: removes a competing number from the revision comparison.
2. **Show where "need 8" comes from** (0–2 s, M). Saw: "need 8" appears with no cause, and the primary is never shown holding 8 before the read. Change: open with a brief commit of revision 8 to the primary that sets "need 8". Effect: ties the expectation to the application's own saved change, within the one-writer illustration.
3. **Tighten the opening** (1.5–5.4 s, S). Saw: about 4 s of small labelling events before the replica read. Change: trim about 1.5–2 s. Effect: the stale response arrives sooner.
4. **Trim the recap glows** (30–33.4 s, S). Saw: chip and digit glows after the match has already landed. Change: shorten or drop them and hold about 2 s on the match. Effect: about 30 s total, with the ending landing on the decision.
5. **Use the empty lower third** (whole video, M). Saw: content ends near y≈1300 of 1920. Change: scale up or centre the stage vertically. Effect: larger labels at phone width.
6. **Title split** (0–35.5 s, S). Saw: "Check the revision" / small-caps "YOU NEED" reads like a separate label. Change: keep the title on one or two equal-weight lines. Effect: the title reads as one phrase.

