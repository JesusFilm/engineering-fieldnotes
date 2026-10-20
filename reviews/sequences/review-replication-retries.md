# Fresh comparative teaching and defect review

Reviewed 2026-10-20. Reviewer 6. Scope: replication-and-consistency and timeouts-and-retries only.

**Recommendation: revise both sequences before replacing the originals.** Keep the original recommended cuts as integrated recaps. The new sequences are more approachable and explain more terms, but their additional runtime does not consistently add visible causal steps. Replication is the stronger expansion. Retries has two substantial teaching gaps: jitter is described without multiple callers, and the whole-operation deadline loses the original's visible budget and enforcement mechanism.

No input/access/decode blocker prevented this review. The teaching blockers below are recommendations against promotion, not changes to publication status. No source or publication metadata was edited.

## Review boundary and evidence

Read repository AGENTS.md, docs/editorial-workflow.md, and the architecture-flow-video skill/review guidance. User requirements take precedence: captions are welcome; these are finite lessons, so loop continuity is not a criterion; this is review only.

Before visual review, extracted only `recommended` from each comparison JSON: both were `astra`. No prior scores, authoring source, or storyboards were consulted. Read the two intended `sequence/lessons.json` files. The assessment distinguishes what their prose explains from what the encoded videos demonstrate.

All ten new MP4s were inspected at 0, 3.5, 10.5, 17.5, 24.5 and 27.9 seconds at native 1080×1920 and at exactly 350 pixels wide. Each also received a half-second contact-sheet scan across its duration and an additional native/mobile busy-frame check. Contact sheets establish event order, not frame-perfect timing; ranges below are approximate unless tied to a named still. This was encoded-frame inspection, not continuous real-time playback. All twelve MP4s underwent full audiovisual decoding and audio-level analysis. Audio was **not listened to**; perceived timbre, audibility, mix quality and audiovisual synchronization are unverified. Browser playback was not tested.

Evidence lives in [scratch/reviewer-6](scratch/reviewer-6/). Per-video directories contain timestamped native PNGs, `-350.png` versions, `phone-0.png` and `phone-1.png` (three actual 350px frames each), `scan.jpg`, and `busy.png`/`busy-350.png`. Early wider strips were superseded for exact phone-size assessment by those three-frame sheets. `evidence.json` records original hashes, probes, decode results and levels. Spectrograms were generated but not used to make listening claims.

| Topic/clip | Required six times, native +350px | Additional busy time, native +350px |
|---|---|---|
| Replication 01 | All inspected | 15.0 |
| Replication 02 | All inspected | 15.0 |
| Replication 03 | All inspected | 1.0 |
| Replication 04 | All inspected | 1.0 |
| Replication 05 | All inspected | 22.0 |
| Retries 01 | All inspected | 15.0 |
| Retries 02 | All inspected | 14.0 |
| Retries 03 | All inspected | 22.0 |
| Retries 04 | All inspected | 22.0 |
| Retries 05 | All inspected | 16.5; also required 17.5 |

Originals were scanned across their full durations; two-second samples and final holds supported comparison. Additional detailed native/350px checks: replication 12,18,22s; retries 14,20,22s.

## Scores

Scale: 1 = fails the purpose; 2 = major weakness; 3 = usable with meaningful gaps; 4 = strong with limited issues; 5 = exceptionally clear within stated scope. Accuracy scores assess the represented model, not coverage of every production caveat. Legibility includes route attribution and phone-size reading. Scores are fresh judgments, not inherited comparison scores.

| Encoded lesson | Causal clarity | Accuracy | Pacing | Legibility |
|---|---:|---:|---:|---:|
| Replication 01 — Keep another copy | 4 | 4 | 3 | 4 |
| Replication 02 — A replica can lag | 4 | 5 | 3 | 3 |
| Replication 03 — Check the revision you need | 3 | 4 | 3 | 3 |
| Replication 04 — Received is not applied | 3 | 4 | 3 | 4 |
| Replication 05 — Failover can lose data | 3 | 4 | 3 | 3 |
| Retries 01 — Wait for a response | 3 | 3 | 2 | 4 |
| Retries 02 — A timeout is not a rollback | 4 | 4 | 3 | 4 |
| Retries 03 — Retry only when safe | 3 | 4 | 3 | 4 |
| Retries 04 — Back off before retrying | 2 | 4 | 2 | 4 |
| Retries 05 — Bound the whole operation | 3 | 4 | 2 | 4 |
| Original replication/astra | 4 | 4 | 4 | 4 |
| Original retries/astra | 4 | 4 | 4 | 4 |

