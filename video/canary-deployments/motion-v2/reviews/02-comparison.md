# Canary deployments, lesson 02 "Limit the exposure": encoded comparison

Reviewer: fresh independent comparison reviewer (claude-opus-5-5). I inspected the encoded media before reading any author source, beat sheet, self-review, verification ledger or plan, and I read none of them afterwards. The intended lesson came from `video/canary-deployments/sequence/lessons.json` item 2.

| Cut | File | SHA256 (same before and after review) |
|---|---|---|
| New (motion-v2) | `video/canary-deployments/motion-v2/02/video.mp4` | `c8f2f9cc9a9200050c2adea3a482f614798e8df8bb03afd2e59e114eebf1cc00` |
| Published | `public/lessons/canary-deployments/02.mp4` | `7603aa3c6db5b0ac215bf050350ce5e7fa52d614d974d855b7a19942ff4d0242` |

**Verdict:** the new cut passes with no blocking faults, and I recommend it over the published cut. It shows the 90/10 split as a causal process: 10,000 requests run through a router into separate per-version bins, and the running totals always sum to 10,000. It also gives each version its own measurement panel and shows concrete harm inside the 10% slice. The published cut is a static diagram with captions burned into the frame. It freezes for long stretches, and its measurement beat counts only v2, which contradicts its own caption. Promoting the new cut requires a coordinator update to the lesson timing metadata (see Integration note).

## Method

- I decoded both files fully with `ffmpeg -f null`. Neither reported an error, and both are 1080x1920 yuv420p H.264 with stereo 44.1 kHz AAC, with `moov` before `mdat` (fast start). The new cut is 46.8 s at 30 fps (1,404 frames). The published cut is 28.0 s at 20 fps (560 frames).
- I extracted native 1080 px frames by exact frame index: every 15th frame for the new cut and every 10th for the published cut. I extracted matching 350 px frames, made a contact sheet at 1 frame/s, and made 350 px sheets at one frame per 2 s. I viewed frames individually at every beat midpoint and boundary.
- I checked transitions frame by frame at 8.5–10, 18.1–18.9, 18.7–22.7, 24.2–25.7, 29.3–30.2, 35.7–36.4, 38.2–38.7 and 41.0–42.2 s. I confirmed the apparent overlap at 18.4 s on alternate exact frames 544, 547, 549, 551, 555, 558 and 562.
- For audio I used `volumedetect` on the whole file and on each event window, `silencedetect` (−55 dB) for onset timing, and spectrograms. **The audio was analysed only. I did not listen to it.** I used `freezedetect` (2.5 s minimum) to find static stretches.
- Scratch frames and sheets are in `reviews/scratch/02/`.

## New cut (motion-v2): beat by beat

