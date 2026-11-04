# Lesson 02 — Create a verifier: beat sheet

Cut: `video/oauth-pkce/motion-v2/02/` · 1080×1920 · 30 fps · speed 1 · 42.60 s finite ending (stage fades to the title).

**Mechanism.** Each authorization attempt gets a fresh, unpredictable verifier from a crypto random source. The client keeps it privately with that attempt's record. S256 derives `BASE64URL-ENCODE(SHA256(ASCII(code_verifier)))` without padding, and only the challenge (with method `S256`) leaves the client. A second attempt gets a different verifier in its own record, and the first record never changes. The derivation runs one way only.

**Out of scope.** Authorization codes, server-side storage or binding, callbacks, comparison, tokens, and exchange mechanics. The server only shows what arrived, then goes quiet. Cell patterns, "verifier A/B" and "challenge A/B" are abstract placeholders, not real values.

## Stage

| Element | Geometry | Notes |
|---|---|---|
| Client boundary | dashed frame 940×960 at (540, 950) | legends `Client` (top left) and `stays in client` (top right, from 7.6 s) |
| `crypto random` | frame 880×170 at (540, 625); 8 cells of 64 px | cells churn while generating, then settle into a fixed shade pattern per attempt |
| `per-attempt records` | table 880 wide, centre y 877; slots at y 837 (top, next to crypto random) / 943; rows inset 30 px on the right, leaving a lane at x 953 inside the frame | key `attempt A`/`attempt B`; value cell = solid outline + mini pattern + `verifier X`. The newest attempt takes the top slot. |
| `S256 · one-way` | frame 880×210 at (540, 1175); steps at x 230 / 540 / 850 | `ASCII` → `SHA-256` (`hash`) → `base64url` (`no padding`); one-way arrows only |
| Challenge | double-outline pill at (540, 1355) | visibly different shape from the verifier cell |
| Authorization server | box 780×170 at (540, 1725), dim | brightens only on arrival; shows `challenge X · S256`, then quiets |

Colour carries attempt identity: A blue (`#4C9AFF`), B amber (`#F5A524`). Each object also carries its letter.

## Beats

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0.1–0.9 | Stage fades in | idle client, empty records, dim server | none |
| 1.2 | Row `attempt A` appears with an empty dashed slot | a transaction record exists | `store` C5 (attempt A) |
| 2.2–4.4 | `crypto random` lights; cells churn in blue | fresh randomness in progress | custom `shuffle` ticks every 0.14 s |
| 4.4 | Cells settle into pattern A; ripple | verifier A exists | `arrive` A5 (generator) |
| 4.4–6.0 | hold | | |
| 6.0–6.8 | `verifier A` chip lifts off and moves into row A | verifier kept with attempt A | `send` C6, then `store` C5 at 6.8 |
| 7.6 | Client boundary pulses; `stays in client` legend appears | retention is private to the client | `deliver` D4 (soft) |
| 7.6–9.6 | hold | | |
| 9.6–10.5 | A blue dot leaves row A (the row glows and stays) and enters `ASCII` | working input only; the record does not move | `send` C6, `arrive` G4 |
| 11.75–12.95 | `SHA-256` works (bar fills), `hash` label | hashed | `work` G3 ×6 |
| 13.4–14.65 | `base64url` activates; an `=` chip drops away; `no padding` | encoded without padding | `arrive` B4, `poof` at 13.9 |
| 15.15 | `challenge A` pill pops in | challenge derived; verifier A unchanged above | `chime` G5 |
| 15.15–17.35 | hold: verifier A in row, challenge A at output | two related values, one direction | |
| 17.35–18.45 | `challenge A` pill fades out (0.1 s), then the request card (`authorization request`, `challenge A`, `S256`) starts at 17.45 and crosses the boundary to the server; row A glows in place | only the challenge leaves; the pill and card never overlap | `send` C6 at 17.45 |
| 18.45 | Server lights blue: `challenge A · S256` | received; no reply, code or token | `arrive` C4 (loudest cue) |
| 18.45–20.85 | hold | | |
| 20.85 | Server, route and pipeline quiet | attempt A pending, record untouched | none |
| 21.65–22.15 | Row A slides down one slot, its content unchanged | room for a new record next to crypto random | (carried by the B cue below) |
| 22.0 | Row `attempt B` fades in in the top slot, above A | separate record | `store` E5 (attempt B) |
| 22.45–24.45 | Generator churns in amber | fresh randomness again | `shuffle` |
| 24.45 | Cells settle into pattern B, visibly different from A | distinct verifier | `arrive` A5 |
| 25.85–26.65 | `verifier B` chip moves down into row B, drawn above everything; it crosses only the `per-attempt records` legend, as verifier A did | own storage; row A stays fully visible and never crossed | `send` E6, `store` E5 |
| 27.35 / 27.95 | Row A, then row B, highlight | two records, two verifiers | `ack` C6 / `ack` E6 |
| 28.95–29.95 | Amber copy dot leaves row B's right end, runs down the lane beside the rows, then left beneath the records frame and into `ASCII` | B's input reaches S256 without crossing row A | `send` E6, `arrive` G4 at 29.95 |
| 29.95–33.3 | Same steps faster; `=` drops; `challenge B` | same transform, new input | `work` ×4, `arrive` B4, `poof`, `chime` G5 (softer) at 33.3 |
| 34.7–35.8 | `challenge B` pill fades, request card crosses to the server | only B's challenge leaves | `send` E6 at 34.8, `arrive` C4 at 35.8 |
| 35.8–37.7 | hold, then quiet | | |
| 38.4 / 39.0 | Final highlight of row A, then row B | each attempt keeps its own private verifier | `ack` C6 / `ack` E6 |
| 39.0–41.6 | hold on the resolved state | | silence |
| 41.6–42.4 | Stage fades; title remains to 42.6 | finite ending | none |

