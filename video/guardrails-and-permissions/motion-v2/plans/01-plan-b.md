# Lesson 01 — Intent versus permission — plan B

Independent plan for the motion-v2 cut of guardrails-and-permissions lesson 01. Authored from the lesson entry in `video/guardrails-and-permissions/sequence/lessons.json` (item 1) and the concept content in `content/concepts/guardrails-and-permissions.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **an instruction tells the agent what to do, but whether an operation happens is decided by the service's authorization check of the requesting identity against the operation and resource; an identity without deploy permission is denied at the service, so the deploy service is never invoked and the release is unchanged, regardless of what the instruction said or whether the agent followed it.**

The viewer should feel the two layers: a line of text at the top (`never deploy`) that does nothing by itself, and a permission grid in the middle that does everything. The same identity gets a green cell for reading logs and an empty cell for deploying; the deploy request bounces off that empty cell, and the deploy service at the bottom never lights.

Grounding (from the concept): "a persistent instruction such as 'never deploy' expresses intent but cannot enforce that boundary"; "authorization determines whether an authenticated identity may perform an operation on a particular resource"; the example's incident agent "can read approved service logs and propose release r42, but its identity cannot deploy"; OWASP's least privilege, default deny, and checks on every request; the exercise: "demonstrate a successful read and a denied production write using the same agent identity, even when the prompt asks for the write."

Out of scope: the reviewer and the deployment service's own identity executing an approved release (later lessons), prompt injection via log content, scoping of read access to sensitive data, guardrail classifiers, and binding approval to artifact and target. The cut ends with the denied request and the unchanged release.

Grammar for this cut: **an instruction card above an agent, a 2 × 2 permission grid (identities × operations) as the authorization service, and a deploy service below on a wire that never lights.** Requests from the agent land on the grid cell for their identity and operation; the cell's state is the answer. This is the first cut of this topic; it is distinct from the orchestration cuts (chain, routing table, parallel bars, join panel, scorecard), the memory-architecture, context-engineering, tool-design, and loop-engineering cuts, and the harness-engineering views. Every element is a software object: an instruction, an identity, a permission cell, a request, a service, a release value.

Target length ≈ 33 s at playback. Authored at speed 1 for 30 s with `meta.speed: 0.9`. Lengthen the hold after the denial and the hold on the unchanged release first if stills read fast. Do not add beats to reach the guideline.

## Engine extension

The permission grid uses the `grid` node type (cells in rows and columns with per-cell colour and fill) added in a local copy of `scripts/flow-engine.js`, extended here with a per-cell `text` prop (`cell{i}Text`) so each cell can read `allow` or `—` at 36 px. Anchors `'id.cell{i}'` give cell centres. Report the extension with the cut. If packet chip text renders below 40 px, add a `labelSize` option in the same local copy.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, grid cell text, and axis labels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest).

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Guardrails and permissions** / INTENT VERSUS PERMISSION | engine title + subtitle |
| instruction | store, `rows: 1`, w 600 | (540, 530) | 600 × ≈ 90 (x 240–840, y ≈ 485–575) | label `instruction` 36 px at (540, 450); row 36 px mono | row0 `prompt: never deploy` mid |
| agent | box | (540, 700) | 480 × 130 (x 300–780, y 635–765) | label `agent` 44 px; sublabel `identity: agent-inv` 36 px mono (19 characters ≈ 410 px) | |
| authlab | label | (620, 820) | 40 px | `authorization · service` | over the grid |
| colR / colD | label | (505, 870) / (735, 870) | 36 px mono, mid | `read logs` / `deploy prod` | column headers |
| rowA / rowS | label | (270, 955) / (270, 1045) | 36 px mono, mid | `agent-inv` / `deploy-svc` | row headers (right-aligned to x ≈ 380 if the engine supports alignment; otherwise centred at 270) |
| grid | grid, `cols 2 rows 2 cell 220×90 gap 20` | (620, 1000) | 460 × 200 (x 390–850, y 900–1100); cell centres (505, 955), (735, 955), (505, 1045), (735, 1045) | cell texts 36 px mono | cell0 `allow` ok at fill 0.25 · cell1 `—` dim · cell2 `—` dim · cell3 `allow` ok at fill 0.25 |
| deploy | box | (540, 1340) | 480 × 130 (x 300–780, y 1275–1405) | label `deploy service` 40 px; sublabel `release r41` 36 px mono | alpha 0.5 throughout: never invoked |
| badge | badge | (780, 1275) | — | `unchanged` ok | top-right of the deploy service; hidden until beat 4 |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| reqR | agent.bottom (540, 765) | grid.cell0 top (505, 900) | [540, 835], [505, 835] | a read request lands on the read cell of the agent's row |
| reqD | agent.bottom (540, 765) | grid.cell1 top (735, 900) | [540, 835], [735, 835] | a deploy request lands on the deploy cell of the agent's row |
| exec | grid.cell1 bottom (735, 1100) | deploy.top (540, 1275) | [735, 1190], [540, 1190] | the only route to the deploy service; `dashed` 1 and dim throughout, never solid |

The instruction card is connected to nothing: it is text the agent has, not a wire anything travels on. The `exec` wire exists so the viewer sees that the route is there and stays closed. Stage spans y ≈ 450–1405.

## Sound map

Pitches: instruction **C6** (quiet), agent **C5**, authorization grid **G5**, deploy service **E5** (never sounds an arrival). Pan by x: the read column slightly left (`−0.2`), the deploy column slightly right (`+0.2`), the rest centre.

| event | preset | notes |
|---|---|---|
| instruction appears | `ack` | C6, quiet |
| agent appears, identity noted | `ack` C5, then `ack` C5 (quiet) on the sublabel | |
| grid appears | `store` | G5, quiet, one per cell at 0.15 s |
| a request leaves | `send` | C6 |
| identity row checked | `ack` | G5, quiet; the row header pulses |
| allowed cell | `hit` | the cell fills green |
| logs return | `store` | C5 |
| instruction pulses (it is only text) | `ack` | C6, quiet |
| denied cell | `thump` | gain ×1.3; red × on the empty cell; the loudest event |
| denial returns to the agent | `send` G6, `arrive` C5 (gain ×0.7) | |
| the route stays closed | `miss` | gain ×0.5; grey × on the dashed wire |
| release unchanged | `ack` | E5, with the sublabel pulse and the badge |
| boundary held | `chime` | the grid's stroke turns ok |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The instruction expresses the policy; the identity can read (0.0–9.0)** | | | |
| 0.0 | — | grid hidden; deploy at alpha 0.5; badge hidden | — |
| 0.6 | instruction row pops | `prompt: never deploy` mid | ack C6 (quiet) |
| 1.2 | agent pops | — | ack C5 |
| 1.6 | agent sublabel pulses | `identity: agent-inv` | ack C5 (quiet) |
| 2.4–3.0 | grid cells pop in reading order; headers fade in | two `allow` cells at low green fill, two `—` cells dim | store × 4 (quiet) |
| 3.8–4.6 | chip `read logs` (fg) agent.bottom → via → cell0 top, 0.8 s | — | send C6 |
| 4.6 | `agent-inv` row header pulses | the identity is looked up | ack G5 (quiet) |
| 5.0 | cell0 fills ok (fill 0.25 → 1); ok ripple with check at cell0 | — | hit |
| 5.6–6.4 | chip `logs` (ok) cell0 top → via → agent.bottom, 0.8 s | — | — |
| 6.4 | ripple at agent.bottom | agent stroke → ok briefly | store C5 |
| 6.4–9.0 | hold | the same identity, one green cell | |
| **Beat 2 — Suppose it still requests deployment (9.0–13.5)** | | | |
| 9.0 | instruction row pulses | — | ack C6 (quiet) |
| 9.6–10.4 | chip `deploy r42` (accent) agent.bottom → via → cell1 top, 0.8 s | — | send C6 |
| 10.4 | `agent-inv` row header pulses; `deploy prod` column header pulses | identity and operation are looked up together | ack G5 (quiet) |
| 10.4–13.5 | hold (long) | the chip sits over the empty cell; nothing has happened yet | |
| **Beat 3 — This identity has no deploy permission (13.5–20.0)** | | | |
| 13.5 | cell1 flashes bad; bad ripple with × at cell1 centre; grid shakes ±6 px | cell1 stroke → bad for 0.6 s, then dim again | thump (loud) |
| 14.3–15.1 | chip `403 · denied` (bad) cell1 top → via → agent.bottom, 0.8 s | — | send G6 |
| 15.1 | bad ripple at agent.bottom | agent stroke → bad for 0.6 s then fg | arrive C5 (quiet) |
| 15.1–20.0 | hold | one green cell, one refused cell, the same identity | |
| **Beat 4 — The deploy service is never invoked (20.0–30.0)** | | | |
| 20.0 | `exec` wire pulses dim (alpha 0.3 → 0.7 → 0.3) | — | — |
| 20.6 | grey ripple with × at (735, 1190) (the wire's corner) | the route is there and closed | miss (quiet) |
| 21.4 | deploy sublabel pulses | `release r41`, unchanged | ack E5 |
| 21.9 | badge pops | `unchanged` ok | — |
| 22.6 | — | instruction row alpha → 0.5 (0.6 s): text, not a boundary; `authorization · service` label pulses; grid stroke → ok | chime |
| 22.6–28.5 | hold | final state: dim instruction, agent with its identity, a grid with one green and one refused cell, a dashed route, a dark deploy service with `release r41` and `unchanged` | |
| 28.5–29.3 | — | `s.fade` to black, 0.8 s | — |
| 30.0 | end | finite ending | |

## Accuracy limits

- The identities, operations, release names, and the `403` code are illustrative, drawn from the concept's incident example. Real authorization is usually a policy evaluation over identity, operation, resource, and context; the 2 × 2 grid is the smallest rendering of "identity may perform operation on resource".
- `deploy-svc`'s `allow` cell is shown so the grid reads as a permission table with another identity that can deploy; that identity acting is a later lesson. The cut never lights that cell.
- The denied request returns to the agent as a response; the cut does not show logging of the decision or what the agent does next.
- The instruction fading to half alpha depicts that it did not enforce the boundary; it does not mean instructions are useless. The concept says they express intent and can be checked by guardrails, which are a separate, fallible layer not shown here.
- "Enforce access outside the model" is shown as the grid belonging to the service (`authorization · service`) with no wire from the instruction to anything. The cut does not show credential scoping, alternate paths such as shell access, or administrator bypass, which the concept lists as separate review items.
- A successful read is included so the viewer sees that the same identity is allowed some operations; it does not imply the read scope is appropriate (logs can contain sensitive data, per the concept).
- No `poof` is used. The `thump` marks the denial; the quiet `miss` marks the closed route.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `8.0, 13.0, 18.0, 24.5, 28.5, 32.0` (speed-1 ≈ 7.2, 11.7, 16.2, 22.1, 25.7, 28.8). Tile with ffmpeg and view the row; view the 18.0 s (denied) and 28.5 s (final) stills at full size and at 350 px wide. Pass when the instruction row, the agent's identity sublabel, the four grid cells with their text, the two column and two row headers, the deploy sublabel, and the badge are readable at 350 px, the green filled cell is clearly different from the low-fill `allow` cell and the dim `—` cells, and the dashed `exec` wire is visible but clearly not lit.
2. **Same identity, two outcomes**: at 8.0 s cell0 is full green and the agent has received `logs`; at 18.0 s cell0 is still green, cell1 has been refused, and the deploy service is at alpha 0.5.
3. **Instruction is not the gate**: the instruction card has no wire; nothing travels to or from it; at 28.5 s it is at alpha 0.5 while the grid's stroke is ok.
4. **Never invoked**: the `exec` wire is dashed in every still; no chip ever travels on it; the deploy sublabel reads `release r41` in every still; the badge reads `unchanged` at 28.5 s.
5. **No lingering state**: no chip remains during any hold; cell1 returns to dim after its red flash; the agent's stroke returns to fg after each response.
6. **Overlap**: request chips must not cross the `authorization · service` label at y = 820 except at the via corner (the label spans ≈ 400–840 at 40 px; route via y = 835 passes just below it, so shift the label to (620, 805) and verify); column headers at y = 870 must clear the chips' landing at the cells' top edge (y 900); row headers at x = 270 must clear the agent box (300–780 at y 635–765; headers are at y 955 and 1045, below it). Cell text at 36 px mono (`allow` ≈ 108 px) fits inside 220 px cells.
7. **Word budget**: on-screen text is the instruction label and row, the agent label and sublabel, the authorization label, two column and two row headers, four cell texts, the deploy label and sublabel, and the badge. No sentence appears beyond the quoted instruction.
8. **Audio**: the Node dry-run lists ≈ 22 cues (3 acks, 4 stores, send, ack, hit, store, ack, send, ack, thump, send/arrive, miss, ack, chime). The spectrogram shows the `hit` at 5.0 s, the `thump` at 13.5 s as the loudest event, a quiet `miss` at 20.6 s, and the `chime` at 22.6 s as the brightest. `ffprobe` reports ≈ 33 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: a grey line of text, a box beneath it, and a four-cell grid below with two faint green cells; a chip drops from the box onto the top-left cell, which fills green, and a green chip returns; the grey text pulses; a chip drops onto the top-right empty cell, waits, then the cell flashes red with an × and the grid shakes; a red chip returns to the box; a dashed line from the grid to a dim bottom box pulses and gets a grey ×; the bottom box's lower line pulses and a green tag appears; the grey text at the top fades further while the grid's outline turns green.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept guardrails-and-permissions`, then the full set before any release proposal. A new encode needs its own comparison review.

