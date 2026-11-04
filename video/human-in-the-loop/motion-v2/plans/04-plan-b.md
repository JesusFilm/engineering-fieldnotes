# Lesson 04 — Reject an approval mismatch — plan B

Independent plan for the motion-v2 cut of human-in-the-loop lesson 04. Authored from the lesson entry in `video/human-in-the-loop/sequence/lessons.json` (item 4) and the concept content in `content/concepts/human-in-the-loop.json`. Earlier lessons' motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **the executor compares the action the recorded approval names with the action being requested, field by field; when the artifact has changed from A to B the comparison fails, execution is blocked with no deployment, and B is sent back for its own review with its own evidence while the approval for A stays attached to A.**

The viewer should feel three things. The `current` pointer moves from A to B while the approved column keeps saying A. A scan runs down a two-column comparison and stops on one red `≠` even though the other rows match. The deploy path stays dashed and the counter stays at 0 while a new, empty review for B opens on the other side.

Grounding: lesson beats ("the current artifact has changed to B. The recorded approval still names A", "the executor compares their identities", "execution is blocked by the mismatch. No deployment happens here", "review B with its own current evidence. Do not treat approval as transferable"); lesson takeaway ("new artifact, target or significant parameters require revalidation and, when policy requires it, a new decision"); concept example (release A of the checkout service, edit creates B, executor must not treat approval of A as approval of B, no deployment while the mismatch remains); walkthrough step 3 ("if the agent produces B, return it for review") and step 4 (check release identity at the executor). Sources: [OWASP Transaction Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html) for binding authorization to the reviewed transaction details and enforcing it at execution, retrieved 2026-10-19 per the concept file. Applying it to agent releases is the library's design recommendation, not a framework feature.

Out of scope: separation of roles and credentials (lesson 01); what evidence a review request contains (lesson 02); pausing, durable checkpoints and restarts (lesson 03); approving B, deploying anything, recording outcomes, retries and duplicate effects (lesson 05). Rejection and cancellation of A are also not shown. The cut ends with B's review pending and no deployment.

Grammar for this cut: **a release history lane at the top with a moving `current` pointer, a field-by-field comparison table in the middle (field / approved / requested), a full-width executor bar, and two destinations below it: the blocked deploy path on the left and a review card for B on the right.** The comparison table, a diff of the recorded and requested values, carries the lesson. It differs from lesson 01's role cards, lesson 02's request form and executor tick marks, and lesson 03's step column and checkpoint store. Every element is a software object: builds, a ref pointer, an approval record, a diff, an executor result, a deployment target and a review request. Do not use locks, keys, gates, stamps or traffic lights.

Target length ≈ 42 s at speed 1 (`meta.speed: 1`). The length follows from four beats with real holds. If stills read fast, lengthen the holds after the mismatch and at the end; never shorten the row-by-row scan to save time.

## Engine notes

Use `box` for builds, executor, production and table row outlines; `label` for table cells, headers and the counter; `badge` for the `current` pointers; `store` for the review card; `s.ripple` with `mark: 'check' | 'x'` for comparison marks. If a node's `x` cannot be animated, the pointer is two badges (under A and under B) that swap by alpha and scale. No new node type is expected. Work in a cut-local engine copy with the repository-pinned Puppeteer; if chip text renders below 40 px, add a `labelSize` option in the local copy and report it.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); node names 48 px; monospace at 40 px ≈ 24 px per character. Content stays within x 100–980 and y 480–1760.

