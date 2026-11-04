# Lesson 05 — Bound the whole operation

## Teaching target

Teach one distinction: an attempt timeout limits one wait; an overall deadline limits the whole operation, including the delay between attempts. Use one read of CI status, two timed-out attempts, and one shared twelve-second budget. End with an unknown result and the two-entry attempt history. No successful alternative run, third request, or later-topic preview.

The numbers are illustrative teaching values, not recommended defaults. This is a plan only; rendering, listening, frame inspection, and technical implementation checks remain future work.

## Policy and timing contract

Set `deadline = monotonic_start + 12s` once. Elapsed time means the difference between monotonic readings, not wall-clock time. Before sending, recompute `remaining = max(0, deadline - monotonic_now)`. Permit an attempt only with positive remaining time and unused attempt allowance; this example allows two total attempts. Its wait limit is `min(5s, remaining)`. After sleeping, recompute remaining before sending again. Never assign a fresh overall deadline to the retry.

Use an explicitly idealized trace with **zero network/processing overhead**. Show that short label during the setup and again beside the exact arithmetic. There is no packet-flight duration, connection setup animation, result-assembly duration, or simulated processing interval outside the displayed waits. The remote service is an unknown-state endpoint, not a measured work timer. In a real trace those costs and scheduling delays consume time too: after the two-second backoff, the retry has **at most five seconds, less overhead**. That qualification belongs in this plan and a brief on-screen chip, not a paragraph.

| Monotonic elapsed | Caller state | Shared remaining | Local wait limit |
| --- | --- | --- | --- |
| 0s | Attempt 1 begins | 12s | 5s |
| 5s | Attempt 1 times out | 7s | First wait finished |
| 5–7s | Backoff / sleep | 7s → 5s | No request active at caller |
| 7s | Attempt 2 begins | 5s | min(5s, 5s) = 5s |
| 12s | Attempt 2 times out; operation expires | 0s | No further wait |
| 12s | Admission closed; return unknown | 0s | No third request |

The ending must distinguish evidence about caller waiting from evidence about remote execution. Put timeout marks on caller attempt rows, never on the service. Keep the service neutral with a question mark; no crash, rollback, cancellation acknowledgement, or completion animation. The terse final label `Remote work may continue` conveys the limit without inventing a remote outcome. The deadline rejects further admission; the two-attempt allowance is also exhausted, but do not claim the deadline is the only stopping condition.

## Visual composition

1080×1920 vertical canvas, near-black background, white primary type, muted grey context, amber active waits and budget, restrained red timeout/closed states. Colour is redundant with words and shape. Use software-native timeline lanes, request rows, status chips, and a conditional admission control. No hourglasses, roads, water, batteries, or other physical metaphors.

Persistent title at (540, 270): `Bound the whole operation`, split into two lines at 76px. Below it, a small but readable `Example policy` tag. Persistent operation header at (540, 490): `CI status · 12s total`. The shared timeline spans x=120–960 at y=650, with a fixed endpoint `12s` at x=960. Its cursor never moves backwards; the remaining-value chip sits at (540, 760). The endpoint and operation header stay anchored during all layout changes.

Three compositions create purposeful variation:

1. Setup and first attempt: stacked operation timeline and enlarged local attempt row at y=1010. A caller panel centred at (320, 1370), 350×170, sits above-left of a neutral CI service panel at (760, 1580), 340×150. A quiet connector runs from (495, 1370) through (760, 1370) to (760, 1505). A brief endpoint pulse marks instantaneous admission; do not animate a travelling packet that could imply uncounted transit time.
2. Backoff and retry: service/caller panels dim; the local row becomes a two-row trace centred around y=1070 and y=1240. The two-second sleep occupies its proportional slice of the shared timeline, between the 5s and 7s positions. A large temporary `7 − 2 = 5s` replaces secondary metadata. The fixed deadline remains visible.
3. Closure: trace rows compress vertically but retain readable labels; a conditional control at (540, 1430), 700×150, displays `Remaining > 0?` then `No further attempt`. Final result appears at (540, 1640). This is a local decision display, not a third attempt node or a third request path.

Use at least 48px text for useful labels and 64–80px for time values: roughly 16px and 21–26px respectively at 350px width. Keep 90px outer margins. At most one short teaching chip plus the active row and shared values demand attention at once. No prose captions, tiny code listing, persistent legend, decorative dashboard, or simultaneous flashing panels. Only show timeline ticks 0, 5, 7, 12 as they become relevant.

## Beat sheet — 42 seconds of playback, 12 seconds of policy time

Playback time is an explanatory presentation clock. Define policy elapsed as a separate monotonic, piecewise-linear value: hold 0 through playback 6; advance 0→5 over 6–14; hold 5 over 14–17; advance 5→7 over 17–21; hold 7 over 21–27; advance 7→12 over 27–35; hold 12 through the ending. Every budget label, cursor, and attempt progress derives from that single value. During an explanation hold, show `Explanation pause` and freeze all simulation state, including service indicators. No fictitious runtime pause is implied. During advancing segments, show `Policy time · slowed`. State swaps and endpoint pulses during holds explain the same instantaneous policy event.

