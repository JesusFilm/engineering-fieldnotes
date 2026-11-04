# Lesson 03 — Independent parallel work — plan B

Independent plan for the motion-v2 cut of orchestration-patterns lesson 03. Authored from the lesson entry in `video/orchestration-patterns/sequence/lessons.json` (item 3) and the concept content in `content/concepts/orchestration-patterns.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **two reviews that inspect different concerns of one frozen snapshot with read-only access do not depend on each other, so they can run at the same time; each produces a report stamped with the snapshot's identifier, and neither changes the files the other is reading.**

The viewer should feel the simultaneity: two chips leave the coordinator in the same instant, two reviewers light together, two bars fill side by side over the same seconds, and two reports land carrying the same snapshot id. The one disturbance is a write attempt that the frozen snapshot refuses, so the reviewers' independence is seen to be protected, not assumed.

Grounding (from the concept): "freeze one code snapshot. Ask one model worker to inspect compatibility and another to inspect migration risks, both with read-only tools. Their analyses can run independently against that same snapshot"; "neither worker edits shared files"; "make read-only access a tool/runtime configuration; a persistent prompt saying 'do not write' is not a permission boundary"; the pitfall: "two workers editing one checkout overwrite or assess each other's unfinished changes."

Out of scope: the join and its validation (the coordinator needing both reports is shown as a waiting state only; the join is a later lesson), routing (lesson 02), the chain (lesson 01), timeouts and retries, and the content of the findings. The cut ends with two stamped reports and a coordinator still waiting.

Grammar for this cut: **a coordinator above a frozen snapshot, two reviewer boxes left and right, two concurrent progress bars stacked as a small Gantt, and two report cards.** Assignment chips travel down the margins at the same time; read dots and content chips move on short vertical wires between the snapshot and each reviewer; the two bars fill in the same interval; the reports land at the same moment. This differs from lesson 01 (a stacked chain with one elapsed bar filling in sequence) and lesson 02 (a routing table with three exits), from the memory-architecture, context-engineering, tool-design, and loop-engineering cuts, and from the harness-engineering views. Every element is a software object: a coordinator, a snapshot with a revision id, a reviewer with a scope, a progress bar, a report.

Target length ≈ 30 s at playback. Authored at speed 1 for 27 s with `meta.speed: 0.9`. This sits under the 35–50 s guideline because the lesson is one parallel pass; lengthen the hold while both bars fill and the hold on the two stamped reports first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and bar labels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Orchestration patterns** / INDEPENDENT PARALLEL WORK | engine title + subtitle |
| coord | box | (540, 540) | 480 × 120 (x 300–780, y 480–600) | label `coordinator` 40 px; sublabel 36 px `assigns` → `waits for both` | |
| snapshot | box | (540, 760) | 520 × 160 (x 280–800, y 680–840) | label `snapshot a1f3` 40 px mono; sublabel `frozen · read-only` 36 px mono accent | the shared, unchanging input |
| compat | box | (250, 1060) | 400 × 150 (x 50–450, y 985–1135) | label `compat review` 40 px; sublabel 36 px `callers vs contract` (19 characters ≈ 410 px: too wide; use `callers · contract` 18 ≈ 389 px, or `contract`) | alpha 0.5 until assigned |
| migration | box | (830, 1060) | 400 × 150 (x 630–1030) | label `migration review` (16 characters at 40 px non-mono ≈ 350 px); sublabel `existing rows` | alpha 0.5 until assigned |
| barL | bar, `segments: 1` | (540, 1230) | 400 × 14 (x 340–740) | label `compat` 36 px | fills 0 → 1 over the same interval as barR |
| barR | bar, `segments: 1` | (540, 1285) | 400 × 14 | label `migration` 36 px | fills 0 → 1 over the same interval as barL |
| repL | store, `rows: 2`, w 400 | (250, 1450) | 400 × ≈ 140 (x 50–450, y ≈ 1380–1520) | rows 36 px mono, hidden until produced | row0 `report  compat` · row1 `snapshot a1f3` accent |
| repR | store, `rows: 2`, w 400 | (830, 1450) | 400 × ≈ 140 (x 630–1030) | rows 36 px mono, hidden until produced | row0 `report  migration` · row1 `snapshot a1f3` accent |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| assignL | coord.left (300, 540) | compat.top (250, 985) | [250, 540] | the coordinator assigns the compatibility review; runs down the left margin outside the snapshot (x 250 < 280) |
| assignR | coord.right (780, 540) | migration.top (830, 985) | [830, 540] | the coordinator assigns the migration review; runs down the right margin (x 830 > 800) |
| readL | [400, 840] (snapshot bottom, left part) | [400, 985] (compat top, right part) | — | compat reads the snapshot (145 px) |
| readR | [680, 840] | [680, 985] | — | migration reads the snapshot; also carries the refused write upward |
| outL | compat.bottom (250, 1135) | repL.top (250, 1380) | — | compat's report; passes left of the bars (bars span x 340–740) |
| outR | migration.bottom (830, 1135) | repR.top (830, 1380) | — | migration's report; passes right of the bars |

The two halves of the stage mirror each other so simultaneity is read as symmetry. Stage spans y ≈ 480–1520.

## Sound map

Pitches: coordinator **C5**, snapshot **G5**, compat reviewer **E5**, migration reviewer **A5**. Pan by x: compat and its bar/report left (`−0.5`), migration and its bar/report right (`+0.5`), coordinator and snapshot centre. Simultaneous events use two pitches 60 ms apart so the pair is heard as one chord.

| event | preset | notes |
|---|---|---|
| coordinator appears | `ack` | C5 |
| snapshot appears | `ack` | G5 |
| snapshot frozen | `clock` then `ack` G5 | the sublabel pulses |
| reviewers appear | `ack` | E5 / A5, quiet |
| both assignments leave | `send` | C6 panned left and right |
| both reviewers receive | `arrive` | E5 and A5, 60 ms apart |
| both read requests | `ack` | E5 and A5 |
| content delivered to both | `store` | G5 ×2, panned |
| both reviews run | `work` | alternating left and right pan every 0.15 s |
| write attempt refused | `thump` | gain ×0.7, pan right; red × at the snapshot; sublabel pulses |
| both bars complete | `ack` | E5 and A5, gain ×1.3, with green checks |
| both reports land | `store` | ×2 per report, panned; the snapshot row adds `ack` G5 |
| snapshot id matches both | `chime` | the brightest event |
| coordinator waits | `ack` | low (C4), quiet |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Freeze one snapshot (0.0–6.0)** | | | |
| 0.0 | — | reviewers at alpha 0.5; bars empty; reports hidden | — |
| 0.6 | coord pops | sublabel `assigns` | ack C5 |
| 1.2 | snapshot pops | `snapshot a1f3` | ack G5 |
| 1.8 | snapshot sublabel pulses accent | `frozen · read-only` | clock, ack G5 |
| 2.4 / 2.5 | reviewers pop at alpha 0.5 | — | ack E5, ack A5 (quiet) |
| 2.5–6.0 | hold | one frozen input, two idle reviewers | |
| **Beat 2 — Assign both reviews at once (6.0–9.0)** | | | |
| 6.0–7.0 | chips `compat` (fg) and `migration` (fg) leave coord at the same instant down `assignL` and `assignR`, 1.0 s each | — | send C6 ×2 (panned) |
| 7.0 / 7.06 | ripples at both reviewer tops | both reviewers alpha → 1; strokes → active; sublabels pulse | arrive E5, arrive A5 |
| 7.06–9.0 | hold | two reviewers lit together | |
| **Beat 3 — Both inspect the snapshot; neither edits it (9.0–16.5)** | | | |
| 9.0 / 9.06 | dots (fg) up `readL` and `readR` to the snapshot, 0.4 s | — | ack E5, ack A5 |
| 9.5 / 9.56 | chips `diff @a1f3` (fg) down `readL` and `readR`, 0.4 s | — | store G5 ×2 |
| 10.0–13.0 | `barL` and `barR` `seg0` 0 → 1 linear, together | both reviewers glow | work ticks alternating left/right every 0.15 s |
| 11.2–11.6 | chip `write` (bad) up `readR` from migration, 0.4 s | — | — |
| 11.6 | bad ripple with × at (680, 840) | snapshot sublabel pulses accent; migration shakes ±6 px | thump |
| 13.0 / 13.06 | ok ripples with checks at both bar ends | bar colours → ok; reviewer strokes → ok | ack E5, ack A5 (louder) |
| 13.06–16.5 | hold | two full bars over the same seconds; the snapshot unchanged | |
| **Beat 4 — Keep both results tied to the snapshot (16.5–27.0)** | | | |
| 16.5–17.3 | chips `report` (ok) down `outL` and `outR`, 0.8 s each | — | send E6, send A6 |
| 17.3 / 17.36 | ripples at both report tops | repL row0 `report  compat` · repR row0 `report  migration` | store ×2 |
| 17.8 / 17.86 | second rows pop | `snapshot a1f3` accent on both | store ×2, ack G5 |
| 18.3 | snapshot label pulses accent; both `snapshot a1f3` rows pulse | the same id in three places | chime |
| 18.9 | coord sublabel swaps | `waits for both` | ack (low, quiet) |
| 18.9–24.0 | hold | final state: frozen snapshot, two done reviewers, two full bars, two reports stamped with the id, a waiting coordinator | |
| 24.0–24.8 | — | `s.fade` to black, 0.8 s | — |
| 27.0 | end | finite ending (the extra second of black lets the final still breathe before the loop) | |

## Accuracy limits

- The snapshot id, reviewer scopes, and timing are illustrative, drawn from the concept's example. The two bars fill over the same interval to show overlap; real reviews take different times, and the cut makes no claim about speed-up or cost (the concept says concurrency does not guarantee lower cost or higher quality).
- The refused write depicts read-only access enforced by configuration at the snapshot. The concept says this must be a tool/runtime configuration, not a prompt; the cut shows the effect, not the configuration.
- `diff @a1f3` stands for whatever each reviewer reads from the snapshot (schema, migration, checklist); the content is not shown.
- The reports carry only a name and the snapshot id. The concept's result contract (snapshot identifier, checks attempted, findings with evidence, completion status) is in the write-up; the join that validates it is a later lesson.
- The coordinator's `waits for both` is the lesson's last line, not a demonstration of the join.
- Independence here is a design judgement (the two concerns do not need each other's output); the cut shows the consequence, not the analysis that establishes it.
- No `poof` is used. The one `thump` marks the refused write.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `5.5, 9.0, 12.5, 15.5, 22.0, 26.0` (speed-1 ≈ 5.0, 8.1, 11.3, 14.0, 19.8, 23.4). Tile with ffmpeg and view the row; view the 12.5 s (both bars half full) and 22.0 s (final) stills at full size and at 350 px wide. Pass when the snapshot label and sublabel, both reviewer labels and sublabels, both bar labels, and all four report rows are readable at 350 px, and the two bars are visibly at the same fill in the 12.5 s still.
2. **Simultaneity**: in the 9.0 s still both reviewers are at full alpha and both assignment chips have landed; in the 12.5 s still both bars are partially filled to within 2% of each other; in the 15.5 s still both bars are full and both reviewers are ok.
3. **Read-only enforced**: the red × at 11.6 s (speed 1) sits at the snapshot's bottom edge on the right read wire; the snapshot's label and sublabel text never change; barR keeps filling through the refusal.
4. **Stamped reports**: at 22.0 s both report cards show `snapshot a1f3` in accent and the snapshot box reads the same id; the coordinator reads `waits for both`.
5. **No lingering state**: no chip remains during any hold; the × has faded before the bars complete; both bars complete within 0.1 s of each other.
6. **Overlap**: the assignment chips at x = 250 and 830 must clear the snapshot box (280–800); the `report` chips at x = 250 and 830 must clear the bars (340–740) and the bar labels; the read wires at x = 400 and 680 must not cross the reviewer labels (they land at the box tops' outer thirds). Report rows at 36 px mono (17 characters ≈ 367 px) fit inside 400 px with minimal padding; reviewer sublabels use the shortened forms noted.
7. **Word budget**: on-screen text is the coordinator label and sublabel, the snapshot label and sublabel, two reviewer labels and sublabels, two bar labels, and four report rows. No sentence appears.
8. **Audio**: the Node dry-run lists ≈ 50 cues (4 acks, clock, 2 sends, 2 arrives, 2 acks, 2 stores, ≈ 20 alternating work ticks, thump, 2 acks, 2 sends, 4 stores, ack, chime, ack). The spectrogram shows paired events as near-simultaneous double hits, a stereo-alternating work stretch from 10.0 to 13.0 s, the `thump` at 11.6 s, and the `chime` at 18.3 s as the brightest. `ffprobe` reports ≈ 30 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: a top box, a highlighted box below it, two dim boxes left and right; two chips leave the top box together down both margins and both side boxes light at once; dots go up from both side boxes to the middle box and chips come back down; two bars under them fill together; one upward red chip from the right box is stopped at the middle box with an ×; both bars finish together and both side boxes turn green; chips drop from both side boxes to two cards that fill two rows each, the second rows highlighted together with the middle box's label.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept orchestration-patterns`, then the full set before any release proposal. A new encode needs its own comparison review.

