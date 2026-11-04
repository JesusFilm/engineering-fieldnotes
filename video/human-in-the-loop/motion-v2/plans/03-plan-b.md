# Lesson 03 — Pause without guessing — plan B

Independent plan for the motion-v2 cut of human-in-the-loop lesson 03. Authored from the lesson entry in `video/human-in-the-loop/sequence/lessons.json` (item 3) and the concept content in `content/concepts/human-in-the-loop.json`. Earlier lessons' motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **at a review boundary the workflow stops before the action, writes its position and the proposed artifact to durable storage, and stays stopped across a worker restart and across elapsed time; only a decision resumes it, and the resumed run rechecks the action before it may execute.**

The viewer should feel three things in sequence. The run's cursor stops on the `review` step while `execute` stays dark. The worker's memory is wiped by a crash while the checkpoint rows stay lit and refill the worker. A timer event reaches the paused step and bounces off without changing it. Only the reviewer's decision moves the run forward, and the execute step lights only after two recheck marks.

Grounding: lesson beats ("reaches a review boundary… pauses before executing", "save the state and proposed artifact", "do not interpret waiting as consent", "a decision can resume the workflow. Revalidate the action before execution"); lesson takeaway ("elapsed time is not approval… preserve the action under review"); concept walkthrough steps 2 and 4 (interrupts need a checkpointer and a thread ID and resume on the same thread; in-memory checkpoints disappear on process restart; choose durable storage when approvals must survive worker failure; recheck the release identity and current prerequisites at the executor). Sources: [LangGraph Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts) and [LangGraph Persistence](https://docs.langchain.com/oss/python/langgraph/persistence), retrieved 2026-10-19 per the concept file. The cut illustrates the pattern generically and does not depict a specific framework API.

Out of scope (later lessons or the write-up): a changed artifact B or any identity mismatch (lesson 04); performing the deployment, recording its result, node replay on resume, retries and duplicate effects (lesson 05); separation of roles and credentials (lesson 01); review evidence contents (lesson 02); rejection, cancellation, request expiry and abandoned-request ownership. The cut ends with the run cleared to execute and no execution performed.

Grammar for this cut: **a vertical column of three workflow steps on the left with the current step lit, a worker process and a reviewer on the right, a wide checkpoint store below, and an elapsed-time bar at the bottom.** The motion that teaches is position held: the cursor stays on `review` while the worker dies and returns, and while hours pass. This differs from the role cards of lesson 01 and the request form and decision record of lesson 02. Every element is a software object: a workflow step, a worker process, a checkpoint row, a timer event, a decision message, a recheck result. Do not use locks, gates, doors, hourglasses or traffic lights.

Target length ≈ 48 s at speed 1 (`meta.speed: 1`). The length comes from five beats each needing a real hold; do not compress the restart or the elapsed-time hold to reach a shorter guideline. If stills read fast, lengthen the holds after beats 3 and 4 first.

## Engine notes

No new node type is required. Use `box` for steps, worker and reviewer, `store` for the checkpoint, `bar` for elapsed time and `label` for the recheck results. Work in a cut-local copy of the engine with the repository-pinned Puppeteer. If `box` cannot animate a crash (`failed` exists only on `rack`), animate `color` to bad with `s.shake` and a red `x` ripple instead of adding a type. If chip text renders below 40 px, add a `labelSize` option in the local copy and report it.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text is 40 px (≈ 13 px at 350 wide); node names are 48 px; monospace at 40 px is ≈ 24 px per character. Content stays within x 60–1040 and y 470–1730.

| id | type | centre (x, y) | size / bounds | text | notes |
|---|---|---|---|---|---|
| title | title band | (540, 330) / (540, 405) | — | **Human-in-the-loop** / PAUSE WITHOUT GUESSING | engine title and subtitle |
| runlab | label | (290, 495) | 40 px mono | `run t-17` | names the thread the checkpoint belongs to |
| prepare | box | (290, 600) | 320 × 120 (x 130–450, y 540–660) | label `prepare` 48 px; sublabel 40 px `running` → `done` ok | |
| review | box | (290, 860) | 320 × 120 (x 130–450, y 800–920) | label `review` 48 px; sublabel `paused` accent → `resumed` ok | the boundary; accent stroke while paused |
| execute | box | (290, 1130) | 320 × 120 (x 130–450, y 1070–1190) | label `execute` 48 px; sublabel `not run` dim → `recheck` accent → `cleared` ok | alpha 0.35 until beat 5 |
| reviewer | box | (820, 620) | 400 × 140 (x 620–1020, y 550–690) | label `reviewer` 48 px; sublabel 40 px `no decision` mid → `approve A` ok | alpha 0.35 until notified |
| worker | box | (820, 980) | 400 × 150 (x 620–1020, y 905–1055) | label `worker` 48 px; sublabel 40 px mono `mem: t-17 · A` → `mem: —` → `mem: t-17 · A` | the process running the workflow; its sublabel is in-memory state |
| ckpt | store, `rows: 4`, w 800 | (540, 1450) | 800 × ≈ 280 (x 140–940, y ≈ 1310–1590) | label `checkpoint store` 44 px at (540, 1268), ≈ 390 px wide; rows 40 px mono | row0 `thread    t-17` · row1 `next      review` · row2 `artifact  A · 9f3a…` · row3 `decision  approve A` (hidden until beat 5) |
| chk1 | label | (640, 1110) | 40 px mono, ≈ 312 px wide | `artifact A ✓` ok | hidden until beat 5 |
| chk2 | label | (640, 1170) | 40 px mono, ≈ 336 px wide (x ≈ 472–808) | `target ready ✓` ok | hidden until beat 5 |
| elab | label | (540, 1650) | 40 px mono | `elapsed 0 h` → `2 h` → `8 h` → `24 h` | hidden until beat 4 |
| timer | bar, w 800 h 16 | (540, 1705) | x 140–940 | — | `seg0` fills mid-grey; never green |

Wires (dotted, resting `#3A3E45`):

| id | from | to | via | meaning |
|---|---|---|---|---|
| s1 | prepare.bottom (290, 660) | review.top (290, 800) | — | run advances to the boundary |
| s2 | review.bottom (290, 920) | execute.top (290, 1070) | — | the step the pause holds back; `dashed` 1 until beat 5 |
| notify | review.right (450, 860) | reviewer.left (620, 620) | [535, 860], [535, 620] | review requested |
| run | worker.left (620, 980) | [450, 880] | [560, 980], [560, 880] | the worker drives the current step (no chips; pulses only) |
| decide | reviewer.bottom (820, 690) | worker.top (820, 905) | — | the decision message is delivered to the runtime |
| save | [960, 1055] | ckpt.right (940, 1450) | [960, 1450] | worker writes and reads the checkpoint; chips at x 960 are ≤ 216 px wide (x 852–1068) |
| reload | ckpt top [290, 1310] | execute.bottom (290, 1190) | — | the recheck reads the saved artifact |
| tick | timer left (140, 1705) | review.left (130, 860) | [70, 1705], [70, 860] | timer events; carries dots only (a chip would clip at x 70) |

Check that `notify` and `run` stay visually distinct where both turn at x 535–560; if they read as one line, drop the `run` wire and pulse the worker and the current step together instead.

## Sound map

Actor pitches: workflow steps **E5**, worker **G5**, checkpoint store **C4** (low and solid), reviewer **A5**, execute **D5**. Sends one octave up and quieter. Pan by x: steps left (≈ −0.5), reviewer and worker right (≈ +0.5), store centre.

| event | preset | notes |
|---|---|---|
| prepare works | `work` C5 ×3, then `ack` C5 | quiet |
| run reaches the boundary | `arrive` E5 | then a held, lower `ack` E4 for "paused"; no alarm |
| review requested | `send` E6 | quiet |
| checkpoint row written | `store` C4 | one per row; the most recognisable recurring sound |
| worker crash | `crash` | loudest event in the cut |
| checkpoint survives | `ack` C4 ×3, one per row | same pitch as the writes |
| worker restarts | `recover` | followed by `arrive` G5 when memory reloads |
| elapsed time | `clock` | one tick per label step |
| timer event refused | `thump` | soft and low; quieter than the crash |
| decision | `chime` A5 | restrained; gain ≈ 0.6 |
| decision stored | `store` C4 | |
| resume | `arrive` E5 | |
| recheck passes | `ack` D5 ×2 | then `hit` D5 once for `cleared` |

No music, no continuous ticking during holds, and no deploy or success fanfare.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — The run reaches the review boundary (0–8.5)** | | | |
| 0.0–1.0 | stage fades in | steps dim, execute at 0.35, worker `mem: —`, store rows empty, reviewer at 0.35 | — |
| 1.5–2.5 | prepare stroke active | sublabel `running` | work C5 ×3 |
| 3.0 | prepare pulse | sublabel `done` ok | ack C5 |
| 3.6–4.2 | dot on s1 | — | — |
| 4.2 | ripple at review.top | review stroke accent, sublabel `paused`; worker sublabel `mem: t-17 · A` | arrive E5, ack E4 |
| 4.8–5.5 | dot on notify | reviewer alpha → 1, sublabel `no decision` mid | send E6 |
| 6.0 | execute pulses dim | `not run`; s2 stays dashed | — |
| 6.0–8.5 | hold | the run is parked before the action | |
| **Beat 2 — Save the state and the proposed artifact (8.5–16.0)** | | | |
| 8.5–9.3 | chip `save t-17` on save, worker → store | — | send G6 |
| 9.3 / 10.1 / 10.9 | ckpt rows 0, 1, 2 fill in turn | `thread t-17` · `next review` · `artifact A · 9f3a…` | store C4 ×3 |
| 11.6 | worker sublabel and ckpt rows pulse together | memory and checkpoint hold the same state | ack G5 |
| 12.0–16.0 | hold | | |
| **Beat 3 — The pause survives a worker restart (16.0–25.5)** | | | |
| 16.0 | worker snaps red, shakes ±14 px, red × ripple | sublabel → `mem: —` at 16.2 | crash |
| 16.8 / 17.2 / 17.6 | ckpt rows 0–2 pulse | rows unchanged and still lit | ack C4 ×3 |
| 16.8–19.0 | hold | review still `paused`; execute still `not run` | |
| 19.0–19.8 | worker red fades, × shrinks | worker stroke mid | recover |
| 20.0–20.7 | chip `load t-17` on save, store → worker | — | send C5 |
| 20.7 | ripple at worker | sublabel `mem: t-17 · A` | arrive G5 |
| 21.3 | review pulses accent | still `paused` | ack E5 |
| 21.8–25.5 | hold | same position after the restart | |
| **Beat 4 — Waiting is not consent (25.5–34.0)** | | | |
| 25.5 | elab fades in | `elapsed 0 h` | — |
| 26.0–29.0 | timer seg0 fills linearly to 1.0 | elab steps `2 h` at 26.8, `8 h` at 27.8, `24 h` at 28.8 | clock ×3 |
| 29.4–30.6 | grey dot on tick, bar → left margin → review.left | — | — |
| 30.6 | review jolts 8 px, grey × ripple at review.left | sublabel stays `paused`; execute stays `not run`; reviewer still `no decision` | thump |
| 31.2 | reviewer pulses mid | the decision is still missing | — |
| 31.2–34.0 | hold | a full elapsed bar beside an unchanged pause | |
| **Beat 5 — A decision resumes the run; recheck before execution (34.0–48.0)** | | | |
| 34.0 | reviewer pulse ok | sublabel `approve A` ok | chime A5 |
| 34.6–35.3 | chip `approve A` on decide | — | — |
| 35.3 | ripple at worker.top | worker stroke active | arrive G5 |
| 35.8–36.5 | dot on save, worker → store | ckpt row3 `decision approve A` ok | store C4 |
| 37.0 | review pulse ok | stroke ok, sublabel `resumed` | arrive E5 |
| 37.6 | s2 dashed → 0 | — | — |
| 37.6–38.2 | dot on s2 | execute alpha → 1, sublabel `recheck` accent | — |
| 38.6–39.2 | dot on reload, store → execute | ckpt row2 pulses (the saved artifact is reread) | — |
| 39.6 | chk1 pops, ok check ripple at execute.right | `artifact A ✓` | ack D5 |
| 40.6 | chk2 pops | `target ready ✓` | ack D5 |
| 41.4 | execute pulse ok | sublabel `cleared` ok | hit D5 |
| 41.4–47.0 | hold | final state: paused step resumed, checkpoint with four rows, two recheck marks, execute cleared and nothing executed | |
| 47.0–47.8 | `s.fade` to black, 0.8 s | finite ending | — |
| 48.0 | end | | |

## Accuracy limits

- The checkpoint store stands for durable storage chosen because approvals must survive worker failure. In-memory checkpoints would be lost on the restart shown. Durability covers the failures relevant to the application; it is not a guarantee against every failure (for example, storage loss).
- `t-17` is the thread identifier used to resume the same run. LangGraph's interrupt resumes on the same thread through a checkpointer; the cut shows the pattern without claiming a particular API, and does not show node replay on resume (lesson 05).
- The `mem:` sublabel is a teaching view of process memory. Real workers hold more than one line of state.
- The timer dot shows that elapsed time produces no approval. The cut does not prescribe what timeouts should do; expiry, escalation and cancellation are real outcomes the write-up covers, and none of them is approval.
- `approve A` is a decision about the saved artifact. Recording the authenticated reviewer and storing the decision in protected application state are required by the concept but drawn only as one checkpoint row.
- The two recheck marks illustrate rechecking the saved release identity and the target's current prerequisites at the executor. Both pass here. A failed recheck, a different artifact and concurrent changes between check and action are not dramatised.
- `cleared` means the execute step may proceed. No deployment, effect or result is shown; approval is not proof that release A is correct.
- `9f3a…` is an abbreviated illustrative digest; the stored identity is the full immutable value.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 3.2, 5.6, 7.5, 11.8, 16.3, 18.0, 20.9, 24.0, 28.9, 30.8, 33.0, 35.5, 36.6, 38.0, 39.8, 41.6 and 45.0 s, plus before/mid/after each sublabel switch. At 350 px, every step name, sublabel, checkpoint row, `elapsed 24 h` and both recheck labels must be readable. Shorten a label before reducing its size below 40 px.
2. Position held: from 4.2 to 37.0 s the review step reads `paused` with an accent stroke, execute reads `not run` at reduced alpha, and s2 is dashed. Any frame where execute brightens before 37.6 s fails.
3. Survival: at 18.0 s the worker is red and reads `mem: —` while all three checkpoint rows remain lit; at 20.9 s the worker reads `mem: t-17 · A` again and the review step is unchanged.
4. Time is not consent: at 30.8 s the bar is full, the label reads `elapsed 24 h`, the grey × sits at review.left, and no element turns green. The bar never uses the ok colour.
5. Decision then recheck: the reviewer turns ok before any resume motion; execute shows `recheck` before `cleared`; both marks appear before `cleared`.
6. Clearance: chk2 (x ≈ 472–808) keeps ≥ 20 px from execute (x 450) and from the save wire (x 960); `save` chips stay inside x 0–1080; `notify` and `run` read as separate routes; the timer dot does not cross a box label at x 70. No chip remains on screen during a hold.
7. Silent reading: with sound off and words ignored, a viewer sees a lit step stop while the step below stays dark; rows fill in a lower store; a right-hand box breaks while the rows stay lit, then refills from them; a bar fills and a dot bounces off the stopped step; a right-hand box turns green, the stopped step turns green, and the dark step lights only after two marks.
8. Audio: the dry run lists one crash (loudest), three store writes plus one at 36.5 s, three clock ticks and one thump. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding run `python3 scripts/check_media.py --concept human-in-the-loop`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

