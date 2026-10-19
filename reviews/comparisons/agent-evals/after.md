# Agent evals — completed comparative review

Review date: 2026-10-19. Reviewer/editor: gpt-6-astra comparative review.

Recommend **astra** as the chapter entry; keep **baseline** and **fable** as complementary alternatives. This is a comparative editorial recommendation, not a change to the site's shared selection or curriculum manifests. The blind assignment, revealed only after saving before.md, was A=baseline, B=fable, C=astra. No author scores informed the blind findings.

## Teaching comparison

Astra supplies the most concrete bridge from familiar engineering practice to evaluating delegated work. At 3.30s the new empty-password check passes; at 8.00s the valid-password regression fails. Both actual results are distinguished from expectations, and the candidate is blocked at 11.30s. Patch B clears the prior evidence at 14.00s, passes both checks, and reaches human review at 23.80s. The 2/2 counter and human-review endpoint avoid presenting a small suite as permission to release. Its limitation is scope: the agent run, configuration, and repeated-trial variability are outside the scene. The guide supplies them.

Baseline is the best follow-up for agents that modify external state. At 4.65s and 16.45s both trials say Done, but the actual ticket state differs. The grader receives state at 6.70–7.35s and 18.50–19.15s; it never reads the completion-message branch. Retaining 1: PASS while resetting the fixture at 11.00s illustrates separate trials. It does not establish a measured success rate, nor does the visible OPEN reset prove every hidden fixture was isolated. The final judgement arrives at 19.80s and gets a numbered badge at 21.60s. That is slower and less concrete for a coding introduction than Astra, but valuable for general agent systems.

Fable adds a different failure mode: the grader itself omits a requirement. At 13.28–13.63s the second patch fixes login but breaks signup/reset; at 15.89s the narrow grader still reports PASS. At 19.00s a second requirement appears, then the same artifact fails the expanded grader at 22.83s. This is not another agent retry or proof that v2 is generally worse. Its strongest use is a follow-up discussion about testing the grader with deliberately bad candidates. One trial per configuration and abstract test names make it a weaker first entry than Astra.

## Corrections completed

- **Fable phone legibility:** the original 26px test and predicate type became roughly 8.4px at 350px width. Raised it to 36px and widened stores from 480 to 660px. Task/harness labels also grew; gutter marks moved with the wider tables, and the verdict moved below the grader with matching sound pan. Rechecked full-size and 350px encoded frames, including the shake/ripple beats and ending. No row collision or clipped label was found.
- **Fable predicate ambiguity:** the grader now explicitly labels its rows as required checks. `others PASS→PASS` is a condition being tested, not a claim that the red tests passed. The task now reads `fix login bug`, avoiding an instruction that could be read as modifying a test to make it green. The distinctive narrow-grader/regrade mechanism and timing remain intact.
- **Fable metadata boundary:** narrowed the lesson from preserving all unrelated environment state to preserving required existing behaviors. The transcript now describes the retained-title fade accurately and no longer claims the failure sound was perceptually loudest. Original model provenance, original lesson, and original transcript remain in variant.json/corrections. The author review remains intact, with a separate comparative addendum.
- **Baseline transcript:** added the 11.00s fixture reset and corrected the FAIL onset to 19.80s, distinguishing it from the 21.60s numbered relabel. Original text is preserved in transcript-corrections.json. The scene and MP4 are unchanged.
- **Guide:** recorded actual source retrieval dates and clarified that exceeding the agent's agreed task budget still counts as a failed attempt, while environment failures require separate diagnosis. The existing valid claims and exercise are retained.

Astra's apparent packet/grade crowding was examined in native-resolution crops at 10.60/10.70/10.80/10.90s and 23.10/23.20/23.30/23.40s. Packets pass above, outside, and below the grades; their glow approaches the letter tops but does not obscure the grade. No scene change was justified. Baseline's text and predicate remain readable at phone width. Its slower final hold is an editorial tradeoff, not an objective defect. No revision quota was used.

## Content verdict and primary evidence

**Keep as core.** Engineers beginning to delegate work need observable acceptance criteria and regression checks before increasing autonomy. This guide provides an immediate practice: retain artifacts, start clean trials, grade both requested and preserved behavior, inspect failures, and compare configurations without selecting only the best attempt. Harness engineering is a reasonable prerequisite. The six-attempt exercise has observable criteria and explicitly disclaims a reliability estimate.

All four linked primary documents were opened and the relevant sections read on 2026-10-19:

