# Lesson 03 — Policy and permission — plan B

Independent plan for the motion-v2 cut of guardrails-and-permissions lesson 03. Authored from the lesson entry in `video/guardrails-and-permissions/sequence/lessons.json` (item 3) and the concept content in `content/concepts/guardrails-and-permissions.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a proposed action passes through two checks in series that differ in kind: a policy check (a guardrail, which may be a fallible judgement with a confidence) and an authorization check (identity against operation, decided at the action boundary); passing the first grants nothing, the second still runs, and when it denies, the action is not executed.**

The viewer should feel the difference in texture between the two checks: the guardrail's meter fills most of the way and the proposal is waved through with `pass · 0.82`; the authorization row below is a flat `deny` with a hard red ×; the proposal stops there and the deploy service under it never lights.

Grounding (from the concept): "a guardrail checks whether an input, output, or proposed action meets a policy. The term covers deterministic checks and fallible model judgments; it is not a security guarantee"; "reject an action when its permission check fails or is unavailable"; the pitfall: "treating a read-only tool label, a safety classifier, or a successful refusal as proof of enforced permissions"; OWASP: checks on every request; the lesson's takeaway: "keep identity-based permission enforcement at the action boundary."

Out of scope: how the guardrail judges (classifier, rule, or model), prompt-injected content, the reviewer and the deployment identity (later lessons), the read grant (lesson 02), and what happens to a proposal the guardrail rejects. The cut ends with the denied action and the unchanged release.

Grammar for this cut: **a proposal card at the top, two checkpoints stacked beneath it on one pipeline, a confidence meter beside the first checkpoint, and a deploy service at the bottom on a dashed wire.** The first checkpoint is a box with a meter; the second is a one-row store with a binary result; the proposal chip travels the pipeline and stops. This differs from lesson 01 (a 2 × 2 identity-by-operation grid) and lesson 02 (a two-field grant card with two stores), from the orchestration, memory-architecture, context-engineering, tool-design, and loop-engineering cuts, and from the harness-engineering views. Every element is a software object: a proposed action, a policy check with a confidence, an authorization row, a service, a release value.

Target length ≈ 33 s at playback. Authored at speed 1 for 30 s with `meta.speed: 0.9`. Lengthen the hold on `pass · 0.82` and the hold after the denial first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and the meter label are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Guardrails and permissions** / POLICY AND PERMISSION | engine title + subtitle |
| proposal | store, `rows: 1`, w 640 | (540, 560) | 640 × ≈ 90 (x 220–860, y ≈ 515–605) | label `proposed action` 36 px at (540, 480); row 36 px mono | row0 `deploy r42 → prod · agent-inv` (28 characters ≈ 605 px; shorten to `deploy r42 → prod` if padding is tight) → later `· denied` appended in bad |
| guard | box | (480, 820) | 520 × 170 (x 220–740, y 735–905) | label `policy check` 40 px; sublabel 36 px mono `judging…` → `pass · 0.82` accent | the guardrail; its glow is soft (lower glow value) |
| meter | bar, `segments: 1` | (900, 820) | 240 × 14 (x 780–1020) | label `confidence` 36 px above at (900, 785) | fills 0 → 0.82 in accent; the remaining 18% of track stays visible |
| authz | store, `rows: 1`, w 640 | (540, 1180) | 640 × ≈ 90 (x 220–860, y ≈ 1135–1225) | label `authorization · identity` 40 px at (540, 1095); row 36 px mono | row0 `agent-inv · deploy prod` → `agent-inv · deploy prod  deny` bad (29 characters ≈ 626 px: too wide; use `agent-inv → deploy  deny` 24 ≈ 518 px) |
| deploy | box | (540, 1450) | 480 × 130 (x 300–780, y 1385–1515) | label `deploy service` 40 px; sublabel `release r41` 36 px mono | alpha 0.5 throughout |
| badge | badge | (780, 1385) | — | `unchanged` ok | top-right of the deploy service; hidden until beat 4 |

The mark for the authorization result lands at (830, 1180), the row's right edge.

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| p1 | proposal.bottom (540, 605) | guard.top (480, 735) | [540, 670], [480, 670] | the proposal enters the policy check |
| p2 | guard.bottom (480, 905) | authz.top (540, 1135) | [480, 1020], [540, 1020] | a passed proposal continues to authorization |
| exec | authz.bottom (540, 1225) | deploy.top (540, 1385) | — | the only route to execution; `dashed` 1 and dim throughout |

The pipeline is one line from top to bottom through both checks, slightly jogged so the two checkpoints read as separate stations. Stage spans y ≈ 480–1515.

## Sound map

Pitches: proposal **C5**, guardrail **E5** (soft, with a longer echo), authorization **G5** (short, dry), deploy service **A5** (never sounds an arrival). Pan by x: meter right (`+0.5`), the rest centre.

| event | preset | notes |
|---|---|---|
| proposal appears | `store` | C5 |
| proposal enters the guardrail | `send` C6, `arrive` E5 | |
| guardrail judges | `work` | ×6 at 0.2 s, lower gain, pan slightly right as the meter fills |
| meter stops short of full | `clock` | one tick at 0.82 |
| guardrail passes | `ack` | E5, with a soft green ripple (no check mark: a pass is a judgement, not a proof) |
| proposal continues | `send` | E6 |
| authorization looks up the identity | `ack` | G5, quiet; the row flashes |
| authorization denies | `thump` | gain ×1.3; red × at the row's edge; the loudest event |
| denial returns | `send` G6, `arrive` C5 (gain ×0.7) | the proposal row gains `· denied` |
| route stays closed | `miss` | gain ×0.5; grey × on the dashed wire |
| release unchanged | `ack` | A5, with the sublabel pulse and badge |
| two checks compared | `ack` E5 then `ack` G5 | meter pulses accent; authz row pulses bad |
| boundary held | `chime` | |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — A proposed action enters the policy check (0.0–9.0)** | | | |
| 0.0 | — | proposal hidden; meter empty; authz row `agent-inv → deploy` fg; deploy at alpha 0.5; badge hidden | — |
| 0.6 | proposal row pops | `deploy r42 → prod` fg | store C5 |
| 1.4–2.2 | chip `deploy r42` (fg) proposal.bottom → via → guard.top, 0.8 s | — | send C6 |
| 2.2 | ripple at guard.top | guard sublabel → `judging…`; soft glow | arrive E5 |
| 2.4–3.6 | `meter` `seg0` 0 → 0.82 (ease out) | — | work × 6 |
| 3.6 | `meter` pulses | the fill stops with visible track remaining | clock |
| 4.2 | soft ok ripple at guard centre | guard sublabel → `pass · 0.82` accent; stroke → ok (soft) | ack E5 |
| 4.2–9.0 | hold (long) | a pass that is a judgement with a number, not a certainty | |
| **Beat 2 — The policy check accepts; that alone grants nothing (9.0–13.5)** | | | |
| 9.0–9.9 | chip `pass · 0.82` (accent) guard.bottom → via → authz.top, 0.9 s | — | send E6 |
| 9.9 | ripple at authz.top | `authorization · identity` label pulses | — |
| 10.3 | authz row flashes | the identity and operation are looked up | ack G5 (quiet) |
| 10.3–13.5 | hold | the passed proposal sits at the second check; nothing has executed | |
| **Beat 3 — Authorization still checks; the identity lacks permission (13.5–20.0)** | | | |
| 13.5 | authz row swaps and pulses; bad ripple with × at (830, 1180) | `agent-inv → deploy  deny` bad; authz stroke → bad | thump (loud) |
| 14.3–15.4 | chip `denied` (bad) authz.top → via → guard.bottom → via → proposal.bottom, 1.1 s | — | send G6 |
| 15.4 | bad ripple at proposal.bottom | proposal row → `deploy r42 → prod · denied` with `· denied` in bad (or the whole row in bad) | arrive C5 (quiet) |
| 15.8 | — | guard sublabel stays `pass · 0.82`; guard stroke → mid (the pass stands, and changes nothing) | — |
| 15.8–20.0 | hold | a passed guardrail above a denying authorization | |
| **Beat 4 — Do not execute; a guardrail pass cannot override this check (20.0–30.0)** | | | |
| 20.0 | `exec` wire pulses dim | — | — |
| 20.6 | grey ripple with × at (540, 1305) (the wire's midpoint) | the route is closed | miss (quiet) |
| 21.4 | deploy sublabel pulses | `release r41` unchanged | ack A5 |
| 21.9 | badge pops | `unchanged` ok | — |
| 22.6 | `meter` pulses accent (0.82); authz row pulses bad | two checks, two natures, one outcome | ack E5, ack G5 |
| 23.2 | — | authz stroke → ok (the boundary that held) | chime |
| 23.2–28.5 | hold | final state: a denied proposal, a guardrail that said pass at 0.82, an authorization row that said deny, a dark deploy service with `release r41` and `unchanged` | |
| 28.5–29.3 | — | `s.fade` to black, 0.8 s | — |
| 30.0 | end | finite ending | |

## Accuracy limits

- The proposal, identity, release, and the `0.82` confidence are illustrative. The number depicts that some guardrails return a judgement with uncertainty; the concept says the term covers both deterministic checks and fallible model judgments, and the cut shows one of the fallible kind. It does not claim a threshold or what 0.82 means.
- The guardrail's pass is drawn with a soft ripple and no check mark to distinguish a judgement from an enforced result. This is a visual convention of the cut, not a standard.
- Authorization is shown as one row for one identity and operation; the concept also says to reject when the permission check is unavailable, which is not shown.
- The denial returns along the pipeline to the proposal; the cut does not show logging or what the agent does next.
- The order (guardrail first, then authorization) follows the lesson text. Some systems run them in the other order or in parallel; the lesson's point is that authorization runs regardless and decides at the action boundary.
- The deploy service is shown dark with an unchanged release; the cut does not show the deployment identity that could deploy, which is a later lesson.
- No `poof` is used. The `thump` marks the denial; the quiet `miss` marks the closed route.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `7.0, 13.0, 19.5, 25.5, 29.0, 32.0` (speed-1 ≈ 6.3, 11.7, 17.6, 23.0, 26.1, 28.8). Tile with ffmpeg and view the row; view the 7.0 s (pass at 0.82) and 19.5 s (deny) stills at full size and at 350 px wide. Pass when the proposal row, the guardrail label and sublabel, the meter label, the authorization label and row, the deploy sublabel, and the badge are readable at 350 px, the meter's unfilled 18% is visible, the red × at the authorization row is clear, and the dashed `exec` wire is visible but unlit.
2. **Two textures**: at 7.0 s the guardrail's stroke is soft green with `pass · 0.82` and the meter is at 0.82; at 19.5 s the authorization row is bad with a hard × and the guardrail still reads `pass · 0.82`.
3. **Pass grants nothing**: between 9.9 and 13.5 s (speed 1) the chip sits at the authorization check and the `exec` wire is dashed; no chip ever travels on `exec`.
4. **Unchanged**: the deploy sublabel reads `release r41` in every still; the badge reads `unchanged` at 25.5 s and after.
5. **No lingering state**: no chip remains during any hold; the guardrail's glow softens to mid after the denial while its sublabel text is unchanged.
6. **Overlap**: the `p1` and `p2` chips must not cross the `policy check` or `authorization · identity` labels except at arrival (the labels sit above their boxes; chips arrive at box tops); the `confidence` label at (900, 785) must clear the guardrail box (right edge 740); the × at (830, 1180) must clear the row text (24 characters ≈ 518 px, ending ≈ x 799: tight; move the mark to (845, 1180) and verify). Rows at 36 px mono fit inside 640 px with the shortenings noted.
7. **Word budget**: on-screen text is the proposal label and row, the guardrail label and sublabel, the meter label, the authorization label and row, the deploy label and sublabel, and the badge. No sentence appears.
8. **Audio**: the Node dry-run lists ≈ 22 cues (store, send/arrive, 6 works, clock, ack, send, ack, thump, send/arrive, miss, ack, 2 acks, chime). The spectrogram shows a soft work stretch at 2.4–3.6 s, the `thump` at 13.5 s as the loudest event, a quiet `miss` at 20.6 s, and the `chime` at 23.2 s as the brightest. `ffprobe` reports ≈ 33 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: a row at the top sends a chip into a box; a small bar beside the box fills most of the way and stops; the box glows softly green and its lower line changes; the chip continues down to a one-row panel; that row flashes red with a hard × and a red chip climbs back up to the top row, which turns red; a dashed line below the panel pulses with a grey ×; a dim bottom box's lower line pulses and a green tag appears; the small bar and the red row pulse together and the panel's outline turns green.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept guardrails-and-permissions`, then the full set before any release proposal. A new encode needs its own comparison review.

