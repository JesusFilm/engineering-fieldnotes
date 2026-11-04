# Lesson 05 comparison: "Failover can lose data"

Fresh, independent comparison of two encoded files against lesson 5 in `video/replication-and-consistency/sequence/lessons.json`. I didn't read any author scene source, self-review, plan, ledger, or prior review before or during the inspection.

| | Candidate A: motion-v2 | Candidate B: published |
|---|---|---|
| File | `video/replication-and-consistency/motion-v2/05/video.mp4` | `public/lessons/replication-and-consistency/05.mp4` |
| SHA-256 (before and after review) | `db2032dcdda8ec6edb843d990b3f06b1de5bc29f5e060514db8aa554632f48cd` | `c1c4b2e6cae6e09022511c51602c9d98a93f0c5de505a17a145def1422bdab83` |
| Stream | H.264 1080x1920 yuv420p, 30 fps, 1080 frames, 36.0 s; AAC 44.1 kHz stereo | H.264 1080x1920 yuv420p, 20 fps, 560 frames, 28.0 s; AAC 44.1 kHz stereo |
| Full decode | clean | clean |
| Faststart | moov before mdat | moov before mdat |
| Audio levels (analysed only, not listened to) | max -1.6 dB, mean -35.0 dB | max -13.9 dB, mean -44.1 dB |

## Verdict

**A passes and is the recommended cut.** It shows the whole async failure window through state changes: v8 is acknowledged, the standby holds v7, the primary fails before it ships v8, the standby is promoted, and a read returns v7. B is accurate and legible, but it is almost a slideshow, and its words carry the lesson. Keep B as a passing alternative. A has no objective faults in the encoded file.

