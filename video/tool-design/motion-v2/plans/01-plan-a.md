# Lesson 01 — A callable operation

## Scope and grounding

One mechanism: a documented operation lets the model request a structured call; application code executes that call and returns a result that the model can use as evidence. A description is not executable work or authorization.

Grounding: item 1 of `video/tool-design/sequence/lessons.json` and overview/example/judgment of `content/concepts/tool-design.json`. Use the read-only incident-search operation `search_incidents`, a payments request, and a returned incident identifier. No operational change is requested or performed.

[Primary tools specification, version 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/server/tools), checked 2026-10-20, documents named tools, descriptions, input schemas, calls, and returned results. This animation is protocol-neutral: its display fields are an illustrative application interface, not mandatory protocol fields or a complete wire message. The visual executor represents application/tool-server code collectively; deployment topology is omitted.

Exclude argument-validation tutorials, access-denial scenarios, empty-versus-error outcomes, pagination, retry budgets, tool granularity comparisons, incident root-cause analysis, closing incidents, and other later lessons. Show one successful read and one evidence-based observation. Do not imply exhaustive incident coverage.

## Design: an invocation trace with an executable side panel

Use a developer call inspector. The operation's documentation is first readable as a function signature and short purpose. It becomes a structured request row in a vertical trace. An application-owned execution panel opens alongside the trace's active marker, performs the search, and appends a result. Finally the model's evidence row cites the returned ID. This is a typed operation and execution trace, not three identical boxes or a physical delivery metaphor.

Four beats, approximately 44 seconds. Canvas 1080×1920, 30fps. Dark #050506 background, white #E6E8EC, secondary #A8ADB5, amber #F5A524 for requested/running, teal #3FB68B for returned data. Main labels 50–56px; metadata at least 46px (about 15px at native350). Title 84px. Avoid long raw JSON and paragraph captions.

### Coordinates

Rectangles are x/y/w/h. Full-width cards are sequential trace entries, not three simultaneous equal pipeline nodes. A left rail at x=95 from y=780 to y=1670 gives event order; numbered marker circles at y=850,1160,1480. Content begins x=150.

| Element | Coordinates | Content |
| --- | --- | --- |
| Title | 90/250/900/115 | `A callable operation` |
| Task strip | 90/420/900/120 | `Payments incidents?`, 54px |
| Operation documentation | 90/585/900/500 initially | Header `Available tool`, (125,645), 48px; `search_incidents`, (125,725), 56px mono; `Find incident records`, (125,805), 50px; `service: string`, (125,885), 48px; `Returns: IDs + summaries`, (125,970), 46px; `Read only`, (125,1040), 46px |
| Compact documentation header | 90/585/900/150 after beat 1 | `search_incidents` and `Find incident records`, 52/46px; remains as reference |
| Request trace entry | 150/790/840/260 | `MODEL REQUEST · c1`, baseline y=850, 46px; `search_incidents`, y=930, 54px; `service: payments`, y=1010, 50px |
| Execution trace entry | 150/1090/840/260 | `APPLICATION · c1`, y=1150, 46px; `search_incidents()`, y=1230, 52px; state `Not started` → `Running` → `Returned`, y=1310, 48px |
| Result trace entry | 150/1390/840/290 | `RESULT · c1`, y=1450, 46px; `INC-42 · payments`, y=1530, 52px; `Elevated error rate`, y=1610, 48px |
| Final model evidence mode | 150/1090/840/590 | Replaces execution/result entries only after returned result has held. `MODEL RECEIVED · c1`, y=1150; source result ID/summary at y=1250/1330; `Evidence: INC-42`, y=1460; `Reported payment errors`, y=1540. 46–52px. |

The application entry has a small inset execution bar at x=190,y=1280,w=480,h=12, only active while Running. It is an activity indicator, not a measured progress percentage. Keep label baseline clear of it by placing the bar below the state label if necessary; exact text bounds win over nominal coordinates.

Call identity c1 repeats across request, application, result, and receipt. The visible service field is a representative argument slice; the real application contract can include an interval and bounds. Do not call the display a complete schema. Do not show unrestricted production access.

## Four timed beats

