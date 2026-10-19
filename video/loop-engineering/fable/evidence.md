# Evidence for the progress-check cut

Primary documents opened during comparative review on 2026-10-19. Original author: anthropic/claude-fable-5-1. Editorial corrections: gpt-6-astra comparative review. Long excerpts have been replaced with paraphrases.

| Primary source | Supported claim | Use and boundary |
|---|---|---|
| [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents), Agents and Coding agents sections | Agents use environment and tool feedback, can stop at configured limits, and can involve people at checkpoints. Tests support iteration; broader requirements still need human review. | Results enter the log; a passing patch goes to Review; a stopped run sends its evidence to Human. The source does not prescribe three repeats, failure counts as a complete progress measure, or a guarantee of convergence. |
| [pytest: Flaky tests](https://docs.pytest.org/en/stable/explanation/flaky.html), System state | Uncontrolled state can cause inconsistent test outcomes. | Repeating until green is not evidence of a repair. Counts are only an illustration under a fixed suite; compare failure identities and assertion details. |

## Library policy and illustrative data

The revised second run shows the same normalized failure report, represented by `a7`, three times. Its three failures are retained in each log row. A local **repeat limit** triggers handoff; equal counts alone do not establish no progress. `a7` is a teaching identifier, not a recommended two-character production hash. Real implementations must compare meaningful evidence under the same selection and avoid treating irrelevant log noise as new progress.

The threshold, 12-test suite, counts, timings and handoff target are illustration choices. They have not been benchmarked. The run-log decision represents harness policy outside the model. Enforcement, permissions, overall budgets, timeout cancellation and adequate test coverage remain responsibilities of the actual harness and engineer. The animation does not demonstrate a working agent implementation.
