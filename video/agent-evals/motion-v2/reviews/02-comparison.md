# Lesson 02 comparison — Check actual behavior

**Pass.** Prefer the local candidate: it demonstrates execution, observation, comparison and recording with concrete retained states. No reproducible objective blocker was found in the inspected samples. Optional refinements do not prevent acceptance.

## Scope and inspection

Grounded in sequence/lessons.json item 2: an agent claim is not evidence of behavior; run the changed code with an empty password, compare rejection to the expected outcome, and record this case while other required cases remain untested. Earlier planning context is acknowledged but was not used as encoded evidence. No author source or self-review was read.

Viewed individual decoded frames at native 350px width, not a contact sheet: six candidate and five baseline samples generated using FFmpeg fps=1/6 and scaling. Follow-up extraction decoded from the beginning with frame-index selection, then used Pillow Lanczos resizing and JPEG output. Candidate exact times inspected: 0, 6, 10, 11, 12, 14, 16, 18, 20, 23, 25, 29, 32, 34 seconds. Baseline exact times: 7, 14, 21, 27 seconds. Also inspected the candidate's 25s full-resolution frame. This is sampled state/transition analysis, not continuous playback or an exhaustive every-frame audit. Alternate extraction confirmed the readable content and layout; no alleged clipping or missing-text fault is being flagged.

## Comparison

| Dimension | Candidate | Public baseline |
|---|---|---|
| Causal clarity | Empty input travels to P1 login code; execution precedes observed rejection; expected and observed values are separately emphasized before pass is recorded. | Captions explain the correct sequence, but most of the mechanism remains abstract inside three boxes. |
| Accuracy | Claim route ends in a cross; the claim never fills the observed result. Expected rejection precedes the run. Only the empty-password case passes; valid-password case remains not run. | Accurate captions explicitly explain the claim/result distinction and remaining checks. |
| Pace | 34.6s with distinct running, returned, observed, pass and recorded states; holds permit reading before the next step. | 28s with seven-second caption phases; spacious but less concrete. |
| Legibility at 350px | Main labels, empty-input annotation, rejected values and saved pass are readable. Pending-case text is discernible but unnecessarily dim. | Main labels and captions are readable; supporting prose takes more visual attention. |
| Meaningful variety | Side-by-side input/code geometry, a comparison panel and a record panel have different roles. It is more than a repeated three-box pipeline despite retaining rectangular UI panels. | Similar stacked nodes with transfer chips and a progress bar. |

## Timestamped evidence

- Opening sample: agent says “Bug fixed”; check has predefined expected rejection and no observed result.
- 6s: empty input and idle login code are visible. The claim's side route has no successful connection to the check.
- 10s: empty-input chip reaches code. At 11–12s code and check are running, with no observed value or pass.
- 14s: code has returned but the observation is still blank. At 16s observed rejection appears, with status `observed`, not pass.
- 18s: expected rejection is highlighted while observed rejection remains visible. At 20s both values are highlighted and the check passes.
- 23s: a pass chip travels toward the record. At 25s P1's empty-password pass is stored and the unrun valid-password row receives outline emphasis.
- 29–32s: the bounded result persists; the claim is dimmed. At 34s the stage has cleared to the title, an acceptable finite ending after the result hold.
- Baseline 7/14/21s samples show successive captions for execution, passing rejection and recording. At 27s its caption explicitly says other required cases still need testing.

## Limits and optional refinements

This is an illustrative behavior check, not proof that an actual patch or production authentication system was tested. Rejection is the intended application outcome, so the green check correctly means the test passed. No HTTP semantics are invented. A valid-password outcome is not shown; the single case does not establish overall correctness or release readiness.

1. Raise the contrast of “valid password not run” during the final hold so the bounded scope is easier to notice at 350px.
2. Consider shortening or fading the left-side crossed-out claim route after its point lands; it competes slightly with the active execution/result path.

## Technical checks and immutable binding

Both encodes are 1080×1920 with audio. Candidate: 34.600s at 30fps. Baseline: 28.000s at 20fps. Both fully decoded with exit code 0; both place moov before mdat. Candidate signal levels: mean_volume: -33.1 dB, max_volume: -7.2 dB. Baseline: mean_volume: -42.7 dB, max_volume: -13.2 dB. Peaks are below -0.5dBFS. Audio was analyzed, **not heard**; this review does not certify actor-specific sound, subjective mix or perceptual synchronization.

| Media | SHA-256 before and after (unchanged) |
|---|---|
| video/agent-evals/motion-v2/02/video.mp4 | `4a4e20d5934f02a81865d01e08ae365f4e4e142e37b7e9610319855207a03eb3` |
| public/lessons/agent-evals/02.mp4 | `96f20244ee69e101ee39f735f8cd3247d5b46b405b8ef31e6c64162714a83c49` |

Decision applies only to this candidate hash. Any repair or new encode needs renewed actual encoded inspection and a new hash-bound review. No media was edited. Writes were restricted to this comparison, the decision JSON and scratch/02 evidence.
