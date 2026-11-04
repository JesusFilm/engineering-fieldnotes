# Lesson 02 — A replica can lag · beat sheet (motion-v2)

One mechanism: with asynchronous replication the primary saves and acknowledges v8 while the replica still holds v7. A later read routed to the replica succeeds and returns v7. The save stays done; the stale read is a normal success. Scope ends with the replica still behind: no catch-up, revision check, retry, primary read, replay stages, synchronous modes or failover.

Render: 1080×1920, 30 fps, speed 1, 38.0 s, finite ending on the held evidence frame (no fade).

## A/B decisions

Both plans were read as anonymous inputs. Each choice below records which idea was used and why.

| Topic | Plan A | Plan B | Used | Reason |
|---|---|---|---|---|
| Geometry | Two record tables under an application results panel | Sequence trace: primary · app · replica lifelines, persistent message chips | B | Sequence traces are native to the audience, and the layout differs from lesson 01's side-by-side record panels. Centring the app sends the write left and the read right. |
| Opening state | Save already completed (v8 vs v7 from frame 1) | Both copies at v7, save shown happening | B | The brief requires showing the successful save. |
| Revision names | `v7` / `v8` | `r7` / `r8` | A | Matches the lesson text "revision 8" and the R42 concept example wording. |
| Lag marker | Sparse `Behind` label | Replica revision turns amber | Both | Amber v7 plus `behind` on the replica lifeline at the height of the save rows. |
| Disagreement marker | `Older` label beside the read result | Amber segment on the app lifeline with `≠` | B | `Older` would repeat `behind`; the bracket locates the disagreement between the two replies the app received. |
| Single-writer evidence | Persistent save receipt | `writes 0 → 1` counter on the app | Both | Persistent `ok · v8` chip plus a counter that never exceeds 1. |
| Async link | Thin stationary connector below the tables, labelled | Dim arc above the app box | A | Placed below the trace with the label `async copy`; an arc above would crowd the title band. |
| Reply sound | `deliver` C5 for both completions (app pitch) | Identical `deliver` for both replies | Both | The two success cues are identical (`deliver` C5, same gain), so a successful reply does not tell the ear which copy answered. |
| Actor pitches | app C5, primary E5, replica G5 | app C5, primary G5, replica E5 | B | Same mapping as the lesson 01 cut, so the series stays consistent. |
| Ending | Finite hold on evidence pairs | Hold then fade | A | The final frame is the argument; it is held 9.8 s with no fade. |
| Evidence pairing | Pair primary v8 + receipt, replica v7 + read result | Pulse ack + pRev, reply + rRev | Both | Same idea; the pairs are pulsed and then stay outlined (teal v8, amber v7). |
| Minimum text | Essential labels ≥ 48 px | ≥ 44 px | A, mostly | Chips, card titles and `behind` are 48 px (15.6 px at 350 wide); revisions 64 px. `writes` and `async copy` are secondary at 44 px. |

## Stage

Lifelines x = 170 (primary), 540 (app), 910 (replica), dashed, y 782–1560. Cards 280×270 centred at y 635 with title, status (`draft`/`ready` or `writes`) and revision/count. Message rows: save y 916, ack 1036, read 1256, reply 1376; each chip rests 56 px above its arrow, 30 px clear of the receiving lifeline. `behind` at (910, 976) on a plate. Bracket on the app lifeline y 1036–1376, `≠` at (540, 1144). Async link y 1584–1660, label at y 1724.

## Timing, state and sound

