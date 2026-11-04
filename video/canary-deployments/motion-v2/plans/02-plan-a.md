# Lesson 02 — Limit the exposure

## Teaching contract

Teach one mechanism: limiting the candidate's share limits the number of requests directly exposed to that version, while observations must remain attributable to each version. Use one authored window of exactly 10,000 requests: current version 1/control receives 9,000 (90%); candidate version 2 receives 1,000 (10%). These are illustrative request counts, not measured production results, unique-user counts, or a universal routing recommendation. A small share can still harm affected users and does not establish safety, causation, or statistical confidence.

Plan a finite 44-second, 1080×1920, 30fps film. Timing is subordinate to comprehension; remove dead time before adding duration. No narration is needed. The motion explains the accounting; short labels carry qualifications that cannot honestly be conveyed by colour alone. No promotion, traffic expansion, automatic rollback, operation slices, error-rate thresholds, statistical tests, or implementation tutorial. Do not import the later export-failure example.

## Visual grammar and stage

Use near-black #050506, off-white text, cyan for v1 and amber for v2. Neither ownership colour means healthy. Reserve red for an explicitly hypothetical failed response. Keep version identity in text as well as colour. Actors are software-native: request records, two version panels, two measurement panels, and one application response view. Avoid people icons, physical containers, shields, traffic roads, and decorative server racks.

Persistent compact header: “Limit the exposure”, centred at (540,260), 82px, split over two lines if needed. An “Example window” chip at (540,430) stays visible during the counted example. Safe content bounds: x=84–996, y=470–1720. Essential labels use at least 52px source text, approximately 16.9px at 350px width; large values use 92–116px. No tiny secondary copy. Use stacked panels when a phrase will not fit; never shrink text to rescue a layout.

Three deliberate layouts: a request inventory that partitions into two groups; a horizontal share strip with vertically stacked version summaries; then version-specific observation panels, followed by a full-width application response inset. Changes preserve the same cyan/amber identities and visible counts. Animate one focal change at a time. Counts sit outside moving records and never underneath connector paths.

## Exact counting model

Represent the window using ten equal rectangular request-group tiles in a 2-column × 5-row inventory, with centres x=330/750 and y=650,820,990,1160,1330. A readable legend at y=1500 says “1 tile = 1,000 requests”. These are aggregate groups, not packets or users. The initial total is “10,000 requests”. Nine tiles become cyan and one amber; each tile belongs to exactly one version. The placement is a summary of an illustrative window, not a rule that every tenth request is routed to v2, nor an actual sequence of nine control batches followed by one candidate batch.

When tiles leave the inventory, increment a destination count only on arrival. A source tile disappears as its destination representation appears; never show both as additional counted requests. At all intermediate states, pending + v1 + v2 = 10,000. At the settled state, v1=9,000 and v2=1,000. The later share strip has width 900px: 810 cyan and 90 amber. Put 90% and 10% in external labels, not inside the narrow amber segment. The arithmetic is authored deterministically, not estimated from random animation. Responses, measurement connectors, and explanatory replays never increment the request totals.

## Beat sheet

| Time | What moves | State change and useful hold | Synthesised sound |
|---|---|---|---|
| 0.0–5.5 | Header appears in 0.35s. At 0.7s, ten grouped request tiles reveal as one inventory. At 1.6s, the total and tile legend settle. | Establish the finite window before any split. At 3.0s, one tile outline briefly brightens to connect the unit legend to the inventory. Hold 3.5–5.5s for reading. | Quiet `send` G5 on inventory reveal; soft `arrive` G4 on total; one low-gain G5 tick on unit emphasis. No ten-note fanfare. |
| 5.5–12.0 | Nine tiles receive cyan ownership over 0.8s; the remaining tile receives amber at 6.7s. Inventory compresses upward while two full-width destination rows appear below: “v1 · Current / Control” and “v2 · Candidate”. | Map the two names to the existing window. At 8.0–9.8s, nine cyan tiles converge into the v1 row with discrete +1,000 arrivals at 0.2s intervals. v1 reaches 9,000; amber remains pending. Hold 10.0–12.0s. | Soft control `arrive` C5 at first and final arrivals; middle arrivals have very quiet C5 ticks. No success chime. Amber selection uses E5. |
| 12.0–18.0 | Remaining amber tile moves into v2 at 12.2–12.8s. Its count changes from 0 to 1,000 on arrival. At 14.8s, the inventory becomes a 90/10 strip above the two summaries. | Pending reaches zero. Preserve “9,000 requests” and “1,000 requests”; add externally aligned 90% and 10%. Hold 12.8–14.8s for the final count, then 16.0–18.0s for the proportion. | Candidate `arrive` E5 at 12.8s; subdued G4 `work` tick as the strip settles. |
| 18.0–24.0 | Ratio strip recedes. A software request log inset shows two separate request rows connecting to the same “Client A” label; neither row has a version assignment. The two rows bracket together beneath “Requests ≠ users”. | This is an explanatory inset, not extra traffic: frozen totals stay in the background and the inset is explicitly labelled “Illustration”. First row appears at 18.7s, second at 19.5s, shared client association at 20.3s. Hold 21.0–23.0s, then clear the inset. | Two quiet client `send` G5 cues; a soft G4 `arrive` when both associations settle. No extra count sounds. |
| 24.0–32.0 | The v1 and v2 summary rows expand into stacked observation panels. Each version sends a dotted metadata connector only to its own panel. Labels appear sequentially: “Requests”, then “Errors · Latency”. | Header chip changes to “Measure separately”. v1 panel retains 9,000 and v2 retains 1,000. Error and latency values are em dashes: no outcomes have been specified. A brief “— Not shown” key prevents reading dashes as zero. v1 association settles at 25.6s, v2 at 27.2s, metric labels at 29.0s. Hold 30.0–32.0s. | Control C5 and candidate E5 `arrive`, followed by quiet `work` C4/E4 when their metric fields appear. These are measurement associations, not additional requests. |
| 32.0–39.0 | The amber 10% summary remains above a full-width application response inset labelled “Possible impact”. One outlined response row transitions to a red “Request failed” state at 34.0s. A short “Users can be harmed” label appears at 35.4s. | Explicitly hypothetical: do not add a failure count, change the actual metrics, or colour the entire candidate red. Keep the exposure label amber. Hold 36.0–38.5s so the small share and possible harm can be read together; clear the response inset by 39.0s. | A short custom sine down-sweep based on `thump`, E4→E3, at the failure. Moderate gain, no crash explosion or inferred system outage. One subdued E4 tick on the harm label. |
| 39.0–44.0 | Restore the two settled summaries and the 90/10 strip. Replace the header chip with “Small share ≠ safe”. At 40.0s add “Illustrative split” beneath the strip. | Keep 9,000/v1 and 1,000/v2 unchanged. Final readable hold 41.0–43.5s, then a 0.5s fade to black including the title. Finite end, no reset, no rollout decision, no reward badge. | Soft paired C4/E4 notes as summaries return; a dry G4 tick on the qualifier. End in silence with no triumphant cadence. |

