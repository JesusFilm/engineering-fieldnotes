# Lesson 03 — Check the revision you need — plan B

Independent plan for the motion-v2 cut of replication-and-consistency lesson 03. Authored from `video/replication-and-consistency/sequence/lessons.json` item 3, `content/concepts/replication-and-consistency.json`, the editorial workflow and the architecture-flow-video skill references. The lesson 01 and 02 motion-v2 plans were read only to vary geometry. No other lesson 03 plan, authoring source or production manifest was consulted. This document names no authoring model.

## Scope

One mechanism: **the verification step already knows the revision it needs (r8, from the write receipt). A replica answers successfully with r7, which falls short of r8, so the check stays unresolved. A fresh query on the primary answers with r8, which matches, and only then does the next step proceed.**

The viewer should feel one contrast. Two replies arrive that look and sound alike (`ok · r7`, then `ok · r8`), but only one lands on the target. A successful reply is not the evidence; the returned revision compared with the expected one is.

Grounding: lesson beats ("The verification expects revision 8. A replica response says revision 7", "Use a fresh read from the primary. Verify against the required revision", "The primary returns revision 8. This matches the saved change", "Match the observation to the decision. A successful query alone is not enough"); intro ("checks the returned application revision rather than treating any successful response as confirmation"); takeaway ("In this example, a fresh primary query sees the saved revision. Transaction snapshots and concurrent writers still matter"); concept walkthrough steps 2–3 (label the replica mismatch unresolved, keep the write receipt, then issue a fresh Read Committed query on the primary after commit and compare). Sources as recorded in the concept, retrieved 2026-10-19: [PostgreSQL 18 — Log-shipping standby servers, §§26.2.5, 26.2.8](https://www.postgresql.org/docs/18/warm-standby.html) and [PostgreSQL 18 — Transaction isolation, Read Committed and Repeatable Read](https://www.postgresql.org/docs/18/transaction-iso.html).

Out of scope: the write itself (it happened before the clip and appears only as the expectation), the replica catching up, received versus applied WAL (04), failover (05), synchronous commit modes, retries and any second mutation. The replica stays at r7 to the end.

## Geometry

A **verifier panel above a revision rail**. The top of the stage is the verification tool's own readout, three monospace rows (`expect`, `read`, `result`) plus a `next:` decision line. Below it, a horizontal rail with ticks r6, r7 and r8 works like a version axis; the expected revision is a hollow amber ring sitting on r8. Two read sources sit at the bottom, each reached by its own lane down the outer edge of the stage. Every reply comes up from its source, rests as a chip under the rail, and drops a dot onto the rail at the revision it reports.

This differs from lesson 01's record cards and lesson 02's sequence trace. The rail turns "is it the revision I need?" into a position the eye can judge with no words: the replica's dot lands one tick short of the ring, and the primary's dot lands inside it. The panel mirrors what a tool log or test assertion looks like, which is native to the audience. No physical metaphors (targets, scales, locks).

## Engine notes

`store` (3 rows) for the verifier panel with a `label` header; `label` for `next:` and tick labels; `bar` (w 800, h 14) for the rail, with `seg` colouring the r7→r8 gap; `box` for the two sources; `s.wire` with `via` points for the two outer lanes and for the short reply paths; `s.packet` dots for requests and chips for replies, with a persistent `label` copy of each chip at its rest point. The hollow ring and the rail dots need a small generic `ring` node (radius, stroke colour, fill 0–1) in a cut-local engine copy; ripples alone do not persist. Use the repository-pinned Puppeteer. `meta.speed: 1`.

## Stage and coordinates (1080 × 1920)

Palette from `references/style.md`: background #050506, idle #8B9099, dim #3A3E45, active #E6E8EC, accent #F5A524 (expected, short, unresolved), ok #3FB68B (reply succeeded, match). Minimum on-screen text 44 px (≈14 px at 350 wide); panel rows 52 px mono (≈17 px). Stage content within x 40–1040, y 470–1560.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Check the revision** / VERIFY A SAVED CHANGE | title ≤ 96 px so it fits 900 px |
| vHead | label 44 px | (540, 550) | `verify R42` | C5 |
| vPanel | store, 3 rows, w 900 | (540, 680), x 90–990, y 520–810; rows y 620 / 690 / 760 | row0 `expect   r8` (r8 accent) · row1 `read     —` · row2 `result   —` | left-aligned at x 150, values from x 420 |
| next | label 48 px mono | (540, 870) | `next: —` → `next: hold` (accent) → `next: continue` (ok) | the decision |
| ticks | labels 44 px mono, idle | (240, 985) · (540, 985) · (840, 985) | `r6` `r7` `r8` | above the rail, clear of dots |
| rail | bar w 800 h 14 | (540, 1040), x 140–940 | — | seg for r7→r8 gap (x 540–840) |
| target | ring r 30, stroke 6 | (840, 1040) | — | hollow amber; fills teal on match |
| rDot / pDot | ring r 18, filled | (540, 1040) / (840, 1040) | — | appear when each reply is compared |
| rChip | chip, rest | (540, 1200), ≈ 245 × 70 | `ok · r7` (`ok` teal, `r7` amber) | persists; dims to 55% in beat 3 |
| pChip | chip, rest | (840, 1200), ≈ 245 × 70 | `ok · r8` (all teal) | persists; 56 px gap to rChip |
| replica | box 330 × 150 | (270, 1450), x 105–435 | label `replica` 44 px; sublabel `R42 r7` 48 px mono | E5 |
| primary | box 330 × 150 | (810, 1450), x 645–975 | label `primary`; sublabel `R42 r8` | G5 |
| rLane | wire, dim | vPanel left (90, 680) → (60, 680) → (60, 1450) → replica left (105, 1450) | — | request route to replica |
| pLane | wire, dim | vPanel right (990, 680) → (1020, 680) → (1020, 1450) → primary right (975, 1450) | — | request route to primary |
| rReply / pReply | wires, dim | replica top (270, 1375) → (540, 1240) · primary top (810, 1375) → (840, 1240) | — | reply paths; persist as faint stems |

The reply chips rest below the tick labels and the dots rise from each chip's top (y≈1165) to the rail, so no text is crossed in motion. The amber ring and the amber `r8` in row0 share colour: they are the same expectation. The source boxes show their stored revision from the start; the lesson is that the tool must read the answer it got, and the boxes stay visible so the routing is never mysterious.

## Sound map

Actor pitches: verifier **C5**, replica **E5**, primary **G5** (matching lesson 02); the expected revision has its own note, **A5**, heard when the target appears and again when it is met. Pan to node x.

| event | preset | notes |
|---|---|---|
| expectation set | `ack` A5 | ring and row0 together |
| request leaves verifier | `send` C6 | same for both reads |
| request lands | `arrive` E5 / `arrive` G5 | per source |
| source answers | `work` ×1 at source pitch | |
| reply reaches rest | `deliver` C6 | **identical for both replies**: success sounds alike |
| replica dot lands short | `ack` E5 + F5, quiet | rub, no thump or miss |
| primary dot fills target | `chime` A5 → C6 | the only chime; resolves the A5 expectation |
| decision lines | `ack` C5 quiet | |

No `crash`, `thump`, `miss`, music or clock.

## Beat sheet (speed 1, ≈ 44 s)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The check knows what it needs (0–6.0)** | | | |
| 0.0–1.0 | panel, rail, ticks, sources and dim lanes fade in | rows `—`; `next: —` | — |
| 1.4 | row0 `expect r8` appears; amber ring pops onto r8 (back ease) | expectation fixed | ack A5 |
| 1.4–6.0 | hold | | — |
| **Beat 2 — A replica answers r7 (6.0–16.0)** | | | |
| 6.0 | row1 `read  replica`; rLane brightens | route chosen | — |
| 6.4–7.8 | dot travels rLane down the left edge | | send C6 |
| 7.8 | ripple at replica | | arrive E5 |
| 8.2 | replica glows | answers from its copy | work E5 |
| 8.6–9.6 | chip `ok · r7` travels rReply to (540, 1200) and rests | reply succeeded | deliver C6 at 9.6 |
| 9.6–10.6 | hold on the successful reply | | — |
| 10.6–11.0 | rDot rises from chip to rail at r7 | | — |
| 11.0 | rail gap r7→r8 turns amber (0.5 s); row1 `read  replica r7` | one tick short | ack E5+F5, quiet |
| 11.8 | row2 `result  unresolved` (accent); `next: hold` (accent) | not verified, not failed | ack C5, quiet |
| 11.8–16.0 | hold: `ok` reply, dot short of ring, `hold` | | — |
| **Beat 3 — Ask the primary with a fresh query (16.0–24.0)** | | | |
| 16.0 | rLane, rReply and rChip dim to 55%; rDot and amber gap stay | replica evidence kept | — |
| 16.4 | row1 `read  primary · fresh`; pLane brightens | new route, new query | — |
| 16.8–18.4 | dot travels pLane down the right edge | | send C6 |
| 18.4 | ripple at primary | | arrive G5 |
| 18.8 | primary glows | | work G5 |
| 19.2–20.2 | chip `ok · r8` travels pReply to (840, 1200) and rests | reply succeeded | deliver C6 at 20.2 (same as 9.6) |
| 20.2–24.0 | hold: two `ok` chips side by side, not yet compared; ring still hollow | | — |
| **Beat 4 — r8 matches (24.0–32.0)** | | | |
| 24.0–24.4 | pDot rises from chip to rail at r8 | | — |
| 24.4 | ring fills teal with a teal ripple and check | target met | chime A5 → C6 |
| 25.2 | row1 `read  primary r8`; row2 `result  match` (ok) | | — |
| 26.2 | `next: hold` → `next: continue` (ok), pulse | decision follows evidence | ack C5 |
| 26.2–32.0 | hold | | — |
| **Beat 5 — The revision decides, not the `ok` (32.0–44.0)** | | | |
| 32.4 | both `ok` tokens on the chips pulse together | both replies succeeded | ack C6 ×2, very quiet |
| 33.6 | row0 `r8`, filled ring and pChip `r8` pulse together; rDot stays short | only the matching revision counts | ack A5 |
| 34.8 | `next: continue` pulses once | | — |
| 35.0–42.0 | hold final state | | — |
| 42.0–43.0 | `s.fade` to black | finite ending | — |
| 44.0 | end | | |

Hold 9.6–10.6 s is short on purpose: the viewer sees a successful reply before seeing that it falls short. Hold 20.2–24.0 s is the key ambiguity: two identical-sounding successes sit side by side and nothing has been decided yet. The final 7 s hold is the whole argument in one frame.

## Accuracy limits

- r7 and r8 are illustrative application revisions from the R42 example, carried in the write receipt and the record. They are not WAL positions or PostgreSQL features; the tool contract must provide them.
- The primary read is labelled `fresh` because, in this single-writer example, a new Read Committed query issued after commit takes a new snapshot and sees the committed r8. An older Repeatable Read transaction on the primary could still see r7. The video does not claim that every primary read is current.
- With concurrent writers the primary could return r9 or another writer's change. A newer revision needs separate reconciliation, and a match at verification time does not guard a later action; the action needs its own revision precondition. Neither case is shown.
- `unresolved` means the replica observation could not confirm the change. It does not mean the write failed, and the plan shows no retry or second write.
- A primary read does not bypass an application cache or prove an external deployment. `ready` and `continue` are illustrative workflow states.
- The replica stays at r7 for the whole clip. No catch-up, lag duration, received-versus-applied distinction or failover is shown; the pause between reads is not a wait recommendation.

## Native 350 acceptance

These are requirements for the future render. None of them has been checked.

1. Decode actual encoded frames at 1080 and at exactly 350 px wide (≈622 px high), shown at 100%, at 1.0, 1.5, 4.0, 6.1, 7.0, 7.9, 8.3, 9.0, 9.7, 10.4, 10.8, 11.2, 11.9, 14.0, 16.1, 16.5, 17.5, 18.5, 19.6, 20.3, 22.5, 24.2, 24.5, 25.3, 26.3, 29.0, 32.5, 33.7, 34.9, 38.0, 41.8 and 42.6 s. A contact sheet alone does not count. At 350 px, all three panel rows, `next:`, the three tick labels, both chips and both source labels must read without zoom, and `r7`/`r8` must differ by glyph as well as colour.
2. From 11.0 s to the fade, rDot sits at r7 with the amber gap to the ring. It never moves, and the replica sublabel stays `R42 r7`.
3. The ring stays hollow until 24.4 s, and `next: continue` appears only after `result match`.
4. Both reply chips read `ok`; nothing turns red, shakes or plays a miss sound. The rail position, not the chip status, separates the two outcomes.
5. Requests travel only the outer lanes; replies travel only the inner stems. Exactly one read per source; no write, retry or replica refresh appears.
6. Clearance: dots rise without crossing text; chips clear each other, the tick labels and the source boxes; lanes clear the panel text and the chips; nothing enters the title band.
7. Silent reading: with sound off and words ignored, a viewer sees an amber ring placed on a rail, a reply from the left source dropping a dot one tick short, then a reply from the right source dropping a dot into the ring, which turns green.
8. Audio: the dry run lists exactly two `deliver` cues with identical parameters (9.6 s, 20.2 s), one `chime` (24.4 s), and no crash, thump or miss. Decode the full file, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding, run `python3 scripts/check_media.py --concept replication-and-consistency`. A new encode needs a renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No rendering, scene source, public media, shared manifests, site or skill edits, Git operations or next-lesson work. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with the `ring` drawing extension kept local to the cut.

