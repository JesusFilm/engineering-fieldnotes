# Agent evals — fresh encoded review

Reviewed 2026-10-20. **No blocking visual or technical defect found in the inspected scope.** Recommend the five lessons as a slower introductory expansion, retaining astra as the stronger compact worked example. Lesson 05 needs the most teaching improvement; its correct cautions are largely stated rather than demonstrated. This is review evidence, not curriculum promotion.

## Scores and comparative findings

Scores 1–5 (higher is better); judgement is separate from factual verification.

| Clip | Causal clarity | Accuracy | Pacing | Legibility | Encoded evidence |
|---|---:|---:|---:|---:|---|
| 01 Task, trial and grader | 3 | 4 | 3 | 4 | 7–9s task enters the agent; 14–16s patch/evidence reaches the grader; 21–27.9s correctly limits the grade to one trial. Criteria and actual grade remain abstract. |
| 02 Check actual behavior | 4 | 5 | 3 | 4 | 7–9s empty input invokes the check; 14–20.9s empty rejection is recorded; 21–27.9s scopes the conclusion to this test. Clear claim-versus-observation distinction in captions. |
| 03 Catch an overbroad fix | 4 | 5 | 3 | 4 | 10.5s empty case PASS; 17.5s valid case FAIL; 22s regression reaches grader; 24.5–27.9s patch fails. Both results persist, and captions distinguish rejection from test success. |
| 04 Repeat trials independently | 4 | 4 | 4 | 4 | 7–13s first trial, 14–20s fresh second trial; 21–26s both outcomes reach report; 27.9s explicitly shows “1 pass / 2 trials.” Isolation is stated, not independently visualized. No reliability percentage is claimed. |
| 05 Know grading limits | 2 | 4 | 2 | 4 | 7–20.9s “check grading” becomes “calibrate results,” without a worked grading error; 21–23s scoped results reach team. Correct release limitation, weak causal demonstration. |
| Original astra | 5 | 4 | 4 | 4 | 8–12s expected REJECT/ACCEPT versus actual REJECT/REJECT yields one pass and a blocked gate; 14s changes candidate to B; 20–24s corrected behavior yields two passes and human review. |

Astra makes expected behavior, observed behavior, judgement, and gate consequence simultaneously inspectable. Its smaller secondary labels remain readable at 350px, though the new captions provide more comfortable explanation. The sequence adds vocabulary, repeated trials, and grading limitations absent from the original, but does not reproduce astra’s positive corrected-patch comparison. Keep that original available as a recap. These are different teaching scopes, not a fivefold increase in demonstrated mechanisms.

## Actual blocking defects

None observed. No sampled text clipping, unreadable core labels, packet/label collision, broken final state, or decode failure. Finite endings and explanatory captions are intentional and permitted. Deliberate reading/outcome holds are not treated as frozen-render defects. Audio-event matching remains unverified because audio was analysed, not heard.

## Optional refinements, ranked

1. **Demonstrate a grading error** (05, 7–21s, M). Replace part of the static grading hold with an incorrect PASS, visible contradictory evidence, and human correction. This would explain false passes and calibration rather than only naming them.
2. **Retain expected and observed values** (02, 14–27.9s; 03, 7–27.9s, S). Add “expected reject / observed reject” and “expected accept / observed reject” beside the existing results. Astra already demonstrates why identical application responses can earn opposite test grades.
3. **Make trial independence concrete** (04, 0–16s, M). Show separate clean environments or reset artifacts before each trial, while retaining the final two-outcome report. This clarifies that trial 2 did not inherit trial 1’s work.
4. **Give the first grade content** (01, 14–27.9s, S). Attach one named criterion and its observed score to the evidence. The vocabulary lesson then connects to the concrete check in 02.
5. **Redistribute reading time** (all, 0–7s; especially 05, 9–21s, S). Some seven-second setup/label holds feel slack. Use that time for the examples above; optionally give 04’s final report another second. Do not shorten merely to impose a loop rhythm.

## Factual verification and limits

Checked task/trial/grader definitions, observed outcomes versus agent claims, regression checks, and human calibration against [Anthropic, Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), retrieved 2026-10-20. The displayed lessons are consistent with those principles. Illustrative authentication cases do not constitute a comprehensive security evaluation; two trials describe the displayed sample, not a statistical reliability guarantee. Calibration and clean starts are mostly assertions in these animations, which limits demonstration strength rather than making the assertions false.

## Inspection and audio scope

Source-free review of the intended lessons JSON and six encodes; no authoring source, storyboard, or prior scores consulted. User specified astra directly. Guidance: repository AGENTS.md, editorial workflow, architecture-flow-video review reference. User overrides its caption/loop/automatic-source-edit advice.

For all five new clips inspected encoded frames at 0, 3.5, 10.5, 17.5, 24.5, 27.9s; exact boundary pairs 6.95/7, 13.95/14, 20.95/21s; busy frames 01=15s, 02=22s, 03=22s, 04=25s, 05=22s. All viewed at native resolution and actual 350px width. Half-second contact sheets cover each full clip and astra; original detail comparison also inspected at 8, 12, 14, 20, 24s native/350. Sampling is not continuous real-time playback or browser-layout testing.

All six files fully decoded without reported errors; moov precedes mdat. Audio was **analysed, not listened to**: new clips’ mean/max dBFS respectively 01 −44.2/−13.2, 02 −42.7/−13.2, 03 −41.5/−10.5, 04 −40.2/−12.5, 05 −44.2/−14.5; astra −32.1/−3.9. No measured clipping. Perceptual balance, audibility, timbre, and event synchronization are not certified. No release checks or source edits performed.

## SHA-256

All seven input hashes rechecked unchanged after inspection. Paths are relative to repository root.

| File | SHA-256 |
|---|---|
| `public/lessons/agent-evals/01.mp4` | `a38a29da8c5a7669c7caae32d3381c5f810502a25afa0275c33c73fd5dbabf6e` |
| `public/lessons/agent-evals/02.mp4` | `96f20244ee69e101ee39f735f8cd3247d5b46b405b8ef31e6c64162714a83c49` |
| `public/lessons/agent-evals/03.mp4` | `e43923a37e8130a05d5fce31188a3d7bea734a5cd11ba4f18008dd01e2c6fce3` |
| `public/lessons/agent-evals/04.mp4` | `a39d935b92cc3093dda076a4b24723608134ff93b222b36cf05fc9e66654fa9e` |
| `public/lessons/agent-evals/05.mp4` | `f83ccc50bbed0c95f09e0be0935bc0328790fd2b3fc67bdda7a3bc46dd9d2342` |
| `public/media/agent-evals/astra.mp4` | `5bd6298b918ddea0e5dd850181f4c80e62dad9866545f170b6b9d983f80bae98` |
| `video/agent-evals/sequence/lessons.json` | `1cbf2f93a8da1aebfb0abfeeff967997e2f0adbf40246e00267a06b97ca783ae` |

Evidence: `scratch/reviewer6eval/evidence.json`, per-clip native/350 frames, half-second contact sheets, and audio analysis logs.
