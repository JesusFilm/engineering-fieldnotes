# One retry owner — GPT-6.1 Sol, high reasoning

Learning objective: when delegating a read to an agent, place the retry policy in one harness/tool layer, count total downstream attempts, and stop within one overall deadline rather than letting the agent restart an exhausted retry loop.

Independent example: code-index reads; authored from `content/original/timeouts-and-retries.json` and the primary sources below. No other variant scene, partial scene, or review was read. This complements the original chapter's checkout/idempotency example by concentrating on retry multiplication across an agent boundary. No comparative quality ranking is claimed.

| Time | What moves | State changes | Sound |
|---|---|---|---|
| 0.00–5.30 | READ flows agent → tool → index; RESULT returns | One call token turns green; both callers complete | Agent send C6; tool send E6; arrivals E5/G5; hit G5; completion chime C6 |
| 5.30–16.00 | Two agent invocations each trigger three index reads | Index becomes unresponsive; six tokens turn red; 2 × 3 = 6 | Crash A5 at 5.30; per-call sends/arrivals; timeout thumps E4; low miss at 14.15 |
| 16.00–19.10 | Retry ownership shifts to the tool; agent sends once | Agent limit becomes one invocation; tool has three total attempts; six tokens become three; six-second budget appears | Store E5 at 16.00; clock at 17.50; agent send C6 at 18.40 |
| 19.10–25.10 | Three reads, with 1.3 s and 1.8 s waits between attempts | Budget drains linearly across calls AND waits; timeout marks appear; tokens count actual calls | E6 sends, G5 arrivals; E4 timeout thumps; clock ticks at backoff starts |
| 25.10–32.00 | One failure returns to agent; no fourth read | Budget reaches zero; tool stops; agent hands off; final resolved state holds then fades | Deadline thump E4; failure send C6; deliver C5 at 26.35; poof at 29.60 |

Layout: caller (490,610), tool (490,935), index (490,1250); vertical wires connect bottom and top anchors. Policy limits sit beside their owner at x=870. Call ledger is a 3×2 grid at x=360/540/720, y=1520/1600; only the first row remains under the bounded policy. Deadline bar is at (490,1440).

## Technical interpretation and evidence

Retrieved 19 October 2026; linked paraphrases, no long quotations.

- [AWS Builders' Library: timeouts, retries, backoff and jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/) supports bounding waits, counting multiplied attempts across layers, selecting one retry point, and considering operation safety. A timeout does not prove remote work stopped.
- [Google Cloud Storage retry strategy, especially retry anti-patterns](https://docs.cloud.google.com/storage/docs/retry-strategy#retry_anti-patterns) supports avoiding unnecessary layered retries, bounded retry duration, and backoff with jitter for eligible failures.

Editorial application: code search is an illustrative read-only operation. Policy numbers are **total attempts including the initial call**, not extra retries. The initial successful read, stacked failure, and bounded failure are separate demonstrations; their counts reset. Limits must be implemented by orchestration/tool code with underlying SDK retries accounted for. Persistent prompts alone cannot enforce retry budgets or permissions.

The controlled policy allows at most three service calls and six seconds from the first downstream send. Each of the first two calls has a one-second client timeout; backoff begins when that timeout fires. The final call at 24.20 is cut off after 0.90 s by the earlier overall deadline at 25.10. A real implementation must also define whether its deadline includes tool setup/queue time. Agent waiting includes this tool budget; the animation does not specify an independent shorter outer timeout.

The two delays represent one fixed illustrative sample from jittered backoff windows; they do not demonstrate randomness or many-client de-synchronization. Timing is for teaching, not a latency benchmark or universal production configuration. Client stopping bounds further sends in this example; it does not cancel already running remote work or establish safe semantics for writes. There is no recovery guarantee.

Exercise: inspect the agent loop, tool wrapper and SDK configuration for one team read tool. With the service deliberately unresponsive, verify the observed total downstream sends never exceed the configured cap and stop within the task's time budget; verify the agent reports exhaustion without restarting that tool action.
