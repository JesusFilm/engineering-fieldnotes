# Fresh comparative teaching and defect review

Reviewed 2026-10-20. Scope: **cache-aside, queues-and-backpressure, idempotency only**, five encoded lessons each, compared with each topic’s originally recommended `astra` cut. This is an independent review, not a promotion or source-change request.

**Verdict:** retain the five-lesson approach for granular teaching, but revise these exports before making them the primary teaching experience. The larger captions explain actors and consequences better than the short originals. However, extra runtime often buys a settled hold rather than another causal step. The queue and idempotency sequences also discard useful visual evidence present in the originals. Cache-aside is closest to a successful expanded lesson. Keep the originals available as compact recaps; do not interpret this recommendation as abandoning the requested granular format.

No access or decoding blockers occurred. There are editorial blockers to recommending these exact exports as finished: captions sometimes claim completed state before the animation reaches that state, and the idempotency sequence needs a clearer bridge between its unprotected failure and protected retry. Audio perception remains unreviewed, as detailed below.

## Evidence and scope

Read `AGENTS.md`, `docs/editorial-workflow.md`, the architecture-flow-video skill and its `references/review.md`, plus the three intended `video/<topic>/sequence/lessons.json` files. Before inspection, extracted **only `recommended`** from the three comparison JSON files: all were `astra`. No authoring implementation, storyboards, other cuts, or prior review scores were read. Hashing a comparison JSON’s bytes did not expose or use its other fields.

For **every one of the 15 lessons**, inspected encoded frames at **0, 3.5, 10.5, 17.5, 24.5 and 27.9 seconds**, both native **1080 × 1920** and **350 × 622**. Native contact sheets were split into rows to avoid resizing. Also inspected a half-second temporal scan across each clip and selected an additional moving/busy frame at both sizes. The scans are temporal overviews, not substitutes for the native and 350px checks. This was encoded-frame inspection, not continuous real-time playback or an every-frame visual certification.

| Topic | 01 busy frame | 02 | 03 | 04 | 05 |
|---|---:|---:|---:|---:|---:|
| cache-aside | 8s | 15s | 15s | 22s | 15s |
| queues-and-backpressure | 15s | 8s | 22s | 22s | 15s |
| idempotency | 15s | 8s | 15s | 1s | 16s |

These are selected peak teaching/packet-density moments, not an algorithmic claim of the single maximum-complexity frame. Busy cache frames include the longest response labels on the outside route; queue frames combine moving jobs with waiting/running states; idempotency frames cover commit, keyed request and rejection.

Originals were inspected at 0, 3, 6, 9, 12, 15, 18, 21, 24 and 27 seconds, plus 30/30.9s for cache and 29.9s for the other two, at 350px. Additional native original checks: cache 12/21s; queues 12/18s; idempotency 6/9/24s. Original scores below reflect that comparative sampling, not the more extensive new-clip coverage.

Evidence is under `scratch/reviewer-5/`: timestamped PNGs, native rows, 350px sheets, `scan.png`, `busy.png`, `busy-350.png`, `busy-times.json`, `evidence.json`, volume logs and `hashes.json`. Spectra were generated but were not used to make perceptual audio claims. All reviewed input hashes were rechecked after inspection: **no changes**.

## Scores

Scale: **1** seriously misleading/unusable; **2** substantial repair; **3** understandable with meaningful weaknesses; **4** strong with local improvements; **5** exceptionally clear and complete for its stated scope. Scores are editorial judgments, not test results. Accuracy includes the correspondence between captions and visible state; a correct eventual outcome does not excuse a contradictory intermediate frame. Legibility covers routes and state relationships as well as text. Pacing respects reading time and finite endings; there is no penalty for failing to loop.

| Topic / clip | Causal clarity | Accuracy | Pacing | Legibility |
|---|---:|---:|---:|---:|
| Cache 01 — Read the source | 4 | 4 | 2 | 4 |
| Cache 02 — A cache hit | 4 | 5 | 2 | 4 |
| Cache 03 — A cache miss | 4 | 4 | 3 | 3 |
| Cache 04 — A stale copy | 5 | 5 | 3 | 4 |
| Cache 05 — Invalidate and refill | 4 | 4 | 3 | 3 |
| **Cache sequence** | **4** | **4** | **3** | **4** |
| Cache original astra, 31s | 4 | 4 | 4 | 4 |
| Queues 01 — Submit a job | 4 | 4 | 3 | 4 |
| Queues 02 — Finish a job | 4 | 3 | 3 | 4 |
| Queues 03 — A backlog grows | 4 | 4 | 3 | 4 |
| Queues 04 — A full queue pushes back | 3 | 4 | 3 | 4 |
| Queues 05 — Choose an overload policy | 4 | 4 | 2 | 4 |
| **Queues sequence** | **3** | **4** | **3** | **4** |
| Queues original astra, 30s | 5 | 4 | 4 | 4 |
| Idempotency 01 — One intended operation | 4 | 3 | 3 | 4 |
| Idempotency 02 — A missing reply | 3 | 3 | 2 | 4 |
| Idempotency 03 — Name the operation | 3 | 4 | 2 | 4 |
| Idempotency 04 — Retry the same key | 4 | 4 | 3 | 4 |
| Idempotency 05 — Changed intent, new key | 4 | 4 | 2 | 4 |
| **Idempotency sequence** | **3** | **4** | **2** | **4** |
| Idempotency original astra, 30s | 5 | 4 | 4 | 4 |

