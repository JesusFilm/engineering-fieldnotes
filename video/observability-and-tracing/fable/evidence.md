# Evidence — observability-and-tracing, fable cut

Retrieved 19 October 2026. The library's judgement is marked as such; everything else is what the source states.

## Context propagation (the mechanism shown)

- OpenTelemetry, *Context propagation* — https://opentelemetry.io/docs/concepts/context-propagation/ . Propagation is "the mechanism that moves context between services and processes"; with it, spans created in different processes share a trace id and form one trace. Without it, a downstream service cannot identify the upstream trace and its spans start a new trace. The doc notes that work crossing threads, queues, async boundaries or custom transports may need manual propagation when automatic instrumentation cannot do it. This is the agent-tool trap the video shows: the tool's own HTTP call must carry the header.
- OpenTelemetry specification, *Propagators API* — https://opentelemetry.io/docs/specs/otel/context/api-propagators/ . Text-map propagators `inject` context into a carrier (HTTP headers) on the sending side and `extract` it on the receiving side; the W3C TraceContext propagator is the required default.
- W3C, *Trace Context* — https://www.w3.org/TR/trace-context/ . The `traceparent` header is `version-trace-id-parent-id-trace-flags`, e.g. `00-<32 hex>-<16 hex>-01`; a receiver that finds no valid header starts a new trace with a new trace id. The chips on screen abbreviate the trace id to four hex characters (`7e2d`) for legibility; a real id is 32 hex characters.

## Agent span names (the labels in the Agent trace panel)

- OpenTelemetry GenAI semantic conventions, *Semantic conventions for GenAI agent and framework spans* — https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/gen-ai-agent-spans.md (and `model/gen-ai/spans.yaml`). Recommended span names are `invoke_agent {gen_ai.agent.name}` and `execute_tool {gen_ai.tool.name}`, with tool-execution spans as children of the agent invocation span. The conventions are marked Development (not stable), so names may change; the video uses the shorter `invoke_agent · task 7` / `execute_tool · charge` form.

## Baseline relationship

- `content/original/observability-and-tracing.json` gives the example of a billing retry consuming most of a support agent's response time and asks "Can we follow one failed task through its tool call into the downstream service?" The baseline cut (inspected via its encoded contact sheet only) answers the first with a span waterfall; this cut answers the second with context propagation. It does not reuse the baseline's sequence.

## Library judgement

- Showing the Billing API's span list with other callers' entries (`a7e3`) is the library's choice to make the "which 500 is ours?" problem concrete; a real backend would have far more rows and the search would be by trace id in a tracing UI.
- The 500 is illustrative. Nothing in the video claims that propagation prevents failures, changes retry behaviour, or that a header alone makes a trace complete; sampling, exporters and clock skew are out of scope.

