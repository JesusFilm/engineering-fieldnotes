# Lesson 03 — Retry only when safe: beat sheet (motion-v2 cut)

**Mechanism.** Attempt 1 of a CI status read times out. The caller checks the operation's documented contract (an explicitly illustrative "example contract"). The contract shows that the operation does not change the build and permits a repeat after a timeout, and only then is attempt 2 enabled. Attempt 2 asks the same question with its own 5 s bound, and the caller fills its result field only when a response actually arrives. A closing contrast shows that a write (`Start build`) changes the build, so its retry depends on its own contract. An idempotency key on that write is shown helping only if the service supports it.

Authored at speed 1. Total 37.6 s, finite ending (fade to the title band). Times are playback seconds.

| Time (s) | What moves | State change | Sound (preset, pitch, actor) |
|---|---|---|---|
| 0.0–1.2 | Still opening frame: inspector with row #1 `Read status · Build 42`, empty bar, `status ?`; CI service holds `Build 42 · passed` (dim). | Starting state. | none |
| 1.2 | Chip `Build 42?` travels down the request rail (0.8 s). | Bar #1 starts filling; outcome reads `wait ≤ 5 s`. | `send` C6, caller |
| 2.0 | Chip lands at the service. | Service outline brightens; work pill `#1` appears with an amber spinner. | `arrive` G4, service |
| 2.2–6.2 | Bar #1 fills linearly to its end tick and turns amber in the last 1.4 s. No response travels. | Waiting. | `clock` ticks at 2.2, 3.2, 4.2, 5.2, caller |
| 6.2 | Bar reaches the end tick; outcome jolts (8 px). | `timed out` (amber), `?` outlined amber. The service stays neutral and `#1` keeps spinning, dimmed: the caller cannot tell whether the work finished. | `thump` G3, caller (soft, no crash) |
| 7.4 | Row #2 appears, inactive. | Dashed grey `retry ?` control: the timeout alone does not enable a retry. | `ack` C5, caller |
| 7.4–9.6 | Hold (only the dim `#1` spinner moves). | — | none |
| 9.6 | `contract` tab lights; the service steps out, then the example contract card slides in (by 10.65). | Card shows `Read status` (full) and `Start build` (dim, 28%). | `ack` C5 caller; `arrive` E5 documentation at 10.15 |
| 11.0 | Card `Read status` box and the outline around row #1's request light together. | Same operation matched. | `ack` E5, documentation |
| 12.2 | `changes build` → `no` (teal ripple). | It only reads. | `ack` E5 |
| 13.4 | `retry after timeout` → `yes`; `timed out` gets a matching amber outline. | The observed failure is one the contract covers. | `ack` E5 |
| 14.6 | Check pops on `Read status`; box turns teal; `retry ?` becomes solid teal `retry ok`. | Second attempt enabled by contract + failure type. | `ack` C5 then `ack` G5 (caller, rising pair; no success chime) |
| 14.6–17.0 | Hold on the enabled state. | — | none |
| 17.0 | Card slides out; service returns 0.4 s later. | — | `send` E6 (soft close tick) |
| 17.9–19.3 | Row #2 fills in `Read status · Build 42` directly under row #1; both requests outlined together; outcome `same question`. | Same question, aligned. | `store` C5 + `ack` C6, caller |
| 19.6 | Identical chip `Build 42?` travels down the same rail. | Bar #2 starts (same 5 s scale); `wait ≤ 5 s`. | `send` C6 (identical to attempt 1) |
| 20.4 | Chip lands. | Pill `#2` appears spinning beside the still-dim `#1`. | `arrive` G4 (identical to attempt 1) |
| 20.6, 21.6 | Bar #2 fills. | — | `clock` ticks |
| 21.65 | Service finishes #2. | `#2` gets a check and turns teal; service `passed` turns teal. | `work` G4, service |
| 21.9 | Teal chip `passed` travels up the separate response rail (0.8 s). | — | `send` G5, service |
| 22.7 | Chip reaches the caller (teal ripple). | Bar #2 freezes at 60% of its bound and turns teal; `received`. Result field still `?`. | `deliver` C5, caller |
| 23.5 | — | Result field becomes `passed` (teal): the caller uses the response it received. | `chime` C5, caller |
| 23.5–26.4 | Hold on the resolved read. `#1` is still dim and spinning. | — | none |
| 26.4 | Service steps out; card returns with the read section dimmed (check kept) and `Start build` at full strength with an amber outline. | Focus moves to the write. | `arrive` A3 (write identity) at 26.7 |
| 27.6 | `changes build` → `yes` (amber ripple). | The write changes remote state. | `ack` A4 |
| 28.8 | `retry after timeout` → `?` (amber, small jolt). | Its retry depends on its own contract. | `fall` A3→F3 (scene-defined two-note fall) |
| 30.2 | Blue `idempotency key` pill appears on the write header. The `?` remains. | Adding a key does not answer the question. | `store` A4 |
| 31.2 | `key helps only if service supports it` appears in amber. | Condition stated. | `thump` G3 at low gain (neutral, not an error) |
| 31.2–34.0 | Hold on the contrast. | — | none |
| 34.0 | Card slides out; service returns. | Back to the read result. | `send` E6 |
| 35.0 | Result `passed` pulses. | End on the observed result. | `ack` C5, low gain |
| 36.6–37.4 | Stage fades to black below the title. | Finite ending. | silence |

