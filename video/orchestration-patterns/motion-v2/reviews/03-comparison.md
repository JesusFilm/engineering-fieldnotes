# Independent parallel work — encoded comparison

**Decision: pass.** Prefer the local candidate for concrete teaching of independent, read-only reviews. No reproducible objective blocker was found. The refinements below are optional. No media was edited or promoted.

## Grounding and inspection method

Scope is item 3 of `video/orchestration-patterns/sequence/lessons.json`: freeze one snapshot, assign compatibility and migration concerns, overlap independent read-only analyses, retain snapshot identity on both reports for the coordinator. Earlier planning context is acknowledged, but the decision uses encoded evidence. No author source, plan reread or self-review was consulted.

Viewed individual native-width 350×622 frames: candidate periodic samples 001–007 and baseline 001, 003, 005. Also inspected exact candidate frames at 10, 12, 22, 24, 26, 28, 32, 34, 40 and 42 seconds, and baseline at 10, 20 and 26 seconds. Candidate 24 seconds was inspected at full encoded resolution. Periodic sample indices are not asserted to be exact timestamps.

Periodic extraction used FFmpeg scaling to PNG. Alternate extraction decoded from the beginning, selected exact frame indices into full-size PNGs, then resized with Pillow Lanczos to JPEG. The moving marker after compatibility completion was checked in that alternate path and at full size; it is described as a presentation refinement below, not an objective failure. No isolated missing-text display artifact is treated as an encoded fault. Evidence remains in `scratch/03/`. This was sampled frame and transition inspection, not continuous playback or exhaustive visual inspection of every frame.

## Comparison

| Dimension | Candidate | Public baseline |
|---|---|---|
| Causal clarity | Two differently scoped lanes receive S7 and read concurrently. Compatibility finishes while migration continues; no inter-worker dependency is drawn. | Parallel peer boxes show the high-level arrangement clearly, but both complete together and the distinctions depend more on captions. |
| Accuracy | READ ONLY remains visible; source is unchanged; S7 appears on both worker inputs and both outgoing reports. No approval verdict follows receipt. | Captions state read-only work and revision retention. Revision r42 is visible at source, but report identity is less explicit in inspected frames. |
| Pace | 43 seconds separates assignment, input delivery, overlap, unequal completion and report receipts. Final result has a generous reading hold. | 28 seconds is economical with broad seven-second phases and fewer concrete states. |
| Legibility | Check labels, filenames, report IDs and S7 are readable at native 350px. Compact badges are smaller but repeated in larger labels. | Node labels and two-line captions are readable. |
| Meaningful variety | Frozen source, parallel traces, separate completion markers and report receipts each carry a different part of the mechanism. | Symmetric boxes and progress bars teach the topology; captions supply much of the explanation. |

## Observed sequence and transitions

- Opening periodic frames show Snapshot S7, READ ONLY, api/clients.ts and migrations/014.sql. Assignment labels distinguish existing clients from existing rows.
- 10 seconds: both lanes have received S7. 12 seconds: both are reading, with advancing traces and source evidence emphasized.
- 22 seconds: both traces occupy the same time span. 24 seconds: compatibility has Report C · S7 with its colored trace frozen; migration still says reading and advances farther. 26 seconds confirms that asymmetry.
- 28 seconds: both reports exist with S7, traces have different lengths and activity cursors are absent. These lengths are illustrative elapsed work, not percent-complete claims.
- 32 seconds: Report C · S7 is already in the coordinator area while M travels down its separate connector. 34 seconds: both labelled reports have arrived. The reviewer copies retain their identifiers.
- 40 seconds: the settled result remains visible. 42 seconds: stage has faded to a title-only ending. A finite ending is acceptable.
- Baseline 10 seconds shows task dispatch, 20 seconds has both progress bars filled, and 26 seconds labels both reports ready. It communicates the same core lesson, but offers less direct evidence of report-to-revision binding.

## Accuracy limits and optional refinements

The lesson demonstrates one example of independent analyses, not that all compatibility and migration tasks are independent. READ ONLY illustrates configured access; a label alone is not permission enforcement. Receiving a report does not establish its accuracy or approve a change. No numeric speedup, quality improvement or cost reduction is claimed. The coordinator is a receipt area here; later acceptance and reconciliation mechanisms are correctly excluded.

1. At 24–26 seconds the white marker continues across the completed compatibility lane while its colored trace stays frozen. This is consistent with a common elapsed-time marker, and the report plus terminal dot establish completion. Label it as time, or remove it from that completed lane, to reduce the chance of reading it as ongoing worker activity. Alternate JPEG and full-size PNG confirm the state; it is not a blocker.
2. The final report state persists from at least 34 through 40 seconds. A slightly shorter hold could tighten pace, but the current hold lets a beginner compare all S7 labels and is deliberate rather than a stalled animation.

## Technical verification and audio limits

Both complete audio/video decodes exited successfully. Candidate: 1080×1920, 30 fps, 1290 frames, 43 seconds. Baseline: 1080×1920, 20 fps, 560 frames, 28 seconds. Both place moov before mdat.

Audio signal measurements: candidate mean −32.6 dB, maximum −5.5 dB; baseline mean −39.9 dB, maximum −10.6 dB. These show signal and headroom. **Audio was analyzed, not heard.** Actor-specific sound, subjective balance and event synchronization are not listening-verified.

## Hash binding

- Candidate before: `e30abc58bd92c48cd7b672ce03c966a3cadda0bffc12830efb2f89b910197141`
- Candidate after: `e30abc58bd92c48cd7b672ce03c966a3cadda0bffc12830efb2f89b910197141`
- Baseline before: `f90eee5bc0e58f98726ee0f2f3a44a01f5124c8e517285e657a416f60baa9fae`
- Baseline after: `f90eee5bc0e58f98726ee0f2f3a44a01f5124c8e517285e657a416f60baa9fae`

Both hashes are unchanged. This decision applies only to the candidate hash above. Any repair or replacement encode requires renewed actual encoded review bound to its new full hash; replacing the hash alone is insufficient.
