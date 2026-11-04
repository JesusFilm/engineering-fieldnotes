# Video 03 plan

## Mechanism and scope

One idea to feel: evidence is a record of a command that actually ran, and it belongs to one revision. The composition is a horizontal revision timeline with evidence cards hanging under each commit. Cards fill only when a command executes; a claim without a run leaves the card empty; a new commit arrives with an empty card of its own, so the old record visibly stays behind with the old revision. The final motion returns the observation to the agent as data.

Beats: (1) contrast case, the agent's claim `tests passed` reaches the empty card and nothing fills; (2) the command runs, the card fills with exit status and output size and binds to `a1f3c`; (3) commit `b7e2d` slides in with its own empty card while the old card stays bound; (4) the command runs again and the new card fills differently; (5) the new card's record travels up to the agent.

Limits the cut respects: the exit status and output size are evidence of a run, not proof of correctness; the second run passing says nothing beyond its own command. No gate, no merge, no repair step is shown; those are lessons 04 and 05. The first run fails and the second passes only so the two cards look different; the cut never explains why.

## Stage layout (1080×1920, `meta.speed: 0.9`)

| Node | Type | Centre | Options | Start state |
|---|---|---|---|---|
| title | title band | y 330 / 405 | `Harness` / `EVIDENCE` | — |
| agent | box | (540, 580) | w 400 h 140, label `AGENT` | resting grey |
| timeline | wire | [120,960] → [960,960] | dotted, `flow` 0 | alpha 0.6 |
| revA | box | (330, 960) | w 240 h 100, label `a1f3c`, mono 36 px | stroke white, glow |
| revB | box | (750, 960) | w 240 h 100, label `b7e2d`, mono 36 px | alpha 0, x starts at 1200 |
| bindA | wire | revA.bottom → cardA.top | short vertical | dim, `dashed` 1 |
| bindB | wire | revB.bottom → cardB.top | short vertical | alpha 0 |
| cardA | store | (330, 1340) | w 360, 3 rows, label `RUN` | dashed outline (alpha 0.35), rows blank |
| cardB | store | (750, 1340) | w 360, 3 rows, label `RUN` | alpha 0 |
| toolbarA | bar | (330, 1500) | w 300 h 14, ticks | seg0 0 |
| toolbarB | bar | (750, 1500) | w 300 h 14, ticks | alpha 0 |
| result | badge | (540, 760) | — | alpha 0 |

The agent sits above; the timeline runs left to right at mid-stage; cards and bars sit below their commits. Rows per card, once filled: row0 the command `./check.sh`, row1 the exit status, row2 the output size. Row2 `fill` reflects output size (0.6 for 412 lines, 0.58 for 398) so the bars give the card a shape at phone size.

Pitches: agent G5 (sends G6), commits C5, cards E5, bars `work` at E5. Pan cues with `s.panOf` so run A sounds left and run B sounds right.

