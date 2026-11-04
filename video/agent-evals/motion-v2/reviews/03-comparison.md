# Lesson 03 comparison — Catch an overbroad fix

**Pass.** Prefer the local candidate. Its expected/observed matrix explains why identical login rejections produce opposite test verdicts, and retains both results when the grader rejects Patch A. No reproducible objective blocker was found in the inspected samples. Optional refinements are not blockers.

## Scope and method

Grounding: `video/agent-evals/sequence/lessons.json` item 3. Patch A rejects all logins; the empty-password requirement passes, the valid-password regression requirement fails, and the grader rejects the overbroad patch. Earlier planning context is acknowledged but is not encoded evidence. No author source, current plan or self-review was read for this comparison.

Viewed actual individual 350px-wide decoded frames: seven candidate and five baseline samples from FFmpeg `fps=1/6,scale=350:-1`. Follow-up used full decoding with frame-index selection, then Pillow Lanczos resizing to 350×622 and JPEG output. Exact candidate times inspected: 0, 6, 10, 12, 14, 16, 18, 22, 24, 26, 30, 34, 36, 40, 41s. Exact baseline times: 7, 14, 21, 27s. Also viewed the full-resolution candidate frame at 36s. This covers representative holds and transitions; it is not continuous playback or an exhaustive every-frame audit. Alternate extraction supported the content/layout observations; no unconfirmed missing-text or clipping fault is flagged.

## Comparison

| Dimension | Local candidate | Public baseline |
|---|---|---|
| Causal clarity | Shows unconditional return, both predefined expectations, sequential observed results, comparison emphasis and retained PASS/FAIL evidence before patch rejection. | Correct branching diagram, but captions supply why each input passes or fails; actual expected/observed values are not juxtaposed. |
| Accuracy | The same unchanged Patch A rejects both inputs. Empty case remains passed even after regression failure; no average masks the required failure. | Correctly retains empty PASS and valid FAIL and labels patch failure. |
| Pace | 42s separates code, criteria, each return, each comparison and final grading. The mismatch has time to register before FAIL. | 28s with readable caption phases; faster, less detailed demonstration. |
| Legibility at native350 | Key code, input types, expected/observed values and PASS/FAIL are readable. Column headers and verdict explanation are smaller but discernible. No observed collision in sampled states. | Large node labels and readable explanatory captions; more prose to read. |
| Meaningful variety | A code excerpt, a comparison matrix with active rows, and a grading summary each serve a distinct purpose. State changes carry the lesson without paragraph captions. | Branching layout is suitable to two cases, but transfers and box states carry less specific evidence. |

## Encoded evidence

- At 6s both case expectations are visible before either observation. The code returns REJECT without a condition.
- At 10s the empty case is active and the code's return is emphasized. At 12s its observed rejection arrives; at 14s expected rejection is highlighted. At 16s it has PASS while the valid case remains unknown and the grader is not graded.
- At 18s the valid row becomes active. At 22s its observed rejection appears; at 24s expected acceptance is highlighted against that rejection. At 26s this row shows FAIL while the empty row retains PASS.
- At 30s both results connect toward grading. The later sampled grading state crosses out `empty only → pass`; at 34s the grader says rejected. At 36s `empty + valid → REJECT` is explicit and Patch A is outlined red.
- The completed evidence persists at 40s. At 41s the stage clears to the title. This finite ending is acceptable after the result hold.
- Baseline 7/14/21s samples show phase changes for empty success, valid failure and grader rejection; at 27s it retains both case statuses and `patch A fails`.

## Accuracy boundaries

The code is schematic, not a claim of executable language syntax or a real tested patch. Application rejection is correct for the empty input and wrong for the valid input; test verdicts depend on expectations. The final rejection is a grading decision about Patch A, not permission enforcement or deployment. These two cases do not establish exhaustive authentication coverage or future reliability. No repaired patch or later lesson is introduced.

Optional refinements:

1. Consider labeling the final grader verdict “PATCH A REJECTED” to distinguish patch rejection even more explicitly from the login rejection shown above.
2. Consider retaining the evidence table through the final second rather than clearing to the title after the completed-result hold.

## Technical checks and hash binding

Both media are 1080×1920 with audio. Candidate: 42.000s at 30fps. Baseline: 28.000s at 20fps. Both fully decoded with exit code 0 and place moov before mdat. Candidate signal levels: mean_volume: -30.7 dB, max_volume: -4.0 dB; baseline: mean_volume: -41.5 dB, max_volume: -10.5 dB. Peaks are below -0.5dBFS. Audio was analyzed, **not heard**; actor-specific sound, subjective mix and perceptual synchronization are not certified.

| Media | SHA-256 before and after (unchanged) |
|---|---|
| video/agent-evals/motion-v2/03/video.mp4 | `826a6ebb7dc9e5cca26387270372c8140ca0a874ebee69a2259d6a0c5e47201a` |
| public/lessons/agent-evals/03.mp4 | `e43923a37e8130a05d5fce31188a3d7bea734a5cd11ba4f18008dd01e2c6fce3` |

The decision applies only to the candidate hash above. Any repair or new encode requires renewed actual encoded inspection and a new hash-bound decision. No media was edited. Writes were limited to the assigned comparison, decision and scratch/03 evidence.
