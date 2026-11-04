# Lesson 04 — Join before deciding — plan B

Independent plan for the motion-v2 cut of orchestration-patterns lesson 04. Authored from the lesson entry in `video/orchestration-patterns/sequence/lessons.json` (item 4) and the concept content in `content/concepts/orchestration-patterns.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **the decision depends on both reports, so the coordinator's join has one slot per report and a decision that stays locked until every slot is filled; the first report alone cannot unlock it, and when both are present the decision is computed from their contents, so two reports can still mean "blocked".**

The viewer should feel the lock: slot A fills early and an `approve?` badge is refused while slot B is empty; the migration bar keeps running in the background; slot B fills with a risk; the count turns green at `2 of 2` while the decision turns red at `blocked`, and the release box below is blocked. Completeness and success are seen as different rows.

Grounding (from the concept): "the final assessment depends on both"; "wait for both valid reports from the same snapshot before preparing an approval-ready bundle. Blocking findings and incomplete work must stay visible to engineers immediately"; "the coordinator validates completeness and reconciles contradictions; it must not count an unavailable worker as a clean review"; "an answer arriving is not evidence that all required checks passed"; the lesson's takeaway: "parallel execution does not remove dependencies at the decision point."

Out of scope: a missing or timed-out report and the retry policy, conflicting findings and reconciliation (the takeaway names them; the write-up carries them), snapshot mismatch and invalidation (a later lesson), the chain, routing, and the parallel dispatch itself (lessons 01–03). The cut ends with the release blocked and both reports visible.

Grammar for this cut: **two reviewer boxes with staggered progress bars above, a three-row join panel (slot A, slot B, decision) in the middle with a count beneath, and a release box below on a gated wire.** The join's rows fill from the reviewers; the decision row is the lock; the count and the decision sit together so the viewer compares them. This differs from lesson 01 (a stacked chain with an elapsed bar), lesson 02 (a routing table with three exits), and lesson 03 (mirrored reviewers with simultaneous bars and stamped reports), from the memory-architecture, context-engineering, tool-design, and loop-engineering cuts, and from the harness-engineering views. Every element is a software object: a review with progress, a report slot, a decision row, a count, a release gate.

Target length ≈ 33 s at playback. Authored at speed 1 for 30 s with `meta.speed: 0.9`. Lengthen the hold while the coordinator waits and the hold on the final `2 of 2` / `blocked` pair first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, bar labels, and the count are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Orchestration patterns** / JOIN BEFORE DECIDING | engine title + subtitle |
| barA | bar, `segments: 1` | (250, 540) | 340 × 14 (x 80–420) | label `api review` 36 px above | fills 0 → 1 by 2.6 s |
| barB | bar, `segments: 1` | (830, 540) | 340 × 14 (x 660–1000) | label `migration review` 36 px above (16 characters ≈ 346 px: fits the bar width) | fills 0 → 0.55 by 2.6 s, then slowly to 1 by 14.5 s |
| revA | box | (250, 680) | 400 × 150 (x 50–450, y 605–755) | label `api` 40 px; sublabel 36 px `running…` → `done · ok` | |
| revB | box | (830, 680) | 400 × 150 (x 630–1030) | label `migration` 40 px; sublabel `running…` → `done · risk` | |
| join | store, `rows: 3`, w 760 | (540, 1060) | 760 × ≈ 200 (x 160–920, y ≈ 960–1160); row centres y ≈ 995, 1060, 1125 | label `coordinator · join` 40 px at (540, 920); rows 36 px mono | row0 `slot A    —` → `slot A    ok · a1f3` ok · row1 `slot B    —` → `slot B    risk · a1f3` bad · row2 `decision  —` dim (locked) → `decision  blocked` bad (max 22 characters ≈ 475 px) |
| badge | badge | (900, 920) | — | `approve?` mid | right of the join label; appears in beat 2 and is refused |
| count | label | (540, 1225) | 36 px mono | `reports 0 of 2` → `1 of 2` mid → `2 of 2` ok | sits directly under the join so it is read with the decision row |
| release | box | (540, 1450) | 480 × 140 (x 300–780, y 1380–1520) | label `release` 44 px; sublabel 36 px `waiting` → `blocked` | |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| inA | revA.bottom (250, 755) | [350, 960] (join top, left part) | [250, 860], [350, 860] | the API report goes to slot A |
| inB | revB.bottom (830, 755) | [730, 960] (join top, right part) | [830, 860], [730, 860] | the migration report goes to slot B |
| out | join.bottom (540, 1160) | release.top (540, 1380) | — | the decision reaches the release; `dashed` 1 while locked |

The `out` wire passes behind the count label's row at y = 1225; the label is centred and the wire's dots are dim, so check legibility in the still, and shift the count to (780, 1225) if needed. Stage spans y ≈ 500–1520.

## Sound map

Pitches: api review **E5**, migration review **A5**, join **G5**, release **C5**. Pan by x: A left (`−0.5`), B right (`+0.5`), join and release centre.

| event | preset | notes |
|---|---|---|
| reviews run | `work` | left ticks while barA fills, right ticks while barB fills; the right ticks continue alone after A is done, at longer intervals |
| A done | `ack` | E5, gain ×1.3, green check |
| report A travels and lands | `send` E6, `store` G5 | |
| count updates | `ack` | low (C4), quiet |
| `approve?` badge | `ack` | mid, quiet |
| approval refused | `miss` | gain ×0.7; grey × on the decision row; the empty slot B pulses |
| B done | `ack` | A5, gain ×1.3, green check (finishing is not the problem) |
| report B travels and lands | `send` A6, `store` G5 (lower pitch, gain ×1.2) | the row turns bad |
| both slots evaluated | `ack` | G5, quiet, rows flash |
| decision: blocked | `thump` | gain ×1.3; the loudest event |
| gate opens with a block | `send` G6, `arrive` C5 | release turns bad with `s.shake` |
| count and decision compared | `ack` C6 then `thump` (gain ×0.5) | green count, red decision, pulsed together |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The API review finishes first (0.0–6.5)** | | | |
| 0.0 | — | both reviewers `running…` with glow; bars empty; join rows idle; decision row dim; count `reports 0 of 2`; release `waiting`; `out` dashed | — |
| 0.4–2.6 | `barA` 0 → 1 linear; `barB` 0 → 0.55 linear | — | work ticks, left and right |
| 2.6 | ok ripple with check at barA's end | revA sublabel → `done · ok`; stroke → ok; barA colour → ok | ack E5 (louder) |
| 2.6–14.5 | `barB` 0.55 → 1 linear (slow) | revB keeps glowing | work ticks, right only, every 0.5 s |
| 3.4–4.4 | chip `report A · ok` (ok) revA.bottom → via → [350, 960], 1.0 s | — | send E6 |
| 4.4 | ripple at the join's top | join row0 → `slot A    ok · a1f3` ok | store G5 |
| 4.9 | count swaps | `reports 1 of 2` mid | ack (low, quiet) |
| 4.9–6.5 | hold | one slot filled, one empty, decision locked, B still running | |
| **Beat 2 — The coordinator waits; one report cannot stand for both (6.5–14.0)** | | | |
| 6.5 | badge pops | `approve?` mid | ack (mid, quiet) |
| 7.3 | grey ripple with × at the decision row's right end (900, 1125) | row2 `decision  —` flashes dim; row1 `slot B    —` pulses; `out` stays dashed | miss |
| 7.9 | badge scale → 0 | — | — |
| 7.9–14.0 | hold (long) | the join holds with one slot empty while the right bar creeps toward full | (right work ticks continue) |
| **Beat 3 — Migration finishes and reports a risk (14.0–20.0)** | | | |
| 14.5 | ok ripple with check at barB's end | revB sublabel → `done · risk` (text ok-coloured for `done`, bad for `risk` if the engine allows; otherwise bad); barB colour → ok | ack A5 (louder) |
| 15.3–16.3 | chip `report B · risk` (bad) revB.bottom → via → [730, 960], 1.0 s | — | send A6 |
| 16.3 | ripple at the join's top | join row1 → `slot B    risk · a1f3` bad | store G5 (lower, louder) |
| 16.8 | count swaps | `reports 2 of 2` ok | ack (low, quiet) |
| 16.8–20.0 | hold | both slots filled: one ok, one risk; the count is green; the decision is still `—` | |
| **Beat 4 — The risk blocks this release (20.0–30.0)** | | | |
| 20.0 / 20.3 | rows 0 and 1 flash in turn | the decision reads both slots | ack G5 ×2 (quiet) |
| 20.8 | row2 swaps and pulses | `decision  blocked` bad; join stroke → bad | thump (loud) |
| 21.4 | — | `out` `dashed` → 0, colour → bad | — |
| 21.4–22.2 | chip `blocked` (bad) join.bottom → release.top, 0.8 s | — | send G6 |
| 22.2 | bad ripple at release.top; release shakes ±8 px | release sublabel → `blocked` bad; stroke → bad | arrive C5 |
| 23.0 | count pulses ok; decision row pulses bad, together | `2 of 2` green beside `blocked` red | ack C6, thump (quiet) |
| 23.0–28.5 | hold | final state: two done reviewers, two filled slots, a red decision, a green count, a blocked release | |
| 28.5–29.3 | — | `s.fade` to black, 0.8 s | — |
| 30.0 | end | finite ending | |

## Accuracy limits

- The reviewers, timings, snapshot id, and finding are illustrative, drawn from the concept's example. The staggered bars show one review finishing first in this run; the order could be reversed in another.
- The join's three rows are a teaching rendering of the concept's join: wait for both valid reports from the same snapshot, then decide from their contents. The concept's result contract (snapshot identifier, checks attempted, findings with evidence, completion status) is in the write-up; the slots show status and snapshot id only.
- The `approve?` badge and its refusal depict "one report cannot stand for both". The cut does not show who or what proposed approving early.
- `blocked` is the decision for a blocking finding. The cut does not show how the coordinator distinguishes a blocking finding from a note, nor reconciliation of conflicting reports, nor a missing or timed-out report; the takeaway names these and the write-up covers them.
- The green `2 of 2` beside the red `blocked` is the lesson's point that completeness is not success; it does not suggest the count is misleading in general.
- The release box stands for the approval-ready bundle not being prepared; engineers keep the decision.
- No `poof` is used. The `miss` marks the refused early approval; the `thump` marks the block.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `6.0, 11.0, 19.0, 21.5, 26.5, 32.0` (speed-1 ≈ 5.4, 9.9, 17.1, 19.4, 23.9, 28.8). Tile with ffmpeg and view the row; view the 11.0 s (waiting) and 26.5 s (blocked) stills at full size and at 350 px wide. Pass when both bar labels, both reviewer sublabels, the three join rows, the count, and the release sublabel are readable at 350 px, the dim locked decision row at 11.0 s is distinguishable from the filled slot A row, and at 26.5 s the green count and red decision are both readable and clearly different colours.
2. **Lock holds**: between 4.4 and 20.8 s (speed 1) the decision row reads `—` and the `out` wire is dashed; at 11.0 s slot A is ok, slot B is `—`, barB is partially filled, and the × has faded.
3. **Count versus decision**: at 21.5 s the count reads `reports 2 of 2` in ok while the decision still reads `—`; at 26.5 s the count is unchanged and the decision reads `blocked` in bad.
4. **Release gated**: the release reads `waiting` until 22.2 s (speed 1) and `blocked` after; the `out` wire is solid and bad only from 21.4 s.
5. **No lingering state**: no chip remains during any hold; the badge appears once and is gone by 7.9 s; barB completes before report B leaves.
6. **Overlap**: report chips must not cross the `coordinator · join` label at y = 920 (they land at x = 350 and 730; the label spans ≈ 325–755 at 40 px, so route the via points to y = 880 and land at x = 300 and 780, or shift the label to (540, 905) and verify); the × at (900, 1125) must stay inside the join panel and clear of row text (longest row ≈ 475 px, ending ≈ x 657); the count must be legible over the `out` wire (shift as noted if not). Rows at 36 px mono (22 characters ≈ 475 px) fit inside 760 px with padding.
7. **Word budget**: on-screen text is two bar labels, two reviewer labels and sublabels, the join label and three rows, the badge, the count, and the release label and sublabel. No sentence appears.
8. **Audio**: the Node dry-run lists ≈ 60 cues (≈ 35 work ticks across both reviewers, 2 louder acks, 2 sends, 2 stores, 3 low acks, badge ack, miss, 2 quiet acks, loud thump, send/arrive, ack and quiet thump). The spectrogram shows left-panned ticks ending at 2.6 s with right-panned ticks continuing sparsely to 14.5 s, the `miss` at 7.3 s, and the `thump` at 20.8 s as the loudest event. `ffprobe` reports ≈ 33 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: two bars fill, the left one finishing first and turning green while the right one keeps creeping; a chip drops from the left box into the first row of a middle panel; a grey tag appears beside the panel and a grey × lands on its third row; the right bar finishes, a red chip drops into the second row, and a line under the panel turns green; the third row turns red, the dashed line below turns solid red, a chip runs down to a bottom box that shakes and turns red; the green line and the red row pulse together.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept orchestration-patterns`, then the full set before any release proposal. A new encode needs its own comparison review.

