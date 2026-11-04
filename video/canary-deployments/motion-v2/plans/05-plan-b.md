# Canary deployments 05: Abort and verify recovery (plan B)

## Mechanism

One mechanism: after a candidate fails its release check, the rollout stops expanding, new requests go only to the v1 control, and the team calls the service recovered only after a fresh observation window shows healthy behavior. The video also shows the effects that rerouting cannot undo: a request already in progress on v2 finishes there, and rows that v2 already wrote stay in the shared database. The data question stays open when the video ends.

The viewer should come away with three ideas:

1. A failed check stops the next exposure step. It does not by itself mean the system is healthy.
2. "Zero new requests to v2" describes routing. It is a different claim from "recovered."
3. Recovery is a conclusion drawn from evidence. A routing change alone does not establish it, and data written by v2 needs its own decision.

Scope: lesson 5 only. Leave out promotion, gate design, pooled versus split rates (lessons 3–4), feature flags, blue/green deployment, schema migration mechanics, autoscaling, and real tooling such as Argo commands. The plan makes no deployment or real system changes.

## Source constraints carried into the scene

- Use the concept example values. The candidate's exports failed 40/100 and the control's failed 0/900 (lesson 4). The illustrative gate fails when candidate export errors exceed control by more than 5 points. All numbers are authored and illustrative, and one small corner tag says `ILLUSTRATIVE` for the whole video.
- The routing change takes time on screen. The share bar drains over about 1.2 s, and one request already in flight finishes on v2. The scene never shows the switch as instant or universal.
- The walkthrough says to preserve the failed window. v2 dims and remains visible, and its failure record stays pinned to the card. The candidate is never deleted or relabelled healthy.
- AWS rollback safety: reverting code does not repair stored data or completed external actions. The DB rows written by v2 stay amber through the ending with a `REPAIR?` tag. The video does not show the repair, because it is a separate decision.
- Observation and assumption have distinct styles. An assumption is a grey dashed outline chip with `?`. An observation is a solid chip with a measured count and a check or ×. The `HEALTHY?` chip that appears at abort stays grey and dashed until the evidence rows land.

## Stage (1080×1920, vertical; layout distinct from a plain top-down request flow)

| Zone | y | Elements |
|---|---|---|
| Title | 250–420 | `Abort & verify` / subtitle `CANARY · STEP 5` |
| Check card | 470–760 | Wide box (w≈920) at x 540. Header text changes in place: `RELEASE CHECK` → `RECOVERY CHECK`. Holds at most three rows of 46–52 px text |
| Exposure bar | ≈830 | `bar` w≈820 with two segments: v1 teal-grey, v2 amber. Ticks show planned steps `10%` (current), `25%`, `50%`. A small `NEXT` chevron sits under 25% |
| Router | ≈1050 | Box x 540 with two ports. New requests enter horizontally from the left edge (source dot at x≈90) |
| Versions | ≈1320 | v1 rack x 290 (`v1 CONTROL`), v2 rack x 790 (`v2 CANDIDATE`). Each has 3 slots |
| Shared data | ≈1600 | `db` x 540 labelled `ORDERS DB`, with a small `store` (2 rows) beside it for row markers |
| Corner | ≈1760 | `ILLUSTRATIVE` in dim 36 px; the stage keeps a clear margin below it |

The left-to-right request entry and the top check card give a different composition from earlier lessons. The eye moves from the evidence (top) to the routing control (middle), then to the services and the data (bottom).

## Legibility at an actual 350 px width

At 350 px the frame is scaled to 0.324×, so a 24 px label becomes about 8 px and is unreadable. Minimum sizes:

- Node labels: 44 px.
- Chips, counts, and card rows: 48–52 px, mono for numbers.
- FAIL, ✓ and × stamps: 64 px or larger.
- No label longer than about 18 characters. No full sentences.

At most about 7 labels should be visible on screen at once. Dim inactive elements to 30%. Exposure tick labels sit below the bar, never on top of the segment colours. After rendering, downscale every beat still to 350 px wide and inspect it at 100% zoom. Any label that cannot be read without zooming is a defect.

