# Video 04 plan

## Mechanism and scope

One idea to feel: a failing test is useful because it names the expected behaviour and the observed one, and the same test replayed on the repair is what turns a change into a verified change. The composition is two request lanes side by side, each ending in a status, with one assertion line that compares them. The viewer watches the same two requests play twice: once against the original check, once against the repaired one.

Beats: (1) both tenants request invoice 1041 and both get 200; (2) the assertion line turns the second 200 red beside an `expected 403`; (3) the authorization check changes in place while the assertion stays red because nothing has been rerun; (4) the same two requests replay and the cross-tenant lane returns 403; (5) the assertion turns green and the stage holds.

Limits the cut respects: only the one access test is shown passing, and the ending keeps the contract chip reading `1 of 1` to say that this is the whole verified surface. The 403 requirement is an example contract, so the subtitle names it as a contract rather than a rule. The repair itself is a one-line check change shown as a chip swap; the video makes no claim about how the fix works internally. Lesson 05's gate and lesson 03's evidence binding stay out.

## Stage layout (1080×1920, `meta.speed: 0.9`)

| Node | Type | Centre | Options | Start state |
|---|---|---|---|---|
| title | title band | y 330 / 405 | `Harness` / `FAILURE TO FEEDBACK` | — |
| tenantA | phone | (290, 620) | label below `tenant A`, colour OK green | alpha 1 |
| tenantB | phone | (790, 620) | label below `tenant B`, colour accent orange | alpha 1 |
| invoice | box | (540, 900) | w 300 h 110, label `invoice 1041`, sublabel `owner A` | resting grey |
| check | box | (540, 1150) | w 420 h 120, label `auth check`, sublabel `if signed in` (mono, 30 px) | resting grey |
| laneA | wire | tenantA.bottom → [290,900] → invoice.left; and invoice.bottom → check.top shared | dotted | alpha 0.6 |
| laneB | wire | tenantB.bottom → [790,900] → invoice.right | dotted | alpha 0.6 |
| statusA | badge | (290, 1380) | — | alpha 0 |
| statusB | badge | (790, 1380) | — | alpha 0 |
| expectA | label | (290, 1460) | `expect 200`, 30 px, grey | alpha 1 |
| expectB | label | (790, 1460) | `expect 403`, 30 px, grey | alpha 1 |
| assertion | bar | (540, 1560) | w 600 h 16, segments 2 | both segs 0.5, grey |
| verdict | badge | (540, 1660) | — | alpha 0 |
| scope | label | (540, 1760) | `1 of 1 cases`, 28 px, grey | alpha 0 |

Colour carries ownership: tenant A, its lane, its packets, and its status share green; tenant B shares orange. The assertion bar has two segments, left for A's case, right for B's; each turns green or red when its status lands. Both lanes pass through the same `auth check` box, so the viewer sees the single point that decides the outcome.

Pitches: tenant A C5 (sends C6), tenant B E5 (sends E6), the check G5, the assertion bar plays `hit`/`miss`. Pan every cue to its lane.

## Storyboard (authored at speed 1; playback ≈ 1.11× longer)

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.0–1.0 | Stage fades in; invoice and check resting | contract visible: `expect 200` / `expect 403` under empty status slots | — |
| 1.0–3.0 | Hold | — | — |
| 3.0–3.8 | Chip `GET /invoices/1041` (green) tenantA → invoice.left → check.top | check pulses white | `send` C6 at 3.0, `arrive` G5 at 3.8 |
| 3.8–4.4 | Chip `200` (green) check.bottom → statusA; badge pops `200` green; assertion seg0 → green | lane A correct | `hit` at 4.3, pan left |
| 4.4–5.8 | Hold | — | — |
| 5.8–6.6 | Chip `GET /invoices/1041` (orange) tenantB → invoice.right → check.top | check pulses white | `send` E6 at 5.8, `arrive` G5 at 6.6 |
| 6.6–7.2 | Chip `200` (orange) check.bottom → statusB; badge pops `200` orange | cross-tenant request also succeeds | `deliver` low at 7.1 |
| 7.2–9.0 | Hold on two 200s | the failure is visible but not yet named | — |
| 9.0–9.6 | assertion seg1 → red; statusB badge colour → red; `expect 403` label → white; red ripple with `x` under statusB; small shake on the badge | failure named: expected 403, actual 200 | `miss` at 9.1, loudest cue |
| 9.6–10.2 | verdict badge pops `1 fail` red at (540,1660) | — | `thump` at 9.7 |
| 10.2–13.0 | Hold: 200 green, 200 red beside `expect 403`, `1 fail` | the feedback the agent receives | — |
| 13.0–14.0 | Chip `expect 403 · got 200` (red) travels from verdict up and off the top of the stage via [540,500] | feedback returned to the agent (off stage) | `send` low at 13.0 |
| 14.0–15.5 | Hold | — | — |
| 15.5–16.5 | check pulses accent; sublabel text switches `if signed in` → `if tenant = owner` (dur 0); check stroke → accent orange | repair proposed | `store` G5 at 15.6 |
| 16.5–18.5 | Hold: check is orange, assertion still red, badges unchanged | a changed check is not yet a verified one | `clock` single tick at 17.5 |
| 18.5–19.0 | statusA, statusB fade out; assertion segs → grey; verdict fades | rerun begins, old results cleared | `send` G6 quiet |
| 19.0–19.8 | Same green chip tenantA → invoice → check | same test, same request | `send` C6, `arrive` G5 |
| 19.8–20.4 | `200` green to statusA; seg0 → green | owner still allowed | `hit` at 20.3 |
| 20.4–21.6 | Hold | — | — |
| 21.6–22.4 | Same orange chip tenantB → invoice → check | the replayed cross-tenant case | `send` E6, `arrive` G5 |
| 22.4–23.0 | Chip `403` (orange) check.bottom → statusB; badge pops `403`; seg1 → green; `expect 403` label → green | repaired behaviour observed | `hit` at 22.9, pan right |
| 23.0–23.6 | verdict pops `0 fail` green; check stroke accent → OK green | the rerun verified the change | `chime` G5 at 23.1 |
| 23.6–26.0 | Hold | — | — |
| 26.0–26.6 | scope label `1 of 1 cases` fades in at (540,1760) | this test, and only this test | `ack` quiet at 26.1 |
| 26.6–30.5 | Hold the whole stage | — | — |
| 30.5–31.8 | `s.fade` to black | — | — |

