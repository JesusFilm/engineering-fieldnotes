# Idempotency editorial review

Author: **gpt-6-astra**, reasoning **high**. Retrieval and review date: **2026-10-19**.

Decision: **revise; core**. The original is accurate as a compressed introduction but insufficient as a standalone learning chapter. Its questions name hard problems without giving engineers a procedure or an observable learning outcome. Move the center of gravity from a generic checkout service to deciding how an agent runner recovers an uncertain write.

## Relevance

This chapter belongs early for teams enabling state-changing tools. A programmer who manually checks a ticket list after a timeout is performing reconciliation; delegated execution needs a defined recovery path. Adoption does not create a new distributed-systems law. It makes responsibility for request identity, persistence, and retry decisions explicit in the runner/tool boundary. Teams using only read-only assistants can postpone the database implementation exercise while retaining the contract questions.

## Original assertion audit

Each original field was inspected against retrieved primary pages, rather than accepted from an earlier review.

| Original assertion | Decision and correction | Evidence |
|---|---|---|
| Summary: repeated attempts avoid duplicating the intended effect | Keep the definition; distinguish intended effects from logs, equal responses, and eventual success. | [RFC 9110 §9.2.2](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2) |
| Overview: associate caller key, operation, and result | Keep as a design technique; it is not the definition of all idempotency. | [AWS: Reducing client complexity](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) |
| Overview: persistence must be coordinated | Keep; replace vague coordination with a clearly bounded local transaction example. | [PostgreSQL transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html) |
| Why: response can be lost after commit | Keep as the failure case, then explain why an unattended runner needs a recovery contract. | [AWS: Retrying and side effects](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) |
| Example: checkout retry returns existing order | Valid proposed behavior, not a universal response guarantee. Replace checkout with an explicitly imaginary in-house release tool. | [RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2), [AWS: semantic equivalence](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) |
| Example: changed cart under same key is rejected | Keep as an explicit contract choice. Demonstrate changed release input in both guide and film. | [Stripe API v1 parameter comparison](https://docs.stripe.com/api/idempotent_requests) |
| Judgment: define identity | Keep; equal payloads can be separate intentions. Add runner persistence and caller/operation scope as design recommendations. | [AWS: client request identifiers](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) |
| Judgment: define retention | Keep; expiration is a limit, not an incidental housekeeping detail. | [Stripe API v1 pruning](https://docs.stripe.com/api/idempotent_requests) |
| Judgment: define concurrent duplicates | Keep; give the learner a database-enforced arbitration example. | [PostgreSQL uniqueness checks](https://www.postgresql.org/docs/current/index-unique-checks.html) |
| Next: what if both arrive before commit? | Retain the question’s substance in the exercise and answer it in the walkthrough. | [PostgreSQL uniqueness checks](https://www.postgresql.org/docs/current/index-unique-checks.html) |
| Original AWS source and related links | Retain the source and all related IDs; broaden evidence beyond one implementation essay. | Actual source opened; related fields preserved verbatim. |

## Revised claim/source mapping

- **Definition, PUT/DELETE semantics, response differences, automatic POST retry caution:** RFC 9110 §9.2.2. This is protocol semantics, not proof that every deployed endpoint obeys it.
- **Identity distinguishes attempts from separate intent:** AWS Builders’ Library sections on client identifiers and differing intent. Runner persistence is our engineering recommendation, not a model feature claim.
- **API version matters:** Stripe’s current page explicitly distinguishes v1 saved-response replay (including failures) from v2 behavior. The guide limits the 24-hour pruning example to v1; it does not promise infinite replay, universal failure caching, or a default agent behavior.
- **One commit for key and ticket:** PostgreSQL transaction tutorial §§3.4; all-or-nothing visibility supports the illustrative local boundary. An external HTTP effect does not become part of that database transaction by being called from the same function.
- **Composite identity and non-null fields:** [PostgreSQL constraints §5.5](https://www.postgresql.org/docs/current/ddl-constraints.html). A unique constraint is one component; comparing arguments and returning a result remain application work.
- **Concurrent insert arbitration:** PostgreSQL index uniqueness checks §63.5 describes waiting on an uncommitted competitor and rechecking after it ends. The guide specifies a non-deferrable constraint, rollback after a losing insert, and a fresh transaction for reading the committed record. If the competitor aborts, its insertion does not remain a conflict; the active attempt may proceed under the same contract.
- **Bounded waiting, retained human responsibility, and exercises:** editorial design recommendations. We do not claim the illustrated service exists or that a model preserves identity automatically.

All six linked source pages were actually opened and their relevant content inspected on 2026-10-19. The PostgreSQL “current” pages identified themselves as version 18 at retrieval. No source was inaccessible. Promotional navigation and agent-plugin setup advertising were excluded from the evidence. No assertion relies on search snippets, vendor marketing, or an undocumented commercial tool feature.

## Video teaching boundaries

The independent Astra cut uses one release ticket, a lost reply, a saved-key lookup, and rejection of changed input. It teaches the difference between an attempt and an intended action. Both persisted objects appear together at 3.8 seconds; replay does not issue another WRITE. At 21.6 seconds changed input is rejected while the original v1 ticket remains.

The film assumes a valid caller, a retained key record, and one database. It does not demonstrate concurrent transactions, expiry, provider APIs, permissions, or external side-effect recovery. A persistent prompt does not enforce these guarantees. The shortened k7 key is for legibility, not a key-generation prescription. The accompanying guide and transcript make the assumptions explicit. We did not read another variant scene, compare encoded alternatives, or promote this cut to recommended/default status.

## Review limitations

The written exercise is a learning activity, not an executed integration test. No ticket endpoint, live database, commercial provider, or agent restart was tested. The video is a deterministic illustration, with encoded-media verification documented in its own review. Promotion and comparative teaching evaluation remain with the coordinator/editor; shared build and UI checks were not run because this assignment prohibits shared outputs and manifest/UI edits.
