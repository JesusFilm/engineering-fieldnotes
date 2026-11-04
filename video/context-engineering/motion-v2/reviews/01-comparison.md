# Lesson 01 encoded comparison

**Decision: pass. Prefer the local motion-v2 candidate.** Its contrasting calls and explicit read/copy operation make existence versus supplied context concrete. No reproducible objective blocker was found. Optional refinements do not block this encode. No media, public/site content, or other lesson was changed.

## Grounding and method

Compared `video/context-engineering/motion-v2/01/video.mp4` with `public/lessons/context-engineering/01.mp4` against item 1 of `video/context-engineering/sequence/lessons.json`, “What the model can see.” Required mechanism: a contract exists on disk, the application selects content, the model receives the assembled input, and inclusion is checked for that invocation.

Earlier planning context was acknowledged. No author source, self-review, other plan, production state, or provenance was consulted. This review judges the encoded result, not fidelity to a prior plan. In particular, the candidate's two-call contrast is valid for the invocation-specific lesson; it does not require adopting a one-call plan.

Inspected individual native350 frames (350×622), not contact sheets: all candidate samples 001–011 from a four-second sampling extraction; baseline samples 001,003,005,007. Sample indices are not exact timestamps. Independently decoded frame-index extracts, resized with Pillow/Lanczos and displayed as JPEG, were inspected at candidate 8,12,14,16,19,24,28,34,38,44.8s and baseline 7,14,21s. Candidate 19s was also viewed at full resolution. Complete computational decode is distinct from sampled visual inspection; continuous playback is not claimed.

## Comparison

| Criterion | Candidate | Baseline |
| --- | --- | --- |
| Causal clarity | Call 1 receives instructions/task but no contract; the application reads and copies an actual requirement before call 2. The log exposes the difference. | Correct narration and flow, but the contract remains an abstract label and application selection is largely explained by captions. |
| Accuracy | Clear draft/sent/received states and distinct call identities. The source remains on disk after copying. Inclusion is not presented as compliance. | Correctly distinguishes a repository file, selected input, and model receipt. |
| Pace | 44.9s supports an absent/present contrast, read/copy transition, delivery, and final log audit. Holds let the concrete labels land. | 28s, four broad caption-led phases; simpler but less demonstrative. |
| Native350 legibility | Main file, requirement, task, call identifiers, and status chips are readable. The tiny spaced subtitle is less useful than the oversized topic title. | Larger sentence captions read well; less small metadata, but much more prose carries the lesson. |
| Meaningful variety | Although four panels are stacked, they serve distinct roles: call log, repository rows, assembled input, and received-content chips. Selection/copy and log audit are mechanism-specific state changes. | Generic repository/input/model boxes with traveling tokens; little inspectable content changes. |

Candidate is the stronger teaching cut. Baseline remains a valid concise alternative. This is an editorial recommendation, not promotion to the public curriculum.

## Causal transitions and evidence

- Early sampled frames show `invoice-v1.md` and `keep total_cents` on disk. The draft input contains instructions and `task: fix invoice timeout`, with `no contract`. The repository preview is viewer-facing evidence of existence, not evidence of model receipt.
- **8s:** application sends call 1; input becomes sent and the model receipt animation begins. **12s:** the received model view explicitly contains instructions/task and `no contract`, while the contract remains visibly present in the repository. The first contrast is given time to register.
- **14s:** the application explicitly starts call 2, input is draft, and the model returns to idle. This avoids silently rewriting call 1. The task row is still assembling at this transition, not asserted missing from a completed request.
- **16s:** application reads `invoice-v1.md`. **19s:** `copies excerpt` is shown, the source requirement is selected, and a routed trace terminates at the identical `keep total_cents` text in the draft input. The original stays in place. The filename alone is not substituted for its contents.
- **24s:** application sends call 2; input is sent while model delivery is still in progress. **28s:** received model chips include the requirement. No generated patch or claim of obedience is needed to demonstrate availability.
- **34s:** the application checks its log and marks call 1 `contract missing`; other panels dim to direct attention. **38s:** call 2 is marked `contract included`. Red/green and ×/check refer to inclusion, not software correctness. Later sampled frames retain the audit before the finite title ending at **44.8s**.
- Baseline **7s** introduces application selection, **14s** shows contract included and begins model delivery, and **21s** names invocation specificity. Its captions accurately state the intended mechanism, but the candidate demonstrates the same distinction with concrete content and contrasting call records.

## Accuracy limits

The panels are an instructional abstraction, not an actual API payload or captured model internals. The received chips stand for supplied information, not attention, internal reasoning, understanding, or guaranteed compliance. The clip makes no claim that model weights contain no prior knowledge. A real application can preload files or return tool reads; the example's explicit read does not imply every system requires manual inclusion.

The call log records inclusion only. The green check does not verify the invoice implementation or enforce a permission. No error-producing patch is fabricated for call 1. The two calls illustrate per-invocation input and do not teach compaction, memory persistence, handoff recovery, or other later mechanisms.

## Suspected visual faults and alternate extraction

Some PNG displays appeared to omit portions of the title or labels. The candidate transition near 14s was independently extracted by frame index (420), resized independently, and viewed as JPEG. It retains the full title, application label, call identifier, and source requirement. Candidate 19s native350 JPEG and original-resolution PNG retain the selected excerpt and destination text without clipping. These checks do not support a missing-text defect; inconsistent display omissions are not blockers. Final audit text is also intact in the independent 38s view.

## Technical verification and audio limits

Both entire-file decodes exited 0 with no errors. Candidate: H.264, 1080×1920, 30fps, 1347 frames, 44.900s. Baseline: H.264, 1080×1920, 20fps, 560 frames, 28.000s. Both have audio streams and moov before mdat for progressive delivery.

Analyzed mean/max audio levels: candidate −33.9/−8.4dB; baseline −42.7/−10.5dB. No measured peak approaches clipping. **Audio was not heard.** Stream presence and levels do not establish perceptual synchronization, actor-specific timbres, or listening comfort. Scratch retains probes, decode outcomes, levels, frame extracts, and atom positions in `inspection.json` and per-video evidence folders.

## Optional improvements

1. Enlarge the lesson subtitle or give it more prominence than the topic title. Its current small spaced letters are secondary; the main lesson remains clear from the panels.
2. Retain a compact source label beside the received requirement to strengthen traceability. The copied text already establishes inclusion, so this is refinement rather than a missing mechanism.

## Hash binding

Both inputs were hashed before extraction and after inspection and remained unchanged. This decision applies only to this candidate encode. Any repair/new encode requires renewed actual encoded inspection and a new hash-bound decision, not simply replacing the stored hash.

- Candidate before: `b7f100565be4f633153b9b36e668bcf309b2617ddb770ff705d93e40ef4aabd2`
- Candidate after: `b7f100565be4f633153b9b36e668bcf309b2617ddb770ff705d93e40ef4aabd2`
- Baseline before: `24935f40fbbe26d9caa30040ce6ad6c6c9a5028c00336661014a543435964172`
- Baseline after: `24935f40fbbe26d9caa30040ce6ad6c6c9a5028c00336661014a543435964172`