| Time (s) | What moves | State change | Sound |
|---|---|---|---|
| 0–1.0 | Cards, lifelines and link fade in | Both copies `draft v7`; app `writes 0` | — |
| 1.6 / 2.5 / 3.4 | Primary, replica, app pulse in turn | Actors introduced | `ack` G5 (L) / E5 (R) / C5 (C) |
| 3.4–5.8 | Hold | | — |
| 5.8 | App pulses; counter `0 → 1` | One write issued | `send` C6 |
| 5.8–7.0 | `save v8` chip rides arrow app → primary | | — |
| 7.0 | Small ripple at primary lifeline | Write lands | `arrive` G5 |
| 7.6 | Primary card flashes teal | `draft v7 → ready v8` in one step | `store` G5 |
| 8.6–9.8 | `ok · v8` chip rides primary → app | Save acknowledged | `send` G6 → `deliver` C5 at 9.8 with check ripple |
| 10.9 | Replica `draft v7` turns amber; `behind` pops in | Replica still at v7 | quiet `ack` E5 + F5 rub |
| 10.9–14.6 | Hold | Saved v8, acknowledged; replica v7 | — |
| 14.6–15.8 | `read R42` chip rides app → replica | Read routed to replica only | `send` C6 → `arrive` E5 |
| 16.2–17.6 | Replica v7 row outlined, card glows twice | Replica answers from its own copy; nothing changes | `work` E4 ×2 |
| 17.2–18.4 | `ok · v7` chip (ok teal, v7 amber) rides replica → app | Read succeeds with older revision | `send` E6 → `deliver` C5 at 18.4 (identical to 9.8) |
| 18.4–23.0 | Hold | Two teal `ok` replies on the trace, no red | — |
| 23.0 | Primary v8 outlined teal; `ok · v8` glows | Saved revision paired with its ack (stays outlined) | `ack` G5, then C5 |
| 24.6 | Replica v7 outlined amber; `ok · v7` glows | Observed revision paired with its reply (stays outlined) | `ack` E5, then C5 |
| 26.2–26.8 | Amber bracket draws down app lifeline; `≠` pops in | The two replies differ | quiet `ack` G5 + F♯5 rub |
| 28.0 | App `1` outlined; `save v8` glows | Still exactly one write; nothing undone | `arrive` C5 (soft) |
| 28.2–38.0 | Silent hold, finite end | Final evidence: primary `ready v8`, `ok · v8`, `writes 1`; replica `draft v7`, `ok · v7`, `behind`, `≠` | — |

Pan follows actor x (primary left, app centre, replica right). There are no `crash`, `thump`, `miss`, `chime` or music cues, and red never appears.

## Reproduce

From the repository root, using the pinned `puppeteer-core` 25.14.0 in `node_modules`:

```
CHROME_PATH=/snap/bin/chromium node video/replication-and-consistency/motion-v2/02/engine/render.mjs video/replication-and-consistency/motion-v2/02/scene.js video/replication-and-consistency/motion-v2/02/video.mp4 --sheet video/replication-and-consistency/motion-v2/02/scratch/contact-sheet.png --wav video/replication-and-consistency/motion-v2/02/scratch/sfx.wav
ffmpeg -v error -y -ss 37.5 -i video/replication-and-consistency/motion-v2/02/video.mp4 -frames:v 1 -q:v 2 video/replication-and-consistency/motion-v2/02/poster.jpg
```

Snap Chromium needs write access to its own snap user directory, so in this VM's agent sandbox the render ran with escalated permissions.

## Cut-local engine changes (`engine/flow-engine.js`)

These are general additions in the cut's own copy; the shared skill is untouched. `card` (titled card with stacked lines and per-line outline), `arrow` (self-drawing straight arrow, optional head), `tag` (movable chip with multi-coloured text parts), `label.plate` (background plate so a label can sit on a line), and `meta.titleSize` / `meta.subtitleSize`. `sfx.js`, `render.mjs` and `preview.html` are unchanged from the skill.

## Accuracy limits

Single writer. `v7`/`v8`, `draft`/`ready` and `ok` are illustrative application fields, not PostgreSQL output or WAL positions. The stationary link claims no stalled replication and no lag duration; the interval is stretched for teaching. Synchronous or `remote_apply` configurations change what the acknowledgement covers and are out of scope. Source as cited in both plans: PostgreSQL 18 docs, §26.2.5 Streaming Replication (asynchronous standby visibility can lag primary commit).

