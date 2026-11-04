# Lesson 05 — Record the outcome — plan B

Independent plan for the motion-v2 cut of human-in-the-loop lesson 05. Authored from the lesson entry in `video/human-in-the-loop/sequence/lessons.json` (item 5) and the concept content in `content/concepts/human-in-the-loop.json`. Earlier lessons' motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **after checking a matching approval and its own permission, the executor sends one deploy request with a unique key; when the executor crashes before hearing the answer and retries, the deploy system recognises the key and does not apply A a second time; the executor then records what it observed (one effect, the health result) next to, and separately from, the approval.**

The viewer should feel three things. A response travelling back to the executor disappears into a crash, so the executor does not know whether the deploy happened. The retry carries the same key and stops at the deploy API with `already done` while production's `effects 1` does not move. The final record keeps `approved R1` (true before anything ran) apart from the observed rows that only appeared after production answered.

Grounding: lesson beats ("in a separate run, artifact A is approved. The executor also checks permissions", "the executor performs the operation. A restart must not blindly repeat effects", "record the observed execution result. Keep it tied to the approved artifact", "report what actually happened. Approval and successful execution differ"); lesson takeaway ("human approval does not replace reliable execution. Use suitable idempotency and failure handling for the actual operation"); concept walkthrough step 5 (resumption can run earlier code again; keep the deployment outside the preparation node and make repeated execution harmless, for example by reconciling a unique release request with the deployment system; moving code after an interrupt alone is not a general exactly-once guarantee); concept exercise success criteria (one intended deployment effect across duplicate resumption; the log identifies reviewer, artifact and target); concept pitfall (treating approval as proof that a release is correct). Sources per the concept file, retrieved 2026-10-19: [LangGraph Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts) for node re-execution on resume, and [OWASP Transaction Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Transaction_Authorization_Cheat_Sheet.html) for enforcing authorization at execution. The cut shows the pattern generically and claims no particular framework or deployment product feature.

Out of scope (earlier lessons): role separation (01), evidence contents (02), pausing and checkpoints (03), approval mismatch and B (04). Also out: rollback, partial or failed rollouts, alerting, and retry back-off policy. The run is explicitly a new run in which A is already approved; it does not replay the earlier lessons' story.

Grammar for this cut: **a sequence diagram.** Three lifelines (executor, deploy API, production) run down the stage; time flows downward; each message is a horizontal arrow that draws itself as a chip travels along it and leaves a short label behind. Each lifeline header carries the actor's live state: the executor's checks and key, the API's remembered keys, production's running version and effect count. An outcome record sits beneath the diagram. This differs from lesson 01's role cards, lesson 02's request form, lesson 03's step column and checkpoint store, and lesson 04's comparison table. Every element is a software object: a request, a response, an idempotency key, an effect counter, a health probe, a record row. No stamps, receipts, padlocks or physical counters.

Target length ≈ 44 s at speed 1 (`meta.speed: 1`). The crash and retry need room to read; do not compress them. If stills read fast, lengthen the hold after the retry first.

## Engine notes

Lifelines are `s.wire` segments between raw points (dashed resting colour). Message arrows are `s.wire` between raw points on two lifelines, alpha 0 until their chip travels; draw a short arrowhead with a `label` (`▸` or `◂`, 40 px) at the receiving end if the engine has no arrowheads. The executor's crash uses `box` colour, `s.shake` and a red `x` ripple; the lost response is a chip that fades at the ripple. Headers are `box` nodes; state lines are `label` nodes. The record is a `store` with 5 rows. No new node type is expected. Use a cut-local engine copy with the repository-pinned Puppeteer; if chip text renders below 40 px, add a `labelSize` option there and report it.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); node names 44–48 px; monospace at 40 px ≈ 24 px per character. Content stays within x 40–1040 and y 460–1780.

Lifeline x: executor **180**, deploy API **560**, production **920**.