Sequence scores judge the whole teaching progression, not arithmetic means. None is awarded a perfect accuracy score at sequence level: the caveats in the intended text are stronger than what the standalone videos consistently communicate.

## Cache-aside: strongest expansion, with a route and state cleanup

**01, 0–7s:** the source-of-record setup is a useful prerequisite absent from the original. At 8s the READ token clearly travels to the database; at 10.5s its work bar provides a visible cost. **14–16s:** the caption says the application can now use the value while the response is still travelling. By 17.5s revision 1 is present at the application. **17.5–27.9s:** the diagram is settled; the 21s caption introduces caching without demonstrating repeated work. Use that time for a second read or a source-read counter rather than a near-identical terminal view.

**02, 0–3.5s:** checking the cache first is visible. **7–13.5s:** a long HIT hold precedes the return; **15s** clearly shows revision 1 coming from the cache while the database remains uninvolved. This explains a hit well. Retain the version in the cache label alongside HIT so the viewer can compare copies throughout. **21–27.9s** asks whether the copy is current, which is a good bridge to staleness but repeats a settled image.

**03:** the miss is correctly an absent key, and the application performs the source read and subsequent fill. **15s:** the large REVISION 1 token on the outside route overlaps the cache’s right border. Its text is readable and not clipped, but at 350px the faint bypass and overlap can make a database response look like cache involvement. **17.5s → 24.5s:** application receives the value before the application-to-cache STORE step finishes, a useful distinction. The caption’s “now has a value” arrives before that visual receipt.

**04, 10.5s:** database revision 2 remains alongside cache revision 1; **17.5s** still reports a hit on revision 1; **22–24.5s** returns the old value. This is the best individual lesson: a successful lookup and a fresh value are visibly different properties. The original makes that contrast even quicker with side-by-side cache/source boxes and red stale values at **12s**; retain that comparison strength if revising layout.

**05, 3.5s:** invalidation produces an empty cache, not a new value. **10.5s:** MISS and the source read are separate. **15s:** the same response-token/cache-border overlap recurs. **24.5 and 27.9s:** cache revision 2 is correct, but its border has reverted to amber after the brief green refill pulse. That stale miss colour is inconsistent with the repaired record and with lesson 03’s neutral settled refill. The final concurrency caveat is valuable and avoids promising perfect freshness.

**Against astra:** the sequence spends **140s versus 31s**, adds normal-read and explicit-miss foundations, and makes application responsibility more explicit. The original gives a more compact causal arc: source edit at **9s**, stale hit at **12s**, invalidate at **15s**, source fetch at **21s**, refill at **24s**, fresh hit at **27–30s**. Its INVALIDATE label is itself still present during the next GET at **18s**, so it is not a flawless baseline. The new sequence’s final refill is an adequate finite ending, but an additional revision-2 hit would demonstrate why the repair matters. Recommendation: **revise locally, preserve the expanded structure**.

## Queues and backpressure: restore visible capacity and continuity

**01, 10.5s:** A waiting versus worker ready separates admission from execution. **15s:** the job travels down while the queue still labels A waiting; **17.5s:** queue empty and worker A running complete the transfer. **21–27.9s:** the progress bar demonstrates work after admission. The last sampled frame still says running, which is a valid finite lesson ending. However, 02 restarts A in the waiting queue without marking a replay.

**02, 8s:** the caption says “A is now running” while the worker still says ready and A is in transit. **10.5s** resolves this. **14–20.5s:** “Removing a job did not complete it” usefully separates dispatch and execution, but an unqualified QUEUE plus removal wording can suggest durable deletion on delivery. The intended takeaway mentions acknowledgement policy; the video does not. **24.5s:** completed is an explicit, readable outcome. Label the model as a waiting/local queue, or distinguish in-flight/unacknowledged work from deletion.

**03, 10.5/17.5/24.5s:** B, then B/C, then B/C/D accumulate while A runs. This makes arrivals exceeding completions understandable. At **22s**, the moving D token is clear and the worker’s progress remains visible. But the queue is only a comma-separated string: the learner reads backlog rather than sees occupied capacity. Starting with “still running A” after 02 completed A makes the unmarked reset particularly noticeable.

