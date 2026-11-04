# Lesson 05 — Limit repair attempts

## Teaching scope

One mechanism: a controller counts completed repair attempts against a configured limit, refuses the next edit cycle when the allowance reaches zero, and preserves useful evidence for a human. An agent asking again cannot reset that allowance.

Grounding: lesson 05 in `video/loop-engineering/sequence/lessons.json`; the judgment, example, and walkthrough in `content/concepts/loop-engineering.json`. The sequence requires configured budget → another failed attempt → enforced stop → evidence handoff. The concept explicitly treats three attempts as an illustrative policy, not an optimal value. [Primary guidance on environment feedback and stopping conditions](https://www.anthropic.com/engineering/building-effective-agents), checked 2026-10-20, supports bounded iterations and human checkpoints; the precise counter semantics and layout here are an editorial illustration.

Show a serial run repairing a discount calculation. Each attempt means one scoped patch followed by the agreed test run. Each completes with usable assertion-failure evidence. Keep the selection unchanged. Start with zero completed attempts and show all three, so no allowance is silently consumed offscreen. Stop because the configured count is exhausted, not because equal failure counts prove identical failures.

Exclude time limits, tool-call budgets, concurrency, no-tests routing, success/review routing, flaky reruns, permissions configuration, automatic budget increases, and detailed human investigation. These may matter in a real controller but are outside this focused cut. No merge, deployment, or successful repair is shown.

## Visual grammar and coordinates

A software run-history panel, not a request-flow diagram. A persistent controller strip owns the allowance; three expanding history rows preserve completed attempts. A request control below the history changes from enabled to refused. At the end, the history condenses into a handoff record. The geometry is distinct from test-selection counters, revision graphs, workspace sheets, and three actor boxes.

Canvas 1080×1920, 30 fps, near-black `#050506`. Coordinates below are bounding rectangles unless identified as centres. All teaching content lies within x=80–1000 and y=250–1780.

| Element | Geometry | Content and role |
| --- | --- | --- |
| Title | x=90, y=260, w=900, h=120 | `Limit repair attempts`, two lines if needed, 82px bold |
| Controller strip | x=90, y=450, w=900, h=235 | `CONTROLLER` at (120,490), 46px; `Limit 3 · example` at (120,555), 48px; `0 done` at (120,630), `3 left` at (710,630), 60px |
| History heading | x=120, y=735 | `Repair history`, 48px |
| Attempt rows | x=90, w=900, h=155; y=790, 970, 1150 | Left 130px number field; centre patch label; right outcome. Text baselines y+55 and y+115. Vertical separators x=245 and x=710. No unrelated columns. |
| Request control | x=90, y=1360, w=900, h=155 | Left `AGENT`, right `Request attempt 1`; later 2, 3, then 4. 46px role, 50px action. |
| Controller response | x=120, y=1575, w=840, h=90 | Initially `Allowed`; finally `Refused · limit reached`, 48px. This is controller output, not agent narration. |
| Handoff stage | x=90, y=790, w=900, h=955 | Replaces history/request region only after refusal hold. Header `For engineer`, 56px. Five record lines at y=925, 1060, 1195, 1330, 1465; final status at y=1645. |

History row strings: `1` / `Patch A` / `11/12 pass`; similarly B and C. Second line `1 assertion fails`, 46px, red plus an × icon. While working, the centre shows `Editing` then `Testing`; outcome stays blank until a result exists. Do not show green completion checks for failed attempts. Finished rows remain fully readable; only their borders dim.

Use a white edge for active work, amber for controller decisions, red for failed assertions, neutral grey for completed-but-unsuccessful rows. Counters are white until zero-left becomes amber with `Limit reached`. No timer, progress-to-success percentage, spinning decoration, physical gate, fuel tank, or countdown metaphor.

No standing wires are needed. On permission, a thin UI focus line travels from controller bottom centre (540,685) down the left gutter x=70 to the active row centre y=867/1047/1227, ending at (90,row centre). It is visible only for 0.6s and vanishes before the row works. On refusal, no line reaches a row and no fourth row appears. Numeric budget changes remain in the controller strip, never inside the agent control.

## Five beats: motion, state, sound, holds

Target 47 seconds at speed 1. This duration serves the serial attempts and reading holds; widen a hold if native350 inspection needs it. Use short 0.35–0.7s transitions, not global speed compression.

| Time | Motion and focus | Persistent state / causal meaning | Sound |
| --- | --- | --- | --- |
| 0–7s: configure and request | 0–0.7 title/strip appear; 0.9 limit label and counters settle. Hold 1.2–3.5. At 3.5 the agent request control appears. At 4.5 controller response becomes `Allowed`; focus line traces to row 1 at 4.7–5.3. Row opens at 5.4–6.0; hold through 7. | Limit=3, done=0, left=3. A request precedes controller authorization, which precedes any editing. Rows 2/3 are faint outlines with numbers only. | Controller `store`, C4, at 0.9; agent `send`, E5, at 3.5; controller `ack`, C5, at 4.5; edit actor `work`, G4, at 5.4. |
| 7–17s: first completed attempt | Row 1 `Editing` holds 7–9; switches to `Testing` at 9, with one brief thin activity sweep. At 11 row result settles as `11/12 pass` + `1 assertion fails`. At 11.6 controller changes to `1 done / 2 left`; hold to 14.5. Request 2 at 14.5; controller allows at 15.2; row 2 opens by 16.2. | The counter updates once on completion, not on edit start, test start, or agent request. Completed failed row remains visible. | Edit `work`, G4, 7; runner `work`, D5, 9; runner `thump`, D4, 11; controller `store`, C4, 11.6; agent `send`, E5, 14.5; controller `ack`, C5, 15.2; edit `work`, G4, 16.2. |
| 17–27s: second completed attempt | Row 2 `Editing` to 18.8, then `Testing`. Result at 20.8; controller counts at 21.4. Hold 21.8–24.5. Request 3 at 24.5; allow 25.2; row 3 opens by 26.2. Repeat only the useful permission→work→failure pattern, with history visibly accumulating. | `2 done / 1 left`. Two distinct patches, two completed attempts, both failing. One more is permitted; no implication that failure itself removes permission before the limit. | Edit G4 at 17; runner D5 at 18.8; failure `thump` D4 at 20.8; controller `store` C4 at 21.4; agent E5 at 24.5; controller C5 at 25.2; edit G4 at 26.2. Same presets as above. |
| 27–37s: exhaust and refuse | Row 3 edits to 28.8, tests to 30.8, then fails. At 31.4 counters become `3 done / 0 left`; amber border and `Limit reached` appear. Hold to 34. At 34 request control asks for attempt 4. At 34.7 controller response becomes `Refused · limit reached`; request dims and acquires a clear ×. Hold 35.2–37. | Three rows remain, no fourth patch or test activity appears. Count stays 3/0. Controller refuses even though the agent asks. Exhaustion prevents the next cycle; it does not retroactively cancel attempt 3. | Runner `work` D5 at 28.8; failure `thump` D4 at 30.8; controller `store` C4 at 31.4; agent `send` E5 at 34; controller low `thump` C3 at 34.7, slightly stronger than prior cues. No edit cue follows. |
| 37–47s: useful handoff | 37–38 history rows compact upward inside the handoff area, becoming `Tried: A · B · C`. The last result stays visible until copied into the record. Reveal remaining lines one at a time at 38.2, 39, 39.8, 40.6. At 41.4 the record border brightens and header becomes `For engineer`; controller stays 3/0. Hold 42–46.2, fade lower stage 46.2–47. | Record: `Tried: A · B · C`; `pytest -k discount`; `Patch C · 11/12 pass`; `test_discount_limit`; `expected 20 · got 25`. Footer `Stopped: attempt limit`. This is a retained evidence summary, not a new tool execution. Human receives facts; no new approach or repair is executed. | Record `store` C4 at 38; quiet `store` C4 per line at 38.2/39/39.8/40.6; handoff `deliver` G5 at 41.4, restrained neutral timbre, no success chime. Silence during final hold/fade. |

## Sound implementation

Roles are consistent: agent requests E5; controller decisions C4/C5, refusal C3; edit work G4; runner work D5 and failed result D4; human handoff G5. Pan by the affected UI anchor; centred controls stay centred. Sends are quieter than results; refusal is the clearest low accent. Use brief cues, no continuous ticking, music, narration, or rising success fanfare. Sound reinforces state and its owner; the mute version must still teach the complete mechanism. Mix below −0.5dB peak and check the encoded audio, not merely scheduled cues.

## State contract and accuracy limits

- Completed means patch plus test result for this illustrated serial run. Counting is updated exactly once per completed attempt; authorization checks `completed < limit` before another cycle. Only one attempt can be active. Real systems also need protection against hanging commands and repeated incomplete work, which this cut does not demonstrate.
- Three is labelled `example` from the opening. Do not claim three attempts is optimal or sufficient for safety, cost control, or convergence. Budgets do not guarantee correctness.
- The controller owns permission and budget state. The request control may ask; it cannot change the limit, decrement completed, or start a blocked edit. This external enforcement is the curriculum's design prescription.
- Patch labels identify three distinct attempted revisions, not branches or a claim about their code. All use the same intended test selection. The final test name and expected/actual values are illustrative evidence, not a captured repository test result.
- Identical `11/12 pass` counts do not establish identical failure identities or no progress. This animation stops on budget, not a no-progress heuristic. Only the final failure detail is shown; do not claim all three failed for the same reason.
- A failed attempt is completed work, never success. Do not use teal pass styling for the entire row or for the final handoff. The 11 passing checks do not erase the remaining failing assertion.
- The final summary stands for retained patch and test records; it is not an exhaustive handoff schema. Show preserved evidence, not invented runtime files, automatic human approval, or a new authorization budget.

## Native350 acceptance and later production checks

This deliverable is a plan only; none of the checks below are claimed complete.

1. Render individual encoded frames at 350×622 and full size at 1.5, 5.8, 11.8, 16.5, 21.8, 26.5, 31.8, 34.4, 35.4, 40.8, 43.5, and 46.1s. Inspect additional frames ±0.25s around permission, completion, count, refusal, and handoff transitions. View separately at native size, not only a contact sheet.
2. At 350px, essential labels must be comfortably readable: 46px source minimum ≈15px display, counters ≈19px. Fit the long command and test name at 48px in the 900px-wide record; do not shrink to solve overflow. Use measured text bounds and retain 24px source padding. No line may be obscured by a focus trace or glow.
3. Trace count snapshots: 0/3 → 1/2 → 2/1 → 3/0. Every change follows a visible result. Attempt 4 is requested but never edited, tested, or added to history. Counters stay 3/0 through handoff. Ensure text replacements do not flash old numbers.
4. Ask from mute frames: who owns the limit, why can attempt 3 run, why is attempt 4 refused, and what can the engineer inspect? Answers must follow from persistent UI state and sequence, without paragraph captions.
5. Each result/count pair has a deliberate multi-second reading hold. The final record has at least 4.8s after its last meaningful state change. If readability requires more time, extend the cut rather than compressing earlier attempts.
6. Retain failure, blocked request, and stop reason using × marks and words as well as color. No ambiguous whole-row green state, reset counter, unseen extra patch, or success ending.
7. Decode the entire eventual MP4, inspect audio peaks and cue alignment, verify audio stream and moov-before-mdat metadata. State explicitly whether sound was heard or only analyzed. Reproduce suspected visual defects with alternate extraction before flagging them; image-display omissions alone are not evidence.
8. Bind the eventual independent comparison to the encoded candidate hash, with before/after hashes. Any repaired encode requires fresh encoded inspection. Optional polish is separate from reproducible blockers.

## Production boundary

Write only this plan in this task. Later authorized implementation must use a local engine copy and the repository-pinned Puppeteer dependency. Extend drawing locally if the history/control geometry needs it; do not edit the shared skill or install dependencies there. Retain local candidates. No public/site edits, commits, deployment, other lesson work, or production-state/provenance reads are part of this plan.
