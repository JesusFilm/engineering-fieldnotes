# Harness engineering — "done means verified" (fable cut)

**Learning objective.** After one watch, an engineer adopting coding agents should be able to say:
*the agent's "done" is a claim; the harness flips a feature to passing only on its own end-to-end check,
and a claim that fails the check goes back to the agent while the record stays false.*
This complements the baseline cut, which teaches the other half of the concept's "why": resuming prior
work across sessions from a progress record. This cut covers verifying an outcome before recording it.

**Mechanism in one line.** Claim → harness runs the check → PASS flips the feature list, FAIL returns the claim.

**Actors.** Agent (top), Harness (middle, two ports), Tests (bottom left), Feature list (bottom right, rows
`A passes:false` / `B passes:false`). Flow runs top to bottom; results travel back up.

**Colour grammar.** Orange = working / claimed but unverified. Green = verified by the check. Red = check
failed, claim rejected. Grey = idle or not yet claimed.

**Sound map.** Agent sends at E6, harness receives at C5, tests receive at G5. Agent work = low `work`
ticks; test run = fast `clock` ticks. PASS = `hit` sparkle; list flip = `store`; FAIL = `miss` buzz with
a jolt; rejection = two `thump`s (row, then agent), the loudest moments; final verification = `chime`.

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.0–0.7 | Stage fades in from black | Both rows grey `passes:false` | — (loop boundary) |
| 0.8–1.9 | Agent box glows orange, pulses | Agent working on feature A | `work` ×5 |
| 2.25–2.8 | Chip `DONE A` travels Agent → Harness | Row A turns orange (claimed) | `send`, `arrive` C5, `ack` |
| 3.1–3.75 | Pointer to left port; chip `RUN A` → Tests | Tests shows RUN (orange) | `arrive` G5, `clock` ticks |
| 5.15–6.15 | Tests turns green with ✓ ripple; chip `PASS` returns | Tests PASS; harness flashes green | `hit`, `arrive` |
| 6.5–7.1 | Pointer to right port; chip `passes:true` → list | Row A becomes `A passes:true` (green) with ripple | `store` |
| 7.1–9.3 | Hold | Normal case has landed | — |
| 9.35–10.5 | Agent glows orange | Working on feature B | `work` ×5 |
| 10.85–11.4 | Chip `DONE B` → Harness | Row B turns orange (claimed) | `send`, `arrive`, `ack` |
| 11.7–12.35 | Chip `RUN B` → Tests | Tests RUN | `arrive` G5, `clock` ticks |
| 13.75 | Tests snaps red, jolts, × ripple | Tests FAIL | `miss` |
| 14.2–14.8 | Chip `FAIL` returns to Harness | Harness flashes red | `arrive` |
| 14.9 | Red × ripple on row B; orange drains to grey | Row B stays `passes:false` | `thump` (loudest) |
| 15.3–15.85 | Chip `FAIL B` travels Harness → Agent | Agent jolts, flashes red | `thump` |
| 15.9–17.4 | Hold | The claim alone changed nothing | — |
| 17.55–19.1 | Agent glows orange, label `fix B` | Agent fixing B | `work` ×7 |
| 19.74–20.3 | Chip `DONE B` → Harness | Row B orange again | `send`, `arrive`, `ack` |
| 20.6–21.25 | Chip `RUN B` → Tests | Tests RUN | `arrive`, `clock` ticks |
| 22.64–23.64 | Tests green with ✓; chip `PASS` returns | Tests PASS | `hit`, `arrive` |
| 24.0–24.6 | Chip `passes:true` → list | Row B becomes `B passes:true` (green) | `store`, then `chime` at 24.9 |
| 24.6–27.0 | Hold on the fully verified list | Resolved state | — |
| 27.0–28.1 | Whole frame fades to black | Loop boundary matches frame 0 | — |

Total 28.1 s at speed 1. Four beats: normal (A passes), problem (B's claim fails the check), resolution
(B fixed and verified), ending hold and fade.

## Engine changes in the local copy (engine/)

Copied from the installed `architecture-flow-video` skill and changed here only:

- `render.mjs`: ffmpeg limited to `-threads 2` for both encode and mux; temp files under `./scratch`.
- `flow-engine.js`: box sublabels 24→30 px, store row text 26→30 px, chip text 26→30 px (phone legibility);
  new `s.blackout(t, to, dur)` and `stage.black` prop that fade the whole frame including the title band,
  so a looping cut can open and close on identical black frames. `s.fade` is unchanged.
- `engine/node_modules/` is gitignored and holds a symlink `puppeteer-core` → the skill's installed copy;
  `npm install` in `engine/` produces an equivalent local install (`puppeteer-core ^23`).