**04, 0–10.5s:** E stays at the producer while B/C/D fill the queue; blocking is correctly different from admission. **14–17.5s:** the caption says A finishes and B starts, but the visual mainly jumps from A running to B running. A completion is not given its own durable marker. **22s:** E is moving into the newly available place while the producer still says waiting to submit; by **24.5s**, it says submitted and C/D/E are full. The correct sequence is there, but three physical slots and an explicit completion counter would make the causal constraint much easier to verify.

**05, 0–7s:** the caption explicitly introduces a rejection policy, so this is not falsely presented as universal queue behaviour. **15s:** REJECTED travels upstream; **17.5s:** producer not accepted. **21–27.9s:** “No job was silently completed” is an odd conclusion to a rejection example. The relevant lesson is that the rejected job was not admitted and the caller must handle that outcome. A small side-by-side recap of waiting versus rejection would make the fifth clip earn its runtime.

**Against astra:** **140s versus 30s** buys definitions and a useful second overload policy. Yet astra is substantially stronger at making a bound visible: **12s** shows C/D/E filling three slots, F held upstream, and only 1/6 done; **18s** shows F admitted after capacity returns, distinct from completion; **27s** shows the queue drained and 6/6 done. The sequence’s text labels do not replace that visual accounting. The original also explicitly labels an illustrative local queue; restore that scope cue. Recommendation: **revise before primary use**, retaining the new captions and rejection lesson while restoring slots, counts and replay/continuation markers.

## Idempotency: preserve the invariant across the expanded story

**01:** separating the business effect from its response is an excellent added foundation. **15s** is nevertheless contradictory: “The effect now exists in the database” appears while the database still says “no ticket” and TICKET 47 is travelling toward it. **17.5s** has the saved ticket; **24.5s** has the caller’s receipt. Synchronise the completed-state caption with the database update.

**02, 8s:** “Ticket 47 is saved successfully” similarly precedes the database change. **10.5s:** ticket 47 exists while the caller waits; **17.5s:** caller timed out, ticket remains. The central uncertainty is correct. The sampled temporal scan shows no travelling response that visibly fails: loss is principally explained by the caption and absence of a reply. The original at **9s** gives the failed link an explicit REPLY LOST marker. **21–27.9s** explains duplicate risk but does not show a duplicate counterexample. That is an opportunity for useful granularity, not evidence that the displayed outcome is wrong.

**03, 0–3.5s:** the caller saves k7 before sending, which is good. **15s:** a COMMIT token goes toward the database. **17.5–27.9s:** the database becomes one line, `k7 → ticket 47`. The caption says to save ticket and key atomically, but the diagram does not expose the two records or demonstrate all-or-nothing storage. The intended takeaway explicitly requires atomic storage and uniqueness; only the first appears in the encoded caption. A novice can follow the happy path without understanding what prevents two simultaneous first attempts. There is also an unmarked restart: 02 already created ticket 47 without a key, while 03 creates ticket 47 as a keyed first attempt. Explicitly introduce this as a replay of the original attempt with protection added, not a retrofit after timeout.

**04, 1s:** the moving request **does include `k7 + v1`**. Same payload is therefore present in the encoded evidence, though it disappears from the persistent caller label. **10.5s:** lookup finds the saved mapping; **17.5s:** database says one ticket; **24.5s:** caller gets ticket 47. Replaying an existing result is clear. Keep the key, payload, ticket record and count visible together rather than replacing the mapping with “one ticket.” The intended intro presumes a lost response after the protected attempt; the transition from 03 does not show that loss again or explicitly connect it.

**05, 10.5s:** CHECK k7 follows the changed v2 request; **16s:** REJECTED moves back while the service shows payload mismatch and database retains v1. The no-overwrite outcome is clear. **21–27.9s:** the title promises a new key, but the picture remains k7/v2 rejected; the caption says a new operation “needs a key,” omitting “new.” Either demonstrate a distinct k8/v2 operation, or narrow the title and make the closing sentence explicitly say a new operation needs a new key under this contract. A successful k8 example is an optional teaching improvement, not a missing correctness requirement for rejection.

**Against astra:** **140s versus 30s** adds accessible normal/failure foundations, but loses the original’s strongest visual invariant. At **6s**, saved key and release ticket are separate records inside one COMMITTED database boundary, with **1 ticket** below. At **9s**, the reply is lost while both records persist; **12–18s** replay preserves them; **24–27s** rejects changed intent and leaves the database unchanged. Recommendation: **revise before primary use**, using the extra time to explain that persistent invariant and the protected replay bridge.

## Ranked changes to request, not implemented

