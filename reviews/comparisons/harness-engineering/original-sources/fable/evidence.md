# Evidence for the Fable cut

Primary source: [Anthropic, Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents), retrieved 19 October 2026.

## Source-to-scene mapping

Anthropic reports premature completion claims and missed end-to-end failures. Its workflow keeps a feature checklist with a passing-status field and instructs the coding agent to verify features before updating that field. Browser-based checks helped it exercise the application as a user would. These observations motivate the video's separate claim, test and recorded-result states.

## Library design judgement

The animation deliberately makes the harness own verification and the record update. The article instead describes a prompted coding agent performing those steps. Runtime ownership is this library's proposed stronger control; it is not an automatic property of a progress file or a model instruction.

Feature names A/B, two checklist rows, one failed run and all durations are illustrative. The single Tests box stands for an observable acceptance check; the example does not demonstrate test adequacy or prove complete correctness.
