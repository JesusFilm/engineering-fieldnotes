# Written guide and technical boundaries

Reviewed 2026-10-19 by gpt-6-astra comparative review, after the blind findings were saved.

**Keep as reference.** Cache-aside matters when repeated exact-key tool retrieval creates measured latency or source-load pressure. It is not a prerequisite for agent adoption. This guide earns its place by making the engineer choose a freshness budget, keep authorization outside cached content, and reproduce a stale-fill race; those are observable decisions, not generic AI advocacy. The replication/consistency prerequisite is appropriate for the race exercise, while the baseline video can introduce the read path first.

## Independently opened primary sources

| Source (retrieved 2026-10-19) | Supported claim and boundary |
| --- | --- |
| [Microsoft Cache-Aside](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside), Solution; Consistency; UpdateEntityAsync and ordering note | Application owns lookup, miss read and fill; commit source before deletion. The pattern does not promise consistency. The ordering note fixes deletion-before-commit; it does not rule out a reader that fetched before commit and fills after deletion. |
| [AWS ElastiCache strategies](https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html), Lazy loading; Adding TTL | A hit reads the cached object; misses fetch and fill through application code. Misses cost extra work; TTL does not guarantee freshness. Its broad write-through freshness language is not adopted as a concurrency guarantee. |
| [AWS caching challenges](https://aws.amazon.com/builders-library/caching-challenges-and-strategies/) (redirected to [Builder Center](https://builder.aws.com/content/3K9TeXp6strMiJ4vhakpRD7BQWO/caching-challenges-and-strategies)), External caches; Other considerations; best practices | Read the full relevant body, including cache-disabled testing, caps on downstream requests, and request coalescing. These support the guide's source-load boundary. A search-within result incorrectly returned no coalescing match; the opened body explicitly contained it. |
| [Redis EXPIRE](https://redis.io/docs/latest/commands/expire/); [SET](https://redis.io/docs/latest/commands/set/); [GET](https://redis.io/docs/latest/commands/get/); [GETEX](https://redis.io/docs/latest/commands/getex/) | EXPIRE sets a timeout; expiration subsequently deletes the key. SET EX attaches a value and expiration in one command. Plain GET is read-only and has no expiration option; GETEX is a distinct read-and-expiry operation. Neither a lifetime nor a source revision label establishes currentness by itself. |
| [OWASP Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html), Validate Permissions on Every Request | Validate each request, including the cached path; possession of an object identifier is not permission. Application-enforced authorization, rather than model instructions, is the guide's engineering application of this requirement. |
| [Nishtala et al., Scaling Memcache at Facebook](https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final170_update.pdf), §3.2.1 | Read the paper's stale-set and lease-token discussion: deletion invalidates a lease so a delayed refill cannot use it. This independently supports the race shown by fable. Generic conditional writes are not assumed to solve it without an appropriate token/version contract. |

## Amendments

- Added per-source retrieval dates and the primary stale-set paper to the guide.
- Corrected “EXPIRE removes an expired key” to distinguish setting the timeout from later expiration.
- Clarified the source-read-count exercise: one cold read followed by two warm reads produces one fetch; a read after deletion adds another.
- Added the boundary between checking a revision now and enforcing that revision when an action executes. The guide proposes a contract; this review did not implement or execute the exercise, a Redis service, or a deployment.
- Narrowed fable's lesson/limitations: TTL limits this particular entry's residence after the delayed fill. It is not an upper bound on data age since the source write, and more delayed fills or renewal could extend the stale period. The displayed 30d/14d/7d are refund-policy values, not TTL settings.

## Claims preserved and limits

The original runbook example, key scope, authorization-on-hit requirement, failed-deletion recovery, explicit freshness budget and bounded source load all remain useful. A schema version belongs in a key if it changes the returned representation; team/service scope is validated context, not an access-control substitute. Authoritative rechecking is a design exercise, not a technique visually demonstrated by any of the three cuts. Red highlights are viewer annotations; no automatic stale-value detection occurs. None of these videos establishes a performance benchmark, freshness SLA, permission guarantee, or deployable concurrency solution.
