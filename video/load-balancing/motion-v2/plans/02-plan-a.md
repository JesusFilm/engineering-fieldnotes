# Share the work

## Focus and grounding

Two servers running the same service can process two independent requests concurrently. Each has one work slot in this simplified example. Adding the second slot does not split a request or halve its processing time. Someone still chooses each destination; the selection algorithm belongs to a later lesson.

Scope: `video/load-balancing/sequence/lessons.json` item 2 and `content/concepts/load-balancing.json`. The sequence supplies the one-slot capacity assumption and independent-request teaching claim. The concept supplies the limits: replicas are not unlimited capacity and routing policy must not be confused with execution. The two request durations and chosen destinations below are illustrative, not benchmark results.

Five beats, 44 seconds, finite ending. No balancing policy, queue, overload, failure, retry, migration, or shared-state consistency lesson. No comparison that promises twice the throughput in an arbitrary deployment.

## Software-native layout

Use two **server execution lanes** beneath a compact application request list. Each lane contains one fixed-size slot and a visible elapsed-time counter. Request IDs remain attached to their own slot and return to their own application row. Two independent clocks, not a single pooled progress meter, demonstrate concurrent work.

1080 × 1920; background #050506, primary #E6E8EC, secondary #8B9099, active amber #F5A524, completed teal #3FB68B. Identity is always textual: R1/R2 and A/B, never color alone. Main text 58–64 px, secondary 52 px, title 76 px. All coordinates x,y,width,height unless specified.

| Element | Coordinates | Text / purpose |
|---|---|---|
| Title | 90,140,900,100 | `Share the work` |
| Application | 90,330,900,340 | heading `Application` at y360; R1 row y465, R2 row y565 |
| R1 row | 130,450,820,85 | `R1 · profile 42`, state at right |
| R2 row | 130,550,820,85 | `R2 · profile 73`, state at right |
| Assignment annotation | 90,725,900,80 | `Chosen: A`, later `Chosen: B`, 56 px |
| Server A | 90,930,420,580 | `Server A`, header y970; `Profile service`, y1050 |
| Server B | 570,930,420,580 | `Server B`, header y970; `Profile service`, y1050 |
| A work slot | 130,1160,340,220 | `Idle` → `R1 / Working` → `Idle` |
| B work slot | 610,1160,340,220 | `Idle` → `R2 / Working` → `Idle` |
| A/B elapsed values | x130/x610, y1420 | `0.0 s` through `4.0 s`, 58 px |
| Capacity caption | 90,1590,900,80 | `1 slot each`, then `2 requests working` |
| Footer | 90,1740,900,90 | final `Separate work · separate slots`, two lines if needed |

Separate paths: R1 outbound (280,670)→(280,900); R2 outbound (800,670)→(800,900). Return R1 uses x110 from (110,930) to (110,490), ending at (130,490); return R2 uses x970 from (970,930) to (970,590), ending at (950,590). Routes appear only during travel and never cross. A label outside the slot identifies the counters as `Example elapsed` at y1530, 52 px. No percent-complete gauge or width growth that implies known completion in advance.

Request rows may use two lines (ID/profile above, state below) if the state does not fit; expand application height upward into spare space without shrinking text. Keep server names and service names above their slots. Slots do not resize or divide when concurrency begins.

## Timing, state, motion, sound

Application uses C4, server A E4, server B A4. Sparse `send`, `arrive`, `work`, and `ack` cues; no background music or ticking every counter increment. Playback time expands the illustrative operation time, with explanatory holds freezing both counters together.