## Coordinates and continuity

After the inventory, summary rows centre at (540,1010) and (540,1320), each 900×240. Put identity on the top line and counts below. The share strip runs (90,690) to (990,690), with external percentage labels centred at (340,790) and (900,790). During measurement, panels centre at (540,850) and (540,1270), each 900×340; identity, request total, and metric labels occupy separate lines. Short metadata connectors run from each version tag at (130, panelY−100) to the corresponding measurement area at (280,panelY−100); no cross-version connector. The possible-impact inset occupies x=90–990, y=1030–1500, leaving the frozen 10% summary above it. Text transitions replace content rather than stack more labels. Treat panel resizing as continuity, not a new measurement window.

## Sound and pacing implementation notes

Use actor-specific synthesised pitches throughout: client G5, current C5, candidate E5; measurement events use the same identity an octave lower. Pan to visible positions only; stacked panels remain centred, so timbre/pitch must carry identity in mono. Sends stay quieter than arrivals. Reduce echo during the 0.2s accounting sequence to avoid a blurred burst. No sound per individual request and no implication that tile sound counts equal raw request counts. Use short attacks and 80–180ms decays, no music bed. Holds are silent; do not fill them with pulsing, bouncing or arbitrary ticks. Every cue accompanies a visible semantic change. The failure is audible but does not dominate the film.

Schedule absolute playback times at speed 1. Use existing labels, boxes, bars, packets and scene-local sound definitions; any grouped-tile drawing helper belongs locally to a future implementation. Do not modify the installed skill. A finite ending deliberately supersedes the skill's default loop requirement.

## Evidence and limits

Local teaching anchors: `video/canary-deployments/sequence/lessons.json`, item 2, and `content/concepts/canary-deployments.json`. The requested scope takes precedence over the item's older 28-second timing. Read `AGENTS.md`, `docs/editorial-workflow.md`, and the architecture-flow-video skill plus its style, engine API and review references. The skill supplies visual and sound techniques, not factual evidence or permission to produce additional files.

Primary references accessed 2026-11-04:

- [Google SRE Workbook — Canarying Releases](https://sre.google/workbook/canarying-releases/): supports limited exposure with evaluation and a separate control/candidate comparison. Use only those principles here; the exact counts are authored teaching data.
- [Argo Rollouts — Canary Deployment Strategy](https://argo-rollouts.readthedocs.io/en/stable/features/canary/): describes configurable canary traffic shares. The plan must not imply a standard universal percentage or equate replica share with measured request share.

The client inset illustrates the counting distinction: one client can issue multiple requests. Do not assert how many unique users issued this window. The possible failed response is a conditional example of harm, not evidence that v2 caused a regression. Limited direct request exposure does not bound all downstream impact. No confidence level, representativeness claim, comparative health result, or zero-risk claim is earned by this illustration.

## Future validation criteria — not performed by this planning task

1. Independently tally every tile assignment and arrival. Confirm ten tiles ×1,000, nine control assignments, one candidate assignment, invariant pending+v1+v2=10,000, and no counter changes in explanatory insets.
2. Inspect actual encoded frames resized to 350px width, without zooming, at every beat midpoint, crowded frame, and transition boundary. Read both identity and count lines, the tile legend, “Requests ≠ users”, “Possible impact”, and the final qualification. Reflow if any essential label fails; source font size alone is insufficient evidence.
3. Confirm ratios are shown as request shares and no visual implies nine healthy servers, one broken server, ten users, a prescribed ordering, or exact real-world routing guarantees. The 90/10 strip must remain mathematically proportional.
4. Watch muted: the split, preserved version identities and separate measurements should remain understandable. Listen to the audio itself and check waveform/peaks; distinguish actual listening from numerical analysis. Keep peaks below −0.5dBFS and cues aligned with visible events.
5. Decode the entire future encode, inspect streaming metadata, and scrutinise 12.8s, 24s, 32s and 39s for stale tiles, double counts, accidental healthy badges or hypothetical results leaking into observed metrics. Verify deliberate 1.5–2.5s reading holds and no padding beyond them.
6. Beginner comprehension check: viewer can report 9,000 to current/control and 1,000 to candidate, explain why requests are not necessarily users, identify the two separate measurement panels, and say why 10% alone does not establish safety. These are review criteria, not claims of completed testing.

This artifact is a plan only. Rendering, listening, frame inspection and independent comparison remain future work; no media or publication changes are included.
