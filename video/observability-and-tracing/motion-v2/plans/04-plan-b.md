# Lesson 04 — Visibility is not a speedup — plan B

Independent plan for the motion-v2 cut of observability-and-tracing lesson 04. Authored from the lesson entry in `video/observability-and-tracing/sequence/lessons.json` (item 4) and the concept content in `content/concepts/observability-and-tracing.json`. Earlier motion-v2 beat sheets were read only to vary the geometry. No other plan for this lesson, no production ledger, and no authoring source was consulted. This document names no authoring model.

## Scope

One mechanism: **in an illustrative sequential run, the model call takes 0.6 s and the tool call 2.4 s, so the task takes 3.0 s; without propagated context the tool span lands in a separate trace and the agent's trace shows 2.4 s it cannot explain; in the next run, with context sent, the same 2.4 s tool span appears under the agent task, and the task still takes 3.0 s.**

The viewer should feel three things. In run 1 the agent task's bar has a long dark stretch with no child under it, while a 2.4 s bar sits in a separate box with a different trace ID. In run 2 that stretch is filled by the tool bar, the same width as before. A single vertical guide at 3.0 s runs through both runs' totals, so the time did not change.

Grounding: lesson beats ("example: two calls run sequentially. 0.6 + 2.4 = 3.0 seconds total", "without linkage, the tool looks separate. Its time is harder to attribute", "next run: propagate the request context. Export now links the same 2.4s tool span", "the run still takes 3.0 seconds. We improved visibility, not execution speed"); lesson intro and takeaway ("use tracing to locate time. A tracing repair is an observability improvement, not automatically a performance optimization"); concept example (0.6 s model, 2.4 s tool, separate trace without propagation, total still 3.0 s after the fix); walkthrough step 4 ("nested or overlapping spans must not be added as if they were sequential"). Sources per the concept file, retrieved 2026-10-19: [OpenTelemetry — Traces](https://opentelemetry.io/docs/concepts/signals/traces/) and [OpenTelemetry — Context propagation](https://opentelemetry.io/docs/concepts/context-propagation/).

Out of scope: how a span records time (01), how IDs and parents work (02), and how the header is injected and extracted (03); these are assumed and appear only as the run labels `no context sent` / `context sent`. Sampling, export failures, missing spans and sensitive data are lesson 05; in this cut every span is exported and visible, just in the wrong trace in run 1. No optimisation of the tool is attempted or suggested.

Grammar for this cut: **two stacked trace waterfalls on one shared time scale.** Each run is a panel with name rows on the left and bars on a 0–3 s axis; run 1 also has a small detached box holding the separate tool trace; run 2 has none. A vertical guide at 3.0 s and equal-width brackets compare the runs directly. This differs from lesson 01's single growing span, lesson 02's ID cards and tree, and lesson 03's process frames: the teaching motion is attribution moving from a separate box into a gap, while lengths stay fixed. Every element is a software object: a trace waterfall, span bars, a trace ID, a total duration and a time axis. No stopwatches, race tracks or speedometers.

Target length ≈ 42 s at speed 1 (`meta.speed: 1`). Each run plays at half speed (3.0 s of run time over 6 s of video) so the sequence is readable; both runs use the same playback rate so their lengths can be compared. If stills read fast, lengthen the hold after run 1's gap is marked and the final comparison hold.

## Engine notes

Use `bar` nodes (one segment each, `seg0` tweened) for span bars, `label` for names, durations, totals, trace IDs and axis ticks, `box` outlines for the two run panels and run 1's separate-trace box, `s.wire` for axes, the 3.0 s guide, the 0.6 s guide, the dashed gap outline and the parent stub in run 2, and `s.mark` for the playhead dot if a moving line is not available. If a vertical playhead line needs an animated x, add a general `cursor` node type in the cut-local engine copy and report it. Work with the repository-pinned Puppeteer.

## Stage and coordinates (1080 × 1920)

Palette follows `references/style.md`. Minimum on-screen text 40 px (≈ 13 px at 350 wide); panel headers 44 px; monospace at 40 px ≈ 24 px per character. Content stays within x 40–1040 and y 470–1730.

Time scale for both runs: x = 300 + 220·t for t in seconds (0 → 300, 0.6 → 432, 1 → 520, 2 → 740, 2.4 → 828, 3.0 → 960). Bars are 32 px tall.

| id | type | centre / bounds | text | notes |
|---|---|---|---|---|
| title | title band (540, 330) / (540, 405) | — | **Observability and tracing** / VISIBILITY IS NOT A SPEEDUP | shorten to **Tracing** if it overflows |
| p1 | outline box | x 40–1040, y 470–1080 | — | run 1 panel |
| p1Head | label | (340, 510), 44 px, ≈ 528 px | `run 1 · no context sent` | |
| p1Total | label | (920, 510), 40 px mono | `total —` → `3.0 s` | |
| p1Trace | label | (920, 560), 40 px mono, mid | `trace 7c1e` | the agent's trace |
| r1Agent | label (170, 610) + bar x 300–960, y 610 | `agent task` | fg | grows 0 → 1 |
| r1Model | label (170, 680) + bar x 300–432, y 680 | `model call` | accent (E colour) | duration label `0.6 s` at (500, 680) |
| r1Gap | dashed outline | x 432–960, y 735–785 | `?` at (696, 760), 44 px, mid | empty row under the agent task |
| r1Axis | wire + tick labels | axis y 830; ticks at x 300 / 520 / 740 / 960, labels y 865 | `0` · `1 s` · `2 s` · `3 s` | |
| sepBox | outline box | x 60–1020, y 915–1060 | — | separate trace inside run 1 |
| sepTrace | label | (190, 950), 40 px mono, mid | `trace 91d0` | different ID from `7c1e` |
| r1Tool | label (170, 1015) + bar x 300–828, y 1015 | `tool call` | ok (G colour) | starts at x 300: its own trace's zero; duration label `2.4 s` at (905, 1015) |
| p2 | outline box | x 40–1040, y 1120–1600 | — | run 2 panel |
| p2Head | label | (310, 1160), 44 px, ≈ 480 px | `run 2 · context sent` | |
| p2Total | label | (920, 1160), 40 px mono | `total —` → `3.0 s` | |
| p2Trace | label | (920, 1210), 40 px mono, mid | `trace 4bf9` | |
| r2Agent | label (170, 1260) + bar x 300–960, y 1260 | `agent task` | | |
| r2Model | label (170, 1330) + bar x 300–432, y 1330 | `model call` | | `0.6 s` at (500, 1330) |
| r2Tool | label (170, 1400) + bar x 432–960, y 1400 | `tool call` | ok | `2.4 s` label inside the bar end region at (696, 1400) in dark text, or above at (696, 1370) if contrast fails |
| r2Stub | wire | (290, 1275) → (290, 1400) → (300, 1400) | — | parent stub: tool under agent |
| r2Axis | wire + tick labels | axis y 1480; tick labels y 1515 | same ticks | |
| noSep | label | (540, 1565), 40 px mono, mid, ≈ 432 px | `no separate traces` | appears after run 2 closes |
| guide3 | dashed wire | x 960, y 560 → 1490 | — | 3.0 s guide through both runs |
| guide06 | dashed wire | x 432, y 640 → 1440 | — | 0.6 s guide: where the tool starts |

Note: the beat-4 width comparison pulses the two existing `2.4 s` labels and both tool bars; no extra bracket text is drawn. Check that `trace 91d0` (x ≈ 70–310) clears the r1Tool name, that duration labels clear bar ends by ≥ 12 px, and that guide06 does not cross any text (it passes between `model call` bars and the `?` label).

## Sound map

Actor pitches: agent task **C5**, model call **E5**, tool call **G5**. Sends are not used; bars carry the motion. Pan centre except the separate trace box (≈ +0.3) in run 1.

| event | preset | notes |
|---|---|---|
| run starts | `arrive` C5 | |
| model span opens / closes | `arrive` E5 / `store` E5 | |
| tool working | `work` G4 | every 0.8 s of video while the tool bar grows |
| tool span closes | `store` G5 | |
| agent task closes; total shown | `store` C5 | |
| duration recap | `ack` E5, `ack` G5, `ack` C5 | 0.6, 2.4, 3.0 in order |
| unexplained gap marked | `miss` | soft; the loudest moment of run 1 |
| separate trace pointed out | `thump` | quiet |
| tool joins the agent trace (run 2) | `chime` G5 | the only chime |
| totals compared | `ack` C5 twice, identical | same note: same time |
| tool widths compared | `ack` G5 twice, identical | |

No music; silence during holds.

## Beat sheet (speed 1)

| time | what moves | state change | sound |
|---|---|---|---|
| **Beat 1 — Two sequential calls: 0.6 + 2.4 = 3.0 s (0–11.5)** | | | |
| 0.0–1.0 | p1, header, axis and empty rows fade in | `total —`; `trace 7c1e` | — |
| 1.5–7.5 | r1Agent grows 0 → 3.0 s | the task runs | arrive C5 at 1.5 |
| 1.5–2.7 | r1Model grows 0 → 0.6 s | | arrive E5 at 1.5, store E5 at 2.7 |
| 2.7 | sepBox pops with `trace 91d0`; `0.6 s` label appears | the tool's span starts, but in a separate trace | — |
| 2.7–7.5 | r1Tool grows in sepBox from x 300 to 828; r1Gap row stays empty | | work G4 ×6 |
| 7.5 | r1Tool closes with `2.4 s`; r1Agent closes; p1Total `3.0 s` | | store G5, store C5 |
| 8.2 / 8.8 / 9.4 | `0.6 s`, `2.4 s`, `3.0 s` pulse in turn | the sum | ack E5, G5, C5 |
| 9.4–11.5 | hold | | |
| **Beat 2 — Without linkage, the tool's time is hard to attribute (11.5–19.0)** | | | |
| 11.5 | r1Gap outline draws dashed; `?` pops | 2.4 s of the agent task has no child | miss (soft) |
| 12.5 | the part of r1Agent from x 432 to 960 tints mid | unexplained time | — |
| 13.5 | sepBox and `trace 91d0` pulse mid; `trace 7c1e` pulses | two different trace IDs | thump (quiet) |
| 13.5–19.0 | hold | the answer is on screen but not connected | |
| **Beat 3 — Next run: context sent; the same 2.4 s span joins the trace (19.0–31.0)** | | | |
| 19.0 | p2, header, axis and empty rows fade in | `run 2 · context sent`; `trace 4bf9`; `total —` | — |
| 20.5–26.5 | r2Agent grows 0 → 3.0 s | | arrive C5 at 20.5 |
| 20.5–21.7 | r2Model grows 0 → 0.6 s; `0.6 s` label | | arrive E5, store E5 |
| 21.7 | r2Stub draws; r2Tool row label lights | the tool span is a child of the agent task | chime G5 |
| 21.7–26.5 | r2Tool grows from x 432 to 960 | | work G4 ×6 |
| 26.5 | r2Tool closes with `2.4 s`; r2Agent closes; p2Total `3.0 s` | | store G5, store C5 |
| 27.2 | noSep appears mid | | — |
| 27.2–31.0 | hold | | |
| **Beat 4 — Still 3.0 s: visibility improved, not speed (31.0–42.5)** | | | |
| 31.0 | guide3 draws from top to bottom through both totals' bar ends; p1Total and p2Total pulse | same total | ack C5, ack C5 |
| 32.4 | r1Tool and r2Tool pulse together with their `2.4 s` labels; guide06 draws | same tool time, now attributed | ack G5, ack G5 |
| 33.6 | r1Gap `?` and r2Tool pulse in turn | the gap in run 1 is the tool in run 2 | — |
| 34.2–40.8 | hold | final state | |
| 40.8–41.6 | `s.fade` to black, 0.8 s | finite ending | — |
| 42.5 | end | | |

## Accuracy limits

- 0.6 s, 2.4 s and 3.0 s are the concept's illustrative values. Real repeated runs vary; the cut shows identical totals to isolate the point that propagation does not shorten the work. Propagation adds a small header and processing cost that is negligible here but not exactly zero; the cut does not claim zero.
- The calls are sequential, so their durations add. Nested or overlapping spans must not be summed; the agent task's 3.0 s contains its children and is not added to them.
- In run 1 the tool span is drawn in its own trace starting at that trace's zero; in a real trace viewer separate traces are browsed separately, and lining them up by wall-clock time takes extra work. The cut does not suggest the viewer would place them side by side automatically.
- Run 1's missing child is not a missing span: the tool span exists and was exported, only in another trace. Missing or sampled spans are lesson 05.
- `7c1e`, `91d0` and `4bf9` are shortened illustrative trace IDs.
- Locating the slow tool is the start of an investigation, not a diagnosis: the 2.4 s covers whatever the instrumented tool operation includes, as the concept notes.

## Native 350 acceptance

These are requirements for the future render, not completed validation.

1. Decode actual frames (avoid relying only on a contact sheet) at 1080 and at 350 px wide around 1.8, 2.6, 3.0, 5.0, 7.3, 7.8, 8.5, 9.1, 9.7, 11.0, 11.8, 12.8, 13.8, 17.0, 19.6, 21.0, 22.0, 24.0, 26.3, 26.8, 27.5, 30.0, 31.4, 32.7, 33.9, 37.0 and 41.2 s, plus before/mid/after each bar close. At 350 px, both headers, all row names, all duration labels, both totals, all three trace IDs, axis tick labels, `?` and `no separate traces` must be readable.
2. Fixed lengths: r1Tool and r2Tool are both 528 px wide when closed; both r1Agent and r2Agent end at x 960; both totals read `3.0 s`. Any frame where run 2 looks shorter than run 1 fails.
3. Run 1 attribution: r1Gap is empty in every frame of run 1; r1Tool is only inside sepBox; `trace 91d0` differs from `trace 7c1e`.
4. Run 2 attribution: r2Tool appears only under r2Agent with the parent stub; noSep appears and no separate-trace box is drawn for run 2.
5. Shared scale: ticks align vertically between the two panels; guide3 passes exactly through both agent bar ends and both `3.0 s` totals' column.
6. Clearance: duration labels do not overlap bar ends or each other; guide06 and guide3 cross no text; `run 1 · no context sent` clears `total`; nothing enters the title band.
7. Silent reading: with sound off and words ignored, a viewer sees a long bar and a short bar grow while a third bar grows in a separate box; an empty dashed row under the long bar gets a `?`; a second panel runs again and the third bar now grows inside the empty row's position; a vertical line shows both long bars end at the same place, and the two third bars pulse as the same length.
8. Audio: the dry run lists one `chime` (G5, 21.7 s), one soft `miss` (11.5 s), one quiet `thump`, two identical `ack` C5 cues at 31.0 s and two identical `ack` G5 cues at 32.4 s. Full-decode the encode, confirm an audio stream, peak below −0.5 dBFS and moov before mdat. Record whether audio was heard or only analysed.
9. After encoding run `python3 scripts/check_media.py --concept observability-and-tracing`; a new encode needs renewed comparison review bound to its SHA-256.

## Production boundary

Only this anonymous plan is written. No render, scene source, public media, site, shared skill, Git commit or deployment. Later implementation uses the repository-pinned Puppeteer and a cut-local engine copy, with any drawing extension local to the cut.

