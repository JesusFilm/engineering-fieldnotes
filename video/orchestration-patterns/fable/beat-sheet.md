# Beat sheet — Orchestration: split by dependency (fable)

Learning objective: an engineer planning agent work can tell which subtasks are safe to fan out in parallel and which must be sequenced, by asking whether one subtask's output is another's input. Fan-out pays only for independent subtasks; a hidden dependency turns parallel work into a conflict plus a rework round trip; a known dependency is handled by keeping independent work parallel and forwarding the prerequisite result to the waiting worker.

Actors: Orchestrator (C5), Worker A (E5, panned left), Worker B (G5, panned right), Shared code (four rows: tests, docs, field, handler), a dependency bracket between the field and handler rows. Sends play an octave above the sender.

Complement to the baseline: the baseline shows serial versus parallel execution of two independent reviews and the join that waits for both. This cut never argues speed; it shows the judgement call before fan-out and what the shared code looks like when that call is wrong.

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.0–0.8 | Stage fades in from the black loop frame | Label INDEPENDENT appears | ack G6 |
| 1.0–1.7 | Chips `tests` → A and `docs` → B leave both ports at once | Ports light orange; both workers turn white and show their task | send C6 ×2, arrive E5, arrive G5 |
| 1.7–3.1 | Both workers work | — | work ticks, panned left and right |
| 3.0–3.7 | Chips `tests ok`, `docs ok` drop into separate rows | Rows 0 and 1 fill green with ripples; workers turn green | store ×2 |
| 3.9–4.5 | Envelopes return to the orchestrator | Orchestrator flashes green: clean join | send E6/G6, arrive C5, chime C6 |
| 4.5–6.3 | Hold | — | — |
| 6.4–7.1 | Chips `rename field` → A and `handler` → B fan out together | Label hidden; workers white | send ×2, arrive E5, arrive G5 |
| 7.1–8.6 | Both work | — | work ticks |
| 8.4–8.9 | Chip `total_cents` → row 2 | Row 2 becomes `field: total_cents`, green | store |
| 8.6–9.3 | Chip `uses amount` → row 3 | Row 3 flashes then turns red with an × ripple at its end; store jolts; a red dashed bracket appears linking rows 2 and 3; Worker B turns red | crash (loudest event) |
| 9.6 | Orchestrator jolts | Label HIDDEN DEPENDENCY in red | thump |
| 9.6–11.0 | Hold on the conflict | — | — |
| 11.0–11.6 | Red chip `redo: total_cents` → B | Port 1 red; B white again with task `handler` | miss, arrive G5 |
| 11.6–12.7 | B reworks | — | work ticks |
| 12.7–13.3 | Chip `uses total_cents` → row 3 | Row 3 becomes `handler: total_cents`, green; bracket turns solid green | store, link |
| 13.7–14.2 | Envelope returns | Orchestrator green: joined, one round trip late | send G6, arrive C5, chime |
| 14.2–15.4 | Hold | — | — |
| 15.4–16.6 | Stage fades to black and back | Rows reset to the old field; bracket now orange dashed (known); label KNOWN DEPENDENCY | poof, ack G6 with ripple on the bracket |
| 17.0–17.7 | Chips `rename field` → A and `docs` → B | Independent work still fans out beside the prerequisite | send ×2, arrive E5, arrive G5 |
| 17.7–19.0 | Both work | — | work ticks |
| 18.8–19.5 | `docs ok` → row 1; `total_cents` → row 2 | Rows 1 and 2 green | store ×2 |
| 19.5–20.3 | Envelope from B; green chip `total_cents` from A | Orchestrator holds the result the handler needs | send ×2, arrive C5 ×2 |
| 20.5–21.4 | Green chip `handler total_cents` → B, then quiet chip `tests` → A | Label SEQUENCED in green; B shows `handler`, A shows `tests` | send C6, arrive G5; quieter send, arrive E5 |
| 21.1–22.5 | Both work | — | work ticks |
| 22.3–23.0 | `uses total_cents` → row 3; `tests ok` → row 0 | Row 3 green with no conflict; bracket solid green; row 0 green | store, link, store |
| 23.3–24.0 | Envelopes return | Orchestrator green: all four rows done | send ×2, arrive C5 ×2, chime |
| 24.0–26.1 | Hold on the resolved state | — | — |
| 26.1–27.0 | Stage fades to black | Returns to the opening loop frame | poof (quiet) |


## Comparative revision (supersedes affected original timings)

6.3s: old tests/docs turn amber and stale (poof). They remain stale throughout the hidden-dependency repair. 15.95s: reset both worker labels/colors with the code during the existing reset fade. 22.8s: handler lands; 23.15–23.65s: completion returns. 23.85s: dispatch tests (send/arrival); 24.45–25.4s: tests work; 25.9s: tests result lands (store); 26.2–26.7s: result returns; 26.9s: final join (chime). Hold until fade at 29.1s (poof), ending at 30s. Green dependency brackets are dotted in the encoded engine, not solid.
