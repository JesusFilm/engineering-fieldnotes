# Check the revision you need

## Mechanism and scope

The application expects revision 8 for release R42. A successful replica response contains revision 7: insufficient evidence for this check. A new query to the primary returns revision 8 in this example. The application compares it with its unchanged expectation and marks the check matched.

Start after the save has committed. Show no write, replication traffic, catch-up, received-versus-applied stages, or failover. This is one verification decision, not a demonstration of general primary freshness. Five beats, 38 seconds of playback at speed 1; finite ending. The sequence item's 28 seconds is an existing timing reference, not this plan's duration. No accompanying files change.

## Visual approach

Use an application assertion view above a query results drawer. The assertion has two large revision operands; the drawer uses endpoint tabs and a single returned row. This is software-native geometry: selected tab underline, row selection, result extraction, comparison outline. No server boxes, database cylinders, lifelines, conveyor, lock, gate, or physical sorting metaphor.

Compared with the prior motion-v2 beat sheets, avoid lesson 01's paired stored-record cards and lesson 02's three-column sequence trace. Here the expected value stays anchored while a returned value moves into the observation field. The motion is a UI binding of returned evidence, not a database write. Never animate 7 counting up into 8.

### Stage and coordinates

1080 × 1920, near-black `#050506`, safe content x=90–990, y=250–1720. Coordinates below are centres unless bounds are stated.

| Element | Geometry and placement | Visible content |
|---|---|---|
| Title | Two lines, centred at (540, 290) and (540, 378), 76 px | `Check the revision` / `you need` |
| Assertion heading | (540, 535), 50 px | `App · R42` |
| Operand headings | (300, 675), (780, 675), 50 px | `Need` / `Seen` |
| Operand wells | Bounds (170, 730)–(430, 930) and (650, 730)–(910, 930); open corner strokes, not filled cards | Fixed `8` left; empty, then `7`, empty, then `8` right; numerals 128 px |
| Comparison | (540, 830), 86 px; initially absent | `≠`, then absent during new read, then `=` |
| Check result | (540, 1010), 56 px | `Unverified`, then `Match`; never `Failed` |
| Drawer boundary | Horizontal rule (120, 1150)–(960, 1150), vertical edges to y=1640 | No drawer title |
| Endpoint tabs | Replica bounds x=180–480; primary x=600–900; baseline y=1225, labels 50 px | `Replica` / `Primary` |
| Tab selection | 8 px underline, y=1264, initially x=180–480; later x=600–900 | No additional label |
| Query line | (540, 1355), 52 px | `Read R42`, later `Fresh read R42` |
| Result row | Bounds (170, 1445)–(910, 1575); left status at (285, 1510), right value at (780, 1510), 52/72 px | `OK` and `rev 7`, later `OK` and `rev 8` |

No network wire is needed: the selected endpoint tab identifies the query target. Query activity is a short underline sweep below the query line, (330, 1405)→(750, 1405), not a duration meter. Result extraction follows a vertical UI association from (780, 1510) to (780, 830); a transient guide at x=930, y=1510→830 keeps the path clear of labels. The existing result stays in its row while a duplicate numeral moves; it is not removed from storage. Tabs and result row are parts of one drawer, not three system actors.

All essential labels are at least 50 px (16.2 px at 350-wide), numerals 128 px (41.5 px). Stroke width ≥6 px, well corners 8 px. Leave ≥30 px around glyphs; no small footer caveats. White `#E6E8EC` is the reading colour; amber `#F5A524` marks insufficient evidence; teal `#3FB68B` marks the final comparison. Query `OK` stays white so query success does not prematurely become verification success. Symbols and wording carry meaning without colour.

## Beat sheet

Times are absolute playback seconds. Each hold is for a specific newly visible fact; no repeated pulses or idle traffic fill time.

