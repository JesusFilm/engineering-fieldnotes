# Lesson 05 beat sheet: Missing and sensitive data

**Mechanism:** a trace view shows only what passed the collection path. An attribute policy keeps approved fields, so span A's fake secret row is removed while span A itself is exported. Separately, span B's export fails, so the view has A and not B, although B ran and was recorded locally.

Times are playback seconds for `video.mp4` (speed 1). Duration 42.00 s, finite ending.

## Neutral choices from plans A and B

| Idea | Source | Why |
|---|---|---|
| Three bands top to bottom: `runtime`, `export path` (attribute policy, exporter), `trace view`; A left column, B right | B | Attrition along a path: what ran, what was shaped, what arrived |
| Runtime operations and local records stay on screen to the end | A | Missing telemetry is never mistaken for missing execution |
| The whole `token` row (key and value) collapses before export; no masking dots | A | Removing an attribute keeps the span |
| Allowlist text `keep: name, status` on the policy | B | Shows why the row goes and why B passes unchanged |
| Secret value `FAKE-9f2c` flagged in amber; red used only for the failed export | A | Two different omissions keep different colours |
| No placeholder for B inside the trace view; view count stays `1 span` | A | The view cannot know B existed |
| Final dashed line from B's `ran ✓` to the red × outside the view | B (askB link), A (no B in the viewer) | Absent from the view does not mean it did not run |
| Sound: A C, B G, policy E, exporter D, view A; the failure thump is loudest | B | Each actor and step is audible |
| Not used: A's tabbed inspector and `Partial evidence` footer, B's `?` inside the view | — | Caption text; an in-view `?` reads as a placeholder |
| Excluded | — | No sampling animation, retries, missing-instrumentation demo or correctness claims |

## Beats

| # | Time (s) | What moves | State change | Sound |
|---|---|---|---|---|
| 1 | 0.0–10.2 | **Runtime.** 1.4 `A · run_tests` runs, 2.6 `ran ✓`. 2.8–4.0 span A fills `name run_tests`, `status ok`, `token FAKE-9f2c` (amber). 4.4 `B · report` runs, 5.6 `ran ✓`. 5.8–6.4 span B fills `name report`, `status ok`. 7.4 token row flagged. 8.4 policy `keep: name, status` lights. Hold. | Both operations ran and were recorded; A holds a secret. | work C4 ×3, 2.6 ack C5, store C5 ×3 · work G4 ×3, 5.6 ack G5, store G5 ×2 · 7.4 miss · 8.4 ack E5 |
| 2 | 10.2–21.0 | **Remove the field, keep the span.** 10.2 policy turns amber; token row lights. 10.9 the whole row fades and the card shrinks. 11.9 remaining rows light. 13.0–15.7 `span A` chip runs down through policy and exporter into the view. 15.7 the view shows `span A` with `name` and `status` only; count `1 span`. Hold. | Secret gone; A exported. | 10.2 arrive E5 · 10.9 poof · 11.9 ack E5 · 13.0 send C6 · 13.8 ack E5 · 14.65 send D6 · 15.7 arrive A5 · 16.1/16.6 store A5 |
| 3 | 21.0–30.0 | **B's export fails.** 21.0 `span B` chip runs down; policy passes it unchanged; exporter sends. 23.0 red × above the view, exporter jolts, B's path turns red and dashed. 23.7 `export failed`. 24.6 view count flashes, still `1 span`. Hold. | The view has A; B never arrived. | 21.0 send G6 · 21.8 ack E5 · 22.65 send D6 · 23.0 thump (loudest) · 24.6 ack A5 |
| 4 | 30.0–40.0 | **Partial evidence.** 30.0 `B · report  ran ✓` lights. 30.8 span B's local record lights. 31.8 dashed line from B down the right edge to the ×; `export failed` flashes. 33.4 the view's span A and count light. Hold. | B ran and was recorded, but the view cannot show it. | 30.0 ack G5 · 30.8 store G5 · 31.8 ack C4 · 33.4 ack A5 · silent hold |
| end | 40.0–42.0 | Fade to black. | — | — |

## Reproduce

From the repository root (pinned `puppeteer-core` 25.14.0 from the root `node_modules`):

```
node video/observability-and-tracing/motion-v2/05/engine/render.mjs video/observability-and-tracing/motion-v2/05/scene.js video/observability-and-tracing/motion-v2/05/video.mp4 --sheet video/observability-and-tracing/motion-v2/05/scratch/contact-sheet.png
```

The cut-local engine starts from a copy of lesson 03's local engine and adds: a `top` anchor and `cut` row collapse on `record`, per-row `r{i}KeyAlpha`, and `subSize` / `subMono` sublabels on `box`. Other lessons' files and the shared skill are unchanged.

## Lesson text sync (coordinator)

`sequence/lessons.json` item 5 declares `duration: 28` and beats at 0/7/14/21. For this cut, suggested: duration 42.0 with beats at **0 / 10.2 / 21.0 / 30.0**. This folder does not edit that file.
