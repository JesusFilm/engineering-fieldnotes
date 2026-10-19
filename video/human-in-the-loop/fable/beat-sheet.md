# Human-in-the-loop — fable cut: resume replays the step

Lesson: in LangGraph, when an agent step pauses for human approval, the runtime re-runs that whole step from its beginning on resume, so a side effect placed before the approval runs twice. Put side effects after the approval (or make them idempotent).

Learning objective for a team adopting agents: when you add an approval gate inside an agent step, know what your runtime re-executes on resume, and place notifications, record creation and other side effects after the gate or make them safe to repeat.

Actors: Reviewer (human), Checkpoint (persisted pause and answer), deploy node (an ordered three-row step list with a cursor), #ops channel (notification store), Production (database with schema version). Step identity carries pitch: notify = C5, approve = E5, apply = G5.

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.0–0.7 | Stage fades in from the title-only frame | — | — |
| 0.9–2.0 | Cursor enters at row 1 `notify #ops`; chip `v8 notice` travels to #ops | #ops row 1 fills green; notify row turns green | arrive C5, send, store G5 (left) |
| 2.8–4.5 | Cursor to row 2 `approve?` (orange); chip `approve v8?` to Checkpoint, then to Reviewer | Checkpoint row `approve v8?` orange; cursor dims (step suspended); Reviewer glows orange | arrive E5, send, store E5, send, deliver A5 |
| 4.5–6.3 | Hold: the step waits on the human | — | — |
| 6.3–7.7 | Reviewer flashes green; chip `yes` to Checkpoint; chip `resume` to the deploy node | Checkpoint row `approve v8? → yes` green | chime C6, store G5, send |
| 7.7 | **Rewind**: rows go dim, cursor slides from row 2 back up to row 1 with overshoot, node pulses | The step restarts from its top | rewind (falling sweep) |
| 8.3–9.4 | notify runs again; chip `v8 notice` to #ops | #ops row 2 fills **red**, × mark, #ops jolts; badge `sent ×2` pops red | arrive C5, send, **dup** (loudest cue) |
| 10.3–10.5 | Cursor to `approve?`; Checkpoint pulses | approve row turns green at once (stored answer returned) | arrive E5, hit E6 |
| 11.2–13.1 | Cursor to `apply v8`; chip `apply v8` to Production; spinner | Production sublabel `schema v8` green | arrive G5, send, work ×4, chime G5 (right) |
| 13.1–14.6 | Hold on the duplicate | — | — |
| 14.6–15.9 | Fade out, reset the independent example behind the veil, then fade in before the visible reorder | New example with empty stores and schema v7; no rollback implied | quiet poof at 14.6 |
| 15.9–16.4 | Rows 1 and 2 of the deploy node swap: `approve?` first, `notify #ops` second; orange ripple | Side effect moved after the approval | store E5 then C5 (reversed pair) |
| 17.3–19.0 | Cursor at row 1 `approve?`; chip to Checkpoint, then Reviewer | Same pause as before | arrive E5, send, store, send, deliver |
| 20.5–21.9 | Reviewer approves; `yes` and `resume` chips | Checkpoint row green | chime, store, send |
| 21.9–22.5 | **Rewind**: cursor bounces in from above row 1; Checkpoint pulses | approve row turns green at once (stored answer) | rewind, hit E6 |
| 23.2–24.5 | Cursor to `notify #ops`; one chip to #ops | #ops row 1 green; badge `sent ×1` green | arrive C5, send, store G5, hit G6 |
| 25.2–27.1 | Cursor to `apply v8`; chip to Production | `schema v8` green | arrive G5, send, work ×4, chime G5 |
| 27.1–29.1 | Hold on the resolved state | — | — |
| 29.1–30.2 | Stage fades to the title-only frame (identical to frame 0) | — | quiet poof |

Total 30.2 s at speed 1 (906 frames at 30 fps).

Comparative edit by gpt-6-astra comparative review, 2026-10-19: original authorship retained. The subtitle scopes the example to LangGraph, and the deploy-node label sits above/right of the node clear of outgoing chips. One ordinary approval resume is illustrated; later failures still require idempotent effects.
