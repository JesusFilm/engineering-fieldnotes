# Lesson 04 — Make a useful handoff — plan B

Independent plan for the motion-v2 cut of context-engineering lesson 04. Authored from the lesson entry in `video/context-engineering/sequence/lessons.json` (item 4) and the concept content in `content/concepts/context-engineering.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a handoff is a shorter representation of a session, built field by field from the transcript; incidental history is compressed first, the decisive constraint is carried over verbatim with its reference, and the next session can follow that reference back to the source when it needs the omitted detail.**

The viewer should feel the difference between two shortenings of the same transcript: a one-line summary that leaves the constraint behind (the next session asks for it and finds nothing), and a fielded handoff where three tool-run lines fold into one check line while the `keep` line crosses intact with a `ref` beside it, so the next session can fetch the contract.

Grounding (from the concept): the example handoff "optimize invoice endpoint; unit tests pass" omits the `total_cents` constraint; the walkthrough's handoff has separate fields for goal, constraints, evidence, changes, checks, and next action with exact commands; the judgement says keep bulky evidence retrievable through precise paths and revision identifiers; the pitfall warns against deleting a subtle constraint while retaining pages of obsolete tool output; the takeaway says a handoff is not perfect memory and references let the next session retrieve omitted detail.

Out of scope: retrieval strategy (lesson 02), the edit itself (lesson 03), compaction inside a single running context, the agent's reasoning, and whatever session 2 does after it has the contract. The cut ends when session 2 holds the contract and the incidental rows have been shown as the first to shrink.

Grammar for this cut: **a long transcript column, a fielded handoff card beside it, a size bar under each, and a resuming session with a repository it can reach.** Handoff rows are built by chips hopping from the transcript rows that justify them; one hop merges three rows into one. The left size bar has three segments (incidental, task, decisive) so the coda can shrink one segment without touching the others. This differs from lesson 01 (two parallel lists with a per-call header), lesson 02 (scored results and two disagreeing bars), lesson 03 (clients, response shape, diff), the loop-engineering cuts, and the harness-engineering views. Every element is a software object: a transcript line, a handoff field, a reference, a repository.

Target length ≈ 34 s at playback. Authored at speed 1 for 31 s with `meta.speed: 0.9`. Lengthen the hold after the failed question and the hold after the contract is fetched first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and bar labels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Context engineering** / MAKE A USEFUL HANDOFF | engine title + subtitle |
| transcript | store, `rows: 7`, w 420 | (260, 950) | 420 × ≈ 420 (x 50–470, y ≈ 740–1160); row centres y ≈ 770, 830, 890, 950, 1010, 1070, 1130 | label `session 1` 40 px at (260, 700); rows 36 px mono | row0 `goal: fix latency` · row1 `ran: pytest ok` · row2 `read: invoice.py` · row3 `keep: total_cents` accent · row4 `ran: pytest ok` · row5 `tried: batch query` · row6 `open: cache TTL?` (max 18 characters ≈ 389 px) |
| handoff | store, `rows: 6`, w 500 | (800, 950) | 500 × ≈ 380 (x 550–1050, y ≈ 760–1140); row centres y ≈ 790, 850, 910, 970, 1030, 1090 | label `handoff` 40 px at (800, 700); rows 36 px mono, hidden until filled | row0 `goal   fix latency` · row1 `keep   total_cents` accent · row2 `ref    invoice-v1.md` · row3 `check  pytest -k inv` · row4 `done   batched query` · row5 `open   cache TTL?` (max 20 characters ≈ 432 px). In beat 1 row0 briefly holds `optimize invoice · ok` in mid |
| sizeL | bar, `segments: 3` | (260, 1210) | 360 × 14 | label `size` 36 px | seg0 incidental 0.45 mid · seg1 task 0.40 fg · seg2 decisive 0.15 accent |
| sizeR | bar, `segments: 1` | (800, 1210) | 360 × 14 | label `size` 36 px | seg0 grows to 0.35 fg as rows fill; 0.06 for the vague line |
| session2 | box | (440, 1450) | 500 × 150 (x 190–690, y 1375–1525) | label `session 2` 44 px; sublabel 36 px `waiting` → `resumes` → `reads keep · ref` → `has the contract` | |
| repo | db | (940, 1450) | w ≈ 140 | label `repository` 36 px at (940, 1545) | `busy` spins while fetching |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| hop | [470, y_src] | [550, y_dst] | — | a transcript row justifies a handoff row; drawn only as chip routes (no resting wire), one per hop |
| hand | handoff.bottom (800, 1140) | session2.top (440, 1375) | [800, 1300], [440, 1300] | the handoff goes to the next session; also carries the failed question back up in beat 1 |
| fetch | session2.right (690, 1450) | repo.left (≈ 870, 1450) | — | session 2 follows the reference to the source |

Hops are short diagonals across the 80 px gap; the chips fade at both ends so they never cover row text. The `hand` wire's horizontal run at y = 1300 passes under both size bars (y = 1210) and above session 2. Stage spans y ≈ 700–1545.

## Sound map

Pitches: transcript **E5**, handoff **G5**, session 2 **C5**, repository **A5**. Pan by x: transcript left (`−0.5`), handoff and repository right (`+0.5`), session 2 slightly left (`−0.2`).

| event | preset | notes |
|---|---|---|
| transcript rows appear | `store` | quiet, pan left, ×7 at 0.2 s |
| keep row noted | `ack` | E5 |
| vague summary written | `store` | quiet, mid |
| handoff leaves and lands | `send` G6, `arrive` C5 | |
| session 2 asks | `send` | C6 |
| nothing to retrieve | `miss` | at the handoff; the transcript's keep row pulses with a quiet `thump` |
| vague line removed | `poof` | quiet |
| a field is filled | `send` E6 then `store` G5 | per hop; the keep hop adds `ack` G5 |
| three rows fold into one | `poof` (quiet) then `store` G5 | history compressed |
| session 2 reads | `ack` | C5 |
| fetch leaves | `send` | C6 |
| repository works | `work` | ×3 at 0.2 s, pan right |
| contract returns | `store` A5 then `hit` | at session 2 |
| contract in hand | `chime` | the brightest event |
| incidental segment shrinks | `poof` | quiet, pan left |
| decisive stays | `ack` E5 then `ack` G5 | the two keep rows pulse together |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — A vague summary loses the contract (0.0–10.0)** | | | |
| 0.0 | — | transcript rows hidden; handoff rows hidden; bars empty; session2 `waiting`; repo idle | — |
| 0.6–1.8 | transcript rows pop in order (0.2 s each) | rows fg; row3 `keep: total_cents` accent | store × 7 (quiet) |
| 2.0 | row3 pulses | — | ack E5 |
| 2.4 | — | `sizeL` segments tween in: seg0 0.45 mid, seg1 0.40 fg, seg2 0.15 accent (0.6 s) | — |
| 3.0–3.7 | chip `summary` (mid) [470, 950] → [550, 790], 0.7 s | — | send E6 (quiet) |
| 3.7 | — | handoff row0 → `optimize invoice · ok` mid; `sizeR` seg0 → 0.06 | store (quiet) |
| 4.5–5.5 | chip `handoff` (mid) handoff.bottom → via → session2.top, 1.0 s | — | send G6 |
| 5.5 | ripple at session2.top | session2 stroke → active; sublabel → `resumes` | arrive C5 |
| 6.2–7.2 | chip `total_cents?` (fg) session2.top → via → handoff.bottom, 1.0 s | — | send C6 |
| 7.2 | bad ripple with × at handoff.bottom | handoff row0 flashes bad then mid; transcript row3 pulses bad then accent | miss, thump (quiet) |
| 7.2–9.0 | hold | the constraint is in the transcript and nowhere in the handoff | |
| 9.0 | — | handoff row0 alpha → 0; `sizeR` seg0 → 0; session2 stroke → mid, sublabel → `waiting` | poof (quiet) |
| 9.0–10.0 | hold | | |
| **Beat 2 — Record goal, constraint, evidence, and open work (10.0–19.0)** | | | |
| 10.0 | transcript row0 flashes | — | — |
| 10.0–10.6 | chip `goal` (fg) [470, 770] → [550, 790] | handoff row0 → `goal   fix latency`; `sizeR` → 0.06 | send E6, store G5 |
| 11.2–11.8 | transcript row3 flashes accent; chip `keep` (accent) [470, 950] → [550, 850] | handoff row1 → `keep   total_cents` accent; `sizeR` → 0.12 | send E6, store G5, ack G5 |
| 12.4–13.0 | transcript row3 flashes again; chip `ref` (mid) [470, 950] → [550, 910] | handoff row2 → `ref    invoice-v1.md` mid; `sizeR` → 0.18 | send E6, store G5 |
| 13.6 | transcript rows 1, 2, 4 flash together then → alpha 0.5 | three lines about to become one | poof (quiet) |
| 13.8–14.4 | chip `check` (fg) [470, 890] → [550, 970] | handoff row3 → `check  pytest -k inv`; `sizeR` → 0.24 | send E6, store G5 |
| 14.9–15.5 | transcript row5 flashes; chip `done` (fg) [470, 1070] → [550, 1030] | handoff row4 → `done   batched query`; `sizeR` → 0.30 | send E6, store G5 |
| 16.1–16.7 | transcript row6 flashes; chip `open` (fg) [470, 1130] → [550, 1090] | handoff row5 → `open   cache TTL?`; `sizeR` → 0.35 | send E6, store G5 |
| 17.0 | — | handoff stroke → fg | — |
| 17.0–19.0 | hold | left bar long, right bar short; the keep row is in both | |
| **Beat 3 — The next session receives it and retrieves the source (19.0–25.5)** | | | |
| 19.0–20.0 | chip `handoff` (fg) handoff.bottom → via → session2.top, 1.0 s | — | send G6 |
| 20.0 | ripple at session2.top | session2 stroke → active; sublabel → `reads keep · ref` | arrive C5, ack C5 |
| 20.4 | handoff rows 1 and 2 pulse accent | — | — |
| 21.0–21.6 | chip `ref` (mid) session2.right → repo.left, 0.6 s | — | send C6 |
| 21.6–22.2 | — | repo `busy` → 1 (spinner) | work × 3 |
| 22.3–22.9 | chip `invoice-v1.md @a1f3` (ok) repo.left → session2.right, 0.6 s | repo `busy` → 0 | store A5 |
| 22.9 | ok ripple at session2.right | session2 stroke → ok with glow; sublabel → `has the contract` ok; handoff row2 → ok | hit, chime |
| 22.9–25.5 | hold | | |
| **Beat 4 — Shorten incidental history first; keep the decisive line (25.5–31.0)** | | | |
| 25.5 / 25.8 / 26.1 | transcript rows 1, 2, 4 → alpha 0.25 | — | poof × 3 (quiet, pan left) |
| 25.5–26.5 | — | `sizeL` seg0 0.45 → 0.12 (incidental shrinks); seg1 and seg2 unchanged | — |
| 26.8 | transcript row3 pulses accent; handoff row1 pulses accent | the decisive line is intact on both sides | ack E5, ack G5 |
| 26.8–29.5 | hold | final state: compressed transcript bar with its accent segment intact, six-row handoff, lit session 2 holding the contract | |
| 29.5–30.3 | — | `s.fade` to black, 0.8 s | — |
| 31.0 | end | finite ending | |

## Accuracy limits

- The transcript rows, handoff fields, and values are illustrative, drawn from the concept's invoice example. The six field names (`goal`, `keep`, `ref`, `check`, `done`, `open`) are short forms of the walkthrough's goal, constraints, evidence, checks, changes, and next action; `pytest -k inv` is truncated for legibility and the write-up carries the exact command.
- The vague line `optimize invoice · ok` is the concept's example handoff ("optimize invoice endpoint; unit tests pass"), shortened to fit a row.
- The size bars are relative and unitless. The three-segment left bar is a teaching classification of transcript lines into incidental tool output, task content, and decisive constraints; real transcripts are not labelled this way.
- Folding three transcript lines into one `check` row shows history being shortened into a single verifiable command and status; it does not claim that the two earlier test results remain current after later edits (the concept's pitfall about summarized "tests pass" belongs to the write-up and later lessons).
- The reference shows a file name; the chip returning from the repository adds `@a1f3` to stand for a revision identifier. Real references may be paths, URLs, commit hashes, or retrieval times.
- Session 2's retrieval is shown as a single fetch; the cut does not show session 2 verifying the contract's content or re-running the check.
- The quiet `poof` reuses an eviction preset for removing the vague line, folding rows, and shrinking the incidental segment; it is kept quiet so it does not read as a failure. Note the reuse in the hand-over.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `2.5, 9.0, 20.0, 26.5, 31.5, 34.0` (speed-1 ≈ 2.3, 8.1, 18.0, 23.9, 28.4, 30.6). Tile with ffmpeg and view the row; view the 9.0 s (failed question) and 20.0 s (filled handoff) stills at full size and at 350 px wide. Pass when all seven transcript rows and six handoff rows are readable at 350 px, the accent keep rows are distinguishable on both sides, both bar labels and the three left segments are distinguishable, and the `@a1f3` chip is readable.
2. **The loss is visible**: at 9.0 s the handoff has one mid row, the transcript's row3 is accent, the red × ripple sits at the handoff's bottom edge, and session 2 is lit with `resumes`.
3. **Hops justify fields**: during beat 2 each handoff row appears only after a transcript row has flashed; the fold at 13.6 s dims exactly rows 1, 2, and 4 before the `check` chip leaves.
4. **Reference pays off**: at 26.5 s session 2 reads `has the contract` in ok, handoff row2 is ok, and the repository spinner is off.
5. **Order of shortening**: at 31.5 s the left bar's first segment is short while its accent segment is unchanged in length and position; transcript row3 is at full alpha while rows 1, 2, 4 are dim.
6. **No lingering state**: no chip remains during any hold; the vague line is gone from 9.0 s (speed 1) onward; the repository is idle in every still except during 21.6–22.2 s.
7. **Overlap**: hop chips must fade at both ends and not cover text in either panel; the `handoff` and `total_cents?` chips on the `hand` wire must not cross the `size` labels at y = 1210 (the wire runs at y = 1300); the `ref` and `invoice-v1.md @a1f3` chips must fit between session 2 and the repository (180 px); shorten the returning chip to `invoice-v1.md` if it does not fit at 40 px. Rows at 36 px mono (20 characters ≈ 432 px) fit inside 500 px with padding; transcript rows (18 characters ≈ 389 px) fit inside 420 px.
8. **Word budget**: on-screen text is two panel labels, seven transcript rows, six handoff rows, two bar labels, the session 2 label and sublabel, and the repository label. No sentence appears.
9. **Audio**: the Node dry-run lists ≈ 50 cues (7 stores, ack, store, send/arrive, send, miss/thump, poof, 6 hops of send+store with one ack and one poof, send/arrive/ack, send, 3 works, store/hit/chime, 3 poofs, 2 acks). The spectrogram shows the `miss` at 7.2 s as the only low falling event and the `chime` at 22.9 s as the brightest, with a sound on every landing. `ffprobe` reports ≈ 34 s with an audio stream. Record whether audio was heard or only analysed.
10. **Causal reading test**: with sound off and every word removed, a viewer should still see: a tall left list fills with one highlighted row; one grey chip hops to the right card and down to a bottom box; the box sends back up and gets a red ×, while the highlighted row on the left pulses; the grey row vanishes; six chips hop across one by one, the highlighted row crossing as a highlighted row, three left rows dimming before one of the hops; the right card goes down to the box, which reaches right to a cylinder and gets a green chip back and lights green; the left bar's first segment shrinks while its highlighted segment stays; the two highlighted rows pulse together.
11. **Project checks** after encoding: `python3 scripts/check_media.py --concept context-engineering`, then the full set before any release proposal. A new encode needs its own comparison review.

