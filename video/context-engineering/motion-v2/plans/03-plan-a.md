# Lesson 03 — Preserve a constraint

## Scope and grounding

One mechanism: keep an explicit compatibility requirement and its authoritative reference visible when an agent proposes an optimization. The internal implementation can change while the public response field remains `total_cents`. A compatible-looking proposal still needs verification.

Grounding: item 3 of `video/context-engineering/sequence/lessons.json`; example, judgment, and walkthrough step 1 of `content/concepts/context-engineering.json`. Existing v1 clients require the field; the task is invoice latency; the requirement and contract reference must accompany the edit decision. End with verification pending, not a completed test or measured speedup.

[Primary context-engineering account](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), checked in this conversation on 2026-10-20, supports clear instructions and relevant supplied context. The invoice requirement is the curriculum's illustrative example. The layout and proposed implementation below are editorial illustrations, not a benchmark or captured model behavior. A visible instruction guides behavior; it is not an enforced permission or a correctness guarantee.

Exclude retrieval/search mechanics, handoff loss, compaction, test replay, actual compatibility-test execution, merging, performance measurement, and other later mechanisms. No deliberately bad model proposal is needed. Show one proposed change and its unchanged interface.

## Design: an edit with an invariant line

Use an inline change-review surface. A supplied requirement ribbon stays above the proposed implementation diff. Below the diff, an unchanged response-field line stays aligned with a client field lookup. This makes the boundary between internal change and public compatibility concrete without a generic agent/tool/output pipeline.

Four beats, approximately 42 seconds. 1080×1920, 30 fps. Near-black #050506, white #E6E8EC, secondary #A8ADB5, amber #F5A524. Red and teal are used only for removed/added diff lines with explicit minus/plus signs, not test failure/pass. The unchanged interface is white with an amber underline. No physical lock, shield, barrier, conveyor, or brain metaphor.

### Coordinates

Rectangles are x/y/w/h; text points are baseline positions. Main text 50–56px, necessary metadata at least 46px (about 15px at native350). Title 84px. Avoid side-by-side code panes that would force small type.

| Element | Position | Contents |
| --- | --- | --- |
| Title | 90/250/900/120 | `Preserve a constraint`, 80px, two short lines if needed |
| Task line | baseline (120,460) | `Task: fix invoice latency`, 50px |
| Requirement ribbon | 90/510/900/270 | Header `Supplied constraint`, baseline (120,570), 48px. `Keep total_cents`, baseline (120,650), 56px. `api/v1.md · rev a17`, baseline (120,725), 46px. |
| Change-review surface | 90/835/900/460 | Header `Agent proposal`, baseline (120,895), 50px. File `src/invoice.py`, baseline (120,965), 46px. Diff lines at (125,1060), (125,1145), 52px. Status at (125,1235), 46px. |
| Response-field surface | 90/1340/900/170 | Header `v1 response`, baseline (120,1395), 46px. `total_cents: total`, baseline (120,1470), 52px mono. |
| Client lookup | baseline (120,1600) | `client: total_cents`, 50px mono; stable evidence of the consumer's expected field |
| Verification status | 90/1650/900/115 | `Compatibility check: pending`, 46px, amber outlined badge; appears in final beat |

Opening uses the response-field surface higher on screen at y=835, with the client lookup at y=1110. The requirement ribbon starts as `v1 contract` with the same requirement/reference. During beat 2 the response surface and client lookup move down to their final coordinates over 0.8s, creating room for the proposal. Text remains full-size throughout. No simultaneous reading-critical motion.

Illustrative diff, one short line per change:

- `− rows = load_one_by_one()`
- `+ rows = load_batch()`

These are pseudocode, labelled `illustrative` beneath the diff. The functions are illustrative placeholders, not proposed changes to this repository. Their purpose is to show an internal loading strategy changing; the animation does not claim equivalent behavior or proven lower latency. Keep `total_cents: total` as an unchanged semantic response line, not a fabricated executable serialization snippet.

## Timed motion, state, and sound

