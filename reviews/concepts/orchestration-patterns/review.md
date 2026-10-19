# Orchestration patterns — editorial review

Author: gpt-6-astra; reasoning: high. Retrieved and reviewed 2026-10-19.
Decision: **revise; core**. Identity, title, category, roles and related links are preserved. The original was accurate as a brief index entry but insufficient as an independent lesson for engineers learning delegation. The revised guide is 760 words excluding navigation/source metadata.

## Evidence actually retrieved

- [Anthropic, Building effective agents](https://www.anthropic.com/engineering/building-effective-agents): read the actual engineering article, including pattern definitions, tradeoffs, stopping conditions, and human review. Its publication date is 2024-12-19, and the current page explicitly warns that tooling has changed. Used only for enduring pattern definitions and design reasoning, not current product capabilities or performance claims.
- [GitHub, Using jobs in a workflow](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-jobs): read prerequisite-job semantics, failure/skip propagation, and the `always()` exception. Supports the concrete scheduling analogy, not an assertion that GitHub validates model reports.
- [GitHub, Authenticate with GITHUB_TOKEN](https://docs.github.com/en/actions/tutorials/authenticate-with-github_token): read minimum-access guidance and workflow/job-level `permissions`. The requested older security-guide URL redirected to this canonical page. Supports configured permissions rather than prompt-based enforcement; does not establish a complete sandbox.

All three pages were accessible. No unavailable source was treated as verified. No vendor product marketing, search snippets, private benchmark, or untested feature is offered as evidence.

## Audit of every original assertion

| Original field / assertion | Decision and evidence |
|---|---|
| Summary: orchestration assigns work and coordinates results | Keep the definition; expand it with dependencies and acceptance. Anthropic's workflow sections describe explicit coordination. |
| Overview: fixed workflows prescribe paths; agents choose dynamically | Keep with attribution to Anthropic's terminology. It is a useful distinction, not a universal naming standard. |
| Overview: routing, parallel workers, evaluator loops suit different tasks | Keep but make the selection criteria explicit: routing chooses a specialist, independence permits overlap, evaluation needs criteria. Add chains for dependent work and distinguish dynamic decomposition. Anthropic pattern sections support these definitions. |
| Why: extra coordination adds cost and failure paths | Revise the absolute tone. It adds coordination work and failure cases; total cost and latency depend on workload. Anthropic discusses tradeoffs; timeouts and incompatible reports here are engineering failure analysis, not measured frequencies. |
| Example: API and DB reviews run concurrently then reconcile | Revise substantially. This is our illustrative scenario, not a documented product guarantee. Freeze inputs, make workers read-only, preserve findings, and join only matching reports. API and database implementation may be dependent even when these review analyses can overlap. |
| Judgment: decide if independence justifies parallel execution | Keep and strengthen. Independence is necessary for this split but not sufficient: shared state, outputs, validation, and total engineering effort also matter. These are the chapter's implementation recommendations. |
| Next: measure delegation against one agent | Keep and operationalize with identical inputs, quality, elapsed time, model use, and reconciliation effort. Anthropic recommends measurement before added complexity; no invented improvement is claimed. |
| Sources: one general article | Expand with two operational primary documents and disclose the original article's age/tooling warning. Do not treat broad vendor experience as evidence that this team's workflow is faster or safer. |

## Additional claim/source mapping

- Predefined versus dynamic control; chain/routing/parallel/evaluator/orchestrator definitions: Anthropic sections “What are agents?” and named workflow sections.
- Model/tool results and stopping conditions: Anthropic “Agents.” Our deadline, schema, and conservative rerun policy are local recommendations.
- `needs` waits for successful prerequisites; failed or skipped prerequisites ordinarily skip dependent jobs; conditionals can override this: GitHub “Defining prerequisite jobs.” The guide deliberately does not claim an unbypassable safety gate.
- Token permission scopes are configured at workflow/job level: GitHub authentication guide, “Modifying the permissions.” The general warning that prompts do not enforce permissions follows from separating instructions from the actual authorization mechanism; no prompt injection immunity is claimed.
- Shared-snapshot identifiers, retaining conflicts, invalidating both reports after edits, and the review exercise: independently authored engineering design, not vendor promises. Tests and model judgments remain distinct.

## Relevance and retained human responsibility

Core because handoffs appear as soon as a team combines two model/tool tasks. The chapter starts with familiar PR review, teaches a small deterministic coordinator, and requires an engineer to choose criteria, inspect evidence and approve. It is not an endorsement of a multi-agent framework. Prerequisites are tool-design and agent-evals. The exercise makes missing evidence and stale results observable failures instead of asking readers to memorize pattern names.

## Video teaching boundaries

The independent Astra cut teaches one fixed fan-out/join: a normal two-report handoff, a failed DB report that blocks the approval-ready handoff, and a new snapshot that clears both old results before rechecking. It does not attempt a survey of all patterns. No other variant's scene or sequence was read; no baseline media was needed to author this sequence. Comparative superiority or recommendation is not claimed.

PASS means the illustrative reviewer reports no blocking finding; it does not establish correctness. A human approval is shown as a separate state after review, without simulating actual review duration. Red failure is a finding, not a server crash. The repair is supplied externally by the engineer between B and C; the animation does not depict an autonomous repair. Read-only enforcement, deadlines, evidence reconciliation, and cost evaluation belong to the guide and exercise rather than this 30-second visual. Timing is illustrative, with no speedup promise.

## Limitations

Self-review by the author; no independent comparative review or human promotion to the recommended cut. No workload evaluation was executed. Sources support mechanisms and semantics, not the efficacy of this particular exercise. The video audio is assessed through signal analysis and event timing; physical listening is not claimed.

Final semantic correction: the downstream actor is labelled Approver. Failure stops the approval-ready bundle, while failing evidence stays available to engineers for investigation and repair; the join is not a rule to conceal incomplete work.