## Labels (all of them)

`RELEASE CHECK`, `v2 exports 40/100 ✗`, `v1 exports 0/900 ✓`, `FAIL`, `10%`, `25%`, `50%`, `NEXT` (struck), `HOLD`, `IN FLIGHT`, `NEW → v2: 0`, `HEALTHY?`, `RECOVERY CHECK`, `v1 errors 0/1,200`, `p95 180 ms`, `v2 new: 0`, `REQUESTS ✓`, `v2 ROWS: 12`, `REPAIR?`, `ILLUSTRATIVE`. Each count is fictional and stays small. The fresh-window numbers differ from the failed window so it is visibly a new window.

## Beat sheet (authored at speed 1, total ≈44 s)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0–3.0 | Steady stream every ~0.6 s. About 9 of 10 dots go to v1 and 1 of 10 to v2, for 4 cycles in total | Bar shows 90/10. Card shows the two failed-window rows in neutral grey | v1 arrivals: quiet C5 mallet. v2 arrivals: A4 mallet (distinct candidate pitch). Router send tick E6, very quiet |
| 3.0–4.2 | The `v2 exports 40/100` row flashes red. The comparison bracket to `v1 0/900` draws | Row turns red with ×. v1 row turns teal ✓ | Low `thump` on the red row, `ack` blip on the v1 row |
| 4.2–5.0 | `FAIL` stamp pops onto the card with overshoot | Card border turns red | Heavier custom `fail` sound (noise burst + falling sweep, no sub crash, because v2 is still running) |
| 5.0–7.0 | **Hold.** Traffic continues at 90/10 | — | Arrivals only |
| 7.0–8.2 | The `NEXT` chevron under 25% slides to the tick, stops, and a red strike crosses the 25% and 50% ticks. A `HOLD` chip pins at 10% | Expansion steps grey out. The share has not changed yet | Custom `latch` (two short dull clicks, router pitch) |
| 8.2–10.2 | **Hold.** One more v2-bound dot travels, making the point that stopping expansion is not the same as zero traffic | — | A4 arrival |
| 10.2–11.0 | Router pointer swings to the v1 port. The v2 port turns red-dim | Router state changes | `send`-pitch glide down from E6 to C5 |
| 11.0–12.2 | The bar's v2 segment drains 10% → 0 over 1.2 s. The v1 segment fills | Share 100/0 | A short falling A4 sine glide whose gain follows the drain |
| 11.2–12.6 | One amber dot already on the v2 wire continues, tagged `IN FLIGHT`. It lands in a v2 slot, which turns busy, then done | Shows that work in progress is not cancelled | Muted A4 arrival at half gain |
| 12.6–16.0 | Five new requests in a row all go to v1. The `NEW → v2: 0` counter appears under v2 and stays at 0 while v1's slots light up | v2 dims to 40% but stays visible with its red × history. It is preserved, not deleted | C5 arrivals only. Hearing the A4 vanish from the pattern is the audible cue |
| 16.0–17.5 | The grey dashed `HEALTHY?` chip fades in beside v1 | The assumption is visibly marked | A soft, unresolved two-note (C5 → D5) `query` |
| 17.5–19.5 | **Hold** | — | Steady quiet traffic ticks |
| 19.5–20.5 | The card header changes in place to `RECOVERY CHECK`. Old rows slide into a small collapsed `FAILED WINDOW · SAVED` strip at the card's top edge (44 px, dim red) | New window opens | `clock` tick |
| 20.5–23.5 | A small window bar under the card fills from left to right while v1 handles traffic. `s.mark` dots drop as samples arrive | Fresh observation accumulates | `clock` ticks, then `work` ticks every 0.25 s |
| 23.5–24.5 | Row `v1 errors 0/1,200` appears and turns teal ✓ | Observed | `ack` C6 |
| 25.2–26.2 | Row `p95 180 ms` appears with ✓ | Observed | `ack` E6 |
| 26.9–27.9 | Row `v2 new: 0` appears with ✓ (its source is router counts) | Observed | `ack` G6 |
| 28.2–29.2 | The `HEALTHY?` chip becomes solid teal `REQUESTS ✓`, with a green ripple on v1 | The assumption is replaced by an observation for the request path only | `chime` (C–G) |
| 29.2–31.5 | **Hold** | — | — |
| 31.5–32.5 | Attention moves down. The DB pulses amber and the side store shows `v2 ROWS: 12` in amber. The traffic dots keep going to v1 without touching those rows | Completed writes remain | `store` at a low A3 (candidate family, an octave down) |
| 32.5–33.5 | A `REPAIR?` dashed chip attaches to the rows. A dashed amber line from the v2 rack to the rows stays drawn | A separate, unresolved decision | `thump` at low gain, then nothing. Deliberately no chime |
| 33.5–36.5 | **Hold** on the split verdict: teal `REQUESTS ✓` above, amber `REPAIR?` below. The red `FAILED WINDOW` strip is still visible | Final state | Quiet v1 C5 arrivals only, about one per second |
| 36.5–38.0 | Traffic stops. Hold the still frame | — | — |
| 38.0–38.8 | `s.fade` to black. Title stays | Finite ending | None, or one very soft C5 |

