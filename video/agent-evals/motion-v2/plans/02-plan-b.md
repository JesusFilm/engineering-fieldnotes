# Lesson 02 — Check actual behavior — plan B

Independent plan for the motion-v2 cut of agent-evals lesson 02. Authored from the lesson entry in `video/agent-evals/sequence/lessons.json` (item 2) and the concept content in `content/concepts/agent-evals.json`. No other plan for this lesson, no ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a grade rests on observed behaviour: run the patched code on an input whose expected outcome is known, compare the actual output with the expected one, and record that observation; the agent's statement that the bug is fixed is not an input to grading, and one passing case leaves the other required cases untested.**

The viewer should feel the probe: a test input enters the function, the function runs, an output comes out and is set beside the expected value, and the match is marked. Above it the agent's sentence sits connected to nothing that grades; below, one case turns green and two stay grey.

Grounding (from the concept): "a fluent completion message can hide an incorrect result"; "use code to check concrete outcomes"; "apply the patch and execute both the new requirement and existing behavior tests"; the example's empty-password bug; the lesson's takeaway: "grade observable results. A good explanation can accompany an incorrect patch."

Out of scope: the regression case and the deliberately bad patch (a later lesson), the grader's independence and the system frame (lesson 01), confirming the test environment ran correctly, repeated trials, and rubric grading of the explanation itself. The cut ends with one recorded pass and two pending cases.

Grammar for this cut: **a claim card above, a probe in the middle (input card → function box → expected/actual card), and a required-cases list below.** The claim's only wire is dashed and leads nowhere that grades; the probe's wires carry the input and the output; the cases list receives the observation. This differs from lesson 01 (a stacked evaluation record with a system frame and a results ledger), from the guardrails, orchestration, memory-architecture, context-engineering, tool-design, and loop-engineering cuts, and from the harness-engineering views. Every element is a software object: a claim, a test input, a function under test, an expected and actual output, a case list.

Target length ≈ 33 s at playback. Authored at speed 1 for 30 s with `meta.speed: 0.9`. Lengthen the hold on the expected/actual match and the hold on the pending cases first if stills read fast. Do not add beats to reach the guideline.

## Stage and coordinates (1080 × 1920)

Palette and type follow `references/style.md`. Names are 40–44 px; store rows, sublabels, and the function label are 36–40 px monospace (≈ 21.6–24 px per character). Everything stays readable at 350 px wide (≈ 12–13 px for the smallest). If packet chip text renders below 40 px, add a `labelSize` option in the local engine copy and report it.

| id | type | centre (x, y) | size | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Agent evals** / CHECK ACTUAL BEHAVIOR | engine title + subtitle |
| claim | store, `rows: 1`, w 700 | (540, 560) | 700 × ≈ 90 (x 190–890, y ≈ 515–605) | label `agent says` 36 px at (540, 480); row 36 px mono | row0 `"fixed the empty-password bug"` mid (30 characters ≈ 648 px; shorten to `"empty-password bug fixed"` 26 ≈ 562 px if padding is tight) |
| badge | badge | (890, 515) | — | `not evidence` mid | top-right of the claim card |
| input | store, `rows: 2`, w 300 | (210, 900) | 300 × ≈ 140 (x 60–360, y ≈ 830–970) | label `test input` 36 px at (210, 790); rows 36 px mono | row0 `user  alice` · row1 `pw    ""` accent |
| login | box | (540, 900) | 400 × 160 (x 340–740, y 820–980) | label `login(user, pw)` 40 px mono (15 characters ≈ 360 px); sublabel `patch applied` 36 px → `running…` → `returned` | the code under test |
| outcome | store, `rows: 2`, w 300 | (870, 900) | 300 × ≈ 140 (x 720–1020, y ≈ 830–970) | label `expected · actual` 36 px at (870, 790) (17 characters ≈ 367 px: wider than the card; allow overhang or use `outcome`); rows 36 px mono | row0 `expect  reject` accent · row1 `actual  —` → `actual  401` ok; mark at (1000, 900) |
| cases | store, `rows: 3`, w 620 | (540, 1300) | 620 × ≈ 200 (x 230–850, y ≈ 1200–1400); row centres y ≈ 1235, 1300, 1365 | label `required cases` 40 px at (540, 1160); rows 36 px mono | row0 `empty pw      —` → `empty pw      pass` ok · row1 `valid pw      —` dim · row2 `locked user   —` dim |

