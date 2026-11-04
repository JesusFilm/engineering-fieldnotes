# Lesson 04 comparison: "Received is not applied"

Reviewer: fresh comparison session, claude-opus-5-5. I inspected only the encoded files, the lesson brief (`video/replication-and-consistency/sequence/lessons.json` item 4), `AGENTS.md`, `docs/editorial-workflow.md` and the architecture-flow-video `review.md`. I did not open author source, self-review, verification files, plans or other review sessions before or during the encoded inspection.

| Cut | File | SHA-256 (before and after review) |
| --- | --- | --- |
| Actual (motion-v2) | `video/replication-and-consistency/motion-v2/04/video.mp4` | `931f5326ff750eeb2c26ea8312b6984b5c2bd00c7de96a061fdb846694e878ba` |
| Published | `public/lessons/replication-and-consistency/04.mp4` | `b0d7f305a7d51d9b4f44b48df419d888f4e54042e07dbceeeb283e03a37face2` |

## Verdict

**pass.** The motion-v2 cut teaches the lesson mechanism more clearly and more accurately than the published cut. I found no reproducible objective defect. The remaining items are optional refinements, plus one integration note for whoever owns the shared lesson manifest.

## Encoded checks

| Check | Actual | Published |
| --- | --- | --- |
| Stream | H.264 1080×1920, 30 fps, 1041 frames; AAC 44.1 kHz stereo | H.264 1080×1920, 20 fps, 560 frames; AAC stereo |
| Duration | 34.70 s (video 34.700, audio 34.706) | 28.00 s |
| Full decode | clean, no errors | clean, no errors |
| Faststart (moov before mdat) | yes | yes |
| Peak / mean level | −9.5 dB / −38.7 dB | −12.4 dB / −44.0 dB |
| Sound onsets (PCM envelope) | about 20, each matched to a visible event | 5, at 0, 2, 7, 14 and 21 s |
| Longest freeze before the ending | 2.1 s (13.03–15.13) | 5.25 s (7.25–12.5), plus 4.3 s (2.7–7.0) |

I analysed the audio by level, spectrogram and onset timing. I did not listen to it.

Method: 1 fps full frames and 350 px contact sheets for both cuts; individual 350 px frames at matched beats; 1080 native crops at 0.5, 4.6, 5.5, 12.5, 14.5, 22.8, 24.0, 28.5 and 30.5 s; 4–10 fps strips around every boundary; an exact frame-index (`select=n`) extraction to reproduce the one suspected timing fault; frame-difference stillness scans; and pixel bounding boxes for the subtle changes at 15.1 s, 25.0 s and 33.2 s. Scratch evidence is in `reviews/scratch/04/`.

## What each cut shows

**Actual (motion-v2).** The primary lights and emits an `R42→8` record at 3.5 s. It travels a dotted path and lands in the third standby WAL slot at 5.4 s, with a ring and a sound. The orange "received" pointer slides onto that slot at 6.4–6.8 s, while the green "replayed" pointer stays on slot two and the visible row still reads `R42 7`. At 10.05 s a query panel opens. An `R42?` chip travels to the row (10.5–11.1 s), the row flashes (11.3 s), a `7` chip returns, and `SELECT revision 7` lands at 12.55 s. A faint glow and tick on the stalled "replayed" chevron at 15.05 s marks that replay is still behind. From 18.1 s to 20.55 s the slot-three underline fills with five progress ticks, and the slot turns green. The "replayed" pointer moves onto it, an arrow drops to the row, and the row ripples at 21.9 s (the loudest sound in the cut). The row then reads `8` from about 22.4 s. The first query's `7` stays as history and dims at 27.8 s. A second query sends `R42?` at 26.9–27.8 s and returns `8` at 29.05 s. The resolved state holds until 33.3 s, then the stage fades out under the title.

**Published.** Two text boxes: `PRIMARY revision 8` and `REPLICA revision 7`. A `WAL v8` chip drops between them (0–2 s), and the replica label changes to "received v8", then "received v8; reads v7" (about 7 s). A thin progress bar fills inside the replica box from about 12.5 s to 19 s. At 21 s the box turns green and reads "query sees v8". Burned-in captions repeat the four lesson beats at their manifest times.

## Scores (1–5)

