# Lesson 05 encoded comparison

**Decision: pass. Prefer the local candidate.** It demonstrates targeting the changed revision, checking an actual response, and retaining a limited result with that revision. No reproducible objective blocker was found. Optional refinements do not block this encode.

## Scope and method

Compared `video/context-engineering/motion-v2/05/video.mp4` with `public/lessons/context-engineering/05.mp4` against item 5 of `video/context-engineering/sequence/lessons.json`, “Verify the patch.” Required mechanism: claim needs evidence; run a saved v1 fixture against changed code; check the response field; retain result with patch revision.

Earlier planning context was acknowledged. No author source, self-review, other plan, production state, or provenance was consulted. The encoded outcome is judged independently of the previous plan. No media or other lesson was edited.

Viewed actual individual 350×622 frames: candidate samples 001–008 and baseline 001/003/004/006 from fps=1/5 extraction. Indices are not exact timestamps. Independent frame-index extraction with Pillow/Lanczos resizing and JPEG display was inspected at candidate 9,11,14,18,21,24,29,33,39,42.7s and baseline 7,14,21s. Candidate 33s was also viewed at full resolution. This is sampled visual review plus complete computational decoding, not continuous audiovisual playback.

## Comparison

| Criterion | Candidate | Baseline |
| --- | --- | --- |
| Causal clarity | Makes target mismatch and correction visible before running; compares literal expected and actual keys; saves b2 with the pass. | Correctly states the flow but uses a progress bar and field-present label rather than actual comparison or revision identity. |
| Accuracy | Initial b1 target is idle and rejected before execution; actual response and result both identify b2. Pass is explicitly key presence; latency is not measured. | Correctly limits its central claim to the checked contract, but lacks the candidate's explicit performance caveat. |
| Pacing | 42.8s allows revision alignment, observation, comparison, pass, and record to land separately. Final result has a sustained reading hold. | 28s, concise four caption-led phases with fewer inspectable details. |
| Native350 legibility | Main revision, key, actual response, pass, and result record are readable; subtitle and route metadata are smaller. | Larger captions read easily, but explanation depends more heavily on prose. |
| Meaningful variety | Revision highlights, run state, expected/actual comparison, and retained record each teach a distinct part of verification. | Generic patch/test/evidence boxes and test progress indicate sequence without exposing the mechanism. |

Candidate is the stronger teaching cut; baseline remains a coherent simpler alternative. Recommendation does not promote or publish the video.

## Timestamped evidence

- Early samples show patch rev b2, claims: keeps total_cents, and unverified status. The fixture is initially idle with target rev b1; compare has no result. This is a target-selection problem, not an executed stale pass.
- **9s:** mismatch remains visible. **11s:** patch b2 is highlighted while target b1 is red with an ×. **14s:** target is corrected to b2 while fixture remains idle. The comparison ties verification to the changed revision before running.
- Subsequent running sample shows response beginning to populate. **18s:** fixture is done and actual response from b2 contains invoice 42 and total_cents 1250. Comparison still says no result; response receipt alone has not been presented as assertion success.
- **21s:** expectation and actual response remain visible for reading. **24s:** matching keys are highlighted and PASS · key present appears. The claim is supported by an inspectable narrow observation rather than green status alone.
- **29s:** pass is being carried into the record. **33s:** patch, fixture target, actual response and recorded result all identify b2. Record reads rev b2 · v1 fixture · pass, with latency: not measured. Patch badge is checked @ b2. **39s:** complete state remains readable. **42.7s:** finite title ending.
- Baseline **7s** starts fixture-running phase; **14s** shows field present and a completed progress bar; **21s** instructs keeping result with revision. It states the same principle, but does not display the target correction, literal comparison, or specific revision-bound record.

## Accuracy limits

The revision labels, endpoint response, and fixture are illustrative, not captured execution in this repository. Key presence alone does not verify value, units, types, error handling, full compatibility, or performance. The 1250 value is displayed, not shown as an asserted equality. The explicit key-present result and latency-not-measured record appropriately constrain the pass.

The final checked @ b2 badge can be made narrower as an optional refinement; it is supported here by the visible key-presence assertion and performance caveat, and does not explicitly claim overall correctness or deployment readiness. No merge, human approval, or speedup is shown. Initial b1 is never shown running or producing accepted evidence; its correction is relevant to checking actual changed code rather than an unrelated repair workflow.

## Alternate extraction and suspected faults

Some displayed samples appeared to omit title or label fragments. Independent JPEG views at 14/18/24/33s retain the relevant states. At 33s the native350 JPEG and original-resolution independently decoded PNG show complete revision labels, expected/actual keys, pass, record, and latency limit without clipping. Inconsistent omissions in other displays do not substantiate an encoded missing-text fault. No reproducible objective visual blocker was found.

## Technical and audio checks

Both complete-file decodes exited 0 with no errors. Candidate: H.264, 1080×1920, 30fps, 1284 frames, 42.800s. Baseline: H.264, 1080×1920, 20fps, 560 frames, 28.000s. Both contain audio and have moov before mdat. Scratch retains stream probes, atom positions, frames, and decode outcomes.

Analyzed mean/max audio level: candidate −37.1/−10.0dB; baseline −42.7/−13.2dB. No measured peak approaches clipping. **Audio was not heard.** Stream presence and levels do not establish actor-specific sound, perceptual synchronization, or listening comfort.

## Optional improvements

1. Give the small lesson subtitle more prominence at native350.
2. Consider field checked @ b2 for the patch badge, keeping the result's narrow scope visible at both top and bottom.

These are refinements, not blockers.

## Integrity and decision binding

Both files were hashed before extraction and after inspection and remained unchanged. The decision applies only to the candidate hash below. A repair or new encode requires renewed actual encoded review and a new hash-bound decision, not merely replacing the hash.

- Candidate before: `1cf92b6502afc7a3be5662ec6c36482e97ffbc36fedc948d1c0f424722ccc1c9`
- Candidate after: `1cf92b6502afc7a3be5662ec6c36482e97ffbc36fedc948d1c0f424722ccc1c9`
- Baseline before: `ad120102b97e7c1c34f2da3f05342ad86e02d8d1b5c5ac891b2c87467a867358`
- Baseline after: `ad120102b97e7c1c34f2da3f05342ad86e02d8d1b5c5ac891b2c87467a867358`
