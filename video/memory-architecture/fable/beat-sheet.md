# Beat sheet — Memory architecture, "gated writes" cut (fable)

Lesson: an unsourced guess in shared memory can steer later runs toward the same mistake. This illustrative application gate keeps an unapproved guess in thread state and accepts a correction from an approved source.

Learning objective for a team adopting agents: decide who may write durable memory and what a write must carry (source + revision), to reduce the chance that a mistaken inference is reused as approved policy. Observable outcome: the team can name which of their agent's memory writes are gated and which are not.

Actors: `Run N` (the agent box; its label changes as runs succeed each other), `Thread N` (the displayed thread changes with each run; saved checkpoints may persist), `Write gate` (box, appears at the resolution), `Durable memory` (store, two rows), `runs` bar (one dot per run outcome), `OK`/`NO TESTS`/`SAVED`/`RUN TESTS` badges. An approved `TESTS.md · r13` source appears during repair.
Pitches: agent sends C6, thread notes E5/E6, memory reads answer with `hit`, sourced stores G5, the unsourced store G4 (a lower, duller note), good outcomes `deliver` C6, the first wrong outcome `crash`, repeats `thump`.

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.0–0.6 | Stage fades in from black | Memory holds `lint: strict @r12`; thread state empty | — |
| 0.7–1.4 | Orange chip `retry x3` leaves the agent along the left wire | Thread state row 0 fills, orange | send E6 → store E5 |
| 1.9–3.3 | `lint?` goes down the read wire; row 0 flashes; `strict @r12` returns green | Row 0 check mark; agent ripples green; `OK` badge; green dot 1 on the runs bar | send C6 → hit → deliver C6 |
| 4.6–5.1 | Thread row fades; label becomes `Run 2` | New numbered thread displayed empty; badge gone | poof → ack G6 |
| 5.6–6.3 | `flaky: ci` note goes to thread state | Row 0 orange | send E6 → store E5 |
| 6.9–7.7 | **Problem.** `tests: skip ?` travels the write wire straight into memory, no gate in the path | Memory row 1 fills orange with no revision; orange dot 2 | send C6 → store G4 (dull) |
| 9.2–9.7 | Run 2 ends | Display switches to Thread 3; label `Run 3` | poof → ack |
| 10.2–11.6 | **Consequence.** `tests?` reads row 1; `skip ?` returns orange; agent snaps red and jolts | `NO TESTS` badge; red dot 3 | send → hit → **crash** (loudest) |
| 13.0–15.3 | Run 4 repeats the read and skips tests | Red dot 4 | poof → ack → send → hit → thump |
| 16.3–18.5 | Run 5 repeats and skips tests | Red dot 5: three reds in a row | poof → ack → send → hit → thump |
| 19.8–20.8 | **Resolution.** Label `Run 6`; the write gate and approved source appear; gate flashes green | Gate present between agent and memory | ack → recover → chime |
| 21.6–22.7 | `tests: skip ?` hits the gate; gate flashes red, jolts, chip bounces back | Red × at the gate top | send → miss |
| 22.9–23.6 | The same guess goes to thread state instead | Thread row 0 orange `tests: skip ?` | send E6 → store E5 |
| 24.1–25.5 | `tests: run @r13` comes from the approved source and passes the gate (green check) and reaches memory; old row poofs red, new row stores green in the same slot | Row 1 now `tests: run @r13`, green | send → ack G6 → poof → store G5 |
| 25.9 | Run 6 completes the corrected write | `SAVED`; green dot 6 | deliver C6 |
| 27.0–29.4 | **Verify.** `Run 7` reads `tests?`, gets `run @r13`, selects the test action | `RUN TESTS`; green dot 7; held for 2 s | poof → ack → send → hit → deliver → chime |
| 31.4–32.2 | Stage fades to black so the loop restarts on the identical opening frame | — | — |

The persistent orange row is retrieved by three later runs. The gate then rejects another unsourced write, while the approved source supplies its replacement. Colours show the illustrative sequence; the outcome labels distinguish skipped tests, a successful write, and a selected test action.

## Comparative revision — gpt-6-astra comparative review, 2026-10-19

The table above now describes the revised cut; the original authored beat sheet is retained in the comparison scratch archive. The revision preserves timing and seven runs, with these corrections: 11.6/15.3/18.5s badges are NO TESTS; each new run selects a numbered thread rather than implying checkpoint deletion. At 20.3s an approved TESTS.md r13 source appears beside the run bar. At 24.1s that source sends the replacement through the gate, with entry/exit markers separated from the box labels. At 25.9s SAVED reports the write; at 29s RUN TESTS reports the selected action, not a guaranteed passing result. The full image fades at the end. The current transcript is variant.json. Source/revision fields are necessary evidence in this example, not automatic proof of approval.
