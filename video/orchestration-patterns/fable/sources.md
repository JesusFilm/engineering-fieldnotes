# Evidence for the Fable orchestration cut

The author fetched and read these primary sources on 19 October 2026. The notes below paraphrase their relevance to the scene.

## Anthropic: Building effective agents

https://www.anthropic.com/engineering/building-effective-agents

The article describes parallel sectioning for independent subtasks and an orchestrator that delegates work and combines results. It recommends starting with a simple approach and adding complexity when the task warrants it, with cost and latency among the tradeoffs.

This supports the independent-work example and the decision to justify fan-out rather than assume that more workers improve every task.

## Anthropic: How we built our multi-agent research system

https://www.anthropic.com/engineering/multi-agent-research-system

The research-system account distinguishes independently explorable work from tasks with shared context and many dependencies. It describes coordination complexity and increased resource use. Its reported research results are specific to that system; the video does not generalize its token or speed figures to software development.

This supports examining dependencies before parallel execution. It does not establish that a model will reliably discover them.

## Library judgement and limits

The field rename and dependent handler are invented to make the dependency visible. Their conflict and rework are illustrative; actual failures can appear during review, merging, testing, or execution. The known-dependency label represents a planning decision, not automatic detection or an enforced scheduling guarantee. See the fresh comparison for subsequent corrections to the sequence.
