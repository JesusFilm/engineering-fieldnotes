# Lesson 03 — Preserve a constraint — plan B

Independent plan for the motion-v2 cut of context-engineering lesson 03. Authored from the lesson entry in `video/context-engineering/sequence/lessons.json` (item 3) and the concept content in `content/concepts/context-engineering.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a constraint stated in the input as "what must remain" together with a reference to its authoritative contract is visible when the agent chooses its edit, so the edit changes the slow part and leaves the field clients depend on untouched; a check then verifies that the field is still there.**

The viewer should feel what the constraint protects (two clients reading `total_cents` from the response), what is at risk (a hypothetical rename breaks both clients), the constraint and its reference sitting in the input beside the goal, the edit landing on the query and not on the field, and the fixture confirming it.

Grounding (from the concept): existing clients require the v1 response field `total_cents`; a resumed agent without the constraint "might rename the field to `amount` while fixing the timeout"; the judgement says keep non-negotiable constraints explicit and keep bulky evidence retrievable through precise paths and revision identifiers; the walkthrough's slice is "fix the invoice timeout while preserving v1 `total_cents`" with a command that tests compatibility; the takeaway adds that the model still needs verification.

Out of scope: how the record was retrieved (lesson 02), handoffs and compaction (later lessons), performance measurement of the latency fix (the concept says preserving a field does not establish a performance improvement), and the agent's reasoning. The cut ends when the compatibility read passes.

Grammar for this cut: **two clients above a response shape, an input card with a goal, a keep line, and a reference, an agent, and a two-row diff.** The response is a store showing the v1 shape; clients read it along wires and light when they get the field. The hypothetical rename is an overlay chip over the field row, which breaks the clients and then vanishes. The keep line and the `v1` label are linked by a reference wire. The diff has a red line and a green line that touch the query only; when it is applied, the field row pulses untouched while the keep line pulses with it. The fixture is the clients reading again. This differs from lesson 01 (two parallel lists and a receiver) and lesson 02 (scored results with two bars), from the loop-engineering cuts, and from the harness-engineering views. Every element is a software object: a client, a response field, an input card, a diff.

Target length ≈ 31 s at playback. Authored at speed 1 for 27.5 s with `meta.speed: 0.9`. This sits under the 35–50 s guideline because the lesson has four beats and one hypothetical; lengthen the hold after the broken clients and the hold after the edit lands first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows and sublabels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Context engineering** / PRESERVE A CONSTRAINT | engine title + subtitle |
| mobile | phone | (210, 580) | engine default | label `mobile` 36 px above at (210, 500) | a client |
| web | laptop | (870, 580) | engine default | label `web` 36 px above at (870, 500) | a client |
| badge | badge | (540, 580) | — | `fixture passed` | between the clients; hidden (scale 0) until beat 4 |
| response | store, `rows: 3`, w 560 | (540, 880) | 560 × ≈ 240 (x 260–820, y ≈ 760–1000) | label `response · v1` 40 px mono at (540, 720); rows 36 px mono | row0 `"invoice": 42` · row1 `"total_cents": 1250` · row2 `"currency": "NZD"` (max 19 characters ≈ 410 px); row1 is the field |
| ghost | badge | (540, 920) | — | `"amount": 1250` bad | the hypothetical rename overlaid on row1; hidden except in beat 1 |
| input | store, `rows: 3`, w 460 | (270, 1230) | 460 × ≈ 240 (x 40–500, y ≈ 1130–1330) | label `input` 40 px at (270, 1090); rows 36 px mono | row0 `goal  fix latency` fg · row1 `keep  total_cents` accent · row2 `ref   invoice-v1.md` mid (max 19 characters ≈ 410 px) |
| agent | box | (810, 1230) | 440 × 150 (x 590–1030, y 1155–1305) | label `agent` 44 px; sublabel 36 px `waiting` → `proposes edit` → `edit · verified` | |
| diff | store, `rows: 2`, w 700 | (540, 1520) | 700 × ≈ 180 (x 190–890, y ≈ 1430–1610) | label `handler diff` 40 px at (540, 1390); rows 36 px mono | row0 `- one query per line` bad · row1 `+ one batched query` ok (max 20 characters ≈ 432 px) |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| readA | mobile.bottom (210, 640) | response.top (540, 760) | [210, 700], [540, 700] | the mobile client reads the response |
| readB | web.bottom (870, 640) | response.top (540, 760) | [870, 700], [540, 700] | the web client reads the response |
| ref | input.top (270, 1130) | response.left (260, 880) | [270, 1000], [260, 1000] | the keep line's reference points at the v1 contract; drawn `dashed` 0.5 and alpha 0.6 at rest |
| feed | input.right (500, 1230) | agent.left (590, 1230) | — | the input reaches the agent (90 px gap) |
| edit | agent.bottom (810, 1305) | diff.top (540, 1430) | [810, 1370], [540, 1370] | the agent's edit becomes a diff |
| apply | diff.right (890, 1520) | response.right (820, 880) | [980, 1520], [980, 880] | the diff is applied to the handler that produces the response |

The badge `fixture passed` sits between the two clients at their height; the read wires pass below it at y = 700. The `ref` wire runs down the left margin from the input card to the response panel, so the viewer can see the keep line and the `v1` label joined. The `apply` wire uses the right margin at x = 980, clear of the agent (right edge 1030 is above y = 1305; the wire starts at y = 1520 and rises past the agent at x = 980, which is inside the agent's x-range only between y 1155–1305, so route via [1050, 1520], [1050, 880] instead if the still shows overlap). Stage spans y ≈ 500–1610.

## Sound map

Pitches: mobile **C6**, web **E6**, response **G5**, input **A5**, agent **C5**, diff **E5**. Pan by x: mobile and input left (`−0.5`), web and agent right (`+0.5`), response and diff centre.

| event | preset | notes |
|---|---|---|
| response rows appear | `store` | ×3, quiet |
| field row noted | `ack` | G5 |
| clients read | `send` | C6 / E6, quiet |
| clients receive the field | `ack` | C6 / E6; green ripples |
| hypothetical rename appears | `miss` | low falling buzz at the response |
| clients break | `thump` | gain ×0.7, ×2, panned to each client; with `s.shake` |
| rename vanishes | `poof` | quiet |
| input rows appear | `store` | ×3, pan left; the keep line adds `ack` A5 |
| reference lights | `ack` | G5, with the `v1` label pulse |
| input reaches agent | `send` A6, `arrive` C5 | |
| edit leaves agent | `send` | C6 |
| diff rows appear | `store` | ×2; the red line with lower gain, the green line full |
| diff applied | `send` E6, `arrive` G5 | |
| field stays | `ack` G5 then `ack` A5 | the field row and the keep line pulse together |
| fixture read | `send` ×2, `hit` ×2 | clients receive the field again |
| fixture passed | `chime` then `deliver` (high) | the brightest event |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Clients expect the field; what is at risk (0.0–8.5)** | | | |
| 0.0 | — | response rows hidden; input, diff rows hidden; clients mid; agent `waiting`; badge and ghost hidden | — |
| 0.6–1.0 | response rows pop (0.2 s each) | three rows fg | store × 3 (quiet) |
| 1.4 | row1 pulses | row1 → accent then fg over 0.6 s | ack G5 |
| 1.8 / 2.1 | dots (fg) mobile.bottom → via → response.top and web.bottom → via → response.top, 0.6 s each | — | send C6, send E6 |
| 2.4 / 2.7 | ripples at response.top | — | — |
| 3.0 / 3.3 | chips `1250` (ok) response.top → via → mobile.bottom and → web.bottom, 0.6 s each | — | — |
| 3.6 / 3.9 | ok ripples at each client | mobile and web colour → ok, glow | ack C6, ack E6 |
| 3.9–4.8 | hold | both clients lit by the field | |
| 4.8 | `ghost` badge pops over row1 | `"amount": 1250` in bad covers the field row; row1 alpha → 0.3 | miss |
| 5.4 / 5.7 | dots mobile and web → response, 0.6 s | — | send × 2 (quiet) |
| 6.0 / 6.3 | bad ripples with × at each client; clients shake ±8 px | mobile and web colour → bad, glow off | thump × 2 |
| 6.3–7.5 | hold | the hypothetical: renamed field, broken clients | |
| 7.5 | `ghost` scale → 0 | row1 alpha → 1, colour fg; clients colour → mid | poof (quiet) |
| 7.5–8.5 | hold | | |
| **Beat 2 — Include the requirement with its reference (8.5–13.5)** | | | |
| 8.5 | input row0 pops | `goal  fix latency` fg | store |
| 9.3 | input row1 pops and pulses | `keep  total_cents` accent | store, ack A5 |
| 10.1 | input row2 pops | `ref   invoice-v1.md` mid | store |
| 10.4–11.0 | `ref` wire `flow` → 1, alpha → 1 for 0.6 s | `response · v1` label pulses accent; row1 of the response pulses accent | ack G5 |
| 11.0–12.0 | hold | the keep line, its reference, and the contract label are joined | |
| 12.0–12.5 | chip `input` (accent) input.right → agent.left, 0.5 s | — | send A6 |
| 12.5 | ripple at agent.left | agent stroke → active; sublabel → `proposes edit` | arrive C5 |
| 12.5–13.5 | hold | | |
| **Beat 3 — A compatible edit: the field name stays (13.5–18.5)** | | | |
| 13.5 | agent pulses | — | send C6 |
| 13.5–14.3 | chip `edit` (accent) agent.bottom → via → diff.top, 0.8 s | — | — |
| 14.3 | diff row0 pops | `- one query per line` bad | store (quiet) |
| 14.9 | diff row1 pops | `+ one batched query` ok | store |
| 15.5–16.5 | dot (ok) diff.right → via → response.right, 1.0 s | — | send E6 |
| 16.5 | ripple at response.right | response stroke glows | arrive G5 |
| 16.8 | response row1 pulses ok; input row1 pulses accent in sympathy | row1 text unchanged `"total_cents": 1250` | ack G5, ack A5 |
| 16.8–18.5 | hold | the diff touched the query; the field is as it was | |
| **Beat 4 — A check still verifies the result (18.5–27.5)** | | | |
| 18.5 / 18.8 | dots (fg) mobile and web → response, 0.6 s | — | send × 2 |
| 19.1 / 19.4 | ripples at response.top | — | — |
| 19.7 / 20.0 | chips `1250` (ok) response → mobile and → web, 0.6 s | — | — |
| 20.3 / 20.6 | ok ripples with check at each client | mobile and web colour → ok, glow | hit × 2 |
| 21.0 | badge pops with overshoot | `fixture passed` ok between the clients | chime |
| 21.4 | agent pulses ok | agent sublabel → `edit · verified` ok; diff row1 glow | deliver (high) |
| 21.4–26.0 | hold | final state: lit clients with the badge, intact field row, input with keep and ref, verified agent, applied diff | |
| 26.0–26.8 | — | `s.fade` to black, 0.8 s | — |
| 27.5 | end | finite ending | |

## Accuracy limits

- The response shape, values, file name, and diff lines are illustrative, drawn from the concept's invoice example. `1250` cents and the `NZD` currency row are placeholders; the diff's "one query per line → one batched query" stands for a latency fix without claiming it is the right one or that it is faster.
- The hypothetical rename to `"amount"` is the concept's own illustrative failure ("a resumed agent might rename the field to `amount`"), shown here as an overlay so it reads as a possibility. The concept states it is "not a measured model result"; the cut makes no claim about how often this happens.
- The `keep` line and `ref` line represent "state what must remain unchanged and reference the authoritative contract". Real inputs may phrase the constraint differently and may include a revision identifier; the cut keeps the reference to a file name for legibility and notes the revision in the write-up.
- The fixture is drawn as the two clients reading the response again. A real compatibility fixture is a test that asserts the field's presence and type; the write-up names the command. The green result establishes only what that read covers.
- The cut does not show that the constraint caused the agent's choice; it shows the constraint visible at the moment of choice and the edit landing elsewhere, which is the lesson's claim. Performance is not measured, consistent with the concept's note that preserving a field does not establish an improvement.
- The quiet `poof` reuses an eviction preset to remove the hypothetical overlay; it is kept quiet so it does not read as a failure. Note the reuse in the hand-over.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `4.5, 7.5, 12.5, 19.5, 25.0, 29.5` (speed-1 ≈ 4.0, 6.8, 11.3, 17.5, 22.5, 26.5). Tile with ffmpeg and view the row; view the 7.5 s (broken clients) and 19.5 s (field intact) stills at full size and at 350 px wide. Pass when the three response rows, the three input rows, and the two diff rows are readable at 350 px, the ghost `"amount": 1250` is readable and clearly over the field row at 7.5 s, both client labels and the badge are readable, and the red and green diff rows are distinguishable.
2. **The hypothetical is bounded**: the ghost exists only between 4.8 and 7.5 s (speed 1); the response row text is `"total_cents": 1250` in every still except where the ghost covers it; clients are bad only while the ghost is present.
3. **The link is visible**: at 12.5 s the `ref` wire reads as joining the input card to the response panel, and the `response · v1` label and the keep line are both at accent or recently pulsed.
4. **Edit lands elsewhere**: between 15.5 and 18.5 s (speed 1) the response row texts do not change; row1 pulses ok at 16.8 s together with the input's keep line.
5. **No lingering state**: no chip remains during any hold; the badge appears only after both clients show green checks; the agent's sublabel reads `edit · verified` only after the badge.
6. **Overlap**: the `apply` dot's path must not cross the agent box (re-route to x = 1050 if it does); the read wires must not cross the client labels at y = 500; the `input` chip must fit the 90 px gap. Rows at 36 px mono (20 characters ≈ 432 px) fit inside their panels with padding.
7. **Word budget**: on-screen text is two client labels, the response label and three rows, the ghost, the input label and three rows, the agent's sublabel, the diff label and two rows, and one badge. No sentence appears.
8. **Audio**: the Node dry-run lists ≈ 40 cues (3 stores, ack, 2 sends, 2 acks, miss, 2 quiet sends, 2 thumps, poof, 3 stores with ack, ack, send/arrive, send, 2 stores, send/arrive, 2 acks, 2 sends, 2 hits, chime, deliver). The spectrogram shows the `miss` and two `thump` hits as the only negative events, a quiet middle, and the `chime` at 21.0 s as the brightest. `ffprobe` reports ≈ 31 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: two devices read from a panel and light green; a red tag covers one row and the devices turn red and shake; the tag vanishes and the devices go neutral; a card fills three lines on the left, one of them highlighted, and a line links it to the panel; the card feeds the right box, which sends down to a two-row diff; the diff sends up the margin to the panel and the highlighted row in the panel pulses together with the highlighted line in the card; the devices read again, light green with checks, and a badge appears between them.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept context-engineering`, then the full set before any release proposal. A new encode needs its own comparison review.