| Beat / time | Motion and granular timing | State and useful holds | Sound events |
|---|---|---|---|
| 1 · Establish the requirement · 0–6.0 | 0–0.7 fade in title, app view and drawer. At 0.8, draw the left well corners around `8` over 0.4 s. At 3.0, select Replica with a 0.35 s underline reveal; show `Read R42`. | Expected 8 is present from the opening; Seen is empty. Hold 1.2–3.0 on the requirement. Hold 3.35–6.0 on the selected source and empty result: this is a read to be checked. `Unverified` remains neutral. | 0.8 `ack` C5, quiet; 3.0 `ack` E5. |
| 2 · Successful response, older value · 6.0–14.0 | 6.0–6.8 sweep the query underline once. At 7.2 reveal `OK · rev 7` together in the result row. At 9.2 outline the returned revision; 9.5–10.3 move its duplicate `7` upward into Seen, easing out gently. At 12.1 draw amber `≠` and tint the Seen corners amber over 0.3 s. | Hold 7.2–9.2 on a successful replica result. Hold 10.3–12.1 with Need 8 and Seen 7 before evaluation. Hold 12.4–14.0 on explicit insufficiency; `Unverified` is now amber. Replica is working; the save is not undone. | 6.0 `send` C6; 7.2 `deliver` C5; 9.2 `ack` E5; 10.3 soft `arrive` C5; 12.1 quiet `ack` C5 + D♭5, a brief unresolved interval, no error buzz. |
| 3 · Ask a new query · 14.0–22.0 | 14.0–14.5 clear the Seen operand, comparison and old drawer result with a short opacity fade; expected 8 does not move. 16.1–16.6 slide the selected underline to Primary; query line changes to `Fresh read R42`. At 18.8–19.6 run one query underline sweep. | Hold 14.5–16.1 on the still-unverified check with its requirement preserved. Hold 16.6–18.8 on the explicit source change before execution. Hold 19.6–22.0 on empty result space while awaiting the new response. The old observation is cleared, never relabelled as a primary result. | 14.0 soft `ack` C5; 16.1 `ack` G5; 18.8 `send` C6; 19.6 soft `work` G4, once. |
| 4 · Observe the required revision · 22.0–30.0 | At 22.0 reveal primary `OK · rev 8` together. At 24.0 outline that revision; 24.3–25.1 move a duplicate `8` into Seen by the same vertical association. At 27.0 draw `=` over 0.3 s; both operand corner sets become teal. | Hold 22.0–24.0 on the primary response. Hold 25.1–27.0 on the two equal operands before the equality result. Hold 27.3–30.0 on the comparison. The response alone does not set Match: that result follows comparison. | 22.0 `deliver` C5, exactly the same cue/gain as the replica success; 24.0 `ack` G5; 25.1 soft `arrive` C5; 27.0 `chime` C5 + G5, short. |
| 5 · Resolve this check · 30.0–38.0 | At 30.0 replace `Unverified` with `Match` in place. At 32.5–33.0 dim the drawer boundary, tabs and query line to 55%, keeping its result legible. Retain the assertion at full contrast. | Hold 30.0–32.5 on the explicit decision. Hold 33.0–38.0 deliberately on Need 8 = Seen 8, Match, and the primary result below. Finite final frame; no reset, new action, replay or implication that future reads must match. | 30.0 `ack` C5, softly resolved. No cue for purely compositional dimming; final hold silent. |

Sound mapping: app C, replica E, primary G; octave-up sends. Pan source-selection cues to tab centres and comparison cues centrally. Both successful query results use identical app delivery cues: sound must not make the stale result a failed request. The comparison is the audible resolution. No crash, recovery, eviction, music bed, narration or continuous work ticks. These are planned cues, not a claim of audition or mix verification.

## Accuracy boundaries and source evidence

- Revisions 7 and 8 are illustrative application revisions for one record, not PostgreSQL transaction IDs, WAL locations, or database-wide versions. Expected 8 comes from the already committed change. This scene has one writer and a direct query path without an intervening cache.
- Asynchronous streaming replication can expose an older committed state on a standby. It does not make the replica request an error. Source: [PostgreSQL 18 §26.2.5](https://www.postgresql.org/docs/18/warm-standby.html#STREAMING-REPLICATION), checked 2026-11-03.
- “Fresh read” here means a new Read Committed query started on the primary after the save committed. It sees the query-start snapshot. A primary read inside an older Repeatable Read transaction can retain an older view; concurrent writers can also alter the outcome. Source: [PostgreSQL 18 §§13.2.1–13.2.2](https://www.postgresql.org/docs/18/transaction-iso.html), checked 2026-11-03.
- Matching revision 8 resolves this example's revision check. In a real tool, verify intended fields too; a newer revision requires reconciliation, and this observation is not an atomic precondition for a later action or proof of deployment completion. Those are scope limits from the concept, not additional animated branches.
- Pacing represents explanation time, not measured query latency or a prescribed wait. No fixed sleep is proposed as a consistency contract. No statement or graphic claims that every primary read is universally fresh.

## Acceptance criteria for a later implementation

Planning only; no scene, render, media inspection or audio audition is performed here.

A muted viewing should show the unchanged requirement, the insufficient successful response, the distinct new primary query, and equality before Match. Inspect intended frames at 3.5, 7.5, 10.5, 12.6, 16.8, 22.3, 25.4, 27.6, 30.3 and 37.5 seconds at full size and 350 px width, plus moving numeral midpoints for collisions. The strongest failure checks are: no transient Match on 7, no 7 morphing to 8, no changed expected value, and no green query success mistaken for revision agreement. If a later render crowds the query label, widen its line area rather than shrinking text. Preserve the finite evidence frame and check that both query-success sounds remain identical and audible.
