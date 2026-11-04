# Lesson 03 comparison — Stop after verified success

**Decision: pass. Prefer the motion-v2 candidate for this lesson. No reproducible objective blockers.** It makes the configured success criteria inspectable, visibly ends the edit loop, and assembles a concrete handoff with review still pending. The baseline communicates the sequence correctly but leaves the rule and handoff mostly abstract. This recommendation does not promote or publish either cut.

## Scope and independence

Compared `video/loop-engineering/motion-v2/03/video.mp4` with `public/lessons/loop-engineering/03.mp4` against item 3 of `video/loop-engineering/sequence/lessons.json`. Required sequence: run the same relevant tests against the repair, observe all twelve passing, evaluate the success rule, stop editing and hand over evidence. The claim must remain limited to tested behavior rather than universal correctness.

Earlier planning context was already present in this conversation; this is not a context-blind review. No author source, self-review, other plan, ledger, other session, or provenance material was read. The actual encoded cut determines this verdict, not conformity to an earlier planned composition or runtime. The candidate's 33 seconds is not a defect merely because it differs from a planning estimate or the baseline's 28 seconds.

## Hash binding

Both files were hashed before extraction and again after inspection; neither changed.

| Cut | Before SHA-256 | After SHA-256 |
| --- | --- | --- |
| Candidate | `3429ff821f992254b9b34a38c7eacc2014bd5447c344ad76b62a47129bab5d2a` | `3429ff821f992254b9b34a38c7eacc2014bd5447c344ad76b62a47129bab5d2a` |
| Baseline | `faed3b21779c22d249fd7142555113bd9f0b5498851e129a5d4eaa0da242e53f` | `faed3b21779c22d249fd7142555113bd9f0b5498851e129a5d4eaa0da242e53f` |

`03-decision.json` applies only to the candidate hash above. A repair or any new encode requires renewed actual encoded inspection and a new hash-bound decision; changing the recorded hash alone is insufficient.

## Encoded inspection

Extracted individual 350×622 PNGs with FFmpeg at one-second sampling intervals and viewed native-size individual frames across all teaching stages, not just a contact sheet. Additional exact-time probes:

- Candidate: 0, 2.5, 6, 7, 9, 11.5, 12.5, 13.5, 15, 17.5, 18.5, 20.5, 22.5, 24.5, 26.5, 28, 31.5, 32.8 seconds.
- Baseline: 6.8, 7, 13.8, 14, 16.5, 17.5, 20.8, 21, 27.95 seconds.

Independently extracted full-resolution frames by frame index at candidate 0, 13.5, 18.5, 28 seconds and baseline 17.5, 21 seconds. Viewed those full frames and individual 350×622 versions resized with Pillow Lanczos. Scratch evidence includes numbered interval samples, exact-time `t-*.png`, `full-*.png`, independent `alternate-*.png`, stream metadata, audio logs, and `inspection.json` with before/after hashes and decode results.

This is sampled encoded-frame/transition inspection, not uninterrupted real-time playback or exhaustive visual inspection of every frame.

### Alternate-extraction checks

Some initial displays appeared to omit fragments of static text, particularly the baseline's controller/caption content. Full-resolution frame-index extractions and independent resizes at 17.5 and 21 seconds show intact labels and captions. Candidate full/alternate frames confirm intact conditions, stop state and handoff details. These display omissions did not reproduce; no missing-text or clipping fault is asserted. The broken return segment in the candidate's loop at 18.5 seconds does reproduce, but is an intentional stop-state graphic, not accidental clipping.

## Comparison

Scores are editorial judgments from 1 to 5, with 5 strongest. They are distinct from factual or technical verification.

| Criterion | Candidate | Baseline | Encoded evidence |
| --- | --- | --- | --- |
| Causal clarity | 5 | 3 | Candidate 1–7s counts actual executions; 11–14s checks code B, same twelve tests and passing outcome separately; 17.5–18.5s sends the controller decision to the edit loop; 22–27s populates the handoff after stopping. Baseline uses RUN 12 TESTS / 12 PASSED tokens and a final “stop + handoff” label without showing what the handoff contains. |
| Accuracy / bounded claim | 4 | 4 | Candidate checks the current code and retained tests, preserves B into its evidence summary, and ends with “12 selected passed” and “review pending.” No merge or universal correctness is claimed. Baseline is also bounded to twelve selected tests in its caption, but lacks an explicit review-pending state and concrete revision identity. |
| Pace | 4 | 4 | Candidate's 33s separates result, three checks, stop and handoff, with a useful final reading hold around 27–32s. Baseline's four seven-second stages are readable but spend more time on static generic boxes. Candidate checks arrive roughly one second apart, then remain visible; they do not vanish before being read. |
| Native-350 legibility | 4 | 4 | Candidate primary status, checks and counts read clearly. Handoff details are smaller, approximately 11–13px visually, but remain readable with the final hold; enlargement is optional. Baseline has sparse labels and readable two-line captions. No overlap or clipping reproduced in either cut. |
| Meaningful variety | 4 | 2 | Candidate combines a segmented execution row, sequential criterion checks, a visibly interrupted edit/test cycle and a distinct evidence panel. These changes carry meaning. It retains a panel-based layout, but does not merely repeat three interchangeable actor boxes. Baseline mainly changes labels/colour and transports named tokens. |

