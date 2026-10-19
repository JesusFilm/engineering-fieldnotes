# Completed comparative review — 2026-10-19

Recommendation: **astra / Verify the write**. Keep this concept as **reference**. The machine-readable comparison is `../replication-and-consistency.json`; original blind observations are in `before.md`, source checks and transcript reconciliation in `source-review.md`, final encoded evidence in `encoded-checks.json`, and isolated browser results in `page-checks.json`.

Astra makes the operation-level decision easiest to inspect: a committed write, expected revision, mismatched observation and unchanged write count are simultaneously available. Baseline remains a good three-actor replication primer; replacing the ACK badge with the stale read makes the safe agent decision less explicit. Sol adds the useful consequence of withholding a dependent tool action, but its five actors and separate ending read require more attention. The alternatives are retained because they offer different teaching value.

## Corrections and final visual check

Sol retains GPT-6.1 Sol / high authorship. The scene now illuminates the check-to-tool gate only during approved-version delivery and hides the crossing copy line for that interval. Compact vN chips have room between database panels. The later step visibly returns to waiting at 24.5s and becomes used v2 at 28.3s. Transcript, beat sheet, README and correction metadata identify the revision; the original author verification is preserved inside the new verification record.

An intermediate render exposed that this engine does not read a wire's initial alpha option. An explicit timeline initialization corrected that before the final encode. The final 3.5s frame has no active gate, 4.5/19.0/27.9s show separated delivery, and 24.6/28.5s show the later waiting/released contrast. No installed skill or shared engine was changed.

Final review covered every causal beat via contact sheets and decoded full-size/350px frames. Full-size samples include baseline 2.5/6.5/11.5/15.5/17.5/18.5/21.5, Astra 3/6.2/7.5/12/13.5/18.5/24.5, and revised Sol 3.5/4.5/9.5/13.5/19/23.5/24.6/28.5. Additional 350px motion and ending samples cover Sol through 30.8s; full contact sheets cover all durations. Exact first/last frames were separately viewed and compared numerically. Packet contact with panel borders does not obscure labels at the inspected busy frames. No further substantial visual defect found.

The original and Astra encodes did not need alteration. A short optional future improvement would be a separate retained receipt in the original, but that would expand its minimal primer scope. Astra's post-replay hold and Sol's final confirmation could be shortened; both currently provide useful reading time and neither blocks comprehension. These are residual editorial preferences, not uncompleted defects.

## Verification

| Cut | Frames / duration | Peak dBFS | Decode | Exact loop boundary | Streaming format |
|---|---|---|---|---|---|
| baseline | 780 / 26s | -5.7 | passed | equal | passed |
| astra | 900 / 30s | -6.4 | passed | equal | passed |
| sol | 960 / 32s | -8.8 | passed | equal | passed |

All are H.264, 1080×1920, 30fps, yuv420p, with AAC and moov before mdat. Poster dimensions pass. Every scheduled cue window has decoded signal; spectrograms show sparse beat-aligned activity and no steady masking bed. No sound was physically heard, and simultaneous cues cannot be judged individually from aggregate energy. The review does not claim real-time audiovisual playback or manual inspection of every frame.

The isolated chapter and comparison were built through the existing renderer into this review's ignored scratch directory and inspected in headless Chrome at 350 and 1280px. The chapter selects Astra; all three cuts, five/six-beat alternative sequences, and Sol's separate author/editor attribution render correctly. Width checks show no horizontal overflow; videos have controls, no autoplay and preload none. The recommendation, phone sequence, comparison posters, and exercise were visually inspected. Shared dist, manifests and release-wide checks remain for the coordinator; this is a completed topic review, not a publication operation.

Scores describe the final media. Accuracy 5 means no material contradiction found within the stated illustrative scope, not that a short video covers all consistency models. Technical scope and primary-source evidence remain in the guide and source review. No live database test or learning-effect study was conducted.

## Reproduce checks

From the repository root:

```sh
python3 reviews/comparisons/replication-and-consistency/verify.py
python3 reviews/comparisons/replication-and-consistency/preview.py
node reviews/comparisons/replication-and-consistency/check-pages.cjs
```

For a new Sol encode use its existing `render.sh`, then renew the comparative visual review and file hashes. Evidence and comparison hashes must not simply be copied forward after an encode.
