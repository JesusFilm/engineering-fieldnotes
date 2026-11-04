# Lesson 02 comparison: A timeout is not a rollback

Reviewer: fresh comparison reviewer (claude-opus-5-5). I read the brief in `lessons.json` item 2, `AGENTS.md`, `docs/editorial-workflow.md`, and the skill's `review.md`, then inspected only the encoded media. I did not open author source, beat sheets, self-reviews, verification files, or other sessions. **Audio was analysed, not heard.** The scores below are my judgements and do not measure learning.

| | Candidate | Published |
|---|---|---|
| File | `motion-v2/02/video.mp4` | `public/lessons/timeouts-and-retries/02.mp4` |
| SHA256 (before = after) | `d662e83e2f1022b5f24d6546010b171009eabd68bffbf04ecb1549d34f05db9f` | `171bb488f82b6b1f0e9ddea8534ba13d8dbc5faffc605f26cdd0a309fa0fc832` |
| Format | 1080x1920 H.264 High, 30 fps, 1150 frames, 38.33 s, AAC 44.1 kHz stereo | 1080x1920 H.264 High, 20 fps, 560 frames, 28.00 s, AAC 44.1 kHz stereo |
| Full decode | clean | clean |
| Faststart (moov before mdat) | yes | yes |
| Audio (volumedetect) | max -4.7 dB, mean -33.6 dB | max -21.5 dB, mean -53.3 dB |

**Verdict:** the candidate passes, with no blockers. I recommend it over the published cut on causal clarity. The published cut also stays accurate and can be kept as an alternative.

## Method

- Extracted one frame per second by exact frame index (`n mod 30` for the candidate, `n mod 20` for the published cut), viewed key frames at native 1080x1920 and individually at 350 px wide, and built contact sheets at 350 px.
- Examined each event and boundary at exact frame indices. Every strip is labelled with its frame numbers in `scratch/02/strip_*.png`.
- Ran motion analysis (frame-difference `YMAX`) and freezedetect, a silence map, and a per-event peak analysis (`scratch/02/analyse.py`, `analysis.txt`).

## What each cut shows

**Candidate.** A release agent and a CI service sit on a vertical time axis.

| Time | Frames | What happens |
|---|---|---|
| 0–2 s | | The actors appear. A dashed `attempt timeout` line and a `CI #42 status: waiting` box are drawn ahead of time. |
| 3.7 s | 110–118 | A `GET status #42` chip slides from the agent lane to the CI lane. CI activates with a ring at frames 118–124. |
| 4–12 s | | The orange caller bar and the grey CI bar grow together. |
| 12.2 s | 367–370 | The caller bar reaches the deadline line, which flashes. This is the loudest sound in the file (-6.7 dBFS). |
| 12.9 s | about 386 | The caller bar turns grey and the label changes to `stopped waiting`. |
| 14.7 s | 442–446 | The status flips to `unknown` with a pulse. |
| 17.3 s | | `this run: still working` appears beside the CI bar, which keeps extending well past the deadline. |
| 22.8 s | 683–690 | The CI bar ends with a green check ring and `lookup done`, and all three CI rows turn green. The caller's box still reads `unknown`, and no response arrow ever returns. |
| 26.2 s | 787–795 | The status box pulses again. |
| 28.9 s, 30.2 s | 868, 907 | `cancel()` and `rollback()` fade in as dashed boxes marked `separate code`. |
| 30.7–38.3 s | | Static, silent hold to the end. |

**Published.** Two stacked boxes, `CALLER` and `REMOTE SERVICE`, with a progress bar inside the remote box and a two-line caption under each beat. The cuts are hard switches at 7.0 s (frame 140), 14.0 s (280), and 21.0 s (420):

- The caller changes from `waiting` to a red `timed out` (7 s) and then to an orange `status unknown` (21 s).
- The remote box changes from `processing` to `still processing` with an orange border (14 s). Its bar fills slowly the whole time.
- There are four quiet blips (-21.8 to -29.5 dBFS) at 0, 7, 14, and 21 s.

## Scope check against the brief

| Requirement | Candidate | Published |
|---|---|---|
| Caller waits for CI status | Yes: the `GET status #42` chip and the `CI #42 status: waiting` box (3.7–12 s) | Yes, in words only: `CALLER waiting` |
| Timeout stops the caller waiting | Yes: the bar ends exactly on the deadline at 12.2 s, `stopped waiting` appears, and the soft waiting tick stops after 11.1 s | Yes: the caller switches to `timed out` at 7 s |
| Remote work may continue | Yes: the CI bar keeps extending to 22.8 s, with `this run: still working` | Yes: `still processing` and a growing bar |
| Outcome unknown to the caller | Yes: no response arrow, and the status reads `unknown` from 14.7 s to the end, even after the remote finishes | Yes: `status unknown` at 21 s |
| No claim of a failed build, cancellation, or rollback | Holds. No red is used, and `cancel()` and `rollback()` appear as `separate code` | Holds in the caption. The red `timed out` border (7–21 s) could read as a failure state. |
| No retries or backoff required; finite ending | Holds | Holds |
| No paragraphs or physical metaphors | Holds: short labels only | Two-sentence captions at every beat. They are short but carry the lesson. |