| Beat / playback | Motion and state | Sound / hold |
|---|---|---|
| 1 · 0–7 s · Two eligible copies | Establish two idle server lanes with identical Profile service labels. R1 and R2 are Ready in the application. At 3 briefly outline each single slot, then show `1 slot each`. No requests move and no selection is implied by the server layout. | Quiet A `ack` E4 at 3, B `ack` A4 at 3.5. Hold 4–7. |
| 2 · 7–15 s · First independent operation | At 7.5 show Chosen: A. R1 becomes Waiting, travels 8.5–10, and occupies A's slot at 10. A becomes Working; B remains Idle. Advance A's elapsed counter 0.0→1.0 over 10–12. R2 remains Ready. | Application `send` C4 at 8.5; A `arrive` E4 and subdued `work` E4 at 10. Hold 12–15 with A at 1.0 s. |
| 3 · 15–28 s · Add concurrent work | At 15.5 show Chosen: B. R2 becomes Waiting and travels 16–17.5. Hold A's example clock during this teaching transition. At 17.5 R2 occupies B's slot at 0.0 s; A retains R1 at 1.0 s. At 18 show `2 requests working`. Advance both clocks together 19–25: A 1.0→4.0, B 0.0→3.0. At 25 A finishes, prepares R1 response; B remains Working. | Application `send` C4 at 16; B `arrive`/`work` A4 at 17.5. A `ack` E4 at 25. Hold concurrent state briefly at 20–21 if needed by freezing both clocks; extend runtime rather than rush counters. |
| 4 · 28–36 s · Finish separately | Send R1 response up its return path 28–29.5; A slot becomes Idle, retaining completed elapsed 4.0 s beneath it. Application R1 becomes Done only at 29.5. B advances 3.0→4.0 during 29.5–31.5, then finishes. Its response travels 32–33.5; only then R2 becomes Done and B returns Idle. | A `send` E4 at 28; application `arrive` C4 at 29.5. B `ack` A4 at 31.5, `send` A4 at 32; application `arrive` C4 at 33.5. Hold 34–36. |
| 5 · 36–44 s · Preserve the comparison | Both application rows show Done. Under each idle server retain `R1: 4.0 s` / `R2: 4.0 s` instead of a live counter. At 37 highlight these equal durations together, then reveal final footer. Both slots stay separate, unchanged in size. | Application `ack` C4 at 37. Hold 38–44 silently. No second round, reset, or speedup graphic. |

The two elapsed counters deliberately differ by 1.0 s during concurrent work, so A finishes first. Neither speeds up when B starts. Motion has distinct functions: chosen assignment, slot occupancy, simultaneous elapsed work, and separately delivered responses. Preserve a still moment with both slots Working; a pair of moving packets alone is insufficient.

## Accuracy limits

- One work slot per server is an explicit teaching assumption, not a claim about typical server concurrency. Identical service labels indicate either server can handle these profile reads; no deployment or data-replication mechanism is shown.
- R1 and R2 are different requests, not duplicate copies of one operation. No request changes servers after starting. The selected destinations are given; no round-robin or least-loaded rule is asserted.
- Each request has an illustrative 4.0 s processing duration. This excludes transport and explanatory holds. The on-screen example clock is not playback time, and no end-to-end latency improvement is numerically claimed.
- Additional servers can increase capacity when work is independent and other dependencies permit it. This scene assumes no shared bottleneck; it does not promise linear scaling.
- The application remains waiting for each response independently. A server finishing is not the same event as the application receiving the result. Idle slots after completion do not erase the measured history.

## Native350 acceptance and future production

- Inspect actual individual encoded frames at native 350 px width (~622 px high), plus full resolution. 52 px type displays at ~16.9 px. Ensure Profile service fits a 420 px panel; split it across two lines if necessary, reserving header height rather than shrinking text.
- Inspect holds at 5, 13, 18.5, 23, 26, 30, 35, and 41 seconds, plus before/mid/after each assignment, arrival, completion, and return. Contact sheets do not prove legibility.
- At 13 s identify R1 Working on A and B Idle. At 23 s identify two distinct requests working concurrently. At 30 s identify completed R1 and still-running R2. At 41 s read 4.0 s for each, with no suggestion of one request split across servers.
- Check counters advance at the same rate during shared simulation time and freeze together during explanation holds. Never reset A on B's arrival or halve A's remaining duration. Do not claim measured time from the animation.
- No duplicate IDs, slot sharing, result swapping, crossing paths, or Done state before response arrival. During the final frame distinguish historical elapsed values from current Idle state.
- Verify muted comprehension and actor-specific sound timing. Later decode the full MP4, inspect peaks and streaming metadata, and listen before making listening claims. Reproduce suspected visual faults using alternate extraction before flagging. Bind review to the actual SHA-256 and renew review after any re-encode.

Plan only. Later implementation uses repository-pinned Puppeteer and cut-local engine copies. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
