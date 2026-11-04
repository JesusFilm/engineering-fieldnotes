# Lesson 05 — Revise against criteria — plan B

Independent plan for the motion-v2 cut of orchestration-patterns lesson 05. Authored from the lesson entry in `video/orchestration-patterns/sequence/lessons.json` (item 5) and the concept content in `content/concepts/orchestration-patterns.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **an evaluator marks a draft against an explicit list of criteria; a failing criterion goes back to the worker as a specific reason; the worker revises and the evaluator marks the revision against the same list; the controller counts rounds and stops when the criteria pass or the round budget is spent.**

The viewer should feel the scorecard being the same both times: three criteria, one × in round one, three ✓ in round two; the feedback chip carrying the name of the failing criterion; the draft card changing from `v1` to `v2` with exactly the row the feedback asked for; and the rounds bar at the top reaching its second tick as the loop stops.

Grounding (from the concept): "an evaluator loop revises work against criteria"; the pitfall: "repeated evaluator feedback consumes the budget without a measurable stopping condition"; the lesson's takeaway: "evaluation is useful feedback, not infallible truth. Stop when criteria or budgets say to stop."

Out of scope: how the criteria were chosen, what happens when the budget runs out before acceptance (lesson shows acceptance at round two of two), grading uncertainty and how a controller treats a low-confidence mark (the write-up carries the takeaway's warning), the other patterns (lessons 01–04), and the draft's actual content. The cut ends when the loop has stopped after one revision.

Grammar for this cut: **a worker and an evaluator facing each other, a draft card between and below them, a three-row scorecard under the draft with a mark lane, a rounds bar with two ticks above everything, and one feedback wire between the two boxes.** The scorecard is the fixed yardstick; the draft card is the thing that changes; the rounds bar is the controller's limit. This differs from lesson 01 (a stacked chain with an elapsed bar), lesson 02 (a routing table), lesson 03 (mirrored parallel reviewers with simultaneous bars), and lesson 04 (a join panel with a locked decision), from the loop-engineering budget and decision cuts (gauges, ports, a vertical loop), and from the other topics' cuts. Every element is a software object: a draft version, a criterion, a mark, a feedback message, a round counter.

Target length ≈ 34 s at playback. Authored at speed 1 for 31 s with `meta.speed: 0.9`. Lengthen the hold after the first scorecard and the hold on the final accepted state first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and the bar label are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Orchestration patterns** / REVISE AGAINST CRITERIA | engine title + subtitle |
| rounds | bar, `ticks: 2`, `segments: 1` | (540, 520) | 400 × 14 (x 340–740) | label `rounds 0 of 2` 36 px mono → `1 of 2` → `2 of 2` | fills 0.5 per round; turns accent when full |
| worker | box | (230, 700) | 360 × 150 (x 50–410, y 625–775) | label `worker` 44 px; sublabel 36 px `drafts` → `revises` → `stopped` | |
| evaluator | box | (850, 700) | 360 × 150 (x 670–1030) | label `evaluator` 44 px; sublabel 36 px `criteria · 3` | |
| badge | badge | (1030, 625) | — | `accepted · stop` ok | top-right corner of the evaluator; hidden until beat 4; verify right edge < 1070 (shorten to `accepted` if needed) |
| draft | store, `rows: 3`, w 600 | (540, 980) | 600 × ≈ 200 (x 240–840, y ≈ 880–1080); row centres y ≈ 915, 980, 1045 | rows 36 px mono, hidden until submitted | v1: `draft     v1` · `example   —` mid · `words     180`; v2: `draft     v2` · `example   added` accent · `words     195` |
| score | store, `rows: 3`, w 700 | (540, 1300) | 700 × ≈ 200 (x 190–890, y ≈ 1200–1400); row centres y ≈ 1235, 1300, 1365 | label `criteria` 40 px at (540, 1160); rows 36 px mono | row0 `has example` · row1 `cites source` · row2 `≤ 200 words`; marks land at (850, y_row) |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| submit | worker.bottom (230, 775) | [330, 880] (draft top, left part) | [230, 830], [330, 830] | the worker submits a version |
| read | evaluator.bottom (850, 775) | [750, 880] (draft top, right part) | [850, 830], [750, 830] | the evaluator reads the draft |
| mark | draft.bottom (540, 1080) | score.top (540, 1200) | — | the draft is marked against the criteria |
| feedback | evaluator.left (670, 700) | worker.right (410, 700) | — | a specific reason goes back to the worker (260 px); turns `dashed` when the loop stops |

The worker and the evaluator face each other across one short wire, so the feedback direction is unmistakable; everything they act on sits below them. Stage spans y ≈ 520–1400.

## Sound map

Pitches: worker **C5**, evaluator **G5**, draft **E5**, scorecard **A5**. Pan by x: worker left (`−0.5`), evaluator right (`+0.5`), draft and scorecard centre.

| event | preset | notes |
|---|---|---|
| a round begins | `clock` | the bar fills one step and the label updates |
| worker submits | `send` C6, `store` E5 ×3 | the draft rows pop or swap |
| evaluator reads | `send` G6, `arrive` E5 | |
| a criterion passes | `ack` | A5, with a green check |
| a criterion fails | `miss` | with a red ×; the row turns bad |
| specific reason sent | `send` G6 (pan right → left), `arrive` C5 | the worker's sublabel changes |
| the row that changed | `ack` | E5, accent pulse on the draft row |
| all criteria pass | `hit` | after the third check |
| loop stops | `chime` then `deliver` (high, quiet) | the brightest event; the feedback wire dashes |
| budget reached | `ack` | low (C4), quiet, as the bar turns accent at `2 of 2` |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Submit a draft; apply explicit criteria (0.0–8.5)** | | | |
| 0.0 | — | bar empty, label `rounds 0 of 2`; draft rows hidden; score rows present with no marks; worker `drafts`; badge hidden | — |
| 0.6 | worker pulses | — | — |
| 0.6–1.4 | chip `v1` (fg) worker.bottom → via → [330, 880], 0.8 s | — | send C6 |
| 1.4 / 1.7 / 2.0 | draft rows pop | `draft     v1` · `example   —` mid · `words     180` | store E5 × 3 |
| 2.4 | `rounds` `seg0` → 0.5; label → `rounds 1 of 2` | round one has begun | clock |
| 3.0–3.8 | dot (fg) evaluator.bottom → via → [750, 880], 0.8 s | — | send G6 |
| 3.8 | ripple at the draft's top | draft stroke glows | arrive E5 |
| 4.3–4.7 | dot (fg) draft.bottom → score.top, 0.4 s | — | — |
| 5.0 | score row0 flashes; bad ripple with × at (850, 1235) | row0 `has example` → bad | miss |
| 5.6 | score row1 flashes; ok check at (850, 1300) | row1 → ok | ack A5 |
| 6.2 | score row2 flashes; ok check at (850, 1365) | row2 → ok | ack A5 |
| 6.2–8.5 | hold | one red criterion, two green, one draft at v1 | |
| **Beat 2 — Return a specific reason to revise (8.5–13.5)** | | | |
| 8.5 | score row0 pulses bad; evaluator pulses | — | — |
| 8.9–9.7 | chip `revise: add example` (bad) evaluator.left → worker.right, 0.8 s (shorten to `add example` if it does not fit at 40 px) | — | send G6 (pan right → left) |
| 9.7 | ripple at worker.right | worker sublabel → `revises` accent; stroke → active | arrive C5 |
| 10.2 | draft row1 pulses accent | `example   —`: the row the reason names | ack E5 |
| 10.2–13.5 | hold | the reason names one criterion and one row | |
| **Beat 3 — Submit the revision; check it again (13.5–22.0)** | | | |
| 13.5–14.3 | chip `v2` (accent) worker.bottom → via → [330, 880], 0.8 s | — | send C6 |
| 14.3 / 14.6 / 14.9 | draft rows swap | `draft     v2` · `example   added` accent · `words     195` | store E5 × 3 |
| 15.3 | `rounds` `seg0` → 1.0, colour → accent; label → `rounds 2 of 2` | the round budget is now fully used | clock, ack (low, quiet) |
| 15.3–16.3 | — | score marks fade (0.4 s); rows → fg | — |
| 16.3–17.1 | dot (fg) evaluator.bottom → via → [750, 880], 0.8 s | — | send G6 |
| 17.1 | ripple at the draft's top | — | arrive E5 |
| 17.6–18.0 | dot (fg) draft.bottom → score.top, 0.4 s | — | — |
| 18.3 | row0 flashes; ok check at (850, 1235), larger | row0 → ok | ack A5 (gain ×1.3) |
| 18.9 | row1 flashes; ok check at (850, 1300) | row1 → ok | ack A5 |
| 19.5 | row2 flashes; ok check at (850, 1365) | row2 → ok (195 ≤ 200) | ack A5 |
| 19.9 | score stroke → ok | — | hit |
| 19.9–22.0 | hold | the same three criteria, now three checks | |
| **Beat 4 — The criterion is met; stop after one revision (22.0–31.0)** | | | |
| 22.0 | badge pops with overshoot | `accepted · stop` ok | chime |
| 22.5 | — | `feedback` wire `dashed` → 1, colour → dim (0.5 s): no further round | — |
| 22.9 | worker pulses | sublabel → `stopped` mid; stroke → mid | deliver (quiet) |
| 23.3 | `rounds` bar pulses | `2 of 2` in accent | ack (low, quiet) |
| 23.3–29.5 | hold | final state: draft v2, three green criteria, accepted badge, dashed feedback wire, full rounds bar | |
| 29.5–30.3 | — | `s.fade` to black, 0.8 s | — |
| 31.0 | end | finite ending | |

## Accuracy limits

- The criteria, draft rows, word counts, and the two-round budget are illustrative; the lesson text says to stop after one revision, and the bar reaches `2 of 2` at acceptance so the viewer sees both stopping reasons coincide here. In another run the budget could run out first; that case is not shown.
- The scorecard marks presence of an example, a citation, and a length limit. Real criteria may be graded with uncertainty; the takeaway's warning that evaluation is feedback rather than truth is carried by the write-up, and the cut does not show a low-confidence mark or a disputed grade.
- `revise: add example` stands for feedback that names the failing criterion specifically; the cut does not show the feedback's wording beyond the criterion.
- The draft card shows the version and the row that changed; it does not show the draft's content or how the worker produced the revision.
- Stopping dashes the feedback wire to show that no further round is requested; it is the controller's decision, not the evaluator's.
- The worker and evaluator are drawn as two actors; in some systems they are the same model with different instructions. The cut shows the roles, not the deployment.
- No `poof` is used. The one `miss` marks the failing criterion.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `7.5, 12.5, 16.5, 22.5, 28.0, 32.5` (speed-1 ≈ 6.8, 11.3, 14.9, 20.3, 25.2, 29.3). Tile with ffmpeg and view the row; view the 7.5 s (one × two ✓) and 22.5 s (three ✓) stills at full size and at 350 px wide. Pass when the bar label, both box labels and sublabels, the three draft rows, the three criteria rows, and the badge are readable at 350 px, the marks at the scorecard's right edge are visible and clear of the row text, and the `v1` → `v2` and `—` → `added` changes are readable.
2. **Same criteria both times**: the criteria rows' text is identical in the 7.5 s and 22.5 s stills; only the marks and row colours differ.
3. **Specific reason**: at 12.5 s the feedback chip has landed, the worker reads `revises`, and the draft's `example` row has pulsed; the failing criterion row is bad.
4. **Budget visible**: the bar reads `1 of 2` from 2.4 s and `2 of 2` in accent from 15.3 s (speed 1); at 28.0 s the bar is full and accent, the badge reads `accepted · stop`, the worker reads `stopped`, and the feedback wire is dashed.
5. **No lingering state**: no chip remains during any hold; round-one marks have faded before the round-two read; the badge appears once.
6. **Overlap**: the `submit` and `read` chips land at the draft's top at x = 330 and 750 and must not cross the draft rows; the `feedback` chip must fit the 260 px gap at 40 px (fade both ends or use the shortened text); marks at (850, y) must clear the criteria text (longest row ≈ 12 characters ≈ 259 px, ending ≈ x 400). Draft rows at 36 px mono (15 characters ≈ 324 px) fit inside 600 px; the `criteria` label at (540, 1160) must clear the `mark` dot's path (shift to (540, 1150) if needed).
7. **Word budget**: on-screen text is the bar label, two box labels and sublabels, the badge, three draft rows, the criteria label, and three criteria rows. No sentence appears.
8. **Audio**: the Node dry-run lists ≈ 32 cues (send, 3 stores, clock, send/arrive, miss, 2 acks, send/arrive, ack, send, 3 stores, clock/ack, send/arrive, 3 acks, hit, chime, deliver, ack). The spectrogram shows the `miss` at 5.0 s as the only low event, three `ack` checks at 18.3–19.5 s followed by the `hit`, and the `chime` at 22.0 s as the brightest. `ffprobe` reports ≈ 34 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: a chip drops from the left box into a middle card that fills three rows and a top bar fills halfway; a dot drops from the right box to the card and on to a lower list, where one row gets a red × and two get green checks; a red chip runs from the right box to the left box, and one row of the card pulses; a chip drops from the left box, the card's rows change, the top bar fills fully; a dot drops again and the lower list gets three green checks; a green tag pops on the right box, the line between the boxes turns dashed, and the left box dims.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept orchestration-patterns`, then the full set before any release proposal. A new encode needs its own comparison review.

