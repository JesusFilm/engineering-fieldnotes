# Memory architecture 01 — encoded comparison

**Decision: pass.** Prefer the local candidate for “Current and saved context.” It makes storage, retrieval, inclusion and supply observably separate, retains the original record, and preserves Call 1 unchanged. No reproducible objective blocker was found in the sampled encoded inspection. This does not authorize publication.

## Grounding and method

Grounded in item 1 of `video/memory-architecture/sequence/lessons.json`: current input is supplied now; a saved record is not automatically included; the application retrieves it and supplies it to a later invocation while the saved copy remains. Earlier planning context was acknowledged. Author source and self-review were not consulted.

Inspected actual individual native 350 × 622 images: candidate periodic samples 001–008; baseline 001, 003, 004, 006. These are ffmpeg `fps=1/5` sample indices, not exact timestamp names. Additionally viewed exact frame-index extracts at candidate 5, 9, 20, 22, 23, 24, 26, 28, 29, 30, 31, 34 and 39.5s, and baseline 7.3, 14.3 and 21.3s. Viewed candidate 34s at full resolution too. This is sampled frame and transition review, not continuous playback. Both videos were decoded computationally in full.

Alternate extraction used full-decode frame selection to full-size PNG and Pillow Lanczos conversion to 350px JPEG, separately from the initial ffmpeg-scaled PNGs. Apparent missing static text in some displayed images was not treated as an encoded fault: the full 34s extraction contains complete task labels, state labels and store records. The copy's departure was checked at 22/23/24s: it becomes a distinct readable copy while the source remains, rather than leaving an unreadable held result. No visual fault is flagged without reproduction.

## Comparative assessment

| Criterion | Candidate | Public baseline |
|---|---|---|
| Causal clarity | Separate Call 1 and Call 2 inputs show absence versus inclusion; application explicitly reads, stages a copy, includes it, then sends | Correct three-node flow, with captions carrying the application role and temporal distinction |
| Accuracy | Preparing remains distinct from supplied; stored original survives; old input never gains the record | Correctly retains the stored note and labels next input, but replaces state in a single input box |
| Pacing | 40.8s allows readable staging and inclusion holds before supply | 28s with four approximately seven-second phases; concise but less explicit |
| Native 350px legibility | Essential command, input states and application actions readable; secondary labels are smaller, and inactive rows subdued | Node labels and explanatory captions readable; fewer concrete fields |
| Meaningful variety | Two temporal input panels, a small application activity strip and a persistent multirow store have distinct roles | Repeated stack with loopback retrieval path and caption changes |

## Observed progression

- **5s:** Call 1 is supplied; the test-command slot is absent. A short connector and highlighted model mark the invocation. No generated command or test success is asserted.
- **9s and periodic sample 003:** the saved store contains `billing.test_cmd → npm test`, but Call 1's test-command slot remains absent and then explicitly reads `not included`. Storage presence does not silently change input.
- **20s:** Call 2 is preparing; the application reads `billing.test_cmd`. Call 1 remains supplied and unchanged.
- **22–24s:** the selected command is copied from the store into the application area. At 24s the label says `retrieved a copy`; the original `npm test` remains in the saved row. The copied command is not yet inside Call 2.
- **26s:** staging still holds, allowing the distinction between retrieval and inclusion to register.
- **28–31s:** the application includes the copy in Call 2. It has landed by 29s, but the input still reads `preparing` through 31s; inclusion is not conflated with invocation.
- **Periodic sample 007 and 34s:** Call 2 becomes supplied, its model highlights, and application action reads `send Call 2`. Call 1 stays unchanged. The store changes its header to `still saved`, not its value.
- **39.5s:** the same final contrast remains readable: first input lacks the note, later input includes it, stored original persists. The film has a finite conclusion without inventing a new call or execution result.
- **Baseline boundaries:** 7.3s highlights the saved note; 14.3s shows RETRIEVE leaving storage; 21.3s shows NEXT INPUT moving toward the model. The final sampled state says the model received the note and retains it in storage. This is accurate but less explicit about staging and separate call histories.

## Accuracy limits

`npm test` is an illustrative stored value, not verified project advice. The candidate's choice of command does not change the intended lesson. No execution, source-authority check, applicability check or guaranteed model obedience is demonstrated. “Not included” describes the record's absence from supplied input, not an assertion about what the model might infer from prior training. The two model boxes represent separate invocations, not necessarily different models or processes.

The store's other rows illustrate records not selected; their presence does not establish that they are approved instructions. “Still saved” demonstrates retention across these calls, not crash durability or indefinite persistence. No automatic synchronization into an old call is shown.

## Optional refinements

1. Make the full lesson title more prominent than the generic large “Memory” heading.
2. If secondary store rows are intended for reading, increase their contrast or size. They are unnecessary to follow the selected record and are not blockers.

No reproducible clipping, essential held-label overlap or incorrect settled state was found. Copy motion briefly crosses region boundaries but settles into readable states before the next causal step.

## Technical and audio checks

Both full decodes returned exit 0 with no reported errors. Candidate: 40.8s, 1080 × 1920, 30fps, 1224 frames. Baseline: 28s, 1080 × 1920, 20fps, 560 frames. Both have `moov` before `mdat`.

Audio signal analysis: candidate mean −33.7dB / maximum −7.0dB; baseline mean −40.6dB / maximum −10.1dB. Measured peaks leave headroom. **Audio was not actually heard.** Actor-specific sound quality, perceptual synchronization and listening comfort are not established by these measurements or frame analysis.

No media edits or repairs were made. Any changed encode requires renewed actual encoded inspection bound to its new SHA-256; the present decision cannot be renewed by substituting a hash.

## Hash binding

**Candidate** `video/memory-architecture/motion-v2/01/video.mp4`

- Before: `bf8203d8a7a6f6b837a457280ac3e5da4263bfc6c42f1b2975903309f98f18a6`
- After: `bf8203d8a7a6f6b837a457280ac3e5da4263bfc6c42f1b2975903309f98f18a6`
- Unchanged: yes.

**Baseline** `public/lessons/memory-architecture/01.mp4`

- Before: `9284e0c5643e82d4d38eb8d2958c843ed5cafe050168bff67aa942820840c08d`
- After: `9284e0c5643e82d4d38eb8d2958c843ed5cafe050168bff67aa942820840c08d`
- Unchanged: yes.

