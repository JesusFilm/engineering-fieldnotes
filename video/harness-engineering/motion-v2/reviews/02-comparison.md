# Harness engineering lesson 02 — Prepare a known workspace: comparison review

Reviewer: fresh independent comparison reviewer (claude-opus-5-5), 2026-11-05. I inspected the encoded media before opening any author source, self-review, plan, ledger or other session material. I did not read those files at any point. Scores are reviewer judgements, not measured learning outcomes. Audio was **analysed only** (silence detection, per-cue peak levels, spectrograms, volumedetect). It was **not heard**.

## Files compared

| | Candidate (motion-v2) | Published |
|---|---|---|
| Path | `video/harness-engineering/motion-v2/02/video.mp4` | `public/lessons/harness-engineering/02.mp4` |
| SHA256 (before = after) | `8d4ad71208a54629c9031b472e19a90667009e53f97f8b38d2cae4236e44d7f4` | `9fff8a5b7f33290cd9728a77b5b2bbcce5b2bbed6c1d4dea638c58a9bbbeb8c8` |
| Video | H.264 1080×1920, 30 fps, 1117 frames | H.264 1080×1920, 20 fps, 560 frames |
| Duration | 37.233 s | 28.000 s |
| Audio | AAC 44.1 kHz stereo; max -7.7 dB, mean -32.9 dB | AAC 44.1 kHz stereo; max -10.5 dB, mean -40.4 dB |
| Full decode | clean, no errors | clean, no errors |
| Faststart | yes (moov before mdat) | yes |

Intended lesson (lessons.json item 2): known revision → load task and repository instructions → baseline check before editing, recording existing failures separately → starting evidence recorded for later comparison. Declared duration 28 s with beats at 0/7/14/21 s.

## Method

I viewed the 1 fps contact sheets for both files. I extracted exact frames by index at each sound onset, beat midpoint and boundary, at native 1080×1920 and at actual 350 px width (lanczos). I viewed them full frame or as native-resolution crops of the active region. I checked chip travel frame by frame over candidate frames 727–778 at a 3-frame step. I located static stretches with freezedetect and confirmed them by PSNR between alternate frame indices. I got cue onsets from silencedetect (-55 dB) and measured each cue's peak over a 0.6 s window. Scratch evidence is under `reviews/scratch/02-final/` (`a/` = candidate, `b/` = published; `n_*` native, `s_*` 350 px, named by frame index).

## What each cut shows

**Candidate.** It fills a single "Workspace" card titled "Known workspace / before the first edit".

- 0–2.2 s: a dashed placeholder card with `rev ?`, `changes ?` and empty sections (frames 0 and 60 are identical, PSNR 63 dB).
- 2.22 s: `rev` types to `a61c9e2` (frame 75 shows `a61` mid-type).
- 4.0 s: `changes 0`.
- 5.56 s: the card turns solid.
- 9.0 s and 11.44 s: `AGENTS.md`, then `task.md`, are each marked `loaded`.
- 14.22 s: `$ npm test` types into Baseline (frame 440 shows `$ npm t`).
- 15.56 s: the `changes 0` row is highlighted in amber as the run starts. This shows the check runs on an unedited tree.
- 17.33 s and 18.89 s: Parse PASS, then Access PASS.
- 20.44 s: Export FAIL.
- 21.56 s: `exit 1`.
- 24.22–25.93 s: an `Export FAIL` chip lifts off the failing row, slides down the right edge and lands as a "Known failures — Export FAIL — before edits" row.
- 28.89 s: `rev` re-highlights and Baseline gains `saved @ a61c9e2`, tying the evidence to the revision.
- 29.2–35.0 s: the resolved state holds, then fades over about 1 s to a title-only frame (frame 1116).

**Published.** Three boxes (SETUP, WORKSPACE, AGENT) are joined by dotted connectors, with captions burned in at the bottom.

- 0–2.0 s: a CHECKOUT chip travels from Setup to Workspace, which turns green: "revision recorded".
- 2.55–7.0 s: nothing changes (PSNR 63.5 dB, frames 52 and 138).
- 7.0 s: an INSTRUCTIONS chip moves to Agent.
- 9.0 s: Agent turns amber: "task loaded".
- 9.55–12.5 s: static again.
- 14.0 s: a BASELINE chip leaves Agent and travels up the right connector to Setup.
- 16.0–~20 s: Setup glows and its bar fills.
- 21.0 s: Setup turns green: "baseline saved".
- 21–27.95 s: near-static to the end (PSNR 48 dB, frames 420 and 559).

