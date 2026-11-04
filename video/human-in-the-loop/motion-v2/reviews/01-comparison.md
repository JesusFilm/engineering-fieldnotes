# Lesson 01 comparison — Propose, review, execute

**Pass.** Prefer the local candidate: it makes preparation, human decision and execution authority concrete without implying that submission or passing tests authorizes deployment. No reproducible objective blocker was found in the inspected samples. Optional refinements are not blockers.

## Scope and inspection

Grounded in `video/human-in-the-loop/sequence/lessons.json` item 1. The assigned sequence ends with the executor waiting for authorization; completing deployment is not necessary to teach this lesson. Earlier planning context is acknowledged but not used as encoded evidence. No author source, plan or self-review was read for this comparison.

Viewed actual individual 350px decoded frames: seven candidate and five baseline periodic samples from FFmpeg `fps=1/6,scale=350:-1`. Alternate extraction used full decoding with frame-index selection, then Pillow Lanczos resizing to 350×622 and JPEG output. Exact candidate times inspected: 0, 6, 10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 38, 39s. Baseline exact times: 7, 14, 21, 27s. Also inspected candidate36s at full resolution. This is sampled frame/transition analysis, not continuous playback or an every-frame audit. Alternate extraction corroborated readable content and layout; no unconfirmed clipping or missing-text fault is flagged.

## Comparison

| Dimension | Candidate | Public baseline |
|---|---|---|
| Causal clarity | Concrete service/action/target/evidence fields become submitted; reviewer examines them; executor receives A but lacks a decision and remains waiting with zero deployment calls. | Correct role chain, with captions carrying most of the distinction between preparation and permission. |
| Accuracy | Passing test evidence stays separate from authorization. Human deciding is not decided. Production retains its previous release. No unauthorized deployment is portrayed as occurring. | Correctly says the proposal alone cannot trigger execution and leaves executor waiting. |
| Pace | 40s separates preparation, submission, field inspection, pending decision, executor checking and final waiting. Meaningful holds preserve the unchanged production state. | 28s with four readable caption phases, but less concrete evidence to inspect. |
| Native350 legibility | Key proposal fields, role states, pending/missing decision, zero counter and current production release are readable. Secondary labels are compact but discernible. | Spacious node labels and readable captions; less on-screen detail. |
| Meaningful variety | Capability/status rows, a structured proposal, executor authorization state and current production status perform different functions. Rectangular UI remains purposeful rather than a generic three-box compiler. | Similar stacked agent/reviewer/executor boxes and one proposal transfer. |

## Encoded evidence

- At6s the agent is preparing a draft deployment proposal for checkout production, with tests-passed evidence. Production remains the previous release.
- At10s the draft still has not deployed; the crossed-out left-side route indicates no direct agent-to-production execution path.
- At12s agent/proposal become submitted and the human becomes reviewing. At14/16s target and evidence receive separate emphasis.
- At18s decision is explicitly pending. At20s executor is checking with deploy calls0; at22s it has proposal A; at24s decision is missing.
- At28s executor is waiting. At32s the human is deciding while the proposal remains pending; at36–38s the same pending/missing/zero-call states persist and production remains unchanged.
- At39s the stage clears to the title after the final state hold. This finite ending is acceptable.
- Baseline7/14/21s samples show caption changes from review to authorization wait to role separation. At27s the executor still waits; no completed deployment is suggested.

## Accuracy limits and optional refinements

The interface illustrates a role separation and execution check, not an implementation proof. UI labels alone would not enforce access control. Production credentials need not be granted to the proposing agent; exact credential management is outside this lesson. Tests passed is supporting evidence, not permission or correctness proof. Proposal A is a simple teaching identifier; identity binding, stale approvals, retries and durable decision storage are intentionally not demonstrated. The absence of an approval is a normal pending state, not rejection.

1. Consider fading the crossed-out agent-to-production route once the executor becomes active; it competes slightly with the actual proposal-check path.
2. Consider retaining the pending/zero-call/unchanged-production state through the final second rather than clearing to the title.

## Technical verification and hash binding

Both videos are1080×1920 with audio. Candidate40.000s at30fps; baseline28.000s at20fps. Full audio/video decoding completed with exit code0 for both, and both place moov before mdat. Candidate levels: mean_volume: -34.6 dB, max_volume: -6.4 dB; baseline: mean_volume: -47.3 dB, max_volume: -15.1 dB. Audio was analyzed, **not heard**; actor-specific timbre, subjective mix and perceptual synchronization are not certified.

| Media | SHA-256 before and after (unchanged) |
|---|---|
| video/human-in-the-loop/motion-v2/01/video.mp4 | `5ce494393bca1f90c6732139c846f57623634527f33ef061430f72a21943ae25` |
| public/lessons/human-in-the-loop/01.mp4 | `92483870adbdf66eb62cffc7af718b3c2d13e05e7692a5545185a662ebd7df5f` |

The decision applies only to this candidate hash. Any repair/new encode requires renewed actual encoded inspection and a fresh hash-bound decision. Neither media file was edited. Writes are restricted to this comparison, decision JSON and scratch/01 evidence.