Simple clip-score means, not independent sequence scores: replication **3.4 / 4.2 / 3.0 / 3.4**; retries **3.0 / 3.8 / 2.4 / 4.0**. These do not imply that the original covers the expanded syllabus. Each new sequence is 140 seconds, versus 30 and 26 seconds respectively.

## Replication: comparison and lesson findings

The original keeps an integrated chain visible: write and acknowledgment around 5–8s, stale verification around 10.5–15.5s, primary verification around 16–19s, then replica catch-up around 21–24s. The expected and observed versions are shown together, and `Writes: 1` makes verification without another write concrete. At 18s the mismatch remains visible while v8 returns; at 22s the successful comparison and still-lagging replica coexist. Its secondary gray text is smaller at 350px, but the large version numbers carry the argument.

The expansion adds useful explanations of copying, stale successful reads, receive/replay separation and failure before replication. Captions improve novice access. However, clips 01–03 reset the situation rather than preserving one acknowledged write across the sequence; the viewer must connect the examples. The new 04–05 are genuine additions, not reasons to discard the original recap.

- **01, 0–7s and 9–14s:** copy roles and the new primary version are understandable, but largely static holds consume much of the lesson. At 15s `CHANGE v8` visibly travels toward a replica still on v7, which is a useful cause/effect step. Around 19–21s the application bar looks complete before the replica changes to v8. Label what the bar measures and align its completion with query-visible state, or explicitly show the remaining commit/replay step. No claim that copying is instantaneous is made.
- **02, 7–16s:** request and old revision return clearly establish that a successful read may be stale. At 17.5s primary v8, replica v7 and observed v7 remain visible together: the strongest new replication comparison. At exactly 15s, however, the returning `REVISION 7` chip overlaps the primary's right outline. It does not clip its text, but can look associated with the wrong node, especially at 350px. The final 21–28s repeats the already-visible distinction without a new decision.
- **03, 1–3.5s and 14–17.5s:** the returning v7 and later v8 support the stated verification rule. Replacing `expects revision 8` with `revision mismatch`, then `revision matched`, removes the persistent numerical comparison. The original's `v7 ≠ v8` / `v8 = v8` is more self-explanatory. The response at 1s also overlaps the primary outline. The fresh-primary-read qualification is useful; retain the intended text's snapshot/concurrent-writer caveat rather than presenting primary routing as a universal proof of business correctness.
- **04, 3.5–10.5s:** `received v8` is replaced by `query sees v7`, hiding that both statements can be true simultaneously. At 17.5s replay progress advances; at 24.5s query-visible v8 is clear. This teaches a valuable distinction but currently depends on memory and captions. Show separate received/replayed positions and a fresh query. The final instruction to check acknowledgment meaning is accurate but no ACK or acknowledgment mode is demonstrated.
- **05, 0–10.5s:** acknowledgment, primary failure and standby v7 form a plausible loss window. At 17.5–27.9s the promoted node still has the main heading `STANDBY` while its subtitle says `new primary: v7`. That is a role-label inconsistency; label the node by identity separately from its changing role. At 22s the v7 reply again crosses the unavailable primary outline, and no read request establishes the reply. Add a visible unshipped change and read from the promoted node. The JSON correctly scopes this to asynchronous replication; putting that short qualification on-frame would make the exported clip more self-contained.

**Comparative decision:** preserve the granular sequence, fix route attribution and state comparisons, and use the original as an optional final worked example. Neither format alone currently provides both the expanded coverage and the original's integrated causal account.

## Retries: comparison and lesson findings