## Scores (reviewer judgement, 1–5)

| Criterion | Candidate | Published |
|---|---|---|
| Causal clarity | 5 | 2 |
| Accuracy | 5 | 3 |
| Pacing | 4 | 3 |
| Visual legibility | 4 | 4 |

**Causal clarity.** The candidate puts every state on one card, so the viewer watches the workspace become known field by field. The baseline beat (17.33–21.56 s) shows a real mixed result: two passes, one failure, `exit 1`. At 24.2–25.9 s the failure physically moves into a separate "Known failures" slot marked "before edits". That is the lesson's central "record existing failures separately" step, taught by motion. At 28.89 s the save stamp ties the baseline to `a61c9e2` and `rev` flashes, so the viewer sees that later results can be compared against this revision.

The published cut conveys order but not content. Chips labelled CHECKOUT, INSTRUCTIONS and BASELINE move between boxes, and the boxes gain status words. Nothing shows what the baseline measured. The BASELINE chip also flows from Agent back to Setup at 14.0–16.0 s, which makes it unclear who runs the check and where its result lives.

**Accuracy.** The published caption at 14–21 s says "Record existing failures separately", but no failure appears at any point. The visual implies a clean "baseline saved", which risks teaching that a baseline means everything passes. The candidate's claims are concrete and correct:

- `changes 0` before the run
- `npm test` exiting 1 on a pre-existing failure
- the failure recorded as "before edits"
- the baseline keyed to a revision

It does not suggest the setup guarantees correctness or determinism. One small gap: "They define the work and its boundaries" is shown only as two filenames marked `loaded`. Neither cut shows a boundary.

**Pacing.** The candidate's beats are evenly spaced (about 1.5–3.5 s between events). It has no mid-lesson stall; freezedetect found only the final hold at 30.4–35.13 s. Costs: a silent, static 2.2 s opening, a resolved-state hold of about 5.8 s, then a fade to an empty title frame. The total runs 9.2 s over the lesson's declared 28 s. The published cut matches its 28 s spec but stalls for 4.45 s (2.55–7.0 s) and about 2.95 s (9.55–12.5 s) mid-lesson, then holds near-static for 7 s at the end.

**Legibility.** At native 1080 px, the candidate's primary text (`a61c9e2`, `AGENTS.md`, PASS/FAIL, `exit 1`) is a large monospace face. Secondary labels (`loaded`, `before edits`, `saved @ a61c9e2`) are about 24–26 px, at the readability threshold. At an actual 350 px width (frames 654, 790 and 876) every primary value reads; the secondary labels are small but resolvable. Nothing is clipped. Nothing sits in the title band. Labels do not collide in any resting state.

The published cut has bigger, simpler type and readable captions at 350 px (frames 324 and 559). Its burned-in captions duplicate the page's transcript, and the cut depends on them to carry meaning.

## Sound (analysed only, not heard)

**Candidate.** 14 cues, each aligned with a visible event within one or two frames:

| Time | Event | Peak |
|---|---|---|
| 2.22 s | rev | -8.3 dB |
| 4.00 s | changes | -13.0 dB |
| 5.56 s | card solid | -11.2 dB |
| 9.00 s | AGENTS.md | -8.4 dB |
| 11.44 s | task.md | -8.5 dB |
| 14.22 s | npm test | -16.9 dB |
| 15.56 s | run start | -11.3 dB |
| 17.33 s | Parse | -12.4 dB |
| 18.89 s | Access | -12.5 dB |
| 20.44 s | Export FAIL | -10.0 dB |
| 21.56 s | exit 1 | -14.3 dB |
| 24.22 s | chip lift | -17.0 dB |
| 25.78 s | chip land | -10.2 dB |
| 28.89 s | saved | -7.7 dB |

The spectrogram shows the 20.44 s FAIL cue as the richest harmonic stack, distinct from the two-tone PASS cues. By peak level, though, it is quieter than the revision and save cues. The track is silent from 29.30 s to the end (7.9 s). No clipping (max -7.7 dB).

**Published.** 7 cues, each aligned with a visible event:

