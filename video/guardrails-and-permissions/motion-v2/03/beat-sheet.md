# Lesson 03 — Policy and permission: beat sheet

Mechanism: the same proposed action A1 (`deploy r42 → prod`) goes to two different checks. The policy check is a judgment. It scores `recovery fit` at confidence 0.82 and ACCEPTS. The permission check looks up the session identity `investigator`, finds no grant for `deploy prod`, and DENIES. Only the permission check is wired to the deploy service, and that service is never invoked. Both verdicts stay on screen together.

## Neutral choices from plans A and B

- From A: one decision record per action, with two independently filled verdict fields (`pending → ACCEPTED`, `not checked → DENIED`). The proposal ID `A1` never changes, and each check receives `A1` itself rather than an acceptance token. Identity comes from the session. `calls 0` / `not invoked` / `r41` are constant throughout. The policy verdict is never rewritten as wrong. No approval, override or retry. Finite fade.
- From B: two different textures. The policy check is graded (a confidence meter fills to 0.82 and stops short), while the permission check is binary (`grant none`). Policy runs first, then permission. The route to the deploy service is closed and gets a grey ×.
- This cut's geometry: two side-by-side columns with matching rows (kind/identity, criterion/needs, confidence/grant, verdict), fed separately from the proposal card above. Only the permission column connects to the deploy service below. The columns differ from lesson 01's stacked inspector and lesson 02's grid.
- Excluded: prompt injection, approvals and executors (lesson 04), lesson 02's read scenario, and fail-closed handling when a check is unavailable. The 0.82 value, criterion, identity and release are illustrative. No threshold is claimed.

## Timing (speed 1, 38.4 s) and sound

| t (s) | What moves / state change | Sound (actor) |
|---|---|---|
| 0.3–1.0 | Both check columns (keys only, `pending` / `not checked`) and the deploy service (`calls 0 · not invoked`, `live release r41`) fade in | ack C5 quiet |
| 1.2–2.3 | Proposed action `deploy r42 → prod` types in; tag `A1` | store E5 (proposal) |
| 2.3–3.6 | Hold | — |
| 3.6–4.4 | Chip `A1` drops into the policy column | send E6 (proposal) |
| 4.4 | Policy column outlines amber | arrive G5 (policy) |
| 5.2 / 6.3 | `kind judgment` and `criterion recovery fit` appear, outlined in turn | ack G6 ×2 (policy) |
| 7.4–9.0 | Confidence meter fills and stops short of full | work G4 ×6 (policy judging) |
| 9.0 | `0.82` appears; meter pulses | clock tick |
| 9.2–11.0 | Hold | — |
| 11.0 | Policy verdict `ACCEPTED` (green outline) | ack G5 |
| 12.6 | Permission verdict `not checked` outlined | ack C4 quiet (permission) |
| 13.8 | `calls 0 · not invoked` outlined | ack C4 quiet |
| 14.8–17.5 | Hold: accepted, unchecked, nothing run | — |
| 17.5–18.3 | Chip `A1` drops into the permission column | send E6 (proposal) |
| 18.3 | Permission column lights | arrive C5 (permission) |
| 19.1 / 20.2 | `investigator` (from session), `needs deploy prod` | ack C6 ×2 |
| 21.3–21.9 | Grant lookup outlined amber, then `none` in red | work C4 ×2 |
| 22.9 | Verdict `DENIED`; column flashes red and jolts | thump C3, loudest |
| 23.3–26.0 | Hold on the two verdicts | — |
| 26.0 | Grey × on the route to the deploy service | custom `closed` low click |
| 27.2 | `calls 0 · not invoked` outlined | ack C4 quiet |
| 28.4 | `ACCEPTED` outlined again, unchanged | ack G5 quiet |
| 29.5–31.0 | Hold | — |
| 31.0 | `ACCEPTED` and `DENIED` outlined together; proposal dims, tag `A1 · not run` | ack G4 + ack C4, soft pair |
| 31.3–36.6 | Final hold | silence |
| 36.6–37.8 | Stage fades; title remains | — |

Actor pitches: proposal E (E5/E6), policy check G (G5/G6, judging ticks G4), permission check C (C5/C6, lookup C4, denial C3). The deploy service never sounds because it is never invoked.
