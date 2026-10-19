# Evidence for the Fable evaluation cut

The author’s source review was performed on 19 October 2026. These notes paraphrase the supporting claims; the scenario and its teaching choices are library judgements.

## Anthropic: Demystifying evals for AI agents

https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

The article distinguishes a final environmental outcome from what an agent says it achieved. It evaluates the model together with its harness, recommends clean trial environments and repeated trials, and treats regression evaluation as a check that previously supported work still succeeds. Its SWE-bench example checks both the requested repair and preservation of already passing tests. Its discussion of graders supports inspecting whether a passing result really demonstrates the intended outcome.

The cut uses those ideas to contrast a narrowly passing assertion with a broader regression check. It does not reproduce the article’s examples or imply that a harness update necessarily causes regressions.

## SWE-bench grading vocabulary

https://github.com/SWE-bench/SWE-bench/blob/main/swebench/harness/grading.py

The original author’s evidence came from a search summary rather than a line-by-line code review. `FAIL_TO_PASS` names the target failures that must be repaired; `PASS_TO_PASS` names existing passes that must remain passing. The fresh comparison’s source review is recorded separately in `reviews/comparisons/agent-evals/`.

## Library judgement and limits

The original chapter used ticket state; this alternative uses a test suite to teach preservation of unrelated behaviour. The breakage is staged, one trial is shown for each version, and the final beat regrades recorded state rather than rerunning the agent. The guide covers repeated trials and broader evaluation design.
