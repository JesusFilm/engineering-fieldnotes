# Primary-source and curriculum review

Reviewed 2026-10-19. These four documents were opened and their relevant text read after the blind findings were saved. This is a targeted verification of the guide's claims, not a replication of experiments or an audit of every linked reference.

| Primary document | Claim checked and boundary |
| --- | --- |
| [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents), 2025-09-29 | Supports continuing curation of information supplied to an invocation, incremental discovery, retrieval and compaction as different operations. The account explicitly discusses retrieval overhead and information loss during compression. It does not establish that the smallest context always wins, nor the original retrieval cut's invented 41s/9s comparison. |
| [Lost in the Middle, v3](https://arxiv.org/html/2307.03172v3), 2023-11-20 | Multi-document question answering and key-value retrieval show position sensitivity on the tested models, including MPT, LongChat, GPT-3.5 and Claude 1.3. This supports testing evidence placement; it is not a universal failure law for current coding agents. The guide already confines the claim to the models/tasks studied. |
| [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents), 2025-11-26 | Supports structured progress artifacts, incremental work and fresh checks across sessions in the described application-building workflow. It does not prove that any handoff template guarantees compliance, or that restoring one field proves the entire task complete. |
| [Claude prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) | Checks the guide's cost/processing distinction. Exact matching prefixes can reuse processing under this implementation; caching does not remove those instructions from the logical prompt or establish answer correctness. Avoid a blanket latency inference from token count alone. |

The original Fable author record also cites Chroma. That reference was not opened or independently verified in this review; the revised cut makes no measured context-quality or latency claim dependent on it.

## Verdict: keep / core

The topic teaches a practice needed as soon as engineers delegate debugging or resume work across sessions: make constraints explicit, retrieve authoritative evidence and rerun checks on the current patch. It requires no specialist model internals. Its worked handoff and disposable-endpoint exercise give the team an observable behavior to change, so relegating it to reference or deferring it would remove a useful foundation.

The exercise correctly allows an agent to rediscover an omitted rule; it does not manufacture a failure to vindicate the lesson. Its success criteria test source identification and reproducibility, not obedience alone. The guide distinguishes a path from loaded contents, reported checks from current evidence, and human acceptance from fixture success. Related memory/tool/harness topics remain separate mechanisms rather than prerequisites.

Two additions clarify important boundaries: measure the timeout scenario separately from API compatibility; enforce tool authorization outside prompt instructions. Source retrieval dates were refreshed after the actual document checks. The guide's broader claims and author scenario were retained.
