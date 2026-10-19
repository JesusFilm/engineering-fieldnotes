# Harness engineering: concept review

Author: gpt-6-astra. Reasoning: high. Retrieval/review date: 2026-10-19.

Decision: **revise; core**. The original is a plausible short definition, but too abstract for an experienced team changing its working habits. It supplies no exercise, acceptance boundary, or distinction between a model instruction and an enforced check. The revision is a 738-word standalone guide built around a reproducible invoice-access change. Preserve the existing identity, title, category, roles, and related links.

## Every original assertion

| Original field/assertion | Verdict and correction |
|---|---|
| Summary: runtime, tools, state, checks enable useful work | Keep the working definition, but treat it as this library's synthesis, not a standardized component list or product guarantee. Explain what the team builds. |
| Overview: a model needs an execution environment across steps/sessions | Narrow. Tool execution requires surrounding software; a model can still answer a single prompt without a bespoke harness. Do not make multi-session operation a prerequisite for the concept. |
| Overview: startup, progress, recovery, completion evidence | Keep as design concerns. The Anthropic example supports these concerns, not automatic recovery or a requirement to copy its filenames. |
| Why: stronger models can fail without reconstruction or verification | Qualify. The primary report describes failures in a particular coding-agent experiment. It does not compare all model strengths or establish a universal failure rate. Remove the implied general comparison. |
| Example: restore workspace, checklist, smoke test, progress record | Revise substantially. Those activities aid continuity, but a startup test does not verify the changed business rule. Use a counterexample that exposes the gap; retain a brief interrupted-work handoff in the walkthrough. |
| Judgment: invariants and sufficient completion evidence | Keep and operationalize: specify assertions, retain tested version/output, review test edits, and distinguish evidence from full correctness. |
| Next: can a fresh session resume? | Useful but incomplete. Replace the main question with reproducibility by another engineer; retain resumption as a supporting concern. |
| Original source | Retrieved successfully from the actual article. Relevant but insufficient alone for the expanded policy and enforcement claims. Supplement with primary documentation below. |

## Primary evidence and claim mapping

All pages below were opened and read on 2026-10-19, not inferred from search snippets. Vendor engineering accounts are used for reported mechanisms, not their marketing or productivity claims.

1. [Anthropic — Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents), published 2025-11-26. Sections “The long-running agent problem,” “Incremental progress,” “Testing,” and “Getting up to speed” support the guide's account of continuity and premature completion. Their web-app experiment informs a pattern; it is not independent comparative evidence. The revision does not claim that the demonstrated files or two-agent setup are mandatory.
2. [OpenAI — Harness engineering](https://openai.com/index/harness-engineering/), published 2026-02-11. “Enforcing architecture and taste” describes custom linters and structural tests. This supports mechanically checked constraints and actionable feedback. “We made repository knowledge the system of record” supports discoverable local guidance. We do not adopt the article's minimal merge gates, agent-to-agent review policy, productivity estimates, or claims about optimal autonomy.
3. [GitHub Docs — About protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches). Sections “About branch protection rules” and “Require status checks before merging” support the instruction/enforcement distinction. Administrators and bypass roles are exceptions by default; configuration and plan availability matter. The guide recommends inspecting actual configuration and does not say a local test result enforces repository policy.
4. [OWASP — Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html). “Introduction,” “Validate the Permissions on Every Request,” “Ensure Lookup IDs are Not Accessible Even When Guessed,” and “Create Unit and Integration Test Cases for Authorization Logic” support checking the requested resource and writing authorization tests. OWASP does not prescribe 403 for this invented tenant contract. The example's statuses and fixture design are explicitly authored teaching choices.

The concurrency documentation was opened during research but does not support the selected lesson and is excluded from verifiedSources. All four selected sources were available. No SDK, invoice service, performance result, or production enforcement configuration was exercised as part of the editorial review.

## Relevance and learning design

Core placement is an editorial judgment: the first useful delegation needs a reproducible environment and an inspectable finish condition. Engineers already know tests and CI; the transition is to package that practice so the agent receives and acts on feedback without an engineer narrating each step. Prerequisites link to existing tool-design and context-engineering chapters. Outcomes are observable: a command, a demonstrated rejection, and an independently reproducible handoff.

The exercise is deliberately small and local. It requires a known failing implementation, tests before and after repair, inspection for weakened assertions, and a second person's reproduction. It does not ask the learner to build an orchestration platform before delegating useful work. “Rerun after edits,” evidence tied to versions, and human release responsibility are this library's engineering recommendations, not measured vendor capability claims.

## Video teaching boundaries

The alternative teaches an execution/check feedback loop through one failure. It complements the baseline's cross-session progress story. The harness container shows only the check boundary; it omits process setup, tool permission enforcement, persistence, concurrency, retries, and execution costs. The patch is illustrative, not a live recorded agent repair. A correct 403 is green because it satisfies the contract; a 200 is red in the forbidden case. Both results clear when the patch changes and both rerun.

The finish is human review readiness, not deployment or a claim of comprehensive security. No physical listening or independent comparison review has occurred. Technical audiovisual verification is recorded separately in the owned video directory. A passing alternative does not select the library's default cut; the coordinator/human editorial process retains that decision.