The input card's left edge at x 60 and the outcome card's right edge at x 1020 leave 60 px margins; the function box sits between them with 20 px gaps on each side — too tight for chips. Widen the gaps: input w 260 at x 190 (60–320), login w 380 at x 540 (350–730), outcome w 260 at x 890 (760–1020); gaps are 30 px each. Chips on these short hops fade at both ends and are read as hops into and out of the function. If the still shows crowding, drop the input and outcome card labels and rely on their rows.

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| claimline | claim.bottom (540, 605) | cases.top-left [300, 1200] | [300, 605] | the claim's path toward grading; `dashed` 1 and dim throughout, marked × once |
| feed | input.right (320, 900) | login.left (350, 900) | — | the test input enters the function |
| out | login.right (730, 900) | outcome.left (760, 900) | — | the function's output lands beside the expected value |
| record | outcome.bottom (890, 970) | cases.top (540, 1200) | [890, 1090], [540, 1090] | the observed result is recorded |

The claim's dashed line runs down the left side (x 300) and reaches the cases list only as a dashed, marked path; the observation reaches it on the right as a solid path. Stage spans y ≈ 480–1400.

## Sound map

Pitches: claim **C6** (quiet), input **C5**, function **E5**, outcome **G5**, cases **A5**. Pan by x: input left (`−0.6`), outcome right (`+0.6`), function and cases centre.

| event | preset | notes |
|---|---|---|
| claim appears | `ack` | C6, quiet |
| badge `not evidence` | `ack` | low (C4), quiet |
| claim's path marked | `miss` | gain ×0.5; grey × on the dashed line |
| probe parts appear | `store` | C5 (input rows), `ack` E5 (function), `store` G5 (expected row) |
| input enters the function | `send` C6, `arrive` E5 | |
| function runs | `work` | ×5 at 0.2 s |
| output emerges | `send` E6, `store` G5 | the `actual` row fills |
| expected and actual compared | `ack` G5 (quiet) then `hit` | green check between the rows |
| observation recorded | `send` G6, `store` A5 | |
| pending cases noted | `ack` | low (C4), quiet, ×2 |
| claim fades | `ack` | C6, quieter |
| one observed pass | `chime` | the brightest event |

## Beat sheet (times at speed 1)

| t | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — A statement is not the behaviour (0.0–7.5)** | | | |
| 0.0 | — | claim hidden; input rows hidden; login `patch applied`; outcome rows hidden; cases rows `—` with rows 1–2 dim; `claimline` dashed dim | — |
| 0.6 | claim row pops | `"empty-password bug fixed"` mid | ack C6 (quiet) |
| 1.4 | badge pops | `not evidence` mid | ack (low, quiet) |
| 2.2 | `claimline` alpha → 0.7 for 1.0 s; grey ripple with × at (300, 900) | the claim has no route into grading | miss (quiet) |
| 3.0 / 3.3 | input rows pop | `user  alice` · `pw    ""` accent | store C5 ×2 |
| 3.8 | login pulses | — | ack E5 |
| 4.3 | outcome row0 pops | `expect  reject` accent; row1 `actual  —` dim | store G5 |
| 4.3–7.5 | hold | a claim above, a probe below with a known expected value and no actual yet | |
| **Beat 2 — Run the patch with an empty password (7.5–13.5)** | | | |
| 7.5 | input row1 pulses accent | — | — |
| 7.9–8.4 | chip `pw ""` (accent) input.right → login.left, 0.5 s | — | send C6 |
| 8.4 | ripple at login.left | login stroke → active; sublabel → `running…` | arrive E5 |
| 8.6–9.6 | — | glow held | work × 5 |
| 9.6–13.5 | hold (the function has run; the output has not yet been placed) | login sublabel → `returned` at 9.8 | — |
| **Beat 3 — The empty password is rejected; this test passed (13.5–20.0)** | | | |
| 13.5–14.0 | chip `401 rejected` (ok) login.right → outcome.left, 0.5 s | — | send E6 |
| 14.0 | ripple at outcome.left | outcome row1 → `actual  401` ok; login stroke → fg | store G5 |
| 14.8 | outcome rows flash together | expected and actual compared | ack G5 (quiet) |
| 15.3 | ok ripple with check at (1000, 900) | outcome stroke → ok | hit |
| 15.3–20.0 | hold | `expect  reject` over `actual  401` with a check | |
| **Beat 4 — Record the observation; other cases still need testing (20.0–30.0)** | | | |
| 20.0–21.0 | chip `observed · pass` (ok) outcome.bottom → via → cases.top, 1.0 s | — | send G6 |
| 21.0 | ripple at cases.top | cases row0 → `empty pw      pass` ok | store A5 |
| 21.8 / 22.2 | cases rows 1 and 2 pulse at dim | `valid pw      —` · `locked user   —` | ack (low, quiet) ×2 |
| 22.8 | — | claim row and badge alpha → 0.4 (0.6 s) | ack C6 (quieter) |
| 23.3 | cases row0 pulses ok | one observed result on the record | chime |
| 23.3–28.5 | hold | final state: a faded claim, a probe showing expected and actual with a check, a cases list with one pass and two pending | |
| 28.5–29.3 | — | `s.fade` to black, 0.8 s | — |
| 30.0 | end | finite ending | |

