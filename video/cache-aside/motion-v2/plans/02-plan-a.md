# A cache hit

## Scope and evidence

One mechanism: an exact-key cache lookup finds an existing record and returns its copy to the application without a source read. The meaning of Hit is key presence; freshness remains unchecked.

Grounding: `video/cache-aside/sequence/lessons.json` item 2 and `content/concepts/cache-aside.json`. [Microsoft's Cache-Aside pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside), inspected 2026-10-21, describes application-owned lookup and return of a matching cached item, and notes that cache/source consistency is not guaranteed. The illustrated key, revision, and timings are teaching choices.

Five beats, 42 seconds. Begin with revision 1 already cached. No miss, source fetch, fill, write, expiry, invalidation, stale-revision demonstration, or repair. Do not introduce revision 2 to prove staleness: this lesson establishes that freshness is unknown from the hit alone.

## Software-native layout

Use a large **key lookup inspector** beneath the application, with a separate quiet source-status strip. The cached record stays in its store as a copy returns upward. The source strip never lights up or changes its read count. This is not an application→cache→database pipeline: there is no cache-to-database wire.

1080 × 1920; background #050506, primary #E6E8EC, secondary #8B9099, lookup amber #F5A524, found record teal #3FB68B. Hit uses a key-match outline and text, not a correctness checkmark. Main labels 58–64 px; detail text 52–56 px; title 76 px.

| Element | Coordinates x,y,w,h | Labels / state |
|---|---|---|
| Title | 90,140,900,110 | `A cache hit` |
| Application | 90,350,900,330 | header Application; Runbook; revision slot initially empty |
| Request text | 150,760,780,80 | `GET runbook:api`, 56 px |
| Cache inspector | 90,1000,900,420 | header Cache; subtitle Reusable copy |
| Stored row | 130,1160,820,180 | `runbook:api` / `revision 1`, 58 px |
| Lookup outcome | 130,1350,820,60 | blank → `HIT · key found`, 56 px |
| Source strip | 90,1510,900,140 | `Database · source` / `Reads this lookup: 0`, 52 px |
| Evidence footer | 90,1740,900,110 | `Freshness: not checked`, 56 px |

Request path (320,700)→(320,980); response path (760,980)→(760,700), labeled Request and Record using 52 px type beside their respective paths, clear of the stationary GET text. Show text in the fixed readout, not on tiny moving markers. Application revision settles at (150,550,780,70). No source revision is shown, because this lookup does not observe it.

The stored row's identity never disappears. A duplicate response marker emerges at the cache boundary; it is not the original row being removed. Keep the source strip readable in normal secondary text, not faded beyond phone legibility. There is no crossed-out database or failure indicator: the source is simply unused for this lookup.

## Beat sheet: motion, state, sound

Application C4, cache E4. The source remains silent. Presets below are intended production cues, not claims of completed audio. No music, ticking, or celebratory “correct” fanfare.

| Beat / time | Motion and state changes | Sound / hold |
|---|---|---|
| 1 · 0–8 s · Copy already exists | Establish the application waiting for a runbook and the cache's pre-existing runbook:api / revision 1 row. Source strip reads Reads this lookup: 0. At 3 briefly outline Reusable copy and the stored row. No fill animation. | Cache `ack` E4 at 3. Hold 4–8. Cached revision 1 exists before the new lookup. |
| 2 · 8–16 s · Check the key | At 8.5 application becomes Checking cache and GET runbook:api appears. Hold until 10.5. Request marker travels downward 10.5–12. At 12 highlight the requested key and the identical stored key together. No source activity occurs. | Application `send` C4 at 10.5; cache `arrive` E4 at 12. Hold 13–16 on the exact match. |
| 3 · 16–23 s · Name the hit | At 16.5 change lookup outcome to HIT · key found. Outline the complete row, including revision 1, then settle by 18. The application still has no result until delivery in the next beat. | Cache restrained `hit` E4 at 16.5. Hold 18–23. Use no Fresh/current badge or correctness tick. |
| 4 · 23–33 s · Return the cached record | At 23.5 create a response copy at the cache edge. Travel upward 24–25.5. At 25.5 application becomes Received and revision 1 appears by 26.5. Original cache row persists. At 28 outline Reads this lookup: 0 once without changing it. | Cache `send` E4 at 24; application `arrive` C4 at 25.5; application soft `ack` C4 at 28. Hold 29–33 with matching application/cache revisions and zero source reads. |
| 5 · 33–42 s · Separate presence from freshness | At 33.5 retain HIT · key found and reveal footer Freshness: not checked. Briefly emphasize hit text, then the unchanged source-read count at 35.5. No new request or revision change. | Application `ack` C4 at 33.5. Hold 36–42 silently. Finish with the received copy, persistent cached row, and explicit limit visible together. |

The first four beats explain the successful reuse; the last qualifies what was established without changing the mechanism. The source remains unqueried from start to finish. No repeated lookup is needed.

## Accuracy limits

- Hit means the requested key yielded an entry here. It does not prove the stored revision matches the current source. The displayed Freshness: not checked is an explanatory annotation, not a claim that every cache returns such metadata.
- The pre-existing cache entry was populated before this scene; its creation is outside scope. No implicit automatic cache fill or cache-to-source fetch should appear.
- `GET runbook:api` is an illustrative cache operation, not an HTTP endpoint or production key-scope recommendation. Actual keys must cover the result scope; authorization remains application responsibility and is assumed satisfied here.
- Reads this lookup: 0 counts logical database reads caused by this particular lookup. It does not claim the database is globally idle or has never been read.
- Cached data is reusable; returning it does not consume the entry. Revision 1 is record metadata, not a freshness certificate, expiry timer, or permission token.
- No latency number or guaranteed speedup is asserted. This example avoids one source read; relative performance depends on the system. No deployment or execution of runbook instructions occurs.

## Native350 acceptance and later review

- Inspect actual individual encoded frames at native 350 px width (~622 px high), plus full size. 52 px source labels become ~16.9 px. Ensure GET runbook:api, revision 1, HIT · key found, and Freshness: not checked fit without shrinking. Wrap the footer into two short lines if necessary.
- Inspect holds at 5, 10, 14, 20, 30, and 39 s, plus before/mid/after key matching, hit appearance, response travel, and final limit reveal. Contact sheets do not establish phone legibility.
- At 14 s the requested key must visibly match the cached key. At 20 s Hit must be explained by key presence. At 30 s the application has revision 1, the cache retains it, and database reads remain 0. At 39 s distinguish presence from unchecked freshness.
- No database-bound packet, source activity flash, hidden fill, cache deletion, revision 2, or Fresh badge. Application result appears only on response receipt. Request and record paths must not cross labels.
- Muted playback must show lookup, match, returned copy, and absent source fetch through state changes. Sparse text must label those states, not narrate paragraphs. Keep final uncertainty readable rather than coloring the whole success red.
- Reproduce suspected visual faults through alternate extraction before flagging. Later decode the full MP4, inspect peaks and streaming metadata, and listen before claiming audio was heard. Bind review to the actual full SHA-256 and renew encoded inspection after any re-encode.

Only this plan is assigned. Future implementation uses repository-pinned Puppeteer and a cut-local engine copy. No rendering, public/site/shared-skill edits, Git operations, or other lesson work is included.