| Playback | Motion and attention | State change / meaningful hold | Synthesised sound |
| --- | --- | --- | --- |
| 0–6s | 0–1.2: reveal title and operation header. 1.2–2.4: draw full shared track and fixed deadline. 2.4–4: reveal `Per attempt · ≤5s` below the `Whole operation · 12s` scope. 4–6: hold this nested comparison with `Zero network/processing overhead`. | Budget set once to 12s; first attempt permitted at policy 0. Two scopes visible before anything expires. | Soft control `ack` E5 on budget creation; quieter caller `send` C6 and endpoint `arrive` G5 at admission, with no travel interval. |
| 6–17s | 6–14: first local wait progresses to 5s while the operation cursor moves only to 5/12. Numerals decrease coherently from 12 to 7. 14–14.8: local row changes to `1 · Timed out`. 14.8–17: hold the stopped local row beneath `7s left`. | First local wait ends; overall operation still has time. Service remains neutral. Explanation pause at elapsed 5s. | Sparse caller `clock` C5 cues at selected policy-second crossings; short descending caller timeout tone C5→C4 at playback 14. No crash sound. |
| 17–23s | 17–21: reveal `Backoff · 2s`; fill the 5–7s sleep slice as remaining falls 7→5. Attempt row stays inactive. 21–21.5: show `7 − 2 = 5s`. 21.5–23: hold. | Sleep consumes the same budget; there is no attempt progress and no service arrival. | Control `clock` E4 at the two sleep-second crossings; low E5 `ack` at wake-up. |
| 23–27s | 23–24: replace arithmetic with `Retry · ≤ remaining`. 24–25: show the concise comparison `min(5s, 5s)` and `5s max`. 25–27: reveal second row and hold its admission next to unchanged `5s left`; briefly replace the formula with `Less if overhead`. | Recompute at elapsed 7s. New local wait begins with a five-second cap; shared track stays at 7/12. This visual continuity is the no-reset lesson. | Control `ack` E5 at recheck, caller `send` C6 and service `arrive` G5 at second admission. |
| 27–37s | 27–35: second row progresses 0→5 while shared remaining falls 5→0; their endpoints align at policy 12. At 35: row changes to `2 · Timed out` and the shared endpoint becomes `Deadline reached`. 35–37: hold together. | The second wait ends by the fixed deadline. No sixth second, no replenishment, and no implied remote failure. | Sparse C5 `clock`; caller timeout C5→C4 at 35, with a restrained lower E3 control `thump` for deadline closure. Mix as one clear composite event. |
| 37–42s | 37–38: reveal `Remaining > 0?` with value `0s`; conditional becomes closed. 38–39: show `No further attempt`; no request is drawn. 39–40: bring up `Result: unknown` above the two timeout rows and `Remote work may continue`. 40–42: hold the complete evidence. | The next admission check is denied, not counted as attempt 3. Terminal result contains exactly two timed-out attempts. End finitely at 42s with this state; no reset or padding. | Quiet control E3 `thump` at denied admission; subdued caller `deliver` C4 at unknown result. No success chime. Silence during final reading hold. |

## Sound implementation and review intent

Keep caller C, policy controller E, and service G identities consistent through pitch and timbre. Service sounds mark receipt only, never proof of completion. Pan subtly toward the active panel; all distinctions must survive mono phone playback. Use synthesised sine/harmonic tones with short envelopes and restrained echoes. No music, speech, continuous ticking, escalating alarm, or work loop implying measured service activity. Sounds accompany causal changes; moving a layout element needs no extra cue. Budget countdowns share one clock cue stream rather than competing clocks.

A later implementation should keep the policy-time mapping explicit and derive both counters from it, with linear time progression and no easing of numeric time. Use scene-local drawing extensions if necessary, pinned repository rendering dependencies, and `meta.speed: 1`; the beat sheet already specifies presentation timing. No rendering or other files are requested in this planning pass.

## Acceptance checks for a later render

- Inspect boundary frames immediately before/at/after policy elapsed 5, 7, and 12, plus the retry admission. Check 12→7→5→0 arithmetic and that budget never rises.
- Verify first wait is five seconds, backoff is two, second wait is capped at five, and both timeline progress and remaining values use the same policy clock. Exact arithmetic is visibly conditional on zero overhead.
- Verify only two service admissions; the closed conditional has no outgoing request. Result is unknown with exactly two timeout rows, not “CI failed.”
- Freeze all simulated state during explanation pauses; distinguish playback time from policy time without a second distracting clock.
- Inspect every beat and its busiest frame at full size and 350px width. Resolve overlaps by removing secondary labels, not shrinking type. Check final evidence has two seconds to read and no passive stretch exceeds the planned holds.
- Decode the eventual full encode, check streaming metadata and audio peaks below −0.5 dB, and listen for clear actor distinctions and event alignment. Record actual listening separately from waveform analysis. These are planned checks, not completed results.
- Comprehension prompt for review: “After the two-second sleep, how much time can the retry use, and what do the two timeouts tell us about CI?” Expected: at most five seconds less overhead, and the outcome is still unknown.

## Evidence and scope

Read the repository editorial workflow, lesson item 5, concept content, and architecture-flow-video skill plus its style, engine API, and review references. Primary-source checks retrieved 2026-11-04:

- [gRPC deadlines](https://grpc.io/docs/guides/deadlines/): a deadline bounds willingness to wait; stopping spawned remote work is an application responsibility. A caller timeout must not visually prove remote cancellation.
- [AWS Builders’ Library: timeouts, retries, and backoff with jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/): timeouts bound caller waiting; delays separate retries; timeout does not establish absence of remote effects. Production timeout choices need latency evidence.
- [Python monotonic clock](https://docs.python.org/3/library/time.html#time.monotonic): monotonic time supports elapsed differences without wall-clock adjustments moving the clock backward.

The twelve-second budget, five-second waits, zero-overhead assumption, fixed two-second illustrative delay, and playback map are this lesson’s constructed example. Do not broaden the lesson into jitter selection, idempotency, layered retries, reconciliation, or new operations. Do not modify lesson metadata or publish anything as part of this plan.
