> Historical author record for the original cut. The current comparative revision is documented in `../../../reviews/comparisons/context-engineering/after.md` and `variant.json`; its timing counters and verdicts were removed. Original text below is retained for provenance.

# Context engineering — just-in-time retrieval (fable cut)

**Learning objective.** After one watch, an engineer adopting agents can state: pre-loading the whole repository into the context dilutes it with irrelevant and stale material and raises cost and latency, so an agent should load the failing trace and the one module it names, then retrieve further files just in time, when the model asks for them.

**Relation to the baseline.** The baseline cut teaches compaction inside one context window: repeated logs are summarised so a constraint and the trace survive, and the freed space receives a retrieved caller. This cut teaches the step before that one — what to put in at all. It contrasts two ways of assembling the same context for the same task, and its failure is dilution and staleness rather than overflow. The example is a repository of five files, one of them an outdated incident note, rather than a stream of logs.

**Mechanism.** One task (`fix null crash`), one trace (`api.ts:42 null`), one repository, one context store with a 16k-token bar, one model with a latency badge and an output badge. Pass A loads everything; the bar goes red, the model works for 41 s, leans on `notes.md (old)` and proposes `edit db.ts`. Pass B loads the trace, then only `api.ts`; the model asks for `users.ts`, which is fetched on demand; the model answers `fix api.ts:42` in 9 s at 7k tokens.

**Evidence.** Anthropic, "Effective context engineering for AI agents" (read 19 October 2026): context engineering seeks the smallest set of high-signal tokens; "context rot" reduces recall as tokens accumulate; just-in-time retrieval keeps lightweight references (paths, queries) and loads material when it becomes relevant; pre-loaded context can go stale in a changing codebase. Chroma, "Context Rot: How Increasing Input Tokens Impacts LLM Performance" (14 July 2025, 18 models; read 19 October 2026): performance degrades with input length and even a single distractor lowers retrieval accuracy, more so when it resembles the target. The concept source for this library states the same "why": more input can add irrelevant or stale material while increasing cost and latency.

**Actors and pitches.** Each repository file has its own note: api.ts C5, users.ts D5, db.ts E5, auth.ts F5, notes.md G5; the trace is A4. A file leaving plays a quiet `send` at its note and landing plays `store` at the same note, so pass A is an audible rising scale (A4 C D E F G) and pass B is A4 C … D. The model receives at `arrive` C5 and works at low `work` ticks. The over-full bar is a dull `thump`. Reading the stale note is a scene-defined sour slide (`stale`, Eb5 falling). The wrong answer is a scene-defined `wrong` (square buzz falling from E4 over a 60 Hz sub, loudest cue). The model's request is a bright `send` E6 and the repository answering is `hit` E6. The right answer is `chime` C6.

Times are playback seconds in the encoded file (authored at speed 1, played at 0.9).

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.0–0.7 | Stage fades in | Repository (5 files), Trace, Context with `task: fix null crash`, bar 1k/16k green, Model idle | — |
| 1.1–1.7 | Chip `api.ts:42` Trace → Context | Row 1 `trace: api.ts:42`, bar 2k | send A4, store A4 |
| 1.9–4.5 | Five chips, one per file, Repository → Context every 0.5 s; each repository row flashes as it leaves | Rows 2–6 fill; bar 4k → 14k, green → orange → red | send + store at C5 D5 E5 F5 G5 |
| 4.6 | Context store turns red and glows | Over 80% of the window | thump E4 |
| 5.4–6.0 | Envelope Context → Model | Model lit, latency badge starts | send C6, arrive C5 |
| 6.1–9.3 | Slow work ticks; latency 5 s → 14 s → 27 s → 41 s (orange) | At 7.3 s `notes.md (old)` flares orange and stays | work ×11, stale Eb5 |
| 9.3–9.8 | Chip `edit db.ts` Model → output badge | Badge pops red, red ripple, × mark, Model turns red and jolts | send E5, wrong (loudest) |
| 9.8–12.0 | Hold | The wrong edit sits beside 41 s and a red 14k bar | — |
| 12.0 | Grey ripple over Context; rows 1–6 fade, badges shrink away | Only the task remains; bar 1k green; Model grey | poof |
| 13.2–13.8 | Chip `api.ts:42` Trace → Context | Row 1 trace, green; bar 2k | send A4, store A4 |
| 14.3–15.4 | Repository row `api.ts` turns green with a ripple; chip `api.ts` → Context | Row 2 `api.ts` green; bar 4k | ack C6, send C5, store C5 |
| 16.1–17.4 | Envelope Context → Model; short work; latency 2 s green | Model lit | send C6, arrive C5, work ×3 |
| 17.7–18.6 | Chip `users.ts?` Model → Context, then Context → Repository corner | Repository row `users.ts` turns green with a ripple | send E6, hit E6 |
| 18.9–19.6 | Chip `users.ts` Repository → Context | Row 3 `users.ts` green; bar 7k | send D5, store D5 |
| 20.1–21.4 | Envelope Context → Model; short work; latency 6 s | Model lit | send C6, arrive C5, work ×3 |
| 21.7–22.2 | Latency 9 s; chip `fix api.ts:42` Model → output badge | Badge pops green, green ripple, check mark, Model turns green | send E6, chime C6 |
| 22.2–24.7 | Hold | Resolved state registers: 7k tokens, 9 s, correct fix | — |
| 24.7–25.8 | Stage fades to black | Last frame equals the first | — |

