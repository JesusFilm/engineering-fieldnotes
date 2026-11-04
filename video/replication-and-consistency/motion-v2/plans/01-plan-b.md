# Lesson 01 — Keep another copy — plan B

Independent plan for the motion-v2 cut of replication-and-consistency lesson 01. Authored from the lesson entry in `video/replication-and-consistency/sequence/lessons.json` (item 1) and the concept content in `content/concepts/replication-and-consistency.json`. Earlier motion-v2 beat sheets from other chapters were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **the application writes a change only to the primary, which moves from revision 7 to revision 8; the replica still holds the old copy until the change travels across the replication link and the replica applies it; only then do both copies contain revision 8.**

The viewer should feel three things. There are two real copies of the same record, side by side, and at the start they agree (`r7` and `r7`, with `=` between them). The application's write lands on the primary alone: the primary's card changes to `ready · r8` while the replica's card still reads `draft · r7`, and the mark becomes `≠`. Then a `change r8` chip crosses the link, the replica's card updates field by field, and the mark returns to `=`. Copying is work that happens after the write, not something that comes free with it.

Grounding: lesson beats ("the primary stores application data. The replica holds another copy", "a change is written to the primary. The primary now has revision 8", "the change travels to the replica. The replica must apply it", "the replica reaches revision 8. Both copies now contain the change"); intro ("replication maintains another copy of stored data. In this single-writer example the application writes to the primary"); takeaway ("a replica is another data copy. Keeping it updated requires data to travel and be applied"); concept overview ("replication maintains copies of data") and example (release R42, draft → ready, revision v8). Source per the concept file, retrieved 2026-10-19: [PostgreSQL 18 — Log-shipping standby servers](https://www.postgresql.org/docs/18/warm-standby.html).

Out of scope (later lessons): reads from the replica and stale results (02), checking the returned revision (03), the difference between received and applied (04; this cut shows a single `apply` step on arrival and does not show a received-but-not-applied state), and failover (05). WAL, acknowledgements, synchronous modes and lag numbers do not appear on screen. No read is performed.

Grammar for this cut: **an application at the top wired only to the primary; below it two identical record cards side by side (`primary` left, `replica` right) for release R42, each with a small revision strip (`r6 r7 r8`) whose current cell is lit; a horizontal `replication` link between the cards carries the change; an agreement mark (`=`/`≠`) sits on the link.** Earlier chapters used request/response columns, timelines and tables; here two copies of the same record, and the gap between them, are the subject. Every element is a software object: an application, a database primary, a replica, a record, revisions and a replication link. No photocopiers, mirrors or twins.

Target length ≈ 38 s at speed 1 (`meta.speed: 1`). Hold on the `≠` state long enough to register that the replica is behind before the change travels.

## Engine notes

Use `box` for the application, `store` (2 rows) for each record card, three small `box` cells per revision strip, `label` for headers, `=`/`≠`, states and notes, `s.wire` for the application→primary link and the replication link, and chips for the write and the replicated change. No new node type is expected. Use a cut-local engine copy with the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 44 px; monospace at 40 px ≈ 24 px per character. Content stays within x 40–1040 and y 480–1600.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Replication** / KEEP ANOTHER COPY | |
| app | box | (290, 560), 400 × 120 (x 90–490, y 500–620) | label `application` 44 px; sublabel 40 px mono `—` → `R42 → ready` → `write saved` (ok) | C5; single writer |
| appLink | wire | app bottom (290, 620) → primary top (290, 820) | — | the only write path |
| noLink | — | — | — | no wire from application to replica |
| pLab | label | (290, 860), 44 px | `primary` | G5 |
| pCard | store, `rows: 2`, w 420 | (290, 990), x 80–500, y ≈ 920–1060; rows ≈ 955, 1025 | `R42  draft` → `R42  ready` · `rev  r7` → `rev  r8` | |
| pStrip | three cells 110 × 60 | centres (175, 1130), (290, 1130), (405, 1130) | `r6` · `r7` · `r8` | current cell lit (r7, then r8) |
| rLab | label | (790, 860), 44 px | `replica` | E5 |
| rCard | store, `rows: 2`, w 420 | (790, 990), x 580–1000 | same rows; updates last | |
| rStrip | three cells | centres (675, 1130), (790, 1130), (905, 1130) | `r6` · `r7` · `r8` | |
| repLink | wire | pCard right (500, 990) → rCard left (580, 990) | label `replication` 40 px mono, mid at (540, 1230) with a short tick up to the link | |
| mark | label | (540, 940), 48 px | `=` (ok) → `≠` (accent) → `=` (ok) | sits above the link |
| rState | label | (790, 1290), 40 px mono | `in sync` → `behind` (accent) → `applying` → `in sync` (ok) | |
| pState | label | (290, 1290), 40 px mono | `in sync` → `has r8` (ok) | |
| note | label | (540, 1450), 40 px mono, ok | `2 copies · both r8` | beat 4 |

Chips: `write ready` (≈ 264 px) down appLink; `change r8` (≈ 216 px) across repLink. repLink is short (80 px), so the chip starts inside pCard's right edge and ends inside rCard's left edge; check that it stays legible while crossing and clears `mark` above. The `replication` label below the cards must not collide with the strips (y 1100–1160).

## Sound map

Actor pitches: application **C5**, primary **G5**, replica **E5**; the same change has its own cue, **A5**, heard when written on the primary and again when applied on the replica.

| event | preset | notes |
|---|---|---|
| copies agree | `ack` G5 + E5 | consonant |
| write sent / received | `send` C6, `arrive` G5 | |
| primary applies r8 | `store` A5 | |
| copies differ | `ack` G5 + F5, quiet | slight clash |
| change leaves primary | `send` A6 | |
| change arrives at replica | `arrive` E5 | |
| replica applies r8 | `store` A5 | identical to the primary's cue: same change |
| copies agree again | `chime` G5 + E5, quiet | the only chime |

No music; no crash.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The primary stores application data; the replica holds another copy (0–8.0)** | | | |
| 0.0–1.0 | app, cards, strips, link fade in | both cards `R42 draft · rev r7`; both strips lit at r7; `=`; both `in sync` | — |
| 1.8 | pCard pulses | the primary | ack G5 |
| 2.6 | rCard pulses | another copy | ack E5 |
| 3.4 | `=` pulses | they agree | ack G5 + E5 |
| 3.4–8.0 | hold | | |
| **Beat 2 — A change is written to the primary; the primary has revision 8 (8.0–16.0)** | | | |
| 8.0 | app sublabel `R42 → ready` | | — |
| 8.4–9.6 | chip `write ready` down appLink | | send C6 |
| 9.6 | ripple at pCard | | arrive G5 |
| 10.2 | pCard row0 → `R42 ready`; row1 → `rev r8`; pStrip lights r8 | | store A5 |
| 10.8 | app `write saved`; pState `has r8` | | — |
| 11.4 | `=` → `≠`; rState `behind`; rCard rows pulse (still `draft · r7`) | the copies differ | ack G5 + F5 (quiet) |
| 11.4–16.0 | hold | | |
| **Beat 3 — The change travels to the replica; the replica must apply it (16.0–24.0)** | | | |
| 16.0–17.6 | chip `change r8` leaves pCard and crosses repLink; `replication` label pulses | | send A6 |
| 17.6 | ripple at rCard; rState `applying` | | arrive E5 |
| 18.4 | rCard row0 → `R42 ready` | | — |
| 19.2 | rCard row1 → `rev r8`; rStrip lights r8 | applied | store A5 |
| 19.2–24.0 | hold | | |
| **Beat 4 — The replica reaches revision 8; both copies contain the change (24.0–38.0)** | | | |
| 24.0 | `≠` → `=`; rState `in sync` | | chime G5 + E5 (quiet) |
| 25.0 | pStrip r8 and rStrip r8 pulse together | | — |
| 26.0 | note `2 copies · both r8` | | — |
| 27.0–36.4 | hold | final state | |
| 36.4–37.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 38.0 | end | | |

## Accuracy limits

- Single writer, as in the lesson: the application writes only to the primary. Multi-writer replication is not covered.
- The replica is shown applying the change on arrival in one step. In PostgreSQL, receiving and replaying change records are separate stages; that distinction is lesson 04.
- `r7` / `r8` are application revisions from the concept's R42 example, not database internals.
- Timing between write and replication is illustrative; no lag numbers appear. Whether the write waits for the replica depends on configuration (lessons 02 and 05).
- No read is shown, so the cut makes no claim about what a reader would see (lesson 02).

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.9, 2.7, 3.5, 6.0, 8.1, 9.0, 9.7, 10.3, 10.9, 11.5, 14.0, 16.8, 17.7, 18.5, 19.3, 22.0, 24.1, 25.1, 26.1, 32.0 and 36.8 s. At 350 px, `application` and its sublabel, `primary`, `replica`, all card rows, all six strip cells, `=`/`≠`, `replication`, both states, both chips and the note must be readable.
2. One write path: the write chip travels only to the primary; nothing travels from the application to the replica.
3. Replica behind: from 10.2 s to 19.2 s the replica card reads `rev r7` while the primary reads `r8`, and the mark reads `≠`.
4. Travel then apply: the replica's rows change only after the `change r8` chip arrives.
5. Agreement restored: `=` returns only after the replica shows `r8`; both strips end lit at r8.
6. Scope: no read, query, stale result, `received`, WAL, acknowledgement or failover appears.
7. Clearance: the change chip stays legible across the short link and clears the mark; strips and the `replication` label do not overlap; nothing enters the title band.
8. Silent reading: with sound off and words ignored, a viewer sees two matching cards with an equals sign; a chip from the top box changes only the left card, and the sign changes; a chip crosses from the left card to the right card, which changes to match, and the sign returns to equals.
9. Audio: the dry run lists two identical `store` A5 cues (10.2 s and 19.2 s), one quiet clash at 11.4 s, one quiet `chime` at 24.0 s, and no crash. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
10. After encoding run `python3 scripts/check_media.py --concept replication-and-consistency`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut. Per the current authorization, stop after this plan and wait for confirmation before the next video.

