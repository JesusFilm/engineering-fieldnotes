# Act, observe, decide — lesson 01 motion plan

## Scope and grounding

Teach one mechanism: an agent proposes a tool action, the tool returns evidence, and controller logic explicitly permits or prevents the next action. An observation does not itself execute the next call.

Grounding: `video/loop-engineering/sequence/lessons.json`, item 1; `content/concepts/loop-engineering.json`, especially the discount-test example and continuation judgment; `docs/editorial-workflow.md`; the architecture-flow-video skill and its style/review references. The sequence's 28 seconds is existing metadata, not a timing constraint for this independently designed cut. No new source verification is claimed.

Use one illustrative discount repair: 12 selected tests, one failing assertion, one permitted patch, then the same 12 tests passing. Stop for review. Exclude missing-test routing, retries, detailed permission design, handoff packaging, and other lessons. Target 48 seconds, six beats, finite ending. This document is a plan only; no scene or media is produced.

## Visual grammar

A single software execution console owns the stage. A solid execution cursor advances only when a proposed call is admitted. A visibly separate controller strip controls the pending-call slot. This is neither a three-node cycle diagram nor a branching rule dashboard: the viewer sees execution pause, evidence arrive, and the next-call slot become available. There are no physical objects or metaphorical machinery.

Persistent positions preserve causality. The tool's running indicator becomes actual output in place. Only after that output is settled does the controller change state. The next proposal enters an enabled slot; it never moves on its own. A small patch receipt is an action result, not a demonstration of how the agent invents code.

### Stage coordinates

1080 × 1920, 30 fps. Coordinates below describe bounding rectangles as `(x, y, width, height)` unless specified otherwise. Background `#050506`; foreground `#E6E8EC`; neutral `#8B9099`; amber `#F5A524` for running/admission; red `#E5484D` for failed assertions; teal `#3FB68B` for satisfied checks. Pair every colour with a word or shape.

| Element | Bounds / anchors | Content and behavior |
| --- | --- | --- |
| Title | (90, 240, 900, 180) | Two lines, `Act, observe,` / `decide`; 88 px bold. |
| Current phase | (90, 440, 900, 80) | One of `ACT`, `OBSERVE`, `DECIDE`; 64 px. |
| Console | (90, 560, 900, 820) | Quiet outline; header `Discount tests`, 62 px at (130, 620). No window chrome. |
| Execution cursor | center (145, 780), then (145, 1000) | 30 px solid chevron for executing; hollow for waiting. Never represents model thought. |
| Active call | (190, 720, 740, 130) | `Run 12 tests` or `Apply patch`, 68 px. |
| Evidence region | (190, 920, 740, 340) | Up to three short lines; 64 px minimum. Output replaces running indicator here. |
| Controller strip | (90, 1440, 900, 300) | `Controller`, 62 px at (130, 1500); state at (130, 1580), 64 px. |
| Pending-call slot | (540, 1540, 400, 120) | `Next call` label, 60 px; solid outline when enabled, dashed and empty when waiting, crossed at stop. |
| Budget indicator | (130, 1665, 800, 64) | `Calls left: 3`, then 2, 1, 0; 60 px. This is an illustrative total-call cap. |

The active-call text and evidence share a left alignment, not separate boxes. The pending-call slot is a state indicator, not a clickable user control. Proposals briefly use that slot before execution. Proposal text there is `Test` or `Patch` at 64 px; its label moves above the slot during those holds, avoiding overlap.

One event link only: a thin evidence-to-controller trace from (950, 1120) through (970, 1120), (970, 1410) to (890, 1440). Illuminate it on evidence receipt, then dim. No perpetual circuit arrows. An admitted proposal moves from slot center (740, 1600) via (1010, 1600), (1010, 780) to (560, 780), taking 1.0 s. Travel uses a small unlabeled outlined token; readable proposal and active-call text remain stationary at their respective endpoints. All text stays at least 40 px from the path.

