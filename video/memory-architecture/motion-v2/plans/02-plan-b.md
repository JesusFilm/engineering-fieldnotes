# Lesson 02 — Choose the memory scope — plan B

Independent plan for the motion-v2 cut of memory-architecture lesson 02. Authored from the lesson entry in `video/memory-architecture/sequence/lessons.json` (item 2) and the concept content in `content/concepts/memory-architecture.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **memory has a scope (one thread, or shared across threads, addressed by namespace and key) and a durability (what its backend retains across a process restart), and these are separate choices: a new session reads the scope relevant to it without mixing in another thread's history, and after a restart each store keeps or loses its records according to its backend, not its scope.**

The viewer should feel the two axes. Vertically on the left, two threads each hold their own state, one of them a debugging guess; on the right, one shared store holds an approved record under a namespace and key. A new session reaches the shared store and is kept away from thread A's guess. Then a restart: thread A's state vanishes, thread B's state stays, the shared store stays, and the only thing that explains the difference is the backend label under each.

Grounding (from the concept): "distinguish the context supplied to a model now, the state saved for one conversation, and records available across conversations. LangGraph implements the latter two with checkpointers and stores. Thread-scoped state can itself be persisted: 'short-term' describes scope, not necessarily RAM"; "the storage backend determines whether it survives a process restart"; the walkthrough keeps a guess about a flaky test in task state until validated and stores the approved command under an explicit repository and purpose key; "an in-memory demonstration store is not restart-safe".

Out of scope: retrieval into a model's input (lesson 01), revision checks and correction (later lessons), write permissions and ownership, retention policy, and similarity search. The cut ends after the restart with the three backends' outcomes visible.

Grammar for this cut: **two thread lists stacked on the left, one keyed shared list on the right, a new session below, a forbidden path, and a restart line with backend labels.** The forbidden path is a dashed wire from the new session to thread A that gets a grey × when considered. The restart is a label and a bar that sweeps once; afterwards each list's rows stay or blank according to the backend label under it. This differs from lesson 01 (a two-call timeline over one store band) by stacking scopes rather than calls and by introducing the restart as an event that tests durability, from the context-engineering, tool-design, and loop-engineering cuts, and from the harness-engineering views. Every element is a software object: a thread's checkpoint, a keyed record, a session, a backend, a restart.

Target length ≈ 34 s at playback. Authored at speed 1 for 31 s with `meta.speed: 0.9`. Lengthen the hold after the forbidden path is marked and the hold after the restart first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and backend labels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Memory architecture** / CHOOSE THE MEMORY SCOPE | engine title + subtitle |
| threadA | store, `rows: 2`, w 460 | (320, 700) | 460 × ≈ 140 (x 90–550, y ≈ 630–770); row centres y ≈ 665, 735 | label `thread A` 40 px at (320, 580); sublabel `scope: one thread` 36 px mono inside the store header; rows 36 px mono | row0 `step   3 of 5` · row1 `guess  flaky e2e?` accent (a hypothesis, 17 characters ≈ 367 px) |
| beA | label | (320, 805) | 36 px mono, mid | `backend  in-memory` | hidden until beat 4 |
| threadB | store, `rows: 2`, w 460 | (320, 980) | 460 × ≈ 140 (y ≈ 910–1050) | label `thread B` 40 px at (320, 860); sublabel `scope: one thread`; rows 36 px mono | row0 `step   1 of 2` · row1 `note   retry once` |
| beB | label | (320, 1085) | 36 px mono, mid | `backend  sqlite` | hidden until beat 4 |
| shared | store, `rows: 3`, w 460 | (780, 840) | 460 × ≈ 200 (x 550–1010, y ≈ 740–940); row centres y ≈ 775, 840, 905 | label `shared store` 40 px at (780, 690); sublabel `scope: all threads`; rows 36 px mono | row0 `ns    billing` · row1 `key   test_cmd` · row2 `val   npm test` ok |
| beS | label | (780, 985) | 36 px mono, mid | `backend  postgres` | hidden until beat 4 |
| sessionC | box | (320, 1300) | 460 × 140 (x 90–550, y 1230–1370) | label `session C · new` 40 px; sublabel 36 px mono `reads…` → `has test_cmd` → `guess: not read` | |
| restart | label | (540, 1520) | 40 px mono, mid | `process restart` | hidden until beat 4 |
| sweep | bar, `segments: 1` | (540, 1575) | 900 × 10 | — | track alpha 0; `seg0` 0 → 1 in accent over 0.6 s then fades: the restart happening once |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| readS | sessionC.right (550, 1300) | shared.bottom (780, 940) | [780, 1300] | the new session reads the shared scope |
| mixA | sessionC.top (320, 1230) | threadA.left (90, 700) | [50, 1230], [50, 700] | the path a session must not take into another thread's state; drawn `dashed` 1 and dim at rest |

The two thread lists share a left column so their equal scope is seen at a glance; the shared store sits alone on the right with the extra `ns`/`key` rows that make it addressable. The `mixA` wire runs in the left margin at x = 50, outside both thread lists. Stage spans y ≈ 580–1580.

## Sound map

Pitches: thread A **E5**, thread B **G5**, shared store **A5**, session C **C5**. Pan by x: threads and session left (`−0.45`), shared store right (`+0.45`), restart centre.

| event | preset | notes |
|---|---|---|
| thread rows appear | `store` | E5 / G5, quiet; the guess row adds `ack` E5 |
| shared rows appear | `store` | A5, ×3; the `val` row adds `ack` C6 (quiet) |
| session appears | `ack` | C5 |
| session reads the shared store | `send` C6, `arrive` A5 | |
| record returns | `store` | C5 |
| the mixing path is considered | `ack` | low (C4), quiet, pan left |
| the mixing path is refused | `miss` | gain ×0.6, pan left; grey × on the dashed wire |
| backend labels appear | `ack` | E5 / G5 / A5, quiet, in turn |
| restart | `clock` × 2 then `thump` | gain ×0.8; every stroke flickers |
| thread A's rows vanish | `poof` | ×2, pan left |
| thread B's rows stay | `ack` | G5 |
| shared rows stay | `ack` | A5 |
| survivors confirmed | `chime` | the brightest event |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Thread state belongs to one conversation (0.0–7.0)** | | | |
| 0.0 | — | all rows hidden; backend labels, restart, sweep hidden; session C hidden; `mixA` dashed and dim | — |
| 0.6 / 0.9 | threadA rows pop | `step   3 of 5` fg · `guess  flaky e2e?` accent | store × 2 (quiet), ack E5 on row1 |
| 1.4 | threadA sublabel pulses | `scope: one thread` | — |
| 2.2 / 2.5 | threadB rows pop | `step   1 of 2` · `note   retry once` fg | store × 2 (quiet) |
| 3.0 | threadB sublabel pulses | `scope: one thread` | — |
| 3.0–7.0 | hold | two threads, two private states, one of them a guess | |
| **Beat 2 — A shared store has a wider scope (7.0–12.0)** | | | |
| 7.0 / 7.4 / 7.8 | shared rows pop | `ns    billing` · `key   test_cmd` · `val   npm test` ok | store × 3; ack C6 (quiet) on row2 |
| 8.4 | shared sublabel pulses | `scope: all threads` | — |
| 8.4–12.0 | hold | left: per-thread state; right: one addressed record | |
| **Beat 3 — A new session reads the relevant scope (12.0–21.0)** | | | |
| 12.0 | sessionC pops (scale 0.9 → 1) | sublabel `reads…` | ack C5 |
| 12.8–13.6 | dot (fg) sessionC.right → via → shared.bottom, 0.8 s | — | send C6 |
| 13.6 | ripple at shared.bottom | shared row1 and row2 pulse | arrive A5 |
| 14.2–15.0 | chip `npm test` (ok) shared.bottom → via → sessionC.right, 0.8 s | — | — |
| 15.0 | ripple at sessionC.right | sublabel → `has test_cmd` ok | store C5 |
| 15.0–16.5 | hold | | |
| 16.5 | `mixA` wire alpha → 0.8 for 1.2 s (still dashed) | the other thread's state is within reach | ack (low, quiet) |
| 17.3 | grey ripple with × at (50, 965) (midpoint of the wire) | threadA row1 `guess` pulses accent then settles; `mixA` alpha → 0.3 | miss (quiet) |
| 17.8 | sessionC sublabel swaps | `guess: not read` mid | — |
| 17.8–21.0 | hold | the session has the shared record and none of thread A's history | |
| **Beat 4 — Scope and durability are different choices (21.0–31.0)** | | | |
| 21.0 / 21.4 / 21.8 | backend labels fade in | `backend  in-memory` under A · `backend  sqlite` under B · `backend  postgres` under the shared store | ack × 3 (quiet) |
| 21.8–23.0 | hold | three scopes labelled, three backends labelled | |
| 23.0 | `restart` label fades in and pulses | `process restart` | clock × 2 |
| 23.8–24.4 | `sweep` `seg0` 0 → 1 (accent), then alpha → 0 by 25.0; every store stroke flickers (alpha 1 → 0.3 → 1 over 0.4 s) | — | thump |
| 24.8 / 25.1 | threadA rows → `—` dim (0.3 s each) | thread A's state is gone; `beA` pulses bad | poof × 2 |
| 25.6 | threadB rows pulse ok | still there; `beB` pulses ok | ack G5 |
| 26.0 | shared rows pulse ok | still there; `beS` pulses ok | ack A5 |
| 26.5 | `beB` and `beS` pulse together | — | chime |
| 26.5–29.5 | hold | final state: thread A empty with `in-memory`, thread B intact with `sqlite`, shared store intact with `postgres`, session C holding `test_cmd` | |
| 29.5–30.3 | — | `s.fade` to black, 0.8 s | — |
| 31.0 | end | finite ending | |

## Accuracy limits

- The thread rows, the shared record, and the three backends are illustrative, drawn from the concept's billing example. `in-memory`, `sqlite`, and `postgres` stand for "not restart-safe", "persisted locally", and "persisted in a service"; the concept names only that an in-memory demonstration store is not restart-safe and that the backend determines survival.
- Thread B surviving the restart illustrates the takeaway that "short-term describes scope, not necessarily RAM"; it is not a claim that thread-scoped state should always be persisted.
- `ns` and `key` follow the concept's description of stores providing namespaces and keys whose meaning and access rules the application chooses. The cut shows one record; it does not show access control (repository names are not authorization checks, per the concept's pitfalls).
- The forbidden path to thread A is drawn as a decision the application makes about which scope to read. The cut does not claim that stores prevent such reads by themselves.
- The `guess` row is a hypothesis kept in thread state, following the walkthrough; validating or promoting it is a later lesson.
- The restart is a single event; the cut does not show checkpoint restoration, backups, or what the shared store returns to an active thread afterwards.
- The `poof` preset marks the in-memory rows disappearing, which is its documented meaning here (lost entries). The `thump` marks the restart as a disruption, not an error in any store.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `6.0, 11.5, 17.5, 22.0, 25.0, 31.5` (speed-1 ≈ 5.4, 10.4, 15.8, 19.8, 22.5, 28.4). Tile with ffmpeg and view the row; view the 22.0 s (forbidden path marked) and 31.5 s (after restart) stills at full size and at 350 px wide. Pass when all seven rows and three sublabels are readable at 350 px, the three backend labels are readable at 31.5 s, the dashed `mixA` wire is visible and distinguishable from the dotted `readS` wire, the grey × is visible at 22.0 s, and thread A's `—` rows are clearly empty while thread B's and the shared store's rows are intact at 31.5 s.
2. **Scope labels first**: at 11.5 s all three sublabels are present and no backend label is; the session is not yet on screen.
3. **Relevant scope only**: at 17.5 s session C reads `has test_cmd`, the `readS` chip has returned, and the `mixA` wire is still dim; at 22.0 s the × sits on the dashed wire and the sublabel reads `guess: not read`.
4. **Backend decides**: the backend labels appear before the restart (speed-1 21.0–21.8 s precede 23.0 s); after the sweep, thread A blanks while thread B and the shared store do not; the sublabels still read `scope: one thread` for both threads.
5. **No lingering state**: no chip remains during any hold; the sweep bar is invisible before 23.8 s and after 25.0 s (speed 1); the × ripple has faded before beat 4 begins.
6. **Overlap**: the `mixA` wire at x = 50 must stay inside the frame and clear of the thread lists' left edges (90); the `readS` chip must not cross the `shared store` label (the wire enters from below); backend labels at y 805, 1085, 985 must not collide with the lists below or beside them (threadB's label at 860 is 55 px below `beA`). Rows at 36 px mono (17 characters ≈ 367 px) fit inside 460 px with padding.
7. **Word budget**: on-screen text is three list labels and sublabels, seven rows, three backend labels, the session label and sublabel, and the restart label. No sentence appears.
8. **Audio**: the Node dry-run lists ≈ 30 cues (4 stores with ack, 3 stores with ack, ack, send/arrive, store, ack, miss, 3 acks, 2 clocks, thump, 2 poofs, 2 acks, chime). The spectrogram shows the `miss` at 17.3 s as the only low event before the restart, the `thump` at 24.4 s as the loudest, two `poof` hits immediately after, and the `chime` at 26.5 s as the brightest. `ffprobe` reports ≈ 34 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: two short lists stack on the left, one with a highlighted row; a three-row list appears on the right; a box appears bottom-left, sends right and up to the right list, and a green chip comes back; a dashed line from the box up the left margin to the top list brightens and gets a grey ×; three small labels appear under the lists; a label appears at the bottom and a bar flashes across; the top-left list's rows blank while the other two lists pulse green.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept memory-architecture`, then the full set before any release proposal. A new encode needs its own comparison review.

