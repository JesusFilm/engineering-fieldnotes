# Lesson 04 — Review a concrete action: beat sheet

Mechanism: a read-only agent proposes release r42 with a concrete action, artifact (`a91f…7c2e`) and target (`prod`), then attaches test evidence. A reviewer inspects those exact values and approves that record. A separate executor (`deployer`) verifies the approval came from the reviewer. It then compares the approved values with the action it is asked to run, row by row, and runs it only when both match. Production changes r41 → r42 through the executor. The agent stays `read-only` and has no route to production.

## Neutral choices from plans A and B

- From A: success path only, with no drift counterexample (lesson 05 covers changed actions). Approval encloses the whole concrete record instead of becoming a generic token. The executor verifies the approver before comparing fields. The executor fills its `approved` column from the record and its `to run` column from the request. Production changes once, only after both matches. The `read-only` agent badge persists and is outlined at the end. Finite fade.
- From B: separate actor cards for agent and reviewer above the record. The evidence is attached as its own step. The agent's run request travels along a right-hand margin to the executor. Only the executor is wired to production.
- This cut's geometry: a release record card (`proposed → in review → approved · reviewer`), then an executor diff view with `approved` and `to run` columns and an `=` mark per row that turns ✓ on match, then a production strip (`live release r41 → r42 · by deployer`). The diff view differs from the inspector, grid and two-column check layouts of lessons 01–03.
- Simplifications: the target is `prod` for consistent width with lessons 01–03. The digest is an abbreviated display of an immutable identifier. The test count is illustrative and does not authorize anything.
- Excluded: a changed artifact or target, expiry or replay, rollback, credential setup, and lesson 01–03 checks.

## Timing (speed 1, 42.2 s) and sound

| t (s) | What moves / state change | Sound (actor) |
|---|---|---|
| 0.3–1.0 | Reviewer card, empty record, executor diff (`waiting`), production `r41 · not started` fade in | ack C5 quiet |
| 1.2 | Agent card pops: `Agent · read-only · investigator` | ack E5 (agent) |
| 2.4–3.0 | Chip `r42` from agent into the record; record outlines blue, tag `proposed` | send E6 (agent) |
| 3.2 / 3.9 / 4.6 | `action deploy`, `artifact a91f…7c2e`, `target prod` rows appear | store E5 ×3 |
| 5.0–8.0 | Hold | — |
| 8.0–8.6 | Chip `tests` from agent; `evidence tests 12/12 passed` row appears | send E6, store E5 |
| 9.9 | Reviewer `inspecting`; record `in review` | arrive G5 (reviewer, gain 0.75) |
| 11.1 / 12.3 / 13.5 | Artifact, target, evidence outlined amber in turn; outlines persist | ack G5 ×3 |
| 13.7–16.5 | Hold: all inspected values visible together | — |
| 16.5–17.1 | Chip `approve` from reviewer; record turns green with glow, tag `approved · reviewer` | send G6, arrive G5 |
| 17.1–19.6 | Hold: approved record, executor still waiting, prod r41 | — |
| 19.6–20.2 | Chip `approved r42` from record to executor; `approved` column fills (green) | send G6, arrive C5 (executor) |
| 21.4 | Executor status `approved by reviewer ✓` | ack C4 |
| 22.8–24.2 | Agent's run request: blue dot down the right margin to the executor | send E6 (agent) |
| 24.2 | `to run` column fills (blue); `=` marks appear | arrive C5 |
| 26.0–26.6 | Artifact row compared (amber), then ✓; the to-run value turns green | work C4, ack C5 |
| 27.6–28.2 | Target row compared, then ✓ | work C4, ack C5 |
| 28.2–30.0 | Hold: both matched, prod still r41 | — |
| 30.0–30.8 | Execution wire opens; chip `deploy r42` from executor to production | send C6 (executor) |
| 30.8–31.8 | Production `deploying` | arrive D5, work D4 ×3 (production) |
| 32.2 | `live release r42 · by deployer`; executor `match · ran r42` | deliver D5, loudest |
| 34.4 | Agent `read-only` row outlined, unchanged | ack E4 quiet |
| 35.6 | Record artifact/target and executor rows outlined green together | ack C5 |
| 36.0–40.6 | Final hold | silence |
| 40.6–41.8 | Stage fades; title remains | — |

Actor pitches: agent E (E4–E6), reviewer G (G5/G6), executor C (C4–C6), production D (D4/D5).
