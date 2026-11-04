# Pause without guessing — lesson 03

## Scope and grounding

One mechanism: save a pending workflow and its action, preserve that pending state through waiting and a worker restart, and resume toward revalidation only when a trustworthy decision arrives. Elapsed time and worker availability never grant permission.

Grounding: `video/human-in-the-loop/sequence/lessons.json` item 3 and `content/concepts/human-in-the-loop.json` overview and walkthrough step 2. Primary references consulted 2026-10-21:

- [Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts): checkpoint-backed pauses and resumption associated with the same thread identifier; resuming can restart node code, so this video must not imply instruction-pointer continuation or exactly-once execution.
- [Persistence](https://docs.langchain.com/oss/python/langgraph/persistence): in-memory checkpoints disappear on process restart; persistence must suit the intended recovery requirement.

This is a generic illustrative workflow, not a framework API tutorial. Five beats, about49s. A worker restart illustrates the durability requirement already in this lesson; do not expand into node replay, duplicate side effects or restart internals. Exclude changed artifacts, stale approval, retries, cancellation and completed deployment. Finish at `Revalidate`, with deployment calls still0.

## Visual mechanism

Use a workflow run inspector: a vertical stage rail beside an active worker status, and a persistent saved-state table below. A row remains visible while the worker goes offline and returns. Later, an independently arriving reviewed decision changes that row and permits advancement to revalidation. This makes durability and causality visible without a physical pause button, clock metaphor or generic three-box pipeline.

The rail is a software execution-status list, not a complete process architecture. Stable IDs: workflow W7, proposal A, target production. Artifact A stands for a retained immutable artifact reference; its bytes need not be embedded in the checkpoint. Use a stored proposal reference plus accessible immutable artifact storage in the illustrated design.

## Coordinates and labels

1080×1920,30fps. Bounds are top-left unless specified; text coordinates are baselines. Safe area x80–1000/y450–1800. Black #050506, primary #E6E8EC, secondary #8B9099, pending #F5A524, stored/identity #4DA3FF, authenticated decision #3FB68B. Useful text50–56px, supporting text44px minimum; title76px. Do not reduce text to fit two narrow columns: wrap labels or widen panels.

| Element | Coordinates | Content |
|---|---|---|
| Title | center x540, baselines295/385 | `Pause without` / `guessing` |
| Run header | x90 y470 w900 h130 | `WORKFLOW W7`; `deploy A · production` |
| Stage rail | x110 y650 w360 h490 | stage baselines730/860/990/1120: Prepare, Review, Revalidate, Execute; dots at x130, labels x175 |
| Worker status | x520 y650 w470 h230 | `WORKER`; `online` → `offline` → `online`; small `W7 restored` only after restore |
| Waiting duration | x520 y930 w470 h180 | `WAITED`; `0 min` → `5 min` → `30 min`, explicitly a time jump, not a countdown |
| Persistent record | x90 y1200 w900 h335 | header `SAVED STATE`; key/value baselines1290/1360/1430/1500: `run W7`, `action A · production`, `stage review`, `decision pending` |
| Decision event strip | x90 y1580 w900 h100 | initially `No decision`; later `Reviewer R1 · approve A` |
| Execution footer | x90 y1720 w900 h75 | `deploy calls: 0` |

Saved-state fields may use x125 for labels and x410 for values; action row includes deploy in the run header and is a reference to that full action. Initial record values appear only after save completion. Prior to that the panel says `saving…`, not `saved`.

Routes: saving dot from worker bottom (755,880) via (1020,880),(1020,1260) to record right edge (990,1260). Restore dot reverses the route to worker. Decision event dot from (950,1630) via (1020,1630),(1020,1500) to record right edge (990,1500). Use small dots in empty gutters; no moving labels crossing text. Advancing the rail is a local cursor tween between its dots. No active route or cursor enters Execute.

## Five beats with stateful motion and sound

Times are playback seconds at speed1. Holds are deliberate reading time. No decorative spinner or ticking throughout the wait.

| Beat | Motion and state | Sound |
|---|---|---|
| 1. Reach the review boundary, 0–9s | 0–1: W7 header and stage rail reveal. At2 worker online. 3–4: rail cursor moves from Prepare to Review. At4.5 Review turns amber and status becomes `waiting`. Execute stays neutral, calls0. Hold5–9. | Workflow `arrive` C5 at1; worker `ack` E5 at2; workflow `send` C6 at3, `arrive` C5 at4; quiet pending `ack` C4 at4.5. |
| 2. Save the pending work, 9–18s | At9 saved-state panel begins `saving…`; 9.5–10.5 save dot travels. At11 W7, action A/production, review and pending populate together; header changes to `SAVED STATE`. At12.5 briefly outline A in header and record to associate preserved action. At14 duration shows0min and event strip says No decision. Hold14.5–18. | Worker `send` E6 at9.5; persistent store `store` G5 at11; store `ack` G5 at12.5; quiet workflow `ack` C4 at14. |
| 3. Waiting survives worker restart, 18–30s | At18 duration changes to5min while review/pending/calls0 remain fixed. At20 worker becomes offline, its interior dims; saved record stays fully readable. At22 worker becomes online with blank run context. 23–24 restore dot moves from record to worker; at24 W7 restored appears, rail remains Review. At26 duration changes to30min; event strip still No decision, record still pending. Hold26.5–30. | Quiet time-display `clock` C4 at18/26, one tick per explicit jump; worker low `thump` E3 at20; worker `arrive` E5 at22; store `send` G6 at23, worker `arrive` E5 at24. No approval cue at restart or elapsed-time change. |
| 4. A real decision arrives, 30–40s | At30.5 event strip reveals `Reviewer R1 · approve A`. At32 show a brief `verified` marker on this event, representing application validation of reviewer and action. 33–34 decision dot reaches saved record. At34 decision changes pending→approved while W7 and A/production stay unchanged. At35 stage remains review for a short reading hold. Hold35–38; at39 rail cursor begins moving toward Revalidate. | Reviewer `arrive` A5 at30.5; verifier `ack` A5 at32; store `store` G5 at34; workflow `send` C6 at39. |
| 5. Resume to checking, not deployment, 40–49s | At40 cursor lands on Revalidate; record stage updates to revalidate. At41 worker label becomes `checking action`. Execute remains neutral; calls0 stays visible. Outline A/production once at42 to indicate the next check's subject. Hold43–49 with decision approved, revalidation active and execution untouched. Finite ending. | Workflow `arrive` C5 at40; worker `work` E4 at41; quiet workflow `ack` C5 at42. Silent final hold. |

Actor pitches: workflow C, worker E, persistent store G, reviewer A. Pan to actor coordinates; sends quieter than arrivals. Worker offline is a state change, not a dramatic crash scene. The distinction between waiting ticks and decision arrival must be audible when listened to and fully visible when muted.

## Accuracy limits

- The illustrated checkpoint store survives the shown worker-process restart. This does not claim survival of storage loss, region failure or every application failure mode. Durability must be selected and tested for relevant failures.
- An in-memory-only checkpoint would not provide the demonstrated restart behavior. Do not draw the saved record inside the worker boundary or let it disappear with the worker.
- The workflow identifier and action reference remain W7/A/production on save, restore and decision receipt. A chat message or visible UI state alone is not a protected decision record.
- The trusted-decision marker represents authenticated reviewer authorization and correct action association, not a guarantee furnished by receiving arbitrary resume input. Validation mechanics are outside this lesson.
- A resume event can also carry rejection or edits in real applications; approval is the single illustrated path. Absence of a decision never becomes approval. A timeout may trigger other policy outcomes, but no timeout policy is shown here.
- Restart restoration and approval resumption are distinct events. Restore returns to waiting; only the validated decision permits forward workflow progress.
- Revalidation is required before execution, and this clip stops before it completes. It does not claim that approval alone satisfies all current prerequisites.
- The rail is a logical stage indicator. It does not promise execution resumes at the exact instruction or that preceding code cannot replay. Exactly-once behavior and replay-safe side effects are deferred.
- `5 min` and `30 min` are illustrative compressed time jumps, not a required approval duration or operational guarantee. No countdown reaches an implicit consent threshold.

## Native350 acceptance and future encoded review

These are later-production requirements, not completed validation claims.

1. Inspect individual actual decoded frames at350px width around5.5,11.5,15,20.5,22.5,24.5,27,31,34.5,40.5 and48s. Inspect before/mid/after save, offline/online, restore, decision validation and rail advancement at full resolution and350. Do not rely on a contact sheet.
2. Saved record must remain readable through worker loss, and restore must retain pending plus W7/A/production. No interpolation may briefly show approved during restore or elapsed-time changes.
3. `No decision`, `pending`, both elapsed-time values and calls0 must be legible. Wait times are elapsed labels, not progress bars toward approval.
4. Separate reviewer event, verification, stored decision and revalidation in time. No cursor reaches Execute; no deployment-call increment or success flourish suggests a completed deployment.
5. Check field alignment, long event-strip text, cursor labels and all gutter paths for overlaps. Wrap the reviewer event into two short lines and increase strip height if needed; retain at least44px type. Reproduce suspected clipping or missing text using alternate extraction before flagging.
6. Restored state and unchanged waiting get a readable hold before a decision arrives. Do not compress that contrast to hit a nominal runtime.
7. Listen when possible to verify event/actor distinctions; label signal-only analysis honestly. Full-decode, confirm audio stream, peaks below -0.5dBFS and moov before mdat.
8. Final state makes the remaining check explicit. Finite ending need not reset. Comparative review must inspect the actual encode against the intended lesson/public baseline, hash before/after and bind its decision to the candidate SHA-256. A repaired encode requires renewed review.

## Production boundary

Only this anonymous plan is written. No rendering, author source, other lesson, public/site/shared-skill edits, commits or deployment. Later implementation uses repository-pinned Puppeteer and a cut-local engine; custom run-inspector geometry stays local. The broad sequential authorization does not expand this turn's assigned plan-only write scope.