| id | type | centre (x, y) | size / bounds | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Human-in-the-loop** / RECORD THE OUTCOME | engine title and subtitle |
| runlab | label | (540, 470) | 40 px mono, mid | `new run · release A` | marks a separate run |
| hExec | box | (180, 545) | 260 × 80 (x 50–310, y 505–585) | label `executor` 44 px | G5 |
| hApi | box | (560, 545) | 260 × 80 (x 430–690) | label `deploy API` 44 px | E5 |
| hProd | box | (920, 545) | 240 × 80 (x 800–1040) | label `production` 44 px | C4 |
| eChk1 | label | (180, 625) | 40 px mono | `approved A ✓` (≈ 288 px, x 36–324) | D5; hidden until beat 1 |
| eChk2 | label | (180, 675) | 40 px mono | `may deploy ✓` | hidden until beat 1 |
| eKey | label | (180, 725) | 40 px mono, accent | `key k7` | hidden until beat 1 |
| aKeys | label | (560, 625) | 40 px mono | `keys —` → `seen k7` accent | |
| pRun | label | (920, 625) | 40 px mono | `run prev` → `run A` ok | |
| pEff | label | (920, 675) | 40 px mono | `effects 0` → `effects 1` | never exceeds 1 |
| lifelines | wires (dashed) | x 180 / 560 / 920 | y 760 → 1340 | — | executor segment 900–990 turns bad during the crash |
| m1 | arrow + label | y 800, x 180 → 560 | label `deploy A · k7` at (370, 772), ≈ 312 px | first request | |
| m2 | arrow + label | y 870, x 560 → 920 | label `apply A` at (740, 842) | the one real effect | |
| m3 | arrow + label | y 940, x 560 → 180 (fades at x 200) | label `applied` at (370, 912) | lost response; label shown struck through or bad | |
| crashMark | ripple anchor | (180, 940) | r1 ≈ 60 | red `x` | |
| restart | label | (180, 1010) | 40 px, mid, ≈ 168 px (x 96–264) | `restart` | hidden until 14.0 s; see the coordinate note |
| m4 | arrow + label | y 1080, x 180 → 560 | label `deploy A · k7` at (370, 1052), accent | the retry; same key | |
| m5 | arrow + label | y 1150, x 560 → 180 | label `already done` at (370, 1122), ≈ 288 px | API recognises k7 | |
| m6 | arrow + label | y 1230, x 180 → 920 | label `health?` at (370, 1202) | probe | crosses the API lifeline; draw its line over the dashed lifeline |
| m7 | arrow + label | y 1300, x 920 → 180 | label `ok · A` at (740, 1272) | observed result | |
| record | store, `rows: 5`, w 860 | (540, 1600) | 860 × ≈ 300 (x 110–970, y ≈ 1450–1750) | label `outcome record` 44 px at (540, 1405); rows 40 px mono | row0 `artifact  A · 9f3a…` · row1 `target    prod` · row2 `approved  R1` · row3 `effects   1 · key k7` · row4 `observed  ok · A running`; hidden until beat 3 |

Coordinate note: keep the `restart` label at (180, 1010) with its 168 px width (x 96–264); it sits between m3 (y 940) and m4's label (y 1052) with ≥ 20 px clearance. Arrow labels sit 28 px above their arrow line and must not touch the line of the previous message. The record's label at y 1405 must clear the lifeline ends at 1340.

## Sound map

Actor pitches: executor **G5**, deploy API **E5**, production **C4**, approval facts **D5**, outcome record **A5**. Sends one octave up and quieter. Pan by x: executor left (≈ −0.6), API centre, production right (≈ +0.6), record centre.

| event | preset | notes |
|---|---|---|
| approval and permission checks | `ack` D5 ×2 | quiet, no chime: approval is a precondition, not success |
| key created | `store` G5 | |
| request leaves executor | `send` G6 | both m1 and m4 |
| API receives | `arrive` E5 | API remembering k7 adds `store` E5 |
| production applies A | `arrive` C4 then `store` C4 | the single effect |
| executor crash | `crash` | loudest event |
| response lost | `poof` | quiet, at the × |
| restart | `recover` | |
| retry recognised | `hit` E5 | API knows the key |
| production unchanged | `ack` C4 | quiet pulse on `effects 1` |
| health probe and reply | `send` G6 / `deliver` C5 | |
| record row written | `store` A5 | one per row |
| final pairing | `ack` D5 then `ack` C4 | approval fact, then observed fact |

