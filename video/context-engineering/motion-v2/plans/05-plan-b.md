# Lesson 05 — Verify the patch — plan B

Independent plan for the motion-v2 cut of context-engineering lesson 05. Authored from the lesson entry in `video/context-engineering/sequence/lessons.json` (item 5) and the concept content in `content/concepts/context-engineering.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a claim about a patch becomes evidence only when the saved fixture runs against the actual changed revision and the real response is compared with the contract field by field; the result is then recorded together with that revision.**

The viewer should feel the gap between the claim card at the top (`claims: keeps total_cents`, badge `unverified`) and the evidence assembled below it: the fixture first makes sure it is pointed at the patched revision, calls the endpoint, and the actual response fills a column beside the contract's expected shape; check marks land row by row; only then does the badge flip to `verified @ b2` and a record row bind the result to the revision.

Grounding (from the concept): "preserve the contract reference, the unchanged field requirement, and a compatibility fixture; rerun that fixture against the actual patch"; the walkthrough's step 4 reopens the contract, inspects the current patch, and reruns the fixture, noting that "a green result only establishes what that fixture covers"; the outcome "separate a reported test result from a result reproduced on the current patch"; the pitfall of treating a summarized "tests pass" as current evidence after files have changed.

Out of scope: how the constraint reached the input (lessons 01–04), the edit itself, performance measurement of the latency fix (the concept says preserving a field does not establish an improvement), the engineer's acceptance decision, and anything after the record is written.

Grammar for this cut: **a claim card with a status badge, a two-column comparator with a check lane between the columns, a fixture calling an endpoint pinned to a revision, and a one-row record.** The comparator's left column is the contract's expected fields with types; the right column starts as dashes and fills from the live response. Checks land in the gap between the columns. The revision mismatch is a dot from the claim to the endpoint that finds `rev b1` and is corrected to `rev b2` before the call. This differs from lesson 01 (two lists and a receiver), 02 (scored results and bars), 03 (clients, response shape, diff), 04 (transcript, handoff card, repository), the loop-engineering cuts, and the harness-engineering views. Every element is a software object: a claim, a contract field, a response field, a request, a revision, a record.

Target length ≈ 31 s at playback. Authored at speed 1 for 27.5 s with `meta.speed: 0.9`. This sits under the 35–50 s guideline because the lesson has four beats and one correction; lengthen the hold after the three checks and the final hold first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and secondary labels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Context engineering** / VERIFY THE PATCH | engine title + subtitle |
| claim | box | (540, 590) | 700 × 150 (x 190–890, y 515–665) | label `patch b2` 44 px; sublabel `claims: keeps total_cents` 36 px mono (26 characters ≈ 562 px) | |
| badge | badge | (900, 520) | — | `unverified` mid → `verified @ b2` ok | top-right corner of the claim; verify right edge < 1070 |
| expected | store, `rows: 3`, w 440 | (280, 960) | 440 × ≈ 240 (x 60–500, y ≈ 860–1060); row centres y ≈ 900, 960, 1020 | labels `expected` 40 px at (280, 790) and `invoice-v1.md` 36 px mono at (280, 830); rows 36 px mono | row0 `"invoice"     int` · row1 `"total_cents" int` accent · row2 `"currency"    str` (max 17 characters ≈ 367 px) |
| actual | store, `rows: 3`, w 440 | (800, 960) | 440 × ≈ 240 (x 580–1020, y ≈ 860–1060) | labels `actual` 40 px at (800, 790) and `rev —` → `rev b2` 36 px mono at (800, 830); rows 36 px mono, `—` dim until filled | row0 `"invoice": 42` · row1 `"total_cents": 1250` · row2 `"currency": "NZD"` (max 19 characters ≈ 410 px) |
| fixture | box | (260, 1320) | 400 × 140 (x 60–460, y 1250–1390) | label `compat fixture` 40 px; sublabel `v1 response` 36 px | the caller |
| endpoint | box | (800, 1320) | 440 × 140 (x 580–1020, y 1250–1390) | label `GET /invoice/42` 40 px mono (15 characters ≈ 360 px); sublabel `rev b1` → `rev b2` 36 px mono | the code under test, pinned to a revision |
| record | store, `rows: 1`, w 560 | (540, 1560) | 560 × ≈ 90 (x 260–820, y ≈ 1515–1605) | label `record` 40 px at (540, 1475); row 36 px mono, hidden until written | row0 `rev b2 · fixture ok` ok (19 characters ≈ 410 px) |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| rev | claim.right (890, 590) | endpoint.right (1020, 1320) | [1060, 590], [1060, 1320] | the claim's revision is checked against the code the fixture will call |
| call | fixture.right (460, 1320) | endpoint.left (580, 1320) | — | the fixture's request (120 px gap) |
| resp | endpoint.top (800, 1250) | actual.bottom (800, 1060) | — | the real response fills the actual column |
| log | endpoint.bottom (800, 1390) | record.top (540, 1515) | [800, 1455], [540, 1455] | the result is written with the revision |

Check marks are ripples with `mark: 'check'` at (540, y) for each row's y; no wire runs through the gap, so the marks are the only thing that appears there. The `rev` wire runs in the right margin at x = 1060; the badge at (900, 520) is clear of it. Stage spans y ≈ 515–1605.

## Sound map

Pitches: claim **C5**, expected **G5**, actual **C6**, fixture **A5**, endpoint **E5**, record **G6**. Pan by x: expected and fixture left (`−0.5`), actual and endpoint right (`+0.5`), claim and record centre.

| event | preset | notes |
|---|---|---|
| claim appears | `ack` | C5 |
| claim's sublabel noted | `ack` | C6, quiet |
| badge `unverified` | `ack` | low (C4), quiet |
| expected rows appear | `store` | quiet, pan left, ×3 |
| the field row noted | `ack` | G5 |
| revision check leaves | `send` | C6 |
| wrong revision found | `miss` | gain ×0.7, pan right; the one negative sound |
| revision corrected | `clock` then `ack` E5 | the label changes in place |
| request leaves and lands | `send` A6, `arrive` E5 | |
| endpoint works | `work` | ×5 at 0.2 s, pan right |
| response leaves and lands | `send` E6, `arrive` C6 | |
| actual rows fill | `store` | pan right, ×3 |
| row matches | `hit` | quiet for rows 0 and 2; full gain for the `total_cents` row |
| both columns agree | `ack` G5 + `ack` C6 | together |
| result leaves and is written | `send` E6, `store` G6 | |
| badge flips to verified | `chime` | the brightest event |
| claim box settles | `deliver` | high, quiet |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The claim still needs evidence (0.0–5.5)** | | | |
| 0.0 | — | expected rows hidden; actual rows `—` dim with sublabel `rev —`; record hidden; endpoint sublabel `rev b1` mid; badge hidden | — |
| 0.6 | claim pops (scale 0.9 → 1) | — | ack C5 |
| 1.2 | claim sublabel pulses accent | sublabel colour accent → fg over 0.6 s | ack C6 (quiet) |
| 1.6 | badge pops | `unverified` mid | ack (low, quiet) |
| 2.4–3.0 | expected rows pop (0.2 s each) | three rows fg | store × 3 (quiet) |
| 3.4 | expected row1 pulses | row1 → accent | ack G5 |
| 3.4–5.5 | hold | the claim above, the contract below, nothing on the right | |
| **Beat 2 — Run the fixture against the actual changed code (5.5–13.5)** | | | |
| 5.5–6.5 | dot (fg) claim.right → via → endpoint.right, 1.0 s | — | send C6 |
| 6.5 | bad ripple with × at endpoint.right | endpoint sublabel `rev b1` flashes bad | miss |
| 7.3 | endpoint sublabel pulses | sublabel text → `rev b2`, colour accent → fg over 0.6 s | clock, ack E5 |
| 7.3–8.5 | hold | the code under test is now the patched revision | |
| 8.5 | fixture pulses | — | — |
| 8.5–9.1 | chip `GET /invoice/42` (fg) fixture.right → endpoint.left, 0.6 s | — | send A6 |
| 9.1 | ripple at endpoint.left | endpoint stroke → active with glow | arrive E5 |
| 9.3–10.3 | — | glow held | work × 5 |
| 10.5–11.1 | chip `200` (ok) endpoint.top → actual.bottom, 0.6 s | endpoint glow off | send E6 |
| 11.1 | ripple at actual.bottom | actual sublabel → `rev b2` accent | arrive C6 |
| 11.1 / 11.5 / 11.9 | actual rows fill (text swap with 0.25 s alpha) | row0 `"invoice": 42` · row1 `"total_cents": 1250` · row2 `"currency": "NZD"` fg | store × 3 |
| 11.9–13.5 | hold | expected and actual side by side, no marks yet | |
| **Beat 3 — The response still has the field (13.5–19.0)** | | | |
| 13.5 | expected row0 and actual row0 flash fg | ok ripple with check at (540, 900), r1 ≈ 36 | hit (quiet) |
| 14.5 | expected row1 and actual row1 flash accent | ok ripple with check at (540, 960), r1 ≈ 56; both row1 → ok | hit (full) |
| 15.5 | expected row2 and actual row2 flash fg | ok ripple with check at (540, 1020), r1 ≈ 36 | hit (quiet) |
| 16.0 | — | expected and actual strokes → ok | ack G5, ack C6 |
| 16.0–19.0 | hold | three checks in the gap; the field row green on both sides | |
| **Beat 4 — Keep the result with the revision (19.0–27.5)** | | | |
| 19.0–19.8 | dot (ok) endpoint.bottom → via → record.top, 0.8 s | — | send E6 |
| 19.8 | ripple at record.top | record row0 → `rev b2 · fixture ok` ok | store G6 |
| 20.3 | badge pops with overshoot | badge text → `verified @ b2`, colour ok | chime |
| 20.7 | claim pulses ok | claim stroke → ok; sublabel stays `claims: keeps total_cents` | deliver (high, quiet) |
| 20.7–26.0 | hold | final state: verified claim, green comparator with three checks, endpoint at `rev b2`, one record row | |
| 26.0–26.8 | — | `s.fade` to black, 0.8 s | — |
| 27.5 | end | finite ending | |

## Accuracy limits

- The contract rows, response values, endpoint path, and revision names are illustrative, drawn from the concept's invoice example. The expected column shows field name and type as a simplified contract; real contracts carry more (nullability, units, versions), and the write-up names what the fixture asserts.
- The comparator checks presence and type for three fields. A green result establishes only what that fixture covers, as the concept states; the cut makes no claim about other behaviour, other endpoints, or performance.
- The `rev b1` → `rev b2` correction stands for "run it against the actual changed code". It is a teaching device for the pitfall of reusing an earlier result; it does not represent a particular tool's revision pinning.
- `200` on the response chip is an HTTP status used as a short chip; the comparison is about the body, not the status.
- The record row binds the result to `rev b2` with the fixture's name; real records also carry the command, time, and environment. The write-up carries the full record.
- The claim box's sublabel does not change when verified: the claim stays a claim; the badge and the record are the evidence. This is deliberate and matches the takeaway that context reduces ambiguity while verification closes the gap.
- No `poof` is used in this cut. The quiet `miss` at 6.5 s is the only negative sound and marks a mismatch, not a failure of the patch.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `5.0, 8.9, 14.5, 19.5, 26.0, 30.0` (speed-1 ≈ 4.5, 8.0, 13.0, 17.5, 23.4, 27.0). Tile with ffmpeg and view the row; view the 14.5 s (filled comparator) and 19.5 s (three checks) stills at full size and at 350 px wide. Pass when all six comparator rows are readable at 350 px, the two secondary labels (`invoice-v1.md`, `rev b2`) are readable, the endpoint's `rev b2` is readable, the three check marks are visible in the gap with the middle one larger, the badge text is readable at both states, and the record row is readable.
2. **Claim before evidence**: at 5.0 s the badge reads `unverified` and the actual column is dashes; the badge does not change until after the third check (speed-1 20.3 s follows 15.5 s).
3. **Actual revision first**: the endpoint sublabel reads `rev b2` from 7.3 s (speed 1) onward and before the request leaves at 8.5 s; at 8.9 s (playback) it is `rev b2` and the request chip is in flight or just landed.
4. **Checks in order**: the three ripples appear top to bottom, one second apart; at 19.5 s all three have faded but both row1 cells are ok and both strokes are ok.
5. **No lingering state**: no chip remains during any hold; the `×` ripple at the endpoint is gone before the request leaves; the record row is hidden until 19.8 s (speed 1).
6. **Overlap**: the `rev` dot's path at x = 1060 must stay inside the frame and clear of the badge; the `GET /invoice/42` chip must fit the 120 px gap (let it fade on both ends or shorten to `GET` if not); the `200` chip must clear the `actual` labels; check ripples at r1 ≤ 56 must not reach either column's text (gap is 80 px from x 500 to 580, so ripples will overlap the panel edges slightly; confirm the row text stays clear). Rows at 36 px mono (19 characters ≈ 410 px) fit inside 440 px with padding.
7. **Word budget**: on-screen text is the claim label and sublabel, the badge, four comparator labels and six rows, the fixture label and sublabel, the endpoint label and sublabel, and the record label and row. No sentence appears.
8. **Audio**: the Node dry-run lists ≈ 35 cues (3 acks, 3 stores, ack, send, miss, clock/ack, send/arrive, 5 works, send/arrive, 3 stores, 3 hits, 2 acks, send/store, chime, deliver). The spectrogram shows the `miss` at 6.5 s as the only low falling event, the full `hit` at 14.5 s louder than its neighbours, and the `chime` at 20.3 s as the brightest. `ffprobe` reports ≈ 31 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: a top card with a grey tag; a left column fills; a dot runs down the right margin to the bottom-right box, which flashes red and then changes its lower line; the bottom-left box sends to the bottom-right box, which works and sends up to the right column, which fills; three marks land between the columns, the middle one larger, and both columns turn green; the bottom-right box sends down to a one-row panel; the grey tag turns green.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept context-engineering`, then the full set before any release proposal. A new encode needs its own comparison review.