## Accuracy limits

- The function, inputs, status code, and case names are illustrative, drawn from the concept's authentication example. `401` stands for a rejected login; the expected value is given as `reject` so the comparison reads as behaviour against intent.
- The probe is one input and one output. Real tests assert on more than a status code and run inside a fixture; the write-up carries the walkthrough's steps.
- The dashed claim line with a grey × depicts that the statement does not enter grading. The concept also allows rubric grading of explanation quality as a separate, subjective measure; the cut does not show that and makes no claim that explanations are worthless.
- `valid pw` and `locked user` are pending required cases named so the viewer sees the suite is incomplete; the regression case and the bad patch that fails it are a later lesson.
- The function's run time on screen is fixed and does not represent real execution; confirming that the test actually ran (not a timeout or missing dependency) is also a later lesson.
- No `poof` is used. The quiet `miss` marks the claim's lack of a grading route.

## Acceptance checks

1. **Stills per beat** at playback seconds (speed 0.9): `7.0, 12.0, 18.5, 24.0, 29.5, 32.0` (speed-1 ≈ 6.3, 10.8, 16.7, 21.6, 26.6, 28.8). Tile with ffmpeg and view the row; view the 18.5 s (match) and 29.5 s (final) stills at full size and at 350 px wide. Pass when the claim row, both input rows, the function label and sublabel, both outcome rows, and the three cases rows are readable at 350 px, the check beside the outcome rows is visible, the dashed claim line with its × is visible, and the faded claim at 29.5 s is clearly dimmer than the cases list.
2. **Claim has no route**: the `claimline` is dashed in every still and carries no chip; the × at (300, 900) appears once in beat 1.
3. **Expected before actual**: at 7.0 s the outcome card shows `expect  reject` and `actual  —`; at 12.0 s the function has run and the actual row is still `—`; at 18.5 s it reads `actual  401` with a check.
4. **One recorded, two pending**: at 29.5 s cases row0 reads `pass` in ok and rows 1–2 read `—` in dim.
5. **No lingering state**: no chip remains during any hold; the function's glow is off after the output leaves; the badge fades with the claim.
6. **Overlap**: the `pw ""` and `401 rejected` chips must fade at both ends across their 30 px gaps and must not cover the function label; the `observed · pass` chip must clear the `required cases` label at y = 1160 except at arrival (shift to (540, 1150) if needed); the outcome card's label must not collide with the function label (they are at different heights, 790 and 900); the mark at (1000, 900) must clear the outcome rows' text (14 characters ≈ 302 px, ending ≈ x 1011 in a 260 px card: too close; move the mark to (1035, 900) or shorten rows to `exp  reject` / `act  401`). Apply the crowding fallback in the coordinates note if needed.
7. **Word budget**: on-screen text is the claim label and row, the badge, the input label and rows, the function label and sublabel, the outcome label and rows, and the cases label and rows. No sentence appears beyond the quoted claim.
8. **Audio**: the Node dry-run lists ≈ 24 cues (2 acks, miss, 2 stores, ack, store, send/arrive, 5 works, send/store, ack, hit, send/store, 2 acks, ack, chime). The spectrogram shows the quiet `miss` at 2.2 s, the work ticks at 8.6–9.6 s, the `hit` at 15.3 s, and the `chime` at 23.3 s as the brightest. `ffprobe` reports ≈ 33 s with an audio stream. Record whether audio was heard or only analysed.
9. **Causal reading test**: with sound off and every word removed, a viewer should still see: a grey line of text with a grey tag, and a dashed line below it that gets a grey ×; a small card on the left, a box in the middle, a card on the right with one highlighted row and one empty; a chip hops from the left card into the box, which glows; a green chip hops out into the right card's empty row, and a green check appears beside the two rows; a chip runs down to a bottom list whose first row turns green while two rows stay grey; the grey text at the top fades.
10. **Project checks** after encoding: `python3 scripts/check_media.py --concept agent-evals`, then the full set before any release proposal. A new encode needs its own comparison review.

