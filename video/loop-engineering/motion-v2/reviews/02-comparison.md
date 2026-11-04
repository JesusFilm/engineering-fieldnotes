# Lesson 02 comparison — Use a specific failure

**Decision: pass. Prefer the motion-v2 candidate for this lesson. No reproducible objective blockers.** It connects a real-looking numerical failure to a specific expression change, retains the original input and expectation, and separates historical evidence from an unobserved new result. The baseline communicates the general sequence but relies more on captions and abstract PATCH/RETEST tokens. This recommendation does not change publication or promotion status.

## Scope and independence

Reviewed the encoded candidate `video/loop-engineering/motion-v2/02/video.mp4` against `public/lessons/loop-engineering/02.mp4`, using item 2 of `video/loop-engineering/sequence/lessons.json`. The intended sequence is: twelve tests execute; one concrete assertion reaches the agent; a targeted edit makes the previous evidence old; changed code returns for a fresh observation. The takeaway requires preserving failing input and expected behavior.

Earlier planning context was already available in this conversation. This review is therefore not context-blind. No author source, self-review, other plan, production ledger, planner identity, or provenance material was read for this comparison. The encoded lesson, rather than compliance with an earlier proposed design or duration, determines the verdict. No later lesson mechanism is required here.

## Hash binding

Both SHA-256 values were calculated before extraction and again after encoded inspection. Neither file changed.

| Cut | Before SHA-256 | After SHA-256 |
| --- | --- | --- |
| Candidate | `73f470b1b3d0f18f0810ae75bfb27d45e8797b9efa714a03176564dcbeeb7ca0` | `73f470b1b3d0f18f0810ae75bfb27d45e8797b9efa714a03176564dcbeeb7ca0` |
| Baseline | `73ce9f17834f263f3073833b56bdbb3a5488bd15572ebd1a8011fa0217a5ab15` | `73ce9f17834f263f3073833b56bdbb3a5488bd15572ebd1a8011fa0217a5ab15` |

The accompanying `02-decision.json` is bound only to the candidate hash above. Any repaired or otherwise changed encode needs renewed actual encoded review before its decision can be updated; substituting a new hash alone is not sufficient.

## Encoded inspection method

Extracted one individual 350×622 PNG per second from both MP4s with FFmpeg. Viewed individual native-350 images across every teaching stage, not just a contact sheet. Added these exact-time probes to inspect transitions and endings:

- Candidate: 0, 5.8, 8.8, 11.5, 14.5, 17.5, 20.5, 21.5, 23.5, 24.5, 26.5, 29.5, 30.5, 31.5, 35.5, 36.9 seconds.
- Baseline: 3, 7, 10, 14, 17, 18, 21, 24, 27.95 seconds.

Viewed full-resolution, frame-index-selected images at candidate 14.5, 21.5, 26.5, 31.5 seconds and baseline 10, 18 seconds. Independently resized those full frames to 350×622 using Pillow Lanczos and viewed each result. All evidence is under `scratch/02/`, with `t-*.png`, `full-*.png`, and `alternate-*.png` distinguishing extraction routes. Numbered files are the one-second sampling pass, not exact integer-time probes. Probe metadata, audio-analysis logs, complete-decode results, container atom order, and hashes are retained there.

This is sampled encoded-frame and transition inspection, not a claim of uninterrupted real-time playback or visual inspection of every encoded frame.

### Suspected display artifacts

Some initial displayed images appeared to omit parts of the title, input, or code, including candidate 14.5/21.5/31.5 seconds and baseline 10/18 seconds. Full-resolution frame-index extraction and independent native-350 resizing showed the complete text. Those apparent omissions did not reproduce and are excluded from findings. No disappearing-text or clipping blocker is asserted. The reviewed alternate frames also show clear separation between the result chips, code highlight, and surrounding labels.

## Comparative assessment

Scores are editorial judgments on a 1–5 scale, with 5 strongest. They are separate from factual/technical checks.

| Criterion | Candidate | Baseline | Evidence |
| --- | --- | --- | --- |
| Causal clarity | 5 | 3 | Candidate 1–6s visibly executes a twelve-cell matrix; 9–15s reveals input 120, 0.25, expected 90.00, actual 119.75 and the diagnostic equality `120 − 0.25`. At 18–22s it highlights `− rate` and replaces it with `* (1 − rate)`. Baseline 7–14s supplies expected/actual values but no input or concrete expression; its PATCH token and caption carry the repair claim. |
| Accuracy and lesson fit | 4 | 3 | Candidate preserves input and expected value, changes code identity A→B, retains A's observed 119.75, leaves B blank, and resets the test matrix for B at 30–31s. It never claims the edit passed. Baseline correctly marks “not yet rerun”/“needs retest” around 17s, but never exposes the failing input that the takeaway asks viewers to preserve. |
| Pace | 4 | 4 | Candidate's 37s gives the numerical diagnosis, local edit, historical/current comparison and rerun their own holds. It is longer than the 28s baseline for useful reasons. The final 31–35.5s state could be slightly tighter. Baseline is easy to follow and offers ample caption-reading time, but more of that time is spent on abstract static boxes. |
| Native-350 legibility | 4 | 4 | Candidate's main title, count, numerical mismatch and highlighted code can be read without zoom. Secondary labels, input and code remain relatively small, roughly 12–14px visually. Baseline's sparse labels and two-line captions are readable, though they require more prose reading. No objective overlap or clipping reproduced in either cut. |
| Meaningful variety | 4 | 2 | Candidate uses a test matrix, assertion inspection, expression-level highlighting/replacement, and side-by-side old/new result slots. Each change teaches something. It still uses three stacked containers, but their functional contents do substantially more than repeated generic actor boxes. Baseline mostly moves named tokens among AGENT, TEST RUNNER and CODE. |