`meta.duration` 32 at speed 1 (≈36 s playback).

## Sound map

| Event | Preset | Note |
|---|---|---|
| Tenant A sends / B sends | `send` | C6 / E6, quiet |
| Request reaches the check | `arrive` | G5 |
| Status matches expectation | `hit` | pan to lane |
| Status 200 for B before the assertion | `deliver` | low, so it sounds ordinary until the assertion names it |
| Assertion fails | `miss` | loudest cue |
| Verdict `1 fail` | `thump` | — |
| Feedback leaves | `send` | low |
| Check changed | `store` | G5 |
| Unverified wait | `clock` | one tick |
| Rerun clear | `send` | G6, quiet |
| Verdict `0 fail` | `chime` | G5 |
| Scope note | `ack` | quiet |

The first run and the rerun use identical send and arrive cues, so the ear confirms it is the same test. Only the landing differs: `deliver` then `miss` in the first pass, `hit` in the rerun.

## Implementation needs

1. `phone` has no label option in the API table; place a `label` node under each phone (`tenant A` at (290,700), `tenant B` at (790,700), 30 px) and tint the phone with `color`.
2. The check's sublabel is the repair; keep it mono and ≥ 30 px, and confirm `if tenant = owner` fits inside w 420. Widen to 480 if it crowds.
3. Lane chips route `[tenant.bottom, [x,900], invoice.side, check.top]`; confirm the two merged routes do not cross the `invoice 1041` label.
4. Clearing the badges before the rerun uses `alpha` tweens; the verdict must be fully gone before `0 fail` pops so the two never overlap.
5. Dry-run in Node to confirm the cue list has exactly two `miss`/`thump` events and two `hit` events after 19 s.

## Acceptance checks

- Stills at 2.0, 8.5, 12.0, 17.5, 23.0, 29.0 s playback in one row: empty slots with the contract; two 200s; `1 fail` with B red; orange check with assertion still red; two matching statuses with `0 fail`; the held final stage with `1 of 1 cases`.
- At 350 px width: `invoice 1041`, `if signed in`, `if tenant = owner`, `200`, `403`, `expect 403`, `1 fail`, `0 fail`, `1 of 1 cases` all legible and clear of lanes, badges, and the assertion bar.
- In the 17.5 s still the assertion bar is still red and statusB still reads 200: the repair alone changes nothing on the result row.
- In the final still, statusA reads 200 green, statusB reads 403 green, the check reads `if tenant = owner`, and the scope label is present.
- Spectrogram: `miss` at ≈10 s playback is the loudest burst; two `hit` cues and a chime after ≈22 s; ffprobe ≈36 s with audio.

## Rationale

The lesson lives in a comparison, so the stage is built as one: two tenants, one invoice, one check, two expected statuses. Showing the first run as two ordinary 200s before the assertion colours one of them red lets the viewer feel why an expected value matters; without it, 200 looks fine. Holding on the orange check while the assertion stays red is the second half of the lesson, and replaying the identical chips with identical sounds is what makes the rerun read as the same test. The closing scope chip is the only extra text, and it exists to keep the ending honest.