The original combines a normal result with a bounded slow path. Around 13–15s, backoff consumes the shared budget (14s explicitly shows 6s left). At 20s the budget reaches `0 s · CLOSED`; at 22s the caller knows only `STATUS UNKNOWN`. The later repeat is visibly blocked rather than sent to CI. That connects policy, elapsed time and enforcement. Its compact labels and rapid normal-to-slow reset require more prior knowledge than the new captions.

The new sequence adds explicit non-rollback semantics, safe repetition and jitter terminology. Those are worthwhile. But making each lesson 28 seconds does not by itself make the mechanisms more granular: the new jitter clip has no population of callers, and the deadline clip substitutes changing text for the original shared-budget display.

- **01, 0–7s:** the request arrives near 2s but the remote service stays `ready` through 3.5s; processing begins only at the next seven-second beat. More seriously, **17.5–27.9s** shows the caller's `status known` alongside remote `processing` and a full bar, after `BUILD PASSED` has returned. An implementation could have post-response work, but none is established here. In this simple request-response model the stale state muddies the contrast with lesson 02. Change it to `response sent`/`request complete`, and identify the progress as the status request rather than the CI build. There is no visible attempt timer to support the final timeout statement.
- **02, 7–17.5s:** the caller times out while remote progress continues, making non-cancellation concrete. The final unknown outcome correctly avoids inventing a failed build. The bar is full while still labeled processing at 24.5–27.9s; an indeterminate work indicator would avoid implying completion that the caller cannot observe. A separate caller timer would clarify what expired.
- **03, 7–14s:** `safe read` and the caption assert the safety check; nothing shows the absence of side effects or the contrasted unsafe operation. The bounded second attempt around 14–16s and successful reply around 21–23s are useful. Keep the successful alternative, but make the decision tangible with a small read-only contract label. Do not imply that an arbitrary idempotency key alone makes writes safe; the intended takeaway correctly requires server support.
- **04, 14–21s — teaching blocker:** only one caller exists when captions claim jitter spreads callers' retry times. No aligned retries, differing sampled delays, or spread of arrivals is visible. At 17.5s the bar is already full and merely relabeled `sampled delay`; the video teaches the word, not its effect. At 22s attempt 2 travels while the caller still says sampled delay. Replace this beat with three callers that first coincide, then retry at staggered times. Keep the overloaded service unresolved: jitter is not a recovery guarantee.
- **05, 7–21s — comparative teaching blocker:** the arithmetic is correct: 12 minus 5 leaves 7, then a two-second delay leaves at most 5. Yet there is no shared budget bar, visible consumption during backoff, explicit zero, or visible stopping gate. At 24.5s `stop: unknown` appears and the caption promises attempt history without showing it. Preserve the readable arithmetic and restore a segmented total-budget timeline plus an attempt history. The video's 28 seconds need not equal the policy's 12 seconds; label the timing as illustrative or show a separate scenario clock so seven-second presentation beats do not stand in for policy time.

**Comparative decision:** retain the original as the stronger complete budget demonstration. Revise 01's stale state and materially rebuild the visual argument in 04–05 before using the sequence as its replacement. Retain 02 and 03 as explanatory modules.

## Ranked changes

Sizes estimate editorial effort, not implementation inspection. None were implemented.

| Rank | Size | Timestamp / observation | Proposed change | Teaching effect |
|---|---|---|---|---|
| 1 | M | Retries 04,14–21: one caller for a multi-caller claim | Show three aligned retry schedules, then different sampled waits and staggered arrivals | Makes jitter's causal effect visible |
| 2 | M | Retries 05,7–28: budget and stop exist only as text | Restore shared 12s timeline, consumed 5s/2s segments, remaining cap, zero and blocked next attempt; show history | Demonstrates total-budget enforcement, not just subtraction |
| 3 | S | Retries 01,17.5–27.9: still processing after result | Finish the status request visibly; distinguish it from the build | Restores normal/timeout contrast |
| 4 | S | Replication 02@15,03@1,05@22: response overlaps primary outline | Reserve a clear reply lane or shorten/reposition the chip without shrinking text | Prevents wrong-source attribution at phone size |
| 5 | S | Replication 03,3.5–28: comparison replaced by verdict | Retain expected and observed revisions side by side | Viewer can verify the decision independently |
| 6 | M | Replication 04,3.5–21: receive and replay replace each other | Separate received/replayed values and show fresh query visibility; identify ACK scope | Makes simultaneous states and acknowledgment semantics concrete |
| 7 | M | Replication 05,7–28: lost shipment and promotion mostly captioned | Show unshipped v8, rename role on promotion, add async label and explicit read | Distinguishes lag from loss in the promoted database |
| 8 | M | Both sequences, especially static 0–7 and 21–28 holds | Allocate time by causal step; use saved time for missing mechanisms and concise final holds | Adds granularity without stretching simple states; preserves captions and finite endings |