## Beat and transition findings

**Execution before diagnosis, 0–8.8s.** The candidate starts with `12 selected` and empty cells, then shows execution progressing. The settled matrix has eleven checks and one cross, with `12 ran · 1 failed`. The failed cell is selected before its details appear. This distinguishes selected tests from executed tests instead of treating a test count alone as evidence. The remaining eleven cases are not shown, so their adequacy or coverage cannot be assessed.

**Specific observation, 9–17.5s.** Input `120, 0.25`, expected `90.00`, and actual `119.75` are simultaneously visible. The arithmetic is internally consistent: subtracting a fractional rate directly yields 119.75, whereas applying a 25% discount yields 90. The highlighted input and equation make the failure informative rather than merely red. The values are an illustrative case, not a verified real runner transcript. Their meanings can be inferred from `discount(total, rate)`; a short total/rate label would help a beginner.

**Targeted edit, 17.5–23.5s.** Agent activity and highlighting focus attention on `− rate` before the changed expression appears. Code B is visibly different from the still-labeled code-A test result. The test input and expected value do not change. There is no green validation signal on the patch itself. This is a plausible targeted correction for the displayed toy function, not proof that one assertion uniquely determines every repair.

**Historical evidence, 23.5–29.5s.** The code-A test matrix becomes dashed and subdued. The actual-value row turns into `code A 119.75` beside `code B —`. Old evidence is retained as history, not mutated into 90 or reused as B's result. The transition unfolds over several seconds; code identity remains visible during that explanation, so the temporary coexistence of new code and old results is not a stale-evidence defect.

**Rerun and finite ending, 29.5–37s.** A return event travels from the code toward the runner; by 30.5s the runner is labeled code B and all twelve result cells have reset. At 31.5s the first cell is active with `running · 0 of 12`, while B's result remains blank. The scene holds through 35.5s and fades its working panels, leaving the title at 36.9s. This is an intentional excerpt before a fresh observation, not an assertion of a completed fix. The lesson does not require the rerun's outcome. No seamless-loop requirement is imposed.

**Baseline boundaries.** Around 4–6s, the runner reports eleven passes and one failure. At 7–10s, expected/actual data replace the count and a failure token goes toward the agent. Around 14–17s, PATCH reaches code and labels become `needs retest`/`not yet rerun`. At 21–24s, RETEST travels back and the runner becomes `new run pending`. The sequence is coherent, but both the targeted nature of the edit and preservation of the input are mostly absent from its visual evidence.

## Optional refinements — not blockers

1. **9–16s: name the input values.** Add concise total/rate labels or a `25%` cue so a beginner does not need to infer parameter meaning from the function signature. Preserve the sparse assertion view.
2. **9–35s: enlarge secondary text.** The input, code, and agent label are readable at native 350px but could be more comfortable. Use available space or shorten labels rather than adding captions.
3. **31–35.5s: tighten the final running hold or add a subtle activity cue.** The unchanged `0 of 12` is a valid pending state, but a shorter hold could close with more energy. Keep B's result empty; do not invent a passing observation to make the ending feel complete.

No repair is required solely for these refinements. No media changes were made.

## Technical validation and audio limits

Both files decoded completely with FFmpeg, exit code 0 and no error output. Both contain 1080×1920 H.264 video and AAC audio; full stream details are retained in scratch `probe.json` files. Candidate: 30fps, 1110 frames, 37.000s container duration. Baseline: 20fps, 560 frames, 28.000s. Both place `moov` before `mdat`, supporting progressive MP4 delivery.

FFmpeg volume analysis measured candidate mean −31.7dB and maximum −6.2dB; baseline mean −41.6dB and maximum −10.4dB. Neither measured sample peak clips. **Audio was analyzed, not actually heard.** This does not establish actor-specific sound quality, subjective loudness, cue synchronization, or phone-speaker audibility. The recommendation is based on encoded visual evidence and the stated technical checks, not listening approval.

Only this comparison, `02-decision.json`, and `scratch/02/` evidence were written. No other lesson, media, public/site asset, shared configuration, or publication decision was changed.
