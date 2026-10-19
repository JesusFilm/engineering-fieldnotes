# Loop engineering — source and relevance review

Author: **gpt-6-astra**. Reasoning: **high**. Retrieval and review date: **2026-10-19**.
Decision: **revise; core placement proposed**. Human editorial promotion remains with the coordinator. This is factual/editorial review, not a comparative video score.

The original is a useful outline but not a standalone lesson. It describes repetition without showing how to distinguish progress, invalid feedback, and completion. A team newly delegating code edits needs an executable continuation contract, not just a maximum number of turns. The revision turns an ordinary manual test/edit judgment into an agent harness decision, with a small exercise and evidence a teammate can inspect.

## Every original assertion

| Original field / assertion | Judgment and correction | Evidence or basis |
|---|---|---|
| Summary: loop engineering defines actions, feedback, and continuation | Keep the mechanism; revise terminology. “Loop engineering” is the book's working label, not a claimed standardized discipline. Add explicit outcomes: continue, review, or hand off. | [Anthropic, Agents section](https://www.anthropic.com/engineering/building-effective-agents). |
| Overview: repeated model-and-tool cycle, observed results and stopping rule | Keep, but observations must concern the current patch and intended test selection. Prompts do not enforce boundaries: the harness needs executable checks. | Environment feedback is supported by Anthropic; patch binding and executable policy are this guide's engineering recommendations. |
| Why: unchecked repetition consumes resources without progress | Keep with limits. No quantified savings or convergence claim is supported. Separate model repair iterations from transport retries. | [Amazon, retries and backoff](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/) explains retry amplification and bounds; applying this distinction to agent tooling is an editorial inference. |
| Example: edit code, run failing test, stop after three unsuccessful attempts | Revise substantially. Three is illustrative, not optimal. The original conflates assertion failure with unsuccessful execution. A repair may need to stop before any edit because validation is missing. | [pytest exit codes](https://docs.pytest.org/en/stable/reference/exit-codes.html): 1 versus 5. Anthropic supports caps but no specific count. |
| Judgment: measurable progress, iteration limits, escalation | Keep and make observable: current patch, intended selection, outcome, stop reason; add per-command and overall time bounds. Fewer failures alone is insufficient if tests disappeared. | [pytest invocation](https://docs.pytest.org/en/stable/how-to/usage.html) supports selection/collection inspection; policy and teaching budgets are locally proposed. |
| Next: which repeated tool failures should immediately end a run? | Revise. “Repeated” and “immediately” hide the need to classify the first observation. Ask what permits continuation and what evidence belongs in a blocker handoff. | Derived teaching question, not an externally proven rule. |
| Single source and related chapters | Keep the original primary engineering source and three related IDs; add runner-specific docs and retry evidence. Read sources afresh rather than inheriting any prior verification. | Actual pages retrieved below. |

## Accuracy and relevance corrections

- The proposed repair-only policy routes usable failing assertions to another allowed patch, selected-test success to review, and missing validation to a blocker handoff. A different explicitly scoped diagnostic agent could repair test tooling; pytest does not require human escalation.
- Exit 0 is not proof that the intended checks ran or that requirements are met. The guide requires the report, selected/executed counts, and review of the patch. Skips and selection changes must not erase coverage unnoticed.
- Do not assume all pytest nonzero codes mean assertions failed. The current documentation also lists interruption, internal error, usage error, and a warning-limit exit; the chapter deliberately does not hardcode an exhaustive cross-version enum.
- No claim that successive model answers improve monotonically, that three patches suffice, or that a passing test suite proves overall correctness.
- A tool timeout and an agent's iteration limit address different failure modes. If a publishing call times out, it may already have acted; retry safety needs an explicit tool contract.
- Core adoption relevance: this is a decision every engineer makes during delegation, even without building an agent framework. Teams can practise the same contract in existing agent tooling, while checking whether the tool actually enforces its configured limits. Harness engineering is the prerequisite; retry mechanics and human review remain supporting chapters.

## Claims / source mapping

All links below were opened as actual source pages on 2026-10-19. No marketing claims or untested product features were used.

| Source | Verified support | Used in |
|---|---|---|
| [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents), Agents and Coding agents sections | Tool/environment feedback, stopping conditions, and continuing need for human review. The page itself cautions that tooling has changed since its initial publication. | Definition, why, bounded iteration and review boundary. No capability benchmarks imported. |
| [pytest exit codes](https://docs.pytest.org/en/stable/reference/exit-codes.html) | 0: collected tests pass; 1: some tests fail; 5: no tests collected. Documentation notes customization is possible. | Walkthrough and video task A/task B result chips. Assumes ordinary documented pytest behaviour. |
| [How to invoke pytest](https://docs.pytest.org/en/stable/how-to/usage.html), selection and collection sections | `-k` keyword selection; `--collect-only -q` can produce collected test identifiers. | Mistyped selector example and collection preflight exercise. |
| [Flaky tests](https://docs.pytest.org/en/stable/explanation/flaky.html), system state | Uncontrolled state and order/dependency issues can cause flaky outcomes. | Warning against treating rerun-until-green as a repair. |
| [Timeouts, retries, and backoff with jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/) | Retry load, retry caps, timeouts, and ambiguity of side effects after failure. | Why to bound calls; publishing-tool retry pitfall. The original AWS URL redirected to the AWS Builder Center article by an AWS employee; the technical article was readable. |

Exploratory reads of OpenAI function-calling docs and GitHub CodeQL exit codes were available but are not used as evidence: they were less direct than pytest for this lesson. No cited source was unavailable. No attempt was made to validate a specific deployed agent product's enforcement, measure team productivity, or run an actual model repair benchmark.

## Video teaching boundaries

The independently conceived Astra cut, **Evidence first**, illustrates classification before continuation. It shows one successful assertion-failure repair followed by a separate no-tests task that hands off without product edits. This complements the original text's iteration-cap example. No baseline media or other variant source was read; a comparative recommendation is therefore not claimed.

The result gate represents application control logic, not a persistent prompt. Times, counts, pitches, and task outcomes are illustrative. “PASS → REVIEW” means review of the selected-test result, not merge approval. The blocked task's ending is a useful handoff, not a repaired discovery configuration. Budgets, flaky-test diagnosis, timeout cancellation, and comprehensive review are outside the 28-second cut and belong in the guide.

The video has five accessible timestamped descriptions in `video/loop-engineering/astra/variant.json`. Encoded-media findings and honest audio limitations are in the variant's separate `review.md` and `verification.json`.