## Scores (reviewer judgement, 1–5)

| Axis | Candidate | Published |
|---|---|---|
| Causal clarity | 4.5 | 2.5 |
| Accuracy | 4.5 | 4 |
| Pacing | 3.5 | 3 |
| Visual legibility | 4.5 | 4.5 |

### Causal clarity

The candidate shows the causal chain without relying on words. The caller's bar stops on a deadline line drawn in advance (12.2 s). The remote bar visibly runs past that line (12.2–22.8 s). The remote finishes (22.8 s) while the caller's box still reads `unknown`, and no response arrow returns. The sound supports this: a soft caller tick every 1.11 s stops at 11.1 s, while the steady 0.555 s remote tick runs until the completion chime at 22.77 s.

The published cut states each step in a caption. Its two boxes change labels, but nothing on screen links the timeout to the remote work. There is no request, no deadline, and no missing response.

### Accuracy

Both cuts are correct on the core claims.

The candidate's one weakness is naming. The remote work is called `this run` (17.3 s), yet it ends in `lookup done` (22.8 s), and the three CI rows fill like build stages (7.1 s, 19.1 s, 22.8 s). A viewer may not know whether the build or the status lookup kept going, or what `rollback()` would undo.

In the published cut, the red `timed out` border (7–21 s) leans toward reading as an error.

### Pacing

The candidate's 8.5 s of waiting (3.7–12.2 s) is slow, but both bars grow and both tick sounds play throughout. The long 7.6 s silent, static hold (30.7–38.3 s) is a deliberate end hold that does not violate Pass 1, but it is longer than needed. Short near-static stretches of 2.1–2.6 s at 23.7–26.3 s and 26.9–29.1 s stay under the 3 s threshold.

The published cut gives each beat 7 s. Only a slow progress bar moves between hard cuts.

### Legibility

The candidate's smallest text (`time`, `separate code`, `this run:`) is roughly 30 px at native size and still readable at 350 px (frames 560 and 940). Its right-edge labels end around x≈1035, so nothing is clipped. Nothing intrudes on the title band.

The published cut uses large, clean type and stays readable at 350 px (frame 480).

## Objective defects

None reproduced in the candidate. Every candidate sound matches a visual event at the exact frame index:

| Sound | Frames | Visual event |
|---|---|---|
| 3.77 s | 110–124 | request and CI activation |
| 7.11 s | 213–216 | CI row 2 lights |
| 12.22 s | 367–370 | deadline flash |
| 14.66 s | 442–446 | `unknown` |
| 17.33 s | 515–532 | label appears |
| 19.11 s | 574 | row 3 lights |
| 22.77 s | 683–690 | completion ring |
| 26.22 s | 787–795 | status pulse |
| 28.88 s | 866–872 | `cancel()` |
| 30.22 s | 904–912 | `rollback()` |

No clipping occurs (max -4.7 dB). The timeout is the loudest event. The faded `this run: still working` label that stays beside `lookup done` (from 22.9 s to the end, frames 690 and 940) is dimmed and positioned on the time axis, so I treat it as an optional refinement and do not count it as stale state.

## Optional improvements (ranked by teaching impact)

1. **Name the remote work consistently** (17.3–22.8 s, size S). Saw: `this run: still working` followed by `lookup done`, while the CI rows fill like build stages. Change: use one noun for the continuing work, for example `run #42` with a final `run #42 finished`, or make the whole lane the status lookup. Effect: removes doubt about what kept going and what `rollback()` would apply to.
2. **Shorten the end hold** (30.7–38.3 s, size S). Saw: 7.6 s with no motion or sound. Change: hold about 3–4 s after `rollback()` lands. Effect: brings the total closer to the lesson length and avoids a stretch that looks frozen.
3. **Tighten the wait before the timeout** (3.7–12.2 s, size S). Saw: about eight identical tick cycles. Change: reach the deadline about 2–3 s sooner. Effect: brings the disruption forward while keeping the sense of waiting.
4. **Retire the earlier label once work finishes** (22.9 s onward, size S). Saw: the dim `still working` label beside `lookup done`. Change: fade it further, or change it to past tense, when the check ring lands. Effect: the final frame then shows one remote state.
5. **Integration note for promotion.** This is a manifest change for the coordinator and not a defect in the video. `lessons.json` item 2 lists a duration of 28 s and beats at 0/7/14/21. The candidate runs 38.33 s, with the timeout at 12.2 s, `unknown` at 14.7 s, remote continuation at 17.3–22.8 s, and the `cancel()`/`rollback()` ending at 28.9–30.2 s. It also shows `unknown` before the remote continuation, while `lessons.json` lists them in the reverse order. If the cut is promoted, the beat times and order need updating.

## Recommendation

Recommend the candidate. It teaches the mechanism through motion and sound, keeps the outcome visibly unknown to the caller after the remote finishes, and separates cancellation and rollback as their own code without claiming the build failed. The published cut remains accurate and readable, but it depends on captions for causality and does not depict the request, the deadline, or the missing response. Human editorial review controls promotion.

