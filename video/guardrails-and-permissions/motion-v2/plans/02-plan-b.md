# Lesson 02 — Grant only needed access — plan B

Independent plan for the motion-v2 cut of guardrails-and-permissions lesson 02. Authored from the lesson entry in `video/guardrails-and-permissions/sequence/lessons.json` (item 2) and the concept content in `content/concepts/guardrails-and-permissions.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a grant names both an action and a resource; the service checks each request against both fields, so a read of the granted resource is executed and a read of a different resource with the same action is denied, and the ungranted store is never touched.**

The viewer should feel the two-field match: the request chip reaches the grant card and each field gets its own mark. First request: two checks, the checkout log store lights and returns lines. Second request: a check on `action` and a red × on `resource`, a denial back to the agent, and the payments store stays dark. Same identity, same verb, different resource, different outcome.

Grounding (from the concept): "authorization determines whether an authenticated identity may perform an operation on a particular resource"; the example agent "can read approved service logs"; the walkthrough's step 2: "give the investigation identity only the selected log reads"; "read access also deserves scoping: logs can contain sensitive data"; OWASP least privilege and default deny; the lesson's takeaway: "least privilege applies to both action and resource."

Out of scope: the deploy denial (lesson 01), reviewers and the deployment identity (later lessons), content checks on log lines, how grants are administered, and what the agent does with the lines. The cut ends with the denied payments read and the untouched payments store.

Grammar for this cut: **an agent above a two-row grant card held by the service, two log stores below with one execution wire each, and marks on the grant card's rows.** The grant card is the matcher; the stores are the resources; the execution wires show which resource was reached. This differs from lesson 01 (a 2 × 2 identity-by-operation grid with a deploy service below), from the orchestration, memory-architecture, context-engineering, tool-design, and loop-engineering cuts, and from the harness-engineering views. Every element is a software object: an identity, a grant with two fields, a request, a log store, a response.

Target length ≈ 33 s at playback. Authored at speed 1 for 30 s with `meta.speed: 0.9`. Lengthen the hold after the two checks and the hold after the resource × first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and resource labels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Guardrails and permissions** / GRANT ONLY NEEDED ACCESS | engine title + subtitle |
| agent | box | (540, 580) | 480 × 130 (x 300–780, y 515–645) | label `agent` 44 px; sublabel `identity: agent-inv` 36 px mono (19 characters ≈ 410 px) | |
| grant | store, `rows: 2`, w 620 | (540, 820) | 620 × ≈ 140 (x 230–850, y ≈ 750–890); row centres y ≈ 785, 855 | label `permission · service` 40 px at (540, 710); rows 36 px mono | row0 `action    read` · row1 `resource  logs/checkout` accent (23 characters ≈ 497 px) |
| checkout | db | (300, 1250) | w ≈ 140 | label `logs/checkout` 36 px mono at (300, 1345) | `busy` spins while read |
| payments | db | (780, 1250) | w ≈ 140 | label `logs/payments` 36 px mono at (780, 1345) | alpha 0.5 throughout: never reached |

Marks land at (820, y_row) on the right edge of the grant card.

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| req | agent.bottom (540, 645) | grant.top (540, 750) | — | requests go to the service; responses return along it |
| execC | grant.bottom (540, 890) | checkout.top (≈ 300, 1190) | [540, 1040], [300, 1040] | execution against the granted resource; `dashed` 1 until the first request passes, then solid |
| execP | grant.bottom (540, 890) | payments.top (≈ 780, 1190) | [540, 1040], [780, 1040] | the route to the ungranted resource; `dashed` 1 and dim throughout, never solid |

Both execution wires leave the grant card from the same point and split at y = 1040, so the viewer sees that the choice between them is made at the card. Stage spans y ≈ 515–1345.

## Sound map

Pitches: agent **C5**, grant/service **G5**, checkout store **E5**, payments store **A5** (sounds only as a refusal). Pan by x: checkout left (`−0.5`), payments right (`+0.5`), the rest centre.

| event | preset | notes |
|---|---|---|
| agent appears, identity noted | `ack` C5, `ack` C5 (quiet) | |
| grant rows appear | `store` | G5, ×2; the resource row adds `ack` C6 (quiet) |
| stores appear | `ack` | E5, A5 (quiet) |
| a request leaves and lands | `send` C6, `arrive` G5 | |
| a field matches | `ack` | G5, with a green check |
| both fields match | `hit` | the card's stroke turns ok; the execution wire turns solid |
| read executes | `send` G6, `arrive` E5, `work` ×4 | the store spins |
| lines return | `store` | C5, at the agent |
| a field does not match | `miss` | with a red ×; the card's stroke turns bad |
| denial returns | `send` G6, `arrive` C5 (gain ×0.7) | |
| the other route stays closed | `thump` | gain ×0.5, pan right; grey × on the dashed wire |
| the resource field is the boundary | `chime` | the resource row pulses accent |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The identity is allowed to read one scope (0.0–7.0)** | | | |
| 0.0 | — | grant rows hidden; stores hidden; wires dashed | — |
| 0.6 | agent pops | — | ack C5 |
| 1.0 | agent sublabel pulses | `identity: agent-inv` | ack C5 (quiet) |
| 1.8 / 2.2 | grant rows pop | `action    read` · `resource  logs/checkout` accent | store G5 × 2, ack C6 (quiet) |
| 2.8 / 3.0 | stores pop | checkout at full alpha; payments at alpha 0.5 | ack E5, ack A5 (quiet) |
| 3.0–7.0 | hold | one identity, one two-field grant, two stores | |
| **Beat 2 — The service checks action and resource (7.0–13.0)** | | | |
| 7.0–7.6 | chip `read logs/checkout` (fg) agent.bottom → grant.top, 0.6 s | — | send C6 |
| 7.6 | ripple at grant.top | grant stroke glows | arrive G5 |
| 8.2 | row0 flashes; ok check at (820, 785) | `action` matches | ack G5 |
| 8.9 | row1 flashes accent; ok check at (820, 855) | `resource` matches | ack G5 |
| 9.4 | — | grant stroke → ok; `execC` `dashed` → 0, colour → ok | hit |
| 9.4–13.0 | hold | two checks on one card; one wire opened | |
| **Beat 3 — The approved read is executed; permitted logs return (13.0–20.0)** | | | |
| 13.0–13.9 | chip `read` (ok) grant.bottom → via → checkout.top, 0.9 s | — | send G6 (pan left) |
| 13.9 | ripple at checkout | checkout `busy` → 1; colour → ok | arrive E5 |
| 14.1–14.9 | — | spinner held | work × 4 (pan left) |
| 15.1–16.0 | chip `lines · 120` (ok) checkout.top → via → grant.bottom, 0.9 s | checkout `busy` → 0 | — |
| 16.0–16.6 | chip continues grant.top → agent.bottom, 0.6 s | — | — |
| 16.6 | ok ripple at agent.bottom | agent stroke → ok briefly; sublabel → `has checkout logs` ok | store C5 |
| 16.6–20.0 | hold | the granted read, executed and returned | |
| **Beat 4 — A read of payments logs is different (20.0–30.0)** | | | |
| 20.0 | — | grant stroke → fg; marks fade; agent sublabel → `identity: agent-inv` | — |
| 20.4–21.0 | chip `read logs/payments` (accent) agent.bottom → grant.top, 0.6 s | — | send C6 |
| 21.0 | ripple at grant.top | — | arrive G5 |
| 21.6 | row0 flashes; ok check at (820, 785) | `action` matches (same verb) | ack G5 |
| 22.3 | row1 flashes bad; bad ripple with × at (820, 855) | `resource` does not match; grant stroke → bad | miss |
| 22.3–24.0 | hold | one check, one × on the same card | |
| 24.0–24.6 | chip `403 · denied` (bad) grant.top → agent.bottom, 0.6 s | — | send G6 |
| 24.6 | bad ripple at agent.bottom | agent stroke → bad for 0.6 s then fg | arrive C5 (quiet) |
| 25.2 | grey ripple with × at (780, 1040) (the `execP` corner) | payments stays at alpha 0.5; `execP` stays dashed | thump (quiet, pan right) |
| 26.0 | grant row1 pulses accent | `resource  logs/checkout`: the field that decided | chime |
| 26.0–28.5 | hold | final state: agent with its identity, a grant with two fields, a lit checkout store and an untouched payments store, one solid wire and one dashed | |
| 28.5–29.3 | — | `s.fade` to black, 0.8 s | — |
| 30.0 | end | finite ending | |

## Accuracy limits

- The identity, grant fields, resource names, line count, and `403` code are illustrative, drawn from the concept's incident example. Real grants may name resources by pattern, environment, or tag, and may carry conditions; the two-field card is the smallest rendering of "operation on a particular resource".
- The cut shows one grant for one identity. Default deny is implied by the payments store never being reachable, not stated.
- The checkout read returns a count of lines; the concept's note that logs can contain sensitive data motivates scoping the read, and the cut does not show content filtering or redaction.
- The payments denial is the lesson's resource half of least privilege; the action half (a deploy with the same identity) is lesson 01 and is not repeated.
- The `execC` wire is drawn as opened by the match; in a real service the check and the execution happen in the same request path, and the wire stands for the request being allowed through.
- No `poof` is used. The `miss` marks the unmatched field; the quiet `thump` marks the route that stays closed.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `6.5, 12.5, 19.5, 25.5, 30.0, 32.0` (speed-1 ≈ 5.9, 11.3, 17.6, 23.0, 27.0, 28.8). Tile with ffmpeg and view the row; view the 12.5 s (two checks) and 25.5 s (check and ×) stills at full size and at 350 px wide. Pass when the agent sublabel, both grant rows, the two store labels, and the chips are readable at 350 px, the marks at the card's right edge are visible and clear of the row text, the solid `execC` wire is distinguishable from the dashed `execP` wire, and the payments store at alpha 0.5 is clearly dimmer than the checkout store.
2. **Two fields, two marks**: at 12.5 s both grant rows carry green checks and `execC` is solid; at 25.5 s row0 carries a check and row1 a red ×, and the grant's stroke is bad.
3. **Only the granted resource is reached**: the checkout store spins between 13.9 and 15.1 s (speed 1) and the `lines` chip returns; the payments store never spins and never changes alpha; `execP` is dashed in every still.
4. **Same verb**: the two request chips both begin with `read`; the action row passes in both cases; only the resource row differs.
5. **No lingering state**: no chip remains during any hold; the first request's marks fade before the second request lands; the agent's stroke returns to fg after each response.
6. **Overlap**: request and response chips on `req` (105 px) must fade at both ends or be shortened to `checkout` / `payments` / `denied` if they do not fit at 40 px; execution chips must clear the `permission · service` label (they leave from the card's bottom) and the store labels at y = 1345 (they arrive at the stores' tops); marks at (820, y) must clear the longest row (23 characters ≈ 497 px, ending ≈ x 757). Rows at 36 px mono fit inside 620 px with padding.
7. **Word budget**: on-screen text is the agent label and sublabel, the grant label and two rows, and two store labels. No sentence appears.
8. **Audio**: the Node dry-run lists ≈ 28 cues (2 acks, 2 stores with ack, 2 acks, send/arrive, 2 acks, hit, send/arrive, 4 works, store, send/arrive, ack, miss, send/arrive, thump, chime). The spectrogram shows the `hit` at 9.4 s, work ticks panned left at 14.1–14.9 s, the `miss` at 22.3 s as the only low falling event, a quiet right-panned `thump` at 25.2 s, and the `chime` at 26.0 s as the brightest. `ffprobe` reports ≈ 33 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: a box above a two-row card, two cylinders below, the right one dim; a chip drops from the box to the card, both rows get green checks, the card's outline turns green, and a dashed line to the left cylinder turns solid; a chip runs down it, the cylinder spins, and a green chip returns to the box; a chip drops again, the first row checks, the second gets a red ×, the outline turns red, a red chip returns to the box, a grey × appears on the dashed line to the right cylinder, and the second row pulses.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept guardrails-and-permissions`, then the full set before any release proposal. A new encode needs its own comparison review.

