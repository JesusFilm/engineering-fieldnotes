# Lesson 03 — Save a useful record — plan B

Independent plan for the motion-v2 cut of memory-architecture lesson 03. Authored from the lesson entry in `video/memory-architecture/sequence/lessons.json` (item 3) and the concept content in `content/concepts/memory-architecture.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a write policy sits between what a session found and the shared store; each candidate record must fill the policy's fields (source, revision, scope, approval) before it is written; a candidate with no source goes back to thread state as a hypothesis, a candidate outside the store's scope is dropped, and the store ends with fewer records than the session proposed.**

The viewer should feel the form filling: the test command lights all four fields and is written with its revision; the guess stops at the first field and is sent back up; the preference clears the first field but fails on scope and leaves the frame. Three candidates in, one record out, and the counter says so.

Grounding (from the concept): "for each durable record, propose fields for repository, source path, source revision, owner, approval status, and replacement key"; "keep investigation hypotheses separate from approved conventions"; "limit writes to the appropriate identity and scope in application code"; the walkthrough keeps a guess about a flaky test in task state until someone validates it and stores the approved command under an explicit repository and purpose key; the pitfall is an unverified debugging guess becoming a shared rule after automatic summarization.

Out of scope: retrieval and revision checks on read (lessons 01 and later), correction of an existing record, write identity and authorization in detail (the `approved` field stands for it), retention and withdrawal, and inline versus background write timing. The cut ends with one record in the store and the counter visible.

Grammar for this cut: **a candidates list above, a four-field form in the middle, a store below, and three exits from the form: down to the store, back up the left margin, or off to the right.** The form's rows fill with the candidate's values and gain a check or an × in turn; the exit taken is the policy's decision. This differs from lesson 01 (a two-call timeline over a store band) and lesson 02 (stacked thread lists, a keyed shared store, and a restart), from the context-engineering, tool-design, and loop-engineering cuts, and from the harness-engineering views. Every element is a software object: a found fact, a policy field, a stored record, a counter.

Target length ≈ 31 s at playback. Authored at speed 1 for 28 s with `meta.speed: 0.9`. Lengthen the hold after the record is written and the hold after the guess is returned first if stills read fast. Do not add beats to reach the guideline.

Note on ordering: the lesson's teaching text checks the guess before saving the command. This cut passes the command through the form and writes it first, then shows the two rejections, so the viewer sees the form's full path once before seeing it stop early. The teaching text still applies beat by beat; only the order of the second and third ideas is swapped.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and the counter are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Memory architecture** / SAVE A USEFUL RECORD | engine title + subtitle |
| session | store, `rows: 3`, w 700 | (540, 640) | 700 × ≈ 200 (x 190–890, y ≈ 540–740); row centres y ≈ 575, 640, 705 | label `session · found` 40 px at (540, 500); rows 36 px mono | row0 `test cmd  npm test` fg · row1 `guess     skip flaky e2e` accent · row2 `pref      tabs > spaces` mid (max 24 characters ≈ 518 px) |
| badge | badge | (890, 705) | — | `thread only` accent | right end of the guess row; hidden until beat 3 |
| policy | store, `rows: 4`, w 620 | (540, 1010) | 620 × ≈ 260 (x 230–850, y ≈ 880–1140); row centres y ≈ 915, 980, 1045, 1110 | label `write policy` 40 px at (540, 840); rows 36 px mono | idle: `source    —` · `revision  —` · `scope     —` · `approved  —`; filled per candidate, e.g. `source    AGENTS.md` · `revision  r1` · `scope     billing` · `approved  owner` (max 19 characters ≈ 410 px) |
| store | store, `rows: 2`, w 700 | (540, 1400) | 700 × ≈ 140 (y ≈ 1330–1470) | label `shared store` 40 px at (540, 1290); rows 36 px mono, hidden until written | row0 `test_cmd  npm test @r1` ok · row1 `src  AGENTS.md · billing` mid (max 24 characters ≈ 518 px) |
| counter | label | (540, 1525) | 36 px mono, mid | `candidates 3 · stored 0` → `stored 1` | |

Checks and crosses are ripples with `mark` at (820, y_row) on the right edge of the form's rows, so the row text stays clear.

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| propose | session.bottom (540, 740) | policy.top (540, 880) | — | a candidate is proposed for retention |
| write | policy.bottom (540, 1140) | store.top (540, 1330) | — | an approved record is written; drawn `dashed` 1 at rest and solid only while a write passes |
| return | policy.left (230, 1010) | session.left (190, 640) | [80, 1010], [80, 640] | an unsupported candidate goes back to thread state |
| drop | policy.right (850, 1010) | [1010, 1010] | — | an out-of-scope candidate leaves; the chip fades at the end |

Three exits from one form make the decision legible by direction: down is kept, left is returned, right is dropped. Stage spans y ≈ 500–1540.

## Sound map

Pitches: session **C5**, policy **G5**, store **A5**. Pan by x: the `return` path left (`−0.6`), the `drop` path right (`+0.6`), everything else centre.

| event | preset | notes |
|---|---|---|
| candidates appear | `store` | C5, quiet, ×3 |
| a candidate is proposed | `send` C6, `arrive` G5 | |
| a field is satisfied | `ack` | G5, with a green check; the `approved` field uses `hit` |
| a field fails | `miss` | with a red ×; pan slightly toward the exit that follows |
| record written | `send` G6, `store` A5 ×2, `chime` | the brightest event |
| form resets | `poof` | quiet |
| candidate returned | `send` G6 (pan left), `ack` C5 | the badge `thread only` pops |
| candidate dropped | `send` G6 (pan right), `poof` | the chip fades at the frame's edge |
| counter pulses | `ack` | low (C4), quiet |
| stored record confirmed | `ack` | A5 |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The session proposes retaining the test command (0.0–7.5)** | | | |
| 0.0 | — | session rows hidden; policy rows idle `—`; store rows hidden; badge hidden; counter `candidates 3 · stored 0`; `write` dashed | — |
| 0.6 / 0.9 / 1.2 | session rows pop | three candidates | store × 3 (quiet) |
| 1.8 | session row0 pulses | — | — |
| 2.2–2.8 | chip `npm test` (fg) session.bottom → policy.top, 0.6 s | — | send C6 |
| 2.8 | ripple at policy.top | policy stroke → active | arrive G5 |
| 3.4 | policy row0 swaps; ok check at (820, 915) | `source    AGENTS.md` | ack G5 |
| 4.0 | row1 swaps; ok check at (820, 980) | `revision  r1` accent | ack G5 |
| 4.6 | row2 swaps; ok check at (820, 1045) | `scope     billing` | ack G5 |
| 5.2 | row3 swaps; ok check at (820, 1110) | `approved  owner` | hit |
| 5.6 | — | policy stroke → ok | — |
| 5.6–7.5 | hold | four fields, four checks | |
| **Beat 2 — Save it with its revision (7.5–11.5)** | | | |
| 7.5 | — | `write` wire `dashed` → 0, colour → ok | — |
| 7.5–8.1 | chip `npm test @r1` (ok) policy.bottom → store.top, 0.6 s | — | send G6 |
| 8.1 / 8.5 | store rows pop | `test_cmd  npm test @r1` ok · `src  AGENTS.md · billing` mid | store A5 × 2, chime |
| 8.9 | counter swaps and pulses | `candidates 3 · stored 1` | ack (low, quiet) |
| 9.2 | — | policy rows → `—`; policy stroke → mid; `write` wire → dashed, dim; session row0 → ok | poof (quiet) |
| 9.2–11.5 | hold | one record in the store with its revision and source | |
| **Beat 3 — A guess has no source; it stays a hypothesis (11.5–19.0)** | | | |
| 11.5 | session row1 pulses accent | — | — |
| 11.9–12.5 | chip `skip flaky e2e` (accent) session.bottom → policy.top, 0.6 s | — | send C6 |
| 12.5 | ripple at policy.top | policy stroke → active | arrive G5 |
| 13.1 | row0 flashes bad; bad ripple with × at (820, 915) | `source    —` bad | miss |
| 13.5 | — | rows 1–3 stay `—` dim; policy stroke → bad for 0.5 s then mid | — |
| 13.5–15.0 | hold | checked and stopped at the first field | |
| 15.0–16.2 | chip `skip flaky e2e` (accent) policy.left → via → session.left, 1.2 s | — | send G6 (pan left) |
| 16.2 | ripple at session.left | session row1 stays accent; badge pops `thread only` | ack C5 |
| 16.6 | — | policy row0 → `—` fg | — |
| 16.6–19.0 | hold | the guess is back where it came from, labelled | |
| **Beat 4 — Retain only what the policy allows (19.0–28.0)** | | | |
| 19.0 | session row2 pulses | — | — |
| 19.4–20.0 | chip `tabs > spaces` (mid) session.bottom → policy.top, 0.6 s | — | send C6 |
| 20.0 | ripple at policy.top | policy stroke → active | arrive G5 |
| 20.6 | row0 swaps; ok check at (820, 915) | `source    chat` mid | ack G5 (quiet) |
| 21.2 | row1 swaps; ok check at (820, 980) | `revision  —` mid (not applicable) | ack G5 (quiet) |
| 21.8 | row2 flashes bad; bad ripple with × at (820, 1045) | `scope     —` bad | miss (pan right) |
| 22.4–22.9 | chip `tabs > spaces` (mid) policy.right → [1010, 1010], 0.5 s, fading | — | send G6 (pan right) |
| 22.9 | grey ripple at (1010, 1010) | session row2 → dim; policy rows → `—`; stroke → mid | poof |
| 23.5 | counter pulses | still `candidates 3 · stored 1` | ack (low, quiet) |
| 23.9 | store row0 pulses ok | — | ack A5 |
| 23.9–26.5 | hold | final state: three candidates (one ok, one `thread only`, one dim), an idle form, one stored record, the counter | |
| 26.5–27.3 | — | `s.fade` to black, 0.8 s | — |
| 28.0 | end | finite ending | |

## Accuracy limits

- The candidates, field values, file name, and revision are illustrative, drawn from the concept's billing example. The policy's four fields are a shortened form of the concept's proposed record fields (repository, source path, source revision, owner, approval status, replacement key); the write-up carries the full list.
- `approved  owner` stands for approval status and the write being limited to an appropriate identity in application code. The cut does not show who approves or how identity is checked.
- The guess row's `thread only` badge follows the walkthrough's advice to keep a hypothesis in task state until validated. The cut does not show validation or later promotion.
- The preference candidate passes `source` (it came from the conversation) and fails `scope` because the store's scope is the billing repository's conventions. The judgement about what is in scope is the team's policy, not a property of stores.
- The store row shows a revision tag; checking that tag on read is a later lesson.
- The counter illustrates "more stored notes are not always better" with three candidates and one record; the ratio is not a recommendation.
- The `poof` preset marks the form resetting and the dropped candidate leaving, both of which are entries being removed, its documented meaning. The two `miss` sounds mark failed policy fields.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `7.0, 11.5, 15.5, 20.0, 25.5, 29.5` (speed-1 ≈ 6.3, 10.4, 14.0, 18.0, 23.0, 26.6). Tile with ffmpeg and view the row; view the 7.0 s (four checks) and 29.5 s (final) stills at full size and at 350 px wide. Pass when all session, policy, and store rows are readable at 350 px, the four checks sit at the form's right edge without covering text, the red × at 15.5 s is on the `source` row, the badge `thread only` is readable, and the counter is readable.
2. **Full path first**: at 7.0 s all four policy rows hold values with checks and the `write` wire is still dashed; at 11.5 s the store holds two rows, the counter reads `stored 1`, and the form is idle.
3. **Stopped at source**: at 15.5 s the form shows `source    —` in bad with an × and rows 1–3 idle; no check appears below the ×.
4. **Three exits**: the command leaves the form downward, the guess leftward, the preference rightward; no candidate takes two exits; the `write` wire is solid only during 7.5–9.2 s (speed 1).
5. **No lingering state**: no chip remains during any hold; the form is idle between candidates; the badge appears only once; the counter never reads `stored 2`.
6. **Overlap**: the `return` chip at x = 80 must stay inside the frame and clear of the session and policy panels' left edges (190 and 230); the `drop` chip must fade before x = 1040; marks at (820, y) must not collide with the form's right edge text (longest row ≈ 410 px, ending ≈ x 745). Rows at 36 px mono (24 characters ≈ 518 px) fit inside 700 px; policy rows (19 characters ≈ 410 px) fit inside 620 px with padding.
7. **Word budget**: on-screen text is three panel labels, three candidate rows, four policy rows, two store rows, the badge, and the counter. No sentence appears.
8. **Audio**: the Node dry-run lists ≈ 35 cues (3 stores, send/arrive, 3 acks, hit, send, 2 stores, chime, ack, poof, send/arrive, miss, send/ack, send/arrive, 2 acks, miss, send/poof, ack, ack). The spectrogram shows the `chime` at 8.5 s as the brightest event, two `miss` hits at 13.1 s and 21.8 s, and quiet holds between candidates. `ffprobe` reports ≈ 31 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: a top list with three rows; a chip drops into a middle form whose four rows fill with checks; a chip drops from the form into a bottom list that gains two rows while a counter changes; the form clears; a highlighted chip drops in, the first row flashes red with an ×, and the chip climbs back up the left margin to its row, which gains a tag; a grey chip drops in, two rows check, the third flashes red, and the chip leaves to the right and fades; the bottom list pulses green.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept memory-architecture`, then the full set before any release proposal. A new encode needs its own comparison review.