| Priority / size | Evidence | Concrete change and teaching effect |
|---|---|---|
| 1 / M — caption-state defect | Idempotency 01 at 15s; 02 at 8s; queues 02 at 8s; cache 03 at 15s | Split in-progress language from completed-state language. Display “saved,” “now running,” and “now has” only when the receiving state changes. Stops text and diagram contradicting one another during the causal event. |
| 2 / M — sequence continuity | Queues 01 27.9s → 02 0s; 02 27.9s → 03 0s; idempotency 02 27.9s → 03 0s → 04 0s | Mark replay/alternative scenarios, and explicitly connect the protected commit to a lost response and retry. Prevents apparent job resurrection and the suggestion that a key can be attached retrospectively to an unprotected operation. |
| 3 / M — queue mechanism | Queues 03 10.5–27.9s; 04 0–27.9s; original 12/18s | Show three waiting slots, running work and completed count separately. Give A’s completion a visible event before B starts and E enters. Makes capacity and conservation inspectable. |
| 4 / M — idempotency mechanism | Idempotency 03 14–27.9s; 04 7–27.9s; original 6/24s | Restore key+payload record and ticket record inside one transaction boundary, with persistent count. Briefly name uniqueness/concurrent attempts. Explains the protection rather than relying on the word “atomically.” |
| 5 / S — route collision | Cache 03 and 05 at 15s | Give the outside return token a lane that does not cross the cache border; strengthen the active route at 350px. Keeps source response distinct from cache fill without shrinking readable text. |
| 6 / S — stale colour | Cache 05 at 24.5/27.9s | Clear the amber miss state after refill; settle to neutral or a consistent fresh-value colour. Prevents an obsolete warning from surviving the successful repair. |
| 7 / M — use time for explanation | Cache 01/02 17.5–27.9s; idempotency 02/03/05 17.5–27.9s; queues 05 17.5–27.9s | Replace selected settled holds with a repeated-read cost, a visibly lost reply/duplicate counterexample, an atomic commit explanation or a waiting/rejection comparison. Keep necessary caption-reading time; do not compress everything back to 30 seconds. |
| 8 / S — closing and scope language | Queues 02 14–21s and 05 21–27.9s; idempotency 05 21–27.9s | Clarify waiting-queue versus broker acknowledgement semantics; conclude rejection with “not admitted”; say “new key” for changed intent. Align each finite ending with the lesson it actually demonstrates. |

No unreadable major text or clipped caption was found in the required and busy frames at either size. Packet/box overlap is a routing ambiguity in the cache examples, not a claim that their text is illegible. Grey dotted wires are weaker than labels at 350px throughout. End states need no loop seam, fade-to-opening match or reset-to-initial-state treatment.

## Factual verification, separate from editorial scores