| Time | What the viewer sees | Check |
|---|---|---|
| 0–3.3 s | Under an "Example window" chip, a 10x10 grid fills while a counter runs 0 → 10,000 requests. A "1 square = 100 requests" legend fades in. | Scale is correct: 100 squares x 100 = 10,000. Ticks from 0.9 to 2.4 s follow the counter. |
| 5.4–8 s | A cyan sweep, then 10 squares turn purple with a highlight. "v1 · control" and "v2 · candidate" labels appear. | Frame 240: exactly 90 cyan and 10 purple squares. Sound cues at 5.4 and 6.7 s. |
| 8.6–10 s | The grid shrinks to a pending pool above a router with two empty bins (v1 9x10, v2 1x10). | Whoosh at 8.6 s. Totals start at 10,000 + 0 + 0. |
| 10.2–18.5 s | Squares fly through the router into the bins. Pending, v1 and v2 counters update. | Every sampled frame sums to 10,000 (9,500+400+100 at 11 s, 6,600+3,100+300 at 14 s, 2,100+7,100+800 at 17 s, 0+9,000+1,000 at 19 s). Bins end at 90 and 10 squares. Router clicks run continuously. |
| 18.2–18.7 s | Emphasis rings pulse on 9,000 and 1,000. | Rings cross the "v1 · control" and "v2 · candidate" labels on frames 547–562. The text stays readable. Optional refinement, see below. |
| 19.7–22.2 s | The router fades. A bar headed "share of 10,000 requests" fills cyan to 90%, then purple to 10%. | Sounds at 21.25 and 21.86 s match the cyan finish and the purple arrival. The 2.6 s hold from 21.6 to 24.2 s is the longest still stretch, after the beat lands. |
| 24.4–30 s | "Requests ≠ users": user A (phone) sends requests 1 and 2, user B (laptop) sends request 3, and the panel reads "3 requests · 2 users". | Correct relationship. The panel does not equate request counts with unique users. A cue sounds with each request (25.6, 26.2, 26.9 s) and with the total (27.6 s). |
| 30.5–36 s | "Measure each version": lines drop from each bar segment into separate panels, v1 n = 9,000 and v2 n = 1,000, each with empty "errors" and "latency" rows. | Separate measurement per version is shown visually. The rows are empty, so the cut makes no performance or statistical claim and leaves error comparison to lessons 3–4. Cues at 30.8 and 31.9 s. |
| 36.5–41 s | "Possible impact": "9,000 stay on v1", "1,000 exposed to v2", and a box under the 10% segment holding three devices. One laptop turns red with a "failed" response. "Affected users can be harmed." | Harm sits inside the exposed slice only. The failure appears at frame 1156 (38.53 s) with the loudest sound in the file (−6.8 dB peak). No rate or guarantee is implied. |
| 41.5–46.8 s | Summary card: "9,000 → v1", "1,000 → v2", "Small share ≠ proven safe", "Illustrative window". Fades to black. | The card is fully visible for about 2.4 s, then fades for under 1 s. The ending is finite without long padding. Nothing plays after 44 s. |

At 350 px every beat stays readable. The smallest labels ("1 square = 100 requests", "pending", "errors", "latency", "response", "Illustrative window") are small but clear, and the numbers stay bold. At native size, no text is below about 30 px, none is clipped, and nothing enters the title band or leaves the stage. No stale state lingers: the router, bins and request panel fade cleanly at their boundaries.

## Published cut: beat by beat

| Time | What the viewer sees | Check |
|---|---|---|
| 0–7 s | A static diagram: TRAFFIC ROUTER with 10,000 requests, CURRENT v1, CANDIDATE v2 and REQUEST COUNTS, plus a two-line burned-in caption. | **Fully frozen for 7 s, and silent.** |
| 7–9.5 s | A "9,000" chip slides to v1, and v1 turns green with "9,000 requests". | Sound at 7.0 and 9.0 s. |
| 9.5–14 s | Static. | Frozen for 4.5 s. |
| 14–16.5 s | A "1,000" chip slides to v2, and v2 turns orange with "1,000 requests". | Sound at 14.0 and 16.0 s. |
| 16.5–21 s | Static. | Frozen for 4.55 s. |
| 21–23.5 s | A "v2 COUNTS" chip moves from v2 into a single "REQUEST COUNTS — compare versions" box. | **Only v2 feeds measurement.** v1 has no link to the counts box, which contradicts the caption "Measure each version separately". |
| 23.5–28 s | Static to the end, still showing the caption "A small rollout is not proof of safety." | Frozen for about 4.45 s. |

Every number is correct (10,000 = 9,000 + 1,000), labels are large at native size and readable at 350 px, and audio peaks at −10.5 dB without clipping. The weaknesses are teaching weaknesses. The two-sentence captions carry the lesson in prose and repeat the page text. The diagram shows labels moving rather than traffic being split. Harm and the difference between requests and users are absent, and the safety caveat exists only as caption text.

## Comparison

These scores are my judgement on a 1–5 scale, not measured learning outcomes.