| id | type | centre (x, y) | size / bounds | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Human-in-the-loop** / REJECT AN APPROVAL MISMATCH | engine title and subtitle |
| lanelab | label | (540, 510) | 40 px | `release builds` | |
| buildA | box | (300, 610) | 260 × 100 (x 170–430, y 560–660) | label `A · 9f3a` 44 px mono | |
| buildB | box | (780, 610) | 260 × 100 (x 650–910, y 560–660) | label `B · c71d` 44 px mono | alpha 0 until beat 1 |
| curA | badge | (300, 710) | ≈ 190 × 48 | `current` accent | visible at start |
| curB | badge | (780, 710) | ≈ 190 × 48 | `current` accent | hidden until beat 1 |
| hA | label | (485, 800) | 40 px | `approved · R1` ok | header of the recorded approval; ≈ 312 px wide (x 330–640) |
| hR | label | (815, 800) | 40 px | `requested` | ≈ 216 px wide |
| f0, f1, f2 | label | (220, 880 / 970 / 1060) | 40 px mono, mid | `artifact` · `target` · `params` | field names |
| a0, a1, a2 | label | (485, 880 / 970 / 1060) | 40 px mono, ok-tinted | `A · 9f3a…` · `prod` · `canary 10%` | approved values; never change |
| r0, r1, r2 | label | (815, 880 / 970 / 1060) | 40 px mono, fg | `A · 9f3a…` → `B · c71d…` accent (row 0 only) · `prod` · `canary 10%` | requested values |
| row0–row2 | box (outline only) | (540, 880 / 970 / 1060) | 880 × 72 (x 100–980) | — | scan cursor; alpha 0 except while scanned |
| marks | ripple anchors | (650, 880 / 970 / 1060) | r1 ≈ 34 | `check` mid-green / `x` bad | between the two value columns (gap x 620–680) |
| exec | box | (540, 1310) | 860 × 120 (x 110–970, y 1250–1370) | label `executor` 48 px; sublabel 40 px mono `idle` → `comparing` → `mismatch · blocked` bad → `B → review` | |
| prod | box | (300, 1560) | 380 × 140 (x 110–490, y 1490–1630) | label `production` 48 px; sublabel 40 px `previous` | never changes |
| calls | label | (300, 1700) | 40 px mono | `deploy calls 0` | never changes |
| review | store, `rows: 3`, w 380 | (780, 1600) | 380 × ≈ 230 (x 590–970, y ≈ 1485–1715) | no engine label; rows 40 px mono | row0 `review   B` accent · row1 `tests    B ✓` ok · row2 `decision —` mid; all hidden until beat 4 |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| lane | buildA.right (430, 610) | buildB.left (650, 610) | — | history: B is built from an edit after A |
| deploy | exec.bottom [300, 1370] | prod.top [300, 1490] | — | `dashed` 1 throughout; flashes bad in beat 3; never carries a chip |
| toreview | exec.bottom [780, 1370] | review.top [780, 1485] | — | B is returned for review |

The table has no wires through it: the comparison is shown by row outlines and marks, so packets never cross text. Check that the `approved · R1` header (x ≈ 330–640) does not collide with the `requested` header (x ≈ 707–923) or with the `current` badges above (y ≈ 686–734).

## Sound map

Actor pitches: builds and pointer **C5**, approval record **E5**, executor **G5**, production **C4**, review for B **A5**. Sends an octave up and quieter. Pan by x: approved column and production left (≈ −0.4), requested column and review right (≈ +0.4), executor centre.

| event | preset | notes |
|---|---|---|
| approval record shown | `ack` E5 | quiet, once at the start |
| edit produces B | `send` C6, then `store` C5 | |
| pointer moves to B | `arrive` C5 | |
| requested artifact flips to B | `ack` C5 | the approved column makes no sound: it does not change |
| scan reaches a row | `work` G4 | one tick per row |
| row matches | `ack` G5 | quiet |
| row differs | `miss` | the loudest event in the cut |
| execution blocked | `thump` | at executor; deploy wire flashes bad |
| production unchanged | `ack` C4 | quiet |
| B sent to review | `send` G6, then `arrive` A5 | |
| review rows appear | `store` A5 ×3 | the `decision —` row adds no chime |

No music, no approval chime, no deploy or success sound.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The artifact changes; the approval still names A (0–10.5)** | | | |
| 0.0–1.0 | stage fades in | buildA lit with `current` under it; table shows approved `A · 9f3a… / prod / canary 10%` and requested `A · 9f3a… / prod / canary 10%`; executor `idle`; production `previous`; `deploy calls 0` | — |
| 1.6 | hA and a0–a2 pulse ok | the recorded approval for A | ack E5 |
| 1.6–4.0 | hold | approved and requested agree | |
| 4.0–4.6 | chip `edit` on lane, A → B | — | send C6 |
| 4.6 | buildB fades in with a white ripple | `B · c71d` | store C5 |
| 5.4 | curA shrinks out, curB pops in | `current` now under B; buildA dims to 0.5 | arrive C5 |
| 6.2 | r0 swaps and pulses accent | requested artifact `B · c71d…`; a0 still `A · 9f3a…` | ack C5 |
| 6.8 | a0 pulses ok, no change | the approval still names A | — |
| 6.8–10.5 | hold | one table, two different artifacts in row 0 | |
| **Beat 2 — The executor compares field by field (10.5–19.5)** | | | |
| 10.5 | exec stroke active | sublabel `comparing` | arrive G5 |
| 11.3 | row0 outline on | artifact row scanned | work G4 |
| 12.1 | red `x` ripple at (650, 880); a0 and r0 tint bad briefly; row0 outline stays bad | `≠` on artifact | miss |
| 13.2 | row0 outline dims to bad 40 %; row1 outline on | target row scanned | work G4 |
| 13.9 | check ripple at (650, 970) | `prod = prod` | ack G5 |
| 14.7 | row1 off; row2 outline on | params row scanned | work G4 |
| 15.4 | check ripple at (650, 1060); row2 off | `canary 10% = canary 10%` | ack G5 |
| 16.0 | row0 outline returns bad at full alpha | one differing field is enough | — |
| 16.0–19.5 | hold | two matches, one mismatch, the mismatch outlined | |
| **Beat 3 — Execution is blocked; no deployment (19.5–27.5)** | | | |
| 19.5 | exec snaps to bad, jolts 8 px | sublabel `mismatch · blocked` | thump |
| 20.3 | deploy wire flashes bad (stays dashed) | no packet travels | — |
| 21.1 | prod pulses mid | `previous` unchanged | ack C4 |
| 21.8 | calls pulses mid | `deploy calls 0` unchanged | — |
| 21.8–27.5 | hold | the blocked executor, the dashed path, the unchanged target | |
| **Beat 4 — B gets its own review; approval does not transfer (27.5–42.0)** | | | |
| 27.5 | exec colour eases to mid; sublabel `B → review` | the block remains; the next step is review | — |
| 28.0–28.6 | chip `review B` on toreview | — | send G6 |
| 28.6 | ripple at review.top | review row0 `review   B` accent | arrive A5, store A5 |
| 29.6 | buildB pulses; review row1 `tests    B ✓` | evidence produced for B itself | store A5 |
| 30.6 | review row2 `decision —` mid | B has no decision yet | store A5 |
| 31.6 | a0 and hA pulse ok, unchanged | the approval for A is still about A; it was not relabelled to B | ack E5 |
| 32.4 | row0 bad outline and the red `x` mark remain | the mismatch is still unresolved | — |
| 32.4–40.0 | hold | final state: `current` on B, approved column naming A, artifact row marked `≠`, executor blocked, `deploy calls 0`, review for B pending | |
| 40.0–40.8 | `s.fade` to black, 0.8 s | finite ending | — |
| 42.0 | end | | |