No music, no celebratory fanfare, no ticking during holds.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — A separate run: approved, permitted, keyed (0–7.5)** | | | |
| 0.0–1.0 | stage fades in | three headers, lifelines dim, `keys —`, `run prev`, `effects 0`; runlab `new run · release A` | — |
| 1.6 | eChk1 pops | `approved A ✓` | ack D5 |
| 2.5 | eChk2 pops | `may deploy ✓` | ack D5 |
| 3.4 | eKey pops, hExec active | `key k7` accent | store G5 |
| 3.4–7.5 | hold | ready to call, nothing sent yet | |
| **Beat 2 — Perform once; a restart must not repeat the effect (7.5–22.0)** | | | |
| 7.5–8.3 | chip `deploy A · k7` on m1; arrow draws | — | send G6 |
| 8.3 | ripple at API lifeline | aKeys → `seen k7` accent | arrive E5, store E5 |
| 9.2–9.9 | chip `apply A` on m2 | — | — |
| 9.9 | ripple at production | pRun `run A` ok; pEff `effects 1` | arrive C4, store C4 |
| 10.8–11.4 | chip `applied` on m3 heading left | — | — |
| 11.3 | executor crash: hExec bad, shake ±14 px, lifeline 900–990 bad, red × at (180, 940) | chip fades at the × (response lost); eChk/eKey labels dim to 0.4 | crash, then poof (quiet) at 11.5 |
| 11.5–14.0 | hold | production says `run A · effects 1`; the executor never heard | |
| 14.0–14.8 | hExec red fades; × shrinks; labels return to full | `restart` label at (180, 1010) | recover |
| 15.2 | eKey pulses accent | the executor still has `key k7` | — |
| 15.6–16.4 | chip `deploy A · k7` (accent) on m4 | — | send G6 |
| 16.4 | ripple at API; aKeys `seen k7` pulses | key recognised; no arrow toward production | hit E5 |
| 17.2–17.9 | chip `already done` on m5 | executor ripple | arrive G5 |
| 18.4 | pEff pulses mid, unchanged | `effects 1` | ack C4 |
| 18.4–22.0 | hold | two requests on the diagram, one apply arrow, one effect | |
| **Beat 3 — Observe and record, tied to A (22.0–33.0)** | | | |
| 22.0–22.8 | chip `health?` on m6 | — | send G6 |
| 23.0–23.8 | chip `ok · A` on m7 | executor ripple | deliver C5 |
| 24.6 | record label and empty frame fade in | `outcome record` | — |
| 25.2 / 26.0 / 26.8 / 27.6 / 28.4 | rows 0–4 fill in turn | `artifact A · 9f3a…` · `target prod` · `approved R1` · `effects 1 · key k7` · `observed ok · A running` | store A5 ×5 |
| 28.4–33.0 | hold | the full record | |
| **Beat 4 — Approval and successful execution are different facts (33.0–44.0)** | | | |
| 33.0 | eChk1 and record row2 pulse D-colour together | approval: known at 1.6 s, before anything ran | ack D5 |
| 34.4 | pEff, m7 label and record rows 3–4 pulse ok together | execution: known only from production's answers | ack C4 |
| 35.2 | m3 label (lost `applied`) pulses bad once | the executor's own view was lost; the record uses what was observed afterwards | — |
| 35.2–42.4 | hold | final state | |
| 42.4–43.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 44.0 | end | | |

## Accuracy limits

- `k7` stands for a unique request identity the deployment system can reconcile. Duplicate protection depends on that system actually honouring or reconciling the key (and keeping it long enough); this is a design choice for the real operation, not a general exactly-once guarantee.
- The crash timing (after apply, before the response) is chosen to show why a blind repeat is dangerous. Other crash points exist; the write-up covers them. Framework resumption re-running earlier node code is the reason the deploy call must be safe to repeat; the cut does not show any framework's internals.
- `may deploy ✓` is the executor's own permission for this target, separate from the human approval. Which credential and scope are used is not drawn.
- `approved A ✓` and `approved R1` assume a matching approval for this exact artifact and target, checked as in earlier lessons; the identity check is not re-dramatised here.
- `ok · A` is a point-in-time health observation. It is evidence the deploy took effect, not proof that release A is correct; approval is not proof either.
- The record stands for protected application state that identifies reviewer, artifact and target, as the concept's exercise requires. Storage, authentication and retention are not drawn.
- Failed or partial deployments, rollback and alerting are not shown. A failed apply would be recorded as observed, never upgraded to success because the release was approved.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 2.0, 3.8, 6.0, 8.5, 10.2, 11.2, 11.6, 13.0, 15.0, 16.6, 18.0, 20.5, 23.9, 26.2, 28.6, 31.0, 33.2, 34.6, 38.0 and 42.8 s, plus before/mid/after each chip arrival. At 350 px, the three header names, all header state lines, every arrow label and all five record rows must be readable. Shorten a label before reducing it below 40 px.
2. Lost response: the `applied` chip never reaches the executor's lifeline; it fades at the red ×. The × and bad lifeline segment clear after the restart and do not linger past 14.8 s.
3. One effect: exactly one arrow ever reaches production carrying `apply A` (m2). After the retry, no chip, dot or arrow travels from the API toward production. `effects` reads `1` in every frame from 9.9 s to the end and never shows 2.
4. Same key: both request labels read `deploy A · k7`; `seen k7` is visible under the API header from 8.3 s; the retry visibly pulses it at 16.4 s.
5. Record provenance: rows appear only after the `ok · A` reply lands; `approved R1` and the observed rows pulse at different times in beat 4, each with its own source.
6. Clearance: arrow labels do not overlap the previous message line, the `restart` label, lifeline header state lines or each other; m6's line over the API lifeline does not hide the `already done` label; no chip remains during a hold; nothing enters the title band.
7. Silent reading: with sound off and words ignored, a viewer sees two ticks and a key appear under the left header; a message goes right, then on to the far right, where a counter turns to 1; a reply heading left vanishes into a red burst on the left lifeline; the left actor recovers and sends the same message again, which is answered from the middle without anything reaching the far right; a probe and reply; a five-row record fills; the top-left tick and one record row light together, then the far-right counter and two record rows light together.
8. Audio: the dry run lists one `crash` (loudest, ≈ 11.3 s), one quiet `poof`, one `hit` at the retry, five record `store`s and no `chime`. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding run `python3 scripts/check_media.py --concept human-in-the-loop`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