| Axis | New | Published | Main evidence |
|---|---|---|---|
| Causal clarity | 5 | 2 | New: the viewer watches 10,000 units split into 90 and 10 squares (10.2–18.5 s), then sees harm limited to the slice (38.5 s). Published: number chips relabel boxes, and the mechanism is carried by caption text. |
| Accuracy | 4 | 3 | New: all totals reconcile on every sampled frame, the grid ratio is exact, and requests are kept distinct from users (24–30 s). Accuracy is 4 because the 36.5 s and 42.5 s labels drop the word "requests". Published: numbers are correct, but the measurement picture shows only v2 being counted (21–23.5 s). |
| Pacing | 4 | 2 | New: nothing is still for longer than 2.6 s, and each beat lands before the next. At 46.8 s it is long for one idea, with small slack around 3.3–5.4 s and 18.6–20.3 s. Published: about 21 of 28 s are frozen frames, including the first 7 s. |
| Visual legibility | 4 | 4 | New: large numbers, consistent colour coding (cyan v1, purple v2, orange exposure, red failure), and readable at 350 px. A brief ring overlap at 18.4 s. Published: very large text, but a sparse diagram with prose below it. |

The new cut's concrete advantages are the process animation with reconciling counters, separate per-version measurement panels, the requests vs users panel, harm shown inside the exposed slice, and a consistent sound map where the failure is the loudest event. Its disadvantages are its length (1.7x the lesson's 28 s budget), unitless "9,000 / 1,000" labels in the last two beats, and a brief emphasis ring over the labels. The published cut's advantages are brevity and very large type. Its disadvantages are long frozen stretches, captions burned into the frame, a measurement beat that contradicts its caption, and no depiction of harm or of the difference between requests and users.

## Objective faults

**New cut:** none reproducible. I checked text size, clipping, off-stage elements, stale state, events without sound, sound without events, clipping (−6.8 dB peak), frames still for more than 3 s, decode errors and stream layout.

**Published cut (for the record; not under decision):**

- Frozen frames for more than 3 s at 0–7, 9.5–14, 16.45–21 and 23.55–28 s (freezedetect).
- The measurement picture counts v2 only, which contradicts "Measure each version separately" (21–28 s).
- Two-sentence captions are burned into the frame throughout, against the brief's guidance to avoid paragraphs and subtitles.

## Optional improvements for the new cut (not blockers)

1. **Name the unit on the exposure labels** (36.5–37.5 s and 42.5 s, size S). The labels read "9,000 stay on v1 / 1,000 exposed to v2" and "9,000 → v1 / 1,000 → v2". The unit is recoverable from the "share of 10,000 requests" header, but these labels come straight after the "Requests ≠ users" beat, so a viewer may read 1,000 as people. Adding "requests" (for example "1,000 requests → v2") keeps the units consistent.
2. **Keep the emphasis rings off the labels** (18.2–18.7 s, frames 547–562, size S). The rings expand across "v1 · control" and "v2 · candidate". Draw them behind the text or cap their radius below the label line.
3. **Tighten the slack** (3.3–5.4 s and 18.6–20.3 s, size S). Trimming about 2–3 s would bring the cut nearer the lesson's budget without losing a beat.
4. **Optional link between requests and versions** (24.4–30 s, size M). The requests vs users panel stands apart from the split. Routing one of user A's requests to v2 would tie unique users to exposure. This goes slightly beyond the lesson's scope, so treat it as a choice.

## Integration note (coordinator)

`lessons.json` item 2 declares `"duration": 28`, with beat text at 0, 7, 14 and 21 s and `src` pointing to the published file. The new cut runs 46.8 s and its beats fall at roughly 0, 10, 19.7, 24.4, 30.5, 36.5 and 41.5 s. If the new cut is promoted, the page's duration and beat timing need re-authoring to match. This is a metadata task outside this review's write scope, not a fault in the video.
