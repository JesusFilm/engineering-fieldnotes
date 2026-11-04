# Lesson 05 — Missing and sensitive data — plan B

Independent plan for the motion-v2 cut of observability-and-tracing lesson 05. Authored from the lesson entry in `video/observability-and-tracing/sequence/lessons.json` (item 5) and the concept content in `content/concepts/observability-and-tracing.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **a trace view shows only what passed the collection path. An attribute policy keeps approved fields, so span A's fake secret is removed while span A itself is still exported; separately, span B's export fails, so the view has A and not B, although B ran and was recorded locally.**

The viewer should feel three things. The red `token FAKE-9f2c` row on span A disappears at the policy step while the `span A` chip keeps going and arrives in the view with its other rows. The `span B` chip passes the same policy untouched but stops at a red × after the exporter, and the view's header stays at `1 span`. At the end, B's `ran ✓` at the top and the empty space at the bottom are lit together, so the gap reads as a limit of the evidence, not proof that B never ran.

Grounding: lesson beats ("runtime operations produce tracing data. Not every detail should be recorded", "remove a secret attribute from span A. Keep the span itself in the export", "separately, span B fails to export. The view has A, but B is missing", "use traces with their collection limits. Absence of a span is not proof of absence"); lesson intro ("sampling, export failures and missing instrumentation can omit spans. Recorded attributes can also contain sensitive information unless the application controls them"); lesson takeaway ("a missing span is not proof that work never happened. Minimize sensitive attributes and treat traces as partial evidence"); concept judgement ("prefer approved metadata over prompts, source code, credentials, or tool payloads"); concept exercise ("place a fake secret in the tool input, export telemetry, and verify that the value was omitted"); pitfalls (absent span as proof of no execution; exporting raw tool arguments). Sources per the concept file, retrieved 2026-10-19: [OpenTelemetry — Handling sensitive data](https://opentelemetry.io/docs/security/handling-sensitive-data/) and [OpenTelemetry — Sampling](https://opentelemetry.io/docs/concepts/sampling/).

Out of scope: how spans record time (01), IDs and parents (02), propagation (03) and duration comparison (04); none are re-taught, and A and B are drawn without IDs or bars. The cut shows export failure as the cause of B's absence; sampling and missing instrumentation are named only in the accuracy limits and write-up. No retry or buffering behaviour is shown. This is the last lesson in the sequence.

Grammar for this cut: **three horizontal bands top to bottom — `runtime` (what ran, with each span recorded locally), `export path` (an attribute policy bar and an exporter bar spanning both columns), and `trace view` (what arrived) — with span A in the left column and span B in the right.** The teaching motion is attrition along a path: a row removed at the policy, a whole span stopped after the exporter, and a final top-to-bottom comparison of what ran versus what was received. This differs from the timeline, ID cards, process frames and waterfalls of lessons 01–04. Every element is a software object: an operation, a span record, an attribute row, an allowlist, an exporter, an export result and a trace view. No shredders, redaction markers, filters drawn as funnels, or lost-mail imagery.

Target length ≈ 44 s at speed 1 (`meta.speed: 1`). If stills read fast, lengthen the hold after B's export fails and the final hold.

## Engine notes

Use `box` for operations, the policy bar and the exporter bar; `store` for span records (runtime and view); `label` for band names, the policy text, `export failed`, the view header and `?`; `s.wire` for the two column paths; chips for `span A` and `span B`; `s.ripple` with `mark: 'x'` for the failure. Removing the token row: animate `row2Alpha` to 0 after a red pulse, with a `poof`; do not leave a struck-through row. No new node type is expected. Work in a cut-local engine copy with the repository-pinned Puppeteer; if chip text renders below 40 px, add a `labelSize` option there and report it.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); names 44 px; monospace at 40 px ≈ 24 px per character. Content stays within x 60–1020 and y 470–1730.

Columns: A at x **290**, B at x **790**.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Observability and tracing** / MISSING AND SENSITIVE DATA | shorten to **Tracing** if it overflows |
| bandRun | label | (540, 485), 40 px, mid | `runtime` | |
| opA | box | (290, 560), 400 × 80 (x 90–490, y 520–600) | label `A · run_tests` 44 px; sublabel 40 px `running` → `ran ✓` ok | C5 |
| opB | box | (790, 560), 400 × 80 (x 590–990) | label `B · report`; sublabel `running` → `ran ✓` ok | G5 |
| cardA | store, `rows: 3`, w 420 | (290, 750), x 80–500, y ≈ 660–840 | label `span A` 40 px at (290, 635); rows `name   run_tests` · `status ok` · `token  FAKE-9f2c` (bad) | the local record |
| cardB | store, `rows: 2`, w 420 | (790, 730), x 580–1000, y ≈ 660–800 | label `span B` at (790, 635); rows `name   report` · `status ok` | |
| bandExp | label | (540, 885), 40 px, mid | `export path` | |
| policy | box | (540, 960), 900 × 80 (x 90–990, y 920–1000) | label `attribute policy` 44 px on the left half (x ≈ 300); sublabel-like label `keep: name, status` 40 px mono at (760, 960) | E5; an allowlist |
| exporter | box | (540, 1100), 900 × 80 (x 90–990, y 1060–1140) | label `exporter` 44 px | D5 |
| failX | ripple anchor | (790, 1210) | red `x` | |
| failLab | label | (790, 1255), 40 px mono, bad, ≈ 312 px (x 634–946) | `export failed` | hidden until beat 3 |
| view | outline box | x 90–990, y 1300–1720 | — | trace view |
| viewHead | label | (540, 1345), 40 px mono | `trace view · 0 spans` → `trace view · 1 span` | |
| viewA | store, `rows: 2`, w 420 | (290, 1500), x 80–500 inside the view | label `span A` at (290, 1405); rows `name   run_tests` · `status ok` | hidden until beat 2; no token row |
| gapQ | label | (790, 1500), 44 px, mid | `?` | hidden until beat 4; no ghost card is drawn |

Wires (dotted, resting `#3A3E45`):

