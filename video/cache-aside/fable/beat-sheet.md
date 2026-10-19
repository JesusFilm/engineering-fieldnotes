# Beat sheet — Cache-aside, "stale fill race" cut (fable)

Model: anthropic/claude-fable-5-1, reasoning high. Authored independently of the other cuts; only the baseline's encoded media was inspected (one caller, miss → fill → hit → expiry, no write path).

Lesson: commit the source update before deleting the cache key, but recognize that a reader can still refill an old value after deletion. In this example the stale entry disappears when its TTL expires, measured from the late fill; this is not a general guarantee of freshness.

Learning objective for a team adopting agents: reproduce the stale-fill race behind a tool and distinguish cache residence time from the freshness required for an action. Decide whether delayed refills require a lease or version-aware write contract, and what the execution boundary must check. Observable outcome: the team can demonstrate a stale set and state the assumptions under which its chosen freshness budget holds.

Actors: `Agent` (box, reads), `Editor` (phone, saves), `App` (wide box with two ports: left to the cache, right to the database), `Cache` (store; row 0 is `refund`, its bar is the TTL draining at one constant rate), `Database` (cylinder; the value under it is the current stored policy), clock (appears only while the TTL runs out), one answer badge above the Agent, one pending-write chip held inside the App.

Pitches: Agent sends C6, Editor sends G6, App receives C5, cache receives E5 (hit sparkles from E6; stale hits from E5), database receives G5 and its updates land as a low G4 `store`, cache stores E5. Fresh answers `deliver` at C6; the compromised answers at C4 followed by a `thump`. The stale set is the only `crash` and the loudest moment; the fresh refill ends on a `chime`.

Times are playback seconds (scene authored at speed 1, played at 0.9).

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0–0.8 | Stage fades in from black | Cache holds `refund 30d` (green, TTL bar full); Database says `refund 30d` | — |
| 0.7–2.6 | **Normal read.** `GET refund` → `refund?` → row flashes, `HIT 30d` returns → `30d` reaches the Agent | Database dims (not consulted); badge `30d` green | send C6 → arrive C5 → arrive E5 → hit → deliver C6 |
| 4.2–5.6 | **Write path.** `SAVE 14d` → `UPDATE 14d` lands on the Database → `DEL refund` reaches the Cache | Database value `refund 14d` (orange flash); row 0 vanishes with ~44% TTL left | send G6 → arrive C5 → store G4 → poof |
| 6.7–9.8 | **Refill starts.** `GET refund` → `refund?` → red × on the empty row, `MISS` → `SELECT` → spinner → `14d` returns to the App | Port lights follow the work | send → arrive → miss → arrive G5 → work ×3 → arrive C5 |
| 9.8–12.5 | **Stall.** `SET 14d` sits inside the App, squeezing on each low tick | Pending write visible, not yet applied | work E3 ×7 |
| 10.4–11.8 | **Second write during the stall.** `SAVE 7d` → `UPDATE 7d` → `DEL refund` finds nothing | Database value `refund 7d`; red × and small jolt on the empty row | send G6 → arrive → store G4 → thump |
| 12.9 | **Stale set.** The held `SET 14d` lands last | Row 0 `refund 14d` in red, TTL bar refilled; red ripple beside the row, cache jolts | **crash** (loudest) |
| 13.6 | The Agent receives `14d` | Badge `14d` orange (true when read, already superseded) | deliver C4 |
| 15.0–17.0, 18.5–20.5 | **Consequence.** Two reads hit the red row and return `14d` while the Database shows `7d` | Badge `STALE 14d` red; Database pulses green with its `7d` | send → arrive → arrive E5 → hit E5 → deliver C4 → thump |
| 21.3–22.9 | **This entry expires.** Clock appears between the stores, hands spin, ticks accelerate, the bar reaches zero | Row 0 fades with a red ripple | clock ×15 → poof |
| 23.6–27.7 | **Fresh refill.** `GET` → `MISS` → `SELECT` → `7d` → `SET 7d` → `7d` to the Agent | Row 0 `refund 7d` green, TTL bar full; badge `7d` green | send → miss → arrive G5 → work ×2 → arrive → store E5 → deliver C6 → chime |
| 27.7–30.6 | Hold the resolved state | — | — |
| 30.6–31.6 | Diagram fades to black beneath the persistent title/subtitle; the last frame equals the first | — | — |

Illustrative versus guaranteed: the stall between reading the database and setting the cache stands in for any reordering (pauses, retries, slow networks); the video does not claim a frequency. The red `STALE` badge is the video's annotation, not something a real cache reports. The expiry shown ends this entry’s cache residence after the late fill because no hit renews it and no further stale refill occurs. Data may already be old when stored. Lease tokens invalidated on deletion can reject stale fills (not shown); an arbitrary conditional set is not sufficient without a version/lease contract.

## Primary sources (retrieved 19 October 2026)

- [Azure Architecture Center: Cache-Aside pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside) describes updating the authoritative store before invalidating the cached item. It explicitly does not guarantee consistency and discusses expiration as a design tradeoff.
- [Nishtala et al.: Scaling Memcache at Facebook, NSDI 2013, §3.2.1](https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final170_update.pdf) describes stale sets caused by reordered concurrent operations. Its lease mechanism associates a token with a miss and can invalidate that token after a delete, allowing a later stale fill to be rejected. The paper’s read/write paths support the depicted sequence; this video does not implement its lease protocol.

Source excerpts were replaced with linked paraphrases for publication; the authored beat sequence and its recorded revisions are retained.

Comparative corrections by `gpt-6-astra comparative review`: narrowed TTL claims and aligned closing-frame description. Original notes are preserved in `reviews/comparisons/cache-aside/original-sources/fable/`.
