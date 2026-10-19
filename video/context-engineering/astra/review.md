# Astra review — Keep the contract

Author/reviewer: **gpt-6-astra**, reasoning **high**. Reviewed **2026-10-19**. Self-review; no subagents or comparative reviewer. Final revision: initial movie plus audio-only remux. Source: `scene.js`; exact check results: `verification.json`.

## Fixed before handover

- **0–29s: crowded two-line boxes.** Initial full-size still at 17.7s showed the Agent/Session 2 and fixture/FAIL lines touching. Increased the generic box's vertical separation from 40px to 68px and rerendered stills before making the movie. Encoded full-size and 350px images now separate all labels clearly.
- **10.3s: weak session-change sound.** First AAC audit measured the clock event at about −47 dBFS RMS over 180ms. Raised only that cue's gain to 4, regenerated audio, copied the unchanged video stream, and reran decode/peak/timing checks. No subjective claim of audibility on speakers is made.
- **0.0/29.97s: loop protection.** The local engine supports a full-canvas fade so the ending can retain a repaired state and still return to exactly the opening image. The final decoded YUV frames are byte-identical, not just visually similar. This was a preventive engine adaptation, not a claim that a failed movie was observed.

## Teaching improvements applied

1. **Show the same external check three times** (4.2 / 13.8 / 23.8s, M). A passing baseline, a compatibility failure, and a passing repair make the field change causal. PASS resets to WAIT before a new attempt so old evidence is not mistaken for a fresh result.
2. **Leave the missing row visible** (7.4–18.1s, M). The requirement turns red, fades out, and leaves a dashed vacancy. Restoring the same row is easier to follow than replacing the whole diagram. The wording and trace make clear this is a possible omission, not inevitable forgetting.
3. **Retrieve the contract before retrying** (16–21s, M). The source appears only at the recovery beat; a named field travels back into the handoff. Repairing the packet alone does not flip the fixture to green: another patch and test are required.
4. **Preserve human acceptance** (26–28.6s, S). Human review remains a visible pending step after the fixture passes. The transcript explicitly limits what the check establishes and distinguishes context from enforcement.
5. **Use phone-sized data chips** (3.2 / 12.8 / 17.3 / 22.8s, S). Increased the copied renderer's chip font from 26px to 44px and separated the main labels. The actual `total_cents` versus `amount` values carry the example.

All meaningful improvements identified in this pass were applied. No remaining defect or required production action is being deferred for approval. Comparative selection and curriculum promotion are outside this assigned cut.

## Visual verification

Before rendering: seven beat stills and a contact sheet inspected with `view_image`, plus the recovery frame at full size. Fixed label spacing, then inspected a corrected full-size recovery still before encoding.

After encoding: inspected the per-second contact sheet; seven individual 350px-wide frames at **4.8, 8.8, 14.5, 17.7, 19.5, 24.5, 26.8s**; the 14.5s encoded frame at 1080×1920; and twenty boundary/in-flight samples including packet transit, omission, session switch, recovery, test transitions, and final fade. No clipped label, unintended lingering state, unreadable core data chip, or wire/label collision was found. The green baseline intentionally remains visible until Session 2 starts; the red fixture intentionally remains failed while the handoff is repaired.

The hold after restoring the requirement ends with a fresh send at 21s. The final result gets 2.2 seconds before Human review appears, then 2.6 seconds before the fade. No unexplained idle stretch exceeds three seconds. A 0.8-second chip transit is intentionally brief; the field is also held in the contract and context rows.

The final remux changes audio only. Its contact sheet, beat images, spectrogram, and poster were regenerated for final review.

## Technical checks

- 30.000s; 900 frames; **1080×1920, 30/1 fps, H.264, yuv420p, AAC**.
- Final MP4 **500,625 bytes**, below the strict 2,000,000-byte target.
- Full audio/video decode with `-xerror`: passed.
- Decoded first and last frames: exact byte equality; SHA-256 `6791b9ffe5c20ca33783b7d5b74e41797bc1461e569626bb2d8d55995718ded3`.
- Faststart proved from MP4 atom order: `moov` before `mdat`; video and audio presentation start at 0.
- Decoded AAC sample peak **−1.960 dBFS**, below −0.5 dBFS.
- **25 sound cues**, all with measured decoded energy at the scheduled time. The 13.8s crash is the strongest event. Source and decoded 10ms RMS envelopes correlate **0.999490** with best lag **0ms** over the tested ±100ms range. This confirms timing to the analysis resolution; it is not a listening test.
- Spectrogram inspected: send/arrival pairs, success chords, the low missing-constraint cue, broad failure event, recovery, review tick, and ending fade cue align with the beat schedule. Cues come from the same timeline as visual state changes.
- One movie encoder at a time, two codec threads; task scripts also cap filter threads. Local dependencies stay in ignored node_modules and scratch artifacts stay under this variant.

## Honest limits

Audio was synthesized, decoded, measured, and inspected spectrally; **not physically listened to**. Speaker quality, subjective mix, and accessibility for hearing differences were not assessed by listening. The five-entry transcript is the accessible text equivalent.

This is a schematic invoice example, not an observed agent run. A missing requirement may be rediscovered; restoring context may still fail; a passing fixture proves only its covered behavior. Stored instructions do not enforce permissions. The movie does not show authorization, comprehensive tests, production deployment, or a completed human review. Primary evidence supports the mechanism and cautions, not this illustrated outcome's frequency.

No other model's scene or baseline encoded media was inspected. Independence is by authorship/process; no superiority over unseen variants is claimed. Font rendering and exact compressed bytes can vary across platforms.