## Storyboard (authored at speed 1; playback ≈ 1.11× longer)

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.0–1.0 | revA, timeline, dashed cardA and bindA draw in | one commit, no evidence yet | `arrive` C5 at 0.6 |
| 1.0–3.0 | Hold | — | — |
| 3.0–3.8 | Agent pulses; chip `"tests passed"` (grey, quoted) travels agent.bottom → cardA.top | contrast case begins | `send` G6 at 3.0 |
| 3.8–4.6 | Chip arrives; cardA jolts 6 px; chip dims to 0.3 and fades; card stays dashed and empty | a claim fills nothing | `thump` at 3.9 |
| 4.6–6.8 | Hold on the empty card | — | — |
| 6.8–7.6 | Chip `./check.sh` (white) travels agent.bottom → cardA.top; cardA outline → solid white glow; row0 `./check.sh` | the command is dispatched | `send` G6 at 6.8, `arrive` E5 at 7.6 |
| 7.6–11.6 | toolbarA seg0 fills 0 → 1 (orange); `s.mark` at 0.25, 0.5, 0.75 | command running | `work` every 0.25 s, E5, gain 0.35 |
| 11.6–12.4 | Bar turns red; row1 `exit 1` red; row2 `412 lines` grey, fill 0.6; red ripple on cardA | real result retained, both parts | `miss` at 11.7 |
| 12.4–13.2 | bindA `dashed` → 0, colour → OK; cardA sublabel → `a1f3c` green; green ripple on revA.bottom | evidence bound to revision | `store` C5 at 12.6 |
| 13.2–16.0 | Hold; cardA glow off, outline stays solid | — | — |
| 16.0–17.0 | timeline `flow` 1; revB slides x 1200 → 750 with ease `out`, alpha → 1; dashed cardB, bindB, toolbarB fade in | a new patch, no evidence of its own | `arrive` C5 at 16.9, pan right |
| 17.0–17.6 | revA stroke → grey (no longer head); cardA alpha 1 → 0.75 | old record stays with old revision | `clock` single tick |
| 17.6–20.0 | Hold: left card full and bound, right card dashed and empty | the lesson's comparison frame | — |
| 20.0–20.8 | Chip `./check.sh` agent.bottom → cardB.top; cardB outline → solid white glow; row0 `./check.sh` | same command, new revision | `send` G6, `arrive` E5 pan right |
| 20.8–24.8 | toolbarB seg0 fills 0 → 1 orange; three marks | running | `work` every 0.25 s, pan right |
| 24.8–25.6 | Bar turns green; row1 `exit 0` green; row2 `398 lines` grey, fill 0.58; green ripple | a different record for a different revision | `chime` E5 at 24.9 |
| 25.6–26.4 | bindB solid → OK; cardB sublabel → `b7e2d` green; green ripple on revB.bottom | bound | `store` C5 at 25.8 |
| 26.4–28.6 | Hold on both cards side by side | — | — |
| 28.6–29.4 | Chip `exit 0 · b7e2d` (green) travels cardB.top → agent.bottom, curving via [750,780] | observation returns, carrying its revision | `send` E6 at 28.6, `deliver` high at 29.4 |
| 29.4–30.0 | badge `exit 0 · 398 lines · b7e2d` pops in at (540,760) green; agent pulses white | the agent now holds a record, not a sentence | `ack` G5 at 29.5 |
| 30.0–33.5 | Hold the whole stage | — | — |
| 33.5–34.8 | `s.fade` to black | — | — |

`meta.duration` 35 at speed 1 (≈39 s playback).

## Sound map

| Event | Preset | Note |
|---|---|---|
| Commit appears | `arrive` | C5, panned to commit |
| Agent speaks (claim or command) | `send` | G6, quiet |
| Claim lands on empty card | `thump` | the only dull sound in the first half |
| Command lands | `arrive` | E5 |
| Running | `work` | E5 every 0.25 s |
| Exit 1 / exit 0 | `miss` / `chime` | loudest events |
| Bound to revision | `store` | C5 |
| Head moves on | `clock` | one tick |
| Observation returns | `deliver` + `ack` | high, G5 |

The claim and the command leave the agent with the same quiet `send`; only their landing differs (thump versus arrive). That is the audible version of the lesson.

## Implementation needs

1. `store` needs a dashed outline state; add an animated `dashed` prop (0–1) in a local copy of `flow-engine.js`, drawn with the same dash pattern wires use, and report it.
2. revB slides in by tweening `x`; confirm box `x` is tweenable or wrap it as an animated prop read through `p('x')`. bindB and cardB are declared at their final positions and only fade in, so nothing else needs to move.
3. The `"tests passed"` chip is quoted to mark it as speech; keep the chip font at ≥ 30 px and confirm the quotes survive the chip renderer.
4. The curved return route uses `s.packet` with a three-anchor route; check it clears `revB` and the timeline wire.
5. Dry-run in Node to confirm 16 work ticks per run and the cue order.

## Acceptance checks

- Stills at 4.5, 13.5, 19.0, 27.0, 32.0 s (playback) in one row: card A dashed and empty, card A full and bound, two cards with the right one empty, two cards both bound, badge on the agent. No earlier glow or chip survives into the next still.
- At 350 px width, `a1f3c`, `b7e2d`, `exit 1`, `exit 0`, `412 lines`, `398 lines`, and the badge are legible and clear of the timeline, bind wires, and bars.
- In the final still, card A still shows `exit 1` in red under `a1f3c`, and card B shows `exit 0` under `b7e2d`; the badge carries `b7e2d`. Nothing suggests card A was overwritten.
- The claim chip never changes any row, bar, or wire; verify the 4.5 s still is identical in card A to the 2.0 s still.
- Spectrogram shows the thump at ≈4.3 s, miss at ≈13 s, chime at ≈27.7 s, deliver at ≈32.7 s playback; ffprobe reports ≈39 s with audio.

## Rationale

Evidence identity is a relationship between a run and a revision, so the stage is built on that relationship: commits on a line, records under them, a wire between. Motion is reserved for the three things that change the relationship: a command landing, a new commit arriving while the old record stays put, and the record returning to the agent. The empty card receiving a claim and not changing is the quiet centre of the lesson; everything after it shows what does change a card, and the side-by-side ending shows why a new patch needs its own.

