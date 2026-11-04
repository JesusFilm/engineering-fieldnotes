# Policy and permission — encoded comparison

**Decision: pass.** Prefer the local candidate for its simultaneous, separately labelled policy and permission verdicts, plus explicit evidence of non-execution. No reproducible objective blocker was established. No media was edited or published.

## Grounding and method

Scope: item 3 of `video/guardrails-and-permissions/sequence/lessons.json`. A policy judgment accepts a proposed action; authorization separately checks identity permission, denies the operation, and prevents execution. A policy pass is not a security guarantee.

Earlier planning context is acknowledged. No author source, plan reread or self-review was consulted. Viewed individual native-width 350×622 frames: candidate periodic samples 001–006; baseline 001, 003, 005. Exact candidate frames inspected at 8, 11, 14, 17, 20, 23, 25, 29, 35 and 38 seconds; baseline at 8, 16 and 22 seconds. Candidate 25 seconds was also inspected at full encoded resolution. Periodic sample indices are not asserted exact timestamps.

Periodic extraction used FFmpeg scaling to PNG. Alternate extraction decoded from the beginning and selected exact frame indices into full-size PNGs, followed by Pillow Lanczos resize to JPEG. The confidence value and settled verdicts were confirmed via alternate and full-size extraction. No visual clipping or missing-text fault was established; isolated display artifacts are not treated as defects. Evidence remains in `scratch/03/`. This is sampled frame/transition inspection, not continuous playback or exhaustive every-frame visual review.

## Comparison

| Dimension | Candidate | Public baseline |
|---|---|---|
| Causal clarity | One proposal A1 feeds separately labelled checks. Policy ACCEPTED remains while permission DENIED appears; calls stay zero. | Sequential generic boxes and captions explain the same distinction, but execution state is not directly displayed. |
| Accuracy | Identity is from session; deploy prod is required; grant is none. Policy acceptance does not mutate permission or live release r41. | Correct policy-pass/permission-denied sequence with explicit caption warning against override. |
| Pace | 38.4 seconds permits policy assessment, acceptance hold, identity/permission inspection, denial and final comparison. Some middle holding could be shorter. | 28 seconds is concise, using broad phases and explanatory captions. |
| Legibility | Main proposal, criteria, identity, grant and verdicts fit at native 350px. Small secondary labels remain interpretable with the larger values. | Labels and two-line captions are readable. |
| Meaningful variety | Side-by-side decision cards, scoped criterion, grant fields and execution register each serve a different explanatory purpose. | Repeated boxes and travelling check-access token offer a simpler schematic. |

## Observed sequence

- Opening samples: deploy r42 → prod, proposal A1; policy pending; permission not checked; calls 0 and live release r41.
- 8 seconds: policy check identifies judgment and recovery fit, with confidence activity. 11 seconds: ACCEPTED and confidence 0.82 appear while permission remains not checked.
- 14 seconds emphasizes zero calls; 17 seconds preserves acceptance without execution. This deliberate interval makes acceptance insufficient on its own.
- 20 seconds: permission check reveals investigator from session. 23 seconds: needs deploy prod, grant none and DENIED are visible. Policy remains ACCEPTED.
- 25 and 29 seconds retain opposite verdicts with zero calls. 35 seconds labels A1 not run, highlights both verdicts and retains r41. 38 seconds has faded to a title-only finite ending.
- Baseline 8 seconds shows policy pass before authorization; 16 seconds adds permission denied; 22 seconds retains both outcomes. It teaches the intended distinction correctly, but the candidate supplies more inspectable grounds and execution evidence.

## Accuracy limits and optional refinements

The judgment label identifies this policy check as fallible assessment. It does not demonstrate all possible deterministic checks or prove reliability. The policy and permission decisions answer different questions; denial is not evidence the recovery-fit judgment was wrong. Session authentication is assumed established. The example shows one checked execution path, not proof of complete enforcement across a real system.

1. Remove 0.82 or mark it illustrative. Its presence is confirmed at native size and full resolution, but this review has no evidence that it is calibrated or measured. The video does not equate it with safety or permit it to override authorization, so this unnecessary numerical specificity is an optional refinement rather than a blocker of the taught mechanism.
2. Consider shortening part of the 11–17-second acceptance hold. The current pause supports reading and does not constitute a broken transition; tightening it would improve economy only.

## Technical checks and audio limitation

Both complete audio/video decodes exited successfully. Candidate: 1080×1920, 30 fps, 1152 frames, 38.4 seconds. Baseline: 1080×1920, 20 fps, 560 frames, 28 seconds. Both place moov before mdat.

Audio signal measurements: candidate mean −34.6 dB, maximum −3.6 dB; baseline mean −44.2 dB, maximum −13.9 dB. Both have signal and headroom. **Audio was analyzed, not actually heard.** Actor-specific cues, synchronization and subjective balance are not listening-verified.

## Hash binding

- Candidate before: `b54d986866b71893d2a44c0375919b7cc9269de673bc83ceba4543b414966109`
- Candidate after: `b54d986866b71893d2a44c0375919b7cc9269de673bc83ceba4543b414966109`
- Baseline before: `b1cd0c713a6694ef155355f20600258bc1e04385added091c4b3dbeafc44b54f`
- Baseline after: `b1cd0c713a6694ef155355f20600258bc1e04385added091c4b3dbeafc44b54f`

Both hashes remained unchanged. This decision applies only to the candidate hash above. Any repaired or replacement encode requires renewed actual encoded inspection and a decision bound to its new full hash; replacing the hash alone is insufficient.
