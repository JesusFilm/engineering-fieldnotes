# Timeouts and retries — editorial review

Author: **gpt-6-astra**, high reasoning. Retrieval and review date: **2026-10-19**.
Decision: **revise; core**. Original identity, category, roles, and related links preserved.

The original is accurate as a compact systems reminder, but too thin to teach an engineering team adopting agents. Checkout is a plausible example, yet it does not identify where an agent's repeated request is stopped or what the model should report when a tool supplies no evidence. The replacement is a standalone 738-word learning guide with a CI read, explicit responsibility split, and a small fault-injection exercise. Placement is editorial judgement: remote tools make this an early adoption concern, even when the underlying systems theory is familiar.

## Audit of every original assertion

| Original field / assertion | Decision and correction | Supporting primary page |
|---|---|---|
| summary: timeouts bound waiting | Keep, distinguish one attempt from the whole operation. | [gRPC deadlines](https://grpc.io/docs/guides/deadlines/) |
| summary: retries recover some transient failures | Keep the qualification; recovery is not promised. | [gRPC retry overview and policy](https://grpc.io/docs/guides/retry/) |
| overview: a timeout may follow a remote state change | Keep; make unknown outcome and server cancellation separate. | [Stripe engineering: planning for failure](https://stripe.com/blog/idempotency), [gRPC server responsibilities](https://grpc.io/docs/guides/deadlines/) |
| overview: safe semantics, bounded attempts | Keep; a read is the teaching example. Writes need a documented contract. | [RFC 9110 §9.2.2](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2), [gRPC retry configuration](https://grpc.io/docs/guides/retry/) |
| overview: backoff and jitter avoid synchronized load | Revise “avoid” to mitigation: spreading retries does not guarantee recovery. | [AWS jitter simulation](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/) |
| why: aggressive retries amplify outages | Keep; translate into a retry-layer audit. | [AWS Builders’ Library, retries and backoff](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/) |
| example: checkout retries with the same key | Valid only under the endpoint's contract. Replace as main example; retain a scoped Stripe API v1 caveat. | [Stripe idempotent requests](https://docs.stripe.com/api/idempotent_requests) |
| example: randomized delay and overall deadline | Keep, make one worked budget explicit. | [AWS jitter](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/), [gRPC deadlines](https://grpc.io/docs/guides/deadlines/) |
| judgment: retryable failures, latency budgets, owner | Keep and operationalize through logs and a runtime owner. | [AWS Builders’ Library](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/), [gRPC retry](https://grpc.io/docs/guides/retry/) |
| next: count downstream attempts across layers | Keep the investigation in judgment; next now challenges model re-entry and budget reset. | [AWS Builders’ Library](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/) |

## New claim / evidence mapping

- `overview`, walkthrough 2: the gRPC deadline page explains duration versus deadline, elapsed-time deduction, and application-owned cancellation cleanup. The monotonic clock recommendation and runtime boundary are implementation judgement.
- `judgment`: gRPC's retry page explicitly documents transparent retries without a configured policy. The text avoids claiming that disabling application retries necessarily eliminates all network attempts.
- Walkthrough 1 and pitfalls: RFC 9110 §9.2.2 distinguishes repeatable intended effects from identical responses; §15.5.4 addresses unchanged credentials. No blanket “all 4xx never retry” or “all 5xx retry” rule was adopted.
- Walkthrough 4: the retrieved Stripe page now distinguishes API v1 from v2. The guide deliberately scopes saved-error replay, parameter matching, and key-pruning limitations to **v1**. A key does not impose permanent exactly-once execution on arbitrary tools.
- Walkthrough 3: AWS's jitter article reports a contention simulation, not an agent benchmark. No latency or capacity improvement percentage is transferred to this team.
- `example`, workflow, exercise: an original hypothetical design, not documentation of a released agent feature. Twelve seconds, five seconds, and two attempts are illustrative. A “status_unknown” value is the proposed application contract.

## Retrieval record and limitations

All six guide source pages were opened and relevant page content inspected through the web tool on 2026-10-19. The AWS Builders’ Library URL resolved to its AWS Builder Center article; the original official URL remains a valid source entry. Stripe's engineering article was also read for historical context. No required evidence was unavailable. GitHub issue and OpenAI Python README pages were explored but not used for guide claims. No marketing text is evidence for agent capability.

Source-backed material is paraphrased; the design and exercise are editorial synthesis. The exercise was not executed against a production or mock CI service. Model identity is provenance, not a comparative quality score.

## Video teaching boundary

The independently authored Astra cut teaches **a retry consumes the existing tool budget; exhaustion closes the runtime gate and leaves the status unknown**. It uses a read-only CI example and ends in a controlled stop, not recovery. It does not animate idempotent writes, fleet-wide jitter, exponential growth, distributed deadline propagation, or prove that remote work has stopped. The repeated request at 22 seconds is illustrative; real software must preserve logical operation identity. Persistent prompts do not enforce this policy or permissions. The gate denotes executable runtime logic.

No other variant scene or baseline sequence was inspected. Complementarity is the designed difference from the original checkout-oriented guide; a comparative verdict awaits the coordinator's independent encoded-media review. The video has a separate timestamped production review and accessible transcript.