The application-managed miss/read/fill path, source-update-before-invalidation example, and lack of a general consistency guarantee agree with [Microsoft’s Cache-Aside pattern](https://learn.microsoft.com/en-gb/azure/architecture/patterns/cache-aside). This supports cache 03–05’s conceptual model; it does not validate every timing choice in the animation.

[Consumer acknowledgements and publisher confirms](https://www.rabbitmq.com/docs/confirms) distinguish publisher acceptance from consumer processing and explain acknowledgement-dependent deletion. This is why the queue lessons’ waiting/running/completed distinction is sound, while “removing” should be scoped rather than taught as universal broker behaviour.

[AWS Builders’ Library: Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) describes caller request identifiers, atomic recording with effects, and same identifier with different intent. It supports the intended idempotency design. Returning a stored result and rejecting changed payload are service-contract choices here, not a universal promise of every API called idempotent. Sources checked on the review date.

## Technical checks and truthful audio scope

All **18 MP4s** decoded through FFmpeg to null with exit 0 and no reported decode errors. The 15 lessons are each **28s, 1080 × 1920, H.264, 20fps / 560 video frames**, with AAC 44.1kHz stereo audio. Each topic therefore has 140s of new video. All 18 MP4 containers have `moov` before `mdat` (fast-start metadata placement). This verifies the files, not browser delivery, HTTP range support or website integration.

**Audio was analysed, not heard.** Full decoded-track `volumedetect` measurements and stream presence were checked. No listening session, headphone/speaker comparison, subjective sound-quality assessment, event-to-sound synchronisation verdict, narration assessment or true-peak/loudness certification is claimed. Measured maximum sample levels are safely below the review guidance’s −0.5dB threshold; this alone cannot certify perceived loudness or pleasantness. Low whole-clip means can reflect sparse effects and do not justify blindly raising gain.

| Topic | 01 peak / mean dBFS | 02 | 03 | 04 | 05 | Original peak / mean |
|---|---|---|---|---|---|---|
| Cache | −10.5 / −42.7 | −10.5 / −41.7 | −10.6 / −39.6 | −12.5 / −42.5 | −10.6 / −39.7 | −10.5 / −34.6 |
| Queues | −9.3 / −42.3 | −9.4 / −42.6 | −12.5 / −42.2 | −9.1 / −41.8 | −13.8 / −44.4 | −8.3 / −32.4 |
| Idempotency | −10.2 / −40.7 | −10.4 / −42.8 | −10.5 / −42.8 | −10.5 / −39.9 | −15.1 / −42.7 | −7.1 / −35.1 |

Only this review and reviewer-5 scratch evidence were written. No source, lesson text, comparison recommendation, media file or publishing manifest was edited.

## SHA-256 input inventory

The following hashes bind the review to the exact inputs. Relative paths are relative to the engineering-fieldnotes repository. Comparison JSONs are included for provenance; only their `recommended` field informed selection.

| Reviewed input | SHA-256 |
|---|---|
| `public/lessons/cache-aside/01.mp4` | `12791f0fa14cef2e876356bd9aefc3ea9f3c67a102752596329f154f52845881` |
| `public/lessons/cache-aside/02.mp4` | `819d08dd68b747fcc42fc09a494e08702e4e482d75830852f7528da4bcc40948` |
| `public/lessons/cache-aside/03.mp4` | `7afc22e035ce26073bba6b770d03d5efc5c81f86a8233e76ab11acfbe41af722` |
| `public/lessons/cache-aside/04.mp4` | `ad48609ac2044638bf41e66c414166d599c4f004253e6648cc8fe8a658221af0` |
| `public/lessons/cache-aside/05.mp4` | `46b94ff029a41696c564a4ba0b10ed75eb65aa3b3da40fdfab4ed16e5a76d78f` |
| `public/lessons/queues-and-backpressure/01.mp4` | `bcd81b86b0b491f0739149a27d5a84189fee5e3679f7223b392dd45f8164e97a` |
| `public/lessons/queues-and-backpressure/02.mp4` | `cef3833790a5c035df92eb5cbce24ec309dda2785462e05aa33ecd263dd24d46` |
| `public/lessons/queues-and-backpressure/03.mp4` | `73c663673c5dc8499b397e1f18fc82c41bf71b63350df7f7cb3bec7964949088` |
| `public/lessons/queues-and-backpressure/04.mp4` | `0832f09b2257435cb3086072e5a2e85c75c0582bb5cf47cd182443578f4f548b` |
| `public/lessons/queues-and-backpressure/05.mp4` | `0f64efca3bca2bbf44a970a787bf8f9273a6470adeda31b8e31ac10ba28fab3b` |
| `public/lessons/idempotency/01.mp4` | `28e5f6adf6f709605d33f32e3e0d0ff9d9707f4fae99680dc59b6b285237d62f` |
| `public/lessons/idempotency/02.mp4` | `86086519530140e0d7e11df4dbc291736070e91c6552193588b08b0d5feb2f13` |
| `public/lessons/idempotency/03.mp4` | `801a14a4dd7b3be6a3ef6b3acb0524434f74822b3ddceb383d0252f1ae4952fd` |
| `public/lessons/idempotency/04.mp4` | `49b73b12919345d7a6431c02264d0a431dd9228131625c0905f49f17d4c180d9` |
| `public/lessons/idempotency/05.mp4` | `d2af57042f033be52e5e43c45b239a088cd652f81305c3d49eed5e2be1d7091b` |
| `public/media/cache-aside/astra.mp4` | `67c0dbb92269cb3aabbaca705e21bf475a5af191006f17cd6a0abab92793e3e8` |
| `public/media/queues-and-backpressure/astra.mp4` | `f0a19b81c3661c36c06c5061ab2ef2b7c62627091d7d3cfee33f8184e94eebbf` |
| `public/media/idempotency/astra.mp4` | `9a8054364cb8b8378690d675f4100549fb9f17e389290956875584031efd5248` |
| `AGENTS.md` | `98bf6c1393f11c63b6a2d8a561284dabbfc11775c6ddd8d377c89c3aa4f87316` |
| `docs/editorial-workflow.md` | `141afe893629522ab8524a612bcc403e60d492654ac98114824ff92f81803ed3` |
| `/Users/jacobusbrink/.codex/skills/architecture-flow-video/references/review.md` | `97e863a51db0be8692b0933d74a78949de857006d2cee5aa4ff491b7fe0ac3fc` |
| `video/cache-aside/sequence/lessons.json` | `d18244c54fd33f433d39c61b98ec5efa3cf5b6520585c16dbe3334b0f50da526` |
| `video/queues-and-backpressure/sequence/lessons.json` | `71e637acbbbad5158f62e24893d8d7bdbfe9145f1f15b24face02cccc06428d2` |
| `video/idempotency/sequence/lessons.json` | `026fdd1e5834616906804341b9bc8461ed122d7b4dee55854d8accaf05cabfe4` |
| `reviews/comparisons/cache-aside.json` | `3a99d6c1d8201a49d910bea2609a0b3bc174e7a95c14a87cd978fcf692edb85d` |
| `reviews/comparisons/queues-and-backpressure.json` | `8d20236de5beb309d758033f4949727278a69e3b2b1784a500c147fd39ec3c2a` |
| `reviews/comparisons/idempotency.json` | `3a74f3c3af069e3580c12c7ee8e3ab65e4d1621e083c9592c9e0fe4b792ba207` |
| `/Users/jacobusbrink/.codex/skills/architecture-flow-video/SKILL.md` | `2ce41718eddb06dd47c1ecf54ca80306fd309d3208b8eeeb9a3d413d72496034` |

Generated evidence is reproducible from the encoded inputs; `scratch/reviewer-5/evidence-sha256.json` hashes the retained scratch files (excluding that manifest itself).


## Repair verification — 20 October 2026

This appended verification supersedes the open/closed status of the historical findings above for the **15 current hashes below**. The original scores and comparison remain a record of the earlier encodes; they have not been silently transferred to these replacements. No authoring source, storyboard or other reviewer’s scores informed this follow-up.

**Result:** the specifically requested cache, queue and idempotency repairs are visible and close the corresponding earlier contradictions. No remaining cache route collision or incorrect settled colour was found in the inspected frames. One small, separate caption/state timing discrepancy remains in queue 03 at 14–15s. Optional richer queue slots and transaction graphics are teaching suggestions, not failed repairs or newly discovered rendering faults. There was no file-access or decode blocker.

### Inspection coverage

All 15 current encodes were sampled at **0, 7, 8, 10.5, 14, 15, 16, 17.5, 21, 22, 24.5 and 27.9 seconds**. Every sample was visually inspected at 350px width. Native-size inspection covered 10.5, 14, 15, 22, 24.5 and 27.9s for every clip; additionally all sampled times for queue 02–04, opening/save beats for idempotency 02–04, and 16/17.5/21s for cache 05 and idempotency 03. These include the changed transitions, busy travelling tokens and all 15 settled endings. Native frames preserve 1080 × 1920 pixels; 350px versions are 350 × 622. This is a targeted repair pass, not a claim of continuous real-time playback or a repetition of every timestamp in the initial review.

Frames and technical evidence are retained in `scratch/reviewer-5/repaired/<topic>-<number>/` and `scratch/reviewer-5/repaired/evidence.json`. Four numbered montage rows correspond to the twelve timestamps in order. All current video hashes were checked again after inspection and matched the extraction-time hashes.

### Per-clip repair and final-state evidence

| Current clip | Changed/busy beat evidence | Settled state at 24.5 and 27.9s, native and 350px |
|---|---|---|
| Cache 01 | 14–15s narrates the database returning revision 1 and the application receiving it; r1 is still travelling at 15s. | Application revision 1 is green; database remains neutral. No pulse-induced replacement of the settled colour observed. |
| Cache 02 | 14–15s: cache hit returns r1; the database remains outside this read path. | Green HIT and application revision 1 persist; database neutral. |
| Cache 03 | 15s: short r1 token fits the outside lane without crossing the cache border. Caption now says the application receives the record “next,” removing premature “now has.” At 22s the cache-fill token is in flight. | Application and refilled revision-1 cache are green; the earlier amber MISS no longer survives the fill. |
| Cache 04 | 14–15s source revision 2 coexists with the old cache copy; at 22s r1 returns. | Source revision 2 stays green, stale cache HIT/revision 1 stays amber, application’s old revision 1 stays red. Distinct explicit states survive arrivals. |
| Cache 05 | 15s: short r2 token fits the outside return lane. At 16/17.5/21s application revision 2 is green while cache MISS remains amber until its own fill. | Refilled cache revision 2 and application revision 2 both remain green. Historical stale amber ending is closed. Concurrent-write qualification remains visible. |
| Queues 01 | 15s still shows the handoff; 16s shows A running and the waiting queue empty. Acceptance remains distinct from completion. | Worker A running stays amber and empty queue green. The running label remains authoritative; this clip does not claim completion. |
| Queues 02 | 0s explicitly says “Replay job A from its waiting state.” At 7–8s execution “starts after it arrives”; 10.5s shows running. 14–17.5s says leaving the wait queue did not finish it. | A completed is green (already visible at 21s), with empty queue green. Premature running claim and unmarked reset are closed. |
| Queues 03 | 0s explicitly introduces a new scenario with A running. B is waiting at 10.5s; C travels at 15s and joins by 16s. See the narrow residual timing note below. D travels at 22s. | B, C and D wait in a red full/backlogged queue; A remains running. This is a backlog outcome, not a completion outcome. |
| Queues 04 | Producer waits at 7–8s. A is visibly completed and green at 14–16s; B is taken afterwards (travelling at 17.5s, running at 21s). E travels at 22s. The previously missing completion ordering is now explicit. | Producer submitted is green, queue C/D/E is amber, worker B running is amber. Admission does not turn the running worker green. |
| Queues 05 | Rejection travels at 15s; producer is not accepted by 16s. From 21s the ending says the rejected job “was not admitted.” | Producer rejection stays red; full queue and busy worker remain unchanged. Historical ambiguous “silently completed” wording is closed. |
| Idempotency 01 | 14–15s says “The service saves ticket 47. The database records that effect.” This narrates the save operation while it occurs, rather than claiming the effect already exists before arrival. | Saved ticket 47 and caller’s returned ticket 47 are green. No duplicate or reverted database state appears. |
| Idempotency 02 | 7–8s narrates saving ticket 47 and warns its response will not reach the caller; it no longer says the save already succeeded while the database says no ticket. By 10.5s ticket 47 is saved. | Timed-out caller stays red while persisted ticket 47 stays green. The failure colour does not overwrite the successful database state. |
| Idempotency 03 | 0s says “New attempt” and “This time, protect the operation upfront,” adequately marking a fresh protected example. COMMIT travels at 15s; saved k7 → ticket 47 is green at 16s. At 21s: “Suppose this protected reply is lost too. Key k7 still identifies the saved ticket.” | Caller k7/release v1 remains amber, saved mapping green. The explicit hypothetical lost-reply bridge prepares clip 04; no retrospective key attachment is implied. |
| Idempotency 04 | Existing k7 lookup precedes the returned ticket at 15s; return to caller is in flight at 22s. The saved one-ticket state remains visible. | Caller ticket 47 and database one ticket are green. Replay leaves one effect. |
| Idempotency 05 | Payload mismatch is red at 14–15s; rejection follows. At 21s the close explicitly says “A new operation needs a new key. A retry keeps its original identity.” | Mismatch remains red and the stored k7/v1 identity remains unchanged. A successful k8 demonstration is unnecessary to close the wording defect. |

No new clipping or unreadable main text was found at either size in this pass. The observed arrival and settled states support the repaired colour behaviour; this is an encoded-frame finding, not an inspection of pulse implementation code.

### Disposition of historical findings

- **1 — four named premature captions: closed.** Cache 03, queues 02, idempotency 01 and 02 now narrate the event or explicitly defer completion until arrival. The separate queue 03 observation below prevents a blanket claim that every caption in all clips is perfectly synchronised.
- **2 — sequence continuity: closed.** Queue replay/new-scenario openings and idempotency’s fresh protected attempt plus lost-reply bridge provide the missing context.
- **3 — queue mechanism: completion-order defect closed; richer slots/counts optional.** A visibly completes before B is taken. Physical capacity slots and a persistent completed counter could deepen the explanation, but their absence is not an encoded rendering fault.
- **4 — richer transaction depiction: optional teaching enhancement.** The current clip explicitly instructs atomic storage and preserves the saved mapping. Separate key/payload and ticket records within a transaction boundary, plus a uniqueness/concurrency explanation, would make the mechanism more concrete. Their omission does not invalidate the repaired scenario bridge.
- **5 — cache route collision: closed** for the checked outside r1/r2 tokens at 15s, native and 350px.
- **6 — stale cache final colour: closed.** Cache 05 remains green after refill through 27.9s.
- **7 — use of settled holds: optional pacing/detail suggestion.** Keep the user’s preference for granular explanations and sufficient caption-reading time; finite endings do not need loop seams.
- **8 — closing/scope language: requested corrections closed.** Queue 02 explicitly names the wait queue; queue 05 ends on not admitted; idempotency 05 says new key. Broader broker acknowledgement semantics can remain a later enrichment rather than a rendering blocker.

### Remaining narrow timing note

**Queues 03 at 14 and 15s, both sizes:** the caption says “Two jobs now wait,” but the queue still reads “B waiting”; C is visibly travelling at 15s. By 16s the queue shows B and C. This is a small literal caption/state mismatch, independent of the optional request for physical slots. Suggested correction: defer “Two jobs now wait” until C joins, or say “C will join B in the queue” during transit. This does not reopen the verified new-scenario, A-before-B, rejection-ending or final-colour repairs. It is the only remaining concrete defect identified in this targeted verification, rather than grounds to reject all three repaired sequences wholesale.

### Technical verification and audio scope

All 15 current MP4s fully decoded with FFmpeg exit 0 and no reported decode errors. Each remains **28s, H.264, 1080 × 1920, 20fps / 560 frames**, with **AAC 44.1kHz stereo**. All have `moov` before `mdat`. SHA-256 stayed unchanged between extraction and the final check. No website delivery or browser playback certification is implied.

**Audio was analysed, not listened to.** Full-track sample-peak measurements appear below (range −15.1 to −9.0dBFS, below the −0.5dB review threshold). No subjective sound quality, perceived loudness, true-peak, or sound/event synchronisation verdict is claimed.

### Current encode hashes

Paths are relative to the repository. These replace the historical MP4 hashes only for this appended verification.

| Current encode | SHA-256 | Maximum sample level, dBFS |
|---|---|---|
| `public/lessons/cache-aside/01.mp4` | `0756da96946132dc881d7af9840c3efd94d7521364532ae9b52909a2ae7b6c4f` | -10.5 |
| `public/lessons/cache-aside/02.mp4` | `cd3c8a7cd410b580f25ad426f970de47f8d3f4a296ff64f5bae6a65c47c843e3` | -10.5 |
| `public/lessons/cache-aside/03.mp4` | `98529494cc8d6895dbff736671dc3a4ad3bc0544272c5c5b6d0460a8d5a65b1e` | -10.6 |
| `public/lessons/cache-aside/04.mp4` | `0816b2641b266870eb8f9e7cbbfa46e00a7b4abb7fcbf722fd2abadbd6b4418a` | -12.5 |
| `public/lessons/cache-aside/05.mp4` | `23c6cd920f0c3eb0734755dbf24744a7ae1ab4fbbff65ab9588b87732fdee865` | -10.6 |
| `public/lessons/queues-and-backpressure/01.mp4` | `b0ff78411d8330c661fd9dd4d61015aeaac83e13e2aad042f037edcd8443adbd` | -9.3 |
| `public/lessons/queues-and-backpressure/02.mp4` | `87b6c625598ab4f91e252ee545849ea1ace5cc99e73e57c69fef172bfb797f6e` | -9.4 |
| `public/lessons/queues-and-backpressure/03.mp4` | `066e3c70f6f2fd771c639587dd492da368aae27f5d94e2a3928bfcafc8f2e99c` | -12.5 |
| `public/lessons/queues-and-backpressure/04.mp4` | `124cdbd6038699df721bd63c7b261875749ed3b4e1f72d4746307fb73a6dd6aa` | -9.0 |
| `public/lessons/queues-and-backpressure/05.mp4` | `acfe2bc464fce5982236b27507355e8bb0d5dfbb272fd92c0aa65f39b2778546` | -13.8 |
| `public/lessons/idempotency/01.mp4` | `e059559029002ec9afa8da783f56888aa8811d97adb9c6647b1d773182774a0a` | -10.2 |
| `public/lessons/idempotency/02.mp4` | `211b5bc6bdea05e8cc901b92ac2ced0aad45aa2e5d29797c15d5cb10ff019c34` | -10.4 |
| `public/lessons/idempotency/03.mp4` | `c226114470ccc4624b86d22d653edf12f1c36e76a486ea259a026ad91bff4817` | -10.5 |
| `public/lessons/idempotency/04.mp4` | `b9d818815d9db9b00481ff562b37fe790ec7b4d35458cd2657be26bf322278de` | -10.5 |
| `public/lessons/idempotency/05.mp4` | `d9928043984adafbaf5357f6488674cb03193ef13e2902d0ffe73040cd8c3336` | -15.1 |

Only this review and reviewer-5 scratch evidence were written. No source or media edits were made. The original baseline comparison was not rerun; the append verifies the repaired lesson encodes against the stated defects.


## Queue 03 caption closure — 20 October 2026

The targeted renderer log confirmed `Rendered topic queues-and-backpressure`; 01, 02, 04 and 05 were reported cached. SHA-256 comparison against the preceding 15-file verification independently confirmed that **only queues-and-backpressure/03.mp4 changed**; the other 14 reviewed encodes retain their recorded hashes.

Inspected encoded frames at **14, 15, 16 and 27.9s**, individually at native 1080 × 1920 and at 350px width:

- **14s:** queue reads B waiting; caption now says “C will join B in the queue.” It no longer prematurely asserts two waiting jobs.
- **15s:** C is visibly in transit while B waits. The prospective caption correctly introduces that arrival.
- **16s:** the queue reads B, C waiting. The same introductory caption remains over the completed arrival beat; it makes no premature count claim. No clipping or legibility regression was observed at either size.
- **Final sampled frame, 27.9s:** B, C and D remain waiting in the red backlog queue; A remains running with a neutral worker border. The existing ending and explicit state colours are preserved.

**Verdict: the residual queue 03 premature-count defect is closed.** This supersedes the preceding “Remaining narrow timing note.” All concrete defects identified in the targeted repair verification are now closed for the recorded current hashes; optional richer slot/transaction visuals remain separate teaching suggestions, not blockers. This is a focused caption/ending check, not a new full comparative review.

| Current encode | SHA-256 |
|---|---|
| `public/lessons/queues-and-backpressure/03.mp4` | `767678b8809e8410a6f5538e333a84faf55da1022ea4b8417cadcacfbb95272c` |

The file hash remained stable through inspection. Full FFmpeg decode completed with exit 0 and no reported errors. Audio was not listened to or newly assessed for loudness/synchronisation in this focused pass. Evidence is retained under `scratch/reviewer-5/queue03-caption-final/`. Only this review append and reviewer-5 scratch were written; no source or media edits were made.
