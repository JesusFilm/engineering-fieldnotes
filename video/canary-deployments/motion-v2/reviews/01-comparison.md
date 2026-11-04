# Canary deployments lesson 01, "Keep a control version": comparison review

Reviewer: fresh independent comparison reviewer (claude-opus-5-5). I inspected the encoded media before reading any author source, self-review, plan, ledger or other session; I did not read those afterwards either. Inputs were AGENTS.md, docs/editorial-workflow.md, the architecture-flow-video review reference, and `video/canary-deployments/sequence/lessons.json` item 1.

| | Candidate | Control |
|---|---|---|
| File | `video/canary-deployments/motion-v2/01/video.mp4` | `public/lessons/canary-deployments/01.mp4` |
| SHA256 (before and after review) | `25b50dd8b358af308682ade891a64869fccc25ede64c3604e1d57917d3e643c8` | `29ce39af6bfadb7e2cf192d41f59ca0fc78b8fd99851a2385a314c3a57d755c5` |
| Streams | H.264 1080x1920 30 fps, 1,425 frames, AAC 44.1 kHz stereo, 47.5 s | H.264 1080x1920 20 fps, 560 frames, AAC 44.1 kHz stereo, 28.0 s |
| Full decode | clean, no errors | clean, no errors |
| Streaming | `moov` at byte 36, before `mdat` (faststart) | `moov` at byte 36, before `mdat` (faststart) |
| Audio levels | max −4.3 dB, mean −30.7 dB, no clipping | max −10.5 dB, mean −40.6 dB, no clipping |

Audio was **analysed only and not heard**. I used volumedetect, silencedetect, 0.1 s peak windows, onset lists and a spectrogram.

**Verdict:** recommend the candidate. It has no reproducible objective blocker, and it teaches the full scope: a control, limited traffic, a rule set before rollout, comparable outcomes in a shared window, and a concrete decision. The control never shows a criterion or a decision, and it has three static stretches over 3 s.

## Method

I extracted candidate frames by exact frame index (`select=eq(n,N)`) at native 1080x1920 and scaled each one to 350 px. The indices were 0, 45, 90, 105, 135, 180, 210, 240, 285, 300, 330, 360, 390, 420, 480, 570, 600, 630, 660, 690, 720, 750, 780, 810, 840, 870, 900, 930, 960, 990, 1020, 1050, 1080, 1110, 1140, 1170, 1200, 1230, 1260, 1290, 1320, 1350, 1380, 1395, 1410 and 1424. For the control I used indices 0, 60, 145, 160, 220, 290, 300, 360, 430, 445, 470, 490, 505 and 559. I also made 1 fps contact sheets of both videos, 10 fps transition tiles for candidate frames 705–795 and 1095–1185, a 5 fps traffic tile for frames 400–580, and per-frame motion and audio timelines. I checked each apparent defect on adjacent exact frames. Scratch evidence is in `reviews/scratch/01/`.

## Candidate beat walkthrough