## Beat and transition findings

**Fresh run, 0–7s.** Candidate starts with code B, `pytest -k discount`, twelve empty positions and `0 of 12 ran`. At 2.5s two are complete; at 6s eleven are complete and the final cell is active; by 7s the settled result reads `12 ran · 12 passed`. The controller still says waiting. Its dim `12 of 12 passed` line is under “success rule,” without a satisfaction check, so it is a configured criterion rather than an early runner result. A question mark could make that distinction faster to read.

**Rule evaluation, 9–15s.** At 11.5s the code-B match is checked; at 12.5s the same-test criterion is checked alongside the highlighted selection command; at 13.5s the passing-result criterion is checked. By 15s the controller says `rule met`. The observed result precedes that decision. The compact illustration asserts the same-test identity match; an unchanged keyword command by itself would not prove identical collection in a real system. The clip's explicit “same 12 tests” check carries that additional condition.

**Stopping, 17.5–20.5s.** A controller event reaches the loop around 17.5s. At 18.5s the loop loses its amber activity, its return path is interrupted and its label becomes `closed`. No new code revision, edit or rerun appears afterward. The effect is coherent with stopping, although “stopped” would be more direct than “closed,” especially because the drawn path opens rather than closes.

**Evidence handoff, 22.5–31.5s.** The separate handoff progressively receives code B, the test command, `12 selected passed`, and `stop: rule met`. By 26.5s `review pending` is visible. The stopped-loop state and current-code evidence remain together through 31.5s. This makes clear that ending automated edits and approving the patch are different events. The compact record is a summary, not a claim to contain every field required by a production audit.

**Ending, 32–33s.** Working panels fade, leaving the title at 32.8s. This finite ending is acceptable; it does not restart editing or imply another verification result. Matching first/last frames is not required.

**Baseline boundaries.** The test run fills its bar before 7s; at 7s it reports twelve passes. Around 14–16s the passing token reaches the controller, which reads `success rule met` by 16.5s. At 21s the state becomes `stop + handoff`. The caption explicitly says unrequested edits add uncertainty. Its teaching order is correct, but the stop and handoff are asserted more than demonstrated.

## Limits and optional refinements

No reproducible objective blocker was found. Passing the selected suite supports the checked behavior; neither the displayed command nor the green result establishes exhaustive correctness. The candidate's explicit selection scope and pending review are adequate boundaries for this short lesson. It does not demonstrate unrelated failure/budget routes, nor does this lesson require them.

Optional refinements only:

1. **18–32s: use “stopped” instead of “closed.”** This would remove ambiguity between ending an edit loop and closing a circuit. Current dimming, interrupted return path and subsequent handoff already communicate the intended stop.
2. **22–32s: enlarge handoff details.** The command and evidence lines are readable at native 350px but smaller than the main result. Give that panel more width or shorten labels if enlarging them; preserve the final reading hold.
3. **0–14s: phrase the unchecked condition as “12 of 12 pass?”** This would distinguish the configured success condition from observed completion more immediately. Its existing placement under “success rule,” dim state, and later checks avoid a factual contradiction.

These refinements do not justify a fix-needed verdict on their own.

## Technical checks and audio limitation

Both complete files decoded with FFmpeg, exit code 0 and no error output. Both are 1080×1920 H.264 video with 44.1kHz stereo AAC audio. Candidate: 30fps, 990 frames, 33.000s. Baseline: 20fps, 560 frames, 28.000s. Both have `moov` before `mdat`, supporting progressive MP4 delivery. Full probe data is retained in scratch.

Volume analysis: candidate mean −31.9dB, maximum −6.9dB; baseline mean −40.6dB, maximum −10.5dB. Neither measured sample peak clips. **Audio was analyzed, not actually heard.** No listening-based claim is made about sound identity, synchronization, perceived loudness, or phone-speaker audibility. The preference is grounded in encoded visual inspection and these technical checks.

Only this comparison, `03-decision.json`, and `scratch/03/` evidence were written. No media, other lesson, public/site file, shared configuration or publication status was changed.
