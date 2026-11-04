# Unequal work

## Scope and grounding

One mechanism: round robin counts turns, not remaining work. A slow report remains running on A after B finishes a short lookup. The next turn still belongs to A, so request 3 waits there despite B being idle. When A finishes, its waiting request starts locally.

Grounding: `video/load-balancing/sequence/lessons.json` item 4 and `content/concepts/load-balancing.json`. [Google SRE: Load Balancing in the Datacenter](https://sre.google/sre-book/load-balancing-datacenter/), retrieved 2026-10-21, explains uneven backend load and the limits of request-based signals. The exact three-request schedule below comes from the lesson and is illustrative. Equal-weight rotation was grounded in the preceding lesson's Envoy source; it remains unchanged here.

Six beats, 48 seconds. Show the consequence, not a new policy or repair. No least-request selector, migration to B, capacity addition, retry, failure, or benchmark claim. One executing slot per server and one waiting position on A are explicit assumptions.

## Visual grammar and coordinates

A server workboard separates **cumulative assignments**, **currently running**, and **waiting**. The crucial frame has identical assignment counts, but different current states. Then a new assignment increases A's count and fills its waiting row without displacing the running report.

Canvas 1080 × 1920; black #050506, text #E6E8EC, secondary #8B9099, running amber #F5A524, completed teal #3FB68B. Waiting uses a dashed outline and the word Waiting, not red failure styling. Title 76 px, main text 58–64 px, secondary 52 px minimum.

Coordinates are x,y,width,height.

| Element | Coordinates | Text / behavior |
|---|---|---|
| Title | 90,140,900,110 | `Unequal work` |
| Routing header | 90,340,900,180 | `Round robin`, then `Next: A` / `Next: B`, 60 px |
| Incoming request | 260,570,560,120 | request ID plus short operation name; disappears upon arrival |
| A lane | 90,820,420,780 | `Server A`, y860 |
| B lane | 570,820,420,780 | `Server B`, y860 |
| Assigned totals | x130 / x610, y960 | `Assigned: 0` → 1 → 2 on A; 0 → 1 on B, 52 px |
| Running region | x130 / x610, y1090,340,240 | heading `Running`; ID and operation on separate lines; Idle when vacant |
| Waiting region | x130 / x610, y1390,340,150 | heading `Waiting`; `—` or `R3` |
| Assumption label | 90,1650,900,70 | `1 running slot each`, 52 px |
| Footer | 90,1750,900,90 | `Equal counts ≠ equal work`, 54 px; use two lines if needed |

Incoming A route: (540,700)→(300,770)→(300,1080). Incoming B route: (540,700)→(780,770)→(780,1080). When R3 is assigned, A's running slot is occupied: route via (540,700)→(540,1350)→(300,1350)→(300,1390), entirely in the gap between lanes until it enters A's waiting region. No packet touches B.

Server state carries progress through a restrained activity sweep inside the running region, not a percentage or remaining-time prediction. A's sweep continues while B changes to Idle. Stop sweep during long reading holds if necessary, but keep the Running label. A short completion mark can appear at the slot edge before clearing; never subtract from Assigned totals.

## Beat sheet: state, motion, and sound

Dispatcher G4, A E4, B A4. One cue per meaningful state change; no continuous ticking or music. Request IDs: R1 report (slow), R2 lookup (short), R3 lookup (short). Both servers offer the same service; request type, not server capability, determines the illustrative duration difference.

| Beat / playback | Motion and persisted state | Sound and hold |
|---|---|---|
| 1 · 0–6 s · Establish the board | Reveal both idle slots and empty waiting rows. Assigned counters are 0; Next A. At 3 outline the Running row label on each server once; show one-slot assumption. | Dispatcher `ack` G4 at 3. Hold 3.5–6. |
| 2 · 6–14 s · Long work starts on A | Show R1 / Report at 6.5. At 7.5 assign A: Assigned A becomes 1 and Next becomes B. R1 travels 8–9.5 and occupies A's running region. Show Report / Running; B remains Idle. | Dispatcher `send` G4 at 8; A `work` E4 at 9.5. Hold 11–14. R1 stays present in A for subsequent beats. |
| 3 · 14–22 s · Short work finishes on B | Show R2 / Lookup at 14.5. Assign B at 15.5, changing B's Assigned count to 1 and Next to A. Travel 16–17.5; B runs R2 until 19.5. At 19.5 mark Done briefly, then clear to Idle at 20.5. A still runs R1. | Dispatcher `send` G4 at 16; B `work` A4 at 17.5, `ack` A4 at 19.5. Hold 20.5–22. Counts remain 1 and 1. |
| 4 · 22–29 s · Equal counts, different states | At 22.5 outline both Assigned: 1 labels together. At 24 emphasize A's Running label and B's Idle label together. Show footer Equal counts ≠ equal work. No new request yet. | Dispatcher `ack` G4 at 22.5. Hold 24.5–29: R1 remains on A, B remains empty, Next A remains visible. This is the central comparison frame. |
| 5 · 29–39 s · Next turn waits on A | At 29.5 show R3 / Lookup. At 30.5 select A according to Next; A Assigned becomes 2 and Next becomes B. Send R3 down the waiting route 31–33. At 33 occupy A's Waiting row with R3. A keeps R1 Running. B remains Idle. Remove the equal-count footer before count changes; replace it at 34 with `R3 waits on A`. | Dispatcher `send` G4 at 31; A subdued `arrive` E4 at 33, distinct from its work cue. Hold 34–39. No work sound or activity sweep on waiting R3. |
| 6 · 39–48 s · Local slot opens | At 39.5 R1 finishes; briefly mark Done, then vacate the running slot at 40.5. Move R3 from A's waiting row into its running slot over 41–42; waiting row returns to —. R3 becomes Running only at 42. It completes at 44.5, then A returns Idle at 45.5. B stays Idle throughout. | A `ack` E4 at 39.5; A `work` E4 at 42; A `ack` E4 at 44.5. Hold 45.5–48 on totals A=2/B=1, empty slots, Next B. Footer `Turns ignore work time`, 54 px. No further routing or policy change. |

The waiting interval must be long enough to compare A's occupied slot and B's idle slot in one glance. There is no A→B path. The R3 marker moves only within A when capacity opens. Assigned counts record historical choices; they are neither running counts nor completion counts.

## Accuracy limits

- Both servers stay eligible and equally weighted. Busy does not mean unhealthy or ineligible in this example. Round robin's Next state changes on assignment, never on completion.
- This is a one-slot server with a local waiting position. Other implementations can reject, queue elsewhere, or run several requests concurrently. Do not present this queue placement as intrinsic to all round-robin balancers.
- Equal counts are shown before R3: 1 each, with A busy and B idle. After R3 the counts are 2 and 1; the equal-count caption must no longer describe the current frame.
- Report and lookup are different work costs on otherwise equivalent servers. Do not imply A is permanently slower or B incapable of reports.
- No precise remaining-work meter is available to the dispatcher. Running is observed; processing durations are illustrative playback scheduling, not measured seconds or CPU utilization.
- Finishing a request does not undo its assignment. R3 is not retried, duplicated, preempted, or migrated. Responses are omitted from this workboard view; completion refers to server work.

## Native350 acceptance and future production

- View actual individual encoded frames at native 350 px width (~622 px high), plus full resolution. 52 px labels display at ~16.9 px. Fit Assigned: 1 inside each lane without shrinking type; use Assigned above the number if required. Keep at least 24 source pixels clear around text and outlines.
- Inspect holds at 4, 12, 21, 26, 36, 43, and 47 s, plus before/mid/after each assignment, B's completion, R3 queue arrival, and R3's start. Contact sheets are navigation, not legibility evidence.
- At 26 s identify Assigned 1/1, A Running, B Idle, Next A. At 36 s identify R1 Running and R3 Waiting on A while B remains Idle. At 43 s R3 must run on A and its waiting row must be empty.
- Count changes happen once per assignment and never on finish. Ensure no duplicate R3 appears in both rows during transfer; animate one identity between positions. Do not show two running requests on A.
- R3 must not begin when B becomes idle. It begins only after R1 releases A's slot. The waiting route must avoid both the occupied slot and B, with no ambiguous crossing through text.
- Muted playback must make the causal chain clear: next turn A → occupied A → R3 waits → A frees → R3 starts. Motion variety comes from counts, occupancy, completion, waiting, and slot admission, not decorative travel alone.
- Reproduce suspected visual defects through alternate extraction before flagging. Later decode the full MP4, inspect audio peaks and streaming metadata, and listen before claiming actual audio was heard. Bind review to the actual full SHA-256 and renew review after re-encoding.

Only this plan is assigned. Future implementation uses repository-pinned Puppeteer and a cut-local engine copy. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
