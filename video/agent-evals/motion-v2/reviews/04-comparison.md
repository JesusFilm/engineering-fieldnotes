# Lesson 04 comparison — Repeat trials independently

**Pass.** Prefer the local candidate. It makes the clean start concrete, separates disposable trial state from retained evidence, and reports both outcomes. No reproducible objective blocker was found in the inspected samples. Optional refinements do not prevent acceptance.

## Scope and inspection

Grounded in `video/agent-evals/sequence/lessons.json` item 4: repeat the same task from an isolated intended starting state, retain each result and evidence, and report the distribution rather than only the best attempt. Earlier planning context is acknowledged but not treated as encoded evidence. No author source, plan or self-review was read for this comparison.

Viewed individual actual 350px-wide decoded frames: seven candidate and five baseline samples from FFmpeg `fps=1/6,scale=350:-1`. Follow-up used full decoding with frame-index selection, Pillow Lanczos resizing to 350×622, and JPEG output. Exact candidate samples: 0, 5, 7, 13, 16, 17, 18, 19, 20, 22, 28, 30, 34, 36, 40, 41s. Baseline exact samples: 7, 14, 21, 27s. Also inspected the candidate's 36s full-resolution frame. This is sampled state/transition analysis, not continuous playback or an every-frame audit. Alternate extraction corroborated the layout and text; no unconfirmed visual fault is flagged.

## Comparison

| Dimension | Candidate | Public baseline |
|---|---|---|
| Causal clarity | Fixed clean-state values populate each trial; T1 changes state, is saved, then clears before fresh T2 initialization. Saved evidence persists. | Separate trial boxes suggest independence, but clean starting state is mostly explained by captions. |
| Accuracy | Same task/checks remain visible. T1 PASS and T2 FAIL both survive into an explicit two-trial count; best-only reporting is crossed out. | Correct PASS/FAIL examples and one-pass/two-trials summary; no detailed state or evidence identities. |
| Pace | 42s separates initialization, execution, retention, reset, second result and complete reporting. Clean T2 is readable before execution. | 28s with four readable caption phases; quicker but less explanatory state change. |
| Native350 legibility | Main labels, state values, evidence IDs and final count are readable. Some supporting labels are small but discernible. | Large node labels and readable captions; fewer details to track. |
| Meaningful variety | Fixed fixture beside changing runtime, an agent activity strip, append-only attempt list and reporting correction have distinct functions. | Branch-and-join diagram with similar trial boxes and progress bars. |

## Timestamped encoded evidence

- At 5–7s T1 is ready with code r0, data d0 and empty history, matching CLEAN START.
- At 13s T1 has PASS and changed P1/d1/log1. At 16–17s its P1/log1 evidence and PASS are retained in ALL ATTEMPTS.
- At 18s the runtime interior clears while T1's saved row remains. At 19s clean-source values are emphasized. At 20–22s T2 is ready with r0/d0/empty, not T1's modified state. This is the central causal distinction.
- Later periodic samples show T2 running with P2/d2/log2. At 28s it has FAIL; at 30s the failure is also recorded alongside T1 PASS.
- A periodic sample shows the proposed `best: T1 PASS` report. At 34s it is crossed out. At 36–40s the report reads `1 pass · 1 fail · 2 trials`, with both evidence rows retained.
- At 41s the stage clears to the title after the completed-report hold. A finite ending is acceptable.
- Baseline 7/14/21s samples show caption phase changes for T1, clean T2 and complete reporting; at 27s its summary retains `1 pass / 2 trials`.

## Accuracy limits and optional refinements

The identifiers and outcomes are illustrative. A reset of code/data/history is a useful abstraction, not proof of isolation from every external service or cache. The video does not certify statistical independence, establish a reliability estimate from two trials, or prove general safety. Its final wording reports only the shown counts. Grading details are appropriately outside this lesson; PASS/FAIL are displayed outcomes, not a new demonstration of test correctness.

1. Consider expanding the task strip to say “same setup” as well as “same checks”, making the fixed agent configuration explicit.
2. Consider retaining the completed report through the final second instead of clearing to the title after the result hold.

## Technical verification and hash binding

Both videos are 1080×1920 with audio. Candidate: 42.000s at 30fps. Baseline: 28.000s at 20fps. Full audio/video decoding completed with exit code 0 for both; moov precedes mdat in both. Candidate levels: mean_volume: -32.6 dB, max_volume: -5.0 dB. Baseline levels: mean_volume: -40.2 dB, max_volume: -12.5 dB. Audio was analyzed, **not heard**. Actor-specific timbre, subjective mix and perceptual synchronization are not certified by frame or signal analysis.

| Media | SHA-256 before and after (unchanged) |
|---|---|
| video/agent-evals/motion-v2/04/video.mp4 | `54f87007a6786bf0f46ddfb5bc7577453379da9becaeaf77157b03914bf0c480` |
| public/lessons/agent-evals/04.mp4 | `a39d935b92cc3093dda076a4b24723608134ff93b222b36cf05fc9e66654fa9e` |

This decision binds only to the candidate hash above. Any repair/new encode requires renewed actual encoded inspection and a new hash-bound decision. Neither media file was edited. Writes are restricted to this comparison, decision JSON and scratch/04 evidence.