At 350 px width, 60–88 px source text becomes about 19–29 px. Do not reduce type to fit. Keep the title to two lines and all operational labels to three words where possible. No paragraphs, narration captions, dense code, miniature logs, or animated text typing.

## Timed motion, state, and sound

Times are playback seconds. Motion uses gentle ease-in/out; state changes land before reading holds. Only one region moves at a time. Sounds are sparse, synthesized, without voice or music. Pitches distinguish actions (C5, about 523 Hz), evidence (E5, about 659 Hz), and decisions (G5, about 784 Hz). Sends are quieter than arrivals; pan follows the event's x position.

| Beat / time | Motion and visible state | Sound and reading hold |
| --- | --- | --- |
| 1. Propose and act · 0–8 s | 0–1: reveal console and controller; phase `ACT`, controller `Allowed`, budget `Calls left: 3`. 1–3: `Test` proposal rests in enabled next-call slot. 3–4: controller admits it; token travels to active-call position, cursor fills, slot becomes dashed/empty. At 4: active call `Run 12 tests`, budget becomes 2; controller `Waiting`. 4–5: a single progress sweep appears in evidence region with `Running`. 5–8: hold the active state. | `ack` G5 at 1; quiet `send` C6 at 3; `arrive` C5 at 4; two soft `work` ticks at 4.4 and 4.8. Silence during hold. |
| 2. Observe failure · 8–15 s | Phase `OBSERVE`. 8–9: progress sweep stops and is replaced by `12 ran · 1 failed`, then two aligned lines `Expected: 90` / `Actual: 100`. Red × beside first line; execution cursor becomes hollow. 9–11: hold output. 11–12: evidence trace illuminates downward; controller changes `Waiting` → `Evidence ready`. Slot remains unavailable. 12–15: hold. | Soft `thump` at 8.8 marks the assertion failure, not a crash. `arrive` E5 at 12 marks receipt. |
| 3. Decide to continue · 15–22 s | Phase `DECIDE`. 15–17: controller retains `Evidence ready`; visible failure above and two calls remaining. At 17: controller changes to `Continue`; slot outline becomes solid amber. 17–19: hold this decision without a proposal. 19–20: `Patch` appears in slot, while failed output remains visible. 20–22: hold. The separation demonstrates that continuation was authorized before the next action. | `ack` G5 at 17; quiet `send` C6 at 19. No sound implying execution yet. |
| 4. Act, then observe the edit · 22–30 s | Phase `ACT`. 22–23: admitted token travels upward; `Apply patch` replaces active call; budget becomes 1; controller `Waiting`; slot empties and disables. Previous test evidence fades completely by 23, so it cannot certify the new patch. 23–24: short progress sweep. At 24: phase `OBSERVE`, receipt `Patch applied`; below it `Tests pending` in neutral white. 24–26: hold. 26–27: evidence trace illuminates; controller reads `Evidence ready`. 27–30: hold receipt and unavailable slot. | `send` C6 at 22; `arrive` C5 at 23; `store` E5 at 24; quiet `arrive` E5 at 27. No success chime for an untested edit. |
| 5. Decide, then verify · 30–39 s | Phase `DECIDE`. At 30: controller changes to `Continue`, slot enables; budget still 1. 30–32: hold. 32–33: `Test` proposal rests in slot. 33–34: admission token travels; phase becomes `ACT`, active call `Run 12 tests`, budget becomes 0; controller `Waiting`. `Tests pending` clears only as this command starts. 34–35: running sweep. 35–36: phase `OBSERVE`, output becomes `12 ran · 12 passed`, teal check; cursor hollows. 36–39: hold verified result. | `ack` G5 at 30; quiet `send` C6 at 32; `arrive` C5 at 34; two quiet `work` ticks at 34.3/34.7; `arrive` E5 at 36. Reserve final chime for controller stop. |
| 6. Decide to stop · 39–48 s | 39–40: evidence trace lights; controller receives the passing observation. 40–41: phase `DECIDE`; controller changes to `Stop: passed`; next-call slot crosses out and loses active stroke. At 42: `Ready for review` replaces the expected/actual area beneath passing totals. 42–47: deliberate final reading hold; no cursor blink, new proposal, or reset. 47–48: fade to black. | `arrive` E5 at 40; soft two-note `chime` E5→G5 at 41. Final hold and fade are silent. |

