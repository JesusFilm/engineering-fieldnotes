# Lesson 02 — Give the reviewer evidence — plan B

Independent plan for the motion-v2 cut of human-in-the-loop lesson 02. Authored from the lesson entry in `video/human-in-the-loop/sequence/lessons.json` (item 2) and the concept content in `content/concepts/human-in-the-loop.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a review request is a concrete, inspectable record (artifact identity, target, observed checks, risks) rather than a vague prompt; the reviewer decides about that record, the decision stores the identity of the action it applies to, and execution checks that same identity, so a later artifact is not covered by the decision.**

The viewer should feel the request becoming inspectable one field at a time, with the reviewer's count rising from `sees 0 fields` to `sees 4 fields`; the decision record being built by copying the identity fields out of the request; and the executor saying yes to `A` and no to `B` against the same record.

Grounding (from the concept): "a reviewer needs a concrete action and supporting evidence; the executor needs a trustworthy decision about that same action"; the walkthrough's packet contents (artifact digest, production target, test evidence, risks and recovery) and "give the reviewer something inspectable beyond the agent's confidence"; "record the authenticated reviewer, decision and packet identity in protected application state"; the pitfall: "approving a broad task such as 'ship the fix' while the executable artifact keeps changing"; the lesson's takeaway: "approval is not a blanket permission for future changes."

Out of scope: the three-role separation and credentials (lesson 01), the full substitution story of B replacing A while approval waits (a later lesson; here B only appears as a check against the record), pausing and durable retention, restart and replay, and rejection outcomes. The cut ends with the executor's two identity checks.

Grammar for this cut: **a review request form at the top that fills field by field, a reviewer with a field count on the left, a decision record on the right built by copying from the form, and an executor at the bottom that checks two artifacts against the record.** The form rows are the evidence; the count is what the reviewer can inspect; the copy chips are the binding; the executor's two marks are the consequence. This differs from lesson 01 (three role cards with a two-slot executor and a status strip), from the guardrails cuts that bound approval values and rechecked a ledger (here the emphasis is on the request's fields becoming inspectable and the decision copying them), from the other topics' cuts, and from the harness-engineering views. Every element is a software object: a request field, a reviewer's view, a decision record, an artifact identity, an executor check.

Target length ≈ 36 s at playback. Authored at speed 1 for 32.5 s with `meta.speed: 0.9`. Lengthen the hold on the vague request and the hold after the identity is copied first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows and sublabels are 36 px monospace (≈ 21.6 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Human-in-the-loop** / GIVE THE REVIEWER EVIDENCE | engine title + subtitle |
| request | store, `rows: 4`, w 700 | (540, 660) | 700 × ≈ 260 (x 190–890, y ≈ 530–790); row centres y ≈ 565, 630, 695, 760 | label `review request` 40 px at (540, 490); rows 36 px mono | vague: row0 `"ship the fix?"` mid, rows 1–3 hidden; concrete: row0 `artifact  A · 9f3a…` accent · row1 `target    prod` accent · row2 `tests     12 pass` ok · row3 `risk      migration · low` (max 24 characters ≈ 518 px) |
| badge | badge | (890, 530) | — | `vague` mid | top-right of the request; shown only while the request is a one-liner |
| reviewer | box | (250, 1050) | 380 × 150 (x 60–440, y 975–1125) | label `reviewer` 44 px; sublabel 36 px mono `sees 0 fields` → `sees 2 fields` → `sees 4 fields` → `decides` | |
| decision | store, `rows: 3`, w 460 | (800, 1060) | 460 × ≈ 200 (x 570–1030, y ≈ 960–1160); row centres y ≈ 995, 1060, 1125 | label `decision record` 40 px at (800, 920); rows 36 px mono, hidden until written | row0 `decision  approve` ok · row1 `applies   A · 9f3a…` accent · row2 `target    prod` accent |
| artB | store, `rows: 1`, w 460 | (330, 1400) | 460 × ≈ 90 (x 100–560, y ≈ 1355–1445) | label `later` 36 px at (330, 1315); row 36 px mono, hidden until beat 4 | row0 `artifact  B · c71d…` mid |
| executor | box | (800, 1420) | 460 × 150 (x 570–1030, y 1345–1495) | label `executor` 44 px; sublabel 36 px mono `checks identity` → `A ✓` → `A ✓ · B ✗` | marks at (650, 1345) for A and (900, 1345) for B |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| inspect | request.bottom (540, 790) | reviewer.top (250, 975) | [540, 880], [250, 880] | the reviewer reads the request |
| decide | reviewer.right (440, 1050) | decision.left (570, 1060) | — | the reviewer's decision is written (130 px) |
| copy | request.right (890, 660) | decision.top (800, 960) | [960, 660], [960, 900], [800, 900] | the identity fields are copied from the request into the decision record, down the right margin |
| checkA | decision.bottom (800, 1160) | executor.top (650, 1345) | [800, 1250], [650, 1250] | the record's identity is checked at the executor |
| checkB | artB.right (560, 1400) | executor.left (570, 1420) | — | the later artifact is checked against the same record (10 px: the chip is a short hop into the executor; widen by narrowing `artB` to 420 if needed) |

The `copy` path is separate from the `decide` path so the viewer sees that the decision record gets its identity from the request, not from the reviewer's judgement alone. Stage spans y ≈ 490–1495.

## Sound map

Pitches: request **E5**, reviewer **C5**, decision record **G5**, executor **A5**, artifact B **D5**. Pan by x: reviewer left (`−0.5`), decision and executor right (`+0.5`), request centre.

| event | preset | notes |
|---|---|---|
| vague request appears | `store` | E5, low gain; the badge adds `ack` (low C4) |
| reviewer cannot inspect | `miss` | gain ×0.5, pan left; grey × at the reviewer |
| a concrete field appears | `store` | E5; identity fields add `ack` C6 (quiet) |
| reviewer's count rises | `ack` | C5, quiet, one per step |
| reviewer inspects | `work` | ×4 at 0.25 s; request rows pulse in turn |
| decision made | `hit` | at the reviewer |
| decision row written | `store` | G5 |
| identity copied | `send` E6 (pan right), `store` G5 ×2 | the rows land in the record |
| executor checks A | `send` G6, `ack` A5 | green check |
| artifact B appears | `store` | D5, mid |
| executor checks B | `send` D6, `miss` | red × |
| decision refers to A only | `chime` | the record's identity rows pulse |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The proposal must name the artifact and its destination (0.0–8.5)** | | | |
| 0.0 | — | request rows hidden; decision rows hidden; artB hidden; reviewer `sees 0 fields`; executor `checks identity` | — |
| 0.6 | request row0 pops | `"ship the fix?"` mid | store E5 (low) |
| 1.1 | badge pops | `vague` mid | ack (low, quiet) |
| 1.8–2.6 | dot (mid) request.bottom → via → reviewer.top, 0.8 s | — | — |
| 2.6 | grey ripple with × at reviewer.top | reviewer sublabel stays `sees 0 fields`; stroke flickers mid | miss (quiet) |
| 2.6–4.5 | hold | a prompt to continue with nothing to look at | |
| 4.5 | request row0 swaps | `artifact  A · 9f3a…` accent; badge scale → 0 | store E5, ack C6 (quiet) |
| 5.1 | request row1 pops | `target    prod` accent | store E5, ack C6 (quiet) |
| 5.6 | reviewer sublabel swaps | `sees 2 fields` | ack C5 (quiet) |
| 5.6–8.5 | hold | an artifact and a destination: now there is an action | |
| **Beat 2 — Attach test results and relevant risks (8.5–15.0)** | | | |
| 8.5 | request row2 pops | `tests     12 pass` ok | store E5 |
| 9.1 | request row3 pops | `risk      migration · low` | store E5 |
| 9.6 | reviewer sublabel swaps | `sees 4 fields` | ack C5 (quiet) |
| 10.2–11.0 | dot (fg) request.bottom → via → reviewer.top, 0.8 s | — | — |
| 11.0 | ripple at reviewer.top | reviewer stroke → active | — |
| 11.2–12.2 | request rows pulse in turn (0.25 s apart) | the reviewer reads each field | work × 4 |
| 12.2–15.0 | hold | | |
| **Beat 3 — The reviewer decides about A; store the action it applies to (15.0–23.5)** | | | |
| 15.0 | reviewer pulses ok | sublabel → `decides` ok | hit |
| 15.5–16.1 | chip `approve` (ok) reviewer.right → decision.left, 0.6 s | — | — |
| 16.1 | ripple at decision.left | decision row0 → `decision  approve` ok | store G5 |
| 17.0–18.4 | chip `A · 9f3a… → prod` (accent) request.right → via → decision.top, 1.4 s | — | send E6 (pan right) |
| 18.4 / 18.8 | decision rows 1–2 pop | `applies   A · 9f3a…` · `target    prod` accent | store G5 ×2 |
| 19.3 | request rows 0–1 and decision rows 1–2 pulse together | the same identity in the request and the record | — |
| 19.3–23.5 | hold | a decision that names what it decided | |
| **Beat 4 — Approval refers to a concrete artifact; execution checks that identity (23.5–32.5)** | | | |
| 23.5–24.4 | dot (ok) decision.bottom → via → executor.top (650, 1345), 0.9 s | — | send G6 |
| 24.4 | ok ripple with check at (650, 1345) | executor sublabel → `A ✓` ok | ack A5 |
| 25.4 | artB row pops | `artifact  B · c71d…` mid; `later` label fades in | store D5 |
| 26.2–26.5 | chip `B · c71d…` (mid) artB.right → executor.left, 0.3 s | — | send D6 |
| 26.5 | bad ripple with × at (900, 1345) | executor sublabel → `A ✓ · B ✗` | miss |
| 27.2 | decision rows 1–2 pulse accent | the record covers A, and only A | chime |
| 27.2–31.0 | hold | final state: a four-field request, a reviewer who decided, a record naming A and prod, an executor with one check and one × | |
| 31.0–31.8 | — | `s.fade` to black, 0.8 s | — |
| 32.5 | end | finite ending | |

## Accuracy limits

- The artifact digests, target, test count, and risk line are illustrative, drawn from the concept's checkout example. The walkthrough's packet also includes a change summary, rollout steps, and a recovery plan; four rows are shown for legibility and the write-up carries the rest.
- `sees N fields` is a teaching counter for how much the reviewer can inspect; it does not measure evidence quality, and the concept warns against evidence too weak for a meaningful decision.
- The decision record stores the decision, artifact identity, and target. The concept also requires the authenticated reviewer's identity and protected application state; those are in the write-up and not drawn.
- The executor's `A ✓ · B ✗` shows identity checking against the record. The fuller story of B replacing A while approval waits, with B returned for review, is a later lesson; here B appears only as a later artifact that the record does not cover.
- The vague one-liner `"ship the fix?"` is the concept's pitfall rendered as text; the cut does not claim any particular tool phrases review requests that way.
- Approval here is not a claim that release A is correct; the concept says approval is not proof of correctness.
- No `poof` is used. The two `miss` sounds mark the uninspectable request and the uncovered artifact.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `4.0, 7.5, 15.0, 23.0, 31.0, 34.5` (speed-1 ≈ 3.6, 6.8, 13.5, 20.7, 27.9, 31.1). Tile with ffmpeg and view the row; view the 4.0 s (vague) and 31.0 s (final) stills at full size and at 350 px wide. Pass when the request rows, the reviewer sublabel, the decision rows, the artifact B row, and the executor sublabel are readable at 350 px, the grey × at the reviewer is visible at 4.0 s, and the check and × at the executor's top are both visible at 31.0 s.
2. **Vague before concrete**: at 4.0 s the request has one mid row, the badge reads `vague`, and the reviewer reads `sees 0 fields`; at 7.5 s the request has two accent rows, no badge, and the reviewer reads `sees 2 fields`.
3. **Identity copied, not invented**: the `copy` chip leaves the request's right edge and lands at the decision record's top (speed-1 17.0–18.4); decision rows 1–2 appear only after it lands and read the same digest and target as request rows 0–1.
4. **Same record, two answers**: at 31.0 s the executor reads `A ✓ · B ✗`, the decision record still names `A · 9f3a…`, and artifact B is on screen in mid.
5. **No lingering state**: no chip remains during any hold; the badge is gone from 4.5 s (speed 1); the reviewer's stroke settles after each ripple.
6. **Overlap**: the `copy` chip at x = 960 must stay inside the frame and clear of the decision record's right edge (1030) until it turns at y = 900; the `inspect` dot must not cross the `decision record` label at (800, 920) (it runs at y = 880 toward x = 250, away from it); the `checkA` dot must clear the `executor` label (it lands at the box's top); the `checkB` hop is 10 px: narrow `artB` to 420 px (x 120–540) for a 30 px hop, or let the chip start inside `artB` and fade in across the gap. Request rows at 36 px mono (24 characters ≈ 518 px) fit inside 700 px; decision rows (19 characters ≈ 410 px) fit inside 460 px with minimal padding.
7. **Word budget**: on-screen text is the request label and four rows, the badge, the reviewer label and sublabel, the decision label and three rows, the `later` label and one row, and the executor label and sublabel. No sentence appears beyond the quoted vague request.
8. **Audio**: the Node dry-run lists ≈ 30 cues (store with ack, miss, 2 stores with 2 acks, ack, 2 stores, ack, 4 works, hit, store, send, 2 stores, send/ack, store, send/miss, chime). The spectrogram shows two quiet `miss` events at 2.6 s and 26.5 s, the `hit` at 15.0 s, and the `chime` at 27.2 s as the brightest. `ffprobe` reports ≈ 36 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: a card with one grey row and a grey tag; a dot drops to a left box and gets a grey ×; the row changes to a highlighted one and a second highlighted row appears, the tag vanishes, and the left box's lower line changes; two more rows appear and the box's lower line changes again; a dot drops to the box, which glows while the card's rows pulse; the box turns green and sends a chip right into a card that gains a green row; a chip runs from the top card down the right margin into the same card, which gains two highlighted rows that pulse with the top card's first two rows; a dot drops from that card to a bottom-right box and a green check appears; a grey row appears at bottom-left and hops into the box, where a red × appears; the record's highlighted rows pulse.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept human-in-the-loop`, then the full set before any release proposal. A new encode needs its own comparison review.

