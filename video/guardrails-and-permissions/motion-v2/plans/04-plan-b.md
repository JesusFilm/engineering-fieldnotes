# Lesson 04 — Review a concrete action — plan B

Independent plan for the motion-v2 cut of guardrails-and-permissions lesson 04. Authored from the lesson entry in `video/guardrails-and-permissions/sequence/lessons.json` (item 4) and the concept content in `content/concepts/guardrails-and-permissions.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a read-only agent prepares a release proposal with concrete values (artifact digest, target, evidence); a reviewer approves those exact values; a separate executor with its own identity compares the action it is asked to run against the approved values and executes only on a match, so an action whose values differ from the approval does not run.**

The viewer should feel the binding: the same digest and target appear on the proposal, then on the approval card, then at the executor where two checks land before production lights. In the coda a second action with a changed target reaches the executor, the artifact check passes and the target check fails, and production is untouched. The agent, labelled read-only, never has a path to production.

Grounding (from the concept): "prepare a reviewable release record: service, environment, immutable artifact digest, and expected effect … Bind approval to those values in trusted execution code; changed values require renewed review. An approval boolean supplied by the model is not evidence of approval"; "execute through the deployment service's separate identity after checking the authorized reviewer and approved action"; the pitfall: "approving 'fix production' allows the actual artifact or target to drift after review"; OWASP transaction authorization: bind approval to significant action data.

Out of scope: how the reviewer evaluates the evidence (the evidence row is shown, the judgement is not), the authorization grid and grants (lessons 01–02), guardrail judgements (lesson 03), the deployment's effect and rollback, and what the agent does after the refusal. The cut ends with one release executed and one drifted action refused.

Grammar for this cut: **a read-only agent and a four-row proposal card at the top, a reviewer and a two-row approval card in the middle, an executor with two check marks at the bottom, and production beneath it.** Values travel as text on cards and chips; the executor's two marks are the comparison of artifact and target. The agent's only wire goes to the proposal card and, along the right margin, to the executor as a request; none goes to production. This differs from lesson 01 (an identity-by-operation grid), lesson 02 (a two-field grant card with two stores), and lesson 03 (two checkpoints in series with a confidence meter), from the orchestration, memory-architecture, context-engineering, tool-design, and loop-engineering cuts, and from the harness-engineering views. Every element is a software object: a proposal record, an artifact digest, a target, an approval, an executor identity, a production target.

Target length ≈ 36 s at playback. Authored at speed 1 for 32.5 s with `meta.speed: 0.9`. Lengthen the hold after the two checks and the hold after the refused drift first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows and sublabels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Guardrails and permissions** / REVIEW A CONCRETE ACTION | engine title + subtitle |
| agent | box | (250, 600) | 380 × 130 (x 60–440, y 535–665) | label `agent` 44 px; sublabel `agent-inv · read-only` 36 px mono (21 characters ≈ 454 px: too wide for 380; use `read-only` 9 ≈ 194 px) | |
| proposal | store, `rows: 4`, w 460 | (780, 620) | 460 × ≈ 260 (x 550–1010, y ≈ 490–750); row centres y ≈ 525, 590, 655, 720 | label `proposal` 36 px at (780, 455); rows 36 px mono, hidden until written | row0 `release   r42` · row1 `artifact  9f3a…` accent · row2 `target    prod` accent · row3 `tests     12 passed` ok (max 19 characters ≈ 410 px) |
| reviewer | box | (250, 980) | 380 × 130 (x 60–440, y 915–1045) | label `reviewer` 44 px; sublabel `engineer` 36 px → `inspects` → `approved` | |
| approval | store, `rows: 2`, w 460 | (780, 1000) | 460 × ≈ 140 (x 550–1010, y ≈ 930–1070) | label `approval` 36 px at (780, 895); rows 36 px mono, hidden until approved | row0 `9f3a… → prod` accent · row1 `by  engineer` mid |
| executor | box | (540, 1360) | 560 × 160 (x 260–820, y 1280–1440) | label `executor · deploy-svc` 40 px; sublabel 36 px mono `waits for approval` → `artifact ✓ target ✓` → `released r42` → `target ✗ · refused` | the separate identity |
| prod | db | (540, 1620) | w ≈ 140 | label `production` 36 px at (540, 1710); sublabel-like state via colour | lights once, on the matched execution |

The executor's two marks land at (480, 1300) for artifact and (600, 1300) for target, just inside its top edge, left and right of centre.

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| write | agent.right (440, 600) | proposal.left (550, 600) | — | the agent writes the proposal (110 px) |
| review | proposal.bottom (780, 750) | reviewer.top (250, 915) | [780, 830], [250, 830] | the proposal and evidence go to the reviewer |
| approve | reviewer.right (440, 980) | approval.left (550, 1000) | — | the reviewer approves exact values (110 px) |
| bind | approval.bottom (780, 1070) | executor.top (540, 1280) | [780, 1180], [540, 1180] | the approval reaches the executor |
| request | proposal.right (1010, 620) | executor.right (820, 1360) | [1055, 620], [1055, 1360] | the action request travels down the right margin to the executor |
| deploy | executor.bottom (540, 1440) | prod.top (≈ 540, 1560) | — | execution by the executor's identity; `dashed` 1 until a match |

No wire connects the agent or the reviewer to production; only `deploy` reaches it, and only from the executor. Stage spans y ≈ 455–1710.

## Sound map

Pitches: agent **C5**, proposal **E5**, reviewer **A5**, approval **G5**, executor **C6**, production **E6** (one bright arrival). Pan by x: agent and reviewer left (`−0.5`), proposal and approval right (`+0.5`), executor and production centre; the `request` chip pans hard right (`+0.8`) as it descends the margin.

| event | preset | notes |
|---|---|---|
| agent appears, read-only noted | `ack` C5, `ack` C5 (quiet) | |
| proposal rows appear | `store` | E5, one per row; artifact and target rows add `ack` C6 (quiet) |
| proposal goes to the reviewer | `send` E6, `arrive` A5 | |
| reviewer inspects | `work` | ×4 at 0.25 s, pan left; proposal rows pulse in turn with quiet `ack` |
| approval written | `send` A6, `store` G5 ×2 | |
| approval reaches the executor | `send` G6, `arrive` C6 | |
| action request reaches the executor | `send` E6 (pan right), `arrive` C6 | |
| artifact matches | `ack` | C6, with a green check |
| target matches | `hit` | with a green check |
| deploy executes | `send` C7 (quiet), `arrive` E6, `chime` | production lights; the brightest event |
| drifted request arrives | `send` E6 (pan right), `arrive` C6 (quiet) | |
| artifact matches again | `ack` | C6 |
| target does not match | `thump` | gain ×1.2; red ×; the loudest event |
| agent stays read-only | `ack` | C5, quiet; the sublabel pulses |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The agent prepares release r42 (0.0–7.0)** | | | |
| 0.0 | — | proposal and approval rows hidden; executor `waits for approval`; `deploy` dashed; production idle | — |
| 0.6 | agent pops | — | ack C5 |
| 1.0 | agent sublabel pulses | `read-only` | ack C5 (quiet) |
| 1.6–2.1 | chip `r42` (fg) agent.right → proposal.left, 0.5 s | — | — |
| 2.1 / 2.6 / 3.1 | proposal rows 0–2 pop | `release   r42` · `artifact  9f3a…` accent · `target    prod` accent | store E5 × 3, ack C6 (quiet) ×2 |
| 3.1–7.0 | hold | a concrete proposal: a digest and a target, written by an identity that cannot deploy | |
| **Beat 2 — Send the artifact and the evidence to the reviewer (7.0–13.5)** | | | |
| 7.0 | proposal row3 pops | `tests     12 passed` ok | store E5 |
| 7.6–8.6 | chip `proposal` (fg) proposal.bottom → via → reviewer.top, 1.0 s | — | send E6 |
| 8.6 | ripple at reviewer.top | reviewer sublabel → `inspects`; stroke → active | arrive A5 |
| 8.8–9.8 | proposal rows 1, 2, 3 pulse in turn (0.33 s apart) | the reviewer reads digest, target, evidence | work × 4 (pan left), ack × 3 (quiet) |
| 9.8–13.5 | hold | | |
| **Beat 3 — Approve the exact release; the executor checks artifact and target (13.5–24.0)** | | | |
| 13.5 | reviewer pulses | sublabel → `approved` ok | — |
| 13.5–14.0 | chip `approve` (ok) reviewer.right → approval.left, 0.5 s | — | send A6 |
| 14.0 / 14.4 | approval rows pop | `9f3a… → prod` accent · `by  engineer` mid | store G5 × 2 |
| 15.0–16.0 | chip `9f3a… → prod` (accent) approval.bottom → via → executor.top, 1.0 s | — | send G6 |
| 16.0 | ripple at executor.top | executor stroke → active; sublabel → `holds approval` | arrive C6 |
| 16.6–18.0 | chip `run 9f3a… → prod` (fg) proposal.right → via → executor.right, 1.4 s | — | send E6 (pan right) |
| 18.0 | ripple at executor.right | — | arrive C6 |
| 18.6 | ok check at (480, 1300) | sublabel → `artifact ✓` | ack C6 |
| 19.2 | ok check at (600, 1300) | sublabel → `artifact ✓ target ✓` ok | hit |
| 19.7 | — | `deploy` `dashed` → 0, colour → ok | — |
| 19.7–20.3 | chip `deploy r42` (ok) executor.bottom → prod.top, 0.6 s | — | send C7 (quiet) |
| 20.3 | ok ripple at production | prod colour → ok with glow; executor sublabel → `released r42` ok | arrive E6, chime |
| 20.3–24.0 | hold | the same digest and target on three cards, and production lit by the executor's identity | |
| **Beat 4 — Only the authorized action proceeds; the agent stays read-only (24.0–32.5)** | | | |
| 24.0 | proposal row2 swaps | `target    prod-eu` bad (a drifted target) | — |
| 24.4–25.8 | chip `run 9f3a… → prod-eu` (bad) proposal.right → via → executor.right, 1.4 s | — | send E6 (pan right) |
| 25.8 | ripple at executor.right | — | arrive C6 (quiet) |
| 26.4 | ok check at (480, 1300) | sublabel → `artifact ✓` | ack C6 |
| 27.0 | bad ripple with × at (600, 1300); executor shakes ±6 px | sublabel → `target ✗ · refused` bad; `deploy` → dashed, dim | thump |
| 27.6 | production pulses once at its current state | unchanged since `r42` | — |
| 28.2 | agent sublabel pulses | `read-only`; no wire from the agent reaches production | ack C5 (quiet) |
| 28.2–31.0 | hold | final state: a refused drifted action, an approval bound to `9f3a… → prod`, production at r42, a read-only agent | |
| 31.0–31.8 | — | `s.fade` to black, 0.8 s | — |
| 32.5 | end | finite ending | |

## Accuracy limits

- The release name, digest prefix, targets, and test count are illustrative, drawn from the concept's incident example. `9f3a…` stands for an immutable artifact digest; the concept also lists service and expected effect in the release record, which the write-up carries.
- The reviewer's inspection is shown as rows pulsing while a sound plays; the judgement itself is not shown. The concept says the engineer evaluates release evidence and decides whether the risk is acceptable.
- The approval card binds digest and target with the approver's identity; the cut does not show the approver being authenticated or the approval being stored in trusted execution code, both of which the concept requires.
- The executor compares two values. Real executors compare more (service, environment, expected effect) and also check that the approver was authorized; the cut shows the smallest binding that defeats drift.
- The drifted request in the coda comes from the proposal card to keep the stage simple; in the concept the drift could come from any party after review. The point is that changed values do not match the approval.
- The agent is labelled read-only and has no wire to production; the cut does not show the credential configuration that makes that true (lessons 01–02 and the concept's walkthrough cover it).
- No `poof` is used. The `thump` marks the failed target check.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `6.0, 12.0, 21.0, 24.5, 32.0, 34.5` (speed-1 ≈ 5.4, 10.8, 18.9, 22.1, 28.8, 31.1). Tile with ffmpeg and view the row; view the 24.5 s (released) and 32.0 s (refused) stills at full size and at 350 px wide. Pass when all proposal and approval rows, the executor's label and sublabel, the reviewer and agent sublabels, and the production label are readable at 350 px, the two check marks at the executor's top are visible and distinct, and the lit production at 24.5 s is clearly different from idle.
2. **Same values, three places**: at 24.5 s `9f3a…` and `prod` appear on the proposal, on the approval, and in the executor's sublabel; the `deploy` wire is solid and production is ok.
3. **Executor's identity acts**: the `deploy` chip leaves from the executor only; no chip ever travels from the agent or the reviewer toward production; the `request` chips end at the executor's right edge.
4. **Drift refused**: at 32.0 s the proposal's target row reads `prod-eu` in bad, the executor reads `target ✗ · refused`, the `deploy` wire is dashed again, and production is unchanged from 24.5 s.
5. **No lingering state**: no chip remains during any hold; the executor's marks fade between the two comparisons; the reviewer's sublabel stays `approved` after beat 3.
6. **Overlap**: the `request` chips at x = 1055 must stay inside the frame and clear of the proposal and approval cards' right edges (1010); the `review` chip must clear the `approval` label at (780, 895) (it leaves at y 750 and turns at 830, above the label); the `bind` chip must not cross the executor label (it lands at the box top); marks at (480, 1300) and (600, 1300) must clear the executor's label text (centred at y ≈ 1340). Rows at 36 px mono (19 characters ≈ 410 px) fit inside 460 px with minimal padding; the agent sublabel uses the shortened form noted.
7. **Word budget**: on-screen text is the agent label and sublabel, the proposal label and four rows, the reviewer label and sublabel, the approval label and two rows, the executor label and sublabel, and the production label. No sentence appears.
8. **Audio**: the Node dry-run lists ≈ 36 cues (2 acks, 3 stores with 2 acks, store, send/arrive, 4 works with 3 acks, send, 2 stores, send/arrive, send/arrive, ack, hit, send/arrive/chime, send/arrive, ack, thump, ack). The spectrogram shows the `hit` at 19.2 s, the `chime` at 20.3 s as the brightest event, and the `thump` at 27.0 s as the loudest. `ffprobe` reports ≈ 36 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: a left box writes a chip into a right card that fills three rows, two highlighted; a fourth green row appears and the card sends down-left to a second box, whose rows on the right pulse as it glows; the second box writes a chip into a second right card with two rows; that card sends down to a bottom box, and the first card sends a chip down the right margin to the same box; two green checks appear at the box's top, a dashed line below turns solid, a chip drops to a cylinder that lights green; the first card's third row turns red and sends another chip down the margin; one green check and one red × appear, the box shakes, the line turns dashed, and the cylinder stays as it was; the left box's lower line pulses.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept guardrails-and-permissions`, then the full set before any release proposal. A new encode needs its own comparison review.

