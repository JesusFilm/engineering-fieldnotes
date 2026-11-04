# Lesson 01 — Propose, review, execute — plan B

Independent plan for the motion-v2 cut of human-in-the-loop lesson 01. Authored from the lesson entry in `video/human-in-the-loop/sequence/lessons.json` (item 1) and the concept content in `content/concepts/human-in-the-loop.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **proposing, reviewing, and executing are three roles with three different credentials; the agent prepares a packet with a build credential and no deploy path, the reviewer holds the decision, and the executor holds the deploy credential but has two slots (packet and decision) and acts only when both are filled, so a packet alone leaves the executor waiting.**

The viewer should feel the separation as a row of three cards whose first rows name what each holds, the packet hopping right across them, and the executor's empty `decision` slot holding everything still until the reviewer's decision arrives. A status strip beneath follows the packet from `prepared` to `executed`.

Grounding (from the concept): "separate proposing, reviewing and executing. A model can prepare a useful change without holding production credentials. A reviewer needs a concrete action and supporting evidence; the executor needs a trustworthy decision about that same action"; the walkthrough's packet contents (artifact digest, target, test evidence); "put review where mistakes become costly, such as deployment"; the lesson's takeaway: "the proposing agent does not need unrestricted production credentials."

Out of scope: a changed proposal reusing an approval (a later lesson), pausing and durable retention, restart and replay, rejection and cancellation outcomes, and binding checks at the executor beyond the two slots. The cut ends with one packet executed after one decision.

Grammar for this cut: **three role cards in a row with a credential row each, a packet card below, a two-slot executor, a four-cell status strip, and production at the bottom.** The packet is a chip that hops right; the decision is a second chip into the executor's second slot; the strip lights one cell per state. This is the first cut of this topic; it is distinct from the guardrails cut that showed a reviewer and executor binding artifact and target values (here the point is roles and credentials, with the executor's two slots rather than a value comparison), from the orchestration, agent-evals, memory-architecture, context-engineering, tool-design, and loop-engineering cuts, and from the harness-engineering views. Every element is a software object: a role, a credential, a packet, a decision, a state, a production target.

Target length ≈ 36 s at playback. Authored at speed 1 for 32.5 s with `meta.speed: 0.9`. Lengthen the hold while the executor waits and the hold on the three credential rows at the end first if stills read fast. Do not add beats to reach the guideline.

## Engine extension

The status strip uses the `grid` node type (cells with per-cell colour, fill, and text) in a local copy of `scripts/flow-engine.js`, as in earlier cuts of this series. Report the extension with the cut. If packet chip text renders below 40 px, add a `labelSize` option in the same local copy.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows and sublabels are 36 px monospace (≈ 21.6 px per character); strip cell text is 32 px (≈ 19.2 px per character) because `authorized` (10 characters) must fit a 200 px cell. Everything stays readable at 350 px wide (≈ 11–13 px for the smallest).

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Human-in-the-loop** / PROPOSE, REVIEW, EXECUTE | engine title + subtitle |
| agent | store, `rows: 2`, w 320 | (190, 680) | 320 × ≈ 140 (x 30–350, y ≈ 610–750) | label `agent` 40 px at (190, 560); rows 36 px mono | row0 `cred   build` · row1 `packet A` → `packet A ✓` |
| reviewer | store, `rows: 2`, w 320 | (540, 680) | 320 × ≈ 140 (x 380–700) | label `reviewer` 40 px at (540, 560); rows 36 px mono | row0 `cred   decide` · row1 `A      —` → `A  inspecting` → `A  approved` ok |
| executor | store, `rows: 3`, w 320 | (890, 700) | 320 × ≈ 200 (x 730–1050, y ≈ 600–800) | label `executor` 40 px at (890, 560); rows 36 px mono | row0 `cred   deploy` · row1 `packet   —` → `packet   A` · row2 `decision —` → `decision ✓` ok |
| badge | badge | (1050, 600) | — | `waiting` mid | top-right of the executor; appears in beat 3; verify right edge < 1070 (or place at (890, 830) below the card) |
| packet | store, `rows: 3`, w 600 | (540, 1010) | 600 × ≈ 200 (x 240–840, y ≈ 910–1110) | label `packet A` 40 px at (540, 870); rows 36 px mono | row0 `release  A · 9f3a…` · row1 `target   prod` · row2 `tests    12 pass` ok |
| strip | grid, `cols 4 rows 1 cell 200×80 gap 20` | (540, 1320) | 860 × 80 (x 110–970, y 1280–1360); cell centres (210, 1320), (430, 1320), (650, 1320), (870, 1320) | cell texts 32 px mono | `prepared` · `in review` · `authorized` · `executed`; dim until lit |
| striplab | label | (540, 1235) | 36 px | `packet state` | |
| prod | db | (540, 1560) | w ≈ 140 | label `production` 36 px at (540, 1650) | lights once |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| hop1 | agent.right (350, 680) | reviewer.left (380, 680) | — | the packet goes to the reviewer (30 px: the chip fades across) |
| hop2 | reviewer.right (700, 680) | executor.left (730, 680) | — | the packet, and later the decision, go to the executor (30 px) |
| nopath | agent.bottom (190, 750) | prod.left (≈ 470, 1560) | [190, 1560] | the agent's non-existent deploy route: `dashed` 1, dim, marked × once; never carries a chip |
| deploy | executor.bottom (890, 800) | prod.right (≈ 610, 1560) | [890, 1560] | the executor's deploy route; `dashed` 1 until both slots are filled |
| state | packet.bottom (540, 1110) | strip top (540, 1280) | — | the packet's state is tracked (no chips; the strip lights in place) |

The 30 px hops are deliberate: the three cards sit shoulder to shoulder so the row reads as one process with three owners, and the chips are seen entering one card from the previous one. If the stills show the hops as unreadable, widen the gaps to 50 px by narrowing each card to 300 px. Stage spans y ≈ 560–1650.

## Sound map

Pitches: agent **C5**, reviewer **E5**, executor **G5**, packet **A5**, production **C6**. Pan by x: agent left (`−0.6`), reviewer centre, executor right (`+0.6`), production centre.

| event | preset | notes |
|---|---|---|
| role rows appear | `store` | at each role's pitch, quiet; credential rows add a quiet `ack` |
| packet rows appear | `store` | A5 ×3; the tests row with `ack` C6 (quiet) |
| strip cell lights | `clock` | one tick per state |
| the agent has no deploy path | `miss` | gain ×0.5, pan left; grey × on the dashed route |
| packet hops | `send` (source pitch, octave up), `arrive` (destination pitch) | |
| reviewer inspects | `work` | ×4 at 0.25 s; packet rows pulse in turn |
| executor slot fills | `store` | G5 |
| executor waits | `ack` | low (C4), quiet; the empty slot pulses |
| decision made | `hit` | at the reviewer |
| decision arrives | `store` | G5, gain ×1.2 |
| deploy route opens | `ack` | G5 |
| production lights | `arrive` C6, `chime` | the brightest event |
| three credentials, three roles | `ack` | C5, E5, G5 in turn |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The agent prepares a proposal; it has deployed nothing (0.0–8.0)** | | | |
| 0.0 | — | all rows hidden; strip dim; routes dashed; badge hidden; production idle | — |
| 0.6 / 0.9 | agent rows pop | `cred   build` · `packet A` | store C5 ×2, ack C5 (quiet) |
| 1.5 / 1.8 / 2.1 | packet rows pop | `release  A · 9f3a…` · `target   prod` · `tests    12 pass` ok | store A5 ×3, ack C6 (quiet) |
| 2.6 | agent row1 swaps | `packet A ✓` | — |
| 3.0 | strip cell0 lights | `prepared` fg | clock |
| 3.8 | `nopath` alpha → 0.6 for 1.0 s; grey ripple with × at (190, 1150) | the agent has no route to production | miss (quiet) |
| 4.6 / 4.8 | reviewer and executor rows 0 pop | `cred   decide` · `cred   deploy`; other rows `—` | store E5, store G5 |
| 4.8–8.0 | hold | three cards, three credentials, a packet, one lit state | |
| **Beat 2 — A reviewer inspects the proposed action; a decision is still required (8.0–15.0)** | | | |
| 8.0–8.5 | chip `packet A` (fg) agent.right → reviewer.left, 0.5 s | — | send C6 |
| 8.5 | ripple at reviewer.left | reviewer row1 → `A  inspecting` accent; stroke → active | arrive E5 |
| 8.8–9.8 | packet rows pulse in turn | the reviewer reads release, target, evidence | work × 4 |
| 10.2 | strip cell1 lights | `in review` accent | clock |
| 10.2–15.0 | hold | the packet is with a person; nothing has been decided | |
| **Beat 3 — The executor waits for authorization (15.0–22.5)** | | | |
| 15.0–15.5 | chip `packet A` (fg) reviewer.right → executor.left, 0.5 s | — | send E6 |
| 15.5 | ripple at executor.left | executor row1 → `packet   A` fg | arrive G5, store G5 |
| 16.1 | executor row2 pulses dim | `decision —`: the second slot is empty | ack (low, quiet) |
| 16.6 | badge pops | `waiting` mid | — |
| 16.6–22.5 | hold (long) | a packet in one slot, nothing in the other, a dashed deploy route | |
| **Beat 4 — The decision arrives; the executor acts; the roles stay separate (22.5–32.5)** | | | |
| 22.5 | reviewer row1 swaps and pulses | `A  approved` ok; reviewer stroke → ok | hit |
| 23.1–23.6 | chip `approve A` (ok) reviewer.right → executor.left, 0.5 s | — | send E6 |
| 23.6 | ripple at executor.left | executor row2 → `decision ✓` ok; badge scale → 0; executor stroke → ok | store G5 (louder) |
| 24.2 | strip cell2 lights | `authorized` ok | clock |
| 24.6 | — | `deploy` `dashed` → 0, colour → ok | ack G5 |
| 24.6–25.6 | chip `deploy A` (ok) executor.bottom → via → prod.right, 1.0 s | — | — |
| 25.6 | ok ripple at production | prod → ok with glow | arrive C6, chime |
| 26.0 | strip cell3 lights | `executed` ok | clock |
| 26.8 / 27.1 / 27.4 | the three `cred` rows pulse in turn | `build` · `decide` · `deploy`: three roles, three credentials | ack C5, E5, G5 |
| 27.4–31.0 | hold | final state: three cards with their credentials, a full status strip, lit production, a dashed agent route still dashed | |
| 31.0–31.8 | — | `s.fade` to black, 0.8 s | — |
| 32.5 | end | finite ending | |

## Accuracy limits

- The release, digest, target, and test count are illustrative, drawn from the concept's checkout example. The packet shown has three rows; the walkthrough's packet also has a change summary, rollout steps, and a recovery plan, which the write-up carries.
- `cred   build`, `cred   decide`, `cred   deploy` are teaching labels for the three roles' different authority. The reviewer's "credential" is the authority to decide, not a system credential; the write-up explains this.
- The executor's two slots stand for needing a trustworthy decision about the same packet. The cut does not show the executor verifying that the decision refers to this packet's identity, which is a later lesson; here the slots simply both fill.
- The dashed agent route with a grey × depicts the absence of a deploy path for the agent; the cut does not show how that absence is enforced (guardrails lessons cover it).
- The strip's states are the cut's own names for the packet's progress; real workflows use their own states, and pausing and retention between `in review` and `authorized` is a later lesson.
- The reviewer approves; rejection and requested changes are real outcomes the concept requires and are not shown here.
- No `poof` is used. The one quiet `miss` marks the agent's missing deploy route.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `7.5, 14.0, 21.5, 27.5, 32.0, 35.0` (speed-1 ≈ 6.8, 12.6, 19.4, 24.8, 28.8, 31.5). Tile with ffmpeg and view the row; view the 21.5 s (executor waiting) and 32.0 s (final) stills at full size and at 350 px wide. Pass when all three role cards' rows, the packet rows, the four strip texts, the badge, and the production label are readable at 350 px, the executor's empty `decision —` slot at 21.5 s is clearly dim beside the filled `packet A` slot, and the two dashed routes are distinguishable from the solid deploy route at 32.0 s.
2. **Credentials differ**: in every still the three `cred` rows read `build`, `decide`, `deploy`; no card ever gains another card's credential.
3. **Packet alone waits**: between 15.5 and 23.6 s (speed 1) the executor has `packet A` and `decision —`, the badge reads `waiting`, and `deploy` is dashed; no chip travels on `deploy`.
4. **Decision then action**: `decision ✓` fills before the route opens (23.6 → 24.6) and production lights after (25.6); the strip lights `authorized` before `executed`.
5. **No agent route**: `nopath` is dashed in every still and never carries a chip; the × appears once in beat 1.
6. **No lingering state**: no chip remains during any hold; the badge is gone from 23.6 s; the strip's cells light once each in order.
7. **Overlap**: the 30 px hop chips must fade at both ends and not cover the cards' row text (or widen the gaps as noted); the `deploy` chip's path at x = 890 then y = 1560 must clear the strip (x 110–970, y 1280–1360: the vertical run at x 890 passes through the strip's row — route via [1040, 800], [1040, 1560] instead and verify it stays inside the frame); the `nopath` route at x = 190 also crosses the strip at (190, 1320): route via [60, 750], [60, 1560] instead. The badge at (1050, 600) is near the frame edge; use the alternative position below the card if clipped. Rows at 36 px mono (13 characters ≈ 281 px) fit inside 320 px with minimal padding; strip text at 32 px (10 characters ≈ 192 px) fits inside 200 px cells with no padding — use 30 px or cells of 210 px with gap 10 if clipped.
8. **Word budget**: on-screen text is three role labels and seven rows, the packet label and three rows, the strip label and four cell texts, the badge, and the production label. No sentence appears.
9. **Audio**: the Node dry-run lists ≈ 36 cues (2 stores with ack, 3 stores with ack, clock, miss, 2 stores, send/arrive, 4 works, clock, send/arrive/store, ack, hit, send/store, clock, ack, arrive/chime, clock, 3 acks). The spectrogram shows the four `clock` ticks spaced across the cut, the quiet `miss` at 3.8 s, the `hit` at 22.5 s, the `chime` at 25.6 s as the brightest, and a rising C–E–G at 26.8–27.4 s. `ffprobe` reports ≈ 36 s with an audio stream. Record whether audio was heard or only analysed.
10. **Causal reading test**: with sound off and every word removed, a viewer should still see: three cards in a row fill their first rows; a card below fills three rows; the first cell of a strip lights; a dashed line from the left card toward a bottom cylinder gets a grey ×; a chip hops from the left card to the middle card, which glows while the lower card's rows pulse, and the strip's second cell lights; a chip hops to the right card, filling one of its two empty rows while the other pulses and a grey tag appears; the middle card's row turns green and a green chip hops right, filling the second row; the tag vanishes, the strip's third cell lights, a dashed line from the right card turns solid, a chip runs down to the cylinder, which lights green, and the fourth cell lights; the three cards' first rows pulse in turn.
11. **Project checks** after encoding: `python3 scripts/check_media.py --concept human-in-the-loop`, then the full set before any release proposal. A new encode needs its own comparison review.

