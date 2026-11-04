# Lesson 05 comparison — Know the grading limits

**Pass.** Prefer the local candidate for concrete teaching. It demonstrates both error directions under a visible criterion and concludes with recalibration and bounded evidence, rather than an automatic release. No reproducible objective blocker was found in the inspected samples. Optional refinements do not require repair for acceptance.

## Scope and inspection

Grounded in `video/agent-evals/sequence/lessons.json` item 5: representative coverage, criterion-appropriate graders, human calibration, false passes/false failures, and limits on decisions. Earlier planning context is acknowledged but not used as evidence of what the encode contains. No author source, current plan or self-review was read.

Viewed individual actual 350px decoded frames, not a contact sheet: candidate periodic samples 1–7 and baseline 1–5 from FFmpeg `fps=1/6,scale=350:-1`. Alternate extraction used full decoding with frame-index selection, then Pillow Lanczos resizing and JPEG output. Exact candidate times inspected: 0, 6, 10, 14, 17, 20, 22, 24, 26, 28, 30, 32, 34, 36, 40, 43, 44s. Baseline exact times: 7, 14, 21, 27s. Also inspected candidate 40s at full resolution. This is sampled state and transition analysis, not continuous playback or an every-frame audit. Alternate extraction corroborated the layout and text; no unconfirmed clipping/missing-text allegation is flagged.

## Comparison

| Dimension | Candidate | Public baseline |
|---|---|---|
| Causal clarity | Shows an explicit criterion, two short responses, automated scores, supporting evidence and human judgments. The rubric's initial check becomes a question mark after the audit. | Correct captions name grading errors but do not demonstrate one. |
| Accuracy | False pass and false failure are correctly distinguished. Original scores remain visible; recalibration is pending, held-out cases remain unrun and release is undecided. | Correctly states calibration and no automatic release, with less specific coverage evidence. |
| Pace | 44.7s allows separate response, automated score, evidence emphasis and reviewed score for each example, then a final bounded-evidence hold. | 28s in four caption phases; readable but abstract. |
| Native350 legibility | Dense, compact text, but the key responses, criterion, scores and final limits are readable in inspected frames. Abbreviations and small secondary labels increase effort. | Larger, spacious labels and readable captions, at the cost of prose carrying most meaning. |
| Meaningful variety | Suite/check mapping, grader-role list, paired calibration examples and evidence status have distinct semantic roles despite stacked rectangular containers. | Repeated suite/graders/decision boxes and a transfer chip provide less stateful explanation. |

## Encoded evidence

- At 6s suite lists empty-password known bug, valid-password behavior and explanation clarity, with held-out cases kept apart and not run.
- At 10s behavior rows map to code checks. At 14s explanation maps to rubric and human review maps to calibration. The rubric check is amber rather than an overall green release state.
- At 17–20s the audit establishes `criterion: names the input`, response A `Improved security` and automated PASS.
- At 22s `no input` identifies the missing criterion; at 24s human FAIL and `false pass` appear while the automated PASS remains visible.
- At 26–28s response B `Reject empty passwords` appears with automated FAIL. At 30s the affected input words are underlined. At 32s human PASS and `false fail` complete the second comparison, retaining A above it.
- At 34s the rubric status becomes `recalibrate` and the explanation check becomes `?`. This does not pretend the audit has repaired the grader.
- At 36s held-out status is emphasized; at 40–43s evidence is `for review`, held-out is `not run`, release is `not decided`. At 44s the stage clears to the title after the hold.
- Baseline 7/14/21s samples show grader selection, calibration and bounded-decision caption changes. At 27s the no-automatic-release caption remains visible, without concrete audit examples.

## Accuracy boundaries and optional refinements

These are illustrative rubric judgments under a narrow explicit criterion, not observed error rates or proof that human review is infallible. Code checks are suited to concrete outcomes, but their displayed success is not proof of comprehensive correctness. The rubric error does not alter the behavior-check results. The held-out and release statuses correctly prevent a broad completion claim. The suite uses compact case/criterion labels rather than fully specified tasks; expanding that specification belongs in accompanying material.

1. Give the rubric audit more vertical space or temporarily reduce the suite/grader mapping during the examples, allowing larger audit labels at 350px.
2. Consider expanding “pw” to “password” and identifying the rubric grader as automated/model-based once, reducing terminology inference for beginners.

## Technical checks and immutable binding

Both encodes are 1080×1920 and contain audio. Candidate: 44.700s at 30fps; baseline: 28.000s at 20fps. Full audio/video decoding completed with exit code 0 for both. Both place moov before mdat. Candidate levels: mean_volume: -33.2 dB, max_volume: -4.9 dB. Baseline levels: mean_volume: -44.2 dB, max_volume: -14.5 dB. Audio was analyzed, **not heard**; actor-specific sound, subjective mix and perceptual synchronization are not certified by this review.

| Media | SHA-256 before and after (unchanged) |
|---|---|
| video/agent-evals/motion-v2/05/video.mp4 | `6f6a559572ad29fab32c370e361272a044879564d536cdc25e9fd01e6edbc179` |
| public/lessons/agent-evals/05.mp4 | `f83ccc50bbed0c95f09e0be0935bc0328790fd2b3fc67bdda7a3bc46dd9d2342` |

The decision binds only to this candidate hash. A repaired/replaced encode requires renewed actual encoded review and a fresh hash-bound decision. No media edits were made. Writes were restricted to this comparison, decision JSON and scratch/05 evidence.
