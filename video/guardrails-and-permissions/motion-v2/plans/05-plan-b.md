# Lesson 05 — Recheck changed actions — plan B

Independent plan for the motion-v2 cut of guardrails-and-permissions lesson 05. Authored from the lesson entry in `video/guardrails-and-permissions/sequence/lessons.json` (item 5) and the concept content in `content/concepts/guardrails-and-permissions.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **an approval is bound to the artifact it named; when the artifact changes, the executor's recheck at execution time lines up the approved digest against the current digest, finds they differ, and blocks; the only way forward is a new review of the new artifact, which adds a new approval rather than reusing the old one.**

The viewer should feel the two digests side by side in the executor: `approved  9f3a…` over `current   c71d…`, a red × beside them, production untouched; then the reviewer looks at `r43` itself, a second row appears in the approvals ledger beneath the first, the executor's `approved` row updates to `c71d…`, the two digests match, and production lights with `r43`. The `r42` approval never moves.

Grounding (from the concept): "bind approval to those values in trusted execution code; changed values require renewed review"; "approving 'fix production' allows the actual artifact or target to drift after review"; OWASP transaction authorization: bind approval to significant action data; the exercise step: "execute it with the deployment identity, then attempt a changed target"; the lesson's takeaway: "recheck it at execution time. Changed intent requires a new decision."

Out of scope: the first review of r42 (treated as already saved), the agent's role and read-only identity (lessons 01–04), target drift (lesson 04's coda), the content of the reviewer's judgement, and rollback. The cut ends with r43 approved, matched, and executed.

Grammar for this cut: **an artifacts list at the top, an approvals ledger on the left, an executor recheck panel on the right that shows two digests one above the other, a reviewer at the bottom left, and production at the bottom right.** The ledger grows by a row; the recheck panel's two rows are the comparison; the reviewer feeds the ledger up the left margin. This differs from lesson 04 (proposal and approval cards with an executor that marks artifact and target) by making the ledger and the digest pair the centre of attention and by showing the renewed review as the resolution; it differs from lessons 01–03 (grid, grant card with stores, two checkpoints with a meter), from the orchestration, memory-architecture, context-engineering, tool-design, and loop-engineering cuts, and from the harness-engineering views. Every element is a software object: an artifact digest, an approval record, a recheck, a reviewer, a production target.

Target length ≈ 36 s at playback. Authored at speed 1 for 32.5 s with `meta.speed: 0.9`. Lengthen the hold on the mismatch and the hold after the new approval row appears first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows and sublabels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Guardrails and permissions** / RECHECK CHANGED ACTIONS | engine title + subtitle |
| artifacts | store, `rows: 2`, w 520 | (540, 590) | 520 × ≈ 140 (x 280–800, y ≈ 520–660); row centres y ≈ 555, 625 | label `artifacts` 36 px at (540, 485); rows 36 px mono | row0 `r42  9f3a…` fg → mid · row1 `r43  c71d…` accent (appears in beat 1) |
| approvals | store, `rows: 2`, w 380 | (260, 980) | 380 × ≈ 140 (x 70–450, y ≈ 910–1050) | label `approvals` 40 px at (260, 870); rows 36 px mono | row0 `r42  9f3a…  ok` ok · row1 hidden → `r43  c71d…  ok` ok (16 characters ≈ 346 px) |
| recheck | store, `rows: 2`, w 480 | (800, 980) | 480 × ≈ 140 (x 560–1040, y ≈ 910–1050); row centres y ≈ 945, 1015 | label `executor · recheck` 40 px at (800, 870); rows 36 px mono | row0 `approved  —` → `approved  9f3a…` → `approved  c71d…` · row1 `current   —` → `current   c71d…` (15 characters ≈ 324 px) |
| badge | badge | (1040, 870) | — | `blocked` bad → `match` ok | right of the recheck label; hidden until beat 3; verify right edge < 1070 |
| reviewer | box | (260, 1340) | 380 × 130 (x 70–450, y 1275–1405) | label `reviewer` 44 px; sublabel `engineer` 36 px → `inspects r43` → `approved r43` | |
| prod | db | (800, 1340) | w ≈ 140 | label `production` 36 px at (800, 1430) | lights once on the matched execution; shows `r43` as its sublabel after |

The recheck panel's mark lands at (1010, 980), between its two rows at the right edge.

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| propose | artifacts.bottom (540, 660) | recheck.top (800, 910) | [540, 770], [800, 770] | the current artifact is proposed for execution |
| lookup | approvals.right (450, 980) | recheck.left (560, 980) | — | the executor reads the stored approval (110 px) |
| review | artifacts.bottom (540, 660) | reviewer.top (260, 1275) | [540, 770], [260, 770] | the new artifact goes for review (shares the first segment with `propose` and splits at y 770) |
| approve | reviewer.left (70, 1340) | approvals.left (70, 980) | [30, 1340], [30, 980] | a new approval is written up the left margin |
| deploy | recheck.bottom (800, 1050) | prod.top (≈ 800, 1260) | — | execution; `dashed` 1 until a match |

The recheck panel is the only place the two digests are seen together; the ledger is the only place approvals accumulate. Stage spans y ≈ 485–1430.

## Sound map

Pitches: artifacts **E5**, approvals ledger **G5**, recheck/executor **C6**, reviewer **A5**, production **E6**. Pan by x: approvals and reviewer left (`−0.5`), recheck and production right (`+0.5`), artifacts centre.

| event | preset | notes |
|---|---|---|
| artifact rows appear | `store` | E5; the new `r43` row adds `ack` C6 (quiet) |
| stored approval appears | `store` | G5 |
| proposal reaches the executor | `send` E6, `arrive` C6 | the `current` row fills |
| executor reads the approval | `send` G6, `store` C6 | the `approved` row fills |
| digests compared | `ack` | C6, quiet; both rows flash |
| mismatch | `thump` | gain ×1.3; red ×; the loudest event |
| production unchanged | `ack` | E6, quiet; the cylinder pulses at its idle state |
| artifact goes to the reviewer | `send` E6, `arrive` A5 | |
| reviewer inspects | `work` | ×4 at 0.25 s, pan left |
| new approval written | `send` A6 (pan left), `store` G5 | the ledger gains a row; the old row stays |
| approved row updates | `send` G6, `store` C6 | |
| digests match | `hit` | green check |
| deploy executes | `send` C7 (quiet), `arrive` E6, `chime` | the brightest event |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — A saved approval for r42; the artifact is now r43 (0.0–7.5)** | | | |
| 0.0 | — | artifacts row0 only; approvals row0 only; recheck rows `—`; badge hidden; `deploy` dashed; prod idle | — |
| 0.6 | artifacts row0 pops | `r42  9f3a…` fg | store E5 |
| 1.2 | approvals row0 pops | `r42  9f3a…  ok` ok | store G5 |
| 1.8 | approvals row0 and artifacts row0 pulse together | the approval names this digest | — |
| 3.0 | artifacts row1 pops | `r43  c71d…` accent; row0 → mid | store E5, ack C6 (quiet) |
| 3.0–7.5 | hold | the ledger says 9f3a; the current artifact says c71d | |
| **Beat 2 — The executor receives the new proposal and checks the stored approval (7.5–13.0)** | | | |
| 7.5–8.5 | chip `r43 · c71d…` (accent) artifacts.bottom → via → recheck.top, 1.0 s | — | send E6 |
| 8.5 | ripple at recheck.top | recheck row1 → `current   c71d…` accent | arrive C6 |
| 9.3–9.8 | dot (ok) approvals.right → recheck.left, 0.5 s | — | send G6 |
| 9.8 | ripple at recheck.left | recheck row0 → `approved  9f3a…` ok | store C6 |
| 9.8–13.0 | hold | two digests, one above the other | |
| **Beat 3 — The identifiers do not match; the executor blocks (13.0–20.0)** | | | |
| 13.0 / 13.3 | recheck rows flash in turn | — | ack C6 (quiet) ×2 |
| 13.8 | bad ripple with × at (1010, 980); recheck shakes ±6 px | both digests → bad; recheck stroke → bad; badge pops `blocked` bad | thump (loud) |
| 14.6 | prod pulses at idle | `deploy` still dashed; nothing executed | ack E6 (quiet) |
| 14.6–20.0 | hold (long) | `9f3a…` over `c71d…` with a red ×, a dashed deploy wire, an idle production | |
| **Beat 4 — Review the actual new artifact; do not reuse the old approval (20.0–32.5)** | | | |
| 20.0 | artifacts row1 pulses accent | — | — |
| 20.3–21.3 | chip `r43 · c71d…` (accent) artifacts.bottom → via → reviewer.top, 1.0 s | — | send E6 |
| 21.3 | ripple at reviewer.top | reviewer sublabel → `inspects r43`; stroke → active | arrive A5 |
| 21.5–22.5 | — | glow held | work × 4 (pan left) |
| 22.8 | reviewer pulses ok | sublabel → `approved r43` ok | — |
| 22.8–24.0 | chip `r43 · c71d…  ok` (ok) reviewer.left → via → approvals.left, 1.2 s | — | send A6 (pan left) |
| 24.0 | ripple at approvals.left | approvals row1 pops `r43  c71d…  ok` ok; row0 pulses mid once (still there, not reused) | store G5 |
| 24.0–25.5 | hold | two approvals, two artifacts, one current | |
| 25.5–26.0 | dot (ok) approvals.right → recheck.left, 0.5 s | — | send G6 |
| 26.0 | ripple at recheck.left | recheck row0 → `approved  c71d…` ok; row1 → `current   c71d…` fg | store C6 |
| 26.6 | ok ripple with check at (1010, 980) | recheck stroke → ok; badge → `match` ok | hit |
| 27.1 | — | `deploy` `dashed` → 0, colour → ok | — |
| 27.1–27.7 | chip `deploy r43` (ok) recheck.bottom → prod.top, 0.6 s | — | send C7 (quiet) |
| 27.7 | ok ripple at production | prod colour → ok with glow; its sublabel → `r43` | arrive E6, chime |
| 27.7–31.0 | hold | final state: two ledger rows, matching digests with `match`, production at r43, a reviewer that approved r43 | |
| 31.0–31.8 | — | `s.fade` to black, 0.8 s | — |
| 32.5 | end | finite ending | |

## Accuracy limits

- The release names and digest prefixes are illustrative. `9f3a…` and `c71d…` stand for immutable artifact digests; the concept's release record also includes service, environment, and expected effect, which the write-up carries.
- The recheck compares the artifact digest only. Lesson 04 shows the target; real executors compare the full approved record and verify the approver's authority, which is not shown here.
- The stored approval is treated as already saved when the cut begins; its review is not shown.
- The ledger keeps the r42 row to show that approvals are records, not permissions that transfer to new work. The cut does not show retention or revocation of approvals.
- The reviewer's inspection is shown as a glow and a sound; the judgement itself is not shown, and the cut makes no claim that r43 deserved approval beyond the lesson's premise.
- The new approval is written by the reviewer along a path the executor does not share; the cut does not show how the ledger is protected from writes by other identities.
- No `poof` is used. The `thump` marks the mismatch.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `6.5, 12.5, 19.0, 27.0, 31.0, 34.5` (speed-1 ≈ 5.9, 11.3, 17.1, 24.3, 27.9, 31.1). Tile with ffmpeg and view the row; view the 19.0 s (mismatch) and 34.5 s (final) stills at full size and at 350 px wide. Pass when both artifact rows, both approval rows, both recheck rows, the badge, the reviewer sublabel, and the production label are readable at 350 px, the two digests in the recheck panel are visibly different strings at 19.0 s and identical at 34.5 s, and the dashed `deploy` wire at 19.0 s is distinguishable from the solid one at 34.5 s.
2. **Digests side by side**: at 12.5 s the recheck panel reads `approved  9f3a…` over `current   c71d…` with no mark yet; at 19.0 s both are bad with a red × and the badge reads `blocked`.
3. **Nothing executed on mismatch**: production is idle and `deploy` is dashed in every still before 27.1 s (speed 1); no chip travels on `deploy` before then.
4. **New approval, not reuse**: at 27.0 s the ledger shows two rows, `r42` above `r43`, both ok; the r42 row's text is unchanged in every still.
5. **Match before deploy**: the `approved` row reads `c71d…` and the check mark appears before the `deploy` wire turns solid (speed-1 26.0 → 26.6 → 27.1).
6. **No lingering state**: no chip remains during any hold; the recheck's × has faded before the new lookup; the badge shows one state at a time.
7. **Overlap**: the `propose` and `review` chips share the first segment from (540, 660) to (540, 770) and must not be in flight at the same time (they are 12.8 s apart); the `approve` chip at x = 30 must stay inside the frame and clear of the approvals panel's left edge (70); the mark at (1010, 980) must clear the recheck rows' text (15 characters ≈ 324 px, ending ≈ x 904); the badge at (1040, 870) must clear the `executor · recheck` label (spans ≈ 620–980 at 40 px). Rows at 36 px mono (16 characters ≈ 346 px) fit inside 380 px with minimal padding; verify in the still.
8. **Word budget**: on-screen text is the artifacts label and two rows, the approvals label and two rows, the recheck label and two rows, the badge, the reviewer label and sublabel, and the production label and state. No sentence appears.
9. **Audio**: the Node dry-run lists ≈ 28 cues (store, store, store with ack, send/arrive, send/store, 2 acks, thump, ack, send/arrive, 4 works, send/store, send/store, hit, send/arrive/chime). The spectrogram shows the `thump` at 13.8 s as the loudest event, a quiet stretch during the 14.6–20.0 s hold, left-panned work ticks at 21.5–22.5 s, the `hit` at 26.6 s, and the `chime` at 27.7 s as the brightest. `ffprobe` reports ≈ 36 s with an audio stream. Record whether audio was heard or only analysed.
10. **Causal reading test**: with sound off and every word removed, a viewer should still see: a top list with one row and a left list with one green row pulse together; a second highlighted row appears in the top list; a chip drops from it to a right panel whose second row fills, and a dot from the left list fills the panel's first row; the two rows flash, a red × appears, the panel shakes and a red tag pops, while a dashed line below it stays dashed and the cylinder below stays dark; a chip drops from the top list to a bottom-left box that glows; a green chip climbs the left margin into the left list, which gains a second green row while the first stays; a dot from the left list updates the right panel's first row, a green check appears, the tag turns green, the dashed line turns solid, and a chip drops to the cylinder, which lights green.
11. **Project checks** after encoding: `python3 scripts/check_media.py --concept guardrails-and-permissions`, then the full set before any release proposal. A new encode needs its own comparison review.