| id | from | to | meaning |
|---|---|---|---|
| pathA1 | cardA bottom [290, 840] | policy top [290, 920] | A enters the export path |
| pathA2 | policy bottom [290, 1000] | exporter top [290, 1060] | |
| pathA3 | exporter bottom [290, 1140] | viewA label [290, 1385] | A is delivered |
| pathB1 | cardB bottom [790, 800] | policy top [790, 920] | |
| pathB2 | policy bottom [790, 1000] | exporter top [790, 1060] | |
| pathB3 | exporter bottom [790, 1140] | view top [790, 1300] | turns bad and dashed after the failure |
| askB | opB right side [990, 560] | gapQ [850, 1500] | via [1030, 560], [1030, 1500]; dashed, hidden until beat 4: "did B run?" |

Chips: `span A` and `span B` (≈ 144 px, 40 px mono) travel their column. Check that the `keep: name, status` label (x ≈ 556–964) is not crossed by the `span B` chip's text at the moment of passing (the chip passes at x 790; pause the label's pulse until the chip has passed, or let the chip fade briefly inside the policy box), that `export failed` clears the view top (y 1300), and that askB at x 1030 stays inside the frame.

## Sound map

Actor pitches: span A **C5**, span B **G5**, attribute policy **E5**, exporter **D5**, trace view **A5**. Pan: A left (≈ −0.5), B right (≈ +0.5), policy/exporter/view centre.

| event | preset | notes |
|---|---|---|
| operation runs | `work` at the actor's lower octave | 3 ticks each |
| operation ran | `ack` at the actor's pitch | |
| span row recorded | `store` at the actor's pitch | |
| secret row flagged | `miss` | soft |
| chip enters policy | `arrive` E5 | |
| secret row removed | `poof` | |
| field kept / span unchanged | `ack` E5 | |
| exporter sends | `send` D6 | |
| A arrives in view | `arrive` A5, then `store` A5 per row | |
| B export fails | `thump` with a short noise layer (or `crash` at reduced gain) | the loudest event |
| final comparison | `ack` G5 (B ran), then a quiet low `ack` (empty slot) | |