Total ≈39 s plus a lead-in. If the first pass feels rushed, extend the three holds marked **Hold** by up to 1 s each, giving ≈42–44 s. Widen gaps rather than lowering `meta.speed` below 0.9. Do not add trailing black padding after the fade.

## Sound map (actor-specific, one sound per event)

- v1 control: C5 mallet arrivals, quiet. Stable family C / E / G.
- v2 candidate: A4 mallet arrivals. Its DB writes are A3. Losing A4 from the stream is the audible signature of "zero new to v2."
- Router: E6 send ticks at gain ~0.15. The `latch` and the downward glide are the router's own events.
- Check card: `thump` for the failed row, a custom `fail` stamp (the loudest moment in the video, with peak headroom ≥1 dB), then `ack` C6 / E6 / G6 for evidence rows, rising so the checks build toward a verdict.
- Recovery verdict: `chime` only for the request path.
- Data residue: low `thump` and no resolving chord. The unresolved sound matches the unresolved data.
- Pan each sound to its node's x (`s.panOf`). v1 is left, v2 is right, router and DB are centre.

## Production and verification steps (for the producing agent)

1. Copy the pinned engine into `video/canary-deployments/motion-v2/05/<variant>/` with the scene `abort-recover.js`. Keep extensions local: a dashed-outline chip style, a strike-through on bar ticks, and a header swap on the card. Name extensions by shape, never by topic.
2. Run the Node timing dry run and check that every beat row has exactly one cue and that the in-flight dot lands after the drain begins.
3. Take stills at 1.5, 4.6, 7.8, 11.6, 14, 17, 22, 28.8, 33, 36. Inspect each at full size and downscaled to 350 px. Confirm that the `HEALTHY?` chip is dashed until 28.2 s and that no green appears on the DB rows.
4. Render. Make a contact sheet and a spectrogram, run `volumedetect` (max below −1 dB), decode the whole file, and confirm the duration and audio stream with `ffprobe` and faststart metadata. Record whether the audio was actually heard or only analysed.
5. Do the defect pass from the skill review checklist, then propose improvements. Leave beat-text timing in `lessons.json` (0/7/14/21, 28 s) for the coordinator to retime to roughly 0 / 10 / 19.5 / 31.5.

## Risks to watch

- Reading "drain" as instant: keep the 1.2 s tween and the in-flight dot. Never cut the bar.
- Implying automatic recovery: the request check is earned through three observed rows, and the data chip never resolves.
- Clutter around the card swap: collapse the old rows into one saved strip rather than stacking six rows.
- Pitch confusion: A4 must be clearly distinct from C5 on phone speakers. If it is not, move v2 to a triangle timbre at the same pitch instead of adding volume.
