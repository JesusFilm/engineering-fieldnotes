# Lesson 05 — Correct outdated memory — plan B

Independent plan for the motion-v2 cut of memory-architecture lesson 05. Authored from the lesson entry in `video/memory-architecture/sequence/lessons.json` (item 5) and the concept content in `content/concepts/memory-architecture.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **when the authoritative source changes, the owner corrects memory by marking the old record superseded (keeping it, with its revision explicit) and storing a new record for the new revision linked to the old one; a later session retrieving by key receives the version that matches its revision and still validates it against its own checkout.**

The viewer should feel the chain forming under one key: the old card stays on screen but changes its status from `active` to `superseded`, a new card appears below it, a link joins them, and a later session reads the lower card only. The old card is never deleted; it is history that explains the correction.

Grounding (from the concept): "treat shared agent memory as maintained engineering data, with a named owner and a correction path"; proposed record fields include source revision, owner, approval status, and replacement key; "limit writes to the appropriate identity and scope in application code"; the walkthrough's step 4: "publish a corrected record and refresh affected active contexts before the next relevant action"; the takeaway: removing stale applicability is different from pretending the old note was never valid.

Out of scope: refreshing an active session that already holds the old instruction (the walkthrough's refresh path; the cut shows a later session only), retention and withdrawal of checkpoints and backups, write timing (inline versus background), and the detailed access check (the owner is the only writer shown, and a label states it). The cut ends when the later session holds the validated current command.

Grammar for this cut: **a source file at the top, two record cards stacked under one key with a link between them, an owner on the left who writes, and a later session at the bottom who reads.** Status is carried in each card's second row; the link is a wire that appears when the old card is superseded; the write path is from the owner only. This differs from lesson 01 (two-call timeline over a store band), lesson 02 (stacked threads with a restart), lesson 03 (a four-field write form with three exits), and lesson 04 (a revision check with two tag rows), from the context-engineering, tool-design, and loop-engineering cuts, and from the harness-engineering views. Every element is a software object: a source revision, a stored record with a status, a replacement link, an owner, a session.

Target length ≈ 33 s at playback. Authored at speed 1 for 30 s with `meta.speed: 0.9`. Lengthen the hold after the old card is marked superseded and the hold after the chain is complete first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and the writes label are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Memory architecture** / CORRECT OUTDATED MEMORY | engine title + subtitle |
| source | box | (540, 580) | 620 × 150 (x 230–850, y 505–655) | label `AGENTS.md` 40 px mono; sublabel 36 px mono `r1  npm test` → `r2  pnpm test` accent | the authoritative instruction file |
| storelab | label | (600, 745) | 40 px mono | `memory store · key test_cmd` (27 characters ≈ 648 px) | spans both cards |
| writes | label | (170, 880) | 36 px mono, mid | `writes: owner` | above the owner box |
| recA | store, `rows: 2`, w 560 | (600, 870) | 560 × ≈ 140 (x 320–880, y ≈ 800–940) | rows 36 px mono | row0 `test_cmd  npm test` · row1 `rev r1 · active` ok → `rev r1 · superseded` mid (19 characters ≈ 410 px) |
| badge | badge | (880, 800) | — | `outdated` bad | top-right of recA; appears when the source changes, disappears when superseded |
| recB | store, `rows: 2`, w 560 | (600, 1130) | 560 × ≈ 140 (x 320–880, y ≈ 1060–1200) | rows 36 px mono, hidden until stored | row0 `test_cmd  pnpm test` · row1 `rev r2 · active` ok |
| owner | box | (170, 1000) | 260 × 130 (x 40–300, y 935–1065) | label `owner` 40 px; sublabel 36 px `billing team` | the only writer |
| session | box | (540, 1420) | 560 × 140 (x 260–820, y 1350–1490) | label `session · r2` 40 px mono; sublabel 36 px mono `reads test_cmd` → `pnpm test · validated` | a later reader at checkout r2 |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| change | source.bottom (540, 655) | recA.top (600, 800) | [540, 730], [600, 730] | the source change is what makes the record outdated; used once by a dot |
| writeA | owner.right (300, 1000) | recA.left (320, 870) | — | the owner marks the old record |
| writeB | owner.right (300, 1000) | recB.left (320, 1130) | — | the owner stores the new record |
| link | recA.bottom (600, 940) | recB.top (600, 1060) | — | `replaced_by`: hidden (alpha 0) until the supersede, then accent with a brief `flow` |
| retrieve | session.top (540, 1350) | recB.bottom (600, 1200) | [540, 1280], [600, 1280] | the later session reads the matching version; nothing connects the session to recA |

The two write wires fan out from the owner so both cards are visibly reached from one writer. The session's wire reaches the lower card only, which is the retrieval choosing the matching version. Stage spans y ≈ 505–1490.

## Sound map

Pitches: source **C6**, record A **E5**, record B **G5**, owner **A5**, session **C5**. Pan by x: owner left (`−0.6`), cards slightly right (`+0.15`), source and session centre.

| event | preset | notes |
|---|---|---|
| source appears | `ack` | C6 |
| source revision changes | `clock` then `ack` C6 | the sublabel swaps in place |
| record A outdated | `miss` | gain ×0.6; badge `outdated` pops |
| owner acts | `send` | A6, pan left |
| record marked superseded | `ack` | E5, low gain; the status row swaps; no `poof`, because nothing is removed |
| revision kept explicit | `ack` | E5, quiet; the `r1` pulses |
| new record stored | `store` G5 ×2 | |
| link appears | `ack` | G5, with a brief flow on the link |
| chain complete | `chime` | the brightest event |
| session appears | `ack` | C5 |
| session reads by key | `send` C6, `arrive` G5 | record B pulses; record A does not |
| version returned | `store` | C5 |
| validated against the checkout | `hit` | green check ripple at the session |
| settled | `deliver` | high, quiet |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The authoritative command changed; the stored note is outdated (0.0–7.0)** | | | |
| 0.0 | — | source sublabel `r1  npm test`; recA rows present (`npm test`, `rev r1 · active` ok); recB hidden; link hidden; badge hidden; session hidden | — |
| 0.6 | source pops | — | ack C6 |
| 1.2 | recA row1 pulses ok | — | — |
| 2.0 | source sublabel pulses, swaps | `r2  pnpm test` accent | clock, ack C6 |
| 2.6–3.2 | dot (accent) source.bottom → via → recA.top, 0.6 s | — | — |
| 3.2 | ripple at recA.top | recA row1 → `rev r1 · active` bad flash; badge pops `outdated` bad; recA stroke → bad | miss |
| 3.2–7.0 | hold | the source says r2; the store still says r1 is active | |
| **Beat 2 — Mark the old record superseded; keep its revision explicit (7.0–13.0)** | | | |
| 7.0 | owner pulses; `writes: owner` label pulses | — | send A6 |
| 7.0–7.6 | chip `supersede` (fg) owner.right → recA.left, 0.6 s | — | — |
| 7.6 | ripple at recA.left | recA row1 → `rev r1 · superseded` mid; recA stroke → mid; badge scale → 0 | ack E5 |
| 8.4 | recA row1's `r1` pulses fg | the revision stays legible | ack E5 (quiet) |
| 8.4–13.0 | hold | the old card is still there, labelled for what it is | |
| **Beat 3 — Store the current command and source (13.0–20.0)** | | | |
| 13.0 | owner pulses | — | send A6 |
| 13.0–13.6 | chip `store` (accent) owner.right → recB.left, 0.6 s | — | — |
| 13.6 / 14.0 | recB rows pop | `test_cmd  pnpm test` · `rev r2 · active` ok; recB stroke → ok | store G5 × 2 |
| 14.6 | `link` alpha → 1, colour accent, `flow` → 1 for 0.8 s; chip `replaced_by` (accent) recA.bottom → recB.top, 0.5 s | the old record points at its replacement | ack G5 |
| 15.4 | — | `link` `flow` → 0, colour → fg | — |
| 15.8 | recA and recB pulse together | — | chime |
| 15.8–20.0 | hold | one key, two versions, one link, one active | |
| **Beat 4 — Later retrieval selects the matching version and still validates (20.0–30.0)** | | | |
| 20.0 | session pops | `session · r2`, sublabel `reads test_cmd` | ack C5 |
| 20.8–21.6 | dot (fg) session.top → via → recB.bottom, 0.8 s | — | send C6 |
| 21.6 | ripple at recB.bottom | recB pulses ok; recA stays mid (not selected) | arrive G5 |
| 22.2–23.0 | chip `pnpm test @r2` (ok) recB.bottom → via → session.top, 0.8 s | — | — |
| 23.0 | ripple at session.top | session stroke → active | store C5 |
| 23.6 | ok ripple with check at session.right (820, 1420) | sublabel → `pnpm test · validated` ok; session stroke → ok | hit |
| 24.2 | — | source sublabel pulses once (the same `r2`) | deliver (quiet) |
| 24.2–28.5 | hold | final state: source at r2, superseded r1 card above an active r2 card with a link, owner idle, session validated | |
| 28.5–29.3 | — | `s.fade` to black, 0.8 s | — |
| 30.0 | end | finite ending | |

## Accuracy limits

- The commands, revisions, file name, and owner are illustrative, drawn from the concept's billing example. `AGENTS.md` stands for the repository's authoritative instruction file.
- `superseded` and `replaced_by` render the concept's proposed approval status and replacement key fields. The cut does not prescribe field names or a storage schema.
- The owner is shown as the only writer, with a `writes: owner` label, to carry "memory needs maintenance and access controls". How identity is checked is not shown; the concept says writes are limited in application code.
- The later session validates the returned version against its own checkout (`r2` = `r2`). The cut does not show a mismatch case; that is lesson 04.
- Refreshing an active session that already holds `npm test` is part of the walkthrough's correction path and is not shown; this cut shows a session that starts after the correction.
- Keeping the superseded record is the lesson's point about history; retention policy for how long it stays, and what happens to checkpoints and backups, are in the write-up.
- No `poof` is used: nothing is deleted in this cut. The one `miss` marks the record becoming outdated when the source changes.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `6.0, 12.0, 19.5, 24.5, 29.5, 32.0` (speed-1 ≈ 5.4, 10.8, 17.6, 22.1, 26.6, 28.8). Tile with ffmpeg and view the row; view the 12.0 s (superseded) and 19.5 s (chain complete) stills at full size and at 350 px wide. Pass when the source sublabel, both cards' rows, the store label, the writes label, the owner label, and the session sublabel are readable at 350 px, the `superseded` card is distinguishable from the `active` card by colour, the link between the cards is visible at 19.5 s and after, and the badge is readable at 6.0 s.
2. **Outdated before superseded**: at 6.0 s the source reads `r2  pnpm test` and recA reads `rev r1 · active` with the `outdated` badge; recB is absent.
3. **Kept, not deleted**: at 12.0 s and every later still recA is present with `rev r1 · superseded`; its row count is two throughout; the badge is gone from 7.6 s (speed 1) onward.
4. **One writer, two cards**: both write chips originate at the owner; no chip travels from the session to either card except the `retrieve` dot to recB.
5. **Matching version only**: at 24.5 s recB has pulsed and recA has not; the returned chip reads `pnpm test @r2`; the session's check ripple appears after the chip lands (speed-1 23.0 → 23.6).
6. **No lingering state**: no chip remains during any hold; the `link` flow stops by 15.4 s; the `change` dot appears once.
7. **Overlap**: the write chips must fit the short diagonals from (300, 1000) to the cards' left edges (fade them at both ends if needed); the `change` dot must not cross the store label at y = 745 except by passing left of its start (label spans ≈ 276–924 at 40 px mono; the dot passes at x = 540 then 600, so shift the label to (600, 760) and the dot's via to y = 720 if they collide); the `replaced_by` chip must not cover row text on either card in the 120 px gap. Rows at 36 px mono (19 characters ≈ 410 px) fit inside 560 px with padding.
8. **Word budget**: on-screen text is the source label and sublabel, the store label, the writes label, four card rows, the badge, the owner label and sublabel, and the session label and sublabel. No sentence appears.
9. **Audio**: the Node dry-run lists ≈ 22 cues (ack, clock/ack, miss, send, ack, ack, send, 2 stores, ack, chime, ack, send/arrive, store, hit, deliver). The spectrogram shows the `miss` at 3.2 s as the only low event, the `chime` at 15.8 s as the brightest, and the `hit` at 23.6 s. `ffprobe` reports ≈ 33 s with an audio stream. Record whether audio was heard or only analysed.
10. **Causal reading test**: with sound off and every word removed, a viewer should still see: a top box's lower line changes; a dot drops to a card whose lower row flashes red and gains a red tag; a left box sends a chip to the card, the row turns grey, and the tag vanishes while the card stays; the left box sends a chip lower, a second card appears green, and a line joins the two cards; a bottom box appears, sends up to the lower card only, gets a green chip back, and shows a green check.
11. **Project checks** after encoding: `python3 scripts/check_media.py --concept memory-architecture`, then the full set before any release proposal. A new encode needs its own comparison review.