The numerical assertion is an illustrative discount case, not real captured output. The two test invocations use the same intended 12-test selection. The patch is a permitted edit to the calculation module; assertions are not modified. The repeated execution surface and admission timings, rather than an explanatory sentence, establish the loop.

## Controller semantics and accuracy limits

- The controller is software enforcing the run policy. The agent proposes actions; it does not grant itself permission. Initial admission is already established when this excerpt opens.
- For this example, continuation needs usable evidence, an unfinished task, an in-scope proposed action, and remaining calls. The strip summarizes that decision; it is not an implementation of a complete policy evaluator.
- Three total tool calls are an illustrative cap for this short trace: test, patch, test. This differs from the topic exercise's larger limits and is not a recommended production default. Decrement on dispatch, not on result receipt. A zero remaining budget does not cancel an already admitted call.
- The first failure is usable evidence, not success or a crashed runner. A patch receipt is evidence that the edit was applied, not evidence of correctness. Only the second test output applies to the edited state.
- Success and budget exhaustion coincide at the end. Evaluate observed success first and show `Stop: passed`; zero budget independently prevents any further calls. Do not suggest that tests passed because the budget ran out.
- Passing the selected suite permits human review, not automatic merge, proof of correctness, or guaranteed convergence. The terminal label must remain `Ready for review`.
- Execution time is compressed and invented. No wall-clock latency or optimal attempt count is claimed. Missing evidence, timeouts, blocked permissions, and human intervention are deliberately outside this lesson.

## Acceptance checks for later production

These are required checks, not claims of completed validation.

1. **Single-watch causal reading:** a beginner can identify what executed, what came back, who allowed the next call, and why the run ended. They must not infer that failure automatically triggers edits or that the agent can bypass the controller.
2. **State ordering:** inspect 3–4, 11–12, 17–20, 22–24, 26–30, 33–36, and 39–42 seconds frame by frame. No execution precedes admission; no continuation decision precedes evidence. A disabled slot never dispatches. Budget progression is exactly 3→2→1→0.
3. **Evidence freshness:** old failure details disappear at patch execution; `Tests pending` survives until verification starts. Only the final run produces the passing result. No green patch receipt, old result attached to a new edit, or unexecuted proposed call is mistaken for success.
4. **Phone readability:** inspect full-size and 350 px-wide frames at 2, 6, 13, 18, 21, 25, 29, 31, 37, and 44 seconds plus every transition boundary. All labels are readable without zoom; the evidence row fits at the specified font size. If it does not, wrap totals across two lines within the reserved evidence region; never shrink type.
5. **Motion:** muted viewing still communicates waiting, execution, observation, continuation, and stopping through slot/cursor/output changes. No orbiting token, decorative motion, flashing labels, or competing simultaneous animations. Deliberate reading holds are preserved, particularly the separate decision/proposal holds.
6. **Sound:** listen to the encoded video and verify action/evidence/decision pitch consistency, synchronized cues, audible soft events, and no clipping (peak no higher than −0.5 dB). Inspect the spectrogram as a supplementary check. Report separately whether audio was heard or merely analyzed.
7. **Ending and technical delivery:** finite 48-second ending is intentional; first/last frame equality is not required. Later production must decode the whole encode, inspect all beats and boundaries, verify duration/audio/streaming metadata, and bind review to that encode. No looping reset suggests an unsolicited fourth action.
8. **Scope:** produce only this lesson when implementation is authorized; keep this planning deliverable anonymous. No other lesson, shared manifest, recommendation status, or provenance record changes belong to this plan task.
