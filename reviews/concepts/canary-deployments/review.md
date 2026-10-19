# Canary deployments — source and relevance review

Author: **gpt-6-astra**. Reasoning: **high**. Retrieval and review date: **2026-10-19**.

Decision: **revise; retain as reference**. A team beginning with local code assistance does not need to learn a rollout controller before using agents. This chapter becomes useful when those changes reach production or shared agent tools. Keep it adjacent to observability and evaluations as an operational reference, with a decision exercise rather than a glossary definition. Promotion into a default curriculum remains an editorial decision.

The original was broadly accurate but too compressed to stand alone. Its generic 5% example did not demonstrate why per-version measurement matters, how missing evidence affects the decision, or why reverting traffic is not necessarily recovery. No original assertion was retained merely because an earlier review existed.

## Every original assertion

| Original field / claim | Verdict and revision | Primary evidence |
| --- | --- | --- |
| Summary: limited traffic before expansion | Keep the mechanism; add evaluation and distinguish rollout from permission to expand. | [SRE, definition and process requirements](https://sre.google/workbook/canarying-releases/) |
| Overview: compare control and candidate using user-impact signals; promote/pause/rollback | Keep, make the decision executable; distinguish controller actions from successful recovery. | [Argo, AnalysisRuns and inline analysis](https://argo-rollouts.readthedocs.io/en/stable/features/analysis/) |
| Why: limited exposure can expose production-only faults | Keep as possibility, not proof of safety or isolation. Add production versus offline evaluation distinction. | [SRE, What Is Canarying? and Dependencies and Isolation](https://sre.google/workbook/canarying-releases/) |
| Example: route 5%, compare errors/latency by version | Revise to a calculable export fixture; 5% was an example, never a universal default. | [Argo, traffic weighting and best-effort replica approximation](https://argo-rollouts.readthedocs.io/en/stable/features/canary/) |
| Judgment: representative sample, observation time, thresholds | Keep, add a separate insufficient-evidence result and explicit sample denominators. | [SRE, population/duration](https://sre.google/workbook/canarying-releases/); [Argo, Inconclusive Runs](https://argo-rollouts.readthedocs.io/en/stable/features/analysis/) |
| Judgment: viable rollback | Strengthen: mixed versions and persisted data must be compatible. Routing changes do not undo completed effects. | [AWS, protocol changes and two-phase deployment](https://aws.amazon.com/builders-library/ensuring-rollback-safety-during-deployments/) |
| Next: rare critical endpoint can disappear in aggregates | Keep the question, answer it with concrete counts and a failure fixture. | [SRE, Requirements on Monitoring Data](https://sre.google/workbook/canarying-releases/) |

## Added claims and source mapping

- **G1:** Candidate/control measurements and absolute health signals serve different purposes; shared dependencies can contaminate the comparison. SRE's isolation and monitoring sections support the distinction. The guide uses release plus operation as its application-specific breakdown.
- **A1:** AnalysisRun outcomes can affect continuation, abort, and pause; inconclusive analysis requires intervention. Argo's analysis page documents these outcomes. The guide's low-sample pause is an authored policy that must be configured; the controller does not infer the required sample size automatically.
- **A2:** A pause with a duration is elapsed-time control; Argo's canary page separately documents indefinite pauses, analysis integration, and approximate weights without traffic routing. No claim is made that one replica equals a guaranteed request fraction.
- **W1:** Rollback safety depends on compatibility of old/new readers, writers, protocols, and stored state. AWS's engineering article explains this with concrete transition examples. This is engineering guidance, not a product recommendation or a claim that rollback repairs data.
- **E1, authored fixture:** 9,000+1,000=10,000 requests; exports 900+100; failures 0+40. Pooled rate 0.4%; v2 export rate 40%. The hypothetical 1% overall alert misses the issue. The five-percentage-point/100-sample exercise gate is deliberately illustrative; no statistical sufficiency is asserted.
- **J1, editorial recommendation:** Ask an agent to prepare queries, fixtures, and evidence, while a human owns release policy and reviewed access. This is a proposed team workflow, not a sourced product feature. Written model instructions do not constitute an authorization mechanism.

## Evidence quality and access

Actual page bodies were opened and read, not just search snippets. Retrieved: Google SRE Workbook chapter; Argo Rollouts stable analysis and canary documentation; AWS Builders' Library rollback article. All four were available. The AWS address redirects to [its Builder Center article](https://builder.aws.com/content/3F04j2yRAAMBuPSPs50xwXZqg01/ensuring-rollback-safety-during-deployments); the substantive article was accessible. The stable Argo docs are a moving documentation target, not evidence of any particular installed controller version. No deployment integration or production experiment was performed.

## Video boundaries

The independent Astra cut teaches **why measurements must be split before expanding exposure**. It shows the same synthetic window before and after aggregation is removed, followed by blocked promotion and rerouting. It is not an end-to-end Argo tutorial, an evaluation of any model's code quality, or proof of automatic safety. Envelopes represent proportions, not the sample count. Observation time is compressed. The failed measurement persists after abort to avoid suggesting that traffic rollback rewrites history.

The guide now contains 689 words under the cut's counting convention (prose, outcomes and exercise; excluding source URLs and navigation metadata). Identity/title/category/roles/related fields were preserved. No shared manifest, build, UI, or other chapter was changed. Browser integration and cross-model recommendation are left to the coordinating review; this review does not claim either.