## Sound map

| Actor or event | Preset | Pitch |
|---|---|---|
| Attempt A record and sends | `store` / `send` / `ack` | C5, C6 |
| Attempt B record and sends | `store` / `send` / `ack` | E5, E6 |
| Crypto random churn | scene-defined `shuffle` (high-passed noise tick + short sine) | rotating 1976–2637 Hz |
| Crypto random settle | `arrive` | A5 |
| Private boundary | `deliver` | D4, soft |
| S256 steps | `arrive` G4 (ASCII), `work` G3 ticks (SHA-256), `arrive` B4 (base64url), `poof` (padding), `chime` G5 (challenge) | |
| Authorization server arrival | `arrive` | C4, loudest |

## Choices from the two plans

The two plans in `plans/02-plan-a.md` and `plans/02-plan-b.md` were combined. Each choice is listed with its source.

| Choice | Source | Reason |
|---|---|---|
| Explicit `crypto random` source label | A | names unpredictability without metaphor |
| Visible cell pattern that churns, then settles differently per attempt | B | makes "fresh" and "distinct" visible without fake strings |
| Dashed client boundary with `stays in client` | B | privacy through a software boundary |
| Named steps `ASCII` → `SHA-256` → `base64url` with `hash` and `no padding` | both | ordered steps instead of the full formula |
| `=` chip dropping away for padding | B | makes "no padding" concrete |
| `one-way` in the S256 legend, forward-only arrows | user brief; B for arrows | states one-way without a cipher or lock image |
| Double-outline pill for the challenge, solid cell for the verifier | A (double outline) + B (pill) | the two kinds of value look different |
| Request card with `challenge X` and an `S256` method chip | A | shows that the method travels with the challenge |
| Second attempt runs the full but faster pipeline and sends challenge B | B | reinforces "challenge leaves, verifier stays" per attempt |
| Thin row highlights A then B, with soft acks | A | shows two separate records without a comparison sign |
| `≠` badge between verifiers | B, not used | could read as the later comparison step |
| Attempt pitches C5 / E5 | B | attempts are audibly distinct |
| Finite ending with a stage fade | both | the story ends in a new state |
| Newest attempt takes the top slot: row A slides down intact, row B opens next to crypto random | repair after comparison review (02-decision.json) | verifier B reaches its own record without crossing or hiding behind record A, so separation is never in doubt |