| Time | Motion and holds | State / teaching | Sound |
| --- | --- | --- | --- |
| **0–10s: establish what must remain** | Title/task settle 0–1. Contract ribbon appears 1.5–2.2. Response field appears 3.0; client lookup at 4.0. At 5.0 a thin amber underline draws under `total_cents` in the response, then the identical client field at 5.8. Hold 6.5–10. | The v1 contract states the requirement; the existing client expects that field. No agent proposal yet. Underlines connect identical names, not a live network transaction. | Contract/source `arrive` G4 at 2.2; response `store` C4 at 3; client `ack` E5 at 4; quiet inspector `ack` C5 at 5.8. |
| **10–19s: supply the requirement with the task** | 10.3 contract header changes to `Supplied constraint`, briefly outlined white. Requirement and reference remain together. Hold 11–13. At 13.2–14.0 response/client move to final positions. Proposal surface appears 14.8, labelled Agent proposal; file label at 15.5. Hold 16–19. | The edit decision now has the explicit unchanged-field instruction and its source. Nothing is hidden behind a path-only reference. Context is supplied before the edit is proposed. | Application/context `store` C4 at 10.3; agent `arrive` D5 at 14.8; quiet file `ack` G4 at 15.5. |
| **19–31s: change implementation, preserve interface** | At 19.5 show original loading line with minus marker. Hold to 21.5. At 22.0 add batch-loading line with plus marker. Hold 22.6–25.5. At 26.0 briefly emphasize the unchanged response field, then the same name in the supplied constraint at 26.8. At 27.6 show `Field unchanged` beneath diff. Hold 28–31. | Agent proposes internal work without renaming the public field. The response field never morphs to another name. The source reference stays visible. Plus/minus marks mean diff changes, not a successful optimization. | Agent `work` D4 at 19.5; agent `store` D5 at 22; response/inspection `ack` C5 at 26; context `ack` C4 at 26.8; quiet inspector `store` C4 at 27.6. |
| **31–42s: proposal still needs verification** | At 31.5 the proposal border returns to neutral; unchanged-field underline remains. At 32.5 verification badge appears with an empty square and `Compatibility check: pending`. At 33.5 label beneath diff becomes `Proposal · unverified`. Hold complete state 34–40.8. Fade lower stage 40.8–42; title remains. | The visible constraint guided this illustrative proposal. Neither the check nor performance measurement has run. No green pass, test count, published result, or automatic acceptance. The finish is intentionally pending. | Verification role `arrive` A4 at 32.5, restrained neutral cue; agent status `ack` D4 at 33.5. Silence through final hold/fade; no chime. |

The underlines are reviewer annotations, not a diagram of model attention. Use a single attention cue at a time. No permanent wires; the repeated field text supplies the relationship. Keep total_cents and the reference readable even while the diff animates.

## Sound map

Contract/source G4; application/context C4; agent D4–D5; client E5; verification A4. Use sparse short synth cues from the local engine's arrive/store/ack/work presets. Pan to the active element, mostly centred. Added-line sound is a neutral store cue, not a success melody. No clock, typing barrage, narration, music, or dramatic failure cue. Mute viewing must still distinguish the requirement, proposed implementation, unchanged public field, and pending verification.

## Accuracy limits

- This demonstrates guidance by supplied context, not deterministic obedience. Do not label the constraint enforced or imply the model cannot violate it.
- The contract is authoritative within the illustrative fixture. The filename alone does not establish that authority. The displayed actual requirement and reference must stay paired; the human still determines the correct requirement.
- Paths and revision a17 are invented teaching references, not verified repository artifacts. Retain them consistently rather than implying a real checkout or benchmark.
- Keeping the field name is one compatibility condition. Types, units, values, error behavior, and other API semantics may also matter. `Field unchanged` is deliberately narrower than `Compatible` or `Safe`.
- Batch loading is an illustrative proposal, not proof of speedup or semantic equivalence. Do not show milliseconds, reduced latency bars, fewer guaranteed queries, or an implied performance test.
- The final pending check is a reminder of required verification, not a simulated completed test. Do not perform the next lesson inside this one.
- The client lookup is a compact representation of dependence on a response field, not a runnable snippet or a live request trace. No model output quality measurement is claimed.
- An instruction in context does not enforce tool permissions or validate a patch. Keep the proposal visually distinct from the contract and the pending verification state.

## Native350 acceptance and later production checks

This plan does not claim rendered verification.

1. Inspect separate encoded frames at 3.5, 7, 11.5, 15.8, 20.5, 23.5, 28.5, 34.5, and 39.5 seconds at native350 and full resolution. Inspect ±0.25s around layout movement, diff insertion, and pending-state arrival. A contact sheet alone is insufficient.
2. At 350×622, the exact field name, supplied requirement, contract reference, proposed diff, and pending verification must read without zoom. Measure the 46px badge and reference strings; wrap intentionally or enlarge space rather than shrinking essential text. Maintain at least 24px padding.
3. The field name must remain byte-for-byte `total_cents` in contract, response, and client throughout. No temporary rename, dropped source reference, or stale success color during transitions.
4. The requirement and its source appear in supplied context before the proposed diff. The task remains visible during decision-making. Do not suggest that a file's existence automatically supplied its contents.
5. Native350 inspection must clearly distinguish modified implementation lines from the unchanged response line. Plus/minus signs accompany diff colors. Teal addition does not bleed into the verification badge.
6. Mute comprehension: viewer can name what may change, what must not change, where that rule comes from, and what remains unverified. No paragraph caption is needed to answer those four questions.
7. Final hold is at least 6 seconds with the requirement, proposal, unchanged field, and pending badge visible together. Extend timing if needed; never compress reading to reach 42 seconds.
8. Later production: decode the entire MP4; inspect all beat boundaries; check audio peaks below −0.5dB, audio stream, and moov-before-mdat metadata. State whether audio was heard or only analyzed. Reproduce alleged visual faults using alternate extraction before flagging display omissions.
9. Bind eventual comparative review to actual encoded before/after hashes. A new encode needs renewed encoded inspection. Separate optional teaching refinements from reproducible blockers.

## Execution boundary

Write only this plan. No rendering, other lesson work, current other-plan/author-source inspection, production-state/provenance reads, public/site/shared-skill edits, Git commits, or deployment. Later implementation uses repository-pinned Puppeteer dependencies and a local engine copy; drawing changes stay local to the cut. Retain local candidates.