| Primary document | Claim checked and result |
|---|---|
| [Anthropic — Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | Definitions distinguish task, trial, outcome, agent harness, and evaluation harness. Outcome grading, clean environments, repeated trials, regression protection, and calibrated graders support the guide. Binary and partial-credit grading both exist; making authentication correctness mandatory is this chapter's justified judgement. |
| [OpenAI — Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices) | Task-specific representative cases, logging, comparison, continuous evaluation, and calibration against human judgement support the proposed workflow. It does not certify any particular small test suite as sufficient. |
| [Anthropic — Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents) | Held-out tasks and accepting valid alternative solution paths support the guide's separation of tuning and validation and its warning against demanding one exact tool sequence. |
| [SWE-bench — Evaluation guide](https://www.swebench.com/SWE-bench/guides/evaluation/) | Generated patches are executed and graded in a controlled environment. Cached grades depend on run/instance identity; logs distinguish unresolved tests from missing results and infrastructure errors. This supports retaining evidence and diagnosing environment problems before attributing them to a patch. |

The illustrative authentication example is an editorial teaching example, not an experiment. Required checks are a decision policy, not a universal rule that every grading dimension must be binary. Evals measure evidence; runtime permissions enforce access. Two checks cannot establish comprehensive authentication correctness, and three trials cannot establish reliability. These limits remain explicit in the guide. No benchmark was run or claimed.

## Encoded verification

All final streams passed a complete `ffmpeg -xerror` decode of both video and audio, frame counting, stream checks, decoded first/last pixel equality, and ISO-BMFF atom inspection. FFmpeg render/decode commands were capped at two threads; local renderer filter pools are also capped at two. `moov` precedes `mdat` in every final file. All three are H.264, 1080×1920, 30/1 fps, yuv420p with AAC.

| Cut | Duration | Decoded frames | Maximum audio | Loop boundary |
|---|---:|---:|---:|---|
| baseline | 26.000s | 780 | −6.4 dBFS | Identical black first/last frames |
| astra | 28.000s | 840 | −3.9 dBFS | Identical black first/last frames |
| fable revised | 27.066667s | 812 | −3.2 dBFS | Identical title-only first/last frames |

Every audio peak is below −0.5 dBFS. Inspected encoded spectrograms and 100ms RMS windows around all scheduled cues: baseline 20, Astra 27, Fable 34; all have measurable signal. Quietest cue-adjacent windows were approximately −33.8, −37.0, and −40.0 dBFS respectively. Source cue times correspond to the observed causal events. RMS-window checks establish signal presence, not isolation of overlapping cues or perceived audibility.

**Audio was not heard.** Pacing was judged from timestamped decoded frames and event timing, not continuous real-time playback or a phone-speaker listening test. Baseline's final result hold (21.60–24.00s), Astra's human-review hold (23.80–26.70s), and Fable's rejection hold (22.83–25.94s) are deliberate reading pauses. Brief pauses after results serve the causal comparison. Fable's fade begins at about 25.94s (the author's approximate 25.6s beat-sheet entry has been corrected).

Viewing coverage: complete one-second encoded contact sheets; fourteen selected frames per original cut at 350px; native 1080×1920 beat/busy/ending frames; eighteen additional encoded beat/boundary frames for revised Fable at 350px and selected native frames; dense native Astra packet-boundary crops; exact first/last frames; and all three poster previews. Posters show states that occur in their corresponding cuts. Frames were extracted from MP4s, not substituted with renderer stills.

Reproduction: run `bash video/agent-evals/fable/render.sh` from the repository root. Run `python3 reviews/comparisons/agent-evals/scratch/verify-final.py` for media validation and `node reviews/comparisons/agent-evals/scratch/cues.cjs` to export scheduled cue times. Final stream probes, decode/level logs, atom offsets, frame extracts, spectrograms, and cue-window checks are under scratch/final. Durable validation summary: verification.json. Original blind MP4s and changed author sources are preserved under scratch.

## Scores and limitations

Scores describe final teaching quality, independently of factual verification: 5 means particularly effective for this mechanism; 4 means sound with a visible tradeoff. Baseline: clarity 4, accuracy 5, pacing 4, visual 4. Astra: clarity 5, accuracy 5, pacing 4, visual 5. Revised Fable: clarity 4, accuracy 5, pacing 4, visual 4. Astra earns its advantage through the concrete expected/actual comparison and bounded ending, not model identity. Fable's original phone-legibility weakness was corrected without changing its complementary lesson.

This is one reviewer's judgement, not a learner study. No cut covers the complete evaluation lifecycle by itself. Human editorial review still controls promotion in the shared curriculum. No shared build/app files, installed skill files, other topics, Git state, or publication settings were changed.
