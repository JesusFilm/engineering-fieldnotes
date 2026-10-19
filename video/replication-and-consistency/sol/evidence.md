# Evidence and scope

Retrieved 2026-10-19. Linked paraphrases only. Original editorial input: `content/original/replication-and-consistency.json`.

- [PostgreSQL 18: Streaming replication](https://www.postgresql.org/docs/18/warm-standby.html#STREAMING-REPLICATION): asynchronous streaming allows a delay between committing a transaction on the primary and its visibility on a standby. Supports the primary-v2 / replica-v1 contrast after ACK.
- [PostgreSQL 18: Synchronous replication](https://www.postgresql.org/docs/18/warm-standby.html#SYNCHRONOUS-REPLICATION): commit acknowledgement modes distinguish persistence from replay; `remote_apply` waits for the chosen synchronous standbys to replay. This cut deliberately shows asynchronous replication. Its ACK is not a claim that every replica can read the update.
- [PostgreSQL 18: Read Committed](https://www.postgresql.org/docs/18/transaction-iso.html#XACT-READ-COMMITTED): a fresh query sees data committed before that query began. Supports retrying a dependent read on the current primary after commit, under the stated fresh-snapshot assumption.

## Engineering interpretation

The agent-plan example, version comparison, tool hold, and primary retry are our illustrative application design. They are not built-in PostgreSQL agent features. A wrapper receives the required plan revision after a successful commit, validates the returned revision, and retries against the current primary when the replica is too old. Versions v1/v2 are application plan revisions, not WAL positions or evidence of linearizability. Equality is sufficient for this two-revision story; a production comparison must define version ordering and whether a newer concurrent revision is acceptable.

Assumptions: one available current primary; no competing writers, failover, old transaction snapshot, or cache layer; plan content and revision read together; no tool execution until the wrapper validates its required version. Read routing and the version check must be enforced in code. Persistent prompts cannot enforce either permissions or this consistency check. A freshness check is not authorization, validation of plan correctness, or an atomic guard against later concurrent changes.

The wait and copy times are illustrative and deliberately extended for teaching. A fixed delay does not guarantee replica freshness; no maximum lag is promised. The copy animation abstracts WAL transport and replay into one visible update. This is one mechanism, not a survey of quorum systems, durability, isolation, or consensus. In a real deployment, verify replay position or the application revision against the consistency contract, and define timeout/failure behavior.

## Small exercise

Pause replay on a test standby, commit plan v2 on the primary, and run the wrapper with required revision v2. Observe v1 on the replica and zero tool executions. Enable its primary retry and observe exactly one permitted step using v2, with the selected node and returned revision logged. Resume replay and repeat a fresh standby read. Success means the same version check passes after replay, without a hard-coded sleep. Use an isolated test system.

## Provenance

Authored as the requested GPT-6.1 Sol / high alternative. No other model's variant scene or partial attempt was read. No comparative quality claim is made; a separate encoded-media comparison is required before recommendation. Local engine source was copied from the architecture-flow-video skill and extended here only. Browser rendering resolves the repository-root `puppeteer-core` 25.14.0 dependency, pinned by the root lockfile. No installed skill file was modified.
