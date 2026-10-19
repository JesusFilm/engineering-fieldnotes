# Tool design — fresh concept review

Author: **gpt-6-astra**, high reasoning. Retrieval and review date: **2026-10-19**.
Decision: **revise; core**. The original topic earns early placement, but its short advice did not provide enough mechanics or evidence for a team to change its working practice. This is a fresh review against the original JSON, not reliance on a previous score.

## Relevance and editorial decision

An experienced team can transfer API-contract skills into agent tooling immediately. The material now starts from a familiar incident-search task and makes the loss of human dashboard context explicit. It teaches a small interface and an observable failure-injection exercise before operational autonomy. No prerequisite chapter is required; ordinary API and testing familiarity is assumed. Related chapters remain context engineering, guardrails and permissions, and agent evaluations. Timeouts/retries are supporting systems knowledge because the agent caller has the same backend failure and load constraints as other callers.

## Every original assertion

| Original field and assertion | Decision and correction | Evidence |
| --- | --- | --- |
| Summary: clear, bounded, easy actions | Keep intent; revise the implied sufficiency. A clear description is helpful, not enforcement. Put bounds, access checks and call budgets in executable code. | S1: Principles; S2: Security considerations |
| Overview: purpose, inputs, outputs, failure behaviour | Keep; explain the model requests and the application executes. Add an explicit successful-empty versus error contract. | S2: Tool, Tool result, Error handling |
| Overview: descriptions and response shape affect selection and context consumed | Keep as empirical design guidance; not a universal performance law. Require task evaluation. | S1: Namespacing, meaningful context, token efficiency |
| Why: ambiguity causes incorrect actions even when the model understands | Revise. Understanding is not independently demonstrated by a bad outcome. Show the observable failure: a timeout becomes an empty result and an unsupported conclusion. | S1: observed tool-use mistakes; incident scenario is our example |
| Example: search_incidents(service, start_time, limit), IDs and short summaries rather than every log | Retain the task, expand the contract: explicit end time and interval semantics, bounded counts, continuation and coverage. Keep useful IDs, without asserting summaries alone are sufficient. | S1: targeted tools and useful results; exact signature and fields are editorial proposals |
| Judgment: granularity and distinguishing empty from failed | Keep and operationalize. Avoid bundling read/decision/write into an opaque action. Distinguish MCP execution errors from protocol errors. | S2: Error handling; granularity boundary is editorial judgment informed by S1 |
| Next: recurring selection errors on realistic incident tasks | Expand beyond selection to result interpretation, evidence, partial coverage and attempt budgets. An observed successful run does not guarantee future success. | S1: evaluation tasks, observable outcomes and tool metrics |
| Single Anthropic source | Retain its engineering observations, not its product-performance promotion. Add normative protocol and schema references and production retry guidance. | S1–S4 below |

## Sources actually opened and claim mapping

All URLs below were opened as actual source pages through the web tool on **2026-10-19**. No unavailable page was used as evidence.

- **S1** — [Anthropic engineering: Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents), published September 11, 2025. Sections on choosing tools, meaningful context, descriptions and evaluation support task-oriented tools and empirical checks. This is a vendor's first-party engineering report, not independent proof that a naming convention works for every model. No benchmark gain is claimed.
- **S2** — [MCP tools specification, revision 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/server/tools). Tool metadata, structured results/output schemas, error handling and security considerations support the guide's protocol statements. Execution failures use `isError`; application fields such as `status`, `items`, `code` and `cursor` are our design, not prescribed protocol fields. Schema conformance does not establish semantic truth. Access checks belong on the server; descriptions and annotations are not enforcement.
- **S3** — [JSON Schema object reference](https://json-schema.org/understanding-json-schema/reference/object). `properties`, `required` and `additionalProperties` support the explicit input-validation correction. Cross-field interval validation and authorization are application responsibilities; no automatic schema authorization is implied.
- **S4** — [AWS Builders’ Library: Timeouts, retries, and backoff with jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/). Sections on retries/backoff support load-sensitive limits and the distinction between read retries and side-effect safety. One delayed retry is an illustrative exercise policy, not a universal production setting.

## New claims and boundaries

The payments scenario, UTC half-open interval, result contract, core placement, exercise fixtures and passing criteria are original editorial recommendations. They are deliberately testable, not findings from a deployed incident agent. Prompt-injection exposure from retrieved incident text is framed as a concrete failure mode to test, not as a claim that a particular product is vulnerable. No performance or security guarantee is attached to schema validation, persistent prompts, the word “read-only,” or a successful retry.

## Video teaching boundary

“Empty ≠ failed” follows a completed empty lookup, an adapter swallowing a timeout, explicit error propagation, one budgeted retry, and returned incident evidence. It complements broad tool-granularity guidance by isolating result semantics. Neither the baseline scene nor any alternative scene was read or imitated; no comparative quality ranking is claimed. No baseline media was needed. The visible retry bar stands for application policy; the runtime enforcement node is intentionally omitted to retain three main actors. The backend recovery and incident are scripted. Production systems may remain unavailable; an exhausted budget must remain unresolved. Finding a record does not establish root cause.

## Verification and limitations

Preserved `id`, `title`, `category`, `roles`, `related`. The guide includes a core placement rationale, outcomes, manual-to-agent workflow, five-step walkthrough, four pitfalls and a practical four-step exercise. The exercise is proposed, not run against a live agent. This review verifies the source support and editorial contract; it does not certify production security or agent behaviour. See the variant's separate media review for actual encoded-file checks. Promotion and comparative recommendation remain the coordinator's editorial responsibility.
