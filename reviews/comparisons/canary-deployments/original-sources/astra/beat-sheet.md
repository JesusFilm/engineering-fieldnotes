# Split the signal

Authored by **gpt-6-astra**, reasoning **high**, 2026-10-19.

Learning objective: Given a small rollout of agent-written code, separate error measurements by version and changed operation before deciding whether to expand exposure. A low pooled error rate is not permission to promote.

Independent design: written from the original chapter and primary sources; no other variant scene was opened. No baseline media was needed. This cut adds a rare-operation denominator trap and an explicit blocked promotion, rather than assuming a generic healthy rollout. Comparative preference remains unassessed.

## Five beats

| Time | What moves | State change | Sound |
| --- | --- | --- | --- |
| 0.00–5.50 | Stage reveals; three envelopes travel to v1 | Stable receives 100%; prior window is 0/10,000 | Reveal recover C4; sends C6; stable confirmation chime C5 |
| 5.50–13.00 | v2 appears; share bar shifts; two complete nine-to-one routing cycles | 90% stable / 10% canary; old data clears to collecting | Store E5 at 5.50; work E4 at 6.00; sparse C6 sends and distinct E6/E5 candidate sends/arrivals |
| 13.00–16.40 | Result arrives; a question-like amber ripple draws attention | Pooled result is 0.4% (40/10,000); promotion remains pending | Clock E5 at 13.00 and 14.50 |
| 16.40–22.60 | Pooled card dissolves; two operation cards reveal; failure signal travels to gate | Same window: exports 0/900 on v1 versus 40/100 on v2; promotion blocked | Work C4 at 16.40, scope-change send C5 at 16.80, arrive C5 at 17.00, crash E3 at 17.70, thump at 18.10, send at 20.00, blocking thump at 20.45 |
| 22.60–30.00 | Share bar returns to v1; candidate dims; three stable envelopes; closing fade | Candidate exposure becomes zero; historical failure stays red; final state held before fade | Recover C4 at 22.60, chime C5 at 23.10, C6 sends, C5 arrival at 25.65; poof at 28.60 |

## Stage and numerical contract

1080×1920, 30 fps, 30 seconds. Main actors: traffic router (540,620), stable (290,1040), candidate (790,1040), aggregate metric (540,1390), two replacement metrics (290/790,1390), promotion gate (540,1665). Metric cards replace each other; they do not compete for the same space. Labels are 36–86 px, principal values 74 px. Routing lanes run outside the percentage labels.

One illustrative observation window contains 10,000 requests: 9,000 stable and 1,000 candidate. Exports are 10% in each population: 900 and 100. Forty candidate exports fail; all remaining requests succeed. Hence 40/10,000=0.4% pooled and 40/100=40% candidate exports. Envelopes illustrate routing weights, not the 10,000 measured samples. Their two complete 9:1 cycles reinforce the share bar.

The pre-release zero-error card belongs to a prior window and is cleared before collection. The post-abort red card belongs to the failed window, not fresh traffic. Source page: [Google SRE, monitoring breakdowns](https://sre.google/workbook/canarying-releases/#requirements_on_monitoring_data). Controller-action example: [Argo analysis](https://argo-rollouts.readthedocs.io/en/stable/features/analysis/).

## Teaching boundary

No universal traffic percentage, sample size, threshold, observation duration, statistical confidence, or rollback guarantee is claimed. Video seconds compress a longer observation period. A router is assumed to support the intended split. The change was authored with an agent; the agent is not shown granting itself deployment rights. Source comparisons do not prove causation when environments differ. Schema compatibility, delayed effects, shared dependencies, and external side effects require the guide and system-specific review.
