# Lesson 04 — Check applicability — plan B

Independent plan for the motion-v2 cut of memory-architecture lesson 04. Authored from the lesson entry in `video/memory-architecture/sequence/lessons.json` (item 4) and the concept content in `content/concepts/memory-architecture.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a retrieved note can be relevant and still not apply; an application-side check compares the note's recorded revision with the checkout's current revision, rejects the note for this task on mismatch, reads the current repository instructions instead, and supplies the model only what passed the check.**

The viewer should feel two tags side by side in one box: `note r1` against `checkout r2`, a red × between them, the note's card fading; then a card from the checkout's own file arriving with `r2`, the two tags matching, a green check, and that card alone travelling down to the model.

Grounding (from the concept): "a billing service whose approved test command changes from `npm test` at revision `r1` to `pnpm test` at `r2`. A new agent session retrieves the old r1 note. The note is relevant to the task but no longer applicable to this checkout. An application-side revision check rejects that candidate, reads the current repository instructions, and supplies r2"; "this deliberately implemented check … is not an automatic feature of every memory store"; the walkthrough's step 3: "compare the recorded source revision with the current source. A mismatch means re-read and review, not that the command is necessarily wrong."

Out of scope: how the note was written (lesson 03), correcting the stored record and refreshing active sessions (a later lesson), similarity search ranking, and running the test. The cut ends when the model holds the applicable command.

Grammar for this cut: **a checkout at the top, a memory store on the left, a revision check box on the right with two tag rows and a mark lane, an input list below, and the model at the bottom.** The check box is the only place where two revisions are seen together. Stale and current cards both arrive there; only the one that matches leaves downward. This differs from lesson 01 (two-call timeline over a store band), lesson 02 (stacked threads with a restart), and lesson 03 (a four-field write form with three exits), from the context-engineering, tool-design, and loop-engineering cuts, and from the harness-engineering views. Every element is a software object: a checkout revision, a stored note, a revision tag, an instruction file, a model input.

Target length ≈ 33 s at playback. Authored at speed 1 for 30 s with `meta.speed: 0.9`. Lengthen the hold on the mismatch and the hold after the match first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and badges are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Memory architecture** / CHECK APPLICABILITY | engine title + subtitle |
| checkout | box | (540, 580) | 620 × 150 (x 230–850, y 505–655) | label `checkout · billing` 40 px; sublabel `rev r2 · AGENTS.md` 36 px mono accent | the current source |
| store | store, `rows: 2`, w 400 | (240, 940) | 400 × ≈ 140 (x 40–440, y ≈ 870–1010); row centres y ≈ 905, 975 | label `memory store` 40 px at (240, 830); rows 36 px mono | row0 `test_cmd  npm test` · row1 `rev       r1` (18 characters ≈ 389 px) |
| check | store, `rows: 2`, w 480 | (800, 940) | 480 × ≈ 140 (x 560–1040, y ≈ 870–1010); same row y's | label `revision check · app` 40 px at (800, 830) (20 characters ≈ 480 px at 40 px mono; shorten to `rev check · app` if clipped); rows 36 px mono | row0 `note      —` · row1 `checkout  —`; fill with `r1`/`r2` then `r2`/`r2` |
| badge | badge | (1000, 830) | — | `stale` bad → `current` ok | right of the check label; hidden until the first comparison; verify right edge < 1070 |
| input | store, `rows: 2`, w 700 | (540, 1300) | 700 × ≈ 140 (x 190–890, y ≈ 1230–1370) | label `input` 40 px at (540, 1190); rows 36 px mono, hidden until supplied | row0 `test cmd  pnpm test` ok · row1 `source    AGENTS.md @r2` mid (22 characters ≈ 475 px) |
| model | box | (540, 1560) | 480 × 130 (x 300–780, y 1495–1625) | label `model` 44 px; sublabel 36 px mono `waiting` → `runs pnpm test` | |

Marks are ripples with `mark` at (1010, 940), on the check box's right edge between its two rows.

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| retrieve | store.right (440, 940) | check.left (560, 940) | — | the retrieved note reaches the check (120 px) |
| read | checkout.bottom (540, 655) | check.top (800, 870) | [540, 750], [800, 750] | the checkout's revision, and later its instruction file, reach the check |
| supply | check.bottom (800, 1010) | input.top (540, 1230) | [800, 1120], [540, 1120] | only what passed the check is supplied |
| feed | input.bottom (540, 1370) | model.top (540, 1495) | — | the input reaches the model |

Nothing connects the store to the input or the model directly: every record passes the check box. Stage spans y ≈ 505–1625.

## Sound map

Pitches: checkout **C6**, store **E5**, check **G5**, input **A5**, model **C5**. Pan by x: store left (`−0.5`), check right (`+0.5`), the rest centre.

| event | preset | notes |
|---|---|---|
| checkout appears, revision noted | `ack` C6, then `ack` C6 (quiet) on the sublabel | |
| store rows appear | `store` | E5, quiet, ×2 |
| note retrieved | `send` E6, `arrive` G5 | |
| a tag row fills | `store` | G5 |
| checkout revision read | `send` C6 (quiet), `store` G5 | |
| tags compared | `ack` | G5, quiet, both rows flash |
| mismatch | `miss` | pan right; red × in the mark lane; badge `stale` |
| stale note rejected for this task | `poof` | the card fades; the store rows dim |
| instruction file read | `send` C6, `arrive` G5 | |
| match | `hit` | green check in the mark lane; badge `current` |
| supplied to the input | `send` G6, `store` A5 ×2 | |
| model receives | `send` A6, `arrive` C5, `chime` | the brightest event |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — A saved note at r1; a checkout at r2 (0.0–6.0)** | | | |
| 0.0 | — | store rows hidden; check rows `—`; input rows hidden; badge hidden; model `waiting` | — |
| 0.6 | checkout pops | — | ack C6 |
| 1.2 | checkout sublabel pulses | `rev r2 · AGENTS.md` accent | ack C6 (quiet) |
| 2.0 / 2.3 | store rows pop | `test_cmd  npm test` · `rev       r1` fg | store × 2 (quiet) |
| 2.8 | store row1 pulses | `r1` | — |
| 2.8–6.0 | hold | two revisions on screen, in two places | |
| **Beat 2 — Retrieval returns the relevant old note; compare revisions (6.0–13.0)** | | | |
| 6.0–6.6 | chip `npm test @r1` (fg) store.right → check.left, 0.6 s | — | send E6 |
| 6.6 | ripple at check.left | check row0 → `note      r1` | arrive G5, store G5 |
| 7.4–8.2 | dot (accent) checkout.bottom → via → check.top, 0.8 s | — | send C6 (quiet) |
| 8.2 | ripple at check.top | check row1 → `checkout  r2` accent | store G5 |
| 9.0 | both check rows flash | — | ack G5 (quiet) |
| 9.4 | bad ripple with × at (1010, 940) | check stroke → bad; badge pops `stale` bad | miss |
| 9.4–13.0 | hold | `r1` over `r2` with a red × beside them | |
| **Beat 3 — Reject the stale command; read the current instructions (13.0–20.5)** | | | |
| 13.0 | — | check row0 → `note      —` (text fades 0.3 s); store rows → alpha 0.5 (relevant, not applicable here); check stroke → mid | poof |
| 13.0–14.5 | hold | | |
| 14.5 | checkout sublabel pulses accent | `AGENTS.md` is about to be read | — |
| 14.5–15.3 | chip `AGENTS.md @r2` (accent) checkout.bottom → via → check.top, 0.8 s | — | send C6 |
| 15.3 | ripple at check.top | check row0 → `note      r2` accent (the file's own revision) | arrive G5, store G5 |
| 16.0 | both check rows flash | — | ack G5 (quiet) |
| 16.4 | ok ripple with check at (1010, 940) | check stroke → ok; badge → `current` ok | hit |
| 16.4–18.5 | hold | `r2` over `r2` with a green check | |
| 18.5–20.5 | hold (continued) | the application chose by revision, in its own code | |
| **Beat 4 — Supply pnpm test from r2 (20.5–30.0)** | | | |
| 20.5–21.5 | chip `pnpm test @r2` (ok) check.bottom → via → input.top, 1.0 s | — | send G6 |
| 21.5 / 21.9 | input rows pop | `test cmd  pnpm test` ok · `source    AGENTS.md @r2` mid | store A5 × 2 |
| 22.7–23.2 | chip `input` (ok) input.bottom → model.top, 0.5 s | — | send A6 |
| 23.2 | ok ripple at model.top | model stroke → ok with glow; sublabel → `runs pnpm test` ok | arrive C5, chime |
| 23.8 | store rows pulse once at alpha 0.5 | the old note is still stored; it was not used | — |
| 23.8–28.5 | hold | final state: checkout at r2, dimmed r1 note, check showing r2/r2 with `current`, input with command and source, lit model | |
| 28.5–29.3 | — | `s.fade` to black, 0.8 s | — |
| 30.0 | end | finite ending | |

## Accuracy limits

- The commands, revisions, repository, and file name are illustrative, drawn from the concept's billing example. `AGENTS.md` stands for the repository's current instruction file; the concept says "reads the current repository instructions" without naming a file.
- The revision check is shown inside a box labelled `revision check · app` to carry the takeaway that it is deliberately implemented in application code and not a feature of memory stores. The cut does not show how the checkout's revision is obtained or how the file's revision is recorded.
- A mismatch means "re-read and review", per the walkthrough; the cut shows the re-read and a match, not a case where the old command turns out to still be right.
- The stale note stays in the store at reduced alpha. Correcting or replacing it, and refreshing sessions that already hold it, are a later lesson; this cut shows one task declining to use it.
- `note      r2` after the file read labels the instruction file's revision in the same row where the note's revision was, so the two comparisons use the same two rows. In a real check the second candidate comes from a different source than the first; the row text carries that only through the chip's label.
- Supplying `pnpm test` establishes that the model has the applicable command, not that the tests pass or cover the change.
- The `poof` preset marks the stale card being removed from the check, its documented meaning. The `miss` marks the mismatch.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `5.5, 12.5, 15.5, 20.0, 27.0, 32.0` (speed-1 ≈ 5.0, 11.3, 14.0, 18.0, 24.3, 28.8). Tile with ffmpeg and view the row; view the 12.5 s (mismatch) and 20.0 s (match) stills at full size and at 350 px wide. Pass when the checkout sublabel, both store rows, both check rows, the badge, both input rows, and the model sublabel are readable at 350 px, the × at 12.5 s and the check at 20.0 s are visible in the mark lane, and the dimmed store rows at 27.0 s are distinguishable from full rows.
2. **Two revisions together**: at 12.5 s the check reads `note      r1` over `checkout  r2` with a red × and `stale`; nothing has reached the input.
3. **Re-read before supply**: at 15.5 s the check's note row is `—`, the store is dim, and the `AGENTS.md @r2` chip is in flight or just landed; at 20.0 s the check reads `r2`/`r2` with a green check and `current`, and the input is still empty.
4. **Only the current command is supplied**: the input rows read `pnpm test` and `AGENTS.md @r2`; at no time does `npm test` appear in the input or on the `supply` wire.
5. **No lingering state**: no chip remains during any hold; the badge shows one state at a time; the mark lane shows one mark at a time.
6. **Overlap**: the `retrieve` chip must fit the 120 px gap (fade at both ends if needed); the `read` dot and chip must not cross the `revision check · app` label except at arrival (they enter at the box's top edge at x = 800, left of the label's right end; shift the label to (780, 830) if they collide); the badge at (1000, 830) must clear the label's right end (check width and shorten the label as noted). Rows at 36 px mono (22 characters ≈ 475 px) fit inside 700 px; store and check rows (18 characters ≈ 389 px) fit inside 400 and 480 px with padding.
7. **Word budget**: on-screen text is the checkout label and sublabel, three panel labels, two store rows, two check rows, the badge, two input rows, and the model label and sublabel. No sentence appears.
8. **Audio**: the Node dry-run lists ≈ 26 cues (2 acks, 2 stores, send/arrive/store, send/store, ack, miss, poof, send/arrive/store, ack, hit, send, 2 stores, send/arrive/chime). The spectrogram shows the `miss` at 9.4 s as the only low falling event, the `hit` at 16.4 s, and the `chime` at 23.2 s as the brightest. `ffprobe` reports ≈ 33 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: a top box with a highlighted line; a left list of two rows; a chip hops from the left list into a right box whose first row fills; a dot drops from the top box into the right box whose second row fills; a red × appears beside the two rows and a red tag pops; the first row blanks and the left list dims; a highlighted chip drops from the top box into the right box, its first row fills again, a green check appears and the tag turns green; a chip runs down to a bottom list that fills two rows and on to a bottom box that lights green; the dim left list pulses once.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept memory-architecture`, then the full set before any release proposal. A new encode needs its own comparison review.

