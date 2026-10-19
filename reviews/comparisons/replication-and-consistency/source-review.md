# Guide and technical boundaries — 2026-10-19

**Verdict: keep as reference.** This is useful when a team's agent tools observe recently changed state through replicas, caches or derived indexes. It changes a concrete engineering decision: preserve the write receipt, identify the verification route and snapshot, and return unresolved rather than repeat a successful mutation. It is not a prerequisite for every team adopting code assistants; tool design and retry behaviour should come first. This placement is editorial judgement, not a PostgreSQL recommendation.

Primary documents actually retrieved and read on 2026-10-19:

- [PostgreSQL 18 streaming and synchronous replication, §§26.2.5 and 26.2.8](https://www.postgresql.org/docs/18/warm-standby.html): asynchronous replication permits a lagging standby and loss of unreplicated commits on failover. Synchronous acknowledgements concern configured participants, not every possible read endpoint. The three cuts correctly show primary acknowledgement before replica catch-up. None demonstrates failover.
- [PostgreSQL 18 WAL settings, synchronous_commit and Table 19.1](https://www.postgresql.org/docs/18/runtime-config-wal.html): with configured synchronous standbys, `on` waits for durable standby WAL; `remote_apply` also waits for replay. `remote_write` is weaker against an operating-system crash, and an empty standby configuration does not provide remote guarantees. The guide's conditional wording is correct. The videos abstract transport and replay into one copy event, so they cannot be used to teach the difference between these acknowledgement modes.
- [PostgreSQL 18 transaction isolation, §§13.2.1–13.2.2](https://www.postgresql.org/docs/18/transaction-iso.html): Read Committed obtains a snapshot for each command. Repeatable Read retains the snapshot from the first non-transaction-control statement. A new read route does not by itself replace an old snapshot. The guide correctly requires a fresh post-commit query. A revision observed now does not atomically constrain a later action; the guide now explicitly calls for an execution-time precondition where that is needed.

All three links are now version-pinned and carry retrieval dates in the guide. WAL is expanded before the guide relies on it. Existing examples, claims, prerequisites, exercise and reference placement are retained. The exercise has observable criteria (one mutation; identifiable stale read; verified or unresolved outcome) and is appropriate as a deterministic fake-service exercise, not a benchmark or proof of PostgreSQL behaviour. No database experiment was performed.

The R42 release and v7/v8 fields are application-level teaching choices. Neither PostgreSQL nor a model automatically implements the proposed wrapper, revision receipt, permission checks or routing. A matched database revision does not prove an external deployment finished. Concurrent writers, cache layers, unavailable primary and failover remain explicit limits. A fixed wait is not established as a freshness guarantee by any of these sources.

## Textual sequence reconciliation

- Baseline's three compact transcript entries match normal read, ACK-before-copy, stale read, primary read, catch-up and later replica read. Their ranges are coarse: source/frames place the stale request at 9.0 and primary return at 14.6, versus the synopsis's 9.5–14.5. Treat those ranges as approximate beat labels, not precise cue marks.
- Astra's five entries match the encoded actions: read at 1.5/return 3.5; commit 6.2/ACK 7.9; mismatch 12.6; authoritative return 18.4; replica apply 24.0. “Fresh” and “one writer” are assumptions in the guide/metadata, not independently measurable database properties in an animation.
- Sol's six entries match normal release 4.9, commit 7.4/ACK 9.0, hold 13.1, primary verification 17.8/release 19.4, replica apply 22.7, and later verification 26.9/release 28.3. The revised final entry describes the added waiting state at 24.5 and the green gate. Version chips remain application revisions, not WAL positions. The gate is freshness control, not authorization.

## Provenance

After the blind findings were saved, metadata established Astra as `gpt-6-astra` and Sol as `gpt-6.1-sol`, both high reasoning. Sol retains that original model and has a separate `editedBy: gpt-6-astra comparative review` plus timestamped corrections. Baseline provenance is unrecorded in the builder; it is not guessed. No unfinished attempts were read. Author reviews/scores were not needed or consulted.
