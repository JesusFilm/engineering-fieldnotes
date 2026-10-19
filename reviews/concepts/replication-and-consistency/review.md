# Replication and consistency — evidence review

Author: **gpt-6-astra**, reasoning **high**. Retrieved and reviewed **2026-10-19**.
Decision: **revise; reference**. Preserve id, title, category, roles, and related links.

## Relevance and editorial decision

The original was technically cautious but too abstract to earn early curriculum space. A profile-save example did not explain what changes when a team delegates decisions to an agent. The replacement follows a release assistant's write/verify loop, specifies what the wrapper must observe, and gives a deterministic fake-replica exercise. This is supporting systems knowledge, useful once tools access replicated or derived state; it is not a prerequisite to all coding assistance. Tool contracts and timeouts/retries come first.

## Every original assertion

| Original field / assertion | Decision and correction | Evidence |
|---|---|---|
| Summary: replication copies data; consistency determines observations | Keep distinction; explain it through verification evidence. Do not conflate replication with isolation. | [Streaming replication](https://www.postgresql.org/docs/current/warm-standby.html#STREAMING-REPLICATION); [isolation](https://www.postgresql.org/docs/current/transaction-iso.html) |
| Overview: asynchronous replicas can lag committed writes | Keep, scope to the PostgreSQL example rather than invent a universal delay bound. | §26.2.5, asynchronous default and visibility delay |
| Overview: recent changes can be lost on failover | Keep with condition: changes absent from promoted standby. This is a possibility, not inevitable loss on every failover. | §26.2.8, commits not replicated at primary crash |
| Overview: synchronous acknowledgement strengthens specific durability guarantees | Keep, expand meaning: on waits for durable remote WAL; remote_write only reaches remote filesystem; remote_apply waits for replay. Configuration matters. | [synchronous_commit](https://www.postgresql.org/docs/current/runtime-config-wal.html#GUC-SYNCHRONOUS-COMMIT), Table 19.1 |
| Overview: visibility depends on acknowledgement mode and selected replica | Keep, add the read snapshot; even primary routing cannot repair an old Repeatable Read snapshot. | WAL settings plus isolation §§13.2.1–13.2.2 |
| Why: successful write does not mean every replica can return it | Keep, turn into an observable tool failure mode. | Streaming replication and synchronous_commit |
| Example: read saved profile from primary | Revise to R42 release state and a fresh post-commit query. Add single-writer assumption, version and field checks. | Read Committed snapshot semantics; proposed application design, not a documented product feature |
| Judgment: choose staleness/data-loss tolerance, then acknowledgement/routing | Keep as editorial advice; add cost, snapshots, concurrency, failover, and unresolved state. | Tradeoff informed by §26.2.8; decision remains team responsibility |
| Next: remote persistence versus queryability? | Retain question's substance; extend to tracing actual read endpoint and snapshot. | WAL settings; isolation |
| Sources: one broad PostgreSQL page | Expand to three directly retrieved official pages. No marketing or unverified agent feature claims. | Sources below |

## Claim-to-source mapping

1. **Async lag and failover exposure:** [Log-Shipping Standby Servers](https://www.postgresql.org/docs/current/warm-standby.html), §§26.2.5, 26.2.8. The guide intentionally omits the documentation's typical latency example: it is not a bound.
2. **Durability versus visibility:** [Write Ahead Log](https://www.postgresql.org/docs/current/runtime-config-wal.html), synchronous_commit and Table 19.1. Verified the dependency on nonempty synchronous_standby_names and the current acknowledging synchronous standbys. The guide does not promise arbitrary replica freshness.
3. **Fresh read assumption:** [Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html), §§13.2.1–13.2.2. Read Committed uses a new snapshot per command; Repeatable Read retains a transaction snapshot. The guide does not promise equality under concurrent mutation.
4. **Agent example, wrapper receipt, operation ID, verification policy, exercise:** original teaching design, not a sourced feature claim. Application revision v8 is not a WAL location. The fake demonstrates a scheduling hazard and is not a database integration test.
5. **Human responsibilities and permissions:** engineering recommendations. A prompt is not offered as a permission enforcement mechanism.

All three pages were opened as actual source pages through the browser tool on 2026-10-19. The `current` alias served PostgreSQL 18. No required evidence was unavailable. Local sources.json records the exact retrieval targets and resolved version; future readers should account for alias movement.

## Video teaching boundaries

The independent Astra sequence shows normal replica read → acknowledged primary write → stale replica verification → fresh primary verification → later replica replay. It teaches the decision boundary at a mismatched observation, with one visible mutation throughout. It does not teach quorum protocols, election, failover, conflict resolution, exactly-once effects, authorization, or synchronous commit tuning. The long replay delay is illustrative, not measured. No baseline or other variant scene was read. No comparison ranking or default recommendation is asserted.

## Limitations

Evidence checks concern PostgreSQL 18 behavior, not the team's deployed database or tool implementation. No real replica was provisioned; the exercise is deliberately a fake. Visual verification and audio analysis are recorded with the video; no physical listening is claimed. Human editorial promotion and independent cross-model comparison remain coordinator responsibilities.

## Presentation check

An isolated scratch build used the existing chapter and comparison functions with only the assigned Astra cut. Chapter/comparison headers and poster, the exercise, and the expanded five-beat transcript were inspected in Chrome at phone/desktop widths (390/1280 px). No horizontal overflow was detected; chapter body type is 17 px. Shared build/UI files and dist were not modified. Evidence and reproducible preview commands are in video/replication-and-consistency/astra/.