## Accuracy limits

- `9f3a…` and `c71d…` are abbreviated illustrative digests. The comparison uses the full immutable identity from trusted build outputs; a prefix match or a mutable tag is not sufficient.
- The table shows three fields. The takeaway also covers changed targets and significant parameters; here those rows match to show that one differing field is enough. A changed target or parameter would block in the same way. The write-up covers which parameters count as significant.
- The comparison is shown as one step at the executor. Protecting the gap between check and action against concurrent changes, and authenticating the recorded approval, are required by the concept but not drawn.
- `B ✓` stands for evidence produced for B itself (tests run on B), not evidence carried over from A. It does not mean B is correct or approved.
- Sending B to review follows the concept's illustrative design. Whether policy requires a fresh human decision for every change is a policy choice; the takeaway says "when policy requires it". The cut does not show B being approved or deployed.
- The approval for A remains in the record about A. The cut does not say whether A should still be deployed, and it shows no rejection or cancellation of A.
- GitHub environment approvals gate jobs but do not by themselves bind an approval to an artifact; the cut claims no specific product feature.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 3.0, 4.8, 5.6, 6.5, 9.0, 11.6, 12.4, 14.0, 15.6, 18.0, 19.8, 21.3, 25.0, 28.8, 30.8, 32.0, 36.0 and 40.4 s, plus before/mid/after the pointer swap, the r0 swap, each scan step and each review row. At 350 px, both column headers, all six value cells, the three field names, the executor sublabel, `deploy calls 0` and the three review rows must be readable. Shorten a label before reducing its size below 40 px.
2. The approved column never changes text from 0 to 42 s. Any frame where a0 reads anything other than `A · 9f3a…` fails.
3. Pointer and request: before 5.4 s `current` is only under A; after 5.6 s only under B. r0 reads `B · c71d…` from 6.4 s to the end. No frame shows both `current` badges at full alpha.
4. Scan order and marks: the artifact row gets a red `x` at about 12.1 s before target and params get their checks; the red mark and bad outline on row 0 remain to the end; the check marks fade after their row is scanned and do not overlap row text (gap x 620–680).
5. No deployment: the deploy wire stays dashed throughout; no packet or dot travels on it; production reads `previous` and the counter `deploy calls 0` in every frame; no green state appears on the executor or production.
6. Review for B: rows appear only after the `review B` chip lands; `decision —` stays mid-grey to the end; nothing in the cut reads as B approved.
7. Clearance: the `edit` and `review B` chips (≤ 216 px wide) stay inside the frame and off text; `current` badges clear the table headers; no chip remains during a hold.
8. Silent reading: with sound off and words ignored, a viewer sees a second build appear and the pointer move to it; one cell on the right changes while its neighbour on the left does not; a scan marks that row red and the other two green; the bar below turns red while the left path stays dashed and its target unchanged; a card on the right fills with a new request whose last row stays empty.
9. Audio: the dry run lists one `miss` (loudest, at about 12.1 s), one `thump` (about 19.5 s), three `work` ticks, two match acks, and no `chime` or `hit`. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
10. After encoding run `python3 scripts/check_media.py --concept human-in-the-loop`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

