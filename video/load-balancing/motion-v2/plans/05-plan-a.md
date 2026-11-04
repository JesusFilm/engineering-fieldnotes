# Look at active work

## Scope and grounding

One mechanism: compare current unfinished-request counts when assigning new work. A already has a long request; B has none. A new lookup goes to B, finishes, and leaves A's original request untouched.

Grounding: `video/load-balancing/sequence/lessons.json` item 5 and `content/concepts/load-balancing.json`. Primary references inspected 2026-10-21: [Envoy supported load balancers](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/upstream/load_balancing/load_balancers) and [Google SRE load balancing](https://sre.google/sre-book/load-balancing-datacenter/). The former describes least-request candidate comparison; the latter explains why counts can misrepresent capacity. This is a two-candidate toy dispatcher, not an exact reproduction of every production implementation. Envoy's equal-weight policy can sample candidates rather than scan every host.

Five beats, 43 seconds. No queue from the previous lesson is carried forward: the assigned sequence explicitly starts A=1 and B=0. No round-robin replay, policy switch UI, migration, tie-breaking example, failure, or added capacity. Counts are useful signals, not measured remaining time.

## Layout and visual mechanism

Use a **live endpoint selection table** above two persistent execution lanes. The table's Active column changes on assignment and completion. Selection outlines the row with the lower count, then a single new request travels to that server. The long-running request remains anchored below A throughout.

1080 × 1920. Background #050506, primary #E6E8EC, secondary #8B9099, active amber #F5A524, selected teal #3FB68B. All state is also labeled. Main text 58–64 px, secondary 52 px, title 76 px; no paragraphs or miniature metrics.

| Element | Coordinates x,y,w,h | Content |
|---|---|---|
| Title | 90,140,900,160 | `Look at` / `active work` |
| Dispatcher heading | 90,390,900,80 | `Least requests`, 60 px |
| Table header | 130,510,820,70 | `Server` at x150; `Active` at x700 |
| A row | 130,610,820,110 | A and large 1 |
| B row | 130,750,820,110 | B and large 0; later 1 then 0 |
| New request strip | 270,950,540,100 | `R2 · lookup` |
| A execution lane | 90,1210,420,350 | `Server A`; `R1 · report`; `Running` |
| B execution lane | 570,1210,420,350 | `Server B`; `Idle` → `R2 · lookup / Running` → `Idle` |
| Definition | 90,1640,900,80 | `Active = unfinished`, 52 px |
| Footer | 90,1750,900,100 | final `New assignments only`, 56 px |

Table values centered at (780,665) and (780,805), 76 px. Selected outline stays around B's entire row. A small comparison cue `0 < 1` appears at (370,880,340,60), 60 px, after both values have been read. It disappears when B's count increments, avoiding a stale comparison.

Request route: (540,1060)→(780,1130)→(780,1200). Only B's path is drawn. No link connects the server lanes. Existing R1 never translates, clones, or fades into B. Runtime activity is one restrained sweep inside a lane, not a percent-progress bar. Activity does not imply a measured CPU percentage.

## Beat sheet: time, motion, state, sound

Dispatcher G4, A E4, B A4. Sparse actor-specific cues; no ticking, soundtrack, or repeated pulse sounds during holds. Timing is illustrative playback, not a benchmark.

| Beat / time | Motion and state | Sound and reading hold |
|---|---|---|
| 1 · 0–8 s · Start with unequal active work | Establish R1 already Running on A and B Idle. At 2 reveal A Active 1 and B Active 0. One subtle A activity sweep at 3–4 confirms ongoing execution. Show Active = unfinished at 4.5. | A `work` E4 at 3; dispatcher `ack` G4 at 4.5. Hold 5–8. R1's original arrival is outside this example. |
| 2 · 8–17 s · Compare before assigning | R2 lookup appears at 8.5. At 10 outline both count cells once; at 11.5 display 0 < 1. At 13 move the selection outline to B's row. No request has reached B; its count remains 0 until assignment. | Dispatcher `ack` G4 at 11.5 and soft `ack` G4 at 13. Hold 13.5–17. The table, not a rotation pointer, explains the choice. |
| 3 · 17–26 s · Assign only the new request | At 17.5 commit assignment to B: remove comparison cue and change B count 0→1. R2 departs along B path 18–20; arrives and becomes Running at 20. A retains R1 Running and count 1. At 21 briefly outline the stationary R1 identity and the newly arrived R2 identity separately. | Dispatcher `send` G4 at 18; B `work` A4 at 20. Hold 22–26 with counts 1/1 and two distinct running IDs. No new selection occurs during the tie. |
| 4 · 26–34 s · Count falls on completion | At 27 B finishes R2, briefly showing Done. At 28 mark completion acknowledged at the dispatcher and decrement B 1→0. Clear B lane to Idle at 29; a compact `R2 done` label may remain beneath it. A still runs R1 at count 1. | B `ack` A4 at 27; dispatcher `arrive` G4 at 28. Hold 29.5–34 on A busy/B idle. No historical assignment counter appears. |
| 5 · 34–43 s · Existing work remains | At 34.5 emphasize unchanged R1 on A, then B's empty lane at 36. At 37 show New assignments only footer. Remove selection outline, since no new request is being assigned. | A quiet `work` E4 at 34.5, dispatcher `ack` G4 at 37. Hold 38–43 silently. End with R1 still Running; its completion is outside the shown window. |

The count is the dispatcher's current outstanding request count for this illustration: assigned requests remain counted until completion is observed, including the brief forwarding interval. This is why B increments on assignment and decrements on acknowledgment. It is not simply the number of occupied CPU slots. With no queued requests in this example, the same counts also describe each server's running work during the main holds.

## Accuracy limits

- Both servers are eligible, equal-weight candidates. This example compares both because there are only two; do not imply every least-request implementation scans every server or uses identical bookkeeping.
- Lower count is a selection signal, not guaranteed spare CPU, shorter remaining work, or optimal latency. Request cost, other traffic, and stale observations can affect usefulness. No estimated completion time or universal performance percentage is shown.
- The lesson starts at A=1/B=0. Do not import a waiting request from another lesson or accidentally show A=2. No tie policy is taught: the temporary 1/1 state has no arrival requiring selection.
- Existing R1 stays on A; the new R2 is neither a fragment nor a retry of R1. No preemption, duplicate execution, rebalancing of already-assigned work, or worker resizing occurs.
- Ending with A still Running is intentional, not a crash or stalled animation. R2's completion does not finish R1. Responses and full application UI are omitted; acknowledgment is represented by the count update.

## Native350 acceptance and later encoded review

- Inspect actual individual encoded frames at native 350 px width (~622 px high) and full size. Secondary 52 px labels become ~16.9 px. Split lane identity onto separate ID/type lines if needed; never reduce the font to squeeze it into 420 px.
- Inspect holds at 6, 14.5, 23, 31, and 40 s, plus before/mid/after selection, count increment, R2 arrival, completion acknowledgment, and count decrement. Contact sheets cannot establish legibility.
- At 14.5 s a beginner must see why B was selected: 0 versus 1. At 23 s identify R1 still on A and R2 on B. At 31 s identify that only B's count fell. At 40 s distinguish completed R2 from continuing R1.
- Remove 0 < 1 before B becomes 1. Never show a stale comparison, decrement A, duplicate R2, or move R1. Counts must follow the declared assignment/acknowledgment semantics consistently.
- Keep request travel clear of table text and server labels. A must remain visibly active during all B transitions, with a readable Running label even when activity animation is paused for a hold.
- Silent playback must teach selection from current state and preservation of existing assignments. Visual variety comes from table comparison, row selection, dispatch, independent completion, and persistent work—not decorative packet motion alone.
- Reproduce suspected visual faults with alternate extraction before flagging. Later decode the full MP4, inspect audio peaks and streaming metadata, and listen before claiming audio was heard. Bind review to the actual full SHA-256; any re-encode requires renewed encoded review.

Plan only. Future implementation uses repository-pinned Puppeteer and a cut-local engine copy. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
