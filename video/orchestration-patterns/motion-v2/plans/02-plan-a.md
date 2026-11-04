# Route to one specialist

## Scope and teaching intent

One mechanism: classify the request using explicit scope criteria, then dispatch it to exactly one suitable destination; unclear scope takes the human-triage fallback. Selection does not establish that a specialist's eventual answer is correct.

Grounding: `video/orchestration-patterns/sequence/lessons.json` item 2 and `content/concepts/orchestration-patterns.json`. The four lesson intentions are recognizable API compatibility scope, criterion-based selection, a specialist with suitable instructions/tools, and a second request with unclear scope routed to a human. Exclude parallel reviews, joins, snapshot invalidation, evaluator loops, dynamic decomposition, repair and approval. No other lesson or current alternative plan is required.

Primary evidence: [Building effective agents, Workflow: Routing](https://www.anthropic.com/engineering/building-effective-agents#workflow-routing), accessed 2026-10-20. The routing section describes classification followed by a specialized task and tailoring prompts/tools to categories. The concrete requests, UI, and human fallback below are instructional choices grounded in this lesson, not a claim of a universal routing algorithm. No confidence score or performance guarantee.

## Visual grammar and coordinates

1080×1920, 30 fps, black background. A software routing inspector uses a single selection list and one destination detail pane. No repeated three-box pipeline, physical metaphor, branching packet fan-out or simulated thought cloud. The unchanged request ID makes ownership traceable. All positions are canvas pixels; rectangles use top-left plus width/height.

- Title: center (540,290), 78 px, `Route to one specialist`. Subtitle (540,380), 42 px, `REQUEST ROUTING`.
- Request panel: (90,470), 900×250. Header at (125,520), 46 px: `Request R1`, later `Request R2`. Request content at (125,590) and (125,650), 54 px: `Will removing /v1 break` / `existing API clients?`. R2 uses `Review this change` on the first line only. No body prose.
- Routing inspector: (90,790), 900×480. Heading (125,835), 46 px `Router`. Header labels (145,900) `Scope`, (600,900) `Destination`, 42 px.
- Three rows, bounds (115,925), (115,1030), (115,1135), each 850×100. Their text baselines are 987, 1092, 1197. Left/right labels: `API clients` / `API reviewer`; `Stored data` / `Data reviewer`; `Unclear` / `Human triage`. Labels 46 px; left text starts x=155, right x=600. Thin dividers; rows are choices in a list, not actor boxes.
- Selection chevron centered (128,row center y), inset within the selected row. An amber row outline and filled radio mark distinguish selection from execution; no green correctness check.
- Route receipt: (90,1325), 900×100; left label x=125, baseline y=1390. States `No destination`, `R1 → API reviewer`, `R2 → Human triage`, 48 px. Secondary short status appears in detail header, not crammed into this line.
- Destination detail: (90,1470), 900×300. Header baseline (125,1530), 50 px. Detail baselines y=1600,1670,1730, 44–48 px. R1: `API reviewer · received`; `Task: client compatibility`; `Tools: schema + callers`; `Answer: pending`. R2: `Human triage · received`; `Scope: unclear`; `Action: clarify`; no invented response.
- Matching cue: a short underline beneath `API clients?` in the request, then an outline around the `API clients` scope cell. The underline is evidence emphasis, not a token moving out of the request.
- Dispatch uses a small R1/R2 chip on the right-side gutter: selected row right port (965,row center y) → (1010,row center y) → (1010,1375) → (965,1375). Receipt-to-detail link: (540,1425) → (540,1470). Ports stop outside text bounds. Only this chosen connector is drawn. Other destinations never receive packets or work animation.

Essential text is 44–54 px (about 14–17.5 px at 350px width); title is about 25px. Preserve 90px side margins and at least 24px vertical text clearance. Idle rows retain readable gray text; dim their outlines, not the labels into illegibility. Layout retains its geometry across both requests.

## Five beats: motion, state, timing, sound

Target 46 seconds, with authored local timings at speed 1. Extend holds if actual 350px inspection requires it; do not shrink type or compress to fit a duration target.

| Time | Motion and attention | State and readable hold | Actor-specific sound |
|---|---|---|---|
| 0–7 s | 0–1: request R1 and routing list fade in without travel. 1.5–2.3: underline the request's API-client scope. 3–3.6: matching scope cell gains an outline; do not select a worker yet. | Request remains complete. All rows initially unselected, receipt `No destination`, detail pane empty. Hold highlighted evidence 3.6–7. | Request `arrive` C5 at 1.0; router `ack` E5 at 3.6, quiet. No sound for idle rows. |
| 7–15 s | 7–8: chevron and radio mark settle on API row; its outline lights amber. 9–10: draw only its chosen connector to the receipt. | Receipt becomes `R1 → API reviewer` at 10. API selection persists; data and triage rows stay idle. Detail pane still empty until dispatch. Hold 10–15 to distinguish decision from delivery. | Router `hit` E5 at 8, subtle selection cue, not success fanfare; quiet `send` E6 at connector commitment 10. |
| 15–24 s | 15–17: R1 chip follows the selected connector; 17–18: receipt-to-detail transfer. 18–19: specialist pane reveals its task and tools together. 20: reveal `Answer: pending`. | API reviewer receives R1 at 18. Exactly one destination receives work. Suitable instructions/tools are visible without pretending a correct answer was produced. Hold 20–24. | Router `send` E6 at 15; API `arrive` G5 at 18; soft API `work` G4 at 20 paired with pending indicator. No repeated work ticks during reading hold. |
| 24–33 s | 24–25.5: finish the R1 episode with a brief opacity fade, then replace request ID/content with R2. Clear the old receipt, selection, connector and specialist details together before R2 appears. 27–28: scope emphasis finds no explicit API/data criterion; show `Scope: unclear` inside request panel's second line. 29–30: select the Unclear row. | R2 is a new request, not the same request rerouted after a failed answer. No specialist receives R2. `R2 → Human triage` appears at 31, hold through 33. | Request `arrive` C5 at 25.5. Router `miss` E4 at 28 marks insufficient scope, not a crash. Router `ack` E5 at 30 marks fallback selection. |
| 33–46 s | 33–35: R2 chip travels solely from Unclear row to receipt. 35–36: receipt-to-detail arrival. Human pane appears; `Action: clarify` lands at 37. | Human triage has R2; API/data rows stay idle. Hold full state 37–43, deliberately long enough to compare request, selection and pending clarification. Fade stage and title together 43–46; finite black ending. | Router `send` E6 at 33; human `arrive` C6 at 36; quiet human `ack` C5 at 37. Silence through final hold/fade; no success chord. |

Sound identities: request C5, router E5/E6, API G5/G4, human C6/C5. Data reviewer makes no sound because it is never dispatched. Pan cues to their visible origins/targets, with restrained stereo width. Sends quieter than arrivals; no music needed. The miss cue is mild and accompanies the unclear state, not an invented outage. Every consequential selection/delivery/state change has a synchronized cue; cosmetic fades need none.

## State invariants and accuracy limits

- Exactly one selected row per request; exactly one dispatch destination. A criterion highlight is not a dispatch. This is routing, not broadcast or round-robin assignment.
- Request content and criteria cause the selection. Do not make the pointer visit every specialist as if each were executing a trial.
- R1 receipt and detail retain R1 identity. R2 clears all R1 state before any new selection; an old API glow must not imply API work on R2.
- Selected, received and correct are distinct. Use amber for route selection and neutral received status. Never show `approved`, green verdict, or answer-quality percentage. `Answer: pending` establishes the limit without a sentence caption.
- Human triage is an explicit illustrative fallback for insufficient scope. It does not imply every ambiguous request universally requires a human, or that triage has completed clarification.
- Tools and task labels illustrate a specialist's suitability; they are not evidence that tool access alone guarantees expertise or enforces permissions.
- These are category criteria, not literal keyword matching. A request mentioning an API is not automatically an API-compatibility task in real systems.

## Acceptance at native 350px and encoded review

1. Inspect individual 350×622 frames without enlargement at 3.6, 8, 10, 18, 20, 25.5, 28, 30, 36, 37 and 42 seconds. All essential request text, criteria, destination names and pending/clarify state must be readable. Check full-resolution busiest frame as well; contact sheets alone are insufficient.
2. Inspect before/mid/after each handoff, replacement and selection (±0.2 seconds around boundaries, plus travel midpoints). Moving chips, outlines and ripples must never conceal labels. If the gutter is too tight, widen its clearance by narrowing list cells, not shrinking text.
3. From the mute sequence a beginner should identify why R1 goes to API review, which alternative stays idle, and why R2 goes to human triage. No inferred correctness verdict should emerge from receiving work.
4. Confirm exactly one delivery per request, no ghost selection across the reset, no specialist work before dispatch, and no leftover R1 tools beneath human triage. The final frame may be black; it need not loop.
5. Listen to confirm actor cues and exact event alignment; separately measure peaks and inspect signal. Never call signal analysis actual listening. Keep maximum level below −0.5 dBFS and avoid loud selection sounds suggesting validation.
6. Decode the entire eventual MP4, check duration/frame rate/audio stream and moov-before-mdat, then bind the encoded comparative review to the full SHA-256. Reproduce suspected visual faults using alternate extraction before declaring a blocker; any changed encode requires fresh review.

## Production boundary

This deliverable is a plan only. A later implementation should use repository-pinned Puppeteer and a cut-local engine copy, with any row/list drawing helper kept local and driven deterministically by scene time. This plan authorizes no additional file writes in this task: no render, source changes, metadata changes, public media, shared skill changes, commits or deployment.
