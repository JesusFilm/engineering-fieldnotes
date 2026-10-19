# Agent evals: independent editorial review

Author/reviewer: **gpt-6-astra**, high reasoning. Retrieval/review date: **2026-10-19** (Pacific/Auckland). Decision: **revise; keep as core**. This is a fresh assessment of `content/original/agent-evals.json`, not an inheritance of an earlier approval. Preserved id, title, category, roles and related fields exactly.

## Relevance and adoption decision

This belongs early in the learning path because engineers already understand acceptance tests, but delegating the implementation introduces configuration changes and variable attempts that a single convincing demo cannot characterize. The useful team decision is whether a candidate agent workflow deserves further use, and what evidence must accompany its output. The original 100-word note described evaluation correctly but did not teach a runnable team practice. The revision adds a manual-to-agent transition, fixture isolation, independent checks, repeat trials, a comparison exercise, and retained human responsibilities. The 734-word main guide is a standalone learning chapter.

## Every original assertion

| Original field/assertion | Assessment | Revision and supporting evidence |
|---|---|---|
| Summary: evals measure outcomes and behavior using repeatable scenarios and explicit rules | Keep with precision | Repeatable inputs are not deterministic outputs. Define task, trial and grader. [Anthropic definitions](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), sections “structure” and “non-determinism”. |
| Overview: evaluate model and harness together across multiple trials | Keep; make actionable | Record the actual model, prompt, tools and harness, reset fixtures, retain every attempt. Same Anthropic source, definitions and stable-environment guidance. |
| Overview: check system state as well as transcript and choose appropriate graders | Keep; clarify tradeoff | Concrete checks for outputs; trace for explanation; calibrated rubric for subjective qualities. [OpenAI evaluation guidance](https://developers.openai.com/api/docs/guides/evaluation-best-practices), evaluator types and human calibration. |
| Why: a convincing final message does not establish success | Keep | Outcome and completion text are distinct evidence. Anthropic's definitions explicitly distinguish them. The revision turns this into a requirement for inspectable artifacts. |
| Example: correct ticket changed, fields populated, unrelated tickets untouched | Valid illustration, not an observed result | Replace with an authentication patch that passes a new test but regresses valid login. A team learning coding delegation can apply it immediately. [SWE-bench evaluation](https://www.swebench.com/SWE-bench/guides/evaluation/) supports executing generated patches; the specific toy patch and two-case gate are our instructional design. |
| Judgment: representative tasks, unacceptable failures, human calibration | Keep; specify a decision rule | Require correctness separately from prose quality. This is editorial advice, supported by task-specific and calibrated evaluation principles in OpenAI guidance. No universal pass threshold is claimed. |
| Next: which production failure is missing? | Keep intent, broaden entry point | Teams without an agent in production can use a recent assisted change needing correction. [Anthropic tool evaluation guidance](https://www.anthropic.com/engineering/writing-tools-for-agents), realistic tasks and transcript analysis. |
| Sole original source | Verified but insufficient breadth | The original source was actually opened and read. Add engineering documentation for runnable grading, held-out tasks and calibrated evaluation, without using marketing benchmarks as evidence. |

## Claims/source map for additions

- **Tasks/trials, whole-system evaluation, clean starting state:** [Demystifying evals](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), “The structure of an evaluation”, “Step 4”, and “Step 5”. The guide paraphrases the operational principles; it does not adopt vendor performance claims or recommended sample counts as universal rules.
- **Representative cases, human calibration, continuing evaluation:** [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), “Evals tips”, “Design your eval process”, and “LLM-as-a-judge”. Numerical thresholds in that page's examples are not imported. The legacy platform URL redirects to this canonical URL; retrieval succeeded. The guide uses general methodology, not hosted-platform availability or API setup instructions.
- **Held-out tasks and tolerance of different valid tool paths:** [Writing effective tools](https://www.anthropic.com/engineering/writing-tools-for-agents), “Generating evaluation tasks” and “Collaborating with agents”. No claim that one particular tool schema will improve every model is retained.
- **Apply generated patches, preserve logs, distinguish ungraded/harness failures from failed tests:** [SWE-bench evaluation guide](https://www.swebench.com/SWE-bench/guides/evaluation/), “Overview” and “Understanding Evaluation Results”. Its result caching section is a concrete example of why changed candidates need distinct run identities; the chapter does not imply all evaluators share this cache implementation.
- **Independent acceptance tests, non-negotiable authentication checks, permissions retained by runtime:** editorial engineering recommendations, not claims that the cited tools implement these controls automatically. An eval observes behavior; it cannot confer permissions or enforce a sandbox. Persistent instructions likewise do not enforce access control.
- **Three attempts per configuration, deliberately bad patch, six-result review:** a deliberately small original exercise, not an empirically justified reliability estimate. Neither the exercise nor a real agent benchmark was executed in this task.

## Accuracy corrections and missing evidence

No original assertion was clearly false; the defects were underspecification and omitted limits. A reproducible fixture does not make agent decisions reproducible. End-state grading does not require one exact transcript. A grading failure can be an environment failure. A winning attempt does not characterize reliability. Two required checks passing does not establish security completeness, authorize release, or enforce permissions. The new text explicitly addresses each distinction.

All four cited source pages were reachable and their relevant sections read on the retrieval date; no unavailable evidence is being counted as verified. Vendor engineering posts describe their authors' experience and are not independent proof of outcome improvements in this team's repository. There is no team production dataset, measured baseline, expert calibration exercise, or observed adoption result available here.

## Video teaching boundaries

The Astra video shows the difference between satisfying a new requirement and preserving established behavior, with one all-required gate. The left output is correctly rejected; the right identical output is incorrectly rejected. Both branches must pass before human review. This complements the original ticket-state explanation through a different working-engineer example and causal sequence. No other variant source or baseline encoded media was consulted; comparative superiority is not claimed.

Patch A→B depicts revision, not repeated samples from the same configuration. The video omits configuration comparison, trial distributions, grader calibration, and full auth coverage; the chapter supplies the broader evaluation workflow. It ends at human review. Human editorial comparison still controls recommendation among variants.
