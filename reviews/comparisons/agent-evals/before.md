# Agent evals — blind comparative findings

Recorded 2026-10-19 before opening author scenes, transcripts, metadata, reviews, scores, or the randomized identity map. A/B/C refer to copied encoded MP4s under scratch. The user supplied variant names, but the random assignment was not exposed during this assessment. Intended teaching was read only from content/concepts/agent-evals.json; repository workflow and the requested video skill supplied review criteria.

## Viewing evidence

Inspected decoded one-second contact sheets across all three complete durations, fourteen timestamped beat/boundary frames per cut at 350px width, and original 1080×1920 busy frames A 15.50, B 19.60, C 23.20. Extracted exact first/last frames; their decoded pixel buffers match for each cut. Frames, rather than real-time playback, are the basis of pacing judgements. Audio has not been heard or analysed at this stage. The 1fps sheets sample near the middle of each second; timestamped individual frames are the precise references below.

## A — state grading, 26 seconds

- 1.50–4.50: a task to close ticket #42 reaches an agent plus harness; the ticket closes before a separate final message says Done. Splitting the message and durable state into branches teaches an important distinction beyond ordinary test-running.
- 6.40–7.80: the closed state is sent to the explicit predicate `#42 == CLOSED`, then the grader passes. This is causal evidence rather than a bare success icon. The left final-message branch correctly has no connection to the grader.
- 10.80–13.90: trial 1 is retained as a PASS badge while the fixture visibly resets to OPEN for trial 2. Useful introduction to repeated trials; the reset is visually subtle and must be checked against the transcript before claiming environment isolation.
- 15.50–20.20: the close attempt leaves OPEN, yet the agent still says Done. The same predicate rejects the resulting state. Strongest complementary lesson: fluent completion does not establish actual success.
- 22.50–24.00: both trial results remain visible. This is a useful record, not enough evidence to infer a reliability rate. No numerical reliability claim is shown. The ending gives ample time but feels slightly longer than necessary after the FAIL is clear.
- Text is readable at 350px, although the task and predicate are secondary-size. Normal-before-failure is easy to follow. It lacks the coding guide's concrete regression example and human-review boundary; that makes it a strong alternative rather than my initial chapter-entry choice.

## B — broadening a grader, 27.067 seconds

- 2.80–5.30: a first patch changes login FAIL to PASS while signup/reset remain PASS. A one-row grader passes it. This establishes a normal case before the regression example.
- 8.50–12.50: the fixture resets and harness v1 becomes v2; a new patch travels to the tests. Distinguishing reset from a newly introduced failure requires attention, because the test table changes before the harness label.
- 13.60–18.40: login passes while signup/reset fail, yet the narrow grader reports PASS. This is the most valuable moment: the grader is inadequate even though it operates as specified.
- 19.60–24.70: a second rule, `others PASS→PASS`, is added and the unchanged failed artifact is rejected. Read as a required condition, this is correct; read as an observed result, it contradicts the red tests. The absence of an explicit rule/expectation label makes that ambiguity avoidable.
- At 350px, test identifiers and the two grader rules are unusually small (roughly 8–10 screen pixels high) despite abundant horizontal space. Full-resolution text is clean, but reading the most important predicate on a phone takes effort. Enlarge the test/grader tables and their type before treating this as an equally accessible alternative.
- Ending holds the rejection, but gives no human-review boundary or repeated-trial context. It teaches grader design more directly than A or C, while concrete behavior is hidden behind test names. Retain that complementary mechanism rather than rewriting it into C.

## C — explicit expected and actual behavior, 28 seconds

- 1.80–3.00: patch A is tested against empty-password rejection; expected REJECT and actual REJECT are separate. The delayed PASS avoids equating a raw output with a grade.
- 6.70–8.30: valid-password behavior expects ACCEPT, but the same patch returns REJECT. This is the clearest concrete causal account of why passing the new check is insufficient.
- 10.40–13.80: one of two checks passes but the candidate is BLOCKED. Required correctness is not averaged away. The decision arrives after the failing observation has had time to register.
- 16.00–21.10: patch B resets results, repeats both checks, rejects empty input, and accepts valid input. It shows a fix satisfying both requirements without claiming broad authentication coverage.
- 23.20–26.60: both successful results feed a human-review decision. This is the best bounded ending for the chapter: 2/2 is visible, while the next step remains human review. Moving result envelopes graze the PASS area at 23.20; inspect intermediate frames for actual glyph occlusion before calling it a defect.
- Best phone legibility: expected/actual values and grades read immediately at 350px. Slightly repetitive, but the repetition is the controlled comparison. The video does not show an agent run or harness configuration; the guide must supply that larger context.

## Initial comparative judgement

C is the provisional main entry: it changes an engineer's next action with the fewest inferred steps, directly matches the guide's example, and retains the human decision. A is the strongest follow-up for tool-using agents and nondeterministic trials. B is worth retaining for diagnosing a weak grader, with a substantial phone-legibility improvement and clearer distinction between required predicates and observed outcomes. No cut should imply that one or two successful checks prove release readiness. Scores and verified status are intentionally withheld until source and encoded-media checks finish.