| Axis | Actual | Published | Evidence |
| --- | --- | --- | --- |
| Causal clarity | 5 | 3 | The actual cut makes receipt and replay two separate pointers on the same WAL slot (14.5 s frame: received on slot 3, replayed on slot 2, row `7`). Replay visibly drives the row change (arrow and ripple at 21.9 s). In the published cut, receipt and apply exist only as label text inside one box (7.5 s, 22.5 s). |
| Accuracy | 5 | 4 | The actual cut shows a query reading 7 while the record is already received (12.55 s), then a fresh query after replay reading 8 (29.05 s). It shows no primary acknowledgement and claims no durability, so it implies neither "receipt = durable" nor "ack = apply". The subtitle "PostgreSQL hot standby" correctly scopes queries on a standby. The published cut is also correct but abstract. Its "query sees v8" appears with no query being issued, so "fresh query" is asserted in text only. |
| Pace | 4 | 2 | Actual: every stretch moves within 2.1 s apart from deliberate holds (8.4–10.1, 23.5–26.6 with a micro-change at 25.0, the ending 29.5–33.3). The slow WAL fill at 18–20.5 s gives replay real weight. Published: frozen 2.7–7.0 s and 7.25–12.5 s, and mostly still from 19 s to the end. |
| Legibility | 5 | 4 | Actual native labels are about 36–60 px tall. At 350 px the WAL slots, both pointers, `R42→8`, `SELECT revision 7/8` and the row digit all stay readable (`scratch/04/m350/row.png`). The published cut's large boxes read well, but the deciding text ("received v8; reads v7") is its smallest type and the only carrier of the lesson. |
| Useful variety | 5 | 2 | The actual cut uses four distinct visual events tied to sounds: record transit, pointer advance, query round trip, replay fill and ripple. The published cut has one chip drop, label swaps and a progress bar, with sounds only at caption boundaries. |

## Concrete advantages

- **Actual at 6.4–14.5 s:** the gap between "received" and "replayed" is spatial. One WAL slot sits between the two pointers while the row says 7. A viewer can state the mechanism with captions removed. The published cut needs its caption and label text to make the same point.
- **Actual at 10.05–12.55 s:** a query is a visible round trip that returns 7 after receipt. This directly shows the brief's "read 7 before replay". The published cut never shows a read.
- **Actual at 18.1–22.4 s:** replay is an event of its own, with progress ticks, the pointer moving, an arrow and a ripple, and the loudest sound marks it. In the published cut, replay is a thin bar filling inside a static box.
- **Actual at 26.9–29.05 s:** a second, fresh query returns 8, with the old `7` kept dim above it. Snapshot timing is visible: the earlier read result does not change retroactively, and the new read sees 8.
- **Published at 0–28 s:** its one advantage is that its timing already matches the manifest (0/7/14/21 s) and its captions are self-contained.

## Defects checked and cleared

- **"Received" pointer lag (5.4–6.8 s).** The record lands in slot three at about frame 162 (5.4 s). The pointer starts moving at frame 191 (6.4 s) and settles by about 6.8 s. I reproduced this with input seeking and again with exact frame-index selection. The order is plausible (the record is written, then the receive position advances), and the pointer reaches the slot before any read happens. This is a refinement, not a fault.
- **Sound at 15.05 s.** A pixel diff puts the only change at x 584–634, y 938–1010, which is a glow on the "replayed" chevron. Picture and sound are paired, so this is not an orphan sound, though the glow is faint.
- **Holds.** No stretch outside the ending hold is still for more than 3 s. The 23.47–26.6 s span changes at 25.0 s (14-pixel micro-change) and follows the replay landing.
- **Ending.** The stage holds from 29.5 s to 33.3 s, then fades to the title alone at 34.7 s. This is a finite ending, which the brief allows. No loop match is needed.
- **Clipping, overlap and stage bounds.** Audio peaks at −9.5 dB. No label collisions at native size or 350 px. The rings at 5.5 s and 21.9 s overlap slot borders by design and clear within about 0.8 s.

## Integration note (for the manifest owner)

The actual cut runs 34.7 s, and its events land later than item 4's beat times (duration 28; beats at 0/7/14/21). Matching events: arrival about 3.5–6.8 s, read 7 about 10–12.6 s, replay about 18–22.4 s, fresh read 8 about 27–29 s. If the page shows the beat text at the current manifest times, the "replays the change" text (14 s) arrives about 4 s before replay starts, and "fresh query can see revision 8" (21 s) arrives about 8 s before that query returns. Retiming the manifest beats to roughly 0/9/18/26 s and setting duration 34.7 would align them. This concerns the shared manifest and is not a fault in the encoded video.

## Optional improvements

1. **Tighten the receipt pointer** (5.4–6.4 s, S). Start the "received" slide as the record settles, so arrival and receipt read as one event.
2. **Strengthen the stalled-replay cue** (15.05 s, S). The chevron glow is nearly invisible at 350 px. A brief pulse on the empty gap between the two pointers would carry the "still revision 7" moment more strongly.
3. **Trim the post-replay wait** (23.5–26.6 s, S). About 1 s could go before the second query without losing the landing, bringing the cut closer to the original length.