| Time | Peak |
|---|---|
| 0 s | -24.1 dB |
| 2.0 s | -10.5 dB |
| 7.0 s | -24.2 dB |
| 9.0 s | -12.5 dB |
| 14.0 s | -24.1 dB |
| 16.0 s | -13.3 dB |
| 21.0 s | -16.3 dB |

The chip-departure cues are about 14 dB below the arrival cues and may be hard to hear on phone speakers. No clipping.

## Apparent defects checked and reproduced

- **Candidate chip overlapping the Export row border, frame 740 (24.67 s).** Checked at frames 727–778 in 3-frame steps. The chip fades in on the row at 24.23 s, crosses the row border and the section divider at 24.5–25.3 s, and lands at 25.93 s. Throughout, it stays on the right side clear of all label text. This is transient movement, not a resting overlap. **Not a defect.**
- **Candidate static stretch at 30.4–35.13 s.** Reproduced with freezedetect and PSNR (frames 920 and 1050: 58.8 dB). It is the hold after the final beat lands, which the review guide allows. Its length is an optional refinement below. **Not a defect.**
- **Candidate first and last frames differ** (frames 0 and 1116: PSNR 30.4 dB). The site player (`scripts/build.py` `<video controls playsinline preload="none">`) has no `loop` attribute, so loop matching does not apply. **Not a defect.**
- **Published mid-lesson stall at 2.55–7.0 s.** Reproduced at frames 52/138 and 60/100 (63.5 dB). It follows the 2.0 s beat landing and is the weakest stretch of the published cut. It is a pacing issue in the published cut and not part of the candidate verdict.

No reproducible objective fault was found in the candidate.

## Promotion requirement (manifest, outside this media file)

The candidate is 37.233 s long. `video/harness-engineering/sequence/lessons.json` declares 28 s, and `scripts/check_sequences.py` asserts the duration is within 0.15 s, so a straight file swap would fail that check. The transcript timestamps would also mislead. At the transcript's 21 s "The starting evidence is now recorded", the candidate shows Export FAIL just appearing; recording happens at 25.8–28.9 s. At the transcript's 7 s, instructions have not started loading (they load at 9.0 s).

All five motion-v2 harness cuts run 35.0–42.8 s against a uniform 28 s / 0-7-14-21 template. This is therefore a series-wide metadata update for the coordinator, not a fault in this encode. Suggested beat times for this cut: about 0, 9, 14 and 24 s, duration 37.233.

## Optional improvements (not blockers)

1. **Make the failure the loudest moment** (20.44 s, S). The FAIL cue peaks at -10.0 dB, below the revision (-8.3 dB) and save (-7.7 dB) cues. Raise it about 3 dB, or soften the save chime, so the disruption stands out by sound as well as colour.
2. **Shorten the ending and end on the resolved card** (29.2–37.2 s, S). After the last beat the card holds about 5.8 s in silence, then fades to an empty title frame for about 1 s. Hold about 3 s and stop on the resolved card. That cuts about 4 s and leaves the recorded evidence as the final image.
3. **Start the action sooner** (0–2.2 s, S). The placeholder card sits silent and unchanged for 2.2 s. Starting the revision typing at about 0.8 s puts the viewer in the mechanism immediately.
4. **Enlarge the resolution labels at phone width** (25.9–35 s, S). `before edits` and `saved @ a61c9e2` carry the takeaway but are about 6–7 px tall at 350 px. Increasing them about 20% (or giving `before edits` a small pill) would keep the "separate, pre-existing" meaning at phone size.
5. **Show the instructions acting as a boundary** (9.0–13 s, M). The instructions beat only marks two files `loaded`. A brief motion would make "they define the work and its boundaries" visible, for example a scope outline from `task.md` settling around the Baseline section before the run starts.

## Recommendation

The candidate is the better teaching cut, and my recommendation for the default lesson-02 video once the lessons.json duration and beat times are updated. It shows the mechanism concretely: a known revision, loaded instructions, a baseline with a pre-existing failure moved into its own "before edits" record, and the result saved against the revision. The published cut conveys only the order of steps, contradicts its own caption by never showing a failure, and stalls for 4.45 s mid-lesson. Keep both cuts for the reader's comparison. Human editorial review controls promotion.

Verdict for `8d4ad712…44d7f4`: **pass**, no blockers.
