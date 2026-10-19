# Observability and tracing — editorial review

Author: **gpt-6-astra**, reasoning **high**. Retrieval and review date: **2026-10-19**. Decision: **revise; core**. This is a fresh assessment of `content/original/observability-and-tracing.json`, not reliance on a prior review.

## Relevance and placement

Keep early in the adoption path, after tool design. Delegating a multi-step task removes the engineer's continuous view of shell commands and service calls. A useful first practice is preserving inspectable execution at harness/tool boundaries. The original is accurate in outline but too short to teach that practice: it lacks propagation, instrumentation gaps, evaluation boundaries, an exercise, and a manual-to-agent workflow. A team need not build a large telemetry platform before trying the sandbox exercise.

## Every original assertion

| Original field/assertion | Assessment and action | Evidence |
|---|---|---|
| Summary: runtime signals explain behavior and failures | Keep the aim; qualify as investigation using evidence. Signals are not an automatic or complete explanation. | [Context propagation](https://opentelemetry.io/docs/concepts/context-propagation/), Context and Logs sections; completeness limitation is editorial judgment. |
| Overview: requests consist of related spans across operations/services | Keep, define a span and distinct trace/span identities; add parent relationships and required propagation. | [Traces](https://opentelemetry.io/docs/concepts/signals/traces/), Spans and Span Context. |
| Overview: instrument model calls, tools, orchestration | Keep as a bounded adoption recommendation, not an automatic SDK capability. Current conventions describe model/tool and agent operations. | [Client/tool spans](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md), Spans and Execute tool; [agent spans](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md), Invoke agent internal span. |
| Why: end-to-end duration alone cannot identify the slow dependency/step | Keep the logical distinction between aggregate duration and per-operation evidence. Revise “caused” to “locate the next investigation”; a long enclosing span does not establish root cause. | [Traces](https://opentelemetry.io/docs/concepts/signals/traces/), nested spans and timestamps; causal caution is editorial reasoning. |
| Example: 200 ms retrieval, billing retry dominates | Plausible illustration, no measured evidence supplied. Replace with a coding/test-tool fixture and explicitly mark all durations illustrative. Do not call it a benchmark. | No external measurement. The new numbers are authored arithmetic: 0.6 + 2.4 = 3.0 seconds. |
| Judgment: choose useful identifiers/events; omit sensitive payloads | Keep and make actionable with capture policy, access, retention, and fake-secret check. | [Handling sensitive data](https://opentelemetry.io/docs/security/handling-sensitive-data/), responsibility and data minimization. Specific policy is our recommendation. |
| Next: follow a failed task into downstream service | Keep as an observable exercise outcome; add missing-parent diagnosis and evidence limits. | [Context propagation](https://opentelemetry.io/docs/concepts/context-propagation/); [W3C Trace Context](https://www.w3.org/TR/trace-context/), §§3.2 and 4. |
| Single original source as support for the whole guide | Insufficient for agent conventions, privacy and sampling. Retain it for span fundamentals and add six direct primary references. | See mapping below. |

Identity, title, category, roles and related links remain exactly as supplied. The guide has 783 words of substantive prose (excluding taxonomy, source labels/URLs, and review metadata).

## Claim/source mapping and corrections

1. **Related operations, timing and parent IDs**: [OpenTelemetry Traces](https://opentelemetry.io/docs/concepts/signals/traces/), Spans/Span Context. Supports overview and the timeline abstraction. Nested durations are not disjoint time buckets; the recommendation not to sum overlapping spans follows from that structure.
2. **Propagation across a process boundary**: [Context propagation](https://opentelemetry.io/docs/concepts/context-propagation/), Context/Propagation/Example. Supports walkthrough step 2 and the video mechanism. Code-level transport instrumentation is required; matching a model-generated string is not proof of propagation.
3. **`traceparent` fields and new trace without a received parent**: [W3C Trace Context](https://www.w3.org/TR/trace-context/), §§3.2.2, 4.2–4.3. Supports the illustrative broken/new-run contrast. `traceparent` carries more than a trace ID. Abbreviated video IDs are not valid wire-format examples. Headers are diagnostic context, not credentials.
4. **Model/tool operations and evolving guidance**: [GenAI client spans](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-spans.md), status and Execute tool span. Page explicitly marked **Development**. We do not claim every runtime implements every field, or prescribe a universal attribute schema. Logical operations can include internal retries; this video does not teach retry accounting.
5. **Agent instrumentation boundaries**: [GenAI agent spans](https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md), agent invocation sections. Supports adding agent-level operations; does not establish that traces expose a model's private reasoning or prove task correctness. Tests and authorization remain separate engineering responsibilities.
6. **Sensitive inputs and metadata minimization**: [Handling sensitive data](https://opentelemetry.io/docs/security/handling-sensitive-data/), Data minimization and Protecting sensitive data. Supports the capture restrictions and omission exercise. No claim that redaction is automatically complete.
7. **Absent telemetry and sampling**: [Sampling](https://opentelemetry.io/docs/concepts/sampling/), Terminology and costs of ineffective sampling. Supports absence-of-evidence caution. Retaining all traces in a tiny controlled exercise is our recommendation, not a production sampling default.

## Retrieval record and unavailable evidence

All seven final source pages were opened through web browsing, with relevant page sections inspected on 2026-10-19. The former [GenAI documentation URL](https://opentelemetry.io/docs/specs/semconv/gen-ai/gen-ai-spans/) was opened and showed a relocation notice; it is not used as current technical evidence. Its repository link led to the current sources above. Two initial guessed paths (`docs/gen-ai-spans.md`, `docs/gen-ai-agent-spans.md`) returned 404; the actual files reside under `docs/gen-ai/`. OpenTelemetry's context-propagation and sampling `.md` mirrors were rejected by the browser tool for unsupported Markdown content type; their normal HTML pages were successfully read instead. No unavailable source was counted as verified.

These are live documents, not immutable snapshots. The exercise is proposed, not executed against an actual agent platform. No provider-specific SDK behavior, vendor latency measurement, or production incident was verified or asserted.

## Video teaching boundaries

The Astra cut teaches **preserving a parent relationship across one tool boundary**. It complements the original's slow-dependency example with a different engineering scenario and sequence. No other variant source or baseline media was inspected. It establishes a normal model span, shows the detached tool span, starts an explicitly new run after a propagation repair, then highlights unchanged tool duration. It does not retroactively repair missing historical telemetry. Bars share a time scale; animation pauses are pedagogical, not wall-clock simulation.

The detached record is shown for comparison outside the first trace's grouping bracket. The abstract three-span diagram omits HTTP client/server intermediates, async links, export queues, sampling, and fan-out. Tool time locates a boundary for further investigation; it does not identify whether queueing, network delay, or tests themselves consumed it. Neither trace IDs nor persistent prompts enforce permissions. Final correctness still needs evaluation and tests.

Video verification and remaining limitations are recorded in `video/observability-and-tracing/astra/review.md`. No comparative recommendation is made; independent comparative review belongs to the coordinator.
