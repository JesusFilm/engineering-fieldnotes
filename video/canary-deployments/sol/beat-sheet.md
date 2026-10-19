# Canary the outcome

Learning objective: when changing an agent prompt, keep a concurrent control, inspect the resulting work by version, and withdraw the candidate when a configured task-level failure gate trips even though requests return HTTP 200.

Independent Sol example: a team rolls out a new prompt for drafting pull requests. Sessions use one prompt version throughout. This deliberately shifts the lesson from generic API health to the difference between transport success and useful agent work. Neither other variant's scene nor any partial provider attempt was read. The original concept JSON supplied the scope; no comparative recommendation is claimed.

| Playback | What moves | State change | Sound |
|---|---|---|---|
| 0–5 s | One draft session travels through the router to v1 | HTTP success and required PR tests pass separately | Reveal `recover` C4; session `send` C6 / `arrive` C5; `ack` C6; `chime` C5 |
| 5–11 s | Three complete patterns of nine control dots and one candidate envelope | v2 appears; routing becomes 90% / 10% | `store` E5; quiet control C6/C5; distinct candidate E6/E5 |
| 11–16.6 s | PR artifacts bypass API status text through the centre gutter at 12.00–12.90 s and 13.20–14.10 s to reach each version's tests | Both API responses remain green; candidate PR tests fail | `ack` C6/E6; `chime` C5; failure `crash` A4 at 14.1 s |
| 16.6–20.5 s | Failure reaches the gate; a red signal returns to the router | Gate stops rollout; candidate share becomes 0%, control 100% | `send` E4/E5; `thump` E3; `recover` C4 at 19 s |
| 20.5–28 s | Three new sessions go to v1; the failed artifact stays visible | Control tests pass; candidate is withdrawn; fade closes loop | C6/C5 sessions; `chime` C5 at 23.1 s; `poof` C4 at 26 s |

A blank opening frame and closing background hold provide an exact decoded loop boundary. The resolved state is held 23.1–26 s. The 90/10 traffic interval contains 30 stylized sessions; it is not a statistically sufficient sample or a prescribed observation window.

## Evidence, retrieved 19 October 2026

- [Google SRE Workbook: Canarying Releases](https://sre.google/workbook/canarying-releases/). Limited exposure must be evaluated against a concurrent control with attributable, representative signals. Long-running work and shared dependencies complicate comparison. The video's split routes and separated results apply these principles to PR drafting. Small exposure limits risk; it does not guarantee isolation or safety.
- [Argo Rollouts: Analysis](https://argoproj.github.io/argo-rollouts/features/analysis/). Configured analysis conditions can abort a rollout and reduce candidate weight to zero. This supports the separate gate and withdrawal mechanism; the animation does not claim to demonstrate an actual Argo integration.
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents). Agent evaluation distinguishes the transcript from the environment outcome. Coding-agent checks can use executable tests to verify resulting code. This motivates inspecting a PR artifact after a successful API response. The specific prompt, test failure, routing proportions and timing are authored illustrations.

## Limits and team exercise

Assume isolated draft branches, permissions enforced by the harness, and a predeclared required-test failure condition. Passing tests alone does not prove task correctness. A single observed failure can trip a strict safety gate but does not establish the candidate's population failure rate or causal certainty. Investigate test flakiness and task mix. Real production rollout needs representative cohorts, adequate completed work, version tags, latency/cost signals and sufficient observation time. Routing changes affect new sessions; drain or cancel in-flight work explicitly. Rollback does not erase PRs, undo side effects, or revoke credentials. Persistent prompt instructions cannot enforce permissions.

Exercise: define one required artifact check and one abort condition for an internal PR-drafting agent; tag results by prompt version; simulate candidate failure while both HTTP responses succeed. Success is observable when the gate routes subsequent sessions to the control and the failed candidate artifact remains quarantined for review.

## Comparative correction (2026-10-19)

Edited by `gpt-6-astra comparative review`; original `gpt-6.1-sol` authorship retained. Border emphasis replaces text-crossing rings. See `variant.json` corrections and `reviews/comparisons/canary-deployments/after.md` for the final encoded review.
