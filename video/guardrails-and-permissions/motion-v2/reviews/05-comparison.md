# Recheck changed actions — encoded comparison

**Decision: pass.** Prefer the candidate for its concrete artifact comparison, preserved r42 approval, pending r43 review and unchanged production evidence. No reproducible objective blocker was found. No media edits or publication were performed.

## Grounding and inspection

Reviewed against `video/guardrails-and-permissions/sequence/lessons.json` item 5: stored approval for r42 does not authorize r43; execution-time comparison blocks the changed artifact and requires a new decision. Earlier planning context is acknowledged. No author source, plan reread or self-review was consulted.

Viewed individual native-width 350×622 frames: candidate periodic samples 001–006; baseline 001, 003, 005. Exact candidate frames inspected at 7, 12, 17, 19, 23, 26, 34 and 35 seconds; baseline at 8, 16 and 22 seconds. Candidate 26 seconds was additionally viewed at full encoded resolution. Periodic filenames are indices, not asserted exact timestamps.

Periodic extraction used FFmpeg scaling to PNG. Alternate extraction decoded from the beginning and selected exact frame indices into full-resolution PNGs, then used Pillow Lanczos resize to JPEG. The comparison and settled labels remain coherent through both paths; no clipping or missing-text allegation was established. Isolated display omissions are not flagged as encoded faults. Evidence is retained in `scratch/05/`. This is sampled state/transition inspection, not continuous playback or exhaustive every-frame visual review.

## Comparison

| Dimension | Candidate | Public baseline |
|---|---|---|
| Causal clarity | Approved and current artifact identifiers are visibly different while action/target are the same. Mismatch causes BLOCKED. | Release r42/r43 labels and captions explain the mismatch, with less concrete comparison evidence. |
| Accuracy | r42 remains approved; r43 remains blocked and later pending review. Calls stay zero and production stays r41. | Correct rejection and new-review instruction; production state and actual review referral are not shown explicitly. |
| Pace | 35.6 seconds separates request receipt, approval lookup, comparison, denial and fresh-review state with readable holds. | 28 seconds is concise, using four broad phases and more caption explanation. |
| Legibility | Release IDs, hexadecimal values, result and production status are readable at native 350px. Secondary labels are smaller but redundant. | Main labels and two-line captions are readable. |
| Meaningful variety | Record lookup, character-level comparison emphasis, mismatch verdict, persistent execution counters and new review row each serve a distinct teaching purpose. | Repeated boxes and travelling request communicate the topology more abstractly. |

## Timestamped evidence

- Opening samples show r42 approved and a current deploy r43 → prod request; production is r41 with calls 0 / not invoked.
- 7 seconds retains the pending request. By 12 seconds the executor has both approved r42 identifier a91f 7c2e 04b8 and current r43 identifier b84a 9d10 3f6c.
- 17 seconds marks action/target as same while highlighting differing artifact characters. This distinguishes artifact change from a different operation or environment.
- 19 seconds shows the unequal identifiers, BLOCKED / artifact changed, and a blocked current request. Calls remain zero. 23 seconds holds that decision without execution.
- 26 seconds shows a referral travelling toward the approvals area. At 34 seconds the new r43 identifier is pending review while r42 retains its separate approved row. Production remains r41. At 35 seconds the stage fades toward the finite ending.
- Baseline 8 seconds sends r43 to the executor, 16 seconds shows mismatch: blocked, and 22 seconds retains that state while instructing fresh review. Its core lesson agrees, but the candidate supplies observable evidence of what differs and what remains unchanged.

## Limits and optional refinements

The hexadecimal strings are illustrative identifiers, not verified real artifacts or evidence of a cryptographic implementation. Real executors must compare the complete immutable artifact identity in trusted code; a display excerpt alone is insufficient. The example assumes trusted saved approval and keeps action/target fixed. It does not demonstrate authentication, expiry, replay protection or all possible changed action fields. New review is pending, not guaranteed to approve.

Optional: label the hexadecimal values as artifact IDs or digest excerpts, and specify a service alongside prod if space permits. These would clarify the example but do not repair a causal or legibility failure. No blocker is assigned for optional refinements.

## Technical checks and audio limits

Both complete audio/video decodes exited successfully. Both files place moov before mdat.

- Candidate: 1080×1920, 30/1 fps, 1068 frames, 35.600000 seconds.
- Baseline: 1080×1920, 20/1 fps, 560 frames, 28.000000 seconds.

Signal measurements: candidate mean −33.4 dB, maximum −4.7 dB; baseline mean −44.4 dB, maximum −15.1 dB. Both have signal and headroom. **Audio was analyzed, not actually heard.** Actor-specific cues, subjective balance and synchronization are not listening-verified.

## Hash binding

- Candidate before: `39988cfa1f086b7fb715eaec80ea99b4eec42a305f7730063aac8e2e5423f950`
- Candidate after: `39988cfa1f086b7fb715eaec80ea99b4eec42a305f7730063aac8e2e5423f950`
- Baseline before: `706753a9236d6cfbfef8275f041aa3e3cf27f20a23b925a9ab13a096f7b9fb8d`
- Baseline after: `706753a9236d6cfbfef8275f041aa3e3cf27f20a23b925a9ab13a096f7b9fb8d`

Both hashes remained unchanged. The decision applies only to the candidate hash above. Any repaired or replacement encode requires renewed actual encoded inspection and a decision bound to its new full hash; replacing the hash alone is insufficient.
