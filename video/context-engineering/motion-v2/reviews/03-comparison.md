# Lesson 03 encoded comparison

**Decision: pass. Prefer the local candidate.** It makes the unchanged public field concrete alongside an internal implementation diff, preserves the requirement and source reference, and explicitly finishes unverified. No reproducible objective blocker was found. Optional improvements below do not block this encode.

## Scope and method

Compared `video/context-engineering/motion-v2/03/video.mp4` with `public/lessons/context-engineering/03.mp4` against item 3 of `video/context-engineering/sequence/lessons.json`, “Preserve a constraint.” Required mechanism: clients expect total_cents; supply that unchanged-field requirement with its authoritative contract reference; show a proposal that preserves it; retain the need for verification.

Earlier planning context was acknowledged. No author source, self-review, other plan, production state, or provenance was consulted. The encoded result is judged independently of prior planning choices. No media or other lesson was edited.

Actual individual 350×622 frames were viewed, not contact sheets: candidate samples 001–011; baseline 001/003/005/007, from fps=1/4 extraction. Sample indices are not exact timestamps. Independent frame-index extractions resized with Pillow/Lanczos and displayed as JPEG were inspected at candidate 8,10,12,16,19,24,28,32,36,39,44.1s and baseline 7,14,21s. Candidate 39s was also inspected at full resolution. This is sampled visual inspection and complete computational decoding, not continuous audiovisual playback.

## Comparative findings

| Criterion | Candidate | Baseline |
| --- | --- | --- |
| Causal clarity | Concrete response field, hypothetical rename consequence, explicit supplied requirement, and an internal diff retaining the field. | Correctly states the principle, but proposed patch is represented mainly by a field-preserved label. |
| Accuracy | Rename is labelled `if renamed`; actual proposal keeps total_cents and ends unverified with a pending check. | Correctly says a check is still needed; compatibility claim is verbal and abstract. |
| Pacing | 44.2s gives time for the dependency, requirement/source, diff, and pending verification. Final hold is deliberate. | 28s; concise four caption-led stages, less concrete detail. |
| Legibility at 350px | Main response text, input requirement/reference, short diff, unchanged label, and pending status read. Tiny spaced subtitle is secondary. | Larger captions are easy to read, but much more meaning depends on prose. |
| Meaningful variety | Two client consumers, response rows, input requirement, and a real diff grammar serve different roles. Matching-field highlights show preservation across views. | Repeated contract/input/patch boxes and tokens provide a generic flow. |

Candidate is the stronger teaching cut; baseline remains a coherent simple alternative. This recommendation is not promotion or publication.

## Timestamped evidence and transitions

- Early sampled frames introduce mobile/web clients and a v1 response with invoice 42 and total_cents 1250. The separate client boxes make an external consumer relationship visible, although a short lookup label would strengthen it.
- **8–10s:** response field is temporarily `amount`, explicitly annotated `if renamed`; clients become red. This is a hypothetical compatibility consequence, not a claim that a real agent made this edit. **12s:** total_cents is restored before the agent input/proposal sequence.
- **16s:** agent input contains `goal fix invoice latency`, `keep total_cents`, and `ref api/v1.md · a17`. **19s:** the requirement/reference and response are visually linked. Both instruction and source remain visible as the proposal is introduced.
- **24s:** proposal shows removal of `rows = load_one_by_one()`. **28s:** addition `rows = load_batch()` is present, while `"total_cents": total` is labelled unchanged. Plus/minus symbols distinguish diff semantics from test outcomes.
- **32s:** status becomes proposed; response field and supplied requirement remain stable. **36s:** status is unverified and the explicit `compatibility check: pending` row appears. **39s** and the later sample retain this state. **44.1s:** finite title ending. No tests, acceptance, or measured speedup are claimed.
- Baseline **7s** asks to include the requirement/reference; **14s** begins the proposed-compatible-edit phase; later samples show field preserved. **21s** explicitly states verification is still required. The candidate demonstrates the same relation with actual field strings and code-change notation.

## Accuracy limits

The example paths, revision, function names, and numeric response are illustrative, not verified repository artifacts or measured behavior. The loading change is a proposed optimization; neither equivalence nor performance improvement is established. The final unverified/pending state correctly limits the claim.

Keeping a field name is only one compatibility condition: values, units, types, and other behavior can still change. The unchanged label applies to the displayed field, not overall correctness. Supplied context guides an edit; it does not enforce permissions or guarantee model obedience. The reference identifies the intended contract without demonstrating its full authority-checking process. This lesson need not repeat retrieval or perform later verification work.

The opening red clients illustrate the stated dependency under the explicitly hypothetical rename. They are not empirical failure reports. No automatic repair, deployment, or approval follows.

## Alternate extraction and suspected faults

Some displayed frames appeared to omit text fragments. Independent candidate 28/32/36s JPEG views retain the complete response, requirement, and diff. At 39s, the native350 JPEG display itself appeared to lose fragments, while the original-resolution independently extracted PNG retained the complete field, reference, diff, and pending badge. This inconsistency does not support an encoded missing-text defect. No reproducible clipping or overlap was found in the stable teaching states. Suspected display omissions are not blockers.

## Technical checks and audio limits

Both complete-file decodes exited 0 without errors. Candidate: H.264, 1080×1920, 30fps, 1326 frames, 44.200s. Baseline: H.264, 1080×1920, 20fps, 560 frames, 28.000s. Both contain audio streams and have moov before mdat.

Analyzed mean/max audio level: candidate −36.1/−7.1dB; baseline −44.2/−12.5dB. Neither measured peak approaches clipping. **Audio was not heard.** Levels and stream presence do not verify actor-specific timbres, perceptual synchronization, or listening comfort. Probes, audio logs, frames, decode outcomes, hashes, and atom positions are retained under `scratch/03/`.

## Optional improvements

1. Give the lesson subtitle more prominence relative to the topic title at native350.
2. Add a short expected-field cue to the clients or a clearer visible lookup relationship, reducing reliance on red outlines during the hypothetical rename.

These refinements do not undermine the current lesson or require a fix-needed verdict.

## Integrity and decision binding

Both inputs were hashed before extraction and after review; both remained unchanged. This decision applies only to the candidate hash below. Any repair or re-encode requires renewed actual encoded inspection and a new hash-bound decision, not a replacement hash alone.

- Candidate before: `5da9277e6d823e301169bcf56608746dbdf1d262ced4d29537775372fb9bec69`
- Candidate after: `5da9277e6d823e301169bcf56608746dbdf1d262ced4d29537775372fb9bec69`
- Baseline before: `3b5e4a7c51d82472e3d860beae0a7dc6dd99db32aa5aa14735a9eaea49dd5cb5`
- Baseline after: `3b5e4a7c51d82472e3d860beae0a7dc6dd99db32aa5aa14735a9eaea49dd5cb5`