## Factual verification, separate from teaching judgment

Primary documentation checked 2026-10-20. These are bounded conceptual checks, not a production-system certification.

- **Replication 01–02 and 05:** asynchronous streaming permits lag; failover can lose changes not replicated to the standby. The example is valid under its stated async assumptions. A stale successful read alone does not prove a write failed. [PostgreSQL log-shipping and streaming replication](https://www.postgresql.org/docs/16/warm-standby.html).
- **Replication 04:** receipt, durable flush and replay/query visibility are distinct. With configured synchronous standbys, `remote_apply` waits for application and visibility, while other acknowledgment modes have different guarantees. The intended qualification is sound; the video could expose it more directly. [PostgreSQL synchronous_commit modes](https://www.postgresql.org/docs/16/runtime-config-wal.html#GUC-SYNCHRONOUS-COMMIT).
- **Retries 02–04:** timeout does not establish that remote side effects never occurred; safe repetition depends on operation semantics. Backoff reduces retry pressure, and jitter spreads synchronized retries. Those claims support the captions but do not compensate for the missing jitter demonstration. [AWS Builders' Library: timeouts, retries and backoff with jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/).
- **Retries 05:** independently checked arithmetic is correct. Real overhead can reduce the available second-attempt time, so `at most 5s` is appropriate. The exact 12/5/2 policy is illustrative, not a general recommendation.

No unsupported claim of universal loss on failover, guaranteed recovery through retry, or automatic rollback was found in the intended text. The primary accuracy concerns are ambiguous on-screen state and omitted visible qualifications, not reversed technical principles.

## Encoding and audio evidence

All ten new clips: 1080×1920, H.264/yuv420p, 20fps, 560 frames, 28.000s; AAC stereo at 44.1kHz with matching 28.000s stream duration. Originals: 30fps, 30.000s replication and 26.000s retries, with matching audio durations. All twelve fully decoded without reported errors. Each has `moov` before `mdat`, supporting progressive download. These checks do not certify browser behavior or absence of every transient visual defect.

FFmpeg volumedetect over the complete decoded audio yielded the following dBFS measurements. Means include silence; they are not perceived-loudness/LUFS measurements. No measured sample peak approaches clipping. Do not interpret lower levels as proof of inaudibility.

| Clip | Mean | Maximum |
|---|---:|---:|
| Replication 01 | -41.6 | -10.5 |
| Replication 02 | -44.2 | -12.5 |
| Replication 03 | -41.5 | -10.6 |
| Replication 04 | -44.0 | -12.4 |
| Replication 05 | -46.7 | -13.6 |
| Retries 01 | -42.6 | -10.5 |
| Retries 02 | -53.3 | -21.5 |
| Retries 03 | -41.6 | -10.4 |
| Retries 04 | -46.4 | -15.3 |
| Retries 05 | -43.9 | -15.1 |
| Original replication | -35.1 | -6.4 |
| Original retries | -33.7 | -5.6 |

Audio-stream presence and nonzero signal are confirmed for every file. Listening is still needed to assess event synchronization, sound meaning and consistency across lessons. The quality scores above do not include an audio-listening score.

## SHA-256 input manifest

Hashes bind this review to the encoded media and intended lesson text. Comparison files are hashed as opaque bytes; only their recommended fields were used. Guidance hashes record the review protocol. Rechecked media/text hashes at completion against the initial evidence record.

| File | SHA-256 |
|---|---|
| `public/lessons/replication-and-consistency/01.mp4` | `d7ff1b01e92eb49e34a92f88d568fa5931fbdd27ccfd789bc530025045fae15c` |
| `public/lessons/replication-and-consistency/02.mp4` | `34a63d531b16f8da14ae750f5510b0344ace3f8db090159a675fcdd35f50e8a9` |
| `public/lessons/replication-and-consistency/03.mp4` | `bca60d5d512b743c13139eb41ccae925b73ac59f0239ad87a2a0ffdad5e3cf82` |
| `public/lessons/replication-and-consistency/04.mp4` | `f418a0239791248caf921004feda534d42e3685ad2ac87ddc99a630f4e5469fd` |
| `public/lessons/replication-and-consistency/05.mp4` | `2d0fdf2e6497e65812d6a0c65aa20b56a48f9093c70658e6e0ade546b84bb5b2` |
| `public/lessons/timeouts-and-retries/01.mp4` | `cd971d109153a5de57185ff30124dd10d208f6934fada1cfcb326af75db4f91f` |
| `public/lessons/timeouts-and-retries/02.mp4` | `2bb15ce2329de8d06797a1298b29eb5a3bf39e8c1eba11e1d70217e36dba5283` |
| `public/lessons/timeouts-and-retries/03.mp4` | `3798b6a1c417691a02910a541ab358d1a47856266e70f20e889c21f31dd66c07` |
| `public/lessons/timeouts-and-retries/04.mp4` | `79c319d559959bfae2080c18dd394e0b55fe61b1cc8c4b5e45722ee4c971a94d` |
| `public/lessons/timeouts-and-retries/05.mp4` | `e5010f6830fdf5e0598af545fc8241ac912fc9c2681f56ff269c83e6fdd11689` |
| `public/media/replication-and-consistency/astra.mp4` | `89c73865b893097c6691f8f9fd87cd4a5510921705096952ac0cd7abea34d441` |
| `public/media/timeouts-and-retries/astra.mp4` | `4b44dbe3e40a7e2c82f86a7f3b08524463e78629987c9abaed28d9860751c0db` |
| `video/replication-and-consistency/sequence/lessons.json` | `793608a7a9d227c23cb1aa0e8af2b952b49b943b014aee613336af446b4e3968` |
| `video/timeouts-and-retries/sequence/lessons.json` | `9d1c5ca37e63ebac43d9c71dbf760cae801ace336c89cf841b5625ff59ec0650` |
| `reviews/comparisons/replication-and-consistency.json` | `ff86758cee2d7950a0aebf9742939855cce5552e1b429513b604bcd935525589` |
| `reviews/comparisons/timeouts-and-retries.json` | `593987a5d832d628796c7f763a02ae9267275864f3f3f5cc32a5b1fdaf1267ae` |
| `AGENTS.md` | `98bf6c1393f11c63b6a2d8a561284dabbfc11775c6ddd8d377c89c3aa4f87316` |
| `docs/editorial-workflow.md` | `141afe893629522ab8524a612bcc403e60d492654ac98114824ff92f81803ed3` |
| `/Users/jacobusbrink/.codex/skills/architecture-flow-video/SKILL.md` | `2ce41718eddb06dd47c1ecf54ca80306fd309d3208b8eeeb9a3d413d72496034` |
| `/Users/jacobusbrink/.codex/skills/architecture-flow-video/references/review.md` | `97e863a51db0be8692b0933d74a78949de857006d2cee5aa4ff491b7fe0ac3fc` |

Derived evidence hashes are in [scratch-manifest.sha256](scratch/reviewer-6/scratch-manifest.sha256); that manifest excludes itself.


## Repair verification — 20 October 2026

**Verdict: the identified repair blockers are resolved in the hashes below. No remaining blocking teaching or visual defect was found in the inspected scope.** This appendix supersedes the earlier repair verdict for these encodes; the original review remains historical evidence. The repaired sequences now support the requested granular teaching, with the original cuts still useful as compact recaps. Original comparison videos were not re-reviewed in this repair pass.

### Scope and evidence

Reviewed all ten current encoded MP4s and both intended `lessons.json` files, without authoring source or storyboards. Inspected half-second contact-sheet scans across every clip, then changed/busy beats and every 27.9s final state at native 1080×1920 and actual 350px width. Detailed native/350 samples: replication 01 at 10.5/17.5/27.9; 02 at 15/17.5/27.9; 03 at 1/3.5/17.5/27.9; 04 at 10.5/17.5/27.9; 05 at 0/17.5/22/25/27.9. Retries 01 at 14/27.9; 02 at 7/17.5/27.9; 03 at 21/27.9; 04 at 10.5/15/17/19/27.9; 05 at 0/7/14/21/23/24/27.9. Timing intervals below also use the half-second scans, not a claim to have visually examined every encoded frame. This is targeted repair verification, not a repeat of the original complete frame schedule.

All ten fully decode without reported errors; each is 28s, 20fps, H.264/yuv420p with AAC audio and `moov` before `mdat`. All twelve input hashes were rechecked unchanged before writing. Evidence, extracted frames and scan sheets: `scratch/reviewer-6/repair/`.

**Audio scope:** stream/level analysis only; I did not listen. Across these ten encodes, measured maximum levels range from −21.5 to −10.2 dBFS. This establishes signal presence and measured headroom, not perceived quality, cue synchronisation or absence of audible artifacts.

### Repair outcomes and current scores

Scores are 1–5, higher better: causal clarity / accuracy / pacing / legibility. Legibility incorporates the 350px inspection. These are finite lessons; captions and non-looping endings are acceptable.

| Clip | Scores | Encoded evidence and result |
|---|---|---|
| Replication 01 | 4 / 4 / 3 / 4 | Primary becomes v8 before replica; apply progress precedes replica v8 at 21s. At 27.9s both numeric revisions remain visible. No regression found. |
| Replication 02 | 4 / 4 / 3 / 4 | At 15s the short v7 response travels beside, clear of, the primary box. At 17.5–27.9s observed v7 coexists with primary v8 and replica v7. Stale-read comparison is retained. |
| Replication 03 | 4 / 4 / 3 / 4 | At 1s the v7 return clears the primary outline. At 3.5s the application retains “v7 ≠ expected v8”; at 17.5s and the end it retains “v8 = expected v8”. Numeric verification replaces the earlier disappearing comparison. |
| Replication 04 | 4 / 4 / 3 / 4 | At 10.5/17.5s “received v8; reads v7” coexists with subsequent apply progress; final “query sees v8” follows application. Receipt and readable state are now distinct. |
| Replication 05 | 4 / 4 / 3 / 4 | Opening explicitly scopes asynchronous replication. NODE B retains its identity and becomes “new primary: v7” by 14s. READ travels toward B at 21–23s (clear at 22s), then v7 returns at 24–26s (clear at 25s); final application reports v8 missing. Promotion and request-before-reply defects resolved. |
| Retries 01 | 4 / 4 / 3 / 4 | At 14s remote changes to “response sent”; reply travel precedes caller “status known” around 16s. Final remote state remains response sent. Earlier processing-after-response inconsistency resolved. |
| Retries 02 | 4 / 5 / 4 / 4 | Caller times out at 7s while remote progress continues through 17.5s and 27.9s. Final caller is unknown and remote still processing with an incomplete bar. Ongoing work is demonstrated, without inventing completion. |
| Retries 03 | 3 / 4 / 3 / 4 | Safe-read qualification precedes retry; remote is “response sent” at 21s before caller knows the result around 23s. Final states agree. Write-contract caveat remains visible. |
| Retries 04 | 4 / 4 / 4 / 4 | Three identified callers now have different delays. A travels 14–16s, B 16–18s, C 18–20s; inspected moving packets at 15/17/19s. Final each has two attempts and service remains overloaded. Staggered arrivals demonstrate jitter's intended effect without promising recovery. |
| Retries 05 | 4 / 4 / 3 / 4 | Budget is 12s at 0s, 7s at 7s, 5s at 14s, then 0s/CLOSED at 21s. Proposed TRY 3 approaches the gate at 23s, is explicitly blocked at 24s, and never travels onward to the remote service. Caller retains “2 timeouts; unknown” through 27.9s. Enforcement blocker resolved. |

### Remaining faults versus optional refinements

**Actual remaining blocking faults: none identified.** The budget lesson now demonstrates enforcement without a budget bar: the arithmetic accounts for the first 5-second timeout, 2-second backoff and remaining 5-second attempt; the zero-budget gate visibly prevents dispatch of the next remote attempt. TRY 3 is an admission proposal stopped at the gate, not a third completed remote call. A bar would be redundant reinforcement, not a missing correctness requirement.

Optional improvements, not release blockers:

- Replication 05: give the final v8-missing result more than roughly two seconds, or shorten an earlier static hold. Showing the unreplicated v8 artifact would strengthen the loss explanation; the explicit async scope and retained v7 already make this scenario coherent.
- Replication 04: an actual post-apply query packet could strengthen the “query sees v8” demonstration. The coexistence of received v8/readable v7 already fixes the misleading state simplification.
- Retries 04: slightly brighter dotted routes would help at 350px. A synchronized-arrival comparison could further explain the benefit; three independently staggered packets already establish it.
- Retries 05: label scenario time versus slowed animation time inside the encode. The stated numeric example is coherent, but the equal seven-second teaching beats do not represent equal policy-time intervals. This is a pacing/interpretation refinement, not failed budget enforcement.
- Across the simpler clips, redistribute static holds toward decisions and outcomes. The present readable captions support the requested granular explanation; extra motion or caption removal is unnecessary.

### Current SHA-256 identities

Paths are relative to the repository root. These hashes identify the repaired artifacts to which this appendix applies.

| Reviewed input | SHA-256 |
|---|---|
| `public/lessons/replication-and-consistency/01.mp4` | `4ce425123f751a43c997807afc050d2e55a3df402f854d1e930687042d3e5312` |
| `public/lessons/replication-and-consistency/02.mp4` | `cdb1a648d6f0253d1b2ce724765ed90fdbc6c475292770f33a249897a25e3d76` |
| `public/lessons/replication-and-consistency/03.mp4` | `38bd195382e4fbcae21d577ff1ed864ae79a30a1fe187c5992d0ef3de7d2febd` |
| `public/lessons/replication-and-consistency/04.mp4` | `b0d7f305a7d51d9b4f44b48df419d888f4e54042e07dbceeeb283e03a37face2` |
| `public/lessons/replication-and-consistency/05.mp4` | `c1c4b2e6cae6e09022511c51602c9d98a93f0c5de505a17a145def1422bdab83` |
| `public/lessons/timeouts-and-retries/01.mp4` | `b3d88503c954286e15774cbced559ca9faea80bfa220de16745b3b9da894bee7` |
| `public/lessons/timeouts-and-retries/02.mp4` | `171bb488f82b6b1f0e9ddea8534ba13d8dbc5faffc605f26cdd0a309fa0fc832` |
| `public/lessons/timeouts-and-retries/03.mp4` | `dcc1a557990be3d25291ddeacd973bace50612c398bf1b2dd8d0cb85a94c2b41` |
| `public/lessons/timeouts-and-retries/04.mp4` | `a89d6e599fa7bbe43e50bf0952b9f528a0a7f6c2246604dd2fa37acf92c70833` |
| `public/lessons/timeouts-and-retries/05.mp4` | `c15a46b71482808105ea694b65b1de50703aa460ecad233f39c2ce77f989eb99` |
| `video/replication-and-consistency/sequence/lessons.json` | `9fcded1be93cf4e57729af64cee324af0ee97a3fa2ec8cf364fbf65a98b8bd96` |
| `video/timeouts-and-retries/sequence/lessons.json` | `7d188fda6e94826f2d687d5186c3ab77edd20cd31422911a322644201666ec35` |
