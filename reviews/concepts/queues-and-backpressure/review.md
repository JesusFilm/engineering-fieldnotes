# Queues and backpressure: editorial review

Author: **gpt-6-astra**; reasoning: **high**. Retrieval/review date: **2026-10-19**.
Decision: **revise; retain as reference**. The concept supports agent-tool fan-out and batch processing, but broker mechanics should not be a prerequisite to first supervised agent use. The previous short note was sound in direction but did not identify the producer behavior that actually limits backlog. This is a new critique, not reliance on a prior passing review.

## Every original assertion

| Original assertion | Assessment and action | Evidence / limits |
|---|---|---|
| Queues buffer work. | Keep. Explain producer versus consumer and waiting versus executing. | [Python Queue](https://docs.python.org/3/library/asyncio-queue.html), Queue/put/get. |
| Backpressure limits incoming work when consumers cannot keep up. | Revise: capacity feedback must cause the producer to wait or slow. A queue existing is insufficient. Distinguish backpressure from shedding. | [Google SRE](https://sre.google/sre-book/handling-overload/), Client-Side Throttling; Python bounded put. This taxonomy is editorial synthesis. |
| Consumer acknowledgements track processing progress. | Narrow: they indicate handled deliveries, not partial execution telemetry. Publisher confirms do not establish tool success. | [RabbitMQ confirms](https://www.rabbitmq.com/docs/confirms), Basics and Consumer Delivery Acknowledgements. |
| Prefetch limits bound unacknowledged deliveries. | Keep with scope: manual-ack consumers, configured prefetch, commonly per consumer. Not a global backlog or execution-rate bound. | [Consumer prefetch](https://www.rabbitmq.com/docs/consumer-prefetch), Single/Independent Consumers; [confirms](https://www.rabbitmq.com/docs/confirms), Channel Prefetch. Zero is unlimited; pull basic.get is outside prefetch coverage. These details remain in evidence rather than overcrowding the guide. |
| A queue cannot absorb sustained overload indefinitely; admission or shedding must bound backlog. | Keep reasoning, clarify alternatives: waiting upstream, rejecting or discarding. Finite-batch recovery in video is not a stability guarantee. | Conservation argument: arrivals minus departures accumulate. SRE Conclusions describes overload protection and continued useful processing. |
| Unbounded waiting creates long delays and resource exhaustion. | Keep as a risk, not an inevitable fixed-time result. Include waiting producers and payload memory. | [SRE Conclusions](https://sre.google/sre-book/handling-overload/). Hidden waiting tasks are an inference from local task/queue ownership. |
| Image workers acknowledge completed jobs, cap in-flight deliveries, reject when oldest age exceeds delay budget. | Replace example with an agent planner calling a tool. The old image-worker behavior was an illustrative design, not established RabbitMQ behavior; queue age alone cannot promise end-to-end completion. | Ack/prefetch covered above; age threshold is editorial policy. No evidence that a broker automatically implements the original application admission policy. |
| Decide backlog limits, delivery guarantees and exit from retries. | Keep, make concrete: separate queue capacity and active calls, choose overflow and a terminal failure outcome. | [RabbitMQ Queue Length](https://www.rabbitmq.com/docs/maxlength), ready-only accounting and overflow; [confirms](https://www.rabbitmq.com/docs/confirms), requeue loops and failure redelivery. |
| At peak arrivals, how soon does oldest queue age exceed the promised completion time? | Replace question. It mixes waiting-age signals with a completion promise and lacks service-time assumptions. Ask where backlog moves under a slower tool and who stops production. | Engineering judgment. No measured arrival/service-rate data were supplied. |

## Revised claim/source mapping

- **Local mechanism:** [Python queue documentation](https://docs.python.org/3/library/asyncio-queue.html), Queue, get, put, task_done and join. Supports finite waiting capacity, admission waiting, and separate completion accounting. The exercise deliberately uses one producer; it does not promise durable delivery or bounded whole-process memory.
- **Broker boundary:** [Consumer prefetch](https://www.rabbitmq.com/docs/consumer-prefetch) establishes scope. [Acknowledgements/confirms](https://www.rabbitmq.com/docs/confirms) distinguishes acceptance, handled deliveries and redelivery. These support a caution about duplicate-safe effects, not exactly-once execution.
- **Overflow correction:** [Queue Length Limit](https://www.rabbitmq.com/docs/maxlength), Overview, Default Behavior, Queue Overflow Behavior. An explicit queue limit does not necessarily reject new work; ready-message accounting excludes unacknowledged deliveries. Queue-type/version support must be checked before choosing a rejection policy.
- **Capacity decisions:** [Handling Overload](https://sre.google/sre-book/handling-overload/), Pitfalls of Queries per Second, Client-Side Throttling, Conclusions. Supports resource-aware capacity, producer response and overload protection. No benchmark or numeric production limit is inferred.
- **Agent adoption judgments:** planner/worker use case, placement, deadlines, byte budget, instrumentation and human ownership are editorial recommendations, not claimed model features. Prompt text alone is not used as a capacity control.

All five actual source pages opened and read successfully. The RabbitMQ pages identified version 4.3 and Python identified 3.15.0 at retrieval; these live URLs may change. Google SRE is older first-party guidance, not current product specifications. No unavailable evidence is being counted as verified. No live broker integration or provider quota experiment was run.

## Learning design and video boundary

The revised 741-word guide preserves id, title, category, roles and related entries. It adds placement rationale, prerequisites, four observable outcomes, manual/AI/human workflow, four walkthrough steps, three failure modes and a four-step local exercise. It explicitly separates capacity from a deadline or rate guarantee.

The independently authored Astra cut starts with ordinary processing, shows a slow job fill three waiting places, returns a capacity signal to a paused producer, then resumes the same held job when one place opens. It complements the original broker-focused written framing with a local harness mechanism. No other variant scenes were read. After independently authoring the initial cut, encoded baseline frames showed an already similar basic pause/resume mechanism. The final alternative therefore follows documentation-check job F beyond admission, through waiting, running and completion; no comparative quality winner is claimed. FULL and SPACE are visual metaphors for local queue admission, not RabbitMQ protocol frames. Rendered travel delays are illustrative. Draining all six jobs is a successful finite scenario, not a durability, permission, latency or eventual-success guarantee. Queue compression into fixed display cells is not a broker storage implementation.

The media review and file-hash-bound checks are in `video/queues-and-backpressure/astra/`. Promotion to a recommended cut remains a separate human/comparative editorial decision. Shared manifest/build/UI and Git were outside this task's write scope.

## Practical verification

Ran the local `exercise.py` stub demonstration on 2026-10-19. `exercise-result.json` records maximum waiting depth 3, maximum executing count 1, all six outcomes, and F admitted only after C was removed. This verifies the teaching harness, not a production service. Screenshots of an isolated build at 350 px and 1280 px show the guide, exercise and comparison without horizontal overflow; the shared build/UI files were not edited.
