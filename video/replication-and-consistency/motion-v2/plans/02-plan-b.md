# Lesson 02 — A replica can lag — plan B

Independent plan for the motion-v2 cut of replication-and-consistency lesson 02. Authored from `video/replication-and-consistency/sequence/lessons.json` item 2, `content/concepts/replication-and-consistency.json`, the editorial workflow and the architecture-flow-video skill references. The lesson 01 motion-v2 plans were read only to vary geometry. No other lesson 02 plan, authoring source or production manifest was consulted. This document names no authoring model.

## Scope

One mechanism: **with asynchronous replication, the primary saves and acknowledges revision 8 while the replica still holds revision 7, so a later read routed to the replica succeeds and returns revision 7.** The save stays done. The read is stale, and neither result is an error.

The viewer should feel one contrast. Two replies come back to the application and they look and sound alike: `ok · r8` from the primary, then `ok · r7` from the replica. Both succeed, but they disagree, and the disagreement comes from which copy answered. Nothing turns red, nothing shakes and the write is never repeated.

Grounding: lesson beats ("The primary has saved revision 8. The replica is still at revision 7", "The application reads the replica. That query sees the older revision", "Revision 7 comes back successfully. The read is stale, not a failed write", "The primary still holds revision 8. Different copies can answer differently"); intro ("the primary can acknowledge a write while the replica is behind. A read from that replica can return old data"); takeaway ("A stale read does not prove the write failed"); concept example (release R42, draft → ready, v8 written, reporting replica at v7, single writer) and exercise success criterion "exactly one mutation and identifies which read returned v7". Source as recorded in the concept, retrieved 2026-10-19: [PostgreSQL 18 — Log-shipping standby servers, §§26.2.5 and 26.2.8](https://www.postgresql.org/docs/18/warm-standby.html).

Out of scope, reserved for later lessons: checking the returned revision or rereading the primary (03), received versus replayed WAL (04), the replica catching up, synchronous or `remote_apply` modes, and failover (05). No catch-up, replay, retry, second write or primary verification read appears. The video ends with the replica still at r7.

## Geometry

A **sequence diagram trace**. Three header boxes sit across the top (`primary` left, `app` centre, `replica` right) with dashed lifelines running down. Each request and reply is a horizontal arrow at its own row, and each arrow keeps its chip after the packet lands, so the trace builds downward and becomes the persistent evidence. A dim, motionless replication arc joins the primary and replica headers over the top of the app box.

This differs from lesson 01's record inspectors and side-by-side cards. A sequence trace is native to the audience: it is what they already read in tracing tools and design docs. Putting the app in the middle sends the write left and the read right, so "which copy answered" becomes a direction the eye can follow. No physical metaphors (mirrors, clocks, photocopies).

## Engine notes

`box` for the three headers, using `label`, `sublabel` and a third revision line drawn as a `label` node inside each box. `s.wire` for lifelines (dashed, dim), message arrows and the replication arc (`via` points). Chips (`s.packet` with `kind: 'chip'`) travel the arrows, and a `label` node with the same text and colour appears at the arrow midpoint on arrival so the row persists. Arrowheads may need a small cut-local drawing extension (a generic `arrow` wire end), kept in the cut's engine copy. Use a cut-local engine copy and the repository-pinned Puppeteer. Set `meta.speed: 1`.

## Stage and coordinates (1080 × 1920)

Palette from `references/style.md`: background #050506, idle #8B9099, active #E6E8EC, accent #F5A524 (behind or stale), ok #3FB68B (saved or success). Minimum on-screen text 44 px (≈14 px at 350 wide). Revision values 64 px (≈21 px at 350). Stage content stays within x 40–1040 and y 470–1660.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **A replica can lag** / ASYNC REPLICATION | "async" lives in the subtitle only |
| arc | wire, dim #3A3E45, no flow | (200, 550) → via (200, 490), (880, 490) → (880, 550) | — | never carries a packet; passes over the app box (top y 550) with 60 px clearance |
| pHead | box 300 × 200 | (200, 650), x 50–350, y 550–750 | label `primary` 44 px (y≈590); sublabel `R42 draft` → `R42 ready` 44 px mono (y≈650) | G5 |
| pRev | label 64 px mono | (200, 712) | `r7` (idle) → `r8` (ok) | stays `r8` to the end |
| aHead | box 300 × 200 | (540, 650), x 390–690 | label `app`; sublabel `writes 0` → `writes 1` 44 px mono | C5; single writer |
| rHead | box 300 × 200 | (880, 650), x 730–1030 | label `replica`; sublabel `R42 draft` (never changes) | E5 |
| rRev | label 64 px mono | (880, 712) | `r7` (idle) → `r7` (accent) | stays `r7` to the end |
| pLife / aLife / rLife | wires, dashed, dim | x 200 / 540 / 880, y 760 → 1640 | — | |
| m1 write | arrow (540, 840) → (200, 840) | chip centre (370, 810) | `write R42` (fg) | chip ≈ 280 px wide, x≈230–510; arrow drawn under the chip row |
| m2 ack | arrow (200, 960) → (540, 960) | chip centre (370, 930) | `ok · r8` (ok) | persists |
| m3 read | arrow (540, 1180) → (880, 1180) | chip centre (710, 1150) | `read R42` (fg) | persists |
| m4 reply | arrow (880, 1300) → (540, 1300) | chip centre (710, 1270) | `ok · r7`, with `ok` in ok and `r7` in accent | persists |
| gap | amber segment on aLife | x 540, y 960 → 1300 | — | beat 4 only |
| neq | label 56 px on a #050506 plate | (540, 1130) | `≠` (accent) | beat 4; clear of m3's arrow start at y 1180 (plate y≈1100–1160) |

Row spacing leaves a visible empty band (y 1000–1120) between the save rows and the read rows, standing for the brief interval after the save. The chips sit 30 px above their arrows so arrowheads and lifelines never cut through text. Nothing below y 1340 is used except the lifeline tails, which leaves the lower stage calm and keeps the eye on the trace.

## Sound map

Actor pitches from one chord: app **C5**, primary **G5**, replica **E5**. Sends are quiet octave-up ticks of the sender's pitch.

| event | preset | notes |
|---|---|---|
| copies identified | `ack` G5, `ack` E5 | quiet, consonant |
| write leaves app | `send` C6 | |
| write lands at primary | `arrive` G5 | |
| primary commits r8 | `store` G5 | |
| ack reaches app | `deliver` high (C6) | **success reply cue** |
| replica still r7 | `ack` E5 + F5, very quiet | slight rub only, no thump |
| read leaves app | `send` C6 | same as write send: same caller |
| read lands at replica | `arrive` E5 | |
| replica answers | `work` E5 ×2 | short lookup ticks |
| reply reaches app | `deliver` high (C6) | **identical to the ack cue**: both reads of success sound alike |
| compare | `ack` G5 then `ack` E5, then `ack` G5 + F♯5 quiet | the rub is the loudest moment and still soft |

No `crash`, `thump`, `miss`, `chime`, music or clock. Pan each cue to its node: primary left, app centre, replica right, so the write is heard moving left and the read moving right.

## Beat sheet (speed 1, ≈ 44 s)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Two copies of R42 (0–6.0)** | | | |
| 0.0–1.0 | headers, lifelines and arc fade in | both copies `R42 draft · r7`; app `writes 0` | — |
| 2.0 | pHead pulses | the primary | ack G5 |
| 2.6 | rHead pulses | the replica | ack E5 |
| 2.6–6.0 | hold | | |
| **Beat 2 — Save succeeds on the primary (6.0–15.0)** | | | |
| 6.4–7.6 | `write R42` chip travels m1 leftward; m1 chip persists | app `writes 1` at 6.4 | send C6 (pan centre) |
| 7.6 | ripple at pLife top | | arrive G5 (pan left) |
| 8.3 | pHead sublabel `R42 ready`; pRev `r7` → `r8` (ok), together | primary saved | store G5 |
| 9.0–10.2 | `ok · r8` chip travels m2 rightward; persists teal | save acknowledged | deliver C6 at 10.2 |
| 11.0 | rRev `r7` turns accent with a small pulse; arc stays dim and empty | replica behind | ack E5+F5, very quiet |
| 11.0–15.0 | hold: primary r8, replica r7, ack on record | | — |
| **Beat 3 — Read the replica (15.0–24.0)** | | | |
| 15.4–16.6 | `read R42` chip travels m3 rightward; persists | | send C6 |
| 16.6 | ripple at rLife top | | arrive E5 (pan right) |
| 17.0, 17.3 | rHead glows briefly | replica answers from its own copy | work E5 ×2 |
| 17.8–19.0 | `ok · r7` chip travels m4 leftward; persists | successful reply, older revision | deliver C6 at 19.0 (same as 10.2) |
| 19.0–24.0 | hold: two teal `ok` replies on the trace, no red anywhere | | — |
| **Beat 4 — Different copies answer differently (24.0–44.0)** | | | |
| 24.5 | m2 `ok · r8` and pRev `r8` pulse together | the saved revision | ack G5 |
| 25.5 | m4 `ok · r7` and rRev `r7` pulse together | the observed revision | ack E5 |
| 26.5 | amber gap segment draws down aLife from y 960 to 1300 (0.6 s); `≠` pops in | disagreement located between the two replies | ack G5+F♯5, quiet |
| 28.0 | aHead `writes 1` pulses once | still one write | — |
| 28.5–42.0 | hold final state | primary `R42 ready · r8`, ack row teal, replica `r7`, `writes 1` | — |
| 42.0–43.0 | `s.fade` to black | story ends in a new state | — |
| 44.0 | end | | |

The two `deliver` cues at 10.2 s and 19.0 s must be identical in pitch and gain. That sameness carries the lesson by ear: a successful reply does not tell you which copy answered. Beat 4's 13.5 s hold is deliberate. The final frame before the fade is the whole argument, and the viewer needs time to read it.

## Accuracy limits

- Single writer: the application writes only to the primary. Multi-writer replication is out of scope.
- `r7` and `r8` are application revisions from the R42 example. They are not WAL positions or database internals.
- The idle arc shows that the copies are linked asynchronously. Its lack of motion does not claim that replication has stopped or that any record is in transit. How far the replica is behind, and when it will catch up, is left unspecified. The video ends before any catch-up.
- The primary acknowledging before the replica has the change reflects asynchronous replication. Other configurations (synchronous commit, `remote_apply`) change what the acknowledgement covers. They are not shown here and still would not make every replica fresh.
- The time between the save and the read is illustrative. No lag duration is shown or implied, and a fixed wait is not a freshness guarantee.
- The replica's reply is a normal successful query result. The cut does not depict transaction snapshots. A Repeatable Read transaction on the primary could also return an older view; that is reserved for the written guide.
- `ready` is a record field. It is not proof that a real deployment happened.
- The `≠` marks that two observations disagree. It does not label either copy as corrupt or the read as failed.

## Native 350 acceptance

These are requirements for the future render. None of them has been checked yet.

1. Decode actual encoded frames at 1080 and at 350 px wide (≈622 px high) at 1.0, 2.7, 4.5, 7.0, 7.7, 8.4, 9.6, 10.3, 11.1, 13.0, 16.0, 16.7, 17.2, 18.4, 19.1, 22.0, 24.6, 25.6, 26.8, 28.1, 35.0, 41.5 and 42.5 s. A contact sheet alone does not count. At 350 px, all three header names, both `R42` sublabels, both revision values, `writes 0/1`, all four chips and `≠` must be readable. `r7` and `r8` must be distinguishable by glyph as well as colour.
2. From 8.3 s to the fade, the primary header reads `R42 ready · r8` and the m2 row reads `ok · r8` in teal. Neither ever dims, reverts or turns red.
3. The replica header reads `R42 draft · r7` throughout. No packet ever travels the arc.
4. The read goes app → replica only. The reply chip reads `ok` in teal and `r7` in amber. No red, `×`, shake, miss sound or error code appears anywhere in the video.
5. `writes` never exceeds 1. There is exactly one write arrow, and no primary read arrow, retry or second mutation.
6. Clearance: chips clear lifelines, arrowheads and each other while moving and at rest. `≠` and its plate clear m3's arrow. The arc clears the app box and the subtitle. Nothing enters the title band.
7. Silent reading: with sound off and words ignored, a viewer sees a write go left and a teal reply return, a read go right and a teal reply return, and the two persistent replies carrying different revisions while the left header keeps the newer one.
8. Audio: the timing dry run lists exactly two `deliver` cues with identical parameters (10.2 s, 19.0 s), one `store` (8.3 s), and no crash, thump, miss or chime. Decode the full file, confirm an audio stream, a peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding, run `python3 scripts/check_media.py --concept replication-and-consistency`. A new encode needs a renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No rendering, scene source, public media, shared manifests, site or skill edits, Git operations or next-lesson work. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension kept local to the cut.