**Integration requirement (outside the encoded file; this review didn't change it):** lesson 5 metadata gives `duration: 28` and beats at 0/7/14/21 s, which matches B. A runs 36 s, and its events fall at about 0, 8.8 (v8 acknowledged), 15.7 (primary offline), 20.4–22.7 (promotion), and 27.4–31 (read returns v7; "v8 absent"). If the page switches beat text by these times, A plays with the text running ahead of the picture. For example, at 7 s the failure text would show while A still has a healthy primary that hasn't written v8. Retime the lesson beats (suggested 0 / 8.8 / 15.7 / 27.4) and set the duration to 36 before A is published.

## Method

- Contact sheets at 350px, one frame per second, for both files (`scratch/05/a_sheet.png`, `b_sheet.png`), plus 350px beat and boundary frames for A at 0.2, 2.6, 3.95, 5.75, 8.8, 9.3, 15.7, 16.4, 22.7, 28.4, 29.7, 30.9, 32.5 and 35.3 s (`a_beats350.png`).
- Native 1080x1920 frames: A's busiest end state at 32.5 s (`a_native_end.png`), A's promotion transition at 20.9/21.5/22.2/22.7 s (`a_promote.png`), and B at 22.5 and 27.5 s (`b_native.png`).
- Whole-file freezedetect (noise 0.0005, 2.5 s minimum) and silencedetect (-45 dB, 0.3 s minimum), scene-change times, and frame-difference images around every sound onset in A that didn't line up with a scene change.
- Alternate extraction: the two sounds that seemed to have no visual event (13.3 s and 24.7 s) and the dot near A's right edge (21–23 s) were re-extracted as single seeked frames at native resolution, with difference images, before any judgement. None of them turned out to be a fault (details below).

## Beat-by-beat

**Lesson beat 1: async, v8 acknowledged, standby has v7.**
A (0–15.6 s): After a 1.6 s fade-in, v7 is written on the primary (2.6 s). The app shows `ack R42 v7 ✓` (3.95 s) before v7 reaches the standby (5.75 s). This is a normal async success, shown first so the failure has something to contrast with. v8 is written (8.8 s) and acknowledged as `ack R42 v8 ✓` (9.3 s). The standby's v8 slot stays an orange dashed box labelled "unshipped" (from about 10 s), and it pulses at 13.3 s. The "ASYNC REPLICATION" subtitle is visible throughout.
B (0–7 s): Three labelled boxes ("write acknowledged", "PRIMARY revision 8", "NODE B standby: revision 7") with a burned-in caption. Nothing moves or sounds for 0–6.6 s.

**Beat 2: primary fails before shipping v8.**
A (15.7 s): A ripple appears, the primary becomes "offline" with a red ⊗, and the links turn red and dashed. Its v6–v8 stay visible but dim, so the picture doesn't suggest the disk was destroyed. v8 is still unshipped.
B (7 s): The primary box turns red and reads "unavailable". There is no visible link between the failure and v8 never reaching the standby.

**Beat 3: standby promoted; it serves the data it actually has.**
A (20.4–22.7 s): `$ promote standby` is typed. A dot travels a dotted path from the terminal up to the standby, which becomes "primary" with a glow (22.7 s). Its rows still show v6, v7 and an empty v8 slot, and the request chevron moves to the new primary (24.7 s).
B (14 s): Node B gets an orange border and reads "new primary: v7".

**Beat 4: v8 missing after failover.**
A (27.4–31 s, held until the fade at 35 s): An R42 read goes to the new primary and comes back as v7. The app now shows `ack R42 v8 ✓` above `read R42 v7` with an orange ≠ (30.9 s), and the standby slot turns red with "v8 absent". Putting the acknowledged write next to the actual read is the strongest frame in either cut.
B (21–28 s): A READ chip travels to Node B and returns v7 (21–25 s), then the application box turns red with "v8 missing" (26 s).

## Scores (1–5)

| Criterion | A | B | Evidence |
|---|---|---|---|
| Causal clarity | 5 | 3 | A: ack before ship (3.95 s vs 5.75 s; 9.3 s with v8 never shipped), then the ack ≠ read contrast at 30.9 s. B: the cause lives in the captions and labels. |
| Accuracy and scope | 5 | 4 | A stays inside the async window. The old primary's data is dimmed, not removed. Promotion takes an explicit command. The read serves v7. Nothing implies that every failover loses data, that promotion erases data, or that a returning old primary is safe. B is correct, but it never shows "acked before shipped". |
| Pace | 4 | 2 | A: holds of 3.6 s (12.0–15.7, with a pulse at 13.3), 3.8 s (16.5–20.3) and 3.7 s (23.7–27.5), each right after a beat lands, plus a 4 s end hold. B: frozen and silent for 0–6.6 s, 7.0–12.5 s and 14–21 s. |
| Legibility | 4 | 5 | A at 1080: the smallest labels ("unshipped", "v8 absent") are about 36 px. At 350px they are about 12 px, so colour and slot shape carry them. The "read" placeholder and the promotion path are faint. B uses large text with high contrast. |
| Useful variety | 5 | 2 | A uses writes, acks, shipping, failure, a typed command, promotion, a read round trip and a ≠ comparison. B has three state recolours and one chip round trip. |

Concrete advantages of A, with timestamps: 3.95 s → 5.75 s (an async ack before the copy arrives, shown in a normal case); about 10 s (the dashed "unshipped" v8 slot); 15.7 s (the failure leaves the old data visible); 20.4–22.7 s (promotion is a deliberate operator action); 30.9 s (`ack v8 ✓` above `read v7` with ≠).
Concrete advantages of B: larger, simpler text at phone width; its 28 s length matches the current lesson metadata; and its burned-in captions make it self-contained without the page.

## Audio-visual sync (analysis only, not listened to)

Every sound onset in A matches a visible change: 1.65, 2.53, 3.88, 4.82, 5.67, 7.88, 8.76, 10.12, 11.18, 13.29 (v8 slot pulse), 15.65 (failure), 20.35 (typing), 21.41, 22.59 (promotion), 24.71 (chevron to new primary), 27.41, 28.29, 29.65 and 30.82 s (≠ / absent). Peak level -1.6 dB is below the -0.5 dB clipping line. The loudness of each event wasn't judged by ear. B's sounds come only at 7, 14, 21, 23, 24 and 26 s.

## Apparent faults checked and cleared

- Sound at 13.3 s inside an otherwise frozen stretch: a native difference image shows the unshipped v8 slot pulsing. This is a real visible event.
- Sound at 24.7 s: a native difference image shows the request chevron moving onto the new primary's link.
- Dot and line near A's right edge at 21–23 s: native frames show a dotted promotion path from the terminal to the standby, inside the 1080 px stage with about 80 px of margin. It is intentional, though faint (see refinement 2).
- Fade at 35–36 s: a finite ending, which is allowed.

## Blockers

None in A's encoded file. The retiming above is a metadata step needed before publishing, not a fault in the video.

## Optional refinements (ranked; none block)

1. **Trim the post-failure hold** (16.5–20.3 s, S): 3.8 s with no change at all. Starting the promotion typing about 1–1.5 s sooner would bring the length closer to the 28–30 s lesson slot.
2. **Make the promotion path easier to see** (21.0–22.7 s, S): the dotted path and dot are faint and run along the right edge. A brighter pulse would tie the command to the promoted node.
3. **Keep the old primary's identity** (from 15.7 s, S): the label changes from "primary" to "offline", so after promotion the node's former role is only implied. A dim "old primary" tag would remove the ambiguity.
4. **Raise the contrast of the "read" placeholder** (0–27 s, S): it is very dim until it fills at 29.7 s. The read row's arrival is the payoff, so a visible empty slot would set it up.
5. **Shorten the fade-in** (0–1.6 s, S): the scene is mostly dark before the first event.