No music; silence during holds.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Runtime operations produce tracing data (0–10.0)** | | | |
| 0.0–1.0 | bands, policy, exporter and empty view fade in | `trace view · 0 spans` | — |
| 1.4–2.6 | opA works | `running` → `ran ✓` | work C4 ×3, ack C5 |
| 2.8 / 3.4 / 4.0 | cardA rows fill | `name run_tests` · `status ok` · `token FAKE-9f2c` (red) | store C5 ×3 |
| 4.4–5.6 | opB works | `running` → `ran ✓` | work G4 ×3, ack G5 |
| 5.8 / 6.4 | cardB rows fill | `name report` · `status ok` | store G5 ×2 |
| 7.2 | cardA's token row pulses red | a secret was recorded | miss (soft) |
| 7.8 | policy label `keep: name, status` pulses | only approved fields leave | — |
| 7.8–10.0 | hold | | |
| **Beat 2 — Remove the secret attribute; keep span A (10.0–19.0)** | | | |
| 10.0–10.7 | chip `span A` on pathA1 | — | — |
| 10.7 | ripple at (290, 960); cardA row2 pulses red and fades out | `token` removed; rows 0–1 remain | arrive E5, poof |
| 11.4 | cardA rows 0–1 pulse ok | the span itself is kept | ack E5 |
| 11.8–12.4 | chip `span A` on pathA2 | — | — |
| 12.4 | ripple at (290, 1100) | exporter accepts A | send D6 |
| 12.6–13.6 | chip `span A` on pathA3 | — | — |
| 13.6 | viewA label and card pop; rows fill (13.8, 14.2); viewHead → `1 span` | A is visible, without the token | arrive A5, store A5 ×2 |
| 14.6–19.0 | hold | | |
| **Beat 3 — Separately, span B fails to export (19.0–28.0)** | | | |
| 19.0–19.7 | chip `span B` on pathB1 | — | — |
| 19.7 | ripple at (790, 960) | no rows removed: B has only approved fields | arrive E5, ack E5 |
| 20.3–20.9 | chip `span B` on pathB2 | — | — |
| 20.9 | ripple at (790, 1100) | | send D6 |
| 21.1–21.7 | chip `span B` on pathB3; fades at (790, 1210) | — | — |
| 21.7 | red `x` ripple at failX; pathB3 turns bad and dashed; exporter jolts 8 px | | thump (loudest) |
| 22.3 | failLab appears | `export failed` | — |
| 22.9 | viewHead pulses | still `trace view · 1 span` | — |
| 22.9–28.0 | hold | the view has A; B never arrived | |
| **Beat 4 — Treat traces as partial evidence (28.0–44.0)** | | | |
| 28.0 | opB pulses ok | `ran ✓`: B happened | ack G5 |
| 28.8 | cardB pulses | B was recorded locally | — |
| 29.6 | askB draws dashed from opB down the right edge; gapQ pops in the empty right half of the view | absent from the view ≠ did not run | ack low (C4), quiet |
| 31.0 | viewA pulses; cardA's two rows pulse; policy `keep: name, status` pulses | the view's A is the kept part of A | ack A5 |
| 31.0–42.4 | hold | final state | |
| 42.4–43.2 | `s.fade` to black, 0.8 s | finite ending | — |
| 44.0 | end | | |

## Accuracy limits

- `FAKE-9f2c` is a deliberately fake, illustrative value, matching the concept's exercise. No real credential appears.
- The `attribute policy` is drawn in-process before the exporter, as an allowlist (`keep: name, status`). Where removal happens matters: if a secret is removed only at a downstream collector, it has already left the process. Not recording the value in the first place is preferable; the cut shows the policy as the earliest point it can act after recording.
- Removing an attribute does not remove the span: A keeps its name and status and is exported.
- B's absence is caused by an export failure here. Sampling and missing instrumentation are other causes; exporters may retry or buffer, which this cut does not show. B's local record exists only for the teaching view; in practice it may be lost if export is not retried.
- The trace view cannot know that B existed. The `?` and the dashed line from B's `ran ✓` represent the reader's knowledge from outside the trace (a task log, for example), not something the view displays.
- A present span is not proof of correct work either; that point is in the concept but not drawn here.
- `run_tests` and `report` are illustrative operation names.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.8, 2.7, 3.2, 4.2, 5.0, 6.0, 6.6, 7.4, 8.0, 9.5, 10.4, 10.9, 11.6, 12.2, 13.0, 13.8, 14.4, 17.0, 19.4, 19.9, 20.6, 21.4, 21.9, 22.5, 23.1, 26.0, 28.2, 29.0, 29.8, 31.2, 36.0 and 42.8 s, plus before/mid/after the token removal and the failure. At 350 px, the band names, both operation boxes, all card rows, the policy text, `exporter`, `export failed`, the view header and the view card must be readable.
2. Secret handling: `FAKE-9f2c` appears only in cardA before 10.7 s; it never appears in the export path, on a chip or in the view; after 10.7 s cardA shows two rows; viewA never has a token row.
3. Span kept: the `span A` chip continues past the policy after the row is removed; viewA appears with `name` and `status`.
4. Export failure: the `span B` chip never enters the view; pathB3 is bad and dashed after 21.7 s; viewHead reads `1 span` from 13.6 s to the end; no ghost card or outline for B is drawn inside the view, only the `?`.
5. Ran versus received: opB reads `ran ✓` from 5.6 s to the end; askB and gapQ appear only in beat 4.
6. Clearance: chips do not overlap the policy text or `exporter` label while passing; `export failed` clears the view top; askB stays inside x 1040; card text stays inside cards; nothing enters the title band; no chip remains during a hold.
7. Silent reading: with sound off and words ignored, a viewer sees two boxes at the top finish and two cards fill, one with a red row; a chip from the left card passes a bar, the red row vanishes, and the chip continues into a bottom panel where a two-row card appears; a chip from the right card passes the same bar unchanged, then stops at a red × above the bottom panel; finally the right top box lights and a dashed line leads down to a `?` in the empty right half of the bottom panel.
8. Audio: the dry run lists one `poof` (10.7 s), one soft `miss` (7.2 s), one `thump` at 21.7 s (loudest), and the view `arrive` A5 only once (for A). Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding run `python3 scripts/check_media.py --concept observability-and-tracing`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