## Sound map

Caller: C5 family (sends C6, arrivals and delivery at C5). Service: G4 for arrivals and work, G5 for its responses. Example contract (documentation): E5, with E6 for the open and close ticks. Write row: A3/A4 and a falling A3→F3. Attempts 1 and 2 use the identical send and arrive cues, so the repeated question also sounds the same. All sounds are synthesised by the cut-local `engine/sfx.js`.

## A/B plan choices (neutral record)

| Topic | Plan A | Plan B | This cut |
|---|---|---|---|
| Opening | Aftermath: attempt 1 already expiring | Attempt 1 sent, waited and timed out on screen | B: a beginner sees the bound being exhausted |
| Stage | Inspector panel, attempt rows, result field, separate request and response rails | Caller box, timer bar, contract card at the side, trace log | A's inspector and rails, with B's aligned per-attempt request text acting as the trace |
| Contract | Expanding tab over the work area, rows revealed one at a time, labelled as an example | Card listing a read row and a dim write row | A's overlay tab labelled `example contract`, holding B's two operations (write dimmed until the contrast) |
| Enablement | Attempt 2 control goes from inactive to enabled | Not drawn | A: dashed `retry ?` → solid `retry ok` |
| Same question | Pulse the unchanged target plus a `Same question` label | Identical aligned trace text and identical sounds | Both: aligned identical text, a paired outline, the `same question` outcome label and identical cues |
| Unknown remote work | Service stays neutral, no reset | `#1 ?` indicator stays faint and is never cleared | B's persistent dim `#1` work pill (spinner) on a neutral service |
| Bound | `5 s max` labelled bar that stops short on arrival | Same bar reset for attempt 2 | Per-row bars on one 5 s scale, outcome `wait ≤ 5 s`; bar #2 freezes short of its end |
| Evidence | Result field fills only after arrival | Teal outcome on arrival | A: separate `received` and then the `status` field |
| Write caveat | Write tab, key chip, retry stays inactive, `Applicable contract required` | Write row `own contract`, `not sent`; no key on screen | Write section `changes build: yes`, `retry after timeout: ?`, key chip, `key helps only if service supports it` |
| Pace | 39 s target | ≈29 s at speed 1, slowed to ≈41 s | 37.6 s authored at speed 1 with 2–3 s holds |

## Accuracy limits observed on screen

The cut contains no backoff, jitter, attempt budget or overall deadline. No error type other than a timeout appears. The service never turns red or resets, and attempt 1's work stays unresolved, so a timeout is not shown as proof that nothing happened. The read is shown as safe because this example contract says so; the word "read" is not the test. Attempt 2 succeeds once, and its bar shows that it succeeded within its bound on this run. The key is shown as conditional.