- **0.0–3.0 s: current version.** The video fades in from black (frame 0 is black). By 1.5 s, Requests → Router → "v1 current" is shown with a packet arriving, and each dispatch has a sound (onsets at 0.9, 1.3, 2.0 and 2.7 s).
- **3.0–4.5 s: candidate and control.** v2 appears at 3.0 s with a ripple and a sound at 3.9 s. At 4.5 s, v1 is relabelled "control" with a ripple and a sound at 4.0 s. The candidate exists before it receives traffic.
- **5.5–12.5 s: rule set before rollout.** The panel "Rule, set before rollout" fills one row at a time, each with a sound (6.4, 7.9 and 9.4 s): "Either under 1,000 requests → Pause", "v2 errors > v1 + 5 points → Abort", "Otherwise → Promote". Then it holds, still, for about 2 s (10.0–12.0 s). The criterion is fixed visibly before any traffic flows. This is the strongest teaching addition over the control.
- **12.7–19.5 s: limited traffic.** A 90/10 bar labelled "Example split" appears. Packets flow mostly to v1, with occasional purple packets to v2 (in the 400–580 tile, frames 7–9 and 21–23 show v2 hits). The word "Example" stops the share from reading as a fixed rule.
- **19.6–24.3 s: slow rollout alone.** A clock ticks while the split moves 90/10 → 70/30 → 40/60 under "Timer only", then turns red as "No comparison" (22.3 s, one of the two loudest events). The bar then resets to 90/10. This shows that expanding traffic on a timer is not an evaluation.
- **24.3–26.0 s: morph to the comparison view.** I checked the transition at 0.1 s steps. The boxes slide and resize without overlap or clipping, and their labels drop out briefly and return.
- **26.0–31.0 s: comparable outcomes in a shared window.** "GET /items · same 10 min" heads two counters measured as "errors / requests". The counters climb in a constant 9:1 ratio with matching tick sounds: 3/281 vs 3/31, 23/2,250 vs 23/250, 51/5,063 vs 51/563, 79/7,875 vs 79/875, and finally 90/9,000 vs 90/1,000. While v2 is under 1,000 requests, an amber "v2 under 1,000 → Pause" chip applies the sample threshold. The equal error counts with unequal denominators show why raw counts mislead and rates are needed.
- **31.0–36.5 s: criterion applied.** The rates appear (1%, 9%). "9% − 1% = 8 points" appears, and an arrow feeds it into "Same rule, set before rollout". Pause is struck out (v2 has exactly 1,000 requests, so it is not under 1,000), Abort is ticked and outlined in red (34.8 s, the loudest event at −6.3 dBFS), and Promote dims.
- **36.5–39.5 s: morph back to topology.** Clean; I checked it at 0.1 s steps.
- **39.3–43.5 s: decision outcome.** "Decision: abort" appears, then the split becomes full cyan with "v2: no new traffic". v2 dims, and its link becomes dashed. Nothing in the frames calls this automatic.
- **43.3–47.47 s: recap and finite ending.** "Limit traffic → Compare both → Decide by rule" builds with a sound per chip (43.3, 43.9 and 44.5 s), holds about 1.5 s, and fades to black (frame 1410 dim, frame 1424 black). There is no long padding.

### Arithmetic and decision check (illustrative numbers)

- 90 / 9,000 = 1.0% and 90 / 1,000 = 9.0%; 9 − 1 = 8 percentage points.
- 8 > 5, so the Abort row matches. The video labels the margin "points", and the "9% − 1% = 8 points" chip makes the unit clear.
- 1,000 is not under 1,000, so Pause correctly does not match; v1 at 9,000 is not under 1,000 either.
- The interim counters keep the 90/10 split: 2,250/250, 5,063/563 and 7,875/875 are all about 9:1. Every interim v2 count is under 1,000, so the Pause chip is correct at each step.
- Abort is checked before Promote, and "Otherwise" applies only when neither earlier row matches. The decision matches the rule.
- "Illustrative numbers" stays on screen from 6 s to the fade. No statistical confidence, significance or causation is claimed, and no automatic rollback or universal share is implied.

## Control walkthrough

- **0.0–6.95 s:** fully static and silent: TRAFFIC ROUTER, "CURRENT v1 stable", "CANDIDATE v2 unproven", MEASUREMENTS, and a burned-in two-line caption. The frame-diff timeline shows no change for 6.95 s, and the first audio onset is at 7.0 s.
- **7.0–9.5 s:** one "REQUEST" chip travels to v1, and v1 becomes "control" (green outline, sound at 9.0 s).
- **9.55–12.45 s:** static for 2.9 s.
- **13.5–16.5 s:** one "REQUEST" chip goes to v2, which becomes "candidate" (orange). The label "CANDIDATE v2 candidate" repeats itself.
- **16.55–20.95 s:** static for 4.4 s.
- **21–26.5 s:** "v1 RESULTS" and "v2 RESULTS" chips travel into MEASUREMENTS. Nothing is shown in MEASUREMENTS, and no rule, threshold, comparison or decision follows. The video holds until 28.0 s.

On the control's own timing, the beats line up with lessons.json (captions change at 0, 7, 14 and 21 s). Its text is large and legible at native size and at 350 px.

## Scores (reviewer judgments, 1–5, not measured learning)

| Dimension | Candidate | Control |
|---|---|---|
| Causal clarity | 5 | 2 |
| Accuracy to scope | 4 | 2 |
| Pacing | 4 | 2 |
| Visual legibility | 5 | 4 |

The reasons behind these scores:

- **Causal clarity.** The candidate links each cause to its effect on screen. The rule exists before traffic, traffic produces counts, the counts become rates, the rates feed the rule, and the rule produces Abort, which removes v2's traffic. The control ends when results arrive in MEASUREMENTS. The viewer never sees a result change a decision, although the caption claims it must.
- **Accuracy.** The candidate's numbers, threshold and decision are consistent. I deducted one point because a 5-point margin on a 1% baseline would promote a candidate at 5.9% errors, which is permissive even for illustration. Pause is also used both as a final outcome and as a live "keep collecting" status; both readings are defensible, but the video does not explain the second one. The control's one request each to v1 and v2 looks like an even split, so "limited traffic" depends on the caption. The control also omits a criterion, a sample threshold, a shared window and any promote, pause or abort outcome.
- **Pacing.** The candidate never has a still stretch over about 2 s outside the deliberate hold at 10–12 s. Its 47.5 s length is long for a first lesson but full of content. The control has three still stretches over 3 s (0–6.95, 9.55–12.45 and 16.55–20.95 s).
- **Legibility.** In the candidate, native text is about 40–60 px. The smallest labels ("errors / requests", "Illustrative numbers") stay readable at 350 px. There are no overlaps in the transitions, and the title band is clear. The control's text is large, but the burned-in sentence captions act as paragraphs.

## Objective faults

**Candidate: none found that block.** These observations were checked on exact frames and are minor:

- **Router chevron pops early, about 23.97 s.** The orange chevron is visible through frame 719 and gone from frame 720. The router box itself starts fading at frame 724. This 4-frame (0.13 s) early disappearance is not worth a re-render alone.
- **Rule panel fades out silently, 12.0–12.7 s.** This is a transition. The next sound comes at 12.7 s, when the split bar appears.
- **Split bar rewinds silently, 23.0–24.3 s.** The bar moves from 40/60 back to 90/10 with no sound. This is minor.

**Control:** it has reproducible Pass 1 faults, and it does not meet the lesson scope:

- **Static and silent stretches.** The video is still for over 3 s at 0–6.95 s, 9.55–12.45 s and 16.55–20.95 s.
- **Brief label overlap.** The "v2 RESULTS" chip sits on v2's lower border for frames 484–491 (24.2–24.55 s); I checked each adjacent frame.
- **No criterion or decision.** It never shows a rule or a promote, pause or abort outcome, which the scope requires.

## Integration note (coordinator-owned; not a media fault)

The lessons.json item 1 entry says `duration: 28` with beat text at 0, 7, 14 and 21 s. The candidate runs 47.5 s, and its comparison starts at about 25.5 s. If the candidate were published under the current item unchanged, the "Compare results from both versions" text would show during the timer-only counterexample (21–25 s). The decision and recap (35–47.5 s) would also run past the listed duration. The coordinator should update the duration and beat timings, approximately 0, 4, 13, 25.5 and 39 s, if the site uses them. This review does not edit manifests.

## Optional improvements to the candidate (not blockers)

1. **Tighter abort margin** (5.5–12 s and 31–36 s, S). Saw: "+5 points" on a 1% baseline. Change: use a smaller margin, such as +2 points, with numbers that still clearly exceed it. Effect: the example rule looks like one a team would actually adopt.
2. **Separate Pause from "keep collecting"** (26.5–30 s, S). Saw: an amber "v2 under 1,000 → Pause" chip while counts climb. Change: make the meaning visible, for example by keeping the split frozen and showing a hold symbol on the split bar. Effect: Pause reads as "hold the share until there is enough data".
3. **Make abort the only loudest moment** (22.3 s vs 34.8 s, S). Saw: in analysis, "No comparison" peaks at −6.6 dBFS and the abort match at −6.3 dBFS. Change: soften the 22.3 s cue a few dB. Effect: the decision is clearly the loudest event.
4. **Shorten the still rule hold** (10.0–12.0 s, S). Saw: about 2 s of stillness and silence after the third row. Change: trim it by about 0.5–1 s, or pulse the panel once. Effect: tighter pacing in a 47.5 s cut.
5. **Sound or speed for the bar rewind** (23.0–24.3 s, S). Saw: the bar returns to 90/10 silently. Change: add a soft cue or cut straight to the morph. Effect: no silent visible event.
6. **Remove or explain the router chevron** (whole video, S). Saw: an orange chevron in the router has no stated meaning, and it pops early at frame 720. Change: drop it, or fade it with the box. Effect: one less unexplained glyph.