| Time | Motion and holds | State / causal meaning | Sound |
| --- | --- | --- | --- |
| **0–11s: a documented operation** | Title/task settle by 1.2. Tool documentation appears 2–3, revealing name, purpose, argument type and result description with 0.7s spacing. At 6.8 underline Find incident records, then the task at 7.5. Hold 8–11. | The description explains why this operation fits the request. Nothing is running. Read only describes intended behavior, not an enforced permission badge. | Tool-catalog `arrive` G4 at 3; quiet catalog `ack` G4 at 6.8; model selection `ack` E4 at 7.5. |
| **11–21s: the model requests, application receives** | Documentation compacts 11.3–12.1 without shrinking text. Request marker 1 and its card appear 12.8–13.6; service value settles at 14.4. Hold 15–17. At 17.5 the left-rail focus travels to marker 2 over 0.6s; application entry opens by 18.8, state Not started. Hold 19–21. | A structured name/argument request exists before execution. The model has requested the operation, not executed backend code. Application receives c1 with the same service. | Model `send` E5 at 14.4; application `arrive` C4 at 18.8. No backend or result sound before application receipt. |
| **21–32s: application code executes** | At 21.5 application state becomes Running; its execution bar sweeps once for 1s. At 23.0 show a short inline sublabel `Reading records`, 46px, replacing Not started. Hold 24–26. At 26.5 state becomes Returned; marker 3/result card expands 27–28.2. ID appears at 28.2, summary at 29.0. Hold 29.5–32. | Only application execution entry animates as work. The request card stays unchanged. The returned record is supplied through application handling, not invented by the model. ID and summary arrive after execution. | Application `work` C4 at 21.5; backend read `work` G3 at 23; application `store` C4 at 26.5; result `arrive` G4 at 28.2. |
| **32–44s: use returned data as evidence** | 32.5–33.3 execution/result region switches to model-received mode, retaining c1, INC-42, and summary. At 34.0 mark Received beside c1. At 35.0 evidence line appears; at 36.0 short observation appears. Briefly underline matching INC-42 in source and evidence at 36.8. Hold 37.3–42.8; fade lower stage 42.8–44, title remains. | Model receipt follows application return. The observation is backed by the specific returned record. It does not claim root cause, resolution, or that no other incidents exist. | Application `send` C5 at 32.5; model `arrive` E4 at 34; model `store` E4 at 36.0; quiet evidence `ack` E5 at 36.8. No task-complete fanfare. |

## State, sound, and ownership

Catalog/result source G4; model request/receipt E4–E5; application C4–C5; backend read G3. Keep sends softer than receipt/result cues, sparse and centred to their active anchors. No continuous ticking, voiceover, typing bed, or music. The same role uses the same pitch across state changes.

The rail connects entry markers only: (95,850) → (95,1160) → (95,1480), with short horizontal branches to card left edges at x=150. Trace focus moves after each causal predecessor completes. No wire connects the model directly to a backend. Final receipt is a mode change labelled MODEL RECEIVED, not a silent relocation of an application result.

Execution, authorization, and error handling belong to application/server code. This successful read assumes the caller is authorized; no implied security check is proven by tool description or Read only text. Do not insert decorative shield/check icons that suggest otherwise. Errors and permission cases are outside this cut, not asserted impossible.

## Accuracy limits

- A tool is an executable interface described to the model; the model's emitted request is not itself backend execution. The application may invoke a local function, remote service, or tool server. This cut abstracts that topology.
- Names, IDs, service value, and result text are fictional teaching data. No actual payments incident or live tool invocation is claimed.
- The visible `service` field teaches structure; it is not the complete proposed search contract. Time interval, limits, cursors, and validation belong to subsequent detail, not a claim of unbounded search.
- Tool documentation guides selection. It does not enforce access, safely execute arbitrary calls, guarantee success, or establish result truth/completeness.
- One returned incident is evidence of that record, not all activity or root cause. The final wording must remain Reported payment errors, not Payments outage confirmed or All incidents found.
- Model receipt of a tool result is a subsequent input step. Do not imply a tool result retroactively changes an already completed model invocation.
- The call inspector is a semantic display, not literal protocol JSON. Do not label c1 or the record fields mandatory protocol fields.

## Native350 acceptance and later production checks

This plan does not claim rendered verification.

1. Inspect individual encoded frames at 5,9,15.5,19.5,22.5,25,29.5,34.5,38,42 seconds at native350 and key full-resolution states. Inspect ±0.25s around application receipt, Running, Returned, and model receipt. No contact-sheet-only review.
2. Operation name, service value, role labels, c1, incident ID, and short summary must be readable without zoom at 350×622. Keep essential text at least 46px source. Measure all strings and fit by wrapping or increasing space rather than shrinking.
3. Verify structured request precedes application receipt; execution occurs only in the application entry; result appears only after work; model evidence appears only after result receipt. No premature teal success state.
4. c1 and INC-42 remain consistent across all relevant views. No invented second incident, broader claim, omitted service, or unexplained operation change.
5. Main content must remain clear of the rail, marker circles, activity indicator and focus effects. Compacting the catalog must reposition text without scaling it below legibility.
6. Mute comprehension: a beginner can identify what the operation does, who requests it, who executes it, and which record supports the model's observation. If they infer that the model directly runs code, revise the ownership cues.
7. Final evidence hold is at least 5.5s. Extend duration if reading requires it. A finite ending is appropriate; no need for a restart loop or automatic next action.
8. Later production: full-file decode, individual encoded beat/boundary inspection, audio peaks below −0.5dB, audio stream, and moov-before-mdat check. State heard versus analyzed audio honestly. Reproduce suspected visual faults by alternate extraction before flagging display omissions.
9. Bind later comparative review to actual encoded before/after hashes. Any repair/new encode requires renewed inspection, not a substituted decision hash. Optional refinements alone are not blockers.

## Execution boundary

Write only this plan. No rendering, current other-plan/author-source inspection, other lesson work, production-state/provenance reads, public/site/shared-skill edits, Git commits, or deployment. Later production uses repository-pinned Puppeteer and local engine copies; any drawing additions stay local to the cut. Keep local candidates.
