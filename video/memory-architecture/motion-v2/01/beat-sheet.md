# Lesson 01 — Current and saved context (motion-v2 cut 01)

**Mechanism.** A saved record reaches a model call only when the application retrieves a copy and includes it in that call's input. The stored record stays saved, and the earlier call is not changed.

**Scope.** Lesson 01 only (`video/memory-architecture/sequence/lessons.json`, item 1). Revisions, write policy, scope choice, staleness, ranking, and generated answers are excluded. The example values come from the concept's billing example (`npm test`, the note that later lessons revisit as r1). This cut shows no revision.

## Plan decisions (neutral A/B)

| Decision | Taken from | Reason |
|---|---|---|
| Two calls side by side above one store, with time running left to right | B | Call 1's missing value and Call 2's included copy stay visible together, so no tab revisit is needed |
| Input card with `preparing` → `supplied` status | A | Separates inclusion from supply; Call 2 waits as `preparing` with the copy already in place |
| Two-step copy (store → application → Call 2) with a hold between | A | Retrieval and inclusion read as separate application actions |
| One persistent copy object instead of a packet | Both, combined | The viewer tracks one thing; the original row never empties |
| Three store rows, one selected by key | B | "Other records exist"; the application reads one by key, with no ranking shown |
| No wire from store to any call or model; the read wire only lights during the read | A, B | Storage alone never links to a call |
| `npm test` (no revision tag) | B value, A scope | Matches later lessons' saved note while keeping revisions out of lesson 01 |
| Supply cue identical for Call 1 and Call 2 (send C6 → deliver C5) | A | One sound means "a call received its input" |
| Plan A's tab revisit and Plan B's `sees N items` / chime | dropped | Both columns stay visible, and the count would be an invented unit |

## Stage (1080 × 1920)

Title `Memory` / `CURRENT AND SAVED CONTEXT` (subtitle 40px). Column headers `Call 1 · now` (x 300) and `Call 2 · later` (x 780), 50px, at y 492. Model boxes at y 600. Input cards 420 × 360 centered at y 910, with rows `task / test billing` and `test cmd / —`. Application panel 900 × 140 at y 1240. Memory store panel 900 × 320 at y 1575 with rows `billing.test_cmd npm test`, `deploy.day Tuesday`, and `e2e.status flaky`. The smallest text is 36px (about 12px at a 350px width). Colors: amber is application activity and preparing, green is supplied, blue is the saved record's identity.

## Beats (playback seconds, speed 1, 40.8 s)

| Time | What moves | State change | Sound |
|---|---|---|---|
| 0.5–3.1 | Call 1 header, model, and input card appear; the task types in; an empty test-command slot appears | card `preparing` (amber) | ack C6 ×2, ack C5 (input pitch family C) |
| 4.2–4.8 | green dot from the card up to the model | card `supplied` (green); model green | send C6 → deliver C5 |
| 4.8–8.2 | **hold** | Call 1 has exactly what it was given | — |
| 8.2 | memory store fades in as existing data (no write animation) | three saved rows | ack G4 (store family G) |
| 9.6 | the `billing.test_cmd` row lights blue | — | ack G5 |
| 10.8 | grey × ripple; Call 1 slot reads `not included` | Call 1 unchanged otherwise | miss (quiet, panned left) |
| 11.7–15.8 | **hold** | the record is on screen; Call 1 still lacks it; nothing connects them | — |
| 15.8–18.4 | Call 2 assembles like Call 1 | Call 2 `preparing`, slot `—` | ack C6 ×2, ack C5 |
| 18.8–19.8 | application panel appears; `read billing.test_cmd` types in | — | ack E5 (application family E) |
| 20.3–20.9 | amber dot from the application to the store | store row lights blue | send E6 → arrive G5 |
| 21.7 | a copy appears over the stored value (transparent, so the original stays readable) | — | ack G6 |
| 22.3–23.7 | the copy rises into the application | application `retrieved a copy`; stored row unchanged | send G6 → arrive E5 |
| 23.7–26.4 | **hold** | the copy is with the application; Call 2 still `preparing` without it | — |
| 26.4–28.4 | application `include in Call 2`; the copy moves into Call 2's slot | slot filled; still `preparing` | ack E5, send E6 → arrive E5 |
| 28.4–31.4 | **hold** | included but not yet supplied | — |
| 31.4–32.0 | application `send Call 2`; green dot up to model 2 | Call 2 `supplied`; model 2 green | send C6 → deliver C5 (same as Call 1) |
| 32.6 | application dims | its work is done | — |
| 33.6 / 34.0 | the copy pulses, then the stored row lights | store status `still saved` | ack C6, then ack G5 |
| 34.2–39.2 | **final hold** | Call 1 without the command, Call 2 with it, store unchanged | — |
| 39.2–40.2 | stage fades; title stays | finite ending | — |

## Reproduction (from the repository root)

```
node video/memory-architecture/motion-v2/01/engine/render.mjs video/memory-architecture/motion-v2/01/scene.js video/memory-architecture/motion-v2/01/video.mp4 --sheet video/memory-architecture/motion-v2/01/scratch/contact-sheet.png
ffmpeg -v error -y -ss 34.3 -i video/memory-architecture/motion-v2/01/video.mp4 -frames:v 1 -q:v 3 video/memory-architecture/motion-v2/01/poster.jpg
```

`render.mjs` resolves `puppeteer-core` from the repository's pinned `node_modules` (25.14.0). The local engine adds the general `panel` and `chip` node types, a `statusAfterTitle` panel option, and `titleY`/`titleSize`/`subtitleY`/`subtitleSize`/`subtitleSpacing` meta options.

